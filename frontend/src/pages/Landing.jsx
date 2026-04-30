import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Vision from "@/components/sections/Vision";
import Waitlist from "@/components/sections/Waitlist";
import Footer from "@/components/sections/Footer";

export default function Landing() {
  return (
    <main
      data-testid="landing-page"
      className="relative min-h-screen bg-[#020617] text-white overflow-x-hidden"
    >
      <Header />
      <Hero />
      <Problem />
      <Features />
      <HowItWorks />
      <Vision />
      <Waitlist />
      <Footer />
    </main>
  );
}
