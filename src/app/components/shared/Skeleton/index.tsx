import React from "react";

type Props = {
  className?: string;
};

const Skeleton: React.FC<Props> = ({ className = "" }) => {
  return (
    <div
      className={className}
      style={{
        backgroundColor: "#e0e0e0",
        backgroundImage: "linear-gradient(90deg, #e0e0e0, #f5f5f5, #e0e0e0)",
        backgroundSize: "200px 100%",
        backgroundRepeat: "no-repeat",
        animation: "skeleton-shimmer 1.5s ease-in-out infinite",
      }}
    />
  );
};

export default Skeleton;