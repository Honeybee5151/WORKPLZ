"use client"; // Required for animations/hooks in App Router
import Image from "next/image";

const servers = Array.from({ length: 20 }).map((_, i) => ({
  name: `PServer ${i + 1}`,
  image: `/server${(i % 5) + 1}.svg`, // Use 5 sample images, rotate them
}));

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 dark:bg-blue-800 text-white p-6 shadow-md">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          PServer Hub
        </h1>
        <p className="mt-2 text-lg sm:text-xl max-w-xl">
          Your gateway to the PServer newspaper and community resources.
        </p>
      </header>

      {/* Main rotating section */}
      <main className="flex flex-col flex-1 items-center justify-center p-8 sm:p-16 gap-12 overflow-hidden relative">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
          Featured PServers
        </h2>

        {/* Rotating image carousel */}
        <div className="flex gap-16 w-full overflow-hidden relative h-40">
          <div className="flex animate-scroll gap-16">
            {servers.map((server, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center animate-spin-slow"
              >
                <Image
                  src={server.image}
                  alt={server.name}
                  width={80}
                  height={80}
                  className="rounded-full border-2 border-gray-300"
                />
                <span className="mt-2 text-sm text-center">{server.name}</span>
              </div>
            ))}
            {/* Repeat for seamless looping */}
            {servers.map((server, i) => (
              <div
                key={`repeat-${i}`}
                className="flex flex-col items-center justify-center animate-spin-slow"
              >
                <Image
                  src={server.image}
                  alt={server.name}
                  width={80}
                  height={80}
                  className="rounded-full border-2 border-gray-300"
                />
                <span className="mt-2 text-sm text-center">{server.name}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>
          &copy; {new Date().getFullYear()} PServer Hub — All rights reserved. 🚀
        </p>
        <div className="flex gap-4">
          <a href="https://nextjs.org" className="hover:underline" target="_blank">
            Next.js
          </a>
          <a href="https://vercel.com" className="hover:underline" target="_blank">
            Vercel
          </a>
        </div>
      </footer>

      {/* Animations */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          animation: scroll 40s linear infinite;
        }

        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
