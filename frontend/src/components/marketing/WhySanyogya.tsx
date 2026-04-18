import {
  Lock,
  Users,
  Sparkles,
  Eye,
  BadgeCheck,
  HeartHandshake,
} from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Every Member Verified",
    description:
      "No anonymous profiles. Every member goes through identity, credential, and professional verification before activation.",
  },
  {
    icon: Sparkles,
    title: "Quality Over Quantity",
    description:
      "We cap the platform deliberately. You see 3–5 highly compatible matches a week — not 500 random swipes.",
  },
  {
    icon: Lock,
    title: "Privacy by Design",
    description:
      "Your photos are only visible to matches you've approved. Phone numbers never shared without consent. Full GDPR compliance.",
  },
  {
    icon: Users,
    title: "Human Curation",
    description:
      "Our team of relationship counselors reviews every match before it's shown. AI suggests, humans decide.",
  },
  {
    icon: Eye,
    title: "No Endless Browsing",
    description:
      "Intentional design. No infinite scroll, no dopamine loops. Meaningful matches surface at a thoughtful pace.",
  },
  {
    icon: HeartHandshake,
    title: "Guided Journey",
    description:
      "From application to your first conversation — our team is available for personal support at every step.",
  },
];

export default function WhySanyogya() {
  return (
    <section
      id="why-sanyogya"
      className="py-24 bg-gradient-to-b from-[#0d0404] to-[#1a0808]"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#C9A84C] text-xs uppercase tracking-widest font-medium mb-4">
            Our Difference
          </p>
          <h2
            className="font-heading text-5xl md:text-6xl text-white font-light"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Why{" "}
            <span className="text-gold-gradient font-semibold">Sanyogya</span>
          </h2>
          <p className="text-white/50 text-lg mt-4 max-w-2xl mx-auto">
            Most matrimony platforms are digital bazaars. We built something
            different — a private members&apos; club for people who have earned
            their place.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="glass rounded-2xl p-7 group hover:glass-gold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#C9A84C]/10"
            >
              <div className="w-12 h-12 rounded-xl glass-gold flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <feature.icon size={22} className="text-[#C9A84C]" />
              </div>
              <h3
                className="font-heading text-xl text-white font-medium mb-2"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                {feature.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
