import { FileCheck, Search, Heart, MessageCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileCheck,
    title: "Apply & Get Verified",
    description:
      "Submit your profile with professional details. Our team reviews every application personally — credential checks, LinkedIn verification, and a brief screening call.",
  },
  {
    number: "02",
    icon: Search,
    title: "Curated Matches, Not Algorithms",
    description:
      "Our matching engine combines AI scoring with human curation. You see a small, handpicked set of genuinely compatible profiles — not hundreds of irrelevant suggestions.",
  },
  {
    number: "03",
    icon: Heart,
    title: "Express Interest",
    description:
      "Browse your curated matches. Express interest privately. When both parties are interested, it's a mutual match — connection unlocked.",
  },
  {
    number: "04",
    icon: MessageCircle,
    title: "Connect & Converse",
    description:
      "A private, elegant messaging space opens up. No phone numbers exchanged prematurely. You set the pace. Your privacy is our promise.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-[#0d0404] relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-[#C9A84C]/40 to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/2 w-[500px] h-[500px] bg-[#8B1A1A]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="text-[#C9A84C] text-xs uppercase tracking-widest font-medium mb-4">
            The Process
          </p>
          <h2
            className="font-heading text-5xl md:text-6xl text-white font-light"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            How{" "}
            <span className="text-gold-gradient font-semibold">Sanyogya</span>{" "}
            Works
          </h2>
          <p className="text-white/50 text-lg mt-4 max-w-xl mx-auto">
            Four intentional steps between you and a meaningful connection.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center text-center group"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Number */}
              <div className="text-[#C9A84C]/20 text-7xl font-light absolute -top-4 font-heading pointer-events-none select-none">
                {step.number}
              </div>

              {/* Icon circle */}
              <div className="relative z-10 w-20 h-20 rounded-full glass-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <step.icon size={28} className="text-[#C9A84C]" />
              </div>

              <h3
                className="font-heading text-2xl text-white font-medium mb-3"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                {step.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
