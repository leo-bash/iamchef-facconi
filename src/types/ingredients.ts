export interface IngredientInterface {
  id?: number;
  name: string;
  measures?: {
    metric?: {
      amount?: number;
      unitShort?: string;
    };
  };
}
