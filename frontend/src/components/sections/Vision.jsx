import { motion } from "framer-motion";

export default function Vision() {
  return (
    <section
      id="vision"
      data-testid="vision-section"
      className="relative py-24 md:py-36"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] rounded-full bg-blue-600/10 blur-[140px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-xs tracking-[0.25em] uppercase text-blue-400/80 mb-6">
            Our vision
          </div>
          <blockquote
            data-testid="vision-quote"
            className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tighter leading-[1.1] text-gradient"
          >
            We're building what students actually need — not another
            job board, not another course. Just a quieter, clearer way to figure
            out what's next and make it happen.
          </blockquote>

          <div className="mt-10 flex items-center justify-center gap-3 text-sm text-slate-500">
            <span className="inline-block w-8 h-px bg-white/20" />
            <span>Built with students, for students</span>
            <span className="inline-block w-8 h-px bg-white/20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
