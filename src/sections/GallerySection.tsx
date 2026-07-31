import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { type: "image", src: "/assets/transquill/unnamed (13).jpg", alt: "Friends at rooftop bar" },
  { type: "video", src: "/assets/transquill/Tranquil_Video.mp4", alt: "Tranquil video 1" },
  { type: "image", src: "/assets/transquill/unnamed (14).jpg", alt: "Chocolate dessert" },
  { type: "video", src: "/assets/transquill/Tranquil_Video_2.mp4", alt: "Tranquil video 2" },
  { type: "image", src: "/assets/transquill/unnamed (15).jpg", alt: "Restaurant interior" },
  { type: "video", src: "/assets/transquill/Tranquil_Video_3.mp4", alt: "Tranquil video 3" },
  { type: "image", src: "/assets/transquill/unnamed (16).jpg", alt: "Spa treatment" },
  { type: "image", src: "/assets/transquill/unnamed (17).jpg", alt: "Beachfront celebration" },
  { type: "video", src: "/assets/transquill/Tranquil_Video_4.mp4", alt: "Tranquil video 4" },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        section.querySelectorAll(".gallery-title"),
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

      // Horizontal scroll for gallery
      // Calculate scroll width dynamically to ensure we account for padding and late-loading images
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      const scrollTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Individual image parallax within the horizontal scroll
      const images = track.querySelectorAll(".gallery-img-inner");
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.15, xPercent: 5 },
          {
            scale: 1,
            xPercent: -5,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement ?? img,
              containerAnimation: scrollTween,
              start: "left right",
              end: "right left",
              scrub: 0.5,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative bg-black overflow-hidden"
    >
      {/* Section Header */}
      <div className="pt-[80px] md:pt-[70px] px-6 md:px-12 pb-8">
        <div className="max-w-[1680px] mx-auto">
          <span className="gallery-title text-mono text-[#4A4A4A] block mb-4  opacity-0">
            03 &mdash; Gallery
          </span>
          <h2 className="gallery-title text-display-xl text-white opacity-0">
            Moments<br />Captured
          </h2>
        </div>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div
        ref={trackRef}
        className="flex gap-4 md:gap-6 px-6 md:px-12 pb-16 md:pb-24 will-change-transform"
      >
        {galleryItems.map((item, i) => (
          <div
            key={i}
            className="gallery-img relative flex-shrink-0 w-[85vw] md:w-[35vw] max-h-[65vh] aspect-[3/4] overflow-hidden group rounded-sm"
          >
            <div className="gallery-img-inner w-full h-full">
              {item.type === "video" ? (
                <video
                  src={item.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              )}
            </div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
}
