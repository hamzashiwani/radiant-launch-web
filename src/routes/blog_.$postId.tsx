import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { posts, accentChip, formatViews, type Post, type ProductItem } from "@/lib/blog-data";

export const Route = createFileRoute("/blog_/$postId")({
  component: PostPage,
  loader: ({ params }) => {
    const post = posts.find((p) => p.id === params.postId);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return { meta: [{ title: "Story not found" }] };
    return {
      meta: [
        { title: `${post.title} · Studio Kinetic Journal` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:image", content: post.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: post.image },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center bg-background px-6 text-center">
      <div>
        <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-brand mb-3">404 · Story</p>
        <h1 className="text-3xl font-semibold tracking-tight mb-4">This story has been pulled from the press.</h1>
        <Link to="/blog" className="inline-flex items-center gap-2 bg-ink text-cream rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest">
          ← Back to journal
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen grid place-items-center bg-background px-6 text-center">
      <div>
        <p className="text-sm text-muted-foreground mb-4">{error.message}</p>
        <button onClick={reset} className="bg-ink text-cream rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest">Retry</button>
      </div>
    </div>
  ),
});

function PostPage() {
  const { post } = Route.useLoaderData() as { post: Post };
  const [progress, setProgress] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);

  const related = useMemo(
    () => posts.filter((p) => p.id !== post.id && p.tag === post.tag).slice(0, 3),
    [post.id, post.tag],
  );

  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 0));
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [post.id]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [post.id]);

  return (
    <main className="min-h-screen bg-background">
      {/* Reading progress */}
      <div className="fixed top-0 inset-x-0 z-50 h-1 bg-foreground/5">
        <div
          className="h-full bg-gradient-to-r from-brand via-pop to-mint transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-foreground/5 py-3 sm:py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-3">
        <Link to="/" className="font-semibold tracking-tight text-sm sm:text-base">STUDIO_KINETIC</Link>
        <div className="hidden md:flex gap-8">
          <Link to="/blog" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Journal</Link>
          <Link to="/products" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Shop</Link>
          <Link to="/" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Studio</Link>
        </div>
        <Link to="/blog" className="inline-flex items-center gap-2 bg-ink text-cream rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:scale-[1.04] transition-transform">
          ← Journal
        </Link>
      </nav>

      <div ref={articleRef}>
        {/* HERO — interactive cover image */}
        <HeroCover post={post} />

        {/* Title + short description */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-6 sm:pb-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-4 flex flex-wrap items-center justify-center gap-2">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <span className="opacity-40">/</span>
              <Link to="/blog" className="hover:text-foreground">Journal</Link>
              <span className="opacity-40">/</span>
              <span className="text-brand">{post.tag}</span>
            </p>
          <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest mb-4 ${accentChip[post.accent]}`}>
              {post.tag} · Field study
            </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter leading-[0.98] text-balance mb-4">
              {post.title}
            </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              {post.excerpt}
            </p>

            {/* meta strip */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
              <span className="inline-flex items-center gap-2">
              <span className="size-6 rounded-full bg-gradient-to-br from-brand to-pop grid place-items-center text-cream text-[9px]">
                  {post.author.split(" ").map((s) => s[0]).join("")}
                </span>
              <span className="normal-case tracking-normal font-sans text-foreground text-xs">{post.author}</span>
              </span>
              <span>· {post.date}</span>
              <span>· {post.readTime} read</span>
              <span>· {formatViews(post.views)} views</span>
            <span>· {post.comments} comments</span>
            </div>

            {/* intro paragraph */}
          <p className="mt-8 text-sm sm:text-base text-foreground/80 leading-relaxed text-left">
              {post.intro}
            </p>

          {/* In-this-piece TOC */}
          <div className="mt-8 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5 text-left">
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-brand mb-3">In this piece</p>
            <ol className="space-y-1.5">
              {post.products.map((p, i) => (
                <li key={i} className="flex items-baseline gap-3 text-sm">
                  <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-foreground/85">{p.name}</span>
                  <span className="text-muted-foreground text-xs">— {p.tagline}</span>
                </li>
              ))}
            </ol>
          </div>
          </div>
        </section>

        {/* Products in story */}
      <div className="px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 space-y-14 sm:space-y-20">
          {post.products.map((product, idx) => (
            <ProductBlock key={idx} product={product} index={idx} total={post.products.length} />
          ))}
        </div>

      {/* Pull quote */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <blockquote className="max-w-3xl mx-auto p-7 sm:p-9 rounded-3xl bg-ink text-cream relative overflow-hidden">
          <span className="absolute top-2 left-5 text-6xl opacity-20 leading-none">"</span>
          <p className="text-lg sm:text-xl font-medium leading-snug relative">
            Good objects don't ask for attention. They wait, and reward you the third time you reach for them.
          </p>
          <footer className="mt-4 text-[10px] font-mono uppercase tracking-[0.25em] text-pop relative">
            — {post.author}, in studio
          </footer>
        </blockquote>
      </section>

      {/* Comments preview */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end justify-between mb-5 gap-4">
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight">
              {post.comments} reactions from readers
            </h3>
            <button type="button" className="text-[10px] font-bold uppercase tracking-widest bg-foreground/[0.05] hover:bg-foreground/10 rounded-full px-3 py-1.5 transition-colors">
              Add yours →
            </button>
          </div>
          <ul className="space-y-3">
            {[
              { who: "Esha M.", role: "Designer · Berlin", body: "Bought the second one for my partner. The brass takes a fingerprint patina I genuinely look forward to." },
              { who: "Tomi R.", role: "Studio lead · São Paulo", body: "The packaging alone is worth the price. Quietly the best unboxing of the year." },
              { who: "Junko A.", role: "Buyer · Tokyo", body: "Stocked it in our shop. Sells out every restock. Customers come back asking for the next colour." },
            ].map((c) => (
              <li key={c.who} className="rounded-2xl border border-foreground/10 bg-background p-4 sm:p-5 flex items-start gap-3">
                <span className="size-9 rounded-full bg-gradient-to-br from-mint to-pop grid place-items-center text-ink text-xs font-mono shrink-0">
                  {c.who.split(" ").map((s) => s[0]).join("")}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold">{c.who} <span className="text-muted-foreground font-normal">· {c.role}</span></p>
                  <p className="mt-1 text-sm text-foreground/85 leading-snug">{c.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Newsletter / dispatch strip */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-3xl mx-auto rounded-3xl bg-foreground/[0.04] border border-foreground/10 p-6 sm:p-8 grid sm:grid-cols-[1.4fr_1fr] gap-5 items-center">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-brand mb-2">The dispatch</p>
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-1.5">One story, one object, every Friday.</h3>
            <p className="text-xs text-muted-foreground">No tracking, no upsells, no AI. Unsubscribe in one click.</p>
          </div>
          <form className="flex items-center gap-2 bg-background rounded-full p-1.5 border border-foreground/15">
            <input
              type="email"
              placeholder="you@studio.com"
              className="flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground/60"
            />
            <button type="button" className="bg-ink text-cream rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-brand transition-colors">
              Join →
            </button>
          </form>
        </div>
      </section>

        {/* Closing + author card */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-foreground/[0.02] border-y border-foreground/5">
          <div className="max-w-3xl mx-auto">
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-brand mb-4">— End of file</p>
            <p className="text-xl sm:text-2xl leading-snug font-medium text-balance mb-10">
              That's the collection. If one of them quietly bothers you in a good way, that's usually the one.
            </p>
            <div className="rounded-3xl border border-foreground/10 p-6 sm:p-8 flex items-center gap-5 bg-background">
              <div className="size-16 rounded-full bg-gradient-to-br from-brand to-pop grid place-items-center text-cream text-lg font-mono shrink-0">
                {post.author.split(" ").map((s) => s[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Written by</p>
                <p className="font-semibold text-lg tracking-tight">{post.author}</p>
                <p className="text-sm text-muted-foreground">{post.authorRole} · Studio Kinetic</p>
              </div>
              <button className="hidden sm:inline-flex items-center gap-2 bg-foreground/[0.04] hover:bg-foreground/10 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors">
                Follow
              </button>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
            <div className="max-w-screen-xl mx-auto">
              <div className="flex items-end justify-between mb-8 gap-4">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">More from <span className="italic font-light">{post.tag}</span></h2>
                <Link to="/blog" className="hidden sm:inline-flex items-center gap-2 bg-foreground/[0.04] hover:bg-foreground/10 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors">
                  All stories →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    to="/blog/$postId"
                    params={{ postId: p.id }}
                    className="group block rounded-2xl overflow-hidden border border-foreground/10 hover:border-foreground/30 transition-all hover:-translate-y-1"
                  >
                    <div className="relative aspect-[5/4] overflow-hidden">
                      <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <span className={`absolute bottom-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${accentChip[p.accent]}`}>{p.tag}</span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-semibold leading-snug mb-2 group-hover:text-brand transition-colors line-clamp-2">{p.title}</h3>
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">{p.author} · {p.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <footer className="border-t border-border">
        <div className="max-w-screen-xl mx-auto py-10 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-widest">© 2026 Studio Kinetic</p>
          <div className="flex gap-6 sm:gap-8">
            <Link to="/" className="text-xs font-medium uppercase tracking-widest">Home</Link>
            <Link to="/blog" className="text-xs font-medium uppercase tracking-widest">Journal</Link>
            <Link to="/products" className="text-xs font-medium uppercase tracking-widest">Shop</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ---------- HERO COVER (parallax tilt + scroll parallax) ---------- */
function HeroCover({ post }: { post: Post }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setScrollY(Math.max(0, -r.top));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -12;
    setTilt({ x, y });
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="relative h-[60vh] sm:h-[72vh] lg:h-[82vh] overflow-hidden bg-ink"
      style={{ perspective: "1200px" }}
    >
      <div
        className="absolute inset-0 transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: `translateY(${scrollY * 0.25}px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.08)`,
          transformStyle: "preserve-3d",
        }}
      >
        <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
        {/* color wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/10 to-ink/70" />
        <div className="absolute inset-0 mix-blend-overlay opacity-60 bg-[radial-gradient(circle_at_70%_30%,#ff5b2e55,transparent_55%),radial-gradient(circle_at_20%_80%,#39d4a355,transparent_55%)]" />
      </div>

      {/* floating chips */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8 flex flex-wrap gap-2 z-10">
        <span className="inline-flex items-center gap-2 bg-cream/90 text-ink backdrop-blur rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest">
          ★ Featured story
        </span>
        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest ${accentChip[post.accent]}`}>
          {post.tag}
        </span>
      </div>
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-10">
        <span className="inline-flex items-center gap-2 bg-ink/70 text-cream backdrop-blur rounded-full px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.25em]">
          ⊕ Move cursor · {post.readTime}
        </span>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-cream/80">
        <span className="text-[9px] font-mono uppercase tracking-[0.3em]">Scroll</span>
        <span className="block h-8 w-px bg-cream/40 animate-pulse" />
      </div>
    </section>
  );
}

