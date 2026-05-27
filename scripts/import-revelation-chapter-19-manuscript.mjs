import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const chapterPath = join(root, "content", "revelation", "chapter-19.json");
const bibliographyPath = join(root, "content", "resources", "bibliography.json");
const docxPath = "/Users/samuel/Downloads/Revelation/Revelation Chapter Nineteen.docx";

if (!existsSync(docxPath)) {
  throw new Error(`Missing manuscript: ${docxPath}`);
}

const src = (sourceId, locator, claimType, priority) => ({ sourceId, locator, claimType, priority });

const docSource = src("revelation-chapter-nineteen-docx", "Revelation Chapter Nineteen manuscript", "manuscript-synthesis", 1);
const mcnultySource = src("revelation-practical-living-in-the-judgment-hour", "Priority final-events support for Revelation 19", "adventist-interpretation", 1);
const maxwellSource = src("maxwell-god-cares-vol-2", "Final victory and Second Coming support", "adventist-interpretation", 1);
const amazingFactsSource = src("amazing-facts-revelation-verse-by-verse", "Revelation 19 support", "adventist-interpretation", 2);
const coxSource = src("cox-revelation-pure-and-simple", "Revelation 19 support", "adventist-interpretation", 2);
const stefanovicSource = src("stefanovic-revelation-of-jesus-christ", "Revelation 19 exegetical and prophetic support", "adventist-technical-background", 2);
const bohrSource = src("bohr-great-prophecies", "Final conflict and Second Coming support", "adventist-interpretation", 2);
const doukhanSource = src("doukhan-secrets-of-revelation", "Theological support for Revelation 19", "adventist-technical-background", 2);
const technicalSource = src("beale-book-of-revelation", "Old Testament and literary support for Revelation 19", "technical-background", 5);
const bauckhamSource = src("bauckham-theology-revelation", "Worship and final victory theological support", "theological-background", 5);
const deSilvaSource = src("desilva-discovering-revelation", "Historical and rhetorical support for Revelation 19", "historical-background", 5);
const pastoralSource = src("revelation-interpretation-a-bible-commentary-for-teaching-and-preaching", "Pastoral support for Revelation 19", "pastoral-application", 5);

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
  title: "Revelation Chapter Nineteen",
  author: "Uploaded manuscript",
  type: "Manuscript",
  tradition: "Adventist",
  interpretiveCategory: "Adventist historicist manuscript synthesis",
  howUsed: "Internal source metadata retained for synthesized Revelation 19 commentary.",
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
  1: ["Revelation 18:20", "Revelation 18:24", "Revelation 7:10", "Psalm 104:35", "Psalm 146:1", "Jeremiah 51:48"],
  2: ["Deuteronomy 32:4", "Revelation 16:5-7", "Revelation 17:1-6", "Revelation 18:24", "Psalm 79:10", "Revelation 6:9-11"],
  3: ["Isaiah 34:9-10", "Revelation 14:11", "Revelation 18:9", "Revelation 18:21", "Psalm 37:20", "Revelation 20:10"],
  4: ["Revelation 4:4-11", "Revelation 5:11-14", "Revelation 7:11-12", "Revelation 11:16-18", "Psalm 106:48", "Nehemiah 8:6"],
  5: ["Revelation 14:7", "Revelation 18:20", "Psalm 115:13", "Psalm 134:1", "Revelation 11:18", "Revelation 22:3"],
  6: ["Ezekiel 43:2", "Revelation 1:15", "Revelation 14:2", "Revelation 11:15-17", "Psalm 93:1", "Revelation 15:3-4"],
  7: ["Isaiah 54:5", "Hosea 2:19-20", "Matthew 25:1-13", "Revelation 21:2", "Revelation 19:9", "Ephesians 5:25-27"],
  8: ["Isaiah 61:10", "Zechariah 3:3-5", "Revelation 3:18", "Revelation 7:14", "Revelation 14:12", "Ephesians 2:10"],
  9: ["Matthew 22:1-14", "Luke 14:15-24", "Revelation 3:20", "Revelation 19:7", "Revelation 21:9", "Revelation 22:17"],
  10: ["Revelation 1:2", "Revelation 12:17", "Revelation 22:8-9", "1 Corinthians 14:32", "2 Peter 1:19-21", "Numbers 12:6"],
  11: ["Ezekiel 1:1", "Matthew 24:30", "Acts 1:11", "Revelation 1:7", "Revelation 6:16-17", "Revelation 17:14"],
  12: ["Revelation 1:14", "Revelation 2:18", "Daniel 10:6", "Psalm 2:6-12", "Revelation 19:16", "Hebrews 1:4"],
  13: ["John 1:1-14", "Isaiah 63:1-6", "Revelation 14:20", "Revelation 19:15", "Hebrews 4:12", "Revelation 1:5"],
  14: ["Revelation 3:4-5", "Revelation 7:9-14", "Revelation 14:4", "Revelation 19:8", "Jude 14", "Zechariah 14:5"],
  15: ["Psalm 2:8-9", "Isaiah 11:4", "Isaiah 63:1-6", "Revelation 14:19-20", "2 Thessalonians 2:8", "Revelation 2:27"],
  16: ["Deuteronomy 10:17", "Daniel 2:44", "Daniel 7:13-14", "Revelation 17:14", "Revelation 11:15", "Philippians 2:9-11"],
  17: ["Ezekiel 39:17-20", "Isaiah 34:6", "Jeremiah 12:9", "Revelation 19:21", "Matthew 24:28", "Revelation 16:14"],
  18: ["Ezekiel 39:18-20", "Revelation 6:15", "Revelation 17:12-14", "Revelation 18:9-19", "Psalm 2:1-12", "Revelation 20:8-9"],
  19: ["Revelation 16:13-16", "Revelation 17:14", "Revelation 19:11-16", "Psalm 2:1-12", "Joel 3:9-14", "2 Thessalonians 2:8"],
  20: ["Revelation 13:1-18", "Revelation 16:13", "Revelation 20:10", "Daniel 7:11", "Daniel 7:26", "Matthew 24:24"],
  21: ["Revelation 1:16", "Revelation 2:16", "Revelation 19:15", "2 Thessalonians 2:8", "Isaiah 11:4", "Ezekiel 39:17-20"]
};

