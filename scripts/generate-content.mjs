import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const kjv = JSON.parse(readFileSync("/private/tmp/revelation-kjv.json", "utf8"));

const sourceIds = {
  amazingNotes: "amazing-facts-afcoe-notes",
  amazingVerse: "amazing-facts-revelation-verse-by-verse",
  finalWarning: "amazing-facts-earths-final-warning",
  maxwell: "maxwell-god-cares-vol-2",
  stefanovic: "stefanovic-revelation-of-jesus-christ",
  doukhan: "doukhan-secrets-of-revelation",
  strand: "strand-interpreting-revelation",
  wilson: "wilson-let-daniel-and-revelation-speak",
  bohr: "bohr-great-prophecies",
  cox: "cox-revelation-pure-and-simple",
  frazee: "frazee-messages-from-revelation",
  pate: "pate-four-views",
  beale: "beale-book-of-revelation",
  bauckham: "bauckham-theology-revelation",
  desilva: "desilva-discovering-revelation"
};

const resources = [
  ["Amazing Facts - AFCOE - Prophecy - Revelation Commentary Notes Final", "Jean Ross / Amazing Facts", "Official Adventist study notes", "Adventist", "Adventist historicist", "Primary seed source for chapter outlines, Daniel-Revelation links, historicist prophecy notes, and evangelistic teaching flow.", sourceIds.amazingNotes],
  ["Revelation Verse By Verse", "Amazing Facts Inc.", "Devotional commentary", "Adventist", "Adventist historicist", "Primary seed source for verse-level devotional and teaching notes; page locators need manual review.", sourceIds.amazingVerse],
  ["Earth's Final Warning: The Three Angels Of Revelation", "Amazing Facts Inc.", "Evangelistic magazine/booklet", "Adventist", "Adventist historicist", "Used for Revelation 14, worship, judgment-hour, Babylon, and mark-of-the-beast study tools.", sourceIds.finalWarning],
  ["God Cares (vol. 2): The Message of Revelation For You and Your Family", "C. Mervyn Maxwell", "Commentary", "Adventist", "Adventist historicist", "Used for Christ-centered exposition, chapter summaries, sanctuary themes, and pastoral application.", sourceIds.maxwell],
  ["Revelation of Jesus Christ: Commentary on the Book of Revelation", "Ranko Stefanovic", "Academic commentary", "Adventist", "Adventist historicist / exegetical", "Used for literary context, structural framing, symbolism, sanctuary imagery, and careful Adventist exegesis.", sourceIds.stefanovic],
  ["Secrets of Revelation: The Apocalypse Through Hebrew Eyes", "Jacques B. Doukhan", "Commentary", "Adventist", "Adventist historicist / canonical", "Used for Hebrew Bible background, Daniel links, worship themes, and symbolic structure.", sourceIds.doukhan],
  ["Interpreting the Book of Revelation: Hermeneutical Guidelines", "Kenneth A. Strand", "Hermeneutics monograph", "Adventist", "Adventist historicist", "Used for hermeneutical guardrails, literary structure, and responsible interpretation.", sourceIds.strand],
  ["Let Daniel and Revelation Speak", "David Emerson Wilson", "Bible prophecy commentary", "Adventist", "Adventist historicist", "Used for Daniel-Revelation comparisons and prophecy sequencing; locators need review.", sourceIds.wilson],
  ["The Great Prophecies of Daniel & Revelation", "Stephen Bohr", "Bible prophecy notes", "Adventist", "Adventist historicist", "Used for Daniel 7/Revelation 13 links, Babylon, beasts, and prophetic time-period notes.", sourceIds.bohr],
  ["Revelation Pure And Simple", "Kenneth Cox", "Evangelistic commentary", "Adventist", "Adventist historicist", "Used for plain-language summaries and teaching applications.", sourceIds.cox],
  ["Messages from Revelation, 16-part series", "W. D. Frazee", "Sermon/study series", "Adventist", "Devotional / Adventist historicist", "Used for pastoral appeals, worship emphasis, and final-generation themes where matched by chapter.", sourceIds.frazee],
  ["Four Views on the Book of Revelation", "C. Marvin Pate, ed.", "Comparative views", "Non-Adventist", "Comparative", "Used only to summarize differences among preterist, futurist, idealist, and historicist readings.", sourceIds.pate],
  ["The Book of Revelation", "G. K. Beale", "Academic commentary", "Non-Adventist", "Idealist / eclectic academic", "Used for Old Testament allusion awareness and comparison notes, not as the primary prophecy framework.", sourceIds.beale],
  ["The Theology of the Book of Revelation", "Richard Bauckham", "Academic theology", "Non-Adventist", "Academic", "Used for worship, empire, testimony, and theological background comparison.", sourceIds.bauckham],
  ["Discovering Revelation: Content, Interpretation, Reception", "David A. deSilva", "Academic introduction", "Non-Adventist", "Academic / historical", "Used for historical background and reception-history comparison.", sourceIds.desilva]
].map(([title, author, type, tradition, category, usage, id]) => ({
  id,
  title,
  author,
  type,
  tradition,
  interpretiveCategory: category,
  howUsed: usage,
  citationFormat: `${author}, ${title}, locator to be verified from uploaded PDF.`
}));

