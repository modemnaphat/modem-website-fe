"use client";

// Lib
import React from "react";

// Include in Project
import { Skeleton } from "@/app/components/shared";

const ToolsSkeletonSection: React.FC = () => {
  return (
    <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-6 w-full">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-48 rounded-2xl" />
      ))}
    </div>
  );
};

export default ToolsSkeletonSection;