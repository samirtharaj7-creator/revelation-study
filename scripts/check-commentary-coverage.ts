import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { ChapterContentSchema } from "../lib/schemas";

const root = process.cwd();
const contentRoot = join(root, "content", "revelation");
const errors: string[] = [];

const keyTerms: Array<[RegExp, string]> = [
  [/nicolaitanes/i, "nicolaitan"],
  [/balaam/i, "balaam"],
  [/jezebel/i, "jezebel"],
  [/synagogue of satan/i, "synagogue of satan"],
  [/hidden manna/i, "hidden manna"],
  [/white stone/i, "white stone"],
  [/lukewarm/i, "lukewarm"],
  [/beast/i, "beast"],
  [/\bmark\b/i, "mark"],
  [/babylon/i, "babylon"],
  [/trumpet/i, "trumpet"],
  [/seal/i, "seal"],
  [/lamb/i, "lamb"],
  [/throne/i, "throne"],
  [/temple/i, "temple"],
  [/dragon/i, "dragon"],
  [/two witnesses/i, "two witnesses"],
  [/new jerusalem/i, "new jerusalem"],
  [/new earth/i, "new earth"],
  [/tree of life/i, "tree of life"],
  [/river of life/i, "river of life"],
  [/thousand years/i, "thousand years"],
  [/lake of fire/i, "lake of fire"]
];

for (const file of readdirSync(contentRoot).filter((item) => item.endsWith(".json")).sort()) {
  const chapter = ChapterContentSchema.parse(JSON.parse(readFileSync(join(contentRoot, file), "utf8")));
  for (const verse of chapter.verses) {
    if (verse.reviewStatus === "placeholder" && !verse.commentary.detailedExplanation.trim()) continue;
    const publicText = [
      verse.explanation,
      verse.symbolicMeaning,
      verse.adventistInsight,
      verse.propheticSignificance,
      verse.application,
      verse.commentary.detailedExplanation
    ].join(" ").toLowerCase();
    for (const [pattern, expected] of keyTerms) {
      if (pattern.test(verse.bibleText) && !publicText.includes(expected)) {
        errors.push(`${verse.verse}: expected commentary to address "${expected}"`);
      }
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Commentary key-term coverage passed.");
