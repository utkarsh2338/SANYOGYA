"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why Sanyogya", href: "#why-sanyogya" },
  { label: "Who It's For", href: "#who-its-for" },
  { label: "Membership", href: "#membership" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#8B1A1A] flex items-center justify-center text-white text-sm font-bold shadow-lg">
            S
          </div>
          <span
            className="font-heading text-2xl font-semibold text-white tracking-wide"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Sanyogya
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/70 hover:text-[#C9A84C] text-sm font-medium transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/sign-in">
            <Button
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/10 border border-white/20"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/apply">
            <Button className="bg-gradient-to-r from-[#C9A84C] to-[#a07c2e] hover:from-[#e0c06a] hover:to-[#C9A84C] text-[#1a0505] font-semibold shadow-lg shadow-[#C9A84C]/20 transition-all duration-300">
              Apply Now
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/80 hover:text-[#C9A84C] text-base py-1 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
            <Link href="/sign-in">
              <Button
                variant="ghost"
                className="w-full text-white/80 border border-white/20"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/apply">
              <Button className="w-full bg-gradient-to-r from-[#C9A84C] to-[#a07c2e] text-[#1a0505] font-semibold">
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
