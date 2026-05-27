"use client";

import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Cross,
  Flame,
  Gift,
  Heart,
  Lightbulb,
  Scale,
  ScrollText,
  Search,
  Shield,
  Sparkles,
  Tag
} from "lucide-react";
import { cn } from "@/lib/utils";

type ChurchColor = "emerald" | "red" | "indigo" | "purple" | "amber" | "pink" | "gold";

type Church = {
  number: string;
  name: string;
  dates: string;
  meaning: string;
  complaint: string;
  compliment: string;
  reward: string;
  chapter: string;
  historicalEra: string;
  christSelf: string;
  dangerDetails: string;
  counsel: string;
  keyNotes: string[];
  icon: LucideIcon;
  color: ChurchColor;
};

const churchStyles: Record<
  ChurchColor,
  {
    card: string;
    border: string;
    text: string;
    badge: string;
    icon: string;
    active: string;
    accent: string;
  }
> = {
  emerald: {
    card: "border-emerald-200 bg-gradient-to-br from-emerald-50 to-amber-50 dark:border-emerald-900/60 dark:from-emerald-950/30 dark:to-amber-950/10",
    border: "hover:border-emerald-400",
    text: "text-emerald-800 dark:text-emerald-200",
    badge: "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100",
    icon: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
    active: "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
    accent: "border-emerald-500"
  },
  red: {
    card: "border-red-200 bg-gradient-to-br from-red-50 to-amber-50 dark:border-red-900/60 dark:from-red-950/30 dark:to-amber-950/10",
    border: "hover:border-red-400",
    text: "text-red-800 dark:text-red-200",
    badge: "bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-100",
    icon: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200",
    active: "border-red-500 bg-red-50 dark:bg-red-950/30",
    accent: "border-red-500"
  },
  indigo: {
    card: "border-indigo-200 bg-gradient-to-br from-indigo-50 to-amber-50 dark:border-indigo-900/60 dark:from-indigo-950/30 dark:to-amber-950/10",
    border: "hover:border-indigo-400",
    text: "text-indigo-800 dark:text-indigo-200",
    badge: "bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-100",
    icon: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200",
    active: "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30",
    accent: "border-indigo-500"
  },
  purple: {
    card: "border-purple-200 bg-gradient-to-br from-purple-50 to-amber-50 dark:border-purple-900/60 dark:from-purple-950/30 dark:to-amber-950/10",
    border: "hover:border-purple-400",
    text: "text-purple-800 dark:text-purple-200",
    badge: "bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-100",
    icon: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200",
    active: "border-purple-500 bg-purple-50 dark:bg-purple-950/30",
    accent: "border-purple-500"
  },
  amber: {
    card: "border-amber-300 bg-gradient-to-br from-amber-50 to-stone-50 dark:border-amber-800/70 dark:from-amber-950/30 dark:to-stone-950/10",
    border: "hover:border-amber-500",
    text: "text-amber-900 dark:text-amber-200",
    badge: "bg-amber-100 text-amber-950 dark:bg-amber-950 dark:text-amber-100",
    icon: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
    active: "border-amber-500 bg-amber-50 dark:bg-amber-950/30",
    accent: "border-amber-500"
  },
  pink: {
    card: "border-pink-200 bg-gradient-to-br from-pink-50 to-amber-50 dark:border-pink-900/60 dark:from-pink-950/30 dark:to-amber-950/10",
    border: "hover:border-pink-400",
    text: "text-pink-800 dark:text-pink-200",
    badge: "bg-pink-100 text-pink-900 dark:bg-pink-950 dark:text-pink-100",
    icon: "bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-200",
    active: "border-pink-500 bg-pink-50 dark:bg-pink-950/30",
    accent: "border-pink-500"
  },
  gold: {
    card: "border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50 dark:border-yellow-800/70 dark:from-yellow-950/30 dark:to-amber-950/10",
    border: "hover:border-yellow-500",
    text: "text-yellow-900 dark:text-yellow-200",
    badge: "bg-yellow-100 text-yellow-950 dark:bg-yellow-950 dark:text-yellow-100",
    icon: "bg-yellow-100 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-200",
    active: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30",
    accent: "border-yellow-500"
  }
};

