import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      data-testid="hero-section"
      className="relative pt-40 pb-28 md:pt-52 md:pb-40 overflow-hidden grain"
    >
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[680px] h-[680px] rounded-full bg-blue-600/20 blur-[140px] animate-float-slow" />
        <div className="absolute top-24 right-10 w-[280px] h-[280px] rounded-full bg-indigo-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-10 w-[320px] h-[320px] rounded-full bg-cyan-400/10 blur-[120px]" />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
          data-testid="hero-badge"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-xs tracking-wide text-slate-300">
            Now in early access
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          data-testid="hero-headline"
          className="font-display font-semibold text-5xl sm:text-6xl lg:text-7xl tracking-tighter leading-[1.02] max-w-5xl mx-auto"
        >
          <span className="text-gradient">Discover your path.</span>
          <br />
          <span className="text-white">Land your future.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          data-testid="hero-subheadline"
          className="mt-7 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          grndwork helps students go from not knowing what to pursue to landing
          real opportunities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button
            data-testid="hero-cta-primary"
            onClick={() => scrollTo("waitlist")}
            className="group bg-white text-slate-950 hover:bg-slate-200 h-12 px-7 rounded-full font-medium text-sm shadow-[0_0_40px_rgba(59,130,246,0.25)]"
          >
            Join Early Access
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            data-testid="hero-cta-secondary"
            onClick={() => scrollTo("features")}
            variant="outline"
            className="h-12 px-7 rounded-full text-sm bg-transparent border-white/15 text-white hover:bg-white/5 hover:border-white/30"
          >
            Learn More
          </Button>
        </motion.div>

        {/* Subtle UI mockup abstraction */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="relative mt-20 mx-auto max-w-4xl"
          data-testid="hero-visual"
        >
          <div className="relative rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-xl p-2 shadow-[0_0_60px_rgba(59,130,246,0.15)]">
            <div className="rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-8">
              <div className="flex items-center gap-1.5 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { label: "Interests", val: "Product + Design" },
                  { label: "Match score", val: "92%" },
                  { label: "Opportunities", val: "48 open" },
                ].map((c) => (
                  <div
                    key={c.label}
                    className="rounded-lg border border-white/5 bg-white/[0.02] p-4 text-left"
                  >
                    <div className="text-[10px] uppercase tracking-widest text-slate-500">
                      {c.label}
                    </div>
                    <div className="mt-1 font-display text-lg text-white">
                      {c.val}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                {[
                  ["Associate PM — Stripe", "Remote · Summer 2026"],
                  ["Product Design Intern — Linear", "NYC · Fall 2026"],
                  ["SWE Intern — Anthropic", "SF · Summer 2026"],
                ].map(([t, s]) => (
                  <div
                    key={t}
                    className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3"
                  >
                    <div>
                      <div className="text-sm text-white font-medium">{t}</div>
                      <div className="text-xs text-slate-500">{s}</div>
                    </div>
                    <div className="text-xs text-blue-400 border border-blue-500/30 rounded-full px-2.5 py-1">
                      Track
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
