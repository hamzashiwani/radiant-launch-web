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
  { id: "p9", index: "09", name: "Linen Field Shirt", category: "Fashion", desc: "Heavyweight Belgian linen, garment-washed for a lived-in drape. Corozo nut buttons.", price: "$180", priceNum: 180, year: "2025", materials: "Belgian linen / corozo", image: product5, status: "In Stock", badge: "New", swatch: "bg-mint/40", rating: 4.7, reviews: 64 },
  { id: "p10", index: "10", name: "Wool Crew 02", category: "Fashion", desc: "Mid-weight merino crewneck in undyed natural ecru. Knit in a small mill in Porto.", price: "$220", priceNum: 220, year: "2024", materials: "100% merino wool", image: product1, status: "In Stock", badge: "Bestseller", swatch: "bg-cream", rating: 4.8, reviews: 152 },
  { id: "p11", index: "11", name: "Carbon Earbuds", category: "Tech", desc: "Active noise-cancelling earbuds milled from forged carbon. 38h battery, USB-C.", price: "$340", priceNum: 340, year: "2025", materials: "Forged carbon / silicone", image: product2, status: "Pre-Order", badge: "New", swatch: "bg-pop/30", rating: 4.6, reviews: 22 },
  { id: "p12", index: "12", name: "E-Ink Tablet", category: "Tech", desc: "10.3" + '"' + " Carta-1300 e-paper, hand-bound in vegetable-tanned leather. Stylus included.", price: "$620", priceNum: 620, year: "2024", materials: "Carta e-paper / leather", image: product6, status: "Limited", badge: "Hot", swatch: "bg-brand-soft", rating: 4.9, reviews: 87 },
  { id: "p13", index: "13", name: "Rose Clay Mask", category: "Beauty", desc: "Pink kaolin and rosehip mask in a hand-thrown ceramic jar. Refillable.", price: "$42", priceNum: 42, year: "2024", materials: "Kaolin / rosehip / ceramic", image: product7, status: "In Stock", badge: "Bestseller", swatch: "bg-pop/30", rating: 4.7, reviews: 188 },
  { id: "p14", index: "14", name: "Cedar & Smoke No.7", category: "Beauty", desc: "Hand-poured candle: cedarwood, smoked vetiver, a hint of black tea. 60h burn.", price: "$48", priceNum: 48, year: "2024", materials: "Coconut wax / cotton wick", image: product3, status: "In Stock", badge: "Studio Pick", swatch: "bg-cream", rating: 4.9, reviews: 244 },
  { id: "p15", index: "15", name: "Studio Resistance Set", category: "Gym", desc: "Three Italian latex bands in a foil-stamped canvas pouch. 15, 25, 40 lb.", price: "$78", priceNum: 78, year: "2024", materials: "Italian latex / waxed canvas", image: product8, status: "In Stock", badge: "New", swatch: "bg-mint/40", rating: 4.6, reviews: 73 },
  { id: "p16", index: "16", name: "Olympic Jump Rope", category: "Gym", desc: "Aircraft-grade cable with milled aluminum handles and ceramic bearings.", price: "$95", priceNum: 95, year: "2024", materials: "Aluminum / steel / ceramic", image: product4, status: "In Stock", badge: "Bestseller", swatch: "bg-brand-soft", rating: 4.8, reviews: 132 },
  { id: "p17", index: "17", name: "Walnut Side Table", category: "Home & Living", desc: "Solid black walnut, oil-finished. Hand-turned legs, no hardware, lifetime warranty.", price: "$540", priceNum: 540, year: "2025", materials: "Solid black walnut / linseed oil", image: product1, status: "Pre-Order", badge: "New", swatch: "bg-cream", rating: 4.9, reviews: 31 },
  { id: "p18", index: "18", name: "Linen Throw 02", category: "Home & Living", desc: "Stonewashed Lithuanian linen throw with hand-knotted fringe. Washes softer.", price: "$160", priceNum: 160, year: "2024", materials: "Lithuanian linen", image: product3, status: "In Stock", badge: "Studio Pick", swatch: "bg-mint/40", rating: 4.8, reviews: 117 },
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

// All 6 categories shown as hero feature chips.
const heroCategories: FilterCategory[] = ["All", "Fashion", "Tech", "Beauty", "Gym", "Home & Living"];

// Quick-filter tags shown in a horizontal scroll bar below the hero.
type QuickTagKey = "all" | "bestsellers" | "new" | "limited" | "preorder" | "topRated" | "under100" | "under300" | "studioPick" | "hot";
const quickTags: { key: QuickTagKey; label: string; match: (p: Product) => boolean }[] = [
  { key: "all",         label: "✦  Everything",     match: () => true },
  { key: "bestsellers", label: "♛  Bestsellers",    match: (p) => p.badge === "Bestseller" },
  { key: "new",         label: "✺  New drops",      match: (p) => p.badge === "New" },
  { key: "hot",         label: "▲  Trending",       match: (p) => p.badge === "Hot" },
  { key: "studioPick",  label: "◐  Studio picks",   match: (p) => p.badge === "Studio Pick" },
  { key: "topRated",    label: "★  Top rated 4.8+", match: (p) => p.rating >= 4.8 },
  { key: "limited",     label: "◆  Limited",        match: (p) => p.status === "Limited" },
  { key: "preorder",    label: "✧  Pre-order",      match: (p) => p.status === "Pre-Order" },
  { key: "under100",    label: "$  Under $100",     match: (p) => p.priceNum < 100 },
  { key: "under300",    label: "$$ Under $300",     match: (p) => p.priceNum < 300 },
];

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
  const [tag, setTag] = useState<QuickTagKey>("all");
  const [bag, setBag] = useState<string[]>([]);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [bagPing, setBagPing] = useState(false);
  const [tagsExpanded, setTagsExpanded] = useState(false);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;

  const filtered = useMemo(() => {
    let list = category === "All" ? [...products] : products.filter((p) => p.category === category);
    const tagDef = quickTags.find((t) => t.key === tag);
    if (tagDef) list = list.filter(tagDef.match);
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
  }, [category, sort, query, tag]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = useMemo(
    () => filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filtered, currentPage],
  );
  const goToPage = (p: number) => {
    const next = Math.max(1, Math.min(totalPages, p));
    setPage(next);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const setCategoryAndReset = (c: FilterCategory) => { setCategory(c); setPage(1); };
  const setTagAndReset = (k: QuickTagKey) => { setTag(k); setPage(1); };
  const setSortAndReset = (s: SortKey) => { setSort(s); setPage(1); };
  const setQueryAndReset = (q: string) => { setQuery(q); setPage(1); };

  const addToBag = (id: string) => {
    setBag((b) => [...b, id]);
    setBagPing(true);
    window.setTimeout(() => setBagPing(false), 600);
  };
  const toggleSaved = (id: string) => {
    setSaved((s) => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

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
        <div className="flex items-center gap-2">
          <div className={`relative inline-flex items-center gap-1.5 bg-ink text-cream rounded-full px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-transform ${bagPing ? "scale-110" : ""}`}>
            <span>Bag</span>
            <span className="bg-pop text-pop-foreground rounded-full px-1.5 min-w-5 text-center tabular-nums">{bag.length}</span>
            {bagPing && <span className="absolute inset-0 rounded-full bg-pop/40 animate-ping" />}
          </div>
          <Link to="/" className="hidden sm:inline-flex items-center gap-2 border border-foreground/15 rounded-full px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:border-foreground/40 transition-colors">
            ← Home
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-foreground/10">
        <div className="absolute inset-0 -z-10 opacity-60" style={{
          background: "radial-gradient(900px 400px at 80% 20%, color-mix(in oklab, var(--brand) 22%, transparent), transparent), radial-gradient(700px 350px at 10% 90%, color-mix(in oklab, var(--pop) 18%, transparent), transparent)",
        }} />
        <div className="px-4 sm:px-8 lg:px-12 pt-8 sm:pt-12 pb-10 sm:pb-14">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                <span className="size-2 rounded-full bg-pop animate-pulse" />
                <span>Shop by category</span>
              </div>
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground">{products.length} objects</span>
            </div>

            {/* Hero category feature chips — all 6 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
              {heroCategories.map((c) => {
                const count = c === "All" ? products.length : products.filter((p) => p.category === c).length;
                const active = c === category;
                return (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`group relative overflow-hidden rounded-2xl border text-left p-3 sm:p-4 transition-all ${
                      active
                        ? "bg-ink text-cream border-ink shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]"
                        : "bg-card border-foreground/10 hover:border-foreground/40 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-12px_rgba(0,0,0,0.25)]"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className={`text-xl sm:text-2xl leading-none ${active ? "text-pop" : "text-foreground/60"}`}>{categoryIcons[c]}</span>
                      <span className={`text-[10px] tabular-nums uppercase tracking-widest ${active ? "text-cream/60" : "text-muted-foreground"}`}>{String(count).padStart(2, "0")}</span>
                    </div>
                    <div className="mt-5 sm:mt-8 font-serif text-base sm:text-xl tracking-tight leading-tight">{c}</div>
                    <div className={`text-[10px] uppercase tracking-widest mt-1 ${active ? "text-cream/60" : "text-muted-foreground"}`}>
                      {active ? "Showing" : "Filter"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Quick-tag bar — collapsed by default, click to expand into a horizontal scroller */}
      <div className="border-b border-foreground/10 bg-foreground/[0.02] relative">
        {tagsExpanded && (
          <>
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10" />
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10" />
          </>
        )}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-3 flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground shrink-0 mr-1">Quick</span>

          {!tagsExpanded ? (
            <>
              <div className="flex items-center gap-2 flex-1 overflow-hidden">
                {quickTags.slice(0, 4).map((t) => {
                  const active = t.key === tag;
                  return (
                    <button
                      key={t.key}
                      onClick={() => setTag(t.key)}
                      className={`shrink-0 inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium transition-all ${
                        active
                          ? "bg-ink text-cream border-ink"
                          : "bg-background text-foreground/70 border-foreground/15 hover:border-foreground/40 hover:text-foreground"
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setTagsExpanded(true)}
                className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-ink text-cream px-3 py-1 text-[11px] font-bold uppercase tracking-widest hover:scale-[1.04] transition-transform"
              >
                +{quickTags.length - 4} more →
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 flex-1 overflow-x-auto scrollbar-none animate-fade-in">
                {quickTags.map((t) => {
                  const active = t.key === tag;
                  return (
                    <button
                      key={t.key}
                      onClick={() => setTag(t.key)}
                      className={`shrink-0 inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium transition-all ${
                        active
                          ? "bg-ink text-cream border-ink"
                          : "bg-background text-foreground/70 border-foreground/15 hover:border-foreground/40 hover:text-foreground"
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setTagsExpanded(false)}
                aria-label="Collapse tags"
                className="shrink-0 size-7 grid place-items-center rounded-full border border-foreground/15 text-foreground/60 hover:border-foreground/40 hover:text-foreground transition-colors relative z-20"
              >
                ✕
              </button>
            </>
          )}
        </div>
      </div>

      {/* Toolbar — search & sort */}
      <section className="px-4 sm:px-8 lg:px-12 py-4 border-b border-foreground/10 sticky top-[57px] sm:top-[65px] z-30 bg-background/85 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">⌕</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search materials, names, finishes..."
                className="w-full pl-9 pr-3 py-2 rounded-full bg-foreground/[0.04] border border-foreground/10 text-sm focus:outline-none focus:border-foreground/40 transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground mr-2">Sort</span>
              {sortOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setSort(opt.key)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
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

      {/* Materials marquee */}
      <div className="border-b border-foreground/10 bg-ink text-cream overflow-hidden">
        <div className="flex gap-6 sm:gap-10 py-2.5 whitespace-nowrap animate-[marquee_35s_linear_infinite] text-[11px] uppercase tracking-[0.3em]">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-6 sm:gap-10 shrink-0">
              {materialsTicker.map((m) => (
                <span key={m + i} className="flex items-center gap-6 sm:gap-10">
                  <span className="text-pop">✦</span>
                  <span>{m}</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-6 sm:mb-8 flex-wrap gap-3">
            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{category} · {sort.replace("-", " ")}</div>
              <h2 className="font-serif text-2xl sm:text-4xl mt-1 tracking-tight">
                {filtered.length} {filtered.length === 1 ? "object" : "objects"}
                <span className="text-foreground/30"> / showing</span>
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-mint" /> In stock
              <span className="size-1.5 rounded-full bg-pop ml-3" /> Limited
              <span className="size-1.5 rounded-full bg-brand ml-3" /> Pre-order
            </div>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-3xl font-serif italic text-muted-foreground">Nothing matches.</p>
              <button onClick={() => { setQuery(""); setCategory("All"); }} className="mt-4 text-sm underline underline-offset-4">Reset filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {filtered.map((p, idx) => (
                <ProductTiltCard key={p.id} className="group relative">
                  <article className="relative bg-card rounded-xl border border-foreground/10 overflow-hidden h-full flex flex-col shadow-[0_1px_0_rgba(0,0,0,0.04)] hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35)] transition-shadow">
                    <button
                      type="button"
                      onClick={() => setQuickView(p)}
                      className={`relative aspect-square overflow-hidden block w-full text-left ${p.swatch}`}
                      aria-label={`Quick view ${p.name}`}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        loading={idx < 5 ? "eager" : "lazy"}
                        className="absolute inset-0 w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                      />
                      <span className="absolute top-2 left-2 text-[9px] font-bold tracking-widest uppercase bg-background/90 backdrop-blur px-1.5 py-0.5 rounded-full">
                        {p.index}
                      </span>
                      {p.badge && (
                        <span className={`absolute top-2 right-2 text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded-full ${
                          p.badge === "Hot" ? "bg-pop text-pop-foreground" :
                          p.badge === "New" ? "bg-mint text-ink" :
                          p.badge === "Bestseller" ? "bg-ink text-cream" :
                          "bg-brand text-brand-foreground"
                        }`}>
                          {p.badge}
                        </span>
                      )}
                      <span
                        role="button"
                        aria-label="Save"
                        onClick={(e) => { e.stopPropagation(); toggleSaved(p.id); }}
                        className={`absolute bottom-2 right-2 size-7 grid place-items-center rounded-full bg-background/90 backdrop-blur text-xs transition-all hover:scale-110 ${
                          saved.has(p.id) ? "opacity-100 text-pop" : "opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        {saved.has(p.id) ? "♥" : "♡"}
                      </span>
                      <span className="absolute inset-x-2 bottom-2 sm:inset-x-3 sm:bottom-3 hidden sm:block translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <span className="block w-full text-center text-[10px] font-bold uppercase tracking-widest bg-background/95 backdrop-blur text-foreground py-1.5 rounded-full">
                          Quick view →
                        </span>
                      </span>
                    </button>
                    <div className="p-3 flex flex-col gap-1.5 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif text-sm sm:text-base leading-tight line-clamp-1">{p.name}</h3>
                        <span className="font-mono text-xs font-semibold tabular-nums shrink-0">{p.price}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                        <span className="uppercase tracking-widest">{p.category}</span>
                        <span className="flex items-center gap-1">
                          <span className="text-pop">★</span>
                          <span className="font-medium text-foreground tabular-nums">{p.rating.toFixed(1)}</span>
                          <span>·{p.reviews}</span>
                        </span>
                      </div>
                      <button
                        onClick={() => addToBag(p.id)}
                        data-cursor="Bag it"
                        className="mt-2 inline-flex items-center justify-center gap-1.5 bg-ink text-cream rounded-full py-1.5 text-[10px] font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-transform"
                      >
                        + Bag · {p.price}
                      </button>
                    </div>
                  </article>
                </ProductTiltCard>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter / drop alert */}
      <section className="px-4 sm:px-8 lg:px-12 py-14 sm:py-20 bg-ink text-cream relative overflow-hidden">
        <div className="absolute -right-20 -top-20 size-80 rounded-full bg-pop/20 blur-3xl" />
        <div className="absolute -left-24 -bottom-24 size-80 rounded-full bg-brand/30 blur-3xl" />
        <div className="max-w-[1400px] mx-auto relative grid lg:grid-cols-[1.2fr_1fr] gap-8 items-end">
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[0.95]">
            Get the next drop<br /><span className="italic text-pop">before the rest.</span>
          </h2>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
            <p className="text-sm text-cream/70 max-w-md">A monthly note from the studio: new objects, behind-the-scenes process, and early access for subscribers only.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input type="email" required placeholder="you@studio.com" className="flex-1 px-4 py-3 rounded-full bg-cream/10 border border-cream/20 text-cream placeholder:text-cream/40 text-sm focus:outline-none focus:border-cream/60" />
              <button className="bg-pop text-pop-foreground px-5 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-[1.03] transition-transform">Notify me →</button>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-cream/40">No spam. Unsubscribe in one click.</p>
          </form>
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

      {/* Quick view modal */}
      {quickView && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center p-4 sm:p-6 bg-ink/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setQuickView(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-background rounded-2xl border border-foreground/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden grid sm:grid-cols-2 animate-scale-in"
          >
            <button
              onClick={() => setQuickView(null)}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 size-8 grid place-items-center rounded-full bg-background/90 backdrop-blur border border-foreground/10 hover:scale-110 transition-transform"
            >
              ✕
            </button>
            <div className={`relative aspect-square sm:aspect-auto ${quickView.swatch}`}>
              <img src={quickView.image} alt={quickView.name} className="absolute inset-0 w-full h-full object-cover mix-blend-multiply" />
              <span className="absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase bg-background/90 backdrop-blur px-2 py-1 rounded-full">
                {quickView.index} · {quickView.category}
              </span>
            </div>
            <div className="p-6 sm:p-8 flex flex-col gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{quickView.status} · {quickView.year}</div>
                <h3 className="font-serif text-3xl sm:text-4xl leading-tight mt-2">{quickView.name}</h3>
                <div className="flex items-center gap-3 mt-2">
                  <span className="font-mono text-xl font-semibold tabular-nums">{quickView.price}</span>
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <span className="text-pop">★</span>
                    <span className="font-medium text-foreground tabular-nums">{quickView.rating.toFixed(1)}</span>
                    <span>({quickView.reviews} reviews)</span>
                  </span>
                </div>
              </div>
              <p className="text-sm text-foreground/70 leading-relaxed">{quickView.desc}</p>
              <div className="rounded-lg bg-foreground/[0.04] px-3 py-2 text-[11px] uppercase tracking-widest text-muted-foreground">
                Materials · <span className="text-foreground normal-case tracking-normal">{quickView.materials}</span>
              </div>
              <div className="mt-auto flex gap-2">
                <button
                  onClick={() => { addToBag(quickView.id); setQuickView(null); }}
                  className="flex-1 bg-ink text-cream rounded-full py-3 text-xs font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-transform"
                >
                  + Add to bag · {quickView.price}
                </button>
                <button
                  onClick={() => toggleSaved(quickView.id)}
                  className={`size-12 grid place-items-center rounded-full border transition-colors ${
                    saved.has(quickView.id) ? "border-pop text-pop bg-pop/10" : "border-foreground/15 hover:border-foreground/40"
                  }`}
                  aria-label="Save"
                >
                  {saved.has(quickView.id) ? "♥" : "♡"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}