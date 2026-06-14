const tools = [
  {
    name: "ChatGPT",
    category: "Writing",
    description: "AI assistant for writing, research and productivity."
  },
  {
    name: "Claude",
    category: "Writing",
    description: "AI assistant with long context and thoughtful answers."
  },
  {
    name: "Cursor",
    category: "Coding",
    description: "AI code editor for developers."
  },
  {
    name: "Midjourney",
    category: "Image",
    description: "AI image generation platform."
  },
  {
    name: "Runway",
    category: "Video",
    description: "AI video generation and editing."
  }
];
const tools = [
  { name: "ChatGPT", category: "Writing", description: "AI assistant for writing, research, coding and productivity." },
  { name: "Claude", category: "Writing", description: "AI assistant focused on long documents and thoughtful answers." },
  { name: "Cursor", category: "Coding", description: "AI code editor for developers." },
  { name: "Midjourney", category: "Image", description: "AI image generation tool." },
  { name: "Runway", category: "Video", description: "AI video generation and editing platform." },
  { name: "Perplexity", category: "Research", description: "AI search and answer engine." }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <section className="max-w-5xl mx-auto">
        <p className="text-blue-400 font-semibold mb-3">AI Tools Directory</p>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Find the best AI tools for work, learning and business
        </h1>
        <p className="text-slate-300 text-lg mb-10">
          A curated directory of AI writing, coding, image, video and productivity tools.
        </p>

        <div className="grid md:grid-cols-3 gap-5">
          {tools.map((tool) => (
            <div key={tool.name} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <span className="text-sm text-blue-400">{tool.category}</span>
              <h2 className="text-2xl font-bold mt-2">{tool.name}</h2>
              <p className="text-slate-300 mt-3">{tool.description}</p>
              <button className="mt-5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500">
                View tool
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
