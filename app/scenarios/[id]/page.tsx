import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScenarioSimulator } from "@/components/scenario-simulator";
import { scenarios } from "@/lib/data";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ScenarioPage({ params }: PageProps) {
  const { id } = await params;
  const scenario = scenarios.find((s) => s.id === id);
  if (!scenario) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 bg-background py-10 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <Link
            href="/scenarios"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            Back to Scenarios
          </Link>

          {/* Scenario title */}
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
              Active Case
            </p>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-balance">
              {scenario.title}
            </h1>
          </div>

          {/* Simulator */}
          <ScenarioSimulator scenario={scenario} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export async function generateStaticParams() {
  return scenarios.map((s) => ({ id: s.id }));
}
