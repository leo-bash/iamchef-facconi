import "../../../card-components/Badge.css";
import { X } from "lucide-react";
import type { IngredientInterface } from "../../../../types/ingredients";

type SelectedIngredientProps = {
  id: string;
  ingredient: IngredientInterface;
  handleRemove: (ing: IngredientInterface) => void;
};

const SelectedIngredient = ({
  id,
  ingredient,
  handleRemove,
}: SelectedIngredientProps) => {
  return (
    <span id={id} className="selected-badge">
      {ingredient.name}

      <button
        className="remove-btn"
        onClick={() => handleRemove(ingredient)}
        aria-label={`Rimuovi ${ingredient}`}
      >
        <X size={14} />
      </button>
    </span>
  );
};

export default SelectedIngredient;
