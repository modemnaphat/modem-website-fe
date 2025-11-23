"use client";

// Lib
import React, { ReactNode } from "react";

type Props = {
  text: string;
  children: ReactNode;
};

const Tooltip: React.FC<Props> = ({ text = "", children }) => {
  return (
    <div className="relative inline-block group">
      {children}

      <div className="absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 px-2 py-1 text-md text-white bg-[#ff3334] rounded-lg whitespace-nowrap shadow-lg ">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
