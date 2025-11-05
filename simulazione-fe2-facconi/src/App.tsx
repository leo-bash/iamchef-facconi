import Header from './components/Header';
import SearchBar from './components/SearchBar';
import './App.css';

//FIXME: Creare componenti vuoti per riempire la pagina come da design (SuggestedRecipes, Footer, ecc.)



function App() {

const handleSearch = (ingredients: string[]) => {
  console.log('Searching recipes with ingredients:', ingredients);
}


  return (
    <div className="app">
      <Header />
      <main className="main">
        <h2 className="heroTitle">What do we cook today?</h2>
        <p className="heroSubtitle">
          Search recipes by the ingredients<br />you have at home
        </p>
        <SearchBar onSearch={handleSearch} />
      </main>
    </div>
  );
}

export default App;
