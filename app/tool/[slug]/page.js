import Link from "next/link";

// Shared tools data — в реальном проекте вынести в lib/tools.js
const tools = [
  { name: "ChatGPT", category: "Writing", description: "AI assistant for writing, research and productivity.", url: "https://chat.openai.com", slug: "chatgpt", longDescription: "ChatGPT by OpenAI is one of the most widely used AI assistants. It helps with drafting emails, writing essays, brainstorming ideas, answering questions, summarising documents, and much more.", pricing: "Free / $20 per month", tags: ["chatbot", "writing", "research", "productivity"] },
  { name: "Claude", category: "Writing", description: "AI assistant with long context and thoughtful answers.", url: "https://claude.ai", slug: "claude", longDescription: "Claude is Anthropic's AI assistant, known for its long context window (up to 200k tokens), nuanced reasoning, and thoughtful, detailed responses.", pricing: "Free / $20 per month", tags: ["chatbot", "writing", "long context", "research"] },
  { name: "Notion AI", category: "Writing", description: "AI writing assistant built into Notion.", url: "https://notion.so", slug: "notion-ai", longDescription: "Notion AI integrates directly into your Notion workspace, helping you write, summarise, translate and improve text without leaving your notes.", pricing: "$10 per member/month (add-on)", tags: ["writing", "notes", "productivity", "summarisation"] },
  { name: "Jasper", category: "Writing", description: "AI copywriting tool for marketing teams.", url: "https://jasper.ai", slug: "jasper", longDescription: "Jasper is an AI writing platform designed for marketers. It generates blog posts, ad copy, social media content and more, trained on marketing best practices.", pricing: "From $39 per month", tags: ["copywriting", "marketing", "content", "SEO"] },
  { name: "Grammarly", category: "Writing", description: "AI grammar and style checker.", url: "https://grammarly.com", slug: "grammarly", longDescription: "Grammarly uses AI to catch grammar mistakes, improve clarity, adjust tone and detect plagiarism. It works across browsers, Word, and other apps.", pricing: "Free / $12 per month", tags: ["grammar", "editing", "writing", "proofreading"] },
  { name: "Cursor", category: "Coding", description: "AI code editor for developers.", url: "https://cursor.sh", slug: "cursor", longDescription: "Cursor is a VS Code fork with deep AI integration. It can write, refactor, and explain code, answer questions about your codebase, and auto-fix bugs.", pricing: "Free / $20 per month", tags: ["coding", "IDE", "code editor", "developer tools"] },
  { name: "GitHub Copilot", category: "Coding", description: "AI pair programmer integrated into your editor.", url: "https://github.com/features/copilot", slug: "github-copilot", longDescription: "GitHub Copilot suggests code completions and whole functions in real time, integrates with VS Code, JetBrains, Neovim and more.", pricing: "$10 per month / free for students", tags: ["coding", "autocomplete", "developer tools", "GitHub"] },
  { name: "Replit", category: "Coding", description: "AI-powered coding environment in the browser.", url: "https://replit.com", slug: "replit", longDescription: "Replit is a browser-based IDE with AI features that can generate, explain and debug code. Great for beginners and quick prototyping.", pricing: "Free / $7 per month", tags: ["coding", "browser IDE", "education", "prototyping"] },
  { name: "Tabnine", category: "Coding", description: "AI code completion for all major IDEs.", url: "https://tabnine.com", slug: "tabnine", longDescription: "Tabnine provides AI code completions with a focus on privacy and enterprise use. It can be run locally so your code never leaves your machine.", pricing: "Free / $12 per month", tags: ["coding", "autocomplete", "privacy", "enterprise"] },
  { name: "Midjourney", category: "Image", description: "AI image generation platform.", url: "https://midjourney.com", slug: "midjourney", longDescription: "Midjourney produces stunning, highly aesthetic images from text prompts. Known for its unique artistic style and high quality output, used by designers and creatives worldwide.", pricing: "From $10 per month", tags: ["image generation", "art", "design", "creative"] },
  { name: "DALL·E 3", category: "Image", description: "OpenAI's image generation model.", url: "https://openai.com/dall-e-3", slug: "dalle-3", longDescription: "DALL·E 3 by OpenAI generates highly accurate images from detailed text descriptions and is natively integrated into ChatGPT.", pricing: "Included with ChatGPT Plus", tags: ["image generation", "OpenAI", "creative", "design"] },
  { name: "Stable Diffusion", category: "Image", description: "Open-source AI image generation.", url: "https://stability.ai", slug: "stable-diffusion", longDescription: "Stable Diffusion is an open-source image generation model you can run locally or via APIs. Highly customisable with thousands of community models.", pricing: "Free (self-hosted) / API pricing varies", tags: ["image generation", "open source", "self-hosted", "creative"] },
  { name: "Adobe Firefly", category: "Image", description: "Adobe's generative AI for creatives.", url: "https://firefly.adobe.com", slug: "adobe-firefly", longDescription: "Adobe Firefly is trained on licensed content and integrates into Photoshop, Illustrator and other Adobe apps for safe, commercially usable AI images.", pricing: "Included with Adobe Creative Cloud", tags: ["image generation", "Adobe", "commercial", "design"] },
  { name: "Runway", category: "Video", description: "AI video generation and editing platform.", url: "https://runwayml.com", slug: "runway", longDescription: "Runway offers a suite of AI video tools including text-to-video, video-to-video, background removal, and inpainting. Used by film makers and content creators.", pricing: "Free / From $12 per month", tags: ["video generation", "editing", "creative", "filmmaking"] },
  { name: "Sora", category: "Video", description: "OpenAI's text-to-video model.", url: "https://openai.com/sora", slug: "sora", longDescription: "Sora by OpenAI can generate realistic and imaginative video scenes from text prompts, up to a minute long with high visual quality.", pricing: "Included with ChatGPT Plus/Pro", tags: ["video generation", "OpenAI", "text-to-video"] },
  { name: "Pika", category: "Video", description: "AI video creation from text and images.", url: "https://pika.art", slug: "pika", longDescription: "Pika lets you create and edit videos using AI from text prompts or existing images. Known for its ease of use and creative output.", pricing: "Free / From $8 per month", tags: ["video generation", "text-to-video", "creative"] },
  { name: "Perplexity", category: "Research", description: "AI-powered search engine and answer assistant.", url: "https://perplexity.ai", slug: "perplexity", longDescription: "Perplexity is an AI-powered search engine that gives direct, cited answers to questions. Great for research, news, and fact-checking.", pricing: "Free / $20 per month", tags: ["search", "research", "fact-checking", "citations"] },
  { name: "Consensus", category: "Research", description: "AI search engine for scientific papers.", url: "https://consensus.app", slug: "consensus", longDescription: "Consensus searches millions of peer-reviewed papers and extracts key findings, making academic research faster and more accessible.", pricing: "Free / $8.99 per month", tags: ["research", "science", "academic", "papers"] },
  { name: "Otter.ai", category: "Productivity", description: "AI meeting transcription and notes.", url: "https://otter.ai", slug: "otter-ai", longDescription: "Otter.ai transcribes meetings in real time, generates summaries, and extracts action items. Integrates with Zoom, Google Meet and Teams.", pricing: "Free / $10 per month", tags: ["transcription", "meetings", "notes", "productivity"] },
  { name: "Make", category: "Productivity", description: "AI-powered automation platform.", url: "https://make.com", slug: "make", longDescription: "Make (formerly Integromat) is a visual automation platform that connects apps and automates workflows. Its AI modules let you add AI steps to any process.", pricing: "Free / From $9 per month", tags: ["automation", "workflow", "no-code", "productivity"] },
];

const CATEGORY_COLORS = {
  Writing: { bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/20" },
  Coding: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20" },
  Image: { bg: "bg-pink-500/10", text: "text-pink-400", border: "border-pink-500/20" },
  Video: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20" },
  Research: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  Productivity: { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/20" },
};

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
          <Link href="/" className="text-indigo-400 hover:underline">
            ← Back to directory
          </Link>
        </div>
      </main>
    );
  }

  const color = CATEGORY_COLORS[tool.category] || CATEGORY_COLORS.Writing;
  const related = tools.filter((t) => t.category === tool.category && t.slug !== tool.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#080c14] text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-10 transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to directory
        </Link>

        {/* Tool header */}
        <div className="mb-8">
          <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border mb-4 ${color.bg} ${color.text} ${color.border}`}>
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
