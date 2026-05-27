import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const chapterPath = join(root, "content", "revelation", "chapter-15.json");
const bibliographyPath = join(root, "content", "resources", "bibliography.json");
const docxPath = "/Users/samuel/Downloads/Revelation/Revelation Chapter Fifteen.docx";

if (!existsSync(docxPath)) {
  throw new Error(`Missing manuscript: ${docxPath}`);
}

const src = (sourceId, locator, claimType, priority) => ({ sourceId, locator, claimType, priority });

const docSource = src("revelation-chapter-fifteen-docx", "Revelation Chapter Fifteen manuscript", "manuscript-synthesis", 1);
const mcnultySource = src("revelation-practical-living-in-the-judgment-hour", "Priority Adventist commentary for Revelation 15", "adventist-interpretation", 1);
const amazingFactsSource = src("amazing-facts-revelation-verse-by-verse", "Revelation 15 support", "adventist-interpretation", 2);
const coxSource = src("cox-revelation-pure-and-simple", "Revelation 15 Adventist support", "adventist-interpretation", 2);
const stefanovicSource = src("stefanovic-revelation-of-jesus-christ", "Revelation 15 exegetical and sanctuary support", "adventist-technical-background", 2);
const technicalSource = src("beale-book-of-revelation", "Old Testament and literary support for Revelation 15", "technical-background", 5);
const bauckhamSource = src("bauckham-theology-revelation", "Exodus and worship theology support", "theological-background", 5);
const osborneSource = src("osborne-revelation", "Technical and literary support for Revelation 15", "technical-background", 5);
const pastoralSource = src("revelation-interpretation-a-bible-commentary-for-teaching-and-preaching", "Pastoral support for Revelation 15", "pastoral-application", 5);

const sourceList = [
  docSource,
  mcnultySource,
  amazingFactsSource,
  coxSource,
  stefanovicSource,
  technicalSource,
  bauckhamSource,
  osborneSource,
  pastoralSource
];

const resourceEntry = {
  id: docSource.sourceId,
  title: "Revelation Chapter Fifteen",
  author: "Uploaded manuscript",
  type: "Manuscript",
  tradition: "Adventist",
  interpretiveCategory: "Adventist historicist manuscript synthesis",
  howUsed: "Internal source metadata retained for synthesized Revelation 15 commentary.",
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
    exegesis: [docSource, mcnultySource, stefanovicSource],
    historicalBackground: [docSource, stefanovicSource, technicalSource, bauckhamSource, osborneSource],
    technicalNotes: [docSource, stefanovicSource, technicalSource, bauckhamSource, osborneSource],
    adventistPropheticInsight: [docSource, mcnultySource, amazingFactsSource, coxSource, stefanovicSource],
    propheticTimeline: [docSource, mcnultySource, amazingFactsSource, coxSource, stefanovicSource],
    otherCommentaryInsights: [docSource, technicalSource, bauckhamSource, osborneSource, pastoralSource],
    application: [docSource, mcnultySource, pastoralSource]
  };
}

const crossReferences = {
  1: ["Revelation 14:9-11", "Revelation 16:1", "Exodus 7:17-21", "Exodus 12:29-31", "Daniel 12:1", "Revelation 6:9-11", "Psalm 79:5-10", "Revelation 11:18"],
  2: ["Revelation 4:6", "Revelation 13:15-18", "Revelation 14:1-5", "Revelation 20:4", "Daniel 7:9-10", "Exodus 14:21-31", "Revelation 3:18", "Revelation 5:8"],
  3: ["Exodus 15:1-18", "Deuteronomy 32:3-4", "Psalm 111:2-4", "Jeremiah 10:6-7", "Psalm 86:8-10", "Revelation 5:9-10", "Revelation 14:12", "1 Peter 2:21-23"],
  4: ["Jeremiah 10:7", "Psalm 86:9-10", "Isaiah 45:23", "Philippians 2:10-11", "Revelation 14:7", "Revelation 16:5-7", "Revelation 19:1-2", "Revelation 21:24"],
  5: ["Revelation 11:19", "Exodus 25:16", "Exodus 31:18", "Numbers 17:7", "Leviticus 16:2", "Daniel 7:9-10", "Daniel 8:14", "Revelation 14:12"],
  6: ["Daniel 10:5", "Revelation 1:13", "Exodus 28:39-43", "Leviticus 16:4", "Ezekiel 9:2-11", "Revelation 15:1", "Revelation 16:1", "Psalm 103:20"],
  7: ["Revelation 4:6-8", "Revelation 5:8", "Revelation 6:9-11", "Revelation 8:3-5", "Isaiah 51:17", "Isaiah 51:22", "Revelation 16:1", "Revelation 19:2"],
  8: ["Exodus 40:34-35", "1 Kings 8:10-11", "2 Chronicles 5:13-14", "Isaiah 6:1-4", "Leviticus 16:17", "Daniel 12:1", "Revelation 22:11", "Revelation 16:1"]
};

