import { RecipeCard } from "../components/card-components/RecipeCard";
import { ScrollBtnSection } from "../components/scroll-btn/ScrollBtnSection";
import { useApi, getRecipesByIngredientsURL } from "../hooks/useApi";
import type { RecipeInterface } from "../types/recipes";
import type { IngredientInterface } from "../types/ingredients";
import "./DiscoverRecipes.css";

type DiscoverRecipesProps = {
  onRecipeDetailClick: (recipe: RecipeInterface) => void;
  goToHomePage: () => void;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  selectedIng: IngredientInterface[];
};

function DiscoverRecipes({
  onRecipeDetailClick,
  goToHomePage,
  currentIndex,
  setCurrentIndex,
  selectedIng,
}: DiscoverRecipesProps) {

  // Estrai solo i nomi degli ingredienti
  const ingredientNames = selectedIng.map((ing) => ing.name);
  // Costruisci l'URL per la ricerca ricette
  const recipesUrl = getRecipesByIngredientsURL(ingredientNames);
  // Usa l'hook per ottenere le ricette
  const { data: apiRecipes, loading, error } = useApi(recipesUrl);

  // Mostra solo le ricette ottenute dall'API
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
            onClickDetails={onRecipeDetailClick}
            selectedIng={selectedIng}
          />
        )}

        {!loading && !error && recipesToShow.length > 0 && (
          <div className="discover-navigation">
            <ScrollBtnSection
              currentIndex={currentIndex}
              maxIndex={recipesToShow.length - 1}
              setCurrentIndex={setCurrentIndex}
              goToHomePage={goToHomePage}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default DiscoverRecipes;
