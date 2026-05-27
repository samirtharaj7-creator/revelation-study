import type { Metadata } from "next";
import { GitCompare } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDanielConnections } from "@/lib/content";

export const metadata: Metadata = {
  title: "Connection Workspace",
  description: "Daniel and Revelation workspace."
};

export default function DanielRevelationPage() {
  const connections = getDanielConnections();
  return (
    <main>
      <PageHero
        eyebrow="Connections"
        title="Connection Workspace"
        description="A card-based area for Daniel-Revelation links, shared symbols, and comparison notes."
      />
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        {connections.length ? (
          <section className="grid gap-4 md:grid-cols-2">
            {connections.map((connection) => (
            <Card key={connection.id} id={connection.id} className="folio-panel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitCompare className="h-5 w-5 text-primary" />
                  {connection.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-6 text-muted-foreground">{connection.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {connection.scriptureReferences.map((reference) => (
                    <Badge key={reference} variant="outline">{reference}</Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {connection.sharedSymbols.map((symbol) => (
                    <Badge key={symbol} variant="secondary">{symbol}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            ))}
          </section>
        ) : (
          <div className="empty-slot flex min-h-72 items-center justify-center p-6 text-center">
            <p className="text-sm font-bold text-muted-foreground">Connection board waiting for content</p>
          </div>
        )}
      </div>
    </main>
  );
}
