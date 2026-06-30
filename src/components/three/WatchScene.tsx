"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, OrbitControls } from "@react-three/drei";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";
import { defaultConfig, deriveParams, type WatchParams } from "@/lib/watch-config";

export type WatchSceneProps = {
  params?: WatchParams;
  mode?: "hero" | "configurator";
  className?: string;
};

const TWO_PI = Math.PI * 2;
const HAND_HOURS = 10; // 10:10
const HAND_MINUTES = 2; // 10:10 -> minute hand on 2

function lumeTargetIndices(mode: WatchParams["numeralMode"]): number[] {
  if (mode === "none") {
    // 4 tiny dots at the quarters for visual interest
    return [0, 3, 6, 9];
  }
  if (mode === "quarter") {
    return [0, 3, 6, 9];
  }
  return Array.from({ length: 12 }, (_, i) => i);
}

function markerScale(mode: WatchParams["numeralMode"]): { long: number; short: number } {
  if (mode === "none") {
    return { long: 0.045, short: 0.045 };
  }
  return { long: 0.2, short: 0.08 };
}

type WatchProps = {
  params: WatchParams;
  mode: "hero" | "configurator";
};

function Watch({ params, mode }: WatchProps): React.ReactElement {
  const reduced = useReducedMotion();
  const groupRef = useRef<THREE.Group>(null);
  const rotorRef = useRef<THREE.Mesh>(null);
  const secondRef = useRef<THREE.Group>(null);

  // Material refs for smooth color lerping
  const caseMatRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const bezelMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const dialMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const crystalMatRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const strapMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const lumeMatsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  // Pre-compute target THREE.Color objects per frame in the frame callback below;
  // keep a stable scratch set so we never allocate per frame after the first run.
  const scratch = useMemo(
    () => ({
      case: new THREE.Color(params.caseColor),
      bezel: new THREE.Color(params.bezelColor),
      dial: new THREE.Color(params.dialColor),
      crystal: new THREE.Color(params.dialColor),
      strap: new THREE.Color(params.strapColor),
      lume: new THREE.Color(params.lumeColor),
    }),
    [], // allocate once; we overwrite RGB each frame
  );

  // Geometry constants (low-poly)
  const CASE_RADIUS = 1.05;
  const CASE_HEIGHT = 0.34;
  const BEZEL_RADIUS = 1.0;
  const BEZEL_TUBE = 0.07;
  const DIAL_RADIUS = 0.9;
  const CRYSTAL_RADIUS = 0.88;

  const markers = useMemo(() => lumeTargetIndices(params.numeralMode), [params.numeralMode]);
  const mScale = useMemo(() => markerScale(params.numeralMode), [params.numeralMode]);

  // Bezel fluting teeth
  const teeth = useMemo(() => {
    if (!params.bezelFluted) return [];
    const count = 60;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * TWO_PI;
      return { angle };
    });
  }, [params.bezelFluted]);

  useFrame((_, delta) => {
    // Recompute target colors from the latest params each frame.
    scratch.case.set(params.caseColor);
    scratch.bezel.set(params.bezelColor);
    scratch.dial.set(params.dialColor);
    scratch.crystal.set(params.dialColor);
    scratch.strap.set(params.strapColor);
    scratch.lume.set(params.lumeColor);

    const lerpAmt = Math.min(0.12 * (delta * 60), 1);

    caseMatRef.current?.color.lerp(scratch.case, lerpAmt);
    bezelMatRef.current?.color.lerp(scratch.bezel, lerpAmt);
    dialMatRef.current?.color.lerp(scratch.dial, lerpAmt);
    crystalMatRef.current?.color.lerp(scratch.crystal, lerpAmt);
    strapMatRef.current?.color.lerp(scratch.strap, lerpAmt);
    for (const m of lumeMatsRef.current) {
      if (m) {
        m.emissive.lerp(scratch.lume, lerpAmt);
      }
    }

    // Motion: hero auto-rotates; configurator keeps only a subtle idle tilt.
    if (groupRef.current) {
      if (mode === "hero" && !reduced) {
        groupRef.current.rotation.y += delta * 0.3;
        groupRef.current.rotation.x = Math.sin(performance.now() * 0.0004) * 0.06;
      } else if (mode === "configurator" && !reduced) {
        groupRef.current.rotation.y = Math.sin(performance.now() * 0.00018) * 0.25;
        groupRef.current.rotation.x = Math.sin(performance.now() * 0.00022) * 0.04 + 0.02;
      }
    }

    // Rotor (skeleton movement) and a slow ticking second hand.
    if (params.skeleton && params.rotorSpeed > 0 && rotorRef.current && !reduced) {
      rotorRef.current.rotation.z += params.rotorSpeed * delta;
    }
    if (secondRef.current && !reduced) {
      secondRef.current.rotation.z -= delta * 0.6;
    }
  });

  // Hands at 10:10 layout. Hour hand rotation derived from hour 10; minute from 2.
  const hourAngle = -((HAND_HOURS % 12) / 12) * TWO_PI;
  const minuteAngle = -((HAND_MINUTES % 12) / 12) * TWO_PI;
  const secondAngle = 0; // animated live via secondRef

  // Hand dimensions vary slightly by style.
  const handDims = useMemo(() => {
    const base = { hourLen: 0.5, minLen: 0.72, hourW: 0.05, minW: 0.045, taper: 0 };
    switch (params.handStyle) {
      case "dauphine":
        return { ...base, hourW: 0.055, minW: 0.05 };
      case "leaf":
        return { ...base, hourW: 0.07, minW: 0.065 };
      case "breguet":
        return { ...base, hourLen: 0.46, minLen: 0.66, hourW: 0.045, minW: 0.04 };
      case "skeleton":
        return { ...base, hourW: 0.035, minW: 0.03 };
      default:
        return base; // sword
    }
  }, [params.handStyle]);

  // Crystal dome height from 0 flat to 1 strong.
  const domeHeight = 0.05 + params.crystalDome * 0.32;

  const dialOpacity = params.skeleton ? 0.22 : 1;

  return (
    <group ref={groupRef} rotation={[0.12, 0, 0]}>
      {/* ===== Case (wide short cylinder with a beveled rim) ===== */}
      <mesh castShadow receiveShadow position={[0, 0, -CASE_HEIGHT / 2]}>
        <cylinderGeometry args={[CASE_RADIUS, CASE_RADIUS, CASE_HEIGHT, 64]} />
        <meshPhysicalMaterial
          ref={caseMatRef}
          color={params.caseColor}
          metalness={params.caseMetalness}
          roughness={params.caseRoughness}
          clearcoat={0.4}
          clearcoatRoughness={0.3}
          envMapIntensity={1.1}
        />
      </mesh>
      {/* Beveled rim ring (slightly larger, thinner disc) */}
      <mesh position={[0, 0, -CASE_HEIGHT / 2 - 0.01]} rotation={[0, 0, 0]}>
        <torusGeometry args={[CASE_RADIUS, 0.06, 16, 64]} />
        <meshPhysicalMaterial
          color={params.caseColor}
          metalness={params.caseMetalness}
          roughness={params.caseRoughness}
          clearcoat={0.5}
          envMapIntensity={1.2}
        />
      </mesh>
      {/* Caseback */}
      <mesh position={[0, 0, -CASE_HEIGHT - 0.02]}>
        <cylinderGeometry args={[CASE_RADIUS * 0.96, CASE_RADIUS * 0.96, 0.06, 48]} />
        <meshStandardMaterial color={params.caseColor} metalness={params.caseMetalness} roughness={Math.min(params.caseRoughness + 0.2, 1)} />
      </mesh>

      {/* ===== Bezel ring on top of the case ===== */}
      <mesh position={[0, 0, 0.02]} rotation={[0, 0, 0]}>
        <torusGeometry args={[BEZEL_RADIUS, BEZEL_TUBE, 24, 96]} />
        <meshStandardMaterial
          ref={bezelMatRef}
          color={params.bezelColor}
          metalness={0.95}
          roughness={params.bezelRoughness}
          envMapIntensity={1.3}
        />
      </mesh>
      {/* Fluted teeth */}
      {teeth.map((t, i) => (
        <mesh
          key={`tooth-${i}`}
          position={[Math.cos(t.angle) * BEZEL_RADIUS, Math.sin(t.angle) * BEZEL_RADIUS, 0.02]}
          rotation={[0, 0, t.angle]}
        >
          <boxGeometry args={[0.02, 0.05, 0.06]} />
          <meshStandardMaterial color={params.bezelColor} metalness={0.95} roughness={params.bezelRoughness} />
        </mesh>
      ))}

      {/* ===== Rotor (skeleton movement, behind the dial) ===== */}
      {params.skeleton && params.rotorSpeed > 0 ? (
        <mesh ref={rotorRef} position={[0, 0, -0.16]}>
          <torusGeometry args={[0.55, 0.12, 12, 48]} />
          <meshStandardMaterial color="#c9a24b" metalness={1} roughness={0.25} emissive="#3a2c10" emissiveIntensity={0.2} />
        </mesh>
      ) : null}

      {/* ===== Dial disc ===== */}
      <mesh position={[0, 0, -0.08]}>
        <cylinderGeometry args={[DIAL_RADIUS, DIAL_RADIUS, 0.04, 64]} />
        <meshStandardMaterial
          ref={dialMatRef}
          color={params.dialColor}
          metalness={0.2}
          roughness={params.dialRoughness}
          transparent={params.skeleton}
          opacity={dialOpacity}
          emissive={params.dialColor}
          emissiveIntensity={params.dialEmissive}
        />
      </mesh>

      {/* ===== Hour markers / lume dots ===== */}
      {markers.map((hour, i) => {
        const angle = (hour / 12) * TWO_PI - Math.PI / 2;
        const isQuarter = hour % 3 === 0;
        const len = isQuarter ? mScale.long : mScale.short;
        const radius = DIAL_RADIUS - 0.12;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <mesh
            key={`marker-${hour}-${i}`}
            position={[x, z, -0.02]}
            // Orient the box so its long axis points outward (radial).
            rotation={[0, 0, angle + Math.PI / 2]}
          >
            <boxGeometry args={[len, 0.035, 0.03]} />
            <meshStandardMaterial
              ref={(m: THREE.MeshStandardMaterial | null) => {
                if (m) lumeMatsRef.current[i] = m;
              }}
              color={params.lumeColor}
              emissive={params.lumeColor}
              emissiveIntensity={0.4}
              metalness={0.1}
              roughness={0.5}
            />
          </mesh>
        );
      })}

      {/* ===== Hands (resting just above the dial, set to 10:10) ===== */}
      {/* Hour hand */}
      <mesh position={[0, 0, 0.06]} rotation={[0, 0, hourAngle]}>
        <group>
          <mesh position={[0, handDims.hourLen / 2, 0]}>
            <boxGeometry args={[handDims.hourW, handDims.hourLen, 0.018]} />
            <meshStandardMaterial color="#f6f5f2" metalness={0.6} roughness={0.25} />
          </mesh>
        </group>
      </mesh>
      {/* Minute hand */}
      <mesh position={[0, 0, 0.09]} rotation={[0, 0, minuteAngle]}>
        <group>
          <mesh position={[0, handDims.minLen / 2, 0]}>
            <boxGeometry args={[handDims.minW, handDims.minLen, 0.016]} />
            <meshStandardMaterial color="#f6f5f2" metalness={0.6} roughness={0.25} />
          </mesh>
        </group>
      </mesh>
      {/* Second hand (gold, thin, animated) */}
      <group ref={secondRef} position={[0, 0, 0.12]} rotation={[0, 0, secondAngle]}>
        <mesh position={[0, 0.42, 0]}>
          <boxGeometry args={[0.012, 0.84, 0.01]} />
          <meshStandardMaterial color="#c9a24b" metalness={1} roughness={0.2} emissive="#3a2c10" emissiveIntensity={0.25} />
        </mesh>
        {/* Counterweight */}
        <mesh position={[0, -0.14, 0]}>
          <boxGeometry args={[0.025, 0.14, 0.01]} />
          <meshStandardMaterial color="#c9a24b" metalness={1} roughness={0.2} />
        </mesh>
      </group>
      {/* Center cap */}
      <mesh position={[0, 0, 0.14]}>
        <cylinderGeometry args={[0.045, 0.045, 0.05, 16]} />
        <meshStandardMaterial color="#c9a24b" metalness={1} roughness={0.2} />
      </mesh>

      {/* ===== Crystal (transparent dome above the dial) ===== */}
      <mesh position={[0, 0, 0.18]} scale={[1, 1, domeHeight]}>
        <sphereGeometry args={[CRYSTAL_RADIUS, 48, 24, 0, TWO_PI, 0, Math.PI / 2.4]} />
        <meshPhysicalMaterial
          ref={crystalMatRef}
          color={params.dialColor}
          metalness={0}
          roughness={0}
          transmission={0.96}
          transparent
          opacity={0.12}
          clearcoat={1}
          clearcoatRoughness={0}
          ior={1.5}
          thickness={0.4}
          envMapIntensity={1.4}
        />
      </mesh>

      {/* ===== Crown at 3 o clock ===== */}
      <mesh position={[CASE_RADIUS + 0.04, 0, -CASE_HEIGHT / 2]}>
        <cylinderGeometry args={[0.09, 0.09, 0.14, 16]} />
        <meshStandardMaterial color={params.caseColor} metalness={params.caseMetalness} roughness={params.caseRoughness} />
      </mesh>
      {/* Crown cap */}
      <mesh position={[CASE_RADIUS + 0.12, 0, -CASE_HEIGHT / 2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.04, 16]} />
        <meshStandardMaterial color="#c9a24b" metalness={1} roughness={0.2} />
      </mesh>

      {/* ===== Strap (two curved bands) ===== */}
      <group position={[0, 0, -CASE_HEIGHT / 2]}>
        {/* Top strap */}
        <mesh position={[0, 1.7, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.45, 0.45, 16, 32, Math.PI * 0.42]} />
          <meshStandardMaterial ref={strapMatRef} color={params.strapColor} metalness={0.1} roughness={0.75} />
        </mesh>
        {/* Bottom strap */}
        <mesh position={[0, -1.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.45, 0.45, 16, 32, Math.PI * 0.42]} />
          <meshStandardMaterial color={params.strapColor} metalness={0.1} roughness={0.75} />
        </mesh>
      </group>
    </group>
  );
}

