import { motion } from "framer-motion";
import { ChefHat, Sparkles, BookOpen, Heart, Users, Zap } from "lucide-react";

const features = [
  { icon: Sparkles, title: "AI-Powered", desc: "Smart recipe generation based on your available ingredients and preferences." },
  { icon: BookOpen, title: "Recipe Library", desc: "Browse a curated collection of recipes across cuisines and difficulty levels." },
  { icon: Heart, title: "Save Favorites", desc: "Bookmark recipes you love and access them anytime from your favorites." },
  { icon: Zap, title: "Instant Results", desc: "Get complete recipes with instructions in seconds, not minutes." },
];

const team = [
  { name: "Chef AI", role: "Head Chef & Algorithm", emoji: "👨‍🍳" },
  { name: "Spice Bot", role: "Flavor Engineer", emoji: "🌶️" },
  { name: "Sous Vide", role: "Precision Specialist", emoji: "🍳" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-warm-surface py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <ChefHat className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              About <span className="text-gradient-warm">RecipeAI</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              RecipeAI is your intelligent cooking companion. We combine the art of cooking with the power of
              artificial intelligence to help you create delicious meals from whatever ingredients you have on hand.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-display text-3xl font-bold text-foreground">Our Mission</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We believe everyone deserves a great meal, no matter their skill level or what's in the pantry.
            Our mission is to eliminate food waste, inspire creativity in the kitchen, and make cooking
            accessible and enjoyable for all.
          </p>
        </motion.div>
      </section>

      {/* Features */}
      <section className="bg-warm-glow py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center font-display text-3xl font-bold text-foreground">What We Offer</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-10 text-center font-display text-3xl font-bold text-foreground">Meet the Team</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="w-48 rounded-xl border border-border bg-card p-6 text-center shadow-sm"
            >
              <div className="text-5xl mb-3">{m.emoji}</div>
              <h3 className="font-display text-lg font-semibold text-foreground">{m.name}</h3>
              <p className="text-sm text-muted-foreground">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-warm-surface py-16">
        <div className="container mx-auto px-4 text-center">
          <Users className="mx-auto mb-4 h-8 w-8 text-primary" />
          <h2 className="font-display text-2xl font-bold text-foreground">Ready to Start Cooking?</h2>
          <p className="mt-2 text-muted-foreground">Join thousands of home chefs using RecipeAI every day.</p>
          <a
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <ChefHat className="h-4 w-4" /> Get Started
          </a>
        </div>
      </section>
    </div>
  );
}
