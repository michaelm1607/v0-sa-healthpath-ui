import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MapPin, ShieldCheck, Navigation, BarChart3 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 bg-accent/20 border border-accent/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-6 text-primary-foreground/80">
              <MapPin className="w-3 h-3" aria-hidden="true" />
              San Antonio, Texas
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6">
              SA HealthPath
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed mb-4 text-pretty">
              Practice public-health navigation judgment through realistic San Antonio scenarios.
            </p>
            <p className="text-sm sm:text-base text-primary-foreground/60 max-w-xl mx-auto leading-relaxed mb-10 text-pretty">
              Choose a simulated resident case, identify risk factors, assign urgency, choose a referral pathway, and
              receive feedback on your decision-making.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/scenarios"
                className="bg-accent text-accent-foreground font-semibold px-8 py-3 rounded-md text-base hover:opacity-90 transition-opacity"
              >
                Start Simulation
              </Link>
              <Link
                href="/scenarios"
                className="border border-primary-foreground/30 text-primary-foreground font-semibold px-8 py-3 rounded-md text-base hover:bg-primary-foreground/10 transition-colors"
              >
                View Scenarios
              </Link>
            </div>
          </div>
        </section>

        {/* Value cards */}
        <section className="py-16 px-4 bg-background" aria-labelledby="value-heading">
          <div className="max-w-5xl mx-auto">
            <h2 id="value-heading" className="sr-only">
              Core competencies
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <ValueCard
                icon={<ShieldCheck className="w-6 h-6 text-accent" aria-hidden="true" />}
                title="Recognize Risk"
                description="Identify clinical, social, and environmental risk factors in complex resident scenarios drawn from real San Antonio community health challenges."
              />
              <ValueCard
                icon={<Navigation className="w-6 h-6 text-accent" aria-hidden="true" />}
                title="Navigate Services"
                description="Practice selecting the right referral pathways across the San Antonio health and social-service ecosystem, including FQHC, VA, county, and nonprofit resources."
              />
              <ValueCard
                icon={<BarChart3 className="w-6 h-6 text-accent" aria-hidden="true" />}
                title="Improve Readiness"
                description="Receive competency-level feedback across five domains and track your readiness score over time to guide professional development."
              />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 px-4 bg-secondary" aria-labelledby="how-heading">
          <div className="max-w-5xl mx-auto">
            <h2
              id="how-heading"
              className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-10 text-center text-balance"
            >
              How a Simulation Works
            </h2>
            <ol className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { step: "1", label: "Review Case" },
                { step: "2", label: "Ask Questions" },
                { step: "3", label: "Identify Risks" },
                { step: "4", label: "Assign Urgency" },
                { step: "5", label: "Choose Pathway" },
                { step: "6", label: "Get Results" },
              ].map(({ step, label }) => (
                <li
                  key={step}
                  className="bg-card border border-border rounded-lg p-4 flex flex-col items-center text-center gap-2"
                >
                  <span className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {step}
                  </span>
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA banner */}
        <section className="py-16 px-4 bg-primary text-primary-foreground" aria-labelledby="cta-heading">
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="cta-heading" className="font-serif text-2xl sm:text-3xl font-bold mb-4 text-balance">
              Ready to build your navigation skills?
            </h2>
            <p className="text-primary-foreground/70 mb-8 leading-relaxed">
              Five scenario tracks spanning heat risk, housing instability, behavioral health, maternal care, and food
              access — all grounded in the San Antonio service landscape.
            </p>
            <Link
              href="/scenarios"
              className="bg-accent text-accent-foreground font-semibold px-10 py-3 rounded-md text-base hover:opacity-90 transition-opacity inline-block"
            >
              Browse All Scenarios
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-3 shadow-sm">
      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">{icon}</div>
      <h3 className="font-serif font-semibold text-lg text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
