"use client";

import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Flame,
  Gift,
  Heart,
  Scale,
  ScrollText,
  Search,
  Shield,
  Sparkles,
  Tag
} from "lucide-react";
import { cn } from "@/lib/utils";

type SealColor = "white" | "red" | "black" | "pale" | "amber" | "indigo" | "gold";

type Seal = {
  number: string;
  name: string;
  symbol: string;
  period: string;
  scripture: string;
  whatJohnSees: string;
  interpretation: string;
  application: string;
  keyNotes: string[];
  icon: LucideIcon;
  color: SealColor;
};

const sealStyles: Record<
  SealColor,
  {
    text: string;
    icon: string;
    active: string;
    accent: string;
  }
> = {
  white: {
    text: "text-slate-800 dark:text-slate-100",
    icon: "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-100",
    active: "border-slate-400 bg-slate-50 dark:bg-slate-900/40",
    accent: "border-slate-400"
  },
  red: {
    text: "text-red-800 dark:text-red-200",
    icon: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200",
    active: "border-red-500 bg-red-50 dark:bg-red-950/30",
    accent: "border-red-500"
  },
  black: {
    text: "text-slate-950 dark:text-slate-100",
    icon: "bg-slate-950 text-slate-50 dark:bg-slate-100 dark:text-slate-950",
    active: "border-slate-800 bg-slate-100 dark:bg-slate-900/50",
    accent: "border-slate-800 dark:border-slate-300"
  },
  pale: {
    text: "text-emerald-800 dark:text-emerald-200",
    icon: "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200",
    active: "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
    accent: "border-emerald-500"
  },
  amber: {
    text: "text-amber-900 dark:text-amber-200",
    icon: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
    active: "border-amber-500 bg-amber-50 dark:bg-amber-950/30",
    accent: "border-amber-500"
  },
  indigo: {
    text: "text-indigo-800 dark:text-indigo-200",
    icon: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200",
    active: "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30",
    accent: "border-indigo-500"
  },
  gold: {
    text: "text-yellow-900 dark:text-yellow-200",
    icon: "bg-yellow-100 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-200",
    active: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30",
    accent: "border-yellow-500"
  }
};

