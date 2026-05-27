from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path
from typing import Iterable

from pypdf import PdfReader

ROOT = Path.cwd()
PDF_ROOTS = [
    Path("/Users/samuel/Desktop/Revelation"),
    Path("/Users/samuel/Jottacloud/Sermons & Teachings/Daniel Series/Presentations"),
]
CACHE = ROOT / ".pdf-extraction-cache"

EXPECTED_REVELATION_VERSES = {
    1: 20,
    2: 29,
    3: 22,
    4: 11,
    5: 14,
    6: 17,
    7: 17,
    8: 13,
    9: 21,
    10: 11,
    11: 19,
    12: 17,
    13: 18,
    14: 20,
    15: 8,
    16: 21,
    17: 18,
    18: 24,
    19: 21,
    20: 15,
    21: 27,
    22: 21,
}

KNOWN_IDS = {
    "Amazing Facts - AFCOE - Prophecy - Revelation Commentary Notes Final.pdf": "amazing-facts-afcoe-notes",
    "Revelation Verse By Verse (Amazing Facts Inc) (Z-Library).pdf": "amazing-facts-revelation-verse-by-verse",
    "Earths Final Warning The Three Angels Of Revelation (Amazing Facts Inc.) (Z-Library).pdf": "amazing-facts-earths-final-warning",
    "God Cares (vol. 2) - The Message of Revelation For You and Your Family (C. Mervyn Maxwell) (Z-Library).pdf": "maxwell-god-cares-vol-2",
    "Revelation of Jesus Christ Commentary on the Book of Revelation by Ranko Stefanovic (z-lib.org).pdf": "stefanovic-revelation-of-jesus-christ",
    "Secrets of Revelation The Apocalypse Through Hebrew Eyes (Jacques B. Doukhan) (z-lib.org).pdf": "doukhan-secrets-of-revelation",
    "Interpreting the Book of Revelation Hermeneutical guidelines, with brief introduction to literary analysis (Kenneth Albert Strand) (z-lib.org).pdf": "strand-interpreting-revelation",
    "Let-Daniel-and-Revelation-Speak.pdf": "wilson-let-daniel-and-revelation-speak",
    "The Great Prophecies of Daniel & Revelation.pdf": "bohr-great-prophecies",
    "Revelation Pure And Simple (Kenneth Cox) (Z-Library).pdf": "cox-revelation-pure-and-simple",
    "0462, Messages from Revelation 1 of 16.pdf": "frazee-messages-from-revelation",
    "The Book of Revelation (The New International Greek Testament Commentary Series  NIGTC) (G. K. Beale) (z-lib.org).pdf": "beale-book-of-revelation",
    "Revelation (Grant R. Osborne) (z-lib.org).pdf": "osborne-revelation",
    "Eerdmans Commentary on the Bible Revelation (Loren T. Stuckenbruck) (Z-Library).pdf": "stuckenbruck-eerdmans-revelation",
    "Discovering Revelation Content, Interpretation, Reception (Discovering Biblical Texts (DBT)) (deSilva, David A.) (Z-Library).pdf": "desilva-discovering-revelation",
    "The Theology of the Book of Revelation (New Testament Theology) (Richard Bauckham) (z-lib.org).pdf": "bauckham-theology-revelation",
    "Four Views on the Book of Revelation (C. Marvin Pate) (Z-Library).pdf": "pate-four-views",
    "Exalting Jesus in Revelation (Christ-Centered Exposition Commentary) (Dr. Daniel L. Akin) (z-library.sk, 1lib.sk, z-lib.sk).pdf": "akin-exalting-jesus-revelation",
    "Revelation The Triumph of God (R. Paul Stevens) (Z-Library).pdf": "stevens-triumph-of-god",
    "Revelation for the Rest of Us A Prophetic Call to Follow Jesus As a Dissident Disciple (Scot McKnight  Cody Matchett) (Z-Library).pdf": "mcknight-revelation-rest-of-us",
    "Poythress_Revelation-study-guide_color.pdf": "poythress-revelation-study-guide",
    "All Things New Revelation as Canonical Capstone (New Studies in Biblical Theology 48) (Brian J. Tabb) (Z-Library).pdf": "tabb-all-things-new",
}

