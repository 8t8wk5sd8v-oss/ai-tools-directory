import Link from "next/link";
import { tools, CATEGORY_COLORS, CATEGORY_ICONS } from "../../../lib/tools";

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }) {
  const tool = tools.find((t) => t.slug === params.slug);
  if (!tool) return { title: "Tool not found" };
  return {
    title: `${tool.name} Review & Pricing (2025) — AI Tools Directory`,
    description: `${tool.description} Pros, cons, pricing and alternatives for ${tool.name}.`,
    openGraph: {
      title: `${tool.name} — AI Tools Directory`,
      description: tool.description,
    },
  };
}

export default function ToolPage({ params }) {
  const tool = tools.find((t) => t.slug === params.slug);

  if (!tool) {
    return (
      <main className="min-h-screen bg-[#080c14] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🤖</p>
          <h1 className="text-2xl font-bold mb-2">Tool not found</h1>
          <Link href="/" className="text-indigo-400 hover:underline">← Back to directory</Link>
        </div>
      </main>
    );
  }

  const color = CATEGORY_COLORS[tool.category] || CATEGORY_COLORS.Writing;
  const alternativeTools = (tool.alternatives || [])
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-[#080c14] text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-10 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to directory
        </Link>

        {/* Header */}
        <div className="mb-10">
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border mb-4 ${color.bg} ${color.text} ${color.border}`}>
            <span>{CATEGORY_ICONS[tool.category]}</span>
            {tool.category}
          </span>
          <h1 className="text-4xl font-bold mb-3">{tool.name}</h1>
          <p className="text-slate-400 text-lg leading-relaxed">{tool.description}</p>
        </div>

        {/* About */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 mb-6">
          <h2 className="text-lg font-semibold mb-3">About {tool.name}</h2>
          <p className="text-slate-300 leading-relaxed">{tool.longDescription}</p>
        </section>

        {/* Pros & Cons */}
        <section className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
              <span className="text-emerald-400">✓</span> Pros
            </h2>
            <ul className="space-y-2">
              {(tool.pros || []).map((pro) => (
                <li key={pro} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
              <span className="text-red-400">✕</span> Cons
            </h2>
            <ul className="space-y-2">
              {(tool.cons || []).map((con) => (
                <li key={con} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-red-400 mt-0.5 shrink-0">✕</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 mb-6">
          <h2 className="text-lg font-semibold mb-2">Pricing</h2>
          <p className="text-slate-300">{tool.pricing}</p>
        </section>

        {/* CTA */}
        <section className="mb-10">
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-medium transition text-center"
          >
            Visit {tool.name} ↗
          </a>
        </section>

        {/* Tags */}
        {tool.tags?.length > 0 && (
          <section className="mb-12">
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-3">Tags</p>
            <div className="flex flex-wrap gap-2">
              {tool.tags.map((tag) => (
                <span key={tag} className="text-sm bg-slate-800 text-slate-300 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Alternatives */}
        {alternativeTools.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-4">{tool.name} alternatives</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {alternativeTools.map((alt) => {
                const altColor = CATEGORY_COLORS[alt.category] || CATEGORY_COLORS.Writing;
                return (
                  <Link
                    key={alt.slug}
                    href={`/tool/${alt.slug}`}
                    className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 hover:border-slate-600 transition group"
                  >
                    <span className={`text-xs font-semibold ${altColor.text} mb-2 block`}>
                      {CATEGORY_ICONS[alt.category]} {alt.category}
                    </span>
                    <p className="font-semibold mb-1 group-hover:text-white transition">{alt.name}</p>
                    <p className="text-slate-400 text-sm line-clamp-2">{alt.description}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
