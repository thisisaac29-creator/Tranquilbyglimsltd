import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll-driven parallax only — entrance animations are handled by CSS
    const img = sectionRef.current?.querySelector(".hero-bg") as HTMLElement;
    const content = sectionRef.current?.querySelector(".hero-content") as HTMLElement;

    if (img) {
      gsap.to(img, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }

    if (content) {
      gsap.to(content, {
        yPercent: 15,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "60% top",
          scrub: 0.5,
        },
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative w-full h-[100dvh] overflow-hidden"
    >
      {/* Background Video */}
      <div className="hero-bg absolute -inset-[15%] will-change-transform">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/assets/transquill/hero-poster.jpg)" }}
        />
        <video
          src="/assets/transquill/Transquil_hero_video_web.mp4"
          poster="/assets/transquill/hero-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover relative"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/25 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/40 to-black/85 z-0" />

      {/* Content */}
      <div className="hero-content relative z-10 h-full flex flex-col justify-center items-center text-center px-6 will-change-transform">
        <h1 className="text-display-xxl text-white font-display hero-title-anim">
          TRANQUIL
        </h1>

        <p className="mt-6 text-[#8A8A8A] text-body-large max-w-xl hero-subtitle-anim">
          A premium seaside restaurant, lounge &amp; spa in Ikorodu, Lagos.
          Where the rhythm of the sea meets refined indulgence.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 hero-cta-anim">
          <a
            href="https://wa.me/2348121558483"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-4 bg-[#ca641b] text-black text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#df782c] transition-all duration-300 hover:scale-[0.97]"
            data-hover
          >
            Reserve a Table
          </a>
          <Link
            to="/menu"
            className="inline-flex items-center justify-center px-10 py-4 border border-white/20 text-white text-xs uppercase tracking-[0.2em] hover:bg-white/5 hover:border-white/40 transition-all duration-300"
            data-hover
          >
            View Full Menu
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span className="text-mono text-[#4A4A4A] hero-subtitle-anim">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#ca641b] to-transparent origin-top hero-line-anim" />
      </div>
    </section>
  );
}
