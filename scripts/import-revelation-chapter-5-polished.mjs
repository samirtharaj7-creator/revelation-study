import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const chapterPath = join(root, "content", "revelation", "chapter-05.json");

const docSource = {
  sourceId: "revelation-chapter-five-docx",
  locator: "Revelation Chapter Five manuscript",
  claimType: "manuscript-synthesis",
  priority: 1
};

const mcnultySource = {
  sourceId: "revelation-practical-living-in-the-judgment-hour",
  locator: "Priority Adventist commentary for Revelation 5",
  claimType: "adventist-interpretation",
  priority: 1
};

const technicalSource = {
  sourceId: "revelation-a-shorter-commentary",
  locator: "Technical and Old Testament background support",
  claimType: "technical-background",
  priority: 5
};

const angelicEldersSource = {
  sourceId: "interpreting-the-book-of-revelation",
  locator: "Uploaded source-indexed discussion of Revelation 4-5 elders",
  claimType: "technical-background",
  priority: 4
};

const sourceList = [docSource, mcnultySource, technicalSource];
const eldersSourceList = [docSource, mcnultySource, technicalSource, angelicEldersSource];

const publicBannedPhrases = [
  "Adventist interpretation",
  "Adventist historicist",
  "historicist",
  "church-history",
  "church history",
  "manuscript",
  "uploaded",
  "source material",
  "source language",
  "Within the sanctuary-shaped reading",
  "The throne-room vision steadies worship",
  "The chapter teaches the reader",
  "The appeal is",
  "The practical appeal",
  "The pastoral appeal",
  "This reading",
  "The passage presents",
  "redeemed humans",
  "human representatives"
];

function sourceAudit(includeElders = false) {
  const technicalSources = includeElders ? [docSource, technicalSource, angelicEldersSource] : [docSource, technicalSource];
  return {
    exegesis: includeElders ? [docSource, mcnultySource, angelicEldersSource] : [docSource, mcnultySource],
    historicalBackground: technicalSources,
    technicalNotes: technicalSources,
    adventistPropheticInsight: [docSource, mcnultySource],
    propheticTimeline: [docSource, mcnultySource],
    otherCommentaryInsights: technicalSources,
    application: [docSource, mcnultySource]
  };
}

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function assertPublicText(verse, text) {
  for (const phrase of publicBannedPhrases) {
    if (text.includes(phrase)) {
      throw new Error(`${verse} contains banned public phrase: ${phrase}`);
    }
  }
}

