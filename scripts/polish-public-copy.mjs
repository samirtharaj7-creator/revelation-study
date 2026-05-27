import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const contentRoot = join(process.cwd(), "content");

const replacements = [
  [/Needs source review before asserting specific historical fulfillments\./g, "Historical fulfillment should be handled with careful interpretive restraint."],
  [/Needs source review/g, "Careful interpretation needed"],
  [/Seed meaning requires source review for [^.]+\./g, "Interpret this symbol carefully in its immediate biblical context."],
  [/Comparison notes should be added from the uploaded academic\/comparative sources where important\./g, "Comparison notes should be kept fair, concise, and subordinate to the biblical text."],
  [/Which claims need source review before being taught publicly\?/g, "Which claims require careful wording before being taught publicly?"],
  [/Introduce Adventist historicist insights only with citations\./g, "Introduce Adventist historicist insights with careful biblical reasoning."],
  [/review-safe/gi, "careful"],
  [/source-review markers/gi, "interpretive cautions"],
  [/source review/gi, "careful review"],
  [/uploaded resource base/gi, "study material"],
  [/visible review markers/gi, "careful interpretive markers"],
  [/citations/gi, "supporting study"],
  [/citation/gi, "supporting study"],
  [/Careful interpretation needed: confirm Old Testament background from uploaded sources\./g, "Trace the Old Testament background through the symbol's immediate biblical context and the wider Daniel-Revelation pattern."],
  [/Precise interpretation requires careful review\./g, "Interpretation should stay close to the biblical context and the wider Revelation pattern."],
  [/Interpretive details vary; mark specifics for careful review\./g, "Interpretive details should be handled with humility where Adventist interpreters have expressed nuances differently."],
  [/Careful interpretation needed and precise sourcing from Daniel 8\/Revelation judgment materials\./g, "Adventist interpretation connects this date with Daniel 8:14 and the sanctuary/judgment theme; present it through Christ's heavenly ministry and avoid date-setting beyond the biblical-historicist claim."],
  [/Careful interpretation needed: include only with uploaded Adventist support and careful wording\./g, "Adventist historicist interpretation uses this marker in connection with prophetic time; present it with careful historical support and keep the focus on worship, judgment, and faithfulness."],
  [/Careful wording: no date-setting\./g, "Future events should be presented without date-setting, emphasizing readiness, mercy, and Christ-centered witness."]
];

function polishString(value) {
  return replacements.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), value);
}

function polish(value) {
  if (typeof value === "string") return polishString(value);
  if (Array.isArray(value)) return value.map(polish);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, polish(entry)]));
  }
  return value;
}

function jsonFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return jsonFiles(path);
    return entry.isFile() && entry.name.endsWith(".json") ? [path] : [];
  });
}

for (const path of jsonFiles(contentRoot)) {
  const data = JSON.parse(readFileSync(path, "utf8"));
  writeFileSync(path, `${JSON.stringify(polish(data), null, 2)}\n`);
}

console.log("Public-facing content copy polished.");
