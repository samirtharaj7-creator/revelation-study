"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { TimelineEvent } from "@/lib/schemas";

const filters = ["All", "Historical", "Historicist", "Future", "Restoration"];

export function TimelineView({ events }: { events: TimelineEvent[] }) {
  const [filter, setFilter] = useState("All");
  const visible = useMemo(() => {
    if (filter === "All") return events;
    return events.filter((event) => `${event.period} ${event.description}`.toLowerCase().includes(filter.toLowerCase()));
  }, [events, filter]);

  if (!events.length) {
    return (
      <div className="empty-slot flex min-h-72 items-center justify-center p-6 text-center">
        <div>
          <p className="text-sm font-bold text-muted-foreground">Timeline board waiting for content</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 no-print">
        {filters.map((item) => (
          <Button key={item} variant={filter === item ? "default" : "outline"} size="sm" onClick={() => setFilter(item)}>
            {item}
          </Button>
        ))}
      </div>
      <div className="relative space-y-6 before:absolute before:bottom-0 before:left-4 before:top-0 before:w-px before:bg-border md:before:left-1/2">
        {visible.map((event, index) => (
          <article key={event.id} id={event.id} className="relative grid gap-4 md:grid-cols-2">
            <div className={index % 2 === 0 ? "md:text-right md:pr-10" : "md:col-start-2 md:pl-10"}>
              <div className="folio-panel p-5">
                <Badge variant="outline">{event.period}</Badge>
                <h3 className="mt-3 font-serif-display text-xl font-semibold">{event.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{event.description}</p>
                <p className="mt-3 text-xs text-muted-foreground">{event.scriptureReferences.join("; ")}</p>
              </div>
            </div>
            <span className="absolute left-4 top-6 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background bg-primary md:left-1/2" />
          </article>
        ))}
      </div>
    </div>
  );
}
