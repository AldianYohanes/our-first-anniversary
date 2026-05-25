"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SoundManager } from "../utils/SoundManager";
import { BookOpen, Coffee, Sparkles, Heart, ChevronRight } from "lucide-react";
import { CiaAvatar } from "./RetroVisualNovel";

interface CafeInteractProps {
  onWin: () => void;
}

interface CafeItem {
  id: string;
  name: string;
  emoji: string;
  type: "favorite" | "tease" | "neutral";
  dialogue: string;
  expression: "happy" | "dancing" | "shy" | "angry" | "normal";
}

interface ScrapbookPage {
  title: string;
  date: string;
  desc: string;
  note: string;
  image: string;
}

export default function CafeInteract({ onWin }: CafeInteractProps) {
  const [itemsFed, setItemsFed] = useState<string[]>([]);
  const [activeDialogue, setActiveDialogue] = useState(
    "Han, let's have a cozy cafe date together! Feed me something! yawww~",
  );
  const [ciaExpression, setCiaExpression] = useState<
    "normal" | "happy" | "dancing" | "shy" | "angry"
  >("normal");
  const [showScrapbook, setShowScrapbook] = useState(false);
  const [scrapbookPage, setScrapbookPage] = useState(0);

  const CAFE_ITEMS: CafeItem[] = [
    {
      id: "sushi",
      name: "Fresh Sushi",
      emoji: "🍣",
      type: "favorite",
      dialogue:
        "Sushiiiiiiiiiiii so yummyyyy, pototoaiiiii! My absolute favorrrrite! 🍣❤️",
      expression: "dancing",
    },
    {
      id: "coffee",
      name: "Warm Coffee",
      emoji: "☕",
      type: "favorite",
      dialogue:
        "Warm coffeeyy makes me feel so cozyyy... instantly reminds me of you, Han! ☕✨",
      expression: "shy",
    },
    {
      id: "cat",
      name: "Campus Cat",
      emoji: "🐱",
      type: "favorite",
      dialogue:
        "Ohhhh a cute campus kitty! Let me pet it and feed it, so soft! 🐱❤️",
      expression: "happy",
    },
    {
      id: "seventeen",
      name: "SEVENTEEN CD",
      emoji: "🎵",
      type: "favorite",
      dialogue: "SEVENTEEN!! Aju Niceee! Let's dance and sing together! 🎵💃",
      expression: "dancing",
    },
    {
      id: "bridgerton",
      name: "Bridgerton CD",
      emoji: "🎬",
      type: "neutral",
      dialogue:
        "Bridgerton! Such a magical, elegant, and romantic story... luxury vibes! 🎬👑",
      expression: "happy",
    },
    {
      id: "exes",
      name: "Han's Exes List",
      emoji: "📝",
      type: "tease",
      dialogue:
        "Pototoaiiii! Why are you bringing this up?! Are you trying to tease me? Hmph! 😤",
      expression: "angry",
    },
  ];

  const SCRAPBOOK_PAGES: ScrapbookPage[] = [
    {
      title: "How We First Met",
      date: "Late 2024",
      desc: "Met at Adhyatmaka Catholic college community. Han was carrying around a bag of drinks acting like a weird drink seller. Cia thought: 'What a weird guy...'",
      note: "Han's note: You seemed so calm and mature, entirely different from anyone else. You made the room feel beautiful.",
      image: "1.jpeg",
    },
    {
      title: "The Magic of Bread",
      date: "24 May 2025",
      desc: "(Ih gak ada fotonyaa) Han was sulking. But Cia, being the caring and thoughtful soul she is, brought him bread so he wouldn't stay mad at her. That caring touch made Han realize he was completely in love.",
      note: "Cia's texting style: 'Noooo stayyyy madddd, hereeee isss someee breadeeeee pototoaiii! 🍞'",
      image: "croissant.avif",
    },
    {
      title: "Gedung R 12th Floor",
      date: "Late 2025",
      desc: "Cia accompanied Han while he worked late in his massive, empty 12th-floor office at Gedung R FTI. Her quiet presence made the massive cold office feel like home.",
      note: "Han's note: I used to hate working in that big empty office, but you made it alive. I wanted you in my future right then.",
      image: "bobo.jpeg",
    },
    {
      title: "Our Golden Retriever Dynamic",
      date: "Every Single Day",
      desc: "Two golden retrievers running around! Warm, clingy, physically affectionate, emotionally comforting, quietly healing. We tease, eat, walk, and support each other through low moments.",
      note: "Hopes: To stay quietly together, through broke days and rich days. Standing strong, always.",
      image: "duo.jpeg",
    },
  ];

  const handleFeedItem = (item: CafeItem) => {
    if (showScrapbook) return;

    if (item.type === "favorite") {
      SoundManager.playSuccess();
      if (!itemsFed.includes(item.id)) {
        setItemsFed((prev) => [...prev, item.id]);
      }
    } else if (item.type === "tease") {
      SoundManager.playDodgeFail();
    } else {
      SoundManager.playChime();
    }

    setActiveDialogue(item.dialogue);
    setCiaExpression(item.expression);

    if (item.expression !== "angry") {
      setTimeout(() => {
        setCiaExpression("normal");
      }, 3500);
    }
  };

  const handleNextPage = () => {
    SoundManager.playClack();
    if (scrapbookPage < SCRAPBOOK_PAGES.length - 1) {
      setScrapbookPage(scrapbookPage + 1);
    } else {
      setShowScrapbook(false);
      onWin();
    }
  };

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-radial from-[#FAF6EE] via-[#EAE6F3] to-[#FCEBEF] p-4 select-none overflow-hidden text-[#473228]">
      {ciaExpression === "dancing" && (
        <div className="absolute inset-0 pointer-events-none z-30">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-400 text-2xl"
              style={{
                left: 30 + Math.random() * 40 + "%",
                top: 50 + Math.random() * 20 + "%",
              }}
              animate={{
                y: [0, -150],
                x: [0, Math.random() * 60 - 30],
                scale: [0, 1.4, 0],
                rotate: [0, Math.random() * 90 - 45],
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          ))}
        </div>
      )}

      {ciaExpression === "angry" && (
        <div className="absolute inset-0 pointer-events-none z-30">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-blue-400 text-xl font-bold"
              style={{
                left: 45 + Math.random() * 10 + "%",
                top: 35 + Math.random() * 5 + "%",
              }}
              animate={{
                y: [0, 50],
                x: [0, Math.random() * 20 - 10],
                opacity: [1, 0],
              }}
              transition={{ duration: 0.8, ease: "easeIn" }}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {!showScrapbook ? (
          <motion.div
            key="feed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-xl bg-[#FCFBF7] border-3 double border-[#78350F] shadow-lg rounded-3xl p-6 flex flex-col items-center relative"
          >
            {/* Cafe Date header */}
            <div className="w-full flex items-center justify-between border-b-2 border-dashed border-amber-200 pb-3 mb-4 font-sans">
              <h2 className="text-base font-bold text-gray-800 tracking-wide flex items-center gap-1.5">
                <Coffee className="w-5 h-5 text-amber-700" />
                <span>Cozy Café Date with Cia</span>
              </h2>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold font-mono text-amber-700">
                  CIA'S HAPPINESS: {itemsFed.length} / 3
                </span>
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Heart
                      key={i}
                      className={`w-4 h-4 ${
                        i < itemsFed.length
                          ? "text-pink-500 fill-pink-500 animate-pulse"
                          : "text-gray-250 border-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Avatar Sprite display */}
            <div className="relative w-full h-44 bg-[#FAF6EE] rounded-2xl border-2 border-[#78350F] shadow-inner flex items-center justify-center overflow-hidden mb-4">
              <div
                className="absolute inset-0 opacity-10 bg-repeat bg-[radial-gradient(#78350f_1.5px,transparent_1.5px)]"
                style={{ backgroundSize: "16px 16px" }}
              />
              <CiaAvatar
                expression={ciaExpression}
                className="w-40 h-40 mt-4 z-10"
              />

              <div className="absolute bottom-0 w-full h-8 bg-amber-900 border-t-2 border-[#78350F] z-20 flex items-center justify-center shadow-md">
                <span className="text-[10px] text-amber-200 font-bold font-mono uppercase tracking-widest">
                  CAFÉ DESK
                </span>
              </div>
            </div>

            {/* Speech bubble dialogue */}
            <div className="relative w-full bg-[#FCFBF7] border-2 border-[#78350F] px-5 py-3.5 rounded-2xl min-h-[76px] mb-5 text-[#473228] font-bold text-xs md:text-sm leading-relaxed text-center font-sans flex items-center justify-center shadow-inner">
              <span>“{activeDialogue}”</span>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2.5 w-4 h-4 bg-[#FCFBF7] border-l-2 border-t-2 border-[#78350F] rotate-45" />
            </div>

            {/* Cafe inventory choices */}
            <div className="w-full font-sans">
              <p className="text-[9px] text-amber-800/60 font-bold font-mono tracking-widest text-center mb-2.5 uppercase">
                GIVE ITEMS ON THE TABLE
              </p>

              <div className="grid grid-cols-3 gap-2.5">
                {CAFE_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleFeedItem(item)}
                    className="flex flex-col items-center justify-center p-3.5 rounded-xl border-2 border-[#78350F] bg-[#FCFBF7] hover:bg-[#FCEBEF] shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer text-center group"
                  >
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      {item.emoji}
                    </span>
                    <span className="text-[9px] text-gray-700 font-bold mt-1.5 group-hover:text-pink-700 font-mono uppercase tracking-wider">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Next Milestone unlock prompt */}
            {itemsFed.length >= 3 && (
              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => {
                  SoundManager.playSuccess();
                  setShowScrapbook(true);
                }}
                className="mt-6 w-full py-3 rounded-full border-3 double border-[#78350F] bg-[#FCFBF7] hover:bg-[#FCEBEF] text-[#473228] font-bold text-xs tracking-wider shadow-md active:scale-95 transition-all cursor-pointer uppercase flex items-center justify-center gap-1.5 font-sans"
              >
                <span>OPEN SCRAPBOOK MEMORIES</span>
                <ChevronRight className="w-4 h-4 animate-ping" />
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="scrapbook"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-xl bg-[#FAF6EE] border-3 double border-[#78350F] shadow-lg rounded-3xl p-6 flex flex-col items-center relative overflow-hidden font-sans text-[#473228]"
          >
            <div
              className="absolute inset-0 bg-repeat bg-[radial-gradient(#78350f_0.5px,transparent_0.5px)] opacity-5 pointer-events-none"
              style={{ backgroundSize: "12px 16px" }}
            />

            {/* Scrapbook Header */}
            <div className="w-full flex items-center justify-between border-b-2 border-dashed border-amber-800/20 pb-3 mb-5 z-10 font-sans">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-800" />
                <span className="font-extrabold text-[#78350F] tracking-wide">
                  Our Polaroid Scrapbook
                </span>
              </div>
              <span className="text-[9px] font-bold font-mono text-[#78350F] bg-amber-50 px-2 py-0.5 rounded border border-[#78350F] uppercase tracking-widest">
                PAGE {scrapbookPage + 1} / 4
              </span>
            </div>

            {/* Polaroid frame card */}
            <motion.div
              key={scrapbookPage}
              initial={{ rotate: -5, opacity: 0, scale: 0.9 }}
              animate={{
                rotate: scrapbookPage % 2 === 0 ? 1 : -2,
                opacity: 1,
                scale: 1,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
              className="w-full max-w-[340px] bg-[#FCFBF7] border-2 border-[#78350F] p-4 pb-8 rounded-lg shadow-md flex flex-col items-center z-10"
            >
              {/* Polaroid Photo */}
              <div className="w-full aspect-[4/3] bg-gradient-to-tr from-[#FAF6EE] to-[#FCEBEF] rounded border-2 border-[#78350F] relative shadow-inner overflow-hidden">
                <img
                  src={SCRAPBOOK_PAGES[scrapbookPage].image}
                  alt={SCRAPBOOK_PAGES[scrapbookPage].title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 right-2 text-[8px] font-bold text-white/60 font-mono tracking-widest uppercase drop-shadow">
                  POLAROID PHOTO
                </span>
              </div>

              {/* Title */}
              <div className="w-full text-center mt-4">
                <h3 className="font-bold text-base text-[#78350F] tracking-tight">
                  {SCRAPBOOK_PAGES[scrapbookPage].title}
                </h3>
                <span className="text-[9px] text-gray-500 font-bold font-mono uppercase tracking-wider block mt-0.5">
                  {SCRAPBOOK_PAGES[scrapbookPage].date}
                </span>
              </div>
            </motion.div>

            {/* Narrative details */}
            <div className="w-full mt-6 space-y-3 z-10 font-sans">
              <div className="bg-[#FCFBF7] border-2 border-[#78350F] p-4 rounded-2xl text-xs md:text-sm font-medium leading-relaxed text-[#473228]">
                <p>{SCRAPBOOK_PAGES[scrapbookPage].desc}</p>
              </div>

              <div className="bg-[#FAF6EE] border border-amber-300 p-3 rounded-2xl text-xs font-bold text-amber-900 space-y-1">
                <p className="font-mono text-[9px] tracking-wider text-amber-800">
                  ✨ SECRET DETAILS:
                </p>
                <p className="italic font-handwriting text-sm">
                  “{SCRAPBOOK_PAGES[scrapbookPage].note}”
                </p>
              </div>
            </div>

            {/* Clingy dynamic scale */}
            {scrapbookPage === 3 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="w-full bg-[#FCEBEF]/70 border-2 border-[#78350F] p-3.5 rounded-2xl mt-3 text-xs space-y-2 z-10 font-sans text-[#473228]"
              >
                <p className="font-mono text-[9px] font-bold text-pink-700 tracking-widest text-center uppercase">
                  OUR COMPATIBILITY METRICS
                </p>
                <div className="space-y-1.5">
                  <div>
                    <div className="flex justify-between font-bold font-mono text-[8px] text-gray-650">
                      <span>HAN CLINGINESS: 100% (RETRIEVER)</span>
                      <span>CIA CLINGINESS: 100% (RETRIEVER)</span>
                    </div>
                    <div className="w-full h-2.5 bg-amber-50 rounded-full overflow-hidden border border-[#78350F]">
                      <div
                        className="h-full bg-pink-400"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-bold font-mono text-[8px] text-gray-655">
                      <span>STUBBORNNESS: BOTH 100% SOMETIMES</span>
                      <span>ROMANCE: DOUBLE CHAOTIC 100%</span>
                    </div>
                    <div className="w-full h-2.5 bg-amber-50 rounded-full overflow-hidden border border-[#78350F]">
                      <div
                        className="h-full bg-indigo-400"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <button
              onClick={handleNextPage}
              className="mt-6 px-8 py-3 rounded-full border-3 double border-[#78350F] bg-[#FCFBF7] hover:bg-[#FCEBEF] text-[#473228] font-bold text-xs tracking-wider shadow-md active:scale-95 transition-all cursor-pointer uppercase flex items-center justify-center gap-1.5 z-10"
            >
              <span>
                {scrapbookPage < SCRAPBOOK_PAGES.length - 1
                  ? "FLIP SCRAPBOOK PAGE"
                  : "FINISH DATE & CLOSE"}
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
