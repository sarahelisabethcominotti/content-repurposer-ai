import { useState } from "react";
import { useSession } from "next-auth/react";


export default function YouTubeTab({ input, setInput, setOutput, platform, setPlatform }) {
  const [loadingYoutube, setLoadingYoutube] = useState(false);

  const handleFetch = async () => {
    setLoadingYoutube(true);
    const transcriptRes = await fetch("/api/transcript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl: input }),
      });

      const transcriptData = await transcriptRes.json();
      const transcript = transcriptData.transcript;

      if (!transcript) {
        setOutput("Could not retrieve transcript, please ensure the YouTube video has transcripts enabled.");
        setLoadingYoutube(false);
        return;
      }

      const aiRes = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: transcript, platform }),
      });

      const aiData = await aiRes.json();
      setOutput(aiData.result);
      setLoadingYoutube(false);
  };
  const { data: session } = useSession()
  if (session) {
    return (
      <>
      <label className="block mb-2 text-sm font-medium text-gray-700">
      Paste Your YouTube Link
    </label>
    <input
      type="text"
      placeholder="Paste YouTube link here..."
      className="w-full p-3 border border-gray-300 rounded-xl resize-none text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />

    <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
      Choose Platform
    </label>
    <select
        className="w-full p-3 border border-gray-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        <option>Twitter Thread</option>
        <option>LinkedIn Post</option>
        <option>Instagram Caption</option>
      </select>

    <button
      onClick={handleFetch}
      disabled={loadingYoutube || !input.trim()}
      className="mt-4 w-full bg-green-300 text-white py-3 rounded-xl font-medium hover:bg-black transition-all disabled:opacity-50"
    >
      {loadingYoutube ? "Generating..." : "Generate from YouTube"}
    </button>
    </>
    )
  }
  return (
    <div className="w-full flex justify-center mb-4">
      <p className="block mb-2 text-sm font-medium text-gray-700">Please sign in to use the Youtube feature</p>
    </div>
  )
}