const chapterMeta = {
  1: { title: "The Revelation of Jesus Christ", section: "Prologue", themes: ["Jesus Christ", "Testimony", "Lampstands", "Prophecy blessing"], symbols: ["lampstands", "stars", "Son of Man"], daniel: "Daniel 7's Son of Man imagery stands behind John's vision of the glorified Christ." },
  2: { title: "Messages to Ephesus, Smyrna, Pergamos, and Thyatira", section: "Seven churches", themes: ["Overcoming", "Faithfulness", "Church history", "Persecution"], symbols: ["lampstands", "tree of life", "manna", "Jezebel"], daniel: "The call to faithfulness under pressure echoes Daniel's witness in empire." },
  3: { title: "Messages to Sardis, Philadelphia, and Laodicea", section: "Seven churches", themes: ["Watchfulness", "Open door", "Laodicea", "Overcoming"], symbols: ["white garments", "key of David", "door", "throne"], daniel: "The open-door and judgment motifs connect with sanctuary access and Daniel's heavenly court scenes." },
  4: { title: "The Throne Room of Heaven", section: "Heavenly sanctuary", themes: ["Worship", "Creation", "Throne", "Holiness"], symbols: ["throne", "four living creatures", "sea of glass"], daniel: "Daniel 7's heavenly court helps frame Revelation's throne-room worship." },
  5: { title: "The Lamb and the Scroll", section: "Heavenly sanctuary", themes: ["Lamb", "Worthy Christ", "Redemption", "Worship"], symbols: ["Lamb", "scroll", "seven horns", "seven eyes"], daniel: "The kingdom given in Daniel 7 is received by the slain and risen Lamb." },
  6: { title: "The First Six Seals", section: "Seven seals", themes: ["Judgment", "Witness", "Persecution", "Second coming signs"], symbols: ["horses", "altar", "sun", "moon", "stars"], daniel: "The question of who can stand links with Danielic judgment and deliverance motifs." },
  7: { title: "The Sealed People and the Great Multitude", section: "Interlude", themes: ["Sealing", "144,000", "Great multitude", "Protection"], symbols: ["seal", "four winds", "robes", "palms"], daniel: "Daniel 12's sealed book and end-time deliverance provide background for sealing and standing." },
  8: { title: "The Seventh Seal and the First Four Trumpets", section: "Seven trumpets", themes: ["Intercession", "Warning judgments", "Sanctuary", "Trumpets"], symbols: ["censer", "altar", "trumpets", "hail", "mountain"], daniel: "Sanctuary language invites comparison with Daniel 8's sanctuary concern." },
  9: { title: "The Fifth and Sixth Trumpets", section: "Seven trumpets", themes: ["Warning", "Spiritual darkness", "Repentance", "Trumpets"], symbols: ["locusts", "abyss", "Euphrates", "horsemen"], daniel: "The conflict imagery resonates with Daniel's portrayal of powers opposing God's people." },
  10: { title: "The Mighty Angel and the Little Book", section: "Prophetic interlude", themes: ["Little book", "Bitter-sweet experience", "Prophetic mission", "Daniel"], symbols: ["little book", "angel", "seven thunders", "measuring"], daniel: "Adventist interpretation especially connects the little book with Daniel's sealed prophecies." },
  11: { title: "The Two Witnesses and the Seventh Trumpet", section: "Prophetic interlude", themes: ["Witness", "Temple measuring", "1260 days", "Seventh trumpet"], symbols: ["two witnesses", "sackcloth", "temple", "ark"], daniel: "Time-period language is commonly studied with Daniel 7 and 12 in Adventist historicism." },
  12: { title: "The Woman, the Dragon, and the Remnant", section: "Great controversy center", themes: ["Great controversy", "Christ's victory", "1260 days", "Remnant"], symbols: ["woman", "dragon", "male child", "wilderness", "remnant"], daniel: "Danielic conflict between earthly powers and God's people shapes the chapter's historicist reading." },
  13: { title: "The Sea Beast and the Earth Beast", section: "Great controversy center", themes: ["Worship", "Beast powers", "Image", "Mark"], symbols: ["sea beast", "earth beast", "horns", "mark", "666"], daniel: "The sea beast draws heavily on Daniel 7's beasts and little-horn power." },
  14: { title: "The Three Angels' Messages and the Harvest", section: "Great controversy center", themes: ["Everlasting gospel", "Judgment hour", "Creator worship", "Babylon", "Harvest"], symbols: ["three angels", "Babylon", "mark", "harvest", "sickle"], daniel: "The judgment-hour message is studied with Daniel 7 and 8 in Adventist sanctuary theology." },
  15: { title: "The Song of Moses and the Lamb", section: "Seven last plagues", themes: ["Victory", "Worship", "Temple", "Plagues"], symbols: ["sea of glass", "harps", "temple", "plagues"], daniel: "Deliverance after conflict recalls Daniel's faithful witnesses under imperial pressure." },
  16: { title: "The Seven Last Plagues", section: "Seven last plagues", themes: ["Final judgments", "Repentance refused", "Armageddon", "Coming of Christ"], symbols: ["bowls", "Euphrates", "frogs", "Armageddon"], daniel: "The final conflict should be handled with Danielic judgment and deliverance themes, avoiding date-setting." },
  17: { title: "Babylon and the Beast", section: "Fall of Babylon", themes: ["Babylon", "False worship", "Empire", "Discernment"], symbols: ["woman", "beast", "waters", "heads", "horns"], daniel: "The beasts and horns invite comparison with Daniel 7's political-religious powers." },
  18: { title: "The Fall of Babylon", section: "Fall of Babylon", themes: ["Come out", "Judgment", "Lament", "Faithfulness"], symbols: ["Babylon", "merchants", "plagues", "mighty angel"], daniel: "Babylon imagery reaches back to Daniel's empire setting and prophetic critique of idolatrous power." },
  19: { title: "The King Comes in Victory", section: "Second coming", themes: ["Marriage supper", "Second coming", "Faithful Witness", "Victory"], symbols: ["white horse", "sword", "fine linen", "supper"], daniel: "The final kingdom triumph fulfills Daniel's vision of God's kingdom overcoming all earthly powers." },
  20: { title: "The Millennium and Final Judgment", section: "Millennium", themes: ["Millennium", "Resurrection", "Judgment", "End of sin"], symbols: ["abyss", "books", "lake of fire", "throne"], daniel: "Books and judgment scenes connect naturally with Daniel 7 and 12." },
  21: { title: "The New Heaven, New Earth, and New Jerusalem", section: "New creation", themes: ["Restoration", "New Jerusalem", "God with us", "No more death"], symbols: ["city", "bride", "precious stones", "gates"], daniel: "Daniel's everlasting kingdom reaches its restored-creation fullness." },
  22: { title: "The River of Life and the Final Invitation", section: "New creation", themes: ["Tree of life", "River of life", "Soon coming", "Invitation"], symbols: ["river", "tree of life", "throne", "morning star"], daniel: "The unsealed words and final blessing answer Daniel's sealed-book expectation." }
};

