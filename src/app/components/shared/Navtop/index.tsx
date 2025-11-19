"use client";

// Lib
import React, { useState } from "react";
import Image from "next/image";

// Images
import MenuSVG from "@/app/images/icons/menu.svg";
import { navMenuList } from "@/app/utils/others";

// Include in Project
import { MobileNav } from "@/app/components/shared";

const Navtop: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`w-full h-full bg-[#0a0a0a] backdrop-blur-xs transition-transform duration-700 border-b border-[#282828]`}
    >
      <div
        className={`flex justify-between max-w-6xl mx-auto w-full h-full max-xl:px-4`}
      >
        {/* Logo */}
        <div className={`flex items-center gap-2 h-full`}>
          <Image
            src={`/modem-gry.svg`}
            alt="Modem Logo"
            className="w-14 h-14"
            loading="eager"
            width={56}
            height={56}
          />
          <p className="text-lg text-white text-nowrap pointer-events-none max-md:hidden flex gap-0.5">
            {"MODEM".split("").map((char, i) => (
              <span
                key={i}
                className="animate-textPulse"
                style={{ animationDelay: `${i * 1}s` }}
              >
                {char}
              </span>
            ))}
          </p>
        </div>

        {/* Menu List */}
        <div className={`flex items-center gap-16 h-full max-lg:hidden`}>
          {navMenuList.map((ele, index) => (
            <div
              key={index}
              className="relative px-0.5 py-1 cursor-pointer group opacity-90"
            >
              <p className="text-white select-none">{ele.name}</p>
              <span className="absolute bottom-0 left-0 h-0.5 bg-red-600 w-0 group-hover:w-full transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Hamburger Menu */}
        <div
          className={`hidden max-lg:flex items-center cursor-pointer group`}
          onClick={() => setIsOpen((event) => !event)}
          data-label="Toggle sidebar"
          data-checked={isOpen}
        >
          <Image
            src={MenuSVG}
            alt="hamburger-menu"
            className="transition-all duration-300 group-hover:opacity-50"
          />
        </div>

        {/* Side Bar*/}
        {/* <MobileNav isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}
      </div>
    </div>
  );
};

export default Navtop;
