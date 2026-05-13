import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type MouseEvent as ReactMouseEvent, type ReactNode, type RefObject } from "react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import blog4 from "@/assets/blog-4.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Studio Kinetic — Visual Systems for the Digital Vanguard" },
      { name: "description", content: "An editorial studio building distinctive visual systems, journals, and curated objects for forward brands." },
    ],
  }),
});

const slides = [
  {
    image: hero1,
    label: "Case Study 01 / 04",
    title: ["Visual Systems for", "the Digital Vanguard"],
  },
  {
    image: hero2,
    label: "Case Study 02 / 04",
    title: ["Architecture as", "Editorial Language"],
  },
  {
    image: hero3,
    label: "Case Study 03 / 04",
    title: ["Soft Forms,", "Hard Discipline"],
  },
];

type Category = "Fashion" | "Tech" | "Beauty" | "Gym" | "Home & Living";

type Product = {
  id: string;
  index: string;
  name: string;
  category: Category;
  desc: string;
  price: string;
  year: string;
  materials: string;
  image: string;
  status: "In Stock" | "Pre-Order" | "Limited";
  badge?: "New" | "Bestseller" | "Studio Pick" | "Hot";
  swatch: string;
  rating: number;
  reviews: number;
};

const products: Product[] = [
  { id: "p1", index: "01", name: "Anodized Sorter", category: "Home & Living", desc: "Precision-cut aluminum desk system. Six modular bays, anodized in graphite.", price: "$120", year: "2024", materials: "Anodized aluminum / cork base", image: product1, status: "In Stock", badge: "Studio Pick", swatch: "bg-cream", rating: 4.8, reviews: 124 },
  { id: "p2", index: "02", name: "C-Series Input", category: "Tech", desc: "Transparent polycarbonate keyboard with hot-swappable switches.", price: "$240", year: "2024", materials: "Polycarbonate / PBT keycaps", image: product2, status: "Limited", badge: "Hot", swatch: "bg-mint/40", rating: 4.9, reviews: 312 },
  { id: "p3", index: "03", name: "Kinetic Vol. 1", category: "Home & Living", desc: "280 pages of visual research on motion, type, and the digital sublime.", price: "$65", year: "2024", materials: "Munken Pure 120gsm / 280pp", image: product3, status: "In Stock", badge: "Bestseller", swatch: "bg-pop/30", rating: 4.7, reviews: 89 },
  { id: "p4", index: "04", name: "Arc Task Lamp", category: "Home & Living", desc: "Sculptural ceramic base with a brushed brass arm. Warm 2700K diffused beam.", price: "$320", year: "2024", materials: "Glazed ceramic / solid brass", image: product4, status: "Pre-Order", badge: "New", swatch: "bg-brand-soft", rating: 4.6, reviews: 41 },
  { id: "p5", index: "05", name: "Field Chronograph", category: "Fashion", desc: "Brushed titanium analog with a sandblasted dial. NATO-spec woven nylon strap.", price: "$480", year: "2024", materials: "Grade 2 titanium / nylon", image: product5, status: "Limited", badge: "Studio Pick", swatch: "bg-cream", rating: 4.9, reviews: 207 },
  { id: "p6", index: "06", name: "Monolith Speaker", category: "Tech", desc: "Modular two-way active monitor. Aluminum enclosure milled from a single block.", price: "$890", year: "2025", materials: "Milled aluminum / silk dome", image: product6, status: "Pre-Order", badge: "New", swatch: "bg-mint/40", rating: 5.0, reviews: 18 },
  { id: "p7", index: "07", name: "Amber Glow Serum", category: "Beauty", desc: "Cold-pressed botanical serum in apothecary-grade amber glass with a brass dropper.", price: "$58", year: "2024", materials: "Amber glass / brass / 30ml", image: product7, status: "In Stock", badge: "New", swatch: "bg-pop/30", rating: 4.8, reviews: 96 },
  { id: "p8", index: "08", name: "Cast Iron Bell 16kg", category: "Gym", desc: "Single-cast iron kettlebell with hand-stitched leather grip. Powder-coated matte black.", price: "$145", year: "2024", materials: "Cast iron / vegetable-tanned leather", image: product8, status: "In Stock", badge: "Bestseller", swatch: "bg-brand-soft", rating: 4.9, reviews: 211 },
];


const productCategories = ["All", "Fashion", "Tech", "Beauty", "Gym", "Home & Living"] as const;
type FilterCategory = (typeof productCategories)[number];

const categoryIcons: Record<FilterCategory, string> = {
  "All": "✦",
  "Fashion": "✿",
  "Tech": "◉",
  "Beauty": "❀",
  "Gym": "◆",
  "Home & Living": "⌂",
};

type Article = {
  id: string;
  index: string;
  tag: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  date: string;
  image: string;
};

const featuredArticle: Article = {
  id: "a0",
  index: "00",
  tag: "Identity",
  title: "The death of the flat logo and the rise of depth",
  excerpt: "Spatial computing is forcing a fundamental shift in how brand marks are constructed. We trace the new dimensionality.",
  author: "Mira Okafor",
  readTime: "8 min read",
  date: "April 24, 2024",
  image: blog1,
};

