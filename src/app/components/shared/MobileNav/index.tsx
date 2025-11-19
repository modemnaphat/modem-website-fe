"use client";

// Lib
import React, { useEffect } from "react";

// Include in Project
import { navMenuList } from "@/app/utils/others";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileNav: React.FC<Props> = ({ isOpen, onClose }) => {
  // useEffect(() => {
  //   if (isOpen) {
  //     const originOverflow = document.body.style.overflow;
  //     document.body.style.overflow = "hidden";
  //     return () => {
  //       document.body.style.overflow = originOverflow;
  //     };
  //   }
  // }, [isOpen]);

  return (
    <div></div>
  );
};

export default MobileNav;