const sectionSources = {
  "Prologue": [sourceIds.amazingNotes, sourceIds.maxwell, sourceIds.stefanovic, sourceIds.doukhan, sourceIds.strand],
  "Seven churches": [sourceIds.amazingNotes, sourceIds.maxwell, sourceIds.stefanovic, sourceIds.doukhan, sourceIds.frazee],
  "Heavenly sanctuary": [sourceIds.stefanovic, sourceIds.maxwell, sourceIds.doukhan, sourceIds.amazingNotes, sourceIds.bauckham],
  "Seven seals": [sourceIds.amazingNotes, sourceIds.maxwell, sourceIds.stefanovic, sourceIds.doukhan, sourceIds.wilson],
  "Interlude": [sourceIds.amazingNotes, sourceIds.maxwell, sourceIds.stefanovic, sourceIds.doukhan, sourceIds.wilson],
  "Seven trumpets": [sourceIds.amazingNotes, sourceIds.stefanovic, sourceIds.maxwell, sourceIds.strand, sourceIds.wilson],
  "Prophetic interlude": [sourceIds.amazingNotes, sourceIds.stefanovic, sourceIds.doukhan, sourceIds.wilson, sourceIds.bohr],
  "Great controversy center": [sourceIds.finalWarning, sourceIds.amazingNotes, sourceIds.maxwell, sourceIds.stefanovic, sourceIds.bohr, sourceIds.doukhan],
  "Seven last plagues": [sourceIds.amazingNotes, sourceIds.maxwell, sourceIds.stefanovic, sourceIds.frazee],
  "Fall of Babylon": [sourceIds.finalWarning, sourceIds.amazingNotes, sourceIds.maxwell, sourceIds.stefanovic, sourceIds.bohr],
  "Second coming": [sourceIds.amazingNotes, sourceIds.maxwell, sourceIds.stefanovic, sourceIds.doukhan],
  "Millennium": [sourceIds.amazingNotes, sourceIds.maxwell, sourceIds.stefanovic, sourceIds.doukhan],
  "New creation": [sourceIds.maxwell, sourceIds.stefanovic, sourceIds.doukhan, sourceIds.bauckham]
};

const needsReview = "Needs source review: confirm this verse-level detail against the uploaded Adventist sources before treating it as a settled claim.";

function citations(ids, locator = "locator needs page review") {
  return ids.map((id) => ({ sourceId: id, locator, claimType: "summary", priority: id.startsWith("amazing") || id.includes("maxwell") || id.includes("stefanovic") || id.includes("doukhan") || id.includes("strand") || id.includes("wilson") || id.includes("bohr") || id.includes("cox") || id.includes("frazee") ? 1 : 5 }));
}

function verseSeeds(chapter, verseNumber, text, meta) {
  const ref = `Revelation ${chapter}:${verseNumber}`;
  const ids = sectionSources[meta.section] ?? [sourceIds.amazingNotes, sourceIds.stefanovic];
  const chapterFocus = meta.themes.slice(0, 3).join(", ");
  return {
    verse: ref,
    bibleText: text,
    explanation: `${ref} belongs to ${meta.section.toLowerCase()} and should be read in the flow of ${meta.title}. In this seed edition, the safest claim is that the verse contributes to Revelation's witness to Christ, worship, perseverance, judgment, and final restoration according to its immediate context.`,
    historicalBackground: `Review the verse in relation to John's first-century setting, the Roman imperial world, and the pastoral needs of the seven churches. ${needsReview}`,
    symbolicMeaning: meta.symbols.length ? `Symbols connected with this chapter include ${meta.symbols.join(", ")}. Interpret each symbol by Scripture's own patterns and by Daniel-Revelation links before moving to historical application.` : needsReview,
    adventistInsight: `Adventist historicist study commonly places this verse within the larger ${meta.section.toLowerCase()} movement of Revelation, with attention to ${chapterFocus}. This entry is intentionally conservative until source-specific page locators are reviewed.`,
    propheticSignificance: `Prophetic significance should be stated only as far as the uploaded sources support it. ${needsReview}`,
    danielConnection: meta.daniel,
    crossReferences: suggestCrossRefs(chapter),
    application: `Ask what this verse reveals about Jesus, worship, endurance, obedience, witness, and hope. Respond with faithfulness rather than fear.`,
    sources: citations(ids),
    reviewStatus: "needs-source-review"
  };
}

