import React, { useState } from "react";
import { Star, Sparkles, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight, Instagram } from "lucide-react";
import { salonReviews } from "@/data/reviews";
import { seasonalPromotion } from "@/data/offers";
import { salonImages } from "@/data/images";

interface HomeOffersAndReviewsProps {
  onNavigate: (route: string) => void;
}

export function HomeOffersAndReviews({ onNavigate }: HomeOffersAndReviewsProps) {
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  const prevReview = () => {
    setActiveReviewIdx((prev) => (prev === 0 ? salonReviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setActiveReviewIdx((prev) => (prev === salonReviews.length - 1 ? 0 : prev + 1));
  };

  const currentReview = salonReviews[activeReviewIdx];

  const instagramPosts = [
    { image: salonImages.gallery[0].url, caption: "Sun-drenched Hazelnut Balayage on olive skin tone", likes: "1,240" },
    { image: salonImages.gallery[2].url, caption: "Bridal Mogra & Ambada architecture for our Royal Bride", likes: "2,180" },
    { image: salonImages.gallery[4].url, caption: "Natural curl hydration after our Japanese Head Spa", likes: "980" },
    { image: salonImages.gallery[6].url, caption: "The Italian blunt bob precision cut", likes: "1,450" },
  ];

  return (
    <div className="space-y-24 py-12">
      {/* Seasonal Offer Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#1B1512] via-[#2A1F1A] to-[#1B1512] text-white p-8 sm:p-12 rounded-3xl border border-[#B8935A]/30 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#B8935A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8935A]/20 border border-[#B8935A]/40 text-[#B8935A] text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Seasonal Privileged Offer
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                {seasonalPromotion.title}
              </h3>
              <p className="text-stone-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                {seasonalPromotion.description} Use code <span className="text-[#B8935A] font-mono font-bold bg-white/10 px-2 py-0.5 rounded">{seasonalPromotion.code}</span> at booking.
              </p>
              <div className="flex items-center gap-4 text-xs text-amber-300 font-medium">
                <span>✦ Limited to next {seasonalPromotion.slotsRemaining} clients this month</span>
                <span>✦ Valid until {seasonalPromotion.validUntil}</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => onNavigate("/offers")}
                className="w-full py-3.5 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-xl text-sm font-semibold tracking-wide shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Claim Festive Package</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate("/offers")}
                className="w-full py-3.5 border border-white/20 hover:border-[#B8935A] hover:bg-white/5 text-white rounded-xl text-sm font-semibold transition-all text-center"
              >
                View Glow Memberships
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel (Google Reviews Style) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-3 mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B8935A] font-semibold flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" /> Patron Words
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1B1512] dark:text-[#F6F1EA] tracking-tight">
            Treasured Client Impressions
          </h2>
          <div className="flex items-center justify-center gap-2 text-xs text-stone-500">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-semibold text-stone-800 dark:text-stone-200">4.9 Star Rating</span>
            <span>on Google Maps (Pune)</span>
          </div>
        </div>

        {/* Active Testimonial Card */}
        <div className="relative bg-white dark:bg-[#1A1412] p-8 sm:p-12 rounded-3xl border border-[#B8935A]/25 shadow-xl">
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="font-serif text-lg sm:text-2xl text-stone-800 dark:text-stone-200 italic leading-relaxed">
              "{currentReview.comment}"
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-[#B8935A]/15">
              <div className="w-12 h-12 rounded-full bg-[#B8935A]/20 text-[#B8935A] font-serif font-bold text-lg flex items-center justify-center border border-[#B8935A]/30">
                {currentReview.avatarText}
              </div>
              <div className="text-center sm:text-left">
                <div className="font-semibold text-[#1B1512] dark:text-[#F6F1EA] flex items-center gap-2 justify-center sm:justify-start">
                  <span>{currentReview.author}</span>
                  {currentReview.verified && (
                    <span title="Verified Client">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </span>
                  )}
                </div>
                <div className="text-xs text-stone-500">
                  {currentReview.location} · Styled by <strong className="text-[#B8935A]">{currentReview.stylist}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prevReview}
              className="p-2.5 rounded-full border border-stone-300 dark:border-stone-700 hover:border-[#B8935A] text-stone-600 dark:text-stone-300 transition-colors"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-1.5">
              {salonReviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveReviewIdx(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeReviewIdx === i ? "bg-[#B8935A] w-6" : "bg-stone-300 dark:bg-stone-700"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextReview}
              className="p-2.5 rounded-full border border-stone-300 dark:border-stone-700 hover:border-[#B8935A] text-stone-600 dark:text-stone-300 transition-colors"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Instagram Aesthetic Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#B8935A]/20">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8935A] font-semibold flex items-center gap-2">
              <Instagram className="w-3.5 h-3.5" /> @aurahairstudiopune
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1512] dark:text-[#F6F1EA]">
              Live From the Salon Feed
            </h3>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#B8935A] hover:underline hidden sm:block"
          >
            Follow on Instagram →
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {instagramPosts.map((post, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm cursor-pointer"
            >
              <img
                src={post.image}
                alt="Instagram look"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                <p className="text-xs line-clamp-2 leading-tight">{post.caption}</p>
                <div className="mt-2 text-[11px] text-[#B8935A] font-semibold flex items-center gap-1">
                  <span>♥ {post.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