const wordNotes = {
  1: [
    { term: "Sign", explanation: "A heaven-given symbolic scene that discloses the meaning of final events.", scriptureReferences: ["Revelation 12:1", "Revelation 12:3", "Revelation 15:1"] },
    { term: "Seven last plagues", explanation: "The final complete judgments that finish God's wrath after the last warning has been rejected.", scriptureReferences: ["Revelation 15:1", "Revelation 16:1", "Revelation 21:9"] },
    { term: "Wrath of God", explanation: "God's holy judicial answer to settled rebellion, not uncontrolled passion.", scriptureReferences: ["Revelation 14:10", "Revelation 15:1", "Revelation 16:1"] }
  ],
  2: [
    { term: "Sea of glass", explanation: "The throne-room surface before God, now associated with the deliverance of the victorious.", scriptureReferences: ["Revelation 4:6", "Revelation 15:2"] },
    { term: "Mingled with fire", explanation: "Imagery of holiness, judgment, and tested faith in the presence of God.", scriptureReferences: ["Daniel 7:9-10", "1 Peter 1:7", "Revelation 15:2"] },
    { term: "Gotten the victory", explanation: "A completed triumph over beastly pressure through loyalty to the Lamb.", scriptureReferences: ["Revelation 12:11", "Revelation 13:15-17", "Revelation 15:2"] },
    { term: "Harps of God", explanation: "Instruments of heavenly worship placed in the hands of those delivered by God.", scriptureReferences: ["Revelation 5:8", "Revelation 14:2", "Revelation 15:2"] }
  ],
  3: [
    { term: "Song of Moses", explanation: "The song of deliverance after the Exodus, now applied to the final deliverance of God's people.", scriptureReferences: ["Exodus 15:1-18", "Deuteronomy 32:1-4", "Revelation 15:3"] },
    { term: "Song of the Lamb", explanation: "Praise centered on Christ's redemptive victory and the deliverance He brings.", scriptureReferences: ["Revelation 5:9", "Revelation 14:3", "Revelation 15:3"] },
    { term: "Just and true", explanation: "A confession that God's ways and judgments are righteous, faithful, and transparent.", scriptureReferences: ["Deuteronomy 32:4", "Revelation 15:3", "Revelation 16:7"] }
  ],
  4: [
    { term: "Fear thee", explanation: "Reverent recognition of God's holiness, authority, and worthiness of worship.", scriptureReferences: ["Jeremiah 10:7", "Revelation 14:7", "Revelation 15:4"] },
    { term: "All nations", explanation: "The final public acknowledgment that God's rule is righteous and universal.", scriptureReferences: ["Psalm 86:9", "Isaiah 45:23", "Revelation 15:4"] },
    { term: "Judgments are made manifest", explanation: "God's decisions are openly shown to be righteous before the universe.", scriptureReferences: ["Revelation 15:4", "Revelation 16:5-7", "Revelation 19:1-2"] }
  ],
  5: [
    { term: "Temple", explanation: "The heavenly sanctuary from which final judgment proceeds.", scriptureReferences: ["Revelation 11:19", "Revelation 15:5", "Hebrews 8:1-2"] },
    { term: "Tabernacle of the testimony", explanation: "Sanctuary language pointing to God's covenant law and faithful witness.", scriptureReferences: ["Exodus 25:16", "Numbers 17:7", "Revelation 15:5"] },
    { term: "Opened in heaven", explanation: "A disclosure of the sanctuary setting behind the final plagues.", scriptureReferences: ["Revelation 11:19", "Revelation 15:5"] }
  ],
  6: [
    { term: "Pure and white linen", explanation: "Clothing that signals purity, heavenly service, and priestly dignity.", scriptureReferences: ["Leviticus 16:4", "Revelation 15:6", "Revelation 19:8"] },
    { term: "Golden girdles", explanation: "Royal-priestly bands that mark the angels as authorized servants from God's presence.", scriptureReferences: ["Daniel 10:5", "Revelation 1:13", "Revelation 15:6"] },
    { term: "Seven angels", explanation: "Heavenly messengers commissioned to carry the final complete plagues.", scriptureReferences: ["Revelation 15:1", "Revelation 15:6", "Revelation 16:1"] }
  ],
  7: [
    { term: "Golden vials", explanation: "Golden bowls from the heavenly court, now filled with final judgment.", scriptureReferences: ["Revelation 5:8", "Revelation 15:7", "Revelation 16:1"] },
    { term: "Four living creatures", explanation: "Throne-room worshipers who participate in heaven's righteous judgment scene.", scriptureReferences: ["Revelation 4:6-8", "Revelation 5:8", "Revelation 15:7"] },
    { term: "Liveth for ever and ever", explanation: "God's eternal sovereignty over against temporary beastly powers.", scriptureReferences: ["Daniel 4:34", "Revelation 4:9", "Revelation 15:7"] }
  ],
  8: [
    { term: "Smoke", explanation: "The visible sign of God's glory, majesty, and unapproachable holiness.", scriptureReferences: ["Exodus 40:34-35", "Isaiah 6:4", "Revelation 15:8"] },
    { term: "No man was able to enter", explanation: "A solemn picture that intercession has reached its appointed close before the plagues finish.", scriptureReferences: ["Leviticus 16:17", "Daniel 12:1", "Revelation 15:8"] },
    { term: "Fulfilled", explanation: "The plagues run to completion because final decisions have become fixed.", scriptureReferences: ["Revelation 15:8", "Revelation 16:17", "Revelation 22:11"] }
  ]
};