const churchesData: Church[] = [
  {
    number: "1",
    name: "Ephesus",
    dates: "A.D. 31-100",
    meaning: "Desirable, lovely",
    complaint: "Lost first love",
    compliment: "Labor, patience, doctrinal discernment, and hatred of the deeds of the Nicolaitans",
    reward: "Access to the tree of life in the paradise of God",
    chapter: "Revelation 2:1-7",
    historicalEra: "Apostolic Zeal Era",
    christSelf: "Christ walks among the seven lampstands and holds the seven stars in His hand, showing His immediate care for His churches and His authority over their messengers.",
    dangerDetails: "Truthful labor can outlive deep devotion. Ephesus had zeal, endurance, and discernment, yet Christ exposed a loss of first love that threatened the heart of its witness.",
    counsel: "Remember from where you have fallen, repent, and do the first works.",
    keyNotes: ["lampstands", "first love", "Nicolaitans", "repentance", "tree of life"],
    icon: Lightbulb,
    color: "emerald"
  },
  {
    number: "2",
    name: "Smyrna",
    dates: "A.D. 100-313",
    meaning: "Sweet fragrance, myrrh",
    complaint: "None",
    compliment: "Spiritual riches while enduring tribulation, poverty, slander, prison, and persecution",
    reward: "Crown of life and escape from the second death",
    chapter: "Revelation 2:8-11",
    historicalEra: "Persecuted Church Era",
    christSelf: "Christ presents Himself as the First and the Last, the One who died and lives again. The suffering church is addressed by the Lord who has already conquered death.",
    dangerDetails: "Smyrna faced intense pressure from hostile powers and religious slander. The church looked poor on earth, yet Christ called it rich because faithfulness under suffering is wealth in heaven's sight.",
    counsel: "Fear none of those things which you shall suffer. Be faithful unto death.",
    keyNotes: ["tribulation", "spiritual riches", "ten days", "crown of life", "second death"],
    icon: Flame,
    color: "red"
  },
  {
    number: "3",
    name: "Pergamos",
    dates: "A.D. 313-538",
    meaning: "Height, elevation, by marriage",
    complaint: "Tolerance of Balaam-like compromise, idolatry, immorality, and Nicolaitane teaching",
    compliment: "Held fast Christ's name and did not deny His faith where Satan's throne was",
    reward: "Hidden manna, a white stone, and a new name",
    chapter: "Revelation 2:12-17",
    historicalEra: "Imperial Compromise Era",
    christSelf: "Christ comes with the sharp two-edged sword, the word that exposes compromise and judges false teaching.",
    dangerDetails: "After persecution eased, imperial favor made compromise attractive. Pergamos warns that acceptance by the world can be more spiritually dangerous than hostility from the world.",
    counsel: "Repent, or Christ will come quickly and fight against the compromised teachers with the sword of His mouth.",
    keyNotes: ["Satan's seat", "Antipas", "Balaam", "Nicolaitans", "hidden manna", "white stone"],
    icon: Shield,
    color: "indigo"
  },
  {
    number: "4",
    name: "Thyatira",
    dates: "A.D. 538-1565",
    meaning: "Perfume of labor, sweet savor of sacrifice",
    complaint: "Tolerance of Jezebel, spiritual idolatry, false teaching, and deep corruption",
    compliment: "Works, love, faith, service, patience, and growing endurance",
    reward: "Power over the nations, the rod of iron, and the morning star",
    chapter: "Revelation 2:18-29",
    historicalEra: "Medieval Papal Era",
    christSelf: "Christ has eyes like a flame of fire and feet like fine brass. He searches the heart, sees through religious appearance, and stands in unyielding holiness.",
    dangerDetails: "Thyatira pictures a long era of mingled devotion and corruption. Christ recognizes faithful works, yet He also confronts a system that joins spiritual authority to idolatry and coercion.",
    counsel: "Hold fast what you have until Christ comes.",
    keyNotes: ["Jezebel", "depths of Satan", "hold fast", "rod of iron", "morning star"],
    icon: Cross,
    color: "purple"
  },
  {
    number: "5",
    name: "Sardis",
    dates: "A.D. 1565-1740",
    meaning: "Those escaping or remaining",
    complaint: "A name of being alive while actually spiritually dead",
    compliment: "A few names had not defiled their garments",
    reward: "White raiment, the book of life, and confession before the Father",
    chapter: "Revelation 3:1-6",
    historicalEra: "Post-Reformation Formalism Era",
    christSelf: "Christ holds the seven Spirits of God and the seven stars, bringing the Spirit's life where reputation has replaced living faith.",
    dangerDetails: "Recovered truth can harden into mere reputation. Sardis warns against a form of religion that preserves correct names and memories while losing watchfulness and spiritual vitality.",
    counsel: "Be watchful, strengthen the things that remain, remember how you received and heard, hold fast, and repent.",
    keyNotes: ["seven Spirits", "watchfulness", "white garments", "book of life"],
    icon: Sparkles,
    color: "amber"
  },
  {
    number: "6",
    name: "Philadelphia",
    dates: "A.D. 1740-1844",
    meaning: "Brotherly love",
    complaint: "None",
    compliment: "Kept Christ's word and did not deny His name, though having little strength",
    reward: "Kept through trial, made a pillar in God's temple, and marked with God's name and New Jerusalem",
    chapter: "Revelation 3:7-13",
    historicalEra: "Great Missionary Awakening Era",
    christSelf: "Christ is holy and true, holding the key of David. What He opens no one shuts, and what He shuts no one opens.",
    dangerDetails: "Philadelphia had little visible strength, yet Christ set before it an open door. The era is marked by revival, missionary expansion, and renewed expectation.",
    counsel: "Hold fast what you have, so that no one may take your crown.",
    keyNotes: ["key of David", "open door", "little strength", "crown", "pillar", "New Jerusalem"],
    icon: Heart,
    color: "pink"
  },
  {
    number: "7",
    name: "Laodicea",
    dates: "A.D. 1844 onward",
    meaning: "Judging of the people, or a just people",
    complaint: "Lukewarm, self-deceived, poor, blind, and naked",
    compliment: "None",
    reward: "Fellowship with Christ and a seat with Him on His throne",
    chapter: "Revelation 3:14-22",
    historicalEra: "Lukewarm Modern Era",
    christSelf: "Christ is the Amen, the Faithful and True Witness, and the Beginning of God's creation. He tells the truth because He loves enough to heal.",
    dangerDetails: "Laodicea's crisis is not open atheism but religious self-satisfaction. The church claims to need nothing while Christ sees poverty, blindness, and nakedness.",
    counsel: "Buy gold tried in fire, white raiment, and eyesalve; be zealous and repent; open the door to Christ.",
    keyNotes: ["lukewarmness", "gold tried in fire", "white raiment", "eyesalve", "door", "throne"],
    icon: Scale,
    color: "gold"
  }
];

