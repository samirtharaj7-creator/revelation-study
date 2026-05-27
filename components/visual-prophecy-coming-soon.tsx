import Link from "next/link";
import { ArrowLeft, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";

type VisualProphecyComingSoonProps = {
  title: string;
  reference: string;
  description: string;
};

export function VisualProphecyComingSoon({ title, reference, description }: VisualProphecyComingSoonProps) {
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

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="coming-soon-title">
        <div className="rounded-lg border border-border bg-card p-8 text-center shadow-sm sm:p-12">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Clock3 className="h-8 w-8" aria-hidden="true" />
          </span>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.24em] text-primary">{reference}</p>
          <h1 id="coming-soon-title" className="mt-3 font-serif-display text-4xl font-semibold text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
          <p className="mt-8 inline-flex rounded-full border border-border bg-muted/45 px-4 py-2 text-sm font-bold text-foreground">
            Coming soon
          </p>
        </div>
      </section>
    </main>
  );
}
