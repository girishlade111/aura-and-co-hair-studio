import { salonImages } from "./images";

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number; // in minutes
  description: string;
  image?: string;
  popular?: boolean;
  signature?: boolean;
  idealFor?: string;
}

export const serviceCategories = [
  "All",
  "Cuts & Styling",
  "Color & Balayage",
  "Smoothening & Keratin",
  "Treatments & Spa",
  "Bridal & Occasion",
  "Men's Grooming",
  "Kids",
] as const;

export type ServiceCategory = (typeof serviceCategories)[number];

export const salonServices: ServiceItem[] = [
  // Signature / Cuts
  {
    id: "srv-cut-signature",
    name: "Architectural Couture Haircut & Blowdry",
    category: "Cuts & Styling",
    price: 2450,
    duration: 60,
    description: "Custom diagnostic consultation, relaxing scalp cleanse, precision scissor shaping suited to facial geometry, and silk blowdry.",
    image: salonImages.categories.cuts,
    popular: true,
    signature: true,
    idealFor: "All hair lengths seeking face-framing definition and movement",
  },
  {
    id: "srv-cut-restructure",
    name: "Restyle & Transformation Cut",
    category: "Cuts & Styling",
    price: 3200,
    duration: 75,
    description: "Dramatic length shift, curtain bangs, butterfly layering, or blunt micro-bob with texture softening.",
    image: salonImages.categories.cuts,
    popular: false,
    signature: true,
    idealFor: "Major haircut transitions and trend adaptations",
  },
  {
    id: "srv-blowdry-glam",
    name: "Red Carpet Hollywood Waves / Blowout",
    category: "Cuts & Styling",
    price: 1850,
    duration: 45,
    description: "Luxury shampoo, volume mist infusion, and brush work sculpted into bouncy waves with 48-hour anti-humidity hold.",
    image: salonImages.categories.cuts,
    popular: true,
    signature: false,
    idealFor: "Evenings, formal gatherings, and photoshoots",
  },

  // Color & Balayage
  {
    id: "srv-balayage-french",
    name: "Signature French Freehand Balayage",
    category: "Color & Balayage",
    price: 8500,
    duration: 180,
    description: "Hand-painted sun-kissed gradient seamlessly melted into base roots with Olaplex bond rebuilding and custom gloss toning.",
    image: salonImages.categories.color,
    popular: true,
    signature: true,
    idealFor: "Low-maintenance, dimensional grow-out for Indian dark tones",
  },
  {
    id: "srv-color-global",
    name: "Global Rich Espresso & Mocha Pigment",
    category: "Color & Balayage",
    price: 4900,
    duration: 90,
    description: "Ammonia-free organic oil color delivering intense mirror reflection, grey coverage, and deep hydration.",
    image: salonImages.categories.color,
    popular: true,
    signature: false,
    idealFor: "Uniform pigment depth and radiant shine",
  },
  {
    id: "srv-highlights-babylights",
    name: "Caramel Babylights & Face-Framing Money Piece",
    category: "Color & Balayage",
    price: 6800,
    duration: 150,
    description: "Micro-fine foils around hairline and crown for immediate illuminated framing and youthful dimension.",
    image: salonImages.categories.color,
    popular: false,
    signature: true,
    idealFor: "Subtle glow around the face without full commitment",
  },
  {
    id: "srv-color-gloss",
    name: "Cellophane Acidic Gloss & Tone Refresh",
    category: "Color & Balayage",
    price: 2800,
    duration: 45,
    description: "Neutralizes brassy tones, seals the cuticle, and locks in brilliant glass-like shine for up to 6 weeks.",
    image: salonImages.categories.color,
    popular: false,
    signature: false,
    idealFor: "Refreshing faded highlights or adding mirror shine",
  },

  // Smoothening & Keratin
  {
    id: "srv-keratin-brazilian",
    name: "Brazilian Liquid Gold Keratin Infusion",
    category: "Smoothening & Keratin",
    price: 7900,
    duration: 150,
    description: "Eliminates 95% of frizz, enhances humidity resistance, cuts blowdry time by half, leaving hair silky and resilient.",
    image: salonImages.categories.keratin,
    popular: true,
    signature: true,
    idealFor: "Frizzy, porous, unmanageable textures in Pune weather",
  },
  {
    id: "srv-botox-hair",
    name: "Caviar & Hyaluronic Hair Botox Therapy",
    category: "Smoothening & Keratin",
    price: 6500,
    duration: 120,
    description: "Deep restorative non-chemical plumping filler that repairs split fibers, strengthens cortex, and restores elasticity.",
    image: salonImages.categories.keratin,
    popular: true,
    signature: false,
    idealFor: "Chemically stressed, fine, or heat-damaged tresses",
  },
  {
    id: "srv-cysteine-natural",
    name: "Bio-Cysteine Silk Smooth Treatment",
    category: "Smoothening & Keratin",
    price: 7200,
    duration: 140,
    description: "Formaldehyde-free organic amino acid system that softens curls into smooth manageable waves with zero damage.",
    image: salonImages.categories.keratin,
    popular: false,
    signature: false,
    idealFor: "Natural curl preservation with frizz elimination",
  },

  // Treatments & Spa
  {
    id: "srv-spa-scalp-detox",
    name: "Japanese Head Spa & Scalp Detox Ritual",
    category: "Treatments & Spa",
    price: 3400,
    duration: 60,
    description: "Micro-camera scalp analysis, purifying volcanic clay scrub, waterfall fountain hydrotherapy, and acupressure neck massage.",
    image: salonImages.categories.spa,
    popular: true,
    signature: true,
    idealFor: "Scalp irritation, hair fall prevention, deep stress relief",
  },
  {
    id: "srv-olaplex-repair",
    name: "Olaplex Stand-Alone Molecular Rebuilding",
    category: "Treatments & Spa",
    price: 2900,
    duration: 45,
    description: "Two-step patented bis-aminopropyl diglycol dimaleate service that repairs broken disulfide bonds at a cellular level.",
    image: salonImages.categories.spa,
    popular: false,
    signature: false,
    idealFor: "Pre-coloring prep or bleached hair reconstruction",
  },
  {
    id: "srv-kerastase-fusio",
    name: "Kérastase Fusio-Dose Custom Elixir Injection",
    category: "Treatments & Spa",
    price: 2200,
    duration: 35,
    description: "Concentrated active boosters tailored precisely for nutrition, color radiance, fiber density, or anti-breakage.",
    image: salonImages.categories.spa,
    popular: true,
    signature: false,
    idealFor: "Instant targeted transformation in under 40 minutes",
  },

  // Bridal & Occasion
  {
    id: "srv-bridal-couture",
    name: "Haute Bridal Hair Architecture (With Trial)",
    category: "Bridal & Occasion",
    price: 14500,
    duration: 180,
    description: "Full bridal consultation, preliminary trial session, real-day floral pinning, dupatta draping support, and 12-hour setting spray.",
    image: salonImages.categories.bridal,
    popular: true,
    signature: true,
    idealFor: "Brides seeking royal Maharashtrian, North Indian, or Western bridal elegance",
  },
  {
    id: "srv-sangeet-cocktail",
    name: "Sangeet & Cocktail Textured Updo / Half-Ties",
    category: "Bridal & Occasion",
    price: 4500,
    duration: 75,
    description: "Intricate textured braiding, pearl placement, or cascading textured waves built for celebration.",
    image: salonImages.categories.bridal,
    popular: true,
    signature: false,
    idealFor: "Bridesmaids, family, and cocktail party glamour",
  },

  // Men's Grooming
  {
    id: "srv-men-executive",
    name: "Executive Precision Cut & Scalp Invigoration",
    category: "Men's Grooming",
    price: 1400,
    duration: 45,
    description: "Scissor-over-comb bespoke fade, cooling tea-tree scalp rinse, hot towel finish, and matte clay styling.",
    image: salonImages.categories.mens,
    popular: true,
    signature: false,
    idealFor: "Modern gentleman seeking refined corporate or creative styling",
  },
  {
    id: "srv-men-beard-spa",
    name: "Artisanal Beard Sculpting & Steam Treatment",
    category: "Men's Grooming",
    price: 950,
    duration: 30,
    description: "Razor outline shaping, botanical oil hot steam bath, high-frequency ozone therapy, and cedarwood balm finish.",
    image: salonImages.categories.mens,
    popular: false,
    signature: false,
    idealFor: "Sharp beard contours and skin nourishment beneath stubble",
  },
  {
    id: "srv-men-camo-color",
    name: "Discrete 10-Minute Grey Camouflage Color",
    category: "Men's Grooming",
    price: 1800,
    duration: 30,
    description: "Naturally blends grey hair without any red undertone or harsh grow-out line.",
    image: salonImages.categories.mens,
    popular: false,
    signature: false,
    idealFor: "Subtle, unnoticeable pepper-salt balancing",
  },

  // Kids
  {
    id: "srv-kids-junior",
    name: "Junior Couture Cut (Ages 3-12)",
    category: "Kids",
    price: 950,
    duration: 35,
    description: "Patient, fun, and gentle haircut with natural organic spray finish and complimentary organic juice treat.",
    image: salonImages.categories.cuts,
    popular: false,
    signature: false,
    idealFor: "Young fashionistas and gentle grooming",
  },
];

// Async mock API for backend abstraction
export async function getServices(category?: string): Promise<ServiceItem[]> {
  await new Promise((res) => setTimeout(res, 80));
  if (!category || category === "All") return salonServices;
  return salonServices.filter((s) => s.category === category);
}

export async function getServiceById(id: string): Promise<ServiceItem | undefined> {
  await new Promise((res) => setTimeout(res, 50));
  return salonServices.find((s) => s.id === id);
}