const articles: Article[] = [
  {
    id: "a1",
    index: "01",
    tag: "Technology",
    title: "Neural interfaces and the user experience",
    excerpt: "What happens to UX when the input device is your intent? A field guide for designers entering the BCI era.",
    author: "Jules Verma",
    readTime: "6 min read",
    date: "April 12, 2024",
    image: blog2,
  },
  {
    id: "a2",
    index: "02",
    tag: "Culture",
    title: "Why maximalism is the new luxury for Gen Alpha",
    excerpt: "After a decade of restraint, density and texture are quietly winning. We look at the studios driving the shift.",
    author: "Tomás Brand",
    readTime: "5 min read",
    date: "March 28, 2024",
    image: blog4,
  },
  {
    id: "a3",
    index: "03",
    tag: "Process",
    title: "Coded design: Building tools, not just pages",
    excerpt: "How a small studio replaced its handoff workflow with a single source of truth — and shipped 3× faster.",
    author: "Iris Lemont",
    readTime: "10 min read",
    date: "January 09, 2024",
    image: blog3,
  },
];

type InteractiveCard = {
  id: string;
  tag: string;
  title: string;
  excerpt: string;
  meta: string;
  image: string;
  accent: "brand" | "pop" | "mint" | "ink";
};

const interactiveCards: InteractiveCard[] = [
  {
    id: "ic1",
    tag: "Field Notes",
    title: "A week inside a Tokyo type foundry",
    excerpt: "Inkstones, glyph proofs, and the slow architecture of a 14,000-character family.",
    meta: "Photo essay · 12 frames",
    image: blog2,
    accent: "brand",
  },
  {
    id: "ic2",
    tag: "Interview",
    title: "Anya Mehta on designing for stillness",
    excerpt: "The London-based art director on whitespace, refusal, and the politics of not shouting.",
    meta: "Long read · 14 min",
    image: blog4,
    accent: "pop",
  },
  {
    id: "ic3",
    tag: "Toolkit",
    title: "Ten micro-interactions worth stealing",
    excerpt: "A live, copy-paste reel of the small motion details that make interfaces feel alive.",
    meta: "Interactive · 10 demos",
    image: blog3,
    accent: "mint",
  },
  {
    id: "ic4",
    tag: "Essay",
    title: "The quiet return of the print object",
    excerpt: "Risograph zines, hand-bound annuals, and why studios are pressing things again.",
    meta: "Essay · 7 min",
    image: blog1,
    accent: "ink",
  },
];

const marqueeTopics = [
  "Spatial Design",
  "Editorial Systems",
  "Type Specimens",
  "Motion Studies",
  "Material Research",
  "Interface Theory",
  "Sound Design",
  "Brand Architecture",
];

