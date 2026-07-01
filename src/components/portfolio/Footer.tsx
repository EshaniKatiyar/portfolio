import { SectionLabel } from "./SectionLabel";

export function Footer() {
  return (
    <footer className="border-t hairline">
      <SectionLabel />
      <div className="px-6 md:px-16 py-24 md:py-40">
        <h2 className="display text-[18vw] md:text-[14vw] leading-[0.85]">Let's<br/>connect.</h2>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 font-mono text-sm">
          <div>
            <div className="label mb-2">Email</div>
            <a href="mailto:ESHANI1505@GMAIL.COM" className="hover:opacity-60">ESHANI1505@GMAIL.COM</a>
          </div>
          <div>
            <div className="label mb-2">Social</div>
            <div className="space-y-1">
              <div><a href="https://github.com/EshaniKatiyar" target="_blank" rel="noopener noreferrer" className="hover:opacity-60">GitHub ↗</a></div>
              <div><a href="https://www.linkedin.com/in/eshani-katiyar-2a7737322/" target="_blank" rel="noopener noreferrer" className="hover:opacity-60">LinkedIn ↗</a></div>
            </div>
          </div>
          <div className="md:text-right">
            <div className="label mb-2">Index</div>
            <div>2026 - Eshani Katiyar</div>
            <div className="text-orange opacity-80">$ end_of_transmission_</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
