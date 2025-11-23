"use client";

// Lib
import React from "react";

// Include in Project
import { Skeleton } from "@/app/components/shared";

const TechnicSkillSkeletonSection: React.FC = () => {
  return (
    <div
      className={`grid grid-cols-2 grid-rows-2 gap-8 w-full max-md:grid-cols-1 max-md:grid-rows-auto`}
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className={`flex items-center gap-4`}>
          <Skeleton className="w-20 h-20 rounded-sm" />
          <div className={`flex flex-col gap-2`}>
            <Skeleton className="w-80 h-4 rounded-sm max-lg:w-56 max-md:w-48" />
            <Skeleton className="w-80 h-4 rounded-sm max-lg:w-56 max-md:w-48" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TechnicSkillSkeletonSection;
