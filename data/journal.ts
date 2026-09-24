import { salonImages } from "./images";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  content: string[];
}

export type JournalArticle = Article;

export const journalArticles: Article[] = [
  {
    id: "art-1",
    slug: "tackling-pune-hard-water-hair-damage",
    title: "The Silent Culprit: How Pune’s Hard Water Impacts Your Scalp and Hair",
    excerpt: "Why expensive shampoos fail when calcium deposits calcify your hair shaft, and the exact 3-step chelation ritual our colorists swear by.",
    category: "Hair Wellness",
    readTime: "5 min read",
    date: "September 12, 2026",
    author: {
      name: "Meera Joshi",
      role: "Scalp Wellness Lead",
      avatar: salonImages.stylists.meera,
    },
    image: salonImages.interior.washLounge,
    content: [
      "If you moved to Pune or live around Koregaon Park, Baner, or Kalyani Nagar, you've likely noticed your hair gradually becoming stiff, dull, and prone to rapid color fading. The culprit isn't your genetics—it is the heavy mineral concentration (calcium carbonate, magnesium, and iron) present in local groundwater.",
      "When hard water meets ordinary shampoo, it forms an insoluble curd that bonds to keratin scales. Over weeks, this forms a mineral helmet that prevents moisture penetration, turns ash-blonde tones brassy orange, and renders conditioning masks ineffective.",
      "At Aura & Co., we begin every hair spa with a gentle chelating mist that magnetically extracts oxidized copper and calcium ions before applying our Japanese Head Spa thermal waterfall treatment.",
      "At home, we recommend using a filtered shower head and incorporating an apple cider vinegar or salicylic scalp rinse once every ten days.",
    ],
  },
  {
    id: "art-2",
    slug: "french-balayage-vs-traditional-highlights",
    title: "French Balayage vs. Traditional Foil Highlights: Which Matches Indian Hair?",
    excerpt: "Understanding the art of freehand painting on rich dark bases to achieve that effortless, sun-bleached French Riviera glow without harsh root lines.",
    category: "Color Artistry",
    readTime: "6 min read",
    date: "August 28, 2026",
    author: {
      name: "Aarav Kapoor",
      role: "Creative Director",
      avatar: salonImages.stylists.aarav,
    },
    image: salonImages.categories.color,
    content: [
      "Traditional highlights use rigid aluminum foils placed right at the scalp. While this creates intense contrast, on naturally dark brown or jet-black Indian hair, it creates an obvious zebra stripe grow-out after just 4 weeks.",
      "French Balayage, developed in 1970s Paris and refined in our studio, uses freehand brush sweeping on open air or soft thermal cotton. The colorist paints lighter pressure at the roots and concentrates density through the ends.",
      "The result? A soft, candlelit dimension that grows out gracefully for 6 to 9 months without a single harsh demarcation line.",
      "To complement warm Indian skin tones, we favor tones like warm caramel, toasted hazelnut, and deep honey rather than icy platinum, which can wash out olive undertones.",
    ],
  },
  {
    id: "art-3",
    slug: "the-secret-to-humidity-proof-blowout",
    title: "Architecture of an Indestructible 72-Hour Blowout in Tropical Humidity",
    excerpt: "Master the brush tension, ionic heat sequencing, and cool-shot sealing techniques that hold bounce from morning boardroom to evening soiree.",
    category: "Styling Secrets",
    readTime: "4 min read",
    date: "August 14, 2026",
    author: {
      name: "Tanya Sen",
      role: "Blowout Artist",
      avatar: salonImages.stylists.tanya,
    },
    image: salonImages.categories.cuts,
    content: [
      "The downfall of most at-home blowouts is rushing the wet phase. Hair is most fragile when water-logged, and applying direct round-brush tension too early causes stretch damage and immediate frizz once outside.",
      "Rule 1: Rough-dry to 80% dry first using fingers and directional airflow pointing down the cuticle.",
      "Rule 2: Section strictly into 1.5-inch panels. Use a ceramic round brush with boar bristles for natural oil redistribution.",
      "Rule 3: The magic is in the cool shot button! Heat softens the temporary hydrogen bonds; 10 seconds of cold air locks the shape into memory.",
    ],
  },
  {
    id: "art-4",
    slug: "bridal-hair-timeline-guide",
    title: "The Ultimate 6-Month Bridal Hair Preparation Blueprint",
    excerpt: "When to book your trial, schedule color placement, and start scalp detox rituals so your bridal crown is at peak vitality on your big day.",
    category: "Bridal Couture",
    readTime: "7 min read",
    date: "July 30, 2026",
    author: {
      name: "Ananya Deshmukh",
      role: "Bridal Head",
      avatar: salonImages.stylists.ananya,
    },
    image: salonImages.categories.bridal,
    content: [
      "Month 6: Hair Diagnostic & Chemical Pause. Stop all impulsive DIY treatments or aggressive bleaching. Assess scalp health.",
      "Month 4: Cut & Shape Definition. Establish the baseline silhouette. If growing hair out, micro-dust the ends every 8 weeks without sacrificing length.",
      "Month 2: Bridal Trial Session. Bring your actual dupatta, lehenga collar photos, and jewelry. We test the weight distribution and architectural pinning.",
      "2 Weeks Before: Final Gloss & Tone. Refresh the dimensional highlights so they catch the photography lights without looking fresh-dyed.",
      "Day of: Clean, 100% dry hair washed the previous evening with a clarifying shampoo—never heavy conditioners, which cause pins to slip.",
    ],
  },
];
