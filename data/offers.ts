export interface PackageOffer {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  code: string;
  price: number;
  originalPrice: number;
  savings: number;
  target: "Bride" | "Groom" | "Couples" | "Festive";
  sessionsCount: number;
  features: string[];
  includes: string[];
  recommendedTime: string;
  popular?: boolean;
}

export const packagesOffers: PackageOffer[] = [
  {
    id: "pkg-royal-bride",
    title: "The Maharani Imperial Bridal Suite",
    subtitle: "End-to-end couture hair transformation for pre-wedding, sangeet, and the wedding day.",
    description: "End-to-end couture hair transformation for pre-wedding, sangeet, and the wedding day.",
    tag: "Haute Bride",
    code: "ROYALBRIDE",
    price: 32000,
    originalPrice: 42000,
    savings: 10000,
    target: "Bride",
    sessionsCount: 5,
    features: [
      "In-depth hair diagnostic & customized color contouring (2 weeks prior)",
      "Olaplex bond repair + Japanese Head Spa session",
      "Full hair trial with veil & floral drape architecture",
      "Wedding day royal hair styling with real flowers & luxury pins",
      "Reception look restyle with 12-hour high-humidity hold guarantee",
      "Complimentary Aura 24k Silk Elixir gift set",
    ],
    includes: [
      "In-depth hair diagnostic & color contouring (2 weeks prior)",
      "Olaplex bond repair + Japanese Head Spa session",
      "Full hair trial with veil & floral drape architecture",
      "Wedding day royal hair styling with real fresh flowers",
      "Reception look restyle with 12-hour hold guarantee",
      "Complimentary Aura 24k Silk Elixir gift set",
    ],
    recommendedTime: "Book 4 to 8 weeks before wedding",
    popular: true,
  },
  {
    id: "pkg-groom-royal",
    title: "The Sovereign Groom's Atelier",
    subtitle: "Crisp architectural grooming tailored for the royal wedding calendar.",
    description: "Crisp architectural grooming tailored for the royal wedding calendar.",
    tag: "Royal Groom",
    code: "SOVEREIGN",
    price: 11500,
    originalPrice: 15500,
    savings: 4000,
    target: "Groom",
    sessionsCount: 3,
    features: [
      "Consultation & bespoke hair sculpt (2 weeks before)",
      "Artisanal beard shaping & ozone steam treatment",
      "Japanese Head Spa & de-stressing neck acupressure",
      "Wedding day high-precision perimeter clean up & matte texturizing",
      "Safa / Turban hair setting prep",
    ],
    includes: [
      "Consultation & bespoke hair sculpt (2 weeks before)",
      "Artisanal beard shaping & ozone steam treatment",
      "Japanese Head Spa & de-stressing neck acupressure",
      "Wedding day precision clean up & matte texturizing",
      "Safa / Turban hair setting prep",
    ],
    recommendedTime: "Book 2 to 3 weeks before wedding",
  },
  {
    id: "pkg-festive-glow",
    title: "Festive Radiance Balayage & Gloss Package",
    subtitle: "Complete hair reset for upcoming weddings, Diwali, and celebrations.",
    description: "Complete hair reset for upcoming weddings, Diwali, and celebrations.",
    tag: "Festive Edition",
    code: "FESTIVEGLOW",
    price: 11900,
    originalPrice: 15800,
    savings: 3900,
    target: "Festive",
    sessionsCount: 1,
    features: [
      "French Freehand Balayage or Global Dimension Color",
      "Olaplex Stand-Alone Molecular Rebuilding",
      "Couture Haircut & Layering by Senior Stylist",
      "Cellophane Gloss Toning & Silk Blowout",
    ],
    includes: [
      "French Freehand Balayage or Global Dimension Color",
      "Olaplex Stand-Alone Molecular Rebuilding",
      "Couture Haircut & Layering by Senior Stylist",
      "Cellophane Gloss Toning & Silk Blowout",
    ],
    recommendedTime: "Available for limited slots each week",
    popular: true,
  },
];

