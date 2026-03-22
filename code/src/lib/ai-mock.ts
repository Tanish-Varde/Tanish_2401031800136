import { Recipe } from "@/data/recipes";

const recipeTemplates: Omit<Recipe, "id" | "image">[] = [
  {
    title: "Spiced {0} Stir Fry",
    description: "A quick and flavorful stir fry featuring {0} with aromatic spices.",
    ingredients: [],
    steps: [
      "Prepare and chop all the ingredients.",
      "Heat oil in a large wok or skillet over high heat.",
      "Add garlic and ginger, sauté for 30 seconds.",
      "Add the main ingredients and stir fry for 3-4 minutes.",
      "Season with soy sauce, salt, and pepper.",
      "Toss everything together and cook for another 2 minutes.",
      "Serve hot with steamed rice or noodles.",
    ],
    cookingTime: "20 min",
    difficulty: "Easy",
    cuisine: "Asian",
    category: "Vegetarian",
    tips: ["Keep the heat high for the best wok flavor.", "Don't overcrowd the pan."],
    servings: 2,
  },
  {
    title: "Creamy {0} Pasta",
    description: "Indulgent pasta dish with {0} in a rich cream sauce.",
    ingredients: [],
    steps: [
      "Cook pasta in salted boiling water until al dente.",
      "In a separate pan, sauté garlic in olive oil.",
      "Add the main ingredients and cook until tender.",
      "Pour in cream and let it simmer for 5 minutes.",
      "Toss in the cooked pasta and mix well.",
      "Season with salt, pepper, and parmesan.",
      "Serve immediately with fresh herbs.",
    ],
    cookingTime: "25 min",
    difficulty: "Easy",
    cuisine: "Italian",
    category: "Vegetarian",
    tips: ["Reserve pasta water to adjust sauce consistency."],
    servings: 2,
  },
  {
    title: "{0} Curry Bowl",
    description: "Aromatic curry made with {0}, coconut milk, and warm spices.",
    ingredients: [],
    steps: [
      "Heat oil and sauté onions until translucent.",
      "Add ginger-garlic paste and cook for 1 minute.",
      "Add curry powder, turmeric, and cumin.",
      "Add the main ingredients and stir to coat with spices.",
      "Pour in coconut milk and bring to a simmer.",
      "Cook for 15-20 minutes until everything is tender.",
      "Garnish with cilantro and serve with rice or naan.",
    ],
    cookingTime: "35 min",
    difficulty: "Medium",
    cuisine: "Indian",
    category: "Vegetarian",
    tips: ["Toast your spices for deeper flavor."],
    servings: 3,
  },
  {
    title: "Roasted {0} Salad",
    description: "A vibrant salad with roasted {0}, greens, and a tangy dressing.",
    ingredients: [],
    steps: [
      "Preheat oven to 200°C.",
      "Toss the main ingredients with olive oil, salt, and pepper.",
      "Roast on a baking sheet for 20-25 minutes.",
      "Prepare a dressing with lemon juice, olive oil, and honey.",
      "Arrange greens on a plate and top with roasted ingredients.",
      "Drizzle dressing and add nuts or seeds for crunch.",
      "Serve warm or at room temperature.",
    ],
    cookingTime: "30 min",
    difficulty: "Easy",
    cuisine: "Mediterranean",
    category: "Vegetarian",
    servings: 2,
  },
  {
    title: "{0} Soup",
    description: "Comforting and hearty soup loaded with {0} and herbs.",
    ingredients: [],
    steps: [
      "Dice onion, garlic, and celery for the base.",
      "Sauté in olive oil until softened.",
      "Add the main ingredients and stir.",
      "Pour in vegetable or chicken stock.",
      "Bring to a boil then reduce to a simmer.",
      "Cook for 20-25 minutes until tender.",
      "Season with salt, pepper, and fresh herbs. Blend if desired.",
    ],
    cookingTime: "30 min",
    difficulty: "Easy",
    cuisine: "American",
    category: "Vegetarian",
    tips: ["Use immersion blender for a smoother texture."],
    servings: 4,
  },
];

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

export function generateMockRecipe(
  ingredients: string[],
  preferences?: {
    diet?: string;
    cuisine?: string;
    difficulty?: string;
  }
): Recipe {
  const mainIngredient = capitalize(ingredients[0]?.trim() || "Vegetable");
  const templateIndex = Math.floor(Math.random() * recipeTemplates.length);
  const template = { ...recipeTemplates[templateIndex] };

  const title = template.title.replace("{0}", mainIngredient);
  const description = template.description.split("{0}").join(mainIngredient);

  const allIngredients = [
    ...ingredients.map((i) => i.trim()),
    "Salt to taste",
    "2 tbsp olive oil",
    "2 cloves garlic",
    "Black pepper",
  ];

  const recipe: Recipe = {
    id: `gen-${Date.now()}`,
    title,
    description,
    ingredients: allIngredients,
    steps: template.steps,
    cookingTime: template.cookingTime,
    difficulty: (preferences?.difficulty as Recipe["difficulty"]) || template.difficulty,
    cuisine: preferences?.cuisine || template.cuisine,
    category: preferences?.diet === "Non-Vegetarian" ? "Non-Vegetarian" : template.category,
    tips: template.tips,
    servings: template.servings,
  };

  return recipe;
}

export async function* streamRecipe(recipe: Recipe): AsyncGenerator<Partial<Recipe> & { phase: string }> {
  await delay(400);
  yield { phase: "title", title: recipe.title, description: recipe.description };

  await delay(300);
  yield { phase: "ingredients", ingredients: recipe.ingredients };

  for (let i = 0; i < recipe.steps.length; i++) {
    await delay(250);
    yield { phase: "step", steps: recipe.steps.slice(0, i + 1) };
  }

  await delay(200);
  yield {
    phase: "complete",
    cookingTime: recipe.cookingTime,
    difficulty: recipe.difficulty,
    cuisine: recipe.cuisine,
    category: recipe.category,
    tips: recipe.tips,
    servings: recipe.servings,
  };
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
