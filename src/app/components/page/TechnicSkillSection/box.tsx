"use client";

// Lib
import React from "react";
import Image from "next/image";

// Include in Project
import { techSkill } from "@/app/utils/types";

export type Props = {
  data: techSkill[];
};

const Box: React.FC<Props> = ({ data }) => {
  return (
    <div
      className={`grid grid-cols-2 grid-rows-2 gap-8 w-full max-md:grid-cols-1 max-md:grid-rows-auto`}
    >
      {data?.map((item, index) => (
        <div key={index} className={`flex items-center gap-4`}>
          <Image
            src={item.iconUrl ? item.iconUrl : "/modem-gry.svg"}
            alt={item.name + "icon"}
            width={80}
            height={80}
            className="w-20 h-20 object-cover rounded-sm"
          />
          <div className={`flex flex-col`}>
            <h5 className="text-2xl text-white font-bold">{item.name}</h5>
            <p className="text-md text-white">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Box;