const commentary = {
  "Revelation 5:1": [
    "John sees a scroll in the right hand of the One seated on the throne, written within and on the backside, sealed with seven seals. The vision is solemn because the scroll is not a loose collection of predictions or a vague schedule of future events. It represents God's complete covenant-redemptive purpose for history: the recovery of the inheritance lost through sin, the vindication of His people, the judgment of evil, and the final restoration of creation. The scroll is in the Father's right hand before it is ever opened, which means history begins in divine ownership rather than human panic.",
    "The detail that the scroll is written on both sides suggests fullness. Nothing necessary is missing from God's purpose, and nothing can be added by creaturely imagination. Ezekiel saw a scroll written within and without, filled with the weight of divine message; Daniel was told to seal a book until the time appointed; Isaiah spoke of a sealed book that human learning could not open. Revelation gathers those backgrounds but places them in the throne room. The sealed scroll is not hidden because God has no answer. It is sealed because only the rightful Redeemer can disclose and carry forward what God has purposed.",
    "The seven seals intensify the crisis. Seven in Revelation regularly carries the sense of completeness, so the scroll is fully sealed until the worthy One opens it. Human intelligence, angelic rank, political strength, religious office, and historical curiosity cannot break those seals. The point is not that prophecy is meant to remain unknowable, but that it must be opened from heaven by Christ. The seal sequence that follows must therefore be read from the throne and the Lamb, not from fear. Before the horses ride in chapter 6, heaven has already shown who holds the meaning of history.",
    "This matters deeply for the church. God's people often live in the space between promise and fulfillment, where suffering can make history feel unreadable. Revelation 5 begins by saying that the future is not ownerless. It is sealed, but not lost; hidden, but not empty; beyond creaturely control, but held in the hand of God. Faith does not begin by mastering every detail. It begins by trusting the throne and waiting for the Lamb to open what only He is worthy to reveal."
  ],
  "Revelation 5:2": [
    "A strong angel cries with a loud voice, 'Who is worthy to open the book, and to loose the seals thereof?' The strength of the angel matters because it shows that strength itself is not the answer. A mighty heavenly messenger can announce the question, but he cannot solve it. Worthiness here is not bare power, intelligence, seniority, or access to heavenly mysteries. It is moral, covenantal, and redemptive fitness. Only the One who has the right to bring God's purpose to completion may open the scroll.",
    "The loud voice sends the question through the heavenly court. The issue is public before heaven because the scroll concerns far more than private information. To open it is to take responsibility for the destiny of the world, the vindication of God, the inheritance of the saints, and the judgment of evil. No creature can step forward merely because he wants to know. The question separates curiosity from worthiness and interpretation from authority. Revelation teaches the reader that prophecy rests first in the Lamb's hands before it reaches the student.",
    "This is a needed correction for every generation that approaches prophecy with impatience. The seals are not opened by religious excitement, clever systems, political forecasts, or fear-driven imagination. They are opened by Christ. Careful study matters, Daniel matters, the sanctuary matters, and the rest of Scripture matters, but none of these are tools for mastering God apart from worship. They are gifts that lead the church to the One who alone can open what God has sealed.",
    "The verse invites humility without discouraging study. Heaven asks a question no creature can answer so that the reader will stop looking for salvation in created competence. The church does need light about history, conflict, and judgment, but it needs the Worthy One even more. The safest interpreter of Revelation is not the most self-confident reader, but the worshiping disciple who waits for the Lamb to open the scroll."
  ],
  "Revelation 5:3": [
    "No one in heaven, on earth, or under the earth is able to open the scroll or even look upon it. The search ranges across the whole created order and finds no creature qualified. Angels, rulers, teachers, prophets, the living, and the dead all stand outside the authority required to open God's redemptive purpose. The silence of creation is heavy. The problem is not that the scroll is unimportant; it is too holy, too complete, and too bound to God's covenant purpose to be handled by created worthiness.",
    "The threefold language gathers every realm of existence into the scene. Heaven cannot supply a creature who is worthy. Earth cannot produce one. The realm under the earth cannot answer either. Revelation places a firm boundary around creaturely wisdom. The meaning and completion of history cannot rise from below. They must be given from above through the Mediator who stands with the throne and yet has entered the human story by sacrifice.",
    "That boundary protects prophetic study from pride. Historical outlines and symbolic connections have value only when they remain servants of the Lamb's revelation. If no creature can even look upon the scroll by right, then no church, scholar, reformer, or movement owns Revelation as a possession. The book is received as a gift. Its symbols are opened under Christ's authority, through Scripture, and in the atmosphere of worship. The inability of creation is not a defeat for truth; it is preparation for the triumph of the Lamb.",
    "The verse speaks tenderly to those who feel the limits of understanding. There are moments when history seems sealed: suffering continues, evil appears organized, and God's people cannot see how the promises will be fulfilled. Revelation does not shame that sense of helplessness. It takes it into the throne room. Creaturely inability becomes the setting in which Christ's worthiness will shine. When all created confidence falls silent, the church is ready to hear that the Lamb has prevailed."
  ],
  "Revelation 5:4": [
    "John weeps much because no one is found worthy to open and read the scroll or to look upon it. His tears are not impatience or curiosity disappointed. They are prophetic grief. If the scroll remains closed, the meaning of God's government, the destiny of the church, the answer to evil, and the promised inheritance remain hidden from the servants of God. John understands that an unopened scroll would leave history without visible resolution.",
    "The emotion keeps Revelation from becoming cold symbolism. The churches have already been shown labor, persecution, compromise, false teaching, poverty, endurance, and lukewarmness. Now John stands before a sealed scroll that contains the unfolding of God's purpose, and no one can open it. His weeping gives voice to the ache of all who have asked whether righteousness will be vindicated, whether prayer is heard, whether suffering has meaning, and whether God will finish what He has promised.",
    "The tears also teach the proper value of prophecy. Revelation is not given to entertain religious curiosity. It is given because God's servants need light as they move through history toward judgment and deliverance. John weeps before the answer comes, so the opening of the scroll is received as mercy. The Lamb's worthiness is not ornamental; it is necessary. Without Him, the scroll stays sealed, and the church has no sure path through conflict.",
    "The verse gives permission for holy sorrow. Faith is not the denial of hard questions. John weeps in heaven's throne room, and his tears are not rebuked as unbelief. Yet his tears are not final. Revelation lets the church feel the weight of an unopened future so that Christ's victory will be received with wonder. The answer to history's grief is not first a chart, but the Lamb."
  ],
  "Revelation 5:5": [
    "One of the twenty-four elders tells John, 'Weep not.' In this scene the elder functions as one of heaven's angelic, royal-priestly attendants around the throne, a worshiping member of the heavenly court who interprets the moment for the prophet. The identity matters because the word comes from within the ordered worship of heaven, not from John's own reasoning. Heaven itself announces that the crisis of the sealed scroll has an answer.",
    "The answer is the Lion of the tribe of Judah, the Root of David. These titles reach deep into the covenant promises. Judah was promised royal authority, and David's line carried the hope of a righteous King. Yet Revelation prepares the reader for a holy surprise. John is told to expect the conquering Lion, but when he looks he will see the slain Lamb. The elder's announcement joins royal strength, Messianic promise, and redemptive victory before the Lamb appears in the vision.",
    "The verb 'prevailed' is central. Christ has conquered, and because He has conquered He is worthy to open the scroll and loose its seven seals. His victory is not the victory of empire, coercion, or display. It is the victory of His faithful life, sacrificial death, resurrection, and heavenly authority. The scroll is opened by the One who has entered the conflict, borne sin, defeated the enemy, and secured the inheritance of His people. Prophecy begins with His conquest, not with human control.",
    "This verse is one of Revelation's great words to discouraged faith. John is not told to stop weeping because history is painless, but because Christ has prevailed. The church may grieve over delay, persecution, weakness, and confusion, yet it does not grieve as though the scroll will remain sealed. The Lion has conquered as the Lamb, and His victory is strong enough to open what no creature in the universe could open."
  ],
  "Revelation 5:6": [
    "John hears of a Lion, but when he looks he sees a Lamb standing as though it had been slain. This is one of the great reversals in Revelation. Heaven's conquering Messiah is not introduced as a figure of raw force, but as the sacrificial Lamb whose wounds remain central to His identity. He is slain, yet standing; wounded, yet alive; sacrificial, yet enthroned. The cross is not left behind when Christ enters heavenly authority.",
    "The Lamb stands in the midst of the throne, the four living creatures, and the elders. The KJV word 'beasts' here refers to heavenly living creatures, not hostile powers. The elders are also part of the heavenly court, angelic royal-priestly worshipers who surround the throne and respond to the Lamb's worthiness. The Lamb is not at the edge of heaven's attention. He stands at the center, where worship, rule, judgment, and redemption meet.",
    "The seven horns and seven eyes fill out the portrait. Horns in Scripture signify power, and seven horns point to complete kingly authority. The eyes are identified as the seven Spirits of God sent into all the earth, joining the Lamb's rule to the fullness of the Spirit's searching, life-giving presence. The Lamb who was slain is not weak. His sacrifice is the ground of His authority, and His authority reaches the whole earth through the Spirit's work.",
    "This verse anchors the rest of Revelation in Christ's crucified victory. The seals, judgments, warnings, and final triumph must be read from the center where the slain Lamb stands. The church is not asked to admire power in the form the world prefers. It is called to trust the Lamb's way of conquering. In heaven, self-giving love is not defeat. It is the form of victory strong enough to open the scroll."
  ],
  "Revelation 5:7": [
    "The Lamb comes and takes the scroll out of the right hand of the One seated on the throne. The action is brief, but it carries enormous weight. The scroll that no creature could open is now received by Christ. Heaven's silence is broken not by explanation alone, but by the movement of the Lamb. The crucified and risen One takes responsibility for God's covenant purpose and for the history that will unfold under the seals.",
    "The right hand signifies authority, power, and royal trust. The Lamb does not seize the scroll as though the throne were divided. He receives it. Revelation presents perfect harmony between the Father and the Son. The One seated on the throne holds the purpose; the Lamb takes and opens it because He is worthy. Redemption is not a secondary plan beside divine government. It is the way God's government is revealed, vindicated, and brought to its appointed goal.",
    "This moment grounds the opening of the seals. The seals should not be read as events detached from Christ's ministry. They unfold because the Lamb has taken the scroll. History is placed under the authority of the One who was slain, lives, and ministers before God. That does not make every event pleasant or easy, but it means the story is not ruled by chance, empire, or evil. The Lamb directs history toward judgment, vindication, inheritance, and restoration.",
    "The pastoral comfort is strong. The future is not merely in divine hands; it is in the wounded hands of the Lamb. The One who opens the scroll has already given Himself for the people who must live through the conflict it reveals. Prophecy should therefore produce trust before analysis. The church studies the seals by first watching the Lamb take the scroll from the throne."
  ],
  "Revelation 5:8": [
    "When the Lamb takes the scroll, the four living creatures and the twenty-four elders fall down before Him. The KJV says 'beasts,' but the scene points to the living creatures of the throne room. The elders are presented here as angelic, heavenly royal-priestly beings who serve in the worshiping order around the throne. They do not draw attention to themselves. Their posture interprets the moment: the Lamb who takes the scroll receives heaven's reverent worship. The opening of history begins with adoration.",
    "The harps and golden bowls bring temple and sanctuary imagery into the scene. Harps belong to praise, while the bowls of odors are identified as the prayers of the saints. This is a beautiful union of worship and intercession. The prayers of God's people, often uttered in weakness, suffering, and delay, are not lost on earth. They are pictured in golden vessels before the Lamb, precious in the heavenly court.",
    "The elders' role is therefore ministerial and worshipful. They stand with the living creatures as part of heaven's ordered response to the Lamb's authority, and they bear the prayers of the saints in the imagery of sanctuary incense. Before the seals unfold, Revelation assures the church that prayer is part of the throne-room reality from which history is directed. The Lamb does not open the scroll while forgetting the cries of His people.",
    "The verse encourages the praying church. Many prayers seem small, delayed, or unanswered from earth's point of view. Revelation shows them gathered before God. Worship and prayer are not escapes from history; they are woven into the heavenly scene where the Lamb holds the scroll. To pray is to confess that the burdens of earth belong before the Lamb who is worthy to open history."
  ],
  "Revelation 5:9": [
    "The heavenly beings sing a new song to the Lamb, declaring Him worthy to take the scroll and open its seals because He was slain and has redeemed people to God by His blood. Worthiness is now explained in unmistakable terms. The Lamb opens the scroll not because of force alone, nor because heaven needed a dramatic symbol, but because His sacrificial death has accomplished redemption. The blood of the Lamb is the ground of His authority over history.",
    "The new song language in Scripture often follows a new act of divine deliverance. Here the deliverance is worldwide. The redeemed are gathered out of every kindred, tongue, people, and nation. Revelation refuses a narrow vision of salvation. The Lamb's blood crosses ethnic, linguistic, cultural, and political boundaries. The scroll concerns history, but the heart of that history is God's purpose to recover a people for Himself from the whole human family.",
    "This verse also clarifies the song's point of view. The heavenly singers celebrate redemption accomplished for God's people; the focus is the Lamb's work on behalf of the redeemed. The scene does not require the twenty-four elders to be identified with the redeemed themselves. In the flow of the chapter, they are angelic heavenly worshipers who lead praise because Christ has redeemed His people. Heaven rejoices over salvation even when the saved are still on earth awaiting the full inheritance.",
    "The verse keeps the study of prophecy centered in the gospel. The seals, warnings, conflicts, and judgments are not detached from the cross. They belong to the story of the Lamb who purchased a people and will bring God's purpose to completion. A church that worships the slain Lamb must speak to the world with conviction and mercy. The same blood that makes Christ worthy also defines the spirit in which His message is carried."
  ],
  "Revelation 5:10": [
    "The song continues: the redeemed are made unto God kings and priests, and they shall reign on the earth. Salvation is not bare rescue from danger. The Lamb restores vocation. Those purchased by His blood are brought into a royal-priestly calling. They belong to God, serve before Him, bear witness to Him, and will share in the restored reign that Christ secures.",
    "The language reaches back to Israel's calling at Sinai to be a kingdom of priests. Priesthood means access, worship, intercession, holiness, and witness. Royal language speaks of dignity and participation in God's kingdom. Revelation does not turn salvation into escape from creation. It points toward a restored earth where God's redeemed people live under His reign. The Lamb opens history so that the inheritance is not lost but recovered.",
    "This verse also holds together present identity and future hope. The redeemed are already made a kingdom and priests by the Lamb's blood, yet they shall reign on the earth. That future reign is not human self-exaltation. It is the result of Christ's victory and the restoration of God's purpose for His people. The royal-priestly promise guards against both despair and pride: the church has dignity, but all of it is received from the Lamb.",
    "The verse asks believers to live now as people of the coming kingdom. Royal priests do not imitate the coercive methods of earthly powers. They worship, intercede, serve, witness, and endure. The church should not measure itself by status, influence, or applause. Its calling is deeper than public success. It is to belong to God, to represent the Lamb's character, and to wait for the earth made new."
  ],
  "Revelation 5:11": [
    "John hears the voice of many angels around the throne, the living creatures, and the elders. Their number is beyond calculation: ten thousand times ten thousand, and thousands of thousands. The worship that began near the throne now expands into a vast heavenly chorus. The Lamb's worthiness is not a private confession whispered by a few. It is the settled verdict of heaven.",
    "The order of the scene matters. Angels surround the throne along with the living creatures and the twenty-four elders, who stand within this heavenly worshiping assembly. The KJV word 'beasts' still points to living creatures rather than hostile powers. The elders are not earthly observers temporarily visiting heaven. They function with the angelic court as royal-priestly beings who participate in the ordered praise surrounding the throne. The whole heavenly host is arranged around God and the Lamb, showing that worship is the true center of the universe.",
    "The language echoes Daniel's vision of the heavenly court, where thousands minister before God and ten thousand times ten thousand stand before Him. Revelation places the Lamb within that court and shows Him receiving the praise due at the divine center of history. This prepares the reader for the conflict over worship that will intensify later in the book. Before earthly powers demand allegiance, heaven has already named the One who is worthy.",
    "The verse enlarges the reader's imagination. Worship on earth may feel small, contested, or lonely, but it is never isolated when centered on Christ. The church's praise joins the reality that already fills heaven. To worship the Lamb is to stand with the universe's true confession before that confession becomes visible to all. Faithful worship may be quiet now, but heaven's song is not quiet."
  ],
  "Revelation 5:12": [
    "The heavenly host says with a loud voice, 'Worthy is the Lamb that was slain.' The praise is sevenfold: power, riches, wisdom, strength, honour, glory, and blessing. Heaven gives the Lamb the fullness of worship because His sacrifice has revealed the fullness of God's saving character. The Lamb is worthy not despite His wounds, but because of the victory those wounds reveal.",
    "The sevenfold praise suggests completeness. Everything creatures might value is rightly ascribed to Christ. Power is His, not the empires' that imitate it. Riches are His, not the systems' that hoard them. Wisdom and strength are His, not human pride's. Honor, glory, and blessing are His, not the idols', rulers', or self's. The song reorders the universe by returning every category of worth to the slain Lamb.",
    "This prepares the reader for Revelation's later worship crisis. The beast will receive admiration from the world; Babylon will glitter with wealth; earthly powers will demand loyalty. Chapter 5 shows the true center before the counterfeit arrives. The Lamb's worthiness is rooted in sacrificial victory, so every later claim to worship must be tested against His character. Revelation's warnings are intelligible only after heaven has sung this song.",
    "The heart will give worth to something. Revelation trains believers to give it to Christ. Power, wealth, wisdom, strength, honor, glory, and blessing are not safe when detached from the Lamb. They become holy only when surrendered to Him. The church is called to let heaven's song reshape earthly desires until worship is no longer divided."
  ],
  "Revelation 5:13": [
    "John hears every creature in heaven, on earth, under the earth, and in the sea giving blessing, honour, glory, and power to the One seated on the throne and to the Lamb. The praise now fills creation. The movement of worship has widened from the living creatures and elders, to innumerable angels, and now to every creaturely realm. Revelation lets the final harmony be heard before the conflict is fully narrated.",
    "The pairing of the One on the throne and the Lamb is theologically rich. The Creator's rule and the Redeemer's victory are not competing truths. The Father who holds the scroll and the Lamb who takes it are united in worship and purpose. Creation and redemption belong together. The world that God made is the world the Lamb redeems, judges, cleanses, and restores.",
    "The universal language does not make rebellion harmless or evil eternal. It anticipates the day when every rival claim is exposed and God's reign is acknowledged. Creation, fractured by sin, is pictured moving toward the worship for which it was made. The Lamb's victory will be vindicated before the universe, and the praise of all creation points forward to the new earth where worship is no longer contested by death, deception, or false allegiance.",
    "The verse calls the reader to live now in tune with the coming song. Every day asks which voice will shape loyalty. The church's worship is a preview of restored creation when it honors the One on the throne and the Lamb. Hope becomes practical when praise orders choices, speech, endurance, and allegiance before the final chorus is heard."
  ],
  "Revelation 5:14": [
    "The four living creatures answer, 'Amen,' and the twenty-four elders fall down and worship Him who lives forever and ever. The KJV again uses 'beasts' for the living creatures who serve near the throne. The chapter ends in agreement and surrender. The elders, as angelic heavenly royal-priestly worshipers, complete the movement of the vision by bowing before the One whose worthiness has been declared. Heaven does not merely analyze the Lamb's authority. It answers with worship.",
    "Amen is a word of faithful agreement. It receives and seals the truth that has been sung. The living creatures say Amen, and the elders fall down. Their posture gathers the whole chapter into one embodied confession: the scroll is held by God, the Lamb takes it, heaven sings, creation joins, and the heavenly court bows. Revelation's theology becomes doxology.",
    "This ending is crucial for the interpretation of the seals. Before any horse rides, any cry rises from under the altar, or any cosmic sign appears, heaven has already said Amen to the Lamb. Prophetic history must be read from worship, the throne, the sanctuary, and Christ's redemptive authority. The seal sequence begins under the bowed worship of heaven, not under the fear of earth.",
    "The reader is invited into the same response. Revelation is not meant to leave the mind busy and the heart unmoved. The proper answer to the Lamb is trust, worship, and surrendered allegiance. If chapter 5 is heard rightly, the study of prophecy begins on its knees. The chapter closes by placing every later scene beneath heaven's Amen, and the church is called to join it."
  ]
};

