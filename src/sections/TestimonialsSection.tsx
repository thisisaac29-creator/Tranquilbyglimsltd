import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "stephen esther",
    role: "Guest",
    text: "I had a wonderful time at Tranquil by Glims! The ambulance service was excellent, and the seaside view was pleasant. The barbecue fish was particularly delicious, and I enjoyed the overall dining experience. The drinks were great, and the company was top-notch. The service was good, and the staff were well-mannered. Everything was well taken care of, and I thoroughly enjoyed my stay. I'd definitely recommend Tranquil by Glims for a relaxing getaway!",
    rating: 5,
  },
  {
    name: "Yusuf Adeyemo",
    role: "Local Guide",
    text: "Nice place to hang out with friends. The atmosphere was very good and the staff were well-mannered. However, the music was a major issue for me and my friends and when I asked them to turn it off, they refused. Not ideal for those who prefer a quieter dining experience or don't listen to music.",
    rating: 4,
  },
  {
    name: "Zainab Agoro",
    role: "Guest",
    text: "I had a nice time here. The ambiance was great, and the setting was lovely. However, my order took quite a while to be served, and there was a lack of clear communication about the delay. Despite this, I enjoyed my overall experience",
    rating: 4,
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        section.querySelectorAll(".test-title"),
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

      // Cards stagger with overlapping effect
      const cards = section.querySelectorAll(".test-card");
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section.querySelector(".testimonials-grid"),
            start: "top 75%",
            once: true,
          },
        }
      );

      // Scroll-driven Y-shift for cards
      cards.forEach((card, i) => {
        gsap.to(card, {
          y: -(i * 30),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      });
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
          <span className="test-title text-mono text-[#4A4A4A] block mb-4 opacity-0">
            04 &mdash; Testimonials
          </span>
          <h2 className="test-title text-display-xl text-white opacity-0">
            What Our<br />Guests Say
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="test-card relative bg-[#111111] p-8 md:p-10 opacity-0 will-change-transform"
              style={{ marginTop: i === 1 ? "40px" : i === 2 ? "80px" : "0" }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <svg
                    key={j}
                    className="w-4 h-4 text-[#ca641b]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#8A8A8A] text-body leading-relaxed mb-8">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-white text-sm uppercase tracking-[0.05em]">
                    {testimonial.name}
                  </p>
                  <p className="text-[#4A4A4A] text-xs">{testimonial.role}</p>
                </div>
              </div>

              {/* Decorative accent line */}
              <div className="absolute top-0 left-8 md:left-10 w-12 h-[2px] bg-[#ca641b]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
