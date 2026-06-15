"use client";
import { useState } from "react";
import Link from "next/link";

export default function RecommendBlock() {
  const [task, setTask] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!task.trim()) return;
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setResult(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="border-t border-slate-800/60 bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-6 py-14">
        {/* Header */}
        <div className="max-w-2xl mb-8">
          <span className="inline-flex items-center gap-2 text-indigo-400 text-sm font-medium tracking-wide uppercase mb-4">
            <span className="w-6 h-px bg-indigo-400" />
            AI Recommender
          </span>
          <h2 className="text-3xl font-bold mb-3">Not sure which tool to use?</h2>
          <p className="text-slate-400">
            Describe your task and we'll recommend the best AI tools — and tell you if the free plan is enough.
          </p>
        </div>

        {/* Input */}
        <div className="max-w-2xl">
          <textarea
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="e.g. I need to write 10 product descriptions for my online store and schedule social media posts..."
            rows={3}
            className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition resize-none mb-4"
          />
          <button
            onClick={handleSubmit}
            disabled={loading || !task.trim()}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Analysing...
              </>
            ) : (
              "Find my tools →"
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="max-w-2xl mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="max-w-2xl mt-8">
            {result.summary && (
              <p className="text-slate-300 mb-6 text-sm leading-relaxed border-l-2 border-indigo-500 pl-4">
                {result.summary}
              </p>
            )}
            <div className="space-y-4">
              {result.recommendations?.map((rec, i) => (
                <div
                  key={i}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-600 transition"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-lg font-bold">{rec.name}</h3>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                        rec.freeSufficient
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                      }`}
                    >
                      {rec.freeSufficient ? "✓ Free plan ok" : "Paid recommended"}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm mb-3 leading-relaxed">{rec.reason}</p>
                  <p className="text-slate-400 text-sm">{rec.planAdvice}</p>
                  <Link
                    href={`/tool/${rec.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}
                    className="inline-flex items-center gap-1 mt-4 text-indigo-400 hover:text-indigo-300 text-sm transition"
                  >
                    View full details →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
