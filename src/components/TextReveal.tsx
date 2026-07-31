import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "span" | "h1" | "h2" | "h3" | "h4" | "p";
  delay?: number;
}

export default function TextReveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { y: 40, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          delay,
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [delay]);

  return (
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}
