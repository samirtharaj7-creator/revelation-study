"use client";

import { useState, type KeyboardEvent } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Crown, Flame, Heart, Megaphone, Scale, ScrollText, Shield, ShieldAlert, Sparkles } from "lucide-react";

type TimelineTone = "gold" | "violet" | "teal" | "rose" | "slate";

export type TimelineCommentaryEntry = {
  verse: string;
  text: string;
};

export type TimelineCommentaryByVerse = Record<string, TimelineCommentaryEntry>;

type TimelineRow = {
  title: string;
  scripture: string;
  phase: string;
  excerpt: string;
  explanation: string;
  references: string[];
  commentaryVerses: string[];
  href: string;
  icon: LucideIcon;
  tone: TimelineTone;
  dateLabel?: string;
  dateNote?: string;
  chronologyNote?: string;
  danielLinks?: string[];
};

const toneStyles: Record<
  TimelineTone,
  {
    border: string;
    accent: string;
    marker: string;
    spine: string;
    chip: string;
    date: string;
    selected: string;
    selectedCard: string;
  }
> = {
  gold: {
    border: "border-amber-300 dark:border-amber-700/70",
    accent: "text-amber-800 dark:text-amber-200",
    marker: "border-amber-200 bg-amber-500 text-white dark:border-amber-300/40",
    spine: "bg-amber-500",
    chip: "border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-700/60 dark:bg-amber-950/35 dark:text-amber-100",
    date: "border-amber-200 bg-amber-100/80 text-amber-950 dark:border-amber-700/60 dark:bg-amber-950/50 dark:text-amber-100",
    selected: "ring-2 ring-amber-300 shadow-[0_18px_45px_rgba(180,83,9,0.18)] dark:ring-amber-500/60 dark:shadow-[0_18px_45px_rgba(0,0,0,0.35)]",
    selectedCard: "bg-amber-50/70 shadow-md dark:bg-amber-950/25"
  },
  violet: {
    border: "border-violet-300 dark:border-violet-700/70",
    accent: "text-violet-700 dark:text-violet-200",
    marker: "border-violet-200 bg-violet-700 text-white dark:border-violet-300/40",
    spine: "bg-violet-700",
    chip: "border-violet-200 bg-violet-50 text-violet-950 dark:border-violet-700/60 dark:bg-violet-950/35 dark:text-violet-100",
    date: "border-violet-200 bg-violet-100/80 text-violet-950 dark:border-violet-700/60 dark:bg-violet-950/50 dark:text-violet-100",
    selected: "ring-2 ring-violet-300 shadow-[0_18px_45px_rgba(109,40,217,0.18)] dark:ring-violet-500/60 dark:shadow-[0_18px_45px_rgba(0,0,0,0.35)]",
    selectedCard: "bg-violet-50/70 shadow-md dark:bg-violet-950/25"
  },
  teal: {
    border: "border-teal-300 dark:border-teal-700/70",
    accent: "text-teal-800 dark:text-teal-200",
    marker: "border-teal-200 bg-teal-700 text-white dark:border-teal-300/40",
    spine: "bg-teal-700",
    chip: "border-teal-200 bg-teal-50 text-teal-950 dark:border-teal-700/60 dark:bg-teal-950/35 dark:text-teal-100",
    date: "border-teal-200 bg-teal-100/80 text-teal-950 dark:border-teal-700/60 dark:bg-teal-950/50 dark:text-teal-100",
    selected: "ring-2 ring-teal-300 shadow-[0_18px_45px_rgba(15,118,110,0.18)] dark:ring-teal-500/60 dark:shadow-[0_18px_45px_rgba(0,0,0,0.35)]",
    selectedCard: "bg-teal-50/70 shadow-md dark:bg-teal-950/25"
  },
  rose: {
    border: "border-rose-300 dark:border-rose-700/70",
    accent: "text-rose-800 dark:text-rose-200",
    marker: "border-rose-200 bg-rose-700 text-white dark:border-rose-300/40",
    spine: "bg-rose-700",
    chip: "border-rose-200 bg-rose-50 text-rose-950 dark:border-rose-700/60 dark:bg-rose-950/35 dark:text-rose-100",
    date: "border-rose-200 bg-rose-100/80 text-rose-950 dark:border-rose-700/60 dark:bg-rose-950/50 dark:text-rose-100",
    selected: "ring-2 ring-rose-300 shadow-[0_18px_45px_rgba(190,18,60,0.18)] dark:ring-rose-500/60 dark:shadow-[0_18px_45px_rgba(0,0,0,0.35)]",
    selectedCard: "bg-rose-50/70 shadow-md dark:bg-rose-950/25"
  },
  slate: {
    border: "border-slate-300 dark:border-slate-600/80",
    accent: "text-slate-700 dark:text-slate-200",
    marker: "border-slate-200 bg-slate-600 text-white dark:border-slate-300/40",
    spine: "bg-slate-600",
    chip: "border-slate-200 bg-slate-50 text-slate-950 dark:border-slate-600/70 dark:bg-slate-900/60 dark:text-slate-100",
    date: "border-slate-200 bg-slate-100 text-slate-950 dark:border-slate-600/70 dark:bg-slate-900/70 dark:text-slate-100",
    selected: "ring-2 ring-slate-300 shadow-[0_18px_45px_rgba(71,85,105,0.18)] dark:ring-slate-400/60 dark:shadow-[0_18px_45px_rgba(0,0,0,0.35)]",
    selectedCard: "bg-slate-50 shadow-md dark:bg-slate-900/45"
  }
};

