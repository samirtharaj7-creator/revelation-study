import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const chapterPath = join(root, "content", "revelation", "chapter-03.json");

const docSource = {
  sourceId: "revelation-chapter-three-docx",
  locator: "Revelation Chapter Three manuscript",
  claimType: "manuscript-synthesis",
  priority: 1
};

const mcnultySource = {
  sourceId: "revelation-practical-living-in-the-judgment-hour",
  locator: "Priority Adventist commentary for Revelation 3",
  claimType: "adventist-interpretation",
  priority: 1
};

const technicalSource = {
  sourceId: "revelation-a-shorter-commentary",
  locator: "Technical and Old Testament background support",
  claimType: "technical-background",
  priority: 5
};

const sourceList = [docSource, mcnultySource, technicalSource];

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

function note(term, explanation, scriptureReferences) {
  return { term, explanation, scriptureReferences };
}

const publicBannedPhrases = [
  "Adventist",
  "historicist",
  "church-history",
  "church history",
  "source material",
  "source language",
  "manuscript",
  "uploaded",
  "The appeal is",
  "The pastoral appeal",
  "The practical appeal",
  "The pastoral lesson",
  "This reading",
  "The passage presents"
];

function assertPublicText(reference, text) {
  for (const phrase of publicBannedPhrases) {
    if (text.includes(phrase)) {
      throw new Error(`${reference} public text contains banned phrase "${phrase}"`);
    }
  }
}

