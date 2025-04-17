import { useState } from "react";

export default function YouTubeTab({ setInput, platform }) {
  const [url, setUrl] = useState("");
  const [loadingYoutube, setLoadingYoutube] = useState(false);

  const handleFetch = async () => {
    setLoadingYoutube(true);
    const res = await fetch("/api/transcript", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoUrl: url }),
    });

    const data = await res.json();
    setInput(data.transcript || data.error);
    setLoadingYoutube(false);
  };

  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Paste Your YouTube Link
      </label>
      <input
        type="text"
        placeholder="Paste YouTube link here..."
        className="w-full p-3 border border-gray-300 rounded-xl resize-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={handleFetch}
        disabled={loadingYoutube || !url.trim()}
        className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-all disabled:opacity-50"
      >
        {loadingYoutube ? "Generating..." : "Generate from YouTube"}
      </button>
    </>
  );
}
