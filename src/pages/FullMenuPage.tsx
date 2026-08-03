import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  foodCategories,
  drinkCategories,
  type MenuCategory,
  type MenuItem,
  createOrderUrl,
} from "../data/menuData";

gsap.registerPlugin(ScrollTrigger);

// ─── WhatsApp SVG Icon ────────────────────────────────────────────────────────
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

// ─── Price Display Helper ─────────────────────────────────────────────────────
function PriceDisplay({ item }: { item: MenuItem }) {
  const hasBothFloors = !!(item.priceGF && item.priceLounge);

  if (hasBothFloors) {
    return (
      <div className="space-y-1.5 mb-5">
        <div className="flex items-center justify-between">
          <span className="text-mono text-[#4A4A4A] text-[9px]">GROUND FLOOR</span>
          <span className="font-mono text-[#ca641b] text-sm tracking-[0.02em]">
            {item.priceGF}
          </span>
        </div>
        <div className="w-full h-[1px] bg-[#1A1A1A]" />
        <div className="flex items-center justify-between">
          <span className="text-mono text-[#4A4A4A] text-[9px]">LOUNGE & ROOFTOP</span>
          <span className="font-mono text-[#ca641b] text-sm tracking-[0.02em]">
            {item.priceLounge}
          </span>
        </div>
      </div>
    );
  }

  const singlePrice = item.price !== undefined
    ? item.price
    : item.priceGF || item.priceLounge;

  return (
    <div className="mb-5">
      {singlePrice ? (
        <span className="font-mono text-[#ca641b] text-lg tracking-[0.02em]">
          {singlePrice}
        </span>
      ) : (
        <span className="text-mono text-[#4A4A4A] text-xs">Price on request</span>
      )}
    </div>
  );
}

