import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import { toast } from "sonner";
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
  url: string;
};

const DAY = 24 * 60 * 60 * 1000;
const now = Date.now();
const MERCHANT_URL = "https://collarsandco.com";

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
    url: MERCHANT_URL,
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
    url: MERCHANT_URL,
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
    url: MERCHANT_URL,
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
    url: MERCHANT_URL,
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
    url: MERCHANT_URL,
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
    url: MERCHANT_URL,
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
    url: MERCHANT_URL,
  },
];

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
      return "bg-pop/20 text-ink ring-1 ring-pop/40";
    case "Expiring Soon":
      return "bg-brand/15 text-brand ring-1 ring-brand/30";
    case "New":
      return "bg-mint/25 text-ink ring-1 ring-mint/40";
    case "Free Shipping":
      return "bg-mint/20 text-ink ring-1 ring-mint/40";
    case "Sitewide":
      return "bg-foreground/10 text-foreground ring-1 ring-foreground/15";
  }
}

function CouponCard({
  coupon,
}: {
  coupon: Coupon;
}) {
  const [revealed, setRevealed] = useState(false);
  const isExpiringSoon = coupon.expiresAt - now < 2 * DAY;

  const handleClick = () => {
    const codeToCopy = coupon.code ?? "DEAL2024";
    navigator.clipboard?.writeText(codeToCopy).catch(() => {});
    toast.success("Code copied to clipboard", {
      description: codeToCopy,
    });
    setRevealed(true);
    window.open(coupon.url, "_blank", "noopener,noreferrer");
  };

  return (
    <article className="coupon-card group relative flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch rounded-2xl border border-foreground/10 bg-background p-4 sm:p-5 shadow-sm overflow-hidden">
      <div className="coupon-notch sm:w-32 shrink-0 flex sm:flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brand/15 to-pop/15 ring-1 ring-brand/25 p-4 text-center transition-transform duration-500 group-hover:scale-[1.04] group-hover:rotate-[-2deg]">
        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand">
          {coupon.discount}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-ink/70">
          {coupon.type === "code" ? "Promo Code" : "Deal"}
        </span>
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {coupon.verified && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-brand">
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
            <span className="size-1.5 rounded-full bg-mint" />
            {coupon.uses.toLocaleString()} used
          </span>
          {isExpiringSoon && (
            <span className="inline-flex items-center gap-1 text-brand font-semibold">
              Ends in <Countdown target={coupon.expiresAt} compact />
            </span>
          )}
        </div>
      </div>

      <div className="sm:w-36 flex sm:flex-col items-center justify-center">
        <button
          onClick={handleClick}
          aria-label="Get code"
          className="ticket-btn group/tk relative inline-flex items-center gap-2 rounded-full bg-ink text-cream pl-3 pr-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] shadow-[0_8px_20px_-10px_oklch(0.16_0.02_60/.6)] transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
        >
          <span className="ticket-dot" aria-hidden />
          <span className="relative z-10">Get Code</span>
          <span aria-hidden className="relative z-10 inline-block transition-transform duration-300 group-hover/tk:translate-x-0.5">→</span>
          {/* Blurred code chip that slides out on hover */}
          <span
            aria-hidden
            className="ticket-chip pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 translate-y-1 opacity-0 rotate-[-4deg] rounded-md bg-[var(--gradient-shop)] text-ink font-mono text-[10px] font-extrabold tracking-[0.3em] px-2.5 py-1 shadow-md transition-all duration-300 ease-out group-hover/tk:opacity-100 group-hover/tk:translate-y-0 group-hover/tk:rotate-[-2deg] uppercase"
          >
            <span className="blur-[2.5px] select-none">{coupon.code ?? "DEAL2024"}</span>
          </span>
        </button>
      </div>
    </article>
  );
}

function LandingPage() {
  const sorted = useMemo(
    () => [...COUPONS].sort((a, b) => b.uses - a.uses),
    [],
  );

  const bestDeal = COUPONS[0];

  const grabBestDeal = () => {
    const code = bestDeal.code ?? "DEAL2024";
    navigator.clipboard?.writeText(code).catch(() => {});
    toast.success("Code copied to clipboard", { description: code });
    window.open(bestDeal.url, "_blank", "noopener,noreferrer");
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
        <div className="absolute inset-0 bg-[var(--gradient-cream)] opacity-80" aria-hidden />
        <div
          className="absolute -top-32 -right-40 size-[420px] bg-brand/25 blur-3xl rounded-full animate-blob"
          aria-hidden
        />
        <div
          className="absolute -bottom-32 -left-40 size-[420px] bg-pop/25 blur-3xl rounded-full animate-blob"
          aria-hidden
        />
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-mint/25 text-ink px-3 py-1 text-[11px] font-bold uppercase tracking-widest">
                <span className="size-1.5 rounded-full bg-brand animate-pulse" />
                Hand-tested codes daily
              </span>
              <h1 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-balance">
                Collars & Co Coupons & Promo Codes —{" "}
                <span className="bg-[var(--gradient-shop)] bg-clip-text text-transparent">
                  Up to 40% Off
                </span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl">
                Save more on dress shirts, polos, and bundles. Every code is hand-verified by our team within the last 24 hours.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#coupons"
                  className="inline-flex items-center gap-2 bg-ink text-cream rounded-full px-5 sm:px-6 py-3 text-sm font-bold uppercase tracking-widest shadow-[var(--shadow-pop)] transition-all hover:scale-[1.04]"
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
            </div>

            {/* Best deal card */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <BestDealCard
                title={bestDeal.title}
                description={bestDeal.description}
                code={bestDeal.code ?? "DEAL2024"}
                expiresAt={bestDeal.expiresAt}
                onGrab={grabBestDeal}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Coupons */}
      <section id="coupons" className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">All coupons & deals</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {sorted.length} active offers ready to use
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {sorted.map((c) => (
            <CouponCard key={c.id} coupon={c} />
          ))}
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
              <span className="text-2xl text-brand">{i.k}</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{i.v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How to use */}
      <section id="how-to-use" className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] font-bold uppercase tracking-widest text-brand">3 simple steps</span>
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
              <div className="absolute -top-3 -left-3 size-8 rounded-full bg-brand text-brand-foreground grid place-items-center text-xs font-bold animate-wiggle">
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
              toast.success("Subscribed!");
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
                className="flex-1 min-w-0 rounded-lg border border-foreground/15 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
              />
              <button className="rounded-lg bg-ink hover:bg-brand text-cream text-sm font-bold px-4 transition-colors">
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
        className="md:hidden fixed bottom-4 inset-x-4 z-40 inline-flex items-center justify-center gap-2 rounded-full bg-ink text-cream font-bold py-3.5 text-sm uppercase tracking-widest shadow-[var(--shadow-pop)]"
      >
        🎟️ Grab a coupon
      </a>
    </div>
  );
}