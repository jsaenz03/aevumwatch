// Configurator schema: 14 option groups + a derivation that maps the chosen
// config into the visual parameters the 3D watch scene actually renders.
// Not every option changes geometry; all 14 surface in the live spec readout.

export type ConfigOption = { id: string; label: string };

export type ConfigGroup = {
  id: string;
  label: string;
  icon: string; // Phosphor icon name
  options: ConfigOption[];
};

export const configGroups: ConfigGroup[] = [
  {
    id: "case",
    label: "Case Material",
    icon: "CircleNotch",
    options: [
      { id: "steel", label: "Stainless Steel" },
      { id: "titanium", label: "Titanium" },
      { id: "bronze", label: "Bronze" },
      { id: "carbon", label: "Carbon Fibre" },
      { id: "gold", label: "Gold" },
    ],
  },
  {
    id: "bezel",
    label: "Bezel",
    icon: "CircleDashed",
    options: [
      { id: "polished", label: "Polished" },
      { id: "brushed", label: "Brushed" },
      { id: "fluted", label: "Fluted" },
      { id: "damascus", label: "Damascus" },
      { id: "ceramic", label: "Ceramic" },
    ],
  },
  {
    id: "dial",
    label: "Dial Colour",
    icon: "Palette",
    options: [
      { id: "midnight", label: "Midnight" },
      { id: "anthracite", label: "Anthracite" },
      { id: "champagne", label: "Champagne" },
      { id: "emerald", label: "Emerald" },
      { id: "navy", label: "Navy" },
      { id: "ivory", label: "Ivory" },
    ],
  },
  {
    id: "texture",
    label: "Dial Texture",
    icon: "Sparkle",
    options: [
      { id: "sunburst", label: "Sunburst" },
      { id: "matte", label: "Matte" },
      { id: "guilloche", label: "Guilloche" },
      { id: "skeleton", label: "Skeleton" },
      { id: "mop", label: "Mother-of-Pearl" },
    ],
  },
  {
    id: "indices",
    label: "Indices",
    icon: "DotsThree",
    options: [
      { id: "batons", label: "Batons" },
      { id: "dots", label: "Dots" },
      { id: "roman", label: "Roman" },
      { id: "arabic", label: "Arabic" },
      { id: "sword", label: "Sword" },
    ],
  },
  {
    id: "numerals",
    label: "Numerals",
    icon: "Hash",
    options: [
      { id: "none", label: "None" },
      { id: "quarter", label: "Quarter (12 3 6 9)" },
      { id: "all", label: "All Hours" },
    ],
  },
  {
    id: "hands",
    label: "Hands",
    icon: "Cursor",
    options: [
      { id: "sword", label: "Sword" },
      { id: "dauphine", label: "Dauphine" },
      { id: "leaf", label: "Leaf" },
      { id: "breguet", label: "Breguet" },
      { id: "skeleton", label: "Skeleton" },
    ],
  },
  {
    id: "lume",
    label: "Lume Colour",
    icon: "Lightbulb",
    options: [
      { id: "ice", label: "Ice Blue" },
      { id: "green", label: "Green" },
      { id: "c3", label: "C3" },
      { id: "oldradium", label: "Old Radium" },
      { id: "white", label: "White" },
    ],
  },
  {
    id: "movement",
    label: "Movement",
    icon: "GearFine",
    options: [
      { id: "automatic", label: "Automatic" },
      { id: "manual", label: "Manual Wind" },
      { id: "gmt", label: "GMT" },
      { id: "chronograph", label: "Chronograph" },
    ],
  },
  {
    id: "crystal",
    label: "Crystal",
    icon: "Diamond",
    options: [
      { id: "box", label: "Box Sapphire" },
      { id: "domed", label: "Domed Sapphire" },
      { id: "flat", label: "Flat Sapphire" },
      { id: "ar", label: "AR-Coated" },
    ],
  },
  {
    id: "crown",
    label: "Crown",
    icon: "GearSix",
    options: [
      { id: "signed", label: "Signed" },
      { id: "knurled", label: "Knurled" },
      { id: "onion", label: "Onion" },
      { id: "screendown", label: "Screw-Down" },
    ],
  },
  {
    id: "strap",
    label: "Strap",
    icon: "Link",
    options: [
      { id: "cordovan", label: "Cordovan Leather" },
      { id: "alligator", label: "Alligator" },
      { id: "rubber", label: "Rubber" },
      { id: "bracelet", label: "Steel Bracelet" },
      { id: "nato", label: "Fabric NATO" },
    ],
  },
  {
    id: "buckle",
    label: "Buckle",
    icon: "Lock",
    options: [
      { id: "deployant", label: "Deployant" },
      { id: "tang", label: "Tang" },
      { id: "butterfly", label: "Butterfly" },
    ],
  },
  {
    id: "engraving",
    label: "Engraving",
    icon: "PencilSimple",
    options: [
      { id: "none", label: "None" },
      { id: "caseback", label: "Caseback" },
      { id: "rotor", label: "Rotor" },
      { id: "inner", label: "Inner Bezel" },
    ],
  },
];

