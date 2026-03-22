import { useState, useEffect, useCallback } from "react";
import { Recipe } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";
import RecipeDetail from "@/components/RecipeDetail";
import { Heart, HeartOff } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const FAVORITES_KEY = "recipeai-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Recipe[]>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((recipe: Recipe) => {
    setFavorites((prev) => {
      const exists = prev.some((r) => r.id === recipe.id);
      if (exists) {
        toast.info("Removed from favorites");
        return prev.filter((r) => r.id !== recipe.id);
      }
      toast.success("Added to favorites!");
      return [...prev, recipe];
    });
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.some((r) => r.id === id),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
}

export default function Favorites() {
  const { favorites } = useFavorites();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3">
            <Heart className="h-7 w-7 text-primary" />
            <h1 className="font-display text-3xl font-bold text-foreground">Your Favorites</h1>
          </div>
          <p className="mt-2 text-muted-foreground">
            Recipes you've saved for later. Click the heart icon on any recipe to add it here.
          </p>
        </motion.div>

        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-warm-glow py-20"
          >
            <HeartOff className="mb-4 h-12 w-12 text-muted-foreground/40" />
            <h3 className="font-display text-xl font-semibold text-foreground">No favorites yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Browse recipes and tap the heart icon to save them here.
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((recipe, i) => (
              <RecipeCard key={recipe.id} recipe={recipe} onClick={setSelectedRecipe} index={i} />
            ))}
          </div>
        )}
      </div>

      <RecipeDetail recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
    </div>
  );
}