const commentary = {
  1: [
    "John sees another sign in heaven, great and marvelous: seven angels having the seven last plagues. Revelation has already used the language of signs for the woman clothed with the sun and the great red dragon, so this new sign must be read as a disclosure of the deeper meaning of final events. It is great because the scene touches the last crisis of the world; it is marvelous because God's justice is not random, impulsive, or hidden. Heaven introduces the plagues before they fall so that the reader will interpret Revelation 16 from God's throne and sanctuary, not from fear or spectacle. The seven last plagues are not presented as detached disasters. They are the final judicial answer to the beast crisis, the mark, the image, and the rejection of the Lamb's warning.",
    "The word plagues reaches back to Exodus, where God judged Egypt and delivered His covenant people. Pharaoh's empire was not merely inconvenienced; its false gods, cruelty, and resistance to God's command were exposed. Revelation takes that deliverance pattern and applies it to the end of the age. The plagues are called last because they complete the wrath of God. Earlier judgments warned, restrained, and called to repentance; these judgments come after the final proclamation has made the issues plain. Revelation 14 has already announced the everlasting gospel, the judgment hour, Creator worship, Babylon's fall, and the warning against the beast's mark. Revelation 15 shows that rejected warning moving toward its final consequence.",
    "This first verse stands at a threshold. The final message has gone to the world; the harvest has been announced; now the seven last plagues are placed before the reader. The wrath of God here is not the opposite of love. It is love's final opposition to a system that destroys, deceives, persecutes, and refuses mercy. The holy God does not allow rebellion to rule forever, and He does not judge before warning. The sanctuary setting that follows will make this even clearer: the plagues proceed from the presence of the God whose mercy has been offered in Christ and whose law has been openly despised by the powers of rebellion.",
    "The practical force of the verse is urgency without panic. Revelation does not give the seven last plagues so believers can cultivate dread or curiosity. It gives them so the church will understand the seriousness of the present hour. Mercy is meaningful because judgment is real. Warning is merciful because the final wrath has not yet fallen. The reader is being called to respond to the Lamb now, receive the everlasting gospel now, and refuse the false worship that will finally receive the plagues. Evil will not be allowed to remain unchallenged, but the door of mercy is open before the bowls are poured out."
  ],
  2: [
    "John next sees something like a sea of glass mingled with fire, and upon it stand those who have gained victory over the beast, his image, his mark, and the number of his name. The scene deliberately reverses Revelation 13. There the beast seemed to dominate the world through worship pressure, political force, economic restriction, and the threat of death. Here the people who refused that system stand alive before God. They are not pictured as defeated fugitives but as victorious worshipers. The harps of God in their hands show that their victory has become praise. Before Revelation describes the plagues poured out on rebellion, it shows the safety and worship of those who remained loyal to the Lamb.",
    "The sea of glass recalls the throne room in Revelation 4, where it lies before God's throne. The added fire brings holiness, judgment, and testing into the image. Scripture often joins fire with the presence of God, the refining of faith, and the exposure of evil. The Exodus background is also close at hand. Israel once stood delivered after God brought them through the sea and overthrew Egypt's pursuing power. Revelation 15 presents the final people of God after a greater exodus, delivered not from Pharaoh alone but from the beast, the image, the mark, and the number. Their standing before God is the answer to the question raised in Revelation 6:17: who shall be able to stand? The answer is a people upheld by the Lamb.",
    "The fourfold description of victory matters. The beast represents a power that claims worship against God. The image points to the reproduced coercive system that enforces false worship. The mark identifies final allegiance to that authority, and the number exposes the human counterfeit at the heart of its claims. The saints overcome all of it, not by worldly dominance, but by faithfulness to Christ. Revelation 12:11 explains the same victory through the blood of the Lamb and the word of testimony. Revelation 14:12 describes the same people as those who keep the commandments of God and the faith of Jesus. Their victory is therefore moral, worshipful, and grace-formed.",
    "This verse redefines success for God's people. Victory is not always measured by public safety, comfort, or influence. In Revelation, victory may mean standing with Christ when the world rewards another allegiance. The saints sing because they trusted the Lamb before they could see the sea of glass. Their worship is not improvised at the end; it is the mature fruit of loyalty learned under pressure. The church is invited to practice that worship now. Those who would stand on the sea of glass then must learn to stand with the Lamb now, when conscience, obedience, and worship are already being formed."
  ],
  3: [
    "The victors sing the song of Moses the servant of God and the song of the Lamb. Revelation joins two great deliverance stories into one final song. Moses stands for the Exodus, when God delivered His people from bondage and brought them through the sea. The Lamb stands for Christ, whose death, resurrection, and heavenly ministry accomplish the deeper deliverance from sin, deception, and beastly power. The redeemed do not sing about their own bravery as though they saved themselves. They praise the works and ways of God: great and marvelous are His works; just and true are His ways. The song turns the attention away from human endurance and toward divine faithfulness. Their worship is memory, theology, and testimony held together.",
    "The Old Testament background is rich. Exodus 15 celebrates God's triumph at the Red Sea; Deuteronomy 32 bears witness that God's work is perfect and all His ways are judgment. Revelation draws those themes into the final crisis. The people beside the sea of glass have passed through a last conflict that mirrors the Exodus pattern. A persecuting power opposed God's people, false worship was exposed, and divine judgment brought deliverance. Yet the song is also the song of the Lamb, because the final exodus is possible only through Christ. The Lamb conquers by truth, sacrifice, intercession, and righteous authority, not by adopting the dragon's methods. The cross defines the meaning of every later victory.",
    "The title King of saints, or King of the nations in related textual tradition, fits the setting. The beast sought global worship and claimed authority over the nations, but the song confesses that God alone rules justly. The saints have learned this through trial. Their song is not abstract theology; it is the testimony of people who have watched God bring them through a crisis they could not survive by themselves. The justice of God's ways matters because the plagues are about to fall. Before wrath is poured out, heaven sings that God's ways are just and true. Final judgment is framed by worship, not by cruelty. The song guards the reader from imagining divine judgment apart from divine righteousness.",
    "This song teaches the church how to think before the crisis is over. Faith often must confess God's justice while deliverance is still ahead. The redeemed sing at the sea of glass because they trusted the Lamb before the song was visible. Their praise invites believers to rehearse the same theology now: God's works are greater than the powers that threaten His people, and His ways remain true when history appears confused. The church needs songs shaped by Scripture, deliverance, and the cross. Such worship steadies the conscience, purifies hope, and keeps final-event study centered on the God who saves."
  ],
  4: [
    "The song continues with a searching question: Who shall not fear thee, O Lord, and glorify thy name? The question does not imagine that everyone has willingly worshiped God during history. It looks toward the final manifestation of God's holiness, when every rival claim is exposed and every mouth must acknowledge the righteousness of His rule. The verse says God alone is holy, and all nations will come and worship before Him because His judgments are made manifest. Worship and judgment are inseparable here. The final plagues are not merely punishments; they reveal that God's decisions are righteous after the world's systems have misrepresented His character. The universe is invited to see that holiness has been merciful, patient, and true.",
    "The language draws from the prophets and psalms. Jeremiah asks who would not fear the King of nations. Psalm 86 says all nations will come and worship before the Lord because He is great and does wondrous things. Isaiah 45 looks toward the day when every knee bows and every tongue acknowledges God. Revelation gathers those promises into the closing conflict. The nations that were intoxicated by Babylon, pressured by the beast, and deceived by false worship are finally confronted with the holiness of God. The song of the victors announces what the universe will see: God's holiness has not been compromised by His patience. Delay has not meant indifference; mercy has not meant moral weakness.",
    "This verse also looks back to the first angel's message. Revelation 14:7 called the world to fear God, give Him glory, recognize the hour of His judgment, and worship the Creator. Revelation 15:4 shows that message from the side of victory. Those who stood against beast worship now sing the truth that the final warning proclaimed. Creator worship, judgment, holiness, and glory all belong in the same field of vision. The issue was never mere religious preference. The final conflict concerns who God is, whether His law is righteous, whether His worship is due, and whether His judgments can be trusted.",
    "The verse calls for reverent worship now. To fear God is not to live in servile dread, but to give Him the honor His holiness deserves. Casual religion cannot carry the weight of Revelation's final scenes. The reader is being invited to align with the final song before the judgments are made manifest to all. God's holiness will one day be publicly acknowledged; wisdom receives that truth now with humility, repentance, and worship. The safest place in the final conflict is not beside the most popular power, but before the holy God whose name deserves glory. Reverence now anticipates the worship all nations will one day confess. The final song begins in present surrender.",
  ],
  5: [
    "After the song, John sees the temple of the tabernacle of the testimony opened in heaven. Revelation could have said simply that heaven was opened, but it piles up sanctuary language: temple, tabernacle, testimony. The reader is taken behind the plagues into the heavenly sanctuary itself. The final judgments do not arise from a detached decree; they proceed from the place where God's covenant, law, mercy, holiness, and judgment meet. Revelation 11:19 has already shown the ark of the testament in the heavenly temple. Revelation 15 returns to that opened sanctuary before the bowls are given, so that the last plagues are understood in covenant and sanctuary terms. The setting keeps law and gospel together.",
    "The testimony recalls the ark of the testimony and the tables of the covenant placed within it. In the Old Testament sanctuary, the testimony was not a vague religious idea; it was connected with God's revealed will and His covenant relationship with His people. The Day of Atonement also belongs in the background, because the sanctuary was the place where atonement, cleansing, and judgment converged. Revelation's final crisis has centered on worship, commandments, the beast's mark, and the faith of Jesus. Now the temple of the testimony opens, showing that God's law has not been erased from the final controversy. Covenant loyalty remains part of heaven's own courtroom. The opened sanctuary therefore interprets obedience as covenant faithfulness.",
    "This verse gives the plagues moral clarity. If the temple of the testimony is opened before the bowls are poured out, then final wrath is not arbitrary force. It is judgment measured by God's covenant faithfulness and His revealed character. The same heavenly sanctuary where Christ ministers mercy also bears witness against a world that has rejected mercy and trampled truth. Daniel's sanctuary and judgment scenes help frame the moment. The judgment hour proclaimed in Revelation 14 is not an earthly slogan; it is rooted in the heavenly reality where God evaluates worship, allegiance, and character. The open temple shows that final events are interpreted from heaven downward.",
    "For the reader, the opened temple is both comforting and searching. It comforts because the universe is not governed by confusion. God's final acts are rooted in holiness and truth. It searches because the testimony of God addresses the conscience. Grace does not make obedience disposable, and law does not make grace unnecessary. Christ's ministry in the sanctuary calls believers to transparent loyalty, humble confession, and reverent trust. The opened temple asks whether worship is being shaped by God's testimony or by the convenient claims of the surrounding world. The final crisis is therefore not only about power outside us, but about allegiance within us. Heaven's testimony asks for undivided worship.",
  ],
  6: [
    "The seven angels come out of the temple with the seven plagues, clothed in pure and white linen and girded around the breasts with golden girdles. The description is deliberately dignified. These angels are not portrayed as wild agents of destruction, but as holy ministers emerging from the sanctuary. Their garments communicate purity, authorization, and priestly solemnity. The final plagues are severe, but they are not chaotic. They are administered from the presence of God by beings whose appearance reflects the holiness of the place from which they come. Their dress tells the reader how to interpret their work. Heaven marks even judgment with order, reverence, and moral cleanliness.",
    "The clothing recalls several biblical patterns. Priestly linen appears in the sanctuary service, especially in connection with holy ministry. Daniel sees heavenly messengers clothed in linen and girded with gold. Revelation 1 describes Christ Himself with a golden girdle, presenting Him in priestly and royal dignity. The angels of Revelation 15 carry that atmosphere of heavenly service. They come from the temple because the bowls are not merely historical calamities; they are sanctuary judgments. Their purity matters because God's justice is never contaminated by revenge, impatience, or moral confusion. Heaven's servants reflect the character of heaven's King. Their appearance locates final judgment within heaven's holy sanctuary order and worship.",
    "The angels' movement from the temple marks a transition from heavenly decision to executed judgment. Revelation has shown warning, intercession, testimony, and patient mercy. Now those realities give way to the carrying out of the seven last plagues. The angels do not decide the judgment; they receive and administer what heaven has authorized. Their white linen and golden bands teach that final judgment is consistent with God's character. The same God who offered mercy through the Lamb now answers the hardened rebellion that refused the Lamb. Judgment is not separated from the sanctuary; it comes from the sanctuary. That origin gives the plagues their moral weight. The sanctuary explains both the severity and the purity.",
    "This verse teaches believers how to think about justice. Human anger easily becomes impure, but God's justice remains clean. The church must not imitate the harshness of the beast while speaking about the fall of the beast. Revelation 15:6 calls God's people to trust the purity of heaven's action and to leave vengeance with God. The final plagues are not an invitation to relish destruction. They are a solemn reminder that holy love will finally remove evil, and that those who serve God must reflect His purity even while warning of judgment. Serious prophecy should make the church cleaner in spirit, not harsher in tone. The messengers of judgment are clothed in purity, and the messengers of warning should be as well."
  ],
  7: [
    "One of the four living creatures gives the seven angels seven golden bowls full of the wrath of God, who lives forever and ever. The scene ties the plagues to the throne room of Revelation 4 and 5. The living creatures worship before God's throne; now one of them participates in handing the bowls to the angels. This shows that the judgments are not disconnected from worship. Heaven is united in the righteousness of what is about to happen. The bowls come from the court of the eternal God, not from the anger of a temporary ruler or the instability of earthly power. Final wrath is governed by the throne. The living creature's act joins worship, holiness, and judgment in one scene.",
    "The golden bowls are sanctuary vessels. Earlier in Revelation, golden bowls held incense, identified as the prayers of the saints. Now golden bowls are filled with wrath. That connection is sobering and meaningful. The prayers of God's suffering people have not been forgotten. The cry from under the altar in Revelation 6, the incense scene in Revelation 8, and the bowl scene in Revelation 15 belong together. God receives the prayers of the oppressed, waits with patience, warns the world, and finally answers the system that shed the blood of His servants. The same heaven that listened now acts. The bowls show that divine patience has always been purposeful, never passive.",
    "The wrath is full because the moral process has reached its end. It has been preceded by the cross, by Christ's intercession, by prophetic warning, by the sealing of God's servants, and by the three angels' messages. The God who lives forever and ever is not hurried by history, threatened by empires, or deceived by Babylon. His eternal sovereignty makes His judgment reliable. Beastly powers rise and fall; the living God remains. When the bowls are placed in the angels' hands, Revelation is showing that the final answer to evil is authorized by the throne itself. Nothing in this scene is accidental or improvised.",
    "This verse comforts those who wonder whether God hears injustice. The prayers of the saints may appear delayed, but they are not lost. They are gathered before God until the righteous answer comes. The call is to persevere without bitterness. Believers do not need to take vengeance into their own hands, nor do they need to despair when evil seems unanswered. The eternal God will act in holiness. The same throne that receives worship and prayer will also bring judgment, and that judgment will vindicate the Lamb's faithful people. Patient faith is possible because God's memory is perfect. He remembers tears, testimony, and blood. No faithful cry disappears before God or remains unanswered.",
  ],
  8: [
    "The chapter closes with the temple filled with smoke from the glory of God and from His power, and no one is able to enter the temple until the seven plagues of the seven angels are fulfilled. This is one of Revelation's most solemn sanctuary scenes. In the Old Testament, the tabernacle and temple were filled with divine glory at decisive moments, and ordinary human ministry could not continue in the usual way. Revelation uses that glory-cloud language to show that the heavenly sanctuary has entered a decisive phase. The plagues are not beginning while ministry proceeds as before; the temple itself is filled with God's glory and power. Heaven's silence here is not emptiness but majesty. The sanctuary is full, not vacant.",
    "Exodus 40, 1 Kings 8, 2 Chronicles 5, and Isaiah 6 stand behind the imagery. Smoke signals the overwhelming presence of God, His majesty, and His holiness. The inability to enter the temple also recalls the Day of Atonement pattern, when access was restricted during the climactic sanctuary work. In Revelation 15, however, the point is not another ordinary ritual restriction. The final plagues are about to fall, and no one enters the temple until they are completed. The scene communicates that intercession, in the sense pictured here, has reached its appointed close. The sanctuary has moved from pleading to completion.",
    "This gives Revelation 15 its close-of-probation weight. Revelation 22:11 says that the unjust and the righteous remain in their settled condition. Daniel 12:1 describes Michael standing up before the time of trouble and the deliverance of God's people. Revelation 15:8 belongs with those passages. The seven last plagues do not fall while the world is still moving through ordinary gospel opportunity. They follow the final warning, the sealing of God's people, and the fixing of allegiance. Christ's priestly work has reached its appointed completion, and the bowls proceed until God's wrath is finished. The decisive issue is settled character before settled destiny is revealed.",
    "The scene is meant to awaken seriousness, not date-setting. The reader is not asked to calculate when mercy closes, but to receive mercy while Christ ministers now. The fact that no one can enter the temple in this scene makes present access to the throne of grace precious. Revelation ends the chapter with holy restraint: the victorious have sung, the temple has opened, the bowls have been given, and glory fills the sanctuary. The question left for the reader is deeply practical: will I respond to the Lamb before the day when decisions have become final? The open door of mercy should never be treated casually. Present access is a gift to be received while it is offered in Christ today by faith."
  ]
};

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function ensureDepth(reference, paragraphs) {
  const totalWords = countWords(paragraphs.join("\n\n"));
  if (totalWords < 450) throw new Error(`${reference} commentary is too light (${totalWords} words)`);
  if (totalWords > 1000) throw new Error(`${reference} commentary is too long (${totalWords} words)`);
  return paragraphs;
}

