import { motion } from "framer-motion";

const STEPS = [
  {
    n: "01",
    title: "Discover your interests",
    desc: "Short, intentional reflection prompts turn vague curiosity into a concrete starting point.",
  },
  {
    n: "02",
    title: "Explore real opportunities",
    desc: "See internships, programs, and roles that fit what you actually care about.",
  },
  {
    n: "03",
    title: "Track and land internships",
    desc: "Apply, follow up, and land offers — with structure instead of chaos.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      data-testid="how-section"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <div className="text-xs tracking-[0.25em] uppercase text-blue-400/80 mb-4">
            How it works
          </div>
          <h2 className="font-display text-4xl sm:text-5xl tracking-tighter font-medium">
            Three steps from{" "}
            <span className="text-slate-500">unsure</span> to{" "}
            <span className="text-white">hired.</span>
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* connector */}
          <div
            aria-hidden
            className="hidden md:block absolute top-[60px] left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
          />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              data-testid={`step-${i + 1}`}
              className="relative rounded-2xl border border-white/5 bg-slate-900/30 backdrop-blur-sm p-8"
            >
              <div className="relative w-12 h-12 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center mb-6">
                <span className="font-display text-sm text-blue-300 tracking-widest">
                  {s.n}
                </span>
                <span className="absolute inset-0 rounded-full bg-blue-500/10 blur-md -z-10" />
              </div>
              <h3 className="font-display text-xl md:text-2xl tracking-tight text-white mb-3">
                {s.title}
              </h3>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
