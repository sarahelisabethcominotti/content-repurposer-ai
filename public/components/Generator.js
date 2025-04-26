import React from 'react'
import { useState } from "react";
import TranscriptTab from "./TranscriptTab";
import YouTubeTab from "./YouTubeTab";
import "@/app/globals.css"
import Output from "./Output";
import { useRef } from "react";
import Navigation from "@/public/components/Navigation";
import { useSession } from "next-auth/react";
import LoginButton from './LoginButton';


function Generator() {


  const outputRef = useRef(null);

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

    setTimeout(() => {
      outputRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const { data: session } = useSession()

  if (!session) {
  return (
    <>
    <div className="min-h-screen bg-gray-100 flex items-center [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#7AFFAD_100%)] py-8 px-4">
    <div className="max-w-xl mx-auto  bg-white p-6 rounded-2xl shadow-md">
      {/* <HistoryButton/>
      <LoginButton/> */}

        <div className="flex space-x-2 border-gray-200">
        <p>Please sign in before using the Content Repurposer AI</p>
        <LoginButton/>
          
        </div>
      </div>
    </div>
    </>
  )}
  else {
    return (
      <>
       <div className="min-h-screen bg-gray-100 flex items-center [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#7AFFAD_100%)] py-8 px-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md">
      {/* <HistoryButton/>
      <LoginButton/> */}
      <Navigation/>

        <h1 className="text-2xl font-semibold text-center mb-2">
          Content Repurposer AI
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Turn long-form content into short-form gold for Twitter, LinkedIn, and more.
        </p>
        <div className="flex space-x-2 border-gray-200">
        <button
    className={`flex-1 py-2 text-sm font-medium text-center rounded-t-md transition-colors duration-200 ${
      activeTab === "transcript"
      ? "bg-green-300 border-x border-t border-green-200 text-black"
      : "bg-gray-100 text-gray-500 hover:text-green-300"
            }`}
            onClick={() => setActiveTab("transcript")}
          >
            Transcript
          </button>
          <button
    className={`flex-1 py-2 text-sm font-medium text-center rounded-t-md transition-colors duration-200 ${
      activeTab === "youtube"
      ? "bg-green-300 border-x border-t border-green-200 text-black"
      : "bg-gray-100 text-gray-500 hover:text-green-300"
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
            
            <YouTubeTab input={input} setInput={setInput} setOutput={setOutput} platform={platform} setPlatform={setPlatform} />

          )}
        </div>
        <div ref={outputRef}>
        <Output output={output} input={input} platform={platform} />

        </div>


      </div>
    </div>

      </>
      
    )
  }
}

export default Generator