function suggestCrossRefs(chapter) {
  const base = ["Daniel 7:9-14", "Revelation 1:1-3"];
  if (chapter >= 12 && chapter <= 14) return ["Daniel 7:25", "Daniel 8:14", "Daniel 12:1-4", "Matthew 24:14", "Revelation 12:17", "Revelation 14:6-12"];
  if (chapter <= 3) return ["Daniel 7:13-14", "John 15:1-10", "Revelation 1:20", "Revelation 3:21"];
  if (chapter === 4 || chapter === 5) return ["Isaiah 6:1-5", "Ezekiel 1:26-28", "Daniel 7:9-14", "John 1:29"];
  if (chapter >= 6 && chapter <= 11) return ["Leviticus 16:12-17", "Daniel 7:9-14", "Daniel 8:14", "Matthew 24:29-31"];
  if (chapter >= 17 && chapter <= 18) return ["Jeremiah 51:6-9", "Daniel 7:1-8", "Revelation 14:8", "Revelation 18:4"];
  if (chapter >= 19 && chapter <= 22) return ["Daniel 2:44", "Daniel 7:27", "Isaiah 65:17-25", "2 Peter 3:13"];
  return base;
}

function chapterContent(chapterObj) {
  const chapter = Number(chapterObj.chapter);
  const meta = chapterMeta[chapter];
  const ids = sectionSources[meta.section] ?? [sourceIds.amazingNotes, sourceIds.stefanovic];
  return {
    chapterNumber: chapter,
    title: meta.title,
    summary: `${meta.title} advances Revelation's Christ-centered message through ${meta.section.toLowerCase()}. This seed summary prioritizes Adventist historicist sources while preserving review markers for verse-level claims that still need precise page verification.`,
    historicalContext: `Read Revelation ${chapter} as a pastoral-prophetic message sent from John to real churches in Asia Minor under Roman imperial pressure. Historical details and dates should be checked against uploaded source locators before final publication.`,
    literaryContext: `This chapter sits in the ${meta.section} portion of Revelation. Its imagery should be interpreted through the immediate literary unit, Old Testament echoes, Daniel-Revelation connections, and the book's sanctuary and worship patterns.`,
    themes: meta.themes,
    outline: buildOutline(chapterObj.verses.length, meta),
    verses: chapterObj.verses.map((v) => verseSeeds(chapter, Number(v.verse), v.text, meta)),
    symbols: meta.symbols.map((symbol) => ({ symbol, references: [`Revelation ${chapter}`], meaning: `Seed meaning requires source review for ${symbol}.`, sources: citations(ids) })),
    charts: [{ id: `revelation-${chapter}-flow`, title: `${meta.title} Flow`, type: "chapter-flow" }],
    images: [{ id: `chapter-${chapter}-placeholder`, alt: `${meta.title} diagram placeholder`, caption: "Original diagram placeholder; no copyrighted PDF image used.", sourceCredit: "Site-generated visual; review before replacing." }],
    crossReferences: suggestCrossRefs(chapter),
    danielConnections: [{ danielText: meta.daniel, revelationText: `Revelation ${chapter}`, sources: citations(ids) }],
    teachingNotes: {
      openingQuestion: `What does Revelation ${chapter} reveal about Jesus before it reveals anything about events?`,
      mainPoint: `${meta.title} calls readers to faithful worship and Christ-centered discernment.`,
      keyVerses: [`Revelation ${chapter}:1`, `Revelation ${chapter}:${Math.min(chapterObj.verses.length, 12)}`],
      importantSymbols: meta.symbols,
      discussionQuestions: [
        "Where does the chapter direct attention to Christ?",
        "What promise, warning, or worship scene shapes the reader's response?",
        "Which claims need source review before being taught publicly?"
      ],
      commonMisunderstandings: ["Avoid speculative date-setting and unsupported identification of symbols."],
      adventistEmphasis: `Adventist teaching should prioritize the uploaded historicist sources and clearly mark disputed details.`,
      closingAppeal: "Invite learners to worship Christ, trust His ministry, and remain faithful."
    },
    evangelisticNotes: {
      mainDoctrinalTheme: meta.themes[0],
      keyBibleTexts: suggestCrossRefs(chapter),
      flow: [`Begin with Christ in Revelation ${chapter}.`, "Explain the literary setting.", "Introduce Adventist historicist insights only with citations.", "Close with a hopeful appeal."],
      simpleIllustrations: ["Use original diagrams rather than sensational imagery."],
      appealQuestion: "How is Jesus inviting you to trust and follow Him in this passage?",
      cautions: ["Do not overstate disputed details; mark them for review."],
      sources: citations(ids)
    },
    reflectionQuestions: [
      "What does this chapter reveal about Jesus?",
      "What does this chapter teach about worship and allegiance?",
      "Where does the chapter call God's people to patient faithfulness?"
    ],
    sources: citations(ids)
  };
}

