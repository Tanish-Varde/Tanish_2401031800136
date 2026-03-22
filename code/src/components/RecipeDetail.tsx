import { Recipe } from "@/data/recipes";
import { X, Clock, Users, Flame, ChefHat, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface RecipeDetailProps {
  recipe: Recipe | null;
  onClose: () => void;
}

export default function RecipeDetail({ recipe, onClose }: RecipeDetailProps) {
  if (!recipe) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-background p-6 shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-secondary p-1.5 text-secondary-foreground hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="mb-4">
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              {recipe.cuisine}
            </span>
          </div>

          <h2 className="font-display text-2xl font-bold text-foreground">{recipe.title}</h2>
          <p className="mt-2 text-muted-foreground">{recipe.description}</p>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary" /> {recipe.cookingTime}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-primary" /> {recipe.servings} servings
            </span>
            <span className="flex items-center gap-1.5">
              <Flame className="h-4 w-4 text-primary" /> {recipe.difficulty}
            </span>
            <span className="flex items-center gap-1.5">
              <ChefHat className="h-4 w-4 text-primary" /> {recipe.category}
            </span>
          </div>

          <div className="mt-6">
            <h3 className="font-display text-lg font-semibold text-foreground">Ingredients</h3>
            <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-card-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="font-display text-lg font-semibold text-foreground">Instructions</h3>
            <ol className="mt-2 space-y-3">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-card-foreground">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {recipe.tips && recipe.tips.length > 0 && (
            <div className="mt-6 rounded-lg bg-secondary p-4">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-secondary-foreground">
                <Lightbulb className="h-5 w-5 text-accent" /> Tips
              </h3>
              <ul className="mt-2 space-y-1">
                {recipe.tips.map((tip, i) => (
                  <li key={i} className="text-sm text-muted-foreground">• {tip}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
