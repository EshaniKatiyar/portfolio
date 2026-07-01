import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll, useLenis } from "@/components/portfolio/SmoothScroll";
import { Hero } from "@/components/portfolio/Hero";
import { Intro } from "@/components/portfolio/Intro";
import { Vault } from "@/components/portfolio/Vault";
import { Marquee } from "@/components/portfolio/Marquee";
import { Capabilities } from "@/components/portfolio/Capabilities";
import { Log } from "@/components/portfolio/Log";
import { Showcase } from "@/components/portfolio/Showcase";
import { GitHubChart } from "@/components/portfolio/GitHubChart";
import { Extracurricular } from "@/components/portfolio/Extracurricular";
import { Footer } from "@/components/portfolio/Footer";
import { Cursor } from "@/components/portfolio/Cursor";
import { Grain } from "@/components/portfolio/Grain";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { Curtain } from "@/components/portfolio/Curtain";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Portfolio" },
      { name: "description", content: "Portfolio of an engineer working at the edge of agentic AI, and full-stack systems." },
      { property: "og:title", content: "Portfolio" },
      { property: "og:description", content: "Selected works across agentic AI, and production engineering." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SmoothScroll>
      <Curtain />
      <Grain />
      <ScrollProgress />
      <Cursor />
      <main className="bg-background text-foreground min-h-screen">
        <Nav />
        <Hero />
        <Intro />
        <section id="works"><Vault /></section>
        <section id="showcase"><Showcase /></section>
        <Marquee />
        <section id="disciplines"><Capabilities /></section>
        <section id="practice"><Log /></section>
        <section id="github"><GitHubChart /></section>
        <Extracurricular />
        <section id="contact"><Footer /></section>
      </main>
    </SmoothScroll>
  );
}

function Nav() {
  const lenis = useLenis();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -80 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNav = (id: string) => {
    setMenuOpen(false);
    requestAnimationFrame(() => scrollTo(id));
  };

  const handleTop = () => {
    setMenuOpen(false);
    requestAnimationFrame(() => {
      if (lenis) lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 px-6 md:px-16 py-5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] mix-blend-difference text-white">
        <a href="#" onClick={(e) => { e.preventDefault(); handleTop(); }} className="hover:opacity-60 transition-opacity">EK</a>
        <div className="hidden md:flex gap-10">
          <button onClick={() => scrollTo("works")} className="hover:opacity-60 cursor-pointer">Projects</button>
          <button onClick={() => scrollTo("showcase")} className="hover:opacity-60 cursor-pointer">Achievements</button>
          <button onClick={() => scrollTo("disciplines")} className="hover:opacity-60 cursor-pointer">Focus Areas</button>
          <button onClick={() => scrollTo("practice")} className="hover:opacity-60 cursor-pointer">Experience</button>
          <button onClick={() => scrollTo("github")} className="hover:opacity-60 cursor-pointer">GitHub</button>
          <button onClick={() => scrollTo("contact")} className="hover:opacity-60 cursor-pointer">Contact</button>
        </div>
        <a href="mailto:ESHANI1505@GMAIL.COM" className="hover:opacity-60 hidden md:inline">{"\n"}</a>
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-current transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
          <span className={`block w-5 h-px bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-current transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8 font-mono text-sm uppercase tracking-[0.22em]">
          <button onClick={() => handleNav("works")} className="hover:opacity-60 transition-opacity">Projects</button>
          <button onClick={() => handleNav("showcase")} className="hover:opacity-60 transition-opacity">Achievements</button>
          <button onClick={() => handleNav("disciplines")} className="hover:opacity-60 transition-opacity">Focus Areas</button>
          <button onClick={() => handleNav("practice")} className="hover:opacity-60 transition-opacity">Experience</button>
          <button onClick={() => handleNav("github")} className="hover:opacity-60 transition-opacity">GitHub</button>
          <button onClick={() => handleNav("contact")} className="hover:opacity-60 transition-opacity">Contact</button>
          <a href="mailto:ESHANI1505@GMAIL.COM" className="hover:opacity-60 transition-opacity mt-4">ESHANI1505@GMAIL.COM</a>
        </div>
      )}
    </>
  );
}
