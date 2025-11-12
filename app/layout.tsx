import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "RotMG Private Servers Hub - Find the Best Realm of the Mad God Servers | ROTMGPS",
  description: "Discover and connect with the best RotMG private servers. Browse active servers, player counts, read the latest news from The Realmder, and learn how to get started with Realm of the Mad God private servers.",
  keywords: "rotmg private server, realm of the mad god private server, rotmg pserver, rotmg hub, rotmg servers, rotmg private server list, rotmg community, rotmg news, rotmg tutorial, how to join rotmg private server",
  openGraph: {
    title: "RotMG Private Servers Hub - ROTMGPS",
    description: "Your hub for everything rotmg-private-server. Browse servers, read news, and get started today.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