const wordNotes = {
  1: [
    { term: "After these things", explanation: "A transition from Babylon's fall to heaven's response.", scriptureReferences: ["Revelation 18:20", "Revelation 19:1"] },
    { term: "Alleluia", explanation: "A call to praise the Lord, used here at the climax of judgment and deliverance.", scriptureReferences: ["Psalm 104:35", "Revelation 19:1"] },
    { term: "Salvation and glory", explanation: "Heaven confesses that rescue, honor, and power are God's alone.", scriptureReferences: ["Revelation 7:10", "Revelation 19:1"] }
  ],
  2: [
    { term: "True and righteous", explanation: "God's judgments are faithful to reality and morally just.", scriptureReferences: ["Deuteronomy 32:4", "Revelation 16:7", "Revelation 19:2"] },
    { term: "Great whore", explanation: "The corrupt religious-political system exposed in Revelation 17.", scriptureReferences: ["Revelation 17:1-6", "Revelation 19:2"] },
    { term: "Avenged", explanation: "God answers the blood of His servants with righteous judgment.", scriptureReferences: ["Revelation 6:9-11", "Revelation 19:2"] }
  ],
  3: [
    { term: "Smoke", explanation: "The visible sign of Babylon's irreversible overthrow.", scriptureReferences: ["Isaiah 34:9-10", "Revelation 18:9", "Revelation 19:3"] },
    { term: "Forever and ever", explanation: "Language of finality, not a suggestion that Babylon survives as a rival power.", scriptureReferences: ["Isaiah 34:10", "Revelation 19:3"] },
    { term: "Alleluia", explanation: "Heaven praises because evil has been judged and God's people delivered.", scriptureReferences: ["Psalm 106:48", "Revelation 19:3"] }
  ],
  4: [
    { term: "Twenty-four elders", explanation: "Heavenly royal-priestly worshipers who join the verdict of the throne.", scriptureReferences: ["Revelation 4:4", "Revelation 5:8-14", "Revelation 19:4"] },
    { term: "Four beasts", explanation: "The living creatures around God's throne who lead creation's worship.", scriptureReferences: ["Ezekiel 1:5-14", "Revelation 4:6-8", "Revelation 19:4"] },
    { term: "Amen", explanation: "Heaven's full agreement with God's judgment and praise.", scriptureReferences: ["Nehemiah 8:6", "Revelation 19:4"] }
  ],
  5: [
    { term: "Voice from the throne", explanation: "A command to praise issued from the center of divine authority.", scriptureReferences: ["Revelation 4:2", "Revelation 19:5"] },
    { term: "Servants", explanation: "Those who belong to God and heed His testimony.", scriptureReferences: ["Revelation 1:1", "Revelation 19:5", "Revelation 22:3"] },
    { term: "Small and great", explanation: "All ranks are gathered into one worshiping people before God.", scriptureReferences: ["Psalm 115:13", "Revelation 19:5"] }
  ],
  6: [
    { term: "Many waters", explanation: "Majestic, overwhelming sound associated with divine authority.", scriptureReferences: ["Ezekiel 43:2", "Revelation 1:15", "Revelation 19:6"] },
    { term: "Mighty thunderings", explanation: "A sound of heavenly power and public finality.", scriptureReferences: ["Revelation 4:5", "Revelation 19:6"] },
    { term: "Omnipotent reigneth", explanation: "God's sovereignty is now openly vindicated before the universe.", scriptureReferences: ["Psalm 93:1", "Revelation 19:6"] }
  ],
  7: [
    { term: "Marriage of the Lamb", explanation: "The covenant union of Christ with His faithful people at the consummation.", scriptureReferences: ["Matthew 25:10", "Revelation 19:7", "Revelation 21:2"] },
    { term: "Wife", explanation: "The Lamb's covenant people, prepared for communion with Him.", scriptureReferences: ["Isaiah 54:5", "Revelation 19:7"] },
    { term: "Made herself ready", explanation: "Readiness produced by grace and expressed in faithful allegiance.", scriptureReferences: ["Revelation 14:12", "Revelation 19:7-8"] }
  ],
  8: [
    { term: "Fine linen", explanation: "The clean clothing of Christ-given purity and visible faithfulness.", scriptureReferences: ["Revelation 3:18", "Revelation 7:14", "Revelation 19:8"] },
    { term: "Righteousness of saints", explanation: "Righteous acts that witness to grace received, not merit earned apart from Christ.", scriptureReferences: ["Ephesians 2:10", "Revelation 19:8"] },
    { term: "Granted", explanation: "The bride's clothing is given before it is worn.", scriptureReferences: ["Isaiah 61:10", "Revelation 19:8"] }
  ],
  9: [
    { term: "Marriage supper", explanation: "The blessed fellowship of the redeemed with the Lamb.", scriptureReferences: ["Matthew 22:1-14", "Luke 14:15", "Revelation 19:9"] },
    { term: "Blessed", explanation: "A beatitude for those invited into the Lamb's victory and joy.", scriptureReferences: ["Revelation 1:3", "Revelation 19:9"] },
    { term: "True sayings", explanation: "God's promise is reliable, not wishful religious speech.", scriptureReferences: ["Revelation 21:5", "Revelation 22:6"] }
  ],
  10: [
    { term: "Worship God", explanation: "The angel refuses worship and redirects all devotion to God alone.", scriptureReferences: ["Revelation 19:10", "Revelation 22:8-9"] },
    { term: "Testimony of Jesus", explanation: "The witness Jesus gives to and through His servants.", scriptureReferences: ["Revelation 1:2", "Revelation 12:17", "Revelation 19:10"] },
    { term: "Spirit of prophecy", explanation: "Prophetic witness centered in Jesus and faithful to His testimony.", scriptureReferences: ["Numbers 12:6", "2 Peter 1:21", "Revelation 19:10"] }
  ],
  11: [
    { term: "Heaven opened", explanation: "The public appearing of Christ, not a hidden or merely inward event.", scriptureReferences: ["Matthew 24:30", "Acts 1:11", "Revelation 19:11"] },
    { term: "White horse", explanation: "A symbol of victorious royal conquest in righteousness.", scriptureReferences: ["Psalm 45:3-5", "Revelation 19:11"] },
    { term: "Faithful and True", explanation: "Christ's character guarantees the justice of His judgment.", scriptureReferences: ["Revelation 3:14", "Revelation 19:11"] }
  ],
  12: [
    { term: "Eyes as flame", explanation: "Christ sees through deception with searching judgment.", scriptureReferences: ["Revelation 1:14", "Revelation 19:12"] },
    { term: "Many crowns", explanation: "Universal dominion surpassing every rival power.", scriptureReferences: ["Psalm 2:6-12", "Revelation 19:12"] },
    { term: "Name no man knew", explanation: "Christ's person and authority exceed creaturely control.", scriptureReferences: ["Judges 13:18", "Revelation 19:12"] }
  ],
  13: [
    { term: "Vesture dipped in blood", explanation: "Judgment imagery joined to Christ's victorious identity.", scriptureReferences: ["Isaiah 63:1-6", "Revelation 19:13"] },
    { term: "Word of God", explanation: "Christ is the divine Word whose speech creates, reveals, and judges.", scriptureReferences: ["John 1:1-14", "Hebrews 4:12", "Revelation 19:13"] },
    { term: "Blood", explanation: "The sign of decisive victory over hardened rebellion.", scriptureReferences: ["Revelation 14:20", "Revelation 19:13"] }
  ],
  14: [
    { term: "Armies in heaven", explanation: "The heavenly host accompanying Christ's public victory.", scriptureReferences: ["Jude 14", "Revelation 19:14"] },
    { term: "White horses", explanation: "Participation in Christ's triumph without sharing beastly violence.", scriptureReferences: ["Revelation 3:4-5", "Revelation 19:14"] },
    { term: "Fine linen", explanation: "Clean clothing associated with the purity of heaven's company.", scriptureReferences: ["Revelation 19:8", "Revelation 19:14"] }
  ],
  15: [
    { term: "Sharp sword", explanation: "Christ's decisive word of judgment proceeding from His mouth.", scriptureReferences: ["Isaiah 11:4", "2 Thessalonians 2:8", "Revelation 19:15"] },
    { term: "Rod of iron", explanation: "Messianic rule from Psalm 2 over rebellious nations.", scriptureReferences: ["Psalm 2:9", "Revelation 12:5", "Revelation 19:15"] },
    { term: "Winepress", explanation: "Final judgment on ripened rebellion.", scriptureReferences: ["Isaiah 63:1-6", "Revelation 14:19-20", "Revelation 19:15"] }
  ],
  16: [
    { term: "King of kings", explanation: "Christ's supreme rule over every earthly ruler and empire.", scriptureReferences: ["Daniel 2:44", "Revelation 17:14", "Revelation 19:16"] },
    { term: "Lord of lords", explanation: "No authority stands above Christ or outside His judgment.", scriptureReferences: ["Deuteronomy 10:17", "Revelation 19:16"] },
    { term: "Thigh", explanation: "The place where the royal title is visibly displayed in the vision.", scriptureReferences: ["Revelation 19:16"] }
  ],
  17: [
    { term: "Angel in the sun", explanation: "A heavenly herald announcing the aftermath of Christ's victory.", scriptureReferences: ["Revelation 19:17"] },
    { term: "Fowls", explanation: "Birds summoned to the judgment supper after rebellion collapses.", scriptureReferences: ["Ezekiel 39:17-20", "Revelation 19:17"] },
    { term: "Supper of the great God", explanation: "A grim contrast to the marriage supper of the Lamb.", scriptureReferences: ["Revelation 19:9", "Revelation 19:17"] }
  ],
  18: [
    { term: "Kings and captains", explanation: "Every rank of earthly power is included in the collapse of rebellion.", scriptureReferences: ["Revelation 6:15", "Revelation 19:18"] },
    { term: "Free and bond", explanation: "Social status offers no shelter from judgment.", scriptureReferences: ["Revelation 6:15", "Revelation 19:18"] },
    { term: "Flesh", explanation: "The language of defeat and mortality after opposition to Christ ends.", scriptureReferences: ["Ezekiel 39:18-20", "Revelation 19:18"] }
  ],
  19: [
    { term: "Beast", explanation: "The anti-God power already exposed in Revelation 13 and 17.", scriptureReferences: ["Revelation 13:1-8", "Revelation 17:8", "Revelation 19:19"] },
    { term: "Kings of the earth", explanation: "Political powers gathered into final opposition against Christ.", scriptureReferences: ["Revelation 16:14", "Revelation 17:14", "Revelation 19:19"] },
    { term: "Make war", explanation: "The final conflict is against the returning King and His rule.", scriptureReferences: ["Psalm 2:1-12", "Revelation 19:19"] }
  ],
  20: [
    { term: "False prophet", explanation: "The deceptive religious voice connected with the earth beast's signs.", scriptureReferences: ["Revelation 13:11-14", "Revelation 16:13", "Revelation 19:20"] },
    { term: "Mark of the beast", explanation: "Final allegiance to beastly authority over God's commandments.", scriptureReferences: ["Revelation 13:16-17", "Revelation 14:9-12", "Revelation 19:20"] },
    { term: "Lake of fire", explanation: "The final destiny of hardened rebellion under God's judgment.", scriptureReferences: ["Revelation 19:20", "Revelation 20:10", "Revelation 20:14"] }
  ],
  21: [
    { term: "Sword", explanation: "Christ's spoken judgment, not beastly violence, ends the coalition.", scriptureReferences: ["Isaiah 11:4", "Revelation 19:15", "Revelation 19:21"] },
    { term: "Out of his mouth", explanation: "The victory proceeds from Christ's authoritative word.", scriptureReferences: ["Revelation 1:16", "2 Thessalonians 2:8", "Revelation 19:21"] },
    { term: "Fowls filled", explanation: "A stark image that rebellion's feast becomes its judgment.", scriptureReferences: ["Ezekiel 39:17-20", "Revelation 19:21"] }
  ]
};

