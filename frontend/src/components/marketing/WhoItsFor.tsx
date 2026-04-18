import { GraduationCap, Stethoscope, Briefcase, Building2, Scale, Rocket } from "lucide-react";

const audiences = [
  {
    icon: GraduationCap,
    title: "IIT / IIM Alumni",
    description:
      "Premier institution graduates who value intellectual compatibility as much as everything else.",
    tag: "Tier-1 Institutions",
  },
  {
    icon: Stethoscope,
    title: "Doctors & Healthcare",
    description:
      "Medical professionals — MBBS, MD, specialists — who need someone who understands demanding careers.",
    tag: "Medical Professionals",
  },
  {
    icon: Building2,
    title: "Civil Servants & IAS/IPS",
    description:
      "Government officers who serve the nation and seek a partner who respects that commitment.",
    tag: "UPSC Qualifiers",
  },
  {
    icon: Briefcase,
    title: "Senior Executives & CXOs",
    description:
      "VPs, Directors, and C-suite leaders from India's top corporations looking for a true life partner.",
    tag: "Corporate Leaders",
  },
  {
    icon: Rocket,
    title: "Founders & Entrepreneurs",
    description:
      "Startup founders and business builders who need someone who understands the entrepreneurial life.",
    tag: "Startup Ecosystem",
  },
  {
    icon: Scale,
    title: "Lawyers & Judges",
    description:
      "Legal professionals from top firms and the judiciary who value precision in all aspects of life.",
    tag: "Legal Professionals",
  },
];

export default function WhoItsFor() {
  return (
    <section id="who-its-for" className="py-24 bg-[#1a0808] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/3 w-[600px] h-[600px] bg-[#C9A84C]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#C9A84C] text-xs uppercase tracking-widest font-medium mb-4">
            Membership
          </p>
          <h2
            className="font-heading text-5xl md:text-6xl text-white font-light"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Built For India&apos;s{" "}
            <span className="text-gold-gradient font-semibold">Best</span>
          </h2>
          <p className="text-white/50 text-lg mt-4 max-w-2xl mx-auto">
            Sanyogya is not for everyone — and that&apos;s exactly the point.
            Our members have earned their place through years of excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {audiences.map((audience) => (
            <div
              key={audience.title}
              className="relative group rounded-2xl p-6 border border-[#C9A84C]/10 bg-gradient-to-br from-[#1a0808] to-[#2d1010] hover:border-[#C9A84C]/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Hover shimmer overlay */}
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center group-hover:bg-[#C9A84C]/20 transition-colors">
                    <audience.icon size={20} className="text-[#C9A84C]" />
                  </div>
                  <span className="text-[10px] text-[#C9A84C]/60 uppercase tracking-wider border border-[#C9A84C]/20 rounded-full px-2 py-0.5">
                    {audience.tag}
                  </span>
                </div>

                <h3
                  className="font-heading text-xl text-white font-medium mb-2"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                  {audience.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {audience.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
