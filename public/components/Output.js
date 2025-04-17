export default function Output({ output }) {
    if (!output) return null;
  
    return (
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
    );
  }
  