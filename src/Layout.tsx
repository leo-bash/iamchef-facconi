import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import "./App.css";

//FIXME: Creare componenti vuoti per riempire la pagina come da design (SuggestedRecipes, Footer, ecc.)




function Layout() {
  const [isViewingRecipes, setIsViewingRecipes] = useState(false);

  return (
    <div className="app">
      <Header />
      <div className="layout">
        <div className="container">
          <main className="main">
            {!isViewingRecipes && (
              <>
                <h2 className="heroTitle">What do we cook today?</h2>
                <p className="heroSubtitle">
                  Search recipes by the ingredients<br />you have at home
                </p>
              </>
            )}
            <SearchBar onViewChange={setIsViewingRecipes} />
          </main>
          {!isViewingRecipes && (
            <aside className="sidebar">
              {/* Qui puoi inserire componenti come SuggestedRecipes, filtri, ecc. */}
              <div className="suggested-placeholder">Suggested Recipes (coming soon)</div>
            </aside>
          )}
        </div>
      </div>
      <footer className="footer">
        <span>© 2025 I Am Chef</span>
      </footer>
    </div>
  );
}

export default Layout;