const summaryCards = [
  {
    label: "c. 5/4 B.C. to A.D. 31",
    title: "Messiah and Victory",
    period: "c. 5/4 B.C. to A.D. 31",
    body: "The woman bears the promised Child, the dragon moves against Him, and Christ is caught up to God after His victory.",
    className: "border-amber-300 bg-[#fffaf1] dark:border-amber-800/70 dark:bg-amber-950/20",
    iconClassName: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-200",
    titleClassName: "text-amber-900 dark:text-amber-100",
    icon: Crown
  },
  {
    label: "A.D. 538-1798",
    title: "Wilderness and Beast Power",
    period: "A.D. 538-1798",
    body: "The 1,260 years and the beast's forty-two months trace the same long period of pressure, preservation, and witness.",
    className: "border-violet-300 bg-[#fffaf1] dark:border-violet-800/70 dark:bg-violet-950/20",
    iconClassName: "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-200",
    titleClassName: "text-violet-700 dark:text-violet-100",
    icon: ShieldAlert
  },
  {
    label: "After 1798 / 1844 onward",
    title: "Final Message and Crisis",
    period: "After 1798 / 1844 onward",
    body: "The remnant, judgment-hour message, final worship crisis, and harvest bring the conflict to its closing scenes.",
    className: "border-teal-300 bg-[#fffaf1] dark:border-teal-800/70 dark:bg-teal-950/20",
    iconClassName: "bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-200",
    titleClassName: "text-teal-800 dark:text-teal-100",
    icon: Megaphone
  }
];

