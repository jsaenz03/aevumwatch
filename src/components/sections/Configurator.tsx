"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  CircleNotch,
  CircleDashed,
  Palette,
  Sparkle,
  DotsThree,
  Hash,
  Cursor,
  Lightbulb,
  GearFine,
  Diamond,
  GearSix,
  Link,
  Lock,
  PencilSimple,
  type Icon,
} from "@phosphor-icons/react";
import { Section } from "@/components/ui/Section";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { WatchScene } from "@/components/three/WatchScene";
import { configGroups, defaultConfig, deriveParams } from "@/lib/watch-config";

const iconMap: Record<string, Icon> = {
  CircleNotch,
  CircleDashed,
  Palette,
  Sparkle,
  DotsThree,
  Hash,
  Cursor,
  Lightbulb,
  GearFine,
  Diamond,
  GearSix,
  Link,
  Lock,
  PencilSimple,
};

function Configurator() {
  const [config, setConfig] = useState<Record<string, string>>(defaultConfig);
  const [engravingText, setEngravingText] = useState("");
  const reduceMotion = useReducedMotion();

  const params = useMemo(() => deriveParams(config), [config]);

  const handleSelect = (groupId: string, optionId: string) => {
    setConfig((prev) => ({ ...prev, [groupId]: optionId }));
  };

  return (
    <Section id="configurator">
      <Reveal>
        <div className="mb-10 text-center">
          <h2 className="mb-3 font-display text-3xl font-semibold tracking-tight text-bone sm:text-4xl lg:text-5xl">
            Design Your Aevum
          </h2>
          <p className="mx-auto max-w-2xl text-base text-mist sm:text-lg">
            Select every detail of your timepiece, from case metal to dial texture,
            and watch your vision come to life in real time.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Options Panel */}
        <Reveal delay={0.1} className="lg:col-span-4">
          <GlassPanel className="max-h-[560px] overflow-y-auto p-5">
            <div className="space-y-5">
              {configGroups.map((group) => {
                const Icon = iconMap[group.icon];
                const selectedOption = group.options.find((opt) => opt.id === config[group.id]);
                const showEngravingInput = group.id === "engraving" && selectedOption?.id !== "none";

                return (
                  <div key={group.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      {Icon && (
                        <Icon
                          weight="regular"
                          className="text-gold-bright"
                          style={{ width: 16, height: 16 }}
                        />
                      )}
                      <span className="text-xs uppercase tracking-wide text-mist">{group.label}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.options.map((option) => {
                        const isActive = config[group.id] === option.id;
                        return (
                          <motion.button
                            key={option.id}
                            layout={reduceMotion ? false : true}
                            onClick={() => handleSelect(group.id, option.id)}
                            className={`
                              rounded-full border px-3 py-1.5 text-xs transition
                              ${
                                isActive
                                  ? "border-gold/60 bg-gold/10 text-gold-bright"
                                  : "border-line text-mist hover:border-line-2 hover:text-bone"
                              }
                            `}
                          >
                            {option.label}
                          </motion.button>
                        );
                      })}
                    </div>
                    <AnimatePresence>
                      {showEngravingInput && (
                        <motion.div
                          initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: reduceMotion ? 0 : 0.3,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <input
                            type="text"
                            value={engravingText}
                            onChange={(e) => setEngravingText(e.target.value)}
                            placeholder="Enter your engraving text"
                            className="mt-2 w-full rounded-2xl bg-white/5 px-4 py-2 text-sm text-bone placeholder:text-faint focus:border-gold focus:outline-none"
                            maxLength={50}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </GlassPanel>
        </Reveal>

        {/* Center: Watch Stage */}
        <Reveal delay={0.2} className="lg:col-span-5">
          <GlassPanel strong className="relative p-4">
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[24px]">
              <div className="pointer-events-none h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(201,162,75,0.15)_0%,transparent_70%)]" />
            </div>
            <WatchScene mode="configurator" params={params} className="relative h-[380px] w-full" />
            <p className="mt-3 text-center text-xs text-faint">Drag to rotate</p>
          </GlassPanel>
        </Reveal>

        {/* Right: Live Readout */}
        <Reveal delay={0.3} className="lg:col-span-3">
          <GlassPanel className="p-5">
            <div className="divide-y divide-line/60">
              {configGroups.map((group) => {
                const selectedOption = group.options.find((opt) => opt.id === config[group.id]);
                return (
                  <div key={group.id} className="flex justify-between py-3 text-sm">
                    <span className="text-faint">{group.label}</span>
                    <span className="font-medium text-bone">{selectedOption?.label}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 pt-6">
              <p className="text-xs text-faint">Starting from</p>
              <p className="mb-5 mt-1 text-xl font-semibold text-gold-gradient">
                AUD 18,000
              </p>
              <Button href="#contact" className="w-full">
                Book This Design
              </Button>
            </div>
          </GlassPanel>
        </Reveal>
      </div>
    </Section>
  );
}

export default Configurator;
