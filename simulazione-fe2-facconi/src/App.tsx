

import React from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import './App.css';

const styles = {
  heroTitle: {
    fontSize: '2rem',
    fontWeight: 600,
    margin: '0 0 12px 0',
    color: '#222',
    textAlign: 'center' as const,
  },
  heroSubtitle: {
    color: '#666',
    fontSize: '1rem',
    marginBottom: '32px',
    textAlign: 'center' as const,
    lineHeight: 1.4,
  },
};

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <h2 style={styles.heroTitle}>What do we cook today?</h2>
        <p style={styles.heroSubtitle}>
          Search recipes by the ingredients<br />you have at home
        </p>
        <SearchBar />
      </main>
    </div>
  );
};

export default App;
