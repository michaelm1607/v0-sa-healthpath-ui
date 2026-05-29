import Link from "next/link";
import { Activity } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Branding */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Activity className="w-4 h-4 text-primary" aria-hidden="true" />
            </div>
            <div>
              <p className="font-serif font-semibold text-sm text-foreground">SA HealthPath</p>
              <p className="text-xs text-muted-foreground">Public Health Navigation Simulator</p>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground" aria-label="Footer navigation">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link href="/scenarios" className="hover:text-foreground transition-colors">Scenarios</Link>
            <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
          </nav>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground leading-relaxed max-w-3xl">
            SA HealthPath is a training simulation for public-health workforce development. It does not provide medical advice, 
            diagnose conditions, or collect protected health information. All scenarios and resident profiles are fictional.
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            &copy; {new Date().getFullYear()} SA HealthPath &middot; San Antonio, Texas &middot; For demonstration purposes only
          </p>
        </div>
      </div>
    </footer>
  );
}
