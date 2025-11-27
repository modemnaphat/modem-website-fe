"use client";

// Lib
import React from "react";

// Include in Project
import { Skeleton } from "@/app/components/shared";

const SkeletonSection: React.FC = () => {
  return (
    <div className="grid grid-cols-2 w-full gap-4 max-md:grid-cols-1">
      <div className="flex items-center justify-center p-4">
        <Skeleton className="w-full max-w-[400px] h-[275px] rounded-lg max-lg:h-[220px] max-md:h-[170px]" />
      </div>
      
      <div className="p-4 flex flex-col gap-2">
        <Skeleton className="h-8 w-3/4 rounded-lg" />
        <Skeleton className="h-6 w-1/3 rounded-lg mt-1" />
        
        <div className="flex flex-col gap-2 mt-2">
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-4/5 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonSection;