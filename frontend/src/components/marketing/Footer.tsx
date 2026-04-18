import Link from "next/link";
import { ExternalLink, Globe, AtSign } from "lucide-react";


const footerLinks = {
  Platform: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Membership", href: "#membership" },
    { label: "Apply Now", href: "/apply" },
    { label: "Sign In", href: "/sign-in" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Founder's Note", href: "#founder" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Refund Policy", href: "/refunds" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0d0404] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#8B1A1A] flex items-center justify-center text-white text-sm font-bold">
                S
              </div>
              <span
                className="font-heading text-2xl font-semibold text-white"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Sanyogya
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
              India&apos;s most exclusive curated matchmaking platform for
              verified elite professionals. Quality over quantity, always.
            </p>
            {/* Social */}
            <div className="flex items-center gap-4">
              {[
                { icon: Globe, href: "#", label: "Instagram" },
                { icon: AtSign, href: "#", label: "LinkedIn" },
                { icon: ExternalLink, href: "#", label: "Twitter" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/40 hover:text-[#C9A84C] hover:border-[#C9A84C]/30 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white/60 text-xs uppercase tracking-widest font-medium mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/40 hover:text-[#C9A84C] text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-sm">
            © {new Date().getFullYear()} Sanyogya Technologies Pvt. Ltd. All
            rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Made with care in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
