import { useState, useMemo, useCallback } from "react";
import { recipes, Recipe } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";
import RecipeDetail from "@/components/RecipeDetail";
import { Search, Filter } from "lucide-react";

const cuisines = ["All", "Indian", "Italian", "Thai", "Mexican", "Asian", "Mediterranean", "American"];
const categories = ["All", "Vegetarian", "Non-Vegetarian"];
const difficulties = ["All", "Easy", "Medium", "Hard"];

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.ingredients.some((i) => i.toLowerCase().includes(search.toLowerCase()));
      const matchCuisine = cuisineFilter === "All" || r.cuisine === cuisineFilter;
      const matchCategory = categoryFilter === "All" || r.category === categoryFilter;
      const matchDifficulty = difficultyFilter === "All" || r.difficulty === difficultyFilter;
      return matchSearch && matchCuisine && matchCategory && matchDifficulty;
    });
  }, [search, cuisineFilter, categoryFilter, difficultyFilter]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Explore Recipes</h1>
        <p className="mt-1 text-muted-foreground">Browse our curated collection of delicious recipes.</p>

        <div className="mt-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by recipe name or ingredient..."
              className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={cuisineFilter}
              onChange={(e) => setCuisineFilter(e.target.value)}
              className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {cuisines.map((c) => <option key={c} value={c}>{c === "All" ? "All Cuisines" : c}</option>)}
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {categories.map((c) => <option key={c} value={c}>{c === "All" ? "All Diets" : c}</option>)}
            </select>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {difficulties.map((d) => <option key={d} value={d}>{d === "All" ? "All Levels" : d}</option>)}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((recipe, i) => (
            <RecipeCard key={recipe.id} recipe={recipe} onClick={setSelectedRecipe} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-16 text-center">
            <Filter className="mx-auto h-12 w-12 text-muted-foreground/40" />
            <p className="mt-3 text-muted-foreground">No recipes found. Try adjusting your filters.</p>
          </div>
        )}
      </div>

      <RecipeDetail recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
    </div>
  );
}
