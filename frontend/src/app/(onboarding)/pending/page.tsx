import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, Mail, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Application Under Review | Sanyogya",
  description: "Your Sanyogya application is under review.",
};

export default function PendingPage() {
  return (
    <div className="min-h-screen bg-maroon-gradient flex items-center justify-center p-6">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B1A1A]/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-lg w-full text-center">
        {/* Animated clock icon */}
        <div className="w-20 h-20 rounded-full glass-gold flex items-center justify-center mx-auto mb-8 animate-float">
          <Clock size={36} className="text-[#C9A84C]" />
        </div>

        <h1
          className="font-heading text-4xl md:text-5xl text-white font-light mb-4"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Your Application is{" "}
          <span className="text-gold-gradient font-semibold">Under Review</span>
        </h1>

        <p className="text-white/60 text-base leading-relaxed mb-8">
          Our team carefully reviews every application personally. You&apos;ll
          receive an email within{" "}
          <span className="text-[#C9A84C]">48 hours</span> with your decision.
        </p>

        {/* Progress steps */}
        <div className="glass rounded-2xl p-6 mb-8 text-left">
          {[
            {
              label: "Application Submitted",
              done: true,
              icon: CheckCircle2,
            },
            {
              label: "Credential Verification",
              done: false,
              icon: Clock,
            },
            {
              label: "Profile Activation",
              done: false,
              icon: Clock,
            },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
              <step.icon
                size={18}
                className={step.done ? "text-[#C9A84C]" : "text-white/20"}
              />
              <span
                className={`text-sm ${step.done ? "text-white/80" : "text-white/30"}`}
              >
                {step.label}
              </span>
              {step.done && (
                <span className="ml-auto text-[#C9A84C] text-xs">Done</span>
              )}
            </div>
          ))}
        </div>

        {/* Email reminder */}
        <div className="flex items-center justify-center gap-2 text-white/40 text-sm mb-8">
          <Mail size={14} />
          <span>Check your email for updates from hello@sanyogya.in</span>
        </div>

        <Link href="/">
          <Button
            variant="ghost"
            className="text-white/50 hover:text-white border border-white/20 hover:bg-white/10"
          >
            ← Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