const depthAdditions = {
  "Revelation 5:1": [
    "The right hand also signals that the scroll stands in the realm of rule, not guesswork. What John sees is God's own purpose held in the place of authority.",
    "The scroll therefore carries the feel of a covenant document, a prophetic book, and an inheritance record at the same time, because Revelation gathers several biblical patterns into one concentrated image.",
    "That order is pastorally important: the seals are frightening only when separated from the throne. In their proper setting, they unfold beneath the authority of the Lamb.",
    "The verse invites patient trust, because God may keep some things sealed until Christ opens them, but He never keeps His people outside His care."
  ],
  "Revelation 5:2": [
    "The angel's voice fills the scene with urgency, but the question itself makes clear that heavenly volume is not the same as redemptive authority.",
    "The court is being asked whether any being has the character, victory, and covenant right to take up God's case for the world and bring it to its end.",
    "That is why the question stands at the doorway to the seals. Revelation refuses to let the reader rush into events before facing the deeper issue of worthiness.",
    "A humble reader can still study carefully, but the study remains prayerful because the book is opened by grace, not seized by technique."
  ],
  "Revelation 5:3": [
    "The point is universal inability. Heaven itself waits, earth cannot answer, and the lower realm contributes no hidden wisdom.",
    "No created being can combine perfect obedience, sacrificial victory, divine authority, and covenant right. The scroll requires more than a messenger; it requires a Redeemer.",
    "That confession keeps Christ from becoming an ornament added to prophecy after the system is built. He is the condition for understanding the system at all.",
    "The reader's limits can become a place of worship when they lead away from self-reliance and toward the Lamb who alone can open the scroll."
  ],
  "Revelation 5:4": [
    "John's grief is therefore theological. He is not merely disappointed that he cannot inspect a mystery; he senses what is at stake for God's people and God's promise.",
    "The scene allows the burden of unanswered history to be felt before heaven gives its answer. Revelation does not cheapen hope by pretending the questions are light.",
    "The weeping also prevents a shallow triumphalism. Before the Lamb is seen, the prophet feels the impossibility of redemption without One who is truly worthy.",
    "Such sorrow is safest when it remains in the presence of God, where lament can be answered by revelation rather than hardened into unbelief."
  ],
  "Revelation 5:5": [
    "The elder's voice has the tone of heavenly assurance. It does not erase John's grief by scolding him; it redirects his grief to the victory already won by Christ.",
    "Judah and David both point to covenant history, so the Lamb's worthiness is not sudden improvisation. It is the fulfillment of promises God had carried through Scripture.",
    "This is why the announcement can calm John's tears before the scroll is opened. The issue has already been settled in the person and victory of Christ.",
    "The church hears the same word whenever history seems sealed: do not measure hope by what creation can supply, but by the Messiah who has prevailed."
  ],
  "Revelation 5:6": [
    "The contrast between what John hears and what John sees teaches the reader how heaven defines conquest. The Lion's victory is revealed in the form of the Lamb.",
    "The living creatures and elders frame the Lamb with worship, so the cross stands at the center of heaven's throne room rather than at the margins of memory.",
    "The Spirit sent into all the earth also shows that the Lamb's heavenly authority is active, searching, and missionary. His victory reaches the churches through the Spirit's presence.",
    "The same pattern must shape discipleship: the church conquers by faithful witness, endurance, and sacrificial loyalty, not by borrowing the world's methods of power."
  ],
  "Revelation 5:7": [
    "The movement answers the angel's question without a speech. The Lamb's action proves His worthiness before the court that no creature could satisfy.",
    "The scene is also deeply relational. The Father gives, the Son receives, and heaven responds, so the work of redemption is shown in harmony rather than tension.",
    "When the Lamb takes the scroll, the coming seal sequence is placed under His redemptive lordship. The church is not being handed a future outside His care.",
    "The act is quiet, but for faith it is thunderous: the wounded Christ holds the key to the story that once made John weep."
  ],
  "Revelation 5:8": [
    "Their worship is immediate because the taking of the scroll reveals the Lamb's authority publicly. Heaven does not wait to see the seals opened before honoring Him.",
    "The incense imagery also tells the reader that prayer is treated as holy substance in heaven. What may sound weak on earth is precious before God.",
    "This means the opening of prophecy is not detached from the prayers of the saints. The same Lamb who governs history receives the petitions of those who suffer within it.",
    "A praying believer is therefore not outside the drama of Revelation. Prayer enters the throne-room scene, and heaven handles it with more reverence than earth can see."
  ],
  "Revelation 5:9": [
    "The song is new because the Lamb has accomplished what no angel, elder, prophet, or ruler could accomplish. Redemption creates music that only grace can teach.",
    "The fourfold description of humanity also anticipates Revelation's mission language. The Lamb's worthiness sends the church outward because His blood has already claimed a worldwide people.",
    "Heaven's praise over redeemed humanity also guards the reader from making the elders the center of the scene. Their joy is in the Lamb's saving work for His people.",
    "The church cannot proclaim Revelation faithfully if it loses this blood-bought center. Warning without redemption becomes harsh; redemption without warning becomes thin."
  ],
  "Revelation 5:10": [
    "The redeemed are not returned to God as passive trophies. The Lamb's blood restores them to meaningful service, worship, and future participation in God's reign.",
    "Sin robbed humanity of dominion and priestly nearness; Christ restores both in a purified form. The promise is therefore Edenic, covenantal, and forward-looking.",
    "The future reign on earth also keeps the hope concrete. God does not abandon creation as a failed experiment; He brings it under the Lamb's victorious restoration.",
    "That calling gives daily life weight. Even now, the redeemed practice priestly concern for others and royal loyalty to God in ordinary choices."
  ],
  "Revelation 5:11": [
    "The multiplying circles of worship show that Christ's worthiness is not a local opinion within heaven; it is the organizing truth of the heavenly realm.",
    "The elders are named with the living creatures and angels because they stand within the same courtly worship scene. Their service strengthens the picture of heaven as ordered praise.",
    "The Daniel echo also places the Lamb in the setting of judgment and kingdom. Heaven's worship is not disconnected from God's courtroom rule over history.",
    "The verse gives courage to a small church on earth: its worship aligns with a vast court already gathered around the Lamb."
  ],
  "Revelation 5:12": [
    "The loud voice is fitting because the Lamb's victory is public truth. Heaven will not whisper what the cross has revealed about God's character.",
    "The seven terms are not random ornaments. They gather the whole range of creaturely value and confess that every form of worth finds its rightful owner in Christ.",
    "Later chapters will show counterfeit worship trying to redirect awe toward beastly power. This song prepares the reader to recognize the counterfeit by first hearing the true.",
    "The verse therefore trains desire. It teaches the heart to admire Christ before lesser things ask to be treated as ultimate."
  ],
  "Revelation 5:13": [
    "The scene is deliberately expansive. No corner of creation is imagined as outside the reach of the final confession.",
    "The words blessing, honor, glory, and power answer the earlier songs and gather them into one creation-wide response. Worship becomes the grammar of restored reality.",
    "This anticipates the end of the controversy, when God's character is no longer misrepresented and the Lamb's victory is no longer contested.",
    "The believer joins that future early whenever worship, obedience, and hope are given to the throne and to the Lamb instead of to fear."
  ],
  "Revelation 5:14": [
    "Their final posture is not explanatory but liturgical. The deepest truth in the chapter is not merely stated; it is enacted before God.",
    "The elders' fall also echoes their worship in chapter 4, joining Creator worship and Lamb worship in one heavenly rhythm. Creation and redemption answer each other.",
    "That order gives the coming seals their proper atmosphere. The reader should carry the sound of Amen into every scene that follows.",
    "The final question is whether the church will become what it studies: a people whose understanding ends in trust, whose trust becomes worship, and whose worship becomes faithfulness."
  ]
};

