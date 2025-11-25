import "../../search-bar/SuggestList.css";
import type { IngredientInterface } from "../../../../types/ingredients";

type SuggestListProps = {
  ingredients: IngredientInterface[];
  handleClick: (ing: IngredientInterface) => void;
};

const SuggestList = ({ ingredients, handleClick }: SuggestListProps) => {
  if (!ingredients.length) return null;
  const visible = ingredients.slice(0, 5);
  return (
    <div className="suggest-list">
      {visible.map((ingredient) => (
        <button
          key={ingredient.name}
          className="suggest-list-item"
          type="button"
          onClick={() => handleClick(ingredient)}
        >
          {ingredient.name}
        </button>
      ))}
    </div>
  );
};

export default SuggestList;
