import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  ArticleContentSchema,
  ChapterContentSchema,
  DanielConnectionSchema,
  ProphecySectionSchema,
  ResourceSchema,
  SchoolSchema,
  SymbolEntrySchema,
  TimelineEventSchema
} from "../lib/schemas";

const root = process.cwd();
const contentRoot = join(root, "content");
const sourceIndexPath = join(root, ".pdf-extraction-cache/source-index.json");
const sourceIndex = existsSync(sourceIndexPath) ? JSON.parse(readFileSync(sourceIndexPath, "utf8")) : { sources: {} };
const expectedVerseCounts = [20, 29, 22, 11, 14, 17, 17, 13, 21, 11, 19, 17, 18, 20, 8, 21, 18, 24, 21, 15, 27, 21];
const expectedArticleSlugs = [
  "why-revelation-begins-with-jesus",
  "how-to-read-revelation-symbols",
  "interpretive-methods-and-historicism-in-revelation",
  "daniel-and-revelation-one-prophetic-story",
  "seven-churches-message-and-history",
  "throne-scroll-and-lamb",
  "seven-seals-144000-and-who-can-stand",
  "seven-trumpets-as-warning-judgments",
  "woman-dragon-beasts-and-three-angels",
  "from-babylon-to-new-jerusalem",
  "was-revelation-mainly-about-nero",
  "antichrist-man-or-prophetic-system",
  "what-is-the-mark-of-the-beast",
  "what-does-666-mean",
  "who-or-what-is-babylon",
  "trumpets-and-seven-last-plagues",
  "what-is-armageddon",
  "who-are-the-144000",
  "what-is-the-millennium",
  "what-is-the-lake-of-fire",
  "is-revelation-chronological",
  "what-does-i-come-quickly-mean",
  "new-jerusalem-literal-or-symbolic",
  "does-revelation-teach-a-secret-rapture",
  "what-is-the-testimony-of-jesus"
];
const errors: string[] = [];
const adventistSourceIds = new Set<string>();
const allSourceIds = new Set<string>();
const mcnultySourceId = "revelation-practical-living-in-the-judgment-hour";
const minimumCommentaryWords = 300;
const maximumCommentaryWords = 500;
const longFormChapters = new Set([5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]);
const bannedPublicPhrases = [
  "belongs to",
  "The first hearers",
  "The verse must first",
  "Its wording draws",
  "The verse should be read",
  "The wording should be read",
  "Needs source review",
  "source review",
  "source-index page",
  "citation",
  "uploaded Adventist",
  "uploaded source",
  "uploaded commentary",
  "source packet",
  "source hierarchy",
  "hidden audit",
  "Norman McNulty",
  "Here the vision speaks",
  "This line turns on",
  "fits within Revelation's larger pattern",
  "carefully placed step",
  "The verse contributes to Revelation",
  "The response is quiet endurance",
  "The first-century setting still matters",
  "In an Adventist reading, this must be kept",
  "John draws attention to",
  "John's sentence is compact",
  "The verse slows the reader down",
  "The verse gathers its force",
  "This reading explains",
  "This reading emphasizes",
  "In Adventist historicist interpretation, this verse",
  "Read the verse",
  "For teaching and personal study",
  "This keeps the exposition useful",
  "non-Adventist treatment",
  "commentators tie",
  "Commentators tie",
  "Other commentators",
  "source language",
  "manuscript material",
  "The word to",
  "The theological center is",
  "The message also guards",
  "Because Christ walks among",
  "Adventist interpretation",
  "Adventist historicist",
  "Adventist historicism",
  "Adventist reading",
  "In Adventist",
  "The prophetic reading",
  "The pastoral appeal",
  "The pastoral lesson",
  "The pastoral burden is",
  "The pastoral call is clear",
  "The Adventist prophetic reading",
  "The practical lesson",
  "The practical question",
  "The application is",
  "The verse is pastoral"
];

const chapter3BannedPublicPhrases = [
  "Adventist",
  "historicist",
  "church-history",
  "church history",
  "manuscript",
  "uploaded",
  "source material",
  "source language",
  "The appeal is",
  "The practical appeal",
  "The pastoral appeal",
  "The pastoral lesson",
  "This reading",
  "The passage presents"
];

const chapter4BannedPublicPhrases = [
  "Adventist interpretation",
  "Adventist historicist",
  "historicist",
  "church-history",
  "church history",
  "manuscript",
  "uploaded",
  "source material",
  "source language",
  "Within the sanctuary-shaped reading",
  "The throne-room vision steadies worship",
  "The chapter teaches the reader",
  "The appeal is",
  "The practical appeal",
  "The pastoral appeal",
  "This reading",
  "The passage presents"
];

const chapter5BannedPublicPhrases = [
  "Adventist interpretation",
  "Adventist historicist",
  "historicist",
  "church-history",
  "church history",
  "manuscript",
  "uploaded",
  "source material",
  "source language",
  "Within the sanctuary-shaped reading",
  "The throne-room vision steadies worship",
  "The chapter teaches the reader",
  "The appeal is",
  "The practical appeal",
  "The pastoral appeal",
  "This reading",
  "The passage presents",
  "redeemed humans",
  "human representatives"
];

