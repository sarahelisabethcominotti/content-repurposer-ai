import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Content Repurposer AI",
  description: "Generated by create next app",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Content Repurposer AI</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Analytics debug={true} mode={production}/>
      </body>
    </html>
  );
}
