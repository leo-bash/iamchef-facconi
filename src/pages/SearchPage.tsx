import { useState } from "react";
import type { IngredientInterface } from "../types/ingredients";
import { useApi } from "../hooks/useApi";
import { useDebounce } from "../hooks/useDebounce";
import SuggestList from "../components/suggest/SuggestList";
import SelectedIngredient from "../components/SelectedIngredient";

type SearchPageProps = {
  onSearchClick: () => void;
};

const SearchPage = ({ onSearchClick }: SearchPageProps) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<
    IngredientInterface[]
  >([]);

  const debouncedValue = useDebounce(inputValue, 500);

  const { data: suggestions } = useApi<IngredientInterface[]>(
    debouncedValue
      ? `https://api.spoonacular.com/food/ingredients/autocomplete?query=${debouncedValue}`
      : ""
  );

  const addIngredient = (ing: IngredientInterface) => {
    setSelectedIngredients([...selectedIngredients, ing]);
  };

  const removeIngredient = (ing: IngredientInterface) => {
    setSelectedIngredients(selectedIngredients.filter((i) => i !== ing));
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        value={inputValue}
        placeholder="Cerca ingredienti..."
        onChange={(e) => setInputValue(e.target.value)}
      />

      {suggestions && (
        <SuggestList ingredients={suggestions} handleClick={addIngredient} />
      )}

      <div className="flex gap-2 flex-wrap">
        {selectedIngredients.map((ing) => (
          <SelectedIngredient
            key={ing.name}
            ingredient={ing}
            handleRemove={removeIngredient}
          />
        ))}
      </div>

      <button onClick={onSearchClick}>Cerca ricette</button>
    </div>
  );
};

export default SearchPage;