function buildOutline(count, meta) {
  const midpoint = Math.max(2, Math.ceil(count / 2));
  return [
    { range: `1-${midpoint - 1}`, title: `${meta.title}: opening movement`, summary: `Introduces the chapter's core imagery and theological burden.` },
    { range: `${midpoint}-${count}`, title: `${meta.title}: response and outcome`, summary: `Develops the chapter's call to worship, discernment, perseverance, or hope.` }
  ];
}

const symbols = [
  ["lampstands", "Churches bearing witness in Christ's presence", ["Revelation 1:12-20"], "Adventist sources commonly connect the lampstands with the seven churches and Christ's active ministry among His people."],
  ["stars", "Messengers/angels of the churches", ["Revelation 1:16,20"], "Interpret with Revelation 1:20 before extending application."],
  ["white garments", "Purity, victory, and Christ's righteousness", ["Revelation 3:5", "Revelation 7:14", "Revelation 19:8"], "Adventist teaching should connect this with overcoming and dependence on Christ."],
  ["throne", "God's sovereign rule and heavenly court", ["Revelation 4:2", "Daniel 7:9-10"], "Important for sanctuary and judgment themes."],
  ["Lamb", "Christ crucified, risen, and worthy", ["Revelation 5:6-12"], "The Lamb is central to Revelation's theology and worship."],
  ["scroll", "God's redemptive purpose opened by Christ", ["Revelation 5:1-9"], "Precise interpretation requires source review."],
  ["seals", "Progressive opening of the scroll's contents", ["Revelation 6:1-17", "Revelation 8:1"], "Adventist historicist interpretation should be cited carefully."],
  ["trumpets", "Warning judgments and calls to repentance", ["Revelation 8:2-13", "Revelation 9:1-21", "Revelation 11:15"], "This area has interpretive diversity and must be worded carefully."],
  ["incense", "Prayers and heavenly intercession", ["Revelation 8:3-4"], "Connect with sanctuary imagery."],
  ["altar", "Sacrifice, intercession, and judgment imagery", ["Revelation 6:9", "Revelation 8:3"], "Use sanctuary background with care."],
  ["temple", "Heavenly sanctuary and worship setting", ["Revelation 11:19", "Revelation 15:5"], "Central to Adventist sanctuary reading."],
  ["ark of the covenant", "God's covenant, law, and heavenly sanctuary", ["Revelation 11:19"], "Adventist sources often connect this with law and worship themes."],
  ["woman clothed with the sun", "God's faithful covenant people", ["Revelation 12:1"], "Adventist historicist interpretation reads the woman as God's faithful people/church."],
  ["dragon", "Satan working through hostile powers", ["Revelation 12:3-9"], "Revelation itself identifies the dragon as the devil and Satan."],
  ["beast from the sea", "Persecuting religio-political power", ["Revelation 13:1-10", "Daniel 7:1-8"], "Adventist identification must be presented carefully and sourced."],
  ["beast from the earth", "End-time power supporting coercive worship", ["Revelation 13:11-17"], "Adventist interpretation should cite priority sources and avoid hostile rhetoric."],
  ["horns", "Power, kingdoms, or authority", ["Daniel 7:7-8", "Revelation 13:1"], "Interpret through Daniel and Revelation together."],
  ["waters", "Peoples, multitudes, nations, and tongues", ["Revelation 17:15"], "Revelation provides this symbol explanation."],
  ["Babylon", "False worship and opposition to God's covenant people", ["Revelation 14:8", "Revelation 17-18"], "Present Adventist interpretation first, then comparison views."],
  ["mark", "Allegiance in final worship conflict", ["Revelation 13:16-17", "Revelation 14:9-12"], "Avoid claiming any present individual has the mark; handle future conflict carefully."],
  ["seal", "God's ownership, protection, and allegiance", ["Revelation 7:1-4"], "Adventist readings connect sealing with worship, law, and loyalty to God."],
  ["144,000", "End-time sealed servants of God", ["Revelation 7:4", "Revelation 14:1"], "Interpretive details vary; mark specifics for source review."],
  ["remnant", "Faithful people keeping God's commandments and the testimony of Jesus", ["Revelation 12:17"], "Important Adventist identity and mission theme."],
  ["three angels", "Final gospel proclamation and worship appeal", ["Revelation 14:6-12"], "Central Adventist mission passage."],
  ["harvest", "Final separation and consummation", ["Revelation 14:14-20"], "Use careful wording about judgment."],
  ["plagues", "Final judgments after persistent rebellion", ["Revelation 15-16"], "Avoid sensationalism."],
  ["Armageddon", "Final conflict over allegiance and worship", ["Revelation 16:16"], "Do not reduce to speculative geopolitics."],
  ["New Jerusalem", "God's restored dwelling with His people", ["Revelation 21:2"], "Hopeful culmination of the book."],
  ["tree of life", "Restored access to life in God's presence", ["Revelation 22:2"], "Connect with Eden restored."],
  ["river of life", "Life flowing from God's throne", ["Revelation 22:1"], "Final restoration imagery."]
].map(([symbol, meaning, refs, adventist]) => ({
  symbol,
  scriptureReferences: refs,
  meaning,
  oldTestamentBackground: "Needs source review: confirm Old Testament background from uploaded sources.",
  danielConnection: refs.some((r) => r.includes("Daniel")) ? "Direct Daniel connection listed in references." : "Review Daniel connection where applicable.",
  adventistInterpretation: adventist,
  otherViews: "Comparison notes should be added from the uploaded academic/comparative sources where important.",
  sources: citations([sourceIds.amazingNotes, sourceIds.stefanovic, sourceIds.maxwell, sourceIds.doukhan])
}));

