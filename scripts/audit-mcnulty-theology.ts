import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contentRoot = join(root, "content", "revelation");
const sourceId = "revelation-practical-living-in-the-judgment-hour";
const sourceIndexPath = join(root, ".pdf-extraction-cache", "source-index.json");
const sourceSectionsPath = join(root, ".pdf-extraction-cache", "source-sections.jsonl");

type TermMatcher = string | RegExp;

type Claim = {
  id: string;
  reference: string;
  label: string;
  priority: "critical" | "important";
  sourceMarkers: TermMatcher[];
  required: Array<{
    label: string;
    anyOf: TermMatcher[];
  }>;
  forbidden?: Array<{
    label: string;
    anyOf: TermMatcher[];
  }>;
};

type AuditResult = {
  claim: Claim;
  status: "ok" | "weak" | "missing" | "conflict";
  missing: string[];
  conflicts: string[];
  sourceSupportFound: boolean;
};

type ResultStatus = AuditResult["status"];

type GenericResult = {
  id: string;
  reference: string;
  label: string;
  priority: "critical" | "important";
  kind: "verse-foundation" | "source-alignment" | "specific-claim" | "chapter-frame";
  status: ResultStatus;
  missing: string[];
  conflicts: string[];
  sourceSupportFound: boolean;
};

type SourceAuditEntry = {
  sourceId?: string;
};

type WordNote = {
  term?: string;
  explanation?: string;
  scriptureReferences?: string[];
};

type CrossReference = {
  reference?: string;
  connection?: string;
};

type VerseRecord = {
  verse: string;
  bibleText?: string;
  explanation?: string;
  historicalBackground?: string;
  symbolicMeaning?: string;
  adventistInsight?: string;
  propheticSignificance?: string;
  application?: string;
  crossReferences?: CrossReference[];
  wordNotes?: WordNote[];
  sourceAudit?: Record<string, SourceAuditEntry[]>;
  commentary?: Record<string, string | string[]>;
};

type ChapterRecord = {
  chapterNumber: number;
  title?: string;
  summary?: string;
  historicalContext?: string;
  literaryContext?: string;
  themes?: string[];
  outline?: Array<{ range?: string; title?: string; summary?: string }>;
  teachingNotes?: Record<string, string | string[]>;
  evangelisticNotes?: Record<string, string | string[]>;
  verses: VerseRecord[];
};

type SourceSection = {
  sourceId: string;
  references?: string[];
  markers?: string[];
  text?: string;
};

type SourceTerm = {
  label: string;
  aliases: TermMatcher[];
  chapters?: number[];
};

const publicSourceLeakTerms = [
  "Norman McNulty",
  "McNulty",
  "Revelation Practical Living",
  "uploaded",
  "source-index",
  "source material",
  "source language",
  "sourceAudit",
  "hidden audit",
  "manuscript",
  "PDF",
  ".pdf",
  "citation"
];

