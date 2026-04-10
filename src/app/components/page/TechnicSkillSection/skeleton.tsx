"use client";

// Lib
import React from "react";

// Include in Project
import { Skeleton } from "@/app/components/shared";

const TechnicSkillSkeletonSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 max-w-2xl mx-auto gap-8 w-full">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-8 max-md:flex-col max-md:gap-4"
        >
          <Skeleton className="w-60 h-[135px] rounded-sm shrink-0 max-md:w-full" />
          <div className="flex flex-col gap-2 max-md:items-center w-full">
            <Skeleton className="w-40 h-6 rounded-sm" />
            <Skeleton className="w-full h-4 rounded-sm" />
            <Skeleton className="w-3/4 h-4 rounded-sm" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TechnicSkillSkeletonSection;
