import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const contentRoot = join(process.cwd(), "content", "revelation");
const populatedChapters = Array.from({ length: 22 }, (_, index) => index + 1);

const replacementRules = [
  [/\bThe phrase echoes\b/g, "This language echoes"],
  [/\bThe phrase recalls\b/g, "This language recalls"],
  [/\bThe phrase points\b/g, "This language points"],
  [/\bthe phrase echoes\b/g, "the language echoes"],
  [/\bthe phrase recalls\b/g, "the language recalls"],
  [/\bthe phrase points\b/g, "the language points"],
  [/\bIn an prophetic reading,?\s*/g, "Here, "],
  [/\bWithin thought,?\s*/g, "Here, "],
  [/\bApplication:\s*/g, ""],
  [/\bTheologically,\s*/g, ""],
  [/\bTextually,[^.]*\.\s*/g, ""],
  [/\bThere is a minor textual variation here as well:[^.]*\.\s*/g, ""],
  [/\bA key textual issue appears here\.\s*/g, ""],
  [/\bGill explicitly argues for that identification\.?\s*/g, ""],
  [/\bGill and Barnes both stress that\b/g, "The imagery stresses that"],
  [/\bBarnes notes that\b/g, "The imagery shows that"],
  [/\bCambridge notes that\b/g, "The text shows that"],
  [/\bCambridge says\b/g, "The text says"],
  [/\bCambridge remarks that\b/g, "The text suggests that"],
  [/\bJFB argues that\b/g, "The passage suggests that"],
  [/\bJFB explicitly distinguishes\b/g, "The chapter distinguishes"],
  [/\bJFB similarly reads\b/g, "The scene also reads"],
  [/\bThe NET note identifies\b/g, "The wording presents"],
  [/\bThe NET note clarifies\b/g, "The wording clarifies"],
  [/\bThe NET note on\b/g, "The wording of"],
  [/\bNET explains that\b/g, "The textual history shows that"],
  [/\bNET notes likewise point out that\b/g, "The wording also suggests that"],
  [/\bThe NET text-critical note states decisively that\b/g, "The strongest textual evidence points to"],
  [/\bOpen-source lexical summaries also note that\b/g, "The word"],
  [/\bOpen-source lexical summaries on Revelation's new-creation language support the idea that\b/g, "Revelation's new-creation language presents the promise that"],
  [/\bopen-source lexical summaries also note that\b/g, "the word"],
  [/\bopen-source lexical summaries on Revelation's new-creation language support the idea that\b/g, "Revelation's new-creation language presents the promise that"],
  [/\bPublic background material on biblical tabernacle language reflects\b/g, "Biblical tabernacle language shows"],
  [/\bpublic background material on biblical tabernacle language reflects\b/g, "biblical tabernacle language shows"],
  [/\bFrom an perspective,?\s*/g, "Here, "],
  [/\bfrom an perspective,?\s*/g, "here, "],
  [/\bFrom an standpoint,?\s*/g, "Here, "],
  [/\bfrom an standpoint,?\s*/g, "here, "],
  [/\bin an reading\b/g, "in this scene"],
  [/\bIn an reading\b/g, "In this scene"],
  [/\bMany Christian interpreters see\b/g, "The image can also be connected with"],
  [/\bmany Christian interpreters see\b/g, "the image can also be connected with"],
  [/\bOther interpreters differ over how Israel\/church continuity should be described, but\b/g, ""],
  [/\bother interpreters differ over how Israel\/church continuity should be described, but\b/g, ""],
  [/\bReaders often connect\b/g, "The passage connects"],
  [/\breaders often connect\b/g, "the passage connects"],
  [/\btrinitarian in source\b/g, "trinitarian in origin"],
  [/\bBibleHub's Greek text analysis lays out the wording clearly\.?\s*/g, ""],
  [/\bBibleHub's verse data and commentary material show\b/g, "The translation tradition shows"],
  [/\bBibleHub's notes explicitly read\b/g, "The verse can be read"],
  [/\bOne BibleHub note expressly states that\b/g, "The warning implies that"],
  [/\bEllicott, Barnes, Expositor's Greek Testament, and others observe that\b/g, "The image deliberately shows that"],
  [/\bEllicott, Barnes, JFB, and others all emphasize this contrast:\s*/g, ""],
  [/\bSeveral commentators note that\b/g, "The Greek wording suggests that"],
  [/\bCommentators note that\b/g, "The text suggests that"],
  [/\bCommentators connect it to\b/g, "The promise echoes"],
  [/\bSome commentators press one side of the phrase more strongly than the other, but\b/g, ""],
  [/\bClassical commentators say\b/g, "The language shows"],
  [/\bClassical commentators\s*/g, ""],
  [/\bClassical comments also emphasize\b/g, "The passage also emphasizes"],
  [/\bThe commentary material and NET notes both acknowledge this variation, but\b/g, ""],
  [/\bPublic summaries of [^.]*\.\s*/g, ""],
  [/\bpublic summaries of [^.]*\.\s*/g, ""],
  [/\bmajor Christian interpretations diverge sharply\.\s*/g, ""],
  [/\bClassic premillennialism[^.]*\.\s*/g, ""],
  [/\bAmillennialism[^.]*\.\s*/g, ""],
  [/\bPostmillennialism[^.]*\.\s*/g, ""],
  [/\bTraditional readings emphasize[^.]*\.\s*/g, ""],
  [/\bThis is the hardest verse in the chapter for annihilationists and the strongest proof-text for eternal conscious torment\.\s*/g, "This is one of the most sobering judgment statements in the chapter. "],
  [/\breaders, however, place\b/g, "this reading places"],
  [/\breaders do not identify\b/g, "the phrase should not be identified"],
  [/\bMost modern translations read\b/g, "Many translations read"],
  [/\bthe KJV and NKJV read\b/g, "the KJV tradition reads"],
  [/\bTextus Receptus\b/g, "received-text tradition"],
  [/\bwhat belongs to God alone\b/g, "what is due to God alone"],
  [/\bwhat belongs to God\b/g, "what is due to God"],
  [/\bthat belongs to God alone\b/g, "that is due to God alone"],
  [/\bthat belongs to God\b/g, "that is due to God"],
  [/\ba sound that belongs to the throne\b/g, "a sound flowing from the throne"],
  [/\bthat belongs to the throne\b/g, "that flows from the throne"],
  [/\bThe verse belongs to the final warning\b/g, "The verse stands within the final warning"],
  [/\bworship belongs to God\b/g, "worship is due to God"],
  [/\bThe wound belongs to one head\b/g, "The wound falls on one head"],
  [/\bauthority that belongs to Him\b/g, "authority that is His alone"],
  [/\bThe mark belongs to\b/g, "The mark comes into view in"],
  [/\bThe battle belongs to\b/g, "The battle is bound up with"],
  [/\bThe blessing belongs to\b/g, "The blessing rests on"],
  [/\bThis verse belongs to\b/g, "This verse points to"],
  [/\bThe scene belongs to\b/g, "The scene stands within"],
  [/\bhail belongs to\b/g, "hail appears as part of"],
  [/\bThe chapter belongs to\b/g, "The chapter addresses"],
  [/\bbelongs to the final crisis\b/g, "is tied to the final crisis"],
  [/\bbelongs to eternity\b/g, "endures into eternity"],
  [/\bIn Adventist historicist interpretation,?\s*/g, "Within the flow of church history, "],
  [/\bIn an Adventist historicist interpretation,?\s*/g, "Within the flow of church history, "],
  [/\bIn an Adventist historicist reading,?\s*/g, "Within the flow of church history, "],
  [/\bIn the Adventist historicist reading,?\s*/g, "Within the flow of church history, "],
  [/\bIn the Adventist historicist view,?\s*/g, "Within the flow of church history, "],
  [/\bIn the Adventist historicist setting,?\s*/g, "Within the flow of church history, "],
  [/\bWithin Adventist historicism,?\s*/g, "Within the flow of church history, "],
  [/\bWithin the Adventist historicist framework,?\s*/g, "Within the flow of church history, "],
  [/\bWithin the Adventist historicist frame,?\s*/g, "Within the historicist frame, "],
  [/\bIn the Adventist historicist outline,?\s*/g, "Within the church-history outline, "],
  [/\bIn the Adventist historicist sequence,?\s*/g, "Within the church-history sequence, "],
  [/\bIn the classic Adventist historicist line,?\s*/g, "In the classic historicist line, "],
  [/\bAdventist historicist interpretation treats\b/g, "The passage treats"],
  [/\bAdventist historicist interpretation reads\b/g, "The passage presents"],
  [/\bAdventist historicist interpretation sees\b/g, "The passage presents"],
  [/\bAdventist historicist interpretation\b/g, "the church-history reading"],
  [/\bAdventist historicism identifies\b/g, "The church-history line identifies"],
  [/\bAdventist historicism reads\b/g, "The church-history line reads"],
  [/\bAdventist historicism connects\b/g, "The prophecy connects"],
  [/\bAdventist historicism\b/g, "the church-history reading"],
  [/\bAdventist historicist application therefore becomes pastoral\b/g, "the message becomes both historical and personal"],
  [/\bAdventist historicist application\b/g, "the church-history application"],
  [/\bAdventist historicist exposition\b/g, "historicist exposition"],
  [/\bAdventist historicist control\b/g, "the church-history framework"],
  [/\bOther Adventist historicist interpreters\b/g, "Other careful interpreters"],
  [/\bAdventist historicist interpreters\b/g, "careful interpreters"],
  [/\bthe Adventist historicist reading sees\b/g, "the church-history reading sees"],
  [/\bAdventist historicist reading\b/g, "the church-history reading"],
  [/\bAdventist historicist\b/g, "historicist"],
  [/\bIn Adventist history,?\s*/g, "In the history of the Advent awakening, "],
  [/\bIn Adventist thought,?\s*/g, "Within the great controversy theme, "],
  [/\bIn Adventist theology,?\s*/g, "Within the great controversy theme, "],
  [/\bIn Adventist understanding,?\s*/g, "Here, "],
  [/\bAdventist theology especially sees\b/g, "the Sabbath is especially seen as"],
  [/\bthe great controversy theme especially sees\b/g, "the Sabbath is especially seen as"],
  [/\bAdventist thought\b/g, "the great controversy theme"],
  [/\bAdventist theology\b/g, "the great controversy theme"],
  [/\bAdventist understanding\b/g, "the prophetic setting"],
  [/\bAdventist interpreters treat\b/g, "some interpreters treat"],
  [/\bAdventist interpreters\b/g, "careful interpreters"],
  [/\bIn Adventist interpretation,?\s*/g, "Within the prophetic setting, "],
  [/\bIn Adventist application,?\s*/g, "For the judgment-hour church, "],
  [/\bAdventist interpretation has often connected\b/g, "This scene has often been connected"],
  [/\bAdventist interpretation often sees\b/g, "This prophecy often points to"],
  [/\bAdventist interpretation treats\b/g, "The passage treats"],
  [/\bAdventist interpretation reads\b/g, "The passage presents"],
  [/\bAdventist interpretation sees\b/g, "The prophecy presents"],
  [/\bAdventist interpretation connects\b/g, "The prophecy connects"],
  [/\bAdventist interpretation rightly sees\b/g, "The passage rightly shows"],
  [/\bAdventist interpretation\b/g, "the prophetic reading"],
  [/\bThe Adventist reading keeps\b/g, "The passage keeps"],
  [/\bThe Adventist reading of\b/g, "The chapter's reading of"],
  [/\bThe Adventist reading\b/g, "The chapter's emphasis"],
  [/\bThe prophetic reading\b/g, "The passage"],
  [/\bthe prophetic reading\b/g, "the passage"],
  [/\bIn the Adventist reading,?\s*/g, "In this prophetic setting, "],
  [/\bIn an Adventist reading,?\s*/g, "In this prophetic setting, "],
  [/\bClassic Adventist interpretation has often connected\b/g, "Classic historicist exposition has often connected"],
  [/\bClassic Adventist interpretation has applied\b/g, "Classic historicist exposition has applied"],
  [/\bClassic Adventist interpretation applied\b/g, "Classic historicist exposition applied"],
  [/\bClassic Adventist interpretation sees\b/g, "Classic historicist exposition sees"],
  [/\bClassic Adventist interpretation connected\b/g, "Classic historicist exposition connected"],
  [/\bClassic Adventist interpretation\b/g, "classic historicist exposition"],
  [/\bClassic Adventist historicism reads\b/g, "Classic historicist exposition reads"],
  [/\bClassic Adventist historicism\b/g, "classic historicist exposition"],
  [/\bIn the classic Adventist historicist reading,?\s*/g, "In classic historicist exposition, "],
  [/\bIn the classic Adventist reading,?\s*/g, "In the classic historicist reading, "],
  [/\bIn Adventist reading,?\s*/g, "Here, "],
  [/\bA broader Adventist reading\b/g, "A broader reading"],
  [/\bA stronger symbolic Adventist reading\b/g, "A stronger symbolic reading"],
  [/\bThe classic Adventist reading\b/g, "The classic historicist reading"],
  [/\bClassic the prophetic reading\b/g, "Classic historicist exposition"],
  [/\bAdventist reading\b/g, "this reading"],
  [/\bClassic Adventist reading applies\b/g, "Classic historicist exposition applies"],
  [/\bClassic Adventist reading\b/g, "Classic historicist exposition"],
  [/\bOlder Adventist historicist interpretation connects\b/g, "Older historicist exposition connects"],
  [/\bOlder Adventist historicist interpretation\b/g, "older historicist exposition"],
  [/\bOlder Adventist historicism related\b/g, "Older historicist exposition related"],
  [/\bOlder Adventist historicism\b/g, "older historicist exposition"],
  [/\bOlder Adventist interpretation applies\b/g, "Older historicist exposition applies"],
  [/\bOlder Adventist interpretation\b/g, "older historicist exposition"],
  [/\bLater Adventist interpretation also stresses\b/g, "Later careful exposition also stresses"],
  [/\bLater Adventist interpretation presses\b/g, "Later careful exposition presses"],
  [/\bLater Adventist interpretation\b/g, "later careful exposition"],
  [/\bLater Adventist readings add\b/g, "Later careful readings add"],
  [/\bLater Adventist readings\b/g, "later careful readings"],
  [/\bAdventist readings of this verse should not\b/g, "This verse should not"],
  [/\bAdventist readings\b/g, "careful readings"],
  [/\bThe pastoral appeal is clear:\s*/g, ""],
  [/\bThe pastoral appeal is\s*/g, "The appeal is "],
  [/\bThe pastoral burden is urgency\./g, "The urgency is plain."],
  [/\bThe pastoral call is clear:\s*/g, "The call is direct: "],
  [/\bThe pastoral lesson is\s*/g, "The lesson is "],
  [/\bThe appeal is clear\./g, "The call is direct."],
  [/\bThe appeal is clear:\s*/g, ""],
  [/\bThe appeal is patient faithfulness:/g, "The call is patient faithfulness:"],
  [/\bThe practical lesson is\s*/g, "Practically, "],
  [/\bThe practical question is\s*/g, "The question is "],
  [/\bThe application is sobering\./g, "This is sobering."],
  [/\bThe application is serious:/g, "The warning is serious:"],
  [/\bThe application is to build/g, "The call is to build"],
  [/\bThe application is\s*/g, "The call is "],
  [/\bThe verse calls the reader to deeply personal\b/g, "The call is deeply personal"],
  [/\bClassic the passage has applied\b/g, "Classic historicist exposition has applied"],
  [/\bClassic the passage applied\b/g, "Classic historicist exposition applied"],
  [/\bClassic the passage has identified\b/g, "Classic historicist exposition has identified"],
  [/\bClassic the passage identified\b/g, "Classic historicist exposition identified"],
  [/\bClassic the passage has connected\b/g, "Classic historicist exposition has connected"],
  [/\bClassic the passage connected\b/g, "Classic historicist exposition connected"],
  [/\bLater the passage presses\b/g, "Later readings press"],
  [/\bIn a broader this reading,?\s*/g, "In a broader reading, "],
  [/\bA broader this reading\b/g, "A broader reading"],
  [/\bthe great controversy theme gives\b/g, "The great controversy theme gives"],
  [/\bWithin the great controversy theme, this verse stands at the heart of the great controversy\./g, "This verse stands at the heart of the great controversy."],
  [/\bThe pastoral promise is strong\./g, "The promise is strong."],
  [/\bThis gives the verse pastoral weight as well as prophetic significance\./g, "This gives the verse spiritual weight as well as prophetic significance."],
  [/\bThe prophecy remains pastoral because\b/g, "The prophecy remains practical because"],
  [/\bThis makes the opening command both judicial and pastoral\./g, "This makes the opening command both judicial and merciful."],
  [/\bThe interlude is therefore pastoral as well as prophetic\b/g, "The interlude is therefore assuring as well as prophetic"],
  [/\bThe verse is pastoral because\s*/g, "The verse speaks with grace because "],
  [/\bThe verse is pastoral for\s*/g, "The verse speaks gently to "],
  [/\bThe verse is pastoral\./g, "The verse speaks with grace."],
  [/\bThe verse is deeply pastoral\./g, "The verse speaks with grace."],
  [/\bThe Adventist prophetic reading sees here\b/g, "The plague scene shows"],
  [/\bWithin the prophetic setting,?\s*/g, "Here, "],
  [/\bThe appeal is to receive Christ's diagnosis without defensiveness\./g, "Christ's diagnosis should be received as mercy, not resisted as interruption."],
  [/\bHis rebuke is love\./g, "His rebuke is an act of love."],
  [/\bThe church that has the most light must still buy everything it needs from Him\./g, "A people entrusted with light must still receive everything from Him."],
  [/\bHis voice still calls\./g, "His voice still calls the church to living fellowship."],
  [/\bThe message presses beyond prophetic identity into personal fellowship with the One standing at the door\./g, "Prophetic identity must become personal fellowship with the One who stands at the door."],
  [/\bThis is one of the clearest places where readers ground the literal, visible second coming of Christ\./g, "Revelation 19 presents the second coming as literal, visible, and public."],
  [/\bThis is one of the clearest places where historicist readers ground the literal, visible second coming of Christ\./g, "Revelation 19 presents the second coming as literal, visible, and public."],
  [/\bThis sets the passage apart both from preterist compressions of the chapter into the first century and from any notion of a secret rapture detached from public judgment\./g, "It is not merely a first-century crisis or a hidden event detached from public judgment."],
  [/\bThis sets the historicist reading apart both from preterist compressions of the chapter into the first century and from any notion of a secret rapture detached from public judgment\./g, "It is not merely a first-century crisis or a hidden event detached from public judgment."],
  [/\bThis sets the prophetic reading apart both from preterist compressions of the chapter into the first century and from any notion of a secret rapture detached from public judgment\./g, "It is not merely a first-century crisis or a hidden event detached from public judgment."],
  [/\bBelievers are not trusting an eventual force majeure, but the righteous Judge\./g, "Believers are trusting the righteous Judge, not an impersonal force."],
  [/\bOfficial Seventh-day Adventist belief\b/g, "The final-message framework"],
  [/\bnon-Adventist commentators\b/g, "other commentators"],
  [/\bnon-Adventist\b/g, "other"],
  [/\bSeventh-day Adventist\b/g, "historicist"],
  [/\bAdventists\b/g, "historicist readers"],
  [/\bAdventism\b/g, "the historicist reading"],
  [/\bAdventist\b/g, "historicist"],
  [/\bIn mainstream historicist reading,?\s*/g, "Here, "],
  [/\bIn an -historicist reading,?\s*/g, "Here, "],
  [/\bIn the historicist reading,?\s*/g, "Here, "],
  [/\bFor historicist readers,?\s*/g, "For the reader, "],
  [/\bhistoricist readers have traditionally linked\b/g, "the passage links"],
  [/\bhistoricist readers have typically read\b/g, "this scene presents"],
  [/\bhistoricist readers naturally read\b/g, "this scene naturally points"],
  [/\bhistoricist readers also insist\b/g, "the passage also insists"],
  [/\bhistoricist readers also read\b/g, "the sequence reads"],
  [/\bhistoricist readers have often heard\b/g, "readers can hear"],
  [/\bhistoricist readers\b/g, "readers"],
  [/\bthe historicist reading\b/g, "the prophetic reading"],
  [/\bhistoricist reading\b/g, "prophetic reading"],
  [/\bhistoricist exposition\b/g, "prophetic exposition"],
  [/\bClassic historicist readings\b/g, "Classic prophetic readings"],
  [/\bclassic historicist\b/g, "classic prophetic"],
  [/\bIn the reading,?\s*/g, "Here, "],
  [/\bnon-\s+commentators\b/g, "other commentators"]
];

const chapterRefs = {
  1: ["Daniel 7:13-14", "Zechariah 12:10", "Matthew 24:30", "John 19:37", "Revelation 22:7"],
  2: ["Revelation 1:12-20", "Acts 20:28-31", "Matthew 24:13", "Hebrews 3:7-8", "Revelation 22:12"],
  3: ["Revelation 1:12-20", "Hebrews 3:7-8", "Matthew 24:42", "James 5:7-8", "Revelation 14:12"],
  4: ["Isaiah 6:1-4", "Ezekiel 1:26-28", "Daniel 7:9-10", "Psalm 47:8", "Revelation 5:13"],
  5: ["Genesis 49:10", "Isaiah 53:7", "Daniel 7:13-14", "John 1:29", "Hebrews 7:25"],
  6: ["Zechariah 1:8-11", "Matthew 24:4-14", "Leviticus 26:18-26", "Joel 2:10-11", "Revelation 7:1-3"],
  7: ["Ezekiel 9:4-6", "Numbers 1:2-3", "Isaiah 49:10", "Revelation 14:1-5", "Revelation 22:3-4"],
  8: ["Leviticus 16:12-13", "Exodus 30:1-10", "Ezekiel 10:2", "Joshua 6:4-5", "Joel 2:1"],
  9: ["Joel 1:4-7", "Exodus 10:12-15", "Revelation 8:13", "Luke 10:19", "Revelation 16:12"],
  10: ["Daniel 12:4", "Daniel 8:14", "Ezekiel 2:8-3:3", "Revelation 14:6-7", "Matthew 24:14"],
  11: ["Ezekiel 40:3-5", "Zechariah 4:2-14", "Daniel 7:25", "Revelation 12:6", "Revelation 14:7"],
  12: ["Genesis 3:15", "Genesis 37:9", "Psalm 2:7-9", "Daniel 7:25", "Revelation 14:12"],
  13: ["Daniel 7:3-8", "Daniel 7:21-25", "Daniel 8:11-14", "Revelation 12:17", "Revelation 14:9-12"],
  14: ["Daniel 7:9-14", "Daniel 8:14", "Exodus 20:8-11", "Revelation 13:16-18", "Revelation 15:2-4"],
  15: ["Exodus 15:1-18", "Daniel 7:9-14", "Revelation 14:9-12", "Revelation 16:1", "Revelation 19:1-2"],
  16: ["Exodus 7:17-21", "Daniel 5:26-31", "Revelation 14:9-12", "Revelation 15:1", "Revelation 19:20"],
  17: ["Jeremiah 51:7-8", "Daniel 7:3-8", "Revelation 13:1-10", "Revelation 14:8", "Revelation 18:2-4"],
  18: ["Isaiah 21:9", "Jeremiah 51:6-8", "Revelation 14:8", "Revelation 16:19", "Revelation 19:1-3"],
  19: ["Psalm 2:8-9", "Isaiah 63:1-6", "John 1:1-14", "Revelation 17:14", "Revelation 20:10"],
  20: ["Daniel 7:9-10", "Daniel 12:1-2", "John 5:28-29", "1 Corinthians 6:2-3", "Revelation 21:1"],
  21: ["Isaiah 65:17-25", "Ezekiel 37:27", "John 14:1-3", "Hebrews 11:10", "Revelation 22:1-5"],
  22: ["Genesis 2:9-10", "Genesis 3:22-24", "Ezekiel 47:1-12", "John 7:37-39", "Revelation 1:1-3"]
};

const pericopeRefs = [
  [1, 1, 3, ["Daniel 12:4", "Amos 3:7", "Luke 11:28", "Revelation 22:6-7"]],
  [1, 4, 8, ["Exodus 3:14", "Isaiah 44:6", "Zechariah 12:10", "Matthew 24:30"]],
  [1, 9, 20, ["Daniel 7:13-14", "Ezekiel 1:26-28", "Zechariah 4:2", "Hebrews 4:14-16"]],
  [2, 1, 7, ["Jeremiah 2:2", "Acts 20:29-31", "Ephesians 1:15-16", "Revelation 1:20"]],
  [2, 8, 11, ["Isaiah 44:6", "Matthew 10:22", "James 1:12", "Revelation 20:14"]],
  [2, 12, 17, ["Numbers 22:1-6", "Numbers 25:1-3", "Hebrews 4:12", "Exodus 16:32-34"]],
  [2, 18, 29, ["1 Kings 16:31", "Psalm 2:8-9", "Revelation 22:16", "Acts 15:20"]],
  [3, 1, 6, ["Isaiah 11:2", "Matthew 24:42", "Revelation 16:15", "Revelation 20:12"]],
  [3, 7, 13, ["Isaiah 22:22", "1 Corinthians 16:9", "Revelation 21:2", "Revelation 14:12"]],
  [3, 14, 22, ["Proverbs 3:12", "John 14:23", "Hebrews 12:6", "Revelation 19:9"]],
  [4, 1, 11, ["Isaiah 6:1-4", "Ezekiel 1:26-28", "Daniel 7:9-10", "Exodus 19:16"]],
  [5, 1, 14, ["Genesis 49:10", "Isaiah 53:7", "Daniel 7:13-14", "John 1:29"]],
  [6, 1, 8, ["Zechariah 6:1-8", "Matthew 24:4-8", "Leviticus 26:18-26", "Ezekiel 14:21"]],
  [6, 9, 11, ["Genesis 4:10", "Leviticus 4:7", "Matthew 24:9-13", "Hebrews 11:39-40"]],
  [6, 12, 17, ["Joel 2:10-11", "Isaiah 13:9-13", "Matthew 24:29-30", "Revelation 7:1-3"]],
  [7, 1, 8, ["Ezekiel 9:4-6", "Revelation 14:1-5", "Ephesians 1:13", "Revelation 9:4"]],
  [7, 9, 17, ["Isaiah 49:10", "Psalm 23:1-2", "John 10:11", "Revelation 21:3-4"]],
  [8, 1, 5, ["Leviticus 16:12-13", "Exodus 30:1-10", "Psalm 141:2", "Ezekiel 10:2"]],
  [8, 6, 13, ["Joshua 6:4-5", "Exodus 7:20-21", "Jeremiah 51:25", "Joel 2:1"]],
  [9, 1, 12, ["Isaiah 14:12", "Joel 1:4-7", "Luke 10:19", "Revelation 20:1-3"]],
  [9, 13, 21, ["Revelation 8:3-5", "Revelation 16:12", "Psalm 115:4-8", "Daniel 5:23"]],
  [10, 1, 7, ["Daniel 12:4", "Daniel 12:7", "Revelation 5:1-7", "Revelation 14:6-7"]],
  [10, 8, 11, ["Ezekiel 2:8-3:3", "Jeremiah 15:16", "Daniel 8:14", "Matthew 24:14"]],
  [11, 1, 2, ["Ezekiel 40:3-5", "Zechariah 2:1-5", "Daniel 8:14", "Revelation 14:7"]],
  [11, 3, 14, ["Zechariah 4:2-14", "Daniel 7:25", "Revelation 12:6", "Psalm 119:105"]],
  [11, 15, 19, ["Daniel 7:13-14", "Psalm 2:8-9", "Revelation 14:7", "Revelation 15:5"]],
  [12, 1, 6, ["Genesis 3:15", "Genesis 37:9", "Psalm 2:7-9", "Daniel 7:25"]],
  [12, 7, 12, ["Luke 10:18", "John 12:31", "Romans 8:33-34", "Revelation 12:11"]],
  [12, 13, 17, ["Exodus 19:4", "Daniel 7:25", "Revelation 13:1-11", "Revelation 14:12"]],
  [13, 1, 4, ["Daniel 7:3-8", "Daniel 7:21-25", "Revelation 12:3", "Revelation 17:15"]],
  [13, 5, 10, ["Daniel 7:21-25", "Daniel 8:11-14", "Revelation 12:6", "Revelation 14:12"]],
  [13, 11, 12, ["Revelation 12:16-17", "Daniel 7:25", "Revelation 14:9-12", "Matthew 7:15"]],
  [13, 13, 15, ["1 Kings 18:24", "Daniel 3:4-6", "Matthew 24:24", "Revelation 19:20"]],
  [13, 16, 18, ["Exodus 20:8-11", "Deuteronomy 6:6-8", "Revelation 7:3", "Revelation 14:9-12"]],
  [14, 1, 5, ["Revelation 7:1-4", "Psalm 2:6", "Hebrews 12:22", "Revelation 15:2-4"]],
  [14, 6, 7, ["Matthew 24:14", "Daniel 7:9-14", "Daniel 8:14", "Exodus 20:8-11"]],
  [14, 8, 8, ["Genesis 11:1-9", "Isaiah 21:9", "Jeremiah 51:7-8", "Revelation 18:2-4"]],
  [14, 9, 12, ["Daniel 3:4-6", "Revelation 13:15-17", "Exodus 20:1-17", "Revelation 12:17"]],
  [14, 13, 13, ["Daniel 12:2", "1 Thessalonians 4:13-18", "Hebrews 4:9-10", "Revelation 6:9-11"]],
  [14, 14, 20, ["Daniel 7:13-14", "Matthew 13:39-43", "Joel 3:13", "Isaiah 63:1-6"]],
  [15, 1, 1, ["Revelation 14:9-12", "Revelation 16:1", "Exodus 7:17-21", "Daniel 12:1"]],
  [15, 2, 4, ["Exodus 15:1-18", "Revelation 4:6", "Revelation 14:1-5", "Revelation 19:1-2"]],
  [15, 5, 8, ["Exodus 40:34-35", "1 Kings 8:10-11", "Daniel 8:14", "Revelation 11:19"]],
  [16, 1, 11, ["Exodus 7:17-21", "Exodus 9:8-11", "Revelation 14:9-11", "Revelation 15:1"]],
  [16, 12, 16, ["Daniel 5:26-31", "1 Kings 18:20-40", "Matthew 24:43-44", "Revelation 17:12-14"]],
  [16, 17, 21, ["Revelation 11:19", "Revelation 18:5", "Revelation 19:20", "Hebrews 12:26-27"]],
  [17, 1, 6, ["Jeremiah 51:7-8", "Revelation 12:1", "Revelation 13:1", "Revelation 18:24"]],
  [17, 7, 14, ["Daniel 7:3-8", "Daniel 7:24", "Revelation 13:1-10", "Revelation 19:16"]],
  [17, 15, 18, ["Revelation 17:15", "Jeremiah 51:13", "Revelation 18:8", "Daniel 2:44"]],
  [18, 1, 8, ["Isaiah 21:9", "Jeremiah 51:6-8", "Revelation 14:8", "Revelation 16:19"]],
  [18, 9, 19, ["Ezekiel 27:27-36", "Isaiah 23:8-9", "James 5:1-5", "Revelation 18:3"]],
  [18, 20, 24, ["Deuteronomy 32:43", "Jeremiah 51:63-64", "Revelation 6:9-11", "Revelation 19:1-3"]],
  [19, 1, 10, ["Isaiah 54:5", "Matthew 22:1-14", "Ephesians 5:25-27", "Revelation 21:2"]],
  [19, 11, 16, ["Psalm 2:8-9", "Isaiah 11:4", "Isaiah 63:1-6", "John 1:1-14"]],
  [19, 17, 21, ["Ezekiel 39:17-20", "Revelation 13:13-15", "Revelation 16:13-14", "Revelation 20:10"]],
  [20, 1, 3, ["Leviticus 16:21-22", "Jeremiah 4:23-26", "Revelation 19:20-21", "Jude 1:6"]],
  [20, 4, 6, ["Daniel 7:9-10", "Daniel 12:1-2", "John 5:28-29", "1 Corinthians 6:2-3"]],
  [20, 7, 10, ["Ezekiel 38:2-9", "Ezekiel 39:6", "Revelation 19:20", "Malachi 4:1-3"]],
  [20, 11, 15, ["Daniel 7:9-10", "Daniel 12:1", "Matthew 10:28", "Revelation 21:8"]],
  [21, 1, 8, ["Isaiah 65:17-25", "Ezekiel 37:27", "John 14:1-3", "Revelation 20:14-15"]],
  [21, 9, 14, ["Ezekiel 40:2", "Isaiah 54:11-12", "Ephesians 2:20", "Revelation 19:7-8"]],
  [21, 15, 27, ["Ezekiel 40:3-5", "Ezekiel 48:30-35", "Isaiah 60:19-20", "Revelation 22:5"]],
  [22, 1, 5, ["Genesis 2:9-10", "Genesis 3:22-24", "Ezekiel 47:1-12", "Revelation 7:17"]],
  [22, 6, 11, ["Daniel 12:4", "Revelation 1:1-3", "Revelation 3:11", "Revelation 22:20"]],
  [22, 12, 21, ["Isaiah 55:1", "John 7:37", "Revelation 21:6", "Revelation 22:7"]]
];

const keywordRefs = [
  [/nicolaitanes/i, ["Revelation 2:15", "Acts 15:20", "2 Peter 2:15", "Jude 1:11"]],
  [/balaam/i, ["Numbers 22:1-6", "Numbers 25:1-3", "Numbers 31:16", "2 Peter 2:15"]],
  [/jezebel/i, ["1 Kings 16:31", "1 Kings 18:4", "1 Kings 21:25", "2 Kings 9:22"]],
  [/synagogue of satan/i, ["Romans 2:28-29", "John 8:39-44", "Revelation 3:9", "Galatians 3:29"]],
  [/hidden manna/i, ["Exodus 16:32-34", "John 6:48-51", "Hebrews 9:4", "Revelation 2:17"]],
  [/white stone/i, ["Isaiah 62:2", "Revelation 3:12", "Revelation 19:12", "2 Timothy 2:19"]],
  [/morning star/i, ["Numbers 24:17", "2 Peter 1:19", "Revelation 22:16", "Psalm 2:8-9"]],
  [/book of life/i, ["Exodus 32:32-33", "Daniel 12:1", "Philippians 4:3", "Revelation 20:12"]],
  [/key of david/i, ["Isaiah 22:22", "Matthew 16:19", "Revelation 1:18", "Revelation 3:7"]],
  [/lukewarm/i, ["Romans 12:11", "Titus 2:14", "Hebrews 12:6", "Revelation 3:19"]],
  [/gold tried in the fire/i, ["1 Peter 1:7", "Galatians 5:6", "James 2:5", "Revelation 3:18"]],
  [/white raiment|white robes/i, ["Isaiah 61:10", "Zechariah 3:3-5", "Revelation 7:14", "Revelation 19:8"]],
  [/eyesalve/i, ["John 9:39-41", "Ephesians 1:17-18", "2 Peter 1:9", "Revelation 3:18"]],
  [/throne/i, ["Isaiah 6:1", "Daniel 7:9-10", "Psalm 47:8", "Revelation 4:2"]],
  [/\blamb\b/i, ["Isaiah 53:7", "John 1:29", "1 Peter 1:18-19", "Revelation 5:6"]],
  [/\bscroll\b|book/i, ["Daniel 12:4", "Ezekiel 2:9-10", "Revelation 5:1", "Revelation 10:2"]],
  [/\bseal\b|seals/i, ["Daniel 12:4", "Ephesians 1:13", "Revelation 7:3", "Revelation 9:4"]],
  [/trumpet/i, ["Joshua 6:4-5", "Joel 2:1", "Numbers 10:9", "Revelation 8:6"]],
  [/incense/i, ["Exodus 30:1-10", "Psalm 141:2", "Luke 1:10", "Revelation 8:3"]],
  [/altar/i, ["Leviticus 4:7", "Isaiah 6:6-7", "Hebrews 13:10", "Revelation 6:9"]],
  [/little book/i, ["Daniel 12:4", "Ezekiel 2:8-3:3", "Revelation 10:2", "Revelation 10:9"]],
  [/seven thunders/i, ["Psalm 29:3-9", "Daniel 12:4", "Revelation 10:4", "John 12:28-29"]],
  [/two witnesses/i, ["Deuteronomy 19:15", "Zechariah 4:2-14", "Matthew 24:14", "Revelation 11:3"]],
  [/measur/i, ["Ezekiel 40:3-5", "Zechariah 2:1-5", "Revelation 11:1", "Revelation 21:15"]],
  [/temple/i, ["1 Kings 8:10-11", "Daniel 8:14", "Hebrews 8:1-2", "Revelation 11:19"]],
  [/woman clothed|woman/i, ["Genesis 3:15", "Genesis 37:9", "Isaiah 54:5-6", "Revelation 12:1"]],
  [/dragon/i, ["Genesis 3:15", "Isaiah 27:1", "John 12:31", "Revelation 12:9"]],
  [/wilderness/i, ["Exodus 19:4", "1 Kings 17:2-6", "Daniel 7:25", "Revelation 12:6"]],
  [/remnant/i, ["Isaiah 11:11", "Romans 11:5", "Revelation 12:17", "Revelation 14:12"]],
  [/commandments of god/i, ["Exodus 20:1-17", "John 14:15", "Revelation 12:17", "Revelation 14:12"]],
  [/testimony of jesus/i, ["Revelation 1:2", "Revelation 12:17", "Revelation 19:10", "1 Corinthians 1:6"]],
  [/sea beast/i, ["Daniel 7:3-8", "Daniel 7:21-25", "Revelation 13:1", "Revelation 17:15"]],
  [/earth beast/i, ["Revelation 12:16-17", "Revelation 13:11", "Revelation 14:9-12", "Revelation 19:20"]],
  [/deadly wound|wounded to death/i, ["Revelation 13:3", "Revelation 13:10", "Daniel 7:25", "Revelation 17:8"]],
  [/image of the beast/i, ["Daniel 3:4-6", "Revelation 13:14-15", "Revelation 14:9-11", "Revelation 19:20"]],
  [/mark of the beast|\bmark\b/i, ["Exodus 20:8-11", "Deuteronomy 6:6-8", "Revelation 7:3", "Revelation 14:9-12"]],
  [/fire come down|fire from heaven/i, ["1 Kings 18:24", "2 Kings 1:10-12", "Matthew 24:24", "Revelation 19:20"]],
  [/buy or sell/i, ["Revelation 13:17", "Revelation 18:3", "James 5:1-5", "Matthew 6:31-33"]],
  [/six hundred threescore and six|666|number of the beast/i, ["1 Kings 10:14", "Daniel 3:1", "Revelation 13:18", "Revelation 15:2"]],
  [/hundred forty and four thousand|144,000/i, ["Revelation 7:1-4", "Revelation 14:1-5", "Revelation 15:2-4", "Ezekiel 9:4-6"]],
  [/father's name|father.*name/i, ["Exodus 34:5-7", "Revelation 7:3", "Revelation 14:1", "Revelation 22:4"]],
  [/new song/i, ["Psalm 40:3", "Psalm 96:1", "Revelation 5:9", "Revelation 15:3"]],
  [/firstfruits/i, ["Leviticus 23:10-11", "James 1:18", "Revelation 14:4", "1 Corinthians 15:20"]],
  [/everlasting gospel/i, ["Genesis 3:15", "Matthew 24:14", "Romans 1:16", "Revelation 14:6"]],
  [/hour of his judgment|judgment is come/i, ["Daniel 7:9-14", "Daniel 8:14", "Ecclesiastes 12:13-14", "Revelation 14:7"]],
  [/worship him that made|made heaven.*earth.*sea/i, ["Genesis 2:1-3", "Exodus 20:8-11", "Psalm 146:6", "Revelation 14:7"]],
  [/babylon is fallen/i, ["Isaiah 21:9", "Jeremiah 51:7-8", "Revelation 14:8", "Revelation 18:2-4"]],
  [/wine of the wrath|wine/i, ["Jeremiah 51:7", "Revelation 14:8-10", "Revelation 17:2", "Revelation 18:3"]],
  [/patience of the saints/i, ["Daniel 7:25", "Matthew 24:13", "Hebrews 10:36", "Revelation 14:12"]],
  [/faith of jesus/i, ["Galatians 2:20", "Hebrews 12:2", "Revelation 14:12", "Revelation 19:10"]],
  [/harvest/i, ["Joel 3:13", "Matthew 13:39-43", "Mark 4:29", "Revelation 14:15"]],
  [/sickle/i, ["Joel 3:13", "Mark 4:29", "Revelation 14:14-19", "Matthew 13:39"]],
  [/winepress/i, ["Isaiah 63:1-6", "Joel 3:13", "Revelation 14:19-20", "Revelation 19:15"]],
  [/seven last plagues|plagues|vials|bowls/i, ["Exodus 7:17-21", "Revelation 15:1", "Revelation 16:1", "Daniel 12:1"]],
  [/sea of glass/i, ["Revelation 4:6", "Revelation 15:2", "Exodus 14:21-31", "Revelation 21:18"]],
  [/song of moses|song of the lamb/i, ["Exodus 15:1-18", "Deuteronomy 32:3-4", "Revelation 5:9", "Revelation 15:3"]],
  [/euphrates/i, ["Genesis 15:18", "Jeremiah 51:36", "Daniel 5:26-31", "Revelation 16:12"]],
  [/unclean spirits|frogs/i, ["Exodus 8:1-15", "1 Kings 22:21-23", "Matthew 24:24", "Revelation 16:13-14"]],
  [/armageddon/i, ["Judges 5:19", "1 Kings 18:20-40", "Zechariah 12:11", "Revelation 16:16"]],
  [/\bbook of life\b/i, ["Exodus 32:32-33", "Daniel 12:1", "Revelation 3:5", "Revelation 20:12"]],
  [/\bsecond death\b/i, ["Revelation 2:11", "Revelation 20:6", "Revelation 20:14-15", "Revelation 21:8"]],
  [/great whore|harlot|\bwhore\b/i, ["Jeremiah 3:6-9", "Ezekiel 16:15-22", "Revelation 17:1-6", "Revelation 19:2"]],
  [/scarlet coloured beast|scarlet beast/i, ["Daniel 7:3-8", "Revelation 13:1", "Revelation 17:3", "Revelation 17:8"]],
  [/seven heads|ten horns/i, ["Daniel 7:7-8", "Daniel 7:24", "Revelation 13:1", "Revelation 17:9-12"]],
  [/come out of her/i, ["Genesis 19:12-17", "Isaiah 48:20", "Jeremiah 51:6", "2 Corinthians 6:17"]],
  [/no more death|wipe away all tears|tears|sorrow|crying|pain/i, ["Isaiah 25:8", "Isaiah 65:19", "1 Corinthians 15:26", "Revelation 21:4"]],
  [/Spirit and the bride|whosoever will|let him that is athirst|take the water of life|come quickly|i come quickly/i, ["Isaiah 55:1", "John 7:37", "Revelation 21:6", "Revelation 22:17"]],
  [/merchants|merchandise|souls of men/i, ["Ezekiel 27:27-36", "Isaiah 23:8-9", "James 5:1-5", "Revelation 18:11-13"]],
  [/marriage supper|marriage of the lamb|wife hath|his wife|fine linen|bride adorned|bride, the lamb/i, ["Isaiah 54:5", "Matthew 22:1-14", "Ephesians 5:25-27", "Revelation 21:2"]],
  [/white horse|faithful and true|called the word of god|king of kings|lord of lords/i, ["Psalm 2:8-9", "Isaiah 63:1-6", "John 1:1-14", "Revelation 19:11-16"]],
  [/bottomless pit|thousand years|millennium/i, ["Jeremiah 4:23-26", "Revelation 20:1-3", "1 Corinthians 6:2-3", "Revelation 20:6"]],
  [/first resurrection/i, ["Daniel 12:2", "John 5:28-29", "1 Thessalonians 4:16-17", "Revelation 20:5-6"]],
  [/second death|lake of fire/i, ["Malachi 4:1-3", "Matthew 10:28", "Revelation 20:14-15", "Revelation 21:8"]],
  [/new heaven|new earth/i, ["Isaiah 65:17-25", "2 Peter 3:13", "Revelation 21:1", "Revelation 22:5"]],
  [/new jerusalem|holy jerusalem|holy city/i, ["Isaiah 54:11-12", "Hebrews 11:10", "Revelation 21:2", "Revelation 21:10"]],
  [/water of life|river of water of life/i, ["Ezekiel 47:1-12", "John 7:37-39", "Revelation 21:6", "Revelation 22:1"]],
  [/tree of life/i, ["Genesis 2:9", "Genesis 3:22-24", "Revelation 2:7", "Revelation 22:2"]],
  [/no more curse|see his face|name.*foreheads/i, ["Numbers 6:24-26", "Psalm 17:15", "Revelation 14:1", "Revelation 22:3-4"]],
  [/spirit and the bride|whosoever will|come quickly|i come quickly/i, ["Isaiah 55:1", "John 7:37", "Revelation 1:7", "Revelation 22:17"]]
];

const symbolDefinitions = [
  ["Seven stars", [/seven stars/i], "The messengers of the churches held in Christ's right hand, showing His care and authority over His church."],
  ["Seven lampstands", [/lampstands?/i], "The churches as light-bearing communities, called to witness because Christ walks among them."],
  ["Nicolaitanes", [/nicolaitanes/i], "A compromising pattern that separates profession from obedience and weakens holy love."],
  ["Balaam", [/balaam/i], "A pattern of idolatrous and immoral compromise that corrupts covenant loyalty."],
  ["Jezebel", [/jezebel/i], "A symbol of seductive religious compromise that calls God's people away from purity and faithfulness."],
  ["Hidden manna", [/hidden manna/i], "Christ's sustaining provision for the faithful, echoing God's wilderness care and the bread from heaven."],
  ["White stone", [/white stone/i], "A token of Christ's acceptance and a new identity known by Him."],
  ["Morning star", [/morning star/i], "Christ's victorious light and promised reign shared with those who overcome."],
  ["White raiment", [/white raiment|white robes/i], "Christ-given righteousness, purity, and victory."],
  ["Book of life", [/book of life/i], "The heavenly register of those who belong to Christ."],
  ["Key of David", [/key of david/i], "Christ's royal authority to open and shut in the work of salvation and mission."],
  ["Open door", [/open door|door/i], "Christ-given access, opportunity, and fellowship that human power cannot finally close."],
  ["Gold tried in the fire", [/gold tried in the fire|buy.*gold|gold.*tried|gold.*fire/i], "Faith and love purified by trial and received from Christ rather than self-sufficiency."],
  ["Eyesalve", [/eyesalve/i], "Spiritual discernment that lets the church see itself and Christ truthfully."],
  ["Throne", [/throne/i], "God's sovereign rule, judgment, and worship at the center of heavenly reality."],
  ["Seven Spirits", [/seven spirits/i], "The fullness of the Spirit's presence before God's throne and in Christ's ministry."],
  ["Twenty-four elders", [/four and twenty elders|twenty-four elders/i], "Heavenly worshipers who represent redeemed, priestly praise around God's throne."],
  ["Four living creatures", [/four beasts|living creatures/i], "Heavenly beings surrounding the throne, leading creation in worship."],
  ["Scroll", [/\bscroll\b|sealed book/i], "God's redemptive purpose in history, opened only by the worthy Lamb."],
  ["Lamb", [/\blamb\b/i], "Christ as the slain and risen Redeemer whose sacrifice and victory qualify Him to open the scroll."],
  ["Seals", [/\bseal\b|seals/i], "A sequence of history and judgment opened under the Lamb's authority."],
  ["Altar", [/altar/i], "The sanctuary setting where sacrifice, prayer, and judgment meet before God."],
  ["Trumpets", [/trumpet/i], "Warning judgments that call the world to repentance before final events."],
  ["Incense", [/incense/i], "Prayer mingled with heavenly intercession before God."],
  ["Little book", [/little book/i], "The opened prophetic message connected with Daniel and renewed mission."],
  ["Seven thunders", [/seven thunders/i], "A sealed portion of the vision, reminding readers that God reveals enough for faith without satisfying every curiosity."],
  ["Measuring rod", [/measuring rod|reed like unto a rod|measure(?:d|ment)? (?:the )?(?:temple|city|wall)|measuring/i], "A symbol of divine evaluation, protection, and sanctuary-centered judgment."],
  ["Two witnesses", [/two witnesses/i], "God's faithful testimony through His Word and witness during opposition."],
  ["Temple", [/temple/i], "The sanctuary setting of worship, judgment, intercession, and God's covenant presence."],
  ["Woman clothed with the sun", [/woman clothed with the sun|woman clothed|clothed with the sun|sun.*moon.*stars/i], "The faithful covenant people of God, through whom the Messiah comes and against whom the dragon wars."],
  ["Dragon", [/dragon/i], "Satan as the ancient enemy of Christ and His people."],
  ["Male child", [/man child|male child|child/i], "Christ, the promised ruler who is caught up to God and His throne."],
  ["Wilderness", [/wilderness/i], "A place of divine protection and testing during the long period of oppression."],
  ["Remnant", [/remnant/i], "The faithful people who remain loyal to God, keep His commandments, and hold the testimony of Jesus."],
  ["Commandments of God", [/commandments of god/i], "Covenant loyalty expressed in obedience to God's revealed will."],
  ["Testimony of Jesus", [/testimony of jesus/i], "The witness centered in Jesus, later defined in Revelation as the spirit of prophecy."]
  ,["Sea beast", [/sea beast|beast rise up out of the sea/i], "A papal-Roman religio-political power rising from the nations and opposing the Lamb through false worship and blasphemous authority."]
  ,["Sea", [/sand of the sea|out of the sea|waters are peoples/i], "The populated nations and restless peoples from which the first beast rises."]
  ,["Horns", [/ten horns|horns/i], "Political power and ruling strength, echoing Daniel's beast visions."]
  ,["Blasphemous names", [/name of blasphemy|blasphemous names|blasphemy/i], "Claims and titles that usurp honor, authority, or mediation belonging to God alone."]
  ,["Deadly wound", [/deadly wound|wounded to death|wound by a sword/i], "The historical loss of beastly dominance followed by a recovery of influence that prepares the final crisis."]
  ,["Earth beast", [/earth beast|another beast coming up out of the earth/i], "A later lamblike power that rises from a less populated setting but eventually speaks with dragon-like coercion."]
  ,["Lamb-like horns", [/horns like a lamb|lamb-like/i], "An initially gentle appearance associated with liberty, Christian profession, and non-imperial beginnings."]
  ,["Dragon speech", [/spake as a dragon|speaks like a dragon|dragon-like/i], "Coercive law and satanic pressure replacing the freedom and gentleness promised by the lamblike appearance."]
  ,["Fire from heaven", [/fire come down|fire from heaven/i], "Counterfeit divine validation through deceptive signs that imitate true prophetic power."]
  ,["Image of the beast", [/image of the beast|make an image/i], "A reproduced church-state arrangement that enforces false worship after the pattern of the first beast."]
  ,["Mark of the beast", [/mark of the beast|\bmark\b/i], "A sign of allegiance to beastly authority in the final worship crisis, contrasted with God's seal."]
  ,["Forehead and hand", [/foreheads?|right hand/i], "Mind-level conviction and outward action or compliance in the final test of allegiance."]
  ,["Buying and selling", [/buy or sell/i], "Economic pressure used to force participation in the beast's worship system."]
  ,["Number of the beast", [/six hundred threescore and six|666|number of the beast/i], "The beast's man-centered counterfeit identity, calling for wisdom rather than sensational speculation."]
  ,["144,000", [/hundred forty and four thousand|144,000/i], "The sealed end-time people who stand with the Lamb in contrast to those marked by the beast."]
  ,["Father's name", [/father's name|father.*name/i], "God's character, ownership, and settled allegiance written in the mind of His people."]
  ,["New song", [/new song/i], "The praise of redeemed experience that can be learned only by those brought through the Lamb's victory."]
  ,["Firstfruits", [/firstfruits/i], "A dedicated harvest for God and the Lamb, showing the ripened fruit of redemption."]
  ,["Everlasting gospel", [/everlasting gospel/i], "The saving good news centered in Christ, proclaimed worldwide in the setting of final judgment."]
  ,["Judgment hour", [/hour of his judgment|judgment is come/i], "The present heavenly judgment connected with Christ's sanctuary ministry and the call to prepare for His return."]
  ,["Creator worship", [/worship him that made|made heaven.*earth.*sea/i], "The final call to worship God as Creator, echoing the Sabbath commandment."]
  ,["Babylon", [/babylon/i], "The system of spiritual confusion, false worship, and world-alliance opposed to the Lamb."]
  ,["Babylon's wine", [/wine of the wrath|wine/i], "Intoxicating teachings and loyalties that cloud judgment and draw the nations into false worship."]
  ,["Patience of the saints", [/patience of the saints/i], "Enduring faithfulness under pressure, joined to commandment-keeping and trust in Jesus."]
  ,["Faith of Jesus", [/faith of jesus/i], "Trust in Jesus and the faithful endurance seen in Jesus, held by God's final people."]
  ,["Harvest", [/harvest|reap|reaped/i], "The final gathering and separation that reveals what has ripened in response to the gospel."]
  ,["Sickle", [/sickle/i], "A symbol of decisive harvest and judgment when character has ripened."]
  ,["Winepress", [/winepress/i], "The final judgment of ripened rebellion outside the city of God."]
  ,["Seven last plagues", [/seven last plagues|plagues|vials|bowls/i], "The final judgments that reveal the settled result of rejecting the Lamb's mercy."]
  ,["Sea of glass", [/sea of glass/i], "The throne-room expanse where the redeemed stand in victory after the beast's crisis."]
  ,["Song of Moses and the Lamb", [/song of moses|song of the lamb/i], "The praise of final deliverance joining Exodus victory with redemption through Christ."]
  ,["Euphrates", [/euphrates/i], "The symbolic support of Babylon dried up in preparation for final judgment."]
  ,["Unclean spirits", [/unclean spirits|frogs/i], "Demonic deceptions that gather earthly powers against God in the final crisis."]
  ,["Armageddon", [/armageddon/i], "The final conflict over worship and allegiance, not a call to speculative geography."]
  ,["Book of life", [/\bbook of life\b/i], "The heavenly record of those who belong to the Lamb and inherit life with God."]
  ,["Harlot", [/great whore|harlot|\bwhore\b/i], "Apostate religion joined to worldly power in contrast with the pure bride of the Lamb."]
  ,["Scarlet beast", [/scarlet coloured beast|scarlet beast/i], "The political-religious power structure that carries and supports Babylon for a time."]
  ,["Seven heads and ten horns", [/seven heads|ten horns/i], "Ruling powers and kingdoms that support the beastly system before God's judgment exposes them."]
  ,["Call out of Babylon", [/come out of her/i], "God's merciful summons for His people to separate from Babylon before her plagues fall."]
  ,["No more death", [/no more death|wipe away all tears|tears|sorrow|crying|pain/i], "The final removal of suffering and mortality from God's restored creation."]
  ,["Babylon's economy", [/merchants|merchandise|souls of men/i], "A system where luxury, power, worship, and human lives are traded for gain."]
  ,["Marriage supper", [/marriage supper|marriage of the lamb|wife hath|his wife|fine linen|bride adorned|bride, the lamb/i], "The covenant joy of Christ and His redeemed people after Babylon's fall."]
  ,["Rider on the white horse", [/white horse|faithful and true|called the word of god|king of kings|lord of lords/i], "Christ appearing as the righteous King whose word defeats the powers of evil."]
  ,["Millennium", [/bottomless pit|thousand years|millennium/i], "The thousand-year period after Christ's appearing when Satan is bound and the redeemed share in judgment."]
  ,["First resurrection", [/first resurrection/i], "The resurrection of the blessed and holy who live and reign with Christ."]
  ,["Second death", [/second death|lake of fire/i], "The final irreversible destruction of sin and all who refuse the life of Christ."]
  ,["New heaven and new earth", [/new heaven|new earth/i], "Creation restored after sin, death, and the old order have passed away."]
  ,["New Jerusalem", [/new jerusalem|holy jerusalem|holy city/i], "The bride-city where God dwells with His redeemed people."]
  ,["River of life", [/water of life|river of water of life/i], "Life flowing from the throne of God and the Lamb to the healed creation."]
  ,["Tree of life", [/tree of life/i], "Eden's gift restored, giving fruit and healing in the city of God."]
  ,["Face and name of God", [/no more curse|see his face|name.*foreheads/i], "Direct fellowship and settled covenant identity with God."]
  ,["Final invitation", [/spirit and the bride|whosoever will|come quickly|i come quickly/i], "The closing gospel appeal to come to Christ and receive the water of life freely."]
];

const symbolScriptureReferences = {
  "144,000": ["Revelation 7:1-4", "Revelation 14:1-5", "Ezekiel 9:4-6", "Revelation 15:2-4"],
  Altar: ["Exodus 30:1-10", "Psalm 141:2", "Revelation 6:9", "Revelation 8:3-5"],
  Armageddon: ["Judges 5:19", "1 Kings 18:20-40", "Zechariah 12:11", "Revelation 16:16"],
  Babylon: ["Genesis 11:1-9", "Isaiah 21:9", "Jeremiah 51:7-8", "Revelation 18:2-4"],
  "Babylon remembered": ["Daniel 5:26-28", "Revelation 16:19", "Revelation 18:5", "Jeremiah 51:6-8"],
  "Babylon's collapse": ["Jeremiah 51:63-64", "Revelation 17:15-18", "Revelation 18:8", "Revelation 19:1-3"],
  "Babylon's economy": ["Ezekiel 27:27-36", "Isaiah 23:8-9", "James 5:1-5", "Revelation 18:11-13"],
  "Babylon's fall": ["Isaiah 21:9", "Jeremiah 51:7-8", "Revelation 14:8", "Revelation 18:2"],
  "Babylon's wine": ["Jeremiah 51:7", "Revelation 14:8-10", "Revelation 17:2", "Revelation 18:3"],
  Balaam: ["Numbers 22:1-6", "Numbers 25:1-3", "Numbers 31:16", "2 Peter 2:15"],
  "Black horse": ["Zechariah 6:2-6", "Revelation 6:5-6", "Lamentations 5:10", "Ezekiel 4:16"],
  "Blasphemous names": ["Daniel 7:25", "2 Thessalonians 2:3-4", "Revelation 13:1", "Revelation 17:3"],
  "Book of life": ["Exodus 32:32-33", "Daniel 12:1", "Revelation 3:5", "Revelation 20:12"],
  "Bowl judgments": ["Exodus 7:17-21", "Exodus 9:8-11", "Revelation 15:1", "Revelation 16:1-11"],
  "Buying and selling": ["Revelation 13:17", "Revelation 18:3", "James 5:1-5", "Matthew 6:31-33"],
  "Call out of Babylon": ["Genesis 19:12-17", "Isaiah 48:20", "Jeremiah 51:6", "2 Corinthians 6:17"],
  "Commandments of God": ["Exodus 20:1-17", "John 14:15", "Revelation 12:17", "Revelation 14:12"],
  "Creator worship": ["Genesis 2:1-3", "Exodus 20:8-11", "Psalm 146:6", "Revelation 14:7"],
  "Deadly wound": ["Daniel 7:25", "Revelation 13:3", "Revelation 13:10", "Revelation 17:8"],
  "Divine light": ["Isaiah 60:1-3", "Isaiah 60:19-20", "John 8:12", "Revelation 22:5"],
  Dragon: ["Genesis 3:15", "Isaiah 27:1", "John 12:31", "Revelation 12:9"],
  "Dragon speech": ["Revelation 12:9", "Revelation 13:11", "Revelation 13:15", "Matthew 24:24"],
  "Earth beast": ["Revelation 12:16-17", "Revelation 13:11", "Revelation 14:9-12", "Revelation 19:20"],
  Euphrates: ["Genesis 15:18", "Jeremiah 51:36", "Daniel 5:26-31", "Revelation 16:12"],
  "Everlasting gospel": ["Genesis 3:15", "Matthew 24:14", "Romans 1:16-17", "Revelation 14:6"],
  Eyesalve: ["John 9:39-41", "Ephesians 1:17-18", "2 Peter 1:9", "Revelation 3:18"],
  "Face and name of God": ["Numbers 6:24-26", "Psalm 17:15", "Revelation 14:1", "Revelation 22:3-4"],
  "Faith of Jesus": ["Galatians 2:20", "Hebrews 12:1-3", "Revelation 14:12", "Revelation 19:10"],
  "Faithful prophecy": ["Daniel 12:4", "Revelation 1:1-3", "Revelation 22:6-10", "Revelation 22:18-19"],
  "Father's name": ["Exodus 34:5-7", "Revelation 7:3", "Revelation 14:1", "Revelation 22:4"],
  "Final invitation": ["Isaiah 55:1", "John 7:37", "Revelation 21:6", "Revelation 22:17"],
  "Fire from heaven": ["1 Kings 18:24", "2 Kings 1:10-12", "Matthew 24:24", "Revelation 13:13"],
  "First resurrection": ["Daniel 12:2", "John 5:28-29", "1 Thessalonians 4:16-17", "Revelation 20:5-6"],
  Firstfruits: ["Leviticus 23:10-11", "James 1:18", "Revelation 14:4", "1 Corinthians 15:20"],
  "Forehead and hand": ["Deuteronomy 6:6-8", "Ezekiel 9:4-6", "Revelation 7:3", "Revelation 13:16"],
  "Four living creatures": ["Ezekiel 1:5-14", "Isaiah 6:1-3", "Revelation 4:6-8", "Revelation 5:8-10"],
  "Four winds": ["Jeremiah 49:36", "Daniel 7:2", "Matthew 24:31", "Revelation 7:1"],
  "Gold tried in the fire": ["1 Peter 1:7", "Galatians 5:6", "James 2:5", "Revelation 3:18"],
  "Golden bowls": ["Psalm 141:2", "Revelation 5:8", "Revelation 8:3-4", "Revelation 15:7"],
  "Great multitude": ["Genesis 15:5", "Revelation 7:9-17", "Revelation 19:1", "Revelation 21:3"],
  Harlot: ["Jeremiah 3:6-9", "Ezekiel 16:15-22", "Revelation 17:1-6", "Revelation 19:2"],
  Harvest: ["Joel 3:13", "Matthew 13:39-43", "Mark 4:29", "Revelation 14:15"],
  "Heavenly temple": ["Exodus 40:34-35", "Daniel 8:14", "Hebrews 8:1-2", "Revelation 11:19"],
  "Hidden manna": ["Exodus 16:32-34", "John 6:48-51", "Hebrews 9:4", "Revelation 2:17"],
  Horns: ["Daniel 7:7-8", "Daniel 7:24", "Revelation 13:1", "Revelation 17:12"],
  "Image of the beast": ["Daniel 3:4-6", "Revelation 13:14-15", "Revelation 14:9-11", "Revelation 19:20"],
  Incense: ["Exodus 30:1-10", "Psalm 141:2", "Luke 1:10", "Revelation 8:3-4"],
  Jezebel: ["1 Kings 16:31", "1 Kings 18:4", "1 Kings 21:25", "Revelation 2:20"],
  "Judgment books": ["Daniel 7:9-10", "Daniel 12:1-2", "John 5:28-29", "Revelation 20:12"],
  "Judgment hour": ["Daniel 7:9-14", "Daniel 8:14", "Ecclesiastes 12:13-14", "Revelation 14:7"],
  "Key of David": ["Isaiah 22:22", "Matthew 16:19", "Revelation 1:18", "Revelation 3:7"],
  "Lake of fire": ["Malachi 4:1-3", "Matthew 10:28", "Revelation 20:10", "Revelation 20:14-15"],
  Lamb: ["Isaiah 53:7", "John 1:29", "1 Peter 1:18-19", "Revelation 5:6"],
  "Lamb-like horns": ["Revelation 13:11", "Matthew 7:15", "Revelation 13:14-15", "Revelation 19:20"],
  "Lion of Judah": ["Genesis 49:9-10", "Isaiah 11:1-10", "Revelation 5:5", "Revelation 22:16"],
  "Little book": ["Daniel 12:4", "Ezekiel 2:8-3:3", "Revelation 10:2", "Revelation 10:9"],
  "Living creatures": ["Ezekiel 1:5-14", "Isaiah 6:1-3", "Revelation 4:6-8", "Revelation 5:8"],
  "Male child": ["Genesis 3:15", "Psalm 2:7-9", "Revelation 12:5", "Galatians 4:4"],
  "Mark of the beast": ["Exodus 20:8-11", "Deuteronomy 6:6-8", "Revelation 13:16-17", "Revelation 14:9-12"],
  "Marriage supper": ["Isaiah 54:5", "Matthew 22:1-14", "Ephesians 5:25-27", "Revelation 19:7-9"],
  "Measured city": ["Ezekiel 40:3-5", "Ezekiel 48:30-35", "Isaiah 54:11-12", "Revelation 21:15-17"],
  "Measuring rod": ["Ezekiel 40:3-5", "Zechariah 2:1-5", "Revelation 11:1", "Revelation 21:15"],
  Millennium: ["Jeremiah 4:23-26", "Revelation 20:1-3", "1 Corinthians 6:2-3", "Revelation 20:6"],
  "Morning star": ["Numbers 24:17", "2 Peter 1:19", "Revelation 2:28", "Revelation 22:16"],
  "New Jerusalem": ["Isaiah 54:11-12", "Hebrews 11:10", "Revelation 21:2", "Revelation 21:10"],
  "New creation": ["Isaiah 65:17-25", "2 Peter 3:13", "Revelation 21:1", "Revelation 21:5"],
  "New heaven and new earth": ["Isaiah 65:17-25", "2 Peter 3:13", "Revelation 21:1", "Revelation 22:5"],
  "New song": ["Psalm 40:3", "Psalm 96:1", "Revelation 5:9", "Revelation 14:3"],
  Nicolaitanes: ["Acts 15:20", "2 Peter 2:15", "Jude 1:11", "Revelation 2:6"],
  "No more death": ["Isaiah 25:8", "Isaiah 65:19", "1 Corinthians 15:26", "Revelation 21:4"],
  "Number of the beast": ["1 Kings 10:14", "Daniel 3:1", "Revelation 13:18", "Revelation 15:2"],
  "Open door": ["Isaiah 22:22", "1 Corinthians 16:9", "Revelation 3:7-8", "Revelation 4:1"],
  "Pale horse": ["Ezekiel 14:21", "Revelation 6:7-8", "Hosea 13:14", "Jeremiah 15:2"],
  "Patience of the saints": ["Daniel 7:25", "Matthew 24:13", "Hebrews 10:36", "Revelation 14:12"],
  "Red horse": ["Zechariah 1:8", "Zechariah 6:2", "Matthew 24:6-7", "Revelation 6:3-4"],
  Remnant: ["Isaiah 11:11", "Romans 11:5", "Revelation 12:17", "Revelation 14:12"],
  "Rider on the white horse": ["Psalm 2:8-9", "Isaiah 11:4", "Isaiah 63:1-6", "Revelation 19:11-16"],
  "River and tree of life": ["Genesis 2:9-10", "Genesis 3:22-24", "Ezekiel 47:1-12", "Revelation 22:1-2"],
  "River of life": ["Ezekiel 47:1-12", "John 7:37-39", "Revelation 21:6", "Revelation 22:1"],
  "Scarlet beast": ["Daniel 7:3-8", "Revelation 13:1", "Revelation 17:3", "Revelation 17:8"],
  Scroll: ["Daniel 12:4", "Ezekiel 2:9-10", "Revelation 5:1", "Revelation 10:2"],
  Sea: ["Daniel 7:2-3", "Isaiah 57:20", "Revelation 13:1", "Revelation 17:15"],
  "Sea beast": ["Daniel 7:3-8", "Daniel 7:21-25", "Revelation 13:1", "Revelation 17:15"],
  "Sea of glass": ["Exodus 14:21-31", "Revelation 4:6", "Revelation 15:2-3", "Revelation 21:18"],
  "Seal of God": ["Ezekiel 9:4-6", "2 Corinthians 1:22", "Ephesians 1:13", "Revelation 7:3"],
  "Sealed scroll": ["Daniel 12:4", "Revelation 5:1-5", "Revelation 10:2", "Revelation 22:10"],
  Seals: ["Daniel 12:4", "Matthew 24:4-14", "Revelation 5:1", "Revelation 6:1"],
  "Second death": ["Revelation 2:11", "Revelation 20:6", "Revelation 20:14-15", "Revelation 21:8"],
  "Seven Spirits": ["Isaiah 11:2", "Zechariah 4:2-6", "Revelation 1:4", "Revelation 4:5"],
  "Seven heads and ten horns": ["Daniel 7:7-8", "Daniel 7:24", "Revelation 13:1", "Revelation 17:9-12"],
  "Seven lamps": ["Zechariah 4:2-6", "Revelation 1:4", "Revelation 4:5", "Revelation 5:6"],
  "Seven lampstands": ["Exodus 25:31-40", "Zechariah 4:2-6", "Matthew 5:14-16", "Revelation 1:20"],
  "Seven last plagues": ["Exodus 7:17-21", "Revelation 15:1", "Revelation 16:1", "Daniel 12:1"],
  "Seven stars": ["Daniel 12:3", "Revelation 1:16", "Revelation 1:20", "Revelation 2:1"],
  "Seven thunders": ["Psalm 29:3-9", "Daniel 12:4", "Revelation 10:4", "John 12:28-29"],
  Sickle: ["Joel 3:13", "Mark 4:29", "Revelation 14:14-19", "Matthew 13:39"],
  "Slain Lamb": ["Isaiah 53:7", "John 1:29", "Revelation 5:6", "Revelation 13:8"],
  "Song of Moses and the Lamb": ["Exodus 15:1-18", "Deuteronomy 32:3-4", "Revelation 5:9", "Revelation 15:3"],
  Temple: ["1 Kings 8:10-11", "Daniel 8:14", "Hebrews 8:1-2", "Revelation 11:19"],
  "Testimony of Jesus": ["Revelation 1:2", "Revelation 12:17", "Revelation 19:10", "1 Corinthians 1:6"],
  Throne: ["Isaiah 6:1", "Daniel 7:9-10", "Psalm 47:8", "Revelation 4:2"],
  "Tree of life": ["Genesis 2:9", "Genesis 3:22-24", "Revelation 2:7", "Revelation 22:2"],
  Trumpets: ["Joshua 6:4-5", "Joel 2:1", "Numbers 10:9", "Revelation 8:6"],
  "Twenty-four elders": ["1 Chronicles 24:1-19", "Revelation 4:4", "Revelation 5:8-10", "Revelation 11:16"],
  "Two witnesses": ["Deuteronomy 19:15", "Zechariah 4:2-14", "Matthew 24:14", "Revelation 11:3"],
  "Twoedged sword": ["Isaiah 49:2", "Hebrews 4:12", "Revelation 1:16", "Revelation 2:12"],
  "Unclean spirits": ["Exodus 8:1-15", "1 Kings 22:21-23", "Matthew 24:24", "Revelation 16:13-14"],
  "Victors over the beast": ["Revelation 13:15-17", "Revelation 14:9-12", "Revelation 15:2-4", "Revelation 20:4"],
  "White horse": ["Psalm 45:3-5", "Zechariah 10:3", "Revelation 6:2", "Revelation 19:11"],
  "White raiment": ["Isaiah 61:10", "Zechariah 3:3-5", "Revelation 7:14", "Revelation 19:8"],
  "White stone": ["Isaiah 62:2", "Revelation 2:17", "Revelation 3:12", "2 Timothy 2:19"],
  Wilderness: ["Exodus 19:4", "1 Kings 17:2-6", "Daniel 7:25", "Revelation 12:6"],
  Winepress: ["Isaiah 63:1-6", "Joel 3:13", "Revelation 14:19-20", "Revelation 19:15"],
  "Woman clothed with the sun": ["Genesis 3:15", "Genesis 37:9", "Isaiah 54:5-6", "Revelation 12:1"]
};

function scriptureReferencesForSymbol(name, fallback = []) {
  return unique([...(symbolScriptureReferences[name] ?? []), ...fallback]).slice(0, 4);
}

function cleanText(text) {
  let cleaned = text;
  for (const [pattern, replacement] of replacementRules) cleaned = cleaned.replace(pattern, replacement);
  return cleaned
    .replace(/\bIn an prophetic reading,?\s*/g, "Here, ")
    .replace(/\bWithin thought,?\s*/g, "Here, ")
    .replace(/\bthe final prophetic sequence does not require\b/g, "the passage does not require")
    .replace(/\bthe final prophetic sequence\b/g, "the passage")
    .replace(/\bstandard historicist framework\b/g, "prophetic sequence")
    .replace(/\breaders are premillennial in sequence\b/g, "the sequence is premillennial in order")
    .replace(/\breaders answer:\s*/g, "the answer in this sequence is that ")
    .replace(/\bHistoricist the phrase should not be identified\b/g, "The phrase should not be identified")
    .replace(/\bhistoricist the phrase should not be identified\b/g, "the phrase should not be identified")
    .replace(/\breaders therefore link\b/g, "the passage therefore links")
    .replace(/\bThis reading places decisive weight on\b/g, "The immediate context places weight on")
    .replace(/\bthis reading therefore understands\b/g, "the passage therefore presents")
    .replace(/\bHistoricist the scene places\b/g, "The scene places")
    .replace(/\bhistoricist the scene places\b/g, "the scene places")
    .replace(/\bHistoricist readers connect\b/g, "The scene connects")
    .replace(/\bhistoricist readers connect\b/g, "the scene connects")
    .replace(/\bHistoricist readers see here\b/g, "The scene shows")
    .replace(/\bhistoricist readers see here\b/g, "the scene shows")
    .replace(/\bthe reading would expect\b/g, "the passage has prepared us to expect")
    .replace(/\bHistoricist readers have long connected\b/g, "The sealing theme connects")
    .replace(/\bhistoricist readers have long connected\b/g, "the sealing theme connects")
    .replace(/\bThis moment is revealing for readers\b/g, "This moment is revealing for believers")
    .replace(/\bwhere readers connect\b/g, "where the text connects")
    .replace(/\bHistoricist readers naturally connect\b/g, "This verse naturally connects")
    .replace(/\bhistoricist readers naturally connect\b/g, "this verse naturally connects")
    .replace(/\breaders have historically understood it at their best\b/g, "the gospel presents it at its best")
    .replace(/\bHistoricist readers often stress\b/g, "The passage stresses")
    .replace(/\bhistoricist readers often stress\b/g, "the passage stresses")
    .replace(/\bHistoricist readers should hear\b/g, "The church should hear")
    .replace(/\bhistoricist readers should hear\b/g, "the church should hear")
    .replace(/\bHistoricist readers also note\b/g, "The passage also shows")
    .replace(/\bhistoricist readers also note\b/g, "the passage also shows")
    .replace(/\bhistoricist the sequence\b/g, "the sequence")
    .replace(/\bhistoricist the answer\b/g, "the answer")
    .replace(/\bhistoricist the passage\b/g, "the passage")
    .replace(/\bas historicist the gospel\b/g, "as the gospel")
    .replace(/\bHistoricist interpretation\b/g, "Careful interpretation")
    .replace(/\bhistoricist interpretation\b/g, "careful interpretation")
    .replace(/\bThe prophetic reading takes\b/g, "The passage presents")
    .replace(/\bthe prophetic reading takes\b/g, "the passage presents")
    .replace(/\bThe prophetic reading\b/g, "The passage")
    .replace(/\bthe prophetic reading\b/g, "the passage")
    .replace(/\bthe phrase should not be identified Gog and Magog here with\b/g, "Gog and Magog should not be identified here with")
    .replace(/\bThe phrase should not be identified Gog and Magog here with\b/g, "Gog and Magog should not be identified here with")
    .replace(/\bThe scene connects this scene\b/g, "This scene connects")
    .replace(/\bthe scene connects this scene\b/g, "this scene connects")
    .replace(/\bThis verse naturally connects this verse\b/g, "This verse naturally connects")
    .replace(/\bthis verse naturally connects this verse\b/g, "this verse naturally connects")
    .replace(/\bThis is one of the clearest places where The scene connects the text\b/g, "This verse connects the text")
    .replace(/\bThe immediate context places weight on the immediate context\b/g, "The immediate context is decisive")
    .replace(/["']\s*historicist\s*/g, "")
    .replace(/\bhistoricist\s+The immediate context\b/g, "The immediate context")
    .replace(/\bThey interpret the phrase collectively\b/g, "The phrase functions collectively")
    .replace(/\bthey interpret the phrase collectively\b/g, "the phrase functions collectively")
    .replace(/\band they distinguish between\b/g, "and it distinguishes between")
    .replace(/\bThe warning implies that the design is to warn that\b/g, "The warning is that")
    .replace(/\bHere, this verse\b/g, "This verse")
    .replace(/\s*\(v\.\s*/g, " ")
    .replace(/\s+12\)/g, "")
    .replace(/#+\s*Section Summary\b.*$/g, "")
    .replace(/\bthe sequence presents this as\b/g, "the passage presents")
    .replace(/\bthe sequence presents\b/g, "the passage presents")
    .replace(/\breaders rightly make much of it\b/g, "the passage gives it real weight")
    .replace(/\breaders place\b/g, "the scene places")
    .replace(/\bBecause readers emphasize\b/g, "Because the verse holds together")
    .replace(/\bhistoricist the passage gives\b/g, "the passage gives")
    .replace(/\bhistoricist this reading places\b/g, "this reading places")
    .replace(/["']\s*this reading places/g, "This reading places")
    .replace(/\bstandard doctrine therefore interprets\b/g, "this reading therefore understands")
    .replace(/\bmain critical text\b/g, "standard Greek text")
    .replace(/\bthe commentators there summarize the manuscript split and treat\b/g, "the strongest textual evidence treats")
    .replace(/\bThe commentators there summarize the manuscript split and treat\b/g, "The strongest textual evidence treats")
    .replace(/\bthe commentary material and\b/g, "")
    .replace(/\bThe commentary material and\b/g, "")
    .replace(/["']?\s*the central force remains unchanged:/g, "The central force remains unchanged:")
    .replace(/(^|[.!?]\s+)([a-z])/g, (_match, prefix, letter) => `${prefix}${letter.toUpperCase()}`)
    .replace(/\.{4,}/g, "...")
    .replace(/(?<!\.)\.\.(?!\.)/g, ".")
    .replace(/\s+,/g, ",")
    .replace(/\s+\./g, ".")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function cleanPublicStrings(value, key = "") {
  if (key === "reviewStatus" && typeof value === "string") return value.toLowerCase();
  if (key === "sources" || key === "sourceAudit") return value;
  if (typeof value === "string") return cleanText(value);
  if (Array.isArray(value)) return value.map((item) => cleanPublicStrings(item));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([entryKey, entryValue]) => [entryKey, cleanPublicStrings(entryValue, entryKey)]));
  }
  return value;
}

function parseVerse(reference) {
  const match = reference.match(/Revelation\s+(\d+):(\d+)/);
  if (!match) return null;
  return { chapter: Number(match[1]), verse: Number(match[2]) };
}

function refsForVerse(chapter, verseNumber, verseText, commentaryText, currentRefs = []) {
  const refs = [...currentRefs];
  const haystack = `${verseText} ${commentaryText}`;
  for (const [mapChapter, start, end, mapRefs] of pericopeRefs) {
    if (mapChapter === chapter && verseNumber >= start && verseNumber <= end) refs.push(...mapRefs);
  }
  refs.push(...(chapterRefs[chapter] ?? []));
  for (const [pattern, mapRefs] of keywordRefs) {
    if (pattern.test(haystack)) refs.push(...mapRefs);
  }
  return unique(refs.filter((ref) => !ref.endsWith(` ${chapter}:${verseNumber}`))).slice(0, 8);
}

function unique(items) {
  const seen = new Set();
  const result = [];
  for (const item of items) {
    if (!item || seen.has(item)) continue;
    seen.add(item);
    result.push(item);
  }
  return result;
}

function referenceSentence(chapter, refs) {
  const shortRefs = refs.slice(0, 3);
  const list = shortRefs.length > 1 ? `${shortRefs.slice(0, -1).join(", ")}, and ${shortRefs.at(-1)}` : shortRefs[0];
  if (!list) return "";
  if (chapter <= 3) {
    return `Passages such as ${list} keep the message anchored in Scripture, where repentance, endurance, and Christ's promises shape the life of the church.`;
  }
  if (chapter === 4) {
    return `The vision gathers language from ${list}, so the throne room is read through holiness, creation, and worship rather than imagination alone.`;
  }
  if (chapter === 5) {
    return `The imagery is held together by ${list}, joining royal promise, sacrifice, and heavenly worship around the Lamb.`;
  }
  if (chapter === 6) {
    return `The seals should be heard beside ${list}, where conquest, suffering, judgment, and the day of the Lord are described in prophetic language.`;
  }
  if (chapter === 7) {
    return `The vision draws from ${list}, joining sealing, covenant identity, protection, and final worship before the throne.`;
  }
  if (chapter <= 9) {
    return `The trumpet imagery reaches back to ${list}, where warning judgments are given so that repentance remains possible.`;
  }
  if (chapter === 10) {
    return `The opened book and the sweet-bitter commission echo ${list}, keeping the scene rooted in Daniel and prophetic recommissioning.`;
  }
  if (chapter === 11) {
    return `The measuring, witnesses, and kingdom announcement draw from ${list}, joining sanctuary, prophetic testimony, and final judgment.`;
  }
  if (chapter === 13) {
    return `The symbols should be weighed beside ${list}, where empire, worship, law, deception, and patient endurance are held together.`;
  }
  if (chapter === 14) {
    return `The message should be read beside ${list}, where judgment, Creator worship, endurance, and harvest come together.`;
  }
  if (chapter === 15) {
    return `The scene should be read beside ${list}, where deliverance, heavenly worship, and sanctuary judgment come together.`;
  }
  if (chapter === 16) {
    return `The bowls should be read beside ${list}, where Exodus judgment, final warning, and the collapse of rebellion come into view.`;
  }
  if (chapter === 17) {
    return `The symbols should be weighed beside ${list}, where Babylon, beastly power, and the Lamb's victory are interpreted by Scripture.`;
  }
  if (chapter === 18) {
    return `The fall of Babylon should be heard beside ${list}, where the call to separate from doomed corruption is both warning and mercy.`;
  }
  if (chapter === 19) {
    return `The scene should be read beside ${list}, where worship, the marriage supper, and the appearing King are held together.`;
  }
  if (chapter === 20) {
    return `The millennium and judgment should be read beside ${list}, where resurrection, open books, and the end of sin come into focus.`;
  }
  if (chapter === 21) {
    return `The promise should be read beside ${list}, where new creation, covenant dwelling, and the holy city are brought to completion.`;
  }
  if (chapter === 22) {
    return `The closing invitation should be read beside ${list}, where Eden restored and Christ's soon coming shape the final appeal.`;
  }
  return `The conflict is framed by ${list}, where the promised Seed, royal Messiah, and suffering people of God come into view.`;
}

function addReferenceSentence(text, chapter, refs) {
  if (!refs.length || refs.slice(0, 3).some((ref) => text.includes(ref))) return text;
  const sentence = referenceSentence(chapter, refs);
  if (!sentence) return text;
  const paragraphs = text.split(/\n\n+/).map((paragraph) => paragraph.trim()).filter(Boolean);
  if (!paragraphs.length) return text;
  const addedWords = countWords(sentence);
  const currentWords = countWords(text);
  if (currentWords + addedWords > 500) return text;
  const candidateIndexes = paragraphs.length >= 4 ? [1, 0, 2] : [Math.min(1, paragraphs.length - 1), 0];
  for (const index of candidateIndexes) {
    if (index < 0) continue;
    if (countWords(paragraphs[index]) + addedWords <= 125) {
      paragraphs[index] = `${paragraphs[index]} ${sentence}`;
      return paragraphs.join("\n\n");
    }
  }
  return text;
}

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function addSymbolNotes(chapter, verse) {
  const existingByName = new Map(chapter.symbols.map((symbol) => [symbol.symbol.toLowerCase(), symbol]));
  const haystack = `${verse.bibleText} ${verse.commentary.detailedExplanation}`;
  const source = verse.sources[0] ?? chapter.sources[0];

  for (const [name, patterns, meaning] of symbolDefinitions) {
    if (!patterns.some((pattern) => pattern.test(haystack))) continue;
    const key = name.toLowerCase();
    const scriptureReferences = scriptureReferencesForSymbol(name, verse.crossReferences ?? []);
    const symbol = existingByName.get(key);
    if (symbol) {
      if (!symbol.references.includes(verse.verse)) symbol.references.push(verse.verse);
      symbol.scriptureReferences = scriptureReferencesForSymbol(name, [...(symbol.scriptureReferences ?? []), ...scriptureReferences]);
      if (!symbol.meaning.trim()) symbol.meaning = meaning;
    } else if (source) {
      const created = { symbol: name, references: [verse.verse], scriptureReferences, meaning, sources: [source] };
      chapter.symbols.push(created);
      existingByName.set(key, created);
    }
  }
}

for (const chapterNumber of populatedChapters) {
  const file = join(contentRoot, `chapter-${String(chapterNumber).padStart(2, "0")}.json`);
  let chapter = JSON.parse(readFileSync(file, "utf8"));
  chapter = cleanPublicStrings(chapter);

  for (const verse of chapter.verses) {
    const parsed = parseVerse(verse.verse);
    if (!parsed || (verse.reviewStatus === "placeholder" && !verse.commentary?.detailedExplanation?.trim())) continue;
    verse.crossReferences = refsForVerse(parsed.chapter, parsed.verse, verse.bibleText, verse.commentary.detailedExplanation, verse.crossReferences);
    verse.commentary.detailedExplanation = addReferenceSentence(verse.commentary.detailedExplanation, parsed.chapter, verse.crossReferences);
    verse.explanation = verse.commentary.exegesis;
    verse.historicalBackground = verse.commentary.historicalBackground;
    verse.adventistInsight = verse.commentary.adventistPropheticInsight;
    verse.propheticSignificance = verse.commentary.propheticTimeline;
    verse.application = verse.commentary.application;
    addSymbolNotes(chapter, verse);
  }

  chapter.crossReferences = unique([
    ...(chapter.crossReferences ?? []),
    ...chapter.verses.flatMap((verse) => verse.crossReferences ?? [])
  ]).slice(0, 48);
  chapter.symbols = chapter.symbols.map((symbol) => ({
    ...symbol,
    references: unique(symbol.references),
    scriptureReferences: scriptureReferencesForSymbol(
      symbol.symbol,
      [
        ...(symbol.scriptureReferences ?? []),
        ...chapter.verses
          .filter((verse) => symbol.references?.includes(verse.verse))
          .flatMap((verse) => verse.crossReferences ?? [])
      ]
    )
  }));

  writeFileSync(file, `${JSON.stringify(chapter, null, 2)}\n`);
}

console.log("Polished populated Revelation commentary, cross references, and symbol notes.");
