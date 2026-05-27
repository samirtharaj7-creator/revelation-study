import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, BarChart3, Crown, Megaphone, ScrollText, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Visual Prophecy",
  description: "Interactive visual prophecy studies for Revelation study."
};

const visualStudies: Array<{
  title: string;
  description: string;
  reference: string;
  href: string;
  icon: LucideIcon;
}> = [
  {
    title: "7 Churches",
    description: "Trace Christ's messages to the seven churches through focused interactive cards and era notes.",
    reference: "Revelation 2-3",
    href: "/timeline/seven-churches",
    icon: BarChart3
  },
  {
    title: "7 Seals",
    description: "Follow the Lamb opening the scroll through conquest, witness, judgment signs, and the question of who can stand.",
    reference: "Revelation 4-7",
    href: "/timeline/seven-seals",
    icon: ScrollText
  },
  {
    title: "Revelation 12-14",
    description: "See the great controversy, the beast powers, the remnant, and the three angels' messages as one connected vision.",
    reference: "Revelation 12-14",
    href: "/timeline/revelation-12-14",
    icon: Crown
  },
  {
    title: "7 Trumpets",
    description: "Coming soon. The interactive trumpet study will be added once the visual data is ready.",
    reference: "Coming soon",
    href: "/timeline/seven-trumpets",
    icon: Megaphone
  },
  {
    title: "7 Plagues",
    description: "Coming soon. The interactive plague study will be added once the visual data is ready.",
    reference: "Coming soon",
    href: "/timeline/seven-plagues",
    icon: ShieldAlert
  }
];

export default function TimelinePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section aria-labelledby="visual-prophecy-title" className="space-y-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Visual Prophecy</p>
          <h1 id="visual-prophecy-title" className="mt-2 font-serif-display text-3xl font-semibold sm:text-4xl">
            Visual study library
          </h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visualStudies.map((study) => {
            const Icon = study.icon;
            return (
              <Link
                key={study.title}
                href={study.href}
                className="group relative flex min-h-64 flex-col rounded-lg border border-border bg-card p-8 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <span className="mb-8 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-8 w-8" aria-hidden="true" />
                </span>
                <ArrowRight className="absolute right-8 top-8 h-7 w-7 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
                <h2 className="font-serif-display text-3xl font-semibold text-foreground">{study.title}</h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">{study.description}</p>
                <span className="mt-8 inline-flex w-fit rounded-full border border-border bg-muted/45 px-4 py-2 text-sm font-bold text-foreground">
                  {study.reference}
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
