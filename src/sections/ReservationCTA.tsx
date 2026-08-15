import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ReservationCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Background parallax
      const bg = section.querySelector(".cta-bg") as HTMLElement;
      if (bg) {
        gsap.to(bg, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }

      // Content reveal
      gsap.fromTo(
        content.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: content,
            start: "top 70%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reserve"
      className="relative py-[120px] md:py-[240px] overflow-hidden"
    >
      {/* Background Image */}
      <div className="cta-bg absolute -inset-[15%] will-change-transform">
        <picture>
          <source
            srcSet="/assets/transquill/unnamed (17).avif"
            type="image/avif"
          />
          <img
            src="/assets/transquill/unnamed (17).jpg"
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </picture>
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-[1680px] mx-auto px-6 md:px-12 text-center"
      >
        <span className="text-mono text-[#ca641b] block mb-6 opacity-0">
          Reserve Your Experience
        </span>
        <h2 className="text-display-xl text-white mb-6 opacity-0">
          Your Table<br />Awaits
        </h2>
        <p className="text-body-large text-[#8A8A8A] max-w-xl mx-auto mb-10 opacity-0">
          Whether it&apos;s an intimate dinner, a celebration with friends, or a
          day of self-care at our spa, we&apos;re ready to craft an unforgettable
          experience for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0">
          <a
            href="https://wa.me/2348121558483?text=Hello,%20I'd%20like%20to%20make%20a%20reservation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-4 bg-[#ca641b] text-black text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#df782c] transition-all duration-300 hover:scale-[0.97]"
            data-hover
          >
            Book via WhatsApp
          </a>
          <a
            href="tel:+2348121558483"
            className="inline-flex items-center justify-center px-10 py-4 border border-white/20 text-white text-xs uppercase tracking-[0.2em] hover:bg-white/5 hover:border-white/40 transition-all duration-300"
            data-hover
          >
            Call Now
          </a>
        </div>

        {/* Contact Info */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 opacity-0">
          <div className="text-center">
            <span className="text-mono text-[#4A4A4A] block mb-2">Location</span>
            <p className="text-[#8A8A8A] text-sm">
              Therasus Terminal, Owode-Ibeshe<br />
              Ikorodu, Lagos
            </p>
          </div>
          <div className="w-[1px] h-8 bg-[#4A4A4A] hidden md:block" />
          <div className="text-center">
            <span className="text-mono text-[#4A4A4A] block mb-2">Hours</span>
            <p className="text-[#8A8A8A] text-sm">
              Daily: 10:00 AM &ndash; 12:00 AM
            </p>
          </div>
          <div className="w-[1px] h-8 bg-[#4A4A4A] hidden md:block" />
          <div className="text-center">
            <span className="text-mono text-[#4A4A4A] block mb-2">Phone</span>
            <a
              href="tel:+2348121558483"
              className="text-[#8A8A8A] text-sm hover:text-[#ca641b] transition-colors"
              data-hover
            >
              +234 812 155 8483
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
