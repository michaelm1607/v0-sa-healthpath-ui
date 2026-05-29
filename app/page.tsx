import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ShieldCheck, Navigation, BarChart3, ArrowRight, CheckCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-card border-b border-border py-16 sm:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-primary mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
                Public Health Workforce Training
              </span>
              
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance mb-4">
                Build Your Public Health Navigation Skills
              </h1>
              
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-3 text-pretty">
                SA HealthPath is a training simulator for community health workers, case managers, and public health professionals in San Antonio.
              </p>
              
              <p className="text-sm text-muted-foreground max-w-xl leading-relaxed mb-8 text-pretty">
                Practice identifying risk factors, assessing urgency, and selecting appropriate referral pathways through realistic resident scenarios.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Link
                  href="/scenarios"
                  className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity"
                >
                  Start Your First Case
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/about"
                  className="flex items-center justify-center gap-2 border border-border text-foreground font-medium px-8 py-3 rounded-lg text-sm hover:bg-secondary transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works - Primary Flow Explanation */}
        <section className="py-12 sm:py-16 px-4 bg-secondary/50" aria-labelledby="flow-heading">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                The Simulation Flow
              </p>
              <h2 id="flow-heading" className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-balance">
                Six Steps to Better Decision-Making
              </h2>
              <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">
                Each simulation guides you through a structured decision process used in real public health navigation.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {[
                { step: "1", label: "Review Case", desc: "Read the resident profile and situation" },
                { step: "2", label: "Ask Questions", desc: "Select screening questions to gather information" },
                { step: "3", label: "Identify Risks", desc: "Flag clinical and social risk factors" },
                { step: "4", label: "Assign Urgency", desc: "Determine the appropriate response timeline" },
                { step: "5", label: "Choose Pathway", desc: "Select referral services and resources" },
                { step: "6", label: "Get Feedback", desc: "Review your score and expert guidance" },
              ].map(({ step, label, desc }) => (
                <div
                  key={step}
                  className="bg-card border border-border rounded-lg p-4 flex flex-col items-center text-center"
                >
                  <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mb-3">
                    {step}
                  </span>
                  <span className="text-sm font-semibold text-foreground mb-1">{label}</span>
                  <span className="text-xs text-muted-foreground leading-snug">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Competencies */}
        <section className="py-12 sm:py-16 px-4 bg-background" aria-labelledby="competencies-heading">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Training Objectives
              </p>
              <h2 id="competencies-heading" className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-balance">
                Build Critical Navigation Skills
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <CompetencyCard
                icon={<ShieldCheck className="w-6 h-6 text-primary" aria-hidden="true" />}
                title="Risk Recognition"
                description="Learn to identify clinical warning signs, social determinants of health, and environmental risk factors that affect resident outcomes."
                skills={["Clinical assessment", "SDOH screening", "Safety evaluation"]}
              />
              <CompetencyCard
                icon={<Navigation className="w-6 h-6 text-primary" aria-hidden="true" />}
                title="Service Navigation"
                description="Practice matching residents to the right services across San Antonio's health and social service ecosystem."
                skills={["Resource matching", "Referral protocols", "Care coordination"]}
              />
              <CompetencyCard
                icon={<BarChart3 className="w-6 h-6 text-primary" aria-hidden="true" />}
                title="Urgency Judgment"
                description="Develop the ability to assess case severity and prioritize interventions based on risk level and available resources."
                skills={["Triage assessment", "Timeline planning", "Priority setting"]}
              />
            </div>
          </div>
        </section>

        {/* Scenario Topics */}
        <section className="py-12 sm:py-16 px-4 bg-secondary/50" aria-labelledby="topics-heading">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Scenario Library
              </p>
              <h2 id="topics-heading" className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-balance">
                Five Real-World Case Tracks
              </h2>
              <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">
                Each scenario addresses a common public health challenge in San Antonio.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {[
                "Heat-Related Illness",
                "Housing Instability",
                "Behavioral Health Crisis",
                "Maternal & Child Health",
                "Food Access & Transportation",
              ].map((topic) => (
                <span
                  key={topic}
                  className="bg-card border border-border text-sm text-foreground px-4 py-2 rounded-full"
                >
                  {topic}
                </span>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/scenarios"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity"
              >
                Browse All Scenarios
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 sm:py-16 px-4 bg-primary" aria-labelledby="cta-heading">
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="cta-heading" className="font-serif text-2xl sm:text-3xl font-bold text-primary-foreground mb-4 text-balance">
              Ready to strengthen your navigation skills?
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              Complete scenarios, track your progress, and build competency across all five domains of public health navigation.
            </p>
            <Link
              href="/scenarios"
              className="inline-flex items-center justify-center gap-2 bg-card text-foreground font-semibold px-10 py-3 rounded-lg text-sm hover:bg-card/90 transition-colors"
            >
              Start Simulation
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function CompetencyCard({
  icon,
  title,
  description,
  skills,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  skills: string[];
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 flex flex-col">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">{icon}</div>
      <h3 className="font-serif font-bold text-lg text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{description}</p>
      <ul className="flex flex-col gap-1.5">
        {skills.map((skill) => (
          <li key={skill} className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" aria-hidden="true" />
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}
