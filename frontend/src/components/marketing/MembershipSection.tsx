import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const tiers = [
  {
    name: "Basic",
    price: "₹2,999",
    period: "/ 3 months",
    description: "For those beginning their Sanyogya journey.",
    features: [
      "Up to 3 curated matches/week",
      "Profile verification badge",
      "In-platform messaging",
      "Basic preference filters",
      "Email support",
    ],
    cta: "Apply for Basic",
    href: "/apply?tier=basic",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "₹7,999",
    period: "/ 6 months",
    description: "Our most popular plan for serious seekers.",
    features: [
      "Up to 5 curated matches/week",
      "Priority in matching queue",
      "Advanced preference controls",
      "Profile boost (1x/month)",
      "Dedicated relationship manager",
      "Video call reveal feature",
    ],
    cta: "Apply for Premium",
    href: "/apply?tier=premium",
    highlighted: true,
  },
  {
    name: "Elite",
    price: "₹19,999",
    period: "/ year",
    description: "White-glove matchmaking for those who settle only for the best.",
    features: [
      "Unlimited curated matches",
      "Personal matchmaker assigned",
      "Background verification included",
      "Concierge date planning",
      "First access to new members",
      "Annual profile refresh session",
    ],
    cta: "Apply for Elite",
    href: "/apply?tier=elite",
    highlighted: false,
  },
];

export default function MembershipSection() {
  return (
    <section id="membership" className="py-24 bg-gradient-to-b from-[#0d0404] to-[#1a0808]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#C9A84C] text-xs uppercase tracking-widest font-medium mb-4">
            Membership
          </p>
          <h2
            className="font-heading text-5xl md:text-6xl text-white font-light"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Choose Your{" "}
            <span className="text-gold-gradient font-semibold">Path</span>
          </h2>
          <p className="text-white/50 text-lg mt-4 max-w-xl mx-auto">
            All plans require application approval first. Membership is a
            privilege, not a product.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 ${
                tier.highlighted
                  ? "bg-gradient-to-b from-[#8B1A1A]/40 to-[#5c1111]/20 border-2 border-[#C9A84C]/40 shadow-2xl shadow-[#C9A84C]/10"
                  : "glass border border-white/10 hover:border-[#C9A84C]/20"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#C9A84C] to-[#e0c06a] text-[#1a0505] text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full whitespace-nowrap">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3
                  className="font-heading text-2xl text-white font-medium mb-1"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                  {tier.name}
                </h3>
                <p className="text-white/40 text-sm">{tier.description}</p>
              </div>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold text-white">{tier.price}</span>
                <span className="text-white/40 text-sm">{tier.period}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check size={15} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                    <span className="text-white/60 text-sm">{f}</span>
                  </li>
                ))}
              </ul>

              <Link href={tier.href}>
                <Button
                  className={`w-full rounded-full font-semibold group ${
                    tier.highlighted
                      ? "bg-gradient-to-r from-[#C9A84C] to-[#e0c06a] text-[#1a0505] hover:shadow-lg hover:shadow-[#C9A84C]/30"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                  }`}
                >
                  {tier.cta}
                  <ArrowRight
                    size={14}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
