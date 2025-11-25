import type { RecipeInterface } from "../../types/recipes.ts";
import { fallbackRecipe } from "../../types/fallback-recipe.ts";
import { getDifficulty } from "../../utils/recipe-details-utils/getDifficulty.ts";
import { IconBadge } from "../card-components/IconBadge.tsx";
import { getCost } from "../../utils/recipe-details-utils/getCost.tsx";
import { RecipeCuisines } from "../card-components/RecipeCuisines.tsx";
import { getHealtScore } from "../../utils/recipe-details-utils/getHealtScore.ts";
import { getSummary } from "../../utils/recipe-details-utils/getSummary.ts";
import DisplayedIngredients from "../card-components/DisplayedIngredients.tsx";
import WinePairingComponent from "../card-components/WinePairing.tsx";
import RecipeImage from "../card-components/RecipeImage.tsx";
import "./RecipeDetails.css";
type RecipeDetailsProps = {
	id: number;
	recipeData?: RecipeInterface;
	goToBack: (id: number) => void
};

export const RecipeDetails = ({id, recipeData, goToBack }: RecipeDetailsProps) => {
	
	const recipe = recipeData || fallbackRecipe;
	const maxIngredientsToShow = 4;
	const displayedIngredients = recipe.extendedIngredients.slice(
		0,
		maxIngredientsToShow
	);

	const interestingTags = [
		recipe.vegetarian && "Vegetariana",
		recipe.vegan && "Vegana",
		recipe.glutenFree && "Senza Glutine",
		recipe.dairyFree && "Senza Lattosio",
		recipe.veryHealthy && "Salutare",
	].filter(Boolean);

	return (
		<div className="recipe-details-root">
			<div className="recipe-details-card">
				<RecipeImage image={recipe.image} title={recipe.title} />

				<h1 className="rd-title">{recipe.title || "Ricetta sconosciuta"}</h1>

				<div className="rd-info">
					<div className="rd-badges">
						<IconBadge icon={""} text={getDifficulty(recipe.readyInMinutes)} />
						{getCost(recipe.pricePerServing)}
						{interestingTags.map((tag) => (
							<IconBadge key={String(tag)} icon={""} text={String(tag)} />
						))}
					</div>
				</div>

				<div className="rd-info">
					<IconBadge icon={""} text={`${recipe.readyInMinutes || "-"} min`} />
					<IconBadge icon={""} text={`${recipe.servings || "-"} porzioni`} />
					{getHealtScore(recipe.healthScore)}
					<RecipeCuisines cuisines={recipe.cuisines} />
				</div>

				<p className="rd-summary">{getSummary(recipe.summary)}</p>

				<div className="rd-ingredients">
					<DisplayedIngredients displayedIngredients={displayedIngredients} />
				</div>

				{recipe.winePairing?.pairingText && (
					<WinePairingComponent winePairing={recipe.winePairing} />
				)}

				<div className="rd-back">
					<button type="button" onClick={() => goToBack(id)}>
						Torna indietro
					</button>
				</div>
			</div>
		</div>
	);
};
