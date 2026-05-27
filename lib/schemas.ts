import { z } from "zod";

export const SourceRefSchema = z.object({
  sourceId: z.string(),
  locator: z.string(),
  claimType: z.string(),
  priority: z.number()
});

export const VerseCommentarySchema = z.object({
  detailedExplanation: z.string(),
  exegesis: z.string(),
  historicalBackground: z.string(),
  technicalNotes: z.string(),
  adventistPropheticInsight: z.string(),
  propheticTimeline: z.string(),
  otherCommentaryInsights: z.string(),
  application: z.string(),
  reviewFlags: z.array(z.string())
});

export const VerseSourceAuditSchema = z.object({
  exegesis: z.array(SourceRefSchema),
  historicalBackground: z.array(SourceRefSchema),
  technicalNotes: z.array(SourceRefSchema),
  adventistPropheticInsight: z.array(SourceRefSchema),
  propheticTimeline: z.array(SourceRefSchema),
  otherCommentaryInsights: z.array(SourceRefSchema),
  application: z.array(SourceRefSchema)
});

export const WordNoteSchema = z.object({
  term: z.string(),
  explanation: z.string(),
  scriptureReferences: z.array(z.string()).default([])
});

export const VerseEntrySchema = z.object({
  verse: z.string(),
  bibleText: z.string(),
  explanation: z.string(),
  historicalBackground: z.string(),
  symbolicMeaning: z.string(),
  adventistInsight: z.string(),
  propheticSignificance: z.string(),
  danielConnection: z.string(),
  crossReferences: z.array(z.string()),
  application: z.string(),
  sources: z.array(SourceRefSchema),
  commentary: VerseCommentarySchema,
  wordNotes: z.array(WordNoteSchema).default([]),
  sourceAudit: VerseSourceAuditSchema,
  reviewStatus: z.enum(["verified-seed", "needs-source-review", "placeholder"])
});

export const ChapterContentSchema = z.object({
  chapterNumber: z.number(),
  title: z.string(),
  summary: z.string(),
  historicalContext: z.string(),
  literaryContext: z.string(),
  themes: z.array(z.string()),
  outline: z.array(z.object({ range: z.string(), title: z.string(), summary: z.string() })),
  verses: z.array(VerseEntrySchema),
  symbols: z.array(z.object({
    symbol: z.string(),
    references: z.array(z.string()),
    scriptureReferences: z.array(z.string()).default([]),
    meaning: z.string(),
    sources: z.array(SourceRefSchema)
  })),
  charts: z.array(z.object({ id: z.string(), title: z.string(), type: z.string() })),
  images: z.array(z.object({ id: z.string(), alt: z.string(), caption: z.string(), sourceCredit: z.string() })),
  crossReferences: z.array(z.string()),
  danielConnections: z.array(z.object({
    danielText: z.string(),
    revelationText: z.string(),
    sources: z.array(SourceRefSchema)
  })),
  teachingNotes: z.object({
    openingQuestion: z.string(),
    mainPoint: z.string(),
    keyVerses: z.array(z.string()),
    importantSymbols: z.array(z.string()),
    discussionQuestions: z.array(z.string()),
    commonMisunderstandings: z.array(z.string()),
    adventistEmphasis: z.string(),
    closingAppeal: z.string()
  }),
  evangelisticNotes: z.object({
    mainDoctrinalTheme: z.string(),
    keyBibleTexts: z.array(z.string()),
    flow: z.array(z.string()),
    simpleIllustrations: z.array(z.string()),
    appealQuestion: z.string(),
    cautions: z.array(z.string()),
    sources: z.array(SourceRefSchema)
  }),
  reflectionQuestions: z.array(z.string()),
  sources: z.array(SourceRefSchema)
});

export const IntroductionContentSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  summary: z.string(),
  facts: z.array(z.object({
    label: z.string(),
    value: z.string()
  })).default([]),
  highlights: z.array(z.string()),
  sections: z.array(z.object({
    id: z.string(),
    title: z.string(),
    body: z.array(z.string())
  })),
  relatedLinks: z.array(z.object({
    title: z.string(),
    href: z.string(),
    description: z.string()
  })).default([])
});

export const ResourceSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  type: z.string(),
  tradition: z.string(),
  interpretiveCategory: z.string(),
  howUsed: z.string(),
  citationFormat: z.string()
});

export const SymbolEntrySchema = z.object({
  symbol: z.string(),
  scriptureReferences: z.array(z.string()),
  meaning: z.string(),
  oldTestamentBackground: z.string(),
  danielConnection: z.string(),
  adventistInterpretation: z.string(),
  otherViews: z.string(),
  sources: z.array(SourceRefSchema)
});

export const ProphecySectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  reference: z.string(),
  symbols: z.array(z.string()),
  meaning: z.string(),
  historicalFulfillment: z.string(),
  adventistInterpretation: z.string(),
  alternativeViews: z.string(),
  bibleReferences: z.array(z.string()),
  danielConnections: z.array(z.string()),
  sources: z.array(SourceRefSchema)
});

export const TimelineEventSchema = z.object({
  id: z.string(),
  title: z.string(),
  period: z.string(),
  description: z.string(),
  scriptureReferences: z.array(z.string()),
  sources: z.array(SourceRefSchema)
});

export const SchoolSchema = z.object({
  id: z.string(),
  name: z.string(),
  definition: z.string(),
  interpretation: z.string(),
  strengths: z.array(z.string()),
  limitations: z.array(z.string()),
  differenceFromAdventist: z.string(),
  sections: z.record(z.string(), z.string())
});

export const DanielConnectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  scriptureReferences: z.array(z.string()),
  sharedSymbols: z.array(z.string()),
  sources: z.array(SourceRefSchema)
});

export const ArticleSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.array(z.string()),
  scriptureReferences: z.array(z.string()).default([])
});

export const ArticleContentSchema = z.object({
  title: z.string(),
  slug: z.string(),
  category: z.string(),
  summary: z.string(),
  readingTime: z.string(),
  tags: z.array(z.string()),
  sections: z.array(ArticleSectionSchema),
  whyThisMatters: z.object({
    body: z.array(z.string()),
    scriptureReferences: z.array(z.string()).default([])
  }),
  relatedLinks: z.array(z.object({
    title: z.string(),
    href: z.string(),
    description: z.string()
  })),
  sourceAudit: z.object({
    overview: z.array(SourceRefSchema),
    sections: z.record(z.string(), z.array(SourceRefSchema)),
    whyThisMatters: z.array(SourceRefSchema)
  })
});

export type SourceRef = z.infer<typeof SourceRefSchema>;
export type VerseCommentary = z.infer<typeof VerseCommentarySchema>;
export type VerseSourceAudit = z.infer<typeof VerseSourceAuditSchema>;
export type WordNote = z.infer<typeof WordNoteSchema>;
export type VerseEntry = z.infer<typeof VerseEntrySchema>;
export type ChapterContent = z.infer<typeof ChapterContentSchema>;
export type IntroductionContent = z.infer<typeof IntroductionContentSchema>;
export type Resource = z.infer<typeof ResourceSchema>;
export type SymbolEntry = z.infer<typeof SymbolEntrySchema>;
export type ProphecySection = z.infer<typeof ProphecySectionSchema>;
export type TimelineEvent = z.infer<typeof TimelineEventSchema>;
export type School = z.infer<typeof SchoolSchema>;
export type DanielConnection = z.infer<typeof DanielConnectionSchema>;
export type ArticleSection = z.infer<typeof ArticleSectionSchema>;
export type ArticleContent = z.infer<typeof ArticleContentSchema>;
