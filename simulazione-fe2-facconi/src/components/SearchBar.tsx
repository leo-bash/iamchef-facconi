
import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { Ingredient } from '../types/Ingredient';
import { ingredients } from '../data/ingredients';
import styles from './SearchBar.module.css';

function SearchBar() {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredResults, setFilteredResults] = useState<Ingredient[]>([]);

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

  return (
    <section className={styles.heroSection}>
    
      <form className={styles.form} autoComplete="off" onSubmit={e => e.preventDefault()}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Search ingredients..."
            value={searchText}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
      </form>

      {filteredResults.length > 0 && (
        <div className={styles.resultsContainer}>
          <h3 className={styles.resultsTitle}>Results ({filteredResults.length}):</h3>
          <ul className={styles.resultsList}>
            {filteredResults.map((ingredient) => (
              <li key={ingredient.id} className={styles.resultItem}>
                <span className={styles.name}>{ingredient.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

    </section>
  );
};

export default SearchBar;
