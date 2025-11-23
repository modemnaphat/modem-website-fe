"use client";

// Lib
import React from "react";

// Include in Project
import { Skeleton } from "@/app/components/shared";

const SkeletonSection: React.FC = () => {
  return (
    <div className={`flex gap-4 items-center`}>
      {Array.from({ length: 13 }).map((_, index) => (
        <Skeleton
          key={index}
          className="w-20 h-20 rounded-full shrink-0"
        />
      ))}
    </div>
  );
};

export default SkeletonSection;
