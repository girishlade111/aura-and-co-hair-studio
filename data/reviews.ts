export interface Review {
  id: string;
  author: string;
  location: string;
  service: string;
  stylist: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  avatarText: string;
}

export const salonReviews: Review[] = [
  {
    id: "rev-1",
    author: "Rhea Singhania",
    location: "Kalyani Nagar, Pune",
    service: "French Balayage & Olaplex",
    stylist: "Aarav Kapoor",
    rating: 5,
    date: "3 days ago",
    comment: "I have had balayage in London and Mumbai, but Aarav's technique at Aura & Co. is unmatched. He studied my olive skin tone and created a custom hazelnut melt that looks so natural people think I was just on vacation. The salon atmosphere feels like a Parisian penthouse.",
    verified: true,
    avatarText: "RS",
  },
  {
    id: "rev-2",
    author: "Dr. Aditya Kulkarni",
    location: "Koregaon Park, Pune",
    service: "Executive Precision Cut & Beard Sculpt",
    stylist: "Rohit Kadam",
    rating: 5,
    date: "1 week ago",
    comment: "Rohit understands male bone structure better than anyone in Maharashtra. The scissor work is surgical. The hot towel and tea-tree steam alone are worth visiting for after a long hospital shift. Immaculate hygiene and espresso.",
    verified: true,
    avatarText: "AK",
  },
  {
    id: "rev-3",
    author: "Pooja Mehta",
    location: "Aundh, Pune",
    service: "Haute Bridal Hair Architecture",
    stylist: "Ananya Deshmukh",
    rating: 5,
    date: "2 weeks ago",
    comment: "Ananya did my sangeet and wedding hairstyles. My heavy 3-kilo dupatta didn't budge even after 6 hours of non-stop dance. She is so calming and graceful in high-stress bridal suites. She is an absolute magician.",
    verified: true,
    avatarText: "PM",
  },
  {
    id: "rev-4",
    author: "Zoya Merchant",
    location: "Viman Nagar, Pune",
    service: "Japanese Head Spa & Scalp Detox",
    stylist: "Meera Joshi",
    rating: 5,
    date: "3 weeks ago",
    comment: "The water fountain head spa is life-changing. Meera showed me my scalp under the micro-camera before and after—the difference in pores and shine is unbelievable. My chronic migraines even felt relieved. 10/10 recommendation.",
    verified: true,
    avatarText: "ZM",
  },
  {
    id: "rev-5",
    author: "Devika Shinde",
    location: "Prabhat Road, Pune",
    service: "Brazilian Liquid Gold Keratin",
    stylist: "Karan Malhotra",
    rating: 5,
    date: "1 month ago",
    comment: "Pune monsoons used to turn my hair into a giant frizz triangle. Karan did the Brazilian Keratin and my hair stays silky, shiny, and straight even when walking in humid rain. Saved 40 minutes every single morning.",
    verified: true,
    avatarText: "DS",
  },
];