type StageProps = {
  params: WatchParams;
  mode: "hero" | "configurator";
};

function Stage({ params, mode }: StageProps): React.ReactElement {
  const reduced = useReducedMotion();

  const watchContent = (
    <Suspense fallback={null}>
      <Watch params={params} mode={mode} />
      <ContactShadows
        position={[0, -2.4, 0.1]}
        opacity={0.55}
        scale={9}
        blur={2.6}
        far={4}
        resolution={256}
        color="#000000"
      />
      {/* Warm gold point-light glow behind the watch for depth */}
      <pointLight position={[0, 0, -3]} intensity={6} distance={9} color="#c9a24b" />
      {/* Soft gold rim light from above-right */}
      <pointLight position={[3.5, 3, 2]} intensity={3} distance={10} color="#e8cd80" />
      <Environment preset="city" />
    </Suspense>
  );

  if (mode === "hero") {
    return (
      <>
        {reduced ? (
          watchContent
        ) : (
          <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
            {watchContent}
          </Float>
        )}
      </>
    );
  }

  // Configurator mode: OrbitControls stay interactive even under reduced motion
  // (they are user-driven, not auto-animation). Auto-spin and idle tilt are
  // already frozen inside Watch.useFrame when reduced is true.
  return (
    <>
      {watchContent}
      <OrbitControls enablePan={false} enableZoom={false} enableDamping dampingFactor={0.08} makeDefault />
    </>
  );
}

export function WatchScene({ params, mode = "hero", className }: WatchSceneProps): React.ReactElement {
  const resolvedParams: WatchParams = params ?? deriveParams(defaultConfig);

  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 32 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        {/* Studio rig */}
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 5]} intensity={2.2} castShadow color="#fff6e0" />
        <directionalLight position={[-5, -2, 2]} intensity={0.5} color="#c9a24b" />

        <Stage params={resolvedParams} mode={mode} />
      </Canvas>
    </div>
  );
}

export default WatchScene;
