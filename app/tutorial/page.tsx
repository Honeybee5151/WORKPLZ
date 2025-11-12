"use client";
import Link from "next/link";

export default function Tutorial() {
  return (
    <div className="min-h-screen bg-[#36393f] text-gray-100">
      {/* Header with banner */}
      <header className="bg-[#202225] border-b border-[#2f3136] shadow-lg">
        <div className="bg-gradient-to-r from-[#5865f2] to-[#7289da] h-2"></div>
        <div className="container mx-auto px-6 py-6">
          <Link href="/" className="inline-block mb-4 text-[#5865f2] hover:text-[#7289da] transition-colors">
            ← Back to Hub
          </Link>
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
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

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-3">
            Getting Started
          </h1>
        </div>

        {/* Content Card */}
        <div className="bg-[#2f3136] rounded-xl p-12 border border-[#202225] shadow-xl">
          <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
            <p>
              So you want to create a pserver or contribute to them via programming? The{" "}
              <a 
                href="https://discord.gg/g8stj7Vdw3" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#5865f2] hover:text-[#7289da] font-semibold underline transition-colors"
              >
                realmdex community
              </a>
              {" "}is a great resource for that. There is also a discord, which is excellent if you are in need of spriters: {" "}
               <a 
                href="https://discord.gg/FmKsHuNBqy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#5865f2] hover:text-[#7289da] font-semibold underline transition-colors"
              >
                ideas discord
              </a>
            </p>
              
            <p>
              You can also contact me on Discord{" "}
              <span className="text-[#5865f2] font-semibold">@shangapallia</span>
              {" "}for help getting started!
            </p>

            <div className="mt-8 pt-8 border-t border-[#40444b]">
              <h2 className="text-2xl font-bold text-white mb-4">Sprite Resources</h2>
              <p className="mb-6">
                If your server turns out big, you could get DMCA&apos;d by the ROTMG-owners, so it can be good to use sprites that they do not own. Some of their sprites are open-source, others not. And those you need to replace. Here are some sprites to get you started:
              </p>
              
              {/* Spritesheet Image */}
              <div className="bg-[#36393f] rounded-lg p-6 border border-[#202225]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/spritesheet.png" 
                  alt="Custom Sprites"
                  className="w-full h-auto rounded"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#202225] border-t border-[#2f3136] py-6 text-center text-gray-400 mt-12">
        <p>© 2025 ROTMGPS</p>
      </footer>
    </div>
  );
}
