const tools = [
  {
    name: "ChatGPT",
    category: "Writing",
    description: "AI assistant for writing, research and productivity.",
  },
  {
    name: "Claude",
    category: "Writing",
    description: "AI assistant with long context and thoughtful answers.",
  },
  {
    name: "Cursor",
    category: "Coding",
    description: "AI code editor for developers.",
  },
  {
    name: "Midjourney",
    category: "Image",
    description: "AI image generation platform.",
  },
  {
    name: "Runway",
    category: "Video",
    description: "AI video generation and editing platform.",
  },
  {
    name: "Perplexity",
    category: "Research",
    description: "AI-powered search engine and answer assistant.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-blue-400 font-semibold">
            AI Tools Directory
          </p>

          <h1 className="text-5xl font-bold mt-4 mb-4">
            Find the best AI tools for work, learning and business
          </h1>

          <p className="text-slate-300 text-lg">
            A curated directory of AI writing, coding, image, video and productivity tools.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
            >
              <span className="text-sm text-blue-400">
                {tool.category}
              </span>

              <h2 className="text-2xl font-bold mt-2">
                {tool.name}
              </h2>

              <p className="text-slate-300 mt-3">
                {tool.description}
              </p>

              <button className="mt-6 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500">
                View Tool
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