const supplementalDepth = {
  "Revelation 5:2": [
    "The question also guards the throne from presumption: access to God's purposes is never separated from the character of the One who opens them.",
    "",
    "",
    ""
  ],
  "Revelation 5:3": [
    "Even heavenly nearness is not enough unless joined to redemptive worthiness, and that is precisely what no created being possesses.",
    "",
    "Revelation therefore makes Christ indispensable before it makes the seals intelligible.",
    ""
  ],
  "Revelation 5:4": [
    "His tears make the scroll personal for the reader, because a closed scroll would mean that hope itself remains inaccessible.",
    "",
    "The Lamb's appearance will answer more than curiosity; it will answer the ache for justice, meaning, and final restoration.",
    "The church learns here that tears brought before the throne are not wasted."
  ],
  "Revelation 5:5": [
    "",
    "The elder's message therefore gathers the whole Old Testament hope into one sentence and places that hope upon Christ.",
    "",
    "This is comfort with a foundation, not optimism floating above the text."
  ],
  "Revelation 5:6": [
    "The vision refuses to let the reader separate majesty from sacrifice.",
    "",
    "The Lamb's wounds are not reminders of temporary humiliation; they are the evidence of a victory heaven never stops honoring.",
    ""
  ],
  "Revelation 5:7": [
    "The whole throne room has waited for this moment, and no other hand has moved.",
    "",
    "This gives the seals their deepest frame: the Lamb does not merely predict history; He administers history in faithfulness to God's purpose.",
    ""
  ],
  "Revelation 5:8": [
    "Their fall is not fear before a rival power but adoration before the Redeemer who has received the scroll.",
    "",
    "The verse therefore joins two realities believers often separate: Christ's government of history and His tenderness toward praying saints.",
    "The saints may not see how their prayers are handled, but heaven shows that they are neither ignored nor treated casually."
  ],
  "Revelation 5:9": [
    "",
    "The redeemed are not anonymous masses; they are gathered from the actual diversity of human life, language, memory, and history.",
    "This makes the cross both personal and cosmic, because the Lamb's blood purchases real people while also securing the opening of God's universal purpose.",
    ""
  ],
  "Revelation 5:10": [
    "The song moves from price to purpose: Christ does not redeem merely to remove guilt, but to restore a people to God.",
    "",
    "The redeemed reign because the Lamb reigns, and their future authority remains forever derivative, grateful, and worshipful.",
    "That identity should make the church both humble and courageous, because its calling comes from heaven rather than from earthly permission."
  ],
  "Revelation 5:11": [
    "The scene is ordered, not chaotic; vastness and harmony belong together in heaven's worship.",
    "",
    "The same court that surrounds the throne will later stand behind the judgments that vindicate God's character and His people.",
    "The believer is invited to hear present worship as participation in that larger reality."
  ],
  "Revelation 5:12": [
    "The Lamb's death has not reduced His glory; it has revealed the kind of glory heaven treasures.",
    "",
    "That contrast is vital: false worship is impressed by spectacle, but true worship is captured by the character revealed at Calvary.",
    "A life shaped by this song will become less fascinated by domination and more responsive to sacrificial love."
  ],
  "Revelation 5:13": [
    "The scope is meant to stretch faith beyond the present disorder of the world.",
    "",
    "The song looks beyond the age when worship is contested and anticipates a universe where God's truth is publicly clear.",
    "To worship now is to anticipate that healed future before it is visible."
  ],
  "Revelation 5:14": [
    "The response is simple because the truth is settled.",
    "The chapter begins with a sealed scroll and ends with worship, showing that revelation reaches its goal when God's people trust and adore.",
    "The Amen is therefore not an afterthought; it is heaven's seal upon the Lamb's worthiness before the seals are opened.",
    "The best commentary on Revelation finally becomes a bowed life."
  ]
};

