import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RevelationChapterStrip } from "@/components/revelation-chapter-strip";
import { ChapterStudy } from "@/components/verse-accordion";
import { getChapter } from "@/lib/content";

export function generateStaticParams() {
  return Array.from({ length: 22 }, (_, index) => ({ chapter: String(index + 1) }));
}

export async function generateMetadata({ params }: { params: Promise<{ chapter: string }> }): Promise<Metadata> {
  const { chapter } = await params;
  const content = getChapter(chapter);
  return {
    title: `Revelation ${content.chapterNumber}: ${content.title}`,
    description: content.summary || `Revelation ${content.chapterNumber}`
  };
}

export default async function RevelationChapterPage({ params }: { params: Promise<{ chapter: string }> }) {
  const { chapter } = await params;
  const content = getChapter(chapter);
  const previous = content.chapterNumber > 1 ? content.chapterNumber - 1 : null;
  const next = content.chapterNumber < 22 ? content.chapterNumber + 1 : null;

  return (
    <main className="reader-page">
      <RevelationChapterStrip activeChapter={content.chapterNumber} />
      <ChapterStudy chapter={content} />
      <nav className="reader-chapter-nav no-print">
        {previous ? (
          <Link href={`/revelation/${previous}`}>
            <ChevronLeft className="h-4 w-4" />
            Revelation {previous}
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/revelation/${next}`}>
            Revelation {next}
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : null}
      </nav>
    </main>
  );
}
