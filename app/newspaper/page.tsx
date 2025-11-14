"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Sample newspaper data
const newspapers = [
  {
    issue: 1,
    date: "November 10, 2025",
    title: "Major Update Hits Top Private Servers",
    coverImage: "/newspapers/issue-1-cover.png",
    fullUrl: "/newspaper/issue-1",
  },
  
];

export default function NewspaperMain() {
  const [searchIssue, setSearchIssue] = useState("1");
  const [selectedNewspaper, setSelectedNewspaper] = useState(newspapers[newspapers.length - 1]);

  const handleSearch = () => {
    const issueNum = parseInt(searchIssue);
    const found = newspapers.find(n => n.issue === issueNum);
    if (found) {
      setSelectedNewspaper(found);
    } else {
      alert(`Issue #${issueNum} not found`);
    }
  };

  const goToPrevious = () => {
    const currentIndex = newspapers.findIndex(n => n.issue === selectedNewspaper.issue);
    if (currentIndex > 0) {
      setSelectedNewspaper(newspapers[currentIndex - 1]);
      setSearchIssue(newspapers[currentIndex - 1].issue.toString());
    }
  };

  const goToNext = () => {
    const currentIndex = newspapers.findIndex(n => n.issue === selectedNewspaper.issue);
    if (currentIndex < newspapers.length - 1) {
      setSelectedNewspaper(newspapers[currentIndex + 1]);
      setSearchIssue(newspapers[currentIndex + 1].issue.toString());
    }
  };

  return (
    <div className="min-h-screen bg-[#36393f] text-gray-100">
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
              style={{ imageRendering: 'pixelated', maxWidth: '1200px', width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="flex items-start justify-between mb-12">
          <div className="flex gap-2">
            <button onClick={goToPrevious} disabled={selectedNewspaper.issue === newspapers[0].issue} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${selectedNewspaper.issue === newspapers[0].issue ? 'bg-[#40444b] text-gray-600 cursor-not-allowed' : 'bg-[#5865f2] text-white hover:bg-[#4752c4]'}`}>
              ← Previous
            </button>
            <button onClick={goToNext} disabled={selectedNewspaper.issue === newspapers[newspapers.length - 1].issue} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${selectedNewspaper.issue === newspapers[newspapers.length - 1].issue ? 'bg-[#40444b] text-gray-600 cursor-not-allowed' : 'bg-[#5865f2] text-white hover:bg-[#4752c4]'}`}>
              Next →
            </button>
          </div>
          
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              The Realmder
            </h1>
            <p className="text-xl text-gray-400 italic">Your monthly source of rotmg-pserver news</p>
          </div>
          
          <div className="flex flex-col gap-4 items-end">
            <div className="flex gap-2 items-center">
              <span className="text-gray-300 font-semibold">Issue #</span>
              <input
                type="number"
                value={searchIssue}
                onChange={(e) => setSearchIssue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="1"
                className="bg-[#40444b] border border-[#5865f2] text-white px-4 py-2 rounded-lg w-24 text-center"
                min="1"
              />
              <button onClick={handleSearch} className="bg-[#3ba55d] hover:bg-[#2d7d46] text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                Go
              </button>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Viewing</p>
              <p className="text-white font-bold text-lg">Issue #{selectedNewspaper.issue}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#2f3136] rounded-xl p-8 mb-8 border border-[#202225]">
          <Link href={selectedNewspaper.fullUrl} className="block hover:opacity-90 transition-opacity">
            <div className="relative bg-[#36393f] rounded-lg overflow-hidden border-2 border-[#5865f2] hover:border-[#7289da] transition-colors cursor-pointer">
              <Image src={selectedNewspaper.coverImage} alt={`Issue ${selectedNewspaper.issue} Cover`} width={1200} height={1600} className="w-full h-auto" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 w-full">
                  <p className="text-white text-xl font-bold">Click to Read Full Issue →</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="bg-[#2f3136] rounded-xl p-8 mb-8 border border-[#202225]">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            📝 Contribute to The Realmder
          </h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p className="text-lg">Have news, stories, or insights from the RotMG private server community? We&apos;d love to hear from you!</p>
            <div className="bg-[#36393f] rounded-lg p-6 border-l-4 border-[#5865f2]">
              <h3 className="text-xl font-bold text-white mb-3">How to Submit:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-[#5865f2] font-bold">•</span><span>Contact <strong className="text-[#5865f2]">@shangapallia</strong> on Discord</span></li>
                <li className="flex items-start gap-2"><span className="text-[#5865f2] font-bold">•</span><span>Share server updates, event results, or community highlights</span></li>
                <li className="flex items-start gap-2"><span className="text-[#5865f2] font-bold">•</span><span>Submit screenshots, videos, or written articles</span></li>
                <li className="flex items-start gap-2"><span className="text-[#5865f2] font-bold">•</span><span>Suggest topics you&apos;d like to see covered</span></li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#202225] border-t border-[#2f3136] py-6 text-center text-gray-400 mt-12">
        <p>© 2025 ROTMGPS</p>
      </footer>
    </div>
  );
}
