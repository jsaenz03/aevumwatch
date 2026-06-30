"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Star, ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { Section } from "@/components/ui/Section";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/site";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const goTo = (i: number) => setIndex(i);

  useEffect(() => {
    if (reduce || paused) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [paused, reduce]);

  const slideVariants = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: reduce ? { opacity: 0 } : { opacity: 0, x: -30 },
  };

  return (
    <Section id="testimonials">
      <Reveal>
        <h2 className="text-bone text-center text-4xl font-display sm:text-5xl lg:text-6xl">
          What Clients Say
        </h2>
      </Reveal>

      <div
        className="mt-12 sm:mt-16 lg:mt-20"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <GlassPanel className="mx-auto max-w-3xl p-8 text-center sm:p-10 lg:p-12">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: reduce ? 0.3 : 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    weight="fill"
                    size={20}
                    className="text-gold"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote className="mt-6 text-bone text-xl leading-relaxed sm:text-2xl lg:mt-8">
                <p className="mx-auto max-w-2xl">{testimonials[index].quote}</p>
              </blockquote>

              <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 lg:mt-12">
                <img
                  src={`https://i.pravatar.cc/160?img=${11 + index}`}
                  alt={testimonials[index].name}
                  className="size-16 rounded-full object-cover"
                  loading="lazy"
                />
                <div className="text-center">
                  <p className="font-medium text-bone">{testimonials[index].name}</p>
                  <p className="text-sm text-mist">{testimonials[index].location}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </GlassPanel>
      </div>

      <div className="mt-8 flex flex-col items-center gap-6 sm:mt-10">
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            className="rounded-full border border-line p-3 text-bone transition hover:border-gold hover:text-gold active:translate-y-[1px]"
            aria-label="Previous testimonial"
          >
            <ArrowLeft weight="duotone" size={24} />
          </button>
          <button
            onClick={next}
            className="rounded-full border border-line p-3 text-bone transition hover:border-gold hover:text-gold active:translate-y-[1px]"
            aria-label="Next testimonial"
          >
            <ArrowRight weight="duotone" size={24} />
          </button>
        </div>

        <div className="flex gap-2" role="navigation" aria-label="Testimonial navigation">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-8 bg-gold" : "w-2 bg-line hover:bg-line-2"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
