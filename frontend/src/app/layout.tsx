import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sanyogya — Curated Matchmaking for India's Elite Professionals",
    template: "%s | Sanyogya",
  },
  description:
    "Sanyogya is India's most exclusive matchmaking platform for IIT/IIM alumni, doctors, civil servants, founders, and CXOs. Every member is screened and verified.",
  keywords: [
    "elite matchmaking India",
    "IIT IIM matrimony",
    "professional matchmaking",
    "curated marriage platform",
    "verified matrimony",
  ],
  openGraph: {
    title: "Sanyogya — Curated Matchmaking for India's Elite Professionals",
    description:
      "India's most exclusive matchmaking platform. Every member screened, verified, and personally curated.",
    type: "website",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${inter.variable} ${cormorant.variable} h-full scroll-smooth`}
      >
        <body className="min-h-full flex flex-col antialiased font-sans">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
