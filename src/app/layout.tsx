import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bitcoin Facility Manager",
  description: "Monitor and manage mining operations",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black min-h-screen text-slate-200 antialiased selection:bg-indigo-500/30`}>
        {/* Mobile Simulation Wrapper */}
        <div className="mx-auto max-w-md min-h-screen bg-slate-950 shadow-2xl overflow-hidden relative border-x border-slate-900">
          <main className="h-full overflow-y-auto scrollbar-hide">
            {children}
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
