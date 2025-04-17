import { useState } from "react";
import "../app/globals.css";
import TranscriptTab from "@/public/components/TranscriptTab";
import YouTubeTab from "@/public/components/YoutubeTab";
import Output from "@/public/components/Output";

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

        <YouTubeTab setOutput={setOutput} platform={platform} setPlatform={setPlatform} />
        <TranscriptTab input={input} setInput={setInput} platform={platform} setPlatform={setPlatform} generateContent={generateContent} loading={loading} />
        <Output output={output} />
      </div>
    </div>
  );
}