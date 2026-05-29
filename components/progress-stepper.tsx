import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { STEPS, type Step } from "@/lib/data";

interface ProgressStepperProps {
  currentStep: Step;
}

export function ProgressStepper({ currentStep }: ProgressStepperProps) {
  const currentIndex = STEPS.indexOf(currentStep);

  return (
    <nav aria-label="Simulation progress" className="w-full">
      <ol className="flex items-center">
        {STEPS.map((step, index) => {
          const isDone = index < currentIndex;
          const isActive = index === currentIndex;

          return (
            <li key={step} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <span
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors",
                    isDone && "bg-accent border-accent text-white",
                    isActive && "bg-primary border-primary text-primary-foreground",
                    !isDone && !isActive && "bg-card border-border text-muted-foreground"
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isDone ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : index + 1}
                </span>
                <span
                  className={cn(
                    "text-[10px] font-medium whitespace-nowrap hidden sm:block",
                    isActive ? "text-primary font-semibold" : isDone ? "text-accent" : "text-muted-foreground"
                  )}
                >
                  {step}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={cn("flex-1 h-0.5 mx-1 mb-3 sm:mb-4", index < currentIndex ? "bg-accent" : "bg-border")}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