export const salonOffers = packagesOffers;

export interface MembershipTier {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  priceMonthly: number;
  priceYearly: number;
  tagline: string;
  perks: string[];
  benefits: string[];
  popular?: boolean;
}

export const membershipTiers: MembershipTier[] = [
  {
    id: "tier-silk",
    name: "The Silk Circle",
    monthlyPrice: 2999,
    yearlyPrice: 29990,
    priceMonthly: 2999,
    priceYearly: 29990,
    tagline: "Essential monthly hair wellness & pristine styling.",
    perks: [
      "1 Precision Haircut & Silk Blowdry per month",
      "1 Complimentary Japanese Head Spa session per quarter",
      "10% off all retail haircare products",
      "Priority weekend booking slots",
      "Complimentary specialty coffees & herbal infusions",
    ],
    benefits: [
      "1 Precision Haircut & Silk Blowdry per month",
      "1 Complimentary Japanese Head Spa session per quarter",
      "10% off all retail haircare products",
      "Priority weekend booking slots",
      "Complimentary specialty coffees & herbal infusions",
    ],
  },
  {
    id: "tier-gold",
    name: "The Aura Gold Atelier",
    monthlyPrice: 6499,
    yearlyPrice: 64990,
    priceMonthly: 6499,
    priceYearly: 64990,
    tagline: "For color connoisseurs and regular luxury salon patrons.",
    perks: [
      "Unlimited Couture Blowouts & styling sessions",
      "1 Haircut & 1 Japanese Head Spa every month",
      "1 Complimentary Global Gloss / Tone refresh every 60 days",
      "20% off all chemical services & Balayage",
      "15% off all retail haircare products",
      "Companion pass (Bring a friend for 25% off)",
      "Dedicated senior stylist reservation guarantee",
    ],
    benefits: [
      "Unlimited Couture Blowouts & styling sessions",
      "1 Haircut & 1 Japanese Head Spa every month",
      "1 Complimentary Global Gloss / Tone refresh every 60 days",
      "20% off all chemical services & Balayage",
      "15% off all retail haircare products",
      "Companion pass (Bring a friend for 25% off)",
      "Dedicated senior stylist reservation guarantee",
    ],
    popular: true,
  },
  {
    id: "tier-couture",
    name: "Couture Haute Privé",
    monthlyPrice: 12999,
    yearlyPrice: 129990,
    priceMonthly: 12999,
    priceYearly: 129990,
    tagline: "Unrestricted, VIP master atelier access for you and your family.",
    perks: [
      "Everything in Gold Atelier with no service caps",
      "Creative Director Aarav Kapoor styling access guarantee",
      "Complimentary Olaplex treatment with every single salon visit",
      "Private VIP Suite reservation with privacy curtain",
      "Quarterly curated luxury product gift box (worth ₹7,500)",
      "Home styling concierge for urgent VIP events within Pune",
    ],
    benefits: [
      "Everything in Gold Atelier with no service caps",
      "Creative Director Aarav Kapoor styling access guarantee",
      "Complimentary Olaplex treatment with every single salon visit",
      "Private VIP Suite reservation with privacy curtain",
      "Quarterly curated luxury product gift box (worth ₹7,500)",
      "Home styling concierge for urgent VIP events within Pune",
    ],
  },
];

export const seasonalPromotion = {
  tag: "Seasonal Privileged Offer",
  title: "Festive & Monsoon Glow Indulgence",
  discountPercent: "25% OFF",
  description: "Book any Balayage or Brazilian Liquid Gold Keratin and receive a complimentary Olaplex Bond Reconstruction & Japanese Scalp Detox Ritual (valued at ₹4,800).",
  code: "AURA25FESTIVE",
  validUntil: "October 31, 2026",
  slotsRemaining: 7,
};

export interface GiftCardOption {
  amount: number;
  label: string;
}
