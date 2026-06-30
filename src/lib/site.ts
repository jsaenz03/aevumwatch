// Centralised, audited content for the Aevum site.
// Copy rules enforced here: zero em-dashes (use hyphens), realistic non-generic
// names, no fake-precise specs, AU spelling on client-facing text, quotes <=3 lines.

export const brand = {
  name: "Aevum",
  tagline: "Bespoke Horology",
  email: "atelier@aevum.watches",
  phone: "+61 2 9119 0184", // mock, AU format
  location: "Sydney, Australia",
} as const;

export const navLinks = [
  { label: "Process", href: "#process" },
  { label: "Configurator", href: "#configurator" },
  { label: "Materials", href: "#materials" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
] as const;

export const hero = {
  eyebrow: "Bespoke Horology",
  headline: ["Create Your", "Dream Watch"],
  sub: "Every Aevum timepiece is designed around your vision, from case metal to dial texture, then hand-assembled in our atelier.",
  primaryCta: { label: "Start Designing", href: "#configurator" },
  secondaryCta: { label: "Book Consultation", href: "#contact" },
} as const;

export type ProcessStep = {
  id: string;
  index: string;
  title: string;
  body: string;
  icon: string; // Phosphor icon name (PascalCase)
};

export const processSteps: ProcessStep[] = [
  {
    id: "consultation",
    index: "01",
    title: "Consultation",
    body: "We start with a private conversation about how and where you will wear the piece, and the details that matter to you.",
    icon: "ChatCircleText",
  },
  {
    id: "design",
    index: "02",
    title: "Design",
    body: "Sketches, proportions and material pairings are refined across rounds until the design feels inevitable.",
    icon: "PencilRuler",
  },
  {
    id: "prototype",
    index: "03",
    title: "Prototype",
    body: "A physical prototype lets you feel the weight, test the dial in daylight and confirm every detail before we commit.",
    icon: "Wrench",
  },
  {
    id: "delivery",
    index: "04",
    title: "Delivery",
    body: "Hand-assembled, regulated and delivered in a presentation case built specifically for your watch.",
    icon: "Package",
  },
];

export type Material = {
  id: string;
  name: string;
  body: string;
  // procedural finish swatch (CSS background)
  swatch: string;
};

export const materials: Material[] = [
  {
    id: "steel",
    name: "Stainless Steel",
    body: "904L steel, brushed and polished by hand for a crisp, cold finish that stays sharp for decades.",
    swatch:
      "linear-gradient(135deg,#d7d9db 0%,#9ea1a4 35%,#eef0f1 52%,#7c7f82 70%,#c9ccce 100%)",
  },
  {
    id: "titanium",
    name: "Titanium",
    body: "Grade 5 titanium, unusually light and gentle on the skin, with a quiet gunmetal tone.",
    swatch:
      "linear-gradient(135deg,#8b9095 0%,#5f6469 40%,#a7adb2 55%,#494e53 75%,#7e848a 100%)",
  },
  {
    id: "bronze",
    name: "Bronze",
    body: "A living alloy that develops its own warm patina over the years you wear it. No two age alike.",
    swatch:
      "linear-gradient(135deg,#c08a4a 0%,#8a5e2c 40%,#d9a45f 55%,#6d4720 75%,#b07b3e 100%)",
  },
  {
    id: "carbon",
    name: "Carbon Fibre",
    body: "Forged composite, featherlight and uniquely patterned in every single piece we press.",
    swatch:
      "repeating-linear-gradient(135deg,#15171a 0px,#15171a 6px,#23262b 6px,#23262b 9px),linear-gradient(135deg,#1c1f23,#0c0d0f)",
  },
  {
    id: "damascus",
    name: "Damascus Steel",
    body: "Folded and etched so no two bezels share the same grain. Each pattern is a fingerprint.",
    swatch:
      "repeating-radial-gradient(ellipse at 30% 40%,#3a3d42 0px,#5a5e64 8px,#2a2c30 16px),linear-gradient(135deg,#45484d,#1f2125)",
  },
  {
    id: "ceramic",
    name: "Ceramic",
    body: "Scratch-resistant matte ceramic that holds its colour and rejects glare for the life of the watch.",
    swatch:
      "linear-gradient(135deg,#1f2022 0%,#0c0d0e 50%,#27292c 100%)",
  },
  {
    id: "sapphire",
    name: "Sapphire",
    body: "A transparent sapphire caseback to reveal the movement at work, polished to optical clarity.",
    swatch:
      "linear-gradient(135deg,#3b6ea5 0%,#7fb0d8 35%,#cfe6f5 55%,#4f86b8 80%,#2a5279 100%)",
  },
];

export type Feature = {
  id: string;
  title: string;
  body: string;
  icon: string;
};

export const features: Feature[] = [
  {
    id: "movement",
    title: "Swiss Movement",
    body: "Swiss-made automatic movements, regulated to run within chronometer tolerances.",
    icon: "GearFine",
  },
  {
    id: "crystal",
    title: "Sapphire Crystal",
    body: "Double-domed sapphire glass with seven layers of anti-reflective coating.",
    icon: "Diamond",
  },
  {
    id: "water",
    title: "Water Resistance",
    body: "Rated to 100 metres and pressure-tested on every single piece before it leaves us.",
    icon: "Drop",
  },
  {
    id: "assembly",
    title: "Hand Assembly",
    body: "Each movement is assembled and regulated from start to finish by one watchmaker.",
    icon: "Hand",
  },
  {
    id: "service",
    title: "Lifetime Service",
    body: "We service every watch we make for as long as you own it, by the makers who built it.",
    icon: "Infinity",
  },
  {
    id: "engraving",
    title: "Custom Engraving",
    body: "Hand-engraved casebacks, rotors and inner bezels, drawn to your specification.",
    icon: "PencilSimple",
  },
  {
    id: "limited",
    title: "Limited Production",
    body: "A deliberately small annual output, never mass-produced. Each piece is numbered.",
    icon: "Stamp",
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "How long does a bespoke watch take to make?",
    a: "From first sketch to delivery, most commissions take between four and six months. Movement availability and complex engraving can extend that timeline.",
  },
  {
    q: "What is the starting investment?",
    a: "Commissions begin at around AUD 18,000. Your final quote is fixed and agreed before any work begins, with no hidden costs along the way.",
  },
  {
    q: "Can I supply my own reference or sketch?",
    a: "Yes. Bring references, sketches or even an existing watch you want to reimagine. We use them as a starting point, never as a copy.",
  },
  {
    q: "Do you work with clients outside Australia?",
    a: "We ship insured worldwide and run consultations over video for clients in any time zone. Delivery duties are handled before the watch leaves us.",
  },
  {
    q: "Will my watch hold its value?",
    a: "Limited, numbered pieces from a named maker tend to hold value well. We design for a lifetime of wear first, and resale second.",
  },
  {
    q: "What if I want changes after approving the design?",
    a: "One round of design changes is included. Larger revisions after the prototype stage are quoted separately, so you always know the cost up front.",
  },
];

export type Testimonial = {
  name: string;
  role: string;
  location: string;
  quote: string;
  avatarSeed: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Adrien Lacombe",
    role: "Collector",
    location: "Geneva",
    quote:
      "I came in with a vague idea and left with a watch that feels entirely mine. The bronze case has aged beautifully over two years.",
    avatarSeed: "aevum-adrien",
  },
  {
    name: "Tomoko Ishida",
    role: "Architect",
    location: "Kyoto",
    quote:
      "They sketched three dial directions before we settled. Watching the prototype come together was the best part of the whole process.",
    avatarSeed: "aevum-tomoko",
  },
  {
    name: "Sofia Renz",
    role: "Photographer",
    location: "Munich",
    quote:
      "The titanium is so light I forget I am wearing it, yet the watch draws a comment almost every week.",
    avatarSeed: "aevum-sofia",
  },
  {
    name: "Daniel Okafor",
    role: "Surgeon",
    location: "London",
    quote:
      "Every detail, down to the lume colour, was my choice. The service since delivery has been flawless and unhurried.",
    avatarSeed: "aevum-daniel",
  },
];

export type GalleryShot = { seed: string; h: number; alt: string };

// Grayscale, cinematic. picsum is the honest fallback (no image-gen tool here).
export const galleryShots: GalleryShot[] = [
  { seed: "aevum-dial-macro", h: 760, alt: "Macro view of a bespoke watch dial" },
  { seed: "aevum-bronze-case", h: 540, alt: "Bronze watch case under low light" },
  { seed: "aevum-lume-night", h: 800, alt: "Lume glowing on a watch dial at night" },
  { seed: "aevum-craft-bench", h: 560, alt: "A watch on the maker's bench" },
  { seed: "aevum-titanium-edge", h: 700, alt: "Brushed titanium case edge" },
  { seed: "aevum-rotor-gold", h: 580, alt: "Gold rotor visible through a sapphire caseback" },
];

export function galleryUrl(seed: string, h: number, w = 800): string {
  return `https://picsum.photos/seed/${seed}/${w}/${h}?grayscale`;
}
