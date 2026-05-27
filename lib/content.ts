import "server-only";

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  ArticleContentSchema,
  ChapterContentSchema,
  DanielConnectionSchema,
  IntroductionContentSchema,
  ProphecySectionSchema,
  ResourceSchema,
  SchoolSchema,
  SymbolEntrySchema,
  TimelineEventSchema,
  type ArticleContent,
  type ChapterContent,
  type DanielConnection,
  type IntroductionContent,
  type ProphecySection,
  type Resource,
  type School,
  type SymbolEntry,
  type TimelineEvent
} from "@/lib/schemas";
import { padChapter } from "@/lib/utils";

const contentRoot = join(process.cwd(), "content");

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(join(contentRoot, path), "utf8")) as T;
}

export function getChapter(chapter: number | string): ChapterContent {
  const data = readJson<unknown>(`revelation/chapter-${padChapter(chapter)}.json`);
  return ChapterContentSchema.parse(data);
}

export function getAllChapters(): ChapterContent[] {
  return readdirSync(join(contentRoot, "revelation"))
    .filter((file) => file.endsWith(".json"))
    .sort()
    .map((file) => ChapterContentSchema.parse(readJson<unknown>(`revelation/${file}`)));
}

export function getIntroduction(): IntroductionContent {
  const data = readJson<unknown>("introduction.json");
  return IntroductionContentSchema.parse(data);
}

export function getResources(): Resource[] {
  const data = readJson<{ resources: unknown[] }>("resources/bibliography.json");
  return data.resources.map((resource) => ResourceSchema.parse(resource));
}

export function getSymbols(): SymbolEntry[] {
  const data = readJson<{ symbols: unknown[] }>("glossary/symbols.json");
  return data.symbols.map((symbol) => SymbolEntrySchema.parse(symbol));
}

export function getProphecySections(): ProphecySection[] {
  const data = readJson<unknown[]>("prophecy/prophecy-sections.json");
  return data.map((section) => ProphecySectionSchema.parse(section));
}

export function getTimelineEvents(): TimelineEvent[] {
  const data = readJson<{ events: unknown[] }>("timelines/revelation-timeline.json");
  return data.events.map((event) => TimelineEventSchema.parse(event));
}

export function getSchools(): School[] {
  const data = readJson<{ schools: unknown[] }>("schools/prophetic-schools.json");
  return data.schools.map((school) => SchoolSchema.parse(school));
}

export function getDanielConnections(): DanielConnection[] {
  const data = readJson<{ connections: unknown[] }>("connections/daniel-revelation.json");
  return data.connections.map((connection) => DanielConnectionSchema.parse(connection));
}

export function getAllArticles(): ArticleContent[] {
  return readdirSync(join(contentRoot, "articles"))
    .filter((file) => file.endsWith(".json"))
    .sort()
    .map((file) => ArticleContentSchema.parse(readJson<unknown>(`articles/${file}`)));
}

export function getArticleBySlug(slug: string): ArticleContent | null {
  return getAllArticles().find((article) => article.slug === slug) ?? null;
}

export function getSourceMap() {
  return Object.fromEntries(getResources().map((resource) => [resource.id, resource]));
}

export function getSearchIndex() {
  const introduction = getIntroduction();
  const chapters = getAllChapters();
  const articles = getAllArticles();
  const symbols = getSymbols();
  const prophecy = getProphecySections();
  const connections = getDanielConnections();
  const timeline = getTimelineEvents();
  return [
    {
      id: "introduction",
      type: "introduction",
      title: introduction.title,
      href: "/introduction",
      text: `${introduction.summary} ${introduction.facts.map((fact) => `${fact.label} ${fact.value}`).join(" ")} ${introduction.highlights.join(" ")} ${introduction.sections
        .map((section) => `${section.title} ${section.body.join(" ")}`)
        .join(" ")} ${introduction.relatedLinks.map((link) => `${link.title} ${link.description}`).join(" ")}`
    },
    ...articles.map((article) => ({
      id: article.slug,
      type: "article",
      title: article.title,
      href: `/articles/${article.slug}`,
      text: `${article.category} ${article.summary} ${article.tags.join(" ")} ${article.sections
        .map((section) => `${section.title} ${section.body.join(" ")} ${section.scriptureReferences.join(" ")}`)
        .join(" ")} ${article.whyThisMatters.body.join(" ")} ${article.whyThisMatters.scriptureReferences.join(" ")}`
    })),
    ...chapters.map((chapter) => ({
      id: `chapter-${chapter.chapterNumber}`,
      type: "chapter",
      title: `Revelation ${chapter.chapterNumber}: ${chapter.title}`,
      href: `/revelation/${chapter.chapterNumber}`,
      text: `${chapter.summary} ${chapter.historicalContext} ${chapter.literaryContext} ${chapter.themes.join(" ")}`
    })),
    ...chapters.flatMap((chapter) =>
      chapter.verses.map((verse) => ({
        id: verse.verse,
        type: "verse",
        title: verse.verse,
        href: `/revelation/${chapter.chapterNumber}#${verse.verse.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        text: `${verse.bibleText} ${verse.commentary.detailedExplanation} ${verse.danielConnection} ${verse.crossReferences.join(" ")} ${verse.wordNotes
          .map((note) => `${note.term} ${note.explanation} ${note.scriptureReferences.join(" ")}`)
          .join(" ")}`
      }))
    ),
    ...symbols.map((symbol) => ({
      id: `symbol-${symbol.symbol}`,
      type: "symbol",
      title: symbol.symbol,
      href: `/symbols#${symbol.symbol.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      text: `${symbol.meaning} ${symbol.adventistInterpretation} ${symbol.otherViews} ${symbol.scriptureReferences.join(" ")}`
    })),
    ...prophecy.map((section) => ({
      id: `prophecy-${section.id}`,
      type: "prophecy",
      title: section.title,
      href: `/prophecy-charts#${section.id}`,
      text: `${section.reference} ${section.meaning} ${section.adventistInterpretation} ${section.alternativeViews} ${section.symbols.join(" ")}`
    })),
    ...connections.map((connection) => ({
      id: `daniel-${connection.id}`,
      type: "daniel",
      title: connection.title,
      href: `/daniel-revelation#${connection.id}`,
      text: `${connection.summary} ${connection.scriptureReferences.join(" ")} ${connection.sharedSymbols.join(" ")}`
    })),
    ...timeline.map((event) => ({
      id: `timeline-${event.id}`,
      type: "timeline",
      title: event.title,
      href: `/timeline#${event.id}`,
      text: `${event.period} ${event.description} ${event.scriptureReferences.join(" ")}`
    }))
  ];
}