const commentary = {
  "Revelation 3:1": [
    "Christ addresses Sardis as the One who has the seven Spirits of God and the seven stars. Those titles answer the church's condition before the rebuke is even spoken. Sardis has a reputation for life, yet Christ calls it dead. The church needs the fullness of the Spirit, not the memory of earlier vitality, and it needs the authority of the Lord who still holds the churches' messengers in His hand.",
    "Sardis had once been famous for wealth, strength, and apparent security, but its history included sudden defeat when watchfulness failed. That background gives Christ's words a cutting precision. A city that trusted its position becomes a mirror for a church trusting its name. The seven Spirits recall the fullness of God's life-giving work, while the seven stars recall Christ's direct oversight of His people.",
    "The Sardis period is commonly placed from A.D. 1565 to 1740. It follows the long medieval struggle and reflects the danger that recovered truth can harden into respectable form. The Reformation brought genuine light, but inherited confession can become a shell when the Spirit's present work is neglected. Sardis is not condemned because it once received truth; it is warned because reputation has begun to replace living obedience.",
    "Christ's diagnosis is mercy. He refuses to let His people confuse a respected name with spiritual life. Sardis invites every believer and congregation to ask whether activity, history, and doctrinal memory are being kept alive by the Spirit. The same Christ who exposes death has the Spirit who gives life, so the rebuke is not the end of hope. It is the beginning of awakening."
  ],
  "Revelation 3:2": [
    "Christ commands Sardis to be watchful and to strengthen what remains, because the remaining things are ready to die. The church is not beyond hope, but its condition is urgent. Something is still present that can be revived, guarded, and strengthened. Christ's rebuke is severe because He sees a flicker of life that must not be allowed to go out.",
    "The command to watch fits both the city's history and the church's spiritual state. Sardis had fallen before when confidence replaced vigilance. Spiritually, the same pattern can unfold when believers assume that yesterday's faithfulness will carry today's obedience. Christ does not ask Sardis merely to feel alarm; He calls the church to active repair, strengthening what is weak, unfinished, and endangered before God.",
    "Within the A.D. 1565-1740 setting, the verse points to a post-Reformation world that possessed great light but often treated partial reform as though it were complete. Christ says He has not found the works of Sardis perfect before God. The issue is not perfectionism, but incompleteness: truth received must continue toward fuller faith, obedience, revival, and readiness for the return of Christ.",
    "This verse is a gracious interruption of decline. Spiritual death often approaches quietly while religious language remains strong. Christ calls His people to strengthen prayer, obedience, love, humility, and the truths already received. No church can revive itself by reputation, but it can answer the One who still speaks. The command is urgent because mercy is still close enough to awaken what remains."
  ],
  "Revelation 3:3": [
    "Christ tells Sardis to remember how it received and heard, to hold fast, and to repent. The way forward begins with returning to grace already given. Sardis does not need a new religious image; it needs renewed obedience to what Christ has already entrusted. The warning that He will come like a thief gives the verse holy urgency.",
    "The thief image appears elsewhere as a warning to the unwatchful. It does not mean Christ's faithful people must be surprised in the same way as the sleeping world. The point is readiness. A church that sleeps through Christ's warnings may be startled by a coming it could have welcomed. Watchfulness keeps memory from becoming nostalgia and turns received truth into present allegiance.",
    "The Sardis period, A.D. 1565-1740, stands between the recovery of Reformation light and the later revival of Advent hope. The command to remember therefore has historical weight. The truths recovered through sacrifice were not meant to become inherited slogans. They were to form a people still listening, still repenting, and still pressing toward the fuller light of Christ's prophetic word.",
    "Memory must become repentance, and repentance must become watchfulness. It is not enough to honor what earlier believers received, preached, or defended. Christ asks whether that truth is being kept now. The believer who hears this verse should not delay obedience. Spiritual sleep is broken by returning to Christ, holding fast His word, and living awake before Him."
  ],
  "Revelation 3:4": [
    "Even in Sardis there are a few names who have not defiled their garments. Christ does not confuse the faithful with the general condition around them. He sees individuals inside a dying community and knows them by name. They will walk with Him in white, not because they have produced merit apart from Him, but because loyal fellowship with Him has marked their lives.",
    "Garments in Scripture often speak of character, purity, and the righteousness God provides. To defile the garments is to stain the life that should reflect covenant faithfulness. The phrase 'a few names' is tender and searching. Sardis has a name for life, but Christ knows the names that actually correspond to faithfulness. Heaven's record is more precise than public reputation.",
    "The A.D. 1565-1740 period must not be flattened into a story of decline alone. Even where formal religion grew, Christ preserved people of prayer, holiness, Scripture, mission, and courage. The verse protects the reader from sweeping contempt. Christ sees the sleepy church, but He also sees the faithful few who continue walking with Him when the majority mood is dull.",
    "The promise strengthens believers who feel surrounded by spiritual decline. Faithfulness is possible even when many are sleeping. The call is not pride in being among the few, but humble perseverance with Christ. To walk with Him in white begins now through daily loyalty and will be revealed fully in His kingdom, where every hidden act of faithfulness is known."
  ],
  "Revelation 3:5": [
    "Christ promises the overcomer white raiment, security in the book of life, and confession before the Father and His angels. Each promise answers Sardis directly. A church with a name for life must care about the name written in heaven. A church with defiled garments must receive white raiment from Christ. A church living by reputation must seek Christ's acknowledgment.",
    "The book of life is the heavenly register of those who belong to God. The promise not to blot out the overcomer's name should be heard with seriousness and hope. White raiment points to purity and victory, while Christ's confession before the Father shows that the faithful are known and owned by Him. Earthly names fade; Christ's recognition endures.",
    "Sardis sits within the A.D. 1565-1740 period, yet the promise reaches forward to the heavenly judgment scenes of Daniel and Revelation. A respected religious name cannot replace the record of living allegiance. The faithful minority in a sleepy age is not forgotten in the courts of heaven. Christ's promise turns the reader from public memory to the final verdict of God.",
    "The question is not whether people know our religious name, but whether Christ will confess our name. That answer is found in overcoming through Him, receiving His white raiment, and remaining loyal when formal religion grows cold. Sardis warns that public Christianity without living faith is dangerous, but Christ's promise to the overcomer is wonderfully personal and full of hope."
  ],
  "Revelation 3:6": [
    "The message to Sardis closes with the familiar summons: whoever has an ear must hear what the Spirit says to the churches. The warning about spiritual death is not confined to one ancient congregation. The Spirit carries Christ's word into every age where religious reputation threatens to replace living faith. Hearing means receiving the diagnosis as the voice of Christ.",
    "The plural 'churches' matters. Each church must listen to all the messages because each condition can reappear wherever God's people gather. Sardis warns that a church can have history, structure, doctrine, and a public name while inward life fades. The Spirit makes that warning personal without letting it become despairing, because the One who rebukes still calls.",
    "The A.D. 1565-1740 period gives Sardis its broad setting, but the closing formula refuses to leave the message locked in the past. The same danger can live in any denomination, congregation, family, or heart. Received truth must be kept alive by the Spirit. A movement is not safe because it descends from faithfulness; it is safe only as it remains awake in Christ.",
    "Sardis asks for humble listening. It is easy to diagnose spiritual death somewhere else; it is harder to ask whether our own profession has more name than life. Christ's purpose is not to crush the sleepy, but to awaken them. The Spirit still speaks so that truth may become living obedience and the church may walk with Christ in white."
  ],
  "Revelation 3:7": [
    "Christ speaks to Philadelphia as the One who is holy, true, and has the key of David. What He opens no one can shut, and what He shuts no one can open. Philadelphia has little strength, so Christ begins by revealing His own authority. The church's future rests not on numbers or influence, but on the Lord who holds the key.",
    "The key of David reaches back to Isaiah 22:22, where royal authority over the house of David is pictured as a key placed upon the shoulder. Christ is the true Davidic ruler who grants access, governs opportunity, and controls the door no human power can finally manage. Philadelphia's local setting as a gateway city makes the image vivid, but its meaning rises far above geography.",
    "The Philadelphia period is commonly placed from A.D. 1740 to 1844, an era marked by revival, mission, and the Advent awakening. The open door carries sanctuary depth, pointing to Christ's heavenly ministry and to the movement of attention toward the Most Holy Place. A weak but faithful people are called to follow the door Christ Himself opens, not the doors human power prefers.",
    "This verse gives courage to small and faithful believers. Christ does not first ask how strong His people are; He asks whether they trust His holiness, truth, and authority. The doors that matter most are opened by Him. Philadelphia teaches that weakness is not failure when the church keeps His word and walks through the opportunity Christ provides."
  ],
  "Revelation 3:8": [
    "Christ tells Philadelphia, 'I know thy works,' and then sets before the church an open door that no one can shut. The reason is not human strength. The church has little strength, yet it has kept Christ's word and has not denied His name. This is one of Revelation's tenderest encouragements: smallness does not prevent usefulness when faithfulness is real.",
    "The open door can include mission, access to God's presence, and opportunity under Christ's authority. Scripture uses door language for gospel opportunity, and Revelation places the image beside the key of David. The church's little strength is not romanticized, but neither is it treated as failure. The decisive factor is fidelity to Christ's word and refusal to deny His name.",
    "From A.D. 1740 to 1844, the Philadelphia period reflects renewed missionary energy, Bible study, and expectation of Christ's coming. The open door also points to the sanctuary transition that brought clearer attention to Christ's heavenly work. The church is not portrayed as politically powerful. Its strength is obedience, hope, and willingness to move when Christ opens the way.",
    "This verse speaks to discouraged believers and small congregations. The danger is not weakness; the danger is unfaithfulness. Christ can do significant work through people who keep His word with limited resources and public recognition. Philadelphia invites the church to stop measuring possibility by visible power and to measure it instead by the authority of the One who opens the door."
  ],
  "Revelation 3:9": [
    "Christ promises that opponents described as the synagogue of Satan will ultimately acknowledge that He has loved Philadelphia. The phrase is severe and must be handled carefully. It does not authorize contempt toward Jewish people or any ethnic group. In Revelation's setting, it describes false religious claim joined to opposition against Christ's faithful people. The issue is allegiance, not ancestry.",
    "The promise echoes Old Testament scenes where hostile powers finally recognize God's favor upon His people. Philadelphia has little strength and may be misrepresented, dismissed, or opposed, yet Christ says the final reality will be made clear. His love for His faithful people will be vindicated before those who denied, resisted, or despised the work He was doing.",
    "In the A.D. 1740-1844 period, revived proclamation of Scripture, mission, and Advent hope often met rejection from people who claimed religious authority. The verse therefore warns that religious profession can stand against present obedience to Christ. The promise should never be used harshly. It assures the faithful that Christ will vindicate obedience without requiring them to fight for their own honor.",
    "The church does not need to secure vindication by bitterness. Christ knows who has kept His word, and He knows who has opposed it. The faithful response is patience, clarity, and continued obedience. Philadelphia teaches that being loved by Christ matters more than being immediately understood, and that final acknowledgment rests safely in His hands."
  ],
  "Revelation 3:10": [
    "Because Philadelphia has kept the word of Christ's patience, Christ promises to keep it from the hour of temptation that will come upon all the world. The verse joins endurance with preservation. The church has kept His word; He will keep His church. Faithfulness is not made effortless, but the faithful are placed under the care of the Lord who knows the coming trial.",
    "The hour of temptation is worldwide in scope, reaching beyond a merely local difficulty. Revelation's language points toward a final testing of earth's inhabitants, when allegiance to Christ comes into sharp focus. To be kept does not necessarily mean to be removed from all difficulty. It means to be preserved by Christ through the test in a way that secures fidelity.",
    "The Philadelphia period, A.D. 1740-1844, stands near the rise of the Advent awakening, where waiting, disappointment, and continued obedience became central. The promise also reaches forward to the final crisis and the patience of the saints. Philadelphia is therefore not only a memory of revival; it is a witness that Christ sustains those who keep His word under pressure.",
    "Christ does not merely command endurance; He sustains it. The believer's task is to keep His word now, trusting Him with tests larger than human strength. Philadelphia teaches that preservation is relational. Those who cling to Christ's patience are not abandoned when trial comes. They are kept by the One whose promise is stronger than the pressure."
  ],
  "Revelation 3:11": [
    "Christ says, 'Behold, I come quickly,' and commands Philadelphia to hold fast what it has so that no one takes its crown. The promise of His coming gives urgency to perseverance. The church already has something precious: Christ's word, His name, an open door, and a crown held before it. The danger is not that Christ is uncertain, but that His people might let go.",
    "The crown is the victor's wreath, the sign of faithful endurance. Philadelphia's weakness does not disqualify it from victory, but carelessness could endanger what has been entrusted. Holding fast means guarding received light, continuing in obedience, and refusing to trade Christ's approval for relief from pressure. The soon coming of Christ makes the church steady, not restless.",
    "In the A.D. 1740-1844 period, the command fits the experience of believers who cherished the hope of Christ's return and had to keep faith through opposition, delay, and disappointment. The open door and the coming promise belong together. The church follows Christ's present heavenly work while waiting for His appearing, guarding what He has given until the crown is received.",
    "The crown is not taken from the faithful by human force; it is lost when faith lets go. Philadelphia calls believers to hold fast without anxiety and without pride. Keep His word, keep His name, keep hope alive, and wait for the One who is coming. The reward is secure because Christ is faithful, but the command still calls for watchful loyalty."
  ],
  "Revelation 3:12": [
    "Christ promises to make the overcomer a pillar in the temple of God, never to go out again, and to write upon that person the name of God, the name of the New Jerusalem, and His own new name. The promise is rich with stability, belonging, worship, and identity. A church with little strength is promised permanence in the presence of God.",
    "The pillar image would be powerful for a city familiar with earthquakes and insecurity. What trembles now will become unshakable in God's temple. The written names speak of ownership and relationship. God's name marks belonging; the New Jerusalem marks citizenship; Christ's new name marks fellowship with the victorious Lord. The promise answers instability with eternal placement.",
    "The A.D. 1740-1844 Philadelphia period gives the temple promise sanctuary depth. The open door points to Christ's heavenly ministry, and the overcomer is associated with the inner reality of God's presence. The promise is not merely architectural imagery. It directs hope toward final union with God, secure identity, and the city that descends from heaven in Revelation's closing vision.",
    "Philadelphia invites the church to prefer Christ's permanence to the world's visibility. Earthly doors open and close, cities shake, reputations shift, and strength comes and goes. Christ gives a place that cannot be lost and a name that cannot be erased. The believer who feels weak can take courage: the Lord who opens the door also makes His people pillars in His temple."
  ],
  "Revelation 3:13": [
    "The message to Philadelphia closes with the Spirit's summons to all the churches. The promise of the open door, the call to hold fast, and the assurance of permanent belonging are not for Philadelphia alone. The Spirit makes this word living for every congregation that feels weak, overlooked, or opposed, yet desires to keep Christ's word and not deny His name.",
    "This repeated ending teaches the reader how to handle the seven messages. Each local church has its own condition, but every church must listen to every message. Philadelphia's lack of rebuke should not make other churches proud, and its little strength should not make weak churches despair. The Spirit speaks through the whole pattern, forming discernment, endurance, repentance, and hope.",
    "The A.D. 1740-1844 setting carries special weight because of revival, mission, the Advent awakening, and the sanctuary open door. Yet the closing summons keeps the application personal. The point is not merely to identify a period, but to hear Christ's call to faithful obedience under His authority. The open door matters only if the church walks through it.",
    "Hearing means receiving Christ's word until it shapes loyalty. Philadelphia teaches that a small church can be faithful, a weak people can be used, and an open door can remain open because Christ holds the key. The response is patient confidence in the One who speaks, joined to obedience that does not deny His name when pressure comes."
  ],
  "Revelation 3:14": [
    "Christ introduces Himself to Laodicea as the Amen, the faithful and true witness, and the beginning of the creation of God. These titles answer the church's deepest need. Laodicea is self-deceived, so it needs a witness who tells the truth. It is spiritually barren, so it needs the One through whom new creation comes. It is confident in itself, so it needs Christ's final word.",
    "The title 'beginning of the creation of God' does not mean Christ is a created being. Revelation's worship and the wider New Testament present Him as the source, ruler, and inaugurator of God's creative and redemptive purpose. As the faithful and true witness, He gives a diagnosis Laodicea would never give itself. The church's opinion of itself is unreliable; Christ's testimony is trustworthy.",
    "Laodicea represents the period from A.D. 1844 onward, the judgment-hour church living near the end of the great controversy. The name is often associated with a people under judgment, which fits the solemn setting. The last church possesses great light and a serious mission, yet its first need is not more self-confidence. It must receive Christ's witness about its actual condition.",
    "The whole Laodicean message begins with Christ's identity, not the church's failure. He does not flatter the church, but neither does He abandon it. He speaks as the Amen because His word is final and as the true witness because His rebuke is accurate. Hope begins when the church stops defending its self-image and allows Jesus to tell the truth that can save it."
  ],
  "Revelation 3:15": [
    "Christ knows Laodicea's works and says the church is neither cold nor hot. He wishes it were one or the other. The statement is startling because the church likely does not see itself as spiritually useless. Its problem is not open hostility or fervent devotion, but a tepid condition that makes its witness distasteful. Christ's knowledge cuts through self-satisfaction.",
    "Laodicea's local water supply makes the image vivid. Nearby Hierapolis was known for hot springs, and Colossae was associated with refreshing cold water, but Laodicea's water arrived lukewarm and unpleasant. Christ turns that local reality into a spiritual metaphor. Hot and cold water can both be useful; lukewarm water is nauseating. The church's condition is not balanced moderation, but unusable self-deception.",
    "From A.D. 1844 onward, Laodicea speaks to a people living with significant light, prophetic responsibility, and the nearness of final judgment. The tragedy is that truth can be possessed while the heart remains tepid. The last church is not warned primarily because it lacks information, but because its works reveal a life not fully surrendered to Christ.",
    "This verse asks whether our religion is useful to Christ. It is possible to have enough Christianity to feel secure and not enough living communion to bless the world. Laodicea warns against respectable half-heartedness because it is hard to recognize and easy to defend. The remedy begins with accepting that Christ knows our works better than we do."
  ],
  "Revelation 3:16": [
    "Because Laodicea is lukewarm, neither cold nor hot, Christ says He will spue it out of His mouth. The language is deliberately strong. It is meant to awaken a church too comfortable to recognize its danger. Laodicea's condition is nauseating to Christ because it joins religious profession to spiritual uselessness and self-satisfaction.",
    "Lukewarmness is not a gentle middle ground. In the local setting, tepid water was unpleasant and unhelpful. Spiritually, it describes a church that cannot see how little it reflects the life it claims to possess. The shocking image should not be softened into mild disappointment. Christ is confronting a condition that, if unchanged, makes the church unfit as His witness.",
    "The A.D. 1844 onward setting gives this warning special force. Laodicea has end-time truth, prophetic responsibility, and a message for the world, yet it can still become lukewarm. That is the danger. A people entrusted with the last warning must not live as though information were conversion or as though correctness were communion with Christ.",
    "Christ's severe words are spoken before the door is finally closed. He wants the church to feel the seriousness of its condition so that it will receive His remedy. Laodicea teaches that polite religion may be more dangerous than obvious rebellion if it leaves the heart closed to Christ while still claiming His name."
  ],
  "Revelation 3:17": [
    "Laodicea says, 'I am rich, and increased with goods, and have need of nothing,' but Christ says the church is wretched, miserable, poor, blind, and naked. The contrast is devastating. The church's self-description and Christ's diagnosis stand opposite each other. This is the heart of Laodicea's danger: it does not merely lack what it needs; it does not know it lacks it.",
    "The language draws on Laodicea's local pride. The city was known for wealth, black wool textiles, and eye treatment, yet Christ says the church is poor, naked, and blind. Earthly strengths become spiritual metaphors. What the city boasted in, the church lacked before God. Revelation exposes the terrible possibility that religious people may borrow cultural confidence and mistake it for spiritual health.",
    "Laodicea's A.D. 1844 onward setting makes the verse one of the most searching messages to the final church. A people may possess distinctive truth and still be self-deceived. The problem is false confidence: thinking one has faith, righteousness, insight, and readiness while lacking living dependence upon Christ. That makes Laodicea deeply personal and uncomfortable.",
    "The most dangerous words in the passage are 'need of nothing.' They leave no room to receive. Christ's mercy begins by contradicting the church's confidence. If we allow Him to tell the truth about our poverty, blindness, and nakedness, then the way is opened for Him to give what we cannot produce."
  ],
  "Revelation 3:18": [
    "Christ counsels Laodicea to buy from Him gold tried in the fire, white raiment, and eyesalve. The remedy answers the diagnosis: poverty needs true gold, nakedness needs covering, and blindness needs sight. Everything Laodicea lacks must be received from Christ. The command to buy is not a call to purchase grace with merit, but to come to Him for what self-sufficiency cannot provide.",
    "The gold tried in the fire points to genuine faith and love tested by trial. White raiment points to Christ's righteousness covering the shame of nakedness and forming a life fit for His presence. Eyesalve points to spiritual discernment, the Spirit-given sight that allows the church to see itself, Christ, and reality truthfully. These gifts answer Laodicea's local pride in wealth, clothing, and medicine.",
    "For the A.D. 1844 onward church, this counsel is central. The final people of God do not need self-congratulation; they need faith that works by love, the righteousness of Christ, and spiritual sight. The message connects naturally with Revelation's later calls to worship the Creator, keep the commandments of God, and hold the faith of Jesus.",
    "The verse is hopeful because Christ does not merely expose need; He offers supply. Laodicea is poor, but Christ has gold tried in the fire. It is naked, but Christ has white raiment. It is blind, but Christ has eyesalve. The response is surrender: stop defending spiritual wealth, come honestly to Jesus, and receive from Him what makes repentance possible."
  ],
  "Revelation 3:19": [
    "Christ explains the motive behind His severity: as many as He loves, He rebukes and chastens. Laodicea must therefore be zealous and repent. The rebuke is not evidence that Christ has rejected the church; it is evidence that He still loves it enough to discipline it. The command calls for earnestness where there has been lukewarmness and repentance where there has been self-defense.",
    "The verse changes how the whole Laodicean message should be heard. Christ's strong language is not contempt. It is corrective love. To rebuke is to expose what is wrong; to chasten is to train and discipline for restoration. Laodicea's danger is real, but Christ's love is also real. He does not wound pride for cruelty, but for healing.",
    "The A.D. 1844 onward setting makes this love both solemn and hopeful. The church entrusted with the last proclamation must itself be corrected by Christ. Laodicea is not a weapon for condemning others; it is a summons for God's own people to receive discipline as mercy. The final witness to the world must be formed by repentance before it calls others to repent.",
    "Zeal is not noise, panic, or emotional display. It is wholehearted response to Christ's loving correction. Repentance is not self-loathing; it is turning from self-sufficiency to Him. The verse invites believers to stop resisting the very rebuke that could save them. If Christ loves enough to correct, the church must love enough to answer."
  ],
  "Revelation 3:20": [
    "Christ stands at the door and knocks. In context, He is outside a self-sufficient church, offering restored fellowship to anyone who hears His voice and opens the door. The image is tender, but also tragic. The church that claims to need nothing has left Christ outside. Yet He has not walked away. He knocks, speaks, and offers to come in.",
    "This verse is often used evangelistically, and rightly in principle, but its first setting is a message to the church. The door is not the door of a pagan city but the door of Laodicean hearts and fellowship. Christ offers table communion: He will sup with the one who opens, and that person with Him. The remedy for lukewarmness is not mere information, but restored communion.",
    "Within the A.D. 1844 onward setting, the appeal is piercing. Laodicea may have doctrine, mission, and prophetic identity, yet still need the living presence of Jesus received personally. The judgment-hour church is not prepared by self-confidence, but by opening the heart to the faithful and true Witness who brings repentance, righteousness, sight, and fellowship.",
    "No one else can open the door on our behalf. Christ knocks; the believer must open. His approach is personal, patient, and full of mercy, but He does not force entrance. The most dangerous response is polite delay. To hear His voice and open is to receive the One who turns rebuke into fellowship and self-satisfied religion into living communion."
  ],
  "Revelation 3:21": [
    "Christ promises the overcomer a place with Him on His throne, just as He overcame and sat down with His Father on His throne. The promise is astonishing because it is given to Laodicea, the church that receives the sharpest rebuke. Christ's goal is not humiliation for its own sake. He rebukes in order to prepare a people to share His victory.",
    "The pattern is Christ first, then His people. He overcame through obedience, suffering, faithfulness, death, resurrection, and exaltation. The believer's overcoming is not independent achievement, but participation in His victory. The throne promise does not authorize pride; it magnifies grace. Those who open the door to Christ are invited into fellowship so deep that it ends in shared reign.",
    "For the A.D. 1844 onward church, this promise gives extraordinary hope. Laodicea's need is great, but Christ's purpose is greater. The people corrected by the faithful Witness may become the people who stand with the Lamb, keep God's commandments, hold the faith of Jesus, and share in the final vindication of Christ's kingdom.",
    "Laodicea does not end in despair. The same Christ who threatens to spue out lukewarm religion offers throne fellowship to the overcomer. The path is repentance, reception, communion, and endurance. The promise calls the reader to courage: do not settle for self-satisfied poverty when Christ offers overcoming life and a place with Him."
  ],
  "Revelation 3:22": [
    "The final message to the seven churches ends with the Spirit's summons: whoever has an ear must hear what the Spirit says to the churches. Laodicea is not merely the problem of one ancient congregation or one historical period. The Spirit presses its warning and invitation upon every reader tempted to confuse religious possession with living dependence on Christ.",
    "This closing formula gathers the whole seven-church sequence into a personal call. The churches have shown lost love, suffering faithfulness, compromise, corruption, sleepy reputation, faithful weakness, and lukewarm self-sufficiency. The Spirit does not let the reader remain an observer. Every message becomes a mirror, and every promise becomes an invitation to overcome through Christ.",
    "Laodicea, from A.D. 1844 onward, speaks to the final church living before the closing scenes of Revelation. That makes the last summons especially urgent. The final church must hear the Spirit, not merely explain the prophecy. Its mission to the world depends on receiving Christ's counsel, opening the door, and living by His faith and righteousness.",
    "Revelation is meant to produce hearing that becomes obedience. Christ has spoken with accuracy, severity, tenderness, and promise. The Spirit now asks whether the church will listen. The right response is not defensiveness, but surrender: hear the true Witness, receive His remedy, open the door, and let the final message form a people ready for Jesus."
  ]
};