const chapter6BannedPublicPhrases = [
  "Adventist interpretation",
  "Adventist historicist",
  "Adventist historicism",
  "Adventist reading",
  "In Adventist",
  "historicist",
  "church-history",
  "church history",
  "manuscript",
  "uploaded",
  "source material",
  "source language",
  "The pastoral appeal",
  "The practical appeal",
  "The appeal is",
  "This reading",
  "The passage presents",
  "The prophecy presents"
];

const chapter7BannedPublicPhrases = [
  "Adventist interpretation",
  "Adventist historicist",
  "Adventist historicism",
  "Adventist reading",
  "In Adventist",
  "historicist",
  "church-history",
  "church history",
  "manuscript",
  "uploaded",
  "source material",
  "source language",
  "The pastoral appeal",
  "The practical appeal",
  "The appeal is",
  "This reading",
  "The passage presents",
  "The prophecy presents",
  "This keeps the chapter centered",
  "The vision forms readiness",
  "The reader is invited to receive",
  "The chapter answers fear",
  "The interlude is therefore",
  "The emphasis is not on satisfying curiosity"
];

const chapter8BannedPublicPhrases = [
  "Adventist interpretation",
  "Adventist historicist",
  "Adventist historicism",
  "Adventist reading",
  "In Adventist",
  "historicist",
  "church-history",
  "church history",
  "manuscript",
  "uploaded",
  "source material",
  "source language",
  "Norman McNulty",
  "McNulty",
  "some interpreters",
  "Classic Adventist",
  "Other Adventist",
  "broader Adventist",
  "The pastoral appeal",
  "The practical appeal",
  "The appeal is",
  "This reading",
  "The passage presents",
  "The prophecy presents",
  "This keeps the trumpet vision",
  "The chapter asks the reader",
  "The scene remains Christ-centered"
];

const chapter9BannedPublicPhrases = [
  "Adventist interpretation",
  "Adventist historicist",
  "Adventist historicism",
  "Adventist reading",
  "In Adventist",
  "historicist",
  "church-history",
  "church history",
  "manuscript",
  "uploaded",
  "source material",
  "source language",
  "Norman McNulty",
  "McNulty",
  "some interpreters",
  "classic Adventist",
  "Classic Adventist",
  "Other Adventist",
  "broader Adventist",
  "The pastoral appeal",
  "The practical appeal",
  "The appeal is",
  "This reading",
  "The passage presents",
  "The prophecy presents",
  "This keeps the chapter",
  "The chapter asks the reader",
  "The scene remains Christ-centered"
];

const chapter10BannedPublicPhrases = [
  "Adventist interpretation",
  "Adventist historicist",
  "Adventist historicism",
  "Adventist reading",
  "In Adventist",
  "historicist",
  "church-history",
  "church history",
  "manuscript",
  "uploaded",
  "source material",
  "source language",
  "Norman McNulty",
  "McNulty",
  "some interpreters",
  "The pastoral appeal",
  "The practical appeal",
  "The appeal is",
  "This reading",
  "The passage presents",
  "The prophecy presents",
  "The verse is pastoral",
  "The practical question",
  "This keeps the chapter",
  "The chapter asks the reader"
];

const chapter11BannedPublicPhrases = [
  "Adventist interpretation",
  "Adventist historicist",
  "Adventist historicism",
  "Adventist reading",
  "In Adventist",
  "historicist",
  "church-history",
  "church history",
  "manuscript",
  "uploaded",
  "source material",
  "source language",
  "Norman McNulty",
  "McNulty",
  "some interpreters",
  "The pastoral appeal",
  "The practical appeal",
  "The appeal is",
  "This reading",
  "The passage presents",
  "The prophecy presents",
  "The verse is pastoral",
  "The practical question",
  "This keeps the chapter",
  "The chapter asks the reader"
];

const chapter12BannedPublicPhrases = [
  "Adventist interpretation",
  "Adventist historicist",
  "Adventist historicism",
  "Adventist reading",
  "In Adventist",
  "historicist",
  "church-history",
  "church history",
  "manuscript",
  "uploaded",
  "source material",
  "source language",
  "Norman McNulty",
  "McNulty",
  "some interpreters",
  "The pastoral appeal",
  "The practical appeal",
  "The appeal is",
  "This reading",
  "The passage presents",
  "The prophecy presents",
  "The verse is pastoral",
  "The practical question",
  "This keeps the chapter",
  "The chapter asks the reader"
];

const chapter13BannedPublicPhrases = [
  "Adventist interpretation",
  "Adventist historicist",
  "Adventist historicism",
  "Adventist reading",
  "In Adventist",
  "historicist",
  "church-history",
  "church history",
  "manuscript",
  "uploaded",
  "source material",
  "source language",
  "Norman McNulty",
  "McNulty",
  "some interpreters",
  "The pastoral appeal",
  "The practical appeal",
  "The appeal is",
  "This reading",
  "The passage presents",
  "The prophecy presents",
  "The verse is pastoral",
  "The practical question",
  "This keeps the chapter",
  "The chapter asks the reader"
];

const chapter14BannedPublicPhrases = [
  "Adventist interpretation",
  "Adventist historicist",
  "Adventist historicism",
  "Adventist reading",
  "In Adventist",
  "historicist",
  "church-history",
  "church history",
  "manuscript",
  "uploaded",
  "source material",
  "source language",
  "Norman McNulty",
  "McNulty",
  "some interpreters",
  "The pastoral appeal",
  "The practical appeal",
  "The appeal is",
  "This reading",
  "The passage presents",
  "The prophecy presents",
  "The verse is pastoral",
  "The practical question",
  "This keeps the chapter",
  "The chapter asks the reader"
];

