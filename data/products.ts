import { salonImages } from "./images";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: "Elixir & Oil" | "Mask & Treatment" | "Shampoo" | "Styling";
  rating: number;
  reviewsCount: number;
  size: string;
  tagline: string;
  description: string;
  benefits: string[];
  howToUse: string;
  inStock: boolean;
  image: string;
  badge?: string;
}

export type ProductItem = Product;

export const salonProducts: Product[] = [
  {
    id: "prod-aura-elixir",
    name: "Aura 24k Botanical Hair Silk Elixir",
    brand: "Aura & Co. Bespoke Labs",
    price: 2850,
    originalPrice: 3200,
    category: "Elixir & Oil",
    rating: 4.96,
    reviewsCount: 88,
    size: "50 ml",
    tagline: "Liquid gold dry oil for instant mirror reflection and split-end repair.",
    description: "Infused with cold-pressed Kashmiri walnut oil, argan extract, and botanical squalane. Weightless formula absorbs instantaneously without greasy residue.",
    benefits: ["Heat protection up to 230°C", "Seals cuticles against humidity", "Zero weight or buildup"],
    howToUse: "Warm 2 drops between palms and sweep through towel-dried mid-lengths to ends.",
    inStock: true,
    image: salonImages.products.elixir,
    badge: "Bestseller",
  },
  {
    id: "prod-kerastase-chronologiste",
    name: "Kérastase Chronologiste Masque Intense",
    brand: "Kérastase Paris",
    price: 4600,
    category: "Mask & Treatment",
    rating: 4.92,
    reviewsCount: 114,
    size: "200 ml",
    tagline: "The pinnacle of hair regeneration and youth restoration.",
    description: "Formulated with Abyssine molecule, Hyaluronic Acid, and Vitamin E to deeply hydrate, revitalize the scalp fiber, and restore youthful elasticity.",
    benefits: ["4x more fiber bounce", "Anti-frizz 48-hour humidity protection", "Sensorial fine fragrance notes"],
    howToUse: "Apply to washed, towel-dried hair from roots to ends. Leave for 5-10 minutes. Rinse thoroughly.",
    inStock: true,
    image: salonImages.products.mask,
    badge: "Luxury Favorite",
  },
  {
    id: "prod-olaplex-no3",
    name: "Olaplex No. 3 Hair Perfector",
    brand: "Olaplex",
    price: 3100,
    category: "Mask & Treatment",
    rating: 4.89,
    reviewsCount: 240,
    size: "100 ml",
    tagline: "Global #1 bond repair at-home maintenance.",
    description: "Relinks broken disulfide bonds caused by heat styling, environmental stress, and chemical lightning.",
    benefits: ["Repairs damaged hair strands", "Improves hair texture and structural integrity", "Color-safe & sulfate-free"],
    howToUse: "Dampen hair, apply generously from roots to tips, leave on for at least 15 minutes before shampooing.",
    inStock: true,
    image: salonImages.products.serum,
  },
  {
    id: "prod-davines-oi-shampoo",
    name: "Davines OI Absolute Beautifying Shampoo",
    brand: "Davines",
    price: 2450,
    category: "Shampoo",
    rating: 4.91,
    reviewsCount: 92,
    size: "280 ml",
    tagline: "Roucou oil infusion for extreme softness and shine.",
    description: "Delicate and creamy formula providing long-lasting perfume, antioxidant defense, and silk smoothness for all textures.",
    benefits: ["Gentle sulfate-free cleansing", "Prevents hair aging and dryness", "Luxurious amber scent"],
    howToUse: "Gently massage into damp hair and scalp, lather and rinse thoroughly. Repeat if desired.",
    inStock: true,
    image: salonImages.products.shampoo,
  },
  {
    id: "prod-moroccanoil-mist",
    name: "Moroccanoil Glimmer Shine Finishing Mist",
    brand: "Moroccanoil",
    price: 2200,
    category: "Styling",
    rating: 4.87,
    reviewsCount: 65,
    size: "100 ml",
    tagline: "Pure radiance veil that catches and reflects ambient light.",
    description: "An invisible veil of pure, luminous shine infused with argan oil, vitamins, and wheat germ oil that shields against environmental dust.",
    benefits: ["Enhances color vibrancy", "Protects against UV and pollution", "Static electricity control"],
    howToUse: "Spray approximately 10 inches away from dry styled hair as the finishing touch.",
    inStock: true,
    image: salonImages.products.mist,
  },
  {
    id: "prod-aura-scalp-scrub",
    name: "Aura Rosemary & Himalayan Pink Salt Scalp Scrub",
    brand: "Aura & Co. Bespoke Labs",
    price: 1950,
    category: "Mask & Treatment",
    rating: 4.94,
    reviewsCount: 78,
    size: "200 g",
    tagline: "Gentle physical and enzymatic scalp exfoliation.",
    description: "Clears buildup from hard Pune water, pollution, and dry shampoos while stimulating microcirculation to hair follicles with organic rosemary oil.",
    benefits: ["Detoxifies congested roots", "Fosters optimal follicular growth", "Cooling peppermint sensation"],
    howToUse: "Part wet hair in sections, massage paste into roots with fingertips, work into rich foam and rinse.",
    inStock: true,
    image: salonImages.products.scrub,
    badge: "Exclusive",
  },
  {
    id: "prod-kerastase-thermique",
    name: "Kérastase Nectar Thermique Blow-Dry Milk",
    brand: "Kérastase Paris",
    price: 3600,
    category: "Styling",
    rating: 4.93,
    reviewsCount: 102,
    size: "150 ml",
    tagline: "Nourishing leave-in heat protector for rough, dry lengths.",
    description: "Enriched with iris royal extract to coat hair in a light protective film, preventing heat damage up to 230°C and sealing rough ends.",
    benefits: ["Cuts styling time in half", "Instant velvet touch", "Anti-roughness coating"],
    howToUse: "Apply chestnut-sized amount onto clean towel-dried hair, comb through, and blow-dry.",
    inStock: true,
    image: salonImages.products.elixir,
  },
  {
    id: "prod-olaplex-no7",
    name: "Olaplex No. 7 Bonding Oil",
    brand: "Olaplex",
    price: 3100,
    category: "Elixir & Oil",
    rating: 4.9,
    reviewsCount: 156,
    size: "30 ml",
    tagline: "Highly-concentrated, weightless reparative styling oil.",
    description: "Dramatically increases shine, softness, and color vibrancy while minimizing flyaways and offering heat protection.",
    benefits: ["Ultra-lightweight feel", "UV protection", "Non-sticky formula"],
    howToUse: "Turn bottle upside down and gently tap bottom with index finger to dispense metered drop.",
    inStock: true,
    image: salonImages.products.serum,
  },
];
