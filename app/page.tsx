"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const servers = Array.from({ length: 20 }).map((_, i) => ({
  name: `PServer ${i + 1}`,
  image: `/server${(i % 5) + 1}.svg`,
}));

export default function Home() {
  const [offset, setOffset] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  // Auto-scroll
  useEffect(() => {
    let anim: number;
    const speed = 0.3; // px per frame

    const loop = () => {
      if (!isDragging.current && scrollRef.current) {
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

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    scrollStart.current = offset;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    setOffset(scrollStart.current + dx);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <header className="bg-blue-600 dark:bg-blue-800 text-white p-6 shadow-md">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          PServer Hub
        </h1>
        <p className="mt-2 text-lg sm:text-xl max-w-xl">
          Your gateway to the PServer newspaper and community resources.
        </p>
      </header>

      <main className="flex flex-col flex-1 items-center justify-center p-8 sm:p-16 gap-12 overflow-hidden relative">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
          Featured PServers
        </h2>

        <div
          className="w-full overflow-hidden relative h-52 cursor-grab"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={(e) => handleMouseDown(e.touches[0] as any)}
          onTouchMove={(e) => handleMouseMove(e.touches[0] as any)}
          onTouchEnd={handleMouseUp}
        >
          <div
            ref={scrollRef}
            className="flex"
            style={{ transform: `translateX(${offset}px)` }}
          >
            {servers.concat(servers).map((server, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center mr-12 last:mr-0"
              >
                <Image
                  src={server.image}
                  alt={server.name}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-gray-300 block"
                />
                <span className="mt-2 text-sm text-center">{server.name}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
