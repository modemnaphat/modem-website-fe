"use client";

// Lib
import React, { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  bottom?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  showCloseButton = true,
  size = "md",
  bottom,
}) => {
  const [shouldRender, setShouldRender] = React.useState(isOpen);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
      document.body.style.pointerEvents = "none";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
      document.body.style.pointerEvents = "auto";
    };
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center p-4 pointer-events-auto">
      {/* Backdrop */}
      <div
        className={`fixed left-0 top-0 w-full h-full bg-black/80 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* Modal Content */}
      <div
        className={`
          relative w-full ${sizeClasses[size]}
          bg-[#1a1a1a] rounded-2xl shadow-2xl
          border border-white/10
          max-h-[90vh] overflow-hidden
          flex flex-col
          z-1001
          transition-all duration-300
          ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
        style={{
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
            {title && (
              <h2 className="text-2xl font-bold text-white">{title}</h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full cursor-pointer"
                data-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="p-6 overflow-y-auto hide-scrollbar flex-1">
          {children}
        </div>

        {/* Bottom Section (เหมือน Header) */}
        {bottom && (
          <div className="px-6 py-4 border-t border-white/10">
            {bottom}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