const timelineRows: TimelineRow[] = [
  {
    title: "Covenant Woman",
    scripture: "Revelation 12:1-2",
    phase: "Promise Line",
    excerpt:
      "And there appeared a great wonder in heaven; a woman clothed with the sun... and upon her head a crown of twelve stars: And she being with child cried, travailing in birth...",
    explanation:
      "The timeline begins with God's faithful covenant people before it shows the dragon. The woman gathers the imagery of Israel, the church, heavenly light, and covenant continuity. Her labor reaches back to the promise of the Seed in Eden and forward to the Messiah. This row is not a single date on the calendar; it represents the long promise line through which Christ would come. The sun, moon, and twelve stars are not decorative details; they tie Revelation 12 to the covenant family imagery of Genesis 37 and to the people through whom the Messiah enters history.",
    references: ["Genesis 3:15", "Genesis 37:9-10", "Revelation 12:1-2"],
    commentaryVerses: ["Revelation 12:1", "Revelation 12:2"],
    href: "/revelation/12#revelation-12-1",
    icon: Sparkles,
    tone: "gold",
    chronologyNote: "Why here: this is the covenant promise line that leads to Messiah, not a single dated event."
  },
  {
    title: "Birth of the Man Child",
    scripture: "Revelation 12:2, 5",
    phase: "Messiah Born",
    dateLabel: "c. 5/4 B.C.",
    dateNote: "Birth of Christ",
    excerpt: "And she brought forth a man child, who was to rule all nations with a rod of iron...",
    explanation:
      "The man child is Christ. Revelation compresses the long expectation of Israel into the birth of the One promised to rule with a rod of iron. The date is given approximately because the exact year of Christ's birth is debated, but c. 5/4 B.C. keeps the timeline tied to the historical coming of Jesus rather than treating the symbol as detached from real history. The rod-of-iron language reaches back to Psalm 2, so the Child is not merely vulnerable; He is the promised King whose victory is certain even while the dragon waits to destroy Him.",
    references: ["Psalm 2:7-9", "Micah 5:2", "Matthew 1:18-25"],
    commentaryVerses: ["Revelation 12:2", "Revelation 12:5"],
    href: "/revelation/12#revelation-12-5",
    icon: Crown,
    tone: "gold",
    chronologyNote: "Why here: Revelation 12 moves from the promised people to the historical birth of Christ."
  },
  {
    title: "Dragon Seeks to Destroy Christ",
    scripture: "Revelation 12:3-4",
    phase: "Pagan Rome",
    dateLabel: "c. 5/4 B.C.",
    dateNote: "Herod's attempt on Christ's life",
    excerpt: "And behold a great red dragon... and the dragon stood before the woman... for to devour her child as soon as it was born.",
    explanation:
      "The dragon is Satan, but Revelation shows him working through earthly power. In the birth-of-Christ setting, that hostility appears through pagan Rome and Herod's attempt to destroy Jesus. The row belongs chronologically beside the birth of Christ, because the symbol is not merely general hostility; it points to Satan's effort to cut off the Messiah at His entrance into the world. The seven heads, ten horns, and crowns show organized power under satanic direction, while the attempt on the Child shows that the great controversy centers first on Christ before it turns openly against His church.",
    references: ["Matthew 2:13-18", "Revelation 12:3-4", "Revelation 12:9"],
    commentaryVerses: ["Revelation 12:3", "Revelation 12:4"],
    href: "/revelation/12#revelation-12-3",
    icon: ShieldAlert,
    tone: "rose",
    chronologyNote: "Why here: the dragon's first earthly attack in this sequence centers on Christ at His birth."
  },
  {
    title: "Christ Caught Up to God",
    scripture: "Revelation 12:5",
    phase: "Ascension Victory",
    dateLabel: "A.D. 31",
    dateNote: "Resurrection and ascension victory",
    excerpt: "...and her child was caught up unto God, and to his throne.",
    explanation:
      "Revelation 12 moves quickly from birth to enthronement. The catching up points to Christ's resurrection and ascension after His victory over sin, death, and Satan. A.D. 31 marks the climactic victory: the Messiah is not devoured by the dragon but received to God's throne, guaranteeing the final defeat of the accuser and the preservation of His people. The verse deliberately skips many earthly details so the reader sees the main line: incarnation, conflict, victory, and heavenly authority.",
    references: ["Acts 1:9-11", "Hebrews 1:3", "Revelation 12:5"],
    commentaryVerses: ["Revelation 12:5"],
    href: "/revelation/12#revelation-12-5",
    icon: Crown,
    tone: "teal",
    chronologyNote: "Why here: Revelation compresses Christ's death, resurrection, and ascension into the throne victory."
  },
  {
    title: "Accuser Cast Down",
    scripture: "Revelation 12:7-12",
    phase: "Victory Proclaimed",
    dateLabel: "A.D. 31 focus",
    dateNote: "The cross exposes Satan's accusations",
    excerpt:
      "Now is come salvation, and strength, and the kingdom of our God, and the power of his Christ... And they overcame him by the blood of the Lamb...",
    explanation:
      "The war in heaven scene explains the meaning of Christ's victory. Satan's accusations are exposed by the blood of the Lamb, and the people of God overcome by that blood and by the word of their testimony. The row is placed here because Revelation's announcement is tied to the triumph of Christ. The conflict continues on earth, but the decisive victory has already been won. Michael's victory is not abstract warfare; it is the heavenly declaration that Christ's cross has answered the accuser and secured the moral basis for the final deliverance of God's people.",
    references: ["John 12:31-33", "Luke 10:18", "Revelation 12:10-11"],
    commentaryVerses: ["Revelation 12:7", "Revelation 12:8", "Revelation 12:9", "Revelation 12:10", "Revelation 12:11", "Revelation 12:12"],
    href: "/revelation/12#revelation-12-7",
    icon: Flame,
    tone: "rose",
    chronologyNote: "Why here: the heavenly proclamation interprets the victory accomplished by Christ."
  },
  {
    title: "Dragon Pursues the Woman",
    scripture: "Revelation 12:13-15",
    phase: "Church Pursued",
    excerpt:
      "And when the dragon saw that he was cast unto the earth, he persecuted the woman which brought forth the man child... And the serpent cast out of his mouth water as a flood after the woman...",
    explanation:
      "Once Christ is beyond the dragon's reach, the conflict turns directly against the woman. Revelation 12 does not leave the church in a peaceful interval after the ascension; it shows Satan redirecting his rage toward the people through whom Christ's witness continues on earth. The flood from the serpent's mouth pictures overwhelming pressure, falsehood, and persecution meant to sweep the woman away. This row belongs before the wilderness-period rows because it explains why the woman must flee and why God's preserving care becomes necessary. The conflict is still Christ-centered: the dragon hates the woman because she brought forth the Man Child and continues to bear His testimony.",
    references: ["Revelation 12:13-15", "Revelation 12:17", "Matthew 24:9-13"],
    commentaryVerses: ["Revelation 12:13", "Revelation 12:14", "Revelation 12:15"],
    href: "/revelation/12#revelation-12-13",
    icon: ShieldAlert,
    tone: "rose",
    chronologyNote: "Why here: after failing to destroy Christ, the dragon turns against the woman before the wilderness preservation is described."
  },
  {
    title: "Dragon Gives Power, Seat, and Authority",
    scripture: "Revelation 13:2",
    phase: "Power Transfer",
    dateLabel: "A.D. 313-538 transition",
    dateNote: "From pagan Rome toward papal dominance",
    excerpt: "...and the dragon gave him his power, and his seat, and great authority.",
    explanation:
      "This row fills the transition between Christ's ascension victory and the beginning of the 1,260-year wilderness period. The dragon remains Satan, but Revelation shows his opposition working through Roman power. Revelation 13:2 explains how the later sea beast receives power, seat, and great authority from the dragon. The movement from imperial favor, compromise, and church-state entanglement toward papal dominance prepares the setting for A.D. 538, when the long prophetic period begins. This row keeps the timeline from jumping too abruptly from the apostolic victory of Christ to the medieval wilderness experience.",
    references: ["Revelation 13:2", "Revelation 12:3-4", "Revelation 13:5"],
    commentaryVerses: ["Revelation 13:2"],
    danielLinks: ["Daniel 7"],
    href: "/revelation/13#revelation-13-2",
    icon: ShieldAlert,
    tone: "violet",
    chronologyNote: "Why here: this transition explains how Roman power moves into the sea-beast period before A.D. 538."
  },
  {
    title: "Wilderness Period Begins",
    scripture: "Revelation 12:6, 14",
    phase: "1260 Years Begin",
    dateLabel: "A.D. 538",
    dateNote: "Beginning of the prophetic wilderness period",
    excerpt: "And the woman fled into the wilderness, where she hath a place prepared of God, that they should feed her there a thousand two hundred and threescore days.",
    explanation:
      "After Christ's ascension, the dragon turns his fury toward the woman. The wilderness is not abandonment; it is preservation under pressure. A.D. 538 marks the beginning of the 1,260-year period in which God's faithful people are nourished while religious-political power opposes them. The timeline now moves from Christ's personal victory to the long historical experience of His church. The prepared place matters: Revelation does not present the faithful as forgotten, but as sustained by God when public power is hostile to biblical faith.",
    references: ["Revelation 12:6", "Revelation 12:14"],
    commentaryVerses: ["Revelation 12:6", "Revelation 12:14"],
    danielLinks: ["Daniel 7:25"],
    href: "/revelation/12#revelation-12-6",
    icon: Shield,
    tone: "violet",
    chronologyNote: "Why here: this marks the start of the 1,260-year wilderness period."
  },
  {
    title: "Sea Beast's Daniel 7 Identity",
    scripture: "Revelation 13:1-2",
    phase: "Composite Beast",
    dateLabel: "A.D. 538 setting",
    dateNote: "Daniel 7 imagery carried forward",
    excerpt:
      "And I stood upon the sand of the sea, and saw a beast rise up out of the sea... and the beast which I saw was like unto a leopard, and his feet were as the feet of a bear, and his mouth as the mouth of a lion...",
    explanation:
      "Before Revelation gives the beast's forty-two months, it identifies the kind of power being described. The sea beast rises from the waters with seven heads, ten horns, crowns, blasphemous names, and a composite body drawn from Daniel's lion, bear, leopard, and dreadful beast imagery. This is not a random monster. Revelation gathers Daniel's kingdoms into one later religious-political power that inherits Roman authority and claims a counterfeit place in matters of worship. The row is placed at the A.D. 538 setting because the beast's identity must be clear before its time period is traced. Revelation 13 expands Daniel 7 into the final conflict over authority, worship, and loyalty to God.",
    references: ["Revelation 13:1-2", "Revelation 17:15"],
    commentaryVerses: ["Revelation 13:1", "Revelation 13:2"],
    danielLinks: ["Daniel 7"],
    href: "/revelation/13#revelation-13-1",
    icon: ShieldAlert,
    tone: "violet",
    chronologyNote: "Why here: the beast's Daniel 7 identity is established before its forty-two-month authority is described."
  },
  {
    title: "Sea Beast's Forty-Two Months",
    scripture: "Revelation 13:5-7",
    phase: "Beast Authority",
    dateLabel: "A.D. 538-1798",
    dateNote: "Forty-two months / 1,260 prophetic years",
    excerpt:
      "And there was given unto him a mouth speaking great things and blasphemies; and power was given unto him to continue forty and two months... to make war with the saints...",
    explanation:
      "The sea beast gathers Daniel 7 imagery and represents a religious-political power that claims divine prerogatives, persecutes the saints, and exercises authority for the same prophetic period as the woman's wilderness experience. This row is placed alongside the 1,260 years because Revelation 12 and 13 repeat and enlarge the same historical span from different angles. The forty-two months, the time-times-and-half-a-time, and the 1,260 days belong together. They identify the same era of religious coercion, blasphemous claims, and pressure against those who remain loyal to Christ.",
    references: ["Revelation 13:5-7", "Revelation 12:6"],
    commentaryVerses: ["Revelation 13:5", "Revelation 13:6", "Revelation 13:7"],
    danielLinks: ["Daniel 7", "Daniel 7:25"],
    href: "/revelation/13#revelation-13-5",
    icon: ShieldAlert,
    tone: "violet",
    chronologyNote: "Why here: this is the beast-power side of the same 1,260-year span."
  },
  {
    title: "Woman Preserved in the Wilderness",
    scripture: "Revelation 12:6, 14",
    phase: "Church Preserved",
    dateLabel: "A.D. 538-1798",
    dateNote: "The 1,260-year wilderness period",
    excerpt: "...that she might fly into the wilderness, into her place, where she is nourished for a time, and times, and half a time, from the face of the serpent.",
    explanation:
      "This row repeats the wilderness period from the woman's side of the story. The same years that expose beastly oppression also reveal divine preservation. God does not remove all suffering from His people, but He keeps the witness of truth alive. The row belongs after the beast-power row because Revelation's method is repeat and enlarge: the same period is seen through persecution and preservation. The two wings of a great eagle echo God's earlier deliverance of Israel, showing that the wilderness can be a place of hardship and divine care at the same time.",
    references: ["Revelation 12:6", "Revelation 12:14"],
    commentaryVerses: ["Revelation 12:6", "Revelation 12:14"],
    danielLinks: ["Daniel 7:25", "Daniel 12:7"],
    href: "/revelation/12#revelation-12-14",
    icon: Heart,
    tone: "teal",
    chronologyNote: "Why here: this repeats the wilderness period from the church's preservation perspective."
  },
  {
    title: "Earth Helps the Woman",
    scripture: "Revelation 12:16",
    phase: "Refuge Opens",
    dateLabel: "Late 1700s",
    dateNote: "Religious liberty and refuge expand",
    excerpt: "And the earth helped the woman, and the earth opened her mouth, and swallowed up the flood which the dragon cast out of his mouth.",
    explanation:
      "The earth helping the woman points to providential relief from the old persecuting order. The Reformation, migration, and the rise of a less crowded setting for civil and religious liberty helped weaken the flood of persecution. This row culminates near the late 1700s because the end of the 1,260 years and the rise of a new kind of power prepare the scene for Revelation 13:11. The help is not the final victory itself; it is a historical opening through which liberty, refuge, and renewed Bible witness can grow before the last conflict develops.",
    references: ["Revelation 12:16", "Revelation 13:11", "Revelation 12:14"],
    commentaryVerses: ["Revelation 12:16"],
    href: "/revelation/12#revelation-12-16",
    icon: Shield,
    tone: "teal",
    chronologyNote: "Why here: the earth that helps the woman is the same setting from which the earth beast rises next."
  },
  {
    title: "Earth Beast Rises",
    scripture: "Revelation 13:11",
    phase: "New Power",
    dateLabel: "Late 1700s / around 1798",
    dateNote: "Rise of the United States in a less populated setting",
    excerpt: "And I beheld another beast coming up out of the earth; and he had two horns like a lamb, and he spake as a dragon.",
    explanation:
      "The earth beast rises from the same broad earth setting that has just helped the woman. Revelation first presents this power with lamb-like horns, pointing to a new nation marked by civil and religious liberty rather than the old persecuting structures of Europe. Its rise belongs in the late 1700s and around 1798, when the old beast receives its wound and a new power is coming up in a less populated setting. The later dragon speech is not dated here. That matters: Revelation dates the rise of the power, but it does not assign a calendar date to the later coercive role. The warning is that a nation with liberty in its beginnings will eventually speak contrary to those principles in the final worship crisis.",
    references: ["Revelation 13:11", "Revelation 12:16", "Revelation 13:12"],
    commentaryVerses: ["Revelation 13:11"],
    href: "/revelation/13#revelation-13-11",
    icon: Shield,
    tone: "teal",
    chronologyNote: "Why here: Revelation 13:11 develops the same earth setting into the rise of a new lamb-like power."
  },
  {
    title: "Deadly Wound",
    scripture: "Revelation 13:3, 10",
    phase: "Wound Given",
    dateLabel: "A.D. 1798",
    dateNote: "The beast receives its deadly wound",
    excerpt: "And I saw one of his heads as it were wounded to death; and his deadly wound was healed... He that leadeth into captivity shall go into captivity...",
    explanation:
      "A.D. 1798 marks the close of the 1,260 years and the wounding of the papal power's political dominance. Revelation does not treat the wound as the end of the conflict. It becomes part of a larger sequence: wound, recovery, renewed admiration, and a final worship crisis. The timeline therefore moves from the long period of dominance to the transition into the end-time setting. The captivity language also shows moral justice: the power that used coercion and captivity is itself brought under judgment.",
    references: ["Revelation 13:3", "Revelation 13:10"],
    commentaryVerses: ["Revelation 13:3", "Revelation 13:10"],
    danielLinks: ["Daniel 7:25"],
    href: "/revelation/13#revelation-13-3",
    icon: ShieldAlert,
    tone: "rose",
    chronologyNote: "Why here: A.D. 1798 closes the 1,260 years and wounds the beast's political dominance."
  },
  {
    title: "Remnant Emerges",
    scripture: "Revelation 12:17",
    phase: "Commandment Keepers",
    dateLabel: "After 1798 / 1844 onward",
    dateNote: "End-time remnant setting",
    excerpt: "...and went to make war with the remnant of her seed, which keep the commandments of God, and have the testimony of Jesus Christ.",
    explanation:
      "After the wilderness period, Revelation identifies the remnant by loyalty to God's commandments and the testimony of Jesus. The date language is intentionally tied to the prophetic setting rather than to one isolated verse: after 1798 the final stage opens, and 1844 onward brings the judgment-hour setting in which the remnant message becomes clear. This row prepares for the final worship crisis. The remnant are not defined by self-importance, but by visible allegiance: obedience to God's commandments and reception of the testimony Jesus gives to His people.",
    references: ["Revelation 12:17", "Revelation 14:12", "Revelation 19:10"],
    commentaryVerses: ["Revelation 12:17"],
    href: "/revelation/12#revelation-12-17",
    icon: ScrollText,
    tone: "gold",
    chronologyNote: "Why here: after the wilderness period, Revelation identifies the end-time remnant by loyalty and witness."
  },
  {
    title: "Judgment-Hour Message",
    scripture: "Revelation 14:6-7",
    phase: "Final Proclamation",
    dateLabel: "1844 onward",
    dateNote: "Judgment-hour proclamation",
    excerpt:
      "I saw another angel fly in the midst of heaven, having the everlasting gospel... Saying with a loud voice, Fear God, and give glory to him; for the hour of his judgment is come...",
    explanation:
      "Revelation 14 answers the beast crisis with the everlasting gospel. The judgment-hour message belongs after the prophetic time periods have reached their end and calls the world back to Creator worship. The wording deliberately echoes the Sabbath commandment without turning the message into mere controversy. The issue is worship, allegiance, gospel, and preparation for Christ's harvest. The message is worldwide, public, and urgent: judgment has begun, yet the call is still gospel before it is warning.",
    references: ["Exodus 20:8-11", "Revelation 14:6-7"],
    commentaryVerses: ["Revelation 14:6", "Revelation 14:7"],
    danielLinks: ["Daniel 8:14"],
    href: "/revelation/14#revelation-14-6",
    icon: Megaphone,
    tone: "gold",
    chronologyNote: "Why here: the judgment-hour proclamation belongs after the prophetic time periods reach their end."
  },
  {
    title: "Babylon's Fall Announced",
    scripture: "Revelation 14:8",
    phase: "Second Angel",
    dateLabel: "1844 onward",
    dateNote: "Announced after the judgment-hour message; intensifies before the end",
    excerpt: "Babylon is fallen, is fallen, that great city, because she made all nations drink of the wine of the wrath of her fornication.",
    explanation:
      "Babylon's fall is announced in the setting of the final gospel message. It describes religious confusion, false worship, corrupt alliance, and spiritual intoxication. The announcement begins in the Advent proclamation setting and intensifies as Babylon's final influence grows. The row receives a broad date label for the message, but not a date for the final collapse. This warning prepares for the fuller call of Revelation 18, where God still addresses sincere people within Babylon and calls them out before her judgments fall.",
    references: ["Revelation 14:8", "Revelation 17:1-5", "Revelation 18:1-4"],
    commentaryVerses: ["Revelation 14:8"],
    href: "/revelation/14#revelation-14-8",
    icon: Flame,
    tone: "rose",
    chronologyNote: "Why here: Babylon's fall is announced in the final-message setting and intensifies before the end."
  },
  {
    title: "Wound Heals and World Wonders",
    scripture: "Revelation 13:3-4",
    phase: "Recovery",
    excerpt:
      "...and his deadly wound was healed: and all the world wondered after the beast. And they worshipped the dragon which gave power unto the beast...",
    explanation:
      "The deadly wound is not the end of the beast's influence. Revelation says the wound heals and the world wonders after the beast. This recovery is not merely a political comeback; the text frames it as a worship issue, because admiration for the beast becomes worship of the dragon's counterfeit authority. This row is deliberately undated. The wound itself is tied to 1798, but the healing and world-wondering unfold later as a recovery process that intensifies toward the final crisis. Placing it after the remnant, judgment-hour message, and Babylon warning shows the end-time setting in which global admiration prepares the way for the earth beast's coercive work.",
    references: ["Revelation 13:3-4", "Revelation 13:12", "Revelation 17:8"],
    commentaryVerses: ["Revelation 13:3", "Revelation 13:4"],
    href: "/revelation/13#revelation-13-3",
    icon: Flame,
    tone: "rose",
    chronologyNote: "Why here: the wound is dated in 1798, but the healing and world-wondering are later undated recovery and final intensification."
  },
  {
    title: "Earth Beast Exercises Authority and False Signs",
    scripture: "Revelation 13:12-14",
    phase: "False Signs",
    excerpt:
      "And he exerciseth all the power of the first beast before him... And he doeth great wonders... And deceiveth them that dwell on the earth by the means of those miracles...",
    explanation:
      "The earth beast's later role is now separated from its rise. The same power that began with lamb-like principles eventually exercises the authority of the first beast and uses signs to direct worship back toward the wounded power. Revelation is not simply warning about political influence; it is warning about religious deception joined to civil authority. The fire-from-heaven imagery signals counterfeit spiritual power, and the miracles deceive those who judge truth by spectacle rather than by Scripture. This row has no date badge because the text describes the final deceptive role without giving a calendar date for its fulfillment.",
    references: ["Revelation 13:12-14", "Matthew 24:24", "Revelation 16:13-14"],
    commentaryVerses: ["Revelation 13:12", "Revelation 13:13", "Revelation 13:14"],
    href: "/revelation/13#revelation-13-12",
    icon: Flame,
    tone: "rose",
    chronologyNote: "Why here: the power's rise is dated earlier, but its dragon-like authority and deceptive signs belong to the undated final crisis."
  },
  {
    title: "Image to the Beast and Worship Enforcement",
    scripture: "Revelation 13:14-15",
    phase: "Image Made",
    excerpt:
      "...that they should make an image to the beast, which had the wound by a sword, and did live... that the image of the beast should both speak, and cause...",
    explanation:
      "The image to the beast is the next step in the final crisis. An image resembles the original, so Revelation points to a restored pattern of religious authority using civil power to enforce worship. The language of the image speaking and causing shows legislation, public pressure, and coercion rather than voluntary faith. This row is kept undated because Revelation does not give a year for the formation or enforcement of the image. Its theological point is clear enough without speculation: when worship is compelled by earthly power, the conflict of Revelation 13 has reached its final form.",
    references: ["Revelation 13:14-15", "Daniel 3:4-6", "Revelation 14:9"],
    commentaryVerses: ["Revelation 13:14", "Revelation 13:15"],
    href: "/revelation/13#revelation-13-14",
    icon: Scale,
    tone: "violet",
    chronologyNote: "Why here: the image follows deception and moves the crisis from influence into enforced worship."
  },
  {
    title: "Mark of the Beast, Worship Allegiance, and Buying/Selling Pressure",
    scripture: "Revelation 13:16-17; 14:9-11",
    phase: "Mark Crisis",
    excerpt:
      "And he causeth all... to receive a mark... And that no man might buy or sell... If any man worship the beast and his image, and receive his mark...",
    explanation:
      "The mark crisis is the public allegiance test that follows worship enforcement. Revelation connects the mark with worship, authority, and economic pressure. The forehead and hand show settled conviction and practical compliance, while buying and selling pressure reveals how deeply the final conflict touches ordinary life. This row intentionally has no date badge. The final Sunday-law enforcement, mark of the beast, and economic restriction are described by character, not by calendar. The warning is solemn, but it should not be used to condemn sincere people before the final test is made clear. Revelation's call is to worship the Creator, keep God's commandments, and hold the faith of Jesus when coercion makes allegiance public.",
    references: ["Revelation 13:16-17", "Revelation 14:9-12", "Exodus 20:8-11"],
    commentaryVerses: ["Revelation 13:16", "Revelation 13:17", "Revelation 14:9", "Revelation 14:10", "Revelation 14:11"],
    href: "/revelation/13#revelation-13-16",
    icon: Scale,
    tone: "violet",
    chronologyNote: "Why here: the mark, Sunday-law enforcement, and buying/selling pressure are final events described without a date."
  },
  {
    title: "Lamb's Sealed People and Patience of the Saints",
    scripture: "Revelation 14:1-5, 12",
    phase: "Sealed People",
    excerpt:
      "And I looked, and, lo, a Lamb stood on the mount Sion, and with him an hundred forty and four thousand... Here is the patience of the saints: here are they that keep the commandments of God, and the faith of Jesus.",
    explanation:
      "Revelation 14 does not leave the reader staring only at beastly coercion. It shows the Lamb standing with His sealed people. The 144,000 are marked by the Father's name, follow the Lamb, and stand in contrast to those who receive the beast's mark. Verse 12 gathers the final response into one sentence: patience, God's commandments, and the faith of Jesus. This row remains undated because it describes the character and loyalty of the final faithful people rather than assigning a year to their last experience. It is the answer to the mark crisis: a people whose worship, obedience, and faith belong to the Lamb.",
    references: ["Revelation 14:1-5", "Revelation 14:12", "Revelation 7:1-4"],
    commentaryVerses: ["Revelation 14:1", "Revelation 14:2", "Revelation 14:3", "Revelation 14:4", "Revelation 14:5", "Revelation 14:12"],
    href: "/revelation/14#revelation-14-1",
    icon: Crown,
    tone: "gold",
    chronologyNote: "Why here: the Lamb's sealed people answer the beast's mark with commandments, faith, and endurance."
  },
  {
    title: "Blessed Dead and Two Harvests",
    scripture: "Revelation 14:13-20",
    phase: "Harvests",
    excerpt:
      "Blessed are the dead which die in the Lord... And I looked, and behold a white cloud, and upon the cloud one sat like unto the Son of man... Thrust in thy sickle, and reap...",
    explanation:
      "The sequence closes with comfort and judgment. The blessing on those who die in the Lord gives courage to believers who live in the shadow of the final conflict, while the two harvests show that history does not drift forever. The Son of Man gathers the ripened grain, and the vine of the earth is brought to judgment. This closing row has no date badge because Revelation gives the certainty and character of the final harvest, not the timing. The point is readiness, not calculation. The Lamb's people rest in Christ, their works follow them, and the rebellion that gathered the world against God is finally answered.",
    references: ["Revelation 14:13", "Revelation 14:14-20", "Matthew 13:39-43"],
    commentaryVerses: ["Revelation 14:13", "Revelation 14:14", "Revelation 14:15", "Revelation 14:16", "Revelation 14:17", "Revelation 14:18", "Revelation 14:19", "Revelation 14:20"],
    href: "/revelation/14#revelation-14-14",
    icon: Crown,
    tone: "gold",
    chronologyNote: "Why here: the final harvest scenes close the movement without giving a date for final completion."
  }
];

