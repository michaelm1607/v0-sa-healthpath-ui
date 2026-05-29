import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { scenarios } from "@/lib/data";
import { Clock, ChevronRight, Users } from "lucide-react";
import type { Difficulty } from "@/lib/data";
import { cn } from "@/lib/utils";

const difficultyStyles: Record<Difficulty, string> = {
  Introductory: "bg-green-50 text-green-700 border-green-200",
  Intermediate: "bg-amber-50 text-amber-700 border-amber-200",
  Advanced: "bg-red-50 text-red-700 border-red-200",
};

const difficultyDesc: Record<Difficulty, string> = {
  Introductory: "Good starting point",
  Intermediate: "Some complexity",
  Advanced: "Complex decision-making",
};

export default function ScenariosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 bg-background py-10 sm:py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Page header */}
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Simulation Library
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground text-balance">
              Choose a Case Scenario
            </h1>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed max-w-2xl">
              Select a scenario below to begin. Each case presents a fictional San Antonio resident with a unique 
              health or social situation. You will assess risks, determine urgency, and recommend services.
            </p>
          </div>

          {/* Quick guide */}
          <div className="bg-secondary/50 border border-border rounded-lg p-4 mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">New to SA HealthPath?</p>
                <p className="text-xs text-muted-foreground">Start with an Introductory case to learn the flow.</p>
              </div>
            </div>
            <div className="sm:ml-auto flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" aria-hidden="true" />
                Introductory
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" aria-hidden="true" />
                Intermediate
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500" aria-hidden="true" />
                Advanced
              </span>
            </div>
          </div>

          {/* Scenario grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {scenarios.map((scenario, index) => (
              <article
                key={scenario.id}
                className="bg-card border border-border rounded-xl flex flex-col overflow-hidden hover:border-primary/30 hover:shadow-md transition-all"
              >
                {/* Card header */}
                <div className="px-5 py-3.5 border-b border-border flex items-center justify-between bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span
                      className={cn(
                        "text-xs font-medium px-2.5 py-1 rounded-full border",
                        difficultyStyles[scenario.difficulty]
                      )}
                    >
                      {scenario.difficulty}
                    </span>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    {scenario.estimatedMinutes} min
                  </span>
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <h2 className="font-serif font-bold text-lg text-foreground leading-snug">{scenario.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{scenario.summary}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {scenario.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card footer */}
                <div className="px-5 pb-5 pt-2">
                  <Link
                    href={`/scenarios/${scenario.id}`}
                    className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity"
                  >
                    Begin Case
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    {difficultyDesc[scenario.difficulty]}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