const verseAdditions = {
  "Revelation 3:1": [
    [0, "The title also reminds Sardis that spiritual life is received, not preserved by institutional memory."],
    [1, "The local story and the spiritual warning therefore move in the same direction: unguarded confidence becomes dangerous."],
    [2, "The date range helps the reader hear the warning as a solemn aftermath to genuine reform."],
    [3, "The church is invited to exchange the applause of history for the breath of God."],
  ],
  "Revelation 3:2": [
    [0, "The command assumes responsibility, but it also assumes that Christ has not finished pleading with Sardis."],
    [1, "Watchfulness becomes practical when it names what is weak and brings it honestly before God."],
    [2, "Reform is never meant to stop at the point where a generation first received light."],
    [3, "Christ's voice calls the church back from decline before decline becomes settled death."],
  ],
  "Revelation 3:3": [
    [0, "Remembering is spiritual work; it gathers the gifts of the past and places them under Christ's present command."],
    [1, "The warning is meant to keep anticipation awake rather than feed fear or curiosity."],
    [2, "The next awakening of prophetic hope would expose whether inherited truth had remained living faith."],
    [3, "The safest place for Sardis is not nostalgia, but renewed surrender to the Lord who comes."],
  ],
  "Revelation 3:4": [
    [0, "The phrase also comforts quiet believers whose faithfulness may be unnoticed by the wider religious community."],
    [1, "Revelation's garment language keeps character, grace, and visible witness closely joined."],
    [2, "Periods of spiritual dullness are never so dark that Christ cannot name those who are His."],
    [3, "The faithful few are called to walk humbly, not to turn remnant faithfulness into superiority."],
  ],
  "Revelation 3:5": [
    [0, "The promises answer Sardis with the very gifts its condition most urgently requires."],
    [1, "Heaven's book language makes the unseen reality of belonging more important than earthly record-keeping."],
    [2, "This is why Sardis must not measure life by reputation, heritage, or institutional survival."],
    [3, "Christ turns the fear of being forgotten into the promise of being confessed before heaven."],
    [3, "Such hope teaches the church to value Christ's verdict above every visible measure of success."],
  ],
  "Revelation 3:6": [
    [0, "The closing words keep the rebuke from becoming a museum label attached only to Sardis."],
    [1, "The Spirit presses the whole message into the conscience of every reader willing to hear."],
    [2, "Dates can help locate the pattern, but the Spirit uses the pattern to awaken the present church."],
    [3, "The proper hearing of Sardis is revival, not argument about who else most resembles it."],
  ],
  "Revelation 3:7": [
    [0, "The church is introduced to Christ's sufficiency before it is asked to consider its own weakness."],
    [1, "The image is judicial, royal, and pastoral at once: Christ both governs access and cares for His people."],
    [2, "The date range gathers the era of revived Bible mission, prophetic expectation, and renewed sanctuary attention."],
    [3, "The promise releases believers from the burden of forcing doors that Christ has not opened."],
  ],
  "Revelation 3:8": [
    [0, "The commendation is gentle because Christ values loyalty that may look unimpressive from the outside."],
    [1, "Open doors in Scripture are never merely convenient circumstances; they are responsibilities given by God."],
    [2, "Mission expanded, Scripture was studied with new urgency, and Christ's ministry drew deeper attention."],
    [3, "A weak church becomes dangerous to the kingdom of darkness when it refuses to deny Christ's name."],
  ],
  "Revelation 3:9": [
    [0, "Revelation's sharp language must be governed by the Lamb's character and by the whole biblical witness."],
    [1, "The promised reversal is not humiliation for its own sake, but recognition of Christ's love."],
    [2, "The historical setting explains why rejection by professed believers could be especially painful."],
    [3, "Christ handles vindication, so the church can remain truthful without becoming vindictive."],
    [3, "That confidence frees the faithful to keep serving even when their motives are misunderstood."],
  ],
  "Revelation 3:10": [
    [0, "The promise is personal because it arises from a relationship of kept word and keeping Lord."],
    [1, "The language of testing also prepares the reader for Revelation's later conflict over worship and allegiance."],
    [2, "The same patience that marked Philadelphia becomes a defining feature of God's final faithful people."],
    [3, "Endurance is possible because Christ's preserving grace is deeper than the trial He permits."],
  ],
  "Revelation 3:11": [
    [0, "The command assumes that the church already possesses light worth guarding."],
    [1, "A crown can be forfeited by surrendering trust, even when no enemy can steal Christ's faithfulness."],
    [2, "Hope in Christ's return gave meaning to mission, disappointment, and continued obedience."],
    [3, "Holding fast is not clenching fearfully; it is staying close to the One who is coming."],
    [3, "The nearness of Christ should produce steadiness, not spiritual recklessness."],
  ],
  "Revelation 3:12": [
    [0, "The promise answers weakness with a future of unshakable belonging."],
    [1, "Names in Revelation are never decorative; they declare ownership, character, allegiance, and destiny."],
    [2, "The sanctuary setting gives Philadelphia's hope both present access and future permanence."],
    [3, "The weak are not merely helped along the way; they are given a permanent place with God."],
    [3, "What now trembles under pressure will one day stand secure in God's presence."],
  ],
  "Revelation 3:13": [
    [0, "Philadelphia's encouragement must be heard wherever Christ's people feel small but desire to remain faithful."],
    [1, "The repeated formula trains the reader to receive every message as living speech."],
    [2, "The historical frame clarifies the pattern without replacing personal obedience."],
    [3, "The church hears rightly when Christ's open door produces courage, mission, and steady loyalty."],
    [3, "Hearing Philadelphia means trusting Christ's authority more than the church's apparent strength."],
  ],
  "Revelation 3:14": [
    [0, "The titles are not ornamental; they are the medicine for a church whose self-knowledge has failed."],
    [1, "Because Christ is Creator and true witness, His word can both expose and remake Laodicea."],
    [2, "The date marks the solemn period in which final light increases and self-deception becomes especially dangerous."],
    [3, "The cure begins when the church lets the faithful Witness speak more loudly than its own confidence."],
  ],
  "Revelation 3:15": [
    [0, "The rebuke reaches works because works reveal the temperature of the heart."],
    [1, "The image is concrete enough that Laodiceans could taste the point before they argued with it."],
    [2, "Great responsibility does not guarantee spiritual usefulness; it can even make lukewarmness more serious."],
    [3, "Christ's words press beyond feeling and ask whether the life actually serves His purpose."],
    [3, "The issue is usefulness to Christ, not emotional intensity by itself."],
  ],
  "Revelation 3:16": [
    [0, "The force of the image is meant to break through spiritual numbness."],
    [1, "The warning is severe because the condition is not harmless; it misrepresents Christ while claiming Him."],
    [2, "End-time responsibility makes the warning sharper, because a lukewarm witness cannot bear a final message faithfully."],
    [3, "The severity is itself a mercy, because Christ speaks while repentance is still possible."],
    [3, "A church that receives the warning can still become useful, warm, and faithful in His hands."],
    [3, "Christ speaks strongly because He still desires recovery."],
  ],
  "Revelation 3:17": [
    [0, "Laodicea's tragedy is not poverty alone, but poverty hidden beneath confidence."],
    [1, "The city's success becomes a parable of the church's blindness before God."],
    [2, "The final church is therefore warned against mistaking doctrinal possession for spiritual wealth."],
    [3, "The doorway to healing opens when the church stops saying 'need of nothing.'"],
    [3, "Christ can clothe and heal only those who stop defending the illusion of sufficiency."],
    [3, "Honest need is safer than confident emptiness."],
  ],
  "Revelation 3:18": [
    [0, "Christ names the remedy with the same precision He used in naming the disease."],
    [1, "Every item exposes the inadequacy of Laodicea's local pride and redirects the church to Christ."],
    [2, "The counsel keeps final preparation centered on Christ's gifts rather than the church's achievements."],
    [3, "Laodicea's poverty becomes hopeful only when it becomes honest before the One who supplies."],
  ],
  "Revelation 3:19": [
    [0, "Love explains the rebuke, and love also makes indifference impossible."],
    [1, "Discipline is therefore not the opposite of grace; it is grace refusing to leave the church asleep."],
    [2, "A final message carried by an uncorrected people would contradict the very Christ it proclaims."],
    [3, "The rebuked church is not asked to perform shame, but to turn with earnestness toward Christ."],
    [3, "Repentance is the path by which love's rebuke becomes restoration."],
  ],
  "Revelation 3:20": [
    [0, "The sentence is one of the tenderest pictures in the whole Laodicean rebuke."],
    [1, "Table fellowship means welcome, reconciliation, and shared life, not merely corrected information."],
    [2, "The final church needs Christ not only in its message, but at the center of its fellowship."],
    [3, "Opening the door is the beginning of restored warmth, sight, righteousness, and mission."],
    [3, "The promise is intimate because the remedy for Laodicea is Christ Himself."],
  ],
  "Revelation 3:21": [
    [0, "The highest promise is offered to the church that has just received the deepest exposure."],
    [1, "The throne promise is grace from beginning to end because no Laodicean overcomes apart from Christ's overcoming."],
    [2, "The final church is rebuked with the throne in view, not with rejection as Christ's desired end."],
    [3, "Christ's promise gives Laodicea a future larger than its shame, if it will overcome in Him."],
    [3, "The rebuke is severe because the destiny offered is so high."],
    [3, "Grace lifts the repentant to reign with Christ."],
  ],
  "Revelation 3:22": [
    [0, "The final line refuses to let Laodicea's warning remain safely outside the reader."],
    [1, "The seven messages together form a searching portrait of Christ's people under His care."],
    [2, "The last period must hear, because explanation without obedience would be another form of lukewarmness."],
    [3, "The Spirit's last word to the churches is still mercy calling for a living response."],
    [3, "The seven messages close by asking for surrender, not merely recognition."],
    [3, "To hear is to answer Christ now."],
  ]
};

