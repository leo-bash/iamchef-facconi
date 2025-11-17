export interface RecipeInterface {
  id: number;
  title: string;
  image: string;
  summary?: string;
  readyInMinutes?: number;
  servings?: number;
  pricePerServing?: number;
  healthScore?: number;
  extendedIngredients?: {
    id?: number;
    name?: string;
    measures?: {
      metric?: { amount?: number; unitShort?: string };
    };
  }[];
}
