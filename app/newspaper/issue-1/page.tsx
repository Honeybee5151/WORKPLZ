"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// TypeScript types for articles
type MainArticle = {
  type: "main";
  title: string;
  author: string;
  image?: string;
  content: string;
};

type SideArticle = {
  type: "side";
  title: string;
  author: string;
  content: string;
};

type VideoArticle = {
  type: "video";
  title: string;
  videoUrl: string;
  caption: string;
};

type ImageArticle = {
  type: "image";
  title: string;
  image: string;
  caption: string;
};

type Article = MainArticle | SideArticle | VideoArticle | ImageArticle;

type NewspaperPage = {
  pageNumber: number;
  date: string;
  headline: string;
  articles: Article[];
};

// Sample newspaper data - you can replace this with real content or fetch from an API
const newspaperPages: NewspaperPage[] = [
  {
    pageNumber: 1,
    date: "November 10, 2025",
    headline: "Major Update Hits Top Private Servers",
    articles: [
      {
        type: "main",
        title: "New Dungeon Released Across Multiple Servers",
        author: "By John Realm",
        image: "/news1.jpg",
        content: `In a coordinated effort, three of the largest RotMG private servers have simultaneously released the highly anticipated "Abyss of Demons" dungeon. This marks the first time private servers have worked together on a major content release.

The new dungeon features challenging boss mechanics, unique loot drops, and a progressive difficulty system that scales with party size. Early players report that the dungeon takes approximately 15-20 minutes to complete and offers substantial rewards for those brave enough to venture into its depths.

Server administrators report record player counts, with over 2,000 concurrent players across all participating servers. "This is what the community has been asking for," said one administrator who wished to remain anonymous. "We're seeing players who haven't logged in for months returning to try the new content."`,
      },
      {
        type: "side",
        title: "Player Reaches Level 100 in Record Time",
        author: "By Sarah Knight",
        content: `A dedicated player known as "SpeedRunner_Pro" has achieved level 100 in just 8 hours of gameplay, setting a new community record. The feat was accomplished through a combination of optimal dungeon routing and coordination with guild members.`,
      },
      {
        type: "video",
        title: "Community Highlights: Epic Moments",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        caption: "Watch the best moments from last week's community events",
      },
    ],
  },
  {
    pageNumber: 2,
    date: "November 10, 2025",
    headline: "Community Events and Tournaments",
    articles: [
      {
        type: "main",
        title: "Annual PvP Tournament Announced",
        author: "By Mike Battle",
        image: "/news2.jpg",
        content: `The annual cross-server PvP tournament is set to begin next month, with a prize pool exceeding $5,000 in rewards. Registration opens next week, and organizers expect over 500 participants from servers worldwide.

This year's tournament introduces a new bracket system designed to give players of all skill levels a chance to compete. "We want everyone to feel like they have a shot," explained tournament director Alex Chen. "The new format includes beginner, intermediate, and expert divisions."

Sponsors for the event include several prominent gaming peripheral companies and content creators. All matches will be livestreamed on multiple platforms, with professional commentators providing analysis throughout the tournament.`,
      },
      {
        type: "side",
        title: "Server Maintenance Schedule",
        author: "By Tech Team",
        content: `Regular maintenance windows are scheduled for this week. Server downtime is expected to last 2-3 hours during off-peak hours. Players are advised to check individual server Discord channels for specific timing.`,
      },
      {
        type: "image",
        title: "Screenshot of the Week",
        image: "/screenshot1.jpg",
        caption: "Player 'ArtisticRealm' captured this stunning moment during a Realm clear",
      },
    ],
  },
  {
    pageNumber: 3,
    date: "November 10, 2025",
    headline: "Developer Insights and Updates",
    articles: [
      {
        type: "main",
        title: "Behind the Scenes: Creating Custom Content",
        author: "By Dev Team",
        image: "/news3.jpg",
        content: `Ever wondered how custom dungeons and items make it into your favorite private servers? We sat down with several development teams to learn about their creative process.

"It starts with community feedback," explains one developer. "We read every suggestion, every complaint, every idea. Then we prototype rapidly, testing dozens of concepts before settling on something that feels right."

The development cycle for a major dungeon typically takes 2-3 months from concept to release. This includes sprite work, programming boss mechanics, balancing loot tables, and extensive playtesting with trusted community members.

Quality assurance is crucial. "We've learned the hard way that rushing content leads to bugs and player frustration," notes another developer. "It's better to delay and get it right than to release something broken."`,
      },
      {
        type: "side",
        title: "Top 5 Most Requested Features",
        author: "By Community Manager",
        content: `Based on community polls, here are the most requested features: 1) Guild housing system, 2) Expanded vault space, 3) Achievement system, 4) Cross-server trading, 5) Mobile app support. Development teams are actively working on several of these.`,
      },
    ],
  },
];