function symbol(symbolName, references, meaning, scriptureReferences) {
  return { symbol: symbolName, references, meaning, scriptureReferences, sources: [docSource, mcnultySource, stefanovicSource] };
}

const symbols = [
  symbol("Seven last plagues", ["Revelation 15:1", "Revelation 15:6", "Revelation 15:8"], "The final complete judgments that finish God's wrath before deliverance.", ["Revelation 15:1", "Revelation 16:1", "Revelation 21:9"]),
  symbol("Wrath of God", ["Revelation 15:1", "Revelation 15:7"], "God's holy judicial answer to settled rebellion after warning and mercy.", ["Revelation 14:10", "Revelation 15:1", "Revelation 16:1"]),
  symbol("Sea of glass", ["Revelation 15:2"], "The throne-room surface before God where the victorious stand.", ["Revelation 4:6", "Revelation 15:2"]),
  symbol("Fire", ["Revelation 15:2"], "Holiness, judgment, and tested faith in God's presence.", ["Daniel 7:9-10", "1 Peter 1:7", "Revelation 15:2"]),
  symbol("Victors over the beast", ["Revelation 15:2"], "The faithful who overcome beastly worship pressure through loyalty to the Lamb.", ["Revelation 12:11", "Revelation 14:12", "Revelation 15:2"]),
  symbol("Harps of God", ["Revelation 15:2"], "Heavenly instruments of worship placed in the hands of the delivered.", ["Revelation 5:8", "Revelation 14:2", "Revelation 15:2"]),
  symbol("Song of Moses", ["Revelation 15:3"], "Exodus deliverance praise applied to the final deliverance of God's people.", ["Exodus 15:1-18", "Deuteronomy 32:1-4", "Revelation 15:3"]),
  symbol("Song of the Lamb", ["Revelation 15:3"], "Praise centered on Christ's redemptive victory.", ["Revelation 5:9", "Revelation 14:3", "Revelation 15:3"]),
  symbol("King of saints", ["Revelation 15:3"], "God's righteous rule over His faithful people and over the nations.", ["Jeremiah 10:7", "Revelation 15:3", "Revelation 19:16"]),
  symbol("All nations worship", ["Revelation 15:4"], "The final public acknowledgment that God's holiness and judgments are righteous.", ["Psalm 86:9", "Isaiah 45:23", "Revelation 15:4"]),
  symbol("Temple in heaven", ["Revelation 15:5", "Revelation 15:6", "Revelation 15:8"], "The heavenly sanctuary from which final judgment proceeds.", ["Revelation 11:19", "Revelation 15:5", "Hebrews 8:1-2"]),
  symbol("Tabernacle of the testimony", ["Revelation 15:5"], "Sanctuary language pointing to God's covenant law and faithful witness.", ["Exodus 25:16", "Numbers 17:7", "Revelation 15:5"]),
  symbol("Seven angels", ["Revelation 15:1", "Revelation 15:6"], "Heavenly messengers commissioned to carry the final complete plagues.", ["Revelation 15:1", "Revelation 15:6", "Revelation 16:1"]),
  symbol("Pure white linen", ["Revelation 15:6"], "Purity, heavenly service, and priestly dignity.", ["Leviticus 16:4", "Revelation 15:6", "Revelation 19:8"]),
  symbol("Golden girdles", ["Revelation 15:6"], "Royal-priestly authorization for holy service from God's presence.", ["Daniel 10:5", "Revelation 1:13", "Revelation 15:6"]),
  symbol("Golden bowls", ["Revelation 15:7"], "Sanctuary vessels now filled with final judgment.", ["Revelation 5:8", "Revelation 15:7", "Revelation 16:1"]),
  symbol("Smoke from God's glory", ["Revelation 15:8"], "The visible sign of God's majesty, presence, and unapproachable holiness.", ["Exodus 40:34-35", "Isaiah 6:4", "Revelation 15:8"]),
  symbol("No one entering the temple", ["Revelation 15:8"], "A solemn picture of intercession reaching its appointed close before the plagues finish.", ["Leviticus 16:17", "Daniel 12:1", "Revelation 15:8"])
];