export const defaultConfig: Record<string, string> = {
  case: "steel",
  bezel: "polished",
  dial: "midnight",
  texture: "sunburst",
  indices: "batons",
  numerals: "quarter",
  hands: "sword",
  lume: "ice",
  movement: "automatic",
  crystal: "domed",
  crown: "signed",
  strap: "cordovan",
  buckle: "deployant",
  engraving: "caseback",
};

// Visual parameters the R3F scene consumes. The scene lerps toward these so
// changes feel smooth rather than snapping.
export type WatchParams = {
  caseColor: string;
  caseMetalness: number;
  caseRoughness: number;
  bezelColor: string;
  bezelRoughness: number;
  bezelFluted: boolean;
  dialColor: string;
  dialRoughness: number;
  dialEmissive: number;
  lumeColor: string;
  strapColor: string;
  crystalDome: number; // 0 flat .. 1 strong dome
  handStyle: string;
  numeralMode: "none" | "quarter" | "all";
  skeleton: boolean;
  rotorSpeed: number;
};

const caseMap: Record<string, Partial<WatchParams>> = {
  steel: { caseColor: "#c9ccce", caseMetalness: 1, caseRoughness: 0.22 },
  titanium: { caseColor: "#8b9095", caseMetalness: 0.9, caseRoughness: 0.45 },
  bronze: { caseColor: "#b07b3e", caseMetalness: 1, caseRoughness: 0.3 },
  carbon: { caseColor: "#17191c", caseMetalness: 0.25, caseRoughness: 0.7 },
  gold: { caseColor: "#d4af37", caseMetalness: 1, caseRoughness: 0.18 },
};

const bezelMap: Record<string, Partial<WatchParams>> = {
  polished: { bezelColor: "#dfe2e4", bezelRoughness: 0.12, bezelFluted: false },
  brushed: { bezelColor: "#aeb1b4", bezelRoughness: 0.5, bezelFluted: false },
  fluted: { bezelColor: "#e6e8ea", bezelRoughness: 0.25, bezelFluted: true },
  damascus: { bezelColor: "#494c51", bezelRoughness: 0.4, bezelFluted: false },
  ceramic: { bezelColor: "#101113", bezelRoughness: 0.15, bezelFluted: false },
};

const dialMap: Record<string, Partial<WatchParams>> = {
  midnight: { dialColor: "#0a0a0c", dialRoughness: 0.35 },
  anthracite: { dialColor: "#2b2e33", dialRoughness: 0.4 },
  champagne: { dialColor: "#cba45e", dialRoughness: 0.3 },
  emerald: { dialColor: "#0f3d31", dialRoughness: 0.35 },
  navy: { dialColor: "#14233f", dialRoughness: 0.35 },
  ivory: { dialColor: "#ece6d6", dialRoughness: 0.45 },
};

const lumeMap: Record<string, string> = {
  ice: "#9fe8ff",
  green: "#7dff8a",
  c3: "#b5ff5a",
  oldradium: "#d9a441",
  white: "#f2f4f0",
};

const strapMap: Record<string, string> = {
  cordovan: "#5a2722",
  alligator: "#161618",
  rubber: "#0d0d0f",
  bracelet: "#c9ccce",
  nato: "#2a3340",
};

const crystalMap: Record<string, number> = {
  box: 0.7,
  domed: 0.5,
  flat: 0.15,
  ar: 0.45,
};

const rotorMap: Record<string, number> = {
  automatic: 0.6,
  manual: 0,
  gmt: 0.7,
  chronograph: 0.5,
};

export function deriveParams(config: Record<string, string>): WatchParams {
  const c = config.case ?? "steel";
  const casePart = caseMap[c] ?? caseMap.steel;
  // bracelet follows the case metal
  const strapColor =
    (config.strap === "bracelet" ? casePart.caseColor : strapMap[config.strap ?? "cordovan"]) ?? strapMap.cordovan;

  return {
    caseColor: casePart.caseColor!,
    caseMetalness: casePart.caseMetalness!,
    caseRoughness: casePart.caseRoughness!,
    bezelColor: bezelMap[config.bezel ?? "polished"].bezelColor!,
    bezelRoughness: bezelMap[config.bezel ?? "polished"].bezelRoughness!,
    bezelFluted: bezelMap[config.bezel ?? "polished"].bezelFluted!,
    dialColor: dialMap[config.dial ?? "midnight"].dialColor!,
    dialRoughness: dialMap[config.dial ?? "midnight"].dialRoughness!,
    dialEmissive: config.texture === "skeleton" ? 0.0 : 0.05,
    lumeColor: lumeMap[config.lume ?? "ice"],
    strapColor,
    crystalDome: crystalMap[config.crystal ?? "domed"],
    handStyle: config.hands ?? "sword",
    numeralMode: (config.numerals as WatchParams["numeralMode"]) ?? "quarter",
    skeleton: config.texture === "skeleton",
    rotorSpeed: rotorMap[config.movement ?? "automatic"],
  };
}
