export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="relative border-t border-white/5 py-10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-display font-extrabold text-lg tracking-tighter lowercase">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_14px_rgba(59,130,246,0.8)]" />
          grndwork
        </div>
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} grndwork. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
