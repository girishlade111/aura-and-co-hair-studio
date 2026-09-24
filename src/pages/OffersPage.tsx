import React, { useState } from "react";
import { Sparkles, Gift, Crown, Check, ArrowRight, Heart, Clock, Send, Copy, CheckCheck } from "lucide-react";
import { salonOffers, membershipTiers, seasonalPromotion, GiftCardOption } from "@/data/offers";
import { formatCurrency } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { useAppStore } from "@/store/useBookingStore";

interface OffersPageProps {
  onNavigate: (route: string) => void;
}

export function OffersPage({ onNavigate }: OffersPageProps) {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [activeTab, setActiveTab] = useState<"packages" | "memberships" | "giftcards">("packages");
  const { setWizardStep } = useAppStore();

  // Gift Card Interactive Builder State
  const [giftAmount, setGiftAmount] = useState<number>(5000);
  const [customGiftAmount, setCustomGiftAmount] = useState<string>("");
  const [recipientName, setRecipientName] = useState<string>("Pooja Hegde");
  const [recipientEmail, setRecipientEmail] = useState<string>("pooja@example.com");
  const [senderName, setSenderName] = useState<string>("Ananya");
  const [giftMessage, setGiftMessage] = useState<string>(
    "Wishing you an afternoon of tranquility and art at Aura & Co. salon!"
  );
  const [copiedCode, setCopiedCode] = useState(false);
  const [purchasedGiftCard, setPurchasedGiftCard] = useState<boolean>(false);

  const finalAmount = customGiftAmount ? Number(customGiftAmount) || 5000 : giftAmount;

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handlePurchaseGiftCard = (e: React.FormEvent) => {
    e.preventDefault();
    setPurchasedGiftCard(true);
  };

  return (
    <div className="min-h-screen py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8935A]/10 border border-[#B8935A]/30 text-[#B8935A] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Exclusive Privileges
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1B1512] dark:text-[#F6F1EA] tracking-tight">
            Curated Packages & Memberships
          </h1>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
            Designed for those who view salon care not as an occasional errand, but as an essential ritual of elegance and rejuvenation.
          </p>

          {/* Navigation Sub-Tabs */}
          <div className="inline-flex p-1 rounded-2xl bg-white/60 dark:bg-white/5 border border-[#B8935A]/30 mt-6 shadow-sm">
            <button
              onClick={() => setActiveTab("packages")}
              className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "packages" ? "bg-[#B8935A] text-white shadow" : "text-stone-600 dark:text-stone-300"
              }`}
            >
              Curated Packages
            </button>
            <button
              onClick={() => setActiveTab("memberships")}
              className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "memberships" ? "bg-[#B8935A] text-white shadow" : "text-stone-600 dark:text-stone-300"
              }`}
            >
              Glow Memberships
            </button>
            <button
              onClick={() => setActiveTab("giftcards")}
              className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "giftcards" ? "bg-[#B8935A] text-white shadow" : "text-stone-600 dark:text-stone-300"
              }`}
            >
              Luxury Gift Cards
            </button>
          </div>
        </div>

        {/* TAB 1: CURATED PACKAGES */}
        {activeTab === "packages" && (
          <div className="space-y-8">
            {/* Seasonal Highlight Card */}
            <div className="bg-[#1B1512] text-white p-8 rounded-3xl border border-[#B8935A]/40 relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8 space-y-2">
                  <div className="text-xs text-[#B8935A] uppercase font-semibold tracking-wider">
                    {seasonalPromotion.tag}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold">{seasonalPromotion.title}</h3>
                  <p className="text-xs sm:text-sm text-stone-300">{seasonalPromotion.description}</p>
                  <div className="pt-2 flex items-center gap-3">
                    <span className="text-xs text-stone-400">Promo Code:</span>
                    <button
                      onClick={() => handleCopyCode(seasonalPromotion.code)}
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-mono font-bold text-[#B8935A] border border-white/20 flex items-center gap-1.5"
                    >
                      {copiedCode ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{seasonalPromotion.code}</span>
                    </button>
                  </div>
                </div>
                <div className="md:col-span-4 flex justify-end">
                  <button
                    onClick={() => {
                      setWizardStep(1);
                      onNavigate("/book");
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-xl text-xs font-semibold tracking-wide shadow"
                  >
                    Reserve this Package
                  </button>
                </div>
              </div>
            </div>

            {/* Standard Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {salonOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-white dark:bg-[#1A1412] rounded-3xl border border-[#B8935A]/20 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-[#B8935A]/10 text-[#B8935A] border border-[#B8935A]/20">
                        {offer.tag}
                      </span>
                      <span className="text-xs text-stone-400 font-mono">Code: {offer.code}</span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-[#1B1512] dark:text-[#F6F1EA]">
                      {offer.title}
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                      {offer.description}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
                      <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                        Included Treatments:
                      </span>
                      {offer.includes.map((inc, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-stone-700 dark:text-stone-300">
                          <Check className="w-3.5 h-3.5 text-[#B8935A] shrink-0" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#B8935A]/20 mt-6 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-stone-400 line-through">
                        {formatCurrency(offer.originalPrice)}
                      </div>
                      <div className="font-serif text-2xl font-bold text-[#B8935A]">
                        {formatCurrency(offer.price)}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setWizardStep(1);
                        onNavigate("/book");
                      }}
                      className="px-5 py-2.5 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
                    >
                      Book Package
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: GLOW MEMBERSHIP TIERS */}
        {activeTab === "memberships" && (
          <div className="space-y-8">
            {/* Monthly / Yearly Toggle */}
            <div className="flex justify-center items-center gap-3">
              <span className={`text-xs font-semibold ${billingPeriod === "monthly" ? "text-[#B8935A]" : "text-stone-500"}`}>
                Monthly Billing
              </span>
              <button
                onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")}
                className="w-12 h-6 rounded-full bg-stone-300 dark:bg-stone-700 p-0.5 relative transition-colors"
              >
                <div
                  className={`w-5 h-5 rounded-full bg-[#B8935A] transition-transform ${
                    billingPeriod === "yearly" ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
              <span className={`text-xs font-semibold flex items-center gap-1.5 ${billingPeriod === "yearly" ? "text-[#B8935A]" : "text-stone-500"}`}>
                <span>Annual Billing</span>
                <span className="text-[10px] bg-[#B8935A]/20 text-[#B8935A] px-2 py-0.5 rounded-full font-bold">
                  Save 2 Months
                </span>
              </span>
            </div>

            {/* Membership Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {membershipTiers.map((tier) => {
                const price = billingPeriod === "monthly" ? tier.priceMonthly : tier.priceYearly;
                return (
                  <div
                    key={tier.id}
                    className={`rounded-3xl p-8 border transition-all flex flex-col justify-between ${
                      tier.popular
                        ? "bg-[#1B1512] text-white border-[#B8935A] shadow-2xl relative scale-105"
                        : "bg-white dark:bg-[#1A1412] border-[#B8935A]/20 shadow-sm"
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#B8935A] text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow">
                        Most Privileged Choice
                      </div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-serif text-2xl font-bold">{tier.name}</h3>
                        <p className={`text-xs mt-1 ${tier.popular ? "text-stone-300" : "text-stone-500"}`}>
                          {tier.tagline}
                        </p>
                      </div>

                      <div className="pt-2">
                        <span className="font-serif text-3xl sm:text-4xl font-bold text-[#B8935A]">
                          {formatCurrency(price)}
                        </span>
                        <span className={`text-xs ml-1 ${tier.popular ? "text-stone-300" : "text-stone-500"}`}>
                          /{billingPeriod === "monthly" ? "month" : "year"}
                        </span>
                      </div>

                      <div className="space-y-2.5 pt-4 border-t border-white/10">
                        {tier.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs">
                            <Check className="w-3.5 h-3.5 text-[#B8935A] shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-8">
                      <button
                        onClick={() => {
                          setWizardStep(1);
                          onNavigate("/book");
                        }}
                        className={`w-full py-3 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-md ${
                          tier.popular
                            ? "bg-[#B8935A] hover:bg-[#9E7B45] text-white"
                            : "bg-[#1B1512] dark:bg-white text-white dark:text-[#1B1512] hover:bg-[#B8935A]"
                        }`}
                      >
                        Enroll into {tier.name}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: LUXURY GIFT CARDS */}
        {activeTab === "giftcards" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Interactive Form */}
            <div className="lg:col-span-6 bg-white dark:bg-[#1A1412] p-8 rounded-3xl border border-[#B8935A]/20 shadow-sm space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#B8935A] font-semibold flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5" /> The Present of Elegance
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1512] dark:text-[#F6F1EA] mt-1">
                  Design an Aura Digital Gift Card
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Redeemable against all treatments, services, and luxury products at our Koregaon Park studio.
                </p>
              </div>

              {purchasedGiftCard ? (
                <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-center space-y-3">
                  <Sparkles className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-xl font-bold text-emerald-900 dark:text-emerald-100">
                    Gift Card Issued!
                  </h4>
                  <p className="text-xs text-emerald-800 dark:text-emerald-200">
                    A personalized voucher code has been simulated for {recipientName} for {formatCurrency(finalAmount)}.
                  </p>
                  <button
                    onClick={() => setPurchasedGiftCard(false)}
                    className="text-xs text-[#B8935A] underline font-semibold"
                  >
                    Design another gift card
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePurchaseGiftCard} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                      Select Value
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[2500, 5000, 10000, 15000].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => {
                            setGiftAmount(val);
                            setCustomGiftAmount("");
                          }}
                          className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                            giftAmount === val && !customGiftAmount
                              ? "bg-[#B8935A] text-white border-[#B8935A]"
                              : "bg-stone-50 dark:bg-white/5 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300"
                          }`}
                        >
                          {formatCurrency(val)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                        Recipient Name
                      </label>
                      <input
                        type="text"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        className="w-full px-4 py-2 text-xs rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                        Recipient Email
                      </label>
                      <input
                        type="email"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        className="w-full px-4 py-2 text-xs rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                        Your Name (Sender)
                      </label>
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        className="w-full px-4 py-2 text-xs rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                        Custom Value (Optional ₹)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 7500"
                        value={customGiftAmount}
                        onChange={(e) => setCustomGiftAmount(e.target.value)}
                        className="w-full px-4 py-2 text-xs rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                      Personalized Message
                    </label>
                    <textarea
                      rows={2}
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      className="w-full px-4 py-2 text-xs rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-xl text-xs font-semibold tracking-wide shadow transition-all flex items-center justify-center gap-2"
                  >
                    <span>Authorize & Issue Card ({formatCurrency(finalAmount)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Right: Live Interactive Card Preview */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs uppercase tracking-widest text-stone-400 font-semibold block text-center lg:text-left">
                Live Card Preview
              </span>

              <div className="relative w-full aspect-[16/10] rounded-3xl bg-gradient-to-br from-[#1B1512] via-[#2D231E] to-[#140F0D] p-8 text-white shadow-2xl border-2 border-[#B8935A]/50 flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#B8935A]/20 rounded-full blur-2xl pointer-events-none" />

                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-serif text-2xl font-bold tracking-tight text-[#F6F1EA]">
                      Aura & Co.
                    </span>
                    <span className="text-[10px] tracking-widest text-[#B8935A] uppercase block">
                      Haute Hair Studio · Pune
                    </span>
                  </div>
                  <div className="text-right font-serif text-2xl font-bold text-[#B8935A]">
                    {formatCurrency(finalAmount)}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] text-stone-400 uppercase tracking-wider">Recipient</div>
                  <div className="font-serif text-xl font-semibold text-white">
                    {recipientName || "Valued Patron"}
                  </div>
                  <p className="text-xs italic text-stone-300 line-clamp-2 mt-2">
                    "{giftMessage || "A gift of beauty and relaxation."}"
                  </p>
                </div>

                <div className="flex justify-between items-end pt-4 border-t border-white/10 text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block">From</span>
                    <span className="font-medium text-stone-200">{senderName || "A Friend"}</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#B8935A]">VCH-AURA-{finalAmount}-PUNE</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
