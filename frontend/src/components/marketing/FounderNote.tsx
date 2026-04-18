export default function FounderNote() {
  return (
    <section className="py-24 bg-[#1a0808] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#8B1A1A]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <p className="text-[#C9A84C] text-xs uppercase tracking-widest font-medium mb-4">
            A Personal Note
          </p>
        </div>

        <div className="glass rounded-3xl p-10 md:p-14 text-center">
          {/* Decorative quote mark */}
          <div
            className="text-[120px] leading-none text-[#C9A84C]/10 font-heading -mt-8 mb-0 select-none"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            ❝
          </div>

          <p
            className="text-white/80 text-lg md:text-xl leading-relaxed italic mb-8 -mt-6"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            I built Sanyogya because exceptional people deserve better than
            swiping through thousands of strangers. The professionals I know —
            IIT classmates, batchmates at AIIMS, founders in my network — are
            remarkable human beings who are terrible at self-promotion on dating
            apps. They deserve a platform that understands their world. That is
            Sanyogya.
          </p>

          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B1A1A] to-[#C9A84C] flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
            <div className="text-left">
              <div
                className="font-heading text-xl text-white"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Aditya Sharma
              </div>
              <div className="text-white/40 text-sm">
                Founder, Sanyogya · IIT Bombay &apos;14
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
