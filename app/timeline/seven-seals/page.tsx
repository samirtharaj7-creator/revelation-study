import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SevenSealsTimeline } from "@/components/seven-seals-timeline";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "7 Seals",
  description: "Interactive visual study for the seven seals of Revelation."
};

export default function SevenSealsPage() {
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
      <SevenSealsTimeline />
    </main>
  );
}
