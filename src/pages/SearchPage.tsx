import { type IngredientInterface } from "../types/ingredients";
import { useStore } from "../store/Store";
import SearchBar from "../components/header/components/search-bar/Searchbar";
import SelectedList from "../components/header/components/selected-item/SelectedList";
import DiscoverRecipeBtn from "../components/header/components/discover-recipes-btn/DiscoverRecipeBtn";
import "../components/reset-api-btn.css";
import "./SearchPage.css";

type SearchPageProps = {
  onSuggestClick: (ing: IngredientInterface) => void;
  onBadgeRemove: (ing: IngredientInterface) => void;
  selectedIng: IngredientInterface[];
  onSearchClick: () => void;
  isDiscover: boolean;
};

const searchPage = ({
  onSuggestClick,
  onBadgeRemove,
  selectedIng,
  onSearchClick,
  isDiscover,
}: SearchPageProps) => {
  const setApiKey = useStore((state) => state.setApiKey);

  const handleResetApiKey = () => {
    setApiKey("");
    window.location.reload();
  };

  return (
    <div className="search-page">
      <h1 className="main-title">What do we cook today?</h1>
      <p className="subtitle">Search recipes by the ingredients<br />
        you have at home</p>

      <div className="search-area">
        <SearchBar handleSuggestClick={onSuggestClick} />

        <div className="selected-list">
          <SelectedList ingredients={selectedIng} handleRemove={onBadgeRemove} />
        </div>

        <div className="discover-btn-wrapper">
          <DiscoverRecipeBtn
            ingredients={selectedIng}
            onSearchClick={onSearchClick}
            isDiscover={isDiscover}
          />
        </div>
      </div>

      <button
        onClick={handleResetApiKey}
        className="reset-api-btn"
      >
        Reset API Key
      </button>
    </div>
  );
}
export default searchPage;
