"use client";
import { useState, useEffect } from "react";
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
  {
    issue: 2,
    date: "November 11, 2025",
    title: "Community Events and Tournaments",
    coverImage: "/newspapers/issue-2-cover.png",
    fullUrl: "/newspaper/issue-2",
  },
  {
    issue: 3,
    date: "November 12, 2025",
    title: "Developer Insights and Updates",
    coverImage: "/newspapers/issue-3-cover.png",
    fullUrl: "/newspaper/issue-3",
  },
];

// Poll metadata
const pollsMetadata = [
  {
    id: 1,
    question: "What's your favorite dungeon?",
    options: ["Shatters", "Void", "O3", "Fungal Cavern"],
    isActive: true,
    endDate: "November 20, 2025",
  },
  {
    id: 2,
    question: "Which server do you play most?",
    options: ["Evershade", "T's Realms", "FP", "Valor", "DOM"],
    isActive: false,
    endDate: "November 8, 2025",
  },
];

// Generate unique voter ID
function getVoterId() {
  let voterId = localStorage.getItem('voterId');
  if (!voterId) {
    voterId = `voter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('voterId', voterId);
  }
  return voterId;
}

export default function NewspaperMain() {
  const [searchIssue, setSearchIssue] = useState("");
  const [selectedNewspaper, setSelectedNewspaper] = useState(newspapers[0]);
  const [showActivePollsOnly, setShowActivePollsOnly] = useState(true);
  const [pollVotes, setPollVotes] = useState<{ [key: number]: number[] }>({});
  const [votedPolls, setVotedPolls] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchPollData();
    loadVotedPolls();
  }, []);

  const fetchPollData = async () => {
    try {
      const response = await fetch('/api/polls');
      const data = await response.json();
      
      if (data.polls) {
        const votes: { [key: number]: number[] } = {};
        data.polls.forEach((poll: { pollId: number; votes: number[] }) => {
          votes[poll.pollId] = poll.votes;
        });
        setPollVotes(votes);
      }
    } catch (error) {
      console.error('Failed to fetch poll data:', error);
    }
  };

  const loadVotedPolls = () => {
    const voted = localStorage.getItem('votedPolls');
    if (voted) {
      setVotedPolls(new Set(JSON.parse(voted)));
    }
  };

  const handleVote = async (pollId: number, optionIndex: number) => {
    try {
      const voterId = getVoterId();
      
      const response = await fetch('/api/polls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pollId, optionIndex, voterId })
      });

      const data = await response.json();

      if (response.ok) {
        setPollVotes(prev => ({ ...prev, [pollId]: data.votes }));
        
        const newVotedPolls = new Set(votedPolls);
        newVotedPolls.add(pollId);
        setVotedPolls(newVotedPolls);
        localStorage.setItem('votedPolls', JSON.stringify([...newVotedPolls]));

        alert('Vote recorded successfully!');
      } else {
        alert(data.error || 'Failed to vote');
      }
    } catch (error) {
      console.error('Error voting:', error);
      alert('Failed to submit vote');
    }
  };

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
    if (currentIndex < newspapers.length - 1) {
      setSelectedNewspaper(newspapers[currentIndex + 1]);
    }
  };

  const goToNext = () => {
    const currentIndex = newspapers.findIndex(n => n.issue === selectedNewspaper.issue);
    if (currentIndex > 0) {
      setSelectedNewspaper(newspapers[currentIndex - 1]);
    }
  };

  const filteredPolls = showActivePollsOnly ? pollsMetadata.filter(p => p.isActive) : pollsMetadata;

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
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            The Realm Herald
          </h1>
          <p className="text-xl text-gray-400 italic">Your Daily Source for RotMG Private Server News</p>
        </div>

        <div className="bg-[#2f3136] rounded-xl p-6 mb-8 border border-[#202225]">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
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
            <div className="text-center">
              <p className="text-gray-400 text-sm">Viewing</p>
              <p className="text-white font-bold text-lg">Issue #{selectedNewspaper.issue}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#2f3136] rounded-xl p-8 mb-8 border border-[#202225]">
          <div className="flex justify-between items-center mb-6">
            <button onClick={goToPrevious} disabled={selectedNewspaper.issue === newspapers[newspapers.length - 1].issue} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${selectedNewspaper.issue === newspapers[newspapers.length - 1].issue ? 'bg-[#40444b] text-gray-600 cursor-not-allowed' : 'bg-[#5865f2] text-white hover:bg-[#4752c4]'}`}>
              ← Previous
            </button>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{selectedNewspaper.title}</p>
              <p className="text-gray-400">{selectedNewspaper.date}</p>
            </div>
            <button onClick={goToNext} disabled={selectedNewspaper.issue === newspapers[0].issue} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${selectedNewspaper.issue === newspapers[0].issue ? 'bg-[#40444b] text-gray-600 cursor-not-allowed' : 'bg-[#5865f2] text-white hover:bg-[#4752c4]'}`}>
              Next →
            </button>
          </div>

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
            📝 Contribute to The Realm Herald
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

        <div className="bg-[#2f3136] rounded-xl p-8 border border-[#202225]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>📊 Community Polls</h2>
            <button onClick={() => setShowActivePollsOnly(!showActivePollsOnly)} className="bg-[#40444b] hover:bg-[#5865f2] text-white px-4 py-2 rounded-lg transition-colors text-sm">
              {showActivePollsOnly ? 'Show All Polls' : 'Show Active Only'}
            </button>
          </div>

          <div className="space-y-6">
            {filteredPolls.map((poll) => {
              const votes = pollVotes[poll.id] || poll.options.map(() => 0);
              const totalVotes = votes.reduce((a, b) => a + b, 0);
              const hasVoted = votedPolls.has(poll.id);
              
              return (
                <div key={poll.id} className={`bg-[#36393f] rounded-lg p-6 border-2 ${poll.isActive ? 'border-[#3ba55d]' : 'border-[#40444b]'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{poll.question}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${poll.isActive ? 'bg-[#3ba55d] text-white' : 'bg-[#40444b] text-gray-400'}`}>
                      {poll.isActive ? 'Active' : 'Closed'}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {poll.options.map((option, idx) => {
                      const percentage = totalVotes > 0 ? ((votes[idx] / totalVotes) * 100).toFixed(1) : 0;
                      const canVote = poll.isActive && !hasVoted;
                      
                      return (
                        <div key={idx}>
                          <div className="flex justify-between items-center text-sm mb-1">
                            <div className="flex items-center gap-2">
                              {canVote && (
                                <button onClick={() => handleVote(poll.id, idx)} className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-3 py-1 rounded text-xs font-semibold transition-colors">
                                  Vote
                                </button>
                              )}
                              <span className="text-gray-300">{option}</span>
                            </div>
                            <span className="text-gray-400">{votes[idx]} votes ({percentage}%)</span>
                          </div>
                          <div className="w-full bg-[#2f3136] rounded-full h-3 overflow-hidden">
                            <div className="bg-[#5865f2] h-full rounded-full transition-all duration-300" style={{ width: `${percentage}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {hasVoted && <p className="text-[#3ba55d] text-sm mt-3 font-semibold">✓ You have voted in this poll</p>}
                  <p className="text-gray-500 text-sm mt-4">{poll.isActive ? `Ends: ${poll.endDate}` : `Ended: ${poll.endDate}`}</p>
                </div>
              );
            })}
          </div>

          {filteredPolls.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg">No {showActivePollsOnly ? 'active' : ''} polls available</p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-[#202225] border-t border-[#2f3136] py-6 text-center text-gray-400 mt-12">
        <p>© 2025 ROTMGPS </p>
      </footer>
    </div>
  );
}
