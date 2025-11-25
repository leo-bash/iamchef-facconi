import type { IngredientInterface } from "../../../../types/ingredients";
import SelectedItem from "./SelectedItem";
import "./SelectedList.css";

type SelectedListProps = {
  ingredients: IngredientInterface[];
  handleRemove: (ing: IngredientInterface) => void;
};

const SelectedList = ({ ingredients, handleRemove }: SelectedListProps) => {
  return (
    <div className="selected-list-inner">
      {ingredients.map((ingredient, index) => (
        <SelectedItem
          key={index.toString()}
          id={index.toString()}
          ingredient={ingredient}
          handleRemove={handleRemove}
        />
      ))}
    </div>
  );
};

export default SelectedList;
