"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProgressStepper } from "@/components/progress-stepper";
import { type Scenario, type Urgency, STEPS, URGENCY_OPTIONS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { User, MapPin, Globe, Shield, AlertTriangle, ChevronRight, ChevronLeft } from "lucide-react";

interface SimulatorState {
  selectedQuestions: string[];
  selectedRisks: string[];
  selectedUrgency: Urgency | null;
  selectedPathways: string[];
}

const URGENCY_COLORS: Record<Urgency, string> = {
  Low: "border-green-400 bg-green-50 text-green-800",
  Moderate: "border-yellow-400 bg-yellow-50 text-yellow-800",
  High: "border-orange-400 bg-orange-50 text-orange-800",
  Immediate: "border-red-400 bg-red-50 text-red-800",
};

const URGENCY_ACTIVE: Record<Urgency, string> = {
  Low: "ring-2 ring-green-500 border-green-500 bg-green-100",
  Moderate: "ring-2 ring-yellow-500 border-yellow-500 bg-yellow-100",
  High: "ring-2 ring-orange-500 border-orange-500 bg-orange-100",
  Immediate: "ring-2 ring-red-500 border-red-500 bg-red-100",
};

export function ScenarioSimulator({ scenario }: { scenario: Scenario }) {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [state, setState] = useState<SimulatorState>({
    selectedQuestions: [],
    selectedRisks: [],
    selectedUrgency: null,
    selectedPathways: [],
  });

  const currentStep = STEPS[stepIndex];

  const toggleItem = (key: keyof SimulatorState, id: string) => {
    setState((prev) => {
      const arr = prev[key] as string[];
      return {
        ...prev,
        [key]: arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id],
      };
    });
  };

  const canProceed = () => {
    if (currentStep === "Ask Questions") return state.selectedQuestions.length === 3;
    if (currentStep === "Identify Risks") return state.selectedRisks.length >= 1;
    if (currentStep === "Assign Urgency") return state.selectedUrgency !== null;
    if (currentStep === "Choose Pathway") return state.selectedPathways.length >= 1;
    return true;
  };

  const handleNext = () => {
    if (currentStep === "Results") {
      // Encode answers and go to feedback page
      const params = new URLSearchParams({
        q: state.selectedQuestions.join(","),
        r: state.selectedRisks.join(","),
        u: state.selectedUrgency ?? "",
        p: state.selectedPathways.join(","),
      });
      router.push(`/scenarios/${scenario.id}/feedback?${params.toString()}`);
      return;
    }
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  };

  const handleBack = () => setStepIndex((i) => Math.max(i - 1, 0));

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <ProgressStepper currentStep={currentStep} />
      </div>

      {/* Step content */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        {currentStep === "Review Case" && <ReviewCaseStep scenario={scenario} />}
        {currentStep === "Ask Questions" && (
          <AskQuestionsStep
            scenario={scenario}
            selected={state.selectedQuestions}
            onToggle={(id) => toggleItem("selectedQuestions", id)}
          />
        )}
        {currentStep === "Identify Risks" && (
          <IdentifyRisksStep
            scenario={scenario}
            selected={state.selectedRisks}
            onToggle={(id) => toggleItem("selectedRisks", id)}
          />
        )}
        {currentStep === "Assign Urgency" && (
          <AssignUrgencyStep
            selected={state.selectedUrgency}
            onSelect={(u) => setState((p) => ({ ...p, selectedUrgency: u }))}
          />
        )}
        {currentStep === "Choose Pathway" && (
          <ChoosePathwayStep
            scenario={scenario}
            selected={state.selectedPathways}
            onToggle={(id) => toggleItem("selectedPathways", id)}
          />
        )}
        {currentStep === "Results" && (
          <ResultsPreviewStep state={state} />
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={handleBack}
          disabled={stepIndex === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          Back
        </button>

        <span className="text-xs text-muted-foreground">
          Step {stepIndex + 1} of {STEPS.length}
        </span>

        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {currentStep === "Results" ? "Submit Decision" : "Continue"}
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      {/* Hint */}
      {currentStep === "Ask Questions" && (
        <p className="text-center text-xs text-muted-foreground mt-3">
          Select exactly 3 screening questions to ask this resident.
        </p>
      )}
    </div>
  );
}

/* ── Step Components ── */

function StepHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="px-6 py-5 border-b border-border bg-secondary">
      <h2 className="font-serif font-bold text-lg text-foreground">{title}</h2>
      {description && <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{description}</p>}
    </div>
  );
}

function ReviewCaseStep({ scenario }: { scenario: Scenario }) {
  return (
    <div>
      <StepHeader title="Review the Case" description="Read the resident profile and situation carefully before proceeding." />
      <div className="p-6 flex flex-col gap-6">
        {/* Resident card */}
        <div className="bg-secondary border border-border rounded-lg p-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-primary" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif font-bold text-base text-foreground">{scenario.resident.name}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Age {scenario.resident.age} &middot; {scenario.resident.gender}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                <ResidentDetail icon={<MapPin className="w-3.5 h-3.5" />} label="ZIP" value={scenario.resident.zip} />
                <ResidentDetail icon={<Globe className="w-3.5 h-3.5" />} label="Language" value={scenario.resident.primaryLanguage} />
                <ResidentDetail icon={<Shield className="w-3.5 h-3.5" />} label="Insurance" value={scenario.resident.insurance} />
              </div>
            </div>
          </div>
        </div>

        {/* Situation */}
        <div>
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">Situation Summary</h3>
          <p className="text-sm text-foreground leading-relaxed">{scenario.situation}</p>
        </div>

        {/* Risk clues */}
        <div>
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-yellow-500" aria-hidden="true" />
            Visible Risk Clues
          </h3>
          <ul className="grid sm:grid-cols-2 gap-2">
            {scenario.riskClues.map((clue) => (
              <li key={clue} className="flex items-start gap-2 text-sm text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" aria-hidden="true" />
                {clue}
              </li>
            ))}
          </ul>
        </div>

        {/* Location context */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 border border-border rounded-md px-3 py-2">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
          Location context: San Antonio, Texas — Bexar County Public Health Service Area
        </div>
      </div>
    </div>
  );
}

function ResidentDetail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <span className="opacity-60">{icon}</span>
      <span className="text-xs text-muted-foreground">{label}:</span>
      <span className="text-xs font-medium text-foreground">{value}</span>
    </div>
  );
}