function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-[68vh] min-h-[520px] w-full overflow-hidden bg-neutral-200">
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === active ? 1 : 0 }}
          aria-hidden={i !== active}
        >
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover"
            width={1920}
            height={1088}
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      <div className="relative h-full flex flex-col justify-end px-4 sm:px-8 pb-12 sm:pb-16">
        <div className="max-w-screen-xl mx-auto w-full">
          <p key={`l-${active}`} className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] mb-3 opacity-70 animate-fade-up">
            {slides[active].label}
          </p>
          <h1 key={`t-${active}`} className="text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-balance leading-[1.02] sm:leading-none mb-5 sm:mb-6 animate-fade-up">
            {slides[active].title[0]}
            <br />
            {slides[active].title[1]}
          </h1>
          <button className="group inline-flex items-center gap-3 bg-foreground text-background py-2 pr-4 pl-2 rounded-full ring-1 ring-foreground hover:scale-[1.02] transition-transform">
            <span className="size-8 bg-background/10 rounded-full flex items-center justify-center shrink-0">
              <svg className="size-4 text-background" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8.5 3.5a.5.5 0 0 1 .854-.354l4.5 4.5a.5.5 0 0 1 0 .708l-4.5 4.5A.5.5 0 0 1 8.5 12.5v-9Z" />
                <path d="M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8Z" />
              </svg>
            </span>
            <span className="text-sm font-medium">View Project</span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1 w-8 sm:w-12 transition-colors ${i === active ? "bg-foreground" : "bg-foreground/15 hover:bg-foreground/30"}`}
          />
        ))}
      </div>
    </section>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-pop-foreground" aria-label={`Rated ${rating} out of 5`}>
      <svg viewBox="0 0 20 20" className="size-3.5 fill-pop" aria-hidden>
        <path d="M10 1.5l2.6 5.3 5.9.85-4.25 4.15 1 5.85L10 14.9l-5.25 2.75 1-5.85L1.5 7.65l5.9-.85L10 1.5z" />
      </svg>
      <span className="font-mono text-[11px] text-foreground/80 tabular-nums">{rating.toFixed(1)}</span>
    </span>
  );
}

const badgeStyles: Record<NonNullable<Product["badge"]>, string> = {
  New: "bg-mint text-ink",
  Bestseller: "bg-pop text-pop-foreground",
  "Studio Pick": "bg-brand text-brand-foreground",
  Hot: "bg-ink text-cream",
};

function ProductShowcase() {
  const [category, setCategory] = useState<FilterCategory>("All");
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const filtered = category === "All" ? products : products.filter((p) => p.category === category);

  const toggle = (list: string[], setList: (v: string[]) => void, id: string) =>
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  const featured = products[3]; // Arc Task Lamp as the hero

  // Trending = top 3 by rating × reviews (simple synthetic ranking)
  const trending = [...products]
    .sort((a, b) => b.rating * b.reviews - a.rating * a.reviews)
    .slice(0, 3);

  return (
    <section id="work" className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ background: "var(--gradient-cream)" }}>
      {/* Decorative blob */}
      <div
        aria-hidden
        className="absolute -top-32 -right-40 size-[320px] sm:size-[520px] bg-brand/25 blur-3xl animate-blob pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-10 -left-40 size-[280px] sm:size-[420px] bg-mint/40 blur-3xl animate-blob pointer-events-none"
        style={{ animationDelay: "-7s" }}
      />

      <div className="relative max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8 sm:mb-10">
          <div>
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3 sm:mb-4">
              <span className="size-1.5 rounded-full bg-brand animate-pulse" />
              Trending & featured · {products.length} pieces
            </span>
            <h2 className="text-[2rem] sm:text-4xl md:text-6xl font-semibold tracking-tight text-balance leading-[1] md:leading-[0.95]">
              Objects people are{" "}
              <span className="italic font-light bg-gradient-to-r from-brand to-pop bg-clip-text text-transparent">
                obsessing over.
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <span className="size-2 rounded-full bg-mint animate-pulse" />
              Stock updates live
            </div>
            <button className="relative inline-flex items-center gap-2 bg-ink text-cream rounded-full px-4 sm:px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs font-semibold uppercase tracking-widest hover:scale-[1.03] transition-transform" data-cursor="View Cart">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5 sm:size-4">
                <path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" />
                <circle cx="9" cy="21" r="1.5" /><circle cx="18" cy="21" r="1.5" />
              </svg>
              Bag
              <span className="ml-1 inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-brand text-brand-foreground text-[10px] font-mono px-1.5">
                {cart.length}
              </span>
            </button>
          </div>
        </div>

        {/* Category filter — icon-driven, prominent */}
        <div className="relative mb-8 sm:mb-10 -mx-4 sm:-mx-2 px-4 sm:px-2 overflow-x-auto scrollbar-none">
          <div className="flex items-stretch gap-2.5 sm:gap-3 min-w-max">
            {productCategories.map((c) => {
              const count = c === "All" ? products.length : products.filter((p) => p.category === c).length;
              const selected = c === category;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  data-cursor="Filter"
                  className={`group relative flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-2xl transition-all duration-300 ${
                    selected
                      ? "bg-ink text-cream shadow-[0_12px_30px_-12px_rgba(0,0,0,0.45)] scale-[1.03]"
                      : "bg-background border border-foreground/10 text-foreground/70 hover:text-ink hover:border-foreground/40 hover:-translate-y-0.5"
                  }`}
                >
                  <span className={`size-8 sm:size-9 grid place-items-center rounded-xl text-sm sm:text-base transition-colors ${
                    selected ? "bg-pop text-pop-foreground" : "bg-foreground/5 group-hover:bg-brand/15"
                  }`}>
                    {categoryIcons[c]}
                  </span>
                  <span className="text-left">
                    <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-widest leading-tight">{c}</span>
                    <span className={`block text-[10px] font-mono leading-tight ${selected ? "text-pop" : "text-muted-foreground"}`}>
                      {count} {count === 1 ? "item" : "items"}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hero featured product */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 mb-10 sm:mb-12">
          <article className="lg:col-span-7 relative overflow-hidden rounded-3xl bg-brand text-brand-foreground p-6 sm:p-8 md:p-12 group">
            <div aria-hidden className="absolute -bottom-20 -right-20 size-[420px] bg-pop/40 rounded-full blur-3xl" />
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="order-2 md:order-1">
                <span className="inline-flex items-center gap-2 bg-pop text-pop-foreground rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-4 sm:mb-5">
                  ★ Editor's pick
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight leading-[1] mb-3 sm:mb-4">
                  {featured.name}
                </h3>
                <p className="text-sm sm:text-base text-brand-foreground/80 text-pretty mb-5 sm:mb-6 max-w-sm">{featured.desc}</p>
                <div className="flex items-baseline gap-3 mb-5 sm:mb-6">
                  <span className="text-2xl sm:text-3xl font-semibold">{featured.price}</span>
                  <StarRow rating={featured.rating} />
                  <span className="text-xs opacity-70">({featured.reviews})</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => toggle(cart, setCart, featured.id)}
                    data-cursor="Add"
                    className="inline-flex items-center gap-2 bg-cream text-ink rounded-full px-4 sm:px-5 py-2.5 sm:py-3 text-[11px] sm:text-xs font-bold uppercase tracking-widest hover:scale-[1.03] transition-transform"
                  >
                    {cart.includes(featured.id) ? "Added ✓" : "Add to bag"}
                  </button>
                  <button
                    onClick={() => toggle(wishlist, setWishlist, featured.id)}
                    aria-label="Save to wishlist"
                    className="inline-flex items-center justify-center size-10 sm:size-11 rounded-full bg-brand-foreground/10 hover:bg-brand-foreground/20 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill={wishlist.includes(featured.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="size-4">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6z"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="order-1 md:order-2 relative aspect-square rounded-2xl overflow-hidden bg-brand-foreground/10">
                <img src={featured.image} alt={featured.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
            </div>
          </article>

          {/* Side column — Trending leaderboard (products only) */}
          <aside className="lg:col-span-5 relative overflow-hidden rounded-3xl bg-ink text-cream p-6 sm:p-7 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em]">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-mint opacity-70 animate-ping" />
                  <span className="relative inline-flex size-2 rounded-full bg-mint" />
                </span>
                Trending now · top 3
              </span>
              <span className="text-[10px] font-mono text-cream/40">updated 2m ago</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight leading-tight">
              What people are <span className="italic font-light text-pop">picking up</span> this week.
            </h3>

            <ul className="flex flex-col gap-2.5 mt-1">
              {trending.map((p, i) => {
                const inCart = cart.includes(p.id);
                return (
                  <li
                    key={p.id}
                    className="group relative flex items-center gap-3 rounded-2xl bg-cream/5 hover:bg-cream/10 p-2.5 sm:p-3 transition-colors animate-fade-up"
                    style={{ animationDelay: `${i * 120}ms` }}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-widest text-pop tabular-nums w-5 shrink-0">
                      0{i + 1}
                    </span>
                    <div className={`relative size-12 sm:size-14 shrink-0 rounded-xl overflow-hidden ${p.swatch}`}>
                      <img src={p.image} alt="" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply" loading="lazy" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-mono uppercase tracking-widest text-cream/50 truncate">{p.category}</p>
                      <p className="text-sm font-semibold tracking-tight truncate">{p.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <StarRow rating={p.rating} />
                        <span className="text-[10px] font-mono text-cream/40 tabular-nums">{p.reviews} reviews</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className="text-sm font-semibold tabular-nums">{p.price}</span>
                      <button
                        type="button"
                        onClick={() => toggle(cart, setCart, p.id)}
                        className={`text-[9px] font-bold uppercase tracking-widest rounded-full px-2.5 py-1 transition-colors ${
                          inCart ? "bg-mint text-ink" : "bg-cream text-ink hover:bg-pop hover:text-pop-foreground"
                        }`}
                      >
                        {inCart ? "✓ Bag" : "+ Bag"}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto pt-2 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-cream/50">
              <span>Live ranking · by bags this week</span>
              <a href="#" className="text-pop hover:underline">See all →</a>
            </div>
          </aside>
        </div>

        {/* Section divider for the catalogue */}
        <div className="flex items-end justify-between mb-5 sm:mb-6">
          <div>
            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-brand" />
              The full collection · {filtered.length} items
            </p>
            <h3 className="mt-2 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
              Tilt, hover, drop into your bag.
            </h3>
          </div>
          <span className="hidden sm:inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            <span className="size-1.5 rounded-full bg-pop animate-pulse" /> Hover to feel it
          </span>
        </div>

        {/* Compact product grid — 4 cols on desktop, with 3D tilt */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5" style={{ perspective: "1200px" }}>
          {filtered.map((p) => {
            const inCart = cart.includes(p.id);
            const liked = wishlist.includes(p.id);
            return (
              <ProductTiltCard
                key={p.id}
                className="group relative rounded-2xl overflow-hidden bg-background outline-1 -outline-offset-1 outline-foreground/5 hover:outline-foreground/25 hover:shadow-[0_25px_50px_-25px_rgba(0,0,0,0.35)]"
              >
                <div className={`relative aspect-[4/5] overflow-hidden ${p.swatch}`} style={{ transform: "translateZ(20px)" }}>
                  <img
                    src={p.image}
                    alt={p.name}
                    width={500}
                    height={625}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                  />

                  {/* Index marker (creative touch) */}
                  <span className="absolute top-3 left-3 font-mono text-[9px] tracking-widest text-foreground/50 bg-background/70 backdrop-blur px-1.5 py-0.5 rounded">
                    /{p.index}
                  </span>

                  {/* Badge top-right */}
                  {p.badge && (
                    <span className={`absolute top-3 right-3 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${badgeStyles[p.badge]}`}>
                      {p.badge}
                    </span>
                  )}

                  {/* Wishlist (slides in on hover, top-right under badge) */}
                  <button
                    onClick={() => toggle(wishlist, setWishlist, p.id)}
                    aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
                    data-cursor={liked ? "Saved" : "Save"}
                    className={`absolute top-10 right-3 size-8 rounded-full grid place-items-center backdrop-blur transition-all duration-300 z-10 ${
                      liked
                        ? "bg-brand text-brand-foreground scale-100 opacity-100"
                        : "bg-background/85 text-foreground opacity-100 sm:opacity-0 sm:-translate-y-1 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 hover:bg-background"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="size-3.5">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6z"/>
                    </svg>
                  </button>

                  {/* Quick add — visible on mobile, slides up on desktop hover */}
                  <div className="absolute inset-x-3 bottom-3 sm:translate-y-[140%] sm:group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <button
                      onClick={() => toggle(cart, setCart, p.id)}
                      data-cursor={inCart ? "In cart" : "Quick add"}
                      className={`w-full rounded-full py-2.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                        inCart ? "bg-mint text-ink" : "bg-ink text-cream hover:bg-brand"
                      }`}
                    >
                      {inCart ? "In bag ✓" : `Quick add · ${p.price}`}
                    </button>
                  </div>
                </div>

                <div className="p-3 sm:p-3.5" style={{ transform: "translateZ(35px)" }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground truncate">{p.category}</span>
                    <StarRow rating={p.rating} />
                  </div>
                  <h4 className="text-sm font-semibold tracking-tight truncate">{p.name}</h4>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-sm font-semibold">{p.price}</span>
                    <span className="ml-auto text-[9px] font-mono uppercase tracking-widest text-muted-foreground">{p.status}</span>
                  </div>
                </div>
              </ProductTiltCard>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground py-8">No objects in this category yet.</p>
        )}

        <div className="mt-10 sm:mt-12 flex justify-center">
          <a href="#" data-cursor="Shop all" className="inline-flex items-center gap-3 bg-ink text-cream rounded-full pl-2 pr-4 sm:pr-5 py-2 text-[11px] sm:text-xs font-bold uppercase tracking-widest hover:scale-[1.03] transition-transform">
            <span className="size-7 rounded-full bg-pop text-pop-foreground grid place-items-center">→</span>
            Shop the full catalogue
          </a>
        </div>
      </div>
    </section>
  );
}

