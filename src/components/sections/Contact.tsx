"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  EnvelopeSimple,
  Phone,
  MapPin,
  Paperclip,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";
import { Section } from "@/components/ui/Section";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { brand } from "@/lib/site";

type FormErrors = {
  name?: string;
  email?: string;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  budget: string;
  style: string;
  message: string;
  file?: File;
};

export default function Contact() {
  const reduce = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    budget: "",
    style: "",
    message: "",
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      budget: "",
      style: "",
      message: "",
    });
    setErrors({});
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name in errors) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData((prev) => ({ ...prev, file }));
  };

  return (
    <Section id="contact">
      <div className="lg:grid lg:grid-cols-2 lg:gap-10">
        <div className="mb-10 lg:mb-0">
          <Reveal>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-bone lg:text-5xl">
              Begin Your Commission
            </h2>
            <p className="mt-6 text-mist lg:max-w-md">
              Every Aevum timepiece begins with a conversation. Tell us about
              your vision and we will guide you through the art of bespoke
              horology, from initial sketch to final delivery.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 space-y-5">
              <a
                href={`mailto:${brand.email}`}
                className="flex items-center gap-4 text-mist transition hover:text-gold"
              >
                <EnvelopeSimple className="text-gold" size={24} weight="duotone" />
                <span>{brand.email}</span>
              </a>
              <a
                href={`tel:${brand.phone}`}
                className="flex items-center gap-4 text-mist transition hover:text-gold"
              >
                <Phone className="text-gold" size={24} weight="duotone" />
                <span>{brand.phone}</span>
              </a>
              <div className="flex items-center gap-4 text-mist">
                <MapPin className="text-gold" size={24} weight="duotone" />
                <span>{brand.location}</span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <GlassPanel strong className="p-6 lg:p-8">
            {submitted ? (
              <motion.div
                initial={reduce ? false : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <CheckCircle className="text-gold mb-6" size={64} weight="duotone" />
                <h3 className="font-display text-2xl font-semibold text-bone">
                  Thank you
                </h3>
                <p className="mt-3 text-mist">
                  Our atelier will be in touch within two business days.
                </p>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={handleReset}
                  className="mt-8"
                >
                  Send another message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm text-mist">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-line bg-white/5 px-4 py-3 text-bone placeholder:text-faint outline-none transition focus:border-gold/60"
                    required
                  />
                  {errors.name && (
                    <span className="text-xs text-red-400">{errors.name}</span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm text-mist">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-line bg-white/5 px-4 py-3 text-bone placeholder:text-faint outline-none transition focus:border-gold/60"
                    required
                  />
                  {errors.email && (
                    <span className="text-xs text-red-400">{errors.email}</span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-sm text-mist">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-line bg-white/5 px-4 py-3 text-bone placeholder:text-faint outline-none transition focus:border-gold/60"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="budget" className="text-sm text-mist">
                    Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-line bg-white/5 px-4 py-3 text-bone outline-none transition focus:border-gold/60"
                  >
                    <option value="">Select a range</option>
                    <option value="under-20k">Under AUD 20k</option>
                    <option value="20-40k">AUD 20-40k</option>
                    <option value="40-80k">AUD 40-80k</option>
                    <option value="80k+">AUD 80k+</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="style" className="text-sm text-mist">
                    Preferred Style
                  </label>
                  <select
                    id="style"
                    name="style"
                    value={formData.style}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-line bg-white/5 px-4 py-3 text-bone outline-none transition focus:border-gold/60"
                  >
                    <option value="">Select a style</option>
                    <option value="dress">Dress</option>
                    <option value="diver">Diver</option>
                    <option value="chronograph">Chronograph</option>
                    <option value="field">Field</option>
                    <option value="avant-garde">Avant-garde</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="file" className="text-sm text-mist">
                    <div className="flex items-center gap-2">
                      <Paperclip size={16} weight="duotone" />
                      Inspiration Upload
                    </div>
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="w-full rounded-2xl border border-line bg-white/5 px-4 py-3 text-bone file:mr-4 file:rounded-full file:border-0 file:bg-gold/10 file:text-gold file:px-3 file:py-1.5 outline-none transition focus:border-gold/60"
                  />
                  <p className="text-xs text-mist">
                    JPG, PNG or PDF. Optional.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm text-mist">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-line bg-white/5 px-4 py-3 text-bone placeholder:text-faint outline-none transition focus:border-gold/60 resize-none"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Request Your Consultation
                </Button>
              </form>
            )}
          </GlassPanel>
        </Reveal>
      </div>
    </Section>
  );
}
