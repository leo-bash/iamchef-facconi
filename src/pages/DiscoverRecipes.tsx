import { RecipeCard } from "../components/card-components/RecipeCard";
import { ScrollBtnSection } from "../components/scroll-btn/ScrollBtnSection";
import type { RecipeInterface } from "../types/recipes";

type DiscoverRecipesProps = {
  recipes: RecipeInterface[];
  onRecipeDetailClick: (recipe: RecipeInterface) => void;
  goToHomePage: () => void;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
};

function DiscoverRecipes({
  recipes,
  onRecipeDetailClick,
  goToHomePage,
  currentIndex,
  setCurrentIndex,
}: DiscoverRecipesProps) {
  setCurrentIndex(currentIndex);

  return (
    <main
      id="recipe-card-container"
      className="w-full h-full flex flex-col gap-0 overflow-hidden min-h-0"
    >
      <div className="flex-1 min-h-0 overflow-hidden">
        <RecipeCard
          recipe={recipes[currentIndex]}
          onClickDetails={onRecipeDetailClick}
        />
      </div>

      <div className="shrink-0">
        <ScrollBtnSection
          currentIndex={currentIndex}
          maxIndex={recipes.length - 1}
          setCurrentIndex={setCurrentIndex}
          goToHomePage={goToHomePage}
        />
      </div>
    </main>
  );
}

export default DiscoverRecipes;
