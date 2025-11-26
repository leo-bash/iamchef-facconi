import { RecipeCard } from "../components/card-components/RecipeCard";
import { ScrollBtnSection } from "../components/scroll-btn/ScrollBtnSection";
import { useApi, getRecipesByIngredientsURL } from "../hooks/useApi";
import "./DiscoverRecipes.css";
import { useState } from "react";

import { useNavigate, useSearchParams } from "react-router";

function DiscoverRecipes() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Estrai i nomi degli ingredienti dall'URL (es: ?ingredients=tomato,cheese)
  const ingredientsParam = searchParams.get('ingredients');
  const ingredientNames = ingredientsParam ? ingredientsParam.split(',') : [];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Costruisci l'URL per la chiamata API
  const recipesUrl = getRecipesByIngredientsURL(ingredientNames);
  const { data: apiRecipes, loading, error } = useApi(recipesUrl);

  const recipesToShow = apiRecipes || [];

  return (
    <div className="discover-recipes-container">
      <div className="discover-recipes-content">
        {loading ? (
          <div className="discover-loading">Caricamento ricette...</div>
        ) : error ? (
          <div className="discover-error">Errore: {error}</div>
        ) : (
          <RecipeCard
            recipe={recipesToShow[currentIndex]}
            onClickDetails={() =>
              navigate(`/recipe/${recipesToShow[currentIndex].id}`, {
                state: { fromIngredients: ingredientNames }
              })
            }
          />
        )}

        {!loading && !error && recipesToShow.length > 0 && (
          <ScrollBtnSection
            currentIndex={currentIndex}
            maxIndex={recipesToShow.length - 1}
            setCurrentIndex={setCurrentIndex}
            goToHomePage={() => navigate("/")}
          />
        )}
      </div>
    </div>
  );
}

export default DiscoverRecipes;
