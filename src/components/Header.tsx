import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "100px top",
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 h-16 z-[100] flex items-center justify-between px-6 md:px-12 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(0,0,0,0.8)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <a
        href="#top"
        className="flex items-center hover:opacity-80 transition-opacity duration-300"
      >
        <img src="/assets/transquill/Tranquil_logo.png" alt="Tranquil Logo" className="h-12 w-auto object-contain mix-blend-lighten" />
      </a>

      <button
        onClick={onMenuClick}
        className="flex items-center gap-3 text-white hover:text-[#8A8A8A] transition-colors duration-300 group"
        data-hover
      >
        <span className="text-sm uppercase tracking-[0.1em]">Menu</span>
        <div className="w-8 h-8 flex flex-col justify-center items-center gap-[6px]">
          <span className="block w-5 h-[1px] bg-current transition-transform duration-300 group-hover:translate-x-1" />
          <span className="block w-5 h-[1px] bg-current transition-transform duration-300 group-hover:-translate-x-1" />
        </div>
      </button>
    </header>
  );
}
