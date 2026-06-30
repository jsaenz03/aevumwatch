"use client";

import {
  GearFine,
  Diamond,
  Drop,
  Hand,
  Infinity as InfinityIcon,
  PencilSimple,
  Stamp,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Reveal } from "@/components/ui/Reveal";
import { features } from "@/lib/site";

const iconMap: Record<string, typeof GearFine> = {
  GearFine,
  Diamond,
  Drop,
  Hand,
  Infinity: InfinityIcon,
  PencilSimple,
  Stamp,
};

export default function Features() {
  return (
    <Section id="features" className="bg-ink">
      <div>
        {/* Section heading */}
        <Reveal>
          <h2 className="text-balance font-display text-3xl font-semibold tracking-tight text-bone sm:text-4xl lg:text-5xl">
            Built Without Compromise
          </h2>
          <p className="mt-4 max-w-2xl text-balance text-base leading-relaxed text-mist sm:text-lg">
            Every Aevum watch represents a deliberate choice: proven materials, exacting
            assembly and a commitment to service that spans generations.
          </p>
        </Reveal>

        {/* Bento grid - asymmetric layout with 7 cards in 6-column grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            const isHeroCell = index === 0;

            // Grid spans for asymmetric bento layout
            const colSpan = index === 0
              ? "lg:col-span-3 lg:row-span-2"
              : index === 1 || index === 2
                ? "lg:col-span-3"
                : "lg:col-span-2";

            return (
              <Reveal key={feature.id} delay={index * 0.06}>
                <motion.div
                  className={`${colSpan} group`}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <GlassPanel className="border-glow relative p-7 transition-transform duration-300 will-change-transform">
                    {/* Subtle gold radial background for hero cell */}
                    {isHeroCell && (
                      <div
                        className="pointer-events-none absolute inset-0 -z-10 rounded-[24px] opacity-20 blur-3xl"
                        style={{
                          background: "radial-gradient(circle at 30% 30%, rgba(201, 162, 75, 0.15), transparent 60%)",
                        }}
                      />
                    )}

                    {/* Icon in glass chip */}
                    <div className="grid size-12 place-items-center rounded-2xl border border-line bg-white/5">
                      {Icon && (
                        <Icon
                          weight="duotone"
                          size={40}
                          className="text-gold"
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="mt-5 text-lg font-medium text-bone">
                      {feature.title}
                    </h3>

                    {/* Body */}
                    <p className="mt-2 text-sm leading-relaxed text-mist">
                      {feature.body}
                    </p>
                  </GlassPanel>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
