import React from "react";
import "./ScrollBtn.css";

type ScrollBtnProps = {
  currentIndex: number;
  onClick: (newIndex: number) => void;
  maxIndex: number;
  isIncrement: boolean;
};

const ScrollBtn: React.FC<ScrollBtnProps> = ({
  currentIndex,
  onClick,
  maxIndex,
  isIncrement,
}: ScrollBtnProps) => {
  const params = isIncrement
    ? currentIndex < maxIndex
      ? (currentIndex = currentIndex + 1)
      : currentIndex
    : currentIndex > 0
    ? (currentIndex = currentIndex - 1)
    : currentIndex;

  const isDisabled = isIncrement ? currentIndex >= maxIndex : currentIndex <= 0;

  return (
    <button
      className="nav-arrow-btn"
      onClick={() => onClick(params)}
      disabled={isDisabled}
      aria-label={isIncrement ? "Next recipe" : "Previous recipe"}
    >
      <img
        src={isIncrement ? `/arrow_forward_ios_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg` : `/arrow_back_ios_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`}
        alt={isIncrement ? "Next" : "Previous"}
      />
    </button>
  );
};

export default ScrollBtn;
