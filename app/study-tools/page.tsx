import type { Metadata } from "next";
import Link from "next/link";
import { BookMarked, ChartNoAxesColumn, Clock3, FileText, GitCompare, Search, Shapes } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Study Tools",
  description: "Workspace launchpad for Revelation chapters, charts, symbols, timeline, search, and notes."
};

const tools = [
  ["Chapter Workspace", "Open the verse panels for Revelation 1-22.", "/revelation/1", BookMarked],
  ["Search Workspace", "Search the uploaded text index when content is added.", "/search", Search],
  ["Chart Workspace", "Organize prophecy charts and section cards.", "/prophecy-charts", ChartNoAxesColumn],
  ["Symbol Workspace", "Build a glossary for key symbols and references.", "/symbols", Shapes],
  ["Visual Prophecy", "Explore visual studies and historical prophetic timeline entries.", "/timeline", Clock3],
  ["Daniel Links", "Map Daniel-Revelation connection notes.", "/daniel-revelation", GitCompare],
  ["Frameworks", "Compare interpretation frameworks after text is uploaded.", "/prophetic-schools", FileText]
] as const;

export default function StudyToolsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Tools"
        title="Study Workspace"
        description="A launchpad for the blank chapter, chart, symbol, timeline, search, and note areas."
      />
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-2 xl:grid-cols-3 lg:px-8">
        {tools.map(([title, description, href, Icon]) => (
          <Link key={title} href={href}>
            <Card className="folio-panel h-full transition hover:-translate-y-0.5 hover:border-primary/70">
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <Badge variant="outline">Workspace</Badge>
                </div>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
