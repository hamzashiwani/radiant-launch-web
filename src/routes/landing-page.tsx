import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { MobileMenu } from "@/components/MobileMenu";

export const Route = createFileRoute("/landing-page")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Collars & Co Coupons & Promo Codes – Up to 40% Off" },
      {
        name: "description",
        content:
          "Hand-tested Collars & Co coupons, promo codes and deals. Save up to 40% with verified codes updated daily.",
      },
      { property: "og:title", content: "Collars & Co Coupons – Up to 40% Off" },
      {
        property: "og:description",
        content: "Verified Collars & Co promo codes. Hand-tested daily. Stack discounts and free shipping.",
      },
    ],
  }),
});

type Tag = "Popular" | "Expiring Soon" | "New" | "Free Shipping" | "Sitewide";
type CouponType = "code" | "deal";

type Coupon = {
  id: string;
  discount: string;
  title: string;
  description: string;
  code?: string;
  type: CouponType;
  verified: boolean;
  uses: number;
  tags: Tag[];
  expiresAt: number; // ms timestamp
  addedAt: number;
  discountValue: number; // numeric for sorting (percent or $)
};

const DAY = 24 * 60 * 60 * 1000;
const now = Date.now();

const COUPONS: Coupon[] = [
  {
    id: "c1",
    discount: "40% OFF",
    discountValue: 40,
    title: "40% off your first order",
    description: "New customers only. Applies to full-price dress shirts and polos.",
    code: "WELCOME40",
    type: "code",
    verified: true,
    uses: 2841,
    tags: ["Popular", "Sitewide"],
    expiresAt: now + 2 * DAY + 5 * 60 * 60 * 1000,
    addedAt: now - 4 * DAY,
  },
  {
    id: "c2",
    discount: "25% OFF",
    discountValue: 25,
    title: "25% off sitewide — limited time",
    description: "Stackable on sale items. One use per customer.",
    code: "SAVE25",
    type: "code",
    verified: true,
    uses: 1932,
    tags: ["Popular"],
    expiresAt: now + 12 * 60 * 60 * 1000,
    addedAt: now - 1 * DAY,
  },
  {
    id: "c3",
    discount: "FREE",
    discountValue: 10,
    title: "Free shipping on orders $75+",
    description: "No code needed — discount applied automatically at checkout.",
    type: "deal",
    verified: true,
    uses: 5412,
    tags: ["Free Shipping", "Sitewide"],
    expiresAt: now + 30 * DAY,
    addedAt: now - 10 * DAY,
  },
  {
    id: "c4",
    discount: "$15 OFF",
    discountValue: 15,
    title: "$15 off orders over $100",
    description: "Works on full-price collections. Excludes gift cards.",
    code: "EXTRA15",
    type: "code",
    verified: true,
    uses: 1204,
    tags: ["New"],
    expiresAt: now + 6 * DAY,
    addedAt: now - 12 * 60 * 60 * 1000,
  },
  {
    id: "c5",
    discount: "30% OFF",
    discountValue: 30,
    title: "Bundle & save 30%",
    description: "Buy 3 or more shirts, automatically save 30% at checkout.",
    type: "deal",
    verified: true,
    uses: 873,
    tags: ["Popular"],
    expiresAt: now + 8 * DAY,
    addedAt: now - 3 * DAY,
  },
  {
    id: "c6",
    discount: "10% OFF",
    discountValue: 10,
    title: "Student discount — 10% off",
    description: "Verify with .edu email for an instant student discount.",
    code: "STUDENT10",
    type: "code",
    verified: false,
    uses: 412,
    tags: ["Sitewide"],
    expiresAt: now + 20 * DAY,
    addedAt: now - 6 * DAY,
  },
  {
    id: "c7",
    discount: "20% OFF",
    discountValue: 20,
    title: "20% off polos collection",
    description: "Limited stock on classic and performance polos.",
    code: "POLO20",
    type: "code",
    verified: true,
    uses: 689,
    tags: ["Expiring Soon"],
    expiresAt: now + 18 * 60 * 60 * 1000,
    addedAt: now - 2 * DAY,
  },
];

type Filter = "All" | "Verified" | "Deals" | "Expiring Soon";
type Sort = "Popularity" | "Newest" | "Highest Discount";

const filters: Filter[] = ["All", "Verified", "Deals", "Expiring Soon"];
const sorts: Sort[] = ["Popularity", "Newest", "Highest Discount"];

