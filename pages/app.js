import { SessionProvider } from "next-auth/react";
import { Analytics } from '@vercel/analytics/next';
import Generator from "@/public/components/Generator";

export default function Home() {


  return (
    <>
    <head>
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="shortcut icon" href="/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />      <title>CRAI - Generator</title>
    </head>
    
    <Analytics debug={true} />

    <SessionProvider>
    <Generator/>
    </SessionProvider>
    
    </>
  );
}