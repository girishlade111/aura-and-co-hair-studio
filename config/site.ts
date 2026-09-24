/**
 * Aura & Co. Hair Studio - Brand Configuration
 * Single Source of Truth for branding, hours, contact info, and theme tokens.
 * Re-skinning: Change values here to instantly update the entire studio identity.
 */

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  isOpen: boolean;
  dayIndex: number; // 0 = Sunday, 1 = Monday, etc.
}

export const siteConfig = {
  name: "Aura & Co. Hair Studio",
  shortName: "Aura & Co.",
  tagline: "Where hair becomes art.",
  subTagline: "Bespoke color ateliers, architectural cuts, and luxury scalp wellness in the heart of Koregaon Park.",
  city: "Pune",
  state: "Maharashtra",
  country: "India",
  currency: {
    symbol: "₹",
    code: "INR",
    locale: "en-IN",
  },
  address: {
    street: "Plot 14, Lane 7, Koregaon Park",
    city: "Pune",
    state: "Maharashtra",
    postalCode: "411001",
    country: "India",
    full: "Plot 14, Lane 7, Koregaon Park, Pune, Maharashtra 411001",
    landmark: "Opposite Westin Enclave",
    googleMapsUrl: "https://maps.google.com/?q=Koregaon+Park+Pune",
  },
  contact: {
    phone: "+91 98230 45678",
    phoneDisplay: "+91 98230 45678",
    whatsapp: "919823045678",
    whatsappDefaultMessage: "Hello Aura & Co.! I would like to inquire about booking an appointment.",
    email: "concierge@aurahairstudio.in",
  },
  hours: [
    { day: "Monday", open: "10:00", close: "20:00", isOpen: false, dayIndex: 1 }, // Closed for Masterclasses
    { day: "Tuesday", open: "10:00", close: "20:00", isOpen: true, dayIndex: 2 },
    { day: "Wednesday", open: "10:00", close: "20:00", isOpen: true, dayIndex: 3 },
    { day: "Thursday", open: "10:00", close: "20:00", isOpen: true, dayIndex: 4 },
    { day: "Friday", open: "10:00", close: "20:30", isOpen: true, dayIndex: 5 },
    { day: "Saturday", open: "09:30", close: "21:00", isOpen: true, dayIndex: 6 },
    { day: "Sunday", open: "10:00", close: "20:00", isOpen: true, dayIndex: 0 },
  ] as BusinessHours[],
  socials: {
    instagram: "https://instagram.com/aurahairstudiopune",
    facebook: "https://facebook.com/aurahairstudio",
    pinterest: "https://pinterest.com/aurahairstudio",
    youtube: "https://youtube.com/@aurahairstudio",
  },
  stats: [
    { value: 12, label: "Years of Craft", suffix: "+" },
    { value: 15, label: "Happy Clients", suffix: "k+" },
    { value: 12, label: "Master Stylists", suffix: "" },
    { value: 4.9, label: "Google Rating", suffix: "★" },
  ],
  theme: {
    colors: {
      ivory: "#F6F1EA",
      espresso: "#1B1512",
      champagneGold: "#B8935A",
      champagneHover: "#9E7B45",
      blush: "#E9D5CB",
      sage: "#8A9A86",
      darkBg: "#120E0C",
    },
    fonts: {
      display: "Cormorant Garamond, Georgia, serif",
      body: "Plus Jakarta Sans, sans-serif",
    },
  },
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Stylists", href: "/stylists" },
    { label: "Gallery", href: "/gallery" },
    { label: "Offers & Memberships", href: "/offers" },
    { label: "Style Quiz", href: "/style-quiz" },
    { label: "Shop", href: "/shop" },
    { label: "Journal", href: "/journal" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};
