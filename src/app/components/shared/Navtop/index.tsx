"use client";

// Lib
import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Images
import MenuSVG from "@/app/images/icons/menu.svg";
import { navMenuList } from "@/app/utils/others";

const NAV_HEIGHT = 60 + 32; // Padding 2em

const Navtop: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const animationFrameId = useRef<number | null>(null);

  const handleScroll = (id: string) => {
    const targetPosition =
      id === "home"
        ? 0
        : (() => {
            const element = document.getElementById(id);
            if (!element) return 0;
            return element.offsetTop - NAV_HEIGHT;
          })();

    const startPosition = window.pageYOffset;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    if (Math.abs(startPosition - targetPosition) < 1) {
      setIsOpen(false);
      return;
    }

    if (startPosition >= maxScroll - 1 && targetPosition >= maxScroll - 1) {
      setIsOpen(false);
      return;
    }

    setIsScrolling(true);

    const isMobile = window.innerWidth < 1280;

    if (isMobile) {
      // Mobile/iPad: ใช้ native smooth scroll
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    } else {
      // Desktop: ใช้ custom animation + บล็อค scroll

      // ป้องกันการ scroll ด้วยมือ
      const preventScroll = (e: Event) => {
        e.preventDefault();
      };

      document.addEventListener("wheel", preventScroll, { passive: false });
      document.addEventListener("touchmove", preventScroll, { passive: false });
      document.addEventListener("keydown", preventScroll, { passive: false });

      // ยกเลิก animation เก่าถ้ามี
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }

      const distance = targetPosition - startPosition;
      const duration = 800;
      let start: number | null = null;

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);

        const ease =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
          animationFrameId.current = requestAnimationFrame(animation);
        } else {
          animationFrameId.current = null;

          // ปลดล็อคการ scroll เมื่อ animation เสร็จ
          document.removeEventListener("wheel", preventScroll);
          document.removeEventListener("touchmove", preventScroll);
          document.removeEventListener("keydown", preventScroll);

          setIsScrolling(false);
        }
      };

      animationFrameId.current = requestAnimationFrame(animation);
    }

    setIsOpen(false);
  };

  return (
    <>
      {/* Navtop Header */}
      <div
        className={`w-full h-full bg-[#0a0a0a] backdrop-blur-xs relative z-950 transition-opacity duration-300 ${
          isOpen ? "border-b-0" : "border-b border-[#282828]"
        }`}
      >
        <div className="flex justify-between max-w-6xl mx-auto w-full h-full max-xl:px-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 h-full cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handleScroll("home");
            }}
          >
            <Image
              src={`/modem-gry.svg`}
              alt="Modem Logo"
              className="w-14 h-14"
              loading="eager"
              width={56}
              height={56}
            />
            <p className="text-lg text-nowrap pointer-events-none max-md:hidden">
              <span className="text-white font-semibold tracking-wide animate-softGlow">
                MODEM
              </span>
            </p>
          </Link>

          {/* Desktop Menu List */}
          <div className="flex items-center gap-16 h-full max-lg:hidden">
            {navMenuList.map((ele, index) => (
              <div
                key={index}
                className="relative px-0.5 py-1 cursor-pointer group"
                onClick={() => handleScroll(ele.id)}
              >
                <p className="text-white select-none">{ele.name}</p>
                <span className="absolute bottom-0 left-0 h-0.5 bg-red-600 w-0 group-hover:w-full transition-all duration-300" />
              </div>
            ))}
          </div>

          {/* Hamburger Menu */}
          <div
            className="hidden max-lg:flex items-center cursor-pointer group"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Image
              src={MenuSVG}
              alt="hamburger-menu"
              className="transition-all duration-300 group-hover:opacity-50"
            />
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs lg:hidden z-900 h-screen"
          style={{ minHeight: "100vh", height: "100dvh" }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-[60px] left-0 right-0 bg-[#0a0a0a] border-b border-[#282828] lg:hidden z-940 shadow-xl transition-all duration-300 ease-out ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto w-full max-xl:px-4 py-6">
          <div className="flex flex-col gap-4">
            {navMenuList.map((ele, index) => (
              <div
                key={index}
                className="relative px-4 py-3 cursor-pointer group hover:bg-white/5 rounded-lg transition-colors duration-200"
                onClick={() => handleScroll(ele.id)}
              >
                <p className="text-white select-none">{ele.name}</p>
                <span className="absolute bottom-0 left-0 h-0.5 bg-red-600 w-0 group-hover:w-full transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navtop;
