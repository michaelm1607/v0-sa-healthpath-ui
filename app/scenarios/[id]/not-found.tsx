import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AlertCircle, ChevronLeft } from "lucide-react";

export default function ScenarioNotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 bg-background flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center flex flex-col items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="w-7 h-7 text-destructive" aria-hidden="true" />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-serif text-2xl font-bold text-foreground">Scenario Not Found</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This scenario does not exist or the link may be outdated. Return to the scenario library to choose a valid case.
            </p>
          </div>
          <Link
            href="/scenarios"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            Back to Scenarios
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
