import Badge from "./Badge";
import type { Ingredient } from "../types/Ingredient";

interface BadgesProps {
  ingredients: Ingredient[];
  onRemove: (id: number) => void;
}

function Badges({ ingredients, onRemove }: BadgesProps) {
  return (
    <div>
      {ingredients.map(ingredient => (
        <Badge
          key={ingredient.id}
          label={ingredient.name}
          onRemove={() => onRemove(ingredient.id)}
        />
      ))}
    </div>
  );
}

export default Badges;
