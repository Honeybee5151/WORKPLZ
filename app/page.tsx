"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// Define the Server type
interface Server {
  name: string;
  image: string;
  players: string | number;
  description: string;
  website: string;
  discord: string;
}

const servers: Server[] = [
  {
    name: "Evershade",
    image: "/serverIcons/evershadeImage",
    players: "N/A",
    description: "Evershade is a popular RotMG private server with custom features and an active community. Experience unique dungeons and items!",
    website: "https://evershade.example.com",
    discord: "https://discord.gg/evershade",
  },
  {
    name: "T's Realms",
    image: "/serverIcons/tidanRealmsIcon.png",
    players: "N/A",
    description: "This is a popular RotMG private server with custom features and an active community.",
    website: "https://server2.example.com",
    discord: "https://discord.gg/tidanrealms",
  },
  {
    name: "FP",
    image: "/serverIcons/forgottenPantheonIcon.png",
    players: "N/A",
    description: "This is a popular RotMG private server with custom features and an active community.",
    website: "https://server3.example.com",
    discord: "https://discord.gg/forgottenpantheon",
  },
  {
    name: "Valor",
    image: "/serverIcons/valorIcon.png",
    players: "N/A",
    description: "This is a popular RotMG private server with custom features and an active community.",
    website: "https://server4.example.com",
    discord: "https://discord.gg/valor",
  },
  {
    name: "DOM",
    image: "/serverIcons/DOMIcon.png",
    players: "N/A",
    description: "This is a popular RotMG private server with custom features and an active community.",
    website: "https://server5.example.com",
    discord: "https://discord.gg/dom",
  },
];

