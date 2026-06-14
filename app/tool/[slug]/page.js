import Link from "next/link";
import { tools, CATEGORY_COLORS, CATEGORY_ICONS } from "@/lib/tools";

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }) {
  const tool = tools.find((t) => t.slug === params.slug);
  if (!tool) return { title: "Tool not found" };
  return {
    title: `${tool.name} — AI Tools Directory`,
    description: tool.description,
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
  const related = tools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 3);

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
        <div className="mb-8">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border mb-4 ${color.bg} ${color.text} ${color.border}`}
          >
            <span>{CATEGORY_ICONS[tool.category]}</span>
            {tool.category}
          </span>
          <h1 className="text-4xl font-bold mb-3">{tool.name}</h1>
          <p className="text-slate-400 text-lg">{tool.description}</p>
        </div>

        {/* Detail card */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 mb-8">
          <h2 className="text-lg font-semibold mb-3">About</h2>
          <p className="text-slate-300 leading-relaxed mb-6">{tool.longDescription}</p>

          <div className="flex items-center justify-between pt-6 border-t border-slate-800">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Pricing</p>
              <p className="text-slate-200 font-medium">{tool.pricing}</p>
            </div>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-medium transition"
            >
              Visit {tool.name} ↗
            </a>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-12">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-3">Tags</p>
          <div className="flex flex-wrap gap-2">
            {tool.tags.map((tag) => (
              <span key={tag} className="text-sm bg-slate-800 text-slate-300 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related tools */}
        {related.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">More {tool.category} tools</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/tool/${rel.slug}`}
                  className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 hover:border-slate-600 transition"
                >
                  <p className="font-semibold mb-1">{rel.name}</p>
                  <p className="text-slate-400 text-sm line-clamp-2">{rel.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
