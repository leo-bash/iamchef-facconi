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
import { RecipeIngredients } from "../card-components/RecipeIngredients.tsx";
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

	// Informazioni su possibili tags
	const interestingTags = [
		recipe.vegetarian && "Vegetariana",
		recipe.vegan && "Vegana",
		recipe.glutenFree && "Senza Glutine",
		recipe.dairyFree && "Senza Lattosio",
		recipe.veryHealthy && "Salutare",
	].filter(Boolean);

	return (
		<div className="w-full h-full flex flex-col bg-linear-to-b from-green-50 to-white min-h-0 overflow-hidden">
			<div className="flex-1 min-h-0 overflow-y-auto px-4 py-4">
				<section className="flex flex-col shadow-xl rounded-3xl bg-white p-4 gap-4 animate-fadeIn max-w-full">
					{/* Immagine */}
					<RecipeImage image={recipe.image} title={recipe.title} />

					{/* Titolo e Badge */}
					<div className="flex flex-col gap-2 shrink-0">
						<h1 className="text-xl font-extrabold text-green-900 tracking-tight leading-tight">
							{recipe.title || "Ricetta sconosciuta"}
						</h1>
						<div className="flex flex-col gap-2">
							<IconBadge
								icon={"⚡"}
								text={getDifficulty(recipe.readyInMinutes)}
								color={"bg-green-500 text-white"}
							/>

							{getCost(recipe.pricePerServing)}

							<RecipeIngredients
								extendedIngredients={recipe.extendedIngredients}
							/>

							{interestingTags.map((tag) => (
								<IconBadge icon={"⭐"} text={tag as string} />
							))}
						</div>
					</div>

					{/* Info basilari */}
					<div className="w-full flex gap-2 flex-wrap items-start shrink-0">
						{
							<IconBadge
								icon={"⏱️"}
								text={`${recipe.readyInMinutes || "-"} min`}
							/>
						}
						{
							<IconBadge
								icon={"🍽️"}
								text={`${recipe.servings || "-"} porzioni`}
							/>
						}
						{getHealtScore(recipe.healthScore)}
						{/* Tipo di cucina */}
						<RecipeCuisines cuisines={recipe.cuisines} />
					</div>

					{/* Summary */}
					<p className="text-green-900 text-xs italic bg-green-50 rounded-lg px-3 py-2 leading-relaxed shrink-0">
						{getSummary(recipe.summary)}
					</p>

					{/* Ingredienti principali */}
					<DisplayedIngredients
						displayedIngredients={displayedIngredients}
					/>

					{/* Pairing vino */}
					{recipe.winePairing?.pairingText && (
						<WinePairingComponent
							winePairing={recipe.winePairing}
						/>
					)}
				</section>
			</div>
			{/* Bottone indietro fisso in basso */}
			<div className="w-full px-4 pb-4 pt-2 shrink-0 bg-linear-to-t from-white to-transparent">
				<button
					type="button"
					onClick={() => goToBack(id)}
					className="w-full py-3 text-base font-bold bg-green-600 hover:bg-green-700 active:bg-green-800 transition-colors text-white rounded-2xl shadow-lg cursor-pointer"
					style={{ letterSpacing: "0.05em" }}>
					← Torna indietro
				</button>
			</div>
		</div>
	);
};
