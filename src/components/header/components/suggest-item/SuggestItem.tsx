import type { IngredientInterface } from "../../../../types/ingredients";

type SuggestItemProps = {
  ingredient: IngredientInterface;
  handleClick: (ing: IngredientInterface) => void;
};

const SuggestItem = ({ ingredient, handleClick }: SuggestItemProps) => {
  return (
    <div onClick={() => handleClick(ingredient)}>
      <h1>{ingredient.name}</h1>
    </div>
  );
};

export default SuggestItem;
