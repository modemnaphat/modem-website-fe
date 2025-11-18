"use client";

// Lib
import React from "react";
import Image from "next/image";

// Include in Project
import { contactList, navMenuList } from "@/app/utils/others";

const Footer: React.FC = () => {
  return (
    <div
      className={`flex flex-col justify-between items-center max-w-6xl mx-auto w-full h-full border-t border-[#282828] max-xl:px-4 max-lg:gap-4`}
    >
      <div
        className={`flex justify-between items-center w-full pt-4 max-lg:flex-col max-lg:gap-8`}
      >
        <div
          className={`flex items-center flex-2 gap-12 flex-wrap max-lg:gap-8`}
        >
          <Image
            src={`/modem-gry.svg`}
            alt="Modem Logo"
            className="w-32 h-32 max-lg:hidden"
            loading="eager"
            width={128}
            height={128}
          />
          <Image
            src={`/modem-gry.svg`}
            alt="Modem Logo"
            className="w-16 h-16 lg:hidden"
            loading="eager"
            width={64}
            height={64}
          />
          {navMenuList.map((ele, index) => (
            <div
              className={`cursor-pointer`}
              key={index}
            >
              <p className={`text-white/70 hover:text-white transition-all duration-500`}>{ele.name}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-1 gap-4 items-center justify-end">
          {contactList.map((ele, index) => (
            <a
              className={`cursor-pointer group`}
              href={ele.link}
              target="_blank"
              key={index}
            >
              <Image
                src={ele.icon}
                alt={`contact-icon ${index + 1}`}
                className={`opacity-70 group-hover:opacity-100 transition-all duration-500`}
                width={24}
                height={24}
              />
            </a>
          ))}
        </div>
      </div>

      <div className={`flex justify-center items-center`}>
        <p className={`text-sm text-white/70`}>
          Copyright © 2025 • Naphat Mahakheta
        </p>
      </div>
    </div>
  );
};

export default Footer;
