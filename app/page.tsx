import Blog from "./components/Blog";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import Hero from "./components/Hero";
import HowWeWork from "./components/HowWeWork";
import Portfolio from "./components/Portfolio";
import Pricing from "./components/Pricing";
import Services from "./components/services";



export default function Home() {
  return (
    <main className="relative bg-white overflow-hidden">

      {/* BACKGROUND (NOT fixed) */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-200px] right-[-150px] w-[600px] h-[600px] bg-indigo-300/30 blur-3xl rounded-full" />
        <div className="absolute bottom-[-200px] left-[-150px] w-[500px] h-[500px] bg-sky-300/30 blur-3xl rounded-full" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10">
        <Hero />
        <Services />
        <Portfolio />
        <Pricing />
        <HowWeWork />
        <Contact />
        <FAQ />
        <Blog />
      </div>

    </main>
  );
}
