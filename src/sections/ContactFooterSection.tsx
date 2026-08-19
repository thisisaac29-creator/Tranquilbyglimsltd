import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactFooterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll(".contact-reveal"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
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
      className="relative py-[120px] md:py-[240px] px-6 md:px-12"
    >
      <div className="max-w-[1680px] mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <span className="contact-reveal text-mono text-[#4A4A4A] block mb-4 opacity-0">
            06 &mdash; Contact
          </span>
          <h2 className="contact-reveal text-display-l text-white mb-8 opacity-0">
            Find Us
          </h2>
          <p className="contact-reveal text-body-large text-[#8A8A8A] max-w-xl opacity-0">
            Have a question or special request? Our team is ready to welcome you.
          </p>
        </div>

        {/* Info + Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Contact Info */}
          <div className="space-y-12">
            <div className="contact-reveal opacity-0">
              <span className="text-mono text-[#4A4A4A] text-[10px] block mb-3">
                Address
              </span>
              <p className="text-white text-lg">
                Therasus Terminal, Owode-Ibeshe<br />
                Ikorodu, Lagos 104102<br />
                Nigeria
              </p>
            </div>

            <div className="contact-reveal opacity-0">
              <span className="text-mono text-[#4A4A4A] text-[10px] block mb-3">
                Contact
              </span>
              <a
                href="tel:+2348121558483"
                className="text-white text-lg block hover:text-[#ca641b] transition-colors"
                data-hover
              >
                +234 812 155 8483
              </a>
              <a
                href="mailto:info@tranquilbyglims.com"
                className="text-[#8A8A8A] text-sm block mt-1 hover:text-[#ca641b] transition-colors"
                data-hover
              >
                info@tranquilbyglims.com
              </a>
            </div>

            <div className="contact-reveal opacity-0">
              <span className="text-mono text-[#4A4A4A] text-[10px] block mb-3">
                Opening Hours
              </span>
              <div className="space-y-2">
                <div className="flex justify-between text-sm max-w-xs">
                  <span className="text-[#8A8A8A]">Monday &ndash; Thursday</span>
                  <span className="text-white">10:00 AM &ndash; 12:00 PM</span>
                </div>
                <div className="flex justify-between text-sm max-w-xs">
                  <span className="text-[#8A8A8A]">Friday &ndash; Sunday</span>
                  <span className="text-white">10:00 AM till dawn</span>
                </div>
              </div>
            </div>

            <div className="contact-reveal opacity-0">
              <span className="text-mono text-[#4A4A4A] text-[10px] block mb-3">
                Follow Us
              </span>
              <div className="flex gap-6">
                <a
                  href="https://instagram.com/tranquilbyglims"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#ca641b] transition-colors"
                  data-hover
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a
                  href="https://tiktok.com/@tranquilbyglims"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#ca641b] transition-colors"
                  data-hover
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.33 6.34 6.34 6.34 0 006.33-6.34V9.91a8.27 8.27 0 004.83 1.55v-3.5a4.85 4.85 0 01-1.05-.27z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Map */}
          <div className="contact-reveal opacity-0 aspect-video bg-[#111111] rounded-sm overflow-hidden">
            <iframe
              src="https://maps.google.com/maps?q=Tranquilbyglims%20-%20Restaurant%20and%20Spa%20in%20Ikorodu,%20Lagos&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(100%) invert(92%)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tranquil by Glims Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