ADVENTIST_PATTERNS = [
    "adventist",
    "amazing facts",
    "afcoe",
    "maxwell",
    "mervyn",
    "stefanovic",
    "doukhan",
    "strand",
    "kenneth cox",
    "norman mcnulty",
    "mark finley",
    "steven mosley",
    "frazee",
    "bohr",
    "wilson",
    "let-daniel",
    "great prophecies",
    "revelation pure",
    "practical living",
    "prophecies of revelation for teens",
    "gems from revelation",
    "messages from revelation",
    "revelations three",
    "daniel and revelation - secrets",
    "unfolding the revelation",
    "studies in revelation",
    "seven heads and ten horns",
    "edwin de kock",
    "grabiner",
]

ACADEMIC_PATTERNS = [
    "beale",
    "osborne",
    "bauckham",
    "desilva",
    "de silva",
    "stuckenbruck",
    "tabb",
    "pate",
    "michaels",
    "boring",
    "marshall",
    "travis",
    "heiser",
    "blackwell",
    "goodrich",
    "maston",
    "nigtc",
    "eerdmans",
]

PASTORAL_PATTERNS = [
    "akin",
    "exalting jesus",
    "stevens",
    "triumph of god",
    "mcknight",
    "rest of us",
    "stott",
    "teen",
    "practical",
    "devotional",
]

THEME_PATTERNS = {
    "jesus": r"\b(jesus|christ|lamb|son of man|faithful witness|alpha|omega)\b",
    "sanctuary": r"\b(sanctuary|temple|altar|incense|ark|priest|intercession|heavenly ministry)\b",
    "worship": r"\b(worship|worthy|holy|creator|sabbath|idolatry|allegiance)\b",
    "judgment": r"\b(judgment|judge|wrath|plague|books?|book of life|investigative)\b",
    "great-controversy": r"\b(great controversy|dragon|satan|devil|war in heaven|conflict)\b",
    "daniel": r"\b(daniel|little horn|time, times|seventy weeks|2300|8:14)\b",
    "beast-powers": r"\b(beast|image to the beast|mark of the beast|666|sea beast|earth beast)\b",
    "babylon": r"\b(babylon|harlot|fornication|come out of her|wine)\b",
    "three-angels": r"\b(three angels|everlasting gospel|hour of his judgment|fear god|give glory)\b",
    "sealing": r"\b(seal|sealed|144,?000|forehead|remnant)\b",
    "trumpets": r"\b(trumpet|woe|euphrates|locust)\b",
    "seals": r"\b(seal|horse|horsemen|souls under the altar)\b",
    "millennium": r"\b(millennium|thousand years|second death|lake of fire|bottomless pit)\b",
    "new-earth": r"\b(new earth|new heaven|new jerusalem|tree of life|river of life|no more death)\b",
    "application": r"\b(faithful|faithfulness|endure|overcome|repent|hope|mission|witness|discipleship)\b",
    "history": r"\b(rome|roman|empire|patmos|asia minor|persecution|laodicea|ephesus|smyrna)\b",
}

EXTRA_MARKERS = [
    "Daniel 2",
    "Daniel 7",
    "Daniel 8",
    "Daniel 8:14",
    "Daniel 9",
    "Daniel 10",
    "Daniel 11",
    "Daniel 12",
    "1260",
    "538",
    "1798",
    "1844",
    "year-day",
    "little horn",
    "sanctuary",
    "judgment",
    "mark of the beast",
    "three angels",
    "Babylon",
    "Sabbath",
    "remnant",
    "millennium",
]


