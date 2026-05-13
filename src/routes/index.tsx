import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
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
  oldPrice?: string;
  year: string;
  materials: string;
  image: string;
  status: "In Stock" | "Pre-Order" | "Limited";
  badge?: "New" | "Bestseller" | "-20%" | "Hot";
  swatch: string;
  rating: number;
  reviews: number;
};

const products: Product[] = [
  { id: "p1", index: "01", name: "Anodized Sorter", category: "Home & Living", desc: "Precision-cut aluminum desk system. Six modular bays, anodized in graphite.", price: "$120", oldPrice: "$150", year: "2024", materials: "Anodized aluminum / cork base", image: product1, status: "In Stock", badge: "-20%", swatch: "bg-cream", rating: 4.8, reviews: 124 },
  { id: "p2", index: "02", name: "C-Series Input", category: "Tech", desc: "Transparent polycarbonate keyboard with hot-swappable switches.", price: "$240", year: "2024", materials: "Polycarbonate / PBT keycaps", image: product2, status: "Limited", badge: "Hot", swatch: "bg-mint/40", rating: 4.9, reviews: 312 },
  { id: "p3", index: "03", name: "Kinetic Vol. 1", category: "Home & Living", desc: "280 pages of visual research on motion, type, and the digital sublime.", price: "$65", year: "2024", materials: "Munken Pure 120gsm / 280pp", image: product3, status: "In Stock", badge: "Bestseller", swatch: "bg-pop/30", rating: 4.7, reviews: 89 },
  { id: "p4", index: "04", name: "Arc Task Lamp", category: "Home & Living", desc: "Sculptural ceramic base with a brushed brass arm. Warm 2700K diffused beam.", price: "$320", year: "2024", materials: "Glazed ceramic / solid brass", image: product4, status: "Pre-Order", badge: "New", swatch: "bg-brand-soft", rating: 4.6, reviews: 41 },
  { id: "p5", index: "05", name: "Field Chronograph", category: "Fashion", desc: "Brushed titanium analog with a sandblasted dial. NATO-spec woven nylon strap.", price: "$480", oldPrice: "$540", year: "2024", materials: "Grade 2 titanium / nylon", image: product5, status: "Limited", badge: "-20%", swatch: "bg-cream", rating: 4.9, reviews: 207 },
  { id: "p6", index: "06", name: "Monolith Speaker", category: "Tech", desc: "Modular two-way active monitor. Aluminum enclosure milled from a single block.", price: "$890", year: "2025", materials: "Milled aluminum / silk dome", image: product6, status: "Pre-Order", badge: "New", swatch: "bg-mint/40", rating: 5.0, reviews: 18 },
  { id: "p7", index: "07", name: "Amber Glow Serum", category: "Beauty", desc: "Cold-pressed botanical serum in apothecary-grade amber glass with a brass dropper.", price: "$58", year: "2024", materials: "Amber glass / brass / 30ml", image: product7, status: "In Stock", badge: "New", swatch: "bg-pop/30", rating: 4.8, reviews: 96 },
  { id: "p8", index: "08", name: "Cast Iron Bell 16kg", category: "Gym", desc: "Single-cast iron kettlebell with hand-stitched leather grip. Powder-coated matte black.", price: "$145", oldPrice: "$170", year: "2024", materials: "Cast iron / vegetable-tanned leather", image: product8, status: "In Stock", badge: "Bestseller", swatch: "bg-brand-soft", rating: 4.9, reviews: 211 },
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

      <div className="relative h-full flex flex-col justify-end px-8 pb-16">
        <div className="max-w-screen-xl mx-auto w-full">
          <p key={`l-${active}`} className="text-xs font-medium uppercase tracking-[0.2em] mb-3 opacity-70 animate-fade-up">
            {slides[active].label}
          </p>
          <h1 key={`t-${active}`} className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-balance leading-none mb-6 animate-fade-up">
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

      <div className="absolute bottom-8 right-8 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1 w-12 transition-colors ${i === active ? "bg-foreground" : "bg-foreground/15 hover:bg-foreground/30"}`}
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
  "-20%": "bg-brand text-brand-foreground",
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

  return (
    <section id="work" className="relative py-24 px-8 overflow-hidden" style={{ background: "var(--gradient-cream)" }}>
      {/* Decorative blob */}
      <div
        aria-hidden
        className="absolute -top-32 -right-40 size-[520px] bg-brand/25 blur-3xl animate-blob pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-10 -left-40 size-[420px] bg-mint/40 blur-3xl animate-blob pointer-events-none"
        style={{ animationDelay: "-7s" }}
      />

      <div className="relative max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-4">
              <span className="size-1.5 rounded-full bg-brand animate-pulse" />
              Shop the drop · 06 pieces
            </span>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-balance leading-[0.95]">
              Pick your{" "}
              <span className="italic font-light bg-gradient-to-r from-brand to-pop bg-clip-text text-transparent">
                favourite thing.
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <span className="size-2 rounded-full bg-mint" />
              Free shipping over $200
            </div>
            <button className="relative inline-flex items-center gap-2 bg-ink text-cream rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-widest hover:scale-[1.03] transition-transform" data-cursor="View Cart">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
                <path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" />
                <circle cx="9" cy="21" r="1.5" /><circle cx="18" cy="21" r="1.5" />
              </svg>
              Cart
              <span className="ml-1 inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-brand text-brand-foreground text-[10px] font-mono px-1.5">
                {cart.length}
              </span>
            </button>
          </div>
        </div>

        {/* Category filter — icon-driven, prominent */}
        <div className="relative mb-10 -mx-2 px-2 overflow-x-auto">
          <div className="flex items-stretch gap-3 min-w-max">
            {productCategories.map((c) => {
              const count = c === "All" ? products.length : products.filter((p) => p.category === c).length;
              const selected = c === category;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  data-cursor="Filter"
                  className={`group relative flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 ${
                    selected
                      ? "bg-ink text-cream shadow-[0_12px_30px_-12px_rgba(0,0,0,0.45)] scale-[1.03]"
                      : "bg-background border border-foreground/10 text-foreground/70 hover:text-ink hover:border-foreground/40 hover:-translate-y-0.5"
                  }`}
                >
                  <span className={`size-9 grid place-items-center rounded-xl text-base transition-colors ${
                    selected ? "bg-pop text-pop-foreground" : "bg-foreground/5 group-hover:bg-brand/15"
                  }`}>
                    {categoryIcons[c]}
                  </span>
                  <span className="text-left">
                    <span className="block text-xs font-bold uppercase tracking-widest leading-tight">{c}</span>
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          <article className="lg:col-span-7 relative overflow-hidden rounded-3xl bg-brand text-brand-foreground p-8 md:p-12 group">
            <div aria-hidden className="absolute -bottom-20 -right-20 size-[420px] bg-pop/40 rounded-full blur-3xl" />
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-flex items-center gap-2 bg-pop text-pop-foreground rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-5">
                  ★ Editor's pick
                </span>
                <h3 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1] mb-4">
                  {featured.name}
                </h3>
                <p className="text-brand-foreground/80 text-pretty mb-6 max-w-sm">{featured.desc}</p>
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-semibold">{featured.price}</span>
                  <StarRow rating={featured.rating} />
                  <span className="text-xs opacity-70">({featured.reviews})</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => toggle(cart, setCart, featured.id)}
                    data-cursor="Add"
                    className="inline-flex items-center gap-2 bg-cream text-ink rounded-full px-5 py-3 text-xs font-bold uppercase tracking-widest hover:scale-[1.03] transition-transform"
                  >
                    {cart.includes(featured.id) ? "Added ✓" : "Add to bag"}
                  </button>
                  <button
                    onClick={() => toggle(wishlist, setWishlist, featured.id)}
                    aria-label="Save to wishlist"
                    className="inline-flex items-center justify-center size-11 rounded-full bg-brand-foreground/10 hover:bg-brand-foreground/20 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill={wishlist.includes(featured.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="size-4">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6z"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-brand-foreground/10">
                <img src={featured.image} alt={featured.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
            </div>
          </article>

          {/* Marquee promo column */}
          <aside className="lg:col-span-5 grid grid-rows-2 gap-6">
            <div className="relative overflow-hidden rounded-3xl bg-mint text-ink p-8 flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-2 opacity-70">Limited drop</p>
                <h4 className="text-2xl font-semibold tracking-tight leading-tight">
                  Free engraving on any titanium piece this week.
                </h4>
              </div>
              <button className="self-start mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest underline underline-offset-4">
                Shop wear →
              </button>
              <span aria-hidden className="absolute -right-6 -bottom-6 text-[140px] font-bold leading-none text-ink/10 select-none">★</span>
            </div>
            <div className="relative overflow-hidden rounded-3xl bg-ink text-cream p-8 flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-2 text-pop">Member offer</p>
                <h4 className="text-2xl font-semibold tracking-tight leading-tight">
                  20% off your first order. Code <span className="text-pop">KINETIC20</span>.
                </h4>
              </div>
              <div className="overflow-hidden mt-4 -mx-8">
                <div className="flex gap-6 whitespace-nowrap animate-[ticker_22s_linear_infinite] text-xs font-mono uppercase tracking-widest text-cream/60">
                  {Array.from({ length: 2 }).map((_, k) => (
                    <span key={k} className="flex gap-6">
                      {["Free returns", "Carbon-neutral ship", "Studio crafted", "Lifetime repair"].map((t) => (
                        <span key={t} className="inline-flex items-center gap-6">
                          {t} <span className="text-pop">✦</span>
                        </span>
                      ))}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Compact product grid — 4 cols on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {filtered.map((p) => {
            const inCart = cart.includes(p.id);
            const liked = wishlist.includes(p.id);
            return (
              <article
                key={p.id}
                className="group relative rounded-2xl overflow-hidden bg-background outline-1 -outline-offset-1 outline-foreground/5 hover:outline-foreground/25 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)]"
              >
                <div className={`relative aspect-[4/5] overflow-hidden ${p.swatch}`}>
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
                    className={`absolute top-10 right-3 size-8 rounded-full grid place-items-center backdrop-blur transition-all duration-300 ${
                      liked
                        ? "bg-brand text-brand-foreground scale-100 opacity-100"
                        : "bg-background/85 text-foreground opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-background"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="size-3.5">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6z"/>
                    </svg>
                  </button>

                  {/* Hover quick add */}
                  <div className="absolute inset-x-3 bottom-3 translate-y-[140%] group-hover:translate-y-0 transition-transform duration-500 ease-out">
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

                <div className="p-3.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground truncate">{p.category}</span>
                    <StarRow rating={p.rating} />
                  </div>
                  <h3 className="text-sm font-semibold tracking-tight truncate">{p.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-sm font-semibold">{p.price}</span>
                    {p.oldPrice ? (
                      <span className="text-[10px] text-muted-foreground line-through">{p.oldPrice}</span>
                    ) : null}
                    <span className="ml-auto text-[9px] font-mono uppercase tracking-widest text-muted-foreground">{p.status}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground py-8">No objects in this category yet.</p>
        )}

        <div className="mt-12 flex justify-center">
          <a href="#" data-cursor="Shop all" className="inline-flex items-center gap-3 bg-ink text-cream rounded-full pl-2 pr-5 py-2 text-xs font-bold uppercase tracking-widest hover:scale-[1.03] transition-transform">
            <span className="size-7 rounded-full bg-pop text-pop-foreground grid place-items-center">→</span>
            Shop the full catalogue
          </a>
        </div>
      </div>
    </section>
  );
}

function BlogSection() {
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
      className="relative py-20 md:py-24 px-8 bg-background"
      onMouseMove={(e) => setCoords({ x: e.clientX, y: e.clientY })}
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-brand animate-pulse" />
              Journal · {list.length + (showFeatured ? 1 : 0)} entries
            </p>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-balance leading-[0.95]">
              Stories worth <span className="italic font-light text-muted-foreground">reading slowly.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((t) => {
              const selected = t === tag;
              return (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  data-cursor="Filter"
                  className={`text-[11px] font-semibold uppercase tracking-widest px-3.5 py-2 rounded-full transition-all ${
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
            className="group relative grid grid-cols-1 lg:grid-cols-12 gap-0 mb-14 overflow-hidden rounded-3xl bg-ink text-cream"
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
            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between gap-8">
              <div>
                <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-cream/60 mb-5">
                  <span className="text-pop">{featuredArticle.tag}</span>
                  <span>·</span>
                  <span>{featuredArticle.readTime}</span>
                  <span>·</span>
                  <span>{featuredArticle.date}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.05] mb-5 text-balance">
                  {featuredArticle.title}
                </h3>
                <p className="text-cream/70 text-pretty max-w-md">{featuredArticle.excerpt}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-cream/60">
                  By <span className="text-cream">{featuredArticle.author}</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); toggleSave(featuredArticle.id); }}
                    aria-label={saved.includes(featuredArticle.id) ? "Unsave" : "Save"}
                    className={`size-10 rounded-full grid place-items-center transition-all ${
                      saved.includes(featuredArticle.id) ? "bg-brand text-brand-foreground scale-110" : "bg-cream/10 text-cream hover:bg-cream/20"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" fill={saved.includes(featuredArticle.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="size-4">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                  </button>
                  <span className="inline-flex items-center gap-2 bg-cream text-ink rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-widest group-hover:bg-pop group-hover:text-pop-foreground transition-colors">
                    Read story →
                  </span>
                </div>
              </div>
            </div>
          </a>
        )}

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
                        className="col-span-10 md:col-span-6 text-2xl md:text-3xl font-medium tracking-tight transition-transform duration-500 ease-out"
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
        <div className="flex gap-10 whitespace-nowrap animate-[ticker_30s_linear_infinite] text-[11px] font-mono uppercase tracking-[0.25em]">
          {Array.from({ length: 3 }).map((_, k) => (
            <span key={k} className="flex gap-10 items-center shrink-0">
              <span>✦ Free shipping over $200</span>
              <span className="text-pop">/</span>
              <span>New drop · Beauty + Gym now live</span>
              <span className="text-pop">/</span>
              <span>Use code <span className="text-pop">KINETIC20</span> for 20% off</span>
              <span className="text-pop">/</span>
              <span>Lifetime repair on all apparatus</span>
              <span className="text-pop">/</span>
            </span>
          ))}
        </div>
      </div>

      <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-foreground/5 py-4 px-8 flex justify-between items-center">
        <span className="font-semibold tracking-tight text-base">STUDIO_KINETIC</span>
        <div className="hidden md:flex gap-8">
          <a href="#intel" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Journal</a>
          <a href="#work" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Shop</a>
          <a href="#studio" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Studio</a>
        </div>
        <a href="#work" className="hidden md:inline-flex items-center gap-2 bg-ink text-cream rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest hover:scale-[1.04] transition-transform">
          Shop drop →
        </a>
      </nav>

      <Hero />

      <BlogSection />

      <ProductShowcase />

      <footer id="studio" className="border-t border-border">
        <section className="py-20 px-8 border-b border-border">
          <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-6">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground mb-4">Dispatch — Monthly</p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-balance max-w-[18ch]">
                Field notes from the studio, delivered.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <NewsletterForm />
            </div>
          </div>
        </section>
        <div className="py-12 px-8">
          <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">© 2024 Studio Kinetic. All rights reserved.</p>
            <div className="flex gap-8">
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
