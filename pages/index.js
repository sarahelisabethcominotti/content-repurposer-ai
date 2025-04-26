import Link from 'next/link';
import "../app/globals.css";
import { signIn } from "next-auth/react"



export default function LandingPage() {
  async function handleSignIn() {
    const result = await signIn('credentials', {
      callbackUrl: '/app',
      redirect: true, 
    });
  
    if (!result?.ok) {
      console.error('Sign in error', result);
    }
  }
  return (
    <>
     <head>
     <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="shortcut icon" href="/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />      <title>Content Repurposer AI</title>
    </head>
    
    <body>
    <div className="min-h-screen bg-white flex flex-col [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#7AFFAD_100%)]">
      <header className="w-full py-6 px-8 flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-bold text-black">Content Repurposer AI</h1>
        {/* <Link href="/api/auth/signin">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-all">
            Sign In
          </button>
        </Link> */}
      </header>

      <main className="flex flex-col flex-1 items-center justify-center text-center px-6">
        <h2 className="text-3xl sm:text-5xl font-extrabold mb-6 leading-tight">
        Turn Long-Form Content into Short-Form Gold
        </h2>
        <p className="text-gray-600 text-lg mb-8 max-w-xl">
          Effortlessly transform YouTube videos or blog posts into content for Twitter, LinkedIn, and Instagram with AI.
        </p>
        {/* <Link href="/app" target='_blank'> */}
          <button onClick={handleSignIn} className="bg-green-300 hover:bg-black text-black hover:text-white px-6 py-3 rounded-full text-lg transition-all">
            Try It Now
          </button>
        {/* </Link> */}
        <Link href="https://tally.so/r/3l4Gav" target='_blank'>
          <button className="bg-gray-500 hover:bg-gray-700 text-green-300 px-6 py-3 rounded-full text-lg transition-all mt-8">
            Share your Feedback
          </button>
        </Link>
        </main>

      <footer className="py-4 text-center text-sm">
        © {new Date().getFullYear()} Sarah Elisabeth Cominotti. All rights reserved.
      </footer>
    </div>
    </body>
    </>
  );
}