function BlogSection() {
  return <BlogSectionInner />;
}

function ProductTiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  const handleMove = (e: ReactMouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rx = (0.5 - y) * 10;
    const ry = (x - 0.5) * 12;
    el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.02)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "rotateX(0) rotateY(0) translateY(0) scale(1)";
  };

  return (
    <article
      ref={ref as RefObject<HTMLElement>}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 450ms cubic-bezier(0.19,1,0.22,1)",
        willChange: "transform",
      }}
    >
      {children}
    </article>
  );
}

function Tilt3DCard({
  children,
  className,
  index,
  onEnter,
  onLeave,
}: {
  children: ReactNode;
  className?: string;
  index: number;
  onEnter?: () => void;
  onLeave?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const handleMove = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rx = (0.5 - y) * 14;
    const ry = (x - 0.5) * 18;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.02)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0) scale(1)";
    onLeave?.();
  };

  return (
    <a
      ref={ref}
      href="#"
      data-cursor="Read"
      onMouseEnter={onEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 500ms cubic-bezier(0.19,1,0.22,1)",
        animation: `fade-in-up 0.7s cubic-bezier(0.19,1,0.22,1) ${index * 80}ms both`,
        willChange: "transform",
      }}
    >
      {children}
    </a>
  );
}

const accentClasses: Record<InteractiveCard["accent"], { bg: string; chip: string; ring: string; halo: string }> = {
  brand: { bg: "bg-brand text-brand-foreground", chip: "bg-brand-foreground/15 text-brand-foreground", ring: "ring-brand/40", halo: "bg-pop/40" },
  pop:   { bg: "bg-pop text-pop-foreground",     chip: "bg-pop-foreground/15 text-pop-foreground",     ring: "ring-pop/40",   halo: "bg-brand/40" },
  mint:  { bg: "bg-mint text-ink",               chip: "bg-ink/10 text-ink",                            ring: "ring-mint/60",  halo: "bg-brand/30" },
  ink:   { bg: "bg-ink text-cream",              chip: "bg-cream/10 text-cream",                        ring: "ring-ink/40",   halo: "bg-pop/30" },
};

