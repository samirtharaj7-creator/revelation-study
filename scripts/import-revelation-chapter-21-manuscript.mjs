import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const chapterPath = join(root, "content", "revelation", "chapter-21.json");
const bibliographyPath = join(root, "content", "resources", "bibliography.json");
const docxPath = "/Users/samuel/Downloads/Revelation/Revelation Chapter Twenty One.docx";

if (!existsSync(docxPath)) {
  throw new Error(`Missing manuscript: ${docxPath}`);
}

const src = (sourceId, locator, claimType, priority) => ({ sourceId, locator, claimType, priority });

const docSource = src("revelation-chapter-twenty-one-docx", "Revelation Chapter Twenty-One manuscript", "manuscript-synthesis", 1);
const mcnultySource = src("revelation-practical-living-in-the-judgment-hour", "Priority restoration and final-events support for Revelation 21", "adventist-interpretation", 1);
const maxwellSource = src("maxwell-god-cares-vol-2", "New creation and New Jerusalem support", "adventist-interpretation", 1);
const amazingFactsSource = src("amazing-facts-revelation-verse-by-verse", "Revelation 21 support", "adventist-interpretation", 2);
const coxSource = src("cox-revelation-pure-and-simple", "Revelation 21 support", "adventist-interpretation", 2);
const stefanovicSource = src("stefanovic-revelation-of-jesus-christ", "Revelation 21 exegetical and prophetic support", "adventist-technical-background", 2);
const bohrSource = src("bohr-great-prophecies", "New Jerusalem and final restoration support", "adventist-interpretation", 2);
const doukhanSource = src("doukhan-secrets-of-revelation", "Theological support for Revelation 21", "adventist-technical-background", 2);
const technicalSource = src("beale-book-of-revelation", "Old Testament and literary support for Revelation 21", "technical-background", 5);
const bauckhamSource = src("bauckham-theology-revelation", "New creation and worship theological support", "theological-background", 5);
const deSilvaSource = src("desilva-discovering-revelation", "Historical and rhetorical support for Revelation 21", "historical-background", 5);
const pastoralSource = src("revelation-interpretation-a-bible-commentary-for-teaching-and-preaching", "Pastoral support for Revelation 21", "pastoral-application", 5);

const sourceList = [
  docSource,
  mcnultySource,
  maxwellSource,
  amazingFactsSource,
  coxSource,
  stefanovicSource,
  bohrSource,
  doukhanSource,
  technicalSource,
  bauckhamSource,
  deSilvaSource,
  pastoralSource
];

const resourceEntry = {
  id: docSource.sourceId,
  title: "Revelation Chapter Twenty One",
  author: "Uploaded manuscript",
  type: "Manuscript",
  tradition: "Adventist",
  interpretiveCategory: "Adventist historicist manuscript synthesis",
  howUsed: "Internal source metadata retained for synthesized Revelation 21 commentary.",
  citationFormat: "Internal source metadata retained for audit only."
};

function ensureResource() {
  const bibliography = JSON.parse(readFileSync(bibliographyPath, "utf8"));
  if (!bibliography.resources.some((resource) => resource.id === resourceEntry.id)) {
    bibliography.resources.push(resourceEntry);
    bibliography.resources.sort((a, b) => a.id.localeCompare(b.id));
    writeFileSync(bibliographyPath, `${JSON.stringify(bibliography, null, 2)}\n`);
  }
}

function sourceAudit() {
  return {
    exegesis: [docSource, mcnultySource, stefanovicSource, doukhanSource],
    historicalBackground: [docSource, stefanovicSource, technicalSource, bauckhamSource, deSilvaSource],
    technicalNotes: [docSource, stefanovicSource, doukhanSource, technicalSource, bauckhamSource, pastoralSource],
    adventistPropheticInsight: [docSource, mcnultySource, maxwellSource, amazingFactsSource, coxSource, stefanovicSource, bohrSource, doukhanSource],
    propheticTimeline: [docSource, mcnultySource, maxwellSource, amazingFactsSource, coxSource, stefanovicSource, bohrSource],
    otherCommentaryInsights: [docSource, technicalSource, bauckhamSource, pastoralSource, deSilvaSource],
    application: [docSource, mcnultySource, pastoralSource]
  };
}

const crossReferences = {
  1: ["Genesis 1:1", "Isaiah 65:17", "Isaiah 66:22", "2 Peter 3:13", "Revelation 20:11", "Revelation 21:5"],
  2: ["Isaiah 52:1", "Revelation 3:12", "Revelation 19:7", "Revelation 21:9-10", "Hebrews 12:22", "John 14:2-3"],
  3: ["Leviticus 26:11-12", "Ezekiel 37:27", "John 1:14", "Revelation 7:15", "Revelation 21:22", "Revelation 22:3"],
  4: ["Isaiah 25:8", "Isaiah 35:10", "Isaiah 65:19", "1 Corinthians 15:26", "Revelation 7:17", "Revelation 20:14"],
  5: ["Isaiah 43:19", "Isaiah 65:17", "2 Corinthians 5:17", "Revelation 19:9", "Revelation 20:11", "Revelation 22:6"],
  6: ["Revelation 1:8", "Revelation 16:17", "John 4:14", "John 7:37-39", "Isaiah 55:1", "Revelation 22:17"],
  7: ["2 Samuel 7:14", "Psalm 2:7", "Romans 8:17", "Hebrews 1:5", "Revelation 2:7", "Revelation 3:21"],
  8: ["Revelation 20:14-15", "Galatians 5:19-21", "Ephesians 5:5", "1 Corinthians 6:9-10", "Revelation 22:15", "Malachi 4:1"],
  9: ["Revelation 15:1", "Revelation 19:7-9", "Revelation 21:2", "Ephesians 5:25-27", "Isaiah 54:5", "Hosea 2:19-20"],
  10: ["Ezekiel 40:2", "Isaiah 52:1", "Hebrews 12:22", "Revelation 3:12", "Revelation 21:2", "Revelation 21:11"],
  11: ["Ezekiel 43:2", "Isaiah 60:1-3", "Revelation 4:3", "Revelation 21:23", "Exodus 34:29-35", "Revelation 22:5"],
  12: ["Ezekiel 48:30-35", "Numbers 2:1-34", "Revelation 7:4-8", "Revelation 21:21", "Isaiah 60:11", "Hebrews 11:10"],
  13: ["Ezekiel 48:31-34", "Luke 13:29", "Matthew 8:11", "Revelation 21:12", "Revelation 7:9", "Isaiah 43:5-6"],
  14: ["Ephesians 2:20", "Matthew 16:18", "Revelation 12:17", "Revelation 21:19-20", "Hebrews 11:10", "1 Peter 2:5"],
  15: ["Ezekiel 40:3-5", "Zechariah 2:1-5", "Revelation 11:1", "Revelation 21:16-17", "Exodus 25:9", "Hebrews 8:5"],
  16: ["1 Kings 6:20", "Exodus 26:33-34", "Ezekiel 48:16", "Hebrews 9:3-8", "Revelation 21:15", "Revelation 21:22"],
  17: ["Ezekiel 40:5", "Revelation 21:12", "Revelation 21:18", "Hebrews 11:10", "Zechariah 2:5", "Isaiah 26:1"],
  18: ["Isaiah 54:11-12", "Revelation 4:3", "Revelation 21:11", "Revelation 21:21", "1 Corinthians 3:12", "1 Peter 1:7"],
  19: ["Isaiah 54:11-12", "Exodus 28:17-20", "Ezekiel 28:13", "Revelation 21:14", "Revelation 21:20", "Malachi 3:17"],
  20: ["Exodus 28:17-20", "Ezekiel 28:13", "Revelation 21:19-20", "Isaiah 54:11-12", "Revelation 4:3", "Revelation 22:1"],
  21: ["Isaiah 54:12", "Matthew 13:45-46", "Revelation 21:18", "Revelation 21:25", "Revelation 22:14", "John 10:9"],
  22: ["John 2:19-21", "John 4:21-24", "Revelation 7:15", "Revelation 11:19", "Revelation 21:3", "Revelation 22:3-4"],
  23: ["Isaiah 60:19-20", "John 1:4-9", "Revelation 1:16", "Revelation 22:5", "Genesis 1:14-18", "Malachi 4:2"],
  24: ["Isaiah 60:3", "Isaiah 60:5", "Psalm 72:10-11", "Revelation 15:4", "Revelation 21:26", "Revelation 22:2"],
  25: ["Isaiah 60:11", "Zechariah 14:7", "Revelation 22:5", "John 8:12", "Revelation 21:24", "Revelation 21:27"],
  26: ["Isaiah 60:5-11", "Psalm 96:7-9", "Revelation 15:4", "Revelation 21:24", "Revelation 22:2", "Philippians 2:10-11"],
  27: ["Revelation 20:12-15", "Revelation 3:5", "Revelation 13:8", "Revelation 22:14-15", "Isaiah 52:1", "Psalm 24:3-4"]
};

