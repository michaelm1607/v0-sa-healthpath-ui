/**
 * Client-side result persistence for SA HealthPath.
 * Stored under a versioned localStorage key so stale data from prior
 * schema versions is automatically discarded.
 */

const STORE_KEY = "sahealthpath_results_v2";

export interface CategoryResult {
  label: string;
  score: number;
  max: number;
}

export interface ScenarioResult {
  scenarioId: string;
  scenarioTitle: string;
  /** 0-100 overall score */
  finalScore: number;
  categories: CategoryResult[];
  completedAt: string; // ISO timestamp
  /** "Beginner" | "Developing" | "Proficient" | "Expert" */
  readinessLevel: string;
}

export function readinessLevel(score: number): string {
  if (score >= 90) return "Expert";
  if (score >= 75) return "Proficient";
  if (score >= 55) return "Developing";
  return "Beginner";
}

/** Load all stored results. Returns [] if nothing saved or on SSR. */
export function loadResults(): ScenarioResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ScenarioResult[];
  } catch {
    return [];
  }
}

/**
 * Save a result, replacing any prior attempt for the same scenarioId
 * (most-recent-wins semantics).
 */
export function saveResult(result: ScenarioResult): void {
  if (typeof window === "undefined") return;
  const existing = loadResults().filter((r) => r.scenarioId !== result.scenarioId);
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify([...existing, result]));
  } catch {
    // Storage quota exceeded – silently ignore
  }
}

/** Remove all stored results (used for testing / reset). */
export function clearResults(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORE_KEY);
}
