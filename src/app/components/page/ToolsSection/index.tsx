"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePortfolio } from "@/app/hooks/api";
import ToolsSkeletonSection from "./skeleton";
import ToolCard from "./card";

const ToolsSection: React.FC = () => {
  const { data, isLoading } = usePortfolio();
  const tools = data?.tools;

  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "-25% 0px -50% 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isVisible && tools && tools.length > 0) {
      setShouldAnimate(true);
    }
  }, [isVisible, tools]);

  return (
    <div ref={sectionRef} className="w-full flex flex-col gap-12 mt-16">
      <div className="flex flex-col gap-2 items-center w-full">
        <h2 className="text-3xl font-bold text-white text-center">Tools</h2>
        <p className="text-white text-center">
          Tools that power <span className="text-purple-500">my</span>{" "}
          development
        </p>
      </div>

      {isLoading ? (
        <ToolsSkeletonSection />
      ) : (
        <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-6 w-full">
          {tools?.map((tool, index) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              index={index}
              shouldAnimate={shouldAnimate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ToolsSection;