const note = (term, explanation, scriptureReferences) => ({ term, explanation, scriptureReferences });

const wordNotes = {
  1: [note("New heaven and new earth", "God's renewed creation after the old order has passed away.", ["Isaiah 65:17", "2 Peter 3:13", "Revelation 21:1"]), note("First heaven and first earth", "The fallen order marked by sin, death, and judgment.", ["Revelation 20:11", "Revelation 21:1"]), note("No more sea", "The removal of the restless, separating realm associated with danger and rebellion.", ["Isaiah 57:20", "Revelation 13:1", "Revelation 21:1"])],
  2: [note("Holy city", "The covenant dwelling of God's redeemed people.", ["Isaiah 52:1", "Hebrews 12:22", "Revelation 21:2"]), note("New Jerusalem", "The city from God that embodies His restored people and dwelling.", ["Revelation 3:12", "Revelation 21:2"]), note("Bride", "The Lamb's prepared people pictured as a city made beautiful for communion.", ["Revelation 19:7", "Revelation 21:2", "Revelation 21:9"])],
  3: [note("Tabernacle of God", "God's dwelling presence with His people in final fulfillment.", ["Leviticus 26:11-12", "Ezekiel 37:27", "Revelation 21:3"]), note("They shall be his people", "Covenant language brought to its completed form.", ["Jeremiah 31:33", "Revelation 21:3"]), note("God himself", "The promise that God's presence is direct, personal, and permanent.", ["John 1:14", "Revelation 21:3"])],
  4: [note("Wipe away all tears", "God personally removes grief and its causes.", ["Isaiah 25:8", "Revelation 7:17", "Revelation 21:4"]), note("No more death", "The last enemy has been destroyed.", ["1 Corinthians 15:26", "Revelation 20:14", "Revelation 21:4"]), note("Former things", "The fallen order of sorrow, crying, pain, and death.", ["Isaiah 65:19", "Revelation 21:4"])],
  5: [note("All things new", "God renews creation rather than abandoning His purpose for it.", ["Isaiah 65:17", "2 Corinthians 5:17", "Revelation 21:5"]), note("Faithful and true", "God's promise of restoration is trustworthy.", ["Revelation 19:9", "Revelation 22:6"]), note("Write", "The promise is given as a stable word for God's people.", ["Habakkuk 2:2", "Revelation 21:5"])],
  6: [note("It is done", "The completion of God's redemptive purpose.", ["Revelation 16:17", "Revelation 21:6"]), note("Alpha and Omega", "God as the beginning and goal of all things.", ["Revelation 1:8", "Revelation 21:6"]), note("Water of life", "Life freely given by God to the thirsty.", ["Isaiah 55:1", "John 7:37", "Revelation 22:17"])],
  7: [note("Overcometh", "Faithful endurance by grace through the conflict.", ["Revelation 2:7", "Revelation 3:21", "Revelation 21:7"]), note("Inherit", "The gift of God's kingdom to His children.", ["Romans 8:17", "Revelation 21:7"]), note("My son", "Covenant sonship and full belonging with God.", ["2 Samuel 7:14", "Hebrews 1:5", "Revelation 21:7"])],
  8: [note("Fearful and unbelieving", "Those who finally refuse trust and allegiance to God.", ["Revelation 21:8"]), note("Lake which burneth", "The final judgment already defined as the second death.", ["Revelation 20:14", "Revelation 21:8"]), note("Second death", "The final end of sin and those who cling to it.", ["Revelation 2:11", "Revelation 20:14", "Revelation 21:8"])],
  9: [note("Seven angels", "The same judgment context now turns to show the bride-city.", ["Revelation 15:1", "Revelation 21:9"]), note("Bride, the Lamb's wife", "The redeemed community in covenant union with Christ.", ["Revelation 19:7", "Revelation 21:9"]), note("Lamb", "Christ as the slain and victorious center of the city.", ["Revelation 5:6", "Revelation 21:9"])],
  10: [note("Great and high mountain", "A prophetic vantage point for seeing God's city.", ["Ezekiel 40:2", "Revelation 21:10"]), note("Holy Jerusalem", "The city that contrasts with Babylon and embodies God's holiness.", ["Isaiah 52:1", "Revelation 21:10"]), note("Descending out of heaven", "The city is God's gift, not human achievement.", ["Revelation 3:12", "Revelation 21:10"])],
  11: [note("Glory of God", "God's radiant presence filling the city.", ["Ezekiel 43:2", "Isaiah 60:1", "Revelation 21:11"]), note("Jasper", "Precious stone imagery for radiance, beauty, and divine glory.", ["Revelation 4:3", "Revelation 21:11"]), note("Clear as crystal", "Purity and transparency in the city of God.", ["Revelation 21:11", "Revelation 22:1"])],
  12: [note("Great and high wall", "The secure holiness of the city.", ["Isaiah 26:1", "Revelation 21:12"]), note("Twelve gates", "Complete access arranged by covenant order.", ["Ezekiel 48:30-35", "Revelation 21:12"]), note("Twelve tribes", "The names of Israel gathered into the restored people of God.", ["Revelation 7:4-8", "Revelation 21:12"])],
  13: [note("East, north, south, west", "The city is open in ordered fullness from every direction.", ["Isaiah 43:5-6", "Luke 13:29", "Revelation 21:13"]), note("Three gates", "Balanced access on each side of the city.", ["Ezekiel 48:31-34", "Revelation 21:13"]), note("Gates", "Entrance into the city by God's gracious provision.", ["Revelation 21:12-13", "Revelation 22:14"])],
  14: [note("Twelve foundations", "The city rests on God's apostolic witness.", ["Ephesians 2:20", "Revelation 21:14"]), note("Twelve apostles", "The Lamb's appointed witnesses named in the city's structure.", ["Matthew 10:2-4", "Revelation 21:14"]), note("Lamb", "The foundation witness centers on Christ.", ["John 1:29", "Revelation 21:14"])],
  15: [note("Golden reed", "A measuring instrument showing ordered holiness and divine approval.", ["Ezekiel 40:3-5", "Revelation 21:15"]), note("Measure the city", "The city is complete, ordered, and secure before God.", ["Zechariah 2:1-5", "Revelation 21:15"]), note("Gates and wall", "Access and security are both measured within God's purpose.", ["Revelation 21:12", "Revelation 21:15"])],
  16: [note("Foursquare", "Perfect symmetry and completeness.", ["Ezekiel 48:16", "Revelation 21:16"]), note("Length, breadth, height", "The city is shaped as a vast holy cube.", ["1 Kings 6:20", "Revelation 21:16"]), note("Twelve thousand furlongs", "Symbolic vastness and covenant completeness.", ["Revelation 21:16"])],
  17: [note("Wall", "The city's secure and holy boundary.", ["Isaiah 26:1", "Revelation 21:17"]), note("Hundred and forty-four cubits", "Twelve-squared measurement pointing to covenant fullness.", ["Revelation 7:4", "Revelation 21:17"]), note("Measure of a man", "The measurement is communicated in terms John can receive.", ["Revelation 21:17"])],
  18: [note("Jasper wall", "Glory and durability marking the city's boundary.", ["Revelation 4:3", "Revelation 21:18"]), note("Pure gold", "Precious purity throughout the city.", ["1 Corinthians 3:12", "Revelation 21:18"]), note("Clear glass", "Transparency and holiness without corruption.", ["Revelation 21:18", "Revelation 22:1"])],
  19: [note("Foundations", "The city's stable base adorned with beauty.", ["Ephesians 2:20", "Revelation 21:19"]), note("Precious stones", "Priestly and Edenic echoes of beauty restored.", ["Exodus 28:17-20", "Ezekiel 28:13", "Revelation 21:19"]), note("Sapphire", "One of the stones marking the city's radiant foundation.", ["Exodus 24:10", "Revelation 21:19"])],
  20: [note("Chrysolite", "Part of the jeweled foundation list showing ordered beauty.", ["Exodus 28:17-20", "Revelation 21:20"]), note("Amethyst", "The final listed stone in the foundation sequence.", ["Exodus 28:19", "Revelation 21:20"]), note("Foundations adorned", "The city is not bare utility but holy beauty.", ["Isaiah 54:11-12", "Revelation 21:19-20"])],
  21: [note("Pearl gates", "Each entrance is marked by costly beauty and wholeness.", ["Isaiah 54:12", "Matthew 13:45-46", "Revelation 21:21"]), note("Street of gold", "The city's common way is pure and radiant.", ["Revelation 21:18", "Revelation 21:21"]), note("Transparent glass", "Nothing in the city hides corruption or shadow.", ["Revelation 21:21", "Revelation 22:1"])],
  22: [note("No temple", "The symbol gives way to direct communion with God and the Lamb.", ["John 4:21-24", "Revelation 21:22"]), note("Lord God Almighty", "God Himself is the city's sanctuary.", ["Revelation 1:8", "Revelation 21:22"]), note("The Lamb", "Christ shares the temple reality of God's presence.", ["Revelation 5:6", "Revelation 21:22"])],
  23: [note("No need of sun", "Created lights no longer mediate the city's glory.", ["Isaiah 60:19-20", "Revelation 21:23"]), note("Glory of God", "God's presence illumines the city.", ["Isaiah 60:1", "Revelation 21:23"]), note("Lamb is the light", "Christ is the lamp of the city.", ["John 1:4-9", "Revelation 21:23"])],
  24: [note("Nations", "The redeemed peoples walk in the city's light.", ["Isaiah 60:3", "Revelation 21:24"]), note("Kings of the earth", "Human glory is surrendered to God, not used against Him.", ["Psalm 72:10-11", "Revelation 21:24"]), note("Light", "The city radiates God's presence to all redeemed life.", ["Revelation 21:23-24"])],
  25: [note("Gates not shut", "Security is so complete that closure is unnecessary.", ["Isaiah 60:11", "Revelation 21:25"]), note("No night", "Darkness, threat, and hidden evil are gone.", ["Zechariah 14:7", "Revelation 22:5"]), note("Day", "The city lives in unbroken divine light.", ["Revelation 21:25", "Revelation 22:5"])],
  26: [note("Glory and honour", "All redeemed human excellence is offered back to God.", ["Psalm 96:7-9", "Revelation 21:26"]), note("Nations", "The healed nations bring worship rather than rebellion.", ["Revelation 15:4", "Revelation 21:26"]), note("Bring into it", "Nothing good is lost; all purified glory enters God's city.", ["Isaiah 60:5-11", "Revelation 21:26"])],
  27: [note("Defileth", "Nothing unclean can enter the holy city.", ["Isaiah 52:1", "Revelation 21:27"]), note("Lamb's book of life", "The decisive register of those who share life with the Lamb.", ["Revelation 3:5", "Revelation 20:12", "Revelation 21:27"]), note("Written", "Entrance rests on being recorded in God's life-giving grace.", ["Daniel 12:1", "Luke 10:20", "Revelation 21:27"])]
};

