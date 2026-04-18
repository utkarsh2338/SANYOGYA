import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function FinalCta() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#1a0808] to-[#0d0404] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[300px] bg-[#8B1A1A]/20 rounded-full blur-3xl" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-[#C9A84C]/5 rounded-full blur-2xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Ornament */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A84C]/40" />
          <div className="w-2 h-2 rounded-full bg-[#C9A84C]/60" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A84C]/40" />
        </div>

        <h2
          className="font-heading text-5xl md:text-7xl text-white font-light leading-tight mb-6"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Your Story{" "}
          <span className="text-gold-gradient font-semibold">Begins</span>
          <br />
          With One Application
        </h2>

        <p className="text-white/50 text-lg max-w-xl mx-auto mb-10">
          Applications take 7 minutes. Review takes 48 hours. If approved, your
          curated matches begin within 7 days.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/apply">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#C9A84C] via-[#e0c06a] to-[#C9A84C] text-[#1a0505] font-semibold text-base px-10 py-6 rounded-full shadow-2xl shadow-[#C9A84C]/25 hover:shadow-[#C9A84C]/40 hover:scale-105 transition-all duration-300 group"
            >
              Request Your Invitation
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </Link>
        </div>

        <p className="text-white/25 text-sm mt-8">
          Membership is by invitation and approval only. Seats are limited.
        </p>
      </div>
    </section>
  );
}