const chapter15BannedPublicPhrases = [
  "Adventist interpretation",
  "Adventist historicist",
  "Adventist historicism",
  "Adventist reading",
  "In Adventist",
  "historicist",
  "church-history",
  "church history",
  "manuscript",
  "uploaded",
  "source material",
  "source language",
  "Norman McNulty",
  "McNulty",
  "some interpreters",
  "The pastoral appeal",
  "The practical appeal",
  "The appeal is",
  "This reading",
  "The passage presents",
  "The prophecy presents",
  "The verse is pastoral",
  "The practical question",
  "This keeps the chapter",
  "The chapter asks the reader"
];

const chapter16BannedPublicPhrases = [
  "Adventist interpretation",
  "Adventist historicist",
  "Adventist historicism",
  "Adventist reading",
  "In Adventist",
  "historicist",
  "church-history",
  "church history",
  "manuscript",
  "uploaded",
  "source material",
  "source language",
  "Norman McNulty",
  "McNulty",
  "some interpreters",
  "The pastoral appeal",
  "The practical appeal",
  "The appeal is",
  "This reading",
  "The passage presents",
  "The prophecy presents",
  "The verse is pastoral",
  "The practical question",
  "This keeps the chapter",
  "The chapter asks the reader"
];

const chapter17BannedPublicPhrases = [
  "Adventist interpretation",
  "Adventist historicist",
  "Adventist historicism",
  "Adventist reading",
  "In Adventist",
  "historicist",
  "church-history",
  "church history",
  "manuscript",
  "uploaded",
  "source material",
  "source language",
  "Norman McNulty",
  "McNulty",
  "some interpreters",
  "Traditional summaries",
  "Other interpreters",
  "Preterists",
  "preterist",
  "futurist",
  "The pastoral appeal",
  "The practical appeal",
  "The appeal is",
  "This reading",
  "The passage presents",
  "The prophecy presents",
  "The verse is pastoral",
  "The practical question",
  "This keeps the chapter",
  "The chapter asks the reader"
];

const chapter18BannedPublicPhrases = [
  "Official Seventh-day belief",
  "Seventh-day belief",
  "Adventist interpretation",
  "Adventist historicist",
  "Adventist historicism",
  "Adventist reading",
  "In Adventist",
  "historicist",
  "church-history",
  "church history",
  "manuscript",
  "uploaded",
  "source material",
  "source language",
  "Norman McNulty",
  "McNulty",
  "some interpreters",
  "Traditional summaries",
  "Other interpreters",
  "Preterists",
  "preterist",
  "futurist",
  "The pastoral appeal",
  "The practical appeal",
  "The appeal is",
  "This reading",
  "The passage presents",
  "The prophecy presents",
  "The verse is pastoral",
  "The practical question",
  "This keeps the chapter",
  "The chapter asks the reader",
  "The language centers on",
  "The imagery is anchored by"
];

const chapter19BannedPublicPhrases = [
  "Official Seventh-day belief",
  "Seventh-day belief",
  "Adventist interpretation",
  "Adventist historicist",
  "Adventist historicism",
  "Adventist reading",
  "In Adventist",
  "historicist",
  "Historicist readers",
  "church-history",
  "church history",
  "manuscript",
  "uploaded",
  "source material",
  "source language",
  "Norman McNulty",
  "McNulty",
  "some interpreters",
  "Traditional summaries",
  "Other interpreters",
  "Preterists",
  "preterist",
  "futurist",
  "The pastoral appeal",
  "The practical appeal",
  "The appeal is",
  "This reading",
  "The passage presents",
  "The prophecy presents",
  "The verse is pastoral",
  "The practical question",
  "This keeps the chapter",
  "The chapter asks the reader",
  "The language centers on",
  "The imagery is anchored by"
];

const chapter20BannedPublicPhrases = [
  "Official Seventh-day belief",
  "Seventh-day belief",
  "Adventist interpretation",
  "Adventist historicist",
  "Adventist historicism",
  "Adventist reading",
  "In Adventist",
  "historicist",
  "Historicist readers",
  "church-history",
  "church history",
  "manuscript",
  "uploaded",
  "source material",
  "source language",
  "Norman McNulty",
  "McNulty",
  "some interpreters",
  "Traditional summaries",
  "Other interpreters",
  "Preterists",
  "preterist",
  "futurist",
  "The pastoral appeal",
  "The practical appeal",
  "The appeal is",
  "This reading",
  "The passage presents",
  "The prophecy presents",
  "The verse is pastoral",
  "The practical question",
  "This keeps the chapter",
  "The chapter asks the reader",
  "The language centers on",
  "The imagery is anchored by",
  "belongs to",
  "newspaper prophecy"
];

const chapter21BannedPublicPhrases = [
  "Official Seventh-day belief",
  "Seventh-day belief",
  "Adventist interpretation",
  "Adventist historicist",
  "Adventist historicism",
  "Adventist reading",
  "In Adventist",
  "historicist",
  "Historicist readers",
  "church-history",
  "church history",
  "manuscript",
  "uploaded",
  "source material",
  "source language",
  "Norman McNulty",
  "McNulty",
  "some interpreters",
  "Traditional summaries",
  "Other interpreters",
  "Preterists",
  "preterist",
  "futurist",
  "The pastoral appeal",
  "The practical appeal",
  "The appeal is",
  "This reading",
  "The passage presents",
  "The prophecy presents",
  "The verse is pastoral",
  "The practical question",
  "This keeps the chapter",
  "The chapter asks the reader",
  "The language centers on",
  "The imagery is anchored by",
  "belongs to"
];

