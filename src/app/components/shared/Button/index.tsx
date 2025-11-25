"use client";

// Lib
import React, { useEffect, useRef, useState } from "react";

type Props = {
  name: string;
  type?: "button" | "submit";
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
  radius?: string;
  isLoading?: boolean;
  isBold?: Boolean;
  isPopping?: boolean;
};

const Button: React.FC<Props> = ({
  name,
  type = "button",
  onClick,
  disabled = false,
  fullWidth = false,
  isLoading = false,
  radius = "8",
  isBold = false,
  isPopping = false,
}) => {
  const styleCustom = {
    width: !fullWidth ? "fit-content" : "100%",
    borderRadius: `${radius}px`,
  };

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (disabled) return;
    if (isLoading) {
      if (buttonRef.current) {
        buttonRef.current.setAttribute("disabled", "disabled");
      }
    } else {
      if (buttonRef.current) {
        buttonRef.current.removeAttribute("disabled");
      }
    }
  }, [isLoading, disabled]);

  return (
    <button
      type={type}
      className={`
        bg-red-500 hover:bg-red-500/80 active:bg-red-900
        text-white border-2 border-red-500
        px-6 py-3
        disabled:hover:translate-y-0
        transition-all duration-200
        cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-700
        flex items-center justify-center gap-2
        ${isPopping ? "hover:-translate-y-1" : "hover:translate-y-0"}
        ${isBold ? "font-bold" : "font-normal"}
      `}
      onClick={onClick}
      disabled={disabled || isLoading}
      style={styleCustom}
      ref={buttonRef}
    >
      <span>{name}</span>
      {isLoading && (
        <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
      )}
    </button>
  );
};

export default Button;
