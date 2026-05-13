import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
  head: () => ({
    meta: [
      { title: "All Products — Studio Kinetic" },
      { name: "description", content: "Browse the full Studio Kinetic catalogue. Filter by category, sort, and search the entire collection of objects." },
      { property: "og:title", content: "All Products — Studio Kinetic" },
      { property: "og:description", content: "The full catalogue: fashion, tech, beauty, gym, and home & living objects crafted by the studio." },
    ],
  }),
});

type Category = "Fashion" | "Tech" | "Beauty" | "Gym" | "Home & Living";

type Product = {
  id: string;
  index: string;
  name: string;
  category: Category;
  desc: string;
  price: string;
  priceNum: number;
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
  { id: "p1", index: "01", name: "Anodized Sorter", category: "Home & Living", desc: "Precision-cut aluminum desk system. Six modular bays, anodized in graphite.", price: "$120", priceNum: 120, year: "2024", materials: "Anodized aluminum / cork base", image: product1, status: "In Stock", badge: "Studio Pick", swatch: "bg-cream", rating: 4.8, reviews: 124 },
  { id: "p2", index: "02", name: "C-Series Input", category: "Tech", desc: "Transparent polycarbonate keyboard with hot-swappable switches.", price: "$240", priceNum: 240, year: "2024", materials: "Polycarbonate / PBT keycaps", image: product2, status: "Limited", badge: "Hot", swatch: "bg-mint/40", rating: 4.9, reviews: 312 },
  { id: "p3", index: "03", name: "Kinetic Vol. 1", category: "Home & Living", desc: "280 pages of visual research on motion, type, and the digital sublime.", price: "$65", priceNum: 65, year: "2024", materials: "Munken Pure 120gsm / 280pp", image: product3, status: "In Stock", badge: "Bestseller", swatch: "bg-pop/30", rating: 4.7, reviews: 89 },
  { id: "p4", index: "04", name: "Arc Task Lamp", category: "Home & Living", desc: "Sculptural ceramic base with a brushed brass arm. Warm 2700K diffused beam.", price: "$320", priceNum: 320, year: "2024", materials: "Glazed ceramic / solid brass", image: product4, status: "Pre-Order", badge: "New", swatch: "bg-brand-soft", rating: 4.6, reviews: 41 },
  { id: "p5", index: "05", name: "Field Chronograph", category: "Fashion", desc: "Brushed titanium analog with a sandblasted dial. NATO-spec woven nylon strap.", price: "$480", priceNum: 480, year: "2024", materials: "Grade 2 titanium / nylon", image: product5, status: "Limited", badge: "Studio Pick", swatch: "bg-cream", rating: 4.9, reviews: 207 },
  { id: "p6", index: "06", name: "Monolith Speaker", category: "Tech", desc: "Modular two-way active monitor. Aluminum enclosure milled from a single block.", price: "$890", priceNum: 890, year: "2025", materials: "Milled aluminum / silk dome", image: product6, status: "Pre-Order", badge: "New", swatch: "bg-mint/40", rating: 5.0, reviews: 18 },
  { id: "p7", index: "07", name: "Amber Glow Serum", category: "Beauty", desc: "Cold-pressed botanical serum in apothecary-grade amber glass with a brass dropper.", price: "$58", priceNum: 58, year: "2024", materials: "Amber glass / brass / 30ml", image: product7, status: "In Stock", badge: "New", swatch: "bg-pop/30", rating: 4.8, reviews: 96 },
  { id: "p8", index: "08", name: "Cast Iron Bell 16kg", category: "Gym", desc: "Single-cast iron kettlebell with hand-stitched leather grip. Powder-coated matte black.", price: "$145", priceNum: 145, year: "2024", materials: "Cast iron / vegetable-tanned leather", image: product8, status: "In Stock", badge: "Bestseller", swatch: "bg-brand-soft", rating: 4.9, reviews: 211 },
];

const categories = ["All", "Fashion", "Tech", "Beauty", "Gym", "Home & Living"] as const;
type FilterCategory = (typeof categories)[number];

const categoryIcons: Record<FilterCategory, string> = {
  "All": "✦",
  "Fashion": "✿",
  "Tech": "◉",
  "Beauty": "❀",
  "Gym": "◆",
  "Home & Living": "⌂",
};

// Primary categories shown as feature chips at the top (highest count + All).
const primaryCategories: FilterCategory[] = ["All", "Home & Living", "Tech"];
const secondaryCategories: FilterCategory[] = ["Fashion", "Beauty", "Gym"];

const materialsTicker = [
  "Anodized aluminum",
  "Brushed brass",
  "Munken Pure 120gsm",
  "Grade 2 titanium",
  "Cold-pressed botanicals",
  "Glazed ceramic",
  "PBT keycaps",
  "Vegetable-tanned leather",
];

