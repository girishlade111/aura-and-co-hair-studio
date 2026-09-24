import { salonImages } from "./images";

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: "Color" | "Cuts" | "Bridal" | "Men" | "Curls";
  stylist: string;
  duration?: string;
  formula?: string;
}

export const galleryCategories = ["All", "Color", "Cuts", "Bridal", "Men", "Curls"] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    url: salonImages.gallery[0].url,
    title: "French Balayage & Silk Finish",
    category: "Color",
    stylist: "Aarav Kapoor",
    duration: "3.5 hrs",
    formula: "Freehand clay lightener + 09GI Moroccan Sand gloss toner",
  },
  {
    id: "gal-2",
    url: salonImages.gallery[1].url,
    title: "Precision Butterfly Cut with Weightless Layers",
    category: "Cuts",
    stylist: "Meera Joshi",
    duration: "1 hr 15 mins",
    formula: "Custom interior texturizing with feather razor finish",
  },
  {
    id: "gal-3",
    url: salonImages.gallery[2].url,
    title: "Heritage Royal Bridal Coiffure & Mogra Drape",
    category: "Bridal",
    stylist: "Ananya Deshmukh",
    duration: "3 hrs",
    formula: "Architectural base padding, fresh jasmine weaving, matte hold",
  },
  {
    id: "gal-4",
    url: salonImages.gallery[3].url,
    title: "Executive Taper & Artisanal Beard Sculpt",
    category: "Men",
    stylist: "Rohit Kadam",
    duration: "50 mins",
    formula: "Foil low fade + botanical tea tree hot towel massage",
  },
  {
    id: "gal-5",
    url: salonImages.gallery[4].url,
    title: "Botanical Curl Definition & Hydration Ringlets",
    category: "Curls",
    stylist: "Meera Joshi",
    duration: "1.5 hrs",
    formula: "Flaxseed curl jelly + micro-mist diffuser bounce set",
  },
  {
    id: "gal-6",
    url: salonImages.gallery[5].url,
    title: "Hazelnut Honey Dimensional Melt",
    category: "Color",
    stylist: "Aarav Kapoor",
    duration: "3 hrs",
    formula: "Root melt with chocolate mocha + champagne ends",
  },
  {
    id: "gal-7",
    url: salonImages.gallery[6].url,
    title: "Architectural Italian Bob with Curtain Micro-Fringe",
    category: "Cuts",
    stylist: "Rohit Kadam",
    duration: "1 hr",
    formula: "Blunt perimeter cut dry with precision beveling",
  },
  {
    id: "gal-8",
    url: salonImages.gallery[7].url,
    title: "Golden Hour Waves & Velvet Texture",
    category: "Color",
    stylist: "Karan Malhotra",
    duration: "2.5 hrs",
    formula: "High-lift ammonia free balayage + Caviar gloss boost",
  },
];

export const beforeAfterPairs = [
  {
    id: "ba-1",
    title: "Brassy High-Porous Hair to Liquid Hazelnut Balayage",
    stylist: "Aarav Kapoor",
    before: salonImages.beforeAfter.before1,
    after: salonImages.beforeAfter.after1,
    description: "Neutralized 6 months of uneven brass into a creamy sun-kissed gradient with Olaplex bond repair.",
    stats: { damageReduction: "85%", glossBoost: "3x" },
  },
  {
    id: "ba-2",
    title: "Heavy Lifeless Strands to Voluminous Layered Silk Cut",
    stylist: "Meera Joshi",
    before: salonImages.beforeAfter.before2,
    after: salonImages.beforeAfter.after2,
    description: "Removed bulk and density while preserving length, framing cheekbones with customized butterfly layers.",
    stats: { bounceIncrease: "100%", blowdryTime: "-50%" },
  },
];
