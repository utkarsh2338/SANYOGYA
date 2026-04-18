import type { Metadata } from "next";
import HeroSection from "@/components/marketing/HeroSection";
import HowItWorks from "@/components/marketing/HowItWorks";
import WhySanyogya from "@/components/marketing/WhySanyogya";
import WhoItsFor from "@/components/marketing/WhoItsFor";
import Testimonials from "@/components/marketing/Testimonials";
import TrustSafety from "@/components/marketing/TrustSafety";
import MembershipSection from "@/components/marketing/MembershipSection";
import FounderNote from "@/components/marketing/FounderNote";
import FinalCta from "@/components/marketing/FinalCta";
import Footer from "@/components/marketing/Footer";

export const metadata: Metadata = {
  title: "Sanyogya — Curated Matchmaking for India's Elite Professionals",
  description:
    "India's most exclusive matchmaking platform for IIT/IIM alumni, doctors, civil servants, founders, and CXOs. Every member is screened, verified, and personally curated.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <WhySanyogya />
      <WhoItsFor />
      <Testimonials />
      <TrustSafety />
      <MembershipSection />
      <FounderNote />
      <FinalCta />
      <Footer />
    </>
  );
}
