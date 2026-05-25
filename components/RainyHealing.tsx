"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SoundManager } from "../utils/SoundManager";
import { Heart, HelpCircle, Sparkles, Sun } from "lucide-react";

interface RainyHealingProps {
  onWin: () => void;
}

export default function RainyHealing({ onWin }: RainyHealingProps) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const intervalRef = useRef<any>(null);
  
  const getComfortQuote = () => {
    if (progress >= 100) return "You made me stronger. I am so safe with you, Cia. ❤️";
    if (progress >= 75) return "You helped calm my fears about the future and my life direction...";
    if (progress >= 50) return "You supported me even when I was financially struggling and broke...";
    if (progress >= 25) return "Your warm and peaceful embrace became my ultimate shelter...";
    return "When the storms of 2025 hit, I was completely lost in the dark...";
  };

  const startHolding = () => {
    SoundManager.playChime();
    setIsHolding(true);

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1.5;
        
        if (Math.floor(next) % 15 === 0) {
          SoundManager.playPop();
        }

        if (next >= 100) {
          clearInterval(intervalRef.current);
          SoundManager.playSuccess();
          setIsHolding(false);
          setTimeout(() => {
            onWin();
          }, 2500);
          return 100;
        }
        return next;
      });
    }, 40);
  };

  const stopHolding = () => {
    setIsHolding(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return Math.max(0, prev - 1.2);
      });
    }, 45);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const getSkyStyle = () => {
    const factor = progress / 100;
    
    // Lerping colors: Slate/gray (50, 40, 35) -> Warm peach/periwinkle pastel (250, 245, 238)
    const r = Math.round(50 + (250 - 50) * factor);
    const g = Math.round(40 + (240 - 40) * factor);
    const b = Math.round(35 + (235 - 35) * factor);
    
    return {
      backgroundColor: `rgb(${r}, ${g}, ${b})`,
      transition: "background-color 0.2s ease",
    };
  };

  return (
    <div
      style={getSkyStyle()}
      className="absolute inset-0 z-10 flex flex-col items-center justify-between p-6 select-none overflow-hidden text-[#473228]"
    >
      {/* Raindrops (disappear as progress reaches 100) */}
      {progress < 90 && (
        <div className="absolute inset-0 pointer-events-none z-10 opacity-60">
          {[...Array(Math.max(10, Math.round(50 - (progress / 100) * 50)))].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[1.5px] h-6 bg-slate-400 rounded-full"
              style={{
                left: Math.random() * 100 + "%",
                top: Math.random() * -100 + "px",
              }}
              animate={{
                y: [0, 800],
                x: [0, 80],
              }}
              transition={{
                duration: 0.8 + Math.random() * 0.4,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      {/* Floating Sparkles when holding */}
      <AnimatePresence>
        {isHolding && (
          <div className="absolute inset-0 pointer-events-none z-20">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-pink-300 text-xl"
                style={{
                  left: 35 + Math.random() * 30 + "%",
                  top: 55 + Math.random() * 15 + "%",
                }}
                animate={{
                  y: [0, -200],
                  x: [0, Math.random() * 80 - 40],
                  opacity: [0, 1, 0],
                  scale: [0.6, 1.4, 0.6],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <Sparkles className="w-5 h-5 fill-current text-pink-200" />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Header Info */}
      <div className="w-full flex flex-col items-center text-center mt-6 z-20 font-sans">
        <h2 className={`text-lg font-bold tracking-wide ${progress > 60 ? "text-[#78350F]" : "text-gray-250"}`}>
          Weathering The Storm
        </h2>
        <p className={`text-xs mt-1 max-w-xs ${progress > 60 ? "text-amber-800/80" : "text-gray-400"}`}>
          In 2025, I hit a low point... Click and hold the heart to hold her hand and heal the sky together.
        </p>
      </div>

      {/* Quote display styled as cozy double border card */}
      <div className={`w-full max-w-md border-3 double p-6 rounded-3xl shadow-xl flex items-center justify-center min-h-[96px] text-center px-8 z-20 ${
        progress > 60 
          ? "bg-[#FCFBF7] border-[#78350F] text-[#473228]" 
          : "bg-black/35 border-white/20 text-gray-150 backdrop-blur-md"
      }`}>
        <motion.p
          key={getComfortQuote()}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs md:text-sm font-bold leading-relaxed font-sans"
        >
          “{getComfortQuote()}”
        </motion.p>
      </div>

      {/* Main Interactive Button Area */}
      <div className="flex flex-col items-center gap-6 mb-12 z-20 font-sans">
        
        {/* Heart Progress circle */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="68"
              fill="transparent"
              stroke={progress > 60 ? "rgba(120, 53, 15, 0.15)" : "rgba(255, 255, 255, 0.1)"}
              strokeWidth="5"
            />
            <motion.circle
              cx="80"
              cy="80"
              r="68"
              fill="transparent"
              stroke="url(#heartGlow)"
              strokeWidth="7"
              strokeDasharray={2 * Math.PI * 68}
              strokeDashoffset={2 * Math.PI * 68 * (1 - progress / 100)}
              strokeLinecap="round"
              animate={isHolding ? { strokeWidth: [7, 9, 7] } : {}}
              transition={{ repeat: Infinity, duration: 1.2 }}
            />
            
            <defs>
              <linearGradient id="heartGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F472B6" />
                <stop offset="50%" stopColor="#A78BFA" />
                <stop offset="100%" stopColor="#818CF8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Central Heart button */}
          <motion.button
            onMouseDown={startHolding}
            onMouseUp={stopHolding}
            onMouseLeave={stopHolding}
            onTouchStart={startHolding}
            onTouchEnd={stopHolding}
            animate={
              isHolding
                ? { scale: [1, 1.08, 1], boxShadow: "0 0 20px rgba(244,114,182,0.6)" }
                : progress === 100
                ? { scale: 1.1, rotate: [0, 5, -5, 0] }
                : { scale: 1 }
            }
            transition={isHolding ? { repeat: Infinity, duration: 1 } : { duration: 0.3 }}
            className={`absolute w-24 h-24 rounded-full flex flex-col items-center justify-center border-4 shadow-xl active:scale-95 transition-all cursor-pointer ${
              progress === 100
                ? "bg-gradient-to-r from-pink-500 to-indigo-500 border-white text-white"
                : isHolding
                ? "bg-[#FCFBF7] border-pink-400 text-pink-600 animate-pulse"
                : "bg-slate-900/80 border-slate-700 text-slate-300"
            }`}
          >
            {progress === 100 ? (
              <Sun className="w-10 h-10 animate-spin text-amber-200 fill-amber-200" />
            ) : (
              <Heart className={`w-10 h-10 ${isHolding ? "fill-[#F472B6]" : ""}`} />
            )}
            <span className="text-[9px] font-bold tracking-widest font-mono mt-1.5 uppercase">
              {progress >= 100 ? "HEALED" : isHolding ? "HOLDING..." : "HOLD HANDS"}
            </span>
          </motion.button>
        </div>

        <div className="flex items-center gap-1.5 text-[9px] text-gray-400 font-bold font-mono tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span className={progress > 60 ? "text-[#78350F]" : "text-gray-400"}>
            CLICK AND HOLD BUTTON TO FILL THE HEART METER
          </span>
        </div>
      </div>
    </div>
  );
}
