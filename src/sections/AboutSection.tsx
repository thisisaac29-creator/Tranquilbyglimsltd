import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img1 = img1Ref.current;
    const text = textRef.current;
    if (!section || !img1 || !text) return;

    const ctx = gsap.context(() => {
      // Smooth inner-card parallax for the single image
      gsap.fromTo(
        img1,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        }
      );

      // Text reveal
      gsap.fromTo(
        text.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: text,
            start: "top 75%",
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
      id="about"
      className="relative py-[120px] md:py-[180px] px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-[1680px] mx-auto">
        {/* Two-column asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Images Column: Single Premium Parallax Card */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm shadow-2xl bg-[#111111]">
            <div
              ref={img1Ref}
              className="absolute -inset-[15%] will-change-transform"
            >
              <picture>
                <source
                  srcSet="/assets/transquill/unnamed (2).avif"
                  type="image/avif"
                />
                <img
                  src="/assets/transquill/unnamed (2).jpg"
                  alt="Couple dining at sunset"
                  className="w-full h-full object-cover object-end"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
            {/* Elegant overlay highlight */}
            <div className="absolute inset-0 border border-[#ca641b]/10 rounded-sm pointer-events-none z-10" />
          </div>

          {/* Text Column */}
          <div ref={textRef} className="lg:pl-8">
            <span className="text-mono text-[#4A4A4A] block mb-6">
              01 &mdash; About
            </span>
            <h2 className="text-display-xl text-white mb-8">
              Tranquil<br />Luxury
            </h2>
            <p className="text-body-large text-[#8A8A8A] mb-6 leading-relaxed">
              Tranquil emerges as a haven of serenity, nestled at the water&apos;s
              edge in Ikorodu. Born from the rhythmic whispers of the sea, it
              beckons seekers of solace to its shores.
            </p>
            <p className="text-body text-[#8A8A8A] mb-8 leading-relaxed">
              Tranquil is not merely a bar — it&apos;s an immersive escape where
              the gentle lull of waves meets refined indulgence. Every dish,
              every cocktail, every sunset view is curated to transport you
              beyond the ordinary.
            </p>
            <div className="flex flex-wrap gap-8">
              <div>
                <span className="text-display-l text-[#ca641b]">4.2</span>
                <p className="text-mono text-[#4A4A4A] mt-1">Google Rating</p>
              </div>
              <div>
                <span className="text-display-l text-[#ca641b]">#1</span>
                <p className="text-mono text-[#4A4A4A] mt-1">Ikorodu&apos;s Finest</p>
              </div>
              <div>
                <span className="text-display-l text-[#ca641b]">70+</span>
                <p className="text-mono text-[#4A4A4A] mt-1">Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