function getCommentaryEntries(row: TimelineRow, commentaryByVerse: TimelineCommentaryByVerse): TimelineCommentaryEntry[] {
  return row.commentaryVerses
    .map((verse) => commentaryByVerse[verse])
    .filter((entry): entry is TimelineCommentaryEntry => Boolean(entry?.text));
}

function getParagraphs(text: string): string[] {
  return text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function trimToSentence(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  const clipped = text.slice(0, maxLength);
  const sentenceEnd = Math.max(clipped.lastIndexOf("."), clipped.lastIndexOf("?"), clipped.lastIndexOf("!"));

  if (sentenceEnd > 240) {
    return clipped.slice(0, sentenceEnd + 1);
  }

  return `${clipped.slice(0, clipped.lastIndexOf(" ")).trim()}...`;
}

function buildBriefExplanation(entries: TimelineCommentaryEntry[], fallback: string): string {
  const firstParagraphs = entries.map((entry) => getParagraphs(entry.text)[0]).filter(Boolean);
  const brief = firstParagraphs.reduce((current, paragraph) => {
    if (!current) {
      return paragraph;
    }

    if (`${current}\n\n${paragraph}`.length <= 560) {
      return `${current}\n\n${paragraph}`;
    }

    return current;
  }, "");

  return trimToSentence(brief || fallback, 560);
}

function getCloudId(title: string): string {
  return `timeline-cloud-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

export function Revelation1214Timeline({ commentaryByVerse }: { commentaryByVerse: TimelineCommentaryByVerse }) {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [openCloudRow, setOpenCloudRow] = useState<string | null>(null);

  const toggleCloud = (rowTitle: string) => {
    setSelectedRow(rowTitle);
    setOpenCloudRow((currentRow) => (currentRow === rowTitle ? null : rowTitle));
  };

  return (
    <section className="mx-auto w-full max-w-7xl overflow-x-hidden whitespace-normal px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="revelation-12-14-title">
      <div className="min-w-0 rounded-lg border border-[#e3d7c5] bg-[#fbf7ef] text-[#302b25] shadow-sm dark:border-border dark:bg-card dark:text-card-foreground">
        <header className="border-b border-[#e6dac9] px-5 py-6 dark:border-border sm:px-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="break-words text-xs font-bold uppercase tracking-[0.16em] text-red-900 [overflow-wrap:anywhere] dark:text-primary sm:tracking-[0.24em]">
                Timeline Sequence
              </p>
              <h1 id="revelation-12-14-title" className="mt-2 break-words font-serif-display text-3xl font-semibold [overflow-wrap:anywhere] sm:text-4xl">
                Revelation 12-14
              </h1>
              <p className="mt-3 max-w-3xl break-words text-sm leading-7 text-[#5b5349] [overflow-wrap:anywhere] dark:text-muted-foreground">
                Follow the prophetic movement chronologically: Messiah, wilderness preservation, beast powers, final message, final crisis, and harvest.
              </p>
            </div>
            <span className="inline-flex w-fit rounded-full border border-[#e3d7c5] bg-[#f5efe5] px-3 py-1.5 text-xs font-bold text-[#3f3932] shadow-sm dark:border-border dark:bg-muted dark:text-foreground">
              {timelineRows.length} study rows
            </span>
          </div>

          <div className="mt-6 grid gap-3 lg:grid-cols-3">
            {summaryCards.map((card) => (
              <article key={card.title} className={`min-w-0 rounded-lg border p-4 ${card.className}`}>
                <div className="flex min-w-0 items-center gap-4">
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${card.iconClassName}`}>
                    <card.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h2 className={`break-words text-lg font-bold leading-tight [overflow-wrap:anywhere] sm:text-xl ${card.titleClassName}`}>{card.title}</h2>
                    <p className="mt-1 break-words text-xs font-bold uppercase tracking-[0.14em] text-[#6a5f53] [overflow-wrap:anywhere] dark:text-muted-foreground">
                      {card.period}
                    </p>
                  </div>
                </div>
                <p className="mt-3 break-words text-sm leading-6 text-[#5b5349] [overflow-wrap:anywhere] dark:text-muted-foreground">{card.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 rounded-lg border border-[#e3d7c5] bg-[#fffdf8] px-4 py-3 dark:border-border dark:bg-background/60">
            <p className="break-words text-[0.7rem] font-bold uppercase tracking-[0.16em] text-red-900 [overflow-wrap:anywhere] dark:text-primary sm:tracking-[0.22em]">
              Chronology Note
            </p>
            <p className="mt-1.5 break-words text-sm leading-6 text-[#5b5349] [overflow-wrap:anywhere] dark:text-muted-foreground">
              These rows are arranged by prophetic chronology rather than strict verse order. Revelation 12-14 often repeats and enlarges the same conflict from another angle, so some rows revisit the same period to show both pressure and preservation.
            </p>
          </div>
        </header>

        <div className="relative isolate px-4 py-7 sm:px-7">
          <div className="relative space-y-9">
            {timelineRows.map((row, index) => (
              <TimelineStudyRow
                key={row.title}
                row={row}
                commentaryEntries={getCommentaryEntries(row, commentaryByVerse)}
                isCloudOpen={openCloudRow === row.title}
                isFirst={index === 0}
                isLast={index === timelineRows.length - 1}
                isSelected={selectedRow === row.title}
                onSelect={() => setSelectedRow(row.title)}
                onToggleCloud={() => toggleCloud(row.title)}
              />
            ))}
          </div>
        </div>

        <div className="px-4 pb-7 sm:px-7">
          <div className="rounded-lg border border-[#e3d7c5] bg-[#fffdf8] p-4 dark:border-border dark:bg-background/60">
            <p className="break-words text-xs font-bold uppercase tracking-[0.16em] text-red-900 [overflow-wrap:anywhere] dark:text-primary sm:tracking-[0.22em]">
              Dated and Undated Events
            </p>
            <p className="mt-3 break-words text-sm leading-6 text-[#5b5349] [overflow-wrap:anywhere] dark:text-muted-foreground">
              Dates are shown only where the prophetic framework supplies them. The final mark crisis, Sunday-law enforcement, economic restriction, and the timing of the final harvest remain undated, so the timeline explains their character without setting a calendar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineStudyRow({
  row,
  commentaryEntries,
  isCloudOpen,
  isFirst,
  isLast,
  isSelected,
  onSelect,
  onToggleCloud
}: {
  row: TimelineRow;
  commentaryEntries: TimelineCommentaryEntry[];
  isCloudOpen: boolean;
  isFirst: boolean;
  isLast: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onToggleCloud: () => void;
}) {
  const Icon = row.icon;
  const styles = toneStyles[row.tone];
  const briefExplanation = buildBriefExplanation(commentaryEntries, row.explanation);
  const cloudId = getCloudId(row.title);
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("button")) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect();
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      className={`relative grid min-w-0 cursor-pointer gap-4 rounded-lg border bg-transparent p-3.5 shadow-sm outline-none transition duration-200 hover:shadow-md focus-visible:ring-2 focus-visible:ring-red-900/40 dark:focus-visible:ring-primary/50 sm:p-5 lg:grid-cols-[minmax(0,1fr)_96px_minmax(0,1fr)] lg:items-stretch ${styles.border} ${isSelected ? styles.selected : ""}`}
    >
      <div
        className={`pointer-events-none absolute left-7 z-20 w-2.5 ${styles.spine} shadow-[0_0_0_1px_rgba(15,23,42,0.08)] lg:hidden ${isFirst ? "-top-7 rounded-t-full" : "-top-9"} ${isLast ? "-bottom-7 rounded-b-full" : "-bottom-9"}`}
        aria-hidden="true"
      />

      <div className="relative z-10 min-w-0 pl-12 lg:pl-0">
        <div className={`min-w-0 rounded-lg border bg-[#fffaf1] p-3.5 transition dark:bg-card sm:p-4 ${styles.border} ${isSelected ? styles.selectedCard : ""}`}>
          <div className="flex flex-wrap items-center gap-2">
            <p className={`break-words text-xs font-bold uppercase tracking-[0.16em] [overflow-wrap:anywhere] sm:tracking-[0.22em] ${styles.accent}`}>
              {row.scripture}
            </p>
            {row.dateLabel ? (
              <span className={`max-w-full rounded-full border px-2.5 py-0.5 text-[0.72rem] font-bold ${styles.date}`}>{row.dateLabel}</span>
            ) : null}
          </div>
          <h2 className="mt-3 break-words font-serif-display text-lg font-semibold leading-tight [overflow-wrap:anywhere] dark:text-card-foreground sm:text-xl">{row.title}</h2>
          {row.dateNote ? (
            <p className={`mt-2 break-words text-[0.7rem] font-bold uppercase tracking-[0.14em] [overflow-wrap:anywhere] sm:tracking-[0.18em] ${styles.accent}`}>
              {row.dateNote}
            </p>
          ) : null}
          <p className="mt-3 break-words font-serif-display text-sm font-semibold leading-6 text-[#3a342d] [overflow-wrap:anywhere] dark:text-foreground sm:text-base sm:leading-7">{row.excerpt}</p>
        </div>
      </div>

      <div className="absolute left-2.5 top-6 z-50 flex w-11 justify-center lg:relative lg:left-auto lg:top-auto lg:w-auto lg:self-stretch">
        <div
          className={`pointer-events-none absolute left-1/2 z-0 hidden w-4 -translate-x-1/2 ${styles.spine} shadow-[0_0_0_1px_rgba(15,23,42,0.08)] lg:block ${isFirst ? "-top-12 rounded-t-full" : "-top-14"} ${isLast ? "-bottom-12 rounded-b-full" : "-bottom-14"}`}
          aria-hidden="true"
        />
        <div className="relative z-50 flex flex-col items-center lg:h-full lg:justify-center">
          <span className={`relative z-50 flex h-14 w-14 items-center justify-center rounded-full border-[6px] border-[#eadcca] shadow-md transition duration-200 dark:border-background ${styles.marker} ${isSelected ? "scale-105 ring-4 ring-[#fffdf8] dark:ring-card" : ""}`}>
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className={`relative z-50 mt-2.5 hidden w-24 rounded-lg border bg-[#fffdf8] px-2.5 py-1.5 text-center text-[0.68rem] font-bold uppercase tracking-[0.16em] shadow-sm transition dark:bg-card lg:block ${styles.border} ${styles.accent} ${isSelected ? styles.selectedCard : ""}`}>
            {row.phase}
          </span>
        </div>
      </div>

      <div className="relative z-10 min-w-0 pl-12 lg:pl-0">
        <div className={`min-w-0 rounded-lg border border-[#e4d9c9] bg-[#fbf7ef] p-3.5 transition dark:border-border dark:bg-card sm:p-4 ${isSelected ? styles.selectedCard : ""}`}>
          <p className="break-words text-xs font-bold uppercase tracking-[0.16em] text-[#5f554a] [overflow-wrap:anywhere] dark:text-muted-foreground sm:tracking-[0.22em]">
            Brief Explanation
          </p>
          {row.chronologyNote ? (
            <p className={`mt-3 rounded-lg border px-2.5 py-1.5 text-[0.72rem] font-bold leading-5 ${styles.chip}`}>{row.chronologyNote}</p>
          ) : null}
          <div className="mt-3 space-y-3">
            {getParagraphs(briefExplanation).map((paragraph) => (
              <p key={paragraph} className="break-words text-sm leading-7 text-[#554c43] [overflow-wrap:anywhere] dark:text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>

          {row.danielLinks?.length ? (
            <div className="mt-4">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#5f554a] dark:text-muted-foreground">Daniel Links</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {row.danielLinks.map((reference) => (
                  <span key={reference} className="max-w-full rounded-full border border-slate-300 bg-slate-100 px-2.5 py-0.5 text-[0.72rem] font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100">
                    {reference}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-2">
            {row.references.map((reference) => (
              <span key={reference} className={`max-w-full rounded-full border px-2.5 py-0.5 text-[0.72rem] font-bold ${styles.chip}`}>
                {reference}
              </span>
            ))}
          </div>

          <button
            type="button"
            aria-controls={cloudId}
            aria-expanded={isCloudOpen}
            onClick={(event) => {
              event.stopPropagation();
              onToggleCloud();
            }}
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-red-900 transition hover:gap-3 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-900/40 dark:text-primary dark:focus-visible:ring-primary/50"
          >
            Learn more
            <ArrowRight className={`h-4 w-4 transition ${isCloudOpen ? "rotate-90" : ""}`} aria-hidden="true" />
          </button>

          {isCloudOpen ? (
            <div
              id={cloudId}
              className="mt-4 max-h-[30rem] overflow-y-auto rounded-[1.5rem] border border-[#e2d6c5] bg-[#fffdf8] p-4 shadow-[0_18px_45px_rgba(88,64,42,0.12)] dark:border-border dark:bg-card dark:shadow-[0_18px_45px_rgba(0,0,0,0.28)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-900 dark:text-primary">Full Commentary</p>
                <span className="rounded-full border border-[#e3d7c5] bg-[#f5efe5] px-2.5 py-0.5 text-[0.72rem] font-bold text-[#554c43] dark:border-border dark:bg-muted dark:text-foreground">
                  {commentaryEntries.length} {commentaryEntries.length === 1 ? "verse" : "verses"}
                </span>
              </div>

              <div className="space-y-5">
                {commentaryEntries.map((entry) => (
                  <section key={entry.verse} className="min-w-0">
                    <h3 className={`text-sm font-bold ${styles.accent}`}>{entry.verse}</h3>
                    <div className="mt-2.5 space-y-3">
                      {getParagraphs(entry.text).map((paragraph) => (
                        <p key={paragraph} className="break-words text-sm leading-6 text-[#554c43] [overflow-wrap:anywhere] dark:text-muted-foreground">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
