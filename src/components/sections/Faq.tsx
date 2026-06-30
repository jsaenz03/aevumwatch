"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "@phosphor-icons/react";
import { Section } from "@/components/ui/Section";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Reveal } from "@/components/ui/Reveal";
import { faqs } from "@/lib/site";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback(
    (index: number) => {
      setOpenIndex((prev) => (prev === index ? null : index));
    },
    [setOpenIndex]
  );

  return (
    <Section id="faq">
      <div className="flex flex-col items-center gap-12">
        <Reveal>
          <h2 className="text-center font-display text-4xl font-semibold leading-tight text-bone lg:text-5xl">
            Questions, Answered
          </h2>
        </Reveal>

        <GlassPanel className="w-full max-w-3xl">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const id = `faq-${index}`;

            return (
              <div key={id}>
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={id}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-gold focus:text-gold"
                >
                  <span className="text-base font-medium text-bone lg:text-lg">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-shrink-0 text-gold"
                    aria-hidden="true"
                  >
                    <Plus weight="regular" size={24} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={id}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-8 text-sm leading-relaxed text-mist">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {index < faqs.length - 1 && (
                  <div className="h-px bg-line/60" aria-hidden="true" />
                )}
              </div>
            );
          })}
        </GlassPanel>
      </div>
    </Section>
  );
}