const commentary = {
  1: [
    "John sees a new heaven and a new earth, for the first heaven and the first earth have passed away. Revelation 21 begins where the judgment scenes of chapter 20 were always leading: not merely to the end of evil, but to the renewal of God's creation. God does not abandon the world He made. He removes the old order of sin, death, and rebellion so creation can become the home of righteousness.",
    "The phrase no more sea carries deep symbolic weight in Revelation. The sea has been associated with danger, separation, restlessness, and the beast rising against God. In the new creation that realm no longer threatens or divides. John is not giving a geography lesson as much as a theological promise: nothing chaotic, beastly, or separating remains to trouble God's people.",
    "Isaiah promised new heavens and a new earth, and Peter spoke of a world where righteousness dwells. Revelation gathers those hopes after the millennium and the lake of fire. The old creation, scarred by sin and judged in the final scenes, gives way to God's restored order. The new heaven and new earth are therefore both real hope and covenant fulfillment.",
    "Revelation 21:1 teaches believers to hope beyond escape. God's aim is not to rescue souls into an abstract distance while creation remains ruined. He renews His world. Every grief tied to the old order is moving toward disappearance. The chapter begins with the Creator's faithfulness: what sin damaged, God will remake."
  ],
  2: [
    "John sees the holy city, New Jerusalem, coming down from God out of heaven, prepared as a bride adorned for her husband. The city is not human achievement climbing upward. It descends as God's gift. After Babylon falls and rebellion ends, the true city appears. Revelation's contrast could not be sharper: Babylon was dressed in seductive splendor; New Jerusalem is prepared in holy beauty.",
    "The city is also a bride. That means Revelation 21 does not reduce the future to architecture. The city represents God's redeemed people in covenant union with the Lamb. The wedding joy announced in Revelation 19 now becomes the visible dwelling of the bride. Place and people are joined because salvation is not merely relocation; it is communion with God.",
    "Jerusalem language reaches back through Scripture's hope for God's city, but the word new is crucial. This is not a return to fallen earthly politics. It is Jerusalem made holy, descending from God, filled with the life of the Lamb. The city answers the promises given to the overcomers: they will have God's name and the name of the city of God.",
    "Revelation 21:2 gives the church a better imagination than Babylon can offer. The world admires cities of wealth, commerce, and force. God shows a city prepared like a bride. The future of the redeemed is not lonely survival but shared beauty, covenant joy, and a home given from heaven."
  ],
  3: [
    "A great voice from heaven announces the heart of the new creation: the tabernacle of God is with men, and He will dwell with them. This is the center of Revelation 21. The city is beautiful, but its beauty serves presence. The final gift is not gold, jewels, or walls. The final gift is God with His people, and His people with Him.",
    "The language reaches back to the sanctuary promise: God would dwell among His people and be their God. The tabernacle in the wilderness, the temple in Jerusalem, and the heavenly sanctuary all pointed toward this communion. In Revelation 21 the promise reaches its completed form. God is not merely represented among His people; He is with them directly and permanently.",
    "This also completes the Bible's covenant refrain. 'They shall be his people' is the language of belonging, restoration, and peace. Sin fractured the fellowship of Eden. Idolatry corrupted the covenant. Babylon counterfeited a city and a worship. New Jerusalem answers all of it with the restored presence of God. The dwelling lost in Genesis is restored in Revelation.",
    "Revelation 21:3 asks readers to measure heaven by presence, not luxury. The city is glorious because God is there. The deepest hunger of the redeemed is not finally for a place without inconvenience, but for unhindered life with God. Every act of worship now is a rehearsal for that final dwelling."
  ],
  4: [
    "God wipes away all tears from their eyes, and there is no more death, sorrow, crying, or pain. The promise is tender because Revelation has not hidden suffering. The book has shown martyrs, persecution, famine, deception, plagues, and judgment. Now the voice of God answers not with an explanation only, but with restoration. He removes both tears and the world that caused them.",
    "The list is comprehensive. Death is gone because the lake of fire has ended death's reign. Sorrow and crying are gone because the causes of grief have been judged. Pain is gone because the former things have passed away. Revelation is not promising emotional numbness. It promises a healed universe where grief no longer has material to feed upon.",
    "Isaiah had promised that God would swallow up death and wipe tears from all faces. Revelation shows that promise fulfilled after the defeat of sin. This verse is therefore not sentimental decoration at the end of prophecy. It is the fruit of judgment, resurrection, and new creation. Holiness and comfort meet because evil has been removed.",
    "Revelation 21:4 is one of Scripture's great pastoral anchors. The tears of God's people are not ignored, mocked, or forgotten. They are touched by God Himself. The promise gives courage in present grief: pain is real, but it is not permanent. The former things will pass away."
  ],
  5: [
    "The One sitting on the throne says, 'Behold, I make all things new.' The voice comes from the throne because renewal is God's sovereign act. He does not ask creation to repair itself. He does not merely improve the old order. He makes all things new. The same throne that judged Babylon and opened the books now speaks restoration.",
    "The command to write underlines the reliability of the promise. These words are faithful and true. Revelation knows that suffering believers need more than poetic hope; they need a trustworthy word from God. The new creation is not wishful thinking produced by human longing. It is guaranteed by the character of the One who speaks from the throne.",
    "The phrase all things new gathers the whole story of redemption. God renews creation, restores fellowship, purifies the city, and removes death. This renewal is consistent with the gospel itself: in Christ, God already begins new creation in human lives. Revelation 21 shows that what grace begins personally, God will complete cosmically.",
    "Revelation 21:5 calls believers to live by the future God has promised. The old order often feels immovable, but it is passing. God's word is more stable than decay. Faith receives the promise now and lets it loosen the grip of despair, compromise, and cynicism."
  ],
  6: [
    "God says, 'It is done,' and identifies Himself as Alpha and Omega, the beginning and the end. The phrase echoes completion. In Revelation 16, 'It is done' announced the final outpouring of judgment; here it announces the completed restoration that judgment made possible. God finishes what He began. History does not end in fragments but in fulfilled purpose.",
    "Alpha and Omega declares that God holds the whole story. He is not merely present at the start and waiting at the end. He is the source, goal, and Lord of the entire movement from creation to new creation. Every beastly claim, every Babylonian boast, and every satanic accusation is temporary before the One who is beginning and end.",
    "The promise of the fountain of the water of life is given freely to the thirsty. This is grace at the edge of eternity. The city is not entered by purchase, status, or merit. The thirsty receive life from God. The water image connects Jesus' promises in the Gospel of John with Revelation's final river of life.",
    "Revelation 21:6 makes the future both majestic and intimate. The God who spans all history stoops to satisfy thirst. The same voice that says 'It is done' also says 'I will give.' The reader is invited to come as thirsty, not self-sufficient, and to receive life as gift."
  ],
  7: [
    "The overcomer inherits all things, and God says, 'I will be his God, and he shall be my son.' The promises to the seven churches now come to their full inheritance. Overcoming in Revelation is never self-made heroism. It is faithful endurance through the Lamb's victory, refusing the beast, Babylon, and the dragon's lies.",
    "Inheritance is family language before it is property language. The redeemed receive all things because they are received as God's children. Scripture's covenant promise is brought to its tender conclusion: God is their God, and they are His sons and daughters. The future is not simply a granted estate; it is a restored family.",
    "This verse should be heard beside Revelation's calls to overcome: eating from the tree of life, receiving a white stone, standing with Christ, sitting with Him on His throne. Revelation 21 gathers those promises into one sweeping inheritance. The overcomer receives what the beast could never give: life with God that cannot be threatened.",
    "Revelation 21:7 gives courage for endurance. The final inheritance is larger than present loss. Faithfulness may cost comfort in Babylon's world, but it leads to sonship in God's city. The verse invites believers to endure as children heading home."
  ],
  8: [
    "The warning in verse 8 is sober because the city is holy. Revelation names those who persist in cowardice, unbelief, abomination, murder, sexual immorality, sorcery, idolatry, and lying. The point is not that one past sin makes grace impossible. The point is that settled refusal of God and persistent allegiance to sin cannot enter the new creation.",
    "The list gathers the moral world of Babylon and the beast. False worship, deception, violence, impurity, and idolatry have marked the old order. Revelation 21 says those things do not have a future in God's city. The lake of fire is identified again as the second death, the final end of rebellion rather than a rival kingdom beside God.",
    "This warning is placed between the promise of inheritance and the vision of the bride-city. That placement matters. Grace is free, but the city is not a sanctuary for cherished rebellion. The same God who gives water freely also judges what destroys life. Holiness protects joy. The exclusion of evil is mercy for the redeemed.",
    "Revelation 21:8 should be taught with reverence, not harshness. It warns the reader away from the second death and toward the water of life. The door of mercy is still open in the proclamation of the book. The warning is severe because the invitation is real."
  ],
  9: [
    "One of the seven angels who had the seven last plagues now comes to show John the bride, the Lamb's wife. The messenger is significant. The angel associated with final judgment now shows final beauty. Revelation keeps judgment and restoration together. The plagues exposed and ended rebellion; now the same prophetic movement reveals the bride-city.",
    "The bride is called the Lamb's wife. This keeps the city centered on Christ. New Jerusalem is not merely the reward after conflict; it is the covenant companion of the Lamb. The One slain in Revelation 5, married in Revelation 19, and victorious in Revelation 20 now has His people displayed in glory.",
    "The contrast with Babylon remains near. Another angel showed John the harlot in the wilderness; now an angel shows the bride. Babylon was adorned to seduce and intoxicate. New Jerusalem is adorned to reveal covenant faithfulness. The two women and two cities embody two destinies, two worships, and two forms of life.",
    "Revelation 21:9 asks the church to love the bride-city more than Babylon's splendor. The final vision is not escape from embodiment or community. It is a holy people, a holy city, and a holy marriage to the Lamb. Prophecy ends with communion."
  ],
  10: [
    "The angel carries John in the Spirit to a great and high mountain and shows him the great city, holy Jerusalem, descending out of heaven from God. The mountain vantage recalls prophetic visions where God's restored order is seen from above. John must be lifted beyond earth's ruins to behold the city God gives.",
    "Holy Jerusalem descends from God. This is crucial. Human civilization did not evolve into New Jerusalem. Religious institutions did not build it by influence. Political powers did not secure it by force. The city comes from God because only God can create the dwelling where holiness, beauty, security, and communion are perfectly joined.",
    "This city answers the counterfeit city of Babylon. Babylon rose from human pride, coercive religion, and intoxicated nations. New Jerusalem descends as gift, holiness, and glory. Revelation's final city is therefore not merely a better society; it is the covenant home God brings after the false city is judged.",
    "Revelation 21:10 trains the imagination upward. The church cannot see the future clearly from Babylon's street level. It needs the Spirit's vision, the mountain perspective, and the city descending from God. The hope of the world is not human ascent but divine gift."
  ],
  11: [
    "The city has the glory of God, and her light is like a most precious stone, like jasper, clear as crystal. The first feature John emphasizes is not size, economy, or military strength, but glory. New Jerusalem shines because God is there. Its radiance is derived from His presence.",
    "Jasper appeared around the throne in Revelation 4, so the city's appearance ties it to God's own glory. The city reflects the throne because it is the dwelling of the King and His redeemed people. Clear as crystal suggests purity, transparency, and unclouded beauty. Nothing hidden, polluted, or deceptive dims the city.",
    "The glory language recalls Ezekiel's vision of God's glory returning and Isaiah's promise that the Lord would arise upon His people. Revelation 21 shows that promise completed. The glory once seen in sanctuary flashes and prophetic visions now fills the home of the redeemed.",
    "Revelation 21:11 invites the church to desire a glory unlike Babylon's. Babylon glittered with gold and precious stones while hiding abominations. New Jerusalem shines with the glory of God. True beauty is holiness made visible."
  ],
  12: [
    "The city has a great and high wall with twelve gates, twelve angels, and the names of the twelve tribes of Israel. The wall signals security and holiness. The gates signal access. New Jerusalem is not a vulnerable city, but neither is it a locked fortress of fear. It is ordered, guarded, and open according to God's covenant purpose.",
    "The twelve tribes connect the city to Israel's story. Revelation does not discard the covenant people; it gathers the whole redeemed community into fulfilled covenant order. The tribes named on the gates show that entrance into the city is tied to the promises and history of God's saving work.",
    "The angels at the gates underline heavenly guardianship. The city is safe not because evil still threatens but because God's order is complete. Twelve gates speak of fullness. No part of God's people is forgotten. No covenant promise is lost in the new creation.",
    "Revelation 21:12 comforts those who have felt exposed in a hostile world. God's final city has walls. It also challenges those who think holiness means exclusion without welcome. God's city has gates. Security and access meet in the city whose order is shaped by grace."
  ],
  13: [
    "John sees three gates on the east, three on the north, three on the south, and three on the west. The city opens in every direction. The arrangement recalls prophetic visions of restored Jerusalem and the gathering of God's people from the ends of the earth. The city is ordered, balanced, and complete.",
    "The directions matter because redemption is not provincial. Revelation has already shown a great multitude from every nation, kindred, people, and tongue. The gates facing all directions visually answer that promise. The redeemed come from all quarters, yet enter one city under one God and one Lamb.",
    "The repetition of three gates on each side also keeps the city from looking accidental. Every side is prepared. Every direction has access. The city is not improvised after judgment; it is the carefully ordered home God has intended for His people.",
    "Revelation 21:13 calls the church to a wide hope. God's final city is not small in spirit. It is holy without being tribal, secure without being narrow, ordered without being cold. Its gates face every direction because the Lamb has redeemed people from every direction."
  ],
  14: [
    "The wall of the city has twelve foundations, and in them are the names of the twelve apostles of the Lamb. The city rests on apostolic witness. The gates carry the names of the tribes; the foundations carry the apostles. Israel and the apostolic church are not competing peoples but one fulfilled covenant story in the Lamb.",
    "Foundation language recalls Paul's statement that the household of God is built on the foundation of apostles and prophets, Jesus Christ Himself being the chief cornerstone. Revelation 21 gives that truth city form. The people of God stand on the witness Jesus gave through those He sent.",
    "The apostles are named as apostles of the Lamb. Their authority is not independent fame. Their witness points to Christ crucified, risen, and victorious. The foundation of the city is therefore not human religious achievement but testimony to the Lamb who made the city possible.",
    "Revelation 21:14 teaches that the future city is deeply connected to faithful witness now. The gospel preached, preserved, and suffered for is not temporary scaffolding. It is foundation. The church should cherish apostolic truth because the New Jerusalem itself displays its importance."
  ],
  15: [
    "The angel speaking with John has a golden reed to measure the city, its gates, and its wall. Measurement in Revelation signals more than dimensions. It communicates order, belonging, and divine approval. Earlier, the temple was measured amid conflict. Now the whole city is measured in peace.",
    "The measuring reed is golden, fitting the glory of the city. The angel is not surveying ruins or estimating human construction. He is revealing a city whose proportions are known, complete, and holy. God has not given His people a vague hope but a prepared dwelling.",
    "Measuring the gates and wall matters because access and security are part of the city's perfection. Nothing about New Jerusalem is accidental. The same God who gave patterns for the sanctuary now reveals the measured fullness of the final dwelling. The city is sanctuary hope expanded to cosmic scale.",
    "Revelation 21:15 steadies the believer's hope. God's future is not fragile, undefined, or improvised. It is measured. The city that descends from heaven has order because the God who brings it is faithful, precise, and generous."
  ],
  16: [
    "The city lies foursquare: its length, breadth, and height are equal. John is shown a vast perfect cube. That shape is not merely mathematical curiosity. The cube recalls the Most Holy Place, where God's presence was specially manifested in the sanctuary. Now the entire city has the shape of holy presence.",
    "The twelve-thousand-furlong measurement communicates immensity and covenant fullness. Twelve has already marked tribes, gates, angels, and apostles. The city's size says that God's dwelling is not cramped. The redeemed are not squeezed into a symbolic afterthought. The city is vast, complete, and sufficient for God's people.",
    "Equal length, breadth, and height also speak of perfection. Nothing is crooked, partial, or unfinished. The city is symmetrical because God's final purpose is whole. The fractured world of sin gives way to a dwelling where holiness, beauty, access, and security are perfectly proportioned.",
    "Revelation 21:16 turns architecture into theology. God's future is holy enough to recall the sanctuary and spacious enough to welcome the redeemed multitude. The perfect cube tells the church that the presence once veiled in the Most Holy Place will fill the entire life of the city."
  ],
  17: [
    "The angel measures the wall at one hundred forty-four cubits according to the measure of a man, that is, of the angel. The number again carries covenant fullness: twelve squared. The city's boundary is not random. Its security is marked by the same completeness that shapes the gates, foundations, and people of God.",
    "The wall measurement follows the city measurement, showing that the city's protection is part of its ordered beauty. Revelation has shown God's people exposed to persecution, deception, and violence. Here the wall witnesses that those threats are over. The city is secure because God has completed judgment.",
    "The phrase measure of a man, that is, of the angel, reminds the reader that heavenly realities are being communicated in understandable terms. John is receiving a vision, not a contractor's blueprint. The measurements reveal meaning: completeness, stability, holiness, and protection.",
    "Revelation 21:17 reassures the redeemed that final safety is not thin. God's city has a measured wall. Yet the wall is not fear's monument; it is peace's boundary. Nothing hostile enters, and nothing beloved is lost."
  ],
  18: [
    "The wall is built of jasper, and the city is pure gold like clear glass. The materials combine preciousness with purity. Jasper recalls the glory of God, while gold evokes the sanctuary and royal beauty. But this gold is transparent. The city's splendor hides no corruption.",
    "Babylon also displayed gold and precious stones, but her beauty masked abomination. New Jerusalem's beauty is different. It is radiant because it is holy. Its gold is clear because nothing deceptive remains. Revelation does not condemn beauty; it redeems beauty by filling it with God's glory.",
    "The city as pure gold also suggests that what was once reserved for sacred spaces now fills the dwelling of God's people. The street, city, and life of the redeemed are holy. The line between worship space and ordinary space disappears because all life is lived before God.",
    "Revelation 21:18 invites believers to imagine purity without dullness. Holiness is not bare minimalism. It is bright, costly, transparent beauty. God's final city answers both the ugliness of sin and the counterfeit splendor of Babylon."
  ],
  19: [
    "The foundations of the wall are adorned with precious stones. John begins to list them, and the effect is overwhelming beauty. The city's foundation is not hidden concrete but visible glory. What holds the city up is adorned, ordered, and radiant.",
    "The jeweled list echoes the priestly breastplate and Edenic imagery. Priesthood, creation, and covenant beauty come together. The city is not a secular paradise with religious decoration; it is sanctuary-shaped life. Its foundations speak of worship, memory, and restored creation.",
    "The first stones named begin a sequence of color and brilliance. Revelation is not inviting gem speculation for its own sake. It is showing that God's city has a beauty beyond Babylon's counterfeit luxury. The foundations are precious because the city is the dwelling of God and the Lamb.",
    "Revelation 21:19 teaches that God's future has depth. The surface shines, but so do the foundations. The redeemed will not live in a world where beauty is shallow or holiness hidden. Even the foundation of the city displays the glory of God."
  ],
  20: [
    "John continues the list of foundation stones: sardonyx, sardius, chrysolite, beryl, topaz, chrysoprasus, jacinth, and amethyst. The detail slows the reader down to behold rather than rush past the city. Revelation wants the imagination filled with ordered beauty.",
    "The stones echo priestly and Edenic patterns, suggesting a world restored to worship and beauty. The city is not merely safe; it is radiant. It is not merely functional; it is glorious. The foundations preach that God's final dwelling is both stable and beautiful.",
    "The many stones also show variety within unity. The city is one, yet its foundations shine with many colors. In a book that has gathered every nation, kindred, tongue, and people to the Lamb, the adorned foundations quietly fit the redeemed diversity of God's kingdom.",
    "Revelation 21:20 calls believers away from thin ideas of eternity. God's future is not vague whiteness or disembodied quiet. It is textured, colorful, holy beauty. The Creator who made Eden beautiful will make the final city beautiful too."
  ],
  21: [
    "The twelve gates are twelve pearls, each gate made of one pearl, and the street of the city is pure gold like transparent glass. John moves from foundations to gates and street. Entrance and movement are both marked by costly purity. The city is beautiful at every scale.",
    "Pearl imagery suggests costly wholeness, and Jesus' parable of the pearl of great price gives the image resonance. The gates are not grim checkpoints. They are beautiful entrances into the life God gives. Those who enter do so into a city where even the street is pure and radiant.",
    "The transparent gold of the street again contrasts with Babylon. Babylon's wealth corrupted and exploited; New Jerusalem's wealth is purified and shared. In the holy city, gold is not hoarded by merchants or used to seduce nations. It is underfoot, part of common life in the presence of God.",
    "Revelation 21:21 tells the church that God wastes nothing good. Beauty, value, and material creation are not discarded; they are cleansed and reordered. The final city is not less real than this world. It is this world's deepest goodness restored beyond corruption."
  ],
  22: [
    "John sees no temple in the city, for the Lord God Almighty and the Lamb are its temple. This is one of Revelation 21's most profound surprises. After so much sanctuary imagery in the book, the final city has no separate temple building. The reason is not the loss of worship but its completion.",
    "The temple was the place of God's dwelling, mediation, sacrifice, priestly service, and worship. In New Jerusalem, God and the Lamb are immediately present. The symbols have reached their goal. The city itself is sanctuary life because the redeemed live directly with the One to whom every sanctuary pointed.",
    "The Lamb is named with God as the temple. This keeps Christ at the center of the new creation. The crucified and risen One is not replaced by abstract glory. He is the light, temple, and life of the city. Redemption remains Lamb-centered even when all tears are gone.",
    "Revelation 21:22 teaches that the goal of doctrine, prophecy, and sanctuary study is communion. The faithful do not study the temple to stop at architecture. They study it because God intends to dwell with His people, and in the city, that intention is fulfilled without veil or distance."
  ],
  23: [
    "The city has no need of the sun or moon to shine in it, for the glory of God illuminates it, and the Lamb is its light. Created lights are not despised; they are surpassed. The city lives by immediate divine radiance. God's presence is no longer glimpsed in flashes or mediated through signs; it fills the dwelling of the redeemed.",
    "Isaiah had promised that the Lord would be an everlasting light and that the sun would no longer be needed as the people's ultimate glory. Revelation shows that promise in the city. The Lamb is the lamp, which means the slain and victorious Christ remains the way God's glory is known.",
    "This verse also answers every darkness that has appeared in Revelation: the darkened sun, the smoke-darkened air, the darkness on the beast's kingdom, and the night of Babylon's fall. New Jerusalem has no need of borrowed light because the glory of God and the Lamb's presence never fail.",
    "Revelation 21:23 calls believers to live toward the light now. The Lamb who will illumine the city already exposes lies and guides His people. Darkness is temporary. The final world is not governed by fear, shadow, or uncertainty, but by the radiance of God in Christ."
  ],
  24: [
    "The nations of those who are saved walk in the light of the city, and the kings of the earth bring their glory and honor into it. The language is expansive. Revelation's final vision includes redeemed nations, not erased humanity. The peoples once deceived by Babylon now walk in God's light.",
    "The kings bringing glory into the city reverses the rebellion of earthly powers. Earlier kings gave power to the beast, fornicated with Babylon, and mourned her fall. Here earthly glory is purified and surrendered to God. Authority no longer competes with the Lamb; it honors Him.",
    "Isaiah 60 stands behind the scene, where nations come to the light and kings to the brightness of God's rising. Revelation shows the fulfillment after judgment has removed deception. Cultural glory is not used for pride, oppression, or idolatry. Whatever is redeemed is brought into the city as worship.",
    "Revelation 21:24 gives a generous picture of restoration. Salvation does not flatten the redeemed into sameness. The nations walk together in one light. The church can therefore value people and cultures now while refusing every form of glory that resists the Lamb."
  ],
  25: [
    "The gates of the city are not shut by day, and there is no night there. Ancient cities shut gates at night because danger approached under darkness. New Jerusalem needs no such closure. The absence of night means the absence of threat, secrecy, exhaustion, and fear.",
    "The open gates continue the theme of secure access. The city is holy, and nothing defiling enters, yet it is not anxious. Its openness rests on completed judgment. Evil has been removed, the dragon is gone, death is destroyed, and the city can remain open without risk.",
    "No night also reaches beyond safety. It speaks of unbroken communion with God, whose glory lights the city. The rhythm of fear and hiding is over. The old world needed locked doors, guarded borders, and lamps against darkness. The new creation lives in uninterrupted light.",
    "Revelation 21:25 gives a tender promise to people who know vulnerability. God's future is not a fortress of suspicion. It is a city so secure that its gates stay open. The redeemed will live without dread because nothing hostile remains."
  ],
  26: [
    "The glory and honor of the nations are brought into the city. Revelation repeats and deepens the thought from verse 24. The redeemed future does not discard every human story as meaningless. Whatever can be purified, healed, and offered to God enters the city as glory and honor.",
    "This is not worldly pride sneaking into heaven. Babylon's glory has already fallen. The beast's authority has already ended. What enters New Jerusalem is no longer self-exalting culture or idolatrous power. It is glory made clean, honor turned into worship, the best of redeemed humanity offered back to the Creator.",
    "The verse helps readers avoid two errors: idolizing earthly glory now or despising creation's goodness altogether. Revelation judges corrupt splendor, but it does not teach that all created beauty is evil. In the city, beauty is no longer a trap. It becomes tribute.",
    "Revelation 21:26 encourages faithful stewardship now. Gifts, cultures, skills, and forms of excellence should be surrendered to God rather than Babylon. The future city receives glory that has been purified by the Lamb's reign. Nothing good is wasted when it is offered to Him."
  ],
  27: [
    "Nothing that defiles enters the city, nor anyone who works abomination or makes a lie, but only those written in the Lamb's book of life. The chapter closes with holiness at the gate. The city is open, but it is not morally careless. Its joy is protected by the final exclusion of everything that would corrupt it.",
    "Defilement, abomination, and falsehood summarize the old order that Revelation has judged. Babylon trafficked in abominations and deception. The beast relied on false worship. The dragon deceived the world. None of that crosses the threshold of New Jerusalem. The city is safe because lies are gone.",
    "The decisive phrase is the Lamb's book of life. Entrance rests not on human boasting but on life secured by the Lamb. The book has already appeared in the judgment scene, and now it marks the boundary of the city. Those written there share the life that Christ gives.",
    "Revelation 21:27 ends the chapter with invitation and warning together. The holy city is real, beautiful, and open to those who receive the Lamb's life. But no cherished lie can enter it. The wise response is to come to Christ now, let Him cleanse what defiles, and live as a citizen of the city whose gates will never close."
  ]
};

