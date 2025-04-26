export default function TranscriptTab({ input, setInput, platform, setPlatform, generateContent, loading }) {
    return (
      <>
        <label className="block mt-6 mb-2 text-sm font-medium text-gray-700">
          Paste Your Content
        </label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-xl resize-none text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
          rows={6}
          placeholder="Paste blog post or transcript here..."
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
          onClick={generateContent}
          disabled={loading || !input.trim()}
          className="mt-6 w-full bg-green-300 text-black hover:text-white py-3 rounded-xl font-medium hover:bg-black transition-all disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Content"}
        </button>
      </>
    );
  }
  