import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Revelation1214Timeline, type TimelineCommentaryByVerse } from "@/components/revelation-12-14-timeline";
import { Button } from "@/components/ui/button";
import { getChapter } from "@/lib/content";

export const metadata: Metadata = {
  title: "Revelation 12-14 Timeline",
  description: "A vertical visual timeline for Revelation 12 through 14."
};

function getRevelation1214CommentaryByVerse(): TimelineCommentaryByVerse {
  return [12, 13, 14].reduce<TimelineCommentaryByVerse>((commentaryByVerse, chapterNumber) => {
    const chapter = getChapter(chapterNumber);

    for (const verse of chapter.verses) {
      const text = verse.commentary.detailedExplanation.trim();

      if (text) {
        commentaryByVerse[verse.verse] = {
          verse: verse.verse,
          text
        };
      }
    }

    return commentaryByVerse;
  }, {});
}

export default function Revelation1214TimelinePage() {
  const commentaryByVerse = getRevelation1214CommentaryByVerse();

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="rounded-lg px-3">
          <Link href="/timeline">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Visual Prophecy
          </Link>
        </Button>
      </div>
      <Revelation1214Timeline commentaryByVerse={commentaryByVerse} />
    </main>
  );
}