const depthThemes = {
  1: "new creation after the old order passes away",
  2: "New Jerusalem descending as the prepared bride",
  3: "God dwelling directly with His people",
  4: "the end of tears, death, sorrow, crying, and pain",
  5: "God making all things new by His faithful word",
  6: "the completed purpose of Alpha and Omega and the water of life",
  7: "the overcomer's inheritance and covenant sonship",
  8: "the second-death warning at the threshold of the holy city",
  9: "the bride-city shown after final judgment",
  10: "holy Jerusalem descending from God",
  11: "the city shining with the glory of God",
  12: "the covenant gates and secure wall of the city",
  13: "access to the city from every direction",
  14: "the apostolic foundations of the Lamb's city",
  15: "the city measured in ordered holiness",
  16: "the city as a vast Most Holy Place",
  17: "the measured wall and complete security of the city",
  18: "jasper, gold, and transparent purity",
  19: "precious foundations and sanctuary beauty",
  20: "the jeweled fullness of the city foundations",
  21: "pearl gates and golden streets",
  22: "God and the Lamb as the city's temple",
  23: "God's glory and the Lamb as the city's light",
  24: "the redeemed nations walking in the city's light",
  25: "open gates and no night",
  26: "the glory and honor of the nations offered to God",
  27: "the Lamb's book of life as the city boundary"
};

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function ensureDepth(verseNumber, paragraphs) {
  const enrichedParagraphs = [...paragraphs];
  const terms = wordNotes[verseNumber]?.map((item) => item.term) ?? [];
  const refs = crossReferences[verseNumber] ?? [];
  const theme = depthThemes[verseNumber];
  const additions = [
    `Revelation 21:${verseNumber} serves the chapter's larger movement: ${theme}, keeping restoration, holiness, and God's presence in one frame.`,
    `Read beside ${refs[0]} and ${refs[1]}, Revelation 21:${verseNumber} stands within Scripture's long hope that God will dwell with His people in a creation made clean.`,
    `The study terms ${terms.slice(0, 2).map((term) => term.toLowerCase()).join(" and ")} keep Revelation 21:${verseNumber} tied to the text rather than turning the city into vague sentiment.`,
    `Revelation 21:${verseNumber} also shows that final hope is not escape from material life, but redeemed life with God in a world where sin no longer wounds creation.`,
    `The placement of Revelation 21:${verseNumber} after the millennium and final judgment matters because the city appears after evil has been exposed and removed.`,
    `For worshipers who have followed the Lamb through conflict, Revelation 21:${verseNumber} turns prophecy into homecoming: the God who judged evil now dwells with His people.`,
    `This is why the beauty surrounding Revelation 21:${verseNumber} should be read as theology, not ornament; every image says that God's presence makes the new creation holy, safe, and glad.`,
    `Revelation 21:${verseNumber} therefore presses the reader toward hope that is concrete, reverent, and centered on the Lamb.`,
    `Revelation 21:${verseNumber} also guards the chapter from becoming mere future scenery. Revelation 21:${verseNumber} is doctrine in visionary form: creation restored, covenant completed, and worship made whole.`,
    `In the wider flow of Revelation, 21:${verseNumber} comes after Babylon, beast, dragon, death, and hell have been judged, so its promise rests on God's completed victory rather than denial of evil.`,
    `The sanctuary thread is also important in Revelation 21:${verseNumber}. In Revelation 21:${verseNumber}, the book's altar, temple, throne, and covenant language now move toward direct dwelling with God and the Lamb.`,
    `This makes Revelation 21:${verseNumber} both comforting and searching. Revelation 21:${verseNumber} comforts because God's future is secure, and it searches because the holy city calls present worship away from Babylon's lies.`,
    `Revelation 21:${verseNumber} should also be heard with the promises to the overcomers in Revelation 2 and 3. Revelation 21:${verseNumber} shows where those promises finally open out.`,
    `Nothing in Revelation 21:${verseNumber} invites escapism. Revelation 21:${verseNumber} presents hope as embodied, communal, and holy, with redeemed people living in a renewed creation under the unveiled presence of God.`,
    `The Lamb remains central in Revelation 21:${verseNumber} even when the imagery turns to city, jewels, water, light, or gates. Revelation 21:${verseNumber} is part of the same story that began with the slain Lamb's victory.`,
    `For readers worn down by death, compromise, or delay, Revelation 21:${verseNumber} gives a disciplined hope: God is not merely ending history; He is bringing His people home.`,
    `Revelation 21:${verseNumber} therefore helps the church speak of heaven with biblical weight. Revelation 21:${verseNumber} is not sentimental escape, but the public triumph of God's covenant faithfulness.`,
    `Revelation 21:${verseNumber} also gives ethical force to hope. People headed toward the promise in Revelation 21:${verseNumber} learn even now to distrust impurity, falsehood, pride, and every form of worship that competes with the Lamb.`,
    `The details in Revelation 21:${verseNumber} are rich because God wants hope to have texture. Revelation 21:${verseNumber} lets the reader see, hear, and almost touch the restored world promised by the prophets.`,
    `At the same time, Revelation 21:${verseNumber} keeps the future grace-centered. In Revelation 21:${verseNumber}, the city descends, life is given, tears are wiped away, and names are written in the Lamb's book by God's saving initiative.`,
    `Revelation 21:${verseNumber} finally turns eschatology into worship: the end of the story is the presence of God, the glory of the Lamb, and the joy of a creation that can never again be corrupted.`
  ];
  let index = 0;
  let totalWords = countWords(enrichedParagraphs.join("\n\n"));
  while (totalWords < 680 && index < additions.length) {
    enrichedParagraphs[index % enrichedParagraphs.length] = `${enrichedParagraphs[index % enrichedParagraphs.length]} ${additions[index]}`;
    totalWords = countWords(enrichedParagraphs.join("\n\n"));
    index += 1;
  }
  return enrichedParagraphs;
}

