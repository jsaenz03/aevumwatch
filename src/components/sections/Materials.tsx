"use client";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { materials } from "@/lib/site";
import { motion } from "motion/react";

export default function Materials() {
  return (
    <Section id="materials">
      <div className="space-y-8">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-bone sm:text-4xl lg:text-5xl">
            Materials, Considered
          </h2>
          <p className="mt-3 max-w-2xl text-base text-mist sm:text-lg">
            Every finish we use is chosen for how it feels in the hand and how it ages over years of wear.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[15rem]">
          {materials.map((material, i) => {
            const isFeatured = i === 0;
            const isWide = i === 5 || i === 6;
            // Gapless asymmetric bento: featured 2x2, two wide tiles, rest 1x1.
            // Spans go on the grid's direct child (the Reveal wrapper).
            const span = isFeatured
              ? "col-span-2 md:col-span-2 md:row-span-2"
              : isWide
                ? "md:col-span-2"
                : "";
            return (
              <Reveal key={material.id} delay={i * 0.06} className={span}>
                <motion.div
                  className={`group relative h-full w-full overflow-hidden rounded-[24px] ${
                    isFeatured ? "animate-float-slow" : ""
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Swatch background layer */}
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{
                      background: material.swatch,
                      backgroundSize: "cover",
                    }}
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/90 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <h3
                      className={`font-medium text-bone ${
                        isFeatured
                          ? "text-xl sm:text-2xl lg:text-3xl"
                          : "text-base lg:text-lg"
                      }`}
                    >
                      {material.name}
                    </h3>
                    <p
                      className={`mt-2 max-w-[26ch] text-mist transition-opacity duration-500 ${
                        isFeatured
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      } ${isFeatured ? "text-sm sm:text-base" : "text-xs"}`}
                    >
                      {material.body}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
