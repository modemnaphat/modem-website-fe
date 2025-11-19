"use client";

// Lib
import React from "react";

type Props = {
  isLoading?: boolean;
}

const LoadingComponent: React.FC<Props> = ({ isLoading=false }) => {
  if (isLoading === false) {
    return null;
  }

  return (
    <div className="flex items-center justify-center py-10">
      <div className="h-14 w-14 rounded-full border-4 border-zinc-400 border-t-red-500 animate-spin" />
    </div>
  );
};

export default LoadingComponent;
