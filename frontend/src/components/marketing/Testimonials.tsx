import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "I was skeptical of matchmaking platforms after years of bad experiences. Sanyogya felt completely different — every match made sense. Met my husband within 4 months.",
    name: "Priya R.",
    role: "IIM Ahmedabad | Strategy Consultant",
    city: "Mumbai",
    initials: "PR",
  },
  {
    quote:
      "As a doctor with a demanding schedule, I had no time for endless swiping. Sanyogya understood that. Three matches a week, all exceptional people. Found my partner in seven months.",
    name: "Dr. Arjun M.",
    role: "Cardiologist | AIIMS Delhi",
    city: "New Delhi",
    initials: "AM",
  },
  {
    quote:
      "The verification process was rigorous but it gave me immense confidence in who I was talking to. No fake profiles, no time-wasters. Pure signal.",
    name: "Kavitha S.",
    role: "IPS Officer | Government of Karnataka",
    city: "Bengaluru",
    initials: "KS",
  },
  {
    quote:
      "Running a startup means my time is precious. Sanyogya's curation is exceptional — they understood my lifestyle and matched me with someone who truly gets the founder journey.",
    name: "Rohit V.",
    role: "Founder & CEO | Series B Startup",
    city: "Bengaluru",
    initials: "RV",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#1a0808] to-[#0d0404] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#8B1A1A]/10 rounded-full blur-3xl" />
        <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-[#C9A84C]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-[#C9A84C] text-xs uppercase tracking-widest font-medium mb-4">
            Member Stories
          </p>
          <h2
            className="font-heading text-5xl md:text-6xl text-white font-light"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Their{" "}
            <span className="text-gold-gradient font-semibold">Stories</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`glass rounded-2xl p-8 group hover:glass-gold transition-all duration-300 hover:-translate-y-1 ${
                i === 0 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <Quote
                size={32}
                className="text-[#C9A84C]/30 mb-5"
                strokeWidth={1}
              />
              <p className="text-white/75 text-base leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4 border-t border-white/10 pt-5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#8B1A1A] to-[#C9A84C] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{t.name}</div>
                  <div className="text-white/40 text-xs">{t.role}</div>
                  <div className="text-[#C9A84C]/60 text-xs">{t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
