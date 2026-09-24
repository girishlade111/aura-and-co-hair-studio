import React, { useState } from "react";
import { Sparkles, Clock, Calendar, ArrowRight, ArrowLeft, User, BookOpen } from "lucide-react";
import { journalArticles, JournalArticle } from "@/data/journal";

interface JournalPageProps {
  onNavigate: (route: string) => void;
}

export function JournalPage({ onNavigate }: JournalPageProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const selectedArticle = journalArticles.find((a) => a.slug === selectedSlug);

  return (
    <div className="min-h-screen py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {selectedArticle ? (
          /* ARTICLE DETAIL VIEW */
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
            <button
              onClick={() => setSelectedSlug(null)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-[#B8935A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Editorial Journal</span>
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs text-[#B8935A] font-semibold uppercase tracking-wider">
                <span>{selectedArticle.category}</span>
                <span>·</span>
                <span className="flex items-center gap-1 font-normal text-stone-400">
                  <Clock className="w-3 h-3" /> {selectedArticle.readTime}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1B1512] dark:text-[#F6F1EA] leading-tight">
                {selectedArticle.title}
              </h1>

              <div className="flex items-center gap-4 py-3 border-y border-[#B8935A]/20 text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#B8935A]/20 text-[#B8935A] flex items-center justify-center font-bold">
                    {selectedArticle.author.name[0]}
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 dark:text-stone-100 block">
                      {selectedArticle.author.name}
                    </span>
                    <span className="text-[11px] text-stone-400">{selectedArticle.author.role}</span>
                  </div>
                </div>
                <span className="ml-auto">{selectedArticle.date}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border border-[#B8935A]/25">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="prose dark:prose-invert max-w-none text-stone-700 dark:text-stone-300 space-y-4 text-sm sm:text-base leading-relaxed">
              <p className="font-serif text-lg italic text-stone-800 dark:text-stone-200 border-l-4 border-[#B8935A] pl-4">
                {selectedArticle.excerpt}
              </p>
              <div className="space-y-4">
                {selectedArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* CTA at end of article */}
            <div className="p-8 bg-white dark:bg-[#1A1412] rounded-3xl border border-[#B8935A]/30 text-center space-y-4 mt-12 shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-[#1B1512] dark:text-[#F6F1EA]">
                Experience This Care in Person
              </h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Consult directly with our master colorists and therapists at Aura & Co. Koregaon Park.
              </p>
              <button
                onClick={() => onNavigate("/book")}
                className="px-6 py-3 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-xl text-xs font-semibold tracking-wide shadow"
              >
                Book Your Chair
              </button>
            </div>
          </div>
        ) : (
          /* ARTICLES LIST VIEW */
          <>
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8935A]/10 border border-[#B8935A]/30 text-[#B8935A] text-xs font-semibold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" /> Editorial Journal
              </div>
              <h1 className="font-serif text-4xl sm:text-6xl text-[#1B1512] dark:text-[#F6F1EA] tracking-tight">
                Dispatches on Hair & Wellness
              </h1>
              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                Curated insights from our salon chairs covering Pune hard water remedies, French balayage maintenance, and modern coiffure trends.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {journalArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => setSelectedSlug(art.slug)}
                  className="bg-white dark:bg-[#1A1412] rounded-3xl border border-[#B8935A]/20 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-stone-200 text-[10px] px-3 py-1 rounded-full uppercase font-medium">
                      {art.category}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-xs text-stone-400">
                        <span>{art.date}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {art.readTime}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1B1512] dark:text-[#F6F1EA] leading-snug group-hover:text-[#B8935A] transition-colors">
                        {art.title}
                      </h3>
                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-2">
                        {art.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#B8935A]/15 flex items-center justify-between">
                      <div className="text-xs text-stone-500">
                        By <strong className="text-stone-700 dark:text-stone-300">{art.author.name}</strong>
                      </div>
                      <span className="text-xs font-semibold text-[#B8935A] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read Story <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
