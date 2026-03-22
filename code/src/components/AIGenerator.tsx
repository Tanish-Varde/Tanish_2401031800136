import { useState, useCallback } from "react";
import { generateMockRecipe, streamRecipe } from "@/lib/ai-mock";
import { Recipe } from "@/data/recipes";
import { Sparkles, ChefHat, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AIGeneratorProps {
  onRecipeGenerated: (recipe: Recipe) => void;
}

export default function AIGenerator({ onRecipeGenerated }: AIGeneratorProps) {
  const [ingredients, setIngredients] = useState("");
  const [diet, setDiet] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamedRecipe, setStreamedRecipe] = useState<Partial<Recipe> | null>(null);
  const [currentPhase, setCurrentPhase] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = useCallback(async () => {
    const trimmed = ingredients.trim();
    if (!trimmed) {
      setError("Please enter at least one ingredient.");
      return;
    }
    setError("");
    setIsGenerating(true);
    setStreamedRecipe(null);

    const ingredientList = trimmed.split(",").map((i) => i.trim()).filter(Boolean);
    const recipe = generateMockRecipe(ingredientList, {
      diet: diet || undefined,
      cuisine: cuisine || undefined,
    });

    for await (const chunk of streamRecipe(recipe)) {
      setCurrentPhase(chunk.phase);
      setStreamedRecipe((prev) => ({ ...prev, ...chunk }));
    }

    setIsGenerating(false);
    onRecipeGenerated(recipe);
  }, [ingredients, diet, cuisine, onRecipeGenerated]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="font-display text-xl font-bold text-card-foreground">AI Recipe Generator</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-card-foreground">Ingredients</label>
            <textarea
              value={ingredients}
              onChange={(e) => { setIngredients(e.target.value); setError(""); }}
              placeholder="e.g., chicken, garlic, lemon, olive oil..."
              className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              rows={3}
            />
            {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-card-foreground">Diet</label>
              <select
                value={diet}
                onChange={(e) => setDiet(e.target.value)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Any</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-card-foreground">Cuisine</label>
              <select
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Any</option>
                <option value="Indian">Indian</option>
                <option value="Italian">Italian</option>
                <option value="Thai">Thai</option>
                <option value="Mexican">Mexican</option>
                <option value="Asian">Asian</option>
                <option value="Mediterranean">Mediterranean</option>
                <option value="American">American</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Generating...
              </>
            ) : (
              <>
                <ChefHat className="h-4 w-4" /> Generate Recipe
              </>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {streamedRecipe && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4"
          >
            {streamedRecipe.title && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h3 className="font-display text-2xl font-bold text-card-foreground">{streamedRecipe.title}</h3>
                <p className="mt-1 text-muted-foreground">{streamedRecipe.description}</p>
              </motion.div>
            )}

            {streamedRecipe.ingredients && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h4 className="font-display font-semibold text-card-foreground">Ingredients</h4>
                <ul className="mt-2 grid gap-1 sm:grid-cols-2">
                  {streamedRecipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-card-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {ing}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {streamedRecipe.steps && streamedRecipe.steps.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h4 className="font-display font-semibold text-card-foreground">Instructions</h4>
                <ol className="mt-2 space-y-2">
                  {streamedRecipe.steps.map((step, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex gap-3 text-sm text-card-foreground"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {i + 1}
                      </span>
                      {step}
                    </motion.li>
                  ))}
                </ol>
              </motion.div>
            )}

            {currentPhase === "complete" && streamedRecipe.tips && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-lg bg-secondary p-4"
              >
                <h4 className="font-display font-semibold text-secondary-foreground">💡 Tips</h4>
                <ul className="mt-1 space-y-1">
                  {streamedRecipe.tips.map((tip, i) => (
                    <li key={i} className="text-sm text-muted-foreground">• {tip}</li>
                  ))}
                </ul>
              </motion.div>
            )}

            {isGenerating && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="capitalize">{currentPhase === "step" ? "Writing instructions..." : `Loading ${currentPhase}...`}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