const prophecySections = [
  ["vision-of-christ", "Revelation 1 vision of Christ", "Revelation 1", ["Son of Man", "lampstands", "stars"], "Christ ministers among His churches as priest, king, and victorious Lord."],
  ["seven-churches", "Seven Churches", "Revelation 2-3", ["lampstands", "overcomer promises"], "Messages to historical churches with spiritual and, where supported, historicist church-period application."],
  ["seven-seals", "Seven Seals", "Revelation 6-8", ["horses", "altar", "cosmic signs"], "Historical-prophetic movement toward judgment and the question of who can stand."],
  ["seven-trumpets", "Seven Trumpets", "Revelation 8-11", ["trumpets", "altar", "Euphrates"], "Warning judgments; Adventist interpreters differ in details, so present carefully."],
  ["two-witnesses", "Two Witnesses", "Revelation 11", ["two witnesses", "sackcloth", "1260 days"], "Witness of Scripture and God's people under opposition; historicist applications need source review."],
  ["revelation-12", "Woman, Dragon, and Child", "Revelation 12", ["woman", "dragon", "remnant"], "Great controversy panorama from Christ's victory to the remnant."],
  ["revelation-13", "Sea Beast and Earth Beast", "Revelation 13", ["sea beast", "earth beast", "mark"], "Final worship conflict; Adventist identification must be sourced and non-sensational."],
  ["three-angels", "Three Angels' Messages", "Revelation 14:6-12", ["everlasting gospel", "Babylon", "mark"], "Adventist mission passage: gospel, judgment, Creator worship, Babylon's fall, and patient saints."],
  ["seven-last-plagues", "Seven Last Plagues", "Revelation 15-16", ["bowls", "Armageddon"], "Final judgments described carefully without date-setting."],
  ["babylon", "Babylon and the Beast", "Revelation 17-18", ["woman", "beast", "waters"], "False worship and corrupt alliance opposed to God's call to come out."],
  ["second-coming", "Second Coming", "Revelation 19", ["white horse", "King of kings"], "Christ's visible victorious return."],
  ["millennium", "Millennium", "Revelation 20", ["abyss", "books", "lake of fire"], "Adventist reading of millennium, judgment, and final eradication of sin."],
  ["new-earth", "New Earth", "Revelation 21-22", ["New Jerusalem", "tree of life", "river of life"], "Final restoration and God's dwelling with His people."],
  ["daniel-revelation", "Daniel and Revelation Comparison", "Daniel 2, 7, 8, 9, 10-12; Revelation", ["beasts", "judgment", "sanctuary", "time periods"], "Shared prophetic framework in Adventist historicist study."]
].map(([id, title, reference, symbols, adventistInterpretation]) => ({
  id,
  title,
  reference,
  symbols,
  meaning: `Seed overview for ${title}.`,
  historicalFulfillment: "Needs source review before asserting specific historical fulfillments.",
  adventistInterpretation,
  alternativeViews: "Preterist, futurist, idealist, and broader historicist readings are summarized on the Prophetic Schools page.",
  bibleReferences: reference.split("; "),
  danielConnections: id.includes("daniel") || ["seven-seals", "seven-trumpets", "revelation-13", "three-angels", "millennium"].includes(id)
    ? ["Daniel 2", "Daniel 7", "Daniel 8", "Daniel 12"]
    : [],
  sources: citations([sourceIds.amazingNotes, sourceIds.stefanovic, sourceIds.maxwell, sourceIds.doukhan, sourceIds.bohr])
}));