const chapter22BannedPublicPhrases = [
  "Official Seventh-day belief",
  "Seventh-day belief",
  "Adventist interpretation",
  "Adventist historicist",
  "Adventist historicism",
  "Adventist reading",
  "In Adventist",
  "historicist",
  "Historicist readers",
  "church-history",
  "church history",
  "manuscript",
  "uploaded",
  "source material",
  "source language",
  "Norman McNulty",
  "McNulty",
  "some interpreters",
  "Traditional summaries",
  "Other interpreters",
  "Preterists",
  "preterist",
  "futurist",
  "The pastoral appeal",
  "The practical appeal",
  "The appeal is",
  "This reading",
  "The passage presents",
  "The prophecy presents",
  "The verse is pastoral",
  "The practical question",
  "This keeps the chapter",
  "The chapter asks the reader",
  "The language centers on",
  "The imagery is anchored by",
  "belongs to"
];

const articleBannedPublicPhrases = [
  "uploaded",
  "source-indexed",
  "source indexed",
  "sourceAudit",
  "source audit",
  "manuscript",
  "PDF",
  "citation",
  "McNulty",
  "Wilson",
  "Gems from Daniel",
  "God Cares",
  "Revelation Practical Living",
  "Revelation Verse By Verse",
  "Secrets of Revelation",
  "Revelation Pure and Simple",
  "Bauckham",
  "Beale",
  "Stefanovic",
  "Osborne",
  "deSilva",
  "Boring"
];

const pericopes: Record<number, Array<[number, number, string]>> = {
  1: [[1, 3, "Prologue and blessing"], [4, 8, "Greeting, doxology, and coming"], [9, 11, "John on Patmos"], [12, 20, "Christ among the lampstands"]],
  2: [[1, 7, "Ephesus"], [8, 11, "Smyrna"], [12, 17, "Pergamos"], [18, 29, "Thyatira"]],
  3: [[1, 6, "Sardis"], [7, 13, "Philadelphia"], [14, 22, "Laodicea"]],
  4: [[1, 11, "Heavenly throne room"]],
  5: [[1, 14, "The Lamb and the scroll"]],
  6: [[1, 2, "First seal"], [3, 4, "Second seal"], [5, 6, "Third seal"], [7, 8, "Fourth seal"], [9, 11, "Fifth seal"], [12, 17, "Sixth seal"]],
  7: [[1, 8, "Sealing of God's servants"], [9, 17, "Great multitude"]],
  8: [[1, 5, "Seventh seal and incense"], [6, 13, "First four trumpets"]],
  9: [[1, 12, "Fifth trumpet"], [13, 21, "Sixth trumpet"]],
  10: [[1, 7, "Mighty angel"], [8, 11, "Little book and recommissioning"]],
  11: [[1, 2, "Measuring the temple"], [3, 14, "Two witnesses"], [15, 19, "Seventh trumpet"]],
  12: [[1, 6, "Woman, dragon, and child"], [7, 12, "War in heaven"], [13, 17, "Wilderness and remnant"]],
  13: [[1, 10, "Sea beast"], [11, 18, "Earth beast and mark"]],
  14: [[1, 5, "Lamb and 144,000"], [6, 12, "Three angels' messages"], [13, 20, "Blessing and harvest"]],
  15: [[1, 4, "Victors sing"], [5, 8, "Temple and seven plagues"]],
  16: [[1, 11, "First five bowls"], [12, 16, "Sixth bowl and Armageddon"], [17, 21, "Seventh bowl"]],
  17: [[1, 6, "Woman and beast"], [7, 18, "Symbol explained"]],
  18: [[1, 8, "Babylon fallen and call out"], [9, 19, "Laments over Babylon"], [20, 24, "Final verdict"]],
  19: [[1, 10, "Hallelujah and marriage supper"], [11, 21, "Rider on the white horse"]],
  20: [[1, 3, "Satan bound"], [4, 6, "Millennial reign"], [7, 10, "Final revolt ended"], [11, 15, "Great white throne judgment"]],
  21: [[1, 8, "New creation"], [9, 27, "New Jerusalem"]],
  22: [[1, 5, "River and tree of life"], [6, 11, "Trustworthy words"], [12, 21, "Final invitation"]]
};

function unitFor(chapter: number, verseNumber: number) {
  return pericopes[chapter]?.find(([start, end]) => verseNumber >= start && verseNumber <= end)?.[2] ?? `Revelation ${chapter}`;
}

function markerCandidates(chapter: number, verseNumber: number) {
  return [
    `Revelation ${chapter}:${verseNumber}`,
    `Rev. ${chapter}:${verseNumber}`,
    `Rev ${chapter}:${verseNumber}`,
    `Revelation ${chapter}`,
    `Rev. ${chapter}`,
    unitFor(chapter, verseNumber)
  ];
}

