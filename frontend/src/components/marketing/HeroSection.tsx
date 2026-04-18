import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-maroon-gradient flex items-center justify-center overflow-hidden">
      {/* Background texture / ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8B1A1A]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#C9A84C]/5 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#C9A84C]/5 rounded-full blur-3xl" />
        {/* Decorative grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-16">
        {/* Pill badge */}
        <div
          className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <Shield size={14} className="text-[#C9A84C]" />
          <span className="text-[#C9A84C] text-xs font-medium tracking-widest uppercase">
            Invite-Only · Verified Members
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="font-heading text-6xl md:text-8xl font-light text-white leading-[1.05] mb-6 animate-fade-in-up"
          style={{
            animationDelay: "0.2s",
            fontFamily: "var(--font-cormorant), Georgia, serif",
          }}
        >
          Where India&apos;s{" "}
          <span className="text-gold-gradient font-semibold">Exceptional</span>
          <br />
          Find Each Other
        </h1>

        {/* Subheadline */}
        <p
          className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up"
          style={{ animationDelay: "0.35s" }}
        >
          Sanyogya is a curated matchmaking platform for IIT/IIM alumni,
          doctors, civil servants, founders, and CXOs. Not an app — an
          experience. Every connection is screened, verified, and intentional.
        </p>

        {/* Stats row */}
        <div
          className="flex flex-wrap items-center justify-center gap-8 mb-12 animate-fade-in-up"
          style={{ animationDelay: "0.45s" }}
        >
          {[
            { value: "100%", label: "Verified Members" },
            { value: "4.9★", label: "Member Rating" },
            { value: "Elite", label: "Professionals Only" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-semibold text-[#C9A84C]">
                {stat.value}
              </div>
              <div className="text-white/50 text-xs uppercase tracking-wider mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.55s" }}
        >
          <Link href="/apply">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#C9A84C] via-[#e0c06a] to-[#C9A84C] text-[#1a0505] font-semibold text-base px-8 py-6 rounded-full shadow-xl shadow-[#C9A84C]/25 hover:shadow-[#C9A84C]/40 hover:scale-105 transition-all duration-300 group"
            >
              Request an Invitation
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button
              size="lg"
              variant="ghost"
              className="text-white/70 hover:text-white border border-white/20 hover:bg-white/5 px-8 py-6 rounded-full"
            >
              How It Works
            </Button>
          </a>
        </div>

        {/* Social proof */}
        <div
          className="flex items-center justify-center gap-2 mt-12 text-white/40 text-sm animate-fade-in-up"
          style={{ animationDelay: "0.65s" }}
        >
          <div className="flex -space-x-2">
            {["A", "R", "P", "V", "S"].map((letter, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B1A1A] to-[#C9A84C] border-2 border-[#1a0505] flex items-center justify-center text-white text-xs font-bold"
              >
                {letter}
              </div>
            ))}
          </div>
          <span>
            Join{" "}
            <span className="text-[#C9A84C]">500+ verified professionals</span>{" "}
            already inside
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
        <div className="w-px h-8 bg-gradient-to-b from-[#C9A84C]/40 to-transparent" />
        <span className="text-xs tracking-widest uppercase">Scroll</span>
      </div>
    </section>
  );
}
