"use client";
import { useState, useMemo } from "react";
import { tools, CATEGORIES, CATEGORY_COLORS, CATEGORY_ICONS } from "@/lib/tools";

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
      const matchesSearch =
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <main className="min-h-screen bg-[#080c14] text-white">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-slate-800/60">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.15) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-14">
          <span className="inline-flex items-center gap-2 text-indigo-400 text-sm font-medium tracking-wide uppercase mb-5">
            <span className="w-6 h-px bg-indigo-400" />
            AI Tools Directory
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-4 max-w-2xl">
            Find the best AI tools
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              for work &amp; learning
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mb-10">
            A curated directory of {tools.length} AI tools for writing, coding, images, video and productivity.
          </p>

          {/* Search */}
          <div className="relative max-w-lg">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tools..."
              className="w-full bg-slate-900/80 border border-slate-700/60 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>
        </div>
      </div>

      {/* Filters + Grid */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition border ${
                activeCategory === cat
                  ? "bg-indigo-600 border-indigo-500 text-white"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-white"
              }`}
            >
              {cat !== "All" && <span className="mr-1.5">{CATEGORY_ICONS[cat]}</span>}
              {cat}
            </button>
          ))}
          <span className="ml-auto self-center text-slate-500 text-sm">
            {filtered.length} tool{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Tool grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-slate-500">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-lg">No tools found for &ldquo;{search}&rdquo;</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); }}
              className="mt-4 text-indigo-400 hover:underline text-sm"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {filtered.map((tool) => {
              const color = CATEGORY_COLORS[tool.category] || CATEGORY_COLORS.Writing;
              return (
                <div
                  key={tool.slug}
                  className="group bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col hover:border-slate-600 transition-all duration-200 hover:bg-slate-900"
                >
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border w-fit mb-4 ${color.bg} ${color.text} ${color.border}`}
                  >
                    <span>{CATEGORY_ICONS[tool.category]}</span>
                    {tool.category}
                  </span>

                  <h2 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">
                    {tool.name}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed flex-1">
                    {tool.description}
                  </p>

                  <div className="mt-6 flex gap-3">
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-medium transition"
                    >
                      Visit Site ↗
                    </a>
                    <a
                      href={`/tool/${tool.slug}`}
                      className="px-4 py-2.5 rounded-xl border border-slate-700 hover:border-slate-500 text-sm font-medium text-slate-300 hover:text-white transition"
                    >
                      Details
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
