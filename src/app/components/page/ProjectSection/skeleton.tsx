"use client";

// Lib
import React from "react";

// Include in Project
import { Skeleton } from "@/app/components/shared";

type Props = {
  shouldAnimate?: boolean;
};

const SkeletonSection: React.FC<Props> = ({ shouldAnimate = true }) => {
  return (
    <div className="flex flex-col gap-8">
      {/* สร้าง 3 skeleton cards */}
      {Array.from({ length: 1 }).map((_, index) => (
        <div
          key={index}
          className={`grid grid-cols-2 gap-4 max-md:grid-cols-1 transition-all duration-700 ${
            shouldAnimate
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: `${index * 150}ms` }}
        >
          <Skeleton className="w-full h-[334px] rounded-lg" />

          <div className="flex flex-col justify-center gap-2">
            <Skeleton className="h-10 w-3/4 rounded-lg" />

            <div className="flex flex-col gap-2 mt-2">
              <Skeleton className="h-4 w-full rounded-full" />
              <Skeleton className="h-4 w-full rounded-full" />
              <Skeleton className="h-4 w-4/5 rounded-full" />
            </div>

            <Skeleton className="h-5 w-20 rounded-lg mt-2" />

            <div className="flex items-center gap-2 flex-wrap mt-4">
              {Array.from({ length: 4 }).map((_, tagIndex) => (
                <Skeleton key={tagIndex} className="h-7 w-24 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonSection;