function useCountdown(target: number) {
  const [diff, setDiff] = useState(() => Math.max(0, target - Date.now()));
  useEffect(() => {
    const id = setInterval(() => setDiff(Math.max(0, target - Date.now())), 1000);
    return () => clearInterval(id);
  }, [target]);
  const d = Math.floor(diff / DAY);
  const h = Math.floor((diff % DAY) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return { d, h, m, s, expired: diff === 0 };
}

function Countdown({ target, compact = false }: { target: number; compact?: boolean }) {
  const { d, h, m, s, expired } = useCountdown(target);
  if (expired) return <span className="text-xs font-mono text-red-500">Expired</span>;
  const cell = (v: number, label: string) => (
    <span className="inline-flex flex-col items-center">
      <span className={`font-mono tabular-nums ${compact ? "text-xs" : "text-sm"} font-bold`}>
        {String(v).padStart(2, "0")}
      </span>
      <span className="text-[9px] uppercase tracking-widest opacity-70">{label}</span>
    </span>
  );
  return (
    <div className="inline-flex items-center gap-2">
      {d > 0 && cell(d, "d")}
      {cell(h, "h")}
      {cell(m, "m")}
      {cell(s, "s")}
    </div>
  );
}

function tagStyle(tag: Tag) {
  switch (tag) {
    case "Popular":
      return "bg-orange-500/15 text-orange-600 ring-1 ring-orange-500/30";
    case "Expiring Soon":
      return "bg-red-500/15 text-red-600 ring-1 ring-red-500/30";
    case "New":
      return "bg-blue-500/15 text-blue-600 ring-1 ring-blue-500/30";
    case "Free Shipping":
      return "bg-emerald-500/15 text-emerald-600 ring-1 ring-emerald-500/30";
    case "Sitewide":
      return "bg-foreground/10 text-foreground ring-1 ring-foreground/15";
  }
}

function CouponCard({
  coupon,
  onCopy,
}: {
  coupon: Coupon;
  onCopy: (code: string) => void;
}) {
  const [revealed, setRevealed] = useState(false);
  const isExpiringSoon = coupon.expiresAt - now < 2 * DAY;

  const handleClick = () => {
    if (coupon.type === "deal") {
      window.open("#", "_blank");
      return;
    }
    if (!revealed) setRevealed(true);
    if (coupon.code) {
      navigator.clipboard?.writeText(coupon.code).catch(() => {});
      onCopy(coupon.code);
    }
  };

  return (
    <article className="group relative flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch rounded-2xl border border-foreground/10 bg-background p-4 sm:p-5 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
      <div className="sm:w-32 shrink-0 flex sm:flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 ring-1 ring-emerald-500/20 p-4 text-center">
        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-emerald-600">
          {coupon.discount}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-700/80">
          {coupon.type === "code" ? "Promo Code" : "Deal"}
        </span>
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {coupon.verified && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-emerald-600">
              <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 10-1.4 1.4l2 2a1 1 0 001.4 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Verified
            </span>
          )}
          {coupon.tags.map((t) => (
            <span
              key={t}
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${tagStyle(t)}`}
            >
              {t}
            </span>
          ))}
        </div>
        <h3 className="text-base sm:text-lg font-semibold leading-snug text-foreground">{coupon.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{coupon.description}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground mt-1">
          <span className="inline-flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            {coupon.uses.toLocaleString()} used
          </span>
          {isExpiringSoon && (
            <span className="inline-flex items-center gap-1 text-red-600 font-semibold">
              Ends in <Countdown target={coupon.expiresAt} compact />
            </span>
          )}
        </div>
      </div>

      <div className="sm:w-44 flex sm:flex-col items-stretch justify-center">
        <button
          onClick={handleClick}
          className="relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-sm py-3 px-4 shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
        >
          {coupon.type === "deal" ? (
            <span>Get Deal →</span>
          ) : revealed && coupon.code ? (
            <span className="font-mono tracking-widest">{coupon.code}</span>
          ) : (
            <span>Get Code</span>
          )}
          <span className="absolute inset-y-0 right-0 w-1.5 bg-white/20" />
        </button>
        {coupon.type === "code" && revealed && (
          <p className="text-center text-[10px] mt-1.5 text-emerald-600 font-semibold">Tap again to copy</p>
        )}
      </div>
    </article>
  );
}

const FAQS = [
  {
    q: "How do I use a Collars & Co coupon code?",
    a: "Click Get Code on any coupon to reveal and copy it. Then paste it at checkout on collarsandco.com in the promo code field.",
  },
  {
    q: "Are these coupon codes verified?",
    a: "Yes — our team hand-tests every code daily. Codes marked Verified were confirmed working within the last 24 hours.",
  },
  {
    q: "Can I stack multiple coupon codes?",
    a: "Typically only one promo code can be applied per order, but you can usually combine a code with free-shipping and sitewide deals.",
  },
  {
    q: "What if a code doesn't work?",
    a: "Try another code from this page — we list multiple working options. You can also report a broken code and our team will retest it.",
  },
];

function LandingPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [sort, setSort] = useState<Sort>("Popularity");
  const [toast, setToast] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filtered = useMemo(() => {
    let list = [...COUPONS];
    if (filter === "Verified") list = list.filter((c) => c.verified);
    if (filter === "Deals") list = list.filter((c) => c.type === "deal");
    if (filter === "Expiring Soon") list = list.filter((c) => c.expiresAt - now < 2 * DAY);
    if (sort === "Popularity") list.sort((a, b) => b.uses - a.uses);
    if (sort === "Newest") list.sort((a, b) => b.addedAt - a.addedAt);
    if (sort === "Highest Discount") list.sort((a, b) => b.discountValue - a.discountValue);
    return list;
  }, [filter, sort]);

  const handleCopy = (code: string) => {
    setToast(code);
    window.setTimeout(() => setToast(null), 2200);
  };

  const bestDeal = COUPONS[0];

  const stats = {
    active: COUPONS.length,
    avgSaving: "28%",
    lastVerified: "2 hours ago",
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-foreground/5 py-3 px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-3">
        <Link to="/" className="font-semibold tracking-tight text-sm sm:text-base">
          STUDIO_KINETIC
        </Link>
        <div className="hidden md:flex gap-8">
          <Link to="/" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/blog" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
            Blogs
          </Link>
          <Link to="/products" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
            Shop
          </Link>
        </div>
        <Link
          to="/"
          className="hidden sm:inline-flex items-center gap-2 bg-ink text-cream rounded-full px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:scale-[1.04] transition-transform"
        >
          ← Back home
        </Link>
        <MobileMenu />
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden border-b border-foreground/5">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-background to-orange-500/10" aria-hidden />
        <div
          className="absolute -top-32 -right-40 size-[420px] bg-emerald-500/20 blur-3xl rounded-full"
          aria-hidden
        />
        <div
          className="absolute -bottom-32 -left-40 size-[420px] bg-orange-500/20 blur-3xl rounded-full"
          aria-hidden
        />
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 text-emerald-700 px-3 py-1 text-[11px] font-bold uppercase tracking-widest">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Hand-tested codes daily
              </span>
              <h1 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-balance">
                Collars & Co Coupons & Promo Codes —{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-orange-500 bg-clip-text text-transparent">
                  Up to 40% Off
                </span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl">
                Save more on dress shirts, polos, and bundles. Every code is hand-verified by our team within the last 24 hours.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#coupons"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-5 sm:px-6 py-3 text-sm font-bold uppercase tracking-widest shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.03]"
                >
                  See all coupons →
                </a>
                <a
                  href="#how-to-use"
                  className="inline-flex items-center gap-2 bg-background border border-foreground/15 hover:border-foreground/40 rounded-full px-5 sm:px-6 py-3 text-sm font-semibold transition-colors"
                >
                  How it works
                </a>
              </div>

              <dl className="mt-8 grid grid-cols-3 max-w-md gap-4">
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">Active</dt>
                  <dd className="text-2xl font-bold text-foreground">{stats.active}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">Avg. savings</dt>
                  <dd className="text-2xl font-bold text-emerald-600">{stats.avgSaving}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">Last verified</dt>
                  <dd className="text-sm font-semibold text-foreground pt-1">{stats.lastVerified}</dd>
                </div>
              </dl>
            </div>

            {/* Best deal card */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <div className="relative rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-6 sm:p-8 shadow-2xl shadow-emerald-500/30 overflow-hidden">
                <div className="absolute -top-10 -right-10 size-40 bg-orange-400/30 rounded-full blur-2xl" aria-hidden />
                <span className="inline-flex items-center gap-2 bg-orange-500 text-white rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                  ★ Best Deal Today
                </span>
                <div className="mt-5 flex items-end gap-3">
                  <span className="text-6xl sm:text-7xl font-extrabold leading-none">40%</span>
                  <span className="pb-2 text-xl font-bold uppercase tracking-wider opacity-90">Off</span>
                </div>
                <p className="mt-3 text-lg font-semibold">{bestDeal.title}</p>
                <p className="text-sm opacity-90 mt-1">{bestDeal.description}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold bg-white/15 rounded-full px-3 py-1.5">
                  ⏳ Ends in <Countdown target={bestDeal.expiresAt} compact />
                </div>
                <button
                  onClick={() => {
                    if (bestDeal.code) {
                      navigator.clipboard?.writeText(bestDeal.code).catch(() => {});
                      handleCopy(bestDeal.code);
                    }
                  }}
                  className="mt-5 w-full bg-white text-emerald-700 hover:bg-emerald-50 font-bold rounded-xl py-3.5 text-sm uppercase tracking-widest shadow-lg transition-all active:scale-[0.98]"
                >
                  Get Code → {bestDeal.code}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Filters + coupons */}
      <section id="coupons" className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">All coupons & deals</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {filtered.length} active {filtered.length === 1 ? "offer" : "offers"} ready to use
            </p>
          </div>
          <label className="text-sm flex items-center gap-2">
            <span className="text-muted-foreground">Sort:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="bg-background border border-foreground/15 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {sorts.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 mb-6">
          {filters.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                  active
                    ? "bg-foreground text-background shadow-md"
                    : "bg-background border border-foreground/15 text-foreground/70 hover:border-foreground/40"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filtered.map((c) => (
            <CouponCard key={c.id} coupon={c} onCopy={handleCopy} />
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No coupons match this filter.</p>
          )}
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-foreground/[0.03] border-y border-foreground/5">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { k: "✓", v: "Hand-tested daily" },
            { k: "★", v: "Verified by editors" },
            { k: "↻", v: "Updated every 24h" },
            { k: "♥", v: "Trusted by 250k+ shoppers" },
          ].map((i) => (
            <div key={i.v} className="flex flex-col items-center gap-1">
              <span className="text-2xl text-emerald-600">{i.k}</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{i.v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How to use */}
      <section id="how-to-use" className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600">3 simple steps</span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mt-2">How to use a coupon</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              icon: "🏷️",
              t: "Pick a coupon",
              d: "Browse verified offers and choose the discount that fits your order.",
            },
            {
              icon: "📋",
              t: "Copy the code",
              d: "Tap Get Code to reveal and auto-copy it to your clipboard.",
            },
            {
              icon: "🛍️",
              t: "Apply at checkout",
              d: "Paste the code on collarsandco.com to apply your savings instantly.",
            },
          ].map((s, i) => (
            <div
              key={s.t}
              className="relative rounded-2xl bg-background border border-foreground/10 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="absolute -top-3 -left-3 size-8 rounded-full bg-emerald-600 text-white grid place-items-center text-xs font-bold">
                {i + 1}
              </div>
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="font-semibold text-lg">{s.t}</h3>
              <p className="text-sm text-muted-foreground mt-1">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-foreground/[0.03] border-t border-foreground/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-center mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="rounded-xl bg-background border border-foreground/10 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold hover:bg-foreground/[0.02] transition-colors"
                  >
                    <span>{f.q}</span>
                    <span
                      className={`shrink-0 size-7 rounded-full bg-emerald-500/15 text-emerald-600 grid place-items-center transition-transform ${
                        open ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {open && (
                    <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed animate-in fade-in">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-foreground/5">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-bold text-lg tracking-tight">STUDIO_KINETIC</p>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs">
              Verified coupons and deals, hand-tested daily so you always save more.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
            <Link to="/products" className="text-muted-foreground hover:text-foreground">Shop</Link>
            <Link to="/blog" className="text-muted-foreground hover:text-foreground">Journal</Link>
            <a href="#coupons" className="text-muted-foreground hover:text-foreground">All coupons</a>
            <a href="#how-to-use" className="text-muted-foreground hover:text-foreground">How it works</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">Contact</a>
          </nav>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setToast("Subscribed!");
              setTimeout(() => setToast(null), 2000);
            }}
            className="flex flex-col gap-2"
          >
            <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Get new codes weekly
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                required
                placeholder="you@email.com"
                className="flex-1 min-w-0 rounded-lg border border-foreground/15 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-4 transition-colors">
                Join
              </button>
            </div>
          </form>
        </div>
        <div className="border-t border-foreground/5 px-4 py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Studio Kinetic. All trademarks belong to their respective owners.
        </div>
      </footer>

      {/* Floating mobile CTA */}
      <a
        href="#coupons"
        className="md:hidden fixed bottom-4 inset-x-4 z-40 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 text-white font-bold py-3.5 text-sm uppercase tracking-widest shadow-2xl shadow-emerald-500/40"
      >
        🎟️ Grab a coupon
      </a>

      {/* Copied toast */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background px-5 py-3 rounded-full text-sm font-semibold shadow-2xl animate-in fade-in slide-in-from-bottom-2"
        >
          ✓ Code copied: <span className="font-mono">{toast}</span>
        </div>
      )}
    </div>
  );
}