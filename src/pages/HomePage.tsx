import React from "react";
import { HomeHero } from "@/components/home/HomeHero";
import { MarqueeAndStats } from "@/components/home/MarqueeAndStats";
import { SignatureServices } from "@/components/home/SignatureServices";
import { HomeBeforeAfter } from "@/components/home/HomeBeforeAfter";
import { HomeStylists } from "@/components/home/HomeStylists";
import { HomeOffersAndReviews } from "@/components/home/HomeOffersAndReviews";
import { HomeQuizAndFaq } from "@/components/home/HomeQuizAndFaq";

interface HomePageProps {
  onNavigate: (route: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen">
      <HomeHero onNavigate={onNavigate} />
      <MarqueeAndStats />
      <SignatureServices onNavigate={onNavigate} />
      <HomeBeforeAfter onNavigate={onNavigate} />
      <HomeStylists onNavigate={onNavigate} />
      <HomeOffersAndReviews onNavigate={onNavigate} />
      <HomeQuizAndFaq onNavigate={onNavigate} />
    </div>
  );
}