type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price ↑" },
  { key: "price-desc", label: "Price ↓" },
  { key: "rating", label: "Top rated" },
  { key: "newest", label: "Newest" },
];

function ProductTiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const ry = x * 10;
    const rx = -y * 10;
    el.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.02)`;
  };
  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{ transformStyle: "preserve-3d", transition: "transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1)" }}
    >
      {children}
    </div>
  );
}

function ProductsPage() {
  const [category, setCategory] = useState<FilterCategory>("All");
  const [sort, setSort] = useState<SortKey>("featured");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = category === "All" ? [...products] : products.filter((p) => p.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.materials.toLowerCase().includes(q));
    }
    switch (sort) {
      case "price-asc": list.sort((a, b) => a.priceNum - b.priceNum); break;
      case "price-desc": list.sort((a, b) => b.priceNum - a.priceNum); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "newest": list.sort((a, b) => Number(b.year) - Number(a.year)); break;
    }
    return list;
  }, [category, sort, query]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top nav */}
      <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-foreground/5 py-3 sm:py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-3">
        <Link to="/" className="font-semibold tracking-tight text-sm sm:text-base">STUDIO_KINETIC</Link>
        <div className="hidden md:flex gap-8">
          <Link to="/" hash="intel" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Blogs</Link>
          <Link to="/products" className="text-sm font-medium text-foreground hover:text-foreground transition-colors">Shop</Link>
          <Link to="/" hash="studio" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Studio</Link>
        </div>
        <Link to="/" className="inline-flex items-center gap-2 bg-ink text-cream rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:scale-[1.04] transition-transform">
          ← Home
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-foreground/10">
        <div className="absolute inset-0 -z-10 opacity-60" style={{
          background: "radial-gradient(900px 400px at 80% 20%, color-mix(in oklab, var(--brand) 22%, transparent), transparent), radial-gradient(700px 350px at 10% 90%, color-mix(in oklab, var(--pop) 18%, transparent), transparent)",
        }} />
        <div className="px-4 sm:px-8 lg:px-12 pt-10 sm:pt-16 pb-12 sm:pb-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              <span className="size-2 rounded-full bg-pop animate-pulse" />
              <span>The Catalogue · {products.length} objects</span>
              <span className="text-foreground/30">/</span>
              <span>Updated weekly</span>
              <span className="text-foreground/30">/</span>
              <span>Worldwide shipping</span>
            </div>
            <div className="mt-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-16 lg:items-end">
              <h1 className="font-serif text-[2.5rem] sm:text-6xl lg:text-[5.5rem] leading-[0.92] tracking-tight">
                Every object<br />
                <span className="italic text-brand">we’ve made,</span><br />
                <span className="text-foreground/40">in one place.</span>
              </h1>
              <div className="flex flex-col gap-5">
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                  Filter, sort, and search the full Studio Kinetic catalogue — from milled aluminum tools to cold-pressed botanicals. Built in small batches, finished by hand, photographed in our Brooklyn loft.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { k: products.length, l: "Objects" },
                    { k: 5, l: "Categories" },
                    { k: "24h", l: "Avg. ship" },
                  ].map((s) => (
                    <div key={s.l} className="rounded-2xl bg-background/60 backdrop-blur border border-foreground/10 px-3 py-3">
                      <div className="font-serif text-2xl sm:text-3xl tabular-nums">{s.k}</div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Primary category feature chips */}
            <div className="mt-10 sm:mt-14 grid grid-cols-3 gap-2 sm:gap-4">
              {primaryCategories.map((c) => {
                const count = c === "All" ? products.length : products.filter((p) => p.category === c).length;
                const active = c === category;
                return (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`group relative overflow-hidden rounded-2xl border text-left p-4 sm:p-5 transition-all ${
                      active
                        ? "bg-ink text-cream border-ink shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]"
                        : "bg-card border-foreground/10 hover:border-foreground/40 hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className={`text-2xl sm:text-3xl leading-none ${active ? "text-pop" : "text-foreground/60"}`}>{categoryIcons[c]}</span>
                      <span className={`text-[10px] tabular-nums uppercase tracking-widest ${active ? "text-cream/60" : "text-muted-foreground"}`}>{String(count).padStart(2, "0")}</span>
                    </div>
                    <div className="mt-6 sm:mt-10 font-serif text-lg sm:text-2xl tracking-tight">{c}</div>
                    <div className={`text-[10px] uppercase tracking-widest mt-1 ${active ? "text-cream/60" : "text-muted-foreground"}`}>
                      {active ? "Now showing" : "Tap to filter"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Secondary categories bar */}
      <div className="border-b border-foreground/10 bg-foreground/[0.02]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-3 flex items-center gap-3 overflow-x-auto">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground shrink-0">Also</span>
          {secondaryCategories.map((c) => {
            const count = products.filter((p) => p.category === c).length;
            const active = c === category;
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium transition-all ${
                  active
                    ? "bg-ink text-cream border-ink"
                    : "bg-background text-foreground/70 border-foreground/15 hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                <span className="text-xs">{categoryIcons[c]}</span>
                {c}
                <span className={`text-[10px] tabular-nums ${active ? "text-cream/60" : "text-muted-foreground"}`}>{count}</span>
              </button>
            );
          })}
          {(category !== "All" || query) && (
            <button onClick={() => { setCategory("All"); setQuery(""); }} className="ml-auto shrink-0 text-[10px] uppercase tracking-widest text-foreground/60 hover:text-foreground underline underline-offset-4">
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Toolbar */}
      <section className="px-4 sm:px-8 lg:px-12 py-6 border-b border-foreground/10 sticky top-[57px] sm:top-[65px] z-30 bg-background/85 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => {
              const count = c === "All" ? products.length : products.filter((p) => p.category === c).length;
              const active = c === category;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`group inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-all ${
                    active
                      ? "bg-ink text-cream border-ink"
                      : "bg-background text-foreground/70 border-foreground/15 hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  <span className="text-base leading-none">{categoryIcons[c]}</span>
                  {c}
                  <span className={`text-[10px] tabular-nums ${active ? "text-cream/60" : "text-muted-foreground"}`}>{count}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">⌕</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search materials, names, finishes..."
                className="w-full pl-9 pr-3 py-2.5 rounded-full bg-foreground/[0.04] border border-foreground/10 text-sm focus:outline-none focus:border-foreground/40 transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground mr-2">Sort</span>
              {sortOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setSort(opt.key)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all ${
                    sort === opt.key
                      ? "bg-foreground text-background"
                      : "bg-foreground/[0.04] text-foreground/70 hover:bg-foreground/[0.08]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 sm:px-8 lg:px-12 py-10 sm:py-16">
        <div className="max-w-[1400px] mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-3xl font-serif italic text-muted-foreground">Nothing matches.</p>
              <button onClick={() => { setQuery(""); setCategory("All"); }} className="mt-4 text-sm underline underline-offset-4">Reset filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-7">
              {filtered.map((p, idx) => (
                <ProductTiltCard key={p.id} className="group relative">
                  <article className="relative bg-card rounded-2xl border border-foreground/10 overflow-hidden h-full flex flex-col shadow-[0_1px_0_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] transition-shadow">
                    <div className={`relative aspect-[4/5] overflow-hidden ${p.swatch}`}>
                      <img
                        src={p.image}
                        alt={p.name}
                        loading={idx < 4 ? "eager" : "lazy"}
                        className="absolute inset-0 w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        <span className="text-[10px] font-bold tracking-widest uppercase bg-background/90 backdrop-blur px-2 py-1 rounded-full">
                          {p.index} · {p.category}
                        </span>
                        {p.badge && (
                          <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-full w-max ${
                            p.badge === "Hot" ? "bg-pop text-pop-foreground" :
                            p.badge === "New" ? "bg-mint text-ink" :
                            p.badge === "Bestseller" ? "bg-ink text-cream" :
                            "bg-brand text-brand-foreground"
                          }`}>
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <div className="absolute top-3 right-3 text-[10px] font-medium bg-background/90 backdrop-blur px-2 py-1 rounded-full">
                        {p.status}
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-serif text-lg sm:text-xl leading-tight">{p.name}</h3>
                        <span className="font-mono text-sm font-semibold tabular-nums">{p.price}</span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed line-clamp-2">{p.desc}</p>
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                        <span className="text-pop">★</span>
                        <span className="font-medium text-foreground tabular-nums">{p.rating.toFixed(1)}</span>
                        <span>({p.reviews})</span>
                        <span className="ml-auto text-[10px] uppercase tracking-widest">{p.year}</span>
                      </div>
                      <div className="mt-auto pt-3 border-t border-foreground/10 flex items-center gap-2">
                        <button data-cursor="Bag it" className="flex-1 inline-flex items-center justify-center gap-2 bg-ink text-cream rounded-full py-2 text-[11px] font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform">
                          Bag · {p.price}
                        </button>
                        <button aria-label="Save" className="size-9 grid place-items-center rounded-full border border-foreground/15 hover:border-foreground/40 transition-colors">
                          ♡
                        </button>
                      </div>
                    </div>
                  </article>
                </ProductTiltCard>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer band */}
      <section className="px-4 sm:px-8 lg:px-12 py-12 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-serif text-2xl sm:text-3xl">More drops, soon.</p>
          <Link to="/" className="inline-flex items-center gap-3 bg-ink text-cream rounded-full pl-2 pr-5 py-2 text-xs font-bold uppercase tracking-widest hover:scale-[1.03] transition-transform">
            <span className="size-7 rounded-full bg-pop text-pop-foreground grid place-items-center">←</span>
            Back to studio
          </Link>
        </div>
      </section>
    </div>
  );
}