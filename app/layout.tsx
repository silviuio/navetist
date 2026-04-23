import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Navetist",
  description: "Tarife actualizate pentru transportul public din București — STB și Metrorex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950">
          <Navbar />
          <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
            {children}
          </main>
        </body>
    </html>
  );
}
