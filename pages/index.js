import { useState } from "react";

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
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">🚀 Repurpose Your Content</h1>
      <textarea
        className="w-full p-2 border rounded mb-3"
        rows={8}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste blog post or transcript here..."
      />
      <select
        className="w-full mb-3 p-2 border rounded"
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        <option>Twitter Thread</option>
        <option>LinkedIn Post</option>
        <option>Instagram Caption</option>
      </select>
      <button
        onClick={generateContent}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {output && (
        <div className="mt-6 p-4 border rounded bg-gray-100 whitespace-pre-wrap">
          <h2 className="font-bold mb-2">📝 Output</h2>
          {output}
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
}
