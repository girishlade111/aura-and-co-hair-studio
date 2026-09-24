import React, { useState } from "react";
import { Sparkles, ArrowRight, ArrowLeft, Check, RefreshCw, Scissors, User, Calendar } from "lucide-react";
import { salonServices, ServiceItem } from "@/data/services";
import { stylists, Stylist } from "@/data/stylists";
import { formatCurrency } from "@/lib/utils";
import { useAppStore } from "@/store/useBookingStore";

interface StyleQuizPageProps {
  onNavigate: (route: string) => void;
}

interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: { label: string; desc: string; serviceMatch: string; stylistMatch: string }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "How would you describe your natural hair texture?",
    subtitle: "Understanding your starting canvas helps determine moisture and cutting discipline.",
    options: [
      { label: "Straight / Fine", desc: "Prone to falling flat, requires architectural weight", serviceMatch: "srv-cut-couture", stylistMatch: "st-rohan" },
      { label: "Wavy / Textured", desc: "Needs defined movement without frizz in Pune humidity", serviceMatch: "srv-color-balayage", stylistMatch: "st-ananya" },
      { label: "Curly / Coily", desc: "Craves intense moisture and curl-by-curl shaping", serviceMatch: "srv-treat-spa", stylistMatch: "st-meera" },
      { label: "Chemically Treated / Colored", desc: "Shows prior bleaching or smoothing history", serviceMatch: "srv-treat-olaplex", stylistMatch: "st-ananya" },
    ],
  },
  {
    id: 2,
    question: "What is your primary hair transformation ambition?",
    subtitle: "What feeling do you want to embody when looking in the mirror?",
    options: [
      { label: "Sun-Kissed Dimensional Color", desc: "Seamless balayage that grows out with zero harsh roots", serviceMatch: "srv-color-balayage", stylistMatch: "st-ananya" },
      { label: "Frizz-Free Glass Sleekness", desc: "Effortless air-dry finish that withstands Pune weather", serviceMatch: "srv-smooth-keratin", stylistMatch: "st-vikram" },
      { label: "A Couture Silhouette Overhaul", desc: "A face-framing, confident French or Italian cut", serviceMatch: "srv-cut-couture", stylistMatch: "st-rohan" },
      { label: "Deep Scalp & Follicle Detox", desc: "Relief from hard-water buildup and hair loss stress", serviceMatch: "srv-treat-spa", stylistMatch: "st-meera" },
    ],
  },
  {
    id: 3,
    question: "How much daily morning styling time do you prefer?",
    subtitle: "Be honest — we formulate cuts that align with your lifestyle, not fantasy.",
    options: [
      { label: "Under 5 Minutes", desc: "Wash-and-go with zero hot tools", serviceMatch: "srv-cut-couture", stylistMatch: "st-rohan" },
      { label: "10 – 15 Minutes", desc: "Quick blow-dry with styling cream or oil", serviceMatch: "srv-smooth-keratin", stylistMatch: "st-vikram" },
      { label: "20+ Minutes", desc: "I enjoy styling with curlers or Dyson Airwrap", serviceMatch: "srv-color-balayage", stylistMatch: "st-ananya" },
    ],
  },
  {
    id: 4,
    question: "How often do you like to revisit the salon for maintenance?",
    subtitle: "We prioritize longevity and low-maintenance luxury.",
    options: [
      { label: "Every 4–6 Weeks", desc: "I enjoy frequent luxury pampering & crisp trims", serviceMatch: "srv-treat-spa", stylistMatch: "st-meera" },
      { label: "Every 3–4 Months", desc: "Ideal for balayage melts and modern layered cuts", serviceMatch: "srv-color-balayage", stylistMatch: "st-ananya" },
      { label: "Twice a Year", desc: "Ultra low-maintenance longevity is mandatory", serviceMatch: "srv-smooth-keratin", stylistMatch: "st-vikram" },
    ],
  },
  {
    id: 5,
    question: "What is your target investment range for this session?",
    subtitle: "Transparent pricing with no hidden charges at the chair.",
    options: [
      { label: "Essential Care (₹2,500 – ₹4,500)", desc: "Precision haircut or rejuvenating botanical spa", serviceMatch: "srv-cut-couture", stylistMatch: "st-rohan" },
      { label: "Signature Atelier (₹5,000 – ₹9,000)", desc: "French balayage, keratin, or molecular Olaplex", serviceMatch: "srv-color-balayage", stylistMatch: "st-ananya" },
      { label: "Haute Transformation (₹10,000+)", desc: "Full dimensional color + scalp ritual + take-home care", serviceMatch: "srv-color-balayage", stylistMatch: "st-ananya" },
    ],
  },
];

