"use client";

// Lib
import React from "react";

// Include in Project
import { useSkills } from "@/app/hooks/api";
import LogoSlide from "./main";
import SkeletonSection from "./skeleton";

const SkillsSection: React.FC = () => {
  const { data: skills, isLoading } = useSkills();

  return (
    <div className="w-full flex flex-col gap-12 mt-16">
      <div className="flex flex-col gap-2 items-center w-full">
        <h2 className="text-3xl font-bold text-white text-center">Tech Stack</h2>
        <p className="text-white text-center">
          My <span className="text-emerald-500">Tech Stack</span>: Frameworks, Libraries, and Programming Languages
        </p>
      </div>

      {isLoading ? <SkeletonSection /> : <LogoSlide skills={skills || []} />}
    </div>
  );
};

export default SkillsSection;