function isWeakHit(hit: { snippet?: string }) {
  const snippet = String(hit?.snippet ?? "");
  if (snippet.length < 90) return true;
  if (/TABLE OF CONTENTS|^TENTS\b|Copyright|All Rights Reserved|Published by|Unless otherwise marked|ISBN|Acknowledg/i.test(snippet)) return true;
  const uppercaseWords = snippet.match(/\b[A-Z]{4,}\b/g) ?? [];
  return uppercaseWords.length > 12 && /REVELATION \d/.test(snippet);
}

function markerScore(item: { marker?: string; references?: string[] }, markers: string[]) {
  const marker = String(item.marker ?? "").toLowerCase();
  const references = (item.references ?? []).map((reference) => String(reference).toLowerCase());
  let score = 0;
  for (const candidate of markers) {
    const lower = candidate.toLowerCase();
    if (!lower) continue;
    if (marker === lower) score += lower.includes(":") ? 80 : 45;
    else if (marker.includes(lower) || lower.includes(marker)) score += lower.includes(":") ? 55 : 30;
    if (references.includes(lower)) score += lower.includes(":") ? 70 : 35;
  }
  return score;
}

function mcnultyHasRelevantMaterial(chapter: number, verseNumber: number) {
  const source = sourceIndex.sources?.[mcnultySourceId];
  if (!source?.hits) return false;
  const markers = markerCandidates(chapter, verseNumber);
  return source.hits.filter((hit: { snippet?: string }) => !isWeakHit(hit)).some((hit: { marker?: string; references?: string[] }) => markerScore(hit, markers) > 25);
}

function keyTermsForVerse(verseText: string) {
  const lower = verseText.toLowerCase();
  const terms = [
    ["nicolaitanes", "nicolaitan"],
    ["balaam", "balaam"],
    ["jezebel", "jezebel"],
    ["synagogue of satan", "synagogue of satan"],
    ["hidden manna", "hidden manna"],
    ["white stone", "white stone"],
    ["morning star", "morning star"],
    ["lukewarm", "lukewarm"],
    ["gold tried in the fire", "gold tried in the fire"],
    ["white raiment", "white raiment"],
    ["eyesalve", "eyesalve"],
    ["beast", "beast"],
    ["mark", "mark"],
    ["babylon", "babylon"],
    ["trumpet", "trumpet"],
    ["seal", "seal"],
    ["lamb", "lamb"],
    ["throne", "throne"],
    ["temple", "temple"],
    ["altar", "altar"],
    ["incense", "incense"],
    ["dragon", "dragon"],
    ["two witnesses", "two witnesses"],
    ["144,000", "144,000"],
    ["seven spirits", "seven spirits"],
    ["new jerusalem", "new jerusalem"],
    ["new heaven", "new heaven"],
    ["new earth", "new earth"],
    ["tree of life", "tree of life"],
    ["river of life", "river of life"],
    ["book of life", "book of life"],
    ["thousand years", "thousand years"],
    ["second death", "second death"],
    ["lake of fire", "lake of fire"],
    ["come out of her", "come out of her"],
    ["hour of his judgment", "hour of"],
    ["everlasting gospel", "everlasting gospel"],
    ["commandments of god", "commandments of god"],
    ["faith of jesus", "faith of jesus"]
  ];
  return terms.filter(([needle]) => lower.includes(needle)).map(([, required]) => required);
}

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function readJson(path: string) {
  return JSON.parse(readFileSync(join(contentRoot, path), "utf8"));
}

for (let chapter = 1; chapter <= 22; chapter += 1) {
  const file = `revelation/chapter-${String(chapter).padStart(2, "0")}.json`;
  if (!existsSync(join(contentRoot, file))) {
    errors.push(`Missing ${file}`);
    continue;
  }
  const parsed = ChapterContentSchema.safeParse(readJson(file));
  if (!parsed.success) {
    errors.push(`${file}: ${parsed.error.message}`);
    continue;
  }
  const content = parsed.data;
  if (content.chapterNumber !== chapter) errors.push(`${file}: wrong chapter number`);
  if (content.verses.length !== expectedVerseCounts[chapter - 1]) {
    errors.push(`${file}: expected ${expectedVerseCounts[chapter - 1]} verses, got ${content.verses.length}`);
  }
  for (const symbol of content.symbols) {
    if (!symbol.scriptureReferences.length) {
      errors.push(`${file}: symbol "${symbol.symbol}" is missing Scripture references`);
    }
  }
  for (const verse of content.verses) {
    if (!verse.reviewStatus) errors.push(`${verse.verse}: missing review status`);
    const isPlaceholder = verse.reviewStatus === "placeholder";
    if (!isPlaceholder && !verse.bibleText.trim()) errors.push(`${verse.verse}: missing KJV text`);
    if (!isPlaceholder && !verse.sources.length) errors.push(`${verse.verse}: missing sources`);
  }
}

const resources = readJson("resources/bibliography.json").resources;
resources.forEach((resource: unknown) => {
  const parsed = ResourceSchema.safeParse(resource);
  if (!parsed.success) errors.push(`Resource: ${parsed.error.message}`);
  if (parsed.success) {
    allSourceIds.add(parsed.data.id);
    if (parsed.data.tradition === "Adventist") adventistSourceIds.add(parsed.data.id);
  }
});

