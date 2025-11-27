"use client";

// Lib
import React from "react";
import Image from "next/image";

// Include in Project
import { Skill } from "@/app/utils/types";

type Props = {
  data: Skill[];
};

const Tag: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex items-center gap-2 flex-wrap mt-4">
      {data.map((ele, index) => (
        <div
          key={index}
          className="flex items-center gap-1 bg-blue-500/10 border border-blue-400/20 px-2.5 py-1 rounded-full"
        >
          <Image
            src={ele.iconUrl || `/modem-gry.svg`}
            alt={`${ele.name} icon`}
            width={14}
            height={14}
            loading="lazy"
            className="object-contain"
          />
          <label className="text-sm text-blue-200 font-bold">
            {ele.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Tag;