const crossReferencesByVerse = {
  "Revelation 5:1": ["Daniel 7:9-14", "Daniel 12:4", "Isaiah 29:11", "Ezekiel 2:9-10", "Luke 4:17-21", "Hebrews 9:15", "Revelation 6:1", "Revelation 10:2"],
  "Revelation 5:2": ["Psalm 24:3-10", "Isaiah 29:11-12", "Daniel 12:4", "John 5:22-27", "Hebrews 1:3-4", "Revelation 5:5-7"],
  "Revelation 5:3": ["Romans 3:10-12", "1 Corinthians 2:10-11", "Philippians 2:10", "Hebrews 9:15", "Revelation 5:9", "Revelation 20:13"],
  "Revelation 5:4": ["Jeremiah 9:1", "Luke 19:41", "John 16:20", "Revelation 1:1", "Revelation 5:5", "Revelation 21:4"],
  "Revelation 5:5": ["Genesis 49:8-10", "Isaiah 11:1-10", "Jeremiah 23:5-6", "Romans 15:12", "Hebrews 7:14", "Revelation 22:16"],
  "Revelation 5:6": ["Exodus 12:3-13", "Isaiah 53:7", "Zechariah 4:10", "John 1:29", "1 Peter 1:18-19", "Revelation 1:4", "Revelation 4:5", "Revelation 13:8"],
  "Revelation 5:7": ["Daniel 7:13-14", "John 3:35", "John 5:22-27", "Hebrews 1:3", "Hebrews 9:15", "Revelation 5:1", "Revelation 6:1"],
  "Revelation 5:8": ["Psalm 141:2", "Exodus 30:1-8", "1 Chronicles 25:1-6", "Revelation 4:4", "Revelation 7:11", "Revelation 8:3-4"],
  "Revelation 5:9": ["Psalm 33:3", "Psalm 98:1", "Isaiah 42:10", "Daniel 7:13-14", "1 Peter 1:18-19", "Revelation 7:9", "Revelation 14:6"],
  "Revelation 5:10": ["Exodus 19:5-6", "Daniel 7:18", "Daniel 7:27", "1 Peter 2:5-9", "Revelation 1:6", "Revelation 20:4", "Revelation 22:5"],
  "Revelation 5:11": ["Deuteronomy 33:2", "Daniel 7:10", "Psalm 68:17", "Hebrews 12:22", "Revelation 4:4-8", "Revelation 7:11"],
  "Revelation 5:12": ["1 Chronicles 29:11", "Psalm 29:1-2", "Philippians 2:9-11", "1 Timothy 6:15-16", "Revelation 4:11", "Revelation 13:4"],
  "Revelation 5:13": ["Psalm 69:34", "Psalm 148:1-13", "Isaiah 45:23", "Romans 8:19-23", "Philippians 2:10-11", "Revelation 21:1-5"],
  "Revelation 5:14": ["1 Chronicles 16:36", "Nehemiah 8:6", "Psalm 106:48", "Revelation 4:10-11", "Revelation 7:11-12", "Revelation 19:4"]
};

