import { salonImages } from "./images";

export interface Stylist {
  id: string;
  slug: string;
  name: string;
  role: string;
  experience: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  specialties: string[];
  bio: string;
  image: string;
  instagram: string;
  availableDays: number[]; // 0=Sun, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  portfolio: { title: string; image: string }[];
  quotes: string;
}

export const stylists: Stylist[] = [
  {
    id: "stylist-aarav",
    slug: "aarav-kapoor",
    name: "Aarav Kapoor",
    role: "Founder & Creative Director",
    experience: "14+ Years",
    experienceYears: 14,
    rating: 4.98,
    reviewsCount: 380,
    specialties: ["French Balayage", "Bespoke Brunettes", "Runway Styling"],
    bio: "Trained at Vidal Sassoon Academy London and L'Oréal Paris Master Academy. Aarav leads Aura & Co. with an obsession for soft, dimensional color that complements olive and warm Indian undertones.",
    image: salonImages.stylists.aarav,
    instagram: "@aarav.aurahair",
    availableDays: [2, 3, 4, 5, 6, 0],
    portfolio: [
      { title: "French Hazelnut Balayage", image: salonImages.gallery[0].url },
      { title: "Melted Caramel Dimension", image: salonImages.gallery[5].url },
    ],
    quotes: "Hair should flow like silk and illuminate your bone structure, never feel rigid.",
  },
  {
    id: "stylist-ananya",
    slug: "ananya-deshmukh",
    name: "Ananya Deshmukh",
    role: "Head of Bridal & Occasion Hair",
    experience: "10+ Years",
    experienceYears: 10,
    rating: 4.96,
    reviewsCount: 295,
    specialties: ["Royal Indian Bridal Coiffure", "Floral Weaving", "Couture Updos"],
    bio: "Ananya has styled over 400 brides across Pune, Mumbai, and destination palaces in Rajasthan. She is celebrated for weightless updos that hold through hours of ceremonies and dance.",
    image: salonImages.stylists.ananya,
    instagram: "@ananya_bridalhair",
    availableDays: [2, 4, 5, 6, 0],
    portfolio: [
      { title: "Maharashtrian Heritage Ambada", image: salonImages.gallery[2].url },
      { title: "Modern Romantic Waves", image: salonImages.gallery[7].url },
    ],
    quotes: "Every bride deserves hair that captures both ancestral royalty and modern grace.",
  },
  {
    id: "stylist-rohit",
    slug: "rohit-kadam",
    name: "Rohit Kadam",
    role: "Master Precision Cutter & Barber",
    experience: "9+ Years",
    experienceYears: 9,
    rating: 4.94,
    reviewsCount: 220,
    specialties: ["Architectural Bobs", "Dry Scissor Carving", "Executive Men's Grooming"],
    bio: "Obsessed with geometry and bone structure, Rohit crafts cuts that naturally fall into place with almost zero styling effort required at home.",
    image: salonImages.stylists.rohit,
    instagram: "@rohitkadam_cut",
    availableDays: [2, 3, 4, 5, 6],
    portfolio: [
      { title: "Italian Micro Bob", image: salonImages.gallery[6].url },
      { title: "Executive Fade & Beard Sculpt", image: salonImages.gallery[3].url },
    ],
    quotes: "A true precision cut looks even better 3 weeks later as it grows out.",
  },
  {
    id: "stylist-meera",
    slug: "meera-joshi",
    name: "Meera Joshi",
    role: "Curl Architect & Scalp Wellness Lead",
    experience: "8+ Years",
    experienceYears: 8,
    rating: 4.95,
    reviewsCount: 185,
    specialties: ["Type 2-4 Curl Sculpting", "Japanese Head Spa", "Trichology Therapy"],
    bio: "Certified Curly Girl Method stylist and certified scalp therapist. Meera teaches clients how to celebrate their natural Indian waves and curls without heat fatigue.",
    image: salonImages.stylists.meera,
    instagram: "@meeracurls_pune",
    availableDays: [3, 4, 5, 6, 0],
    portfolio: [
      { title: "Botanical Curl Definition", image: salonImages.gallery[4].url },
      { title: "Butterfly Layering on Waves", image: salonImages.gallery[1].url },
    ],
    quotes: "Healthy hair begins with a revitalized, oxygenated scalp.",
  },
  {
    id: "stylist-karan",
    slug: "karan-malhotra",
    name: "Karan Malhotra",
    role: "Senior Colorist & Chemical Specialist",
    experience: "7+ Years",
    experienceYears: 7,
    rating: 4.92,
    reviewsCount: 160,
    specialties: ["Liquid Gold Keratin", "Bleach & Tone", "Grey Camouflage"],
    bio: "Karan is an expert in hair chemistry and humidity protection. He transforms stubborn frizzy textures into mirror-like glass hair with zero thermal stress.",
    image: salonImages.stylists.karan,
    instagram: "@karan_colorcraft",
    availableDays: [2, 3, 5, 6, 0],
    portfolio: [
      { title: "Gloss & Tone Mirror Finish", image: salonImages.gallery[0].url },
      { title: "Dimensional Sun Glow", image: salonImages.gallery[7].url },
    ],
    quotes: "The secret to lasting smoothness is molecular balance, not sheer heat.",
  },
  {
    id: "stylist-tanya",
    slug: "tanya-sen",
    name: "Tanya Sen",
    role: "Restorative Therapist & Blowout Artist",
    experience: "6+ Years",
    experienceYears: 6,
    rating: 4.93,
    reviewsCount: 140,
    specialties: ["Red Carpet Hollywood Blowouts", "Molecular Hair Botox", "Texture Smoothing"],
    bio: "With a background in backstage fashion weeks, Tanya has perfected the art of buoyant, high-volume blowouts that last 3 full days in Pune's climate.",
    image: salonImages.stylists.tanya,
    instagram: "@tanya.blowbar",
    availableDays: [2, 3, 4, 6, 0],
    portfolio: [
      { title: "Voluminous Velvet Layers", image: salonImages.gallery[1].url },
      { title: "High-Gloss Bounce", image: salonImages.gallery[5].url },
    ],
    quotes: "A great blowout is the most immediate boost in personal confidence.",
  },
];

export async function getStylists(): Promise<Stylist[]> {
  await new Promise((res) => setTimeout(res, 60));
  return stylists;
}

export async function getStylistBySlug(slug: string): Promise<Stylist | undefined> {
  await new Promise((res) => setTimeout(res, 50));
  return stylists.find((s) => s.slug === slug || s.id === slug);
}
