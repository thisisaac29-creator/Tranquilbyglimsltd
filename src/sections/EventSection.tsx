import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Event starts May 28, 2026 at 4PM and runs until June 1 at 6AM (dawn after last night)
const EVENT_START = new Date("2026-05-28T16:00:00");
const EVENT_EXPIRY = new Date("2026-06-01T06:00:00");

const eventFeatures = [
  "Live Performances",
  "Dance & Music Raves",
  "Comedy",
  "Games",
  "Food & Drinks",
  "Guest Artist Performances",
];

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft | null {
  const now = new Date();
  // Event is over — return null to hide section
  if (now >= EVENT_EXPIRY) return null;
  // Countdown to start
  const target = now < EVENT_START ? EVENT_START : EVENT_EXPIRY;
  const diff = target.getTime() - now.getTime();
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function EventSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(getTimeLeft);
  const isLive = new Date() >= EVENT_START && new Date() < EVENT_EXPIRY;

  useEffect(() => {
    const tick = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector(".event-badge"),
        { scale: 0.8, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)",
          scrollTrigger: { trigger: section, start: "top 75%", once: true },
        }
      );
      gsap.fromTo(
        section.querySelector(".event-flyer"),
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.2, ease: "expo.out",
          scrollTrigger: { trigger: section, start: "top 70%", once: true },
        }
      );
      gsap.fromTo(
        section.querySelectorAll(".event-reveal"),
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "expo.out",
          scrollTrigger: { trigger: section, start: "top 65%", once: true },
        }
      );
      gsap.fromTo(
        section.querySelectorAll(".feature-item"),
        { x: 20, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out",
          scrollTrigger: {
            trigger: section.querySelector(".features-list"),
            start: "top 75%", once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []); // ← empty array: animations only register once, never re-run on countdown tick

  // Event is over — hide the section entirely
  if (!timeLeft) return null;

  return (
    <section
      ref={sectionRef}
      id="event"
      className="relative py-[120px] md:py-[200px] px-6 md:px-12 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #ca641b 0%, transparent 70%)" }}
      />

      <div className="max-w-[1680px] mx-auto">
        {/* Badge */}
        <div className="mb-12 md:mb-16">
          <span className="event-badge inline-flex items-center gap-2 bg-[#ca641b] text-black text-xs uppercase tracking-[0.2em] font-medium px-4 py-2 opacity-0">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            {isLive ? "Happening Now" : "Upcoming Event"}
          </span>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 ">
          {/* Left: Flyer */}
          <div className="event-flyer opacity-0">
            <div className="relative aspect-[3/4] max-w-xl mx-auto lg:mx-0 overflow-hidden rounded-sm shadow-2xl bg-[#111111]">
              <img
                src="/assets/transquill/ileya_breeze_flyer.jpg"
                alt="Ileya Breeze Event Flyer"
                className="w-full h-full object-cover relative z-10"
              />
              <div className="absolute inset-0 border border-[#ca641b]/20 rounded-sm pointer-events-none z-20" />
            </div>
          </div>

          {/* Right: Event Details */}
          <div className="space-y-8">
            {/* Title */}
            <div>
              <p className="event-reveal text-mono text-[#ca641b] block mb-3 opacity-0">
                Tranquil by Glims Presents
              </p>
              <h2 className="event-reveal text-display-xl text-white opacity-0 leading-none">
                Ileya<br />Breeze
              </h2>
            </div>

            {/* Countdown */}
            <div className="event-reveal opacity-0">
              <span className="text-mono text-[#4A4A4A] text-[10px] block mb-4">
                {isLive ? "Event ends in" : "Event starts in"}
              </span>
              <div className="flex gap-4 md:gap-6">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Mins", value: timeLeft.minutes },
                  { label: "Secs", value: timeLeft.seconds },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <div className="bg-[#111111] border border-white/10 px-4 py-3 min-w-[64px] mb-2">
                      <span className="text-white font-mono text-2xl md:text-3xl font-light tabular-nums">
                        {pad(value)}
                      </span>
                    </div>
                    <span className="text-mono text-[#4A4A4A] text-[10px]">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Date & Time */}
            <div className="event-reveal opacity-0 flex flex-wrap gap-6 border-t border-white/10 pt-6">
              <div>
                <span className="text-mono text-[#4A4A4A] text-[10px] block mb-1">Date</span>
                <p className="text-white text-lg font-light">28th – 31st May</p>
              </div>
              <div className="w-[1px] bg-white/10" />
              <div>
                <span className="text-mono text-[#4A4A4A] text-[10px] block mb-1">Time</span>
                <p className="text-white text-lg font-light">4PM – Dawn</p>
              </div>
              <div className="w-[1px] bg-white/10" />
              <div>
                <span className="text-mono text-[#4A4A4A] text-[10px] block mb-1">Venue</span>
                <p className="text-white text-lg font-light">Ibeshe Ferry Terminal, Ikorodu</p>
              </div>
            </div>

            {/* Description */}
            <p className="event-reveal text-[#8A8A8A] text-body-large leading-relaxed opacity-0">
              We&apos;re bringing the vibes, the music, the games, the food and the unforgettable
              energy to Tranquil by Glims! From 4PM till dawn, expect nothing but good music,
              great people and nonstop fun.
            </p>

            {/* Features */}
            <div className="event-reveal opacity-0">
              <span className="text-mono text-[#4A4A4A] text-[10px] block mb-4">Featuring</span>
              <ul className="features-list grid grid-cols-2 gap-y-3 gap-x-6">
                {eventFeatures.map((feature, i) => (
                  <li
                    key={i}
                    className="feature-item flex items-center gap-2 text-[#8A8A8A] text-sm opacity-0"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ca641b] flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="event-reveal opacity-0 flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="https://wa.me/2348121558483?text=Hello,%20I'd%20like%20to%20reserve%20for%20the%20Ileya%20Breeze%20event"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-4 bg-[#ca641b] text-black text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#df782c] transition-all duration-300 hover:scale-[0.97]"
                data-hover
              >
                Reserve Your Spot
              </a>
              <a
                href="tel:+2348121558483"
                className="inline-flex items-center justify-center px-10 py-4 border border-white/20 text-white text-xs uppercase tracking-[0.2em] hover:bg-white/5 hover:border-white/40 transition-all duration-300"
                data-hover
              >
                Call for Enquiries
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
