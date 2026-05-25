"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SoundManager } from "../utils/SoundManager";
import { Heart, Footprints, ChevronRight, HelpCircle } from "lucide-react";
import { CiaAvatar, HanAvatar } from "./RetroVisualNovel";

interface SunsetWalkProps {
  onWin: () => void;
}

interface WalkStep {
  percent: number;
  speaker: "Han" | "Cia" | "Narrator";
  expression?: "normal" | "happy" | "dancing" | "shy" | "angry";
  text: string;
  scenery: string; // Emoji sticker showing progress
}

export default function SunsetWalk({ onWin }: SunsetWalkProps) {
  const [stepPercent, setStepPercent] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const WALK_STEPS: Record<number, WalkStep> = {
    0: {
      percent: 0,
      speaker: "Narrator",
      text: "A peaceful evening walk after a long day of study and work. Tapping 'Take a Step' advances our walk along the sunset campus path...",
      scenery: "🏫",
    },
    10: {
      percent: 10,
      speaker: "Cia",
      expression: "normal",
      text: "Han, med school has been so exhausting lately... the thick textbooks are endlessss likeee thiisss... 📚",
      scenery: "🍂",
    },
    20: {
      percent: 20,
      speaker: "Han",
      expression: "shy",
      text: "I know, Cia. You've been studying so hard. Do you want to stop by the medical clinic gate and feed the orange cat? 🐱",
      scenery: "🐱",
    },
    30: {
      percent: 30,
      speaker: "Cia",
      expression: "happy",
      text: "YESS! The campus kitties are my absolute cure! Look at them sleeping under the bush! yawww~ 🌸",
      scenery: "🌸",
    },
    40: {
      percent: 40,
      speaker: "Han",
      expression: "happy",
      text: "Haha, you are literally a golden retriever when you pet cats. You start dancing and singing!",
      scenery: "🐕",
    },
    50: {
      percent: 50,
      speaker: "Cia",
      expression: "dancing",
      text: "Hmph, both of us are clingy golden retrievers! Don't try to deny it, my wandering drink seller! pototoaiii~ ❤️",
      scenery: "✨",
    },
    60: {
      percent: 60,
      speaker: "Han",
      expression: "shy",
      text: "True, I can't deny it. By the way... thank you for always staying next to me, Cia. Your calm mature nature helps me so much.",
      scenery: "🌅",
    },
    70: {
      percent: 70,
      speaker: "Cia",
      expression: "shy",
      text: "Of course, Han! I love accompanying you. Even when we are just eating together or walking silently... it feels complete.",
      scenery: "🏡",
    },
    80: {
      percent: 80,
      speaker: "Han",
      expression: "normal",
      text: "No matter how chaotic the world gets, I promise to stay quietly together through everything. Stable and loving.",
      scenery: "💖",
    },
    90: {
      percent: 90,
      speaker: "Cia",
      expression: "happy",
      text: "Yawwww... that is a promise. And tomorrow, we must eat sushi together to celebrate! 🍣",
      scenery: "🍣",
    },
    100: {
      percent: 100,
      speaker: "Narrator",
      text: "We reached the wooden bench under the periwinkle sakura tree. The warm sunset glow fills the path with a deep, homey peace. We sit together silently...",
      scenery: "🌳",
    },
  };

  const handleTakeStep = () => {
    if (isDone) return;

    SoundManager.playClack();
    const nextPercent = stepPercent + 10;
    
    if (nextPercent >= 100) {
      setIsDone(true);
      SoundManager.playSuccess();
      setTimeout(() => {
        onWin();
      }, 2000);
    } else {
      setStepPercent(nextPercent);
      if (nextPercent % 30 === 0) {
        SoundManager.playPop();
      }
    }
  };

  const currentStep = WALK_STEPS[stepPercent];

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-between bg-[#1a1c2c] p-6 select-none overflow-hidden text-[#f4e4bc]">
      
      {/* Pixel Art Parallax Background */}
      <div className="absolute inset-0 z-0">
        {/* Layer 1: Sky - Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#4a3a60] via-[#8d5b78] to-[#f08573]" />
        
        {/* Layer 2: Sun - Distant */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-10 top-10 w-24 h-24 rounded-full bg-[#fce085] shadow-[0_0_40px_10px_rgba(252,224,133,0.5)]"
        />

        {/* Layer 3: Distant Buildings/Silhouette */}
        <motion.div
          className="absolute bottom-16 left-0 right-0 h-40 bg-gradient-to-t from-[#2a2a3a] to-transparent opacity-80"
          animate={{ x: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Layer 4: Foreground Trees/Path Elements */}
        <div className="absolute bottom-0 w-full h-32 bg-[#2d3a3a] border-t-4 border-[#1a2a2a]" />
      </div>

      {/* Header HUD */}
      <div className="w-full flex flex-col items-center text-center mt-4 z-10">
        <h2 className="text-xl font-bold tracking-widest font-mono text-[#fce085]">
          SUNSET WALK
        </h2>
      </div>

      {/* Footprint progress bar */}
      <div className="w-full max-w-md bg-[#2d3a3a]/80 border-2 border-[#fce085] p-3 rounded-2xl shadow-sm z-10 flex flex-col items-center gap-1.5 font-mono">
        <div className="flex justify-between w-full text-[10px] font-bold text-[#fce085]/80 uppercase">
          <span>START</span>
          <span>BENCH</span>
        </div>
        
        <div className="relative w-full h-4 bg-[#1a2a2a] rounded-full border border-[#fce085] overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#f08573] to-[#8d5b78] rounded-full"
            style={{ width: `${stepPercent}%` }}
            layout
          />
          {/* Scrolling scenery sticker inside progress bar */}
          <span 
            className="absolute top-1/2 -translate-y-1/2 text-xs transition-all duration-300"
            style={{ left: `calc(${stepPercent}% - 8px)` }}
          >
            {currentStep.scenery}
          </span>
        </div>
      </div>

      {/* Dynamic Animated Character Sprite Area */}
      <div className="relative w-full max-w-2xl mx-auto flex items-end justify-center px-4 h-48 z-10 pointer-events-none mb-4">
        {/* Han on the left */}
        <motion.div
          animate={
            stepPercent > 0 && stepPercent < 100
              ? { x: [-2, 2, -2], y: [0, -3, 0] }
              : { y: [0, -1, 0] }
          }
          transition={{ repeat: Infinity, duration: 0.6 }}
          className="mr-6"
        >
          <HanAvatar 
            expression={currentStep.speaker === "Han" ? (currentStep.expression as any) || "normal" : "normal"} 
            className="w-36 h-36" 
          />
        </motion.div>

        {/* Cia on the right */}
        <motion.div
          animate={
            stepPercent > 0 && stepPercent < 100
              ? { x: [2, -2, 2], y: [-3, 0, -3] }
              : { y: [0, -1, 0] }
          }
          transition={{ repeat: Infinity, duration: 0.6, delay: 0.1 }}
          className="ml-6"
        >
          <CiaAvatar 
            expression={currentStep.speaker === "Cia" ? currentStep.expression || "normal" : "normal"} 
            className="w-36 h-36" 
          />
        </motion.div>
      </div>

      {/* Dialogue block displaying mature conversation */}
      <div className="w-full max-w-lg bg-[#FCFBF7] border-3 double border-[#78350F] p-5 rounded-3xl shadow-md min-h-[110px] flex flex-col justify-between z-10">
        <div className="relative font-bold">
          {/* Speaker Tag */}
          {currentStep.speaker !== "Narrator" && (
            <div className="absolute -top-9 -left-1 flex items-center">
              <span className={`px-4 py-0.5 text-[10px] tracking-wider rounded-full border-2 font-sans ${
                currentStep.speaker === "Cia" 
                  ? "bg-[#FCEBEF] border-pink-400 text-pink-800" 
                  : "bg-[#E0E7FF] border-[#818CF8] text-[#3730A3]"
              }`}>
                {currentStep.speaker}
              </span>
            </div>
          )}
          
          <motion.p
            key={stepPercent}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-xs md:text-sm font-medium leading-relaxed font-sans ${
              currentStep.speaker === "Narrator" ? "italic text-amber-900/90 font-serif" : "text-[#473228]"
            }`}
          >
            {currentStep.speaker === "Narrator" ? currentStep.text : `“${currentStep.text}”`}
          </motion.p>
        </div>

        <div className="flex items-center justify-between border-t border-amber-100 pt-2 mt-3 text-[9px] font-bold text-amber-800/60 font-mono">
          <span>ANNIVERSARY SUNSET WALK</span>
          <span>{stepPercent}% COMPLETE</span>
        </div>
      </div>

      {/* Step advance footprints button */}
      <div className="flex flex-col items-center gap-2 mb-6 z-10 font-sans">
        <AnimatePresence mode="wait">
          {stepPercent === 100 ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-xs font-bold text-pink-600 animate-pulse bg-[#FCEBEF] border border-pink-200 py-1.5 px-4 rounded-full shadow-sm"
            >
              Quiet walking complete... Sitting on the bench... ❤️
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTakeStep}
              className="px-6 py-3 rounded-full border-3 double border-[#78350F] bg-[#FCFBF7] hover:bg-[#FCEBEF] text-[#473228] font-bold text-xs tracking-wider shadow-sm flex items-center gap-1.5 cursor-pointer uppercase"
            >
              <Footprints className="w-5 h-5 text-amber-700 animate-bounce" />
              <span>TAKE A STEP FORWARD</span>
            </motion.button>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-1 mt-1 text-[9px] text-gray-400 font-bold font-mono tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>CLICK FOOTPRINTS TO WALK ALONG THE CAMPUS PATHWAY</span>
        </div>
      </div>
    </div>
  );
}
