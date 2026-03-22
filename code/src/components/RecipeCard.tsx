import { Recipe } from "@/data/recipes";
import { Clock, Users, Flame, ChefHat } from "lucide-react";
import { motion } from "framer-motion";

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
  index?: number;
}

const difficultyColor: Record<string, string> = {
  Easy: "bg-herb text-herb-foreground",
  Medium: "bg-accent text-accent-foreground",
  Hard: "bg-spice text-spice-foreground",
};

export default function RecipeCard({ recipe, onClick, index = 0 }: RecipeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -4 }}
      onClick={() => onClick(recipe)}
      className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="relative h-44 bg-warm-surface flex items-center justify-center overflow-hidden">
        <ChefHat className="h-16 w-16 text-primary/20 group-hover:text-primary/30 transition-colors" />
        <div className="absolute top-3 left-3">
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${difficultyColor[recipe.difficulty]}`}>
            {recipe.difficulty}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
            {recipe.cuisine}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
          {recipe.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{recipe.description}</p>
        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {recipe.cookingTime}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {recipe.servings}
          </span>
          <span className="flex items-center gap-1">
            <Flame className="h-3.5 w-3.5" /> {recipe.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