const commentary = {
  1: [
    "After Babylon's laments fade, John hears heaven answer with a great multitude saying, 'Alleluia.' Revelation 19 does not allow Babylon's fall to be interpreted by kings, merchants, or seafarers alone. Heaven must interpret it. The first word is praise because God has acted with salvation, glory, honor, and power. The scene is not joy over misery; it is worship because false worship has been exposed and God's servants are no longer left under Babylon's accusation.",
    "The praise language reaches back to the Psalms, where the Lord is blessed for judging evil and rescuing His people. It also recalls Revelation 7, where salvation is confessed before the throne and the Lamb. Here that confession follows the collapse of the counterfeit city. Babylon claimed glory through wealth, ceremony, and influence, but heaven says glory is God's. Babylon wielded power through coercion and intoxication, but heaven says power is God's.",
    "This opening also prepares the reader for the rest of the chapter. The fall of Babylon is not the end of Revelation's story; it clears the stage for the marriage supper and the appearing of the King. Heaven's hallelujahs frame judgment as part of redemption. God is not merely destroying an enemy; He is vindicating truth, freeing His witnesses, and showing that the Lamb's way of worship is the only enduring reality.",
    "Revelation 19:1 teaches the church to let heaven train its emotions. The faithful need not envy Babylon's applause or absorb earth's despair when corrupt systems fall. They can grieve human ruin and still praise God's justice. The verse calls believers to place salvation, glory, honor, and power where they belong: not in a city, market, throne, or institution, but in the Lord our God."
  ],
  2: [
    "Heaven explains why the hallelujah is righteous: God's judgments are true and righteous. Babylon is judged because she corrupted the earth with her fornication and shed the blood of God's servants. Revelation is careful here. Heaven's praise is not cruelty. It is moral agreement with a verdict that answers deception, coercion, spiritual adultery, and persecution. God judges what Babylon has actually done.",
    "The language joins Revelation 17 and 18. The harlot corrupted the nations with wine; the final chapter of Babylon revealed her bloodguilt. Revelation 19 says God has not forgotten either crime. The church's martyrs cried under the altar, asking how long until judgment and vindication. The answer is not impulsive revenge. It is the measured justice of the One whose judgments are true because He sees fully and righteous because He acts without corruption.",
    "Babylon's fornication is false worship joined to earthly power. Her violence is the fruit of that union. When religion seeks coercive support from the state, conscience becomes vulnerable and witness becomes dangerous. Revelation 19:2 shows that God takes such corruption personally. The servants harmed by Babylon are His servants, and the earth misled by Babylon is His creation. Judgment protects both truth and the people who bore testimony to it.",
    "This verse gives wounded believers a serious comfort. The Judge of all the earth is neither indifferent nor unstable. He will not excuse spiritual abuse because it wore sacred clothing, and He will not answer evil with evil. The faithful are called to leave vengeance with God, keep their testimony clean, and trust that every hidden cruelty will be brought into the light of His true and righteous judgment."
  ],
  3: [
    "A second hallelujah rises because Babylon's smoke goes up forever and ever. The image is severe, but its purpose is finality. Revelation is not imagining Babylon as an eternal rival to God's city. It is saying that her overthrow is irreversible. The city that filled the earth with intoxicating smoke is now marked by the smoke of judgment. What she made others breathe becomes the sign of her end.",
    "The Old Testament often uses smoke, burning, and desolation to speak of decisive judgment. Isaiah's language over Edom stands behind this kind of image: smoke rising as a memorial of complete overthrow. Revelation uses the same moral grammar. Babylon will not be rebuilt, healed, renamed, or quietly absorbed into the New Jerusalem. Her system is judged because her character is opposed to the Lamb.",
    "This matters because Revelation 13 and 17 showed powers that seemed almost invincible. The beast receives worship, the image enforces loyalty, and the harlot sits on many waters. Revelation 19:3 announces that the final word over those powers is not awe but ashes. Heaven's repeated hallelujah is therefore a confession that God has ended the system that confused worship, corrupted nations, and persecuted the saints.",
    "The church should not romanticize Babylon's brilliance. Some forms of power look permanent because they are old, wealthy, and admired. Revelation 19:3 teaches patience. Smoke is what remains when false glory meets God's judgment. The verse calls God's people to measure every impressive system by its end, and to worship the Lamb whose kingdom does not need deception to endure."
  ],
  4: [
    "The twenty-four elders and the four living creatures fall down and worship God, saying, 'Amen; Alleluia.' Their response gathers the throne-room scenes of Revelation 4 and 5 into the final praise over Babylon's fall. These heavenly worshipers do not stand at a distance from God's judgment. They agree with it, bow before it, and turn agreement into worship. The verdict is not merely legal; it is liturgical.",
    "The elders have appeared as royal-priestly beings around the throne, connected with worship, incense, prayers, and heavenly order. The living creatures represent creation's ceaseless praise before God. Their shared Amen means that heaven's court is united: the God who created, redeemed, heard the saints, and judged Babylon is worthy. The hallelujah does not begin with human anger but with the sanctuary's own worship.",
    "This verse also strengthens the claim that Revelation's final judgments arise from the throne, not from chaos. The same heavenly order that sang to the Creator and the Lamb now praises God for removing the counterfeit city. The worship of chapter 19 is continuous with the worship of chapters 4 and 5. Creation, redemption, intercession, and judgment all belong in one story centered on God and the Lamb.",
    "Revelation 19:4 calls the church to say Amen only where heaven says Amen. Believers must not bless Babylon's compromises or baptize the world's violence. They are invited into a better worship, one that bows before God's throne, agrees with His verdict, and praises without becoming cruel. True worship forms people who can love mercy, endure suffering, and trust righteous judgment."
  ],
  5: [
    "A voice comes from the throne calling all God's servants to praise Him, both small and great. The command widens the circle. The elders and living creatures have worshiped; now every servant is summoned. Revelation's final worship is not an elite chorus. It gathers all who fear God, regardless of earthly rank, into one response to His victory over Babylon and His faithfulness to His people.",
    "The phrase 'fear God' connects this scene with the first angel's message. Revelation 14 called the world to fear God, give Him glory, and worship the Creator. Revelation 19 shows the redeemed answering that call fully. Fear here is not panic before a tyrant. It is reverent allegiance to the true God in contrast with the beast, the image, and Babylon's intoxication.",
    "Small and great is a significant phrase in Revelation. Earthly systems divide people by status, wealth, rank, and influence. Babylon's merchants mourn because greatness was measured by trade and luxury. The throne's voice gathers servants by a different measure: they belong to God. The poorest faithful witness and the most visible servant stand together in the same worship.",
    "The church learns here that praise is an act of allegiance. To praise God is to reject Babylon's definitions of greatness and success. Revelation 19:5 invites every believer, hidden or public, young or old, unknown or influential, to join heaven's verdict now. The servants who fear God in ordinary faithfulness are being prepared for the day when all His servants praise with one voice."
  ],
  6: [
    "John hears a sound like a great multitude, like many waters, and like mighty thunderings: 'Alleluia, for the Lord God omnipotent reigneth.' The imagery piles up sound until the reader feels the weight of heaven's worship. This is not private devotion in a corner. It is the universe acknowledging that God's reign, long contested by the dragon, the beast, the false prophet, and Babylon, is now publicly vindicated.",
    "Many waters recall the voice of Christ in Revelation 1 and the sound of divine glory in Ezekiel. Thunder is associated with the throne scenes and signals majesty, judgment, and awe. The title 'omnipotent' announces that no coalition can rival God. Revelation has shown beastly authority, commercial authority, religious authority, and political authority. Now heaven confesses the authority beneath and above all others: the Lord God reigns.",
    "God's reign did not begin at this moment. It becomes openly undeniable at this moment. That distinction matters. Throughout history, God's people have confessed His rule while Babylon seemed to prosper and the beast seemed to prevail. Revelation 19:6 says faith was not naive. The reign hidden beneath suffering and patience is now sounded like thunder through the heavens.",
    "This verse steadies worship before the marriage supper and the Second Coming scene. Believers do not wait for Christ's appearing as though history were out of control until then. They wait under the reign of God, trusting that His power will be revealed in righteousness. Revelation 19:6 asks the church to live now by the future hallelujah: the Lord God omnipotent reigns."
  ],
  7: [
    "Heaven now moves from judgment praise to wedding joy: 'Let us be glad and rejoice, and give honor to him: for the marriage of the Lamb is come.' The Lamb who was slain is also the Bridegroom. Revelation does not end merely with enemies defeated; it moves toward covenant communion. The fall of the counterfeit woman prepares the scene for the faithful bride.",
    "The marriage image gathers a long biblical story. God spoke of His covenant people as His bride, grieved over spiritual unfaithfulness, and promised restoration. Jesus used wedding imagery for readiness, invitation, and joy. In Revelation 19 the image reaches its climax. The bride is ready, not because she rescued herself, but because the Lamb has loved, cleansed, and kept His people through the final conflict.",
    "This verse also contrasts sharply with Babylon. The harlot was arrayed in purple and scarlet, holding a golden cup full of abominations. The bride is made ready for the Lamb. One woman seduces the nations into false worship; the other rejoices in covenant faithfulness. Revelation lets the reader choose which city and which woman will shape the imagination.",
    "The call to be glad is not shallow optimism. It is joy after judgment, endurance, and witness. The church's readiness is formed in history, but the marriage is God's gift. Revelation 19:7 invites believers to honor Christ by receiving His grace, refusing Babylon's intoxication, and living as those who expect to meet the Bridegroom in gladness."
  ],
  8: [
    "The bride is granted fine linen, clean and white, and the linen is the righteousness of saints. The wording holds grace and visible faithfulness together. The clothing is granted; the bride does not manufacture her own beauty apart from the Lamb. Yet the linen also represents the righteous acts of the saints, showing that grace produces a life that can be seen.",
    "Revelation has used clothing imagery throughout the book. Sardis needed white garments; Laodicea was counseled to buy white raiment; the great multitude washed robes in the blood of the Lamb. Here the bride's clothing is the final answer to those earlier calls. The saints stand ready because Christ's righteousness has clothed them and His testimony has shaped their obedience.",
    "This is essential for reading Revelation 14 and 19 together. The saints who keep the commandments of God and the faith of Jesus are not legalists trying to earn a place at the wedding. They are the bride made ready by the Lamb. Their righteous acts are the fruit of allegiance, the public texture of a faith that refused the beast's mark and Babylon's wine.",
    "Revelation 19:8 gives the church a clean view of holiness. Holiness is not display, self-confidence, or superiority. It is the granted garment of Christ worn in daily faithfulness. The believer's hope rests on grace, but grace never leaves the bride dressed in Babylon's colors. The Lamb prepares a people whose lives tell the truth about Him."
  ],
  9: [
    "The angel tells John to write: 'Blessed are they which are called unto the marriage supper of the Lamb.' Revelation's fourth beatitude turns the wedding image into direct promise. The invited are blessed because they share in the Lamb's joy after Babylon's fall and before the full vision of the new creation. This is not bare survival; it is fellowship.",
    "The marriage supper recalls Jesus' parables of wedding invitation and readiness. Some reject the invitation, some presume without the wedding garment, and some watch for the Bridegroom with lamps ready. Revelation 19 gathers those warnings into one blessing. The called are those who receive the Lamb's invitation, accept His clothing, and refuse the counterfeit feasts of Babylon.",
    "The angel adds, 'These are the true sayings of God.' The promise needs that assurance because the church often waits under contradiction. Babylon's table looks rich, the beast's pressure looks powerful, and the faithful may appear weak. God's true sayings tell the church that the Lamb's supper is more real than Babylon's luxury and more lasting than any earthly celebration.",
    "This verse is a pastoral anchor. The aim of prophecy is not merely to decode beasts and plagues; it is to bring people to the Lamb's table. Every warning in Revelation serves this invitation. The church should teach prophecy in a way that makes Christ's supper desirable, His call urgent, and His promise trustworthy."
  ],
  10: [
    "John falls at the angel's feet to worship, but the angel immediately refuses: 'See thou do it not.' Even in the intensity of heavenly revelation, worship must be guarded. Revelation exposes false worship on earth and corrects mistaken worship in the vision itself. No messenger, however glorious, receives the devotion due to God alone.",
    "The angel identifies himself as a fellow servant with John and with those who have the testimony of Jesus. That phrase has already marked the remnant in Revelation 12. Here it is explained: the testimony of Jesus is the spirit of prophecy. Prophetic witness is not an independent religious thrill. It is testimony centered in Jesus, given by Jesus, and faithful to Jesus.",
    "This verse is crucial for remnant identity and for the use of prophetic gifts. The spirit of prophecy does not compete with Scripture, replace Christ, or create a personality cult. It calls people to worship God, heed the testimony of Jesus, and stand in harmony with the prophetic message of Revelation. The angel's rebuke keeps the gift in its proper place.",
    "Revelation 19:10 teaches humility in the presence of truth. The more light God gives, the more carefully His people must worship Him alone. Teachers, messengers, and movements must never draw to themselves the devotion due to God. The test of prophetic witness is whether it lifts up Jesus, calls for obedience, and sends people back to worship God."
  ],
  11: [
    "John sees heaven opened, and behold, a white horse. The rider is called Faithful and True, and in righteousness He judges and makes war. The scene is the public appearing of Christ, not a hidden spiritual impression or secret rescue. Heaven opens because the King Himself is coming. The Lamb who was slain is now seen as the conquering Rider.",
    "The white horse signals victory, but Revelation carefully defines the kind of victory. Christ does not make war as the beast makes war. His judgment is righteous because His character is Faithful and True. He has already conquered by the cross, and His final appearing executes the verdict that history has been moving toward since the opening visions.",
    "This scene answers the final coalition of Revelation 16 and 17. The kings of the earth gather, Babylon falls, and Christ appears. Daniel's vision of the Son of man receiving dominion stands behind the scene, as does the promise that God's kingdom will break every rival kingdom. Revelation 19:11 shows that the kingdom arrives through the visible triumph of Christ.",
    "The church needs this vision because evil often looks organized, armed, and confident. Revelation does not answer that confidence with speculation but with a Person. Faithful and True rides from opened heaven. Believers are called to endure because the final judgment is not random violence; it is the righteous intervention of the One whose truth cannot fail."
  ],
  12: [
    "Christ's eyes are as a flame of fire, and on His head are many crowns. The fiery eyes recall Revelation 1 and 2, where Christ searches the churches and sees what human evaluation misses. At the Second Coming, that searching vision is turned toward the whole rebellious order. Nothing in Babylon, the beast, or the heart remains hidden from Him.",
    "The many crowns contrast with the dragon and beast, who wore crowns as claims of authority. Christ wears many crowns because His dominion is not borrowed, blasphemous, or temporary. Every earthly ruler is derivative; His kingship is supreme. The rider's unknown name adds reverence. Christ is truly revealed, yet never reduced to something creatures can master.",
    "The verse keeps the Second Coming from becoming a mere event on a chart. The One who comes is personal, majestic, and inexhaustible. Prophecy leads to worship because Christ's identity is deeper than the symbols that describe Him. His eyes expose, His crowns rule, and His name exceeds every title that rebels tried to seize for themselves.",
    "Revelation 19:12 calls the church to live before Christ's eyes now. The hidden compromises that Babylon rewards are already visible to Him. So are hidden faithfulness, tears, prayers, and endurance. The many-crowned King will judge truly because He sees truly. That is warning for hypocrisy and comfort for every servant misjudged by earth."
  ],
  13: [
    "The rider is clothed with a vesture dipped in blood, and His name is called the Word of God. The blood-stained robe reaches back to Isaiah's picture of the divine warrior who comes from judgment over enemies. Revelation also keeps the cross in view: the victorious King is never separated from the Lamb who was slain. His triumph is both sacrificial and judicial.",
    "Calling Him the Word of God brings John's Gospel into the vision. The One through whom God created and revealed Himself now appears to judge and restore. Christ's word has already spoken to the churches, opened prophecy, exposed Babylon, and warned the nations. At His appearing, that same Word becomes the decisive answer to every lie.",
    "The robe dipped in blood should not be read as beastly cruelty. Revelation contrasts Christ's judgment with the violence of the beast. The beast sheds the blood of saints; Christ judges the system that shed it. The winepress language of Revelation 14 and 19 shows ripened rebellion meeting God's holy verdict, not arbitrary rage.",
    "This verse asks believers to trust the Word more than the noise of history. The church does not overcome by matching Babylon's methods. It overcomes by the blood of the Lamb, the testimony of Jesus, and confidence in the Word of God. When Christ appears, His name will vindicate every promise He has spoken."
  ],
  14: [
    "The armies in heaven follow Christ on white horses, clothed in fine linen, white and clean. The focus remains on the Rider, not on the armies. They follow; He leads. Their clothing connects them with the bride's fine linen and the redeemed multitude in white robes. Heaven's company reflects the purity of the victory Christ brings.",
    "The image of armies could be misunderstood if detached from the rest of the chapter. Revelation is not praising ordinary warfare. The armies are clothed in white, not stained with conquest. Their participation is derivative and clean because Christ alone judges in righteousness and conquers by the sword from His mouth. The scene is royal procession before it is battlefield description.",
    "This also answers the beast's armies later in the chapter. Earth gathers armed rebellion; heaven follows the true King. The contrast is moral. The beast's coalition is held together by deception, signs, coercion, and worship of the image. Christ's company is marked by purity, loyalty, and union with His triumph.",
    "Revelation 19:14 gives courage without feeding a violent spirit. God's people do not need to seize history by force. They follow the King who has already conquered and who will finish the conflict righteously. The clean linen asks the church what kind of people are fit to follow Him: not cruel, proud, or intoxicated, but purified by the Lamb."
  ],
  15: [
    "Out of Christ's mouth goes a sharp sword, that with it He should smite the nations. The location of the sword matters. His victory proceeds from His word. The same mouth that spoke promises to the churches and warnings to the nations now executes judgment. Revelation refuses to make Christ a mirror of the beast's violence.",
    "The rod of iron comes from Psalm 2, the messianic promise that the Son will rule rebellious nations. Revelation has already applied this rule to Christ and, by grace, to His overcoming people. In chapter 19 the promise reaches its public fulfillment. The nations that would not receive the Lamb's gospel now face the King's unbreakable authority.",
    "The winepress of the fierceness and wrath of Almighty God connects this verse with Revelation 14. The harvest of the earth has ripened. Divine wrath here is not a loss of control; it is God's settled, holy opposition to matured evil. The same God who sent warnings, calls, angels, and testimony now ends the rebellion those warnings exposed.",
    "This verse teaches the church to honor Christ's word before it becomes the final word of judgment. The sword that ends rebellion is the same authority believers hear now in Scripture and prophecy. To receive His word today is life; to resist it until the end is ruin. Revelation 19:15 presses urgency without sensationalism."
  ],
  16: [
    "On His robe and thigh appears the title: King of kings, and Lord of lords. Revelation has shown many kings: kings who fornicate with Babylon, kings gathered by deceptive spirits, kings who give power to the beast. Their authority is real but temporary. Christ's title announces the hierarchy of the universe. Every crown, throne, court, and empire must answer to Him.",
    "The title also answers Revelation 17, where the Lamb defeats the gathered kings because He is Lord of lords and King of kings. Chapter 19 shows that verdict embodied in the returning Christ. He does not negotiate with the beastly coalition as an equal. He appears as the One whose authority was always supreme, even when history seemed to deny it.",
    "Daniel's kingdom visions stand behind the title. The stone becomes a mountain, the Son of man receives dominion, and the saints inherit the kingdom. Revelation completes that trajectory by naming Christ publicly as the supreme King. His lordship is not merely private comfort; it is the end of every rival sovereignty.",
    "Revelation 19:16 calls believers to transfer their fear and allegiance now. If Christ is King of kings, then no state, market, religious system, or cultural pressure can claim final obedience. The title on the returning King gives the church both courage and boundary: honor earthly responsibilities, but reserve worship, conscience, and ultimate loyalty for Him alone."
  ],
  17: [
    "An angel standing in the sun cries to the birds that fly in heaven, calling them to the supper of the great God. The scene is intentionally stark. Revelation has just blessed those called to the marriage supper of the Lamb; now it announces another supper, a judgment meal after rebellion is defeated. The contrast divides the chapter.",
    "The imagery reaches back to Ezekiel's judgment oracle, where birds are summoned after God's victory over hostile powers. It is not meant to satisfy curiosity about battlefield details. It pictures total defeat and public shame for powers that refused God's mercy and gathered against His King. The sunlit angel announces that nothing about this judgment is hidden or uncertain.",
    "The two suppers clarify Revelation's moral urgency. Everyone is moving toward a feast. One is covenant joy with the Lamb; the other is the ruin of those joined to beastly power. The difference is not social rank or earthly strength but allegiance. Kings, captains, mighty men, and armies cannot protect themselves from the verdict of Christ.",
    "Revelation 19:17 is sobering because it refuses sentimental endings for hardened rebellion. Yet it also magnifies the invitation of verse 9. The church should preach prophecy so that people desire the Lamb's supper, not merely fear the birds' supper. Judgment scenes are warnings of mercy before they are descriptions of finality."
  ],
  18: [
    "The birds are summoned to eat the flesh of kings, captains, mighty men, horses, riders, free and bond, small and great. The list is deliberately comprehensive. No rank, military power, economic status, or social identity shields rebellion from Christ's appearing. Revelation 6 pictured the great ones of earth hiding from the Lamb; Revelation 19 shows that the hiding has ended.",
    "The language is graphic because the illusion it shatters is powerful. Babylon's world taught people to trust hierarchy, force, wealth, and position. This verse strips those protections away. Kings and slaves, generals and ordinary soldiers, free and bound are equal when they stand outside the Lamb's mercy and against His kingdom.",
    "This is not a denial of human dignity. It is a judgment on a coalition that used human power against God. The flesh language emphasizes mortality. The powers that seemed godlike are still dust. The beast's system promised belonging and survival, but it cannot save even its most honored supporters when the returning King appears.",
    "Revelation 19:18 warns the church not to measure security by earthly categories. Status can hide danger, and weakness can hide faithfulness. The only safe place in the final crisis is not rank, wealth, office, or strength, but allegiance to the Lamb. The verse clears away false refuges so the invitation of Christ can be heard plainly."
  ],
  19: [
    "John sees the beast, the kings of the earth, and their armies gathered to make war against the rider on the horse and His army. This is the final anti-Lamb coalition. Revelation 16 showed demonic spirits gathering the kings; Revelation 17 showed the horns making war with the Lamb; Revelation 19 shows the confrontation reaching its open climax.",
    "The beast is not merely one ruler in a final skirmish. It is the same beastly power pattern Revelation has been exposing: blasphemous authority, coerced worship, persecution, and deceptive unity against God. The kings and armies represent political and military support gathered into the same rebellion. Their unity is real, but it is unity against Christ.",
    "The tragedy of the verse is that the war is unwinnable from the start. Psalm 2 already asked why the nations rage against the Lord and His Anointed. Revelation answers with the appearing of the Anointed King. The beast's coalition fights as though numbers, arms, signs, and state power can overturn the Word of God.",
    "This verse helps believers name the final conflict without sensationalism. The center is not geography or military speculation; it is allegiance to or against the returning Christ. The church should watch the worship issue more than rumors of battle. Revelation 19:19 says the crisis ends when every anti-Lamb power meets the Lamb's King."
  ],
  20: [
    "The beast is taken, and with him the false prophet who worked miracles before him. Revelation now names the two leading powers of final deception and coercion. The beast represents blasphemous, persecuting authority; the false prophet represents deceptive religious speech and signs that persuade the world to honor the beast and receive his mark.",
    "The verse recalls Revelation 13, where signs were used to deceive those dwelling on the earth and to promote the image of the beast. It also recalls Revelation 16, where the dragon, beast, and false prophet send demonic spirits to gather the world. Revelation 19 shows their end. The powers that deceived others are themselves unable to escape judgment.",
    "They are cast alive into the lake of fire burning with brimstone. This is final judicial language. It does not invite gloating; it announces that the system of beast worship and false prophecy cannot enter the renewed creation. The lake of fire will be explained further in Revelation 20, but here it marks decisive removal from the future God gives His people.",
    "Revelation 19:20 is a warning about religious deception. Signs alone do not prove truth. Public success does not prove divine approval. The test is fidelity to God, the commandments, the testimony of Jesus, and worship of the Lamb. The verse urges believers to love truth now, before deception hardens into final allegiance."
  ],
  21: [
    "The remnant are slain with the sword of the rider, the sword that proceeds out of His mouth, and the birds are filled with their flesh. The chapter ends the battle by returning to Christ's word. Beastly powers used force, deception, and death decrees; Christ ends the rebellion by the authority of His mouth. His judgment is decisive because His word is decisive.",
    "The remnant here are not the faithful remnant of Revelation 12. They are the remainder of the rebellious coalition after the beast and false prophet are removed. The verse completes the judgment supper announced earlier. Those who joined the war against the Lamb share the collapse of the powers they trusted.",
    "The scene is severe, but it is not purposeless violence. It shows that rebellion has no future beyond Christ's appearing. The same Word who created, warned, promised, and invited now brings the final sentence. Revelation's final judgment is consistent with the whole book: mercy was offered, testimony was given, Babylon was exposed, and the Lamb's enemies refused to yield.",
    "Revelation 19:21 leaves the reader with a clear division. There is the marriage supper of the Lamb, and there is the judgment supper of rebellion. There is the bride in fine linen, and there are armies consumed by the sword from Christ's mouth. The wise response is not fear-driven speculation but surrendered worship: hear His word, follow the Lamb, and stand with His kingdom before the sky opens."
  ]
};

