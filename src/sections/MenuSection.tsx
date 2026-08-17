import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router";
import { createOrderUrl, type MenuItem } from "../data/menuData";

interface HomepageMenuItem extends MenuItem {
  category: string;
  image: string;
  imageAvif?: string;
}

const homepageMenuItems: HomepageMenuItem[] = [
  {
    id: "grilled-tiger-prawns",
    name: "Grilled Tiger Prawns",
    category: "Grills",
    price: "₦26,000",
    description: "King prawn, garlic, onion, chips",
    image: "/assets/Grilled-prawn.webp",
  },
  {
    id: "tranquility-jar",
    name: "Tranquility Jar",
    category: "Cocktails",
    priceGF: "₦14,000",
    priceLounge: "₦15,000",
    description: "Tequila, vodka, gin, triple sec & fruit juices",
    image: "/assets/menu-2.jpg",
    imageAvif: "/assets/menu-2.avif",
  },
  {
    id: "signature-rice",
    name: "Tranquil Signature Rice",
    category: "Main Course",
    price: "₦15,000",
    description: "Basmati rice, grilled chicken breast, spring onion",
    image: "/assets/Tranquil-signature-rice.webp",
  },
  {
    id: "grilled-catfish",
    name: "Grilled Catfish (Big)",
    category: "Grills",
    price: "₦18,000",
    description: "BBQ catfish, pepper, chips",
    image: "/assets/Grilled-catfish.webp",
  },
];

const categories = ["Grills", "Cocktails", "Main Course", "Native Soups", "Desserts", "Starters"];

function ScrollingDataDisplay() {
  const [value, setValue] = useState("SEAFX2");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ref = useRef<HTMLSpanElement>(null);

  const generateValue = useCallback(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const cat = categories[Math.floor(Math.random() * categories.length)];
    const num = Math.floor(Math.random() * 99);
    const suffix = chars[Math.floor(Math.random() * chars.length)];
    return `${cat.substring(0, 4).toUpperCase()}${num}${suffix}`;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          intervalRef.current = setInterval(() => {
            setValue(generateValue());
          }, 80);
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [generateValue]);

  return (
    <span ref={ref} className="font-mono text-[#4A4A4A] text-xs tracking-[0.05em]">
      {value}
    </span>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function MenuSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const titleEls = section.querySelectorAll(".menu-title");
    const items = grid.querySelectorAll(".menu-item");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        titleEls.forEach((el, i) => {
          const t = el as HTMLElement;
          t.style.transitionDelay = `${i * 80}ms`;
          t.classList.add("is-visible");
        });
        items.forEach((el, i) => {
          const card = el as HTMLElement;
          card.style.transitionDelay = `${i * 90}ms`;
          card.classList.add("is-visible");
        });
        observer.disconnect();
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="relative py-[50px] md:py-[70px] px-6 md:px-12"
    >
      <div className="max-w-[1680px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24">
          <div>
            <span className="menu-title text-mono text-[#4A4A4A] block mb-4">
              02 &mdash; Menu
            </span>
            <h2 className="menu-title text-display-xl text-white">
              Culinary<br />Excellence
            </h2>
          </div>
          <div className="mt-6 md:mt-0 flex items-center gap-4">
            <ScrollingDataDisplay />
            <span className="text-[#4A4A4A]">|</span>
            <ScrollingDataDisplay />
          </div>
        </div>

        {/* Menu Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6"
        >
          {homepageMenuItems.map((item) => {
            const orderUrl = createOrderUrl(item);
            const priceText = item.price
              ? item.price
              : item.priceGF && item.priceLounge
              ? `${item.priceGF} (GF) / ${item.priceLounge} (Lounge)`
              : item.priceGF || item.priceLounge;

            return (
              <div
                key={item.id}
                className="menu-item group relative flex flex-col justify-between overflow-hidden bg-[#111111] border border-[#ca641b]/10 hover:border-[#ca641b]/40 transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] sm:aspect-[3/4] overflow-hidden bg-[#1A1A1A]">
                  {item.imageAvif ? (
                    <picture>
                      <source srcSet={item.imageAvif} type="image/avif" />
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  ) : (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 text-mono text-[#ca641b] text-[10px] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-sm border border-[#ca641b]/20">
                    {item.category}
                  </span>
                </div>

                {/* Content Area */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-white text-base uppercase tracking-[-0.02em] leading-snug">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="text-[#8A8A8A] text-xs mt-1.5 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#1A1A1A] flex flex-col gap-3">
                    <span className="font-mono text-[#ca641b] text-base font-medium">
                      {priceText}
                    </span>

                    {/* Order Button */}
                    <a
                      href={orderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-[#ca641b]/10 text-[#ca641b] border border-[#ca641b]/30 text-[10px] uppercase tracking-[0.18em] font-medium hover:bg-[#ca641b] hover:text-black transition-all duration-300 group/btn"
                      aria-label={`Order ${item.name} via WhatsApp`}
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:scale-110" />
                      <span>Order via WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#ca641b]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* View Full Menu CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/menu"
            className="inline-flex items-center gap-3 text-[#8A8A8A] text-xs uppercase tracking-[0.2em] hover:text-[#ca641b] transition-colors duration-300 group"
            data-hover
          >
            <span>View Full Menu</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