const sealsData: Seal[] = [
  {
    number: "1",
    name: "White Horse",
    symbol: "A white horse and a conquering rider with a bow and crown",
    period: "About A.D. 31-100",
    scripture: "Revelation 6:1-2",
    whatJohnSees:
      "The Lamb opens the first seal, a living creature summons John to look, and a rider on a white horse goes forth conquering and to conquer.",
    interpretation:
      "The first seal begins with Christ opening history from the throne-room setting of Revelation 4-5. The white horse points to the victorious advance of the pure gospel in the apostolic period, when the message of the risen Christ moved rapidly through the world. The bow, crown, and conquering language show gospel triumph through proclamation, conviction, and Spirit-filled witness, not political domination.",
    application:
      "The seal teaches confidence before conflict. Revelation begins this sequence by showing the Lamb in control and the gospel advancing. The church is called to trust Christ's authority, keep mission central, and remember that the early movement conquered by faithfulness to the word rather than by worldly force.",
    keyNotes: ["Lamb opens", "white horse", "gospel conquest", "apostolic purity", "A.D. 31-100"],
    icon: Sparkles,
    color: "white"
  },
  {
    number: "2",
    name: "Red Horse",
    symbol: "A red horse, a great sword, and peace removed from the earth",
    period: "About A.D. 100-313",
    scripture: "Revelation 6:3-4",
    whatJohnSees:
      "The second seal opens, and a red horse appears. Its rider receives power to take peace from the earth so that people kill one another.",
    interpretation:
      "The red horse portrays the era of persecution and bloodshed that followed the early spread of the gospel. Peace is removed, and the sword image fits the centuries when faithful Christian witness met imperial hostility. The seal does not picture the failure of Christ's rule; it shows that the church's witness would continue through suffering and martyrdom.",
    application:
      "This seal prepares believers to measure faithfulness by loyalty, not comfort. Christ does not abandon His people when peace is removed. The Lamb who opens the seal also strengthens witnesses who suffer for His name and keeps their testimony from being wasted.",
    keyNotes: ["red horse", "persecution", "great sword", "peace removed", "A.D. 100-313"],
    icon: Flame,
    color: "red"
  },
  {
    number: "3",
    name: "Black Horse",
    symbol: "A black horse, balances, and measured grain",
    period: "About A.D. 313-538",
    scripture: "Revelation 6:5-6",
    whatJohnSees:
      "The third seal opens, and a black horse appears. Its rider holds balances, while a voice announces scarce measures of wheat and barley and warns not to hurt the oil and wine.",
    interpretation:
      "The black horse portrays compromise and spiritual scarcity. After persecution eased, imperial favor made the church publicly acceptable but spiritually vulnerable. The balances and measured grain show scarcity and a distorted religious economy: the word of God becomes difficult to obtain in its purity, while the oil and wine language reminds the reader that God still preserves the Spirit's work and Christ's grace.",
    application:
      "This seal warns that the church can lose spiritual nourishment while gaining public acceptance. The remedy is not popularity, position, or religious prestige, but renewed dependence on Scripture, the Spirit, and Christ's sustaining grace.",
    keyNotes: ["black horse", "balances", "spiritual famine", "compromise", "A.D. 313-538"],
    icon: Scale,
    color: "black"
  },
  {
    number: "4",
    name: "Pale Horse",
    symbol: "A pale horse ridden by Death, with Hell following",
    period: "About A.D. 538-1517",
    scripture: "Revelation 6:7-8",
    whatJohnSees:
      "The fourth seal opens, and a pale horse appears. Its rider is named Death, and Hell follows with authority to kill by sword, hunger, death, and beasts.",
    interpretation:
      "The pale horse shows the deathly result of deepening apostasy. What began as compromise becomes a system marked by spiritual death, coercion, famine for truth, and persecution. Death and Hades following the rider expose the destructive fruit of religion separated from the life, word, and character of Christ.",
    application:
      "This seal calls the reader to reject lifeless religion, even when it carries impressive authority. Christ wants His people alive in truth, mercy, and faithfulness. The presence of death in the vision makes the life-giving work of the Lamb more necessary, not less.",
    keyNotes: ["pale horse", "Death", "Hell follows", "deep apostasy", "A.D. 538-1517"],
    icon: AlertCircle,
    color: "pale"
  },
  {
    number: "5",
    name: "Souls Under the Altar",
    symbol: "Martyrs under the altar crying for vindication",
    period: "About A.D. 1517-1755",
    scripture: "Revelation 6:9-11",
    whatJohnSees:
      "The fifth seal opens, and John sees the souls of those slain for the word of God and their testimony under the altar, crying, 'How long?' White robes are given to them.",
    interpretation:
      "The fifth seal shifts from horsemen to sanctuary imagery. The slain witnesses are not forgotten; their blood is pictured symbolically as a sacrificial witness before God, crying for vindication as Abel's blood cried from the ground. The Reformation era brought Scripture and testimony into sharper conflict with coercive religion, and white robes show heaven's verdict that these witnesses are accepted and remembered.",
    application:
      "This seal gives dignity to costly faithfulness. The prayers and cries of the oppressed are not lost. God may call His witnesses to rest and wait a little season, but He does not ignore their suffering or their testimony.",
    keyNotes: ["altar", "martyr witness", "How long?", "white robes", "wait a little season"],
    icon: Heart,
    color: "amber"
  },
  {
    number: "6",
    name: "Signs and the Final Question",
    symbol: "Earthquake, darkened sun, bloodlike moon, falling stars, and the day of wrath",
    period: "From 1755, 1780, and 1833 toward the final day",
    scripture: "Revelation 6:12-17",
    whatJohnSees:
      "The sixth seal opens with a great earthquake, the sun becoming black, the moon becoming as blood, the stars falling, and finally the unprepared hiding from the face of the One on the throne and the wrath of the Lamb.",
    interpretation:
      "The sixth seal moves through major warning signs into the final appearing of Christ. The Lisbon earthquake in 1755, the dark day and bloodlike moon in 1780, and the falling stars in 1833 are understood as warning signs that awaken the church to the nearness and certainty of the final day. The seal does not end in curiosity about signs; it ends with the searching question: who shall be able to stand?",
    application:
      "The signs are not given for curiosity. They call for readiness, repentance, and trust in the Lamb. Revelation 7 answers the question by showing sealed servants and a redeemed multitude washed in the Lamb's blood, making the sealing work essential before the seventh seal opens.",
    keyNotes: ["1755", "1780", "1833", "wrath of the Lamb", "who can stand?"],
    icon: Shield,
    color: "indigo"
  },
  {
    number: "7",
    name: "Silence in Heaven",
    symbol: "A solemn silence in heaven for about half an hour",
    period: "Second Coming after the sealing of God's servants",
    scripture: "Revelation 8:1",
    whatJohnSees:
      "When the Lamb opens the seventh seal, heaven becomes silent for about half an hour.",
    interpretation:
      "The seventh seal answers the movement of the sixth seal and Revelation 7. After the question, 'Who shall be able to stand?' and after God's servants are sealed, the silence in heaven points to Christ's visible return. Heaven is silent because Christ comes with the angelic host to gather the redeemed. The 'about half an hour' is commonly understood through prophetic time as 1/48 of a prophetic day, about seven and a half literal days, often expressed as about one week. Revelation 8:2-5 then introduces the trumpet cycle, but the seventh seal itself points to the Second Coming and the homeward journey of the redeemed.",
    application:
      "The silence teaches hope and reverence. The seals do not end with persecution, signs, or fear, but with Christ coming for His sealed people. The point is not date-setting, but confidence: the Lamb who opened the scroll also returns to gather those who belong to Him.",
    keyNotes: ["seventh seal", "Second Coming", "silence in heaven", "about one week", "sealed people"],
    icon: ScrollText,
    color: "gold"
  }
];

