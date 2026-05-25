"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronRight, CornerDownLeft } from "lucide-react";
import { SoundManager } from "../utils/SoundManager";

// Animated SVG Avatars with striped collar shirts for Cia and coffee hoodie for Han
// Floating emoji effects configuration based on character expressions
const expressionEmojis: Record<string, string[]> = {
  dancing: ["💖", "🎵", "✨", "🎵"],
  happy: ["❤️", "🌸", "✨", "❤️"],
  shy: ["🌸", "💕", "🌸"],
  angry: ["💢", "☁️", "💢"],
  surprised: ["❗", "💡", "❓"],
};

export const CiaAvatar = ({ expression = "normal", className = "w-36 h-36" }) => {
  const emojis = expressionEmojis[expression] || [];

  return (
    <motion.div
      className={`relative ${className}`}
      animate={
        expression === "dancing"
          ? { y: [0, -10, 0], rotate: [0, 3, -3, 0] }
          : expression === "shy"
          ? { scale: 0.98, y: 2 }
          : expression === "angry"
          ? { x: [-2, 2, -2, 2, 0] }
          : { y: [0, -2, 0] }
      }
      transition={
        expression === "dancing"
          ? { repeat: Infinity, duration: 0.6, ease: "easeInOut" }
          : expression === "normal"
          ? { repeat: Infinity, duration: 4, ease: "easeInOut" }
          : {}
      }
    >
      {/* Floating Emojis Overlay */}
      <div className="absolute inset-x-0 -top-8 h-0 overflow-visible pointer-events-none z-30">
        <AnimatePresence>
          {emojis.map((emoji, idx) => (
            <motion.div
              key={`${expression}-${idx}`}
              className="absolute text-lg filter drop-shadow-sm"
              initial={{ opacity: 0, y: 15, scale: 0.5 }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: [-5, -60],
                x: [0, (idx % 2 === 0 ? 12 : -12)],
                scale: [0.6, 1.2, 1.2, 0.7],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: idx * 0.45,
                ease: "easeOut",
              }}
              style={{
                left: `${20 + idx * 25}%`,
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="ciaHair" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#43435C" />
            <stop offset="100%" stopColor="#22222E" />
          </linearGradient>
          <linearGradient id="ciaSkin" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF2EC" />
            <stop offset="100%" stopColor="#FFE5D9" />
          </linearGradient>
          <linearGradient id="ciaShirt" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
          <radialGradient id="ciaBlush">
            <stop offset="0%" stopColor="#F472B6" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#F472B6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Hair Back */}
        <path d="M20 70 C20 20, 100 20, 100 70 C100 95, 95 110, 95 110 C95 110, 25 110, 20 70 Z" fill="url(#ciaHair)" />
        
        {/* Neck with Shadow */}
        <path d="M48 82 L72 82 L66 100 L54 100 Z" fill="#ECC0AE" />
        
        {/* Face */}
        <ellipse cx="60" cy="65" rx="35" ry="32" fill="url(#ciaSkin)" />
        
        {/* Hair Front / Bangs */}
        <path d="M22 60 C22 25, 98 25, 98 60 C98 50, 90 40, 60 42 C30 40, 22 50, 22 60 Z" fill="url(#ciaHair)" />
        
        {/* Soft side strands */}
        <path d="M23 58 C20 70, 20 90, 25 95 C26 80, 28 65, 23 58 Z" fill="url(#ciaHair)" />
        <path d="M97 58 C100 70, 100 90, 95 95 C94 80, 92 65, 97 58 Z" fill="url(#ciaHair)" />

        {/* Hair Highlights / Shine */}
        <path d="M28 42 C40 33, 80 33, 92 42" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" fill="none" />

        {/* Cute Sakura Pink Hair Clip */}
        <motion.path
          d="M85 45 L95 48 L93 54 L83 51 Z"
          fill="#F472B6"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <circle cx="89" cy="49.5" r="3" fill="#FFF" />

        {/* Blushing cheeks */}
        <ellipse cx="38" cy="74" rx="7" ry="4.5" fill="url(#ciaBlush)" />
        <ellipse cx="82" cy="74" rx="7" ry="4.5" fill="url(#ciaBlush)" />

        {/* Eyes (Blinking animation) */}
        <AnimatePresence>
          {expression === "angry" ? (
            <path d="M34 68 L42 72 M86 68 L78 72" stroke="#2E2E3E" strokeWidth="3.5" strokeLinecap="round" />
          ) : expression === "happy" || expression === "dancing" ? (
            // Smiling eyes
            <path d="M32 72 Q40 64 44 72 M76 72 Q80 64 88 72" fill="none" stroke="#2E2E3E" strokeWidth="3.5" strokeLinecap="round" />
          ) : (
            // Normal blinking eyes
            <motion.g
              animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
              transition={{ repeat: Infinity, duration: 4.5, times: [0, 0.95, 0.97, 0.99, 1] }}
              style={{ originX: "60px", originY: "70px" }}
            >
              {/* Left Eye */}
              <circle cx="40" cy="70" r="4.5" fill="#2E2E3E" />
              <circle cx="38.5" cy="68.5" r="1.5" fill="#FFF" />
              <circle cx="41.5" cy="68.5" r="0.8" fill="#FFF" opacity="0.7" />
              {/* Right Eye */}
              <circle cx="80" cy="70" r="4.5" fill="#2E2E3E" />
              <circle cx="78.5" cy="68.5" r="1.5" fill="#FFF" />
              <circle cx="81.5" cy="68.5" r="0.8" fill="#FFF" opacity="0.7" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Mouth */}
        {expression === "angry" ? (
          <path d="M55 82 Q60 76 65 82" fill="none" stroke="#2E2E3E" strokeWidth="3" strokeLinecap="round" />
        ) : expression === "happy" || expression === "dancing" ? (
          <path d="M54 78 Q60 88 66 78" fill="#F472B6" stroke="#2E2E3E" strokeWidth="2.5" strokeLinecap="round" />
        ) : expression === "shy" ? (
          <line x1="56" y1="78" x2="64" y2="78" stroke="#2E2E3E" strokeWidth="3" strokeLinecap="round" />
        ) : (
          // Sweet tiny smile
          <path d="M55 76 Q60 81 65 76" fill="none" stroke="#2E2E3E" strokeWidth="2.5" strokeLinecap="round" />
        )}

        {/* Clothes: White-Navy Striped Collar Shirt */}
        <path d="M30 96 C30 96, 35 120, 60 120 C85 120, 90 96, 90 96 Z" fill="url(#ciaShirt)" />
        {/* Navy stripes */}
        <path d="M35 102 C42 110, 78 110, 85 102" fill="none" stroke="#1E3A8A" strokeWidth="3" />
        <path d="M38 108 C45 116, 75 116, 82 108" fill="none" stroke="#1E3A8A" strokeWidth="3" />
        <path d="M43 114 C48 119, 72 119, 77 114" fill="none" stroke="#1E3A8A" strokeWidth="3.5" />
      </svg>
    </motion.div>
  );
};

export const HanAvatar = ({ expression = "normal", className = "w-36 h-36" }) => {
  // Let Han share similar floating emojis based on emotion
  const emojis = expressionEmojis[expression] || (expression === "surprised" ? ["💡", "❓"] : []);

  return (
    <motion.div
      className={`relative ${className}`}
      animate={
        expression === "shy"
          ? { scale: 0.98, y: 3, rotate: -2 }
          : expression === "surprised"
          ? { y: -8, scale: 1.02 }
          : { y: [0, 2, 0] }
      }
      transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
    >
      {/* Floating Emojis Overlay */}
      <div className="absolute inset-x-0 -top-8 h-0 overflow-visible pointer-events-none z-30">
        <AnimatePresence>
          {emojis.map((emoji, idx) => (
            <motion.div
              key={`${expression}-${idx}`}
              className="absolute text-lg filter drop-shadow-sm"
              initial={{ opacity: 0, y: 15, scale: 0.5 }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: [-5, -60],
                x: [0, (idx % 2 === 0 ? 12 : -12)],
                scale: [0.6, 1.2, 1.2, 0.7],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: idx * 0.45,
                ease: "easeOut",
              }}
              style={{
                left: `${20 + idx * 25}%`,
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="hanHair" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7B5E49" />
            <stop offset="100%" stopColor="#463529" />
          </linearGradient>
          <linearGradient id="hanSkin" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF8F4" />
            <stop offset="100%" stopColor="#FFEFE6" />
          </linearGradient>
          <linearGradient id="hanHoodie" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#81A38A" />
            <stop offset="100%" stopColor="#57705E" />
          </linearGradient>
          <radialGradient id="hanBlush">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Hair Back */}
        <path d="M22 68 C20 20, 100 20, 98 68 Z" fill="url(#hanHair)" />
        
        {/* Neck Shadow */}
        <path d="M48 80 L72 80 L66 98 L54 98 Z" fill="#EDD1C4" />
        
        {/* Face */}
        <ellipse cx="60" cy="65" rx="33" ry="31" fill="url(#hanSkin)" />
        
        {/* Hair Front / Messy Bangs */}
        <path d="M25 55 C35 30, 85 30, 95 55 C88 45, 80 40, 62 48 C50 42, 38 45, 25 55 Z" fill="url(#hanHair)" />
        {/* Extra spikes */}
        <path d="M40 32 L36 24 L48 29 Z" fill="url(#hanHair)" />
        <path d="M78 30 L82 22 L86 31 Z" fill="url(#hanHair)" />

        {/* Hair Highlight */}
        <path d="M32 45 C45 36, 75 36, 88 45" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.25" fill="none" />

        {/* Glasses */}
        <rect x="32" y="60" width="22" height="15" rx="4" fill="none" stroke="#1E293B" strokeWidth="3" />
        <rect x="66" y="60" width="22" height="15" rx="4" fill="none" stroke="#1E293B" strokeWidth="3" />
        <line x1="54" y1="67" x2="66" y2="67" stroke="#1E293B" strokeWidth="3" />
        <line x1="25" y1="65" x2="32" y2="65" stroke="#1E293B" strokeWidth="3" />
        <line x1="88" y1="65" x2="95" y2="65" stroke="#1E293B" strokeWidth="3" />
        
        {/* Glasses Shine / Reflection */}
        <path d="M34 62 L48 72" stroke="white" strokeWidth="1.5" opacity="0.35" strokeLinecap="round" />
        <path d="M68 62 L82 72" stroke="white" strokeWidth="1.5" opacity="0.35" strokeLinecap="round" />

        {/* Blushing cheeks */}
        <ellipse cx="38" cy="74" rx="5" ry="3.5" fill="url(#hanBlush)" />
        <ellipse cx="82" cy="74" rx="5" ry="3.5" fill="url(#hanBlush)" />

        {/* Eyes behind glasses */}
        <circle cx="43" cy="67" r="3.2" fill="#2E2E3E" />
        <circle cx="41.8" cy="65.8" r="1" fill="#FFF" />
        <circle cx="77" cy="67" r="3.2" fill="#2E2E3E" />
        <circle cx="75.8" cy="65.8" r="1" fill="#FFF" />

        {/* Mouth */}
        {expression === "shy" ? (
          <path d="M56 78 L64 78" stroke="#2E2E3E" strokeWidth="2.5" strokeLinecap="round" />
        ) : expression === "surprised" ? (
          <circle cx="60" cy="79" r="4.5" fill="none" stroke="#2E2E3E" strokeWidth="2.5" />
        ) : (
          // Happy cute smile
          <path d="M54 75 Q60 82 66 75" fill="none" stroke="#2E2E3E" strokeWidth="2.5" strokeLinecap="round" />
        )}

        {/* Clothes: Sage Green Hoodie with tiny coffee cup logo */}
        <path d="M32 94 C32 94, 38 120, 60 120 C82 120, 88 94, 88 94 Z" fill="#4B5563" /> {/* Outer fold */}
        <path d="M35 96 L60 108 L85 96 L78 120 L42 120 Z" fill="url(#hanHoodie)" /> {/* Sage Green Hoodie */}
        
        {/* Tiny Coffee Cup Logo */}
        <rect x="56" y="110" width="8" height="7" rx="1.5" fill="#FFF" />
        <path d="M64 111 C66 111, 66 114, 64 114" fill="none" stroke="#FFF" strokeWidth="1" />
      </svg>
    </motion.div>
  );
};

export interface DialogueLine {
  speaker: "Han" | "Cia" | "Narrator" | "System";
  text: string;
  expression?: "normal" | "happy" | "dancing" | "shy" | "angry" | "surprised";
  shake?: boolean;
  choices?: {
    text: string;
    nextId: number;
    triggerEffect?: () => void;
  }[];
  nextId?: number | null; // null triggers minigame or special event
}

interface RetroVisualNovelProps {
  dialogues: Record<number, DialogueLine>;
  startId: number;
  onNextChapter: () => void;
  bgImage?: string;
  speakerTitleColor?: Record<string, string>;
  children?: React.ReactNode;
}

export default function RetroVisualNovel({
  dialogues,
  startId,
  onNextChapter,
  bgImage,
  speakerTitleColor = {
    Han: "bg-[#E0E7FF] border-[#818CF8] text-[#3730A3]",
    Cia: "bg-[#FCEBEF] border-[#F472B6] text-[#9D174D]",
    Narrator: "bg-amber-50 border-[#D97706] text-[#78350F]",
    System: "bg-emerald-50 border-emerald-300 text-emerald-800",
  },
  children,
}: RetroVisualNovelProps) {
  const [currentId, setCurrentId] = useState(startId);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [shakeScreen, setShakeScreen] = useState(false);
  const typingTimerRef = useRef<any>(null);

  const currentLine = dialogues[currentId];

  // Run the typewriter effect when currentLine changes
  useEffect(() => {
    if (!currentLine) return;

    if (currentLine.shake) {
      setShakeScreen(true);
      setTimeout(() => setShakeScreen(false), 500);
    }

    setIsTyping(true);
    setTypedText("");
    let charIndex = 0;
    const fullText = currentLine.text;

    if (typingTimerRef.current) clearInterval(typingTimerRef.current);

    typingTimerRef.current = setInterval(() => {
      if (charIndex < fullText.length) {
        // Synthesize beep sound for character dialogue
        if (charIndex % 2 === 0 && currentLine.speaker !== "Narrator" && currentLine.speaker !== "System") {
          SoundManager.playTextBeep(currentLine.speaker);
        }
        // Slice string: 100% reliable compared to prev + char
        setTypedText(fullText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingTimerRef.current);
      }
    }, 28); // Standard readability speed

    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [currentId]);

  const handleSkipTyping = () => {
    if (isTyping) {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      setTypedText(currentLine.text);
      setIsTyping(false);
    }
  };

  const handleAdvance = () => {
    if (isTyping) {
      handleSkipTyping();
      return;
    }

    // If choices exist, force click choice
    if (currentLine.choices && currentLine.choices.length > 0) {
      return;
    }

    SoundManager.playClack();

    if (currentLine.nextId === null) {
      onNextChapter();
    } else if (currentLine.nextId !== undefined) {
      setCurrentId(currentLine.nextId);
    }
  };

  const handleChoiceClick = (choice: NonNullable<DialogueLine["choices"]>[number]) => {
    SoundManager.playChime();
    if (choice.triggerEffect) {
      choice.triggerEffect();
    }
    setCurrentId(choice.nextId);
  };

  // Keyboard shortcut: Space / Enter to advance dialogue
  // FIX: Using keyup instead of keydown is completely immune to Windows key-repeat dialogue skipping!
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleAdvance();
      }
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [isTyping, currentLine, currentId]);

  return (
    <motion.div
      animate={shakeScreen ? { x: [-15, 15, -10, 10, -5, 5, 0], y: [-15, 15, 10, -10, 5, -5, 0] } : {}}
      transition={{ duration: 0.4 }}
      className="relative flex flex-col h-full w-full justify-between items-center bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: "cover",
      }}
    >
      {/* Dynamic Ambient overlay gradient based on speaker */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6EE]/90 via-transparent to-transparent pointer-events-none" />

      {/* Children elements (minigames overlay) */}
      <div className="absolute inset-0 z-0">
        {children}
      </div>

      {/* Characters Sprite Area */}
      <div className="relative flex-1 w-full max-w-4xl mx-auto flex items-end justify-around px-8 pb-3 z-10 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {currentLine.speaker === "Han" && (
            <motion.div
              key="han-sprite"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className="flex flex-col items-center mr-auto"
            >
              <HanAvatar expression={currentLine.expression || "normal"} className="w-48 h-48 md:w-56 md:h-56" />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="popLayout">
          {currentLine.speaker === "Cia" && (
            <motion.div
              key="cia-sprite"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className="flex flex-col items-center ml-auto"
            >
              <CiaAvatar expression={currentLine.expression || "normal"} className="w-48 h-48 md:w-56 md:h-56" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dialogue and HUD Overlay Area */}
      <div className="relative w-full max-w-3xl mx-auto px-4 pb-6 z-20">
        
        {/* Choices container (floating scrapbook pages) */}
        <AnimatePresence>
          {currentLine.choices && currentLine.choices.length > 0 && !isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col gap-2.5 mb-4 max-w-md mx-auto w-full"
            >
              {currentLine.choices.map((choice, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleChoiceClick(choice)}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between px-5 py-3 rounded-2xl bg-[#FCFBF7] hover:bg-[#FCEBEF] border-2 border-[#78350F] text-[#473228] font-bold shadow-sm transition-all text-xs text-left cursor-pointer group font-sans"
                >
                  <span>{choice.text}</span>
                  <ChevronRight className="w-4 h-4 text-amber-700 group-hover:translate-x-1 transition-all" />
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Textbox container styled as handdrawn scrapbook panel */}
        <motion.div
          onClick={handleAdvance}
          className="relative bg-[#FCFBF7] border-3 double border-[#78350F] p-6 rounded-3xl shadow-lg flex flex-col min-h-[140px] cursor-pointer hover:border-pink-500/50 transition-colors"
        >
          {/* Speaker label tags */}
          {currentLine.speaker !== "Narrator" && currentLine.speaker !== "System" && (
            <div className="absolute -top-4 left-6 flex items-center shadow-sm">
              <span className={`px-5 py-1 text-xs font-bold uppercase tracking-wider rounded-full border-2 ${speakerTitleColor[currentLine.speaker]} font-sans`}>
                {currentLine.speaker}
              </span>
            </div>
          )}

          {/* Dialogue Text body */}
          <div className="flex-1 mt-1 text-[#473228] text-sm md:text-base leading-relaxed select-none font-bold font-sans">
            {currentLine.speaker === "System" ? (
              <span className="text-emerald-800 font-bold font-mono">{typedText}</span>
            ) : currentLine.speaker === "Narrator" ? (
              <span className="italic text-amber-900/90 font-serif font-medium">{typedText}</span>
            ) : (
              <span>{typedText}</span>
            )}

            {/* Pulsing continue arrow if done typing */}
            {!isTyping && (!currentLine.choices || currentLine.choices.length === 0) && (
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3], y: [0, 2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-flex items-center ml-1 text-pink-600 font-bold"
              >
                <Heart className="w-3.5 h-3.5 fill-current inline ml-1" />
              </motion.span>
            )}
          </div>

          {/* Prompt cues inside the text box footer */}
          <div className="flex items-center justify-between mt-3 text-[9px] font-bold text-amber-800/60 font-mono">
            <span>{isTyping ? "CLICK TO SKIP" : "CLICK / PRESS SPACE OR ENTER"}</span>
            <div className="flex items-center gap-1">
              <CornerDownLeft className="w-2.5 h-2.5 text-amber-700" />
              <span>ENTER</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