export function StyleQuizPage({ onNavigate }: StyleQuizPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const { selectSingleServiceAndProceed, setSelectedStylist, setWizardStep } = useAppStore();

  const handleSelectOption = (optionIndex: number) => {
    const updated = [...selectedAnswers];
    updated[currentStep] = optionIndex;
    setSelectedAnswers(updated);

    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(quizQuestions.length); // Results screen
    }
  };

  const isResultStep = currentStep === quizQuestions.length;

  // Resolve recommendation based on answers
  const recommendedServiceId =
    selectedAnswers.length > 1
      ? quizQuestions[1].options[selectedAnswers[1] || 0].serviceMatch
      : "srv-color-balayage";

  const recommendedStylistId =
    selectedAnswers.length > 0
      ? quizQuestions[0].options[selectedAnswers[0] || 0].stylistMatch
      : "st-ananya";

  const service = salonServices.find((s) => s.id === recommendedServiceId) || salonServices[0];
  const stylist = stylists.find((st) => st.id === recommendedStylistId) || stylists[0];

  const handleBookResult = () => {
    selectSingleServiceAndProceed(service.id);
    setSelectedStylist(stylist.id);
    setWizardStep(1);
    onNavigate("/book");
  };

  const handleRestart = () => {
    setSelectedAnswers([]);
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Header */}
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B8935A] font-semibold flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" /> Diagnostic Hair Atelier
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1B1512] dark:text-[#F6F1EA]">
            The Aura Hair Prescription
          </h1>

          {!isResultStep && (
            <div className="pt-4 max-w-md mx-auto">
              <div className="flex justify-between text-xs text-stone-500 mb-1">
                <span>Question {currentStep + 1} of {quizQuestions.length}</span>
                <span>{Math.round(((currentStep + 1) / quizQuestions.length) * 100)}%</span>
              </div>
              <div className="h-1.5 w-full bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#B8935A] transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* RESULTS SCREEN */}
        {isResultStep ? (
          <div className="bg-white dark:bg-[#1A1412] rounded-3xl border border-[#B8935A]/30 p-8 sm:p-12 shadow-2xl space-y-8 animate-in zoom-in-95 duration-300 text-center">
            <div className="w-16 h-16 rounded-full bg-[#B8935A]/20 text-[#B8935A] flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <span className="text-xs uppercase tracking-widest text-[#B8935A] font-semibold">
                Your Customized Formula
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1512] dark:text-[#F6F1EA]">
                The Bespoke Prescription
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                Based on your curl density, Pune hard-water exposure, and morning maintenance window, here is your ideal salon combination:
              </p>
            </div>

            {/* Recommendation Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              {/* Service Card */}
              <div className="p-6 rounded-2xl bg-[#F6F1EA] dark:bg-black/30 border border-[#B8935A]/25 space-y-3">
                <div className="text-[10px] uppercase font-semibold text-[#B8935A] tracking-wider flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5" /> Recommended Ritual
                </div>
                <h3 className="font-serif text-xl font-bold">{service.name}</h3>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex justify-between items-baseline pt-2 border-t border-[#B8935A]/15 text-xs">
                  <span className="text-stone-500">{service.duration} mins</span>
                  <span className="font-serif font-bold text-base text-[#B8935A]">{formatCurrency(service.price)}</span>
                </div>
              </div>

              {/* Stylist Card */}
              <div className="p-6 rounded-2xl bg-[#F6F1EA] dark:bg-black/30 border border-[#B8935A]/25 flex items-center gap-4">
                <img
                  src={stylist.image}
                  alt={stylist.name}
                  className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-[#B8935A]/40"
                />
                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-semibold text-[#B8935A] tracking-wider flex items-center gap-1">
                    <User className="w-3 h-3" /> Recommended Master
                  </div>
                  <h4 className="font-serif text-lg font-bold">{stylist.name}</h4>
                  <p className="text-xs text-stone-500">{stylist.role}</p>
                  <p className="text-[11px] text-amber-500 font-semibold">★ {stylist.rating} ({stylist.reviewsCount} reviews)</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                id="book-quiz-prescription-btn"
                onClick={handleBookResult}
                className="px-8 py-3.5 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-xl text-sm font-semibold tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book This Exact Prescription</span>
              </button>
              <button
                onClick={handleRestart}
                className="px-6 py-3.5 border border-stone-300 dark:border-stone-700 hover:border-[#B8935A] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        ) : (
          /* ACTIVE QUESTION SCREEN */
          <div className="bg-white dark:bg-[#1A1412] rounded-3xl border border-[#B8935A]/20 p-6 sm:p-10 shadow-sm space-y-6">
            <div className="space-y-1">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1512] dark:text-[#F6F1EA]">
                {quizQuestions[currentStep].question}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                {quizQuestions[currentStep].subtitle}
              </p>
            </div>

            <div className="space-y-3">
              {quizQuestions[currentStep].options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentStep] === optIdx;
                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? "bg-[#B8935A]/10 border-[#B8935A] shadow"
                        : "bg-stone-50/50 dark:bg-white/5 border-stone-200 dark:border-stone-800 hover:border-[#B8935A]/50"
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="font-serif text-base sm:text-lg font-semibold text-[#1B1512] dark:text-[#F6F1EA]">
                        {opt.label}
                      </div>
                      <div className="text-xs text-stone-500">{opt.desc}</div>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center border shrink-0 ${
                        isSelected
                          ? "bg-[#B8935A] border-[#B8935A] text-white"
                          : "border-stone-300 dark:border-stone-600"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation back */}
            {currentStep > 0 && (
              <div className="pt-2">
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="text-xs font-semibold text-stone-500 hover:text-[#B8935A] flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Previous Question
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
