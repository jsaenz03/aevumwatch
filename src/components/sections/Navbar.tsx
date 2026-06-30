"use client";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/cn";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { useState, useCallback, useRef, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 24);
  });

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen, closeMobileMenu]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!isMobileMenuOpen || !mobileMenuRef.current) return;

    const focusableElements = mobileMenuRef.current.querySelectorAll<
      HTMLElement
    >(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    firstElement?.focus();

    return () => document.removeEventListener("keydown", handleTab);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navClasses = cn(
    "fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300",
    isScrolled
      ? "glass border-b border-line/50"
      : "border-b border-transparent"
  );

  const mobileMenuVariants: Variants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: reducedMotion ? 0.001 : 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: reducedMotion ? 0.001 : 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <nav className={navClasses} aria-label="Main navigation">
      <div className="shell h-full flex items-center justify-between">
        {/* Logo */}
        <a href="#top" className="z-50 focus:outline-none">
          <Logo />
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-mist hover:text-bone transition-colors duration-200 focus:outline-none focus:text-gold-bright"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden sm:flex">
          <Button href="#contact" size="md">
            Book Consultation
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          className={cn(
            "lg:hidden z-50 p-2 -mr-2 rounded-lg transition-colors",
            "text-mist hover:text-bone focus:outline-none focus:text-gold-bright",
            "focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          )}
        >
          {isMobileMenuOpen ? (
            <X size={24} weight="duotone" aria-hidden="true" />
          ) : (
            <List size={24} weight="duotone" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence initial={false}>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="lg:hidden glass-strong border-t border-line/50 overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="shell py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="text-base text-mist hover:text-bone transition-colors duration-200 py-2 focus:outline-none focus:text-gold-bright"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-line/50">
                <Button
                  href="#contact"
                  onClick={closeMobileMenu}
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  Book Consultation
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
