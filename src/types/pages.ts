import type { RecipeInterface } from "./recipes";

export type CurrentPage = {
  currentPage: Page;
  id?: number;
};

export type Page =
  | { page: "intro" }
  | { page: "homepage" }
  | { page: "discover-recipes" }
  | { page: "recipe-details"; recipeData?: RecipeInterface };
