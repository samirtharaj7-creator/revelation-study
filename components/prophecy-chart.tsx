"use client";

import { BarChart3, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProphecySection } from "@/lib/schemas";

export function ProphecyChart({ sections }: { sections: ProphecySection[] }) {
  if (!sections.length) {
    return (
      <div className="empty-slot flex min-h-72 items-center justify-center p-6 text-center">
        <div>
          <BarChart3 className="mx-auto h-8 w-8 text-primary" />
          <p className="mt-3 text-sm font-bold text-muted-foreground">Chart board waiting for content</p>
        </div>
      </div>
    );
  }

  const data = sections.map((section, index) => ({
    name: section.title.replace("Revelation ", "Rev. "),
    references: section.bibleReferences.length,
    symbols: section.symbols.length,
    index: index + 1
  }));

  return (
    <Card className="folio-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Chart Workspace
        </CardTitle>
        <CardDescription>Interactive chart and card areas for uploaded section content.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <BarChart width={920} height={280} data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
            <XAxis dataKey="index" />
            <YAxis />
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
            <Bar dataKey="symbols" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="references" fill="var(--accent)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sections.map((section) => (
            <ProphecyCard key={section.id} section={section} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ProphecyCard({ section }: { section: ProphecySection }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article id={section.id} className="folio-panel-soft p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif-display text-lg font-semibold">{section.title}</h3>
          <p className="text-sm text-muted-foreground">{section.reference}</p>
        </div>
        <Link href={`/search?q=${encodeURIComponent(section.title)}`} aria-label={`Search ${section.title}`}>
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </Link>
      </div>
      <div className="mb-3 flex flex-wrap gap-2">
        {section.symbols.map((symbol) => (
          <Badge key={symbol} variant="outline">
            {symbol}
          </Badge>
        ))}
      </div>
      <p className="text-sm leading-6 text-muted-foreground">{section.adventistInterpretation}</p>
      {expanded ? (
        <div className="mt-4 space-y-3 text-sm text-muted-foreground">
          <p><span className="font-semibold text-foreground">Historical fulfillment:</span> {section.historicalFulfillment}</p>
          <p><span className="font-semibold text-foreground">Alternative views:</span> {section.alternativeViews}</p>
          <p><span className="font-semibold text-foreground">Daniel:</span> {section.danielConnections.join(", ") || "No direct Daniel link listed."}</p>
        </div>
      ) : null}
      <button className="mt-4 text-sm font-semibold text-primary" onClick={() => setExpanded((value) => !value)}>
        {expanded ? "Show less" : "Show more"}
      </button>
    </article>
  );
}
