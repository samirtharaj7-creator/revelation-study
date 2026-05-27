"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { BookOpen, FileText, Library, List, Minus, Plus, Sparkles } from "lucide-react";
import { BookmarkButton } from "@/components/bookmark-button";
import { CopyButton } from "@/components/copy-button";
import { NotesPanel } from "@/components/notes-panel";
import type { ChapterContent, VerseEntry } from "@/lib/schemas";
import { slugify } from "@/lib/utils";

export function ChapterStudy({ chapter }: { chapter: ChapterContent }) {
  const firstVerse = chapter.verses[0]?.verse ?? "";
  const [selectedVerseRef, setSelectedVerseRef] = useState(firstVerse);
  const [readerScale, setReaderScale] = useState(1);

  useEffect(() => {
    function syncFromHash() {
      const hash = window.location.hash.replace("#", "");
      const match = chapter.verses.find((verse) => slugify(verse.verse) === hash);
      if (match) setSelectedVerseRef(match.verse);
    }

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [chapter.verses]);

  const selectedVerse = useMemo(
    () => chapter.verses.find((verse) => verse.verse === selectedVerseRef) ?? chapter.verses[0],
    [chapter.verses, selectedVerseRef]
  );

  const selectedSymbols = useMemo(
    () => chapter.symbols.filter((symbol) => symbol.references.some((reference) => referenceMatchesVerse(reference, selectedVerse?.verse ?? ""))),
    [chapter.symbols, selectedVerse?.verse]
  );

  function selectVerse(verse: VerseEntry) {
    setSelectedVerseRef(verse.verse);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${slugify(verse.verse)}`);
    }
  }

  if (!selectedVerse) return null;

  return (
    <section
      className="split-reader"
      aria-label={`Revelation ${chapter.chapterNumber} reader`}
      style={{ "--reader-text-scale": readerScale } as CSSProperties}
    >
      <div className="scripture-pane">
        <div className="reader-pane-toolbar no-print">
          <div>
            <div className="reader-pane-kicker">
              <BookOpen className="h-5 w-5" />
              King James Version
            </div>
            <p>Revelation {chapter.chapterNumber}: {chapter.title}</p>
          </div>
          <FontScaleControls
            onDecrease={() => setReaderScale((value) => Math.max(0.9, Number((value - 0.04).toFixed(2))))}
            onIncrease={() => setReaderScale((value) => Math.min(1.14, Number((value + 0.04).toFixed(2))))}
          />
        </div>
        <div className="scripture-pane-body">
          <div className="scripture-pane-header">
            <h1>Revelation Chapter {chapter.chapterNumber}</h1>
            {chapter.summary ? <p className="scripture-chapter-summary">{chapter.summary}</p> : null}
            {chapter.themes.length > 0 ? (
              <div className="scripture-theme-list" aria-label="Chapter themes">
                {chapter.themes.slice(0, 5).map((theme) => (
                  <span key={theme}>{theme}</span>
                ))}
              </div>
            ) : null}
          </div>
          <div className="scripture-list">
            {chapter.verses.map((verse, index) => (
              <VerseButton
                key={verse.verse}
                index={index + 1}
                verse={verse}
                active={verse.verse === selectedVerse.verse}
                onSelect={() => selectVerse(verse)}
              />
            ))}
          </div>
        </div>
      </div>

      <aside className="commentary-pane">
        <div className="reader-pane-toolbar reader-pane-toolbar-notes no-print">
          <div className="reader-pane-kicker">
            <List className="h-5 w-5" />
            Study Notes
          </div>
          <FontScaleControls
            onDecrease={() => setReaderScale((value) => Math.max(0.9, Number((value - 0.04).toFixed(2))))}
            onIncrease={() => setReaderScale((value) => Math.min(1.14, Number((value + 0.04).toFixed(2))))}
          />
        </div>
        <div className="commentary-pane-body">
          <div className="commentary-shell">
          <article className="exposition-card">
            <div className="exposition-card-heading">
              <h2>{selectedVerse.verse}</h2>
            </div>
            {selectedVerse.commentary.detailedExplanation ? (
              <DetailedExplanation value={selectedVerse.commentary.detailedExplanation} />
            ) : (
              <EmptyCommentary />
            )}
            <VerseStudyCard
              crossReferences={selectedVerse.crossReferences}
              symbols={selectedSymbols}
              wordNotes={selectedVerse.wordNotes}
            />
            <div className="commentary-actions no-print">
              <BookmarkButton id={selectedVerse.verse} label={`Bookmark ${selectedVerse.verse}`} />
              <NotesPanel id={selectedVerse.verse} title={selectedVerse.verse} />
              <CopyButton
                text={[selectedVerse.verse, selectedVerse.bibleText, selectedVerse.commentary.detailedExplanation].filter(Boolean).join("\n\n")}
                label="Copy"
              />
            </div>
          </article>
          </div>
        </div>
      </aside>
    </section>
  );
}

function FontScaleControls({ onDecrease, onIncrease }: { onDecrease: () => void; onIncrease: () => void }) {
  return (
    <div className="reader-pane-controls" aria-label="Reader text size controls">
      <button type="button" onClick={onDecrease} aria-label="Decrease reader text size">
        <Minus className="h-5 w-5" />
      </button>
      <button type="button" onClick={onIncrease} aria-label="Increase reader text size">
        <Plus className="h-5 w-5" />
      </button>
    </div>
  );
}

function VerseButton({ index, verse, active, onSelect }: { index: number; verse: VerseEntry; active: boolean; onSelect: () => void }) {
  return (
    <button
      id={slugify(verse.verse)}
      className={active ? "scripture-card scripture-card-active" : "scripture-card"}
      onClick={onSelect}
      type="button"
    >
      <span className="verse-number">{index}</span>
      <span className="verse-copy">
        {verse.bibleText || "Verse text pending. Upload your manuscript text here."}
      </span>
    </button>
  );
}

function EmptyCommentary() {
  return (
    <section className="commentary-empty">
      <FileText className="h-9 w-9 text-primary" />
      <h2>Commentary space ready</h2>
      <p>Select any verse on the left. When your uploaded commentary is added, the exposition for that verse will appear here.</p>
    </section>
  );
}

function DetailedExplanation({ value }: { value: string }) {
  return (
    <div className="commentary-reading">
      {value.split("\n\n").map((paragraph, index) => (
        <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>
      ))}
    </div>
  );
}

function VerseStudyCard({
  crossReferences,
  symbols,
  wordNotes
}: {
  crossReferences: string[];
  symbols: ChapterContent["symbols"];
  wordNotes: VerseEntry["wordNotes"];
}) {
  const hasReferences = crossReferences.length > 0;
  const hasSymbols = symbols.length > 0;
  const hasWordNotes = wordNotes.length > 0;

  return (
    <section className="verse-study-card" aria-label="Cross references, symbols, and word notes">
      <div className="verse-study-card-header">
        <Library className="h-4 w-4" />
        Study Links
      </div>
      {hasReferences || hasSymbols || hasWordNotes ? (
        <div className="verse-study-grid">
          <div className="study-card-section">
            <h3>Cross References</h3>
            {hasReferences ? (
              <div className="reference-chip-list">
                {crossReferences.map((reference) => (
                  <span className="reference-chip" key={reference}>
                    {reference}
                  </span>
                ))}
              </div>
            ) : (
              <p className="study-card-empty">No cross references added yet.</p>
            )}
          </div>
          <div className="study-card-section">
            <h3>Symbols</h3>
            {hasSymbols ? (
              <div className="symbol-note-list">
                {symbols.map((symbol) => (
                  <article className="symbol-note" key={`${symbol.symbol}-${symbol.references.join("-")}`}>
                    <div className="symbol-note-title">
                      <Sparkles className="h-3.5 w-3.5" />
                      {symbol.symbol}
                    </div>
                    <p>{symbol.meaning}</p>
                    {symbol.scriptureReferences.length > 0 ? (
                      <div className="symbol-reference-list" aria-label={`${symbol.symbol} Scripture references`}>
                        {symbol.scriptureReferences.map((reference) => (
                          <span className="symbol-reference-chip" key={`${symbol.symbol}-${reference}`}>
                            {reference}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            ) : (
              <p className="study-card-empty">No verse-specific symbols added yet.</p>
            )}
          </div>
          {hasWordNotes ? (
            <div className="study-card-section study-card-section-wide">
              <h3>Word / Phrase Notes</h3>
              <div className="word-note-list">
                {wordNotes.map((note) => (
                  <article className="word-note" key={`${note.term}-${note.scriptureReferences.join("-")}`}>
                    <div className="word-note-title">{note.term}</div>
                    <p>{note.explanation}</p>
                    {note.scriptureReferences.length > 0 ? (
                      <div className="word-reference-list" aria-label={`${note.term} Scripture references`}>
                        {note.scriptureReferences.map((reference) => (
                          <span className="word-reference-chip" key={`${note.term}-${reference}`}>
                            {reference}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <p className="study-card-empty">Cross references and symbol notes are ready to be added for this verse.</p>
      )}
    </section>
  );
}

function referenceMatchesVerse(reference: string, verseRef: string) {
  if (!reference || !verseRef) return false;
  if (reference === verseRef) return true;

  const selected = parseReference(verseRef);
  const candidate = parseReference(reference);
  if (!selected || !candidate || selected.chapter !== candidate.chapter) return false;

  return selected.verse >= candidate.startVerse && selected.verse <= candidate.endVerse;
}

function parseReference(reference: string) {
  const match = reference.match(/(?:Revelation\s*)?(\d+):(\d+)(?:-(\d+))?/i);
  if (!match) return null;
  const chapter = Number(match[1]);
  const verse = Number(match[2]);
  const endVerse = Number(match[3] ?? match[2]);
  if (!Number.isFinite(chapter) || !Number.isFinite(verse) || !Number.isFinite(endVerse)) return null;
  return { chapter, verse, startVerse: verse, endVerse };
}
