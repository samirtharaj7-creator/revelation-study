import Link from "next/link";
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  BookOpenCheck,
  ChartNoAxesColumnIncreasing
} from "lucide-react";
import type { ChapterContent } from "@/lib/schemas";

const studyActions = [
  {
    title: "Study the Introduction",
    href: "/introduction",
    description: "Start with Jesus, Patmos, prophecy, worship, symbols, and Daniel.",
    icon: BookOpenCheck
  },
  {
    title: "Begin the Commentary",
    href: "/revelation/1",
    description: "Then read Revelation 1 with KJV text and focused verse-by-verse exposition.",
    icon: BookOpen
  },
  {
    title: "Trace the Prophecies",
    href: "/prophecy-charts",
    description: "Follow churches, seals, trumpets, beasts, Babylon, judgment, and hope.",
    icon: ChartNoAxesColumnIncreasing
  },
  {
    title: "Browse the Articles",
    href: "/articles",
    description: "Work through focused studies on Revelation's most debated questions.",
    icon: BookMarked
  }
] as const;

const chapterGroups = [
  { eyebrow: "Revelation 1-3", title: "Christ Among the Churches", range: [1, 2, 3] },
  { eyebrow: "Revelation 4-11", title: "Throne, Seals, Trumpets, and Witness", range: [4, 5, 6, 7, 8, 9, 10, 11] },
  { eyebrow: "Revelation 12-14", title: "Great Controversy and Three Angels", range: [12, 13, 14] },
  { eyebrow: "Revelation 15-22", title: "Plagues, Babylon, Millennium, New Earth", range: [15, 16, 17, 18, 19, 20, 21, 22] }
] as const;

export function HeroSection({ chapters }: { chapters: ChapterContent[] }) {
  return (
    <section className="home-showcase">
      <div className="home-showcase-shell">
        <section className="home-showcase-hero" aria-labelledby="home-title">
          <div className="home-showcase-copy">
            <h1 id="home-title">The Revelation of Jesus Christ.</h1>
            <p className="home-showcase-description">
              Begin with the introduction, then move into the chapters, prophecy timelines, and
              focused articles.
            </p>
            <div className="home-showcase-actions">
              <Link href="/introduction" className="home-showcase-primary">
                Start with Introduction
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/revelation/1" className="home-showcase-secondary">
                Open Chapter 1
              </Link>
              <Link href="/articles" className="home-showcase-secondary">
                Browse Articles
              </Link>
            </div>
          </div>
        </section>

        <section className="home-action-grid" aria-label="Primary study paths">
          {studyActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.href} href={action.href} className="home-action-card">
                <span className="home-action-icon">
                  <Icon className="h-5 w-5" />
                </span>
                <strong>{action.title}</strong>
                <span>{action.description}</span>
                <em>
                  Open
                  <ArrowRight className="h-4 w-4" />
                </em>
              </Link>
            );
          })}
        </section>

        <section className="home-chapter-study" aria-labelledby="home-chapter-title">
          <div className="home-section-split">
            <div>
              <p className="home-section-kicker">Chapter Study</p>
              <h2 id="home-chapter-title">Open Revelation where you need it.</h2>
            </div>
            <p>
              The early chapters reveal Christ among His churches. The later chapters open the conflict,
              judgment, Babylon, the millennium, and the New Jerusalem.
            </p>
          </div>

          <div className="home-chapter-group-grid">
            {chapterGroups.map((group) => (
              <article key={group.eyebrow} className="home-chapter-group">
                <BookOpen className="home-chapter-group-icon h-6 w-6" />
                <p>{group.eyebrow}</p>
                <h3>{group.title}</h3>
                <div className="home-chapter-mini-grid">
                  {group.range.map((chapterNumber) => {
                    const chapter = chapters.find((item) => item.chapterNumber === chapterNumber);
                    return (
                      <Link key={chapterNumber} href={`/revelation/${chapterNumber}`}>
                        <span>Revelation {chapterNumber}</span>
                        <strong>{chapter?.title ?? `Chapter ${chapterNumber}`}</strong>
                      </Link>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
