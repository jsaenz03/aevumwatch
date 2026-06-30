"use client";

import { motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Particles } from "@/components/effects/Particles";
import { WatchScene } from "@/components/three/WatchScene";
import { hero } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], reduce ? [0, 0] : [6, -6]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], reduce ? [0, 0] : [-6, 6]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="top"
      className="relative min-h-[100dvh] flex items-center bg-ink"
    >
      <Particles className="z-0" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column: text content */}
          <div className="flex flex-col items-start gap-8 lg:gap-10">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              <Eyebrow>{hero.eyebrow}</Eyebrow>
            </motion.div>

            <motion.h1
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[88px] font-semibold tracking-tight leading-[0.95] text-bone"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              {hero.headline[0]}
              <br />
              <span className="text-gold-gradient">{hero.headline[1]}</span>
            </motion.h1>

            <motion.p
              className="text-mist text-base lg:text-lg leading-relaxed max-w-xl"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease }}
            >
              {hero.sub}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease }}
            >
              <Button href={hero.primaryCta.href} size="lg">
                {hero.primaryCta.label}
                <ArrowRight weight="regular" className="text-[20px]" />
              </Button>
              <Button
                href={hero.secondaryCta.href}
                variant="secondary"
                size="lg"
              >
                {hero.secondaryCta.label}
              </Button>
            </motion.div>
          </div>

          {/* Right column: 3D watch stage */}
          <Reveal delay={0.2}>
            <motion.div
              className="relative rounded-[28px] glass-strong p-6 sm:p-8 preserve-3d perspective"
              style={{ rotateX, rotateY }}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
            >
              <WatchScene mode="hero" className="aspect-square w-full" />

              <div
                className="absolute inset-0 rounded-[28px] blur-[120px] opacity-40 pointer-events-none -z-10"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, var(--color-gold), transparent 60%)",
                }}
              />
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