function enrichParagraphs(reference, paragraphs) {
  const additions = verseAdditions[reference] ?? [];
  const next = paragraphs.map((paragraph) => paragraph.trim());
  for (const [index, addition] of additions) {
    if (!next[index].includes(addition)) {
      next[index] = `${next[index]} ${addition}`;
    }
  }
  return next;
}

const wordNotesByVerse = {
  "Revelation 3:1": [
    note("Angel", "The messenger or representative through whom Christ addresses the congregation.", ["Revelation 1:20", "Malachi 2:7"]),
    note("Sardis", "A city known for wealth and past confidence, fitting Christ's warning about reputation without life.", ["Revelation 3:1", "Matthew 23:27"]),
    note("Seven Spirits", "The fullness of the Spirit's life-giving presence and work before God's throne.", ["Isaiah 11:2", "Zechariah 4:2-6", "Revelation 1:4"]),
    note("Seven stars", "The messengers of the churches held under Christ's care and authority.", ["Revelation 1:16", "Revelation 1:20", "Daniel 12:3"])
  ],
  "Revelation 3:2": [
    note("Watchful", "Spiritual wakefulness that refuses careless confidence and attends to Christ's warning.", ["Matthew 24:42", "1 Thessalonians 5:6", "Revelation 16:15"]),
    note("Strengthen", "The active work of guarding and reviving what remains before it dies.", ["Hebrews 12:12-13", "Jude 1:20-21"]),
    note("Perfect before God", "Works brought to completion before heaven's standard, not merely approved by human reputation.", ["James 2:22", "Hebrews 13:21"])
  ],
  "Revelation 3:3": [
    note("Remember", "A call to return to truth already received and to let memory become obedience.", ["Deuteronomy 8:2", "Hebrews 2:1", "Revelation 2:5"]),
    note("Hold fast", "To cling to Christ's word instead of letting received light slip away.", ["2 Timothy 1:13", "Hebrews 10:23", "Revelation 3:11"]),
    note("Thief", "An image of unexpected arrival for those who refuse watchfulness.", ["Matthew 24:43", "1 Thessalonians 5:2-4", "Revelation 16:15"])
  ],
  "Revelation 3:4": [
    note("Few names", "Christ knows faithful individuals even when the wider community is spiritually weak.", ["1 Kings 19:18", "Romans 11:4-5", "Revelation 3:4"]),
    note("Defiled garments", "A stained life that no longer reflects covenant faithfulness.", ["Jude 1:23", "Zechariah 3:3-5"]),
    note("Walk in white", "Fellowship with Christ in purity, victory, and His provided righteousness.", ["Ecclesiastes 9:8", "Revelation 7:14", "Revelation 19:8"])
  ],
  "Revelation 3:5": [
    note("White raiment", "Christ-given purity and victorious righteousness for the overcomer.", ["Isaiah 61:10", "Revelation 7:14", "Revelation 19:8"]),
    note("Book of life", "The heavenly record of those who belong to God and are acknowledged by Christ.", ["Exodus 32:32-33", "Daniel 12:1", "Revelation 20:12"]),
    note("Confess his name", "Christ's public acknowledgment of the faithful before the Father and the angels.", ["Matthew 10:32", "Luke 12:8", "Revelation 3:5"])
  ],
  "Revelation 3:6": [
    note("Ear", "A symbol of attentive reception that turns Christ's word into obedience.", ["Isaiah 6:9-10", "Matthew 11:15", "Revelation 13:9"]),
    note("Spirit saith", "Christ's message continues to reach all the churches through the Spirit.", ["John 16:13", "Hebrews 3:7-8", "Revelation 22:17"])
  ],
  "Revelation 3:7": [
    note("Philadelphia", "The city name means brotherly love, fitting a message marked by faithfulness, open doors, and little strength.", ["Revelation 3:7-8", "Hebrews 13:1"]),
    note("Holy and true", "Christ's character and testimony are utterly reliable in contrast to false claims.", ["Acts 3:14", "John 14:6", "Revelation 19:11"]),
    note("Key of David", "Royal authority to open and shut, drawn from the Davidic stewardship image.", ["Isaiah 22:22", "Revelation 1:18", "Revelation 3:7"])
  ],
  "Revelation 3:8": [
    note("Open door", "Christ-given access, mission, and opportunity that no opposing power can finally shut.", ["Isaiah 22:22", "1 Corinthians 16:9", "Colossians 4:3"]),
    note("Little strength", "Limited outward power joined to real faithfulness before Christ.", ["2 Corinthians 12:9", "Revelation 3:8"]),
    note("Kept my word", "Obedient loyalty to Christ's instruction under pressure.", ["John 14:23", "John 17:6", "Revelation 14:12"])
  ],
  "Revelation 3:9": [
    note("Synagogue of Satan", "False religious claim joined to accusation and opposition against Christ's faithful witnesses.", ["John 8:39-44", "Romans 2:28-29", "Revelation 2:9"]),
    note("Worship before thy feet", "A reversal image in which opponents are brought to acknowledge God's favor upon His people.", ["Isaiah 49:23", "Isaiah 60:14"]),
    note("I have loved thee", "Christ's public vindication of His faithful people rests on His covenant love.", ["John 13:1", "John 17:23", "Revelation 3:9"])
  ],
  "Revelation 3:10": [
    note("Word of my patience", "The enduring word of Christ that forms patient loyalty in His people.", ["Luke 21:19", "Hebrews 10:36", "Revelation 14:12"]),
    note("Hour of temptation", "A worldwide season of testing in which allegiance to Christ is brought into focus.", ["Daniel 12:1", "Matthew 24:21-22", "Revelation 13:10"]),
    note("Dwell upon the earth", "A Revelation phrase for those whose settled allegiance is earthbound rather than heavenly.", ["Revelation 6:10", "Revelation 13:8", "Revelation 17:8"])
  ],
  "Revelation 3:11": [
    note("Come quickly", "Christ's promised appearing gives urgency and courage to endurance.", ["Revelation 22:7", "Revelation 22:12", "Revelation 22:20"]),
    note("Hold fast", "To guard what Christ has given until He comes.", ["Hebrews 10:23", "Revelation 2:25", "Revelation 3:11"]),
    note("Crown", "The victor's reward for faithful endurance.", ["James 1:12", "2 Timothy 4:8", "1 Peter 5:4"])
  ],
  "Revelation 3:12": [
    note("Pillar", "A symbol of permanence, stability, and honored placement in God's presence.", ["Galatians 2:9", "1 Timothy 3:15", "Revelation 3:12"]),
    note("Temple", "The sanctuary setting of God's presence, worship, and final belonging.", ["Hebrews 8:1-2", "Revelation 11:19", "Revelation 21:22"]),
    note("New Jerusalem", "The city of God's final dwelling with His redeemed people.", ["Hebrews 12:22", "Revelation 21:2", "Revelation 21:10"]),
    note("New name", "A God-given identity of covenant belonging and fellowship with Christ.", ["Isaiah 56:5", "Isaiah 62:2", "Revelation 14:1"])
  ],
  "Revelation 3:13": [
    note("Ear", "The hearing Christ seeks is responsive, obedient, and personal.", ["Matthew 13:9", "Hebrews 3:7-8", "Revelation 2:7"]),
    note("Churches", "Every message is addressed to all the churches, not only to the congregation named.", ["Revelation 1:11", "Revelation 2:7", "Revelation 3:13"])
  ],
  "Revelation 3:14": [
    note("Amen", "Christ as the final, faithful, and reliable word of God.", ["Isaiah 65:16", "2 Corinthians 1:20", "Revelation 3:14"]),
    note("Faithful and true witness", "Christ tells the truth about God and the truth about the church's condition.", ["Revelation 1:5", "John 18:37", "Revelation 19:11"]),
    note("Beginning of creation", "Christ as source, ruler, and inaugurator of creation and new creation, not a created being.", ["John 1:3", "Colossians 1:15-18", "Revelation 21:5"])
  ],
  "Revelation 3:15": [
    note("Works", "Christ evaluates the real fruit of Laodicea's life, not its self-description.", ["Matthew 7:16-20", "Revelation 2:23", "Revelation 3:15"]),
    note("Cold nor hot", "Useful water imagery turned into a warning about spiritual uselessness.", ["Romans 12:11", "Titus 2:14", "Revelation 3:15"]),
    note("Hot", "A figure for fervent usefulness and wholehearted responsiveness to Christ.", ["Luke 24:32", "Romans 12:11"])
  ],
  "Revelation 3:16": [
    note("Lukewarm", "A tepid, unusable condition that pictures self-satisfied religion without living communion.", ["Revelation 3:16", "Romans 12:11"]),
    note("Spue", "A shocking image of rejection meant to awaken the church before it is too late.", ["Leviticus 18:25", "Hebrews 10:38", "Revelation 3:16"])
  ],
  "Revelation 3:17": [
    note("Rich and increased", "Laodicea's self-confidence borrows the language of wealth and sufficiency.", ["Hosea 12:8", "Luke 12:19-21", "1 Corinthians 4:8"]),
    note("Need of nothing", "The most dangerous spiritual claim because it leaves no room to receive from Christ.", ["Proverbs 30:12", "Luke 18:11-14", "Revelation 3:17"]),
    note("Poor, blind, and naked", "Christ's diagnosis of poverty, lack of discernment, and uncovered shame.", ["John 9:39-41", "2 Corinthians 8:9", "Revelation 3:18"])
  ],
  "Revelation 3:18": [
    note("Gold tried in the fire", "Faith and love purified by trial and received from Christ.", ["1 Peter 1:7", "Galatians 5:6", "James 2:5"]),
    note("White raiment", "Christ's righteousness covering shame and forming a life fit for His presence.", ["Zechariah 3:3-5", "Revelation 7:14", "Revelation 19:8"]),
    note("Eyesalve", "Spiritual discernment that heals Laodicean blindness.", ["John 9:6-7", "Ephesians 1:17-18", "Revelation 3:18"])
  ],
  "Revelation 3:19": [
    note("Rebuke", "Christ exposes what is wrong so that restoration can begin.", ["Proverbs 27:5", "2 Timothy 4:2", "Revelation 3:19"]),
    note("Chasten", "Loving discipline that trains God's people for holiness.", ["Proverbs 3:11-12", "Hebrews 12:5-11"]),
    note("Zealous and repent", "Wholehearted turning from self-sufficiency to Christ.", ["2 Corinthians 7:10-11", "Titus 2:14", "Revelation 3:19"])
  ],
  "Revelation 3:20": [
    note("Door", "The closed place of Laodicean fellowship and heart response where Christ patiently knocks.", ["Song of Solomon 5:2", "Luke 12:36", "Revelation 3:20"]),
    note("Knock", "Christ's personal and persistent initiative toward a self-sufficient church.", ["Matthew 7:7", "Luke 12:36", "Revelation 3:20"]),
    note("Sup", "Restored table fellowship with Christ, the opposite of distant religious profession.", ["John 14:23", "Luke 22:29-30", "Revelation 19:9"])
  ],
  "Revelation 3:21": [
    note("Overcometh", "Victory through union with Christ, who has already overcome.", ["John 16:33", "1 John 5:4-5", "Revelation 12:11"]),
    note("Throne", "Shared reign with Christ, grounded in His victory and exaltation.", ["Daniel 7:27", "Revelation 20:4", "Revelation 22:5"]),
    note("I also overcame", "Christ's own path of obedience, suffering, resurrection, and exaltation becomes the pattern for His people.", ["Hebrews 12:2", "Philippians 2:8-11", "Revelation 3:21"])
  ],
  "Revelation 3:22": [
    note("Ear", "The closing summons requires personal, obedient hearing.", ["Matthew 11:15", "Hebrews 3:7-8", "Revelation 13:9"]),
    note("Spirit", "The Spirit carries Christ's final church message into the life of every hearer.", ["John 16:13", "Revelation 2:7", "Revelation 22:17"])
  ]
};

