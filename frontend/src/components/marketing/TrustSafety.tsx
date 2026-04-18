import { ShieldCheck, Lock, EyeOff, ScrollText, UserCheck, Flag } from "lucide-react";

const trustPoints = [
  {
    icon: UserCheck,
    title: "Manual Identity Verification",
    description: "Government ID  + professional credential check for every member.",
  },
  {
    icon: ShieldCheck,
    title: "LinkedIn & Degree Validation",
    description:
      "We cross-verify your employer, role, and educational qualifications.",
  },
  {
    icon: EyeOff,
    title: "Photo Privacy Controls",
    description:
      "Your photos are visible only to members you mutually match with. Signed URLs, short TTL.",
  },
  {
    icon: Lock,
    title: "End-to-End Secure Messaging",
    description:
      "Messages are only accessible to conversation participants. No data mining.",
  },
  {
    icon: ScrollText,
    title: "GDPR & IT Act Compliant",
    description:
      "Full data export, right to deletion, consent-based data flows. Your data is yours.",
  },
  {
    icon: Flag,
    title: "Zero Tolerance Policy",
    description:
      "Inappropriate behavior results in immediate and permanent removal. No exceptions.",
  },
];

export default function TrustSafety() {
  return (
    <section className="py-24 bg-[#0d0404]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <div>
            <p className="text-[#C9A84C] text-xs uppercase tracking-widest font-medium mb-4">
              Trust & Safety
            </p>
            <h2
              className="font-heading text-5xl md:text-6xl text-white font-light leading-tight mb-6"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Your Safety Is{" "}
              <span className="text-gold-gradient font-semibold">
                Non-Negotiable
              </span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-8">
              We believe privacy and safety are not features — they are the
              foundation. Every architectural decision was made with your security
              in mind.
            </p>
            <div className="glass-gold rounded-2xl px-6 py-5">
              <div className="flex items-center gap-3">
                <ShieldCheck size={24} className="text-[#C9A84C]" />
                <div>
                  <div className="text-white text-sm font-medium">
                    Security Audit Pending
                  </div>
                  <div className="text-white/40 text-xs">
                    Independent third-party security review before public launch
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {trustPoints.map((point) => (
              <div
                key={point.title}
                className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg glass-gold flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <point.icon size={16} className="text-[#C9A84C]" />
                </div>
                <div>
                  <div className="text-white text-sm font-medium mb-1">
                    {point.title}
                  </div>
                  <div className="text-white/40 text-xs leading-relaxed">
                    {point.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
