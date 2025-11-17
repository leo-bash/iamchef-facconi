import type { IngredientInterface } from "../../types/ingredients";
import SuggestItem from "./SuggestItem";

type SuggestListProps = {
  ingredients: IngredientInterface[];
  handleClick: (ing: IngredientInterface) => void;
};

const SuggestList = ({ ingredients, handleClick }: SuggestListProps) => {
  return (
    <div className="max-h-40 overflow-y-auto rounded-lg bg-white">
      {ingredients.map((ingredient) => (
        <SuggestItem
          key={ingredient.name}
          ingredient={ingredient}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};

export default SuggestList;
