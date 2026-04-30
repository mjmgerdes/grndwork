import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Problem", href: "#problem" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "Vision", href: "#vision" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-slate-950/60 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <a
          href="#"
          data-testid="logo-link"
          className="font-display font-extrabold text-xl tracking-tighter lowercase text-white flex items-center gap-2"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_18px_rgba(59,130,246,0.8)]" />
          grndwork
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-${l.label.toLowerCase().replace(/\s/g, "-")}`}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <Button
          data-testid="header-join-btn"
          onClick={scrollToWaitlist}
          className="bg-white text-slate-950 hover:bg-slate-200 font-medium rounded-full h-9 px-5 text-sm"
        >
          Join Early Access
        </Button>
      </div>
    </header>
  );
}
