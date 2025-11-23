"use client";

// Lib
import React, { useEffect, useRef } from "react";
import Image from "next/image";

// Include in Project
import { Skill } from "@/app/utils/types";

type Props = {
  skills: Skill[];
};

const LogoSlide: React.FC<Props> = ({ skills }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const isHovered = useRef(false);
  const scrollAmountRef = useRef(0);

  const scrollLoop = () => {
    if (!scrollRef.current || isHovered.current) {
      animationFrameId.current = requestAnimationFrame(scrollLoop);
      return;
    }

    scrollAmountRef.current += 0.5; // Adjust speed of scrolling here
    if (scrollAmountRef.current >= scrollRef.current.scrollWidth / 2) {
      scrollAmountRef.current = 0;
    }

    scrollRef.current.scrollLeft = scrollAmountRef.current;
    animationFrameId.current = requestAnimationFrame(scrollLoop);
  };

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(scrollLoop);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    isHovered.current = true;
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
  };

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={scrollRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`flex items-center gap-4 overflow-x-auto overflow-y-visible hide-scrollbar`}
      >
        {[...skills, ...skills].map((ele, index) => (
          <div
            key={index}
            className="shrink-0 w-20 h-20 rounded-full bg-white flex items-center justify-center p-2"
          >
            <Image
              src={ele.iconUrl ? ele.iconUrl : "/modem-gry.svg"}
              alt={`${ele.name} image`}
              loading="lazy"
              className="w-[50px] h-[50px] object-contain select-none"
              width={50}
              height={50}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoSlide;