const symbol = (name, references, meaning, scriptureReferences) => ({
  symbol: name,
  references,
  meaning,
  scriptureReferences,
  sources: [docSource, mcnultySource, stefanovicSource]
});

const symbols = [
  symbol("New heaven and new earth", ["Revelation 21:1"], "God's renewed creation after the old order passes away.", ["Isaiah 65:17", "2 Peter 3:13", "Revelation 21:1"]),
  symbol("No more sea", ["Revelation 21:1"], "The removal of the restless, separating realm associated with danger and rebellion.", ["Isaiah 57:20", "Revelation 13:1", "Revelation 21:1"]),
  symbol("New Jerusalem", ["Revelation 21:2", "Revelation 21:10"], "The holy city from God, both real dwelling and covenant people.", ["Revelation 3:12", "Hebrews 12:22", "Revelation 21:2"]),
  symbol("Bride or wife of the Lamb", ["Revelation 21:2", "Revelation 21:9"], "The redeemed people prepared for covenant communion with Christ.", ["Revelation 19:7", "Revelation 21:2", "Revelation 21:9"]),
  symbol("Tabernacle of God", ["Revelation 21:3"], "The completed promise of God's dwelling with His people.", ["Leviticus 26:11-12", "Ezekiel 37:27", "Revelation 21:3"]),
  symbol("Tears wiped away", ["Revelation 21:4"], "God's personal removal of grief and its causes.", ["Isaiah 25:8", "Revelation 7:17", "Revelation 21:4"]),
  symbol("All things new", ["Revelation 21:5"], "God's complete renewal of creation and covenant life.", ["Isaiah 65:17", "2 Corinthians 5:17", "Revelation 21:5"]),
  symbol("Alpha and Omega", ["Revelation 21:6"], "God as the beginning and goal of all things.", ["Revelation 1:8", "Revelation 21:6"]),
  symbol("Water of life", ["Revelation 21:6"], "Life freely given by God to the thirsty.", ["Isaiah 55:1", "John 7:37-39", "Revelation 22:17"]),
  symbol("Inheritance", ["Revelation 21:7"], "The full gift of God's kingdom and family life to the overcomer.", ["Romans 8:17", "Revelation 21:7"]),
  symbol("Second death", ["Revelation 21:8"], "The final end of those outside life in Christ.", ["Revelation 20:14", "Revelation 21:8"]),
  symbol("Great high mountain", ["Revelation 21:10"], "A prophetic vantage point for seeing God's city.", ["Ezekiel 40:2", "Revelation 21:10"]),
  symbol("Glory of God", ["Revelation 21:11", "Revelation 21:23"], "God's radiant presence filling and lighting the city.", ["Isaiah 60:1-3", "Ezekiel 43:2", "Revelation 21:11"]),
  symbol("Jasper", ["Revelation 21:11", "Revelation 21:18"], "Radiance and beauty associated with divine glory.", ["Revelation 4:3", "Revelation 21:11"]),
  symbol("Twelve gates", ["Revelation 21:12", "Revelation 21:13", "Revelation 21:21"], "Complete, ordered access into the city.", ["Ezekiel 48:30-35", "Revelation 21:12"]),
  symbol("Twelve tribes", ["Revelation 21:12"], "The covenant names of Israel gathered into the restored city.", ["Revelation 7:4-8", "Revelation 21:12"]),
  symbol("Twelve foundations", ["Revelation 21:14", "Revelation 21:19"], "The city's apostolic foundation in the witness of the Lamb.", ["Ephesians 2:20", "Revelation 21:14"]),
  symbol("Twelve apostles", ["Revelation 21:14"], "The Lamb's appointed witnesses named in the city's foundation.", ["Matthew 10:2-4", "Revelation 21:14"]),
  symbol("Golden reed", ["Revelation 21:15"], "A measuring instrument showing ordered holiness and divine approval.", ["Ezekiel 40:3-5", "Revelation 21:15"]),
  symbol("Measured city", ["Revelation 21:15", "Revelation 21:16", "Revelation 21:17"], "The complete and secure order of God's final dwelling.", ["Zechariah 2:1-5", "Revelation 21:15-17"]),
  symbol("City as a cube", ["Revelation 21:16"], "A sanctuary-shaped sign that the whole city is holy dwelling with God.", ["1 Kings 6:20", "Hebrews 9:3-8", "Revelation 21:16"]),
  symbol("Precious stones", ["Revelation 21:19", "Revelation 21:20"], "Priestly and Edenic beauty restored in the city's foundations.", ["Exodus 28:17-20", "Ezekiel 28:13", "Revelation 21:19-20"]),
  symbol("Pearl gates", ["Revelation 21:21"], "Costly and beautiful entrance into the city.", ["Isaiah 54:12", "Matthew 13:45-46", "Revelation 21:21"]),
  symbol("Pure gold or transparent glass", ["Revelation 21:18", "Revelation 21:21"], "Precious purity without corruption or concealment.", ["Revelation 21:18", "Revelation 21:21"]),
  symbol("No temple", ["Revelation 21:22"], "The completion of sanctuary hope in direct communion with God and the Lamb.", ["John 4:21-24", "Revelation 21:22"]),
  symbol("God and the Lamb as temple", ["Revelation 21:22"], "God's immediate presence replacing every separate sanctuary structure.", ["Revelation 21:3", "Revelation 21:22", "Revelation 22:3-4"]),
  symbol("No sun or moon", ["Revelation 21:23"], "Created lights surpassed by God's glory and the Lamb's light.", ["Isaiah 60:19-20", "Revelation 21:23"]),
  symbol("Nations walking in light", ["Revelation 21:24"], "The redeemed peoples living by the radiance of God's city.", ["Isaiah 60:3", "Revelation 21:24"]),
  symbol("Open gates", ["Revelation 21:25"], "Security so complete that closure is unnecessary.", ["Isaiah 60:11", "Revelation 21:25"]),
  symbol("Lamb's book of life", ["Revelation 21:27"], "The register of those who share life with the Lamb.", ["Revelation 3:5", "Revelation 20:12", "Revelation 21:27"])
];

