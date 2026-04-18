import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Sanyogya",
  description: "Sign in to your Sanyogya account.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0a0a] via-[#2d0f0f] to-[#1a0a0a] flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8B1A1A]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