function AskQuestionsStep({
  scenario,
  selected,
  onToggle,
}: {
  scenario: Scenario;
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div>
      <StepHeader
        title="Select Screening Questions"
        description="Choose the 3 most important questions to ask this resident given what you know about their situation."
      />
      <div className="p-6">
        <ul className="flex flex-col gap-3">
          {scenario.screeningQuestions.map((q) => {
            const isSelected = selected.includes(q.id);
            const isDisabled = !isSelected && selected.length >= 3;
            return (
              <li key={q.id}>
                <button
                  onClick={() => !isDisabled && onToggle(q.id)}
                  aria-pressed={isSelected}
                  disabled={isDisabled}
                  className={cn(
                    "w-full text-left px-4 py-3.5 rounded-lg border text-sm transition-colors",
                    isSelected
                      ? "border-primary bg-primary/10 text-foreground font-medium"
                      : isDisabled
                      ? "border-border bg-muted/30 text-muted-foreground cursor-not-allowed opacity-50"
                      : "border-border bg-card text-foreground hover:border-primary/60 hover:bg-secondary"
                  )}
                >
                  <span className="flex items-start gap-3">
                    <span
                      className={cn(
                        "w-5 h-5 mt-0.5 rounded border-2 flex-shrink-0 flex items-center justify-center",
                        isSelected ? "border-primary bg-primary" : "border-border"
                      )}
                      aria-hidden="true"
                    >
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    {q.text}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          {selected.length}/3 questions selected
        </p>
      </div>
    </div>
  );
}

function IdentifyRisksStep({
  scenario,
  selected,
  onToggle,
}: {
  scenario: Scenario;
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div>
      <StepHeader
        title="Identify Risk Factors"
        description="Select all risk factors present in this case. Choose carefully — not all options apply."
      />
      <div className="p-6">
        <ul className="grid sm:grid-cols-2 gap-3">
          {scenario.riskFactors.map((rf) => {
            const isSelected = selected.includes(rf.id);
            return (
              <li key={rf.id}>
                <button
                  onClick={() => onToggle(rf.id)}
                  aria-pressed={isSelected}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors flex items-center gap-3",
                    isSelected
                      ? "border-primary bg-primary/10 text-foreground font-medium"
                      : "border-border bg-card text-foreground hover:border-primary/60 hover:bg-secondary"
                  )}
                >
                  <span
                    className={cn(
                      "w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center",
                      isSelected ? "border-primary bg-primary" : "border-border"
                    )}
                    aria-hidden="true"
                  >
                    {isSelected && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  {rf.label}
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">{selected.length} risk factor{selected.length !== 1 ? "s" : ""} selected</p>
      </div>
    </div>
  );
}

function AssignUrgencyStep({
  selected,
  onSelect,
}: {
  selected: Urgency | null;
  onSelect: (u: Urgency) => void;
}) {
  const descriptions: Record<Urgency, string> = {
    Low: "No immediate risk. Monitor and provide preventive resources.",
    Moderate: "Elevated risk. Schedule follow-up within 1–2 weeks.",
    High: "Significant risk. Arrange services within 24–72 hours.",
    Immediate: "Acute safety or health risk. Act within hours.",
  };

  return (
    <div>
      <StepHeader
        title="Assign Urgency Level"
        description="Based on the risk factors you identified, select the appropriate urgency level for this case."
      />
      <div className="p-6">
        <div className="grid sm:grid-cols-2 gap-4">
          {URGENCY_OPTIONS.map((level) => {
            const isSelected = selected === level;
            return (
              <button
                key={level}
                onClick={() => onSelect(level)}
                aria-pressed={isSelected}
                className={cn(
                  "rounded-xl border-2 p-5 text-left transition-all",
                  isSelected ? URGENCY_ACTIVE[level] : URGENCY_COLORS[level],
                  "hover:opacity-90"
                )}
              >
                <div className="font-bold text-base mb-1">{level}</div>
                <div className="text-xs leading-relaxed opacity-80">{descriptions[level]}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ChoosePathwayStep({
  scenario,
  selected,
  onToggle,
}: {
  scenario: Scenario;
  selected: string[];
  onToggle: (id: string) => void;
}) {
  // Group by category
  const grouped = scenario.referralPathways.reduce<Record<string, typeof scenario.referralPathways>>((acc, rp) => {
    if (!acc[rp.category]) acc[rp.category] = [];
    acc[rp.category].push(rp);
    return acc;
  }, {});

  return (
    <div>
      <StepHeader
        title="Choose Referral Pathways"
        description="Select the most appropriate referral pathways for this resident. You may choose more than one."
      />
      <div className="p-6 flex flex-col gap-5">
        {Object.entries(grouped).map(([category, pathways]) => (
          <div key={category}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              {category}
            </h3>
            <ul className="flex flex-col gap-2">
              {pathways.map((rp) => {
                const isSelected = selected.includes(rp.id);
                return (
                  <li key={rp.id}>
                    <button
                      onClick={() => onToggle(rp.id)}
                      aria-pressed={isSelected}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors flex items-center gap-3",
                        isSelected
                          ? "border-accent bg-accent/10 text-foreground font-medium"
                          : "border-border bg-card text-foreground hover:border-accent/60 hover:bg-secondary"
                      )}
                    >
                      <span
                        className={cn(
                          "w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center",
                          isSelected ? "border-accent bg-accent" : "border-border"
                        )}
                        aria-hidden="true"
                      >
                        {isSelected && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      {rp.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        <p className="text-xs text-muted-foreground">{selected.length} pathway{selected.length !== 1 ? "s" : ""} selected</p>
      </div>
    </div>
  );
}

function ResultsPreviewStep({ state }: { state: SimulatorState }) {
  return (
    <div>
      <StepHeader
        title="Review Your Decisions"
        description="Confirm your selections before submitting for feedback."
      />
      <div className="p-6 flex flex-col gap-5 text-sm">
        <SummaryRow label="Screening Questions" value={`${state.selectedQuestions.length} selected`} />
        <SummaryRow label="Risk Factors Identified" value={`${state.selectedRisks.length} selected`} />
        <SummaryRow
          label="Urgency Level"
          value={state.selectedUrgency ?? "—"}
          highlight={state.selectedUrgency !== null}
        />
        <SummaryRow label="Referral Pathways" value={`${state.selectedPathways.length} selected`} />
        <div className="bg-secondary border border-border rounded-lg px-4 py-3 text-xs text-muted-foreground leading-relaxed">
          Click <strong className="text-foreground">Submit Decision</strong> to receive your competency score and
          detailed feedback across all five domains.
        </div>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("font-semibold", highlight ? "text-primary" : "text-foreground")}>{value}</span>
    </div>
  );
}
