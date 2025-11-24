"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTools } from "@/app/hooks/api";
import ToolsSkeletonSection from "./skeleton";

const TechnicSkillSection: React.FC = () => {
  const { data: tools, isLoading } = useTools();

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
        rootMargin: "-25% 0px -50% 0px", // 50% from bottom
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // wait for visible and tools ready
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
            <div
              key={tool.id}
              className={`
              group relative
              bg-white/5 rounded-2xl p-6 h-48 max-md:p-2
              flex flex-col items-center justify-center gap-4
              border border-white/10
              transition-all duration-300 ease-out
              hover:bg-white/10 
              hover:border-white/20
              hover:-translate-y-1
              hover:shadow-lg hover:shadow-white/5
              cursor-default
              opacity-0
              ${shouldAnimate ? "animate-fade-in" : ""}
            `}
              style={{
                animationDelay: shouldAnimate ? `${index * 0.1}s` : undefined,
                animationFillMode: "forwards",
              }}
            >
              {tool.iconUrl ? (
                <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center p-2">
                  <img
                    src={tool.iconUrl}
                    alt={tool.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 bg-gray-700 rounded-lg" />
              )}

              <p className="text-white text-center transition-colors duration-300 group-hover:text-white/90 line-clamp-1">
                {tool.name}
              </p>

              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-linear-to-br from-white/5 to-transparent" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TechnicSkillSection;