const wordNotesByVerse = {
  "Revelation 5:1": [
    { term: "Right hand", explanation: "A sign of authority, power, and royal trust.", scriptureReferences: ["Psalm 110:1", "Daniel 7:13-14", "Revelation 5:1"] },
    { term: "Sealed scroll", explanation: "God's complete covenant-redemptive purpose for history and restoration.", scriptureReferences: ["Daniel 12:4", "Isaiah 29:11", "Revelation 5:1"] }
  ],
  "Revelation 5:2": [
    { term: "Strong angel", explanation: "A mighty heavenly messenger whose strength cannot itself open the scroll.", scriptureReferences: ["Psalm 103:20", "Revelation 5:2", "Revelation 10:1"] },
    { term: "Worthy", explanation: "Moral and redemptive fitness to disclose and fulfill God's purpose.", scriptureReferences: ["Psalm 24:3-5", "Revelation 4:11", "Revelation 5:9"] }
  ],
  "Revelation 5:3": [
    { term: "No one", explanation: "The whole created order lacks the right to open God's sealed purpose.", scriptureReferences: ["Romans 3:10-12", "Revelation 5:3", "Revelation 5:5"] },
    { term: "Under the earth", explanation: "A way of including every creaturely realm in the failed search.", scriptureReferences: ["Philippians 2:10", "Revelation 5:3", "Revelation 20:13"] }
  ],
  "Revelation 5:4": [
    { term: "Wept much", explanation: "Prophetic grief over a future that would remain unreadable without a Redeemer.", scriptureReferences: ["Jeremiah 9:1", "Luke 19:41", "Revelation 5:4"] },
    { term: "Open and read", explanation: "To disclose and carry forward the contents of God's scroll.", scriptureReferences: ["Isaiah 29:11-12", "Luke 4:17-21", "Revelation 5:4"] }
  ],
  "Revelation 5:5": [
    { term: "Twenty-four elders", explanation: "Angelic heavenly royal-priestly worshipers around the throne.", scriptureReferences: ["Revelation 4:4", "Revelation 5:5", "Revelation 7:11"] },
    { term: "Lion of Judah", explanation: "The promised royal Messiah from Judah's line.", scriptureReferences: ["Genesis 49:9-10", "Hebrews 7:14", "Revelation 5:5"] },
    { term: "Root of David", explanation: "The Davidic Messiah who fulfills the covenant hope.", scriptureReferences: ["Isaiah 11:1-10", "Romans 15:12", "Revelation 22:16"] }
  ],
  "Revelation 5:6": [
    { term: "Lamb as slain", explanation: "Christ as sacrificial Redeemer, alive with the marks of victory.", scriptureReferences: ["Isaiah 53:7", "John 1:29", "Revelation 5:6"] },
    { term: "Seven horns", explanation: "Complete kingly power belonging to the slain Lamb.", scriptureReferences: ["Deuteronomy 33:17", "Daniel 7:24", "Revelation 5:6"] },
    { term: "Seven eyes", explanation: "The fullness of the Spirit sent into all the earth.", scriptureReferences: ["Zechariah 4:10", "Revelation 1:4", "Revelation 5:6"] }
  ],
  "Revelation 5:7": [
    { term: "Took the scroll", explanation: "The Lamb receives authority to open and administer God's purpose.", scriptureReferences: ["Daniel 7:13-14", "John 5:22-27", "Revelation 5:7"] },
    { term: "Out of the right hand", explanation: "Authority received in harmony with the One seated on the throne.", scriptureReferences: ["John 3:35", "Hebrews 1:3", "Revelation 5:7"] }
  ],
  "Revelation 5:8": [
    { term: "Harps", explanation: "Instruments of ordered praise before God.", scriptureReferences: ["1 Chronicles 25:1", "Psalm 33:2", "Revelation 5:8"] },
    { term: "Golden bowls", explanation: "Heavenly vessels holding incense, identified as the prayers of the saints.", scriptureReferences: ["Psalm 141:2", "Revelation 5:8", "Revelation 8:3-4"] },
    { term: "Twenty-four elders", explanation: "Angelic heavenly royal-priestly worshipers serving in the throne-room liturgy.", scriptureReferences: ["Revelation 4:4", "Revelation 5:8", "Revelation 11:16"] }
  ],
  "Revelation 5:9": [
    { term: "New song", explanation: "Praise arising from a fresh and decisive act of divine deliverance.", scriptureReferences: ["Psalm 98:1", "Isaiah 42:10", "Revelation 5:9"] },
    { term: "Redeemed by blood", explanation: "The Lamb purchases a people for God through His sacrificial death.", scriptureReferences: ["1 Peter 1:18-19", "Revelation 1:5", "Revelation 5:9"] }
  ],
  "Revelation 5:10": [
    { term: "Kings and priests", explanation: "A royal-priestly identity restored to the redeemed by the Lamb.", scriptureReferences: ["Exodus 19:5-6", "1 Peter 2:9", "Revelation 1:6"] },
    { term: "Reign on the earth", explanation: "The future participation of the redeemed in the restored kingdom.", scriptureReferences: ["Daniel 7:27", "Revelation 20:4", "Revelation 22:5"] }
  ],
  "Revelation 5:11": [
    { term: "Many angels", explanation: "The vast heavenly host joining the worship of the Lamb.", scriptureReferences: ["Daniel 7:10", "Hebrews 12:22", "Revelation 5:11"] },
    { term: "Ten thousand times ten thousand", explanation: "A number expressing an innumerable heavenly court.", scriptureReferences: ["Deuteronomy 33:2", "Daniel 7:10", "Revelation 5:11"] }
  ],
  "Revelation 5:12": [
    { term: "Sevenfold praise", explanation: "A complete ascription of worth to the slain Lamb.", scriptureReferences: ["1 Chronicles 29:11", "Revelation 5:12", "Revelation 7:12"] },
    { term: "Loud voice", explanation: "Heaven's public and emphatic confession of the Lamb's worthiness.", scriptureReferences: ["Revelation 5:2", "Revelation 5:12", "Revelation 14:7"] }
  ],
  "Revelation 5:13": [
    { term: "Every creature", explanation: "The widening confession of creation before the throne and the Lamb.", scriptureReferences: ["Psalm 148:1-13", "Philippians 2:10-11", "Revelation 5:13"] },
    { term: "Throne and Lamb", explanation: "The unity of Creator rule and redemptive victory.", scriptureReferences: ["Revelation 4:11", "Revelation 5:13", "Revelation 22:1"] }
  ],
  "Revelation 5:14": [
    { term: "Amen", explanation: "Heaven's faithful agreement with the praise given to God and the Lamb.", scriptureReferences: ["Psalm 106:48", "Revelation 5:14", "Revelation 19:4"] },
    { term: "Fell down and worshipped", explanation: "Embodied surrender before the eternal One.", scriptureReferences: ["Nehemiah 8:6", "Revelation 4:10", "Revelation 5:14"] }
  ]
};

