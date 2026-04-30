import { motion } from "framer-motion";
import { Compass, Briefcase, ListChecks, Users } from "lucide-react";

const FEATURES = [
  {
    icon: Compass,
    title: "Personalized career direction",
    desc: "Move from vague ambition to a clear, tailored path based on your strengths, interests, and goals.",
    testid: "feature-direction",
    span: "lg:col-span-2",
  },
  {
    icon: Briefcase,
    title: "Internship recommendations",
    desc: "Handpicked roles that match who you are — not just what you typed into a search bar.",
    testid: "feature-internships",
    span: "lg:col-span-2",
  },
  {
    icon: ListChecks,
    title: "Application tracking",
    desc: "One dashboard for every application, deadline, and follow-up.",
    testid: "feature-tracking",
    span: "lg:col-span-2",
  },
  {
    icon: Users,
    title: "Networking & LinkedIn guidance",
    desc: "Templates, scripts, and tactics to turn cold outreach into real conversations.",
    testid: "feature-networking",
    span: "lg:col-span-2",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      data-testid="features-section"
      className="relative py-24 md:py-32"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <div className="text-xs tracking-[0.25em] uppercase text-blue-400/80 mb-4">
            What you get
          </div>
          <h2 className="font-display text-4xl sm:text-5xl tracking-tighter font-medium">
            A focused toolkit for the{" "}
            <span className="text-slate-500">next 4 years.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-5">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                data-testid={f.testid}
                className={`group relative ${f.span} rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-8 md:p-10 overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.04]`}
              >
                <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-blue-500/0 group-hover:bg-blue-500/15 blur-2xl transition-all duration-500" />
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/20 flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5 text-blue-300" strokeWidth={1.6} />
                  </div>
                  <h3 className="font-display text-xl md:text-2xl tracking-tight text-white mb-3">
                    {f.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-md">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
