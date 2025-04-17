import { useState } from "react";
import "../app/globals.css";
import TranscriptTab from "../public/components/TranscriptTab";
import YouTubeTab from "@/public/components/YoutubeTab";
import Output from "../public/components/Output";

export default function Home() {
  const [input, setInput] = useState("");
  const [platform, setPlatform] = useState("Twitter Thread");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("transcript");

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
        <div className="flex mb-4">
        <button
            className={`flex-1 px-4 py-2 rounded-t-lg font-medium text-sm transition-all ${
              activeTab === "transcript"
                ? "bg-white text-blue-600 border-t-2 border-blue-600"
                : "bg-gray-100 text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("transcript")}
          >
            Transcript
          </button>
          <button
            className={`flex-1 px-4 py-2 rounded-t-lg font-medium text-sm transition-all ${
              activeTab === "youtube"
                ? "bg-white text-blue-600 border-t-2 border-blue-600"
                : "bg-gray-100 text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("youtube")}
          >
            YouTube Link
          </button>
          
        </div>
        <div className="bg-white border border-gray-200 border-t-0 rounded-b-xl p-4">
          {activeTab === "transcript" ? (
                    <TranscriptTab input={input} setInput={setInput} platform={platform} setPlatform={setPlatform} generateContent={generateContent} loading={loading} />

          ) : (
            <YouTubeTab setOutput={setOutput} platform={platform} setPlatform={setPlatform} />

          )}
        </div>
        <Output output={output} />
      </div>
    </div>
  );
}