"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  X,
  ArrowsOutSimple,
} from "@phosphor-icons/react/dist/ssr";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { galleryShots, galleryUrl } from "@/lib/site";

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const currentShot = activeIndex !== null ? galleryShots[activeIndex] : null;

  // Keyboard navigation
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev === null ? null : prev === 0 ? galleryShots.length - 1 : prev - 1
        );
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) =>
          prev === null ? null : prev === galleryShots.length - 1 ? 0 : prev + 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  const open = (index: number) => setActiveIndex(index);
  const close = () => setActiveIndex(null);
  const prev = () =>
    setActiveIndex((prev) =>
      prev === null ? null : prev === 0 ? galleryShots.length - 1 : prev - 1
    );
  const next = () =>
    setActiveIndex((prev) =>
      prev === null ? null : prev === galleryShots.length - 1 ? 0 : prev + 1
    );

  return (
    <Section id="gallery" className="bg-ink">
      {/* Heading */}
      <Reveal>
        <div className="mb-12 sm:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-bone mb-4">
            Selected Commissions
          </h2>
          <p className="text-mist max-w-2xl text-base sm:text-lg">
            A glimpse into recent pieces, each one shaped around a collector's
            vision and brought to life in our Sydney atelier.
          </p>
        </div>
      </Reveal>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {galleryShots.map((shot, index) => (
          <button
            key={shot.seed}
            onClick={() => open(index)}
            className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-[20px] group relative bg-ink-2"
            aria-label={`View ${shot.alt}`}
          >
            <Image
              src={galleryUrl(shot.seed, shot.h)}
              width={800}
              height={shot.h}
              alt={shot.alt}
              className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <div className="bg-gold/10 backdrop-blur-sm border border-gold/30 rounded-full p-4">
                <ArrowsOutSimple className="text-gold w-6 h-6" weight="regular" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeIndex !== null && currentShot && (
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
            className="fixed inset-0 z-[90] bg-ink/90 backdrop-blur-sm grid place-items-center p-6"
            onClick={close}
          >
            <motion.div
              initial={reduce ? false : { scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-5xl max-h-[90dvh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={close}
                className="absolute -top-16 right-0 text-bone hover:text-gold transition-colors p-2"
                aria-label="Close lightbox"
                autoFocus
              >
                <X className="w-8 h-8" weight="regular" />
              </button>

              {/* Previous button */}
              <button
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full sm:-translate-x-12 text-bone hover:text-gold transition-colors p-2"
                aria-label="Previous image"
              >
                <ArrowLeft className="w-8 h-8" weight="regular" />
              </button>

              {/* Next button */}
              <button
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full sm:translate-x-12 text-bone hover:text-gold transition-colors p-2"
                aria-label="Next image"
              >
                <ArrowRight className="w-8 h-8" weight="regular" />
              </button>

              {/* Large image */}
              <div className="relative rounded-[24px] overflow-hidden bg-ink-2">
                <Image
                  src={galleryUrl(currentShot.seed, currentShot.h, 1400)}
                  width={1400}
                  height={currentShot.h * (1400 / 800)}
                  alt={currentShot.alt}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
