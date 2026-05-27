import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSchools } from "@/lib/content";

export const metadata: Metadata = {
  title: "Framework Workspace",
  description: "Prophetic schools workspace."
};

export default function PropheticSchoolsPage() {
  const schools = getSchools();
  const rows = [
    ["Revelation 1-3", "revelation1to3"],
    ["Seals", "seals"],
    ["Trumpets", "trumpets"],
    ["Revelation 12-14", "revelation12to14"],
    ["Beast powers", "beastPowers"],
    ["Babylon", "babylon"],
    ["Millennium", "millennium"],
    ["Second coming and judgment", "secondComingAndJudgment"]
  ] as const;

  return (
    <main>
      <PageHero
        eyebrow="Frameworks"
        title="Framework Workspace"
        description="Comparison cards and table areas are ready for uploaded interpretive framework text."
      />
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        {schools.length ? (
          <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {schools.map((school) => (
            <Card key={school.id} className={`folio-panel ${school.id === "adventist-historicism" ? "border-primary/60" : ""}`}>
              <CardHeader>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={school.id === "adventist-historicism" ? "default" : "outline"}>
                    {school.id === "adventist-historicism" ? "Primary" : "Comparison"}
                  </Badge>
                </div>
                <CardTitle>{school.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
                <p>{school.definition}</p>
                <p>{school.interpretation}</p>
                <p><span className="font-semibold text-foreground">Difference from Adventist view:</span> {school.differenceFromAdventist}</p>
              </CardContent>
            </Card>
            ))}
          </div>

          <section className="folio-panel overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse text-left text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="border-b border-border p-3">Topic</th>
                    {schools.map((school) => (
                      <th key={school.id} className="border-b border-border p-3">{school.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(([label, key]) => (
                    <tr key={key} className="align-top">
                      <td className="border-b border-border p-3 font-semibold">{label}</td>
                      {schools.map((school) => (
                        <td key={school.id} className="border-b border-border p-3 text-muted-foreground">{school.sections[key]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          </>
        ) : (
          <div className="empty-slot flex min-h-72 items-center justify-center p-6 text-center">
            <p className="text-sm font-bold text-muted-foreground">Framework board waiting for content</p>
          </div>
        )}
      </div>
    </main>
  );
}
