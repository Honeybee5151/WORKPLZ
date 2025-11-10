"use client";
import Image from "next/image";

const servers = Array.from({ length: 20 }).map((_, i) => ({
  name: `PServer ${i + 1}`,
  image: `/server${(i % 5) + 1}.svg`, // placeholder images
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

        {/* Horizontal moving carousel */}
        <div className="w-full overflow-hidden relative h-52">
          <div className="flex animate-scroll gap-12">
            {servers.map((server, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center"
              >
                <Image
                  src={server.image}
                  alt={server.name}
                  width={120} // bigger circles
                  height={120}
                  className="rounded-full border-4 border-gray-300"
                />
                <span className="mt-2 text-sm text-center">{server.name}</span>
              </div>
            ))}
            {/* Repeat for seamless looping */}
            {servers.map((server, i) => (
              <div
                key={`repeat-${i}`}
                className="flex flex-col items-center justify-center"
              >
                <Image
                  src={server.image}
                  alt={server.name}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-gray-300"
                />
                <span className="mt-2 text-sm text-center">{server.name}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Animations */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          animation: scroll 60s linear infinite; /* slower horizontal scroll */
        }
      `}</style>
    </div>
  );
}
