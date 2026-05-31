"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProgressStepper } from "@/components/progress-stepper";
import { type Scenario, type Urgency, STEPS, URGENCY_OPTIONS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { User, MapPin, Globe, Shield, AlertTriangle, ChevronRight, ChevronLeft, Info, HelpCircle } from "lucide-react";

interface SimulatorState {
  selectedQuestions: string[];
  selectedRisks: string[];
  selectedUrgency: Urgency | null;
  selectedPathways: string[];
}

const URGENCY_COLORS: Record<Urgency, string> = {
  Low: "border-green-300 bg-green-50 text-green-800",
  Moderate: "border-amber-300 bg-amber-50 text-amber-800",
  High: "border-orange-300 bg-orange-50 text-orange-800",
  Immediate: "border-red-300 bg-red-50 text-red-800",
};

const URGENCY_ACTIVE: Record<Urgency, string> = {
  Low: "ring-2 ring-green-500 border-green-500 bg-green-100",
  Moderate: "ring-2 ring-amber-500 border-amber-500 bg-amber-100",
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
      <div className="mb-6">
        <ProgressStepper currentStep={currentStep} />
      </div>

      {/* Step content */}
      <div className="bg-card border border-border rounded-xl shadow-sm">
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
        {currentStep === "Results" && <ResultsPreviewStep state={state} />}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6 gap-4">
        <button
          onClick={handleBack}
          disabled={stepIndex === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          Back
        </button>

        <span className="text-xs text-muted-foreground hidden sm:block">
          Step {stepIndex + 1} of {STEPS.length}
        </span>

        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {currentStep === "Results" ? "Submit & View Feedback" : "Continue"}
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

/* ── Step Components ── */

function StepHeader({
  stepNumber,
  title,
  description,
  hint,
}: {
  stepNumber: number;
  title: string;
  description?: string;
  hint?: string;
}) {
  return (
    <div className="px-6 py-5 border-b border-border bg-secondary/30 rounded-t-xl">
      <div className="flex items-start gap-4">
        <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center flex-shrink-0">
          {stepNumber}
        </span>
        <div className="flex-1 min-w-0">
          <h2 className="font-serif font-bold text-lg text-foreground">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{description}</p>
          )}
          {hint && (
            <p className="text-xs text-primary mt-2 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" aria-hidden="true" />
              {hint}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ReviewCaseStep({ scenario }: { scenario: Scenario }) {
  return (
    <div>
      <StepHeader
        stepNumber={1}
        title="Review the Case"
        description="Read the resident profile and situation carefully. Look for clues that may indicate health or social risks."
      />
      <div className="p-6 flex flex-col gap-6">
        {/* Resident card */}
        <div className="bg-secondary/50 border border-border rounded-lg p-5">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <User className="w-7 h-7 text-primary" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Resident Profile
              </p>
              <h3 className="font-serif font-bold text-lg text-foreground">{scenario.resident.name}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {scenario.resident.age} years old &middot; {scenario.resident.gender}
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <ResidentDetail
                  icon={<MapPin className="w-4 h-4" />}
                  label="ZIP Code"
                  value={scenario.resident.zip}
                />
                <ResidentDetail
                  icon={<Globe className="w-4 h-4" />}
                  label="Primary Language"
                  value={scenario.resident.primaryLanguage}
                />
                <ResidentDetail
                  icon={<Shield className="w-4 h-4" />}
                  label="Insurance"
                  value={scenario.resident.insurance}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Situation */}
        <div>
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
            Presenting Situation
          </h3>
          <p className="text-sm text-foreground leading-relaxed bg-card border border-border rounded-lg p-4">
            {scenario.situation}
          </p>
        </div>

        {/* Risk clues */}
        <div>
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" aria-hidden="true" />
            Observable Indicators
          </h3>
          <p className="text-xs text-muted-foreground mb-3">
            These details were noted during the initial encounter. Consider what they might suggest.
          </p>
          <ul className="grid sm:grid-cols-2 gap-2">
            {scenario.riskClues.map((clue) => (
              <li
                key={clue}
                className="flex items-start gap-2.5 text-sm text-foreground bg-amber-50/50 border border-amber-100 rounded-md px-3 py-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" aria-hidden="true" />
                {clue}
              </li>
            ))}
          </ul>
        </div>

        {/* Context note */}
        <div className="flex items-start gap-3 text-xs text-muted-foreground bg-secondary/50 border border-border rounded-lg px-4 py-3">
          <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p>
            <strong className="text-foreground">Context:</strong> This resident is located in San Antonio, Texas (Bexar County). 
            Consider local resources including FQHCs, county health services, VA facilities, and community organizations.
          </p>
        </div>
      </div>
    </div>
  );
}

function ResidentDetail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5 bg-card border border-border rounded-md px-3 py-2">
      <span className="text-muted-foreground">{icon}</span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
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
        stepNumber={2}
        title="Select Screening Questions"
        description="Choose the 3 most important questions to ask this resident to better understand their situation and needs."
        hint={`${selected.length}/3 questions selected`}
      />
      <div className="p-6">
        <ul className="flex flex-col gap-2.5">
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
                    "w-full text-left px-4 py-3.5 rounded-lg border text-sm transition-all",
                    isSelected
                      ? "border-primary bg-primary/5 text-foreground ring-1 ring-primary"
                      : isDisabled
                      ? "border-border bg-muted/30 text-muted-foreground cursor-not-allowed opacity-50"
                      : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-secondary/50"
                  )}
                >
                  <span className="flex items-start gap-3">
                    <span
                      className={cn(
                        "w-5 h-5 mt-0.5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors",
                        isSelected ? "border-primary bg-primary" : "border-border"
                      )}
                      aria-hidden="true"
                    >
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                          <path
                            d="M2 6l3 3 5-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span>{q.text}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
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
        stepNumber={3}
        title="Identify Risk Factors"
        description="Based on the case information and screening questions, select all risk factors you believe are present. Not all options apply."
        hint={`${selected.length} risk factor${selected.length !== 1 ? "s" : ""} identified`}
      />
      <div className="p-6">
        <ul className="flex flex-col gap-2.5">
          {scenario.riskFactors.map((rf) => {
            const isSelected = selected.includes(rf.id);
            return (
              <li key={rf.id}>
                <button
                  onClick={() => onToggle(rf.id)}
                  aria-pressed={isSelected}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg border text-sm transition-all flex items-center gap-3",
                    isSelected
                      ? "border-primary bg-primary/5 text-foreground ring-1 ring-primary"
                      : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-secondary/50"
                  )}
                >
                  <span
                    className={cn(
                      "w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors",
                      isSelected ? "border-primary bg-primary" : "border-border"
                    )}
                    aria-hidden="true"
                  >
                    {isSelected && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  {rf.label}
                </button>
              </li>
            );
          })}
        </ul>
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
  const levels: { urgency: Urgency; timeline: string; description: string }[] = [
    {
      urgency: "Low",
      timeline: "Within 2-4 weeks",
      description: "No immediate risk. Provide preventive resources and schedule routine follow-up.",
    },
    {
      urgency: "Moderate",
      timeline: "Within 1-2 weeks",
      description: "Elevated risk factors present. Arrange services and check-in within two weeks.",
    },
    {
      urgency: "High",
      timeline: "Within 24-72 hours",
      description: "Significant risk to health or safety. Expedite service connection immediately.",
    },
    {
      urgency: "Immediate",
      timeline: "Same day / Now",
      description: "Acute crisis requiring immediate intervention. Activate emergency protocols.",
    },
  ];

  return (
    <div>
      <StepHeader
        stepNumber={4}
        title="Assign Urgency Level"
        description="Based on the risk factors you identified, determine how quickly this resident needs intervention."
      />
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {levels.map(({ urgency, timeline, description }) => {
            const isSelected = selected === urgency;
            return (
              <button
                key={urgency}
                onClick={() => onSelect(urgency)}
                aria-pressed={isSelected}
                className={cn(
                  "rounded-xl border-2 p-5 text-left transition-all",
                  isSelected ? URGENCY_ACTIVE[urgency] : URGENCY_COLORS[urgency],
                  "hover:scale-[1.01]"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-base">{urgency}</span>
                  <span className="text-xs font-medium opacity-70">{timeline}</span>
                </div>
                <p className="text-xs leading-relaxed opacity-80">{description}</p>
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
  const grouped = scenario.referralPathways.reduce<Record<string, typeof scenario.referralPathways>>(
    (acc, rp) => {
      if (!acc[rp.category]) acc[rp.category] = [];
      acc[rp.category].push(rp);
      return acc;
    },
    {}
  );

  return (
    <div>
      <StepHeader
        stepNumber={5}
        title="Choose Referral Pathways"
        description="Select the services and resources most appropriate for this resident. You may select multiple pathways across categories."
        hint={`${selected.length} pathway${selected.length !== 1 ? "s" : ""} selected`}
      />
      <div className="p-6 flex flex-col gap-6">
        {Object.entries(grouped).map(([category, pathways]) => (
          <div key={category}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
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
                        "w-full text-left px-4 py-3 rounded-lg border text-sm transition-all flex items-center gap-3",
                        isSelected
                          ? "border-accent bg-accent/5 text-foreground ring-1 ring-accent"
                          : "border-border bg-card text-foreground hover:border-accent/50 hover:bg-secondary/50"
                      )}
                    >
                      <span
                        className={cn(
                          "w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors",
                          isSelected ? "border-accent bg-accent" : "border-border"
                        )}
                        aria-hidden="true"
                      >
                        {isSelected && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
                            <path
                              d="M2 6l3 3 5-5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
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
      </div>
    </div>
  );
}

function ResultsPreviewStep({ state }: { state: SimulatorState }) {
  return (
    <div>
      <StepHeader
        stepNumber={6}
        title="Review Your Decisions"
        description="Confirm your selections before submitting. You will receive detailed feedback on each decision area."
      />
      <div className="p-6 flex flex-col gap-4 text-sm">
        <SummaryRow label="Screening Questions" value={`${state.selectedQuestions.length} selected`} />
        <SummaryRow label="Risk Factors Identified" value={`${state.selectedRisks.length} selected`} />
        <SummaryRow
          label="Urgency Level"
          value={state.selectedUrgency ?? "Not assigned"}
          highlight={state.selectedUrgency !== null}
        />
        <SummaryRow label="Referral Pathways" value={`${state.selectedPathways.length} selected`} />

        <div className="bg-primary/5 border border-primary/20 rounded-lg px-4 py-3 mt-2">
          <p className="text-xs text-foreground leading-relaxed">
            <strong>What happens next:</strong> After submitting, you will see your competency scores across five domains, 
            along with expert guidance on what you identified correctly and areas for improvement.
          </p>
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
