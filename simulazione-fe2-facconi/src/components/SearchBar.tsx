
import { useState, useEffect } from 'react';
import Badges from './Badges';
import type { ChangeEvent } from 'react';
import type { Ingredient } from '../types/Ingredient';
import { ingredients } from '../data/ingredients';
import { recipes } from '../data/recipes';
import RecipeCard from './RecipeCard';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onViewChange?: (isSearching: boolean) => void;
}

function SearchBar({ onViewChange }: SearchBarProps) {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredResults, setFilteredResults] = useState<Ingredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [foundRecipes, setFoundRecipes] = useState<any[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);

  useEffect(() => {
    if (onViewChange) {
      onViewChange(showResults || selectedRecipe !== null);
    }
  }, [showResults, selectedRecipe, onViewChange]);
  const handleSearchRecipes = () => {
    if (selectedIngredients.length === 0) return;
    const selectedIds = selectedIngredients.map(i => i.id);
    const filtered = recipes.filter(recipe => {
      const allIngredients = [
        ...(recipe.usedIngredients || []),
        ...(recipe.missedIngredients || []),
        ...(recipe.unusedIngredients || [])
      ];
      return allIngredients.some(ing => selectedIds.includes(ing.id));
    });
    setFoundRecipes(filtered);
    // Bypassa la lista e apri direttamente la prima ricetta trovata
    if (filtered.length > 0) {
      setSelectedRecipe(filtered[0]);
    } else {
      setShowResults(true);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);

    if (value.trim() === '') {
      setFilteredResults([]);
    } else {
      const filtered = ingredients.results.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredResults(filtered);
    }
  };

  const handleAddIngredient = (ingredient: Ingredient) => {
    if (!selectedIngredients.some(i => i.id === ingredient.id)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
    setSearchText('');
    setFilteredResults([]);
  };

  const handleRemoveIngredient = (id: number) => {
    setSelectedIngredients(selectedIngredients.filter(i => i.id !== id));
  };

  const handleBackToSearch = () => {
    setShowResults(false);
    setSelectedRecipe(null);
  };

  const handleBackToResults = () => {
    setSelectedRecipe(null);
  };

  // Se una ricetta è selezionata, mostra la vista dettaglio
  if (selectedRecipe) {
    return (
      <div className={styles.recipeDetail}>
        <div className={styles.detailHeader}>
          <button className={styles.backButton} onClick={handleBackToResults}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z"/>
            </svg>
            1 recipe found
          </button>
        </div>
        <img src={selectedRecipe.image} alt={selectedRecipe.title} className={styles.recipeImage} />
        <div className={styles.recipeInfo}>
          <h2 className={styles.recipeTitle}>{selectedRecipe.title}</h2>
          <div className={styles.recipeMeta}>
            <span className={styles.metaItem}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m.5-13H11v6l5.2 3.2l.8-1.3l-4.5-2.7z"/>
              </svg>
              45 min
            </span>
            <span className={styles.metaItem}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"/>
              </svg>
              8 servings
            </span>
            <span className={styles.metaItem}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              Compatibility: 12,5%
            </span>
          </div>
          <div className={styles.tags}>
            <span className={styles.tag}>Summer</span>
            <span className={styles.tag}>Gluten Free</span>
            <span className={styles.tag}>Desserts</span>
          </div>
          <div className={styles.missingIngredients}>
            <span style={{ color: '#d32f00', fontSize: '1rem' }}>You are missing {selectedRecipe.missedIngredientCount} ingredients</span>
          </div>
          <button className={styles.instructionsBtn}>
            Show recipe instructions and ingredients
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className={styles.heroSection}>
      <form className={styles.form} autoComplete="off" onSubmit={e => e.preventDefault()}>
        <div className={styles.inputWrapper}>
          <span className={styles.searchIcon}>
            {/* SVG lente di ingrandimento */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M5 10a5 5 0 1 1 10 0a5 5 0 0 1-10 0m5-7a7 7 0 1 0 4.192 12.606l5.1 5.101a1 1 0 0 0 1.415-1.414l-5.1-5.1A7 7 0 0 0 10 3"/></g></svg>
          </span>
          <input
            type="text"
            placeholder="Search ingredients..."
            value={searchText}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
      </form>

      {/* Badge degli ingredienti selezionati */}
      {selectedIngredients.length > 0 && (
        <div className={styles.selectedIngredients}>
          <span className={styles.selectedLabel}>Selected ingredients</span>
          <Badges ingredients={selectedIngredients} onRemove={handleRemoveIngredient} />
          <button
            className={styles.searchBtn}
            type="button"
            onClick={handleSearchRecipes}
            style={{ marginTop: 24 }}
          >
            Search Recipes
          </button>
        </div>
      )}

      {/* Lista risultati ricerca ingredienti */}
      {filteredResults.length > 0 && !showResults && (
        <div className={styles.resultsBox}>
          {filteredResults.map((ingredient) => (
            <div key={ingredient.id} className={styles.resultRow}>
              <button
                type="button"
                className={styles.resultBtn}
                onClick={() => handleAddIngredient(ingredient)}
              >
                {ingredient.name}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagina risultati ricette */}
      {showResults && (
        <div style={{ marginTop: 32, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {foundRecipes.length === 0 ? (
            <div style={{ color: '#d32f00', fontSize: '1.1rem', marginBottom: 24 }}>No recipes found.</div>
          ) : (
            foundRecipes.map(recipe => (
              <div key={recipe.id} onClick={() => setSelectedRecipe(recipe)} style={{ cursor: 'pointer' }}>
                <RecipeCard title={recipe.title} image={recipe.image} />
              </div>
            ))
          )}
          <button
            type="button"
            className={styles.searchBtn}
            style={{ marginTop: 18, background: '#eee', color: '#d32f00' }}
            onClick={handleBackToSearch}
          >
            Back to Search
          </button>
        </div>
      )}
    </section>
  );
}

export default SearchBar;
