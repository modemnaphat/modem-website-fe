"use client";

import React, { useCallback, useRef, useState } from "react";
import { Tool } from "@/app/utils/types";

type Props = {
  tool: Tool;
  index: number;
  shouldAnimate: boolean;
};

const ToolCard: React.FC<Props> = ({ tool, index, shouldAnimate }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isFlipped) return;
      const card = cardRef.current;
      const glow = glowRef.current;
      if (!card || !glow) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(168,85,247,0.25) 0%, transparent 60%)`;
      glow.style.opacity = "1";
    },
    [isFlipped]
  );

  const handleMouseLeave = useCallback(() => {
    if (isFlipped) return;
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    card.style.transform =
      "perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    glow.style.opacity = "0";
  }, [isFlipped]);

  const handleClick = useCallback(() => {
    // Reset tilt transform before flipping
    if (cardRef.current) {
      cardRef.current.style.transform = "";
    }
    if (glowRef.current) {
      glowRef.current.style.opacity = "0";
    }
    setIsFlipped((prev) => !prev);
  }, []);

  return (
    <div
      className={`
        opacity-0
        ${shouldAnimate ? "animate-tool-enter" : ""}
      `}
      style={{
        perspective: "600px",
        animationDelay: shouldAnimate ? `${index * 0.08}s` : undefined,
        animationFillMode: "forwards",
      }}
    >
      <div
        className={`
          relative w-full h-48 cursor-pointer
          transition-transform duration-500
          ${isFlipped ? "tool-flip-active" : ""}
        `}
        style={{ transformStyle: "preserve-3d" }}
        onClick={handleClick}
      >
        {/* ── Front face ── */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`
            group absolute inset-0
            bg-white/5 rounded-2xl p-6 max-md:p-2
            flex flex-col items-center justify-center gap-4
            border border-white/10
            tool-card
          `}
          style={{
            backfaceVisibility: "hidden",
            transition:
              "transform 0.2s ease-out, border-color 0.3s, background-color 0.3s, box-shadow 0.3s",
            willChange: "transform",
          }}
        >
          {/* Cursor-following glow */}
          <div
            ref={glowRef}
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-0"
            style={{ transition: "opacity 0.3s ease" }}
          />

          {/* Animated border glow on hover */}
          <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none tool-border-glow" />

          {tool.iconUrl ? (
            <div className="relative w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center p-2 overflow-hidden">
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 tool-icon-ripple" />
              <img
                src={tool.iconUrl}
                alt={tool.name}
                className="relative w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          ) : (
            <div className="w-16 h-16 bg-gray-700 rounded-lg" />
          )}

          <p className="text-white text-center transition-colors duration-300 group-hover:text-purple-200 line-clamp-1 text-sm font-medium">
            {tool.name}
          </p>

          {/* Gradient overlay */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-linear-to-br from-purple-500/5 to-transparent" />
        </div>

        {/* ── Back face ── */}
        <div
          className="absolute inset-0 rounded-2xl bg-[#1a1a2e] border border-purple-500/30 flex flex-col items-center justify-center gap-4 p-4"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {tool.iconUrl ? (
            <img
              src={tool.iconUrl}
              alt={tool.name}
              className="w-20 h-20 object-contain drop-shadow-[0_0_12px_rgba(168,85,247,0.4)]"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-700 rounded-lg" />
          )}
          <p className="text-purple-200 text-center font-semibold text-base">
            {tool.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
