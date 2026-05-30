import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { scenarios } from "@/lib/data";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, TrendingUp } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ q?: string; r?: string; u?: string; p?: string }>;
}

function calcScore(scenario: (typeof scenarios)[0], answers: { q: string[]; r: string[]; u: string; p: string[] }) {
  const correctQ = scenario.screeningQuestions.filter((q) => q.correct).map((q) => q.id);
  const qHits = answers.q.filter((id) => correctQ.includes(id)).length;

  const correctR = scenario.riskFactors.filter((r) => r.correct).map((r) => r.id);
  const rHits = answers.r.filter((id) => correctR.includes(id)).length;

  const correctP = scenario.referralPathways.filter((p) => p.correct).map((p) => p.id);
  const pHits = answers.p.filter((id) => correctP.includes(id)).length;

  // Use categoryScores as max points per category and compute proportional earned scores
  const { categoryScores } = scenario;
  const riskRecognition = Math.round((rHits / Math.max(correctR.length, 1)) * categoryScores.riskRecognition);
  const urgencyJudgment = answers.u === scenario.correctUrgency
    ? categoryScores.urgencyJudgment
    : Math.round(categoryScores.urgencyJudgment * 0.4);
  const referralFit = Math.round((pHits / Math.max(correctP.length, 1)) * categoryScores.referralFit);

  // Language/Communication: check if language-access risk factor AND/OR bilingual pathway selected
  const languageRiskIds = scenario.riskFactors
    .filter((r) => r.correct && /language|communication|bilingual/i.test(r.label))
    .map((r) => r.id);
  const languagePathwayIds = scenario.referralPathways
    .filter((p) => p.correct && /bilingual|language|interpreter/i.test(p.label))
    .map((p) => p.id);
  const languageHit =
    languageRiskIds.some((id) => answers.r.includes(id)) ||
    languagePathwayIds.some((id) => answers.p.includes(id));
  const communicationLanguage = languageHit
    ? categoryScores.communicationLanguage
    : Math.round(categoryScores.communicationLanguage * 0.3);

  // Safety: check insulin/medication storage risk
  const safetyRiskIds = scenario.riskFactors
    .filter((r) => r.correct && /insulin|medication|storage|safety|suicid|firearm|lethal/i.test(r.label))
    .map((r) => r.id);
  const safetyHit = safetyRiskIds.length === 0 || safetyRiskIds.some((id) => answers.r.includes(id));
  const safetyAwareness = safetyHit
    ? categoryScores.safetyAwareness
    : Math.round(categoryScores.safetyAwareness * 0.4);

  const maxPoints =
    categoryScores.riskRecognition +
    categoryScores.urgencyJudgment +
    categoryScores.referralFit +
    categoryScores.communicationLanguage +
    categoryScores.safetyAwareness;
  const earnedPoints = riskRecognition + urgencyJudgment + referralFit + communicationLanguage + safetyAwareness;
  const overall = Math.min(100, Math.round((earnedPoints / maxPoints) * 100));

  // Compute missed items dynamically from unselected correct risk factors and referral pathways
  const missedRisks = scenario.riskFactors
    .filter((r) => r.correct && !answers.r.includes(r.id))
    .map((r) => `Risk factor not identified: ${r.label}`);
  const missedPathways = scenario.referralPathways
    .filter((p) => p.correct && !answers.p.includes(p.id))
    .map((p) => `Referral not selected: ${p.label}`);
  const dynamicMissed = [...missedRisks, ...missedPathways];
  const missed = dynamicMissed.length > 0 ? dynamicMissed : scenario.feedback.missed;

  return {
    overall,
    missed,
    categories: [
      { label: "Risk Recognition", score: riskRecognition, max: categoryScores.riskRecognition },
      { label: "Urgency Judgment", score: urgencyJudgment, max: categoryScores.urgencyJudgment },
      { label: "Referral Fit", score: referralFit, max: categoryScores.referralFit },
      { label: "Communication & Language Access", score: communicationLanguage, max: categoryScores.communicationLanguage },
      { label: "Safety Awareness", score: safetyAwareness, max: categoryScores.safetyAwareness },
    ],
  };
}

