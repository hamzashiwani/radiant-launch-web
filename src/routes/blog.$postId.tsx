import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { posts, accentChip, formatViews, type Post } from "@/lib/blog-data";

export const Route = createFileRoute("/blog/$postId")({
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
  const [activeImg, setActiveImg] = useState(0);
  const [zoom, setZoom] = useState({ x: 50, y: 50, on: false });
  const [colorIdx, setColorIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [progress, setProgress] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);

  const related = useMemo(
    () => posts.filter((p) => p.id !== post.id && p.tag === post.tag).slice(0, 3),
    [post.id, post.tag],
  );
  const morePicks = useMemo(
    () => posts.filter((p) => p.id !== post.id).sort((a, b) => b.likes - a.likes).slice(0, 4),
    [post.id],
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
  }, []);

  // Reset on post change
  useEffect(() => {
    setActiveImg(0);
    setColorIdx(0);
    setQty(1);
    setLiked(false);
    setSaved(false);
    window.scrollTo({ top: 0 });
  }, [post.id]);

  const onZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
      on: true,
    });
  };

  const activeColor = post.product.palette[colorIdx];

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

      {/* Breadcrumb + meta */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-6 flex flex-wrap items-center gap-2">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-foreground">Journal</Link>
            <span>/</span>
            <span className="text-brand">{post.tag}</span>
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-5 ${accentChip[post.accent]}`}>
                {post.tag} · Field study
              </span>
              <h1 className="text-[2.2rem] sm:text-5xl md:text-6xl font-semibold tracking-tighter leading-[0.98] text-balance mb-6">
                {post.title}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl text-pretty">
                {post.excerpt}
              </p>
            </div>
            <div className="lg:col-span-4 grid grid-cols-2 gap-4 text-[11px] font-mono uppercase tracking-[0.2em]">
              <div className="rounded-xl bg-foreground/[0.04] p-4">
                <p className="text-muted-foreground mb-1">Author</p>
                <p className="text-foreground normal-case tracking-normal font-sans font-semibold text-sm">{post.author}</p>
                <p className="text-muted-foreground normal-case tracking-normal font-sans text-xs mt-0.5">{post.authorRole}</p>
              </div>
              <div className="rounded-xl bg-foreground/[0.04] p-4">
                <p className="text-muted-foreground mb-1">Read</p>
                <p className="text-foreground normal-case tracking-normal font-sans font-semibold text-sm">{post.readTime}</p>
                <p className="text-muted-foreground normal-case tracking-normal font-sans text-xs mt-0.5">{post.date}</p>
              </div>
              <div className="rounded-xl bg-foreground/[0.04] p-4">
                <p className="text-muted-foreground mb-1">Views</p>
                <p className="text-foreground normal-case tracking-normal font-sans font-semibold text-sm">{formatViews(post.views)}</p>
              </div>
              <div className="rounded-xl bg-foreground/[0.04] p-4">
                <p className="text-muted-foreground mb-1">Likes</p>
                <p className="text-foreground normal-case tracking-normal font-sans font-semibold text-sm">{formatViews(post.likes)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article body + product showcase */}
      <div ref={articleRef}>
        {/* Product showcase */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Gallery */}
            <div className="lg:col-span-7">
              <div
                onMouseMove={onZoom}
                onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
                className="relative aspect-[4/3] sm:aspect-[5/4] rounded-3xl overflow-hidden bg-foreground/[0.04] cursor-zoom-in"
                style={{ background: `radial-gradient(circle at 50% 30%, ${activeColor.hex}22, transparent 60%)` }}
              >
                <img
                  src={post.product.gallery[activeImg]}
                  alt={post.product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out"
                  style={{
                    transform: zoom.on ? `scale(1.6)` : "scale(1)",
                    transformOrigin: `${zoom.x}% ${zoom.y}%`,
                  }}
                />
                <span className="absolute top-4 left-4 inline-flex items-center gap-2 bg-cream/90 text-ink backdrop-blur rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                  {post.product.edition}
                </span>
                <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-ink/80 text-cream backdrop-blur rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em]">
                  ⊕ Hover to zoom · {String(activeImg + 1).padStart(2, "0")}/{post.product.gallery.length}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {post.product.gallery.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImg(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all ${
                      i === activeImg ? "border-brand scale-[1.02]" : "border-transparent hover:border-foreground/30"
                    }`}
                  >
                    <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product card */}
            <aside className="lg:col-span-5 lg:sticky lg:top-24 self-start">
              <div className="rounded-3xl border border-foreground/10 bg-background p-6 sm:p-8 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.3)]">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-brand mb-2">Featured object</p>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">{post.product.name}</h2>
                <p className="text-sm text-muted-foreground mb-6">{post.product.tagline}</p>

                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl sm:text-4xl font-semibold tracking-tight tabular-nums">{post.product.price}</span>
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">incl. shipping</span>
                </div>

                {/* Color swatches */}
                <div className="mb-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground mb-3">
                    Finish · <span className="text-foreground">{activeColor.name}</span>
                  </p>
                  <div className="flex gap-2.5">
                    {post.product.palette.map((c, i) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setColorIdx(i)}
                        aria-label={c.name}
                        className={`size-10 rounded-full border-2 transition-all ${
                          i === colorIdx ? "border-foreground scale-110" : "border-foreground/15 hover:border-foreground/40"
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>

                {/* Quantity + CTA */}
                <div className="flex items-stretch gap-3 mb-5">
                  <div className="flex items-center rounded-full border border-foreground/15 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="size-11 grid place-items-center hover:bg-foreground/5 text-lg"
                      aria-label="Decrease quantity"
                    >−</button>
                    <span className="w-8 text-center font-mono tabular-nums">{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.min(9, q + 1))}
                      className="size-11 grid place-items-center hover:bg-foreground/5 text-lg"
                      aria-label="Increase quantity"
                    >+</button>
                  </div>
                  <button
                    type="button"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-ink text-cream rounded-full px-5 text-[11px] font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-100 transition-transform"
                  >
                    Add to cart →
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setLiked((v) => !v)}
                    className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all ${
                      liked ? "bg-pop text-pop-foreground" : "bg-foreground/[0.04] hover:bg-foreground/10"
                    }`}
                  >
                    {liked ? "♥ Loved" : "♡ Love"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSaved((v) => !v)}
                    className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all ${
                      saved ? "bg-brand text-brand-foreground" : "bg-foreground/[0.04] hover:bg-foreground/10"
                    }`}
                  >
                    {saved ? "✓ Saved" : "+ Save"}
                  </button>
                </div>

                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 pt-5 border-t border-foreground/10 text-xs">
                  <div>
                    <dt className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Dimensions</dt>
                    <dd className="text-foreground mt-0.5">{post.product.dimensions}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Edition</dt>
                    <dd className="text-foreground mt-0.5">{post.product.edition}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1.5">Materials</dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {post.product.materials.map((m) => (
                        <span key={m} className="rounded-full bg-foreground/[0.06] px-2.5 py-1 text-[11px]">{m}</span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </section>

        {/* Article copy */}
        <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-foreground/[0.02] border-y border-foreground/5">
          <div className="max-w-3xl mx-auto">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-brand mb-4">The story</p>
            <p className="text-xl sm:text-2xl leading-snug font-medium text-balance mb-8">
              We started with a question: what would this object look like if we threw away the brief and worked backwards from the way it should feel in your hand?
            </p>
            <div className="space-y-5 text-base text-foreground/80 leading-relaxed">
              <p>
                Every {post.product.name.toLowerCase()} begins as a sketch and ends as a small ritual on someone's desk. Between those two points sits a year of testing, a graveyard of prototypes, and a small Lisbon workshop that smells, depending on the season, of brass shavings or coffee.
              </p>
              <p>
                {post.excerpt} The rest of this piece is a tour through the choices behind it — the materials we tried and rejected, the moment we almost shipped the wrong colour, and what we learned from the people quietly using version 0.4 every day.
              </p>
            </div>

            {/* Pull quote */}
            <blockquote className="my-12 p-8 sm:p-10 rounded-3xl bg-ink text-cream relative overflow-hidden">
              <span className="absolute top-4 left-6 text-7xl opacity-20 leading-none">"</span>
              <p className="text-lg sm:text-2xl font-medium leading-snug relative">
                Good objects don't ask for attention. They wait, and reward you the third time you reach for them.
              </p>
              <footer className="mt-5 text-[11px] font-mono uppercase tracking-[0.25em] text-pop relative">
                — {post.author}, in studio
              </footer>
            </blockquote>

            <h3 className="text-2xl font-semibold tracking-tight mb-5">What makes it different</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {post.product.features.map((f, i) => (
                <div
                  key={f.title}
                  className="group rounded-2xl border border-foreground/10 p-5 hover:border-foreground/30 hover:-translate-y-0.5 transition-all bg-background"
                >
                  <span className="inline-grid place-items-center size-8 rounded-full bg-brand text-brand-foreground text-xs font-mono mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="font-semibold tracking-tight mb-1.5 group-hover:text-brand transition-colors">{f.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>

            <p className="text-base text-foreground/80 leading-relaxed mb-5">
              We could go on. We won't. The only way to really understand a piece like this is to live with it for a week, watch your hand reach for it without looking, and let it become invisible in the best possible sense.
            </p>

            {/* Author card */}
            <div className="mt-12 rounded-3xl border border-foreground/10 p-6 sm:p-8 flex items-center gap-5 bg-background">
              <div className="size-16 rounded-full bg-gradient-to-br from-brand to-pop grid place-items-center text-cream text-lg font-mono">
                {post.author.split(" ").map((s) => s[0]).join("")}
              </div>
              <div className="flex-1">
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

        {/* Specs marquee */}
        <section className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-screen-xl mx-auto">
            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-brand mb-6">The fine print</p>
            <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {post.product.specs.map((s) => (
                <div key={s.label} className="rounded-2xl border border-foreground/10 p-4 hover:bg-foreground/[0.03] transition-colors">
                  <dt className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1.5">{s.label}</dt>
                  <dd className="text-sm font-semibold tracking-tight">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20 border-t border-foreground/10">
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

              {/* Editor's picks rail */}
              <div className="mt-14 rounded-3xl bg-ink text-cream p-6 sm:p-10">
                <div className="flex items-end justify-between mb-6 gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-pop mb-2">You might also love</p>
                    <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">Hand-picked from the index</h3>
                  </div>
                </div>
                <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {morePicks.map((p, i) => (
                    <li key={p.id}>
                      <Link to="/blog/$postId" params={{ postId: p.id }} className="group block">
                        <div className="flex items-start gap-3">
                          <span className="font-mono text-pop text-xs tabular-nums pt-1">{String(i + 1).padStart(2, "0")}</span>
                          <div>
                            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-cream/50 mb-1">{p.tag} · {p.readTime}</p>
                            <p className="text-sm font-medium leading-snug group-hover:text-pop transition-colors">{p.title}</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ol>
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