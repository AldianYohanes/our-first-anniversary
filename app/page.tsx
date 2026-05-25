"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PasswordGate from "../components/PasswordGate";
import RetroVisualNovel, { DialogueLine } from "../components/RetroVisualNovel";
import BreadMinigame from "../components/BreadMinigame";
import FlashlightOffice from "../components/FlashlightOffice";
import CafeInteract from "../components/CafeInteract";
import SunsetWalk from "../components/SunsetWalk";
import RainyHealing from "../components/RainyHealing";
import FinalLetter from "../components/FinalLetter";
import { Heart } from "lucide-react";

export default function Home() {
  const [chapter, setChapter] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleUnlock = () => {
    setChapter(1);
  };

  const PROLOGUE_DIALOGUES: Record<number, DialogueLine> = {
    1: {
      speaker: "Narrator",
      text: "Late 2024. The Adhyatmaka Catholic college community room. The afternoon sun filters warmly through the tall glass window, casting long shadows across piles of old board games and dusty desks. Faint chatter drifts from the hallway, but inside, Han is doing something quite peculiar...",
      nextId: 2,
    },
    2: {
      speaker: "Han",
      expression: "shy",
      text: "Umm... hello! Nice to meet you! Would you like to buy a cold tea? 🍵 Only 5,000 rupiahs, fresh from my backpack! It's still cold, I promise! Haha!",
      choices: [
        {
          text: "“Hey... want to buy a cold tea? 🍵” (Act like a weird backpack drink seller)",
          nextId: 3,
        },
        {
          text: "“Hello! Nice to meet you, I'm Han! 👋” (Try to act extremely polite to cover the awkwardness)",
          nextId: 4,
        },
      ],
    },
    3: {
      speaker: "Cia",
      expression: "normal",
      text: "Hehe... a drink seller inside a community room? What a weird guy... but I respect the hustle. Are they actually cold?",
      nextId: 5,
    },
    4: {
      speaker: "Cia",
      expression: "normal",
      text: "Hello, Han! Selling tea out of a backpack? That's certainly the most unique greeting I've had today! Are you fundraising for the community?",
      nextId: 5,
    },
    5: {
      speaker: "Narrator",
      text: "Han's first impression of Cia: 'An ordinary, quiet student?' But she was soft-spoken, incredibly polite, and mature. Unlike others who ignored his quirky backpack store, she engaged with a gentle, grounding smile that made him feel instantly welcome.",
      nextId: 6,
    },
    6: {
      speaker: "Cia",
      expression: "happy",
      text: "You are funny! I will buy a bottle of tea. I'm Cia, by the way. Nice to meet you, Han! yawww~",
      nextId: 7,
    },
    7: {
      speaker: "Han",
      expression: "normal",
      text: "Nice to meet you too, Cia! (Wow, she has such a beautiful, peaceful personality... and she's a med student!) Thank you for supporting my backpack business!",
      nextId: 8,
    },
    8: {
      speaker: "Narrator",
      text: "They sat and talked for an hour, sharing stories about medical anatomy exams and programming bugs. Little did they know, their warm, slightly chaotic journey of quiet support was about to begin...",
      nextId: 9,
    },
    9: {
      speaker: "System",
      text: "Next Chapter: The Warmth of Bread. Cia brings Han bread so he won't be mad. (Click to continue)",
      nextId: null,
    },
  };

  const CONFESSION_DIALOGUES: Record<number, DialogueLine> = {
    20: {
      speaker: "Narrator",
      text: "May 24, 2025. One day before they officially dated. Han was sitting in the corner of the student room, sulking about a stressful week of failed compilation errors and worries about the future. The room was quiet, save for his quiet sighs.",
      nextId: 21,
    },
    21: {
      speaker: "Cia",
      expression: "happy",
      text: "Noooo stayyyy madddd, hereeee isss someee breadeeeee so you won't pout anymore! Pototoaiii! 🍞 I bought it from the bakery near campus because I know you haven't eaten.",
      nextId: 22,
    },
    22: {
      speaker: "Han",
      expression: "surprised",
      text: "Wait... you brought me bread? Just because you noticed I was quiet and didn't want me to stay upset? You actually walked all the way there just for me...",
      nextId: 23,
    },
    23: {
      speaker: "Narrator",
      text: "Han looked at the warm bread. In that simple, caring gesture, he realized she saw past his defense mechanisms. She was mature, responsible, and possessed a grounded, loving soul that cared for people and animals alike.",
      nextId: 24,
    },
    24: {
      speaker: "Han",
      expression: "shy",
      text: "Cia... I realized how much you care about me, even through my silly moods and insecurities. You make me want to be a better person. I want to stay by your side and protect you. Will you be my girlfriend?",
      nextId: 25,
    },
    25: {
      speaker: "Cia",
      expression: "shy",
      text: "Yawwwww... of course, Han! I've been hoping you'd ask. Let's walk this path together, peacefully but chaotic at the same time. ❤️",
      nextId: 26,
    },
    26: {
      speaker: "System",
      text: "Dating Officially Commenced: 25 May 2025. Entering Chapter 3: Gedung R 12th Floor Office. (Click to continue)",
      nextId: null,
    },
  };

  const FTI_OFFICE_DIALOGUES: Record<number, DialogueLine> = {
    40: {
      speaker: "Narrator",
      text: "Late 2025. The massive, empty office on the 12th floor of Gedung R FTI. Outside, the night skyline of the city flickered. Inside, the room was vast, cold, and quiet, except for the monotonous hum of server stacks and the clicking of Han's keyboard.",
      nextId: 41,
    },
    41: {
      speaker: "Han",
      expression: "normal",
      text: "It was always so quiet and isolating working late here. Only coffee mugs and lines of code for company. But then, the heavy glass door clicked open, and she stepped in carrying her heavy study bags...",
      nextId: 42,
    },
    42: {
      speaker: "Cia",
      expression: "normal",
      text: "Hey Han! I brought some thick anatomy textbooks and pharmacology notes. Mind if I sit at the corner desk next to you? We can study together.",
      nextId: 43,
    },
    43: {
      speaker: "Narrator",
      text: "Cia sat quietly, pages of her medical textbooks turning softly in the dim light. Her peaceful, grounding presence slowly filled the cold, massive office room, transforming it from a lonely workspace into a cozy, warm sanctuary.",
      nextId: 44,
    },
    44: {
      speaker: "Han",
      expression: "happy",
      text: "Her quiet presence made me feel emotionally safe. I didn't need to entertain her; just having her study next to me made me feel whole. I knew then I wanted this quiet peace in my future forever.",
      nextId: 45,
    },
    45: {
      speaker: "Cia",
      expression: "happy",
      text: "Yawww, it's cozy here. Even when we study in silence, it feels like we are two clingy golden retrievers keeping each other warm in a cold room. Pototoaiii! 🐕❤️",
      nextId: 46,
    },
    46: {
      speaker: "System",
      text: "Next Chapter: The Golden Retrievers. Experience a Cafe date and flip through their memories. (Click to continue)",
      nextId: null,
    },
  };

  const STORM_DIALOGUES: Record<number, DialogueLine> = {
    60: {
      speaker: "Narrator",
      text: "But a relationship is not just cozy dates and quiet office nights. In late 2025, Han hit one of the lowest periods of his life, financially struggling, broke, and consumed by deep anxiety about his future and life direction.",
      nextId: 61,
    },
    61: {
      speaker: "Han",
      expression: "shy",
      text: "I was struggling, feeling lost, and filled with fears that I wouldn't be able to provide the stable, happy future you deserved... I felt so inadequate.",
      nextId: 62,
    },
    62: {
      speaker: "Cia",
      expression: "normal",
      text: "Han, look at me. It doesn't matter if you are broke right now. I love you, and we will face the world together properly. We build our future step by step, as partners.",
      nextId: 63,
    },
    63: {
      speaker: "Narrator",
      text: "Cia's mature, composed, and emotionally intelligent reaction anchored him. She did not panic or judge; she simply sat beside him, offering a quiet, healing presence that calmed his deepest storms.",
      nextId: 64,
    },
    64: {
      speaker: "Cia",
      expression: "happy",
      text: "We are team golden retrievers, remember? We don't run away when it rains. We hold hands and weather the storm together. Yawww~ ❤️",
      nextId: 65,
    },
    65: {
      speaker: "Han",
      expression: "happy",
      text: "Her unwavering support made me realize I wasn't alone. With Cia by my side, I felt strong enough to face whatever challenges lay ahead.",
      nextId: 66,
    },
    66: {
      speaker: "System",
      text: "Next Chapter: Weathering The Storm. Hold hands to clear the rain. (Click to continue)",
      nextId: null,
    },
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#FAF6EE]">
        <div className="flex flex-col items-center gap-4">
          <Heart className="w-12 h-12 text-pink-400 fill-pink-400 animate-pulse" />
          <span className="text-xs font-bold font-mono text-[#78350F] tracking-widest uppercase animate-bounce">
            LOADING SECRETS...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#FAF6EE] text-[#473228]">
      <AnimatePresence mode="wait">
        
        {/* Chapter 0: Password Gate */}
        {chapter === 0 && (
          <motion.div
            key="chapter-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-10"
          >
            <PasswordGate onUnlock={handleUnlock} />
          </motion.div>
        )}

        {/* Chapter 1: Prologue Dialogue */}
        {chapter === 1 && (
          <motion.div
            key="chapter-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10"
          >
            <RetroVisualNovel
              dialogues={PROLOGUE_DIALOGUES}
              startId={1}
              onNextChapter={() => setChapter(2)}
              bgImage="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop" 
            />
          </motion.div>
        )}

        {/* Chapter 2: Bread Catching */}
        {chapter === 2 && (
          <motion.div
            key="chapter-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10"
          >
            <BreadMinigame onWin={() => setChapter(3)} />
          </motion.div>
        )}

        {/* Chapter 3: Confession Dialogue */}
        {chapter === 3 && (
          <motion.div
            key="chapter-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10"
          >
            <RetroVisualNovel
              dialogues={CONFESSION_DIALOGUES}
              startId={20}
              onNextChapter={() => setChapter(4)}
              bgImage="https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=1000&auto=format&fit=crop"
            />
          </motion.div>
        )}

        {/* Chapter 4: Flashlight Office */}
        {chapter === 4 && (
          <motion.div
            key="chapter-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10"
          >
            <FlashlightOffice onWin={() => setChapter(5)} />
          </motion.div>
        )}

        {/* Chapter 5: Office Post-exploration Dialogue */}
        {chapter === 5 && (
          <motion.div
            key="chapter-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10"
          >
            <RetroVisualNovel
              dialogues={FTI_OFFICE_DIALOGUES}
              startId={40}
              onNextChapter={() => setChapter(6)}
              bgImage="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop"
            />
          </motion.div>
        )}

        {/* Chapter 6: Cafe Dining & Scrapbook Date */}
        {chapter === 6 && (
          <motion.div
            key="chapter-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10"
          >
            <CafeInteract onWin={() => setChapter(7)} />
          </motion.div>
        )}

        {/* Chapter 7: NEW Sunset Campus Walk Minigame */}
        {chapter === 7 && (
          <motion.div
            key="chapter-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10"
          >
            <SunsetWalk onWin={() => setChapter(8)} />
          </motion.div>
        )}

        {/* Chapter 8: Rainy Struggle Dialogue Intro */}
        {chapter === 8 && (
          <motion.div
            key="chapter-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10"
          >
            <RetroVisualNovel
              dialogues={STORM_DIALOGUES}
              startId={60}
              onNextChapter={() => setChapter(9)}
              bgImage="https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?q=80&w=1000&auto=format&fit=crop"
            />
          </motion.div>
        )}

        {/* Chapter 9: Rainy Handholding Healing */}
        {chapter === 9 && (
          <motion.div
            key="chapter-9"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10"
          >
            <RainyHealing onWin={() => setChapter(10)} />
          </motion.div>
        )}

        {/* Chapter 10: Epilogue Love Letter & Anniversary Clock */}
        {chapter === 10 && (
          <motion.div
            key="chapter-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-10"
          >
            <FinalLetter />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
