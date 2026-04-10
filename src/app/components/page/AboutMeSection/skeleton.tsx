"use client";

// Lib
import React from "react";

// Include in Project
import { Skeleton } from "@/app/components/shared";

const SkeletonSection: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* macOS Window */}
      <div className="rounded-xl overflow-hidden border border-gray-700 bg-[#1e1e2e] shadow-2xl">
        {/* Title Bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#181825] border-b border-gray-700">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-3 text-gray-400 text-sm font-mono">about-me.tsx</span>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-2 max-md:grid-cols-1">
          {/* Left - Image Skeleton */}
          <div className="flex items-center justify-center p-6 max-md:p-4 border-r border-gray-700 max-md:border-r-0 max-md:border-b">
            <Skeleton className="w-full max-w-[380px] aspect-4/3 rounded-lg" />
          </div>

          {/* Right - Code Editor Skeleton */}
          <div className="p-5 max-md:p-4 flex flex-col gap-3">
            <Skeleton className="h-4 w-2/5 rounded" />
            <Skeleton className="h-4 w-3/5 rounded" />
            <Skeleton className="h-4 w-1/2 rounded" />
            <Skeleton className="h-4 w-2/3 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonSection;