const crossReferencesByVerse = {
  "Revelation 3:1": ["Isaiah 11:2", "Zechariah 4:2-6", "Revelation 1:4", "Revelation 1:16", "Revelation 1:20", "Ephesians 5:14"],
  "Revelation 3:2": ["Matthew 24:42", "1 Thessalonians 5:6", "Hebrews 12:12-13", "James 2:22", "Revelation 16:15"],
  "Revelation 3:3": ["Hebrews 2:1", "2 Timothy 1:13", "Matthew 24:43", "1 Thessalonians 5:2-4", "Revelation 16:15"],
  "Revelation 3:4": ["Zechariah 3:3-5", "Jude 1:23", "Revelation 7:14", "Revelation 19:8", "Ecclesiastes 9:8"],
  "Revelation 3:5": ["Exodus 32:32-33", "Daniel 12:1", "Matthew 10:32", "Luke 10:20", "Revelation 20:12", "Revelation 19:8"],
  "Revelation 3:6": ["Isaiah 6:9-10", "Matthew 11:15", "Hebrews 3:7-8", "Revelation 2:7", "Revelation 22:17"],
  "Revelation 3:7": ["Isaiah 22:22", "Revelation 1:18", "John 14:6", "Acts 3:14", "1 Corinthians 16:9"],
  "Revelation 3:8": ["Isaiah 22:22", "1 Corinthians 16:9", "2 Corinthians 2:12", "Colossians 4:3", "John 17:6", "Revelation 3:7"],
  "Revelation 3:9": ["Isaiah 49:23", "Isaiah 60:14", "Romans 2:28-29", "John 8:39-44", "Revelation 2:9"],
  "Revelation 3:10": ["John 17:15", "2 Peter 2:9", "Daniel 12:1", "Matthew 24:21-22", "Revelation 13:10", "Revelation 14:12"],
  "Revelation 3:11": ["Revelation 22:7", "Revelation 22:12", "Revelation 22:20", "Hebrews 10:23", "James 1:12", "2 Timothy 4:8"],
  "Revelation 3:12": ["1 Timothy 3:15", "Isaiah 56:5", "Hebrews 12:22", "Revelation 21:2", "Revelation 21:10", "Revelation 22:4"],
  "Revelation 3:13": ["Matthew 13:9", "Hebrews 3:7-8", "Revelation 1:11", "Revelation 2:7", "Revelation 22:17"],
  "Revelation 3:14": ["Isaiah 65:16", "2 Corinthians 1:20", "John 1:3", "Colossians 1:15-18", "Revelation 1:5", "Revelation 19:11"],
  "Revelation 3:15": ["Romans 12:11", "Titus 2:14", "Matthew 6:24", "Revelation 3:1", "Revelation 3:19"],
  "Revelation 3:16": ["Revelation 3:16", "Hebrews 10:38", "Romans 12:11", "Matthew 5:13", "Titus 1:16"],
  "Revelation 3:17": ["Hosea 12:8", "Luke 12:19-21", "1 Corinthians 4:8", "John 9:39-41", "2 Corinthians 8:9"],
  "Revelation 3:18": ["Isaiah 55:1", "1 Peter 1:7", "Zechariah 3:3-5", "Revelation 7:14", "John 9:6-7", "2 Corinthians 5:3"],
  "Revelation 3:19": ["Proverbs 3:11-12", "Hebrews 12:5-11", "2 Corinthians 7:10-11", "Titus 2:14", "Revelation 3:19"],
  "Revelation 3:20": ["Song of Solomon 5:2", "John 14:23", "Luke 12:36", "Luke 22:29-30", "Revelation 19:9"],
  "Revelation 3:21": ["John 16:33", "Hebrews 12:2", "Daniel 7:27", "Revelation 2:26-27", "Revelation 20:4", "Revelation 22:5"],
  "Revelation 3:22": ["Matthew 11:15", "Hebrews 3:7-8", "Revelation 2:7", "Revelation 22:17"]
};

