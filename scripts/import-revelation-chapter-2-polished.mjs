import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const chapterPath = join(root, "content", "revelation", "chapter-02.json");

const docSource = {
  sourceId: "revelation-chapter-two-docx",
  locator: "Revelation Chapter Two manuscript",
  claimType: "manuscript-synthesis",
  priority: 1
};

const mcnultySource = {
  sourceId: "revelation-practical-living-in-the-judgment-hour",
  locator: "Priority Adventist commentary for Revelation 2",
  claimType: "adventist-interpretation",
  priority: 1
};

const technicalSource = {
  sourceId: "revelation-a-shorter-commentary",
  locator: "Technical and Old Testament background support",
  claimType: "technical-background",
  priority: 5
};

function sourceAudit() {
  return {
    exegesis: [docSource, mcnultySource],
    historicalBackground: [docSource, technicalSource],
    technicalNotes: [docSource, technicalSource],
    adventistPropheticInsight: [docSource, mcnultySource],
    propheticTimeline: [docSource, mcnultySource],
    otherCommentaryInsights: [docSource, technicalSource],
    application: [docSource, mcnultySource]
  };
}

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function normalizePublicText(text) {
  return text
    .replace(/\bIn the broader historicist reading,/g, "Across the church-history sequence,")
    .replace(/\bIn the broad historicist view,/g, "Across the church-history sequence,")
    .replace(/\bIn the historicist picture,/g, "In this wider movement,")
    .replace(/\bIn the historicist movement of the seven churches,/g, "Within the movement of the seven churches,")
    .replace(/\bIn the historicist movement,/g, "Within the church-history movement,")
    .replace(/\bIn the historicist sequence,/g, "Across the chapter's church-history sequence,")
    .replace(/\bIn the broad historicist sequence,/g, "In the broad church-history sequence,")
    .replace(/\bIn the historicist reading,/g, "Within this church-history setting,")
    .replace(/\bIn the historicist view,/g, "Within this church-history setting,")
    .replace(/\bWithin the historicist sequence,/g, "Within the church-history sequence,")
    .replace(/\bWithin the historicist view of Thyatira,/g, "Within the Thyatira period,")
    .replace(/\bWithin the flow of church history, Smyrna represents\b/g, "Smyrna also represents")
    .replace(/\bWithin the flow of church history, Thyatira represents the long medieval period\b/g, "Thyatira opens the long medieval period")
    .replace(/\bWithin the flow of church history, Thyatira represents the medieval church\b/g, "The Thyatira period points to the medieval church")
    .replace(/\bWithin the flow of church history, this faithful rest in Thyatira points to\b/g, "The faithful rest in Thyatira points to")
    .replace(/\bWithin the flow of church history, Thyatira points to\b/g, "The Thyatira period points to")
    .replace(/\bWithin the flow of church history, the promise fits\b/g, "The promise fits")
    .replace(/\bThe 'ten days' have been understood in this church-history reading as pointing to\b/g, "The 'ten days' point to")
    .replace(/\bThis church-history reading sees this period as\b/g, "This period appears")
    .replace(/\bThe church-history reading sees this period as\b/g, "This period appears")
    .replace(/\bAcross the church-history sequence,/g, "Across the larger movement,")
    .replace(/\bSmyrna's place in the larger church-history sequence is\b/g, "Smyrna's broader place is")
    .replace(/\bIn the broad church-history sequence,/g, "In the larger sequence,")
    .replace(/\bWithin the church-history sequence,/g, "Within that sequence,")
    .replace(/\bAcross the chapter's church-history sequence,/g, "Across the chapter's movement,")
    .replace(/\bWithin this church-history setting,/g, "Within this period,")
    .replace(/\bWithin this period, this command\b/g, "During this period, the command")
    .replace(/\bWithin the church-history movement,/g, "Within that movement,")
    .replace(/\bThis church-history application should not make\b/g, "That wider application should not make")
    .replace(/\bThe church-history application should not flatten\b/g, "The wider application should not flatten")
    .replace(/\bThe church-history pattern shows\b/g, "The pattern shows")
    .replace(/\bAs a church-history symbol,/g, "As the message widens beyond the local church,")
    .replace(/\bthe church-history movement\b/g, "Revelation's movement")
    .replace(/\bThe faithful remnant in dark times as preserving\b/g, "The faithful remnant in dark times preserved")
    .replace(/\bHistoricist application should not/g, "This church-history application should not")
    .replace(/\bHistoricist application sees/g, "The church-history pattern shows")
    .replace(/\bThe historicist application\b/g, "The church-history application")
    .replace(/\bthe historicist application\b/g, "the church-history application")
    .replace(/\ba long era in which This reading sees/g, "a long era in which the pattern shows")
    .replace(/\bThis reading sees God's/g, "God's")
    .replace(/\bThis reading sees the remnant/g, "The faithful remnant")
    .replace(/\bThis reading sees medieval corruption/g, "Medieval corruption appears")
    .replace(/\bThe passage presents\b/g, "The passage presents")
    .replace(/\bbut the manuscript tradition treats their error as\b/g, "but the evidence portrays their error as")
    .replace(/\bThe point reaches the conscience:\s*/g, "The point reaches the conscience: ")
    .replace(/\bthis church-history reading\b/g, "this church-history reading")
    .replace(/\bAdventist exposition sees\b/g, "This church-history reading sees")
    .replace(/\bthe church-history reading\b/g, "the church-history reading")
    .replace(/\bThe force of the promise is\b/g, "The force of the promise is")
    .replace(/\bThe lesson is\b/g, "The lesson is")
    .replace(/\bThe pastoral value of the verse is\b/g, "The value of the verse is")
    .replace(/\bThe value of the verse is its simplicity\./g, "There is mercy in the simplicity of this command.")
    .replace(/\bThe verse makes Revelation deeply practical\./g, "Revelation brings the promise down into lived obedience.")
    .replace(/\bservice lifeless\b/g, "service lifeless");
}

const verseDetails = {
  "Revelation 2:1": [
    { index: 1, text: "Acts 19 shows how deeply the gospel disturbed Ephesian religious and economic life, and Acts 20 records Paul's warning that the elders would have to guard the flock after his departure." },
    { index: 2, text: "The period is commonly placed from A.D. 31 to 100, from the ascension-era church through the close of the apostolic age." }
  ],
  "Revelation 2:2": [
    { index: 1, text: "Paul's farewell in Acts 20:28-31 gives the background: leaders were to watch for wolves and for distorted teaching arising even from within the community." },
    { index: 2, text: "Placed in the A.D. 31-100 period, the verse reflects a church still close to apostolic testimony and therefore keenly concerned to protect the gospel." }
  ],
  "Revelation 2:3": [
    { index: 2, text: "The A.D. 31-100 setting keeps the praise historically concrete: the early church carried witness through opposition, travel, controversy, and the burden of planting communities across the Roman world." },
    { index: 3, text: "The verse therefore honors endurance while refusing to let endurance stand alone without renewed love." }
  ],
  "Revelation 2:4": [
    { index: 2, text: "The warning fits the close of the first century, when the first generation's immediacy was giving way to inherited forms of faith." }
  ],
  "Revelation 2:5": [
    { index: 2, text: "The A.D. 31-100 frame makes the warning especially sober, because even the church nearest the apostles could not preserve its lampstand by memory alone." }
  ],
  "Revelation 2:6": [
    { index: 2, text: "Ephesus stands within the era when the church was still resisting corruptions that later messages show becoming more tolerated and systematized." }
  ],
  "Revelation 2:7": [
    { index: 2, text: "The promise looks beyond the A.D. 31-100 church to the final restoration, where what Adam lost is given back through Christ." }
  ],
  "Revelation 2:8": [
    { index: 2, text: "Smyrna is commonly associated with about A.D. 100 to 313, the age in which the church endured repeated waves of Roman hostility before imperial favor changed its public position." }
  ],
  "Revelation 2:9": [
    { index: 1, text: "In a city proud of loyalty and public honor, exclusion from civic life could easily become economic poverty, social suspicion, and religious slander." },
    { index: 2, text: "The A.D. 100-313 setting explains why a church may be visibly poor and yet rich before Christ." }
  ],
  "Revelation 2:10": [
    { index: 2, text: "Within the wider A.D. 100-313 period, the A.D. 303-313 persecution under Diocletian gives the 'ten days' a pointed historical application without exhausting the verse's spiritual meaning." }
  ],
  "Revelation 2:11": [
    { index: 2, text: "For believers who lived under the shadow of A.D. 100-313 persecution, this promise distinguished temporary martyrdom from final loss." }
  ],
  "Revelation 2:12": [
    { index: 2, text: "Pergamos is commonly placed in the A.D. 313-538 period, when the church's public situation changed after Constantine and the danger of compromise became more subtle than open persecution." }
  ],
  "Revelation 2:13": [
    { index: 1, text: "Pergamos was associated with imperial honor and prominent pagan cults, so the confession of Jesus' name stood against a city trained to render religious loyalty to other powers." },
    { index: 2, text: "The A.D. 313-538 period shows the same tension on a wider scale: Christian confession survived, but nearness to power brought new spiritual danger." }
  ],
  "Revelation 2:14": [
    { index: 1, text: "Numbers 22-25 is essential background: Balaam could not curse Israel directly, but Israel was drawn into sin through idolatrous feasting and immoral alliance." },
    { index: 2, text: "The A.D. 313-538 setting explains why the Balaam pattern became a serious warning, since favor from power often arrived with pressure to absorb practices Christ had not blessed." }
  ],
  "Revelation 2:15": [
    { index: 2, text: "The contrast between Ephesus and Pergamos is part of the church-history movement: what was hated in the A.D. 31-100 period could become tolerated in the A.D. 313-538 period." }
  ],
  "Revelation 2:16": [
    { index: 2, text: "The warning fits the A.D. 313-538 period because Christ's word confronts the very place where religious success could be mistaken for spiritual health." }
  ],
  "Revelation 2:17": [
    { index: 2, text: "In the A.D. 313-538 setting, these gifts answer the lure of public advantage: Christ offers hidden food, personal vindication, and a name received from heaven rather than from empire." }
  ],
  "Revelation 2:18": [
    { index: 1, text: "Trade guild pressure helps the local picture, while the prophetic picture opens toward the longer era in which religious authority and worldly structures became deeply entangled." },
    { index: 2, text: "Thyatira is commonly placed from A.D. 538 to 1565, the long medieval period in which corruption and remnant faithfulness appear side by side." }
  ],
  "Revelation 2:19": [
    { index: 2, text: "The A.D. 538-1565 frame keeps the verse from becoming a caricature of the medieval church; Christ sees real charity, faith, endurance, and service even while exposing tolerated corruption." }
  ],
  "Revelation 2:20": [
    { index: 1, text: "The Old Testament Jezebel joined false worship, royal influence, persecution, and the silencing of God's prophets, which is why the name is so fitting in a letter about corrupted spiritual authority." },
    { index: 2, text: "In the A.D. 538-1565 period, the symbol points to the fusion of religious claims with coercive power and to worship practices that drew the church away from the simplicity of Christ." }
  ],
  "Revelation 2:21": [
    { index: 2, text: "Calls to reform continued through the medieval period and came to a sharper historical focus around the Reformation era and the Council of Trent in the sixteenth century." }
  ],
  "Revelation 2:22": [
    { index: 2, text: "Within the A.D. 538-1565 frame, the warning shows that systems which resist reform eventually meet consequences proportionate to the light they rejected." }
  ],
  "Revelation 2:23": [
    { index: 2, text: "The long A.D. 538-1565 period did not hide either corruption or faithfulness from Christ; His judgment searches institutions and hearts alike." }
  ],
  "Revelation 2:24": [
    { index: 2, text: "This is why the A.D. 538-1565 period must be read with care: Christ distinguishes dominant corruption from those who resisted it and clung to the light they had." }
  ],
  "Revelation 2:25": [
    { index: 2, text: "The command carries the faithful through the A.D. 538-1565 period toward the renewed light that followed, while still speaking to every believer who must endure until Christ comes." }
  ],
  "Revelation 2:26": [
    { index: 2, text: "The promise answered the A.D. 538-1565 church where earthly power often seemed to belong to oppressive systems rather than to faithful witnesses." }
  ],
  "Revelation 2:27": [
    { index: 2, text: "For believers in the A.D. 538-1565 period, Psalm 2's promise meant that coercive religious power would not be the final form of authority in God's world." }
  ],
  "Revelation 2:28": [
    { index: 2, text: "The promise of the morning star suits the end of the A.D. 538-1565 period, where the darkness of corruption is answered by the dawning light of Christ and His word." }
  ],
  "Revelation 2:29": [
    { index: 2, text: "The sequence has moved from A.D. 31-100, to about A.D. 100-313, to A.D. 313-538, and then to A.D. 538-1565; yet the Spirit still speaks each message to the whole church." }
  ]
};

const depthSentences = {
  "Revelation 2:4": { index: 3, text: "Love is the flame that keeps correct doctrine from becoming brittle and keeps service from becoming mere religious motion before God." },
  "Revelation 2:5": { index: 3, text: "The first works include the ordinary disciplines of love: prayer, confession, reconciliation, Scripture, witness, and service that flows from delight in Christ." },
  "Revelation 2:6": { index: 3, text: "Holiness is not the enemy of love; in Christ's church, holiness protects love from being hollowed out by tolerated sin, spiritual confusion, and compromise." },
  "Revelation 2:7": { index: 3, text: "The promised paradise shows that Christ's correction always aims at life, not at the humiliation of His people." },
  "Revelation 2:8": { index: 3, text: "The risen Christ gives Smyrna a future larger than the city, the prison, the tribunal, or the grave." },
  "Revelation 2:9": { index: 3, text: "The poor church is not pitied by Christ as spiritually deficient; it is named rich by the only Judge whose valuation lasts." },
  "Revelation 2:10": { index: 3, text: "The promise also teaches that faithfulness is measured by loyalty to Christ, not by the ability to escape suffering in this present age of trial, when public witness carries visible spiritual cost before the watching world." },
  "Revelation 2:11": { index: 3, text: "The promise frees the church to live courageously, because ultimate life is held by Christ rather than by persecuting power or earthly fear." },
  "Revelation 2:12": { index: 3, text: "The church must hear that word before it hears the applause or threats of the powers around it." },
  "Revelation 2:13": { index: 3, text: "A hostile location does not make faithfulness impossible; it makes Christ's recognition even more precious." },
  "Revelation 2:15": { index: 3, text: "The church's task is to receive sinners without receiving the teaching that teaches sinners to remain unchanged." },
  "Revelation 2:16": { index: 3, text: "That is why the call to repent is urgent mercy: Christ would rather correct His church now than oppose it in judgment later, when all is exposed." },
  "Revelation 2:17": { index: 3, text: "The promise also personalizes victory. The overcomer is not swallowed into a faceless crowd, but named, fed, welcomed, and remembered by Christ in intimate covenant fellowship forever with God." },
  "Revelation 2:19": { index: 3, text: "The verse asks for integrated faithfulness, where growing service is matched by growing discernment before Christ." },
  "Revelation 2:21": { index: 3, text: "Repentance must be embraced while mercy is still calling, because delayed obedience can slowly harden into settled refusal before God, without tenderness, surrender, or holy fear." },
  "Revelation 2:22": { index: 3, text: "The severity of the warning should make the reader careful, not sensational. Christ speaks this way because corrupted worship destroys the people He loves and purchased by His own blood." },
  "Revelation 2:23": { index: 3, text: "This makes the verse both personal and corporate: Christ judges systems, but He also searches the individual heart within them, with perfect knowledge and righteous mercy held together before all the churches." },
  "Revelation 2:24": { index: 3, text: "It is enough to remain faithful to the light Christ has given, even when louder voices boast of superior insight, secret knowledge, and religious influence." },
  "Revelation 2:25": { index: 3, text: "Holding fast is therefore active trust: refusing false depth, guarding received truth, and waiting for Christ's appearing with steady hope, patience, courage, and watchful prayerfulness before God." },
  "Revelation 2:26": { index: 3, text: "The promise trains the church to wait for Christ's kingdom rather than imitate the coercive methods of corrupt power in any age." },
  "Revelation 2:27": { index: 3, text: "Such hope steadies the faithful without authorizing them to practice the domination from which Christ will finally deliver the whole world." },
  "Revelation 2:28": { index: 3, text: "The reward is not merely future light, but fellowship with the One who is already the light of His people." },
  "Revelation 2:29": { index: 3, text: "Hearing is complete only when the message becomes obedience, courage, repentance, and renewed allegiance in the present before Christ and His Spirit." }
};

function enrichParagraphs(reference, paragraphs) {
  const next = paragraphs.map(normalizePublicText);
  for (const detail of verseDetails[reference] ?? []) {
    if (!next[detail.index].includes(detail.text)) {
      next[detail.index] = `${next[detail.index]} ${detail.text}`;
    }
  }
  const depth = depthSentences[reference];
  if (depth && wordCount(next.join("\n\n")) < 300 && !next[depth.index].includes(depth.text)) {
    next[depth.index] = `${next[depth.index]} ${depth.text}`;
  }
  return next.map(normalizePublicText);
}

const commentary = {
  "Revelation 2:1": [
    "Christ opens the message to Ephesus by identifying Himself as the One who holds the seven stars and walks among the seven golden lampstands. The church is not left to manage its witness without Him. Its messengers are held in His hand, and its light is examined by His presence. This makes the message both comforting and searching: Christ is near enough to sustain the church and near enough to correct it.",
    "Ephesus was a major city of commerce, religion, and public influence, famous for the worship of Artemis and surrounded by the pressures of pagan civic life. The lampstand image reaches back to the sanctuary and to the calling of God's people to bear light. Christ walking among the lampstands presents Him as the living Lord of the churches, moving in priestly care among His people and measuring their witness by heaven's standard.",
    "In the broader historicist reading, Ephesus fittingly represents the apostolic and immediately post-apostolic church. It was close to the original fire of the gospel, rich in truth, active in mission, and serious about guarding the faith. Yet the very fact that Christ begins with His own presence shows that no period of church history can live on reputation, memory, or doctrinal inheritance apart from continual fellowship with Him.",
    "The verse calls every congregation to remember that Christ owns the church before leaders, institutions, or traditions do. He holds His servants, walks among His people, and knows whether the light is burning from love or merely from habit. The right response is reverent confidence: the church can labor boldly because Christ is present, but it must also remain humble because the same Christ searches what His people have become."
  ],
  "Revelation 2:2": [
    "Christ begins His diagnosis of Ephesus with generous commendation. He knows the church's works, labor, patience, moral seriousness, and refusal to accept false apostles. The praise is not shallow. Ephesus had carried real responsibility, tested claims to spiritual authority, and resisted evil. Christ honors that faithfulness before He gives correction, showing that His rebukes never erase what His grace has truly produced.",
    "The language recalls the kind of danger Paul warned about when he spoke to the Ephesian elders: destructive influences would arise from outside and from within the flock. The issue in this verse is not suspicion for its own sake, but spiritual discernment. Apostolic truth had to be guarded because the church's witness depended on the gospel remaining clear, holy, and faithful to Christ rather than reshaped by persuasive impostors.",
    "Historically, Ephesus reflects the early church's strength in defending truth after the apostolic age. The passage presents a church energetic in mission and alert to doctrinal danger, yet already moving toward the danger named in the next verses. The commendation is therefore real, but incomplete. The church can test false apostles and still need Christ to test its own heart.",
    "This verse keeps Christian love from becoming careless and Christian doctrine from becoming cold. Believers are not asked to tolerate evil in the name of kindness, nor to defend truth in a spirit unlike Christ. Ephesus teaches that discernment is a duty, but discernment must remain under the Lord who knows the works, motives, endurance, and love of His people more accurately than they know themselves."
  ],
  "Revelation 2:3": [
    "Ephesus had borne hardship for Christ's name and had not fainted. The church's endurance was not imaginary or merely official. It had carried burdens, persevered under pressure, and continued for the sake of Jesus. Yet this praise stands next to the rebuke about lost love, which means perseverance alone does not settle the health of a church. Endurance must remain joined to affection for Christ.",
    "The Ephesian setting helps explain why such endurance mattered. To confess Christ in a city shaped by public religion, commercial interests, and civic pride required courage. The church could not simply blend into its environment without losing its lampstand character. Faithfulness in that world meant refusing easier loyalties while continuing to bear light where the name of Christ carried social and spiritual cost.",
    "In the broad movement of church history, Ephesus represents the early church after the apostolic foundation: active, disciplined, doctrinally watchful, and willing to suffer. The danger is subtle. A church can continue laboring for the name of Christ while the warmth of first love begins to fade. Historicist application should not make the message distant; it shows how quickly even a faithful movement must return to living devotion.",
    "The verse asks whether our endurance still springs from love. It is possible to keep going because of duty, identity, habit, or argument, while the heart is no longer tender toward Christ. Jesus does not despise endurance; He praises it. But He also calls His people to a deeper wholeness, where labor for His name is carried by worship, gratitude, humility, and love that has not grown tired of Him."
  ],
  "Revelation 2:4": [
    "The rebuke comes with painful clarity: Ephesus has left its first love. Christ does not say the church has lost all truth, abandoned all work, or surrendered all discipline. The problem is deeper and more personal. The love that once animated obedience has cooled. The church is still active, but something essential has been left behind in the life of the heart.",
    "The phrase first love suggests the early devotion of a people newly awakened to grace. Scripture often describes God's covenant relationship with His people in relational language, including the tenderness of bridal love and the grief of love grown cold. Revelation is not treating love as sentimentality. Love is the living center that makes labor, patience, correction, worship, and witness genuinely Christian.",
    "In the historicist picture, this rebuke fits the early church as it moved beyond the apostolic generation. The church remained strong in truth and active in mission, but the freshness of devotion was in danger. That reading is sobering because decline does not always begin with open apostasy. Sometimes it begins when faithful forms remain in place while the heart loses its first warmth toward Christ.",
    "The verse speaks directly to serious believers and serious churches. It is possible to defend the right things and yet lose the spirit that made those things beautiful. Christ names the loss because He wants restoration, not shame. The remedy begins by allowing Him to tell the truth about our love. Where love has cooled, the Savior who walks among the lampstands still calls His people back."
  ],
  "Revelation 2:5": [
    "Christ gives Ephesus a threefold remedy: remember, repent, and do the first works. The command begins with memory because spiritual recovery often starts by seeing what has changed. The church must remember the height from which it has fallen, not to despair, but to recognize that love once burned more brightly. Repentance is then more than regret; it is a return to the life Christ intended.",
    "The warning about removing the lampstand shows how serious the loss of love is. A lampstand exists to bear light, and a church whose love has gone cold is in danger of losing its witness even if its structures remain. Christ does not threaten the church because He is impatient. He warns because witness without living devotion eventually becomes a contradiction of the very gospel it claims to defend.",
    "As a picture of the apostolic and post-apostolic church, Ephesus teaches that no community keeps its lampstand by history alone. Early zeal, doctrinal clarity, and missionary labor must be renewed by repentance. The point reaches the conscience: every generation must ask whether it is living from present communion with Christ or merely preserving the memory of a once-living movement.",
    "The verse gives hope because Christ's command is also a pathway. He does not say the first love is unrecoverable. He calls the church to remember what grace once did, turn from loveless religion, and practice again the works that flowed from love. For believers today, the appeal is practical: return to prayer, humility, service, witness, obedience, and simple delight in Christ before the lamp grows dim."
  ],
  "Revelation 2:6": [
    "Christ adds one more commendation: Ephesus hates the deeds of the Nicolaitanes, which He also hates. The verse matters because it shows that love restored by Christ is not moral softness. The issue is not hatred of people, but hatred of deeds that corrupt the gospel. Ephesus is praised for refusing a form of compromise that tried to separate Christian profession from holy obedience.",
    "The Nicolaitanes are difficult to identify in every historical detail, but the manuscript tradition treats their error as a practical abuse of grace. The danger was the idea that bodily conduct and moral compromise could be detached from salvation and discipleship. Revelation later pairs similar compromise with idolatry and immorality, showing that false teaching becomes destructive when it trains believers to excuse sin.",
    "Within the Ephesus period, the rejection of the Nicolaitanes fits a church still alert to doctrinal and moral danger. Historicist application sees the early church resisting corruptions that would later become more tolerated in Pergamos and Thyatira. The verse therefore functions like a warning sign: what Ephesus rightly hated, later churches would be tempted to accommodate. Compromise rarely arrives all at once.",
    "This verse gives a needed balance. Christ calls Ephesus back to first love, but He does not ask it to become tolerant of sin. True love hates what destroys communion with God. At the same time, the church must hate Nicolaitan deeds without becoming proud or harsh. The goal is holiness joined to humility, grace joined to obedience, and a witness that reflects the mind of Christ."
  ],
  "Revelation 2:7": [
    "The message closes by widening the appeal: whoever has an ear must hear what the Spirit says to the churches. Ephesus is not the only audience. The Spirit takes Christ's word to one congregation and makes it living instruction for all. The promise is given to the overcomer: access to the tree of life in the paradise of God. The lost love of Ephesus is answered with restored life.",
    "The tree of life carries the reader from Eden to the New Jerusalem. Humanity was barred from the tree after sin, but Revelation promises restored access through Christ. The image is not merely survival after death; it is communion with God made whole again. Paradise is the final answer to a church whose lampstand is threatened. Christ offers not only correction, but the fullness of life with God.",
    "In the broad historicist view, the promise to Ephesus speaks to the early church and to every later believer who must overcome loveless religion. The Spirit's appeal also shows that the seven churches are more than local letters. They form a prophetic and pastoral pattern for the church until the end, calling every age to hear, repent, persevere, and receive what Christ promises.",
    "Revelation brings the promise down into lived obedience. The blessing is not for those who merely admire the symbols, but for those who hear and overcome. Ephesus must recover love; the reader must do the same wherever truth has become cold or service lifeless. The reward is not abstract. Christ promises restored access to the life humanity lost, and He begins that restoration now by calling His people back to Himself."
  ],
  "Revelation 2:8": [
    "Smyrna receives Christ's message through a title fitted exactly to its suffering: He is the First and the Last, the One who was dead and is alive. A church facing pressure, poverty, slander, prison, and possible death needs more than encouragement from a distant teacher. It needs the risen Lord. Christ speaks as the One who has already passed through death and stands beyond it.",
    "Smyrna was a proud and prosperous city with strong loyalty to Rome. That public loyalty made Christian refusal to worship according to civic expectations costly. The church may have looked weak in the city, but the title of Christ changes the frame. The First and the Last is not threatened by imperial power. The One who lives after death can speak peace to believers whose earthly lives are at risk.",
    "Within the flow of church history, Smyrna represents the persecuted church under pagan Rome, commonly associated with the period of severe opposition before Christianity received imperial favor. The local congregation was real, but its experience becomes a window into a wider era when believers were pressed by poverty, accusation, imprisonment, and martyrdom. Christ gives that history its center by presenting Himself as resurrection life.",
    "The verse teaches suffering believers where to look first. The church's courage does not come from denying danger, but from seeing Christ more clearly than danger. He is before every empire and after every grave. For personal faith, Smyrna says that the Lord who asks endurance is not untouched by death. He has entered it, conquered it, and now speaks hope to His people from the other side."
  ],
  "Revelation 2:9": [
    "Christ tells Smyrna, 'I know.' He knows its works, tribulation, poverty, and the slander directed against it. Then He overturns appearances with the words, 'but thou art rich.' The church may be poor in the public economy of Smyrna, but Christ sees riches the city cannot measure. This is one of Revelation's great reversals: heaven's estimate of a church may differ completely from earth's.",
    "The phrase 'synagogue of Satan' must be handled with care. Revelation is not giving permission for contempt toward Jewish people. The issue is hostile opposition to Christ and His witnesses from those claiming covenant identity while resisting the testimony of Jesus. The language is severe because allegiance is severe. Religious vocabulary does not make a community faithful if its actions serve accusation, slander, and persecution.",
    "Historically, Smyrna's poverty and suffering match the persecuted church in the early centuries. Adventist exposition sees this period as materially vulnerable but spiritually rich, because faithfulness under pressure revealed a treasure deeper than security. The church had no worldly advantage to boast in, yet Christ's recognition made it rich. That matters because Revelation repeatedly measures reality from the throne, not from public status.",
    "The verse comforts afflicted believers and corrects comfortable ones. Poverty, loss, and slander are not proof that Christ has forgotten His people. At the same time, wealth and reputation are not proof of spiritual health. The question is not what the city sees, but what Christ knows. Smyrna invites the church to seek the riches of faithfulness, endurance, courage, and a conscience held before God."
  ],
  "Revelation 2:10": [
    "Christ does not hide the coming trial from Smyrna. The church is told not to fear what it is about to suffer: prison, testing, tribulation, and even death may come. Yet the warning is held inside a promise. The devil may act through earthly powers, but the trial is measured. Christ commands faithfulness unto death and promises the crown of life.",
    "The 'ten days' have been understood in this church-history reading as pointing to a limited period of severe persecution, often connected with the Diocletian persecution from A.D. 303 to 313. The detail should be treated carefully, but its theological force is clear: the suffering of God's people is not endless, accidental, or outside divine knowledge. The enemy tests; Christ bounds the test and promises life.",
    "Smyrna's place in the larger church-history sequence is the persecuted church under pagan Rome. Unlike Ephesus, Smyrna receives no rebuke. Its danger is not lost love through doctrinal busyness, but fear under pressure. The crown offered here is not a fragile earthly honor. It is the victor's wreath of life, granted by the Lord who was dead and is alive.",
    "This verse prepares believers for faithfulness without romanticizing suffering. Christ does not say that disciples should seek pain, but He does say they must not fear it above Him. Courage is not loud confidence in oneself; it is trust in the risen Christ when the cost becomes real. Smyrna teaches that death is not the final threat for those who receive life from Jesus."
  ],
  "Revelation 2:11": [
    "Again the Spirit calls everyone with ears to hear. The promise is direct: the one who overcomes will not be hurt by the second death. Smyrna may face the first death through persecution, but final destruction has no claim on those who belong to Christ. The verse answers fear with a larger horizon. Death itself must be interpreted in light of resurrection and judgment.",
    "The second death appears later in Revelation in connection with final judgment and the lake of fire. That background clarifies the promise. Christ is not saying His people will never suffer physically. He is saying that ultimate death, the death from which there is no return, cannot destroy the faithful. The risen Lord distinguishes between what persecutors can do and what only God finally determines.",
    "In the historicist movement of the seven churches, Smyrna shows the church under persecution, yet spiritually rich and ultimately secure. The promise not to be hurt by the second death is therefore a word for martyrs, prisoners, the slandered, and the poor. It declares that persecuting powers do not have the last word. Christ's victory over death governs the destiny of His people.",
    "The force of the promise is profound. Believers are not asked to pretend that suffering does not hurt. They are invited to fear final separation from God more than temporal loss, and to trust Christ with what they cannot preserve by their own strength. Smyrna teaches that the safest life is not the easiest one, but the life hidden in the Savior who has already conquered the grave."
  ],
  "Revelation 2:12": [
    "Pergamos is addressed by Christ as the One who has the sharp sword with two edges. The title is not accidental. This church faces the danger of compromise, and it needs the searching, dividing, judging word of Christ. The sword from His mouth is His authority to expose mixed loyalties, defend His truth, and confront teaching that would make peace with idolatry.",
    "Pergamos was a city where political power, religious prestige, and imperial loyalty were highly visible. Its setting made allegiance a daily question. A believer could not confess Christ in such a place without feeling the pull of civic religion and public expectation. The sword image therefore stands against every rival claim. Christ, not Rome, not local cults, and not social convenience, has the final word.",
    "In the broad historicist sequence, Pergamos represents the period when the church moved from persecution into favor and compromise. After the age represented by Smyrna, the danger shifted. Open hostility did not disappear, but worldly acceptance became spiritually dangerous. The sword of Christ addresses a church that may still confess His name while learning to live too comfortably with the powers around it.",
    "The verse warns that compromise often needs to be cut away before it feels deadly. The word of Christ may seem severe when it confronts accepted habits, but that severity is mercy. A church living in a pressured world needs more than diplomacy; it needs truth from the Lord's own mouth. The faithful response is to let His word judge our alliances before our alliances reshape our faith."
  ],
  "Revelation 2:13": [
    "Christ knows where Pergamos dwells: where Satan's seat is. The statement recognizes the spiritual pressure surrounding the church. Yet Christ also commends the believers because they hold fast His name and have not denied His faith, even in the days of Antipas, His faithful martyr. The verse is both realistic and tender. Jesus sees the danger, the courage, and the cost.",
    "The exact referent of Satan's seat has been debated, but Pergamos was marked by imperial worship and prominent pagan religious life. The phrase points to concentrated opposition to God's rule. Antipas, though historically obscure, is unforgettable to Christ. He is called a faithful witness, language that echoes Christ Himself. Revelation dignifies hidden faithfulness by placing it within the testimony of Jesus.",
    "Historically, Pergamos fits the church's transition into a period where political favor and religious compromise became increasingly intertwined. Yet even in that setting Christ recognizes genuine loyalty. The historicist application should not flatten the verse into mere decline. There were believers who held fast, and there were witnesses who suffered. Christ's knowledge includes both the church's danger and its courage.",
    "This verse is especially pastoral for believers who feel surrounded by pressure. Christ does not underestimate where His people live. He knows the workplace, the city, the family, the culture, and the powers that make faithfulness costly. He also remembers names that history forgets. Antipas reminds the church that no faithful witness is small when seen by Jesus, and no hostile environment is unknown to Him."
  ],
  "Revelation 2:14": [
    "Christ's rebuke begins with the doctrine of Balaam. Pergamos has some who teach compromise, leading God's people toward idolatrous participation and immorality. The issue is not that the whole church has apostatized, but that tolerated teaching has been allowed to remain. Christ's concern is covenant loyalty. A church can hold His name in one breath and permit spiritual seduction in the next.",
    "Balaam recalls the Old Testament story in which Israel was weakened not by direct military defeat but by seduction into idolatry and immoral compromise. Revelation uses that memory to expose a recurring strategy of evil: when open opposition fails, corruption from within can succeed. Food offered to idols and fornication are not random sins here. They represent participation in worship and life that contradicts allegiance to God.",
    "In the historicist reading, Pergamos points to the era when the church's relationship to worldly power changed dramatically. The Balaam pattern becomes a way of describing church-world union, where spiritual authority is compromised by political advantage and pagan elements are absorbed rather than resisted. This prepares for later Revelation themes in which false worship, worldly power, and religious corruption grow into larger systems.",
    "The verse presses a searching question: what has the church learned to tolerate because it seems useful, popular, or unavoidable? Christ's rebuke is not aimed at making His people narrow for narrowness' sake. It is aimed at preserving worship. The danger of Balaam is that compromise can feel practical while quietly training the heart away from God. Faithfulness means refusing gains that require disloyalty."
  ],
  "Revelation 2:15": [
    "Christ connects the doctrine of the Nicolaitanes with the compromise already described through Balaam. What Ephesus hated, Pergamos has begun to tolerate. This contrast is important. The same error that is resisted in one period can become acceptable in another when the church's circumstances change. Pergamos shows how compromise can mature when moral and doctrinal vigilance weakens under the pressure of advantage.",
    "The Nicolaitan problem is best understood as a distortion of grace that separates Christian profession from obedient living. In Pergamos, this distortion appears alongside idolatrous accommodation. The issue is not only private morality, but worship and allegiance. Revelation does not allow the believer to divide the body from the soul, public life from faith, or doctrine from practice. Christ hates the deeds because they damage people He loves.",
    "As a church-history symbol, Pergamos represents the period when compromise became more attractive after persecution lessened and imperial favor increased. The doctrine of the Nicolaitanes fits that movement because it offers a religious explanation for accommodation. Instead of calling the church to bear witness against idolatry, it makes room for idolatry inside Christian profession. That is why Christ's warning becomes sharper.",
    "This verse speaks to every age in which believers are tempted to rename compromise as maturity, realism, or freedom. Grace is never permission to loosen allegiance to Christ. The church must reject teachings that make obedience optional while still extending mercy to people caught in confusion. Christ's hatred of the doctrine is the hatred of a Savior who refuses to let false grace destroy holy love."
  ],
  "Revelation 2:16": [
    "The command is simple and urgent: repent. Pergamos must not merely identify the problem; it must turn from tolerating it. If the church refuses, Christ says He will come quickly and fight against the corrupters with the sword of His mouth. The same word that comforts the faithful also judges compromise. Christ will not leave destructive teaching unchallenged among His people.",
    "The sword of Christ's mouth is His authoritative word. It exposes, separates, and judges. Pergamos may have known the power of Rome's sword, but Revelation insists that Christ's word is higher than every earthly tribunal. His judgment is not arbitrary violence. It is the holy action of the Lord who protects His church from teachings that would make peace with idolatry and sin.",
    "In the historicist movement, this warning fits the age of increasing church-world compromise. The issue is not merely ancient Balaam or one local group in Pergamos. It is the recurring danger that the church may prefer peace with power over purity before Christ. The Lord's quick coming in judgment within the message anticipates the larger judgments Revelation will later unfold against false worship.",
    "The lesson is that repentance is mercy while there is still time. Christ warns Pergamos so that the church does not have to meet Him as an opponent. The word that wounds compromise also heals the repentant. Churches and believers should therefore let Scripture correct tolerated sins early, before those sins become defended habits. The safest place is always under Christ's word, not against it."
  ],
  "Revelation 2:17": [
    "The promise to the overcomer in Pergamos is rich: hidden manna, a white stone, and a new name known by the receiver. These gifts answer the temptations of compromise. Those who refuse idolatrous meals receive nourishment from God. Those judged by society receive Christ's vindication. Those pressured to belong elsewhere receive an identity given by the Lord Himself.",
    "The hidden manna recalls God's provision in the wilderness and points to Christ as the true bread from heaven. The white stone may suggest acquittal, admission, victory, or acceptance, but the direction is clear: Christ publicly and personally receives the faithful. The new name speaks of transformed identity and intimate knowledge. Pergamos is offered something deeper than the privileges compromise promised.",
    "Historically, the promise speaks to believers living in an age when the church was tempted by power, status, and worldly security. The overcomer does not conquer by seizing those things, but by receiving what Christ gives. In this reading, the white stone also harmonizes with judgment themes: Christ's verdict matters more than the verdict of culture, empire, or compromised religion.",
    "This verse turns the heart from fear of missing out to confidence in Christ's reward. Compromise always offers visible benefits now: acceptance, access, pleasure, and ease. Christ offers hidden manna, a new name, and divine approval. The believer must decide which table, which verdict, and which identity are worth having. The promise assures the faithful that nothing surrendered for Christ is finally lost."
  ],
  "Revelation 2:18": [
    "The message to Thyatira begins with a striking title: the Son of God, whose eyes are like a flame of fire and whose feet are like fine brass. Christ presents Himself as the One who sees through appearances and stands with unshakable authority. This church will hear both commendation and severe rebuke, so it needs to know that the speaker is not merely a prophet but the divine Son.",
    "Thyatira was less politically famous than some other cities, but it was shaped by trade guilds and economic networks. Participation in guild life could involve feasts, patron deities, and social pressures that made compromise seem necessary for ordinary livelihood. Christ's flaming eyes matter in such a setting. He sees what may be hidden under practicality, custom, spiritual language, or economic necessity.",
    "Within the flow of church history, Thyatira represents the long medieval period, when the visible church entered deep corruption while faithful believers continued to exist within and beyond its structures. The title 'Son of God' is especially fitting because the authority of Christ stands above all human religious claims. His feet like brass suggest firmness: He will not be moved by the systems He judges.",
    "The verse teaches that Christ's knowledge is both warning and comfort. He sees corruption clearly, but He also sees hidden faithfulness clearly. His eyes are fire, not because He is cruel, but because love and holiness cannot ignore what destroys the church. For believers, the safest response is openness before Him. Nothing concealed from others is concealed from Christ, and nothing faithful is forgotten by Him."
  ],
  "Revelation 2:19": [
    "Christ commends Thyatira for works, charity, service, faith, patience, and increasing labor. This is not a spiritually inactive church. In fact, its last works are more than the first. The praise is significant because the severe rebuke that follows must not erase what Christ genuinely values. He sees love and service even in a setting where dangerous compromise has also taken root.",
    "The combination of charity, service, faith, and patience gives Thyatira a different profile from Ephesus. Ephesus was strong in testing error but had left first love. Thyatira shows much love and service, yet tolerates corrupt teaching. The contrast is deliberate. Revelation does not let one virtue cancel another. Churches need truth and love, discernment and service, endurance and purity, all held together under Christ.",
    "Within the historicist sequence, Thyatira points to the medieval period, a long era in which This reading sees serious religious corruption alongside sincere faith and persevering service among God's people. The verse keeps that reading from becoming simplistic. Christ does not paint the whole period in one color. He recognizes genuine devotion and growing works even while preparing to expose Jezebel-like influence.",
    "The lesson is generous and sobering. Christ's rebuke is never blind to what is good, and His praise is never blind to what is dangerous. A church may be active in love and still need correction in doctrine and worship. A believer may grow in service and still need Christ to search hidden tolerances. The call is not to choose between love and truth, but to receive both from Him."
  ],
  "Revelation 2:20": [
    "Christ's rebuke centers on toleration: Thyatira allows a woman symbolically called Jezebel to teach and seduce His servants into fornication and idolatrous eating. The issue is not merely that false teaching exists, but that the church permits it. Jezebel represents religious influence that claims authority while leading God's people away from covenant loyalty and into spiritual adultery.",
    "The name Jezebel reaches back to the Old Testament queen who promoted Baal worship, opposed God's prophets, and joined corrupt worship with royal power. Revelation uses that memory to describe a similar spiritual pattern. The language of fornication is not only sexual; it is also covenantal and religious. It points to illicit union between God's professed people and forms of worship or power that betray Him.",
    "Within the flow of church history, Thyatira represents the medieval church, where papal dominance, corrupt worship, persecution, and church-state union are seen as fulfilling this Jezebel pattern. The connection with later Babylon imagery is important: Revelation repeatedly portrays false religion as spiritual adultery when it joins itself to worldly power and draws people away from true worship.",
    "The verse warns that tolerance is not always love. To allow teaching that destroys allegiance to Christ is to endanger the servants of Christ. Yet the warning should be received with humility rather than cruelty. The point is not to hunt for enemies, but to refuse every influence that makes disobedience sound spiritual. Christ loves His church enough to confront what His church has learned to permit."
  ],
  "Revelation 2:21": [
    "Christ says He gave Jezebel time to repent, but she did not repent. This sentence reveals the patience of God even in severe judgment passages. The false influence in Thyatira is not struck down without warning. Space for repentance was given. The tragedy is that mercy was refused. Revelation's judgments are therefore not impulsive reactions, but responses to persistent rejection of grace.",
    "The language of fornication continues the covenant imagery of the previous verse. Spiritual adultery is not treated lightly because worship is never a small matter in Revelation. To give allegiance, trust, and obedience to a corrupt system is to betray the Lord who redeemed His people. Yet even here Christ's first movement is patience. He gives time for repentance before judgment falls.",
    "Within the historicist view of Thyatira, this verse fits the long period in which calls to reform and return were given amid deepening corruption. This reading sees God's patience operating even through centuries of religious darkness. The issue is not that God delights in judgment, but that entrenched systems and hardened hearts may refuse the very mercy that would have saved them.",
    "The force of the promise is simple and serious: delayed judgment is not approval. Time to repent is a gift, but it can be wasted. A church, leader, or believer should never mistake God's patience for indifference. When Christ exposes sin, the safest response is immediate repentance. Mercy becomes dangerous only when it is treated as permission to continue in what Christ has called us to leave."
  ],
  "Revelation 2:22": [
    "The warning intensifies: Jezebel is cast into a bed, and those who commit adultery with her face great tribulation unless they repent of their deeds. The image turns the place of sin into a place of judgment. What was chosen as compromise becomes the setting of consequence. Christ's warning is severe because the seduction is severe and because His servants are being harmed.",
    "The adultery in this passage is covenantal and spiritual, though it may include literal immorality as part of idolatrous practice. Revelation often uses the language of sexual unfaithfulness to describe false worship and unholy alliance. Those who share Jezebel's compromise share her danger, but the verse still includes mercy: 'except they repent.' Even in warning, Christ leaves the door of repentance open.",
    "In the historicist reading, Thyatira's Jezebel imagery points to the corrupting union of church and worldly power during the medieval period. Great tribulation naturally recalls the suffering produced by false religion and the judgments that fall upon it. The point is not fascination with punishment, but moral clarity. Systems that seduce people away from Christ will not endure unjudged.",
    "This verse teaches that repentance is not optional when worship has been corrupted. Christ does not ask His people merely to feel sorry about compromise; He calls them to repent of their deeds. The call is searching: whatever has become a place of spiritual unfaithfulness must be surrendered to Him. His warning is meant to rescue, not merely to condemn, those who still may turn."
  ],
  "Revelation 2:23": [
    "Christ declares that He will judge Jezebel's children and that all the churches will know He searches the reins and hearts. He will give to everyone according to works. The verse reveals the depth of Christ's knowledge. He does not judge by appearance, influence, title, or religious claim. He sees the inner life, the motives, the loyalties, and the fruit that flows from them.",
    "The language of searching hearts echoes the Old Testament witness that God knows the inward person and renders judgment righteously. Revelation is not teaching salvation by human merit; it is showing that works reveal allegiance. In a letter about false teaching and spiritual adultery, deeds matter because they disclose whether a person is loyal to Christ or has joined the corrupting influence He condemns.",
    "Historically, this verse gives the Thyatira period a judgment dimension. This reading sees medieval corruption not merely as institutional failure, but as a spiritual system answerable to Christ. The Lord's judgment also vindicates the faithful remnant who may have seemed powerless. All the churches are meant to learn from Thyatira that Christ's patience does not cancel His searching justice.",
    "The lesson is that hidden things are not hidden from Jesus. This should sober the compromising and comfort the faithful. If our works reveal divided allegiance, Christ calls us to repentance. If our loyalty is misunderstood or unseen, Christ knows that too. The verse invites believers to live transparently before the One whose judgment is perfect, whose knowledge is complete, and whose purpose is restoration."
  ],
  "Revelation 2:24": [
    "Christ turns from Jezebel and her followers to 'the rest in Thyatira,' those who do not have this doctrine and have not known the so-called depths of Satan. The verse distinguishes the faithful from the corrupting influence around them. Christ does not treat the whole church as identical with its worst teaching. He knows the remnant who refuse compromise.",
    "The phrase 'depths of Satan' likely responds to claims of deeper spiritual knowledge. False teaching often presents itself as maturity, freedom, or advanced insight. Christ unmasks it. What is advertised as depth may actually be satanic deception if it trains people to make peace with idolatry. The faithful in Thyatira are not blamed for lacking such knowledge; they are commended for refusing it.",
    "Within the flow of church history, this faithful rest in Thyatira points to believers who resisted medieval corruption, including remnant communities and reforming witnesses who held to Scripture and conscience under pressure. The verse is important because it prevents a careless reading of history. Even in dark periods, Christ has people who belong to Him and who do not share the sins of dominant systems.",
    "The promise 'I will put upon you none other burden' is pastoral. Christ does not crush the faithful with unnecessary demands. In times of confusion, the call may become beautifully simple: refuse the false depth, hold to the truth already given, and remain loyal to Christ. The verse comforts believers who feel surrounded by compromise. Jesus knows the difference between the seducers and those who resist."
  ],
  "Revelation 2:25": [
    "Christ gives the faithful in Thyatira a concise command: hold fast what you already have until He comes. The instruction is not elaborate, but it is deeply meaningful. In a setting of corruption, pressure, and false depth, the faithful are not told to chase novelty. They are told to cling to the truth, faith, love, and obedience already entrusted to them.",
    "The words 'till I come' place the message inside Revelation's larger hope. The church's endurance is not endless wandering; it has a horizon. Christ will come. Until then, faithfulness may look like patient refusal to surrender what has been received. Holding fast is not passive. It requires memory, courage, worship, obedience, and a willingness to remain separate from what Christ has judged.",
    "In the historicist view, this command speaks powerfully to the faithful during the long medieval period and beyond. This reading sees the remnant in dark times as preserving light under difficulty. The command also stretches to the final church, because Revelation repeatedly calls God's people to endurance until the appearing of Christ. The same Lord who searches hearts also sustains those who hold fast.",
    "The pastoral value of the verse is its simplicity. Not every season calls for a new strategy. Sometimes Christ's command is to keep what He has already given: Scripture, faith, prayer, obedience, purity, and hope. The believer who feels surrounded by confusion can take courage. Christ does not ask His people to carry every burden, but He does ask them not to let go."
  ],
  "Revelation 2:26": [
    "Christ promises authority over the nations to the one who overcomes and keeps His works unto the end. The wording joins perseverance and obedience. The overcomer is not merely someone who begins well, but one who continues in Christ's works until the end. The promise is royal, but it is given to those who have refused the false routes to power offered by compromise.",
    "This promise answers Thyatira's setting. False religion joined to worldly power may appear to rule now, but Christ says final authority will be shared with His faithful people. The saints do not gain the nations by becoming like Jezebel or by grasping present control. They receive authority from Christ. Revelation's vision of rule is therefore rooted in endurance, purity, and fellowship with the Son of God.",
    "Within the flow of church history, Thyatira points to an era when persecuting powers seemed dominant and faithful believers often appeared weak. The promise reverses that appearance. Those who kept Christ's works through long pressure will share in His final reign and judgment. This harmonizes with Revelation's larger teaching that the saints overcome not by worldly domination, but by faithful witness and union with Christ.",
    "The verse warns against impatience with God's way of victory. Compromise often promises influence now; Christ promises authority in His time. The believer must decide whether to seek power through accommodation or receive it as a gift from the Lord. Keeping Christ's works unto the end means that obedience is not temporary enthusiasm. It is sustained loyalty, formed by trust that His reward is better."
  ],
  "Revelation 2:27": [
    "The promise continues with language from Psalm 2: the overcomer will rule with a rod of iron, and opposing powers will be broken like pottery. This is not a call for the church to become violent or coercive in the present. It is a promise that Christ's final authority will be shared with His faithful people when He brings rebellious power to its end.",
    "The rod of iron belongs first to the Messiah. Revelation applies the promise to the overcomer only because believers share in Christ's victory. The image of shattered pottery emphasizes the fragility of powers that seem permanent. Empires, false systems, and persecuting authorities may appear strong, but before the rule of Christ they are as breakable as clay vessels in a potter's hands.",
    "For Thyatira, this promise is especially fitting. In the historicist reading, the faithful remnant endured under religious and political systems that claimed authority over conscience. Christ assures them that final rule belongs not to corrupt power, but to the Son of God and to those united with Him. The persecuted do not need to seize revenge; they can trust the justice of Christ.",
    "The verse should produce hope rather than harshness. The church is not authorized to dominate others in Christ's name. It is called to overcome through faithfulness until He judges rightly. Believers who suffer under unjust power can take courage: no oppressive system is ultimate. The Lord who received authority from the Father will share His victory with those who keep His works to the end."
  ],
  "Revelation 2:28": [
    "Christ adds a tender promise: 'I will give him the morning star.' After the language of authority over the nations, the reward becomes personal and radiant. The morning star points to Christ Himself, the light that announces the coming day. The faithful are not promised only a role in judgment or rule. They are promised the presence and gift of Jesus.",
    "The image of the morning star draws on the transition from night to dawn. For Thyatira, this matters deeply. The church associated with a long period of darkness receives a promise of light. The faithful who hold fast through corruption, pressure, and hidden suffering are assured that night will not have the final word. Christ gives Himself as the pledge of the coming morning.",
    "Within the flow of church history, the promise fits the experience of believers who preserved faith through the long medieval period and looked toward renewed light. It also reaches beyond that period to all who overcome. Prophetic history is not merely a sequence of decline and correction; it is moving toward the appearing of Christ, whose presence is better than every counterfeit light offered by false worship.",
    "This verse makes the Christian hope personal. The greatest reward is not power, knowledge, or vindication by itself, but Christ. When believers are tempted to grow weary in a dark age or a difficult church, the morning star promises that Jesus is near and the day is coming. To receive Him is to receive the beginning of the final dawn even before the night has fully passed."
  ],
  "Revelation 2:29": [
    "The chapter closes with the familiar appeal: whoever has an ear must hear what the Spirit says to the churches. The message to Thyatira is not locked in the past. The Spirit takes Christ's words about love, service, Jezebel, repentance, endurance, and reward and presses them upon every church. Hearing in Revelation is never mere listening. It is receptive obedience.",
    "The plural 'churches' matters. Each message is addressed to one congregation, yet all seven churches must hear every message. Ephesus needs love, Smyrna needs courage, Pergamos needs separation from compromise, and Thyatira needs purity joined to endurance. The Spirit forms the whole church by making each local message a mirror for all. No church is allowed to say, 'This does not concern us.'",
    "In the historicist sequence, Revelation 2 has moved from the apostolic church to persecution, compromise, and medieval corruption with remnant faithfulness. Yet the closing appeal keeps the prophecy pastoral. These are not merely labels for periods of history. They are living messages from Christ through the Spirit, calling His people in every age to overcome in the particular dangers they face.",
    "The final verse asks the reader to become a hearer. It is possible to study the seven churches as history and miss the Spirit's present appeal. Christ's purpose is deeper than information. He wants love restored, courage strengthened, compromise rejected, faithfulness preserved, and hope fixed on His coming. The right response is humble listening that becomes repentance, endurance, worship, and renewed loyalty to Jesus."
  ]
};

function note(term, explanation, scriptureReferences) {
  return { term, explanation, scriptureReferences };
}

const wordNotesByVerse = {
  "Revelation 2:1": [
    note("Angel", "The messenger of the church, addressed as the representative through whom Christ speaks to the congregation.", ["Revelation 1:20", "Malachi 2:7", "Hebrews 1:14"]),
    note("Ephesus", "A leading city of Asia where the gospel confronted Artemis worship, public magic, and later the danger of loveless orthodoxy.", ["Acts 19:17-20", "Acts 20:28-31", "Ephesians 1:15-16"]),
    note("Lampstands", "The churches are light-bearers under Christ's priestly oversight, not self-sufficient religious institutions.", ["Exodus 25:31-40", "Zechariah 4:1-6", "Revelation 1:12-13"])
  ],
  "Revelation 2:2": [
    note("Works", "Christ weighs the real fruit of the church's life, including labor, endurance, and discernment.", ["Matthew 7:16-20", "Ephesians 2:10", "Revelation 2:23"]),
    note("False apostles", "Claims to spiritual authority must be tested by fidelity to Christ and the apostolic gospel.", ["Acts 20:29-31", "2 Corinthians 11:13", "1 John 4:1"])
  ],
  "Revelation 2:3": [
    note("For my name's sake", "Endurance is centered on loyalty to Jesus rather than loyalty to reputation, party, or institution.", ["Matthew 10:22", "Acts 5:41", "1 Peter 4:14"]),
    note("Not fainted", "The phrase describes perseverance under pressure without surrendering the confession of Christ.", ["Galatians 6:9", "Hebrews 12:3", "Revelation 14:12"])
  ],
  "Revelation 2:4": [
    note("First love", "The early warmth of devotion to Christ that gives obedience its life and witness its tenderness.", ["Jeremiah 2:2", "Matthew 24:12", "John 21:15-17"]),
    note("Left", "The problem is not accidental loss but departure from a love that must be consciously recovered.", ["Hosea 11:7", "James 4:8", "Revelation 2:5"])
  ],
  "Revelation 2:5": [
    note("Remember", "Spiritual recovery begins by honestly comparing present condition with former grace.", ["Deuteronomy 8:2", "Luke 15:17", "Hebrews 10:32"]),
    note("Repent", "Repentance means turning back to Christ in mind, affection, and practice.", ["Acts 3:19", "2 Corinthians 7:10", "Revelation 3:19"]),
    note("Remove thy candlestick", "A church can lose its witness if love and repentance are refused.", ["Matthew 5:14-16", "Revelation 1:20", "Revelation 2:5"])
  ],
  "Revelation 2:6": [
    note("Nicolaitanes", "A corrupting influence that separated Christian profession from holy obedience and made compromise seem acceptable.", ["Acts 15:20", "2 Peter 2:15", "Jude 1:11"]),
    note("Deeds", "Christ distinguishes hatred of destructive practices from hatred of people; holiness protects those He loves.", ["Psalm 97:10", "Amos 5:15", "Romans 12:9"])
  ],
  "Revelation 2:7": [
    note("He that hath an ear", "Each local message becomes a Spirit-given word for all the churches and for every attentive reader.", ["Isaiah 6:9-10", "Matthew 11:15", "Revelation 13:9"]),
    note("Tree of life", "The promise restores what was lost in Eden and fulfilled in the New Jerusalem.", ["Genesis 2:9", "Genesis 3:22-24", "Revelation 22:2"])
  ],
  "Revelation 2:8": [
    note("Smyrna", "A loyal and prosperous city whose church was poor in earthly terms but rich before Christ.", ["Revelation 2:8-9", "James 2:5", "2 Corinthians 8:9"]),
    note("First and Last", "Christ's eternal sovereignty steadies a persecuted church whose earthly future is uncertain.", ["Isaiah 44:6", "Revelation 1:17-18", "Revelation 22:13"])
  ],
  "Revelation 2:9": [
    note("Tribulation", "Pressure, affliction, and hostility endured because of allegiance to Christ.", ["John 16:33", "Acts 14:22", "Romans 5:3"]),
    note("But thou art rich", "Heaven's evaluation reverses the poverty and shame imposed by hostile society.", ["Luke 12:21", "2 Corinthians 6:10", "James 2:5"]),
    note("Synagogue of Satan", "Religious claims become false when they serve accusation and hostility against Christ's witnesses.", ["John 8:39-44", "Romans 2:28-29", "Revelation 12:10"])
  ],
  "Revelation 2:10": [
    note("Ten days", "A limited season of testing, often connected with the A.D. 303-313 Diocletian persecution.", ["Daniel 1:12-15", "Revelation 2:10", "1 Peter 1:6-7"]),
    note("Crown of life", "The victor's reward given by the risen Christ to those faithful even unto death.", ["James 1:12", "2 Timothy 4:8", "1 Peter 5:4"])
  ],
  "Revelation 2:11": [
    note("Second death", "The final death of judgment from which Christ preserves the overcomer.", ["Revelation 20:6", "Revelation 20:14", "Revelation 21:8"]),
    note("Overcometh", "Victory in Revelation is faithful union with Christ under pressure.", ["John 16:33", "1 John 5:4-5", "Revelation 12:11"])
  ],
  "Revelation 2:12": [
    note("Pergamos", "A city of religious prestige and imperial loyalty, fitting the message about allegiance amid compromise.", ["Revelation 2:12-13", "Daniel 3:4-6", "1 Corinthians 10:20-21"]),
    note("Sharp sword", "Christ's word exposes and judges compromise with divine authority.", ["Isaiah 49:2", "Hebrews 4:12", "Revelation 1:16"])
  ],
  "Revelation 2:13": [
    note("Satan's seat", "A phrase for concentrated opposition to God's rule through idolatrous and imperial religious power.", ["Daniel 3:4-6", "2 Corinthians 4:4", "Revelation 13:2"]),
    note("Antipas", "A faithful witness remembered by Christ even when history gives few details.", ["Matthew 10:32", "Acts 22:20", "Revelation 1:5"])
  ],
  "Revelation 2:14": [
    note("Balaam", "The Old Testament figure whose counsel led Israel into idolatrous feasting and immorality.", ["Numbers 22:1-6", "Numbers 25:1-3", "Numbers 31:16"]),
    note("Stumblingblock", "A spiritual trap that draws God's people away from covenant loyalty.", ["Leviticus 19:14", "Matthew 18:7", "Romans 14:13"])
  ],
  "Revelation 2:15": [
    note("Doctrine", "Teaching is never neutral in Revelation; it forms worship, conduct, and allegiance.", ["Matthew 7:15-20", "1 Timothy 4:1", "Titus 1:9"]),
    note("Nicolaitanes", "Here the error Ephesus resisted has become tolerated, showing how compromise can advance across time.", ["Revelation 2:6", "Revelation 2:15", "Jude 1:4"])
  ],
  "Revelation 2:16": [
    note("Repent", "The whole church is summoned to turn from tolerating corrupt teaching.", ["Acts 17:30", "Revelation 2:5", "Revelation 3:19"]),
    note("Sword of my mouth", "Christ fights corruption by the authority and judgment of His word.", ["Isaiah 11:4", "2 Thessalonians 2:8", "Revelation 19:15"])
  ],
  "Revelation 2:17": [
    note("Hidden manna", "God's secret provision for the faithful, fulfilled in Christ the true bread from heaven.", ["Exodus 16:32-34", "John 6:48-51", "Hebrews 9:4"]),
    note("White stone", "A sign of Christ's acceptance and vindicating verdict for the overcomer.", ["Isaiah 62:2", "Revelation 2:17", "Revelation 3:12"]),
    note("New name", "A God-given identity known in covenant intimacy rather than bestowed by worldly systems.", ["Genesis 32:28", "Isaiah 65:15", "Revelation 3:12"])
  ],
  "Revelation 2:18": [
    note("Thyatira", "A trade-guild city whose local pressures picture the wider danger of religious compromise joined to social and economic life.", ["Acts 16:14", "Revelation 2:18-20", "Revelation 18:3"]),
    note("Son of God", "Christ asserts divine authority over against every false or rival claim to spiritual rule.", ["Psalm 2:7", "John 5:22-23", "Revelation 2:18"]),
    note("Eyes like fire", "Christ's searching knowledge penetrates appearances and judges with holy clarity.", ["Daniel 10:6", "Revelation 1:14", "Revelation 2:23"])
  ],
  "Revelation 2:19": [
    note("Charity and service", "Christ sees genuine love and ministry even where correction is also needed.", ["1 Corinthians 13:1-3", "Galatians 5:6", "Hebrews 6:10"]),
    note("Last works", "The works of Thyatira are increasing, showing that growth in activity does not remove the need for purity.", ["Philippians 1:9-11", "James 2:18", "Revelation 2:19"])
  ],
  "Revelation 2:20": [
    note("Jezebel", "A symbol drawn from the queen who promoted Baal worship, persecuted prophets, and joined false worship to royal power.", ["1 Kings 16:31", "1 Kings 18:4", "1 Kings 21:25"]),
    note("Seduce", "False spiritual authority leads Christ's servants away from covenant loyalty and true worship.", ["Deuteronomy 13:1-4", "2 Corinthians 11:3", "Revelation 17:1-6"])
  ],
  "Revelation 2:21": [
    note("Space to repent", "Christ's patience precedes judgment, giving time for a genuine turn from sin.", ["Romans 2:4", "2 Peter 3:9", "Revelation 2:21"]),
    note("Repented not", "Refused mercy becomes the ground of judgment when light is resisted.", ["Jeremiah 5:3", "Matthew 23:37", "Revelation 9:20-21"])
  ],
  "Revelation 2:22": [
    note("Great tribulation", "The consequence that follows persistent spiritual adultery unless repentance comes.", ["Jeremiah 30:7", "Matthew 24:21", "Revelation 2:22"]),
    note("Their deeds", "The call is not vague regret but repentance from the actual practices Christ exposes.", ["Isaiah 55:7", "Acts 26:20", "Revelation 16:11"])
  ],
  "Revelation 2:23": [
    note("Reins and hearts", "A biblical way of describing the inner life, motives, and loyalties known perfectly to God.", ["Psalm 7:9", "Jeremiah 17:10", "Revelation 2:23"]),
    note("According to your works", "Works reveal allegiance and become evidence in Christ's searching judgment.", ["Matthew 16:27", "Romans 2:6", "Revelation 22:12"])
  ],
  "Revelation 2:24": [
    note("The rest in Thyatira", "Christ distinguishes faithful believers from the corrupting system around them.", ["1 Kings 19:18", "Romans 11:4-5", "Revelation 2:24"]),
    note("Depths of Satan", "False teaching may present itself as deeper knowledge while actually leading away from Christ.", ["Genesis 3:5", "1 Corinthians 2:10-12", "2 Corinthians 11:14"])
  ],
  "Revelation 2:25": [
    note("Hold fast", "The faithful are called to cling to received truth until Christ comes.", ["Hebrews 3:6", "Hebrews 10:23", "Revelation 3:11"]),
    note("Till I come", "The command places endurance under the promise of Christ's appearing.", ["John 14:3", "1 Corinthians 11:26", "Revelation 22:20"])
  ],
  "Revelation 2:26": [
    note("Keepeth my works", "Overcoming includes persevering in the works that belong to Christ rather than Jezebel's works.", ["John 14:12", "Ephesians 2:10", "Revelation 2:26"]),
    note("Power over the nations", "Authority is received from Christ at the end; it is not seized through compromise now.", ["Daniel 7:18", "Daniel 7:27", "Revelation 20:4"])
  ],
  "Revelation 2:27": [
    note("Rod of iron", "Messianic rule from Psalm 2, shared with the overcomer only through union with Christ.", ["Psalm 2:8-9", "Revelation 12:5", "Revelation 19:15"]),
    note("Potter's vessels", "The image stresses the fragility of rebellious powers before Christ's final authority.", ["Isaiah 30:14", "Jeremiah 19:11", "Revelation 2:27"])
  ],
  "Revelation 2:28": [
    note("Morning star", "A promise of Christ Himself as the light that announces the coming day.", ["Numbers 24:17", "2 Peter 1:19", "Revelation 22:16"]),
    note("I will give", "The reward is gift before it is achievement; the overcomer receives from Christ.", ["Luke 12:32", "John 17:24", "Revelation 2:28"])
  ],
  "Revelation 2:29": [
    note("He that hath an ear", "The chapter's final line insists that all churches must hear each message, not only the church named.", ["Matthew 13:9", "Revelation 2:7", "Revelation 13:9"]),
    note("Spirit saith", "Christ's message continues to address the churches through the Spirit.", ["John 16:13", "Acts 13:2", "Revelation 22:17"])
  ]
};

const crossReferencesByVerse = {
  "Revelation 2:1": ["Revelation 1:12-13", "Revelation 1:16", "Revelation 1:20", "Acts 19:17-20", "Acts 20:28-31", "Zechariah 4:1-6"],
  "Revelation 2:2": ["Acts 20:28-31", "2 Corinthians 11:13", "1 John 4:1", "Matthew 7:15-20", "1 Thessalonians 1:3"],
  "Revelation 2:3": ["Matthew 10:22", "Acts 5:41", "Galatians 6:9", "Hebrews 12:3", "Revelation 14:12"],
  "Revelation 2:4": ["Jeremiah 2:2", "Matthew 24:12", "John 21:15-17", "2 Corinthians 11:2-3", "Revelation 2:5"],
  "Revelation 2:5": ["Deuteronomy 8:2", "Matthew 5:14-16", "Acts 3:19", "Revelation 1:20", "Revelation 3:3"],
  "Revelation 2:6": ["Acts 15:20", "Psalm 97:10", "Romans 12:9", "2 Peter 2:15", "Jude 1:11"],
  "Revelation 2:7": ["Genesis 2:9", "Genesis 3:22-24", "Matthew 11:15", "Revelation 22:2", "Revelation 22:14"],
  "Revelation 2:8": ["Isaiah 44:6", "Revelation 1:17-18", "2 Corinthians 8:9", "Revelation 22:13"],
  "Revelation 2:9": ["John 16:33", "Romans 2:28-29", "2 Corinthians 6:10", "James 2:5", "Revelation 12:10"],
  "Revelation 2:10": ["Daniel 1:12-15", "Matthew 10:28", "James 1:12", "1 Peter 1:6-7", "Revelation 2:10"],
  "Revelation 2:11": ["John 11:25-26", "1 John 5:4-5", "Revelation 20:6", "Revelation 20:14", "Revelation 21:8"],
  "Revelation 2:12": ["Isaiah 49:2", "Hebrews 4:12", "Revelation 1:16", "Revelation 19:15"],
  "Revelation 2:13": ["Daniel 3:4-6", "Matthew 10:32", "Acts 22:20", "Revelation 1:5", "Revelation 13:2"],
  "Revelation 2:14": ["Numbers 22:1-6", "Numbers 25:1-3", "Numbers 31:16", "1 Corinthians 10:20-21", "2 Peter 2:15"],
  "Revelation 2:15": ["Acts 15:20", "Revelation 2:6", "Jude 1:4", "Titus 1:9", "Revelation 2:14"],
  "Revelation 2:16": ["Isaiah 11:4", "Acts 17:30", "Hebrews 4:12", "2 Thessalonians 2:8", "Revelation 19:15"],
  "Revelation 2:17": ["Exodus 16:32-34", "Isaiah 62:2", "John 6:48-51", "Hebrews 9:4", "Revelation 3:12"],
  "Revelation 2:18": ["Psalm 2:7", "Daniel 10:6", "Acts 16:14", "Revelation 1:14-15", "Revelation 2:23"],
  "Revelation 2:19": ["1 Corinthians 13:1-3", "Galatians 5:6", "Hebrews 6:10", "James 2:18", "Revelation 2:23"],
  "Revelation 2:20": ["1 Kings 16:31", "1 Kings 18:4", "1 Kings 21:25", "2 Corinthians 11:3", "Revelation 17:1-6"],
  "Revelation 2:21": ["Romans 2:4", "2 Peter 3:9", "Jeremiah 5:3", "Revelation 9:20-21", "Revelation 2:21"],
  "Revelation 2:22": ["Isaiah 55:7", "Acts 26:20", "Matthew 24:21", "Revelation 16:11", "Revelation 18:4-8"],
  "Revelation 2:23": ["Psalm 7:9", "Jeremiah 17:10", "Matthew 16:27", "Romans 2:6", "Revelation 22:12"],
  "Revelation 2:24": ["1 Kings 19:18", "Romans 11:4-5", "1 Corinthians 2:10-12", "2 Corinthians 11:14", "Revelation 2:24"],
  "Revelation 2:25": ["John 14:3", "Hebrews 3:6", "Hebrews 10:23", "Revelation 3:11", "Revelation 22:20"],
  "Revelation 2:26": ["Daniel 7:18", "Daniel 7:27", "John 14:12", "Revelation 20:4", "Revelation 22:5"],
  "Revelation 2:27": ["Psalm 2:8-9", "Isaiah 30:14", "Jeremiah 19:11", "Revelation 12:5", "Revelation 19:15"],
  "Revelation 2:28": ["Numbers 24:17", "Luke 12:32", "2 Peter 1:19", "Revelation 22:16", "John 17:24"],
  "Revelation 2:29": ["Matthew 13:9", "John 16:13", "Revelation 2:7", "Revelation 13:9", "Revelation 22:17"]
};

const chapterSymbols = [
  {
    symbol: "Seven stars",
    references: ["Revelation 2:1"],
    meaning: "Christ-held messengers or representatives of the churches.",
    scriptureReferences: ["Revelation 1:16", "Revelation 1:20", "Daniel 12:3"],
    sources: [docSource, technicalSource]
  },
  {
    symbol: "Seven lampstands",
    references: ["Revelation 2:1", "Revelation 2:5"],
    meaning: "The churches as light-bearers under Christ's priestly oversight.",
    scriptureReferences: ["Exodus 25:31-40", "Zechariah 4:1-6", "Revelation 1:12-13", "Revelation 1:20"],
    sources: [docSource, technicalSource]
  },
  {
    symbol: "Tree of life",
    references: ["Revelation 2:7"],
    meaning: "Restored access to life with God, lost in Eden and restored in the New Jerusalem.",
    scriptureReferences: ["Genesis 2:9", "Genesis 3:22-24", "Revelation 22:2", "Revelation 22:14"],
    sources: [docSource, technicalSource]
  },
  {
    symbol: "Crown of life",
    references: ["Revelation 2:10"],
    meaning: "The victor's life-reward given by Christ to those faithful through suffering and death.",
    scriptureReferences: ["James 1:12", "2 Timothy 4:8", "1 Peter 5:4", "Revelation 2:10"],
    sources: [docSource, mcnultySource]
  },
  {
    symbol: "Second death",
    references: ["Revelation 2:11"],
    meaning: "Final death in judgment, from which the overcomer is secure in Christ.",
    scriptureReferences: ["Revelation 20:6", "Revelation 20:14", "Revelation 21:8"],
    sources: [docSource, mcnultySource]
  },
  {
    symbol: "Sharp two-edged sword",
    references: ["Revelation 2:12", "Revelation 2:16"],
    meaning: "Christ's judging and discerning word against compromise.",
    scriptureReferences: ["Isaiah 49:2", "Hebrews 4:12", "Revelation 1:16", "Revelation 19:15"],
    sources: [docSource, technicalSource]
  },
  {
    symbol: "Balaam",
    references: ["Revelation 2:14"],
    meaning: "A pattern of idolatrous and immoral compromise that corrupts covenant loyalty.",
    scriptureReferences: ["Numbers 22:1-6", "Numbers 25:1-3", "Numbers 31:16", "2 Peter 2:15"],
    sources: [docSource, technicalSource]
  },
  {
    symbol: "Nicolaitanes",
    references: ["Revelation 2:6", "Revelation 2:15"],
    meaning: "Compromising teaching or practice that separated Christian profession from holy obedience.",
    scriptureReferences: ["Acts 15:20", "2 Peter 2:15", "Jude 1:11", "Revelation 2:6"],
    sources: [docSource, technicalSource]
  },
  {
    symbol: "Hidden manna",
    references: ["Revelation 2:17"],
    meaning: "God's hidden provision for the faithful, fulfilled in Christ the true bread from heaven.",
    scriptureReferences: ["Exodus 16:32-34", "John 6:48-51", "Hebrews 9:4", "Revelation 2:17"],
    sources: [docSource, technicalSource]
  },
  {
    symbol: "White stone and new name",
    references: ["Revelation 2:17"],
    meaning: "Christ's personal acceptance, vindication, and covenant identity given to the overcomer.",
    scriptureReferences: ["Genesis 32:28", "Isaiah 62:2", "Isaiah 65:15", "Revelation 3:12"],
    sources: [docSource, technicalSource]
  },
  {
    symbol: "Eyes like fire and feet like brass",
    references: ["Revelation 2:18", "Revelation 2:23"],
    meaning: "Christ's searching knowledge and firm authority over His church.",
    scriptureReferences: ["Daniel 10:6", "Jeremiah 17:10", "Revelation 1:14-15", "Revelation 2:23"],
    sources: [docSource, technicalSource]
  },
  {
    symbol: "Jezebel",
    references: ["Revelation 2:20", "Revelation 2:21", "Revelation 2:22", "Revelation 2:23", "Revelation 2:24"],
    meaning: "A symbol of religious influence that claims authority while leading God's servants into unfaithfulness.",
    scriptureReferences: ["1 Kings 16:31", "1 Kings 18:4", "1 Kings 21:25", "Revelation 17:1-6"],
    sources: [docSource, mcnultySource]
  },
  {
    symbol: "Rod of iron",
    references: ["Revelation 2:26", "Revelation 2:27"],
    meaning: "The Messiah's final authority over the nations, shared with those who overcome in Him.",
    scriptureReferences: ["Psalm 2:8-9", "Revelation 12:5", "Revelation 19:15", "Revelation 20:4"],
    sources: [docSource, technicalSource]
  },
  {
    symbol: "Morning star",
    references: ["Revelation 2:28"],
    meaning: "Christ Himself as the light of the coming day and the personal reward of the faithful.",
    scriptureReferences: ["Numbers 24:17", "2 Peter 1:19", "Revelation 22:16"],
    sources: [docSource, mcnultySource]
  }
];

const chapter = JSON.parse(readFileSync(chapterPath, "utf8"));

for (const verse of chapter.verses) {
  const paragraphs = enrichParagraphs(verse.verse, commentary[verse.verse]);
  if (!paragraphs) throw new Error(`Missing commentary for ${verse.verse}`);
  const detailedExplanation = paragraphs.join("\n\n");
  const count = wordCount(detailedExplanation);
  if (count < 300 || count > 500) {
    throw new Error(`${verse.verse} commentary is ${count} words`);
  }
  if (paragraphs.length !== 4) {
    throw new Error(`${verse.verse} should have exactly four paragraphs`);
  }
  verse.explanation = paragraphs[0];
  verse.historicalBackground = paragraphs[1];
  verse.symbolicMeaning = paragraphs[1];
  verse.adventistInsight = paragraphs[2];
  verse.propheticSignificance = paragraphs[2];
  verse.application = paragraphs[3];
  verse.crossReferences = crossReferencesByVerse[verse.verse] ?? verse.crossReferences;
  verse.wordNotes = wordNotesByVerse[verse.verse] ?? [];
  verse.sources = [docSource, mcnultySource, technicalSource];
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

chapter.title = "Messages to Ephesus, Smyrna, Pergamos, and Thyatira";
chapter.summary = "Revelation 2 presents Christ's first four messages to the churches. He commends truth, endurance, love, service, and faithfulness, while exposing lost love, fear, compromise, and tolerated corruption.";
chapter.historicalContext = "The churches were real congregations in Roman Asia, facing civic religion, imperial pressure, social cost, false teaching, persecution, and compromise. The chapter also reads as a broad movement through Christian history: Ephesus A.D. 31-100, Smyrna about A.D. 100-313, Pergamos A.D. 313-538, and Thyatira A.D. 538-1565.";
chapter.literaryContext = "The chapter continues the vision of Christ among the lampstands. Each message reveals Christ's character, names the church's condition, calls for response, and promises a reward to the overcomer.";
chapter.themes = ["Christ among the churches", "First love", "Persecution", "Compromise", "Nicolaitanes", "Balaam", "Jezebel", "Overcoming"];
chapter.outline = [
  { range: "2:1-7", title: "Ephesus", summary: "Truth must remain joined to first love and living witness." },
  { range: "2:8-11", title: "Smyrna", summary: "A suffering church is called to fearlessness and faithfulness unto death." },
  { range: "2:12-17", title: "Pergamos", summary: "A faithful yet compromised church must repent and receive Christ's better reward." },
  { range: "2:18-29", title: "Thyatira", summary: "A serving church must reject Jezebel-like corruption and hold fast until Christ comes." }
];
chapter.sources = [docSource, mcnultySource, technicalSource];
chapter.symbols = chapterSymbols;
chapter.teachingNotes = {
  ...chapter.teachingNotes,
  adventistEmphasis: "The chapter presents Ephesus as the apostolic and immediately post-apostolic church: doctrinally alert, missionary, and yet vulnerable to cooling love."
};

writeFileSync(chapterPath, `${JSON.stringify(chapter, null, 2)}\n`);
console.log("Imported polished Revelation 2 commentary.");
