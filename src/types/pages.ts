import type { RecipeInterface } from "./recipes";

export type Page =
  | { page: "homepage" }
  | { page: "discover-recipes" }
  | { page: "recipe-details"; recipeData?: RecipeInterface };

export type CurrentPage = {
  currentPage: Page;
  id?: number;
};
