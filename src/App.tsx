import Layout from "./components/layout/Layout";
import Header from "./components/header/Header";
import { useState, useEffect } from "react";
import type { IngredientInterface } from "./types/ingredients";
import type { CurrentPage } from "./types/pages";
import DiscoverRecipes from "./pages/DiscoverRecipes";
import SearchPage from "./pages/SearchPage";
import { RecipeDetails } from "./pages/RecipeDetails";
import type { RecipeInterface } from "./types/recipes";
import { useStore } from "./store/Store";
import Intro from "./pages/Intro";
function App() {
  const apiKey = useStore((state) => state.apiKey);
  const [currentPage, setCurrentPage] = useState<CurrentPage>(() => {
    if (!apiKey) {
      return { currentPage: { page: "intro" } };
    }
    return { currentPage: { page: "homepage" } };
  });

  useEffect(() => {
    if (apiKey && currentPage.currentPage.page === "intro") {
      setCurrentPage({ currentPage: { page: "homepage" } });
    }
  }, [apiKey]);
  const [selectedIng, setSelectedIng] = useState<IngredientInterface[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleSuggestClick = (ing: IngredientInterface) => {
    if (selectedIng.includes(ing)) {
      return;
    }
    setSelectedIng((prev) => [...prev, ing]);
  };

  const handleSuggestRemove = (ing: IngredientInterface) => {
    const filtArray = selectedIng.filter((item) => item != ing);
    setSelectedIng(filtArray);
  };

  const handleRecipeDetailsClick = (recipe: RecipeInterface) => {
    setCurrentPage({
      currentPage: { page: "recipe-details", recipeData: recipe },
      id: recipe.id,
    });
  };

  const handleSetCurrentIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const goToHomePage = () => {
    setCurrentPage({ currentPage: { page: "homepage" } });
  };

  const handleClickBack = (id: number) => {
    setCurrentPage({
      currentPage: { page: "discover-recipes" },
      id: id,
    });
  };

  const [isDiscover, setIsDiscover] = useState<boolean>(false);

  const handleSearchClick = async () => {
    setIsDiscover(true);
    setCurrentIndex(0);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setCurrentPage({ currentPage: { page: "discover-recipes" } });
    setIsDiscover(false);
  };

  let mainContent = null;

  switch (currentPage.currentPage.page) {
    case "intro":
      mainContent = <Intro />;
      break;
    case "discover-recipes":
      mainContent = (
          <DiscoverRecipes
            onRecipeDetailClick={handleRecipeDetailsClick}
            goToHomePage={goToHomePage}
            currentIndex={currentIndex}
            setCurrentIndex={handleSetCurrentIndex}
            selectedIng={selectedIng}
          />
      );
      break;
    case "recipe-details": {
      const selectedRecipe = currentPage.currentPage.recipeData;
      mainContent = (
        <RecipeDetails
          id={selectedRecipe?.id ?? 0}
          goToBack={handleClickBack}
        />
      );
      break;
    }
    default:
      mainContent = (
        <SearchPage
          onSuggestClick={handleSuggestClick}
          onBadgeRemove={handleSuggestRemove}
          selectedIng={selectedIng}
          onSearchClick={handleSearchClick}
          isDiscover={isDiscover}
        />
      );
      break;
  }

  if (!apiKey) {
    return <Intro />;
  }

  return (
    <>
      <Layout header={<Header />} main={mainContent} />
    </>
  );
}

export default App;
