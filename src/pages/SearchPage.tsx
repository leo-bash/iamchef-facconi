import { type IngredientInterface } from "../types/ingredients";
import SearchBar from "../components/header/components/search-bar/Searchbar";
import SelectedList from "../components/header/components/selected-item/SelectedList";
import DiscoverRecipeBtn from "../components/header/components/discover-recipes-btn/DiscoverRecipeBtn";

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
  return (
    <div className="flex flex-col gap-4">
      <p className="text-white font-jainiPurva text-lg font-normal leading-[1.2em]">
        Dimmi gli ingredienti e ti dirò una ricetta{" "}
      </p>
      <SearchBar handleSuggestClick={onSuggestClick} />

      <SelectedList ingredients={selectedIng} handleRemove={onBadgeRemove} />

      <DiscoverRecipeBtn
        ingredients={selectedIng}
        onSearchClick={onSearchClick}
        isDiscover={isDiscover}
      />
    </div>
  );
};

export default searchPage;
