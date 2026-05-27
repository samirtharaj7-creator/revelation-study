import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProphecyChart } from "@/components/prophecy-chart";
import { getProphecySections } from "@/lib/content";

export const metadata: Metadata = {
  title: "Chart Workspace",
  description: "Chart workspace for Revelation study content."
};

export default function ProphecyChartsPage() {
  const sections = getProphecySections();
  return (
    <main>
      <PageHero
        eyebrow="Charts"
        title="Chart Workspace"
        description="Interactive chart containers are ready for section material, diagrams, and references."
      />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <ProphecyChart sections={sections} />
      </div>
    </main>
  );
}
