import React, { useEffect } from "react";

const CircularProgress = ({
  size,
  strokeWidth,
  percentage,
  color,
  setPercentage,
}) => {
  const viewBox = `0 0 ${size} ${size}`;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI * 2;
  const dash = (percentage * circumference) / 100;

  useEffect(() => {
    if (percentage < 101) {
      const progressInterval = setInterval(() => {
        setPercentage((percentage) => {
          return percentage + 20;
        });
      }, 1000);
      return () => clearInterval(progressInterval);
    }
  }, [percentage]);

  return (
    <svg width={size} height={size} viewBox={viewBox}>
      <circle
        fill="none"
        stroke={color}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        strokeDasharray={[dash, circumference - dash]}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CircularProgress;