const sourceTerms: SourceTerm[] = [
  { label: "Jesus", aliases: [/Jesus/i, /Christ/i, /Son of man/i, /Lamb/i] },
  { label: "sanctuary", aliases: [/sanctuary/i, /temple/i, /altar/i, /incense/i, /High Priest/i, /Most Holy/i, /Holy Place/i] },
  { label: "judgment", aliases: [/judgment/i, /judge/i, /court/i, /books? opened/i] },
  { label: "worship", aliases: [/worship/i, /fear God/i, /give glory/i] },
  { label: "commandments", aliases: [/commandments?/i, /law of God/i, /obedience/i] },
  { label: "Sabbath", aliases: [/Sabbath/i, /seventh-day/i, /Creator worship/i] },
  { label: "prophetic time", aliases: [/prophetic time/i, /time prophe/i, /day-for-year/i, /days?/i, /months?/i, /years?/i] },
  { label: "1844", aliases: [/1844/i, /October 22/i, /2,?300/i, /2300/i] },
  { label: "1260 years", aliases: [/1,260/i, /1260/i, /forty-two months/i, /time, times/i] },
  { label: "538", aliases: [/\b538\b/i] },
  { label: "1798", aliases: [/\b1798\b/i] },
  { label: "144,000", aliases: [/144,?000/i] },
  { label: "sealing", aliases: [/seal/i, /sealing/i, /Father'?s name/i] },
  { label: "remnant", aliases: [/remnant/i, /last-day people/i, /end-time people/i] },
  { label: "testimony of Jesus", aliases: [/testimony of Jesus/i, /spirit of prophecy/i] },
  { label: "churches", aliases: [/church/i, /Ephesus/i, /Smyrna/i, /Pergamos/i, /Thyatira/i, /Sardis/i, /Philadelphia/i, /Laodicea/i] },
  { label: "seals", aliases: [/seal/i, /white horse/i, /red horse/i, /black horse/i, /pale horse/i, /souls under the altar/i] },
  { label: "trumpets", aliases: [/trumpet/i, /woe/i] },
  { label: "Rome", aliases: [/Rome/i, /Roman/i, /Western Rome/i] },
  { label: "papacy", aliases: [/papacy/i, /papal/i, /little horn/i, /sea beast/i] },
  { label: "Islam/Saracen", aliases: [/Islam/i, /Saracen/i, /Muslim/i, /locust/i] },
  { label: "Ottoman", aliases: [/Ottoman/i, /Turkish/i, /Euphrates/i, /391/i, /1840/i] },
  { label: "two witnesses", aliases: [/two witnesses/i, /Old and New Testaments/i, /Scriptures/i, /Bible/i] },
  { label: "French Revolution", aliases: [/French Revolution/i, /France/i, /atheism/i, /Sodom/i, /Egypt/i] },
  { label: "dragon", aliases: [/dragon/i, /Satan/i, /serpent/i, /devil/i] },
  { label: "beast powers", aliases: [/beast/i, /image of the beast/i, /mark of the beast/i, /false prophet/i] },
  { label: "United States", aliases: [/United States/i, /\bU\.S\./i, /earth beast/i] },
  { label: "mark of the beast", aliases: [/mark of the beast/i, /forehead/i, /right hand/i, /Sunday/i] },
  { label: "666", aliases: [/666/i, /six hundred/i, /number of his name/i] },
  { label: "three angels", aliases: [/three angels/i, /everlasting gospel/i, /first angel/i, /second angel/i, /third angel/i] },
  { label: "Babylon", aliases: [/Babylon/i, /harlot/i, /fornication/i, /wine/i, /come out/i] },
  { label: "plagues", aliases: [/plagues/i, /bowls/i, /vials/i, /wrath of God/i] },
  { label: "probation", aliases: [/close of probation/i, /probation/i, /no one.*enter/i, /temple.*smoke/i] },
  { label: "Armageddon", aliases: [/Armageddon/i, /war against the Lamb/i, /great day of God/i] },
  { label: "Second Coming", aliases: [/Second Coming/i, /Christ'?s return/i, /coming/i, /cloud/i, /white horse/i, /King of kings/i] },
  { label: "millennium", aliases: [/millennium/i, /thousand years/i, /bottomless pit/i, /abyss/i] },
  { label: "desolated earth", aliases: [/desolated earth/i, /formless and void/i, /no nations.*deceive/i] },
  { label: "lake of fire", aliases: [/lake of fire/i, /fire from heaven/i, /second death/i] },
  { label: "new creation", aliases: [/new heaven/i, /new earth/i, /New Jerusalem/i, /all things new/i] },
  { label: "city-bride", aliases: [/bride/i, /wife of the Lamb/i, /New Jerusalem/i] },
  { label: "tree of life", aliases: [/tree of life/i, /water of life/i, /river of life/i] },
  { label: "final invitation", aliases: [/Spirit and the bride/i, /water of life/i, /grace/i] }
];

const chapterFrameClaims = [
  { chapter: 1, label: "Revelation begins with Christ, prophetic blessing, and present-past-future ministry.", required: [/Jesus Christ/i, /prophecy/i, /Alpha and Omega/i] },
  { chapter: 2, label: "The first four churches preserve Christ's messages, historical movement, repentance, and overcoming.", required: [/Ephesus/i, /Smyrna/i, /Pergamos/i, /Thyatira/i, /overcom/i] },
  { chapter: 3, label: "The final three churches include Philadelphia, Laodicea, judgment-hour diagnosis, and Christ's counsel.", required: [/Sardis/i, /Philadelphia/i, /Laodicea/i, /judgment/i] },
  { chapter: 4, label: "The throne-room chapter centers worship, Creator language, and heavenly authority.", required: [/throne/i, /Creator/i, /worship/i] },
  { chapter: 5, label: "The scroll chapter centers the slain Lamb's worthiness and redemptive authority.", required: [/scroll/i, /Lamb/i, /worthy/i] },
  { chapter: 6, label: "The seal sequence traces historical decline, martyr witness, signs, and the final question.", required: [/seal/i, /horse/i, /martyr/i, /stand/i] },
  { chapter: 7, label: "The sealing interlude answers who can stand through the 144,000 and great multitude.", required: [/seal/i, /144,?000/i, /great multitude/i] },
  { chapter: 8, label: "The seventh seal and first trumpets preserve Second Coming silence and warning judgments.", required: [/seventh seal/i, /Second Coming/i, /trumpet/i, /warning/i] },
  { chapter: 9, label: "The fifth and sixth trumpets preserve the Islam/Saracen and Ottoman prophetic-time framework.", required: [/Islam/i, /Saracen/i, /Ottoman/i, /391/i] },
  { chapter: 10, label: "The mighty angel, open little book, 1844, time no longer, sweet-bitter experience, and recommission remain clear.", required: [/little book/i, /Daniel/i, /1844/i, /prophesy again/i] },
  { chapter: 11, label: "The two witnesses, 1,260 years, French Revolution, seventh trumpet, and opened temple remain clear.", required: [/two witnesses/i, /1,260/i, /French Revolution/i, /seventh trumpet/i, /temple/i] },
  { chapter: 12, label: "The woman, dragon, 1,260-year wilderness period, and remnant identity remain clear.", required: [/woman/i, /dragon/i, /1,260/i, /remnant/i, /commandments/i] },
  { chapter: 13, label: "The sea beast, earth beast, United States, image, mark, Sabbath/Sunday final crisis, and 666 remain clear.", required: [/sea beast/i, /United States/i, /image/i, /mark/i, /Sunday/i, /666/i] },
  { chapter: 14, label: "The 144,000, three angels, judgment hour, Creator/Sabbath worship, patience of saints, and harvest remain clear.", required: [/144,?000/i, /everlasting gospel/i, /judgment/i, /Sabbath/i, /patience of the saints/i] },
  { chapter: 15, label: "The victorious saints, heavenly temple, seven last plagues, and close-of-probation setting remain clear.", required: [/victor/i, /temple/i, /seven last plagues/i, /probation/i] },
  { chapter: 16, label: "The plagues, close of mercy, Euphrates, demonic deception, Armageddon, and Babylon's collapse remain clear.", required: [/plagues/i, /probation/i, /Euphrates/i, /Armageddon/i, /Babylon/i] },
  { chapter: 17, label: "The woman/harlot, scarlet beast, waters, horns, Babylon system, and Lamb's victory remain clear.", required: [/harlot/i, /scarlet beast/i, /waters/i, /Babylon/i, /Lamb/i] },
  { chapter: 18, label: "Babylon's fall, come-out call, economic corruption, and final vindication remain clear.", required: [/Babylon/i, /come out/i, /merchants/i, /blood of prophets/i] },
  { chapter: 19, label: "Heaven's praise, marriage supper, testimony of Jesus, visible return, and beast defeat remain clear.", required: [/marriage/i, /testimony of Jesus/i, /white horse/i, /King of kings/i] },
  { chapter: 20, label: "The millennium after Christ's return, desolated earth, judgment review, lake of fire, and second death remain clear.", required: [/millennium/i, /desolated earth/i, /judgment review/i, /lake of fire/i, /second death/i] },
  { chapter: 21, label: "The new creation, New Jerusalem, bride-city, temple-less glory, and book-of-life boundary remain clear.", required: [/new heaven/i, /New Jerusalem/i, /bride/i, /no temple/i, /book of life/i] },
  { chapter: 22, label: "Eden restored, commandments, open invitation, prophecy warning, Christ's soon coming, and grace remain clear.", required: [/river of life/i, /tree of life/i, /commandments/i, /Spirit and the bride/i, /come quickly/i] }
];

const claims: Claim[] = [
  {
    id: "rev-2-4-first-love",
    reference: "Revelation 2:4",
    label: "Ephesus must retain the first-love diagnosis, not only doctrinal activity.",
    priority: "important",
    sourceMarkers: [/Revelation 2:4/i, /first love/i],
    required: [
      { label: "first love", anyOf: [/first love/i] },
      { label: "repent/return", anyOf: [/repent/i, /return/i, /first works/i] }
    ]
  },
  {
    id: "rev-2-10-smyrna-ten-days",
    reference: "Revelation 2:10",
    label: "Smyrna's ten days should preserve the persecution-period reading.",
    priority: "important",
    sourceMarkers: [/Revelation 2:10/i, /ten days/i],
    required: [
      { label: "ten days", anyOf: [/ten days/i] },
      { label: "303-313 persecution", anyOf: [/303/i, /313/i, /Diocletian/i] },
      { label: "crown of life", anyOf: [/crown of life/i] }
    ]
  },
  {
    id: "rev-2-20-jezebel",
    reference: "Revelation 2:20",
    label: "Thyatira must identify Jezebel as corrupt religious authority and false worship.",
    priority: "important",
    sourceMarkers: [/Revelation 2:20/i, /Jezebel/i],
    required: [
      { label: "Jezebel", anyOf: [/Jezebel/i] },
      { label: "false worship/corruption", anyOf: [/false worship/i, /corruption/i, /idolatry/i] },
      { label: "medieval/papal setting", anyOf: [/medieval/i, /papal/i, /Middle Ages/i] }
    ]
  },
  {
    id: "rev-3-14-laodicea-judgment",
    reference: "Revelation 3:14",
    label: "Laodicea must remain the judgment-hour church with Christ as faithful witness.",
    priority: "important",
    sourceMarkers: [/Revelation 3:14/i, /Laodicea/i],
    required: [
      { label: "Laodicea", anyOf: [/Laodicea/i] },
      { label: "judgment setting", anyOf: [/judgment/i, /1844/i] },
      { label: "faithful and true witness", anyOf: [/Faithful and True Witness/i, /faithful witness/i] }
    ]
  },
  {
    id: "rev-5-1-scroll-lamb",
    reference: "Revelation 5:1",
    label: "The sealed scroll must stay centered in the Lamb's redemptive authority.",
    priority: "important",
    sourceMarkers: [/Revelation 5:1/i, /sealed/i, /Lamb/i],
    required: [
      { label: "scroll/book", anyOf: [/scroll/i, /book/i] },
      { label: "sealed", anyOf: [/seal/i] },
      { label: "Lamb", anyOf: [/Lamb/i] }
    ]
  },
  {
    id: "rev-6-1-white-horse",
    reference: "Revelation 6:1",
    label: "The first seal should connect the white horse with early gospel advance.",
    priority: "important",
    sourceMarkers: [/Revelation 6:1/i, /white horse/i],
    required: [
      { label: "white horse", anyOf: [/white horse/i] },
      { label: "gospel/apostolic advance", anyOf: [/gospel/i, /apostolic/i, /advance/i] }
    ]
  },
  {
    id: "rev-6-12-sixth-seal-signs",
    reference: "Revelation 6:12",
    label: "The sixth seal should retain the historic signs that lead to the final question.",
    priority: "important",
    sourceMarkers: [/Revelation 6:12/i, /earthquake/i],
    required: [
      { label: "Lisbon earthquake", anyOf: [/1755/i, /Lisbon/i] },
      { label: "dark day", anyOf: [/1780/i, /dark day/i] },
      { label: "falling stars", anyOf: [/1833/i, /falling stars/i] },
      { label: "who can stand", anyOf: [/who shall be able to stand/i, /who can stand/i] }
    ]
  },
  {
    id: "rev-7-1-sealing-delay",
    reference: "Revelation 7:1",
    label: "Revelation 7 must explain the sealing delay before the seventh seal.",
    priority: "critical",
    sourceMarkers: [/Revelation 7:1/i, /four winds/i, /sealing/i],
    required: [
      { label: "four winds", anyOf: [/four winds/i] },
      { label: "sealing", anyOf: [/seal/i, /sealing/i] },
      { label: "144,000", anyOf: [/144,?000/i] },
      { label: "delay/restraint before return", anyOf: [/delay/i, /hold/i, /restraint/i, /before.*return/i] }
    ]
  },
  {
    id: "rev-8-1-seventh-seal-second-coming",
    reference: "Revelation 8:1",
    label: "The seventh seal points to the Second Coming, silence in heaven, and the half-hour period.",
    priority: "critical",
    sourceMarkers: [/Revelation 8:1/i, /half an hour/i, /second time/i],
    required: [
      { label: "seventh seal", anyOf: [/seventh seal/i] },
      { label: "Second Coming", anyOf: [/Second Coming/i, /returns? to this earth/i, /Christ'?s return/i] },
      { label: "silence in heaven", anyOf: [/silence in heaven/i, /heaven.*silent/i] },
      { label: "angelic host empties heaven", anyOf: [/angelic host/i, /holy angels/i, /heaven.*empt/i] },
      { label: "half-hour prophetic time", anyOf: [/half an hour/i, /one forty-eighth/i, /1\/48/i] },
      { label: "about one week", anyOf: [/one week/i, /seven and a half/i, /7\.5/i, /seven days/i] }
    ],
    forbidden: [
      { label: "do not calculate half-hour", anyOf: [/do not calculate/i, /should not calculate/i, /not be given prophetic meaning/i] }
    ]
  },
  {
    id: "rev-8-7-first-trumpet",
    reference: "Revelation 8:7",
    label: "The first trumpet should retain the Western Rome warning-judgment application.",
    priority: "important",
    sourceMarkers: [/Revelation 8:7/i, /first trumpet/i],
    required: [
      { label: "first trumpet", anyOf: [/first trumpet/i] },
      { label: "Western Rome", anyOf: [/Western Rome/i, /Roman Empire/i] },
      { label: "Gothic/Alaric application", anyOf: [/Alaric/i, /Goth/i] },
      { label: "warning judgment", anyOf: [/warning/i, /judgment/i] }
    ]
  },
  {
    id: "rev-8-8-second-trumpet",
    reference: "Revelation 8:8",
    label: "The second trumpet should preserve the Vandal maritime judgment application.",
    priority: "important",
    sourceMarkers: [/Revelation 8:8/i, /second trumpet/i],
    required: [
      { label: "second trumpet", anyOf: [/second trumpet/i] },
      { label: "Vandal/Genseric", anyOf: [/Vandal/i, /Genseric/i] },
      { label: "sea/maritime", anyOf: [/sea/i, /maritime/i, /ships?/i] }
    ]
  },
  {
    id: "rev-8-10-third-trumpet",
    reference: "Revelation 8:10",
    label: "The third trumpet should preserve the Attila/Wormwood bitterness application.",
    priority: "important",
    sourceMarkers: [/Revelation 8:10/i, /third trumpet/i],
    required: [
      { label: "third trumpet", anyOf: [/third trumpet/i] },
      { label: "Attila/Huns", anyOf: [/Attila/i, /Huns?/i] },
      { label: "Wormwood/bitterness", anyOf: [/Wormwood/i, /bitter/i] }
    ]
  },
  {
    id: "rev-8-12-fourth-trumpet",
    reference: "Revelation 8:12",
    label: "The fourth trumpet should preserve the darkening/fall of Western Roman authority.",
    priority: "important",
    sourceMarkers: [/Revelation 8:12/i, /fourth trumpet/i],
    required: [
      { label: "fourth trumpet", anyOf: [/fourth trumpet/i] },
      { label: "darkening", anyOf: [/darken/i, /darkness/i] },
      { label: "Western Roman authority", anyOf: [/Western Roman/i, /476/i, /Roman authority/i] }
    ]
  },
  {
    id: "rev-9-5-five-months",
    reference: "Revelation 9:5",
    label: "The fifth trumpet should keep the five months as 150 prophetic years.",
    priority: "critical",
    sourceMarkers: [/Revelation 9:5/i, /five months/i],
    required: [
      { label: "five months", anyOf: [/five months/i] },
      { label: "150 years", anyOf: [/150/i, /one hundred fifty/i] },
      { label: "1299-1449", anyOf: [/1299/i, /1449/i] },
      { label: "Islam/Saracen setting", anyOf: [/Islam/i, /Saracen/i, /Muslim/i] }
    ]
  },
  {
    id: "rev-9-15-ottoman-period",
    reference: "Revelation 9:15",
    label: "The sixth trumpet should retain the Ottoman 391 years and 15 days period.",
    priority: "critical",
    sourceMarkers: [/Revelation 9:15/i, /hour, and a day, and a month, and a year/i],
    required: [
      { label: "Ottoman/Turkish power", anyOf: [/Ottoman/i, /Turkish/i, /Turk/i] },
      { label: "391 years and 15 days", anyOf: [/391/i, /fifteen days/i, /15 days/i] },
      { label: "1449", anyOf: [/1449/i] },
      { label: "August 11, 1840", anyOf: [/August 11,? 1840/i, /1840/i] },
      { label: "Euphrates", anyOf: [/Euphrates/i] }
    ]
  },
  {
    id: "rev-10-2-little-book",
    reference: "Revelation 10:2",
    label: "The little book must be the opened prophetic portions of Daniel.",
    priority: "critical",
    sourceMarkers: [/Revelation 10:2/i, /open book of Daniel/i],
    required: [
      { label: "little book", anyOf: [/little book/i] },
      { label: "Daniel", anyOf: [/Daniel/i] },
      { label: "opened/unsealed", anyOf: [/open/i, /unseal/i] },
      { label: "prophetic time", anyOf: [/time prophe/i, /2,?300/i, /1844/i] }
    ]
  },
  {
    id: "rev-10-6-time-no-longer",
    reference: "Revelation 10:6",
    label: "Time no longer must mean the close of prophetic time after 1844, not the end of mercy.",
    priority: "critical",
    sourceMarkers: [/Revelation 10:6/i, /time no longer/i, /1844/i],
    required: [
      { label: "time no longer", anyOf: [/time no longer/i] },
      { label: "2300-day prophecy", anyOf: [/2,?300/i, /2300/i] },
      { label: "1844", anyOf: [/1844/i] },
      { label: "no new date-setting", anyOf: [/date-setting/i, /no more prophetic time/i, /no fresh date/i] },
      { label: "not close of mercy/end of world", anyOf: [/not.*close of mercy/i, /not.*end of earthly history/i, /not.*end of the world/i] }
    ]
  },
  {
    id: "rev-10-11-prophesy-again",
    reference: "Revelation 10:11",
    label: "Prophesy again must turn disappointment into renewed global mission.",
    priority: "critical",
    sourceMarkers: [/Revelation 10:11/i, /prophesy again/i],
    required: [
      { label: "prophesy again", anyOf: [/prophesy again/i] },
      { label: "disappointment", anyOf: [/disappointment/i, /bitter/i] },
      { label: "global audience", anyOf: [/peoples?, nations?, tongues?, and kings/i, /worldwide/i, /global/i] },
      { label: "three angels/Revelation 14", anyOf: [/three angels/i, /Revelation 14/i] }
    ]
  },
  {
    id: "rev-11-3-two-witnesses",
    reference: "Revelation 11:3",
    label: "The two witnesses must remain the Scriptures testifying through the 1,260 years.",
    priority: "critical",
    sourceMarkers: [/Revelation 11:3/i, /two witnesses/i, /1,260/i],
    required: [
      { label: "two witnesses", anyOf: [/two witnesses/i] },
      { label: "Scripture/Testaments", anyOf: [/Old and New Testaments/i, /Scriptures/i, /Bible/i] },
      { label: "1260 years/days", anyOf: [/1,260/i, /1260/i] },
      { label: "sackcloth", anyOf: [/sackcloth/i] },
      { label: "papal/Dark Ages context", anyOf: [/papal/i, /Dark Ages/i] }
    ]
  },
  {
    id: "rev-11-8-french-revolution",
    reference: "Revelation 11:8",
    label: "The slain witnesses should retain the France/French Revolution application.",
    priority: "critical",
    sourceMarkers: [/Revelation 11:8/i, /French Revolution/i],
    required: [
      { label: "Sodom and Egypt", anyOf: [/Sodom/i, /Egypt/i] },
      { label: "French Revolution/France", anyOf: [/French Revolution/i, /France/i] },
      { label: "atheism or anti-biblical hostility", anyOf: [/atheism/i, /anti-biblical/i, /rejection of biblical/i] },
      { label: "Scripture/Bible attacked", anyOf: [/Scripture/i, /Bible/i] }
    ]
  },
  {
    id: "rev-11-15-seventh-trumpet-sanctuary",
    reference: "Revelation 11:15",
    label: "The seventh trumpet should connect Christ's reign with the sanctuary movement toward final victory.",
    priority: "critical",
    sourceMarkers: [/Revelation 11:15/i, /seventh trumpet/i, /Most Holy Place/i],
    required: [
      { label: "seventh trumpet", anyOf: [/seventh trumpet/i] },
      { label: "kingdom/reign", anyOf: [/kingdom/i, /reign/i] },
      { label: "sanctuary/temple ark", anyOf: [/sanctuary/i, /temple/i, /ark/i] },
      { label: "final judgment/reward", anyOf: [/judgment/i, /reward/i] }
    ]
  },
  {
    id: "rev-12-6-wilderness-1260",
    reference: "Revelation 12:6",
    label: "The woman in the wilderness should retain the 1,260-year preservation and persecution period.",
    priority: "critical",
    sourceMarkers: [/Revelation 12:6/i, /1,260/i],
    required: [
      { label: "woman/church", anyOf: [/woman/i, /church/i, /covenant people/i] },
      { label: "wilderness", anyOf: [/wilderness/i] },
      { label: "1260 years/days", anyOf: [/1,260/i, /1260/i] },
      { label: "538-1798", anyOf: [/538/i, /1798/i] },
      { label: "papal persecution/preservation", anyOf: [/papal/i, /persecution/i, /preservation/i] }
    ]
  },
  {
    id: "rev-12-17-remnant",
    reference: "Revelation 12:17",
    label: "The remnant must be identified by commandments and testimony of Jesus.",
    priority: "critical",
    sourceMarkers: [/Revelation 12:17/i, /commandments of God/i],
    required: [
      { label: "remnant", anyOf: [/remnant/i] },
      { label: "commandments of God", anyOf: [/commandments of God/i] },
      { label: "testimony of Jesus", anyOf: [/testimony of Jesus/i] },
      { label: "final conflict", anyOf: [/final conflict/i, /end-time/i, /last-day/i] }
    ]
  },
  {
    id: "rev-13-5-1260-papal",
    reference: "Revelation 13:5",
    label: "The sea beast must retain the papal 1,260-year framework.",
    priority: "critical",
    sourceMarkers: [/Revelation 13:5/i, /1,260 years/i, /papacy/i],
    required: [
      { label: "papacy/sea beast", anyOf: [/papacy/i, /papal/i, /sea beast/i] },
      { label: "42 months/1260 years", anyOf: [/forty-two months/i, /42 months/i, /1,260/i, /1260/i] },
      { label: "538-1798", anyOf: [/538/i, /1798/i] },
      { label: "blasphemy/persecution", anyOf: [/blasphem/i, /persecution/i, /war against the saints/i] }
    ]
  },
  {
    id: "rev-13-11-earth-beast-us",
    reference: "Revelation 13:11",
    label: "The earth beast should retain the United States application without sensationalism.",
    priority: "critical",
    sourceMarkers: [/Revelation 13:11/i, /United States/i, /earth beast/i],
    required: [
      { label: "earth beast", anyOf: [/earth beast/i] },
      { label: "United States", anyOf: [/United States/i, /\bU\.S\./i] },
      { label: "lamb-like liberty", anyOf: [/lamb-like/i, /liberty/i, /religious freedom/i] },
      { label: "dragon speech/coercion", anyOf: [/dragon/i, /coerc/i, /enforc/i] }
    ]
  },
  {
    id: "rev-13-16-mark-final-crisis",
    reference: "Revelation 13:16",
    label: "The mark must be a final worship-law allegiance crisis, not technology or present condemnation.",
    priority: "critical",
    sourceMarkers: [/Revelation 13:16/i, /mark of the beast/i],
    required: [
      { label: "mark of the beast", anyOf: [/mark of the beast/i, /\bmark\b/i] },
      { label: "worship/allegiance", anyOf: [/worship/i, /allegiance/i] },
      { label: "Sabbath/Creator issue", anyOf: [/Sabbath/i, /Creator/i] },
      { label: "Sunday enforcement", anyOf: [/Sunday/i, /enforced Sunday/i] },
      { label: "final crisis, not present condemnation", anyOf: [/final crisis/i, /not.*present condemnation/i, /sincere.*Sunday/i, /when light.*coerc/i] }
    ],
    forbidden: [
      { label: "technology-only mark", anyOf: [/merely technology/i, /microchip/i, /barcode/i] }
    ]
  },
  {
    id: "rev-13-18-666",
    reference: "Revelation 13:18",
    label: "666 must be handled as beast authority, name/character, and human counterfeit worship.",
    priority: "critical",
    sourceMarkers: [/Revelation 13:18/i, /number of his name/i],
    required: [
      { label: "666", anyOf: [/666/i, /six hundred/i] },
      { label: "name/character", anyOf: [/name/i, /character/i] },
      { label: "human authority/counterfeit", anyOf: [/human authority/i, /counterfeit/i, /man'?s number/i] },
      { label: "beast worship", anyOf: [/beast/i, /worship/i] }
    ]
  },
  {
    id: "rev-14-6-everlasting-gospel",
    reference: "Revelation 14:6",
    label: "The first angel must begin with the everlasting gospel and worldwide mission.",
    priority: "critical",
    sourceMarkers: [/Revelation 14:6/i, /everlasting gospel/i],
    required: [
      { label: "everlasting gospel", anyOf: [/everlasting gospel/i] },
      { label: "worldwide mission", anyOf: [/every nation/i, /worldwide/i, /global/i] },
      { label: "judgment/three angels setting", anyOf: [/judgment/i, /three angels/i, /Revelation 14/i] }
    ]
  },
  {
    id: "rev-14-7-creator-sabbath-judgment",
    reference: "Revelation 14:7",
    label: "The first angel's worship call must connect judgment, Creator worship, and Sabbath.",
    priority: "critical",
    sourceMarkers: [/Revelation 14:7/i, /worship him that made/i],
    required: [
      { label: "judgment hour", anyOf: [/judgment hour/i, /hour of His judgment/i] },
      { label: "Creator worship", anyOf: [/Creator worship/i, /worship.*Creator/i, /made heaven/i] },
      { label: "Sabbath/Exodus 20", anyOf: [/Sabbath/i, /Exodus 20/i] }
    ]
  },
  {
    id: "rev-14-12-patience-commandments-faith",
    reference: "Revelation 14:12",
    label: "The final saints must be described by patience, commandments, and faith of Jesus.",
    priority: "critical",
    sourceMarkers: [/Revelation 14:12/i, /patience of the saints/i],
    required: [
      { label: "patience of the saints", anyOf: [/patience of the saints/i] },
      { label: "commandments of God", anyOf: [/commandments of God/i] },
      { label: "faith of Jesus", anyOf: [/faith of Jesus/i] },
      { label: "endurance under pressure", anyOf: [/endurance/i, /pressure/i] }
    ]
  },
  {
    id: "rev-15-8-close-probation",
    reference: "Revelation 15:8",
    label: "The smoke-filled temple must preserve the close-of-probation setting.",
    priority: "critical",
    sourceMarkers: [/Revelation 15:8/i, /no man was able to enter/i],
    required: [
      { label: "temple filled with smoke", anyOf: [/smoke/i, /temple/i] },
      { label: "no one entering", anyOf: [/no one enter/i, /no man.*enter/i] },
      { label: "close of probation", anyOf: [/close of probation/i, /probation.*closed/i] },
      { label: "seven last plagues", anyOf: [/seven last plagues/i, /plagues/i] }
    ]
  },
  {
    id: "rev-16-1-final-plagues",
    reference: "Revelation 16:1",
    label: "The bowls must be final judgments after mercy closes, proceeding from the temple.",
    priority: "critical",
    sourceMarkers: [/Revelation 16:1/i, /seven last plagues/i],
    required: [
      { label: "voice from temple", anyOf: [/voice.*temple/i, /from the temple/i] },
      { label: "seven bowls/plagues", anyOf: [/seven bowls/i, /seven vials/i, /plagues/i] },
      { label: "final wrath after mercy/probation", anyOf: [/final wrath/i, /mercy.*closed/i, /after mercy/i, /probation/i] }
    ]
  },
  {
    id: "rev-16-15-watch-garments",
    reference: "Revelation 16:15",
    label: "The sixth-plague beatitude must call for watchfulness and garments, not a secret coming.",
    priority: "critical",
    sourceMarkers: [/Revelation 16:15/i, /watcheth/i],
    required: [
      { label: "thief/readiness", anyOf: [/thief/i, /readiness/i] },
      { label: "watch", anyOf: [/watch/i] },
      { label: "garments/righteousness", anyOf: [/garments/i, /righteousness/i] },
      { label: "not secret", anyOf: [/not.*secret/i, /not.*invisible/i, /public/i] }
    ]
  },
  {
    id: "rev-16-16-armageddon",
    reference: "Revelation 16:16",
    label: "Armageddon must be the final worship/allegiance conflict, not a regional battle map.",
    priority: "critical",
    sourceMarkers: [/Revelation 16:16/i, /Armageddon/i],
    required: [
      { label: "Armageddon", anyOf: [/Armageddon/i] },
      { label: "worship/allegiance", anyOf: [/worship/i, /allegiance/i] },
      { label: "not merely regional", anyOf: [/not.*regional/i, /not.*literal valley/i, /not.*military map/i] },
      { label: "war against Lamb", anyOf: [/war against the Lamb/i, /powers.*Lamb/i, /Lamb/i] }
    ]
  },
  {
    id: "rev-17-5-babylon-system",
    reference: "Revelation 17:5",
    label: "Babylon must be more than ancient Rome: counterfeit worship and religious-political union.",
    priority: "critical",
    sourceMarkers: [/Revelation 17:5/i, /Mystery Babylon/i],
    required: [
      { label: "Mystery Babylon", anyOf: [/Mystery/i, /Babylon/i] },
      { label: "false/counterfeit worship", anyOf: [/false worship/i, /counterfeit worship/i, /spiritual confusion/i] },
      { label: "religious-political union", anyOf: [/religious-political/i, /church-state/i, /political.*religious/i] },
      { label: "mother/source apostasy", anyOf: [/mother/i, /harlots/i, /apostasy/i] }
    ]
  },
  {
    id: "rev-18-4-come-out",
    reference: "Revelation 18:4",
    label: "The final call must recognize God's sincere people in Babylon.",
    priority: "critical",
    sourceMarkers: [/Revelation 18:4/i, /Come out of her/i],
    required: [
      { label: "come out", anyOf: [/come out/i] },
      { label: "my people", anyOf: [/my people/i] },
      { label: "sincere people in Babylon", anyOf: [/sincere/i, /God.*people.*Babylon/i, /within Babylon/i] },
      { label: "avoid sins/plagues", anyOf: [/sins/i, /plagues/i] }
    ]
  },
  {
    id: "rev-19-10-testimony-prophecy",
    reference: "Revelation 19:10",
    label: "The testimony of Jesus must be tied to prophecy and worshiping God alone.",
    priority: "critical",
    sourceMarkers: [/Revelation 19:10/i, /spirit of prophecy/i],
    required: [
      { label: "worship God", anyOf: [/worship God/i] },
      { label: "testimony of Jesus", anyOf: [/testimony of Jesus/i] },
      { label: "spirit of prophecy", anyOf: [/spirit of prophecy/i] },
      { label: "prophetic witness", anyOf: [/prophetic witness/i, /prophecy/i] }
    ]
  },
  {
    id: "rev-19-11-visible-return",
    reference: "Revelation 19:11",
    label: "Christ's return must be visible, decisive, righteous, and victorious.",
    priority: "critical",
    sourceMarkers: [/Revelation 19:11/i, /white horse/i],
    required: [
      { label: "heaven opened/white horse", anyOf: [/heaven opened/i, /white horse/i] },
      { label: "Faithful and True", anyOf: [/Faithful and True/i] },
      { label: "visible/public return", anyOf: [/visible/i, /public/i, /not.*secret/i] },
      { label: "righteous judgment/war", anyOf: [/righteous/i, /judgment/i, /war/i] }
    ]
  },
  {
    id: "rev-20-1-millennium-after-return",
    reference: "Revelation 20:1",
    label: "The millennium must follow Christ's visible return with Satan bound on a desolated earth.",
    priority: "critical",
    sourceMarkers: [/Revelation 20:1/i, /thousand years/i],
    required: [
      { label: "after Revelation 19/return", anyOf: [/after Christ'?s visible return/i, /after Revelation 19/i, /public victory/i] },
      { label: "thousand years", anyOf: [/thousand years/i, /millennium/i] },
      { label: "Satan bound/restrained", anyOf: [/Satan.*bound/i, /restrain/i, /chain/i] },
      { label: "desolated earth/abyss", anyOf: [/desolated earth/i, /abyss/i, /bottomless pit/i] },
      { label: "no nations to deceive", anyOf: [/no nations.*deceive/i, /no.*left to deceive/i, /deceive.*no one/i] }
    ]
  },
  {
    id: "rev-20-4-judgment-review",
    reference: "Revelation 20:4",
    label: "The saints' reign must include judgment review with Christ.",
    priority: "critical",
    sourceMarkers: [/Revelation 20:4/i, /judgment was given/i],
    required: [
      { label: "thrones", anyOf: [/thrones/i] },
      { label: "judgment review", anyOf: [/judgment review/i, /review/i] },
      { label: "reign with Christ", anyOf: [/reign with Christ/i, /reigned with Christ/i] },
      { label: "beast/mark overcomers", anyOf: [/beast/i, /mark/i] }
    ]
  },
  {
    id: "rev-20-14-second-death",
    reference: "Revelation 20:14",
    label: "The lake of fire must be the second death and final destruction of sin.",
    priority: "critical",
    sourceMarkers: [/Revelation 20:14/i, /second death/i],
    required: [
      { label: "lake of fire", anyOf: [/lake of fire/i] },
      { label: "second death", anyOf: [/second death/i] },
      { label: "final destruction/end of sin", anyOf: [/final destruction/i, /end of sin/i, /death itself is judged/i] },
      { label: "not eternal preservation of rebellion", anyOf: [/not.*eternal preservation/i, /not.*immortalizing/i, /not.*undying kingdom/i] }
    ]
  },
  {
    id: "rev-21-3-god-dwells",
    reference: "Revelation 21:3",
    label: "New creation must center on God dwelling with His people.",
    priority: "important",
    sourceMarkers: [/Revelation 21:3/i, /tabernacle of God/i],
    required: [
      { label: "tabernacle/dwelling", anyOf: [/tabernacle/i, /dwell/i] },
      { label: "God with His people", anyOf: [/God.*people/i, /with His people/i] },
      { label: "restoration", anyOf: [/restoration/i, /new creation/i, /renewed/i] }
    ]
  },
  {
    id: "rev-21-22-no-temple",
    reference: "Revelation 21:22",
    label: "The temple-less city must be the fulfillment of sanctuary hope in God and the Lamb.",
    priority: "important",
    sourceMarkers: [/Revelation 21:22/i, /no temple/i],
    required: [
      { label: "no temple", anyOf: [/no temple/i] },
      { label: "God and Lamb as temple", anyOf: [/God and the Lamb.*temple/i, /Lord God.*Lamb.*temple/i] },
      { label: "sanctuary fulfillment", anyOf: [/sanctuary.*fulfill/i, /fulfilled sanctuary/i, /direct presence/i] }
    ]
  },
  {
    id: "rev-22-14-commandments-tree",
    reference: "Revelation 22:14",
    label: "The final blessing must connect commandments, tree of life, and city gates.",
    priority: "critical",
    sourceMarkers: [/Revelation 22:14/i, /commandments/i],
    required: [
      { label: "commandments", anyOf: [/commandments/i] },
      { label: "tree of life", anyOf: [/tree of life/i] },
      { label: "gates/city", anyOf: [/gates/i, /city/i] },
      { label: "blessing", anyOf: [/blessing/i, /blessed/i] }
    ]
  },
  {
    id: "rev-22-17-final-invitation",
    reference: "Revelation 22:17",
    label: "The ending must be hopeful and urgent: Spirit, bride, come, and free water of life.",
    priority: "critical",
    sourceMarkers: [/Revelation 22:17/i, /Spirit and the bride/i],
    required: [
      { label: "Spirit and bride", anyOf: [/Spirit and the bride/i] },
      { label: "come", anyOf: [/\bcome\b/i] },
      { label: "thirsty", anyOf: [/thirst/i] },
      { label: "water of life freely", anyOf: [/water of life/i, /freely/i] },
      { label: "final invitation", anyOf: [/final invitation/i, /invitation/i] }
    ]
  }
];

function normalize(text: string) {
  return text.replace(/\u0000/g, "").replace(/\s+/g, " ").trim();
}

function matches(text: string, matcher: TermMatcher) {
  if (typeof matcher === "string") return text.toLowerCase().includes(matcher.toLowerCase());
  return matcher.test(text);
}

function readJson(path: string) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function chapterPath(chapter: number) {
  return join(contentRoot, `chapter-${String(chapter).padStart(2, "0")}.json`);
}

function parseReference(reference: string) {
  const match = /^Revelation\s+(\d+):(\d+)$/i.exec(reference);
  if (!match) throw new Error(`Unsupported reference: ${reference}`);
  return { chapter: Number(match[1]), verse: Number(match[2]) };
}

function publicTextForVerse(reference: string) {
  const { chapter } = parseReference(reference);
  const content = readJson(chapterPath(chapter));
  const verse = content.verses.find((entry: { verse: string }) => entry.verse === reference);
  if (!verse) throw new Error(`Missing ${reference}`);
  const commentary = verse.commentary ?? {};
  const fields = [
    content.title,
    content.summary,
    content.historicalContext,
    content.literaryContext,
    ...(content.themes ?? []),
    ...(content.outline ?? []).flatMap((item: { range?: string; title?: string; summary?: string }) => [
      item.range,
      item.title,
      item.summary
    ]),
    verse.bibleText,
    verse.explanation,
    verse.historicalBackground,
    verse.symbolicMeaning,
    verse.adventistInsight,
    verse.propheticSignificance,
    verse.application,
    commentary.detailedExplanation,
    commentary.exegesis,
    commentary.historicalBackground,
    commentary.technicalNotes,
    commentary.adventistPropheticInsight,
    commentary.propheticTimeline,
    commentary.otherCommentaryInsights,
    commentary.application,
    ...(verse.wordNotes ?? []).flatMap((note: { term?: string; explanation?: string; scriptureReferences?: string[] }) => [
      note.term,
      note.explanation,
      ...(note.scriptureReferences ?? [])
    ]),
    ...(verse.crossReferences ?? []).flatMap((reference: { reference?: string; connection?: string }) => [
      reference.reference,
      reference.connection
    ])
  ];
  return normalize(fields.filter(Boolean).join(" "));
}

function publicTextForAllChapters() {
  const fields: string[] = [];
  for (const file of readdirSync(contentRoot).filter((name) => /^chapter-\d+\.json$/.test(name))) {
    const content = readJson(join(contentRoot, file));
    fields.push(
      content.title,
      content.summary,
      content.historicalContext,
      content.literaryContext,
      ...(content.themes ?? []),
      ...(content.outline ?? []).flatMap((item: { range?: string; title?: string; summary?: string }) => [
        item.range,
        item.title,
        item.summary
      ])
    );
    for (const verse of content.verses ?? []) {
      const commentary = verse.commentary ?? {};
      fields.push(
        verse.bibleText,
        verse.explanation,
        verse.historicalBackground,
        verse.symbolicMeaning,
        verse.adventistInsight,
        verse.propheticSignificance,
        verse.application,
        commentary.detailedExplanation,
        commentary.exegesis,
        commentary.historicalBackground,
        commentary.technicalNotes,
        commentary.adventistPropheticInsight,
        commentary.propheticTimeline,
        commentary.otherCommentaryInsights,
        commentary.application,
        ...(verse.wordNotes ?? []).flatMap((note: { term?: string; explanation?: string; scriptureReferences?: string[] }) => [
          note.term,
          note.explanation,
          ...(note.scriptureReferences ?? [])
        ])
      );
    }
  }
  return normalize(fields.filter(Boolean).join(" "));
}

function auditSourcesForVerse(reference: string) {
  const { chapter } = parseReference(reference);
  const content = readJson(chapterPath(chapter));
  const verse = content.verses.find((entry: { verse: string }) => entry.verse === reference);
  if (!verse) return [];
  return Object.values(verse.sourceAudit ?? {})
    .flat()
    .map((source: unknown) => (source as { sourceId?: string }).sourceId)
    .filter(Boolean);
}

function loadSourceSupportText() {
  const chunks: string[] = [];
  if (existsSync(sourceIndexPath)) {
    const source = readJson(sourceIndexPath).sources?.[sourceId];
    for (const hit of source?.hits ?? []) {
      chunks.push(hit.marker, ...(hit.references ?? []), hit.snippet);
    }
  }
  if (existsSync(sourceSectionsPath)) {
    const lines = readFileSync(sourceSectionsPath, "utf8").trim().split(/\n+/).filter(Boolean);
    for (const line of lines) {
      const section = JSON.parse(line);
      if (section.sourceId === sourceId) {
        chunks.push(...(section.references ?? []), ...(section.markers ?? []), section.text);
      }
    }
  }
  return normalize(chunks.filter(Boolean).join(" "));
}

const sourceSupportText = loadSourceSupportText();

const exactSourceReferenceText = new Map<string, string[]>();
if (existsSync(sourceIndexPath)) {
  const source = readJson(sourceIndexPath).sources?.[sourceId];
  for (const hit of source?.hits ?? []) {
    if (/^Revelation \d+:\d+$/i.test(hit.marker ?? "")) {
      const current = exactSourceReferenceText.get(hit.marker) ?? [];
      current.push(hit.snippet ?? "");
      exactSourceReferenceText.set(hit.marker, current);
    }
  }
}

function readAllChapters() {
  return readdirSync(contentRoot)
    .filter((name) => /^chapter-\d+\.json$/.test(name))
    .sort()
    .map((file) => readJson(join(contentRoot, file)) as ChapterRecord);
}

function commentaryFieldsForVerse(verse: VerseRecord) {
  const commentary = verse.commentary ?? {};
  return [
    verse.explanation,
    verse.historicalBackground,
    verse.symbolicMeaning,
    verse.adventistInsight,
    verse.propheticSignificance,
    verse.application,
    commentary.detailedExplanation,
    commentary.exegesis,
    commentary.historicalBackground,
    commentary.technicalNotes,
    commentary.adventistPropheticInsight,
    commentary.propheticTimeline,
    commentary.otherCommentaryInsights,
    commentary.application,
    ...(verse.wordNotes ?? []).flatMap((note) => [
      note.term,
      note.explanation,
      ...(note.scriptureReferences ?? [])
    ]),
    ...(verse.crossReferences ?? []).flatMap((reference) => [
      reference.reference,
      reference.connection
    ])
  ];
}

function verseOnlyPublicText(verse: VerseRecord) {
  return normalize(commentaryFieldsForVerse(verse).filter(Boolean).join(" "));
}

function chapterPublicText(content: ChapterRecord) {
  const teachingNotes = content.teachingNotes ?? {};
  const evangelisticNotes = content.evangelisticNotes ?? {};
  return normalize([
    content.title,
    content.summary,
    content.historicalContext,
    content.literaryContext,
    ...(content.themes ?? []),
    ...(content.outline ?? []).flatMap((item) => [item.range, item.title, item.summary]),
    ...Object.values(teachingNotes).flat(),
    ...Object.values(evangelisticNotes).flat(),
    ...content.verses.flatMap((verse) => commentaryFieldsForVerse(verse))
  ].filter(Boolean).join(" "));
}

const sourceSections = existsSync(sourceSectionsPath)
  ? readFileSync(sourceSectionsPath, "utf8")
      .trim()
      .split(/\n+/)
      .filter(Boolean)
      .map((line) => JSON.parse(line) as SourceSection)
      .filter((section) => section.sourceId === sourceId)
  : [];

const sourceSectionsByReference = new Map<string, SourceSection[]>();
for (const section of sourceSections) {
  for (const reference of section.markers ?? []) {
    if (/^Revelation \d+:\d+$/.test(reference)) {
      const current = sourceSectionsByReference.get(reference) ?? [];
      current.push(section);
      sourceSectionsByReference.set(reference, current);
    }
  }
}

function sourceTextForReference(reference: string) {
  const directSections = sourceSectionsByReference.get(reference) ?? [];
  const directHits = exactSourceReferenceText.get(reference) ?? [];
  return normalize([...directHits, ...directSections.map((section) => section.text ?? "")].join(" "));
}

function extractSourceTermLabels(text: string, chapter: number) {
  return sourceTerms
    .filter((term) => !term.chapters || term.chapters.includes(chapter))
    .filter((term) => term.aliases.some((alias) => matches(text, alias)))
    .map((term) => term.label);
}

function auditSourceAlignment(reference: string, verse: VerseRecord): GenericResult {
  const { chapter } = parseReference(reference);
  const sourceText = sourceTextForReference(reference);
  const directSourceReference = exactSourceReferenceText.has(reference) || Boolean(sourceSectionsByReference.get(reference)?.length);
  const labels = Array.from(new Set(extractSourceTermLabels(sourceText, chapter)));
  const publicText = verseOnlyPublicText(verse);
  const presentLabels = labels.filter((label) => {
    const term = sourceTerms.find((candidate) => candidate.label === label);
    return term ? term.aliases.some((alias) => matches(publicText, alias)) : false;
  });
  return {
    id: `${reference.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-source-alignment`,
    reference,
    label: directSourceReference
      ? `Direct indexed McNulty/source marker present; controlled public overlap ${presentLabels.length}/${labels.length}.`
      : "No direct verse reference in the McNulty index; rely on chapter-level theological frame.",
    priority: directSourceReference ? "critical" : "important",
    kind: "source-alignment",
    status: directSourceReference ? "ok" : "weak",
    missing: [],
    conflicts: [],
    sourceSupportFound: directSourceReference
  };
}

const textualSymbolTerms: Array<{ label: string; bible: TermMatcher[]; public: TermMatcher[] }> = [
  { label: "Lamb", bible: [/\bLamb\b/i], public: [/\bLamb\b/i] },
  { label: "beast", bible: [/\bbeast\b/i], public: [/\bbeast\b/i] },
  { label: "dragon", bible: [/\bdragon\b/i], public: [/\bdragon\b/i] },
  { label: "seal/sealing", bible: [/\bseal/i], public: [/\bseal/i] },
  { label: "trumpet", bible: [/\btrumpet/i], public: [/\btrumpet/i] },
  { label: "mark", bible: [/\bmark\b/i], public: [/\bmark\b/i] },
  { label: "Babylon", bible: [/\bBabylon\b/i], public: [/\bBabylon\b/i] },
  { label: "woman", bible: [/\bwoman\b/i], public: [/\bwoman\b/i] },
  { label: "witnesses", bible: [/\bwitnesses\b/i], public: [/\bwitnesses\b/i] },
  { label: "temple", bible: [/\btemple\b/i], public: [/\btemple\b/i] },
  { label: "altar", bible: [/\baltar\b/i], public: [/\baltar\b/i] },
  { label: "incense", bible: [/\bincense\b/i], public: [/\bincense\b/i] },
  { label: "Euphrates", bible: [/\bEuphrates\b/i], public: [/\bEuphrates\b/i] },
  { label: "Armageddon", bible: [/\bArmageddon\b/i], public: [/\bArmageddon\b/i] },
  { label: "144,000", bible: [/hundred forty and four thousand/i, /144,?000/i], public: [/144,?000/i, /hundred forty and four thousand/i] },
  { label: "bottomless pit", bible: [/bottomless pit/i], public: [/bottomless pit/i, /\babyss\b/i] },
  { label: "lake of fire", bible: [/lake of fire/i], public: [/lake of fire/i] },
  { label: "second death", bible: [/second death/i], public: [/second death/i] },
  { label: "New Jerusalem", bible: [/new Jerusalem/i], public: [/New Jerusalem/i] },
  { label: "tree of life", bible: [/tree of life/i], public: [/tree of life/i] },
  { label: "water of life", bible: [/water of life/i], public: [/water of life/i] },
  { label: "book of life", bible: [/book of life/i], public: [/book of life/i] },
  { label: "commandments", bible: [/commandments/i], public: [/commandments/i] },
  { label: "testimony of Jesus", bible: [/testimony of Jesus/i], public: [/testimony of Jesus/i] }
];

function auditVerseFoundation(reference: string, verse: VerseRecord): GenericResult {
  const publicText = verseOnlyPublicText(verse);
  const bibleText = verse.bibleText ?? "";
  const missing: string[] = [];
  const conflicts: string[] = [];
  const auditSources = auditSourcesForVerse(reference);

  if (!auditSources.includes(sourceId)) missing.push("hidden McNulty sourceAudit");
  if (!(verse.wordNotes ?? []).length) missing.push("wordNotes for textual terms");
  for (const note of verse.wordNotes ?? []) {
    if (!note.term?.trim()) missing.push("wordNote term");
    if (!note.explanation || note.explanation.trim().split(/\s+/).length < 3) {
      missing.push(`substantive wordNote explanation for ${note.term ?? "unnamed term"}`);
    }
    if (!note.scriptureReferences?.length) {
      missing.push(`Scripture references for wordNote ${note.term ?? "unnamed term"}`);
    }
  }
  if ((verse.crossReferences ?? []).length < 4) missing.push("at least four cross references");
  for (const layer of [
    "detailedExplanation",
    "exegesis",
    "historicalBackground",
    "technicalNotes",
    "adventistPropheticInsight",
    "propheticTimeline",
    "otherCommentaryInsights",
    "application"
  ]) {
    const value = verse.commentary?.[layer];
    if (typeof value !== "string" || !value.trim()) missing.push(`commentary layer ${layer}`);
  }
  for (const term of textualSymbolTerms) {
    if (term.bible.some((matcher) => matches(bibleText, matcher)) && !term.public.some((matcher) => matches(publicText, matcher))) {
      missing.push(`public explanation of textual term ${term.label}`);
    }
  }
  for (const phrase of publicSourceLeakTerms) {
    if (publicText.includes(phrase)) conflicts.push(`public source/audit leak: ${phrase}`);
  }
  for (const pattern of [
    /mark of the beast.*microchip/i,
    /secret rapture.*Revelation teaches/i,
    /millennium.*before Christ'?s visible return/i,
    /half an hour.*should not be given prophetic meaning/i
  ]) {
    if (matches(publicText, pattern)) conflicts.push(`theological contradiction: ${pattern}`);
  }

  return {
    id: `${reference.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-foundation`,
    reference,
    label: "Every verse must explain its main textual terms, preserve hidden source accountability, and avoid theological/source-language conflicts.",
    priority: "critical",
    kind: "verse-foundation",
    status: conflicts.length ? "conflict" : missing.length ? "missing" : "ok",
    missing: Array.from(new Set(missing)),
    conflicts,
    sourceSupportFound: true
  };
}

function auditChapterFrame(content: ChapterRecord): GenericResult {
  const claim = chapterFrameClaims.find((item) => item.chapter === content.chapterNumber);
  if (!claim) {
    return {
      id: `revelation-${content.chapterNumber}-chapter-frame`,
      reference: `Revelation ${content.chapterNumber}`,
      label: "Chapter-level theological frame exists.",
      priority: "important",
      kind: "chapter-frame",
      status: "weak",
      missing: ["chapter frame claim"],
      conflicts: [],
      sourceSupportFound: false
    };
  }
  const text = chapterPublicText(content);
  const missing = claim.required
    .filter((matcher) => !matches(text, matcher))
    .map((matcher) => matcher.toString());
  return {
    id: `revelation-${content.chapterNumber}-chapter-frame`,
    reference: `Revelation ${content.chapterNumber}`,
    label: claim.label,
    priority: "critical",
    kind: "chapter-frame",
    status: missing.length ? "missing" : "ok",
    missing,
    conflicts: [],
    sourceSupportFound: true
  };
}

function sourceHasSupport(claim: Claim) {
  return claim.sourceMarkers.some((marker) => matches(sourceSupportText, marker));
}

function auditClaim(claim: Claim): AuditResult {
  const publicText = publicTextForVerse(claim.reference);
  const missing = claim.required
    .filter((group) => !group.anyOf.some((matcher) => matches(publicText, matcher)))
    .map((group) => group.label);
  const conflicts = (claim.forbidden ?? [])
    .filter((group) => group.anyOf.some((matcher) => matches(publicText, matcher)))
    .map((group) => group.label);
  const sourceSupportFound = sourceHasSupport(claim);
  const auditSources = auditSourcesForVerse(claim.reference);
  if (!auditSources.includes(sourceId)) missing.push("hidden McNulty sourceAudit");
  if (conflicts.length) return { claim, status: "conflict", missing, conflicts, sourceSupportFound };
  if (missing.length) return { claim, status: "missing", missing, conflicts, sourceSupportFound };
  if (!sourceSupportFound) return { claim, status: "weak", missing, conflicts, sourceSupportFound };
  return { claim, status: "ok", missing, conflicts, sourceSupportFound };
}

function main() {
  const chapters = readAllChapters();
  const verseCount = chapters.reduce((sum, chapter) => sum + chapter.verses.length, 0);
  const allPublicText = publicTextForAllChapters();
  const sourceLeaks = publicSourceLeakTerms.filter((term) => allPublicText.includes(term));
  const verseResults: GenericResult[] = chapters.flatMap((chapter) =>
    chapter.verses.flatMap((verse) => [
      auditVerseFoundation(verse.verse, verse),
      auditSourceAlignment(verse.verse, verse)
    ])
  );
  const chapterResults = chapters.map(auditChapterFrame);
  const specificResults: GenericResult[] = claims.map((claim) => {
    const result = auditClaim(claim);
    return {
      id: claim.id,
      reference: claim.reference,
      label: claim.label,
      priority: claim.priority,
      kind: "specific-claim",
      status: result.status,
      missing: result.missing,
      conflicts: result.conflicts,
      sourceSupportFound: result.sourceSupportFound
    };
  });
  const results = [...verseResults, ...chapterResults, ...specificResults];
  const failures = results.filter((result) => result.status === "missing" || result.status === "conflict");
  const criticalFailures = failures.filter((result) => result.priority === "critical");
  const importantFailures = failures.filter((result) => result.priority === "important");
  const weak = results.filter((result) => result.status === "weak");

  console.log("McNulty theological audit");
  console.log(`Total verses checked: ${verseCount}`);
  console.log(`Verse claims checked: ${verseResults.length}`);
  console.log(`Chapter frame claims checked: ${chapterResults.length}`);
  console.log(`Specific high-risk claims checked: ${specificResults.length}`);
  console.log(`Total claims checked: ${results.length}`);
  console.log(`OK: ${results.filter((result) => result.status === "ok").length}`);
  console.log(`Weak: ${weak.length}`);
  console.log(`Missing: ${results.filter((result) => result.status === "missing").length}`);
  console.log(`Conflict: ${results.filter((result) => result.status === "conflict").length}`);
  console.log(`Important misses/conflicts: ${importantFailures.length}`);
  console.log(`Critical misses/conflicts: ${criticalFailures.length}`);
  console.log(`Public source leaks: ${sourceLeaks.length}`);

  const visibleWeakLimit = process.env.SHOW_WEAK === "1" ? weak.length : 12;
  const visibleWeak = weak.slice(0, visibleWeakLimit);
  const nonWeakIssues = results.filter((result) => result.status !== "ok" && result.status !== "weak");

  for (const result of [...nonWeakIssues, ...visibleWeak]) {
    console.log(`\n[${result.status.toUpperCase()}] ${result.reference} ${result.id} (${result.kind})`);
    console.log(`  ${result.label}`);
    if (result.missing.length) console.log(`  Missing: ${result.missing.join(", ")}`);
    if (result.conflicts.length) console.log(`  Conflicts: ${result.conflicts.join(", ")}`);
    if (!result.sourceSupportFound) console.log("  Source support marker was not found in the local McNulty index.");
  }

  if (weak.length > visibleWeak.length) {
    console.log(
      `\n${weak.length - visibleWeak.length} additional weak source-alignment notes hidden. Set SHOW_WEAK=1 to print all weak notes.`
    );
  }

  if (sourceLeaks.length) {
    console.log("\n[CONFLICT] Public source names or audit language leaked into Revelation public text:");
    for (const leak of sourceLeaks) console.log(`  - ${leak}`);
  }

  if (failures.length || sourceLeaks.length) {
    process.exitCode = 1;
  }
}

main();
