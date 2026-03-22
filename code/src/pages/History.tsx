import { useState, useEffect } from "react";
import { Recipe } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";
import RecipeDetail from "@/components/RecipeDetail";
import { History as HistoryIcon, Trash2 } from "lucide-react";

const HISTORY_KEY = "recipeai-history";

export function useRecipeHistory() {
  const [history, setHistory] = useState<Recipe[]>(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addToHistory = (recipe: Recipe) => {
    setHistory((prev) => {
      const updated = [recipe, ...prev.filter((r) => r.id !== recipe.id)].slice(0, 20);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  return { history, addToHistory, clearHistory };
}

export default function HistoryPage() {
  const { history, clearHistory } = useRecipeHistory();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">History</h1>
            <p className="mt-1 text-muted-foreground">Your previously generated recipes.</p>
          </div>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground hover:bg-secondary transition-colors"
            >
              <Trash2 className="h-4 w-4" /> Clear
            </button>
          )}
        </div>

        {history.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {history.map((recipe, i) => (
              <RecipeCard key={recipe.id} recipe={recipe} onClick={setSelectedRecipe} index={i} />
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center">
            <HistoryIcon className="mx-auto h-12 w-12 text-muted-foreground/40" />
            <p className="mt-3 text-muted-foreground">No recipes generated yet. Try the AI Generator!</p>
          </div>
        )}
      </div>

      <RecipeDetail recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
    </div>
  );
}
