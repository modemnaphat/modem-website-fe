"use client";

// Lib
import React from "react";
import Image from "next/image";

// Images
import StarsSVG from "@/app/images/icons/stars.svg";
import GithubSVG from "@/app/images/icons/github.svg";
import CodeSVG from "@/app/images/icons/code.svg";

// Include in Project
import { TProfile } from "@/app/utils/types";
import { GITHUB } from "@/app/utils/others";

type Props = {
  profile: TProfile;
};

const MainSection: React.FC<Props> = ({ profile }) => {
  return (
    <div className="grid grid-cols-2 w-full gap-4 max-md:grid-cols-1">
      <div className="relative flex items-center justify-center p-4">
        <Image
          src={profile.profilePicUrl}
          alt={`${profile.nickName} image`}
          width={0}
          height={0}
          sizes="50vw"
          // quality={75}
          priority
          className="rounded-lg w-full h-auto object-cover"
        />
        <Image
          src={StarsSVG}
          width={0}
          height={0}
          alt="stars icon"
          loading="lazy"
          className="absolute w-12 h-12 top-0 left-0 max-md:w-8 max-md:h-8"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <h3 className="text-white text-4xl font-bold">{profile.name}</h3>
          <Image src={CodeSVG} alt="clipcode icon" width={28} height={28} className="max-lg:hidden" />
        </div>
        <div className="flex justify-between">
          <a
            href={GITHUB}
            target="_blank"
            className="text-blue-300 text-lg font-bold hover:text-blue-400 transition-all duration-200"
          >
            @{profile.nickName}
          </a>
        </div>
        <p className="text-gray-300">{profile.description}</p>
      </div>
    </div>
  );
};

export default MainSection;
