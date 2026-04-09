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
      className={`grid grid-cols-1 max-w-2xl mx-auto gap-8 w-full max-md:grid-cols-1`}
    >
      {data?.map((item, index) => (
        <div key={index} className={`flex items-center gap-8 max-md:flex-col max-md:gap-4`}>
          <Image
            src={item.iconUrl ? item.iconUrl : "/modem-gry.svg"}
            alt={item.name + "icon"}
            width={240}
            height={135}
            className="w-60 h-[135px] object-cover rounded-sm"
          />
          <div className={`flex flex-col max-md:text-center`}>
            <h5 className="text-2xl text-white font-bold">{item.name}</h5>
            <p className="text-md text-white">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Box;
