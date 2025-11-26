import { useState } from "react";
import { useStore } from "../store/Store";
import { useNavigate } from "react-router";
import "./Intro.css";

const Intro = () => {
  const [apiKey, setApiKeyInput] = useState("");

  const setApiKey = useStore(state => state.setApiKey);
  const navigate = useNavigate();

  const handleSave = () => {
    if (apiKey.trim()) {
      setApiKey(apiKey);
      console.log("API Key salvata nello store:", apiKey);

      // Redirect alla search  dopo il salvataggio della chaive api
      navigate("/");
    }
  };



  return (
    <div className="intro-container">
      <div className="intro-card">
        <h1 className="intro-title">Benvenuto</h1>
        <p className="intro-subtitle">
          Inserisci la tua API Key di Spoonacular per iniziare a scoprire ricette incredibili
        </p>

        <input
          type="text"
          value={apiKey}
          onChange={e => setApiKeyInput(e.target.value)}
          placeholder="Inserisci la tua API Key"
          className="intro-input"
        />

        <button
          onClick={handleSave}
          disabled={!apiKey.trim()}
          className="intro-button"
        >
          Inizia Ora
        </button>
      </div>
    </div>
  );
};

export default Intro;