const articlesDir = join(contentRoot, "articles");
if (!existsSync(articlesDir)) {
  errors.push("Missing content/articles directory");
} else {
  const articleFiles = readdirSync(articlesDir).filter((file) => file.endsWith(".json")).sort();
  const articleSlugs = new Set<string>();
  if (articleFiles.length !== expectedArticleSlugs.length) {
    errors.push(`Expected ${expectedArticleSlugs.length} article files, found ${articleFiles.length}`);
  }
  for (const file of articleFiles) {
    const parsed = ArticleContentSchema.safeParse(readJson(`articles/${file}`));
    if (!parsed.success) {
      errors.push(`Article ${file}: ${parsed.error.message}`);
      continue;
    }
    const article = parsed.data;
    articleSlugs.add(article.slug);
    if (!expectedArticleSlugs.includes(article.slug)) {
      errors.push(`Article ${file}: unexpected slug "${article.slug}"`);
    }
    if (!file.includes(article.slug)) {
      errors.push(`Article ${file}: file name should include slug "${article.slug}"`);
    }
    if (article.sections.length < 3) {
      errors.push(`Article ${article.slug}: needs at least 3 body sections`);
    }
    if (!article.whyThisMatters.body.length) {
      errors.push(`Article ${article.slug}: missing Why This Matters body`);
    }
    if (!article.relatedLinks.length) {
      errors.push(`Article ${article.slug}: missing related links`);
    }
    const publicFields = [
      article.title,
      article.slug,
      article.category,
      article.summary,
      article.readingTime,
      ...article.tags,
      ...article.sections.flatMap((section) => [
        section.id,
        section.title,
        ...section.body,
        ...section.scriptureReferences
      ]),
      ...article.whyThisMatters.body,
      ...article.whyThisMatters.scriptureReferences,
      ...article.relatedLinks.flatMap((link) => [link.title, link.href, link.description])
    ];
    for (const phrase of articleBannedPublicPhrases) {
      if (publicFields.some((field) => field.includes(phrase))) {
        errors.push(`Article ${article.slug}: public content contains banned phrase "${phrase}"`);
      }
    }
    for (const section of article.sections) {
      if (!article.sourceAudit.sections[section.id]?.length) {
        errors.push(`Article ${article.slug}: missing source audit for section "${section.id}"`);
      }
      if (!section.scriptureReferences.length) {
        errors.push(`Article ${article.slug}: section "${section.id}" needs Scripture references`);
      }
    }
    if (!article.sourceAudit.overview.length) {
      errors.push(`Article ${article.slug}: missing overview source audit`);
    }
    if (!article.sourceAudit.whyThisMatters.length) {
      errors.push(`Article ${article.slug}: missing Why This Matters source audit`);
    }
    const auditSources = [
      ...article.sourceAudit.overview,
      ...Object.values(article.sourceAudit.sections).flat(),
      ...article.sourceAudit.whyThisMatters
    ];
    for (const source of auditSources) {
      if (!allSourceIds.has(source.sourceId)) {
        errors.push(`Article ${article.slug}: source audit references unknown source ${source.sourceId}`);
      }
    }
  }
  for (const slug of expectedArticleSlugs) {
    if (!articleSlugs.has(slug)) errors.push(`Missing article slug "${slug}"`);
  }
}

