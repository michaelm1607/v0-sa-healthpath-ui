import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { scenarios } from "@/lib/data";
import { cn } from "@/lib/utils";
import { RotateCcw, ArrowRight, Award, Target, TrendingUp, CheckCircle2, BarChart3 } from "lucide-react";

// Simulated aggregate scores (placeholder data)
const completedIds = ["heat-risk", "food-transport"];
const completedScenarios = scenarios.filter((s) => completedIds.includes(s.id));

const aggregateCategories = [
  { label: "Risk Recognition", score: 82, desc: "Identifying clinical and social risk factors" },
  { label: "Urgency Judgment", score: 87, desc: "Assessing case severity and timeline" },
  { label: "Referral Fit", score: 79, desc: "Matching residents to appropriate services" },
  { label: "Communication & Language Access", score: 62, desc: "Considering language and cultural needs" },
  { label: "Safety Awareness", score: 84, desc: "Recognizing safety concerns and crisis indicators" },
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
      <main className="flex-1 bg-background py-10 sm:py-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          {/* Page header */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Training Progress
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground text-balance">
              Your Readiness Dashboard
            </h1>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed max-w-2xl">
              Track your public-health navigation competencies across all completed scenarios. 
              Complete more cases to build a comprehensive picture of your strengths and areas for growth.
            </p>
          </div>

          {/* Top stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={<Award className="w-5 h-5 text-primary-foreground" aria-hidden="true" />}
              label="Readiness Score"
              value={`${overallReadiness}`}
              sub="out of 100"
              variant="primary"
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
              icon={<Target className="w-5 h-5 text-amber-600" aria-hidden="true" />}
              label="Focus Area"
              value={weakest.score.toString()}
              sub={weakest.label}
            />
          </div>

          {/* Competency breakdown */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-secondary/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-base text-foreground">
                    Competency Breakdown
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Performance across five navigation domains
                  </p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                Based on {completedScenarios.length} completed case{completedScenarios.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="p-6 flex flex-col gap-5">
              {aggregateCategories.map(({ label, score, desc }) => (
                <div key={label}>
                  <div className="flex items-start sm:items-center justify-between mb-2 gap-2">
                    <div>
                      <span className="text-sm font-medium text-foreground">{label}</span>
                      <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">{desc}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-sm font-bold text-foreground tabular-nums">{score}</span>
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full font-medium",
                          score >= 80
                            ? "bg-green-100 text-green-700"
                            : score >= 60
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        )}
                      >
                        {score >= 80 ? "Proficient" : score >= 60 ? "Developing" : "Needs Work"}
                      </span>
                    </div>
                  </div>
                  <div
                    className="w-full bg-secondary rounded-full h-2 overflow-hidden"
                    role="progressbar"
                    aria-valuenow={score}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={label}
                  >
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        score >= 80 ? "bg-accent" : score >= 60 ? "bg-amber-400" : "bg-red-400"
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
            <div className="px-6 py-4 border-b border-border bg-secondary/30">
              <h2 className="font-serif font-bold text-base text-foreground">Completed Scenarios</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Review your past performance or replay to improve your score
              </p>
            </div>
            {completedScenarios.length > 0 ? (
              <ul className="divide-y divide-border">
                {completedScenarios.map((s) => {
                  const avgScore = Math.round(
                    Object.values(s.categoryScores).reduce((a, b) => a + b, 0) /
                      Object.values(s.categoryScores).length
                  );
                  return (
                    <li key={s.id} className="px-6 py-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{s.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {s.difficulty} &middot; {s.estimatedMinutes} min
                        </p>
                      </div>
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <span className="text-sm font-bold text-foreground tabular-nums">
                          {avgScore}
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
                  );
                })}
              </ul>
            ) : (
              <div className="px-6 py-8 text-center">
                <p className="text-sm text-muted-foreground">No scenarios completed yet.</p>
              </div>
            )}
          </div>

          {/* Remaining scenarios */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-secondary/30">
              <h2 className="font-serif font-bold text-base text-foreground">Remaining Cases</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Complete more cases to build your readiness profile
              </p>
            </div>
            <ul className="divide-y divide-border">
              {scenarios
                .filter((s) => !completedIds.includes(s.id))
                .map((s) => (
                  <li key={s.id} className="px-6 py-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{s.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {s.difficulty} &middot; {s.estimatedMinutes} min
                      </p>
                    </div>
                    <Link
                      href={`/scenarios/${s.id}`}
                      className="flex items-center gap-1.5 text-xs text-primary-foreground bg-primary font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex-shrink-0"
                    >
                      Begin Case
                      <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/scenarios/${completedScenarios[completedScenarios.length - 1]?.id || scenarios[0].id}`}
              className="flex items-center justify-center gap-2 flex-1 border border-border bg-card text-foreground font-semibold py-3 rounded-lg text-sm hover:bg-secondary transition-colors"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              Replay Last Case
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
  variant = "default",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  variant?: "default" | "primary";
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-5 flex flex-col gap-3",
        variant === "primary" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"
      )}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center",
          variant === "primary" ? "bg-primary-foreground/10" : "bg-secondary"
        )}
      >
        {icon}
      </div>
      <div>
        <p
          className={cn(
            "text-2xl font-bold font-serif tabular-nums",
            variant === "primary" ? "text-primary-foreground" : "text-foreground"
          )}
        >
          {value}
        </p>
        <p
          className={cn(
            "text-xs mt-0.5 leading-snug",
            variant === "primary" ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {sub}
        </p>
      </div>
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-wider",
          variant === "primary" ? "text-primary-foreground/80" : "text-muted-foreground"
        )}
      >
        {label}
      </p>
    </div>
  );
}
