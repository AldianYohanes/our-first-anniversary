"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Camera, Calendar, Volume2, VolumeX } from "lucide-react";
import { SoundManager } from "../utils/SoundManager";

interface PasswordGateProps {
  onUnlock: () => void;
}

export default function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [hints, setHints] = useState(false);
  const [muted, setMuted] = useState(false);
  const [firstInteract, setFirstInteract] = useState(false);

  const CORRECT_PIN = "250525";

  useEffect(() => {
    const savedMute = localStorage.getItem("mute_anniversary_game") === "true";
    setMuted(savedMute);
    SoundManager.setMute(savedMute);
  }, []);

  const handleKeyPress = (num: string) => {
    if (pin.length >= 6) return;

    if (!firstInteract) {
      setFirstInteract(true);
      SoundManager.playClack();
      SoundManager.playBGM();
    } else {
      SoundManager.playClack();
    }

    const newPin = pin + num;
    setPin(newPin);

    if (newPin.length === 6) {
      if (newPin === CORRECT_PIN) {
        SoundManager.playSuccess();
        setTimeout(() => {
          onUnlock();
        }, 1200);
      } else {
        SoundManager.playDodgeFail();
        setError(true);
        setTimeout(() => {
          setError(false);
          setPin("");
        }, 1000);
      }
    }
  };

  const handleBackspace = () => {
    SoundManager.playClack();
    setPin(pin.slice(0, -1));
  };

  const toggleMute = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    SoundManager.setMute(newMuted);
    localStorage.setItem("mute_anniversary_game", String(newMuted));

    if (!newMuted) {
      SoundManager.playChime();
      SoundManager.playBGM();
    }
  };

  // Keyboard support with keyup (to prevent repeat key inputs)
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        handleKeyPress(e.key);
      } else if (e.key === "Backspace") {
        handleBackspace();
      }
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [pin, firstInteract]);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#FAF6EE] px-4 py-8 overflow-hidden font-sans text-[#473228]">
      {/* Background Grids & Scribbles */}
      <div className="absolute inset-0 bg-repeat bg-[radial-gradient(#78350f_0.5px,transparent_0.5px)] opacity-[0.06] pointer-events-none" style={{ backgroundSize: "16px 16px" }} />

      {/* Floating Scrapbook stickers */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        <div className="absolute top-12 left-12 text-3xl rotate-12">🌸</div>
        <div className="absolute bottom-16 right-16 text-3xl -rotate-12">🐱</div>
        <div className="absolute top-[35%] right-10 text-2xl rotate-45">🍞</div>
        <div className="absolute bottom-[20%] left-8 text-2xl -rotate-12">☕</div>
        <div className="absolute top-20 right-[25%] text-2xl -rotate-[15deg]">✨</div>
      </div>

      {/* Polaroid Frame */}
      <div className="relative z-10 w-full max-w-[340px] flex flex-col items-center">
        {/* Washi Tape on Polaroid corners */}
        <div className="absolute -top-3.5 left-[15%] w-14 h-4.5 bg-pink-200/50 border border-dashed border-pink-300/20 rotate-[-12deg] z-20 shadow-sm backdrop-blur-[0.5px]" />
        <div className="absolute -top-3.5 right-[15%] w-14 h-4.5 bg-indigo-200/40 border border-dashed border-indigo-300/20 rotate-[10deg] z-20 shadow-sm backdrop-blur-[0.5px]" />

        <motion.div 
          className="w-full bg-[#FCFBF7] border-3 border-[#78350F] p-4 pb-14 rounded-2xl shadow-[6px_6px_0px_rgba(120,53,15,1)] rotate-[-1.5deg]"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 12 }}
        >
          {/* Polaroid Photo Viewport */}
          <div className="w-full aspect-square bg-[#FAF6EE] border-2 border-[#78350F] flex flex-col items-center justify-center p-4 shadow-inner relative overflow-hidden rounded-xl">
            {/* Viewfinder ring/cross lines */}
            <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
              <div className="w-36 h-36 rounded-full border border-dashed border-pink-400/40 flex items-center justify-center animate-spin" style={{ animationDuration: "25s" }}>
                <div className="w-28 h-28 rounded-full border border-dashed border-pink-400/20" />
              </div>
              <div className="absolute w-full h-[1px] bg-[#78350F]/20" />
              <div className="absolute h-full w-[1px] bg-[#78350F]/20" />
            </div>

            <AnimatePresence mode="wait">
              {pin === CORRECT_PIN ? (
                <motion.div 
                  key="unlocked"
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center z-10 flex flex-col items-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                    className="w-14 h-14 bg-pink-100 border-2 border-pink-400 rounded-full flex items-center justify-center text-pink-500 shadow-md"
                  >
                    <Heart className="w-7 h-7 fill-pink-500" />
                  </motion.div>
                  <p className="text-[#78350F] font-bold text-xs tracking-widest uppercase mt-4 animate-pulse">
                    PHOTO CAPTURED!
                  </p>
                  <p className="text-[10px] text-pink-600 font-bold mt-0.5 font-handwriting">
                    Unlocking Secrets...
                  </p>
                </motion.div>
              ) : (
                <div key="entering" className="flex flex-col items-center z-10">
                  <div className="flex gap-2.5 mb-6">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={i < pin.length ? { scale: [1, 1.25, 1] } : {}}
                        transition={{ duration: 0.15 }}
                      >
                        <Heart
                          className={`w-5 h-5 transition-all ${
                            i < pin.length
                              ? "text-pink-500 fill-pink-500 drop-shadow-sm"
                              : "text-[#78350F]/15 fill-transparent"
                          }`}
                        />
                      </motion.div>
                    ))}
                  </div>
                  <div className={`text-[10px] tracking-widest uppercase font-bold text-center ${error ? "text-red-500 animate-bounce" : "text-amber-800/70"}`}>
                    {error ? "EXPOSURE FAILED" : "READY FOR COMMENCEMENT"}
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Polaroid bottom caption space */}
          <div className="text-center mt-5">
            <h1 className="text-xl font-bold tracking-widest text-[#78350F] font-handwriting">
              SECRET HIDEAWAY
            </h1>
            <p className="text-[9px] text-[#473228]/60 mt-1 uppercase tracking-wider font-mono">
              Enter Commencement Date (DDMMYY)
            </p>
          </div>
        </motion.div>
      </div>

      {/* Camera UI Keys */}
      <div className="z-10 w-full max-w-[300px] mt-8 grid grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleKeyPress(String(num))}
            className="h-11 bg-[#FCFBF7] hover:bg-[#FCEBEF] rounded-xl border-2 border-[#78350F] font-extrabold text-[#473228] shadow-[3px_3px_0px_rgba(120,53,15,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(120,53,15,1)] cursor-pointer text-sm"
          >
            {num}
          </button>
        ))}

        <button
          onClick={handleBackspace}
          className="h-11 bg-[#FFF1F2] hover:bg-pink-100 rounded-xl border-2 border-[#78350F] font-bold text-pink-700 shadow-[3px_3px_0px_rgba(120,53,15,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(120,53,15,1)] cursor-pointer text-[10px] uppercase"
        >
          DEL
        </button>

        <button
          onClick={() => handleKeyPress("0")}
          className="h-11 bg-[#FCFBF7] hover:bg-[#FCEBEF] rounded-xl border-2 border-[#78350F] font-extrabold text-[#473228] shadow-[3px_3px_0px_rgba(120,53,15,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(120,53,15,1)] cursor-pointer text-sm"
        >
          0
        </button>

        {/* Audio Mute toggle on Password Gate screen */}
        <button
          onClick={toggleMute}
          className="h-11 bg-[#FCFBF7] hover:bg-[#FCEBEF] rounded-xl border-2 border-[#78350F] text-amber-700 shadow-[3px_3px_0px_rgba(120,53,15,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(120,53,15,1)] cursor-pointer flex items-center justify-center"
        >
          {muted ? <VolumeX className="w-5 h-5 text-gray-500" /> : <Volume2 className="w-5 h-5 text-pink-500 animate-bounce" />}
        </button>
      </div>
    </div>
  );
}
