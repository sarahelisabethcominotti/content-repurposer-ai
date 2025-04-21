import { SessionProvider } from "next-auth/react";
import { Analytics } from '@vercel/analytics/next';
import Generator from "@/public/components/Generator";

export default function Home() {


  return (
    <><Analytics debug={true} />

    <SessionProvider>
    <Generator/>
    </SessionProvider>
    </>
  );
}