import React from "react";
import { type IngredientInterface } from "../types/ingredients";
import { useStore } from "../store/Store";
import { useNavigate } from "react-router";
import SearchBar from "../components/header/components/search-bar/Searchbar";
import SelectedList from "../components/header/components/selected-item/SelectedList";
import DiscoverRecipeBtn from "../components/header/components/discover-recipes-btn/DiscoverRecipeBtn";
import "../components/reset-api-btn.css";
import "./SearchPage.css";
import type { JSX } from "react";

export const SearchPage = (): JSX.Element => {
  const apiKey = useStore((state) => state.apiKey);
  const setApiKey = useStore((state) => state.setApiKey);
  const [selectedIng, setSelectedIng] = React.useState<IngredientInterface[]>([]);
  const [isDiscover, setIsDiscover] = React.useState(false);



  const navigate = useNavigate();

  React.useEffect(() => { //redirect sulla pagina di intro se api key = ""
    if (!apiKey) {
      navigate("/api-key");
    }
  }, [apiKey, navigate]);

  const handleResetApiKey = () => {
    setApiKey("");
    window.location.reload();
  };

  const handleSuggestClick = (ing: IngredientInterface) => {
    setSelectedIng([...selectedIng, ing]);
  };

  const handleBadgeRemove = (ing: IngredientInterface) => {
    setSelectedIng(selectedIng.filter(i => i.id !== ing.id));
  };

 const handleSearchClick = () => {
  setIsDiscover(true);
  const ids = selectedIng.map(ing => ing.id).join(',');
  navigate(`/discover-recipes?ingredients=${ids}`);
};

  return (
    <div className="search-page">
      <h1 className="main-title">What do we cook today?</h1>
      <p className="subtitle">
        Search recipes by the ingredients<br />
        you have at home
      </p>

      <div className="search-area">
        <SearchBar handleSuggestClick={handleSuggestClick} />

        <div className="selected-list">
          <SelectedList ingredients={selectedIng} handleRemove={handleBadgeRemove} />
        </div>

        <div className="discover-btn-wrapper">
          <DiscoverRecipeBtn
            ingredients={selectedIng}
            onSearchClick={handleSearchClick}
            isDiscover={isDiscover}
          />
        </div>
      </div>

      <button onClick={handleResetApiKey} className="reset-api-btn">
        Reset API Key
      </button>
    </div>
  );
};
