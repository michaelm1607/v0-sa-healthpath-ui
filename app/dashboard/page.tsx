import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { scenarios } from "@/lib/data";
import { cn } from "@/lib/utils";
import { RotateCcw, ArrowRight, Award, Target, TrendingUp, CheckCircle2 } from "lucide-react";

// Simulated aggregate scores for the dashboard (placeholder data)
const completedIds = ["heat-risk", "food-transport"];
const completedScenarios = scenarios.filter((s) => completedIds.includes(s.id));

const aggregateCategories = [
  { label: "Risk Recognition", score: 82 },
  { label: "Urgency Judgment", score: 87 },
  { label: "Referral Fit", score: 79 },
  { label: "Communication & Language Access", score: 62 },
  { label: "Safety Awareness", score: 84 },
];

const overallReadiness = Math.round(
  aggregateCategories.reduce((acc, c) => acc + c.score, 0) / aggregateCategories.length
);

const strongest = [...aggregateCategories].sort((a, b) => b.score - a.score)[0];
const weakest = [...aggregateCategories].sort((a, b) => a.score - b.score)[0];

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 bg-background py-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-10">

          {/* Page header */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Training Progress</p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground text-balance">
              Readiness Dashboard
            </h1>
            <p className="mt-2 text-muted-foreground text-sm leading-relaxed max-w-xl">
              Track your public-health navigation competencies across all completed scenarios. Scores reflect simulated
              performance — complete more cases to build a fuller picture.
            </p>
          </div>

          {/* Top stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={<Award className="w-5 h-5 text-primary" aria-hidden="true" />}
              label="Readiness Score"
              value={`${overallReadiness}`}
              sub="out of 100"
              accent
            />
            <StatCard
              icon={<CheckCircle2 className="w-5 h-5 text-accent" aria-hidden="true" />}
              label="Cases Completed"
              value={`${completedScenarios.length}`}
              sub={`of ${scenarios.length} scenarios`}
            />
            <StatCard
              icon={<TrendingUp className="w-5 h-5 text-green-600" aria-hidden="true" />}
              label="Strongest Area"
              value={strongest.score.toString()}
              sub={strongest.label}
            />
            <StatCard
              icon={<Target className="w-5 h-5 text-yellow-600" aria-hidden="true" />}
              label="Improve Here"
              value={weakest.score.toString()}
              sub={weakest.label}
            />
          </div>

          {/* Competency breakdown */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-secondary flex items-center justify-between">
              <h2 className="font-serif font-bold text-base text-foreground">
                Public Health Navigation Readiness Score
              </h2>
              <span className="text-xs text-muted-foreground">Based on {completedScenarios.length} completed cases</span>
            </div>
            <div className="p-6 flex flex-col gap-5">
              {aggregateCategories.map(({ label, score }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-foreground">{label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-foreground">{score}</span>
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full font-semibold",
                          score >= 80 ? "bg-green-100 text-green-700" : score >= 60 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                        )}
                      >
                        {score >= 80 ? "Proficient" : score >= 60 ? "Developing" : "Needs Work"}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden" role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        score >= 80 ? "bg-accent" : score >= 60 ? "bg-yellow-400" : "bg-red-400"
                      )}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed scenarios */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-secondary">
              <h2 className="font-serif font-bold text-base text-foreground">Completed Scenarios</h2>
            </div>
            <ul className="divide-y divide-border">
              {completedScenarios.map((s) => (
                <li key={s.id} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{s.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.difficulty} &middot; {s.estimatedMinutes} min</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-sm font-bold text-foreground">
                      {Math.round(
                        Object.values(s.categoryScores).reduce((a, b) => a + b, 0) /
                          Object.values(s.categoryScores).length
                      )}
                      <span className="text-muted-foreground font-normal">/100</span>
                    </span>
                    <Link
                      href={`/scenarios/${s.id}`}
                      className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline"
                    >
                      <RotateCcw className="w-3 h-3" aria-hidden="true" />
                      Replay
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Remaining scenarios */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-secondary">
              <h2 className="font-serif font-bold text-base text-foreground">Remaining Cases</h2>
            </div>
            <ul className="divide-y divide-border">
              {scenarios.filter((s) => !completedIds.includes(s.id)).map((s) => (
                <li key={s.id} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{s.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.difficulty} &middot; {s.estimatedMinutes} min</p>
                  </div>
                  <Link
                    href={`/scenarios/${s.id}`}
                    className="flex items-center gap-1.5 text-xs text-primary-foreground bg-primary font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity flex-shrink-0"
                  >
                    Begin Case
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/scenarios/${completedScenarios[completedScenarios.length - 1]?.id}`}
              className="flex items-center justify-center gap-2 flex-1 border border-border bg-card text-foreground font-semibold py-3 rounded-lg text-sm hover:bg-secondary transition-colors"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              Replay Last Scenario
            </Link>
            <Link
              href="/scenarios"
              className="flex items-center justify-center gap-2 flex-1 bg-primary text-primary-foreground font-semibold py-3 rounded-lg text-sm hover:opacity-90 transition-opacity"
            >
              Try Another Case
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
  accent = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div className={cn(
      "rounded-xl border p-5 flex flex-col gap-2",
      accent ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"
    )}>
      <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", accent ? "bg-primary-foreground/10" : "bg-secondary")}>
        {icon}
      </div>
      <div>
        <p className={cn("text-2xl font-bold font-serif", accent ? "text-primary-foreground" : "text-foreground")}>{value}</p>
        <p className={cn("text-xs mt-0.5", accent ? "text-primary-foreground/60" : "text-muted-foreground")}>{sub}</p>
      </div>
      <p className={cn("text-xs font-semibold uppercase tracking-wide", accent ? "text-primary-foreground/70" : "text-muted-foreground")}>
        {label}
      </p>
    </div>
  );
}
