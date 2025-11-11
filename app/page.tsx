"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const servers = [
  {
    id: "evershade",
    name: "Evershade",
    image: "/serverIcons/evershadeImage",
    description: "Evershade is one of the most hyped upcoming games (not biased), which is set to release open-beta in early 2026. There is dashing, jumping, a nexus-dungeon-portal and much more in this rotmg-pserver. Welcome in!",
    website: "https://evershade.example.com",
    discord: "https://discord.gg/Y4Am4yg4GT",
  },
  {
    id: "tsrealms",
    name: "T's Realms",
    image: "/serverIcons/tidanRealmsIcon.png",
    description: "Tidan's realms is one of the most unique private servers out there, yet it is made by one man, the man--the legend: Tidan. It will have a quest-book system, a revamped realm, expeditions and much more. It is in paid testing as of right now.",
    website: "https://server2.example.com",
    discord: "https://discord.gg/tsrealms",
  },
  {
    id: "fp",
    name: "FP",
    image: "/serverIcons/forgottenPantheonIcon.png",
    description: "This is a popular RotMG private server with custom features and an active community.",
    website: "https://server3.example.com",
    discord: "https://discord.gg/fp",
  },
  {
    id: "valor",
    name: "Valor",
    image: "/serverIcons/valorIcon.png",
    description: "Valor is owned by the aura-boss himeself: Arcanuo. Enjoy csgo-cases, custom content, skilltree and much more in this rotmg-private-server. It dates back to the revenge of the fallen days, and has had a peak of over 1000 players. Currently the valor team is working on a custom game, which the website link is tied to. Check them out!",
    website: "https://valorserver.com/",
    discord: "https://discord.gg/valormc",
  },
  {
    id: "dom",
    name: "DOM",
    image: "/serverIcons/DOMIcon.png",
    description: "This is a popular RotMG private server with custom features and an active community.",
    website: "https://server5.example.com",
    discord: "https://discord.gg/dom",
  },
  {
    id: "Ica's Realm",
    name: "Ica Realm",
    image: "/serverIcons/IcasRealmIcon.png",
    description: "Ica's Realm is in a way the modern Nilly's Realm, a tribute, an expansion. There is an item recycling system, NPE-mode, new classes and much more. If you were a nillys-fan, but want a twist to the nostalgia, this is definitely it. ",
    website: "https://halocelsius.com/Assets/IcaStore.html",
    discord: "https://discord.gg/EJbhDsXhW4",
  },
];

export default function Home() {
  const [offset, setOffset] = useState(0);
  const [selectedServer, setSelectedServer] = useState<number | null>(null);
  const [playerCounts, setPlayerCounts] = useState<{ [key: string]: number | string }>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const hasInteracted = useRef(false);

  // aFetch player counts
  useEffect(() => {
    const fetchPlayerCounts = async () => {
      try {
        const response = await fetch('/api/player-count');
        const data = await response.json();
        
        if (data.servers) {
          const counts: { [key: string]: number | string } = {};
          data.servers.forEach((server: { serverId: string; playerCount: number; isStale: boolean }) => {
            counts[server.serverId] = server.isStale ? 'Offline' : server.playerCount;
          });
          setPlayerCounts(counts);
        }
      } catch (error) {
        console.error('Failed to fetch player counts:', error);
      }
    };

    fetchPlayerCounts();
    const interval = setInterval(fetchPlayerCounts, 30000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll
  useEffect(() => {
    let anim: number;
    const speed = 0.5;
    const loop = () => {
      if (!isDragging.current && !hasInteracted.current && scrollRef.current) {
        setOffset((prev) => {
          const newOffset = prev - speed;
          const singleSetWidth = scrollRef.current!.scrollWidth / 2;
          if (newOffset <= -singleSetWidth) {
            return 0;
          }
          return newOffset;
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
      <header className="bg-[#202225] border-b border-[#2f3136] shadow-lg">
        <div className="bg-gradient-to-r from-[#5865f2] to-[#7289da] h-2"></div>
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/banner.png" 
              alt="RotMG Hub Banner"
              className="rounded-xl shadow-lg"
              style={{ imageRendering: 'pixelated', maxWidth: '1200px', width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="/tutorial" className="group bg-[#2f3136] hover:bg-[#36393f] rounded-xl p-8 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 border border-[#202225] hover:border-[#5865f2]">
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 bg-[#5865f2] rounded-lg flex items-center justify-center group-hover:bg-[#4752c4] transition-colors">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Tutorial</h2>
                <p className="text-gray-400 text-center">Learn how to get started with private servers</p>
              </div>
            </Link>

            <Link href="/newspaper" className="group bg-[#2f3136] hover:bg-[#36393f] rounded-xl p-8 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 border border-[#202225] hover:border-[#5865f2]">
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 bg-[#7289da] rounded-lg flex items-center justify-center group-hover:bg-[#677bc4] transition-colors">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Newspaper</h2>
                <p className="text-gray-400 text-center">Latest news and updates from the community</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-[#2f3136] flex-1 py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Browse Private Servers</h2>

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
                  willChange: 'transform',
                }}
              >
                {servers.concat(servers).map((server, i) => {
                  const actualIndex = i % servers.length;
                  const isSelected = selectedServer === actualIndex;
                  const playerCount = playerCounts[server.id] || 'N/A';
                  
                  return (
                    <button
                      key={i}
                      onClick={() => handleServerClick(actualIndex)}
                      className={`flex flex-col items-center justify-center mx-6 ${
                        isSelected ? 'scale-110' : 'hover:scale-105'
                      }`}
                      style={{ transition: 'transform 0.3s ease' }}
                    >
                      <div className="mb-2 px-4 py-1 bg-[#5865f2] rounded-full">
                        <span className="text-sm font-semibold text-white">
                          {playerCount} online
                        </span>
                      </div>

                      <div
                        className={`relative rounded-full border-4 transition-all duration-300 ${
                          isSelected
                            ? 'border-[#5865f2] shadow-lg shadow-[#5865f2]/50'
                            : 'border-[#202225] hover:border-[#7289da]'
                        }`}
                      >
                        <Image
                          src={server.image}
                          alt={server.name}
                          width={180}
                          height={180}
                          unoptimized
                          draggable={false}
                          className="rounded-full bg-[#36393f] object-cover select-none"
                        />
                      </div>

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

            <div className="max-w-5xl mx-auto bg-[#36393f] rounded-xl p-12 border border-[#202225] shadow-xl min-h-[400px]">
              {selectedServer !== null ? (
                <div className="space-y-8">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <h3 className="text-4xl font-bold text-white">
                      {servers[selectedServer].name}
                    </h3>
                    <span className="px-6 py-3 bg-[#3ba55d] text-white rounded-lg font-semibold text-xl">
                      {playerCounts[servers[selectedServer].id] || 'N/A'} Players Online
                    </span>
                  </div>
                  <div className="text-gray-300 leading-relaxed text-lg space-y-4 max-h-[200px] overflow-y-auto">
                    {servers[selectedServer].description.split('\n\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-6">
                    <a 
                      href={servers[selectedServer].discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#5865f2] hover:bg-[#4752c4] text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg text-center"
                    >
                      Join Discord
                    </a>
                    <a 
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
                  <svg className="w-20 h-20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                  <p className="text-xl">Click on a server to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#202225] border-t border-[#2f3136] py-6 text-center text-gray-400">
        <p>© 2025 ROTMGPS</p>
      </footer>
    </div>
  );
}
