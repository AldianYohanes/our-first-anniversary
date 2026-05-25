"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SoundManager } from "../utils/SoundManager";
import { Trophy, HelpCircle, ArrowLeftRight } from "lucide-react";

interface BreadMinigameProps {
  onWin: () => void;
}

interface GameObject {
  x: number;
  y: number;
  type: "bread" | "cat" | "heart" | "cloud";
  speed: number;
  width: number;
  height: number;
  rotation: number;
  rotSpeed: number;
}

export default function BreadMinigame({ onWin }: BreadMinigameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [instruction, setInstruction] = useState(true);

  const WIN_SCORE = 100;
  const basketWidth = 70;
  const basketHeight = 20;

  const basketXRef = useRef(150);

  useEffect(() => {
    if (!isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      if (containerRef.current && canvas) {
        canvas.width = containerRef.current.clientWidth;
        canvas.height = 360;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    let animationId: number;
    let spawnTimer = 0;
    let gameObjects: GameObject[] = [];

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      basketXRef.current = Math.max(basketWidth / 2, Math.min(canvas.width - basketWidth / 2, clientX));
    };

    canvas.addEventListener("pointermove", handlePointerMove);

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches[0].clientX - rect.left;
        basketXRef.current = Math.max(basketWidth / 2, Math.min(canvas.width - basketWidth / 2, clientX));
      }
    };
    canvas.addEventListener("touchmove", handleTouchMove);

    const drawCloud = (c: CanvasRenderingContext2D, x: number, y: number) => {
      c.beginPath();
      c.arc(x, y, 12, Math.PI * 0.5, Math.PI * 1.5);
      c.arc(x + 10, y - 8, 12, Math.PI * 1.0, Math.PI * 1.85);
      c.arc(x + 22, y - 5, 12, Math.PI * 1.3, Math.PI * 2.0);
      c.arc(x + 28, y + 2, 12, Math.PI * 1.5, Math.PI * 0.5);
      c.closePath();
      c.fillStyle = "#A1A1AA";
      c.fill();
    };

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      c.beginPath();
      c.moveTo(x, y + size / 4);
      c.quadraticCurveTo(x, y, x - size / 2, y);
      c.quadraticCurveTo(x - size, y, x - size, y + size / 2);
      c.quadraticCurveTo(x - size, y + size * 0.75, x, y + size);
      c.quadraticCurveTo(x + size, y + size * 0.75, x + size, y + size / 2);
      c.quadraticCurveTo(x + size, y, x + size / 2, y);
      c.quadraticCurveTo(x, y, x, y + size / 4);
      c.closePath();
      c.fillStyle = "#F472B6";
      c.fill();
    };

    const drawCat = (c: CanvasRenderingContext2D, x: number, y: number) => {
      c.beginPath();
      c.arc(x, y, 14, 0, Math.PI * 2);
      c.fillStyle = "#FDBA74";
      c.fill();

      c.beginPath();
      c.moveTo(x - 12, y - 6);
      c.lineTo(x - 16, y - 18);
      c.lineTo(x - 4, y - 12);
      c.closePath();
      c.fillStyle = "#F97316";
      c.fill();

      c.beginPath();
      c.moveTo(x + 12, y - 6);
      c.lineTo(x + 16, y - 18);
      c.lineTo(x + 4, y - 12);
      c.closePath();
      c.fillStyle = "#F97316";
      c.fill();

      c.fillStyle = "#473228";
      c.beginPath();
      c.arc(x - 5, y - 2, 2, 0, Math.PI * 2);
      c.arc(x + 5, y - 2, 2, 0, Math.PI * 2);
      c.fill();

      c.fillStyle = "#F43F5E";
      c.beginPath();
      c.arc(x, y + 2, 1.5, 0, Math.PI * 2);
      c.fill();
    };

    const drawBread = (c: CanvasRenderingContext2D, x: number, y: number) => {
      c.beginPath();
      c.roundRect(x - 15, y - 10, 30, 20, 5);
      c.fillStyle = "#F59E0B";
      c.fill();
      
      c.strokeStyle = "#78350F";
      c.lineWidth = 2;
      c.stroke();

      c.strokeStyle = "#FFFFFF";
      c.lineWidth = 1.5;
      c.beginPath();
      c.moveTo(x - 8, y - 5);
      c.lineTo(x - 4, y + 5);
      c.moveTo(x, y - 5);
      c.lineTo(x + 4, y + 5);
      c.moveTo(x + 8, y - 5);
      c.lineTo(x + 12, y + 5);
      c.stroke();
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.setLineDash([6, 6]);
      ctx.strokeStyle = "#D9C3B0";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 40);
      ctx.lineTo(canvas.width, canvas.height - 40);
      ctx.stroke();
      ctx.setLineDash([]);

      spawnTimer++;
      if (spawnTimer > 45) {
        spawnTimer = 0;
        const types: GameObject["type"][] = ["bread", "bread", "cat", "heart", "cloud"];
        const chosenType = types[Math.floor(Math.random() * types.length)];
        
        gameObjects.push({
          x: Math.random() * (canvas.width - 40) + 20,
          y: 0,
          type: chosenType,
          speed: Math.random() * 1.5 + 2.2,
          width: 30,
          height: 30,
          rotation: Math.random() * Math.PI,
          rotSpeed: (Math.random() - 0.5) * 0.05
        });
      }

      gameObjects.forEach((obj, idx) => {
        obj.y += obj.speed;
        obj.rotation += obj.rotSpeed;

        const bX = basketXRef.current;
        const bY = canvas.height - 40;

        if (
          obj.y + obj.height / 2 >= bY - basketHeight / 2 &&
          obj.y - obj.height / 2 <= bY + basketHeight / 2 &&
          obj.x >= bX - basketWidth / 2 - 10 &&
          obj.x <= bX + basketWidth / 2 + 10
        ) {
          gameObjects.splice(idx, 1);
          
          if (obj.type === "bread") {
            SoundManager.playPop();
            setScore((prev) => {
              const newScore = prev + 15;
              if (newScore >= WIN_SCORE) triggerWin();
              return newScore;
            });
          } else if (obj.type === "cat") {
            SoundManager.playSuccess();
            setScore((prev) => {
              const newScore = prev + 25;
              if (newScore >= WIN_SCORE) triggerWin();
              return newScore;
            });
          } else if (obj.type === "heart") {
            SoundManager.playPop();
            setScore((prev) => {
              const newScore = prev + 10;
              if (newScore >= WIN_SCORE) triggerWin();
              return newScore;
            });
          } else if (obj.type === "cloud") {
            SoundManager.playDodgeFail();
            setScore((prev) => Math.max(0, prev - 20));
          }
          return;
        }

        if (obj.y > canvas.height + 20) {
          gameObjects.splice(idx, 1);
          return;
        }

        ctx.save();
        ctx.translate(obj.x, obj.y);
        ctx.rotate(obj.rotation);
        if (obj.type === "bread") {
          drawBread(ctx, 0, 0);
        } else if (obj.type === "cat") {
          drawCat(ctx, 0, 0);
        } else if (obj.type === "heart") {
          drawHeart(ctx, 0, -6, 12);
        } else if (obj.type === "cloud") {
          drawCloud(ctx, -14, 0);
        }
        ctx.restore();
      });

      const bX = basketXRef.current;
      const bY = canvas.height - 40;

      ctx.beginPath();
      ctx.roundRect(bX - basketWidth / 2, bY - basketHeight / 2, basketWidth, basketHeight, 6);
      ctx.fillStyle = "#A78BFA"; // Soft cozy lavender/purple basket
      ctx.fill();
      ctx.strokeStyle = "#78350F";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.strokeStyle = "#473228";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(bX - basketWidth / 4, bY - basketHeight / 2);
      ctx.lineTo(bX - basketWidth / 4, bY + basketHeight / 2);
      ctx.moveTo(bX, bY - basketHeight / 2);
      ctx.lineTo(bX, bY + basketHeight / 2);
      ctx.moveTo(bX + basketWidth / 4, bY - basketHeight / 2);
      ctx.lineTo(bX + basketWidth / 4, bY + basketHeight / 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(bX, bY + basketHeight / 2 - 3, 6, 0, Math.PI);
      ctx.strokeStyle = "#78350F";
      ctx.lineWidth = 2;
      ctx.stroke();

      if (isPlaying) {
        animationId = requestAnimationFrame(update);
      }
    };

    const triggerWin = () => {
      setIsPlaying(false);
      setGameOver(true);
      cancelAnimationFrame(animationId);
      setTimeout(() => {
        onWin();
      }, 1500);
    };

    update();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      if (canvas) {
        canvas.removeEventListener("pointermove", handlePointerMove);
        canvas.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [isPlaying]);

  const startGame = () => {
    SoundManager.playChime();
    setScore(0);
    setInstruction(false);
    setIsPlaying(true);
    setGameOver(false);
  };

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#FAF6EE]/80 backdrop-blur-sm p-4 select-none text-[#473228]">
      <div 
        ref={containerRef}
        className="w-full max-w-lg bg-[#FCFBF7] border-3 double border-[#78350F] shadow-lg rounded-3xl p-6 relative overflow-hidden flex flex-col items-center"
      >
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#FCEBEF] rounded-full filter blur-2xl opacity-40" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#EAE6F3] rounded-full filter blur-2xl opacity-40" />

        {/* Header HUD */}
        <div className="w-full flex items-center justify-between border-b-2 border-dashed border-amber-200 pb-3 mb-4 z-10 font-sans">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-600 fill-current animate-bounce" />
            <span className="text-[#78350F] font-bold text-xs tracking-wider uppercase font-mono">BREAD CATCHER</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-amber-800/80 font-bold font-mono">TARGET: {WIN_SCORE} pts</span>
          </div>
        </div>

        {/* Score indicator */}
        <div className="flex flex-col items-center mb-2 z-10 font-sans">
          <div className="text-sm font-bold text-[#78350F]">Cia's Mood Barometer</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-3xl font-extrabold text-gray-800 font-mono tracking-tight">{score}</span>
            <span className="text-gray-400 text-sm font-bold">/ {WIN_SCORE} pts</span>
          </div>
          
          <div className="w-64 h-3.5 bg-amber-50 rounded-full mt-2 overflow-hidden border-2 border-[#78350F] shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 to-[#818CF8] rounded-full"
              style={{ width: `${Math.min(100, (score / WIN_SCORE) * 100)}%` }}
              layout
            />
          </div>
        </div>

        {/* Canvas game screen wrapper */}
        <div className="relative w-full h-[360px] bg-[#FAF6EE] rounded-2xl overflow-hidden border-2 border-[#78350F] shadow-inner flex items-center justify-center cursor-none">
          <AnimatePresence mode="wait">
            {instruction ? (
              <motion.div
                key="inst"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center p-6 text-center z-20 absolute inset-0 bg-[#FCFBF7]/95"
              >
                <div className="w-14 h-14 bg-[#FCEBEF] border-2 border-[#78350F] rounded-full flex items-center justify-center text-pink-500 mb-4 shadow-sm">
                  <ArrowLeftRight className="w-6 h-6 animate-pulse" />
                </div>
                
                <h3 className="text-base font-bold text-gray-800">Catch the Warm Breads!</h3>
                <p className="text-xs text-gray-500 mt-2 max-w-[280px] leading-relaxed font-sans">
                  Cia brought you some delicious warm breads to cheer you up. Move your basket left and right to catch them!
                </p>

                <div className="flex flex-col gap-2 mt-4 text-[10px] text-amber-800 bg-[#FAF6EE] border border-amber-200 p-3 rounded-xl font-mono text-left w-full max-w-[280px]">
                  <p className="flex items-center gap-1.5 font-bold">🍞 **Bread**: +15 Points</p>
                  <p className="flex items-center gap-1.5 font-bold">🐱 **Orange Cat**: +25 Points (Cute bonus!)</p>
                  <p className="flex items-center gap-1.5 font-bold text-red-700">☁️ **Storm Cloud**: -20 Points (Avoid!)</p>
                </div>

                <button
                  onClick={startGame}
                  className="mt-6 px-6 py-2.5 rounded-full border-2 border-[#78350F] bg-[#FAF6EE] hover:bg-[#FCEBEF] text-[#473228] font-bold text-xs tracking-wider shadow-sm active:scale-95 transition-all cursor-pointer uppercase font-sans"
                >
                  START CATCHING!
                </button>
              </motion.div>
            ) : gameOver ? (
              <motion.div
                key="victory"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center z-20 absolute inset-0 bg-[#FCFBF7]/95 p-6"
              >
                <motion.div
                  animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="w-14 h-14 bg-pink-100 border-2 border-pink-400 rounded-full flex items-center justify-center text-pink-600 mb-4 shadow-sm"
                >
                  <Trophy className="w-6 h-6 fill-current" />
                </motion.div>
                <h3 className="text-lg font-bold text-pink-700">Legendary Catch!</h3>
                <p className="text-xs text-gray-500 mt-2 max-w-[280px] leading-relaxed font-sans">
                  Cia's heart is completely full! You realized she loves and genuinely cares for you...
                </p>
                <p className="text-xs font-semibold text-purple-600 mt-3 animate-pulse font-sans">
                  Initiating confession scene...
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <canvas ref={canvasRef} className="w-full h-full block bg-[#FAF6EE]" />
        </div>

        <div className="w-full flex items-center justify-center gap-2 mt-4 text-[10px] text-amber-800/60 font-bold font-mono">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>DRAG MOUSE OR SLIDE ON SCREEN TO MOVE BASKET</span>
        </div>
      </div>
    </div>
  );
}
