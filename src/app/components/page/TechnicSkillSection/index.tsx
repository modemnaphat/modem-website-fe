"use client";

// Lib
import React from "react";

// Include in Project
import { useTechSkills } from "@/app/hooks/api";
import Box from "./box";
import TechnicSkillSkeletonSection from "./skeleton";
import { techSkill } from "@/app/utils/types";

const TechnicSkillSection: React.FC = () => {
  const { data: techSkills, isLoading } = useTechSkills();

  return (
    <div className="w-full flex flex-col gap-12 mt-16">
      <div className="flex flex-col gap-2 items-center w-full">
        <h2 className="text-3xl font-bold text-white text-center">
          Technical Skills
        </h2>
        <p className="text-white text-center">
          Essential web development skills I apply in my project.
        </p>
      </div>

      {isLoading ? (
        <TechnicSkillSkeletonSection />
      ) : (
          <Box data={techSkills || []} />
      )}
    </div>
  );
};

export default TechnicSkillSection;
