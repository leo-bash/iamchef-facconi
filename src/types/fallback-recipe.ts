import type { RecipeInterface } from "./recipes";

//* qui inserisco le ricette di fallback, ovvero le ricette statiche da usare finchè non collego l'api.
//* In questo modo posso gestirle in maniera modulare e molto più comoda

export const fallbackRecipe: RecipeInterface = {
	id: 1,
	title: "Sushi Rolls",
	image: "https://img.spoonacular.com/recipes/982365-556x370.jpg",
	imageType: "jpg",
	servings: 2,
	readyInMinutes: 45,
	cookingMinutes: 30,
	preparationMinutes: 15,
	cuisines: ["Japanese"],
	dishTypes: ["lunch", "main course"],
	extendedIngredients: [
		{
			aisle: "Seafood",
			amount: 200,
			consistency: "solid",
			id: 15000,
			image: "salmon.jpg",
			measures: {
				metric: { amount: 200, unitLong: "grammi", unitShort: "g" },
				us: { amount: 7, unitLong: "ounces", unitShort: "oz" },
			},
			meta: ["crudo"],
			name: "filetto di salmone",
			original: "200g filetto di salmone, crudo",
			originalName: "filetto di salmone",
			unit: "g",
		},
		{
			aisle: "Pasta and Rice",
			amount: 150,
			consistency: "solid",
			id: 20052,
			image: "white-rice.jpg",
			measures: {
				metric: { amount: 150, unitLong: "grammi", unitShort: "g" },
				us: { amount: 5.3, unitLong: "ounces", unitShort: "oz" },
			},
			meta: [],
			name: "riso per sushi",
			original: "150g riso per sushi",
			originalName: "riso per sushi",
			unit: "g",
		},
		{
			aisle: "Produce",
			amount: 1,
			consistency: "solid",
			id: 11457,
			image: "cucumber.jpg",
			measures: {
				metric: { amount: 1, unitLong: "", unitShort: "" },
				us: { amount: 1, unitLong: "", unitShort: "" },
			},
			meta: ["julienne"],
			name: "cetriolo",
			original: "1 cetriolo, tagliato a julienne",
			originalName: "cetriolo",
			unit: "",
		},
		{
			aisle: "Algae",
			amount: 2,
			consistency: "solid",
			id: 11451,
			image: "nori.jpg",
			measures: {
				metric: { amount: 2, unitLong: "fogli", unitShort: "fogli" },
				us: { amount: 2, unitLong: "sheets", unitShort: "sheets" },
			},
			meta: [],
			name: "fogli di nori",
			original: "2 fogli di nori",
			originalName: "fogli di nori",
			unit: "fogli",
		},
	],
	summary:
		"Classici sushi roll giapponesi con salmone, riso, cetriolo e nori.",
	winePairing: null,
};
