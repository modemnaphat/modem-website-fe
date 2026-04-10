"use client";

// Lib
import React from "react";
import Image from "next/image";

// Images
import StarsSVG from "@/app/images/icons/stars.svg";

// Include in Project
import { TProfile } from "@/app/utils/types";
import { GITHUB } from "@/app/utils/others";

type Props = {
  profile: TProfile;
};

const MainSection: React.FC<Props> = ({ profile }) => {
  const codeLines = [
    { tokens: [{ text: "const ", color: "text-purple-400" }, { text: "developer", color: "text-blue-300" }, { text: " = {", color: "text-white" }] },
    { tokens: [{ text: "  name", color: "text-rose-400" }, { text: ": ", color: "text-white" }, { text: `"${profile.name}"`, color: "text-green-400" }, { text: ",", color: "text-white" }] },
    { tokens: [{ text: "  nickname", color: "text-rose-400" }, { text: ": ", color: "text-white" }, { text: `"${profile.nickName}"`, color: "text-green-400" }, { text: ",", color: "text-white" }] },
    { tokens: [{ text: "  age", color: "text-rose-400" }, { text: ": ", color: "text-white" }, { text: `${profile.age}`, color: "text-orange-400" }, { text: ",", color: "text-white" }] },
    { tokens: [{ text: "  role", color: "text-rose-400" }, { text: ": ", color: "text-white" }, { text: `"Full Stack Developer"`, color: "text-green-400" }, { text: ",", color: "text-white" }] },
    { tokens: [{ text: "  github", color: "text-rose-400" }, { text: ": ", color: "text-white" }, { text: `"${GITHUB}"`, color: "text-green-400" }, { text: ",", color: "text-white" }] },
    { tokens: [{ text: "  description", color: "text-rose-400" }, { text: ": ", color: "text-white" }] },
    ...wrapDescription(profile.description),
    { tokens: [{ text: "};", color: "text-white" }] },
  ];

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
        <div className="grid grid-cols-2 max-md:grid-cols-1 min-h-[400px]">
          {/* Left - Profile Image */}
          <div className="relative flex items-center justify-center p-6 max-md:p-4 border-r border-gray-700 max-md:border-r-0 max-md:border-b">
            <Image
              src={profile.profilePicUrl}
              alt={`${profile.nickName} image`}
              width={0}
              height={0}
              sizes="50vw"
              quality={75}
              loading="lazy"
              className="rounded-lg w-full h-auto object-cover max-w-[380px]"
            />
          </div>

          {/* Right - Code Editor */}
          <div className="p-5 max-md:pt-4 max-md:pr-4 max-md:pb-4 max-md:pl-0 font-mono text-sm max-sm:text-xs overflow-x-auto">
            {codeLines.map((line, i) => (
              <div key={i} className="flex">
                <span className="text-gray-600 select-none w-8 shrink-0 text-right mr-4">
                  {i + 1}
                </span>
                <span className="whitespace-pre-wrap break-all">
                  {line.tokens.map((token, j) => (
                    <span key={j} className={token.color}>
                      {token.text}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function wrapDescription(desc: string): { tokens: { text: string; color: string }[] }[] {
  const wrapped = `    "${desc}"`;
  const maxLen = 50;
  const lines: { tokens: { text: string; color: string }[] }[] = [];

  if (wrapped.length <= maxLen) {
    lines.push({
      tokens: [
        { text: `    "${desc}"`, color: "text-green-400" },
        { text: ",", color: "text-white" },
      ],
    });
  } else {
    // Split description into chunks for readability
    const words = desc.split(" ");
    let currentLine = "";
    const chunks: string[] = [];

    for (const word of words) {
      if (currentLine && (currentLine + " " + word).length > 45) {
        chunks.push(currentLine);
        currentLine = word;
      } else {
        currentLine = currentLine ? currentLine + " " + word : word;
      }
    }
    if (currentLine) chunks.push(currentLine);

    chunks.forEach((chunk, i) => {
      const isFirst = i === 0;
      const isLast = i === chunks.length - 1;
      const prefix = isFirst ? '    "' : "     ";
      const suffix = isLast ? '"' : "";
      const comma = isLast ? "," : "";

      const tokens: { text: string; color: string }[] = [
        { text: `${prefix}${chunk}${suffix}`, color: "text-green-400" },
      ];
      if (comma) {
        tokens.push({ text: comma, color: "text-white" });
      }
      lines.push({ tokens });
    });
  }

  return lines;
}

export default MainSection;
