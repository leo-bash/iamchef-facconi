
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IngredientInterface } from "../types/ingredients";


type StoreState = {
  apiKey: string;
  setApiKey: (key: string) => void;
  selectedIng: IngredientInterface[];
  setSelectedIng: (ingredients: IngredientInterface[]) => void;
};

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      apiKey: "",
      setApiKey: (key: string) => set({ apiKey: key }),
      selectedIng: [],
      setSelectedIng: (ingredients: IngredientInterface[]) => set({ selectedIng: ingredients })
    }),
    {
      name: "api-key-storage" 
    }
  )
);