const schools = [
  {
    id: "historicism",
    name: "Historicism",
    definition: "Reads apocalyptic prophecy as unfolding progressively through history from the prophet's time to the consummation.",
    interpretation: "Revelation is traced across church history, empire, apostasy, reform, judgment, and final restoration.",
    strengths: ["Takes the time span of apocalyptic prophecy seriously.", "Connects Daniel and Revelation naturally."],
    limitations: ["Can become overconfident in disputed historical identifications if not carefully sourced."],
    differenceFromAdventist: "Adventist historicism shares the broad historical approach but adds distinctive sanctuary, judgment, Sabbath, remnant, and three angels' messages emphases.",
    sections: schoolSections("Historicism")
  },
  {
    id: "adventist-historicism",
    name: "Adventist Historicist Interpretation",
    definition: "A Christ-centered historicist reading emphasizing Daniel-Revelation unity, year-day principle where applicable, heavenly sanctuary, judgment, remnant mission, Sabbath, and final worship conflict.",
    interpretation: "Revelation is read as the revelation of Jesus Christ in history, heavenly ministry, judgment, final crisis, second coming, millennium, and new earth.",
    strengths: ["Integrates Daniel and Revelation.", "Keeps sanctuary, worship, law, gospel, and mission together.", "Provides a coherent reading of Revelation 12-14."],
    limitations: ["Requires careful sourcing and humble wording in disputed areas such as trumpets and some final-event details."],
    differenceFromAdventist: "This is the primary interpretive framework of the site.",
    sections: schoolSections("Adventist Historicism")
  },
  {
    id: "preterism",
    name: "Preterism",
    definition: "Reads many Revelation prophecies as fulfilled in the ancient past, often around Rome, Nero/Domitian, Jerusalem, or early Christian persecution.",
    interpretation: "Revelation primarily addressed first-century Christians in conflict with imperial Rome.",
    strengths: ["Emphasizes first-century context and original audience.", "Helps prevent free-floating speculation."],
    limitations: ["Often leaves less room for Daniel-Revelation end-time fulfillment as Adventists understand it."],
    differenceFromAdventist: "Adventist historicism sees Revelation's major prophetic sweep extending beyond the first century to the end.",
    sections: schoolSections("Preterism")
  },
  {
    id: "futurism",
    name: "Futurism",
    definition: "Places many major Revelation prophecies, especially chapters 4-22 or large portions of them, in a future final crisis.",
    interpretation: "Often emphasizes a future antichrist, tribulation, rebuilt-temple motifs, and end-time geopolitical crisis.",
    strengths: ["Takes future consummation and final crisis seriously.", "Highlights the expectation of Christ's return."],
    limitations: ["Can detach Revelation from its historical sweep and from Daniel's historicist time periods."],
    differenceFromAdventist: "Adventist historicism sees the final crisis as the climax of a long historical conflict, not as an isolated future-only block.",
    sections: schoolSections("Futurism")
  },
  {
    id: "idealism",
    name: "Idealism / Symbolic Interpretation",
    definition: "Reads Revelation as symbolic portrayals of recurring spiritual realities rather than a detailed chronological historical map.",
    interpretation: "The visions dramatize worship, empire, persecution, idolatry, witness, judgment, and hope across all ages.",
    strengths: ["Keeps the spiritual and theological force of the symbols vivid.", "Avoids brittle date-setting."],
    limitations: ["May underplay specific historical and prophetic fulfillments emphasized by Adventist historicism."],
    differenceFromAdventist: "Adventist historicism accepts recurring spiritual application but also expects anchored historical-prophetic fulfillment.",
    sections: schoolSections("Idealism")
  }
];

function schoolSections(name) {
  return {
    revelation1to3: `${name}: reads the churches as real first-century communities with continuing spiritual significance; Adventist historicism also allows sourced church-history application.`,
    seals: `${name}: interpretive details vary; compare cautiously with uploaded sources.`,
    trumpets: `${name}: interpretive details vary and need careful sourcing.`,
    revelation12to14: `${name}: explains the central conflict, worship, beast powers, and final proclamation according to its framework.`,
    beastPowers: `${name}: identifies beast imagery according to its historical or theological assumptions.`,
    babylon: `${name}: reads Babylon as corrupt opposition to God, with different historical specificity.`,
    millennium: `${name}: handles Revelation 20 according to its eschatological framework.`,
    secondComingAndJudgment: `${name}: affirms final accountability, though timing and structure differ.`
  };
}

const timeline = [
  ["john-on-patmos", "John on Patmos", "First century", "Historical setting for the Revelation of Jesus Christ.", ["Revelation 1:9"]],
  ["seven-churches", "Seven churches in Asia Minor", "First century", "Historical recipients and spiritual mirror for the church.", ["Revelation 2-3"]],
  ["apostolic", "Apostolic church", "First century", "Witness, worship, and perseverance under pressure.", ["Acts 1:8", "Revelation 1-3"]],
  ["post-apostolic", "Post-apostolic church", "Second-fourth centuries", "Historical application requires source review.", ["Revelation 2-3"]],
  ["medieval", "Medieval period", "Historical era", "Historicist application of prophetic conflict needs careful citation.", ["Daniel 7:25", "Revelation 12:6"]],
  ["reformation", "Reformation", "Sixteenth century", "Witness and recovery themes in historicist readings.", ["Revelation 3:1-6"]],
  ["1260", "1260 day/year period", "Historicist period", "Use only where supported by uploaded Adventist sources.", ["Daniel 7:25", "Revelation 12:6,14"]],
  ["538", "538", "Historicist marker", "Needs source review: include only with uploaded Adventist support and careful wording.", ["Daniel 7:25"]],
  ["1798", "1798", "Historicist marker", "Needs source review: include only with uploaded Adventist support and careful wording.", ["Revelation 13:3"]],
  ["1844", "1844 and sanctuary/judgment interpretation", "Adventist sanctuary marker", "Needs source review and precise sourcing from Daniel 8/Revelation judgment materials.", ["Daniel 8:14", "Revelation 14:7"]],
  ["advent-movement", "Rise of Advent movement", "Nineteenth century", "Connected in Adventist interpretation with Revelation 10 and 14; source review required.", ["Revelation 10", "Revelation 14:6-12"]],
  ["three-angels", "Three angels' messages", "Final gospel proclamation", "Everlasting gospel, judgment hour, Creator worship, Babylon's fall, and warning against beast worship.", ["Revelation 14:6-12"]],
  ["final-proclamation", "Final proclamation", "Future", "Careful wording: no date-setting.", ["Revelation 18:1-4"]],
  ["close-probation", "Close of probation", "Future", "Use careful Adventist wording and verify sources.", ["Revelation 15:8", "Revelation 22:11"]],
  ["plagues", "Seven last plagues", "Future", "Final judgments; avoid sensationalism.", ["Revelation 16"]],
  ["second-coming", "Second coming", "Future", "Visible victorious return of Christ.", ["Revelation 19:11-16"]],
  ["millennium", "Millennium", "Future", "Adventist interpretation follows Revelation 20; source review for details.", ["Revelation 20"]],
  ["final-judgment", "Final judgment", "Future", "Final eradication of sin and vindication of God's justice.", ["Revelation 20:11-15"]],
  ["new-earth", "New earth", "Future restoration", "God dwells with His people; sorrow and death end.", ["Revelation 21-22"]]
].map(([id, title, period, description, refs]) => ({ id, title, period, description, scriptureReferences: refs, sources: citations([sourceIds.amazingNotes, sourceIds.maxwell, sourceIds.stefanovic, sourceIds.doukhan]) }));