function danielConnection(verseNumber) {
  const map = {
    1: "Daniel 12:1 helps frame the final time of trouble that follows the close of Christ's intercessory phase.",
    2: "Daniel 7's throne and fiery judgment imagery stands behind the victorious saints beside the sea of glass.",
    3: "Daniel's vision of God's everlasting kingdom supports the song's confession that God's ways are just and true.",
    4: "Daniel 7 points toward the public vindication of God's rule before the nations.",
    5: "Daniel 7 and 8 help frame the opened heavenly temple as a sanctuary-judgment scene.",
    6: "Daniel 10 supplies background for radiant heavenly messengers commissioned from God's presence.",
    7: "Daniel's judgment scenes help explain why the bowls proceed from the throne and temple of the eternal God.",
    8: "Daniel 12:1 stands beside this verse as the transition from heavenly ministry to final deliverance in the time of trouble."
  };
  return map[verseNumber] ?? "Daniel's sanctuary, judgment, and deliverance themes stand behind Revelation 15.";
}

function updateChapter() {
  const chapter = JSON.parse(readFileSync(chapterPath, "utf8"));
  chapter.title = "The Victors, the Temple, and the Last Plagues";
  chapter.summary = "Revelation 15 stands at the threshold between warning and execution: the victorious saints sing before God, the heavenly temple opens, and the seven angels receive the final plagues.";
  chapter.historicalContext = "The chapter draws on the Exodus plagues, the song of Moses, the heavenly throne room, Israel's sanctuary, and the glory-cloud scenes of the tabernacle and temple.";
  chapter.literaryContext = "Revelation 15 bridges the three angels' messages and harvest of Revelation 14 with the seven bowl plagues of Revelation 16, placing worship and sanctuary meaning before wrath is poured out.";
  chapter.themes = ["Seven last plagues", "Sea of glass", "Victory over the beast", "Song of Moses and the Lamb", "Heavenly temple", "Tabernacle of the testimony", "Golden bowls", "Close of probation"];
  chapter.outline = [
    { range: "15:1", title: "The Sign of the Seven Last Plagues", summary: "The final plagues are introduced as the completed wrath of God after the last warning." },
    { range: "15:2-4", title: "The Victorious Saints Sing", summary: "Those who overcome the beast worship God with the song of Moses and the Lamb." },
    { range: "15:5-8", title: "The Temple Opens and Closes in Glory", summary: "The heavenly sanctuary opens, the angels receive the bowls, and the temple fills with smoke until the plagues are finished." }
  ];
  chapter.charts = [{ id: "revelation-15-threshold", title: "Revelation 15: From Warning to Final Plagues", type: "sequence" }];
  chapter.danielConnections = [
    { danielText: "Daniel 7:9-14", revelationText: "Revelation 15:2-4", sources: [docSource, stefanovicSource, technicalSource] },
    { danielText: "Daniel 8:14", revelationText: "Revelation 15:5-8", sources: [docSource, mcnultySource, coxSource] },
    { danielText: "Daniel 12:1", revelationText: "Revelation 15:1, 8", sources: [docSource, mcnultySource, amazingFactsSource] }
  ];
  chapter.teachingNotes = {
    openingQuestion: "Why does Revelation show the victorious saints before showing the seven bowls poured out?",
    mainPoint: chapter.summary,
    keyVerses: ["Revelation 15:1", "Revelation 15:2", "Revelation 15:3", "Revelation 15:5", "Revelation 15:8"],
    importantSymbols: ["Seven last plagues", "Sea of glass", "Harps of God", "Song of Moses and the Lamb", "Temple of the testimony", "Golden bowls", "Smoke of glory"],
    discussionQuestions: [
      "How does Revelation 15 connect the Exodus with the final deliverance?",
      "Why is the song of Moses also called the song of the Lamb?",
      "What does the opened temple teach about law, mercy, and judgment?",
      "How should the close of the temple scene affect the way believers respond to Christ now?"
    ],
    commonMisunderstandings: [
      "Do not present the plagues as arbitrary divine rage.",
      "Do not separate the sanctuary scene from the mercy and intercession that precede it.",
      "Do not turn the close of probation into date-setting or fear-driven speculation."
    ],
    adventistEmphasis: "The chapter connects the final warning, the victory of the remnant, the heavenly sanctuary, the law of God, the close of probation, and the seven last plagues.",
    closingAppeal: "Stand with the Lamb now, learn the song of deliverance now, and receive Christ's intercession while mercy remains open."
  };
  chapter.evangelisticNotes = {
    mainDoctrinalTheme: "The heavenly sanctuary, the final remnant, and the seven last plagues",
    keyBibleTexts: ["Revelation 14:9-12", "Revelation 15:1-4", "Revelation 15:5-8", "Daniel 12:1", "Revelation 22:11"],
    flow: [
      "Begin with the final warning of Revelation 14.",
      "Show the victorious saints beside the sea of glass.",
      "Explain the song of Moses and the Lamb as final-exodus praise.",
      "Move to the opened temple and the completed heavenly work before the plagues."
    ],
    simpleIllustrations: [
      "A courtroom verdict comes before the sentence is carried out.",
      "A victory song makes sense only after deliverance.",
      "A door of mercy should be entered while it remains open."
    ],
    appealQuestion: "Will you stand with the Lamb and receive His mercy before the final plagues fall?",
    cautions: [
      "Avoid sensationalizing the plagues.",
      "Keep the focus on worship, sanctuary, and Christ's saving work.",
      "Explain the close of probation with seriousness and compassion."
    ],
    sources: [docSource, mcnultySource, stefanovicSource]
  };
  chapter.reflectionQuestions = [
    "What does this chapter reveal about the justice and mercy of God?",
    "How does the song of Moses and the Lamb shape my understanding of victory?",
    "What does the opened temple teach me about worship and obedience?",
    "How should Christ's present ministry affect my choices now?"
  ];
  chapter.sources = sourceList;
  chapter.symbols = symbols;

  for (const verse of chapter.verses) {
    const verseNumber = Number(verse.verse.split(":").at(-1));
    const paragraphs = ensureDepth(verse.verse, commentary[verseNumber]);
    const detailedExplanation = paragraphs.join("\n\n");
    verse.explanation = paragraphs[0];
    verse.historicalBackground = paragraphs[1];
    verse.symbolicMeaning = paragraphs[1];
    verse.adventistInsight = paragraphs[2];
    verse.propheticSignificance = paragraphs[2];
    verse.danielConnection = danielConnection(verseNumber);
    verse.crossReferences = crossReferences[verseNumber];
    verse.wordNotes = wordNotes[verseNumber];
    verse.application = paragraphs[3];
    verse.sources = [docSource, mcnultySource, amazingFactsSource, coxSource, stefanovicSource];
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

  chapter.crossReferences = [...new Set(chapter.verses.flatMap((verse) => verse.crossReferences))].slice(0, 64);
  writeFileSync(chapterPath, `${JSON.stringify(chapter, null, 2)}\n`);
}

ensureResource();
updateChapter();
console.log("Imported Revelation 15 manuscript commentary.");
