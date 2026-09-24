import React, { useState } from "react";
import { Sparkles, ArrowRight, ChevronDown, Calendar, HelpCircle, Shield, Award } from "lucide-react";
import { salonFAQs } from "@/data/faq";

interface HomeQuizAndFaqProps {
  onNavigate: (route: string) => void;
}

export function HomeQuizAndFaq({ onNavigate }: HomeQuizAndFaqProps) {
  const [openFaqId, setOpenFaqId] = useState<string>(salonFAQs[0].id);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? "" : id);
  };

  return (
    <div className="space-y-24 py-12">
      {/* Dual Banner: Style Quiz & Glow Membership */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Style Quiz Card */}
          <div className="bg-[#E9D5CB]/40 dark:bg-white/5 p-8 sm:p-10 rounded-3xl border border-[#B8935A]/30 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs uppercase font-semibold tracking-wider text-[#B8935A] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> 60-Second Diagnostic
              </span>
              <h3 className="font-serif text-3xl font-bold text-[#1B1512] dark:text-[#F6F1EA]">
                Unsure Which Atelier Service You Need?
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                Take our tailored 5-question Hair Quiz. We analyze your curl pattern, hard-water exposure, daily styling time, and budget to pair you with the ideal treatment and stylist.
              </p>
            </div>
            <div>
              <button
                onClick={() => onNavigate("/style-quiz")}
                className="px-6 py-3.5 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-xl text-xs font-semibold tracking-wide shadow-md transition-all flex items-center gap-2"
              >
                <span>Take the Hair Style Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Glow Membership Card */}
          <div className="bg-[#1B1512] text-white p-8 sm:p-10 rounded-3xl border border-[#B8935A]/30 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs uppercase font-semibold tracking-wider text-[#B8935A] flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" /> Bespoke Concierge Privileges
              </span>
              <h3 className="font-serif text-3xl font-bold text-white">
                The Aura Glow Membership
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Enjoy unlimited luxury blowouts, monthly precision shaping, and priority weekend reservations with our Silk Circle and Gold Atelier club tiers.
              </p>
            </div>
            <div>
              <button
                onClick={() => onNavigate("/offers")}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-[#F6F1EA] border border-white/20 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-2"
              >
                <span>Explore Membership Tiers</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B8935A] font-semibold flex items-center justify-center gap-2">
            <HelpCircle className="w-3.5 h-3.5" /> Clarity & Guidance
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1B1512] dark:text-[#F6F1EA] tracking-tight">
            Frequently Addressed Inquiries
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-lg mx-auto">
            Everything you need to know before visiting our Koregaon Park studio chairs.
          </p>
        </div>

        <div className="space-y-3">
          {salonFAQs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white dark:bg-[#1A1412] rounded-2xl border border-[#B8935A]/20 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-serif text-base sm:text-lg font-semibold text-[#1B1512] dark:text-[#F6F1EA]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#B8935A] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed border-t border-[#B8935A]/10 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Big Final Booking CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-[#1B1512] text-white p-10 sm:p-16 lg:p-20 rounded-3xl border border-[#B8935A]/30 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#B8935A]/20 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-[#B8935A] font-semibold">
              Koregaon Park · Pune
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              Ready to experience hair as art?
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              Reserve your personalized consultation with our creative directors. Walk into tranquility; step out with luminous confidence.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                id="final-book-cta-btn"
                onClick={() => onNavigate("/book")}
                className="w-full sm:w-auto px-10 py-4 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-2xl text-sm sm:text-base font-semibold tracking-wide shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Your Chair Now</span>
              </button>
              <button
                onClick={() => onNavigate("/contact")}
                className="w-full sm:w-auto px-8 py-4 border border-white/20 hover:border-[#B8935A] text-white rounded-2xl text-sm sm:text-base font-medium transition-all"
              >
                Studio Hours & Map
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
