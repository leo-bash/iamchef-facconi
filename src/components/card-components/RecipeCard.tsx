import type { RecipeInterface } from "../../types/recipes";
import type { IngredientInterface } from "../../types/ingredients";
import RecipeImage from "./RecipeImage";
import { RecipeIngredients } from "./RecipeIngredients";
import RecipeServings from "./RecipeServings";
import RecipeTime from "./RecipeTime";
import "./RecipeCard.css";
import { useStore } from "../../store/Store";
import { ScrollBtnSection } from "../scroll-btn/ScrollBtnSection";

type RecipeCardProps = {
  recipe: RecipeInterface;
  onClickDetails: (recipe: RecipeInterface) => void;
  selectedIng?: IngredientInterface[];
  currentIndex?: number;
  setCurrentIndex?: (index: number) => void;
  maxIndex?: number;
  goToHomePage?: () => void;
};

export const RecipeCard = ({ recipe, onClickDetails, selectedIng, currentIndex, setCurrentIndex, maxIndex, goToHomePage }: RecipeCardProps) => {
  if (!recipe) return null;
  const data = recipe;
  const storeSelected = useStore((s) => s.selectedIng) || [];
  const selected = selectedIng && selectedIng.length ? selectedIng : storeSelected;
  const selectedNames = selected.map((s) => s.name.toLowerCase());
  // derive recipe ingredient names and total count from available payload
  let recipeNames: string[] = [];
  let totalIngredients = 0;

  if (data.extendedIngredients && (data.extendedIngredients as any[]).length > 0) {
    recipeNames = (data.extendedIngredients as any[]).map((i) => (i.name || "").toLowerCase());
    totalIngredients = recipeNames.length;
  } else if ((data as any).usedIngredients || (data as any).missedIngredients) {
    const used = ((data as any).usedIngredients || []).map((i: any) => (i.name || "").toLowerCase());
    const missed = ((data as any).missedIngredients || []).map((i: any) => (i.name || "").toLowerCase());
    recipeNames = [...used, ...missed];
    totalIngredients = recipeNames.length;
  } else if (typeof (data as any).usedIngredientCount === "number" && typeof (data as any).missedIngredientCount === "number") {
    totalIngredients = (data as any).usedIngredientCount + (data as any).missedIngredientCount;
  }

  const matched = selectedNames.filter((name) => recipeNames.includes(name));
  const uniqueMatches = Array.from(new Set(matched)).length;
  const compatibility = totalIngredients > 0 ? Math.round((uniqueMatches / totalIngredients) * 100) : 0;
  const missingCount = Math.max(0, totalIngredients - uniqueMatches);

  return (
    <div className="card-root">
      <div className="card-image-wrap">
        <RecipeImage image={data.image} title={data.title} />
        {typeof setCurrentIndex === "function" && typeof currentIndex === "number" && (
          <div className="card-nav-overlay">
            <ScrollBtnSection
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              maxIndex={maxIndex || 0}
              goToHomePage={goToHomePage || (() => {})}
            />
          </div>
        )}
      </div>

      <h2 className="card-title">{data.title || "Unknown recipe"}</h2>

      <div className="card-info">
        <RecipeTime readyInMinutes={data.readyInMinutes} />
        <span className="dot">·</span>
        <RecipeServings servings={data.servings} />
        <span className="dot">·</span>
        <span className="compat-label">Compatibility:</span>
        <span className="compat-value">{compatibility}%</span>
      </div>

      <RecipeIngredients extendedIngredients={data.extendedIngredients} />

      <div className="missing-row">You are missing {missingCount} ingredient{missingCount !== 1 ? "s" : ""}</div>

      <button className="card-btn" onClick={() => onClickDetails(data)}>
        Show recipe details
      </button>
    </div>
  );
};