for (let chapter = 1; chapter <= 22; chapter += 1) {
  const content = ChapterContentSchema.parse(readJson(`revelation/chapter-${String(chapter).padStart(2, "0")}.json`));
  const chapterSentenceCounts = new Map<string, number>();
  for (const verse of content.verses) {
    const isPlaceholder = verse.reviewStatus === "placeholder";
    const isBlankCommentaryPlaceholder = isPlaceholder && !verse.commentary.detailedExplanation.trim();
    if (isBlankCommentaryPlaceholder) continue;
    const verseNumber = Number(verse.verse.split(":").at(-1));
    const layers = verse.commentary;
    if (!layers.detailedExplanation.trim()) errors.push(`${verse.verse}: missing detailedExplanation`);
    if (!layers.exegesis.trim()) errors.push(`${verse.verse}: missing exegesis`);
    if (!layers.historicalBackground.trim()) errors.push(`${verse.verse}: missing historicalBackground layer`);
    if (!layers.technicalNotes.trim()) errors.push(`${verse.verse}: missing technicalNotes layer`);
    if (!layers.adventistPropheticInsight.trim()) errors.push(`${verse.verse}: missing adventistPropheticInsight layer`);
    if (!layers.propheticTimeline.trim()) errors.push(`${verse.verse}: missing propheticTimeline layer`);
    if (!layers.otherCommentaryInsights.trim()) errors.push(`${verse.verse}: missing otherCommentaryInsights layer`);
    if (!layers.application.trim()) errors.push(`${verse.verse}: missing application layer`);
    const detailedWordCount = countWords(layers.detailedExplanation);
    if (detailedWordCount < minimumCommentaryWords) {
      errors.push(`${verse.verse}: detailedExplanation is too short for compact pastoral commentary (${detailedWordCount} words)`);
    }
    const maximumCommentaryWordsForVerse = longFormChapters.has(chapter) ? 1000 : maximumCommentaryWords;
    if (detailedWordCount > maximumCommentaryWordsForVerse) {
      errors.push(`${verse.verse}: detailedExplanation is too long for compact pastoral commentary (${detailedWordCount} words)`);
    }
    if ((chapter >= 2 && chapter <= 13) || chapter === 15 || chapter === 16 || chapter === 17 || chapter === 18 || chapter === 19 || chapter === 20 || chapter === 21 || chapter === 22) {
      const paragraphs = layers.detailedExplanation.split(/\n\n+/).map((paragraph) => paragraph.trim()).filter(Boolean);
      const paragraphWordCounts = paragraphs.map(countWords);
      const lastParagraphWords = paragraphWordCounts.at(-1) ?? 0;
      const maximumParagraphWords = longFormChapters.has(chapter) ? 240 : 125;
      const maximumFinalParagraphWords = longFormChapters.has(chapter) ? 230 : 115;
      const finalDominanceRatio = longFormChapters.has(chapter) ? 0.45 : 0.38;
      if (paragraphs.length !== 4) {
        errors.push(`${verse.verse}: expected 4 balanced commentary paragraphs, got ${paragraphs.length}`);
      }
      paragraphWordCounts.forEach((wordCount, index) => {
        if (wordCount < 45) {
          errors.push(`${verse.verse}: paragraph ${index + 1} is too thin for balanced commentary (${wordCount} words)`);
        }
        if (wordCount > maximumParagraphWords) {
          errors.push(`${verse.verse}: paragraph ${index + 1} is too long for balanced commentary (${wordCount} words)`);
        }
      });
      if (lastParagraphWords > maximumFinalParagraphWords) {
        errors.push(`${verse.verse}: final paragraph is too long (${lastParagraphWords} words)`);
      }
      if (lastParagraphWords > detailedWordCount * finalDominanceRatio) {
        errors.push(`${verse.verse}: final paragraph dominates the commentary (${lastParagraphWords}/${detailedWordCount} words)`);
      }
    }
    const publicFields = [
      verse.explanation,
      verse.historicalBackground,
      verse.symbolicMeaning,
      verse.adventistInsight,
      verse.propheticSignificance,
      verse.application,
      layers.detailedExplanation,
      layers.exegesis,
      layers.historicalBackground,
      layers.technicalNotes,
      layers.adventistPropheticInsight,
      layers.propheticTimeline,
      layers.otherCommentaryInsights,
      layers.application,
      ...verse.wordNotes.flatMap((note) => [note.term, note.explanation, ...note.scriptureReferences])
    ];
    for (const phrase of bannedPublicPhrases) {
      if (publicFields.some((field) => field.includes(phrase))) {
        errors.push(`${verse.verse}: public content contains banned phrase "${phrase}"`);
      }
    }
    const chapterBannedPublicPhrases = chapter === 3
      ? chapter3BannedPublicPhrases
      : chapter === 4
        ? chapter4BannedPublicPhrases
        : chapter === 5
          ? chapter5BannedPublicPhrases
          : chapter === 6
            ? chapter6BannedPublicPhrases
            : chapter === 7
              ? chapter7BannedPublicPhrases
              : chapter === 8
                  ? chapter8BannedPublicPhrases
                  : chapter === 9
                    ? chapter9BannedPublicPhrases
                    : chapter === 10
                      ? chapter10BannedPublicPhrases
                      : chapter === 11
                        ? chapter11BannedPublicPhrases
                        : chapter === 12
                          ? chapter12BannedPublicPhrases
                          : chapter === 13
                            ? chapter13BannedPublicPhrases
                            : chapter === 14
                              ? chapter14BannedPublicPhrases
                              : chapter === 15
                                ? chapter15BannedPublicPhrases
                                : chapter === 16
                                  ? chapter16BannedPublicPhrases
                                  : chapter === 17
                                    ? chapter17BannedPublicPhrases
                                    : chapter === 18
                                      ? chapter18BannedPublicPhrases
                                      : chapter === 19
                                        ? chapter19BannedPublicPhrases
                                        : chapter === 20
                                          ? chapter20BannedPublicPhrases
                                          : chapter === 21
                                            ? chapter21BannedPublicPhrases
                                            : chapter === 22
                                              ? chapter22BannedPublicPhrases
                                              : [];
    if (chapterBannedPublicPhrases.length) {
      for (const phrase of chapterBannedPublicPhrases) {
        if (publicFields.some((field) => field.includes(phrase))) {
          errors.push(`${verse.verse}: Chapter ${chapter} public content contains banned phrase "${phrase}"`);
        }
      }
      for (const sentence of layers.detailedExplanation.split(/(?<=[.!?])\s+/)) {
        const normalizedSentence = sentence.trim();
        if (normalizedSentence.length > 45) {
          chapterSentenceCounts.set(normalizedSentence, (chapterSentenceCounts.get(normalizedSentence) ?? 0) + 1);
        }
      }
    }
    const publicText = publicFields.join(" ").toLowerCase();
    if (!isPlaceholder && verse.crossReferences.length < 4) {
      errors.push(`${verse.verse}: populated verse needs at least 4 public cross references`);
    }
    for (const keyTerm of keyTermsForVerse(verse.bibleText)) {
      if (!publicText.includes(keyTerm)) {
        errors.push(`${verse.verse}: public commentary does not address key term "${keyTerm}"`);
      }
    }
    if (!verse.sourceAudit.propheticTimeline.length) errors.push(`${verse.verse}: missing hidden prophetic timeline source audit`);
    for (const layerSources of Object.values(verse.sourceAudit)) {
      for (const source of layerSources) {
        if (!allSourceIds.has(source.sourceId)) {
          errors.push(`${verse.verse}: source audit references unknown source ${source.sourceId}`);
        }
      }
    }
    for (const source of verse.sourceAudit.propheticTimeline) {
      if (!adventistSourceIds.has(source.sourceId)) {
        errors.push(`${verse.verse}: prophetic timeline audit uses non-Adventist source ${source.sourceId}`);
      }
    }
    if (mcnultyHasRelevantMaterial(chapter, verseNumber)) {
      const auditSources = Object.values(verse.sourceAudit).flat().map((source) => source.sourceId);
      if (!auditSources.includes(mcnultySourceId)) {
        errors.push(`${verse.verse}: missing McNulty source audit despite relevant indexed material`);
      }
    }
  }
  if (chapter === 3 || chapter === 4 || chapter === 5 || chapter === 6 || chapter === 7 || chapter === 8 || chapter === 9 || chapter === 10 || chapter === 11 || chapter === 12 || chapter === 13 || chapter === 14 || chapter === 15 || chapter === 16 || chapter === 17 || chapter === 18 || chapter === 19 || chapter === 20 || chapter === 21 || chapter === 22) {
    const teachingNotes = content.teachingNotes;
    const evangelisticNotes = content.evangelisticNotes;
    const chapterPublicFields = [
      content.title,
      content.summary,
      content.historicalContext,
      content.literaryContext,
      ...content.themes,
      ...content.outline.flatMap((item) => [item.range, item.title, item.summary]),
      teachingNotes.openingQuestion,
      teachingNotes.mainPoint,
      ...teachingNotes.keyVerses,
      ...teachingNotes.importantSymbols,
      ...teachingNotes.discussionQuestions,
      ...teachingNotes.commonMisunderstandings,
      teachingNotes.adventistEmphasis,
      teachingNotes.closingAppeal,
      evangelisticNotes.mainDoctrinalTheme,
      ...evangelisticNotes.keyBibleTexts,
      ...evangelisticNotes.flow,
      ...evangelisticNotes.simpleIllustrations,
      evangelisticNotes.appealQuestion,
      ...evangelisticNotes.cautions
    ];
    const chapterBannedPublicPhrases = chapter === 3
      ? chapter3BannedPublicPhrases
      : chapter === 4
        ? chapter4BannedPublicPhrases
      : chapter === 5
        ? chapter5BannedPublicPhrases
        : chapter === 6
          ? chapter6BannedPublicPhrases
          : chapter === 7
            ? chapter7BannedPublicPhrases
            : chapter === 8
              ? chapter8BannedPublicPhrases
              : chapter === 9
                ? chapter9BannedPublicPhrases
                : chapter === 10
                  ? chapter10BannedPublicPhrases
                  : chapter === 11
                    ? chapter11BannedPublicPhrases
                    : chapter === 12
                      ? chapter12BannedPublicPhrases
                      : chapter === 13
                        ? chapter13BannedPublicPhrases
                        : chapter === 14
                          ? chapter14BannedPublicPhrases
                          : chapter === 15
                            ? chapter15BannedPublicPhrases
                            : chapter === 16
                              ? chapter16BannedPublicPhrases
                              : chapter === 17
                                ? chapter17BannedPublicPhrases
                                : chapter === 18
                                  ? chapter18BannedPublicPhrases
                                  : chapter === 19
                                    ? chapter19BannedPublicPhrases
                                    : chapter === 20
                                      ? chapter20BannedPublicPhrases
                                      : chapter === 21
                                        ? chapter21BannedPublicPhrases
                                        : chapter22BannedPublicPhrases;
    for (const phrase of chapterBannedPublicPhrases) {
      if (chapterPublicFields.some((field) => field.includes(phrase))) {
        errors.push(`Revelation ${chapter}: chapter-level public content contains banned phrase "${phrase}"`);
      }
    }
    for (const [sentence, count] of chapterSentenceCounts) {
      if (count > 2) {
        errors.push(`Revelation ${chapter}: repeated public sentence appears ${count} times: "${sentence}"`);
      }
    }
  }
}

