import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const publicContent = join(root, "content");
const errors: string[] = [];

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

for (const file of walk(publicContent).filter((path) => path.endsWith(".json") || path.endsWith(".md"))) {
  const text = readFileSync(file, "utf8");
  if (text.includes("Copyright ©") || text.includes("All rights reserved")) {
    errors.push(`${file}: contains copyright boilerplate that should not be public content.`);
  }
  const longQuoted = text.match(/“[^”]{350,}”/g);
  if (longQuoted) {
    errors.push(`${file}: contains long quoted text; summarize or shorten before publication.`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Quote/copyright guard passed.");
