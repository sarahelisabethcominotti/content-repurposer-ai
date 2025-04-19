import Link from 'next/link';
import "../app/globals.css";


export default function LandingPage() {
    
  return (
    
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full py-6 px-8 flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-bold text-blue-600">Content Repurposer AI</h1>
        {/* <Link href="/api/auth/signin">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-all">
            Sign In
          </button>
        </Link> */}
      </header>

      <main className="flex flex-col flex-1 items-center justify-center text-center px-6">
        <h2 className="text-3xl sm:text-5xl font-extrabold mb-6 leading-tight">
        ♻️ Turn Long-Form Content into Short-Form Gold ♻️
        </h2>
        <p className="text-gray-600 text-lg mb-8 max-w-xl">
          Effortlessly transform YouTube videos or blog posts into content for Twitter, LinkedIn, and Instagram with AI.
        </p>
        <Link href="/app" target='_blank'>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg transition-all">
            Try It Now
          </button>
        </Link>
        <Link href="https://tally.so/r/3l4Gav" target='_blank'>
          <button className="bg-gray-500 hover:bg-gray-700 text-white px-6 py-3 rounded-full text-lg transition-all mt-8">
            Share your Feedback
          </button>
        </Link>
        </main>

      <footer className="py-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Sarah Elisabeth Cominotti. All rights reserved.
      </footer>
    </div>
  );
}