const danielConnections = [
  ["daniel-2", "Daniel 2 and Revelation's Kingdom Themes", "Successive kingdoms give way to God's everlasting kingdom.", ["Daniel 2:44", "Revelation 11:15", "Revelation 19-22"]],
  ["daniel-7-rev-13", "Daniel 7 and Revelation 13", "Beast, horn, blasphemy, authority, persecution, and worship-conflict motifs overlap.", ["Daniel 7", "Revelation 13"]],
  ["daniel-7-judgment", "Daniel 7 Judgment and Revelation Judgment Themes", "Heavenly court, books, saints, kingdom, and final vindication.", ["Daniel 7:9-14", "Revelation 14:7", "Revelation 20:12"]],
  ["daniel-8-sanctuary", "Daniel 8 and Revelation Sanctuary/Judgment Themes", "Sanctuary cleansing and heavenly temple imagery are central in Adventist interpretation.", ["Daniel 8:14", "Revelation 11:19", "Revelation 15:5"]],
  ["daniel-9", "Daniel 9 and Messianic Prophecy Background", "Messiah, covenant, and redemptive timing inform Revelation's Lamb-centered theology.", ["Daniel 9:24-27", "Revelation 5"]],
  ["daniel-10", "Daniel 10 and Cosmic Conflict", "Behind earthly events stands a cosmic conflict involving heavenly realities.", ["Daniel 10", "Revelation 12"]],
  ["daniel-11", "Daniel 11 and Final Conflict Themes", "Final conflict themes should be treated cautiously and sourced.", ["Daniel 11", "Revelation 16-18"]],
  ["daniel-12", "Daniel 12 and Revelation's End-Time Hope", "Sealing, time of trouble, resurrection, and unsealing connect with Revelation's conclusion.", ["Daniel 12", "Revelation 10", "Revelation 22"]]
].map(([id, title, summary, refs]) => ({ id, title, summary, scriptureReferences: refs, sharedSymbols: ["beast", "horn", "time periods", "sanctuary", "judgment", "books", "worship"], sources: citations([sourceIds.amazingNotes, sourceIds.stefanovic, sourceIds.doukhan, sourceIds.bohr, sourceIds.wilson]) }));

const dirs = [
  "content/revelation",
  "content/prophecy",
  "content/schools",
  "content/resources",
  "content/glossary",
  "content/timelines",
  "content/connections",
  ".pdf-extraction-cache"
];
dirs.forEach((d) => mkdirSync(join(root, d), { recursive: true }));

for (const chapterObj of kjv.chapters) {
  const num = String(chapterObj.chapter).padStart(2, "0");
  writeJson(`content/revelation/chapter-${num}.json`, chapterContent(chapterObj));
}

for (const section of prophecySections) {
  writeJson(`content/prophecy/${section.id}.json`, section);
}

writeJson("content/prophecy/prophecy-sections.json", prophecySections);
writeJson("content/schools/prophetic-schools.json", { schools });
writeJson("content/resources/bibliography.json", { resources });
writeJson("content/glossary/symbols.json", { symbols });
writeJson("content/timelines/revelation-timeline.json", { events: timeline });
writeJson("content/connections/daniel-revelation.json", { connections: danielConnections });
writeJson(".pdf-extraction-cache/source-manifest.json", { note: "Local-only extraction/cache area. Do not publish raw PDF text.", resources });

const reviewLines = [
  "# Content Review Needed",
  "",
  "This file tracks items deliberately marked for manual theological, citation, image, or copyright review.",
  "",
  "## Global",
  "- Add exact page locators for all source-level citations.",
  "- Review all direct quotations before adding them; V1 currently avoids long direct quotations.",
  "- Replace site-generated image placeholders only with original, public-domain, open-licensed, or explicitly permitted images.",
  "- Confirm disputed Adventist details before teaching them as settled claims, especially trumpets, 144,000, 666, Babylon, 1260 years, 538, 1798, 1844, close of probation, and final-event sequencing.",
  "",
  "## Verse Rows"
];
for (const chapterObj of kjv.chapters) {
  for (const verse of chapterObj.verses) {
    reviewLines.push(`- Revelation ${chapterObj.chapter}:${verse.verse}: verify verse-level Adventist insight, prophetic significance, cross-references, and source locators.`);
  }
}
writeFileSync(join(root, "content-review-needed.md"), `${reviewLines.join("\n")}\n`);

function writeJson(path, data) {
  writeFileSync(join(root, path), `${JSON.stringify(data, null, 2)}\n`);
}
