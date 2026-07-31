import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Spa", href: "#spa" },
  { label: "Reserve", href: "#reserve" },
];

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const tweensRef = useRef<gsap.core.Tween[]>([]);
  const hasOpenedRef = useRef(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    const links = linksRef.current;
    if (!overlay || !links) return;

    // Kill any previous tweens
    tweensRef.current.forEach((t) => t.kill());
    tweensRef.current = [];

    if (isOpen) {
      hasOpenedRef.current = true;
      overlay.style.pointerEvents = "auto";

      const t1 = gsap.to(overlay, {
        clipPath: "inset(0 0 0 0%)",
        duration: 0.6,
        ease: "power3.inOut",
      });
      tweensRef.current.push(t1);

      const t2 = gsap.fromTo(
        links.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.3,
        }
      );
      tweensRef.current.push(t2);
    } else if (hasOpenedRef.current) {
      const t1 = gsap.to(links.children, {
        y: -30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.in",
      });
      tweensRef.current.push(t1);

      const t2 = gsap.to(overlay, {
        clipPath: "inset(0 0 0 100%)",
        duration: 0.6,
        ease: "power3.inOut",
        delay: 0.2,
        onComplete: () => {
          overlay.style.pointerEvents = "none";
        },
      });
      tweensRef.current.push(t2);
    }

    return () => {
      tweensRef.current.forEach((t) => t.kill());
    };
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    onClose();
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 800);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] bg-[#1A1A1A] flex"
      style={{ clipPath: "inset(0 0 0 100%)", pointerEvents: "none" }}
    >
      <div className="flex-1 flex flex-col justify-center px-12 md:px-24">
        <nav ref={linksRef} className="flex flex-col gap-4 md:gap-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="text-left text-white text-[clamp(36px,5vw,72px)] uppercase font-display leading-[0.9] tracking-[-0.04em] hover:text-[#ca641b] transition-colors duration-300 group overflow-hidden"
              data-hover
            >
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                {link.label}
              </span>
            </button>
          ))}
        </nav>
      </div>

      <div className="hidden lg:flex flex-1 items-center justify-center">
        <div
          className="w-full h-full max-h-[60vh] mx-12 rounded-lg overflow-hidden opacity-20"
          style={{
            backgroundImage: "url(/assets/transquill/unnamed (17).jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      <button
        onClick={onClose}
        className="absolute top-4 right-6 md:right-12 w-12 h-12 flex items-center justify-center text-white hover:text-[#8A8A8A] transition-colors duration-300"
        data-hover
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <line x1="4" y1="4" x2="20" y2="20" />
          <line x1="20" y1="4" x2="4" y2="20" />
        </svg>
      </button>
    </div>
  );
}