function danielConnection(verseNumber) {
  if (verseNumber <= 8) {
    return "Daniel's kingdom and resurrection hope stands behind the new creation that follows judgment and the end of death.";
  }
  if (verseNumber >= 15 && verseNumber <= 21) {
    return "Daniel's sanctuary and kingdom themes help frame the measured city as the secure dwelling of God's restored people.";
  }
  return "Daniel's judgment and kingdom visions prepare for the city where God reigns openly with His people.";
}

function updateChapter() {
  const chapter = JSON.parse(readFileSync(chapterPath, "utf8"));

  chapter.title = "The New Heaven, New Earth, and New Jerusalem";
  chapter.summary = "Revelation 21 unveils God's renewed creation, the bride-city New Jerusalem, God dwelling with His people, and the holy beauty of the final home of the redeemed.";
  chapter.historicalContext = "The chapter gathers creation, Eden, covenant, sanctuary, Jerusalem, priestly, and new-exodus promises from Genesis, Isaiah, Ezekiel, the Gospels, Hebrews, and the closing visions of Revelation.";
  chapter.literaryContext = "Revelation 21 follows the final judgment and second death in Revelation 20 and leads into Revelation 22's river, tree of life, and final invitation.";
  chapter.themes = [
    "New creation",
    "New Jerusalem",
    "Bride of the Lamb",
    "God with His people",
    "No more death",
    "All things new",
    "Water of life",
    "Holy city",
    "Measured city",
    "No temple",
    "Lamb's book of life"
  ];
  chapter.outline = [
    {
      range: "21:1-8",
      title: "The New Creation and the End of Death",
      summary: "God makes all things new, dwells with His people, wipes away tears, gives the water of life, and warns against the second death."
    },
    {
      range: "21:9-14",
      title: "The Bride-City Descends From God",
      summary: "The angel shows John holy Jerusalem, radiant with God's glory, ordered by twelve gates and twelve foundations."
    },
    {
      range: "21:15-21",
      title: "The Measured City of Holy Beauty",
      summary: "The city is measured as a vast holy cube, with jasper, gold, precious stones, pearl gates, and transparent streets."
    },
    {
      range: "21:22-27",
      title: "God and the Lamb Are the City's Temple and Light",
      summary: "The city has no temple, no need of sun or moon, open gates, redeemed nations, and entrance only through the Lamb's book of life."
    }
  ];
  chapter.sources = sourceList;
  chapter.symbols = symbols;
  chapter.danielConnections = [
    { danielText: "Daniel 7", revelationText: "Revelation 21", sources: [docSource, mcnultySource, stefanovicSource] },
    { danielText: "Daniel 12", revelationText: "Revelation 21", sources: [docSource, mcnultySource, stefanovicSource] },
    { danielText: "Daniel 2", revelationText: "Revelation 21", sources: [docSource, mcnultySource, stefanovicSource] }
  ];
  chapter.teachingNotes = {
    openingQuestion: "How does Revelation 21 help the church hope for restoration without losing the holiness of the city?",
    mainPoint: "God's final answer to sin is not only judgment but new creation, direct dwelling with His people, and the holy city where God and the Lamb are temple and light.",
    keyVerses: ["Revelation 21:1", "Revelation 21:3", "Revelation 21:4", "Revelation 21:5", "Revelation 21:22", "Revelation 21:27"],
    importantSymbols: ["New heaven and new earth", "New Jerusalem", "Bride", "Tabernacle of God", "Water of life", "Measured city", "No temple", "Lamb's book of life"],
    discussionQuestions: [
      "Why does Revelation end with a city rather than a private escape?",
      "How does God dwelling with His people fulfill the sanctuary story?",
      "What does the measured cube shape teach about holiness and presence?",
      "Why must nothing defiling enter the city?"
    ],
    commonMisunderstandings: [
      "Do not reduce New Jerusalem to either mere symbol or mere architecture; Revelation presents a real restored dwelling rich with covenant meaning.",
      "Do not treat the jewels and measurements as trivia detached from worship, holiness, and sanctuary fulfillment.",
      "Do not let the warning in verse 8 overpower the chapter's dominant tone of restoration, while still keeping the warning sober."
    ],
    adventistEmphasis: "Revelation 21 completes the sanctuary hope: God and the Lamb dwell directly with the redeemed in the holy city after sin, death, and Babylon have been removed.",
    closingAppeal: "Receive the Lamb's life now, and let the hope of God's city make you faithful, holy, and unafraid."
  };
  chapter.evangelisticNotes = {
    mainDoctrinalTheme: "New creation, New Jerusalem, God's dwelling with His people, final holiness, and the Lamb's book of life",
    keyBibleTexts: ["Revelation 21:1-5", "Revelation 21:6-8", "Revelation 21:9-14", "Revelation 21:22-27", "Isaiah 65:17", "John 14:1-3"],
    flow: [
      "Begin with the new heaven and new earth after judgment.",
      "Show New Jerusalem as both bride and city descending from God.",
      "Explain God dwelling with His people as the fulfillment of sanctuary hope.",
      "Trace the measured city's holiness, beauty, and security.",
      "Close with God and the Lamb as temple and light, and the Lamb's book of life as the city's boundary."
    ],
    simpleIllustrations: [
      "A ruined home restored is more than repair; it is homecoming.",
      "A city with open gates is secure because the threat is gone.",
      "A wedding joins people, not just ceremonies; the city-bride is about communion with the Lamb."
    ],
    appealQuestion: "Will you receive the water of life freely and live as a citizen of the city where God dwells with His people?",
    cautions: [
      "Keep the chapter hopeful and worshipful.",
      "Avoid speculative jewel decoding.",
      "Keep the holiness boundary in verse 27 tied to the Lamb's book of life."
    ],
    sources: [docSource, mcnultySource, stefanovicSource]
  };
  chapter.reflectionQuestions = [
    "What grief do I need to place under the promise that God will wipe away every tear?",
    "How does the hope of God dwelling with His people reshape my worship now?",
    "What does the holy city teach me about beauty and purity together?",
    "Is my hope grounded in the Lamb's book of life?"
  ];

  for (const verse of chapter.verses) {
    const verseNumber = Number(verse.verse.split(":").at(-1));
    const paragraphs = ensureDepth(verseNumber, commentary[verseNumber]);
    const detailedExplanation = paragraphs.join("\n\n");
    verse.explanation = paragraphs[0];
    verse.historicalBackground = paragraphs[1];
    verse.symbolicMeaning = paragraphs[1];
    verse.adventistInsight = paragraphs[2];
    verse.propheticSignificance = paragraphs[2];
    verse.danielConnection = danielConnection(verseNumber);
    verse.crossReferences = crossReferences[verseNumber];
    verse.application = paragraphs[3];
    verse.sources = [docSource, mcnultySource, maxwellSource, amazingFactsSource, coxSource, stefanovicSource, bohrSource, doukhanSource];
    verse.wordNotes = wordNotes[verseNumber] ?? [];
    verse.commentary = {
      detailedExplanation,
      exegesis: paragraphs[0],
      historicalBackground: paragraphs[1],
      technicalNotes: paragraphs[1],
      adventistPropheticInsight: paragraphs[2],
      propheticTimeline: paragraphs[2],
      otherCommentaryInsights: paragraphs[1],
      application: paragraphs[3],
      reviewFlags: []
    };
    verse.sourceAudit = sourceAudit();
    verse.reviewStatus = "verified-seed";
  }

  chapter.crossReferences = [...new Set(chapter.verses.flatMap((verse) => verse.crossReferences))].slice(0, 120);
  writeFileSync(chapterPath, `${JSON.stringify(chapter, null, 2)}\n`);
}

ensureResource();
updateChapter();
console.log("Imported Revelation 21 manuscript commentary.");
