import { useState } from "react";
import { RecipeCard } from "./components/recipe-card/RecipeCard";
import { ScrollBtnSection } from "./components/scroll-btn/ScrollBtnSection";
import type { RecipeInterface } from "../../types/recipes";

type DiscoverRecipesProps = {
	id?: number;
	recipes: RecipeInterface[];
  onRecipeDetailClick: (recipe: RecipeInterface) => void
  goToHomePage: () => void
};

function DiscoverRecipes({ id, recipes, onRecipeDetailClick, goToHomePage }: DiscoverRecipesProps) {
	// definisco una variabile di stato che serve per scorrere di volta in volta un array di ricette
	const [currentIndex, setCurrentIndex] = useState<number>(id || 0);

	return (
		<main
			id="recipe-card-container"
			className="w-full h-full flex flex-col gap-0 overflow-hidden min-h-0">
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