function findSealIndex(seal: Seal) {
  return sealsData.findIndex((item) => item.name === seal.name);
}

function includesSeal(seal: Seal, query: string) {
  const haystack = [
    seal.number,
    seal.name,
    seal.symbol,
    seal.period,
    seal.scripture,
    seal.whatJohnSees,
    seal.interpretation,
    seal.application,
    seal.keyNotes.join(" ")
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.trim().toLowerCase());
}

function ordinal(value: string) {
  if (value === "1") return "1st";
  if (value === "2") return "2nd";
  if (value === "3") return "3rd";
  return `${value}th`;
}

export function SevenSealsTimeline() {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedSeal = sealsData[selectedIndex];
  const SelectedIcon = selectedSeal.icon;
  const selectedStyles = sealStyles[selectedSeal.color];

  const visibleSeals = useMemo(() => {
    if (!query.trim()) return sealsData;
    return sealsData.filter((seal) => includesSeal(seal, query));
  }, [query]);

  function handleSearchChange(value: string) {
    setQuery(value);
    if (!value.trim() || includesSeal(selectedSeal, value)) return;
    const firstMatch = sealsData.find((seal) => includesSeal(seal, value));
    if (!firstMatch) return;
    setSelectedIndex(findSealIndex(firstMatch));
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8" aria-labelledby="seven-seals-title">
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="border-b border-amber-300/40 bg-gradient-to-br from-slate-950 to-slate-800 px-5 py-7 text-white sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/50 bg-amber-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-amber-200">
                <ScrollText className="h-3.5 w-3.5" aria-hidden="true" />
                Scroll and Seal Study
              </span>
              <h2 id="seven-seals-title" className="mt-4 font-serif-display text-3xl font-semibold tracking-tight text-amber-50 sm:text-5xl">
                The Seven Seals of Revelation
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Follow the Lamb opening the seals through gospel advance, persecution, compromise, martyr witness, warning signs, and the question of who can stand.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-slate-300 lg:max-w-xs">
              <p className="font-semibold text-amber-100">Quick path</p>
              <p className="mt-1 leading-6">
                Select a seal to compare its symbol, period, historical meaning, and pastoral call.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 bg-amber-50/35 p-4 dark:bg-amber-950/10 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 border-b border-amber-200 pb-5 dark:border-amber-900/50 sm:flex-row sm:items-center sm:justify-end">
            <label className="relative block w-full sm:w-80">
              <span className="sr-only">Search the seven seals cards</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder="Search keyword, e.g. white horse or 1833"
                className="h-10 w-full rounded-lg border border-amber-200 bg-background pl-9 pr-3 text-sm shadow-inner outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20 dark:border-amber-900/60"
              />
            </label>
          </div>

          <div id="seal-details" className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <div className="space-y-3">
              <div className="rounded-lg border border-slate-800 bg-gradient-to-br from-slate-950 to-slate-800 p-5 text-white shadow-sm">
                <h3 className="flex items-center gap-2 font-serif-display text-lg font-semibold text-amber-100">
                  <BookOpen className="h-5 w-5" aria-hidden="true" />
                  Select a Seal
                </h3>
                <p className="mt-2 text-xs leading-5 text-slate-300">
                Move through the seal sequence from the Lamb&apos;s first opening to the silence of Christ&apos;s return.
                </p>
              </div>
              <div className="space-y-2">
                {visibleSeals.map((seal) => {
                  const index = findSealIndex(seal);
                  const styles = sealStyles[seal.color];
                  return (
                    <button
                      key={seal.name}
                      type="button"
                      onClick={() => setSelectedIndex(index)}
                      className={cn(
                        "group flex w-full items-center justify-between rounded-lg border p-4 text-left transition hover:bg-amber-50 dark:hover:bg-amber-950/20",
                        selectedIndex === index ? cn("border-2 shadow-sm", styles.active) : "border-amber-200 bg-background dark:border-amber-900/50"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-serif-display text-lg font-bold italic text-muted-foreground">{seal.number}</span>
                        <span>
                          <span className="block font-serif-display text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100">
                            {seal.name}
                          </span>
                          <span className="text-xs text-muted-foreground">{seal.period}</span>
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5" aria-hidden="true" />
                    </button>
                  );
                })}
                {!visibleSeals.length ? (
                  <div className="rounded-lg border border-dashed border-amber-300 bg-background p-4 text-sm text-muted-foreground dark:border-amber-900/60">
                    No seal entries match that search.
                  </div>
                ) : null}
              </div>
            </div>

            <article className={cn("rounded-lg border-t-8 bg-background p-5 shadow-lg sm:p-8", selectedStyles.accent)}>
              <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className={cn("flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border shadow-sm", selectedStyles.icon)}>
                    <SelectedIcon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="flex flex-wrap items-center gap-2">
                      <h3 className="font-serif-display text-3xl font-semibold tracking-wide text-slate-950 dark:text-slate-50">
                        {ordinal(selectedSeal.number)} Seal: {selectedSeal.name}
                      </h3>
                      <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        {selectedSeal.scripture}
                      </span>
                    </span>
                    <span className="mt-1 block font-serif-display text-sm font-semibold tracking-wide text-amber-800 dark:text-amber-200">
                      {selectedSeal.period}
                    </span>
                  </span>
                </div>
                <div className="sm:text-right">
                  <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Main Symbol</span>
                  <span className={cn("font-serif-display text-lg font-bold italic", selectedStyles.text)}>
                    {selectedSeal.symbol}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                <InfoBlock icon={BookOpen} title="What John Sees" value={selectedSeal.whatJohnSees} />
                <InfoBlock icon={Shield} title="Interpretation and Historical Significance" value={selectedSeal.interpretation} />
                <InfoBlock icon={CheckCircle2} title="Pastoral Application" value={selectedSeal.application} highlight />

                <div className="rounded-lg border border-amber-400/60 bg-gradient-to-br from-slate-950 to-slate-800 p-5 text-white shadow-sm">
                  <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-200">
                    <Gift className="h-4 w-4" aria-hidden="true" />
                    Historical / Prophetic Period
                  </h4>
                  <p className="font-serif-display text-lg font-semibold leading-7 text-amber-50">{selectedSeal.period}</p>
                </div>

                <div className="border-t border-border pt-5">
                  <span className="mb-3 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Key Notes</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedSeal.keyNotes.map((note) => (
                      <span
                        key={note}
                        className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-100"
                      >
                        <Tag className="h-3 w-3 text-amber-700 dark:text-amber-300" aria-hidden="true" />
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoBlock({
  icon: Icon,
  title,
  value,
  highlight = false
}: {
  icon: LucideIcon;
  title: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4",
        highlight
          ? "border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/50 dark:bg-emerald-950/20"
          : "border-amber-200 bg-amber-50/60 dark:border-amber-900/50 dark:bg-amber-950/20"
      )}
    >
      <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
        <Icon className="h-4 w-4" aria-hidden="true" />
        {title}
      </h4>
      <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">{value}</p>
    </div>
  );
}