function InteractiveBlogCards({
  cards,
  saved,
  onToggleSave,
  hoverId,
  onHover,
}: {
  cards: InteractiveCard[];
  saved: string[];
  onToggleSave: (id: string) => void;
  hoverId: string | null;
  onHover: (id: string | null) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const update = () => {
      const sRect = scroller.getBoundingClientRect();
      const center = sRect.left + sRect.width / 2;
      itemRefs.current.forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const itemCenter = r.left + r.width / 2;
        // Distance from viewport-center of scroller, normalised to half-width
        const dist = (itemCenter - center) / (sRect.width / 2);
        const clamped = Math.max(-1.2, Math.min(1.2, dist));
        const rotateY = clamped * -28;
        const scale = 1 - Math.min(0.18, Math.abs(clamped) * 0.18);
        const translateZ = -Math.abs(clamped) * 80;
        const opacity = 1 - Math.min(0.45, Math.abs(clamped) * 0.45);
        el.style.transform = `translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(100 - Math.round(Math.abs(clamped) * 100));
      });
    };

    update();
    scroller.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      scroller.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [cards.length]);

  const scrollBy = (dir: 1 | -1) => {
    const s = scrollerRef.current;
    if (!s) return;
    s.scrollBy({ left: dir * (s.clientWidth * 0.7), behavior: "smooth" });
  };

  return (
    <div className="mb-12 sm:mb-14">
      <div className="flex items-end justify-between mb-5 sm:mb-6 gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-pop" />
            Journal carousel · Drag, swipe, scroll
          </p>
          <h3 className="mt-2 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
            A 3D reel of recent stories.
          </h3>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollBy(-1)}
            className="size-9 sm:size-10 grid place-items-center rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollBy(1)}
            className="size-9 sm:size-10 grid place-items-center rounded-full bg-ink text-cream hover:bg-brand transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>

      {/* Horizontal 3D scroller */}
      <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
        {/* Edge fades */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 z-10 bg-gradient-to-r from-background to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 z-10 bg-gradient-to-l from-background to-transparent" />

        <div
          ref={scrollerRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 sm:px-6 lg:px-8 py-6 sm:py-8 scrollbar-none"
          style={{ perspective: "1400px", perspectiveOrigin: "center", scrollbarWidth: "none" }}
        >
          {cards.map((c, i) => {
            const a = accentClasses[c.accent];
            const isHover = hoverId === c.id;
            const isSaved = saved.includes(c.id);
            return (
              <div
                key={c.id}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="snap-center shrink-0 w-[78%] xs:w-[68%] sm:w-[56%] md:w-[44%] lg:w-[34%] xl:w-[28%]"
                style={{
                  transformStyle: "preserve-3d",
                  transition: "transform 380ms cubic-bezier(0.19,1,0.22,1), opacity 380ms ease",
                  willChange: "transform, opacity",
                }}
              >
                <a
                  href="#"
                  data-cursor="Read"
                  onMouseEnter={() => onHover(c.id)}
                  onMouseLeave={() => onHover(null)}
                  className={`group relative block overflow-hidden rounded-3xl ring-1 ${a.ring} ring-inset ${a.bg} aspect-[3/4] p-5 sm:p-6`}
                  style={{ boxShadow: "0 30px 60px -30px rgba(0,0,0,0.45)" }}
                >
                  {/* Background image revealed on hover */}
                  <div
                    aria-hidden
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{ opacity: isHover ? 0.55 : 0 }}
                  >
                    <img src={c.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  </div>
                  {/* Halo blob */}
                  <div
                    aria-hidden
                    className={`absolute -bottom-16 -right-16 size-48 rounded-full blur-3xl ${a.halo} transition-transform duration-700`}
                    style={{ transform: isHover ? "scale(1.4)" : "scale(1)" }}
                  />

                  <div className="relative h-full flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${a.chip}`}>
                        {c.tag}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); onToggleSave(c.id); }}
                        aria-label={isSaved ? "Unsave" : "Save"}
                        className={`size-8 grid place-items-center rounded-full transition-all ${
                          isSaved ? "bg-cream text-ink scale-110" : "bg-black/15 text-current hover:bg-black/25"
                        }`}
                      >
                        <svg viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="size-3.5">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                        </svg>
                      </button>
                    </div>

                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.25em] opacity-60 mb-2">
                        Issue · 0{i + 1}
                      </span>
                      <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight leading-[1.05] text-balance mb-3">
                        {c.title}
                      </h4>
                      <p className="text-sm text-pretty leading-snug opacity-85 mb-4 line-clamp-3">
                        {c.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] opacity-75">
                        <span>{c.meta}</span>
                        <span aria-hidden className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-500">
                          Read →
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}

          {/* Trailing spacer so last card can center */}
          <div aria-hidden className="shrink-0 w-2" />
        </div>
      </div>
    </div>
  );
}