// ─── Menu Item Card ───────────────────────────────────────────────────────────
function MenuItemCard({ item, categoryLabel }: { item: MenuItem; categoryLabel: string }) {
  const orderUrl = createOrderUrl(item);

  return (
    <article
      className="menu-card group relative bg-[#111111] border border-[#ca641b]/10 p-6 flex flex-col
                 hover:border-[#ca641b]/35 transition-all duration-400 ease-out
                 hover:bg-[#111111]/80"
    >
      {/* Top row: category badge + floor note */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-mono text-[#ca641b] text-[10px] tracking-[0.12em]">
          {categoryLabel}
        </span>
        {item.note && (
          <span className="text-[9px] uppercase tracking-[0.08em] text-[#4A4A4A] bg-[#1A1A1A] px-2 py-0.5 rounded-sm">
            {item.note}
          </span>
        )}
      </div>

      {/* Item name */}
      <h3 className="text-white text-sm uppercase tracking-[-0.02em] leading-tight mb-2 flex-none">
        {item.name}
      </h3>

      {/* Description */}
      {item.description && (
        <p className="text-body text-[#8A8A8A] leading-relaxed mb-4 flex-1 text-xs">
          {item.description}
        </p>
      )}

      {/* Spacer if no description */}
      {!item.description && <div className="flex-1" />}

      {/* Price */}
      <PriceDisplay item={item} />

      {/* Order Button */}
      <a
        id={`order-${item.id}`}
        href={orderUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 w-full py-3
                   border border-[#ca641b]/40 text-[#ca641b] text-[10px] uppercase
                   tracking-[0.18em] font-medium
                   hover:bg-[#ca641b] hover:text-black hover:border-[#ca641b]
                   transition-all duration-300 group/btn"
        aria-label={`Order ${item.name} via WhatsApp`}
      >
        <WhatsAppIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:scale-110" />
        <span>Order via WhatsApp</span>
      </a>

      {/* Subtle accent glow on hover */}
      <div className="absolute inset-0 bg-[#ca641b]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </article>
  );
}

// ─── Category Section ─────────────────────────────────────────────────────────
function CategorySection({ category }: { category: MenuCategory }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const grid = gridRef.current;
    if (!section || !heading || !grid) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        heading,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 90%",
            once: true,
          },
        }
      );

      // Cards stagger
      gsap.fromTo(
        grid.querySelectorAll(".menu-card"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.05,
          ease: "expo.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 90%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [category.id]);

  return (
    <section
      ref={sectionRef}
      id={`cat-${category.id}`}
      className="mb-20 md:mb-28 scroll-mt-32"
    >
      {/* Category Showcase Banner Image & Heading */}
      <div ref={headingRef} className="mb-8">
        <div className="relative h-48 sm:h-60 md:h-72 w-full rounded-sm overflow-hidden mb-6 group border border-[#ca641b]/20 shadow-2xl bg-[#111111]">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col justify-end">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <h2 className="text-display-l text-white drop-shadow-md leading-none">
                {category.name}
              </h2>
              {category.categoryNote && (
                <span className="text-mono text-[#8A8A8A] text-[10px] bg-black/60 backdrop-blur-md px-3 py-1 rounded-sm border border-[#ca641b]/20 self-start sm:self-auto">
                  {category.categoryNote}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Items grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
      >
        {category.items.map((item) => (
          <MenuItemCard key={item.id} item={item} categoryLabel={category.name} />
        ))}
      </div>
    </section>
  );
}

// ─── Category Pill Nav ────────────────────────────────────────────────────────
function CategoryNav({
  categories,
  activeId,
  onSelect,
}: {
  categories: MenuCategory[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const navRef = useRef<HTMLDivElement>(null);

  const scrollToCategory = useCallback(
    (id: string) => {
      onSelect(id);
      const el = document.getElementById(`cat-${id}`);
      if (el) {
        const offset = 140; // header (64px) + sticky nav (~76px)
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    },
    [onSelect]
  );

  return (
    <div
      ref={navRef}
      className="flex items-center gap-2 overflow-x-auto pb-2 pt-1"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {categories.map((cat) => (
        <button
          key={cat.id}
          id={`nav-${cat.id}`}
          onClick={() => scrollToCategory(cat.id)}
          className={`shrink-0 px-4 py-1.5 text-[10px] uppercase tracking-[0.15em] transition-all duration-300 flex items-center gap-2
                      ${
                        activeId === cat.id
                          ? "bg-[#ca641b] text-black font-medium"
                          : "border border-[#2A2A2A] text-[#4A4A4A] hover:border-[#ca641b]/40 hover:text-[#8A8A8A]"
                      }`}
          data-hover
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Full Menu Page ───────────────────────────────────────────────────────────
export default function FullMenuPage() {
  const [activeTab, setActiveTab] = useState<"food" | "drinks">("food");
  const [activeCategoryId, setActiveCategoryId] = useState(foodCategories[0].id);

  const heroRef = useRef<HTMLDivElement>(null);
  const currentCategories = activeTab === "food" ? foodCategories : drinkCategories;

  // ── SEO meta & Scroll top on mount ──
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute("content") ?? "";

    document.title = "Full Menu | Tranquil by Glims — Ikorodu, Lagos";
    metaDesc?.setAttribute(
      "content",
      "Explore the complete Tranquil by Glims menu — starters, salads, grills, native soups, pasta, cocktails, wines, spirits and more. Order via WhatsApp. Located at Therasus Terminal, Ikorodu, Lagos."
    );

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      document.title = prevTitle;
      metaDesc?.setAttribute("content", prevDesc);
    };
  }, []);

  // ── Hero entrance animation ──
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        hero.querySelectorAll(".hero-reveal"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "expo.out",
        }
      );
    }, hero);
    return () => ctx.revert();
  }, []);

  // ── Scrollspy: track which category is in viewport ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace("cat-", "");
            setActiveCategoryId(id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    currentCategories.forEach((cat) => {
      const el = document.getElementById(`cat-${cat.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentCategories]);

  // ── Switch tabs — reset active category ──
  const handleTabSwitch = (tab: "food" | "drinks") => {
    setActiveTab(tab);
    const cats = tab === "food" ? foodCategories : drinkCategories;
    setActiveCategoryId(cats[0].id);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div
        ref={heroRef}
        className="relative pt-28 md:pt-36 pb-16 md:pb-20 px-6 md:px-12 overflow-hidden"
      >
        {/* Decorative background gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(202,100,27,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-[1680px] mx-auto relative z-10">
          {/* Back link */}
          <Link
            to="/"
            className="hero-reveal inline-flex items-center gap-2 text-[#4A4A4A] text-xs uppercase tracking-[0.15em] hover:text-[#ca641b] transition-colors duration-300 mb-10 group"
            data-hover
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <span>Back to Home</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <span className="hero-reveal text-mono text-[#4A4A4A] block mb-4">
                03 &mdash; Full Menu
              </span>
              <h1 className="hero-reveal text-display-xl text-white">
                Culinary
                <br />
                Excellence
              </h1>
            </div>
            <div className="hero-reveal max-w-sm lg:pb-3">
              <p className="text-body text-[#8A8A8A] leading-relaxed">
                Every dish, every cocktail — crafted with intention at the
                water&apos;s edge. Browse the full menu and order directly via
                WhatsApp.
              </p>
              <p className="text-mono text-[#4A4A4A] text-[10px] mt-3">
                All prices exclusive of VAT &nbsp;·&nbsp; Therasus Terminal,
                Ikorodu, Lagos
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky Navigation Bar ─────────────────────────────────────────── */}
      <div
        className="sticky top-16 z-[99] bg-black/95 backdrop-blur-md border-b border-[#1A1A1A]"
      >
        <div className="max-w-[1680px] mx-auto px-6 md:px-12">
          {/* FOOD | DRINKS top-level tabs */}
          <div className="flex items-center gap-0 border-b border-[#1A1A1A] pt-4">
            {(["food", "drinks"] as const).map((tab) => (
              <button
                key={tab}
                id={`tab-${tab}`}
                onClick={() => handleTabSwitch(tab)}
                className={`relative pb-3 px-1 mr-8 text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                  activeTab === tab
                    ? "text-white"
                    : "text-[#4A4A4A] hover:text-[#8A8A8A]"
                }`}
                data-hover
              >
                {tab === "food" ? "Food" : "Drinks"}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#ca641b]" />
                )}
              </button>
            ))}
          </div>

          {/* Category pills */}
          <div className="py-3">
            <CategoryNav
              categories={currentCategories}
              activeId={activeCategoryId}
              onSelect={setActiveCategoryId}
            />
          </div>
        </div>
      </div>

      {/* ── Menu Content ──────────────────────────────────────────────────── */}
      <div className="max-w-[1680px] mx-auto px-6 md:px-12 pt-16 pb-24">
        {currentCategories.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
      </div>

      {/* ── Footer Note ───────────────────────────────────────────────────── */}
      <div className="border-t border-[#1A1A1A] py-12 px-6 md:px-12">
        <div className="max-w-[1680px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-mono text-[#4A4A4A] text-[10px] text-center md:text-left">
            All prices are exclusive of VAT &nbsp;·&nbsp; Menu subject to
            seasonal availability
          </p>
          <a
            href="https://wa.me/2348121558483?text=Hello%20Tranquil%20by%20Glims!%20I%27d%20like%20to%20make%20a%20reservation."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#ca641b] text-black
                       text-xs uppercase tracking-[0.18em] hover:bg-[#df782c]
                       transition-all duration-300 hover:scale-[0.97]"
            data-hover
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Book a Table</span>
          </a>
        </div>
      </div>
    </div>
  );
}
