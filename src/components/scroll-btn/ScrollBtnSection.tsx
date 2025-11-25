import ScrollBtn from "./ScrollBtn";
import "./ScrollBtn.css";

type ScrollBtnSectionProps = {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  maxIndex: number;
  goToHomePage: () => void;
};

export function ScrollBtnSection({
  currentIndex,
  setCurrentIndex,
  maxIndex,
}: ScrollBtnSectionProps) {
  return (
    <div className="scroll-section">
      <div className="nav-icons">
        <ScrollBtn
          currentIndex={currentIndex}
          isIncrement={false}
          maxIndex={maxIndex}
          onClick={setCurrentIndex}
        />

        <ScrollBtn
          currentIndex={currentIndex}
          isIncrement={true}
          maxIndex={maxIndex}
          onClick={setCurrentIndex}
        />
      </div>
    </div>
  );
}
