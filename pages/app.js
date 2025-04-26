import { SessionProvider } from "next-auth/react";
import { Analytics } from '@vercel/analytics/next';
import Generator from "@/public/components/Generator";

export default function Home() {


  return (
    <>
    <head>
    <link rel="icon" href="/favicon.ico" />
      <title>CRAI - Generator</title>
    </head>
    <body>
    <Analytics debug={true} />

    <SessionProvider>
    <Generator/>
    </SessionProvider>
    </body>
    </>
  );
}