const chapterSymbols = [
  {
    symbol: "Seven Spirits",
    references: ["Revelation 3:1"],
    meaning: "The fullness of the Spirit's presence and life-giving work.",
    scriptureReferences: ["Isaiah 11:2", "Zechariah 4:2-6", "Revelation 1:4", "Revelation 4:5"],
    sources: [docSource, technicalSource]
  },
  {
    symbol: "Seven stars",
    references: ["Revelation 3:1"],
    meaning: "The messengers of the churches held under Christ's authority and care.",
    scriptureReferences: ["Daniel 12:3", "Revelation 1:16", "Revelation 1:20", "Revelation 2:1"],
    sources: [docSource, technicalSource]
  },
  {
    symbol: "White garments",
    references: ["Revelation 3:4-5", "Revelation 3:18"],
    meaning: "Christ-given purity, victory, and righteousness.",
    scriptureReferences: ["Isaiah 61:10", "Zechariah 3:3-5", "Revelation 7:14", "Revelation 19:8"],
    sources: [docSource, technicalSource]
  },
  {
    symbol: "Book of life",
    references: ["Revelation 3:5"],
    meaning: "The heavenly register of those who belong to God and are acknowledged by Christ.",
    scriptureReferences: ["Exodus 32:32-33", "Daniel 12:1", "Luke 10:20", "Revelation 20:12"],
    sources: [docSource, mcnultySource]
  },
  {
    symbol: "Key of David",
    references: ["Revelation 3:7"],
    meaning: "Christ's decisive royal authority to open and shut.",
    scriptureReferences: ["Isaiah 22:22", "Matthew 16:19", "Revelation 1:18", "Revelation 3:7"],
    sources: [docSource, technicalSource]
  },
  {
    symbol: "Open door",
    references: ["Revelation 3:7-8"],
    meaning: "Christ-given access, mission, and opportunity that no human power can finally close.",
    scriptureReferences: ["Isaiah 22:22", "1 Corinthians 16:9", "Colossians 4:3", "Revelation 4:1"],
    sources: [docSource, mcnultySource]
  },
  {
    symbol: "Synagogue of Satan",
    references: ["Revelation 3:9"],
    meaning: "False religious claim joined to opposition against Christ's faithful witnesses.",
    scriptureReferences: ["John 8:39-44", "Romans 2:28-29", "Revelation 2:9", "Revelation 12:10"],
    sources: [docSource, technicalSource]
  },
  {
    symbol: "Hour of temptation",
    references: ["Revelation 3:10"],
    meaning: "A worldwide testing of allegiance in which Christ preserves those who keep His word.",
    scriptureReferences: ["Daniel 12:1", "John 17:15", "2 Peter 2:9", "Revelation 14:12"],
    sources: [docSource, mcnultySource]
  },
  {
    symbol: "Crown",
    references: ["Revelation 3:11"],
    meaning: "The victor's reward of faithful endurance.",
    scriptureReferences: ["James 1:12", "2 Timothy 4:8", "1 Peter 5:4", "Revelation 2:10"],
    sources: [docSource, mcnultySource]
  },
  {
    symbol: "Pillar",
    references: ["Revelation 3:12"],
    meaning: "Permanent, honored placement in the presence of God.",
    scriptureReferences: ["Galatians 2:9", "1 Timothy 3:15", "Revelation 3:12", "Revelation 21:22"],
    sources: [docSource, technicalSource]
  },
  {
    symbol: "New Jerusalem",
    references: ["Revelation 3:12"],
    meaning: "The city of final covenant belonging where God dwells with His people.",
    scriptureReferences: ["Isaiah 54:11-12", "Hebrews 12:22", "Revelation 21:2", "Revelation 21:10"],
    sources: [docSource, technicalSource]
  },
  {
    symbol: "Lukewarm water",
    references: ["Revelation 3:15-16"],
    meaning: "Self-satisfied religion that is neither spiritually refreshing nor healingly fervent.",
    scriptureReferences: ["Romans 12:11", "Titus 1:16", "Revelation 3:15-16", "Revelation 3:19"],
    sources: [docSource, technicalSource]
  },
  {
    symbol: "Gold tried in the fire",
    references: ["Revelation 3:18"],
    meaning: "Faith and love purified by trial and received from Christ.",
    scriptureReferences: ["1 Peter 1:7", "Galatians 5:6", "James 2:5", "Revelation 3:18"],
    sources: [docSource, mcnultySource]
  },
  {
    symbol: "Eyesalve",
    references: ["Revelation 3:18"],
    meaning: "Spiritual discernment that heals Laodicean blindness.",
    scriptureReferences: ["John 9:39-41", "Ephesians 1:17-18", "2 Peter 1:9", "Revelation 3:18"],
    sources: [docSource, technicalSource]
  },
  {
    symbol: "Door",
    references: ["Revelation 3:20"],
    meaning: "The place of personal response where Christ seeks restored fellowship with His church.",
    scriptureReferences: ["Song of Solomon 5:2", "Luke 12:36", "John 14:23", "Revelation 3:20"],
    sources: [docSource, mcnultySource]
  },
  {
    symbol: "Throne",
    references: ["Revelation 3:21"],
    meaning: "Shared reign with Christ, grounded in His victory and exaltation.",
    scriptureReferences: ["Daniel 7:27", "Hebrews 12:2", "Revelation 20:4", "Revelation 22:5"],
    sources: [docSource, mcnultySource]
  }
];