const chapterSymbols = [
  {
    symbol: "Sealed scroll",
    references: ["Revelation 5:1", "Revelation 5:2", "Revelation 5:3", "Revelation 5:4", "Revelation 5:5", "Revelation 5:7"],
    meaning: "God's complete covenant-redemptive purpose for history, judgment, inheritance, vindication, and final restoration, opened only by the victorious Lamb.",
    scriptureReferences: ["Revelation 5:1-9", "Daniel 7:9-14", "Daniel 12:4", "Isaiah 29:11", "Ezekiel 2:9-10", "Luke 4:17-21", "Hebrews 9:15"],
    sources: [docSource, mcnultySource, technicalSource]
  },
  {
    symbol: "Right hand",
    references: ["Revelation 5:1", "Revelation 5:7"],
    meaning: "Authority, power, possession, and royal trust.",
    scriptureReferences: ["Psalm 110:1", "John 3:35", "Hebrews 1:3", "Revelation 5:1"],
    sources: [docSource, technicalSource]
  },
  {
    symbol: "Strong angel",
    references: ["Revelation 5:2"],
    meaning: "A mighty heavenly messenger whose strength announces but cannot solve the scroll crisis.",
    scriptureReferences: ["Psalm 103:20", "Revelation 5:2", "Revelation 10:1"],
    sources: [docSource, technicalSource]
  },
  {
    symbol: "Twenty-four elders",
    references: ["Revelation 5:5", "Revelation 5:8", "Revelation 5:11", "Revelation 5:14"],
    meaning: "Angelic heavenly royal-priestly worshipers who serve around the throne and lead praise before God and the Lamb.",
    scriptureReferences: ["Revelation 4:4", "Revelation 5:5-14", "Revelation 7:11", "Revelation 11:16", "Revelation 19:4"],
    sources: [docSource, technicalSource, angelicEldersSource]
  },
  {
    symbol: "Lion of Judah",
    references: ["Revelation 5:5"],
    meaning: "Christ as the promised royal Messiah from Judah's line.",
    scriptureReferences: ["Genesis 49:8-10", "Hebrews 7:14", "Revelation 5:5"],
    sources: [docSource, mcnultySource]
  },
  {
    symbol: "Root of David",
    references: ["Revelation 5:5"],
    meaning: "Christ as the Davidic Messiah who fulfills the covenant hope.",
    scriptureReferences: ["Isaiah 11:1-10", "Romans 15:12", "Revelation 22:16"],
    sources: [docSource, mcnultySource]
  },
  {
    symbol: "Slain Lamb",
    references: ["Revelation 5:6", "Revelation 5:8", "Revelation 5:9", "Revelation 5:12", "Revelation 5:13"],
    meaning: "Christ as sacrificial Redeemer, alive and worthy through His death and resurrection.",
    scriptureReferences: ["Exodus 12:3-13", "Isaiah 53:7", "John 1:29", "1 Peter 1:18-19", "Revelation 5:6"],
    sources: [docSource, mcnultySource]
  },
  {
    symbol: "Seven horns",
    references: ["Revelation 5:6"],
    meaning: "Complete royal power belonging to the Lamb.",
    scriptureReferences: ["Deuteronomy 33:17", "Daniel 7:24", "Revelation 5:6"],
    sources: [docSource, technicalSource]
  },
  {
    symbol: "Seven eyes",
    references: ["Revelation 5:6"],
    meaning: "The fullness of the Spirit's presence and searching work sent into all the earth.",
    scriptureReferences: ["Zechariah 4:10", "Revelation 1:4", "Revelation 4:5", "Revelation 5:6"],
    sources: [docSource, technicalSource]
  },
  {
    symbol: "Four living creatures",
    references: ["Revelation 5:6", "Revelation 5:8", "Revelation 5:11", "Revelation 5:14"],
    meaning: "Heavenly throne attendants who join and answer the worship of the Lamb.",
    scriptureReferences: ["Ezekiel 1:5-14", "Isaiah 6:1-3", "Revelation 4:6-8", "Revelation 5:8-14"],
    sources: [docSource, technicalSource]
  },
  {
    symbol: "Harps",
    references: ["Revelation 5:8"],
    meaning: "Ordered heavenly praise before God and the Lamb.",
    scriptureReferences: ["1 Chronicles 25:1-6", "Psalm 33:2", "Revelation 5:8", "Revelation 15:2"],
    sources: [docSource, technicalSource]
  },
  {
    symbol: "Golden bowls of incense",
    references: ["Revelation 5:8"],
    meaning: "The prayers of the saints represented as precious incense in the heavenly sanctuary setting.",
    scriptureReferences: ["Exodus 30:1-8", "Psalm 141:2", "Revelation 5:8", "Revelation 8:3-4"],
    sources: [docSource, mcnultySource]
  },
  {
    symbol: "New song",
    references: ["Revelation 5:9"],
    meaning: "Praise arising from the Lamb's decisive work of redemption.",
    scriptureReferences: ["Psalm 33:3", "Psalm 98:1", "Isaiah 42:10", "Revelation 5:9"],
    sources: [docSource, mcnultySource]
  },
  {
    symbol: "Redeemed by blood",
    references: ["Revelation 5:9"],
    meaning: "The Lamb purchasing a people for God through His sacrificial death.",
    scriptureReferences: ["Acts 20:28", "1 Peter 1:18-19", "Revelation 1:5", "Revelation 5:9"],
    sources: [docSource, mcnultySource]
  },
  {
    symbol: "Kings and priests",
    references: ["Revelation 5:10"],
    meaning: "The royal-priestly calling restored to the redeemed through the Lamb.",
    scriptureReferences: ["Exodus 19:5-6", "1 Peter 2:5-9", "Revelation 1:6", "Revelation 5:10"],
    sources: [docSource, mcnultySource]
  },
  {
    symbol: "Universal worship",
    references: ["Revelation 5:11", "Revelation 5:12", "Revelation 5:13", "Revelation 5:14"],
    meaning: "The widening praise of heaven and creation directed to the throne and the Lamb.",
    scriptureReferences: ["Daniel 7:10", "Psalm 148:1-13", "Philippians 2:10-11", "Revelation 5:11-14"],
    sources: [docSource, technicalSource]
  }
];