/* ---------- PRODUCT BLOCK (interactive image + Get now CTA + description) ---------- */
function ProductBlock({ product, index, total }: { product: ProductItem; index: number; total: number }) {
  const [zoom, setZoom] = useState({ x: 50, y: 50, on: false });
  const [colorIdx, setColorIdx] = useState(0);
  const [imgFlip, setImgFlip] = useState(false);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  const onZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
      on: true,
    });
  };

  const activeColor = product.palette[colorIdx];
  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <section className="max-w-5xl mx-auto">
      {/* index marker + product title */}
      <div className="flex items-baseline gap-4 mb-3">
        <span className="font-mono text-xs sm:text-sm tabular-nums text-brand">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
          Featured object
        </span>
      </div>
      <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tighter leading-[0.95] text-balance mb-3">
        {product.name}
      </h2>
      <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-8">
        {product.tagline}
      </p>

      {/* Interactive image */}
      <div
        onMouseMove={onZoom}
        onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
        className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden cursor-zoom-in group"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${activeColor.hex}33, transparent 65%), ${activeColor.hex}10`,
        }}
      >
        <img
          src={imgFlip ? product.altImage : product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out"
          style={{
            transform: zoom.on ? "scale(1.55)" : "scale(1)",
            transformOrigin: `${zoom.x}% ${zoom.y}%`,
          }}
        />

        {/* edition tag */}
        <span className="absolute top-4 left-4 inline-flex items-center gap-2 bg-cream/90 text-ink backdrop-blur rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest z-10">
          {product.edition}
        </span>

        {/* zoom hint */}
        <span className="absolute top-4 right-4 inline-flex items-center gap-2 bg-ink/70 text-cream backdrop-blur rounded-full px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity z-10">
          ⊕ Hover to zoom
        </span>

        {/* color swatches inside image */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-background/80 backdrop-blur rounded-full p-1.5">
          {product.palette.map((c, i) => (
            <button
              key={c.name}
              type="button"
              onClick={(e) => { e.stopPropagation(); setColorIdx(i); }}
              aria-label={c.name}
              className={`size-7 rounded-full border-2 transition-all ${
                i === colorIdx ? "border-foreground scale-110" : "border-transparent hover:scale-110"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
          <span className="px-2 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            {activeColor.name}
          </span>
        </div>

        {/* flip thumbnails */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setImgFlip((v) => !v); }}
          className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 bg-background/80 hover:bg-background backdrop-blur rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors"
        >
          ⇄ View {imgFlip ? "front" : "back"}
        </button>
      </div>

      {/* Get now CTA right under the image */}
      <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl sm:text-4xl font-semibold tracking-tight tabular-nums">{product.price}</span>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">incl. shipping</span>
        </div>
        <div className="flex-1 flex items-stretch gap-3">
          <button
            type="button"
            onClick={handleAdd}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-xs sm:text-[13px] font-bold uppercase tracking-widest transition-all hover:scale-[1.03] active:scale-100 ${
              added ? "bg-mint text-ink" : "bg-ink text-cream"
            }`}
          >
            {added ? "✓ Added to cart" : "Get it now"}
            <span className={`inline-grid place-items-center size-6 rounded-full ${added ? "bg-ink/20" : "bg-cream/15"}`}>→</span>
          </button>
          <button
            type="button"
            onClick={() => setLiked((v) => !v)}
            aria-label="Save"
            className={`size-14 grid place-items-center rounded-full transition-all hover:scale-105 ${
              liked ? "bg-pop text-pop-foreground" : "bg-foreground/[0.05] hover:bg-foreground/10"
            }`}
          >
            {liked ? "♥" : "♡"}
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-8">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-brand mb-3">About this object</p>
          <p className="text-base sm:text-lg text-foreground/85 leading-relaxed text-pretty">
            {product.description}
          </p>
        </div>
        <ul className="lg:col-span-4 space-y-2.5 lg:border-l lg:border-foreground/10 lg:pl-8">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-3">In the box</p>
          {product.features.map((f) => (
            <li key={f} className="flex items-center gap-3 text-sm">
              <span className="size-1.5 rounded-full bg-brand" />
              <span className="text-foreground/85">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* divider for next product */}
      {index < total - 1 && (
        <div className="mt-16 sm:mt-20 flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-px flex-1 bg-foreground/10" />
          <span>↓ Next object</span>
          <span className="h-px flex-1 bg-foreground/10" />
        </div>
      )}
    </section>
  );
}