function BlogSectionInner() {
  const allTags = ["All", ...Array.from(new Set([featuredArticle, ...articles].map((a) => a.tag)))];
  const [tag, setTag] = useState<string>("All");
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const list = (tag === "All" ? articles : articles.filter((a) => a.tag === tag));
  const showFeatured = tag === "All" || featuredArticle.tag === tag;
  const previewPool = [featuredArticle, ...articles];
  const previewed = previewPool.find((a) => a.id === hoverId);

  const toggleSave = (id: string) =>
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <section
      id="intel"
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden"
      onMouseMove={(e) => setCoords({ x: e.clientX, y: e.clientY })}
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 sm:gap-6 mb-8 sm:mb-10">
          <div>
            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-3 sm:mb-4 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-brand animate-pulse" />
              Journal · {list.length + (showFeatured ? 1 : 0)} entries
            </p>
            <h2 className="text-[2rem] sm:text-4xl md:text-6xl font-semibold tracking-tight text-balance leading-[1] md:leading-[0.95]">
              Stories worth <span className="italic font-light text-muted-foreground">reading slowly.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 -mx-1 px-1 overflow-x-auto scrollbar-none">
            {allTags.map((t) => {
              const selected = t === tag;
              return (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  data-cursor="Filter"
                  className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full transition-all whitespace-nowrap ${
                    selected
                      ? "bg-ink text-cream scale-[1.04]"
                      : "bg-background border border-foreground/15 text-foreground/70 hover:text-ink hover:border-foreground/40"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured article card */}
        {showFeatured && (
          <a
            href="#"
            data-cursor="Read featured"
            onMouseEnter={() => setHoverId(featuredArticle.id)}
            onMouseLeave={() => setHoverId(null)}
            className="group relative grid grid-cols-1 lg:grid-cols-12 gap-0 mb-12 sm:mb-14 overflow-hidden rounded-3xl bg-ink text-cream"
          >
            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
              <span className="absolute top-5 left-5 inline-flex items-center gap-2 bg-pop text-pop-foreground rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                ★ Featured
              </span>
            </div>
            <div className="lg:col-span-5 p-6 sm:p-8 md:p-12 flex flex-col justify-between gap-6 sm:gap-8">
              <div>
                <div className="flex items-center flex-wrap gap-2 sm:gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-cream/60 mb-4 sm:mb-5">
                  <span className="text-pop">{featuredArticle.tag}</span>
                  <span>·</span>
                  <span>{featuredArticle.readTime}</span>
                  <span>·</span>
                  <span>{featuredArticle.date}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-[1.05] mb-4 sm:mb-5 text-balance">
                  {featuredArticle.title}
                </h3>
                <p className="text-sm sm:text-base text-cream/70 text-pretty max-w-md">{featuredArticle.excerpt}</p>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-cream/60">
                  By <span className="text-cream">{featuredArticle.author}</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); toggleSave(featuredArticle.id); }}
                    aria-label={saved.includes(featuredArticle.id) ? "Unsave" : "Save"}
                    className={`size-9 sm:size-10 rounded-full grid place-items-center transition-all ${
                      saved.includes(featuredArticle.id) ? "bg-brand text-brand-foreground scale-110" : "bg-cream/10 text-cream hover:bg-cream/20"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" fill={saved.includes(featuredArticle.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="size-4">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                  </button>
                  <span className="inline-flex items-center gap-2 bg-cream text-ink rounded-full px-3.5 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest group-hover:bg-pop group-hover:text-pop-foreground transition-colors">
                    Read story →
                  </span>
                </div>
              </div>
            </div>
          </a>
        )}

        {/* Interactive cards — sit between the featured story and the index list */}
        <InteractiveBlogCards
          cards={interactiveCards}
          saved={saved}
          onToggleSave={toggleSave}
          hoverId={hoverId}
          onHover={setHoverId}
        />

        {/* Interactive list */}
        <ul
          className="border-t border-foreground/10"
          onMouseLeave={() => setHoverId(null)}
        >
          {list.map((a) => {
            const active = hoverId === a.id;
            const dim = hoverId !== null && !active;
            const isSaved = saved.includes(a.id);
            return (
              <li
                key={a.id}
                onMouseEnter={() => setHoverId(a.id)}
                className="border-b border-foreground/10"
              >
                <div
                  className="group relative py-7 md:py-8 transition-opacity duration-300"
                  style={{ opacity: dim ? 0.35 : 1 }}
                >
                  <a href="#" data-cursor="Read" className="block">
                    <div className="grid grid-cols-12 gap-4 items-baseline">
                      <span className="col-span-2 md:col-span-1 font-mono text-[10px] text-muted-foreground tabular-nums">
                        {a.index}
                      </span>
                      <h3
                        className="col-span-10 md:col-span-6 text-lg sm:text-2xl md:text-3xl font-medium tracking-tight transition-transform duration-500 ease-out"
                        style={{ transform: active ? "translateX(8px)" : "translateX(0)" }}
                      >
                        <span className="bg-gradient-to-r from-brand to-brand bg-no-repeat bg-[length:0%_2px] bg-[position:0_100%] group-hover:bg-[length:100%_2px] transition-[background-size] duration-500">
                          {a.title}
                        </span>
                      </h3>
                      <span className="hidden md:block md:col-span-2 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                        {a.tag}
                      </span>
                      <span className="hidden md:block md:col-span-2 md:text-right font-mono text-[11px] text-muted-foreground tabular-nums">
                        {a.readTime}
                      </span>
                    </div>
                    <div className="md:hidden mt-1 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      <span>{a.tag}</span>
                      <span>·</span>
                      <span className="tabular-nums">{a.readTime}</span>
                    </div>
                  </a>
                  {/* Hover progress bar */}
                  <span
                    aria-hidden
                    className="absolute left-0 bottom-[-1px] h-px bg-brand transition-all duration-700 ease-out"
                    style={{ width: active ? "100%" : "0%" }}
                  />
                  {/* Save button (desktop) */}
                  <button
                    type="button"
                    onClick={() => toggleSave(a.id)}
                    aria-label={isSaved ? "Unsave article" : "Save article"}
                    data-cursor={isSaved ? "Saved" : "Save"}
                    className={`hidden md:grid absolute right-0 top-1/2 -translate-y-1/2 size-9 place-items-center rounded-full transition-all ${
                      isSaved
                        ? "bg-brand text-brand-foreground opacity-100 scale-100"
                        : "bg-foreground/5 text-foreground opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="size-4">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        {list.length === 0 && !showFeatured && (
          <p className="text-sm text-muted-foreground py-12 text-center">No entries under “{tag}” yet.</p>
        )}

        {/* Saved counter */}
        {saved.length > 0 && (
          <div className="mt-10 inline-flex items-center gap-3 bg-ink text-cream rounded-full pl-2 pr-5 py-2 text-xs font-bold uppercase tracking-widest animate-fade-up">
            <span className="size-7 rounded-full bg-brand text-brand-foreground grid place-items-center font-mono">
              {saved.length}
            </span>
            saved to your reading list
          </div>
        )}

        {/* Floating cursor-tracked preview (desktop) */}
        <div
          aria-hidden
          className="hidden lg:block pointer-events-none fixed top-0 left-0 z-40 w-[280px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl outline-1 outline-black/10 transition-[opacity,transform] duration-300 ease-out"
          style={{
            opacity: previewed ? 1 : 0,
            transform: `translate(${coords.x + 24}px, ${coords.y - 180}px) scale(${previewed ? 1 : 0.9})`,
          }}
        >
          {previewed && (
            <img
              src={previewed.image}
              alt=""
              width={560}
              height={700}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) || trimmed.length > 255) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  };

  if (status === "success") {
    return (
      <div className="border-t border-foreground pt-6 animate-fade-up" role="status" aria-live="polite">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground mb-3">Subscribed</p>
        <p className="text-2xl font-medium tracking-tight mb-4">Thank you — check your inbox.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-xs font-medium uppercase tracking-widest underline underline-offset-4 hover:opacity-60 transition-opacity"
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="border-t border-foreground pt-6">
      <label htmlFor="newsletter-email" className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground block mb-3">
        Email Address
      </label>
      <div className="flex items-center gap-4 border-b border-foreground/30 focus-within:border-brand transition-colors">
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          maxLength={255}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="you@studio.com"
          className="flex-1 bg-transparent py-3 text-lg outline-none placeholder:text-muted-foreground/60"
        />
        <button
          type="submit"
          className="rounded-full bg-brand text-brand-foreground text-xs font-bold uppercase tracking-widest px-5 py-2.5 hover:scale-[1.04] transition-transform"
        >
          Subscribe →
        </button>
      </div>
      {status === "error" ? (
        <p className="text-xs text-destructive mt-3" role="alert">{error}</p>
      ) : (
        <p className="text-xs text-muted-foreground mt-3">No spam. Unsubscribe anytime.</p>
      )}
    </form>
  );
}


function Index() {
  return (
    <main className="bg-background text-foreground selection:bg-foreground/10">
      {/* Top announcement marquee — site-wide creative touch */}
      <div className="relative z-50 bg-ink text-cream py-2 overflow-hidden border-b border-cream/10">
        <div className="flex gap-8 sm:gap-10 whitespace-nowrap animate-[ticker_30s_linear_infinite] text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em]">
          {Array.from({ length: 3 }).map((_, k) => (
            <span key={k} className="flex gap-8 sm:gap-10 items-center shrink-0">
              <span>✦ New drop · Beauty + Gym now live</span>
              <span className="text-pop">/</span>
              <span>Studio crafted · made in small batches</span>
              <span className="text-pop">/</span>
              <span>Trending · Arc Task Lamp · C-Series Input</span>
              <span className="text-pop">/</span>
              <span>Lifetime repair on all apparatus</span>
              <span className="text-pop">/</span>
            </span>
          ))}
        </div>
      </div>

      <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-foreground/5 py-3 sm:py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-3">
        <span className="font-semibold tracking-tight text-sm sm:text-base">STUDIO_KINETIC</span>
        <div className="hidden md:flex gap-8">
          <a href="#intel" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Journal</a>
          <a href="#work" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Shop</a>
          <a href="#studio" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Studio</a>
        </div>
        <a href="#work" className="inline-flex items-center gap-2 bg-ink text-cream rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:scale-[1.04] transition-transform">
          Shop drop →
        </a>
      </nav>

      <Hero />

      <BlogSection />

      <ProductShowcase />

      <footer id="studio" className="border-t border-border">
        <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
          <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-end">
            <div className="lg:col-span-6">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground mb-4">Dispatch — Monthly</p>
              <h2 className="text-[2rem] sm:text-4xl md:text-5xl font-semibold tracking-tight text-balance max-w-[18ch]">
                Field notes from the studio, delivered.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <NewsletterForm />
            </div>
          </div>
        </section>
        <div className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 text-center md:text-left">
            <p className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-widest">© 2024 Studio Kinetic. All rights reserved.</p>
            <div className="flex gap-6 sm:gap-8">
              <a href="#" className="text-xs font-medium uppercase tracking-widest">Instagram</a>
              <a href="#" className="text-xs font-medium uppercase tracking-widest">LinkedIn</a>
              <a href="#" className="text-xs font-medium uppercase tracking-widest">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
