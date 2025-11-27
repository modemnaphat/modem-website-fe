"use client";

// Lib
import React from "react";

// Include in Project
import { useProfile } from "@/app/hooks/api";
import MainSection from "./main";
import SkeletonSection from "./skeleton";

const AboutMeSection: React.FC = () => {
  const { data: profile, isLoading } = useProfile();

  return (
    <div className="w-full flex flex-col gap-12 mt-16">
      <div className="flex flex-col gap-2 items-center w-full">
        <h2 className="text-3xl font-bold text-white text-center">About Me</h2>
        <p className="text-white text-center">
          Meet the <span className="text-blue-300">Me</span> within the Code.
        </p>
      </div>

      {isLoading ? (
        <SkeletonSection />
      ) : profile ? (
        <MainSection profile={profile} />
      ) : (
        <SkeletonSection />
      )}
    </div>
  );
};

export default AboutMeSection;
