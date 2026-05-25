"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SoundManager } from "../utils/SoundManager";
import { Heart, Mail, Clock, Volume2, VolumeX, Sparkles } from "lucide-react";

interface TimeDiff {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function FinalLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeDiff, setTimeDiff] = useState<TimeDiff>({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [muted, setMuted] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  const NICKNAME_HAN = "Han";
  const NICKNAME_CIA = "Cia";
  const START_DATE = "2025-05-25T00:00:00"; // Commencement of relationship

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(START_DATE).getTime();
      const now = new Date().getTime();
      const diffMs = now - start;

      const msPerSecond = 1000;
      const msPerMinute = msPerSecond * 60;
      const msPerHour = msPerMinute * 60;
      const msPerDay = msPerHour * 24;
      const msPerYear = msPerDay * 365.25;

      const years = Math.floor(diffMs / msPerYear);
      const remainingAfterYears = diffMs % msPerYear;

      const days = Math.floor(remainingAfterYears / msPerDay);
      const remainingAfterDays = remainingAfterYears % msPerDay;

      const hours = Math.floor(remainingAfterDays / msPerHour);
      const remainingAfterHours = remainingAfterDays % msPerHour;

      const minutes = Math.floor(remainingAfterHours / msPerMinute);
      const remainingAfterMinutes = remainingAfterHours % msPerMinute;

      const seconds = Math.floor(remainingAfterMinutes / msPerSecond);

      setTimeDiff({ years, days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenLetter = () => {
    SoundManager.playSuccess();
    setIsOpen(true);
  };

  const handleCloseLetter = () => {
    SoundManager.playClack();
    setIsOpen(false);
  };

  const toggleMute = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    SoundManager.setMute(newMuted);
    if (!newMuted) {
      SoundManager.playChime();
      SoundManager.playBGM();
    }
  };

  const triggerSecretHeart = () => {
    SoundManager.playSuccess();
    setShowSecret(true);
    setTimeout(() => {
      setShowSecret(false);
    }, 4000);
  };

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-between bg-radial from-[#FAF6EE] via-[#EAE6F3] to-[#FCEBEF] p-6 select-none overflow-hidden text-[#473228]">
      
      {/* Floating Sparkles/Hearts */}
      <div className="absolute inset-x-0 bottom-0 top-0 pointer-events-none z-10">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-500/10 text-3xl"
            style={{
              left: Math.random() * 100 + "%",
              bottom: Math.random() * 100 + "px",
            }}
            animate={{
              y: [0, -250],
              opacity: [0, 0.7, 0],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 8,
            }}
          >
            <Heart className="w-6 h-6 fill-current" />
          </motion.div>
        ))}
      </div>

      {/* HUD Header */}
      <div className="w-full flex items-center justify-between z-20 font-sans">
        <div className="flex items-center gap-2 text-[10px] font-bold font-mono text-amber-850 tracking-widest uppercase">
          <Sparkles className="w-4 h-4 text-pink-500 animate-spin" />
          <span>EPILOGUE: THE COMMITTANCE</span>
        </div>

        <button
          onClick={toggleMute}
          className="flex items-center justify-center p-2.5 rounded-full bg-[#FCFBF7] border-2 border-[#78350F] text-amber-700 shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-bounce" />}
        </button>
      </div>

      {/* Main Clock timeline */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="flex flex-col items-center text-center z-20 w-full max-w-xl bg-[#FCFBF7] border-3 double border-[#78350F] p-5 rounded-3xl mt-4 shadow-md font-sans"
      >
        <div className="flex items-center gap-1.5 text-pink-600 font-bold font-mono text-xs uppercase tracking-wider">
          <Clock className="w-4 h-4 text-pink-500" />
          <span>OUR LIFETIME JOURNEY TOGETHER</span>
        </div>
        
        <div className="grid grid-cols-5 gap-2.5 mt-4 w-full text-center">
          {[
            { label: "YEARS", value: timeDiff.years },
            { label: "DAYS", value: timeDiff.days },
            { label: "HOURS", value: timeDiff.hours },
            { label: "MINS", value: timeDiff.minutes },
            { label: "SECS", value: timeDiff.seconds },
          ].map((item, idx) => (
            <div key={idx} className="bg-[#FAF6EE] border-2 border-[#78350F] rounded-xl p-2 md:p-3 flex flex-col justify-center items-center shadow-inner">
              <span className="text-xl md:text-2xl font-extrabold text-[#473228] font-mono tracking-tight leading-none">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="text-[8px] font-bold text-amber-800 font-mono mt-1 tracking-wider">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-amber-900/60 font-mono mt-3">
          Since 25 May 2025, 00:00 AM • Quietly staying together
        </p>
      </motion.div>

      {/* Closed Envelope */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="envelope"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
            className="flex flex-col items-center justify-center my-auto z-20 cursor-pointer"
            onClick={handleOpenLetter}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative w-44 h-32 bg-[#FCFBF7] border-3 double border-[#78350F] rounded-2xl shadow-xl flex items-center justify-center group"
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink-300 to-amber-300 opacity-20 blur-md group-hover:opacity-40 transition-opacity" />

              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 176 128">
                <path d="M2 2 L88 64 L174 2" fill="none" stroke="#78350F" strokeWidth="2.5" />
                <path d="M2 126 L76 70" fill="none" stroke="#78350F" strokeWidth="2" />
                <path d="M174 126 L100 70" fill="none" stroke="#78350F" strokeWidth="2" />
              </svg>

              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 border-2 border-white shadow-lg flex items-center justify-center z-15 active:scale-95 animate-pulse"
              >
                <Heart className="w-5 h-5 text-white fill-white" />
              </motion.div>
            </motion.div>

            <span className="text-[9px] font-bold text-[#78350F] font-mono tracking-widest mt-5 uppercase animate-pulse">
              CLICK ENVELOPE TO UNSEAL LETTER
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Love Letter */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 150 }}
            transition={{ type: "spring", damping: 20 }}
            className="absolute inset-x-4 bottom-4 top-16 md:inset-x-8 md:bottom-8 z-40 bg-[#FCFBF7] border-4 border-double border-[#78350F] shadow-2xl rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-y-auto select-text font-serif text-[#473228]"
          >
            <div className="absolute inset-0 bg-repeat bg-[radial-gradient(#78350f_0.5px,transparent_0.5px)] opacity-5 pointer-events-none" style={{ backgroundSize: "12px 16px" }} />

            <div className="space-y-4 md:space-y-6 flex-1 pr-1 font-sans">
              <div className="flex justify-between items-end border-b-2 border-dashed border-amber-800/20 pb-2">
                <span className="text-sm font-extrabold text-[#78350F] tracking-wide">
                  To: My Dearest {NICKNAME_CIA} ❤️
                </span>
                <span className="text-[10px] text-gray-500 font-mono font-bold uppercase">
                  1st Anniversary
                </span>
              </div>

              <div className="text-sm leading-relaxed text-[#473228] space-y-4 font-sans font-bold">
                <p>Happy 1st Anniversary, my love.</p>
                <p>
                  Reflecting back to late 2024 when we first met at <i>Adhyatmaka</i>, I never would have imagined that the "calm, ordinary girl" sitting quietly would become the absolute anchor of my entire life. And you probably thought I was just some weird guy carrying drinks around!
                </p>
                <p>
                  But even before we officially became lovers on <b>May 25, 2025</b>, you showed me a depth of genuine care I had never experienced. The day you brought me bread just so I wouldn’t stay mad at you was the exact moment I realized I was completely in love with you. Your gentle heart—which cares so deeply for other people, campus cats, and everything in this world—is what drew me to you.
                </p>
                <p>
                  Our relationship feels so mature and responsible. You are smart, responsible, and composed—a wonderful medical student with a beautifully grounded personality. Yet, when we are together, we turn into two clingy golden retrievers, emotional, playful, stubborn, and chaotic all at once.
                </p>
                <p>
                  Thank you for accompanying me on the 12th floor of <i>Gedung R FTI</i>. That massive office used to feel cold and lonely, but your presence brought it completely to life. Thank you for holding my hand in 2025 when I was financially struggling, broke, and lost. You stayed, supported me, and calmed my biggest fears about my future.
                </p>
                <p>
                  I don't have dramatic promises to make, Cia. My only promise is to quietly stay together with you through all of life's chaotic and peaceful seasons, loving you exactly as I do now.
                </p>
                <p>I don't say this nearly enough, but...</p>
              </div>
            </div>

            {/* Signature */}
            <div className="border-t border-amber-200/50 pt-4 mt-6 flex flex-col md:flex-row justify-between items-center gap-3 font-sans">
              <div className="flex flex-col text-center md:text-left">
                <span className="text-[9px] text-gray-500 font-bold font-mono uppercase tracking-widest">
                  YOUR STUPID CLINGY BOY,
                </span>
                <span className="font-extrabold text-base text-[#78350F] tracking-tight mt-0.5 font-handwriting">
                  {NICKNAME_HAN}
                </span>
              </div>

              <button
                onClick={triggerSecretHeart}
                className="px-6 py-2.5 rounded-full border-3 double border-[#78350F] bg-[#FCFBF7] hover:bg-[#FCEBEF] text-[#473228] font-bold text-xs tracking-wider shadow-md active:scale-95 transition-all cursor-pointer uppercase flex items-center gap-1.5"
              >
                <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                <span>I LOVE YOU</span>
              </button>

              <button
                onClick={handleCloseLetter}
                className="text-[9px] font-bold text-amber-800/80 hover:text-amber-900 font-mono tracking-widest uppercase cursor-pointer py-1"
              >
                CLOSE LETTER
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSecret && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/85 flex flex-col items-center justify-center text-center p-8 pointer-events-none"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              <Heart className="w-32 h-32 text-[#EC4899] fill-[#EC4899]" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-8 tracking-wide font-handwriting">
              "I love you, Cia."
            </h1>
            <p className="text-pink-300 text-sm mt-3 font-semibold font-mono animate-pulse uppercase tracking-widest">
              Quietly staying together, forever.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        onClick={triggerSecretHeart}
        className="text-[9px] text-[#78350F]/45 font-mono mb-2 cursor-pointer hover:text-[#78350F] transition-colors"
      >
        Designed with absolute love by Han • May 25, 2026
      </div>
    </div>
  );
}