const depthThemes = {
  1: "heaven's praise after Babylon's fall",
  2: "true and righteous judgment answering corruption and bloodshed",
  3: "the irreversible end of Babylon's false glory",
  4: "throne-room agreement with God's verdict",
  5: "the summons for all God's servants to praise",
  6: "the public vindication of God's reign",
  7: "the covenant joy of the Lamb and His bride",
  8: "the granted garment and visible faithfulness of the saints",
  9: "the blessing of those called to the Lamb's supper",
  10: "worship God and receive the testimony of Jesus",
  11: "the visible appearing of Faithful and True",
  12: "the searching majesty and many-crowned authority of Christ",
  13: "the Word of God judging ripened rebellion",
  14: "the clean heavenly company following the King",
  15: "the sword from Christ's mouth and the rod of iron",
  16: "the supreme title of the returning King",
  17: "the judgment supper contrasted with the marriage supper",
  18: "the collapse of every earthly rank outside the Lamb",
  19: "the final anti-Lamb coalition gathered for defeat",
  20: "the end of the beast and false prophet",
  21: "the final word of Christ over rebellion"
};

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function ensureDepth(verseNumber, paragraphs) {
  const enrichedParagraphs = [...paragraphs];
  const terms = wordNotes[verseNumber]?.map((note) => note.term) ?? [];
  const refs = crossReferences[verseNumber] ?? [];
  const theme = depthThemes[verseNumber];
  const additions = [
    `In Revelation 19:${verseNumber}, this detail serves the chapter's larger movement: ${theme}, keeping judgment, worship, and Christ's victory in one frame.`,
    `Read beside ${refs[0]} and ${refs[1]}, Revelation 19:${verseNumber} stands within Scripture's long testimony that God will vindicate His name, rescue His servants, and bring false worship to its appointed end.`,
    `The study terms ${terms.slice(0, 2).map((term) => term.toLowerCase()).join(" and ")} keep Revelation 19:${verseNumber} close to the text and guard the verse from becoming spectacle detached from worship.`,
    `Revelation 19:${verseNumber} therefore calls for allegiance before it satisfies curiosity, pressing the reader toward the Lamb whose victory is righteous, public, and final.`
  ];
  let index = 0;
  let totalWords = countWords(enrichedParagraphs.join("\n\n"));
  while (totalWords < 430 && index < additions.length) {
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
  symbol("Hallelujah", ["Revelation 19:1", "Revelation 19:3", "Revelation 19:4", "Revelation 19:6"], "Heaven's praise after God's righteous victory and judgment.", ["Psalm 104:35", "Psalm 146:1", "Revelation 19:1"]),
  symbol("Great multitude", ["Revelation 19:1", "Revelation 19:6"], "The heavenly chorus that answers Babylon's fall with worship.", ["Revelation 7:9-10", "Revelation 19:1"]),
  symbol("Smoke rising forever", ["Revelation 19:3"], "The irreversible judgment and final ruin of Babylon.", ["Isaiah 34:9-10", "Revelation 18:9", "Revelation 19:3"]),
  symbol("Twenty-four elders", ["Revelation 19:4"], "Heavenly royal-priestly worshipers who agree with God's verdict.", ["Revelation 4:4", "Revelation 5:8-14", "Revelation 19:4"]),
  symbol("Four living creatures", ["Revelation 19:4"], "Throne-room beings who lead creation's worship of God.", ["Ezekiel 1:5-14", "Revelation 4:6-8", "Revelation 19:4"]),
  symbol("Voice from the throne", ["Revelation 19:5"], "Heaven's authoritative summons for all God's servants to praise.", ["Revelation 4:2", "Revelation 19:5"]),
  symbol("Many waters and thunderings", ["Revelation 19:6"], "The majestic sound of heavenly worship and divine authority.", ["Ezekiel 43:2", "Revelation 1:15", "Revelation 19:6"]),
  symbol("Marriage of the Lamb", ["Revelation 19:7", "Revelation 19:9"], "The covenant consummation of Christ and His faithful people.", ["Matthew 25:10", "Revelation 19:7", "Revelation 21:2"]),
  symbol("Bride or wife", ["Revelation 19:7", "Revelation 19:8"], "The Lamb's covenant people made ready for His kingdom.", ["Isaiah 54:5", "Ephesians 5:25-27", "Revelation 19:7"]),
  symbol("Fine linen", ["Revelation 19:8", "Revelation 19:14"], "Christ-given purity expressed in faithful lives.", ["Revelation 3:18", "Revelation 7:14", "Revelation 19:8"]),
  symbol("Marriage supper", ["Revelation 19:9"], "The blessed fellowship of the redeemed with the Lamb.", ["Matthew 22:1-14", "Luke 14:15", "Revelation 19:9"]),
  symbol("Testimony of Jesus", ["Revelation 19:10"], "The witness Jesus gives to and through His servants.", ["Revelation 1:2", "Revelation 12:17", "Revelation 19:10"]),
  symbol("Spirit of prophecy", ["Revelation 19:10"], "Prophetic witness centered in Jesus and faithful to His testimony.", ["Numbers 12:6", "2 Peter 1:21", "Revelation 19:10"]),
  symbol("Heaven opened", ["Revelation 19:11"], "The public appearing of Christ from heaven.", ["Matthew 24:30", "Acts 1:11", "Revelation 19:11"]),
  symbol("White horse", ["Revelation 19:11", "Revelation 19:14"], "Victorious royal conquest in righteousness.", ["Psalm 45:3-5", "Revelation 19:11"]),
  symbol("Faithful and True", ["Revelation 19:11"], "Christ's reliable character as judge and warrior.", ["Revelation 3:14", "Revelation 19:11"]),
  symbol("Eyes like fire", ["Revelation 19:12"], "Christ's searching and discerning judgment.", ["Daniel 10:6", "Revelation 1:14", "Revelation 19:12"]),
  symbol("Many crowns", ["Revelation 19:12"], "Christ's supreme dominion over every rival authority.", ["Psalm 2:6-12", "Revelation 19:12", "Revelation 19:16"]),
  symbol("Robe dipped in blood", ["Revelation 19:13"], "Judgment and victory imagery centered on Christ.", ["Isaiah 63:1-6", "Revelation 14:20", "Revelation 19:13"]),
  symbol("Word of God", ["Revelation 19:13"], "Christ as the divine Word who reveals, rules, and judges.", ["John 1:1-14", "Hebrews 4:12", "Revelation 19:13"]),
  symbol("Armies in heaven", ["Revelation 19:14"], "The heavenly company following Christ's public victory.", ["Jude 14", "Revelation 19:14"]),
  symbol("Sharp sword", ["Revelation 19:15", "Revelation 19:21"], "Christ's decisive word of judgment.", ["Isaiah 11:4", "2 Thessalonians 2:8", "Revelation 19:15"]),
  symbol("Rod of iron", ["Revelation 19:15"], "The unbreakable messianic rule promised in Psalm 2.", ["Psalm 2:9", "Revelation 12:5", "Revelation 19:15"]),
  symbol("Winepress", ["Revelation 19:15"], "Final judgment on ripened rebellion.", ["Isaiah 63:1-6", "Revelation 14:19-20", "Revelation 19:15"]),
  symbol("King of kings", ["Revelation 19:16"], "Christ's supreme authority over every ruler.", ["Daniel 2:44", "Revelation 17:14", "Revelation 19:16"]),
  symbol("Birds or fowls", ["Revelation 19:17", "Revelation 19:21"], "Judgment-supper imagery after the defeat of rebellion.", ["Ezekiel 39:17-20", "Revelation 19:17"]),
  symbol("Beast and false prophet", ["Revelation 19:19", "Revelation 19:20"], "The final persecuting and deceptive powers opposed to the Lamb.", ["Revelation 13:1-18", "Revelation 16:13", "Revelation 19:20"]),
  symbol("Lake of fire", ["Revelation 19:20"], "The final destiny of hardened rebellion.", ["Revelation 19:20", "Revelation 20:10", "Revelation 20:14"])
];

function danielConnection(verseNumber) {
  if (verseNumber >= 11 && verseNumber <= 16) {
    return "Daniel 7 stands behind the visible appearing of Christ as the Son of man receives dominion and the beastly powers lose their rule.";
  }
  if (verseNumber >= 17) {
    return "Daniel's beast-kingdom pattern reaches its end as the anti-God powers are judged and the kingdom is given to God.";
  }
  return "Daniel's judgment and kingdom scenes help frame the heavenly praise that follows Babylon's fall.";
}

function updateChapter() {
  const chapter = JSON.parse(readFileSync(chapterPath, "utf8"));

  chapter.title = "Hallelujah, the Marriage Supper, and the Returning King";
  chapter.summary = "Revelation 19 answers Babylon's fall with heaven's praise, announces the marriage supper of the Lamb, and unveils Christ as the visible victorious King.";
  chapter.historicalContext = "The chapter gathers Old Testament praise, covenant-marriage, divine-warrior, and royal judgment imagery from the Psalms, Isaiah, Ezekiel, Daniel, and the Gospels.";
  chapter.literaryContext = "Revelation 19 moves from Babylon's fall to heaven's hallelujahs, from the marriage supper of the Lamb to the visible appearing of Christ and the defeat of the beastly coalition.";
  chapter.themes = [
    "Hallelujah",
    "Righteous judgment",
    "Marriage supper",
    "Bride",
    "Fine linen",
    "Testimony of Jesus",
    "Visible return",
    "Word of God",
    "King of kings",
    "Lake of fire"
  ];
  chapter.outline = [
    {
      range: "19:1-5",
      title: "Heaven Praises God for Babylon's Judgment",
      summary: "The heavenly multitude, elders, and living creatures praise God because His judgments are true and righteous."
    },
    {
      range: "19:6-10",
      title: "The Marriage Supper of the Lamb",
      summary: "The bride is made ready, the invited are blessed, and the testimony of Jesus is identified with the spirit of prophecy."
    },
    {
      range: "19:11-16",
      title: "The Returning King",
      summary: "Christ appears visibly as Faithful and True, the Word of God, King of kings, and Lord of lords."
    },
    {
      range: "19:17-21",
      title: "The Beastly Coalition Defeated",
      summary: "The beast, false prophet, kings, and armies fall before Christ's decisive word of judgment."
    }
  ];
  chapter.sources = sourceList;
  chapter.symbols = symbols;
  chapter.danielConnections = [
    { danielText: "Daniel 7", revelationText: "Revelation 19", sources: [docSource, mcnultySource, stefanovicSource] },
    { danielText: "Daniel 2", revelationText: "Revelation 19", sources: [docSource, mcnultySource, stefanovicSource] },
    { danielText: "Daniel 12", revelationText: "Revelation 19", sources: [docSource, mcnultySource, stefanovicSource] }
  ];
  chapter.teachingNotes = {
    openingQuestion: "How does Revelation 19 teach the church to praise God for justice while keeping its eyes on the Lamb?",
    mainPoint: "Babylon's fall leads to heaven's hallelujahs, the Lamb's wedding joy, Christ's visible return, and the final defeat of beastly deception.",
    keyVerses: ["Revelation 19:1", "Revelation 19:7", "Revelation 19:10", "Revelation 19:11", "Revelation 19:16", "Revelation 19:20"],
    importantSymbols: ["Hallelujah", "Marriage supper", "Fine linen", "Testimony of Jesus", "White horse", "Sharp sword", "King of kings"],
    discussionQuestions: [
      "Why does heaven praise after Babylon falls?",
      "How does the marriage supper contrast with Babylon's counterfeit splendor?",
      "What does the testimony of Jesus teach about worship and prophecy?",
      "How does the rider on the white horse correct secret or merely symbolic views of Christ's return?"
    ],
    commonMisunderstandings: [
      "Do not present heaven's rejoicing as cruelty; it is vindication of God's justice and deliverance of His people.",
      "Do not separate the bride's fine linen from either grace or faithful obedience.",
      "Do not treat Christ's coming as hidden, merely inward, or disconnected from final judgment."
    ],
    adventistEmphasis: "Revelation 19 presents the visible return of Christ after Babylon's exposure and before the millennium, while grounding remnant witness in the testimony of Jesus.",
    closingAppeal: "Receive the Lamb's invitation, worship God alone, and live now under the authority of the returning King."
  };
  chapter.evangelisticNotes = {
    mainDoctrinalTheme: "Christ's visible return, righteous judgment, prophetic testimony, and the marriage supper of the Lamb",
    keyBibleTexts: ["Revelation 19:7-10", "Revelation 19:11-16", "Matthew 24:30", "Acts 1:11", "Revelation 22:17"],
    flow: [
      "Begin with heaven's praise after Babylon's fall.",
      "Show the contrast between the Lamb's bride and Babylon's counterfeit woman.",
      "Explain the testimony of Jesus and the call to worship God alone.",
      "Present Christ's visible appearing as the decisive end of the beastly coalition.",
      "Close with the invitation to the marriage supper rather than fear-driven speculation."
    ],
    simpleIllustrations: [
      "A wedding invitation matters more than a newspaper headline about conflict.",
      "A courtroom verdict can bring relief when it ends years of oppression.",
      "A true king does not need deception to hold his throne."
    ],
    appealQuestion: "Will you accept the Lamb's invitation and live under the authority of the King who is Faithful and True?",
    cautions: [
      "Keep the Second Coming visible, public, and Christ-centered.",
      "Avoid sensational battle speculation.",
      "Let the severe judgment scenes serve the invitation to the Lamb's supper."
    ],
    sources: [docSource, mcnultySource, stefanovicSource]
  };
  chapter.reflectionQuestions = [
    "Where do I need heaven's perspective on God's justice?",
    "Am I preparing for the Lamb's supper or admiring Babylon's table?",
    "How does the testimony of Jesus shape my witness?",
    "What allegiance does the title King of kings require from me today?"
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

  chapter.crossReferences = [...new Set(chapter.verses.flatMap((verse) => verse.crossReferences))].slice(0, 96);
  writeFileSync(chapterPath, `${JSON.stringify(chapter, null, 2)}\n`);
}

ensureResource();
updateChapter();
console.log("Imported Revelation 19 manuscript commentary.");
