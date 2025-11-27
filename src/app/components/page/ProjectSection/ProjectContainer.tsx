"use client";

// Lib
import React from "react";
import Image from "next/image";

// Include in Project
import { TProject } from "@/app/utils/types";
import Tag from "./Tag";

type Props = {
  data: TProject[];
  shouldAnimate: boolean;
};

const ProjectContainer: React.FC<Props> = ({ data, shouldAnimate }) => {
  return (
    <div className="flex flex-col gap-8">
      {data?.map((ele, index) => (
        <div 
          key={index} 
          className={`grid grid-cols-2 gap-4 max-md:grid-cols-1 transition-all duration-700 ${
            shouldAnimate 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: `${index * 150}ms` }}
        >
          <Image
            src={ele.coverImgUrl}
            alt={`${ele.name} cover-image`}
            width={445}
            height={334}
            className={``}
          />
          <div className="flex flex-col justify-center gap-2">
            <h3 className="text-4xl font-bold">{ele.name}</h3>
            <p className="text-gray-300">{ele.description}</p>
            <a
              href={ele.sourceUrl}
              target="_blank"
              className="text-emerald-400 font-bold hover:text-emerald-300 transition-all duration-200"
            >
              Explore
            </a>

            <Tag data={ele.skills} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectContainer;
