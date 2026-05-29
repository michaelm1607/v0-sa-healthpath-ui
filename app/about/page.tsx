import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CheckCircle, Users, BookOpen, Target, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 bg-background py-10 sm:py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              About This Tool
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground text-balance">
              What is SA HealthPath?
            </h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              SA HealthPath is a training simulator designed to help public health professionals, 
              community health workers, and case managers practice service navigation 
              decision-making through realistic San Antonio resident scenarios.
            </p>
          </div>

          {/* Purpose */}
          <section className="mb-10">
            <h2 className="font-serif text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" aria-hidden="true" />
              Purpose
            </h2>
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Effective public health navigation requires recognizing complex risk factors, 
                making accurate urgency assessments, and connecting residents to appropriate services. 
                These skills are difficult to practice in real-world settings without consequences.
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                SA HealthPath provides a safe environment to develop these competencies through 
                simulated cases that reflect the diverse health and social challenges faced by 
                San Antonio residents.
              </p>
            </div>
          </section>

          {/* Who should use */}
          <section className="mb-10">
            <h2 className="font-serif text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" aria-hidden="true" />
              Who Should Use This Tool
            </h2>
            <ul className="space-y-3">
              {[
                "Community Health Workers (CHWs) and Promotores",
                "Case Managers and Care Coordinators",
                "Public Health Students and Interns",
                "Social Workers in health settings",
                "Clinic Staff involved in patient navigation",
                "Anyone preparing for CHW certification",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Competencies */}
          <section className="mb-10">
            <h2 className="font-serif text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" aria-hidden="true" />
              Competency Domains
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Each scenario assesses performance across five key areas:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { name: "Risk Recognition", desc: "Identifying clinical, social, and environmental risk factors" },
                { name: "Urgency Judgment", desc: "Determining appropriate response timelines" },
                { name: "Referral Fit", desc: "Matching residents to the right services and resources" },
                { name: "Communication & Language Access", desc: "Considering language and cultural factors" },
                { name: "Safety Awareness", desc: "Recognizing crisis indicators and safety concerns" },
              ].map(({ name, desc }) => (
                <div key={name} className="bg-card border border-border rounded-lg p-4">
                  <p className="text-sm font-semibold text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Disclaimer */}
          <section className="mb-10">
            <h2 className="font-serif text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" aria-hidden="true" />
              Important Disclaimer
            </h2>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <p className="text-sm text-amber-900 leading-relaxed mb-3">
                <strong>SA HealthPath is a training tool only.</strong> It does not provide medical advice, 
                diagnose conditions, or replace professional clinical judgment.
              </p>
              <ul className="text-sm text-amber-800 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" aria-hidden="true" />
                  All scenarios and resident profiles are fictional
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" aria-hidden="true" />
                  No protected health information is collected or stored
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" aria-hidden="true" />
                  Service recommendations are for educational purposes only
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" aria-hidden="true" />
                  Always consult current organizational protocols in real situations
                </li>
              </ul>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center pt-4">
            <Link
              href="/scenarios"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity"
            >
              Start Your First Scenario
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
