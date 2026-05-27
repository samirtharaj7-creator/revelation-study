import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSymbols } from "@/lib/content";
import { slugify } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Symbol Workspace",
  description: "Symbol glossary workspace for uploaded Revelation study content."
};

export default function SymbolsPage() {
  const symbols = getSymbols();
  return (
    <main>
      <PageHero
        eyebrow="Glossary"
        title="Symbol Workspace"
        description="A glossary canvas for symbols, references, explanations, and Daniel-Revelation links."
      />
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-2 xl:grid-cols-3 lg:px-8">
        {symbols.length ? symbols.map((symbol) => (
          <Card key={symbol.symbol} id={slugify(symbol.symbol)} className="folio-panel">
            <CardHeader>
              <CardTitle>{symbol.symbol}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
              <p><span className="font-semibold text-foreground">Meaning:</span> {symbol.meaning}</p>
              <p><span className="font-semibold text-foreground">Adventist:</span> {symbol.adventistInterpretation}</p>
              <p><span className="font-semibold text-foreground">Daniel:</span> {symbol.danielConnection}</p>
              <div className="flex flex-wrap gap-2">
                {symbol.scriptureReferences.map((reference) => (
                  <Badge key={reference} variant="outline">{reference}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )) : (
          <div className="empty-slot col-span-full flex min-h-72 items-center justify-center p-6 text-center">
            <p className="text-sm font-bold text-muted-foreground">Symbol glossary waiting for content</p>
          </div>
        )}
      </div>
    </main>
  );
}