export default function Home() {
  const [offset, setOffset] = useState(0);
  const [selectedServer, setSelectedServer] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const hasInteracted = useRef(false);

  // Auto-scroll
  useEffect(() => {
    let anim: number;
    const speed = 0.5;
    const loop = () => {
      if (!isDragging.current && !hasInteracted.current && scrollRef.current) {
        setOffset((prev) => {
          const newOffset = prev - speed;
          const width = scrollRef.current!.scrollWidth / 2;
          return newOffset <= -width ? 0 : newOffset;
        });
      }
      anim = requestAnimationFrame(loop);
    };
    anim = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(anim);
  }, []);

  const handlePointerStart = (clientX: number) => {
    isDragging.current = true;
    hasInteracted.current = true;
    startX.current = clientX;
    scrollStart.current = offset;
  };

  const handlePointerMove = (clientX: number) => {
    if (!isDragging.current) return;
    const dx = clientX - startX.current;
    setOffset(scrollStart.current + dx);
  };

  const handlePointerEnd = () => {
    isDragging.current = false;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handlePointerStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handlePointerMove(e.clientX);
  };

  const handleMouseUp = () => {
    handlePointerEnd();
  };

  const handleServerClick = (index: number) => {
    setSelectedServer(index);
    hasInteracted.current = true;
  };

  return (
    <div className="min-h-screen bg-[#36393f] text-gray-100 flex flex-col">
      {/* Header with pixel art banner */}
      <header className="bg-[#202225] border-b border-[#2f3136] shadow-lg">
        <div className="bg-gradient-to-r from-[#5865f2] to-[#7289da] h-2"></div>
        <div className="container mx-auto px-6 py-6">
          {/* Pixel Art Banner */}
          <div className="flex justify-center">
            <img 
              src="/banner.png" 
              alt="RotMG Hub Banner"
              className="rounded-xl shadow-lg"
              style={{
                imageRendering: 'pixelated',
                maxWidth: '1200px',
                width: '100%',
                height: 'auto'
              }}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {/* Top Half - Tutorial and Newspaper */}
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Tutorial Card */}
            <Link
              href="/tutorial"
              className="group bg-[#2f3136] hover:bg-[#36393f] rounded-xl p-8 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 border border-[#202225] hover:border-[#5865f2]"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 bg-[#5865f2] rounded-lg flex items-center justify-center group-hover:bg-[#4752c4] transition-colors">
                  <svg
                    className="w-16 h-16 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Tutorial</h2>
                <p className="text-gray-400 text-center">
                  Learn how to get started with private servers
                </p>
              </div>
            </Link>

            {/* Newspaper Card */}
            <Link
              href="/newspaper"
              className="group bg-[#2f3136] hover:bg-[#36393f] rounded-xl p-8 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 border border-[#202225] hover:border-[#5865f2]"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 bg-[#7289da] rounded-lg flex items-center justify-center group-hover:bg-[#677bc4] transition-colors">
                  <svg
                    className="w-16 h-16 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Newspaper</h2>
                <p className="text-gray-400 text-center">
                  Latest news and updates from the community
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom Half - Server Carousel */}
        <div className="bg-[#2f3136] flex-1 py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">
              Browse Private Servers
            </h2>

            {/* Carousel */}
            <div
              className="w-full overflow-hidden relative mb-8 cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={(e) => {
                const touch = e.touches[0];
                if (touch) handlePointerStart(touch.clientX);
              }}
              onTouchMove={(e) => {
                const touch = e.touches[0];
                if (touch) handlePointerMove(touch.clientX);
              }}
              onTouchEnd={handlePointerEnd}
            >
              <div
                ref={scrollRef}
                className="flex py-8"
                style={{
                  transform: `translateX(${offset}px)`,
                  transition: isDragging.current ? 'none' : 'transform 0.1s ease-out',
                }}
              >
                {servers.concat(servers).map((server, i) => {
                  const actualIndex = i % servers.length;
                  const isSelected = selectedServer === actualIndex;
                  return (
                    <button
                      key={i}
                      onClick={() => handleServerClick(actualIndex)}
                      className={`flex flex-col items-center justify-center mx-6 ${
                        isSelected ? 'scale-110' : 'hover:scale-105'
                      }`}
                      style={{ transition: 'transform 0.3s ease' }}
                    >
                      {/* Player count */}
                      <div className="mb-2 px-4 py-1 bg-[#5865f2] rounded-full">
                        <span className="text-sm font-semibold text-white">
                          👥 {server.players} online
                        </span>
                      </div>

                      {/* Server icon circle */}
                      <div
                        className={`relative rounded-full border-4 transition-all duration-300 ${
                          isSelected
                            ? 'border-[#5865f2] shadow-lg shadow-[#5865f2]/50'
                            : 'border-[#202225] hover:border-[#7289da]'
                        }`}
                      >
                        <img
                          src={server.image}
                          alt={server.name}
                          width={120}
                          height={120}
                          draggable="false"
                          className="rounded-full bg-[#36393f] object-cover select-none"
                          onError={(e) => {
                            console.error(`Failed to load image: ${server.image}`);
                            const target = e.currentTarget as HTMLImageElement;
                            target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120"%3E%3Crect fill="%2336393f" width="120" height="120"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-size="48"%3E?%3C/text%3E%3C/svg%3E';
                          }}
                        />
                      </div>

                      {/* Server name */}
                      <span
                        className={`mt-3 text-base font-semibold text-center transition-colors ${
                          isSelected ? 'text-[#5865f2]' : 'text-gray-300'
                        }`}
                      >
                        {server.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Server Info Display */}
            <div className="max-w-4xl mx-auto bg-[#36393f] rounded-xl p-10 border border-[#202225] shadow-xl min-h-[300px]">
              {selectedServer !== null ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <h3 className="text-3xl font-bold text-white">
                      {servers[selectedServer].name}
                    </h3>
                    <span className="px-5 py-2 bg-[#3ba55d] text-white rounded-lg font-semibold text-lg">
                      {servers[selectedServer].players} Players Online
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {servers[selectedServer].description}
                  </p>
                  <div className="flex gap-4 pt-6">
                    {/* Join Server Button - Links to Discord */}
                    
                      href={servers[selectedServer].discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#5865f2] hover:bg-[#4752c4] text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg text-center"
                    >
                      Join Discord
                    </a>
                    
                    {/* Visit Website Button */}
                    
                      href={servers[selectedServer].website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#2f3136] hover:bg-[#202225] text-white font-semibold py-4 px-8 rounded-lg transition-colors border border-[#202225] text-lg text-center"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <svg
                    className="w-20 h-20 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                    />
                  </svg>
                  <p className="text-xl">Click on a server to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#202225] border-t border-[#2f3136] py-6 text-center text-gray-400">
        <p>© 2025 ROTMGPS</p>
      </footer>
    </div>
  );
}