const chapter = JSON.parse(readFileSync(chapterPath, "utf8"));

for (const verse of chapter.verses) {
  const paragraphs = commentary[verse.verse]?.map((paragraph, index) => `${paragraph} ${depthAdditions[verse.verse]?.[index] ?? ""} ${supplementalDepth[verse.verse]?.[index] ?? ""}`.trim());
  if (!paragraphs) throw new Error(`Missing commentary for ${verse.verse}`);
  if (paragraphs.length !== 4) throw new Error(`${verse.verse} should have exactly four paragraphs`);

  const detailedExplanation = paragraphs.join("\n\n");
  const totalWords = wordCount(detailedExplanation);
  const anchorVerse = ["Revelation 5:1", "Revelation 5:5", "Revelation 5:6", "Revelation 5:7", "Revelation 5:8", "Revelation 5:9", "Revelation 5:10"].includes(verse.verse);
  const maximumWords = anchorVerse ? 1000 : 700;
  if (totalWords < 400 || totalWords > maximumWords) {
    throw new Error(`${verse.verse} commentary is ${totalWords} words`);
  }
  paragraphs.forEach((paragraph, index) => {
    const count = wordCount(paragraph);
    if (count < 75 || count > 230) {
      throw new Error(`${verse.verse} paragraph ${index + 1} is ${count} words`);
    }
    assertPublicText(verse.verse, paragraph);
  });

  const includeElders = ["Revelation 5:5", "Revelation 5:6", "Revelation 5:8", "Revelation 5:9", "Revelation 5:11", "Revelation 5:14"].includes(verse.verse);
  verse.explanation = paragraphs[0];
  verse.historicalBackground = paragraphs[1];
  verse.symbolicMeaning = paragraphs[1];
  verse.adventistInsight = paragraphs[2];
  verse.propheticSignificance = paragraphs[2];
  verse.application = paragraphs[3];
  verse.crossReferences = crossReferencesByVerse[verse.verse] ?? verse.crossReferences;
  verse.wordNotes = wordNotesByVerse[verse.verse] ?? [];
  verse.sources = includeElders ? eldersSourceList : sourceList;
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
  verse.sourceAudit = sourceAudit(includeElders);
  verse.reviewStatus = "verified-seed";
}

chapter.title = "The Lamb and the Sealed Scroll";
chapter.summary = "Revelation 5 moves from the throne of God to the worthiness of the Lamb. The sealed scroll represents God's complete covenant-redemptive purpose for history, judgment, inheritance, vindication, and final restoration, opened only by Christ, whose sacrificial victory gives Him authority over worship and the future of His people.";
chapter.historicalContext = "The churches of Asia lived under visible claims of imperial honor, power, and allegiance. Revelation 5 answers those claims by showing heaven's court worshiping the slain Lamb as the only One worthy to open the scroll and direct history.";
chapter.literaryContext = "The chapter continues the throne-room vision of Revelation 4 and prepares for the opening of the seven seals in Revelation 6. It centers the seal sequence on Christ's worthiness, cross, heavenly authority, and universal worship.";
chapter.themes = ["Lamb", "Sealed scroll", "Worthy", "Heavenly sanctuary", "Redemption", "New song", "Kings and priests", "Universal worship"];
chapter.outline = [
  { range: "5:1-4", title: "The Sealed Scroll", summary: "The scroll of God's covenant-redemptive purpose rests in God's right hand, but no created being is found worthy to open it." },
  { range: "5:5-7", title: "The Worthy Lamb", summary: "The Lion of Judah is revealed as the slain Lamb who takes the scroll from the throne." },
  { range: "5:8-10", title: "The New Song", summary: "Heaven worships the Lamb because His blood redeems a people from every nation and restores them as kings and priests." },
  { range: "5:11-14", title: "Universal Praise", summary: "Angels, living creatures, elders, and all creation confess the worthiness of the Lamb." }
];
chapter.teachingNotes = {
  openingQuestion: "Why must the scroll be opened by the Lamb before the seals unfold?",
  mainPoint: "Revelation 5 shows that history, judgment, inheritance, and restoration are held by God and opened only by the Lamb who conquered through sacrifice.",
  keyVerses: ["Revelation 5:1", "Revelation 5:5", "Revelation 5:9"],
  importantSymbols: ["Sealed scroll", "Lion of Judah", "Slain Lamb", "Golden bowls of incense", "Kings and priests"],
  discussionQuestions: [
    "How does the sealed scroll change the way we think about history?",
    "Why does John hear of a Lion but see a Lamb?",
    "What does the throne-room response teach about prayer, worship, and prophecy?"
  ],
  commonMisunderstandings: [
    "Reducing the scroll to a vague future timetable rather than God's full covenant-redemptive purpose.",
    "Reading the seals apart from the Lamb who alone is worthy to open them.",
    "Treating heavenly worship as decoration instead of the setting from which history is interpreted."
  ],
  adventistEmphasis: "The Lamb's taking of the scroll grounds the unfolding of history, judgment, and heavenly ministry in His sacrificial victory.",
  closingAppeal: "Study the seals from the throne room, with the slain Lamb at the center and worship as the proper response."
};
chapter.evangelisticNotes = {
  mainDoctrinalTheme: "Only the slain and risen Lamb can open God's purpose for history and restore His people.",
  keyBibleTexts: ["Revelation 5:1-10", "Daniel 7:9-14", "Isaiah 53:7", "John 1:29"],
  flow: [
    "Begin with the sealed scroll in God's hand.",
    "Show the inability of every creature to open it.",
    "Present the Lion who appears as the slain Lamb.",
    "Connect the Lamb's blood with redemption, prayer, worship, and final restoration."
  ],
  simpleIllustrations: [
    "A sealed will cannot be executed by curiosity; it must be opened by the one with the legal right.",
    "A locked future becomes hopeful when the key is held by the One who gave Himself for us."
  ],
  appealQuestion: "Will you trust the Lamb who alone can open history and redeem your life?",
  cautions: [
    "Do not detach the seals from the Lamb's authority.",
    "Do not turn the scroll into speculation without worship."
  ],
  sources: [docSource]
};
chapter.reflectionQuestions = [
  "Where am I tempted to seek control over the future instead of trusting the Lamb?",
  "How does the slain Lamb reshape my understanding of victory?",
  "What prayers do I need to place again before the Lamb who holds the scroll?"
];
chapter.sources = [docSource, mcnultySource, technicalSource, angelicEldersSource];
chapter.symbols = chapterSymbols;
chapter.crossReferences = [...new Set(chapter.verses.flatMap((verse) => verse.crossReferences))];

writeFileSync(chapterPath, `${JSON.stringify(chapter, null, 2)}\n`);
console.log("Imported deep Revelation 5 commentary.");
