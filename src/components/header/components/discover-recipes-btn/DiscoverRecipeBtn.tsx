import type { IngredientInterface } from "../../../../types/ingredients";
import "../../search-bar/Searchbar.css";

type DiscoverRecipeBtnProps = {
  ingredients: IngredientInterface[];
  onSearchClick: () => void;
  isDiscover: boolean;
  className?: string;
};

const DiscoverRecipeBtn = ({
  ingredients,
  onSearchClick,
  isDiscover,
  className,
}: DiscoverRecipeBtnProps) => {
  if (!ingredients || ingredients.length == 0) {
    return null;
  }

  return (
    <button
      className={className || "search-btn"}
      onClick={onSearchClick}
      disabled={isDiscover}
    >
      {isDiscover ? "Discovering ..." : "Search Recipes"}
    </button>
  );
};

export default DiscoverRecipeBtn;
