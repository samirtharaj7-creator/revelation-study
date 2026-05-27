import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { getIntroduction } from "@/lib/content";

export const metadata: Metadata = {
  title: "Introduction to Revelation",
  description: "A Christ-centered introduction to the book of Revelation, its setting, genre, themes, and interpretive approach."
};

export default function IntroductionPage() {
  const intro = getIntroduction();

  return (
    <main className="background-page">
      <section className="background-hero" aria-labelledby="introduction-title">
        <div className="background-hero-copy">
          <p className="background-kicker">
            <BookOpen className="h-4 w-4" />
            Book Background
          </p>
          <h1 id="introduction-title">{intro.title}</h1>
          <p className="background-subtitle">{intro.subtitle}</p>
        </div>
      </section>

      <section className="background-section-nav" aria-label="Background page sections">
        <p className="background-section-nav-heading">
          <BookOpen className="h-4 w-4" />
          Read This Page
        </p>
        <div className="background-section-nav-scroll">
          <nav>
            {intro.sections.map((section, index) => (
              <a key={section.id} href={`#${section.id}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {section.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="background-shell" aria-label="Revelation background study">
        <div className="background-study">
          <section className="background-summary" aria-labelledby="reading-lens-title">
            <p id="reading-lens-title" className="background-section-label">
              Reading Lens
            </p>
            <p>{intro.summary}</p>
          </section>

          {intro.facts.length ? (
            <section className="background-fact-grid" aria-label="Introduction facts">
              {intro.facts.map((fact) => (
                <article key={fact.label} className="background-fact-card">
                  <h2>{fact.label}</h2>
                  <p>{fact.value}</p>
                </article>
              ))}
            </section>
          ) : null}

          <div className="background-section-list">
            {intro.sections.map((section, index) => (
              <section key={section.id} id={section.id} className="background-section">
                <span className="background-section-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="background-section-body">
                  <h2>{section.title}</h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {intro.relatedLinks.length ? (
            <section className="background-related" aria-labelledby="introduction-related-title">
              <p className="background-section-label">Further Study</p>
              <h2 id="introduction-related-title">Go deeper in the articles.</h2>
              <div className="background-related-grid">
                {intro.relatedLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <strong>{link.title}</strong>
                    <span>{link.description}</span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </section>
    </main>
  );
}
