export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "Booking" | "Color" | "Care" | "Bridal";
}

export const salonFAQs: FAQItem[] = [
  {
    id: "faq-1",
    question: "How far in advance should I book my appointment?",
    answer: "For signature services like French Balayage and Japanese Head Spa, we recommend reserving 3 to 7 days in advance. Weekend slots fill up fastest. For bridal and occasion couture, we suggest reaching out 2 to 3 months ahead.",
    category: "Booking",
  },
  {
    id: "faq-2",
    question: "Will French Balayage damage my dark hair?",
    answer: "No. We integrate genuine Olaplex bond rebuilders directly into our freehand lighteners. Furthermore, because we do not force the hair into stark platinum and instead enhance warm undertones (caramel, mocha, golden amber), your hair cuticle retains elasticity and moisture.",
    category: "Color",
  },
  {
    id: "faq-3",
    question: "What is included in the Japanese Head Spa ritual?",
    answer: "Our Head Spa features a trichological scalp camera diagnostic, exfoliating Himalayan botanical scrub, heated aromatic steam, an arching water fountain hydrotherapy loop, and 20 minutes of cranial acupressure and shoulder release.",
    category: "Care",
  },
  {
    id: "faq-4",
    question: "Can I bring my bridal jewelry and dupatta to the trial?",
    answer: "Yes, in fact we encourage it! Having your actual veil, maang tikka, matha patti, and heavy dupatta allows Ananya to test structural weight balance, hair padding, and pin anchor points so you feel zero scalp strain on your wedding day.",
    category: "Bridal",
  },
  {
    id: "faq-5",
    question: "What is your cancellation and rescheduling policy?",
    answer: "We understand unexpected schedule shifts occur. We respectfully request at least 24 hours' notice for cancellations or rescheduling so we may accommodate clients on our standby waitlist.",
    category: "Booking",
  },
  {
    id: "faq-6",
    question: "Are your products cruelty-free and organic?",
    answer: "All in-salon backbar treatments (Davines, Kérastase, Olaplex, and our bespoke Aura 24k elixirs) adhere to international safety standards, zero harsh formaldehydes, and cruelty-free development.",
    category: "Care",
  },
];
