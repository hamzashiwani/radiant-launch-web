import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { posts, type Post } from "@/lib/blog-data";

export const Route = createFileRoute("/blog_/")({
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
  const related = posts.filter((p) => p.id !== post.id && p.tag === post.tag).slice(0, 3);
  const fillers = posts.filter((p) => p.id !== post.id && !related.includes(p)).slice(0, 9 - related.length);
  const more = [...related, ...fillers];

  const body = [
    post.intro,
    `${post.excerpt} The piece below is a slow read — written across three weeks, edited down from twice the length, and structured around the small objects that prompted it in the first place.`,
    `We've tried to keep the prose close to the work. Where a paragraph could be a caption, we made it a caption. Where a sentence could be a product, we let it become one. The result is a hybrid: half essay, half catalogue, entirely the way we actually think about ${post.tag.toLowerCase()}.`,
    `If you only have two minutes, scroll. The images carry most of the argument. If you have ten, read straight through — the order matters more than it looks like it does.`,
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10">
        <Link to="/blog" className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors">
          ← Back to journal
        </Link>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10">
        <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-brand mb-4">{post.tag} · {post.readTime}</p>
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.05] text-balance mb-5">
          {post.title}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground text-pretty mb-10">
          {post.excerpt}
        </p>

        {/* Cover image */}
        <figure className="mb-12">
          <img
            src={post.image}
            alt={post.title}
            className="w-full aspect-[16/10] object-cover rounded-2xl"
            loading="eager"
          />
        </figure>

        {/* Content */}
        <div className="space-y-6 text-[17px] leading-[1.7] text-foreground/90 mb-16">
          {body.map((p, i) => <p key={i}>{p}</p>)}
        </div>

        {/* Product descriptions */}
        {post.products.map((prod, i) => (
          <div key={i} className="mb-14">
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-3">Featured · 0{i + 1}</p>
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">{prod.name}</h3>
            <p className="text-base text-muted-foreground italic mb-4">{prod.tagline}</p>
            <p className="text-[16px] leading-[1.7] text-foreground/90">{prod.description}</p>
          </div>
        ))}
      </article>

      {/* Newsletter */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 mt-20">
        <div className="bg-ink text-cream rounded-2xl p-8 sm:p-12 text-center">
          <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-pop mb-4">Newsletter</p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">One letter, every Sunday.</h2>
          <p className="text-sm text-cream/70 max-w-md mx-auto mb-6">
            Stories, objects, and the occasional argument — straight to your inbox.
          </p>
          <NewsletterForm />
        </div>
      </section>

      {/* More related stories */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-20 mb-24">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">More related stories</h2>
          <Link to="/blog" className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground">View all →</Link>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {more.map((p) => (
            <li key={p.id}>
              <Link to="/blog/$postId" params={{ postId: p.id }} className="group block">
                <div className="overflow-hidden rounded-xl mb-3">
                  <img src={p.image} alt={p.title} className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
                </div>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-1.5">{p.tag} · {p.readTime}</p>
                <h3 className="text-base sm:text-lg font-medium leading-snug text-balance group-hover:underline underline-offset-4 decoration-brand mb-1.5">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }}
      className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@studio.com"
        className="flex-1 bg-cream/10 border border-cream/20 rounded-full px-4 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-pop"
      />
      <button type="submit" className="bg-pop text-pop-foreground rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest">
        {done ? "Subscribed ✓" : "Subscribe"}
      </button>
    </form>
  );
}
