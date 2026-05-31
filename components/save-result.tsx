"use client";

import { useEffect } from "react";
import { saveResult, readinessLevel, type ScenarioResult, type CategoryResult } from "@/lib/results-store";

interface SaveResultProps {
  scenarioId: string;
  scenarioTitle: string;
  finalScore: number;
  categories: CategoryResult[];
}

/**
 * Invisible client island rendered inside the server feedback page.
 * Persists the completed result to localStorage on first mount.
 */
export function SaveResult({ scenarioId, scenarioTitle, finalScore, categories }: SaveResultProps) {
  useEffect(() => {
    const result: ScenarioResult = {
      scenarioId,
      scenarioTitle,
      finalScore,
      categories,
      completedAt: new Date().toISOString(),
      readinessLevel: readinessLevel(finalScore),
    };
    saveResult(result);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
