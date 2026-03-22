import { useState, useCallback } from "react";
import { Recipe, recipes } from "@/data/recipes";
import AIGenerator from "@/components/AIGenerator";
import RecipeCard from "@/components/RecipeCard";
import RecipeDetail from "@/components/RecipeDetail";
import { useRecipeHistory } from "@/pages/History";
import heroImage from "@/assets/hero-food.jpg";
import { Search, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Index() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [search, setSearch] = useState("");
  const { addToHistory } = useRecipeHistory();

  const handleRecipeGenerated = useCallback((recipe: Recipe) => {
    addToHistory(recipe);
  }, [addToHistory]);

  const featured = recipes.slice(0, 6);
  const searchResults = search
    ? recipes.filter(
        (r) =>
          r.title.toLowerCase().includes(search.toLowerCase()) ||
          r.ingredients.some((i) => i.toLowerCase().includes(search.toLowerCase()))
      )
    : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Fresh cooking ingredients" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/40" />
        </div>
        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground leading-tight">
              Your Smart <span className="text-gradient-warm">Cooking</span> Assistant
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Tell us what ingredients you have, and our AI will craft the perfect recipe for you.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        {/* Search */}
        <div className="relative max-w-xl mx-auto -mt-16 mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search recipes by name or ingredient..."
              className="w-full rounded-xl border border-border bg-card pl-12 pr-4 py-4 text-foreground shadow-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          {search && searchResults.length > 0 && (
            <div className="absolute z-10 mt-2 w-full rounded-xl border border-border bg-card p-3 shadow-xl max-h-72 overflow-y-auto">
              {searchResults.slice(0, 5).map((r) => (
                <button
                  key={r.id}
                  onClick={() => { setSelectedRecipe(r); setSearch(""); }}
                  className="w-full text-left rounded-lg px-3 py-2.5 text-sm hover:bg-secondary transition-colors text-card-foreground"
                >
                  <span className="font-medium">{r.title}</span>
                  <span className="ml-2 text-muted-foreground text-xs">{r.cuisine} · {r.cookingTime}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* AI Generator */}
          <div className="lg:col-span-2">
            <AIGenerator onRecipeGenerated={handleRecipeGenerated} />
          </div>

          {/* Featured Recipes */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-2xl font-bold text-foreground">Featured Recipes</h2>
              <Link
                to="/explore"
                className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {featured.map((recipe, i) => (
                <RecipeCard key={recipe.id} recipe={recipe} onClick={setSelectedRecipe} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <RecipeDetail recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
    </div>
  );
}
