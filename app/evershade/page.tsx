"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function EvershadeTestingPage() {
  const [timeRemaining, setTimeRemaining] = useState("");
  const [isTestingActive, setIsTestingActive] = useState(false);
  const [nextTestTime, setNextTestTime] = useState<Date | null>(null);

  // Testing time in Eastern Time (America/New_York)
  const TESTING_HOUR = 17; // 5 PM EST/EDT (which is 22:00 UTC / 23:00 Swedish)
  const TESTING_MINUTE = 0;
  const TESTING_DURATION_HOURS = 2;
  const TIMEZONE = "America/New_York";

  useEffect(() => {
    const calculateNextTestTime = () => {
      const now = new Date();
      
      // Create a date in Eastern timezone
      const nowET = new Date(now.toLocaleString("en-US", { timeZone: TIMEZONE }));
      const testStart = new Date(nowET);
      testStart.setHours(TESTING_HOUR, TESTING_MINUTE, 0, 0);

      // If we've passed today's test time, set it for tomorrow
      if (nowET > testStart) {
        testStart.setDate(testStart.getDate() + 1);
      }

      return testStart;
    };

    const updateCountdown = () => {
      const now = new Date();
      
      // Get current time in Eastern timezone
      const nowET = new Date(now.toLocaleString("en-US", { timeZone: TIMEZONE }));
      
      // Create test start time for today in Eastern timezone
      const testStart = new Date(nowET);
      testStart.setHours(TESTING_HOUR, TESTING_MINUTE, 0, 0);

      const testEnd = new Date(testStart);
      testEnd.setHours(testStart.getHours() + TESTING_DURATION_HOURS);

      // Check if we're currently in testing period
      if (nowET >= testStart && nowET < testEnd) {
        setIsTestingActive(true);
        const timeLeft = testEnd.getTime() - nowET.getTime();
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setIsTestingActive(false);
        const nextTest = calculateNextTestTime();
        setNextTestTime(nextTest);
        const timeUntilTest = nextTest.getTime() - nowET.getTime();
        const hours = Math.floor(timeUntilTest / (1000 * 60 * 60));
        const minutes = Math.floor((timeUntilTest % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeUntilTest % (1000 * 60)) / 1000);
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#36393f] text-gray-100 flex flex-col">
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

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold text-white mb-4">
              Evershade Testing
            </h1>
            <p className="text-2xl text-gray-400">
              Daily testing schedule: {TESTING_HOUR}:00 - {(TESTING_HOUR + TESTING_DURATION_HOURS) % 24}:00 EST/EDT
            </p>
          </div>

          <div className="bg-[#2f3136] rounded-xl p-12 border border-[#202225] shadow-2xl">
            {isTestingActive ? (
              <div className="text-center">
                <div className="mb-8">
                  <div className="inline-block bg-[#3ba55d] text-white px-8 py-4 rounded-lg text-2xl font-bold mb-4">
                    ✓ TESTING ACTIVE
                  </div>
                </div>
                <p className="text-3xl text-gray-300 mb-4">Time Remaining:</p>
                <div className="text-7xl font-bold text-[#5865f2] mb-8 font-mono">
                  {timeRemaining}
                </div>
                <div className="bg-[#36393f] rounded-lg p-6 border-l-4 border-[#3ba55d]">
                  <p className="text-xl text-gray-300">
                    Testing is currently active! Join now to participate.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-8">
                  <div className="inline-block bg-[#ed4245] text-white px-8 py-4 rounded-lg text-2xl font-bold mb-4">
                    ⏱ TESTING INACTIVE
                  </div>
                </div>
                <p className="text-3xl text-gray-300 mb-4">Next Testing in:</p>
                <div className="text-7xl font-bold text-[#5865f2] mb-8 font-mono">
                  {timeRemaining}
                </div>
                <div className="bg-[#36393f] rounded-lg p-6 border-l-4 border-[#5865f2]">
                  <p className="text-xl text-gray-300 mb-2">
                    Testing starts at {TESTING_HOUR}:00 EST/EDT and runs for {TESTING_DURATION_HOURS} hours
                  </p>
                  {nextTestTime && (
                    <p className="text-lg text-gray-400">
                      Next session: {nextTestTime.toLocaleDateString()} at {TESTING_HOUR}:00
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 bg-[#2f3136] rounded-xl p-8 border border-[#202225]">
            <h2 className="text-2xl font-bold text-white mb-4">Testing Information</h2>
            <div className="space-y-3 text-gray-300">
              <p className="flex items-start gap-2">
                <span className="text-[#5865f2] font-bold">•</span>
                <span>Testing occurs daily at 17:00 EST/EDT (5:00 PM Eastern Time)</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-[#5865f2] font-bold">•</span>
                <span>Each testing session lasts {TESTING_DURATION_HOURS} hours</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-[#5865f2] font-bold">•</span>
                <span>Make sure to join during the active testing window</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-[#5865f2] font-bold">•</span>
                <span>Check back regularly for updates</span>
              </p>
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
