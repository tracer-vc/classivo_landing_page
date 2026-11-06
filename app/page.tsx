import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { StickyCta } from "@/components/StickyCta";
import { BetaSection } from "@/components/sections/BetaSection";
import { Devices } from "@/components/sections/Devices";
import { Exams } from "@/components/sections/Exams";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Gamification } from "@/components/sections/Gamification";
import { Grades } from "@/components/sections/Grades";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { LessonEndDemo } from "@/components/sections/LessonEndDemo";
import { Loop } from "@/components/sections/Loop";
import { ScreenTimeCalc } from "@/components/sections/ScreenTimeCalc";
import { SocialProof } from "@/components/sections/SocialProof";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <Loop />
        <LessonEndDemo />
        <Exams />
        <Grades />
        <Gamification />
        <ScreenTimeCalc />
        <Devices />
        <BetaSection />
        <Faq />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
