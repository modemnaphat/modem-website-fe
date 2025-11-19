"use client";

// Lib
import React, { useState } from "react";

// Include in Project
import { Skills } from "@/app/utils/types";

const SkillsSection: React.FC = () => {
  const [skills, setSkills] = useState<Skills>([]);
  return (
    <div className={`flex flex-col items-center w-full`}>
      <h2 className={`text-6xl`}>Skills</h2>

      <div className={`w-full border border-blue-500`}>SLIDE SECTION</div>
    </div>
  );
};

export default SkillsSection;