export default function NewspaperPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = newspaperPages.length;
  const page = newspaperPages[currentPage];

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#36393f] text-gray-100">
      {/* Header */}
      <header className="bg-[#202225] border-b border-[#2f3136] shadow-lg">
        <div className="bg-gradient-to-r from-[#5865f2] to-[#7289da] h-2"></div>
        <div className="container mx-auto px-6 py-8">
          <Link href="/newspaper" className="inline-block mb-4 text-[#5865f2] hover:text-[#7289da] transition-colors">
              ← Back to Newspaper Archive
          </Link>
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight mb-2" style={{
              fontFamily: 'Georgia, serif',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              The Realmder
            </h1>
            <p className="text-xl text-gray-400 italic">Your Daily Source for RotMG Private Server News</p>
            <p className="text-sm text-gray-500 mt-2">{page.date}</p>
          </div>
        </div>
      </header>

      {/* Newspaper Content */}
      <main className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Page Header */}
        <div className="border-b-4 border-[#5865f2] pb-4 mb-8">
          <h2 className="text-4xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
            {page.headline}
          </h2>
          <div className="flex items-center justify-between mt-2">
            <p className="text-gray-400">Page {page.pageNumber} of {totalPages}</p>
            <p className="text-gray-400">{page.date}</p>
          </div>
        </div>

        {/* Articles Layout */}
        <div className="space-y-8">
          {page.articles.map((article, idx) => (
            <div key={idx}>
              {/* Main Article - Full Width */}
              {article.type === "main" && (
                <article className="bg-[#2f3136] rounded-lg p-8 border border-[#202225] shadow-lg">
                  <h3 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                    {article.title}
                  </h3>
                  <p className="text-sm text-[#5865f2] mb-4 italic">{article.author}</p>
                  
                  {article.image && (
                    <div className="mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        width={1200}
                        height={600}
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                  
                  <div className="text-gray-300 leading-relaxed space-y-4 md:columns-2 md:gap-8" style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '1.05rem',
                    textAlign: 'justify'
                  }}>
                    {article.content.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </article>
              )}

              {/* Side Article - Smaller Box */}
              {article.type === "side" && (
                <article className="bg-[#2f3136] rounded-lg p-6 border-l-4 border-[#5865f2] shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                    {article.title}
                  </h3>
                  <p className="text-sm text-[#5865f2] mb-3 italic">{article.author}</p>
                  <p className="text-gray-300 leading-relaxed" style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '0.95rem'
                  }}>
                    {article.content}
                  </p>
                </article>
              )}

              {/* Video Embed */}
              {article.type === "video" && (
                <article className="bg-[#2f3136] rounded-lg p-6 border border-[#202225] shadow-lg">
                  <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                    {article.title}
                  </h3>
                  <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    <iframe
                      width="100%"
                      height="100%"
                      src={article.videoUrl}
                      title={article.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <p className="text-gray-400 text-sm italic">{article.caption}</p>
                </article>
              )}

              {/* Image Feature */}
              {article.type === "image" && (
                <article className="bg-[#2f3136] rounded-lg p-6 border border-[#202225] shadow-lg">
                  <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                    {article.title}
                  </h3>
                  <div className="rounded-lg overflow-hidden mb-4">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={1200}
                      height={800}
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="text-gray-400 text-sm italic">{article.caption}</p>
                </article>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t-2 border-[#2f3136]">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              currentPage === 0
                ? "bg-[#2f3136] text-gray-600 cursor-not-allowed"
                : "bg-[#5865f2] text-white hover:bg-[#4752c4] hover:scale-105"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous Page
          </button>

          <div className="text-center">
            <p className="text-gray-400">
              Page {currentPage + 1} of {totalPages}
            </p>
            <div className="flex gap-2 mt-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentPage ? "bg-[#5865f2] scale-125" : "bg-[#2f3136] hover:bg-[#7289da]"
                  }`}
                  aria-label={`Go to page ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages - 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              currentPage === totalPages - 1
                ? "bg-[#2f3136] text-gray-600 cursor-not-allowed"
                : "bg-[#5865f2] text-white hover:bg-[#4752c4] hover:scale-105"
            }`}
          >
            Next Page
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#202225] border-t border-[#2f3136] py-6 text-center text-gray-400 mt-12">
        <p>© 2025 ROTMGPS</p>
      </footer>
    </div>
  );
}
