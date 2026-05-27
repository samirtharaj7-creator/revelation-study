import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const contentRoot = join(process.cwd(), "content");

function writeJson(path, data) {
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
}

function blankSourceAudit() {
  return {
    exegesis: [],
    historicalBackground: [],
    technicalNotes: [],
    adventistPropheticInsight: [],
    propheticTimeline: [],
    otherCommentaryInsights: [],
    application: []
  };
}

function blankCommentary() {
  return {
    detailedExplanation: "",
    exegesis: "",
    historicalBackground: "",
    technicalNotes: "",
    adventistPropheticInsight: "",
    propheticTimeline: "",
    otherCommentaryInsights: "",
    application: "",
    reviewFlags: []
  };
}

for (const file of readdirSync(join(contentRoot, "revelation")).filter((item) => item.endsWith(".json")).sort()) {
  const path = join(contentRoot, "revelation", file);
  const chapter = JSON.parse(readFileSync(path, "utf8"));
  const chapterNumber = chapter.chapterNumber;
  chapter.title = `Revelation ${chapterNumber}`;
  chapter.summary = "";
  chapter.historicalContext = "";
  chapter.literaryContext = "";
  chapter.themes = [];
  chapter.outline = [];
  chapter.symbols = [];
  chapter.charts = [];
  chapter.images = [];
  chapter.crossReferences = [];
  chapter.danielConnections = [];
  chapter.teachingNotes = {
    openingQuestion: "",
    mainPoint: "",
    keyVerses: [],
    importantSymbols: [],
    discussionQuestions: [],
    commonMisunderstandings: [],
    adventistEmphasis: "",
    closingAppeal: ""
  };
  chapter.evangelisticNotes = {
    mainDoctrinalTheme: "",
    keyBibleTexts: [],
    flow: [],
    simpleIllustrations: [],
    appealQuestion: "",
    cautions: [],
    sources: []
  };
  chapter.reflectionQuestions = [];
  chapter.sources = [];
  chapter.verses = chapter.verses.map((verse) => ({
    verse: verse.verse,
    bibleText: "",
    explanation: "",
    historicalBackground: "",
    symbolicMeaning: "",
    adventistInsight: "",
    propheticSignificance: "",
    danielConnection: "",
    crossReferences: [],
    application: "",
    sources: [],
    commentary: blankCommentary(),
    sourceAudit: blankSourceAudit(),
    reviewStatus: "placeholder"
  }));
  writeJson(path, chapter);
}

writeJson(join(contentRoot, "resources", "bibliography.json"), { resources: [] });
writeJson(join(contentRoot, "glossary", "symbols.json"), { symbols: [] });
writeJson(join(contentRoot, "timelines", "revelation-timeline.json"), { events: [] });
writeJson(join(contentRoot, "schools", "prophetic-schools.json"), { schools: [] });
writeJson(join(contentRoot, "connections", "daniel-revelation.json"), { connections: [] });
writeJson(join(contentRoot, "prophecy", "prophecy-sections.json"), []);

for (const file of readdirSync(join(contentRoot, "prophecy")).filter((item) => item.endsWith(".json") && item !== "prophecy-sections.json")) {
  const path = join(contentRoot, "prophecy", file);
  const current = JSON.parse(readFileSync(path, "utf8"));
  writeJson(path, {
    id: current.id ?? file.replace(/\.json$/, ""),
    title: current.title ?? "",
    reference: "",
    symbols: [],
    meaning: "",
    historicalFulfillment: "",
    adventistInterpretation: "",
    alternativeViews: "",
    bibleReferences: [],
    danielConnections: [],
    sources: []
  });
}

console.log("Public content cleared; design and Revelation verse skeleton preserved.");
