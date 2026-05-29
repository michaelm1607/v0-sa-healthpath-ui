"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Activity } from "lucide-react";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-serif font-bold text-xl tracking-tight">
          <Activity className="w-5 h-5 text-accent-foreground opacity-90" aria-hidden="true" />
          <span>SA HealthPath</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium" aria-label="Main navigation">
          <Link href="/scenarios" className="opacity-80 hover:opacity-100 transition-opacity">
            Scenarios
          </Link>
          <Link href="/dashboard" className="opacity-80 hover:opacity-100 transition-opacity">
            My Dashboard
          </Link>
          <Link
            href="/scenarios"
            className="bg-accent text-accent-foreground px-4 py-1.5 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Start Simulation
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-foreground"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-primary border-t border-primary-foreground/20 px-4 py-4 flex flex-col gap-4 text-sm font-medium" aria-label="Mobile navigation">
          <Link href="/scenarios" onClick={() => setMobileOpen(false)} className="opacity-80 hover:opacity-100">
            Scenarios
          </Link>
          <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="opacity-80 hover:opacity-100">
            My Dashboard
          </Link>
          <Link
            href="/scenarios"
            onClick={() => setMobileOpen(false)}
            className="bg-accent text-accent-foreground px-4 py-2 rounded-md text-center font-semibold"
          >
            Start Simulation
          </Link>
        </nav>
      )}
    </header>
  );
}
