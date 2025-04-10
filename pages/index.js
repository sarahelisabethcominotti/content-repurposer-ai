import { useState } from "react";
import "../app/globals.css"
export default function Home() {
  const [input, setInput] = useState("");
  const [platform, setPlatform] = useState("Twitter Thread");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generateContent = async () => {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, platform }),
    });
    const data = await res.json();
    setOutput(data.result);
    setLoading(false);
  };

  return (
    
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-2">
        ♻️ Content Repurposer AI ♻️
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Turn long-form content into short-form gold for Twitter, LinkedIn, and more.
        </p>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Paste Your Content
        </label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-xl resize-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={6}
          placeholder="Paste blog post or transcript here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
          Choose Platform
        </label>
        <select
          className="w-full p-3 border border-gray-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option>Twitter Thread</option>
          <option>LinkedIn Post</option>
          <option>Instagram Caption</option>
        </select>

        <button
          onClick={generateContent}
          disabled={loading || !input.trim()}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-all disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Content"}
        </button>

        {output && (
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-4">
            <h2 className="text-md font-semibold mb-2">🎯 Generated Output</h2>
            <pre className="whitespace-pre-wrap text-sm text-gray-800">{output}</pre>
            <button
              onClick={() => navigator.clipboard.writeText(output)}
              className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all"
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

