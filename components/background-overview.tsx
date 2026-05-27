import Link from "next/link";
import { ArrowUpRight, BookOpenText, LibraryBig } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ChapterContent, ProphecySection } from "@/lib/schemas";

export function BackgroundOverview({ chapters, prophecy }: { chapters: ChapterContent[]; prophecy: ProphecySection[] }) {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 pb-14 sm:px-6 lg:px-8">
      <section className="folio-panel p-5 sm:p-7">
        <div className="grid gap-6 border-b border-border pb-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow-chip">
              <LibraryBig className="h-3.5 w-3.5" />
              Chapter index
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] sm:text-5xl">Twenty-two blank folios</h2>
          </div>
          <Link className="inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-bold text-background transition hover:opacity-90" href="/revelation/1">
            Start writing
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {chapters.map((chapter) => (
            <Link key={chapter.chapterNumber} href={`/revelation/${chapter.chapterNumber}`} className="chapter-index-card transition hover:-translate-y-0.5 hover:border-primary/60">
              <span className="chapter-index-number">{chapter.chapterNumber}</span>
              <span>
                <span className="flex items-center justify-between gap-3">
                  <span className="font-black">{chapter.title}</span>
                  <Badge variant="outline">{chapter.verses.length}</Badge>
                </span>
                <span className="mt-2 block h-2 w-24 rounded-full bg-muted" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {prophecy.length ? (
        <section className="folio-panel p-5 sm:p-7">
          <p className="eyebrow-chip">
            <BookOpenText className="h-3.5 w-3.5" />
            Section boards
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {prophecy.slice(0, 8).map((section) => (
              <Link key={section.id} href={`/prophecy-charts#${section.id}`} className="folio-panel-soft p-4 text-sm font-bold hover:border-primary/60">
                {section.title}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
