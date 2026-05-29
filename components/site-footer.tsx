import { Activity } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-primary-foreground py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="flex items-center gap-2 font-serif font-bold text-lg">
          <Activity className="w-4 h-4 opacity-70" aria-hidden="true" />
          <span>SA HealthPath</span>
        </div>
        <p className="text-xs text-primary-foreground/60 max-w-2xl leading-relaxed">
          SA HealthPath uses simulated cases for education and training. It does not diagnose, provide medical advice,
          collect protected health information, or replace professional judgment. All scenario data is fictional and
          created solely for training purposes.
        </p>
      </div>
    </footer>
  );
}
