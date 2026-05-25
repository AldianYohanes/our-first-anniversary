"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SoundManager } from "../utils/SoundManager";
import { Eye, HelpCircle, Terminal, Coffee, Sparkles, Smile } from "lucide-react";

interface FlashlightOfficeProps {
  onWin: () => void;
}

interface Hotspot {
  id: string;
  name: string;
  x: number; // percentage
  y: number; // percentage
  found: boolean;
  hint: string;
  icon: React.ReactNode;
  fact: string;
}

export default function FlashlightOffice({ onWin }: FlashlightOfficeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [flashlightRadius, setFlashlightRadius] = useState(120);
  const [isLit, setIsLit] = useState(false);
  const [activeItem, setActiveItem] = useState<Hotspot | null>(null);
  
  const [hotspots, setHotspots] = useState<Hotspot[]>([
    {
      id: "coffee",
      name: "Coffee Maker & Mug",
      x: 20,
      y: 65,
      found: false,
      hint: "Smells like roasted beans... A warm brew in a cold office.",
      icon: <Coffee className="w-5 h-5 text-amber-700" />,
      fact: "Han's coffee addiction is legendary. This coffee machine kept him alive during all those long programming nights!",
    },
    {
      id: "terminal",
      name: "Running Code Terminal",
      x: 82,
      y: 45,
      found: false,
      hint: "Glows with letters of green and white. Commands and compilation logs...",
      icon: <Terminal className="w-5 h-5 text-emerald-700" />,
      fact: "A laptop compilation code: 'Cia ❤️ Han' forever loops on the screen. The compiler has zero errors today!",
    },
    {
      id: "sweater",
      name: "Striped Clothes",
      x: 52,
      y: 75,
      found: false,
      hint: "A cozy navy-white striped fabric left on the sofa...",
      icon: <Sparkles className="w-5 h-5 text-indigo-500" />,
      fact: "Cia's favorite striped navy-white shirt! Seeing it instantly reminds Han of her warm embrace.",
    },
    {
      id: "cia",
      name: "Cia studying",
      x: 48,
      y: 32,
      found: false,
      hint: "A calm presence sits at the corner desk, focused on a thick medical anatomy textbook...",
      icon: <Smile className="w-5 h-5 text-pink-600" />,
      fact: "The wonderful, beautiful Cia! A med student who chose to accompany Han in this massive empty office, bringing it to life.",
    },
  ]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isLit) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current || isLit || e.touches.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    });
  };

  const checkHoverItem = (itemX: number, itemY: number) => {
    if (!containerRef.current) return false;
    const rect = containerRef.current.getBoundingClientRect();
    const pixelX = (itemX / 100) * rect.width;
    const pixelY = (itemY / 100) * rect.height;
    
    const dist = Math.sqrt(Math.pow(mousePos.x - pixelX, 2) + Math.pow(mousePos.y - pixelY, 2));
    
    return dist < flashlightRadius;
  };

  const handleHotspotClick = (hotspot: Hotspot) => {
    if (!checkHoverItem(hotspot.x, hotspot.y) && !isLit) return;

    SoundManager.playSuccess();
    setActiveItem(hotspot);

    setHotspots((prev) =>
      prev.map((h) => (h.id === hotspot.id ? { ...h, found: true } : h))
    );

    if (hotspot.id === "cia") {
      setTimeout(() => {
        setIsLit(true);
        setActiveItem(null);
        SoundManager.playSuccess();
        setTimeout(() => {
          onWin();
        }, 3200);
      }, 2500);
    }
  };

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-950 p-4 select-none overflow-hidden text-[#473228]">
      
      {/* Cinematic Golden Glow Transition */}
      <AnimatePresence>
        {isLit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            className="absolute inset-0 z-50 bg-[#FCFBF7] flex flex-col items-center justify-center text-center p-8 border-3 double border-[#78350F]"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 1, type: "spring" }}
              className="flex flex-col items-center max-w-md font-sans"
            >
              <div className="w-16 h-16 bg-amber-50 border-2 border-[#78350F] rounded-full flex items-center justify-center text-amber-700 mb-6 shadow-sm">
                <Sparkles className="w-8 h-8 animate-spin" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-[#78350F] tracking-tight">
                The Office Comes Alive!
              </h2>
              <p className="text-sm text-amber-800/90 mt-3 font-medium leading-relaxed font-handwriting">
                "I usually worked alone in that huge empty office, and her presence made it feel alive... and full of warm peace."
              </p>
              <p className="text-[10px] text-amber-600 font-bold font-mono mt-6 animate-pulse uppercase tracking-widest">
                Lighting up the office...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-2xl text-center mb-4 z-10 font-sans">
        <h2 className="text-lg font-bold text-gray-200 tracking-wide">
          Gedung R FTI — 12th Floor Office
        </h2>
        <p className="text-xs text-gray-400 mt-1 max-w-md mx-auto">
          Han worked late in the dark empty office. Sweep the flashlight to explore the room and find Cia.
        </p>
      </div>

      {/* Main Flashlight Game Window */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full max-w-2xl h-[380px] bg-slate-950 border-3 double border-[#78350F] rounded-3xl overflow-hidden shadow-2xl cursor-none"
      >
        {/* Night Skyline Drawing */}
        <div className="absolute inset-0 bg-[#0B0F19] flex flex-col justify-end">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: Math.random() * 100 + "%",
                top: Math.random() * 60 + "%",
                animationDelay: i * 0.2 + "s",
              }}
            />
          ))}
          <div className="w-full h-1/3 flex items-end opacity-20">
            <div className="w-12 h-24 bg-slate-950 mr-1" />
            <div className="w-16 h-36 bg-slate-950 mr-1" />
            <div className="w-20 h-16 bg-slate-950 mr-2" />
            <div className="w-14 h-28 bg-slate-950 mr-1" />
            <div className="w-24 h-40 bg-slate-950" />
          </div>
        </div>

        {/* Furniture outlines */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute left-[45%] bottom-10 w-28 h-14 bg-slate-950 rounded-lg border border-slate-800" />
          <div className="absolute left-[40%] top-28 w-36 h-2 bg-slate-950" />
          <div className="absolute left-[42%] top-30 w-3 h-14 bg-slate-950" />
          <div className="absolute left-[70%] top-30 w-3 h-14 bg-slate-950" />
          <div className="absolute left-[15%] top-28 w-1 h-44 bg-slate-950" />
          <div className="absolute left-[12%] top-24 w-7 h-5 bg-slate-950 rounded-t-full" />
        </div>

        {/* hotspots */}
        {hotspots.map((item) => {
          const isRevealed = checkHoverItem(item.x, item.y);
          return (
            <button
              key={item.id}
              onClick={() => handleHotspotClick(item)}
              className="absolute flex items-center justify-center cursor-pointer transition-all duration-300 z-30"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: "translate(-50%, -50%)",
                width: "44px",
                height: "44px",
              }}
            >
              <AnimatePresence>
                {isRevealed && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className={`absolute inset-0 rounded-full border-2 ${
                      item.id === "cia" ? "border-pink-500" : "border-amber-600"
                    }`}
                  />
                )}
              </AnimatePresence>

              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all shadow-md ${
                  isRevealed
                    ? item.id === "cia"
                      ? "bg-pink-100 border-pink-400 opacity-100 scale-110"
                      : "bg-amber-50 border-[#78350F] opacity-100 scale-105"
                    : "bg-transparent border-transparent opacity-0"
                }`}
              >
                {isRevealed && item.icon}
              </div>
            </button>
          );
        })}

        {/* Flashlight Mask */}
        {!isLit && (
          <div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              background: `radial-gradient(circle ${flashlightRadius}px at ${mousePos.x}px ${mousePos.y}px, transparent 100%, rgba(3, 7, 18, 0.97) 100%)`,
            }}
          />
        )}
      </div>

      {/* Hotspot details overlay styled as paper card */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="absolute bottom-6 left-6 right-6 z-40 bg-[#FCFBF7] border-3 double border-[#78350F] shadow-xl p-5 rounded-2xl max-w-lg mx-auto font-sans"
          >
            <h3 className="text-xs font-bold text-gray-800 flex items-center gap-1.5 font-mono uppercase">
              {activeItem.icon}
              <span>FOUND: {activeItem.name}</span>
            </h3>
            <p className="text-xs text-gray-600 mt-2 font-medium leading-relaxed font-handwriting">
              {activeItem.fact}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 z-10 flex flex-wrap gap-2.5 justify-center max-w-md font-sans">
        {hotspots.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider font-mono border transition-all ${
              item.found
                ? "bg-amber-50 border-[#78350F] text-[#78350F]"
                : "bg-zinc-900 border-zinc-800 text-zinc-500"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{item.found ? item.name.toUpperCase() : "UNDISCOVERED"}</span>
          </div>
        ))}
      </div>

      <div className="mt-2 text-[10px] text-gray-500 font-bold flex items-center gap-1.5 z-10 font-mono">
        <HelpCircle className="w-3.5 h-3.5" />
        <span>MOVE MOUSE OR TAP SCREEN TO SHINE YOUR FLASHLIGHT</span>
      </div>
    </div>
  );
}