const chapter = JSON.parse(readFileSync(chapterPath, "utf8"));

for (const verse of chapter.verses) {
  const paragraphs = enrichParagraphs(verse.verse, commentary[verse.verse]);
  if (!paragraphs) throw new Error(`Missing commentary for ${verse.verse}`);
  if (paragraphs.length !== 4) throw new Error(`${verse.verse} should have exactly four paragraphs`);

  const detailedExplanation = paragraphs.join("\n\n");
  const totalWords = wordCount(detailedExplanation);
  if (totalWords < 300 || totalWords > 500) {
    throw new Error(`${verse.verse} commentary is ${totalWords} words`);
  }
  paragraphs.forEach((paragraph, index) => {
    const count = wordCount(paragraph);
    if (count < 45 || count > 125) {
      throw new Error(`${verse.verse} paragraph ${index + 1} is ${count} words`);
    }
    assertPublicText(verse.verse, paragraph);
  });

  verse.explanation = paragraphs[0];
  verse.historicalBackground = paragraphs[1];
  verse.symbolicMeaning = paragraphs[1];
  verse.adventistInsight = paragraphs[2];
  verse.propheticSignificance = paragraphs[2];
  verse.application = paragraphs[3];
  verse.crossReferences = crossReferencesByVerse[verse.verse] ?? verse.crossReferences;
  verse.wordNotes = wordNotesByVerse[verse.verse] ?? [];
  verse.sources = sourceList;
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

chapter.title = "Messages to Sardis, Philadelphia, and Laodicea";
chapter.summary = "Revelation 3 completes the seven messages with Sardis, Philadelphia, and Laodicea. Christ awakens a church with a dead reputation, encourages faithful weakness, and lovingly rebukes self-sufficient lukewarmness.";
chapter.historicalContext = "The churches were real congregations in Roman Asia, and their messages also trace a broad Christian sequence: Sardis A.D. 1565-1740, Philadelphia A.D. 1740-1844, and Laodicea from A.D. 1844 onward.";
chapter.literaryContext = "The chapter completes Christ's searching diagnosis of the churches before the throne-room vision. It moves from spiritual death, to an open door, to Christ knocking at the door of a self-satisfied church.";
chapter.themes = ["Watchfulness", "White raiment", "Book of life", "Open door", "Philadelphia", "Laodicea", "Lukewarmness", "Christ's final appeal"];
chapter.outline = [
  { range: "3:1-6", title: "Sardis", summary: "A church with a name for life is called to wake, strengthen what remains, and walk in white." },
  { range: "3:7-13", title: "Philadelphia", summary: "A church with little strength receives Christ's open door and the promise of secure belonging." },
  { range: "3:14-22", title: "Laodicea", summary: "A self-sufficient church is rebuked in love and invited into restored fellowship with Christ." }
];
chapter.teachingNotes = {
  openingQuestion: "What kind of life does Christ see beneath a church's reputation, opportunity, or prosperity?",
  mainPoint: "Revelation 3 completes the seven messages. Sardis is called from reputation to life, Philadelphia is encouraged to walk through Christ's open door, and Laodicea is invited to receive the remedies only Christ can give.",
  keyVerses: ["Revelation 3:5", "Revelation 3:8", "Revelation 3:18", "Revelation 3:20"],
  importantSymbols: ["White garments", "Book of life", "Key of David", "Open door", "Gold tried in the fire", "Eyesalve", "Door", "Throne"],
  discussionQuestions: [
    "How does Sardis warn against depending on reputation instead of living faith?",
    "What comfort does Philadelphia receive from Christ's authority over the open door?",
    "Why does Laodicea need Christ's diagnosis before it can receive His fellowship?"
  ],
  commonMisunderstandings: [
    "Treating the dates as a substitute for hearing Christ's personal call.",
    "Reading Laodicea only as criticism instead of seeing the love behind the rebuke."
  ],
  adventistEmphasis: "Sardis commonly points to much of post-Reformation Protestantism, Philadelphia to the missionary and Advent awakening, and Laodicea to the judgment-hour church called to repentance, discernment, and fellowship with Christ.",
  closingAppeal: "Hear what the Spirit is saying and answer Christ with repentance, faithfulness, and hope."
};
chapter.sources = sourceList;
chapter.symbols = chapterSymbols;
chapter.crossReferences = [...new Set(chapter.verses.flatMap((verse) => verse.crossReferences))];

writeFileSync(chapterPath, `${JSON.stringify(chapter, null, 2)}\n`);
console.log("Imported enriched Revelation 3 commentary.");
