import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { scenarios } from "@/lib/data";
import { Clock, ChevronRight } from "lucide-react";
import type { Difficulty } from "@/lib/data";
import { cn } from "@/lib/utils";

const difficultyStyles: Record<Difficulty, string> = {
  Introductory: "bg-green-100 text-green-800 border border-green-200",
  Intermediate: "bg-yellow-100 text-yellow-800 border border-yellow-200",
  Advanced: "bg-red-100 text-red-800 border border-red-200",
};

export default function ScenariosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 bg-background py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Page header */}
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Simulation Library
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground text-balance">
              Choose a Scenario
            </h1>
            <p className="mt-3 text-muted-foreground leading-relaxed max-w-xl text-pretty">
              Each scenario presents a San Antonio resident case. Work through triage, risk identification, urgency
              assignment, and referral selection before receiving competency feedback.
            </p>
          </div>

          {/* Scenario grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {scenarios.map((scenario, index) => (
              <article
                key={scenario.id}
                className="bg-card border border-border rounded-xl shadow-sm flex flex-col overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Card header strip */}
                <div className="bg-secondary px-5 py-3 flex items-center justify-between border-b border-border">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Case {index + 1}
                  </span>
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "text-xs font-semibold px-2.5 py-0.5 rounded-full",
                        difficultyStyles[scenario.difficulty]
                      )}
                    >
                      {scenario.difficulty}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {scenario.estimatedMinutes} min
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <h2 className="font-serif font-bold text-lg text-foreground leading-snug">{scenario.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{scenario.summary}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
                    {scenario.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card footer */}
                <div className="px-5 pb-5">
                  <Link
                    href={`/scenarios/${scenario.id}`}
                    className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity"
                  >
                    Begin Case
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
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
