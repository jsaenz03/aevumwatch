"use client";

import { motion } from "motion/react";
import {
  ChatCircleText,
  PencilRuler,
  Wrench,
  Package,
} from "@phosphor-icons/react";
import { Section } from "@/components/ui/Section";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/lib/site";

const iconMap = {
  ChatCircleText,
  PencilRuler,
  Wrench,
  Package,
} as const;

export default function Process() {
  return (
    <Section id="process">
      <div className="flex flex-col items-center">
        {/* Heading block */}
        <Reveal className="text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-bone max-w-2xl mx-auto lg:text-5xl">
            The Bespoke Process
          </h2>
          <p className="text-mist mt-5 text-lg max-w-xl mx-auto">
            Every commission begins with a conversation and ends with a watch that
            bears your name.
          </p>
        </Reveal>

        {/* Grid of process steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16 w-full">
          {processSteps.map((step, i) => {
            const IconComponent = iconMap[step.icon as keyof typeof iconMap];

            return (
              <Reveal key={step.id} delay={i * 0.08}>
                <motion.div
                  className="transition-transform duration-300 hover:-translate-y-1"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <GlassPanel className="relative p-7 border-glow overflow-hidden">
                    {/* Ghost index number */}
                    <span className="absolute top-7 right-7 text-5xl font-semibold text-white/5 select-none">
                      {step.index}
                    </span>

                    {/* Icon in glass chip */}
                    <div className="grid place-items-center">
                      <div className="size-14 grid place-items-center rounded-2xl glass border border-line bg-white/5">
                        {IconComponent && (
                          <IconComponent
                            weight="duotone"
                            size={36}
                            className="text-gold"
                          />
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-medium text-bone mt-5">
                      {step.title}
                    </h3>

                    {/* Body */}
                    <p className="text-sm text-mist mt-2 leading-relaxed">
                      {step.body}
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