def compact(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def slugify(value: str) -> str:
    value = re.sub(r"\([^)]*\)", "", value)
    value = re.sub(r"[^a-zA-Z0-9]+", "-", value.lower()).strip("-")
    value = re.sub(r"-{2,}", "-", value)
    return value[:80].strip("-") or "source"


def stable_id(path: Path, seen: set[str]) -> str:
    source_id = KNOWN_IDS.get(path.name) or slugify(path.stem)
    if source_id not in seen:
        seen.add(source_id)
        return source_id
    suffix = hashlib.sha1(str(path).encode("utf-8")).hexdigest()[:8]
    unique_id = f"{source_id}-{suffix}"
    seen.add(unique_id)
    return unique_id


def title_from_filename(path: Path) -> str:
    title = re.sub(r"\s*\([^)]*(z-lib|z-library|1lib|Z-Library|z-lib\.org|z-library\.sk)[^)]*\)", "", path.stem, flags=re.I)
    title = re.sub(r"\.epub$", "", title, flags=re.I)
    return compact(title.replace("_", " "))


def infer_author(title: str) -> str:
    patterns = [
        r"\(([^()]+)\)$",
        r"\bby\s+([^()]+)$",
        r"\b\((Dr\.\s+[^()]+)\)",
    ]
    for pattern in patterns:
        match = re.search(pattern, title, re.I)
        if match:
            candidate = compact(match.group(1))
            if not re.search(r"z-lib|pdf|epub|volume|Z-Library", candidate, re.I):
                return candidate
    known = {
        "Amazing Facts": "Amazing Facts",
        "God Cares": "C. Mervyn Maxwell",
        "Stefanovic": "Ranko Stefanovic",
        "Doukhan": "Jacques B. Doukhan",
        "Strand": "Kenneth A. Strand",
        "Cox": "Kenneth Cox",
        "McNulty": "Norman McNulty",
        "Finley": "Mark Finley / Steven Mosley",
        "Bohr": "Stephen Bohr",
        "Beale": "G. K. Beale",
        "Osborne": "Grant R. Osborne",
        "Bauckham": "Richard Bauckham",
        "deSilva": "David A. deSilva",
        "deSilva": "David A. deSilva",
        "Tabb": "Brian J. Tabb",
        "Poythress": "Vern S. Poythress",
        "Akin": "Daniel L. Akin",
        "Stevens": "R. Paul Stevens",
        "McKnight": "Scot McKnight / Cody Matchett",
    }
    lower = title.lower()
    for key, author in known.items():
        if key.lower() in lower:
            return author
    return "Unknown"


def classify(path: Path) -> tuple[str, str, str]:
    lower = path.name.lower()
    if any(pattern in lower for pattern in ADVENTIST_PATTERNS) or re.match(r"0\d{3},", path.name):
        tradition = "Adventist"
        category = "Adventist historicist"
    elif any(pattern in lower for pattern in ACADEMIC_PATTERNS):
        tradition = "Non-Adventist"
        category = "Academic / historical"
    elif any(pattern in lower for pattern in PASTORAL_PATTERNS):
        tradition = "Non-Adventist"
        category = "Pastoral / theological"
    else:
        tradition = "Non-Adventist"
        category = "General study / comparison"

    if "four views" in lower:
        category = "Comparative"
    if "preterist" in lower:
        category = "Preterist / comparative"
    if "futur" in lower:
        category = "Futurist / comparative"
    if "ideal" in lower or "poythress" in lower:
        category = "Idealist / theological"
    if "daniel" in lower:
        category = f"{category} / Daniel-Revelation"

    if re.match(r"0\d{3},", path.name) or "sermon" in lower or "messages from revelation" in lower:
        source_type = "Sermon / teaching notes"
    elif "commentary" in lower or "revelation (" in lower:
        source_type = "Commentary"
    elif "study guide" in lower or "notes" in lower:
        source_type = "Study guide"
    elif "prophec" in lower or "daniel" in lower:
        source_type = "Prophecy study"
    else:
        source_type = "Book / article"
    return tradition, category, source_type


def build_markers() -> list[str]:
    markers: list[str] = []
    for chapter, count in EXPECTED_REVELATION_VERSES.items():
        markers.extend(
            [
                f"Revelation {chapter}",
                f"Rev. {chapter}",
                f"Rev {chapter}",
            ]
        )
        for verse in range(1, count + 1):
            markers.extend(
                [
                    f"Revelation {chapter}:{verse}",
                    f"Rev. {chapter}:{verse}",
                    f"Rev {chapter}:{verse}",
                ]
            )
    markers.extend(EXTRA_MARKERS)
    seen: set[str] = set()
    return [marker for marker in markers if not (marker.lower() in seen or seen.add(marker.lower()))]


MARKERS = build_markers()


def detect_references(text: str) -> list[str]:
    refs: set[str] = set()
    for match in re.finditer(r"\b(?:Revelation|Rev\.?)\s+(\d{1,2})(?::(\d{1,2})(?:[-–](\d{1,2}))?)?", text, re.I):
        chapter = int(match.group(1))
        if chapter in EXPECTED_REVELATION_VERSES:
            if match.group(2):
                refs.add(f"Revelation {chapter}:{int(match.group(2))}")
            else:
                refs.add(f"Revelation {chapter}")
    for match in re.finditer(r"\bDaniel\s+(\d{1,2})(?::(\d{1,2}))?", text, re.I):
        refs.add(f"Daniel {int(match.group(1))}{':' + match.group(2) if match.group(2) else ''}")
    return sorted(refs)


def detect_themes(text: str) -> list[str]:
    lower = text.lower()
    return [theme for theme, pattern in THEME_PATTERNS.items() if re.search(pattern, lower, re.I)]


def snippets_for(text: str, markers: Iterable[str]) -> list[dict[str, str]]:
    lower = text.lower()
    results = []
    for marker in markers:
        idx = lower.find(marker.lower())
        if idx < 0:
            continue
        snippet = text[max(0, idx - 150) : idx + 260]
        results.append({"marker": marker, "snippet": snippet})
        if len(results) >= 24:
            break
    return results


def discover_pdfs() -> list[Path]:
    paths: list[Path] = []
    for root in PDF_ROOTS:
        if root.exists():
            paths.extend(sorted(root.glob("*.pdf")))
            paths.extend(sorted(root.glob("*.PDF")))
    unique: dict[str, Path] = {}
    for path in paths:
        unique[str(path)] = path
    return sorted(unique.values(), key=lambda item: item.name.lower())


def main() -> None:
    CACHE.mkdir(parents=True, exist_ok=True)
    sources: dict[str, dict] = {}
    manifest: dict[str, list[dict]] = {"sources": []}
    page_rows: list[dict] = []
    section_rows: list[dict] = []
    seen_ids: set[str] = set()

    for path in discover_pdfs():
        source_id = stable_id(path, seen_ids)
        title = title_from_filename(path)
        author = infer_author(title)
        tradition, category, source_type = classify(path)
        record = {
            "id": source_id,
            "title": title,
            "author": author,
            "file": str(path),
            "pages": 0,
            "tradition": tradition,
            "interpretiveCategory": category,
            "type": source_type,
            "hits": [],
            "themes": [],
            "references": [],
        }
        theme_counts: dict[str, int] = {}
        references: set[str] = set()
        try:
            reader = PdfReader(str(path))
            record["pages"] = len(reader.pages)
            for page_index, page in enumerate(reader.pages):
                try:
                    text = compact(page.extract_text() or "")
                except Exception:
                    continue
                if not text:
                    continue
                themes = detect_themes(text)
                refs = detect_references(text)
                for theme in themes:
                    theme_counts[theme] = theme_counts.get(theme, 0) + 1
                references.update(refs)
                row = {
                    "sourceId": source_id,
                    "page": page_index + 1,
                    "text": text,
                    "references": refs,
                    "themes": themes,
                }
                page_rows.append(row)

                marker_hits = snippets_for(text, MARKERS)
                for hit in marker_hits:
                    record["hits"].append(
                        {
                            "page": page_index + 1,
                            "marker": hit["marker"],
                            "snippet": hit["snippet"],
                            "references": refs[:12],
                            "themes": themes,
                        }
                    )
                if marker_hits or refs or themes:
                    section_rows.append(
                        {
                            "sourceId": source_id,
                            "page": page_index + 1,
                            "references": refs,
                            "themes": themes,
                            "markers": [hit["marker"] for hit in marker_hits],
                            "text": text[:1800],
                        }
                    )
        except Exception as exc:
            record["error"] = str(exc)

        record["themes"] = [theme for theme, _ in sorted(theme_counts.items(), key=lambda item: (-item[1], item[0]))[:20]]
        record["references"] = sorted(references)[:300]
        record["hits"] = record["hits"][:240]
        sources[source_id] = record
        manifest["sources"].append(
            {
                "id": source_id,
                "title": title,
                "author": author,
                "file": str(path),
                "pages": record["pages"],
                "tradition": tradition,
                "interpretiveCategory": category,
                "type": source_type,
            }
        )

    output = {
        "note": "Local-only source index. Do not publish raw PDF text.",
        "sourceCount": len(sources),
        "sources": sources,
    }
    (CACHE / "source-index.json").write_text(json.dumps(output, indent=2), encoding="utf-8")
    (CACHE / "source-manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    with (CACHE / "source-pages.jsonl").open("w", encoding="utf-8") as page_file:
        for row in page_rows:
            page_file.write(json.dumps(row, ensure_ascii=False) + "\n")
    with (CACHE / "source-sections.jsonl").open("w", encoding="utf-8") as section_file:
        for row in section_rows:
            section_file.write(json.dumps(row, ensure_ascii=False) + "\n")

    print(f"Indexed {len(sources)} PDFs.")
    print(f"Wrote {CACHE / 'source-index.json'}")
    print(f"Wrote {CACHE / 'source-pages.jsonl'}")
    print(f"Wrote {CACHE / 'source-sections.jsonl'}")


if __name__ == "__main__":
    main()
