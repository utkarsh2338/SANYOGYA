import type { Metadata } from "next";
import Navbar from "@/components/marketing/Navbar";

export const metadata: Metadata = {
  title: "Sanyogya — Curated Matchmaking for India's Elite Professionals",
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
    </>
  );
}