function findChurchIndex(church: Church) {
  return churchesData.findIndex((item) => item.name === church.name);
}

function includesChurch(church: Church, query: string) {
  const haystack = [
    church.name,
    church.dates,
    church.meaning,
    church.complaint,
    church.compliment,
    church.reward,
    church.historicalEra,
    church.christSelf,
    church.dangerDetails,
    church.counsel,
    church.keyNotes.join(" ")
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.trim().toLowerCase());
}

export function SevenChurchesTimeline() {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedChurch = churchesData[selectedIndex];
  const SelectedIcon = selectedChurch.icon;
  const selectedStyles = churchStyles[selectedChurch.color];

  const visibleChurches = useMemo(() => {
    if (!query.trim()) return churchesData;
    return churchesData.filter((church) => includesChurch(church, query));
  }, [query]);

  function handleSearchChange(value: string) {
    setQuery(value);
    if (!value.trim() || includesChurch(selectedChurch, value)) return;
    const firstMatch = churchesData.find((church) => includesChurch(church, value));
    if (!firstMatch) return;
    setSelectedIndex(findChurchIndex(firstMatch));
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8" aria-labelledby="seven-churches-title">
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="border-b border-amber-300/40 bg-gradient-to-br from-slate-950 to-slate-800 px-5 py-7 text-white sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/50 bg-amber-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-amber-200">
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                Prophetic and Historical Study
              </span>
              <h2 id="seven-churches-title" className="mt-4 font-serif-display text-3xl font-semibold tracking-tight text-amber-50 sm:text-5xl">
                The Seven Churches of Revelation
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Explore Revelation 2 and 3 as local messages to first-century congregations and as a prophetic portrait of the church&apos;s unfolding experience from apostolic zeal to the final call to repent.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-slate-300 lg:max-w-xs">
              <p className="font-semibold text-amber-100">Quick path</p>
              <p className="mt-1 leading-6">
                Start with the era tiles, compare the chart, then use the focused view for counsel, warnings, and promises.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 bg-amber-50/35 p-4 dark:bg-amber-950/10 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 border-b border-amber-200 pb-5 dark:border-amber-900/50 sm:flex-row sm:items-center sm:justify-end">
            <label className="relative block w-full sm:w-80">
              <span className="sr-only">Search the seven churches cards</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder="Search keyword, e.g. manna or Jezebel"
                className="h-10 w-full rounded-lg border border-amber-200 bg-background pl-9 pr-3 text-sm shadow-inner outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20 dark:border-amber-900/60"
              />
            </label>
          </div>

            <div id="church-details" className="grid gap-6 lg:grid-cols-[320px_1fr]">
              <div className="space-y-3">
                <div className="rounded-lg border border-slate-800 bg-gradient-to-br from-slate-950 to-slate-800 p-5 text-white shadow-sm">
                  <h3 className="flex items-center gap-2 font-serif-display text-lg font-semibold text-amber-100">
                    <ScrollText className="h-5 w-5" aria-hidden="true" />
                    Select a Congregation
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-300">
                    Deep dive into Christ&apos;s self-presentation, counsel, warning, and promise for each era.
                  </p>
                </div>
                <div className="space-y-2">
                  {visibleChurches.map((church) => {
                    const index = findChurchIndex(church);
                    const styles = churchStyles[church.color];
                    return (
                      <button
                        key={church.name}
                        type="button"
                        onClick={() => setSelectedIndex(index)}
                        className={cn(
                          "group flex w-full items-center justify-between rounded-lg border p-4 text-left transition hover:bg-amber-50 dark:hover:bg-amber-950/20",
                          selectedIndex === index ? cn("border-2 shadow-sm", styles.active) : "border-amber-200 bg-background dark:border-amber-900/50"
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <span className="font-serif-display text-lg font-bold italic text-muted-foreground">{church.number}</span>
                          <span>
                            <span className="block font-serif-display text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100">
                              {church.name}
                            </span>
                            <span className="text-xs text-muted-foreground">{church.dates}</span>
                          </span>
                        </span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5" aria-hidden="true" />
                      </button>
                    );
                  })}
                  {!visibleChurches.length ? (
                    <div className="rounded-lg border border-dashed border-amber-300 bg-background p-4 text-sm text-muted-foreground dark:border-amber-900/60">
                      No church entries match that search.
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
                        <h3 className="font-serif-display text-3xl font-semibold uppercase tracking-wide text-slate-950 dark:text-slate-50">
                          {selectedChurch.name}
                        </h3>
                        <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                          {selectedChurch.chapter}
                        </span>
                      </span>
                      <span className="mt-1 block font-serif-display text-sm font-semibold tracking-wide text-amber-800 dark:text-amber-200">
                        {selectedChurch.historicalEra} ({selectedChurch.dates})
                      </span>
                    </span>
                  </div>
                  <div className="sm:text-right">
                    <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Name Meaning</span>
                    <span className="font-serif-display text-lg font-bold italic text-slate-800 dark:text-slate-200">
                      {selectedChurch.meaning}
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-6">
                  <div className="rounded-r-lg border-l-4 border-slate-900 bg-slate-50 p-4 dark:border-slate-300 dark:bg-slate-950/40">
                    <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                      <BookOpen className="h-4 w-4" aria-hidden="true" />
                      Presentation of Christ
                    </h4>
                    <p className="font-serif-display text-sm italic leading-7 text-slate-700 dark:text-slate-300">{selectedChurch.christSelf}</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/20">
                      <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-200">
                        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                        Commendation
                      </h4>
                      <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">{selectedChurch.compliment}</p>
                    </div>
                    <div className="rounded-lg border border-red-200 bg-red-50/70 p-4 dark:border-red-900/50 dark:bg-red-950/20">
                      <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-800 dark:text-red-200">
                        <AlertCircle className="h-4 w-4" aria-hidden="true" />
                        Warning
                      </h4>
                      <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                        {selectedChurch.complaint === "None" ? (
                          <span className="font-bold text-emerald-700 dark:text-emerald-300">No complaint recorded by Christ.</span>
                        ) : (
                          selectedChurch.complaint
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
                    <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                      <Shield className="h-4 w-4" aria-hidden="true" />
                      Spiritual Risk and Era Context
                    </h4>
                    <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">{selectedChurch.dangerDetails}</p>
                  </div>

                  <div className="rounded-lg border border-amber-300/70 bg-amber-50 p-4 dark:border-amber-900/60 dark:bg-amber-950/30">
                    <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-200">
                      <ScrollText className="h-4 w-4" aria-hidden="true" />
                      Divine Counsel
                    </h4>
                    <p className="font-serif-display text-sm font-semibold leading-7 text-slate-900 dark:text-slate-100">{selectedChurch.counsel}</p>
                  </div>

                  <div className="rounded-lg border border-amber-400/60 bg-gradient-to-br from-slate-950 to-slate-800 p-5 text-white shadow-sm">
                    <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-200">
                      <Gift className="h-4 w-4" aria-hidden="true" />
                      Promise to the Overcomer
                    </h4>
                    <p className="font-serif-display text-lg font-semibold leading-7 text-amber-50">{selectedChurch.reward}</p>
                  </div>

                  <div className="border-t border-border pt-5">
                    <span className="mb-3 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Key Prophetic Notes</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedChurch.keyNotes.map((note) => (
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