readJson("glossary/symbols.json").symbols.forEach((symbol: unknown) => {
  const parsed = SymbolEntrySchema.safeParse(symbol);
  if (!parsed.success) errors.push(`Symbol: ${parsed.error.message}`);
});

readJson("prophecy/prophecy-sections.json").forEach((section: unknown) => {
  const parsed = ProphecySectionSchema.safeParse(section);
  if (!parsed.success) errors.push(`Prophecy: ${parsed.error.message}`);
});

readJson("timelines/revelation-timeline.json").events.forEach((event: unknown) => {
  const parsed = TimelineEventSchema.safeParse(event);
  if (!parsed.success) errors.push(`Timeline: ${parsed.error.message}`);
});

readJson("schools/prophetic-schools.json").schools.forEach((school: unknown) => {
  const parsed = SchoolSchema.safeParse(school);
  if (!parsed.success) errors.push(`School: ${parsed.error.message}`);
});

readJson("connections/daniel-revelation.json").connections.forEach((connection: unknown) => {
  const parsed = DanielConnectionSchema.safeParse(connection);
  if (!parsed.success) errors.push(`Daniel connection: ${parsed.error.message}`);
});

const chapterFiles = readdirSync(join(contentRoot, "revelation")).filter((file) => file.endsWith(".json"));
if (chapterFiles.length !== 22) errors.push(`Expected 22 chapter files, found ${chapterFiles.length}`);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Content validation passed.");
