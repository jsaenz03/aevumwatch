"use client";

import { useState, FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  InstagramLogo,
  XLogo,
  LinkedinLogo,
  YoutubeLogo,
  ArrowRight,
} from "@phosphor-icons/react";
import { Logo } from "@/components/Logo";
import { brand, navLinks } from "@/lib/site";

const atelierLinks = [
  { label: "Process", href: "#process" },
  { label: "Configurator", href: "#configurator" },
  { label: "Materials", href: "#materials" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
] as const;

const legalLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
] as const;

const socialLinks = [
  { icon: InstagramLogo, label: "Instagram", href: "#" },
  { icon: XLogo, label: "X", href: "#" },
  { icon: LinkedinLogo, label: "LinkedIn", href: "#" },
  { icon: YoutubeLogo, label: "YouTube", href: "#" },
] as const;

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubscribed(true);
      setIsSubmitting(false);
      setEmail("");
    }, 600);
  };

  const transition = prefersReducedMotion ? { duration: 0 } : undefined;

  return (
    <footer className="relative z-10 border-t border-line mt-10 bg-ink">
      <div className="shell py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.1 }}
            className="col-span-2 lg:col-span-1"
          >
            <div className="flex flex-col gap-4">
              <Logo />
              <p className="text-sm text-mist">{brand.tagline}</p>
              <p className="text-sm text-mist leading-relaxed">
                Every Aevum timepiece is designed around your vision and
                hand-assembled in our Sydney atelier.
              </p>
            </div>
          </motion.div>

          {/* Column 2: Explore */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.15 }}
          >
            <h3 className="text-sm font-semibold text-bone mb-4">Explore</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-mist hover:text-gold transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Column 3: Atelier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.2 }}
          >
            <h3 className="text-sm font-semibold text-bone mb-4">Atelier</h3>
            <nav aria-label="Atelier navigation">
              <ul className="space-y-2">
                {atelierLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-mist hover:text-gold transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Column 4: Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.25 }}
          >
            <h3 className="text-sm font-semibold text-bone mb-4">Newsletter</h3>
            <div className="flex flex-col gap-3">
              <p className="text-sm text-mist">
                Receive atelier news and collection previews.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="relative">
                  <input
                    type="email"
                    id="footer-email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={subscribed}
                    placeholder=" "
                    required
                    autoComplete="email"
                    aria-label="Email address for newsletter"
                    className="w-full px-4 py-2.5 bg-white/5 border border-line rounded-full text-bone placeholder-transparent focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed peer"
                  />
                  <label
                    htmlFor="footer-email"
                    className="absolute left-4 top-2.5 text-mist text-sm transition-all duration-200 pointer-events-none peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:text-gold peer-focus:bg-ink peer-focus:px-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:left-3 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-ink peer-not-placeholder-shown:px-1"
                  >
                    Email address
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={subscribed || isSubmitting}
                  className="self-end px-5 py-2.5 bg-gold text-ink rounded-full font-medium text-sm hover:bg-gold-bright active:translate-y-[1px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  aria-label="Subscribe to newsletter"
                >
                  {isSubmitting ? (
                    <span className="inline-block w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{subscribed ? "Subscribed" : "Subscribe"}</span>
                      <ArrowRight weight="regular" className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.3 }}
          className="mt-12 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-mist">
            © 2026 {brand.name} {brand.tagline}. All rights reserved.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <nav aria-label="Legal navigation" className="flex items-center gap-4">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-mist hover:text-gold transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <nav aria-label="Social media links" className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="size-10 grid place-items-center rounded-full glass border border-line hover:border-gold/50 hover:text-gold transition-all duration-200"
                  >
                    <Icon weight="regular" className="w-5 h-5" />
                  </a>
                );
              })}
            </nav>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
