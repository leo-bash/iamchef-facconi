import "../../search-bar/Searchbar.css";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import type { IngredientInterface } from "../../../../types/ingredients";
import SuggestList from "../suggest-item/SuggestList";
import { useDebounce } from "../../../../hooks/useDebounce";
import { getIngredientsURL, useApi } from "../../../../hooks/useApi";

type SearchBarProps = {
  handleSuggestClick: (ing: IngredientInterface) => void;
};

const SearchBar = ({ handleSuggestClick }: SearchBarProps) => {

  const [isFocused, setIsFocused] = useState(false);

  const [searchingIng, setSearchingIng] = useState<string>("");

  const [stateURL, setStateURL] = useState<string>("");
  const debouncedSearchingIng = useDebounce(searchingIng, 300);

  const {
    data: filteredIngredients,
    loading,
    error
  } = useApi<IngredientInterface[]>(stateURL);

  useEffect(() => {
    if (debouncedSearchingIng) {
      setStateURL(getIngredientsURL(debouncedSearchingIng));
    }
  }, [debouncedSearchingIng]);

  const handleClick = (ing: IngredientInterface) => {
    handleSuggestClick(ing);
    setSearchingIng("");
  };

  return (
    <>
      <div className="searchbar-container">
        <div className={`searchbar ${isFocused ? "focused" : ""}`}>
          <Search className="icon" size={20} />
          <input
            type="text"
            name="search-bar"
            id="search-bar"
            placeholder="Search ingredients..."
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={searchingIng}
            onChange={(e) => setSearchingIng(e.target.value)}
          />
        </div>

        {filteredIngredients && searchingIng && (
          <SuggestList
            ingredients={
              Array.isArray(filteredIngredients)
                ? Array.isArray(filteredIngredients[0])
                  ? (filteredIngredients as IngredientInterface[][]).flat()
                  : (filteredIngredients as IngredientInterface[])
                : []
            }
            handleClick={handleClick}
          />
        )}
      </div>

      {error && <p>Errore: {error}</p>}

      {loading && <p>Caricamento...</p>}
    </>
  );
};

export default SearchBar;
