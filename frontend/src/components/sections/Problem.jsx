import { motion } from "framer-motion";

export default function Problem() {
  return (
    <section
      id="problem"
      data-testid="problem-section"
      className="relative py-24 md:py-36"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-xs tracking-[0.25em] uppercase text-blue-400/80 mb-6">
            The problem
          </div>
          <h2
            data-testid="problem-headline"
            className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl tracking-tighter leading-[1.05]"
          >
            Most students don't lack{" "}
            <span className="text-slate-500">ambition</span>
            <span className="block">
              — they lack <span className="text-white">clarity.</span>
            </span>
          </h2>

          <p className="mt-8 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Career paths are fragmented across dozens of sites, Slack groups,
            and LinkedIn DMs. Advice is generic, timelines are hidden, and it's
            easy to feel behind before you've even started. grndwork replaces
            the guesswork with direction, opportunities, and accountability —
            all in one place.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
