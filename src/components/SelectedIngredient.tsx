import type { IngredientInterface } from "../types/ingredients";

type SelectedIngredientProps = {
  ingredient: IngredientInterface;
  handleRemove: (ing: IngredientInterface) => void;
};

const SelectedIngredient = ({
  ingredient,
  handleRemove,
}: SelectedIngredientProps) => {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-200 rounded-full">
      {ingredient.name}
      <button onClick={() => handleRemove(ingredient)}>X</button>
    </span>
  );
};

export default SelectedIngredient;
