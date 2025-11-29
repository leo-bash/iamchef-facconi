import type { RecipeInterface } from "../types/recipes";
import { getRecipeDetailsURL, useApi } from "../hooks/useApi";
import { IconBadge } from "../components/card-components/IconBadge";
import RecipeImage from "../components/card-components/RecipeImage";
import { RecipeCuisines } from "../components/card-components/RecipeCuisines";
import { getDifficulty } from "../utils/recipe-details-utils/getDifficulty";
import { getCost } from "../utils/recipe-details-utils/getCost";
import { getHealtScore } from "../utils/recipe-details-utils/getHealtScore";
import { getSummary } from "../utils/recipe-details-utils/getSummary";
import DisplayedIngredients from "../components/card-components/DisplayedIngredients";
import WinePairingComponent from "../components/card-components/WinePairing";
import "../components/recipe-details/RecipeDetails.css";
import { useParams, useNavigate } from "react-router";

export const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const recipeId = id ? parseInt(id, 10) : 0;
  const url = getRecipeDetailsURL(recipeId);
  const { data, loading, error } = useApi<RecipeInterface>(url);
  const recipe = data as RecipeInterface | null;

  if (loading) {
    return (
      <div className="recipe-details-root">
        <div className="recipe-details-loading">Caricamento dettagli ricetta...</div>
      </div>
    );
  }
  if (error || !recipe) {
    return (
      <div className="recipe-details-root">
        <div className="recipe-details-error">
          Errore nel caricamento dettagli.
          <button onClick={() => navigate(-1)} className="error-back-btn">
            Torna indietro
          </button>
        </div>
      </div>
    );
  }

  const maxIngredientsToShow = 4;
  const displayedIngredients = recipe.extendedIngredients?.slice(0, maxIngredientsToShow) || [];
  const interestingTags = [
    recipe.vegetarian && "Vegetariana",
    recipe.vegan && "Vegana",
    recipe.glutenFree && "Senza Glutine",
    recipe.dairyFree && "Senza Lattosio",
    recipe.veryHealthy && "Salutare",
  ].filter(Boolean);

  return (
    <div className="recipe-details-root">
      <div className="recipe-details-content">
        <div className="recipe-details-card">
        <RecipeImage image={recipe.image} title={recipe.title} />

        <h1 className="rd-title">{recipe.title || "Ricetta sconosciuta"}</h1>

        <div className="rd-info">
          <div className="rd-badges">
            <IconBadge icon={""} text={getDifficulty(recipe.readyInMinutes)} />
            {getCost(recipe.pricePerServing)}
            {interestingTags.filter(Boolean).map((tag) => (
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
          <button type="button" onClick={() => navigate(-1)}>
            Torna indietro
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
