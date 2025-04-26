import { useSession } from "next-auth/react";
import { useState } from "react";


export default function Output({ output, input, platform }) {
    const { data: session } = useSession();
    const [saved, setSaved] = useState(false);
    const [loadingSave, setLoadingSave] = useState(false);
    const [copy, setCopy] = useState(false)


    const handleSave = async () => {
      setLoadingSave(true)
        const res = await fetch("/api/saveGeneration", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input, output, platform }),
        });
    
        if (res.ok) setSaved(true); setLoadingSave(false);
      };

    const handleCopy = async () => {
      setCopy(true)
      navigator.clipboard.writeText(output)
    }

    if (!output) return null;
  
    return (
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-4">
        <h2 className="text-md font-semibold mb-2">🎯 Generated Output</h2>
        <pre className="whitespace-pre-wrap text-sm text-gray-800">{output}</pre>
        <button
          onClick={handleCopy}
          className="mt-4 w-full bg-gray-300 text-black py-2 font-medium rounded-lg hover:text-white hover:bg-black transition-all"
          disabled={copy}
        >
          {!copy ? "Copy to Clipboard" : "Copied"}
        </button>
        {session && (
        <button
          onClick={handleSave}
          className="mt-4 w-full hover:bg-black hover:text-white font-medium py-2 rounded-lg bg-green-300 text-black transition-all"
          disabled={saved}
        >
          {saved ? "Saved" : loadingSave ? "Saving..." : "Save to History"}
        </button>
        
      )}
      </div>
    );
  }
  