export default async function FeedbackPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const sp = await searchParams;
  const scenario = scenarios.find((s) => s.id === id);
  if (!scenario) notFound();

  const answers = {
    q: sp.q ? sp.q.split(",").filter(Boolean) : [],
    r: sp.r ? sp.r.split(",").filter(Boolean) : [],
    u: sp.u ?? "",
    p: sp.p ? sp.p.split(",").filter(Boolean) : [],
  };

  const { overall, categories, missed } = calcScore(scenario, answers);
  const { feedback } = scenario;

  const scoreColor =
    overall >= 80 ? "text-green-700 bg-green-50 border-green-200"
    : overall >= 60 ? "text-yellow-700 bg-yellow-50 border-yellow-200"
    : "text-red-700 bg-red-50 border-red-200";

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 bg-background py-10 px-4">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          {/* Header */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Score & Feedback</p>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-balance">
              {scenario.title}
            </h1>
          </div>

          {/* Overall score */}
          <div className={cn("border rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6", scoreColor)}>
            <div className="flex flex-col items-center justify-center w-28 h-28 rounded-full border-4 border-current flex-shrink-0">
              <span className="text-3xl font-bold font-serif">{overall}</span>
              <span className="text-xs font-semibold opacity-70">/ 100</span>
            </div>
            <div>
              <p className="font-serif font-bold text-xl mb-1">Overall Score</p>
              <p className="text-sm opacity-80 leading-relaxed">
                {overall >= 80
                  ? "Strong performance. You demonstrated solid public-health navigation judgment."
                  : overall >= 60
                  ? "Good effort. Review the feedback below to strengthen your decision-making."
                  : "Keep practicing. Focus on the feedback areas below to improve your readiness."}
              </p>
            </div>
          </div>

          {/* Category scores */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-secondary">
              <h2 className="font-serif font-bold text-base text-foreground">Category Scores</h2>
            </div>
            <div className="p-6 flex flex-col gap-4">
              {categories.map(({ label, score, max }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-foreground">{label}</span>
                    <span className="text-sm font-bold text-foreground">{score}<span className="text-muted-foreground font-normal text-xs">/{max}</span></span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden" role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={max} aria-label={label}>
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        score / max >= 0.8 ? "bg-accent" : score / max >= 0.6 ? "bg-yellow-400" : "bg-red-400"
                      )}
                      style={{ width: `${Math.round((score / max) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback panels */}
          <div className="grid sm:grid-cols-2 gap-4">
            <FeedbackPanel
              icon={<CheckCircle2 className="w-5 h-5 text-green-600" />}
              title="What you recognized"
              items={feedback.recognized}
              variant="positive"
            />
            <FeedbackPanel
              icon={<XCircle className="w-5 h-5 text-red-500" />}
              title="What you missed"
              items={missed}
              variant="negative"
            />
          </div>

          {/* Stronger pathway */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-serif font-semibold text-base text-foreground mb-2">Stronger Pathway</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feedback.strongerPathway}</p>
              </div>
            </div>
          </div>

          {/* Why it matters */}
          <div className="bg-primary text-primary-foreground rounded-xl p-6">
            <h3 className="font-serif font-semibold text-base mb-2">Why It Matters</h3>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">{feedback.whyItMatters}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/scenarios/${scenario.id}`}
              className="flex items-center justify-center gap-2 flex-1 border border-border bg-card text-foreground font-semibold py-3 rounded-lg text-sm hover:bg-secondary transition-colors"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              Replay Scenario
            </Link>
            <Link
              href="/scenarios"
              className="flex items-center justify-center gap-2 flex-1 bg-primary text-primary-foreground font-semibold py-3 rounded-lg text-sm hover:opacity-90 transition-opacity"
            >
              Try Another Case
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 flex-1 bg-accent text-accent-foreground font-semibold py-3 rounded-lg text-sm hover:opacity-90 transition-opacity"
            >
              View Dashboard
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function FeedbackPanel({
  icon,
  title,
  items,
  variant,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  variant: "positive" | "negative";
}) {
  return (
    <div className={cn(
      "rounded-xl border p-5",
      variant === "positive" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
    )}>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="font-semibold text-sm text-foreground">{title}</h3>
      </div>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-foreground">
            <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0", variant === "positive" ? "bg-green-600" : "bg-red-500")} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
