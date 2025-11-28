"use client";

// Lib
import React, { useEffect, useRef, useState } from "react";

// Include in Project
import { useProjects } from "@/app/hooks/api";
import ProjectContainer from "./ProjectContainer";
import SkeletonSection from "./skeleton";

const ProjectSection: React.FC = () => {
  const { data, isLoading } = useProjects();

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
    if (isVisible && data && data.length > 0) {
      setShouldAnimate(true);
    }
  }, [isVisible, data]);

  return (
    <div
      ref={sectionRef}
      className={`w-full flex flex-col gap-12 mt-16 transition-all duration-1000 ${
        shouldAnimate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="flex flex-col gap-2 items-center w-full">
        <h2 className="text-3xl font-bold text-white text-center">Projects</h2>
        <p className="text-white text-center">
          My <span className="text-amber-500">journey</span> through projects
          I've built and contributed to.
        </p>
      </div>

      {isLoading ? (
        <SkeletonSection shouldAnimate={shouldAnimate} />
      ) : (
        <ProjectContainer data={data || []} shouldAnimate={shouldAnimate} />
      )}
    </div>
  );
};

export default ProjectSection;
