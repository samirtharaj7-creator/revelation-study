import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const chapterPath = join(root, "content", "revelation", "chapter-06.json");

const docSource = {
  sourceId: "revelation-chapter-six-docx",
  locator: "Revelation Chapter Six manuscript",
  claimType: "manuscript-synthesis",
  priority: 1
};

const mcnultySource = {
  sourceId: "revelation-practical-living-in-the-judgment-hour",
  locator: "Priority Adventist commentary for Revelation 6",
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

const publicBannedPhrases = [
  "Adventist interpretation",
  "Adventist historicist",
  "Adventist historicism",
  "Adventist reading",
  "In Adventist",
  "historicist",
  "church-history",
  "church history",
  "manuscript",
  "uploaded",
  "source material",
  "source language",
  "The pastoral appeal",
  "The practical appeal",
  "The appeal is",
  "This reading",
  "The passage presents",
  "The prophecy presents"
];

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

function assertPublicText(verse, text) {
  for (const phrase of publicBannedPhrases) {
    if (text.includes(phrase)) {
      throw new Error(`${verse} contains banned public phrase: ${phrase}`);
    }
  }
}

const commentary = {
  "Revelation 6:1": [
    "Revelation 6 begins with the Lamb opening the first seal. That detail must govern the entire chapter. The seals do not begin with horses, fear, or disaster; they begin with Christ, the slain and risen One who has just taken the scroll. One of the four beasts, better understood as a living creature of the throne room, speaks with a voice like thunder. The KJV word can sound strange to modern ears, but the scene is not monstrous. It is heavenly, liturgical, and judicial. The thunder-like summons tells John that history is being called forward from the presence of God.",
    "The first seal continues the larger movement that began in Revelation 5. The scroll in the Father's hand has been taken by the Lamb, and now its seals are opened one by one. The living creature's call, 'Come and see,' keeps John looking at history from heaven's side. The events that follow are not random violence outside Christ's awareness. They are disclosed under His authority. The Old Testament background of heavenly horsemen in Zechariah helps the reader understand that these riders are symbolic agents in a prophetic drama, not ordinary cavalry. The throne room remains the interpretive center even after the vision turns toward earth.",
    "The first four seals trace a broad movement through the public experience of the church: gospel advance, persecution, compromise, and spiritual death. The first seal begins the sequence after Christ's victory and ascension, corresponding naturally to the apostolic and early post-apostolic period, about A.D. 31-100. The opening voice does not give the date directly, but the placement of the seal after the Lamb's enthronement and before the later decline gives the historical flow its starting point. Before the church meets sword, famine, and death, Revelation shows that the story begins with the Lamb's action.",
    "This first verse teaches the right posture for the whole chapter. Prophetic history can become frightening if detached from Christ, but the seal opens in His hand. The church is allowed to see conflict because the Lamb wants His servants watchful, not blind. The summons is not permission to speculate wildly; it is an invitation to look carefully, reverently, and with trust. Every horse that rides in this chapter rides only after the Lamb opens the seal."
  ],
  "Revelation 6:2": [
    "John sees a white horse. Its rider has a bow, a crown is given to him, and he goes forth conquering and to conquer. White in Revelation normally carries the sense of purity, victory, and heavenly approval. The image therefore fits the early gospel movement rather than a corrupt or hostile power. This rider does not appear as a parody of Christ in Revelation 19, but as the first movement of the seal sequence: the conquering advance of the gospel after the victory of the Lamb. The bow gives the image force; the crown shows granted victory; the repeated conquering language stresses forward movement.",
    "The symbol reaches into the language of biblical conquest, yet the conquest is not the conquest of empire. Psalm 45 pictures the royal rider going forth with truth, meekness, and righteousness, and Revelation has already shown that Christ conquers by sacrifice. The early church's advance was not secured by armies, property, or political control. It moved through preaching, witness, endurance, Scripture, and the Holy Spirit. The rider's crown is given, not seized. That matters. The gospel's success is not self-generated power. It is the fruit of Christ's victory and heaven's authorization.",
    "The white horse naturally aligns with the church's earliest period, about A.D. 31-100, when the apostolic witness moved from Jerusalem into the wider Roman world. Acts records the gospel crossing ethnic and geographic boundaries with astonishing speed, and the messages to the churches begin with Ephesus, the period of apostolic labor, doctrinal vigilance, and initial decline of first love. The first seal does not claim that the early church was flawless. It does show the gospel going out in purity and power before the later colors of bloodshed, scarcity, and death darken the sequence.",
    "The verse rebukes both fear and passivity. The Lamb's people are not merely survivors of history; they are witnesses sent into it. A pure message is meant to move. At the same time, the church must not imitate worldly conquest. The white horse teaches that gospel victory is bound to truth, holiness, and dependence on Christ. When the church seeks conquest without purity, it has already begun to lose the meaning of the first seal."
  ],
  "Revelation 6:3": [
    "When the Lamb opens the second seal, John hears the second beast, that is, the second living creature, say, 'Come and see.' The verse is brief, but the repetition is important. The Lamb is still the One opening the seal, and the voice still comes from the heavenly throne room. The red horse does not gallop into the vision because history has escaped divine government. It comes because the Lamb permits the church to see the next stage of conflict. The seal sequence is controlled from heaven even when what appears on earth is violence.",
    "The movement from the first seal to the second is sobering. The gospel's early advance did not remove opposition. In the New Testament itself, the witness of Christ provoked resistance, imprisonment, slander, and martyrdom. Jesus had warned that His followers would be hated for His name's sake, and Revelation now places that warning within the symbolic structure of the seals. The living creature's summons is therefore not a dramatic flourish. It prepares John to see what happens when the conquering gospel meets the anger of the world.",
    "The second seal corresponds naturally to the suffering church, about A.D. 100-313, the period often connected with Smyrna. During these centuries, believers faced local hostility, imperial suspicion, social exclusion, imprisonment, and waves of official persecution. The period reaches its fiercest imperial expression in the Diocletian persecution, A.D. 303-313, when the Roman state attempted to suppress Christian worship and destroy Christian Scriptures. The seal does not reduce all history to one persecution, but it gathers the blood-marked character of the age into one red symbol.",
    "The verse prepares believers to read persecution without surprise. Faithfulness may bring conflict precisely because Christ's lordship challenges every rival claim. Yet the Lamb opens the seal before the red horse appears. That order gives courage. The church is not promised an easy road, but it is not abandoned on the hard road. The summons to see is also a summons to endure."
  ],
  "Revelation 6:4": [
    "The second horse is red, and its rider is permitted to take peace from the earth so that people kill one another. A great sword is given to him. The red color points naturally to bloodshed, and the removed peace shows a world in which witness to Christ is answered by violence. The sword is not placed in the rider's hand as an accidental detail. It interprets the seal as a period of conflict, coercion, and killing. The power is given, which means even this terrible movement remains limited by the Lamb's authority.",
    "The verse echoes Jesus' warning that His message would expose deep divisions. Christ is the Prince of Peace, yet His truth brings conflict when hearts refuse His reign. The sword in this seal should not be confused with the gospel's own method. The church does not conquer by killing. Rather, the red horse shows how a hostile world removes peace and uses force against the faithful. In this sense the seal reveals both persecution and the moral disorder that follows when human power resists the Lamb.",
    "The red horse fits the period of Roman persecution, about A.D. 100-313. The church's witness spread, but so did pressure. Christians could be accused of disloyalty because they would not offer worship to the gods or emperor. Many suffered poverty, imprisonment, torture, and death. The great sword reaches its public historical intensity in the final pagan Roman attempt to crush Christianity under Diocletian. Yet the bloodshed did not extinguish the witness. The seal shows conflict, but the Lamb's hand means conflict is not final.",
    "This verse warns the church not to measure faithfulness by social peace alone. Some peace is only the calm produced by compromise. There are times when truth disturbs the world because it exposes idols. Believers are called to endure without taking up the persecutor's spirit. The Lamb's people may suffer under the sword, but they must not become servants of the sword."
  ],
  "Revelation 6:5": [
    "The third seal opens after the third beast, the throne-room living creature, summons John to see. John sees a black horse, and its rider holds a pair of balances in his hand. The color is a dramatic contrast with the white horse of the first seal. White suggested gospel purity and victorious advance; black suggests darkness, scarcity, and distress. The balances sharpen the image. They are the tools of rationing, careful measuring, and famine conditions. The seal therefore moves from the blood of persecution into the deeper danger of spiritual scarcity.",
    "Balances in Scripture can represent judgment, measurement, and deprivation. When food must be weighed out carefully, abundance has disappeared. The Old Testament sometimes uses famine as a covenant warning, and Amos speaks of a famine of hearing the words of the Lord. Revelation 6 uses economic imagery, but the setting points beyond ordinary market anxiety. The church has entered a stage in which the bread of life is no longer freely and richly available. Truth remains, but it is measured, obscured, and controlled.",
    "The black horse fits the period after imperial favor changed the church's public standing, about A.D. 313-538. The conversion era associated with Constantine brought relief from persecution, but favor carried its own spiritual dangers. Christianity gained influence while compromise deepened. Human tradition, political patronage, and theological confusion increasingly mingled with the faith once carried by the white horse. The date A.D. 538 marks the emergence of a more settled medieval religious dominance, so the third seal stands as the transitional age of darkening and famine before the fourth seal's deathly condition.",
    "The verse presses a searching question: are people being fed with the word of God, or merely managed by religious systems? A church can gain recognition and still lose nourishment. Influence is not the same thing as life. The black horse warns that spiritual famine can come dressed in public success. The Lamb exposes scarcity so His people will hunger again for Scripture, Christ, and the Spirit's living bread."
  ],
  "Revelation 6:6": [
    "John hears a voice in the midst of the four beasts, the living creatures around the throne, announcing the price of wheat and barley: a measure of wheat for a penny, and three measures of barley for a penny. A penny, or denarius, commonly represents a day's wage, so the prices picture subsistence rather than abundance. A person can survive, but only with strain. The voice also commands, 'See thou hurt not the oil and the wine.' The famine is severe, but it is not unlimited.",
    "Wheat and barley were basic foods. Their scarcity suggests that what should sustain life has become difficult to obtain. In biblical imagery, bread points naturally to God's word and to Christ's sustaining life. Oil often evokes the Spirit's presence and consecrating work, while wine can carry covenant and gospel associations of joy, blessing, and grace. The command not to hurt the oil and wine is therefore mercy within judgment. God preserves essential grace even while spiritual famine reveals the cost of compromise.",
    "The third seal's period, about A.D. 313-538, was not a time when every trace of truth vanished. Scripture, the Spirit's work, and faithful believers remained. Yet the church's public life increasingly mixed gospel and empire, biblical teaching and human authority. The famine prices fit that condition. Bread is present but costly. Nourishment exists but is not freely shared. The oil and wine are protected because Christ does not abandon His people even when religious conditions grow lean.",
    "This verse should make believers grateful for open Scripture and wary of any system that rations spiritual food. The issue is not merely historical. Whenever tradition, power, or convenience makes the word of God scarce, the black horse's warning becomes fresh. Yet the mercy is just as real: God preserves the Spirit's work and the gospel's grace for those who seek Him."
  ],
  "Revelation 6:7": [
    "When the fourth seal is opened, the fourth beast, the fourth living creature, says, 'Come and see.' The repeated pattern now reaches the last of the four horsemen. The sequence has moved from white to red, from red to black, and now toward the pale horse. Each color tells part of a moral and spiritual progression. Gospel purity is followed by persecution; persecution is followed by compromise and scarcity; compromise, if left unhealed, gives way to death.",
    "The summons from the living creature keeps the vision anchored in heaven. The fourth rider does not represent a force that surprises God. The Lamb opens the seal, and heaven calls John to see the outcome. This does not make God the author of apostasy or cruelty. It means Revelation is exposing the consequences of resisting the Lamb's light. The seal is a prophetic unveiling: when the church turns from living truth, the result is not neutral tradition but spiritual decline.",
    "The fourth seal corresponds to the darkest medieval period, about A.D. 538-1517. The date A.D. 538 marks the rise of a dominant ecclesiastical power after the collapse of Western Rome's older structures, and 1517 marks the beginning of the Protestant Reformation's public challenge. During this long period, religious authority often became coercive, Scripture was obscured from common access, and dissent could be treated as a threat to be crushed. The pale horse gathers the deathly result of that history into one image.",
    "The verse warns against the slow logic of compromise. Spiritual death rarely announces itself at the beginning. It grows as truth is neglected, conscience is silenced, and power replaces dependence on Christ. Yet the Lamb reveals this condition because He wants His people awake. To see the fourth seal rightly is to turn from dead religion back to the living Christ."
  ],
  "Revelation 6:8": [
    "John looks and sees a pale horse. The rider's name is Death, and Hell follows with him. The word 'pale' suggests a sickly, corpse-like color, the color of life drained away. The image is not subtle. The fourth seal shows the end point of the first four seals' downward movement when the gospel's purity is replaced by persecution, then scarcity, then a deathly religious condition. Death is no longer merely an event; it is personified as a rider.",
    "Death is followed by Hell, or the grave, showing that the seal is concerned with destruction rather than life. Authority is given over a fourth part of the earth to kill by sword, hunger, death, and the beasts of the earth. The fourfold language echoes covenant judgments in the prophets, especially the sword, famine, pestilence, and wild beasts of Ezekiel. Yet the judgment is still limited. A fourth part is terrible, but it is not the final totality. Mercy still delays the end.",
    "The pale horse corresponds to the period about A.D. 538-1517, when corrupted religious power often produced spiritual death where it should have ministered Christ's life. Sword, hunger, death, and beasts gather the historical realities of coercion, biblical famine, persecution, and destructive power. The symbol does not say every person in the period was faithless; Revelation will later remember faithful witnesses. It does say that a religious system cut loose from the Lamb becomes deadly.",
    "This verse is a severe mercy. It warns that false religion is not harmless. When Christ, Scripture, and grace are displaced, spiritual authority can become a tool of death. The church must continually ask whether it is nourishing life or preserving control. The Lamb exposes the pale horse so that His people will flee dead forms and return to Him as the source of life."
  ],
  "Revelation 6:9": [
    "When the fifth seal opens, the scene changes. No horse appears. John sees under the altar the souls of those who were slain for the word of God and for the testimony they held. The vision moves from broad historical forces to the faithful witnesses who suffered under them. Their location under the altar is essential. This is sanctuary language, not a philosophical statement about disembodied existence. Their lives are pictured as sacrifices poured out before God.",
    "In the sanctuary service, blood could be poured at the base of the altar. Scripture also says Abel's blood cried from the ground after he was murdered. Revelation uses that same moral logic. The martyrs' blood cries for divine attention because their deaths were not accidents in a meaningless world. They were slain because they clung to God's word and held their testimony. The altar shows that heaven treats their witness as holy, costly, and remembered.",
    "The fifth seal corresponds naturally to the era of Reformation witness and martyr memory, about A.D. 1517-1755. The Reformation did not immediately end persecution, but it brought the word of God back into public prominence and exposed the blood-guilt of coercive religion. Many believers suffered because they would not surrender Scripture, conscience, or testimony. The seal gathers their cry before God and points toward a future vindication that has not yet fully arrived.",
    "The verse dignifies faithful suffering. Earth may treat witnesses as troublemakers, failures, or casualties of power, but heaven sees them under the altar. Their testimony is not lost. The church should speak of martyrs with reverence, not romanticism. Their blood calls believers to value the word of God above safety and to trust that the holy God remembers every surrendered life."
  ],
  "Revelation 6:10": [
    "The martyrs cry with a loud voice, 'How long, O Lord, holy and true?' Their question is not unbelief. It is the language of covenant lament. They appeal to God's holiness and truth because they know His character is the final answer to injustice. The cry asks when God will judge and avenge their blood on those who dwell on the earth. It is not a request for private revenge, but a plea for public vindication and righteous judgment.",
    "The phrase 'them that dwell on the earth' carries moral weight in Revelation. It often describes those whose settled allegiance is earthbound and resistant to God. The martyrs' cry therefore sets two communities in contrast: those who hold the word and testimony, and those who oppose God by shedding innocent blood. The question 'How long?' belongs with the Psalms and prophets, where the faithful bring unanswered suffering before God rather than taking judgment into their own hands.",
    "In the historical flow, this cry belongs especially to the aftermath of medieval persecution and the Reformation era, about A.D. 1517-1755. As Scripture returned to wider circulation, the blood of earlier witnesses could be seen more clearly for what it was. The fifth seal points toward the judgment theme that will become more explicit later in Revelation. The martyrs do not settle accounts themselves. Their cause is placed before the Lord who is holy and true.",
    "This verse teaches the church how to lament without becoming vindictive. It is right to ask God to end injustice. It is right to long for truth to be vindicated. But the cry is addressed to the Lord, not to human vengeance. Faith brings its deepest wounds into God's court and waits for His timing. The Lamb hears the blood of His witnesses."
  ],
  "Revelation 6:11": [
    "White robes are given to the martyrs, and they are told to rest yet for a little season until their fellow servants and brethren should also be killed as they were. The answer begins with assurance before it brings final resolution. The martyrs are not told that their concern is wrong. They are given white robes, a sign of Christ's righteousness, acceptance, and victory. Heaven publicly marks them as belonging to God.",
    "The command to rest fits the biblical picture of death as sleep. The vision is symbolic, but it does not teach restless conscious activity after death. The martyrs' blood cries in the same way Abel's blood cried: their deaths demand God's righteous answer. The little season shows that history is not finished. More witness must be borne. More servants will stand. The final judgment will come, but not before God's purpose is complete.",
    "The fifth seal's historical setting, about A.D. 1517-1755, helps explain the white robes and waiting. The Reformation recovered much light, yet the full vindication of God's people still awaited the later judgment-hour message and final events. The faithful dead are secure, but the living church must continue the testimony. This verse quietly prepares for Revelation 7, where the question of who can stand will be answered through sealing and a faithful multitude.",
    "The verse is tender for those troubled by delay. God may not answer every injustice immediately, but He does not forget His people. White robes are heaven's assurance that the slain are accepted in Christ. Rest is not abandonment. Waiting is not divine neglect. The church can endure because God's timing includes both memory and completion."
  ],
  "Revelation 6:12": [
    "The sixth seal opens with a great earthquake, the sun becoming black as sackcloth of hair, and the moon becoming as blood. The imagery comes from the biblical language of the Day of the Lord, when creation itself trembles before divine intervention. The vision has moved beyond the four horsemen and the altar cry into public signs that announce the nearness of judgment. These signs are not given to entertain fear. They are given as merciful warnings.",
    "Jesus described signs in the sun, moon, and stars in connection with the period after tribulation, and the prophets used similar language for the shaking of earthly powers before God's day. The earthquake and darkened lights indicate that the created order itself becomes a witness. Revelation does not invite careless date-setting; it invites watchfulness. The sequence moves from historical suffering toward the final appearing of Christ, and the signs mark a transition from the long oppression of the saints to the awakening of expectation.",
    "The great earthquake is commonly identified with the Lisbon earthquake of November 1, 1755, one of the most devastating and widely discussed earthquakes in modern European memory. The darkened sun and blood-like moon are connected with the Dark Day of May 19, 1780, and the moon's blood-like appearance that night. These events are understood as providential signs in the sixth seal, coming after the long tribulation period and before the final advent crisis.",
    "The point is not to collect dates while the heart remains unchanged. Prophetic signs are acts of mercy when they awaken people to repentance, reverence, and readiness. The sixth seal asks whether the reader is living as one who expects to meet the Lamb. The same Christ who opens the seals also gives warning before the day of wrath arrives."
  ],
  "Revelation 6:13": [
    "John sees the stars of heaven fall to the earth like unripe figs shaken from a fig tree by a mighty wind. The image stresses suddenness, visibility, and force. The heavens appear to be shaken loose. The fig-tree comparison gives the scene concrete power: a violent wind strikes the tree, and the fruit falls in abundance. Revelation uses ordinary imagery to describe an extraordinary sign.",
    "Falling heavenly bodies belong to the prophetic vocabulary of the Day of the Lord. Isaiah, Joel, and Jesus all use cosmic language to show that the present order will not continue untouched by God's judgment. In Revelation 6, the falling stars follow the earthquake, darkened sun, and blood-like moon. The sequence therefore continues the public warning signs of the sixth seal, pushing the reader toward the final question of who can stand.",
    "This sign is commonly connected with the great meteor shower of November 13, 1833. Its scale and visibility made a deep impression in the nineteenth-century world and became closely associated with the awakening expectation of Christ's return. Like the previous signs, it does not exhaust every future cosmic shaking described in Scripture. It functions as a providential warning within the sixth seal, calling attention to the nearness and certainty of the coming day.",
    "The verse presses urgency into devotion. A person can know about fulfilled signs and still remain unprepared. The falling stars are not given so believers can admire prophetic accuracy from a distance. They call for repentance, faith, and readiness. Heaven's warnings are gracious because they come before the final appearing. The wise response is not speculation, but surrender to Christ."
  ],
  "Revelation 6:14": [
    "The heaven departs as a scroll when it is rolled together, and every mountain and island is moved out of its place. The scene now moves beyond earlier warning signs to the final upheaval connected with the appearing of Christ. The image of the sky rolling back suggests the removal of the present veil. What seemed stable and ordinary gives way before the unveiled presence of God.",
    "Mountains and islands are among the earth's strongest images of permanence and refuge. Yet here they are moved. The prophets often describe the earth shaking before the Lord, and Hebrews speaks of a final shaking that removes what can be shaken so that what cannot be shaken may remain. Revelation is not teaching curiosity about geology. It is showing that creation itself cannot shelter rebellion when the Creator comes.",
    "In the sixth seal, this part of the vision points forward to the still-future final crisis and Christ's visible return. The earlier signs associated with 1755, 1780, and 1833 serve as warnings, but the rolling back of the heavens and displacement of every mountain and island belong to the climactic day itself. The prophecy telescopes from historical signs into final judgment, keeping the reader from treating the signs as an end in themselves.",
    "The verse asks where confidence is placed. Mountains, islands, governments, institutions, wealth, and religious appearance can seem immovable, but Revelation shows them shaken. The only safe kingdom is the one God gives through Christ. Readiness means rooting life in what cannot be moved. When the sky rolls back, only the shelter found in the Lamb will remain."
  ],
  "Revelation 6:15": [
    "The kings of the earth, great men, rich men, chief captains, mighty men, bondmen, and freemen hide themselves in dens and rocks. The list is deliberately comprehensive. Political power, social greatness, wealth, military command, physical strength, slavery, and freedom all collapse into the same fear. Revelation strips away every human distinction before the appearing of God.",
    "The dens and rocks echo prophetic scenes where people hide from the terror of the Lord. The irony is painful. The very mountains that once seemed strong are themselves being moved, yet the unprepared still seek refuge there. Human beings who refused the mercy of the Lamb now try to hide from His face. The text does not portray thoughtful repentance at this point, but terror before a presence they resisted.",
    "This verse turns to the final side of the sixth seal. After the historical warning signs, Revelation shows the response of the unprepared at Christ's return. The hierarchy of the world cannot endure that day. No title, fortune, command, or social condition can secure the soul. The final crisis reveals that the deepest human division is not class or rank, but whether one has received the Lamb.",
    "The warning is meant to awaken mercy now. No earthly identity can save a person on the day of God's appearing. The time to be reconciled to God is before the rocks are sought as refuge. Revelation calls every class of person to find shelter now in Christ. The Lamb is a refuge before He is faced as Judge."
  ],
  "Revelation 6:16": [
    "The terrified cry to the mountains and rocks, asking them to fall and hide them from the face of the One seated on the throne and from the wrath of the Lamb. The language is startling because Revelation has just shown the Lamb as the slain Redeemer. The One who gave Himself for sinners is now feared by those who rejected His mercy. The wrath of the Lamb is not a contradiction of love; it is love's holy answer to persistent rebellion.",
    "The face of God is unbearable to those who have chosen darkness. Scripture often treats God's face as blessing for the righteous and terror for the wicked. Here the throne and the Lamb are united in judgment. Rocks cannot hide the unprepared because creation itself is answering to its Maker. The cry exposes the tragedy of sin: people would rather be crushed by mountains than meet the gaze of the Redeemer they refused.",
    "This moment carries the vision to the final appearing of Christ under the sixth seal. The signs have warned; the day has arrived. The same Lamb who opened the scroll, governed the seals, heard the martyrs, and preserved His people is now revealed in judgment. The final issue is worship and allegiance. Those who would not stand with the Lamb now seek concealment from Him.",
    "The verse calls the reader to receive Christ while mercy is open. The safest place in the universe is not under rocks, behind religious forms, or inside human power. It is in fellowship with the Lamb. Those who learn to trust His face now will not need to flee from it then. Judgment makes urgent what grace has long invited."
  ],
  "Revelation 6:17": [
    "The chapter ends with the question, 'For the great day of his wrath is come; and who shall be able to stand?' Revelation does not answer immediately in the same verse. The question is left ringing so that chapter 7 can answer it through the sealing of God's servants and the great multitude before the throne. The sixth seal therefore does not merely close with fear. It opens the need for preparation, sealing, and faithful endurance.",
    "The question is spiritual before it is chronological. Who can stand before the holy God when history reaches its crisis? Scripture often asks similar questions when God's presence exposes impurity and false security. The issue is not strength, wealth, knowledge, or religious self-confidence. The issue is belonging to God. The wrath named here is the settled judgment of the throne and the Lamb against evil that has refused grace.",
    "The historical flow of the seals has moved from A.D. 31-100, through persecution, compromise, medieval darkness, Reformation witness, and the warning signs beginning in 1755, 1780, and 1833, toward the final day still ahead. That sequence is not given as bare information. It presses toward the people who can stand when the Lamb is revealed. Revelation 7 answers with sealed servants and a redeemed multitude washed in the Lamb's blood.",
    "The verse turns prophecy into self-examination. The question is not, 'How much can I identify?' but, 'Will I stand?' The answer is not self-confidence. Only those saved, sealed, and kept by God can stand before the Lamb. Revelation 6 ends by making the reader long for Revelation 7. The chapter's terror becomes an invitation to seek the sealing grace of God now."
  ]
};

const depthAdditions = {
  "Revelation 6:1": [
    "The first seal therefore begins with worshipful restraint: John watches only as the Lamb opens, and the church learns to interpret only as heaven gives light.",
    "The living creature who speaks from near the throne also reminds the reader that the created order itself serves God's purposes rather than standing independent from Him.",
    "This first date range is not offered as a mechanical label, but as a way of locating the seal's burden in the early mission of the church after Pentecost.",
    "A careful reader should therefore let Revelation 6 remain joined to Revelation 5, where worship has already declared the Lamb worthy before history is opened."
  ],
  "Revelation 6:2": [
    "The early believers had no worldly reason to expect such advance, yet the gospel crossed boundaries of language, class, synagogue, household, and empire.",
    "The whiteness of the horse is important because Revelation will later expose counterfeit worship; the first seal begins with a witness that is still marked by gospel clarity.",
    "The approximate period A.D. 31-100 includes Pentecost, apostolic preaching, missionary journeys, and the formation of churches that would later receive Christ's messages in chapters 2 and 3.",
    "The rider's movement also keeps the chapter from beginning in decline; the first word over Christian history is not defeat, but Christ-enabled witness."
  ],
  "Revelation 6:3": [
    "The second summons also shows continuity with the first seal: the church's persecuted period is not a new story, but the next stage of the same witness.",
    "The simplicity of the verse lets the red horse carry the weight in the next line, while still keeping the Lamb's action in front of the reader.",
    "This helps explain why the suffering period is not read as accidental interruption. It is part of the long conflict that Jesus had already described to His disciples.",
    "The call to see is not morbid fascination with suffering; it is heaven's way of preparing the church to recognize faithfulness under pressure."
  ],
  "Revelation 6:4": [
    "The phrase 'to take peace' suggests permission rather than ultimate sovereignty; the rider can remove peace only within limits set by the One opening the seal.",
    "The great sword also exposes the violence hidden beneath imperial religion, where loyalty to state and gods could be enforced by public punishment.",
    "The broad dates A.D. 100-313 allow for many local and empire-wide pressures, while the last persecution under Diocletian gives the period its most concentrated expression.",
    "The red horse therefore gives martyrs their proper place in the story: not as evidence that Christ failed, but as witnesses whose blood heaven will later remember under the altar."
  ],
  "Revelation 6:5": [
    "The blackness is not simply the absence of courage; it is the dimming of truth when the church begins to accept the world's patronage on the world's terms.",
    "The balances also imply control, as though spiritual food is no longer given freely but weighed out under systems that can restrict access.",
    "The date range A.D. 313-538 holds together both relief and danger: persecution eased, but the church's dependence on imperial favor introduced another kind of crisis.",
    "This seal is especially searching because spiritual famine can exist where religious activity remains impressive, organized, and publicly honored."
  ],
  "Revelation 6:6": [
    "The voice from the midst of the living creatures also means heaven sets the limit; scarcity is real, but preservation is also real.",
    "A day's wage for limited grain pictures a situation where the soul is kept alive with difficulty, not nourished with the abundance Christ intends.",
    "The protected oil and wine keep hope alive inside the symbol, showing that God preserves grace and the Spirit's work even when human systems obscure the bread.",
    "For personal study, this verse asks whether the believer is receiving Christ directly from Scripture or living on measured fragments of secondhand religion."
  ],
  "Revelation 6:7": [
    "The fourth summons is brief because the accumulated movement of the first three seals has already prepared the reader for the seriousness of what follows.",
    "This seal shows that decline has momentum. Persecution from outside can be dangerous, but corruption from within can become even more deadly over time.",
    "The dates A.D. 538-1517 are used because they mark a long era of dominant medieval religious power before the Reformation's public break with that control.",
    "The summons to see therefore includes a warning to every later generation: do not assume that inherited religious structures are safe simply because they are old."
  ],
  "Revelation 6:8": [
    "The grave following Death gives the image a dreadful completeness, as though the rider leaves no living fruit behind where his influence is allowed to mature.",
    "The fourth part also matters pastorally because God still restrains judgment; the pale horse is awful, but the final day has not yet arrived.",
    "The period A.D. 538-1517 includes many sincere believers, but the symbol judges the public system that turned spiritual authority into coercion and deprivation.",
    "The cure for the pale horse is not mere reform of administration. It is return to the Lamb, the word of God, and the life-giving ministry of Christ."
  ],
  "Revelation 6:9": [
    "The fifth seal also slows the pace of the chapter. Heaven pauses over the slain, refusing to let their blood be absorbed into an anonymous timeline.",
    "The word of God and the testimony they held explain both their suffering and their honor; they died because allegiance to Scripture was stronger than fear.",
    "The years A.D. 1517-1755 do not imply that martyrdom began then, but that the Reformation era brought the memory and meaning of that witness into sharper focus.",
    "The altar location also anticipates later scenes where prayer, incense, judgment, and vindication are joined before God."
  ],
  "Revelation 6:10": [
    "Their loud voice shows that heaven does not silence wounded righteousness. It receives the cry and frames it in the language of God's own character.",
    "The martyrs ask for judgment because a universe without judgment would leave innocent blood unanswered and evil morally unresolved.",
    "The cry also reaches beyond one century, gathering the long testimony of those who suffered under religious and civil powers because they would not surrender the truth.",
    "The church can learn from this prayer to bring injustice to God with honesty, while refusing the bitterness that would make vengeance personal."
  ],
  "Revelation 6:11": [
    "The robes are given, not earned, which keeps even martyr faithfulness grounded in Christ's righteousness rather than human merit.",
    "The waiting period also protects the reader from thinking that all prophecy is fulfilled at the moment suffering is recognized; God has a complete witness still to gather.",
    "The movement from 1517 toward 1755 places the martyrs' vindication near the threshold of the sixth seal's warning signs, where history begins to turn toward final expectation.",
    "The verse therefore comforts the dead in Christ and steadies the living, because both are held inside God's promise."
  ],
  "Revelation 6:12": [
    "The earthquake sign also shook more than buildings; it shook confidence in the stability of the world and forced many to think about judgment, providence, and mortality.",
    "The Dark Day of May 19, 1780, was remembered not only for physical darkness but for the moral seriousness it awakened in many observers.",
    "By placing these signs after the fifth seal, the chapter moves from the blood of witnesses to public warnings that the Judge has not forgotten.",
    "The dates are useful only when they deepen watchfulness. They should never become substitutes for repentance, faith, and readiness for Christ."
  ],
  "Revelation 6:13": [
    "The fig-tree image also gives the sign a sense of abundance: the stars do not trickle down quietly, but fall as fruit shaken loose in a storm.",
    "The 1833 meteor shower was widely observed and powerfully remembered, giving the Advent awakening a vivid sign that matched the language of the sixth seal.",
    "The sign sits between earlier historical warnings and the final cosmic collapse, helping the reader see the sixth seal as both historical and forward-looking.",
    "The falling stars therefore ask whether the heart is awake, not merely whether the mind can place an event on a timeline."
  ],
  "Revelation 6:14": [
    "A rolled scroll also recalls the sealed scroll of Revelation 5 by contrast: the Lamb opens God's purpose, and now the visible heavens themselves are opened before judgment.",
    "The movement of mountains and islands shows that final judgment is not hidden in private religious experience. It is public, cosmic, and unavoidable.",
    "This portion is best kept future because the language exceeds the earlier warning signs and reaches the visible appearing that ends rebellion.",
    "The verse therefore turns the reader from past signs to future readiness, refusing to let prophetic study stop in 1755, 1780, or 1833."
  ],
  "Revelation 6:15": [
    "The sevenfold social list also mirrors the completeness of human exposure; no level of society remains outside the searching presence of God.",
    "The scene is especially sobering because the people are not asking to be changed, cleansed, or reconciled. They are asking to be hidden.",
    "The final day reveals that human categories cannot carry ultimate meaning. Only relationship to the Lamb will matter when every refuge fails.",
    "This is why Revelation warns before it overwhelms: the text wants readers to seek mercy now rather than hiding later."
  ],
  "Revelation 6:16": [
    "The request to be hidden from a face shows the personal nature of judgment. The crisis is not merely events, but encounter with God.",
    "The phrase 'wrath of the Lamb' also prevents sentimental readings of Christ that remove His justice. The Lamb who died for sinners also judges unrepentant evil.",
    "This judgment is not arbitrary anger. It is the rightful response of holy love after mercy has been refused and evil has matured.",
    "The verse therefore makes grace urgent. The face that terrifies rebellion is the same face believers are invited to seek in trust."
  ],
  "Revelation 6:17": [
    "The wording 'is come' gives the question immediacy, as though the day long warned about has now arrived and cannot be postponed.",
    "The answer will not be found among the kings, rocks, or mountains of verse 15. It will be found among those whom God seals.",
    "The timeline is therefore pastoral as well as prophetic: every period in the seals presses toward readiness for the Lamb's appearing.",
    "The chapter closes with a question because God wants the reader to keep reading, not in curiosity only, but in hunger for the answer found in grace."
  ]
};

const finalDepthAdditions = {
  "Revelation 6:3": [
    "The date range also reminds the reader that persecution did not appear all at once; it developed through many local and imperial pressures before reaching its final pagan Roman intensity.",
    "That longer view helps the church avoid a shallow reading of suffering, because the seal gathers a sustained season of witness rather than one isolated crisis."
  ],
  "Revelation 6:4": [
    "The red horse also prepares for the fifth seal, where the blood of the witnesses is finally brought before God under the altar.",
    "Read in that larger movement, persecution is not forgotten suffering; it becomes testimony that heaven will answer in its own time."
  ],
  "Revelation 6:5": [
    "The third seal is therefore one of the most subtle dangers in the chapter, because scarcity of truth can grow while outward respectability increases.",
    "The black horse asks whether the church is satisfied with influence or whether it still hungers for the direct nourishment of Christ and His word."
  ],
  "Revelation 6:6": [
    "The verse also helps explain why later reform was necessary: the problem was not the complete disappearance of Christianity, but the costly rationing of the truths that give life.",
    "God's restraint over the oil and wine means the Spirit's witness and gospel mercy could still be found by those who sought Him."
  ],
  "Revelation 6:7": [
    "The fourth seal should therefore be read as the ripened consequence of the previous seals, not as an unrelated disaster added to the sequence.",
    "It gives theological shape to decline: a church can move from pure mission to persecuted suffering, then to compromised scarcity, and finally toward deathly control."
  ],
  "Revelation 6:8": [
    "This is why the pale horse is not merely a symbol of mortality in general; it is the deadly result of a corrupted religious order.",
    "The limitation to a fourth part keeps the reader from despair, because even in judgment God is still holding back the final end and preserving room for witness."
  ],
  "Revelation 6:9": [
    "The fifth seal also answers the apparent success of the pale horse: the system may kill the witnesses, but it cannot erase their testimony from heaven.",
    "Their place under the altar shows that what persecutors treated as disposable, God treats as sacred."
  ],
  "Revelation 6:10": [
    "This cry also connects with the later fall of Babylon, where the blood of saints and prophets is finally answered by God's judgment.",
    "The fifth seal therefore keeps justice inside worship; the martyrs do not seize judgment, but they ask the Judge to act."
  ],
  "Revelation 6:11": [
    "The word 'fellowservants' also widens the scene beyond one group of martyrs, showing that God sees one continuing witness across generations.",
    "The robe and the rest belong together: Christ covers His servants, and He holds them secure until the full answer comes.",
    "That combination keeps the verse from both despair and triumphalism; the martyrs are honored, but the church still has a witness to bear."
  ],
  "Revelation 6:12": [
    "The sequence also matters because these signs appear after the fifth seal's cry for vindication, suggesting that heaven has begun to answer history with public warnings.",
    "They awaken the world to the fact that martyr blood, spiritual darkness, and human rebellion do not vanish into silence before God."
  ],
  "Revelation 6:13": [
    "The 1833 sign also belongs in a larger pattern of mercy, coming before the final day so that the message of Christ's nearness could be preached with urgency.",
    "Revelation gives the sign in symbolic language, but the burden of the symbol is practical: look up, repent, and prepare.",
    "The verse therefore serves proclamation as much as prediction, because signs are meant to awaken a message in the church."
  ],
  "Revelation 6:14": [
    "This future movement keeps the sixth seal open-ended until the appearing of Christ; the historical signs begin the warning, but they do not finish the prophecy.",
    "The reader is therefore placed between warning and fulfillment, living in the time when the signs call for watchfulness before the sky itself is opened.",
    "That tension is spiritually healthy when it produces obedience, mission, and humble expectancy rather than restless date-setting."
  ],
  "Revelation 6:15": [
    "The list also removes the illusion that final fear belongs only to openly wicked rulers; every unrepentant class stands exposed.",
    "In that moment, social status becomes spiritually useless, and the hidden condition of the heart becomes the only matter that remains.",
    "The verse is also a reversal of worldly confidence, because those who once commanded others now beg creation itself to conceal them.",
    "The caves and rocks become a tragic substitute for the sanctuary they refused, showing that fear cannot create the refuge that only grace provides."
  ],
  "Revelation 6:16": [
    "The scene is tragic because the Lamb's face could have been the believer's joy. Refused grace turns the same presence into terror.",
    "Revelation therefore presses the reader toward reconciliation now, before the day when hiding replaces praying.",
    "The rocks cannot mediate, forgive, cleanse, or intercede; only the Lamb can do what frightened sinners suddenly know they need."
  ],
  "Revelation 6:17": [
    "This final question is the hinge between the sixth seal and the sealing interlude, making Revelation 7 necessary rather than optional.",
    "The chapter has shown what people cannot stand on: conquest, violence, wealth, rank, rocks, mountains, or delayed repentance.",
    "Only the work of God can answer the question, which is why the next vision turns to servants sealed before the winds are released."
  ]
};

const crossReferences = {
  "Revelation 6:1": ["Revelation 5:1-7", "Zechariah 1:8-11", "Zechariah 6:1-8", "Psalm 29:3", "Revelation 4:6-8", "Revelation 6:1"],
  "Revelation 6:2": ["Psalm 45:3-5", "Matthew 24:14", "Acts 1:8", "Colossians 1:23", "Revelation 2:1-7", "Revelation 19:11-16"],
  "Revelation 6:3": ["Matthew 24:9", "John 16:2", "Revelation 2:8-11", "Revelation 4:7", "Revelation 6:3-4", "1 Peter 4:12-13"],
  "Revelation 6:4": ["Matthew 10:34-39", "Matthew 24:6-10", "John 15:18-20", "Revelation 2:10", "Revelation 12:11", "Hebrews 11:35-38"],
  "Revelation 6:5": ["Leviticus 26:26", "Ezekiel 4:16", "Amos 8:11-12", "Zechariah 6:2", "Revelation 2:12-17", "Revelation 6:5-6"],
  "Revelation 6:6": ["Amos 8:11-12", "John 6:35", "Zechariah 4:2-6", "Matthew 20:2", "Revelation 2:14-16", "Revelation 6:5-6"],
  "Revelation 6:7": ["Revelation 2:18-29", "Matthew 24:11-12", "2 Thessalonians 2:3-7", "Revelation 6:7-8", "Jude 3-4", "Revelation 13:5-7"],
  "Revelation 6:8": ["Ezekiel 14:21", "Jeremiah 15:2-3", "Hosea 13:14", "Matthew 24:21-22", "Revelation 2:20-23", "Revelation 20:13-14"],
  "Revelation 6:9": ["Genesis 4:10", "Leviticus 4:7", "Matthew 23:34-35", "Revelation 1:9", "Revelation 12:11", "Revelation 20:4"],
  "Revelation 6:10": ["Psalm 79:5-10", "Psalm 94:1-3", "Habakkuk 1:2", "Luke 18:7-8", "Revelation 3:10", "Revelation 19:2"],
  "Revelation 6:11": ["Daniel 12:13", "1 Thessalonians 4:13-16", "Hebrews 11:39-40", "Revelation 3:4-5", "Revelation 7:9-14", "Revelation 14:13"],
  "Revelation 6:12": ["Joel 2:10", "Joel 2:30-31", "Matthew 24:29", "Mark 13:24-25", "Luke 21:25-28", "Revelation 6:12-17"],
  "Revelation 6:13": ["Isaiah 34:4", "Joel 2:10", "Matthew 24:29", "Mark 13:25", "Revelation 6:13", "Revelation 8:10"],
  "Revelation 6:14": ["Isaiah 34:4", "Isaiah 54:10", "Nahum 1:5", "Hebrews 12:26-28", "Revelation 16:20", "Revelation 20:11"],
  "Revelation 6:15": ["Isaiah 2:10-21", "Hosea 10:8", "Luke 23:30", "Revelation 6:15-17", "Revelation 19:18", "Revelation 20:11"],
  "Revelation 6:16": ["Hosea 10:8", "Luke 23:30", "John 5:22-29", "Revelation 5:6-7", "Revelation 14:10", "Revelation 19:15"],
  "Revelation 6:17": ["Malachi 3:2", "Nahum 1:6", "Luke 21:36", "Revelation 7:1-17", "Revelation 14:12", "Revelation 16:14"]
};

const wordNotes = {
  "Revelation 6:1": [
    { term: "Seal", explanation: "A closed section of the scroll opened only by the Lamb's authority.", scriptureReferences: ["Revelation 5:1-7", "Revelation 6:1"] },
    { term: "Four beasts", explanation: "The KJV term for the living creatures around the throne.", scriptureReferences: ["Ezekiel 1:5-14", "Revelation 4:6-8"] },
    { term: "Thunder", explanation: "A sign of heavenly majesty, judgment, and divine summons.", scriptureReferences: ["Exodus 19:16", "Psalm 29:3", "Revelation 4:5"] }
  ],
  "Revelation 6:2": [
    { term: "White horse", explanation: "A symbol of pure gospel advance and victory in the first seal.", scriptureReferences: ["Psalm 45:3-5", "Revelation 6:2", "Revelation 19:11"] },
    { term: "Bow", explanation: "An image of conquest, here serving the gospel's forward movement.", scriptureReferences: ["Psalm 45:5", "Habakkuk 3:9", "Revelation 6:2"] },
    { term: "Crown", explanation: "A victor's wreath granted to the rider, emphasizing given victory.", scriptureReferences: ["1 Corinthians 9:25", "2 Timothy 4:8", "Revelation 6:2"] }
  ],
  "Revelation 6:3": [
    { term: "Second seal", explanation: "The next stage in the opened scroll, moving from gospel advance to persecution.", scriptureReferences: ["Matthew 24:9", "Revelation 6:3-4"] },
    { term: "Second beast", explanation: "The KJV term for the second living creature who summons John to see.", scriptureReferences: ["Ezekiel 1:5-14", "Revelation 4:7", "Revelation 6:3"] },
    { term: "Come and see", explanation: "A heavenly summons to read history from the throne-room perspective.", scriptureReferences: ["Revelation 4:1", "Revelation 6:1-7"] }
  ],
  "Revelation 6:4": [
    { term: "Red horse", explanation: "A blood-colored symbol of persecution, conflict, and removed peace.", scriptureReferences: ["Matthew 24:6-10", "Revelation 6:4"] },
    { term: "Great sword", explanation: "A symbol of violent coercion and bloodshed against the faithful.", scriptureReferences: ["Matthew 10:34", "Romans 13:4", "Revelation 6:4"] }
  ],
  "Revelation 6:5": [
    { term: "Black horse", explanation: "A darkened stage of spiritual scarcity and compromised nourishment.", scriptureReferences: ["Lamentations 5:10", "Amos 8:11", "Revelation 6:5"] },
    { term: "Third beast", explanation: "The KJV term for the third living creature who calls John to behold the black horse.", scriptureReferences: ["Revelation 4:7", "Revelation 6:5"] },
    { term: "Balances", explanation: "Scales used for careful measuring, suggesting famine and rationing.", scriptureReferences: ["Leviticus 26:26", "Ezekiel 4:16", "Revelation 6:5"] }
  ],
  "Revelation 6:6": [
    { term: "Measure", explanation: "A rationed amount of grain, signaling scarcity rather than abundance.", scriptureReferences: ["Ezekiel 4:10-17", "Revelation 6:6"] },
    { term: "Penny", explanation: "The KJV term for a denarius, commonly a day's wage.", scriptureReferences: ["Matthew 20:2", "Revelation 6:6"] },
    { term: "Four beasts", explanation: "The KJV phrase for the four living creatures around God's throne.", scriptureReferences: ["Ezekiel 1:5-14", "Revelation 4:6-8", "Revelation 6:6"] },
    { term: "Oil and wine", explanation: "Images of preserved Spirit-given grace, blessing, and covenant joy.", scriptureReferences: ["Zechariah 4:2-6", "Luke 10:34", "Revelation 6:6"] }
  ],
  "Revelation 6:7": [
    { term: "Fourth seal", explanation: "The final horseman stage, revealing the deathly outcome of long compromise.", scriptureReferences: ["Revelation 6:7-8", "Matthew 24:21-22"] },
    { term: "Fourth beast", explanation: "The fourth living creature of the throne room summoning John to see.", scriptureReferences: ["Revelation 4:7", "Revelation 6:7"] }
  ],
  "Revelation 6:8": [
    { term: "Pale horse", explanation: "A corpse-like symbol of spiritual death and destructive judgment.", scriptureReferences: ["Ezekiel 14:21", "Revelation 6:8"] },
    { term: "Death and Hell", explanation: "Personified death and the grave following the fourth rider.", scriptureReferences: ["Hosea 13:14", "Revelation 6:8", "Revelation 20:13-14"] },
    { term: "Fourth part", explanation: "A severe but limited judgment, not the final total destruction.", scriptureReferences: ["Revelation 6:8", "Revelation 8:7-12"] }
  ],
  "Revelation 6:9": [
    { term: "Under the altar", explanation: "Sanctuary imagery for lives poured out before God.", scriptureReferences: ["Leviticus 4:7", "Genesis 4:10", "Revelation 6:9"] },
    { term: "Souls", explanation: "A symbolic picture of slain witnesses whose blood cries for vindication.", scriptureReferences: ["Genesis 4:10", "Leviticus 17:11", "Revelation 6:9"] },
    { term: "Testimony", explanation: "Faithful witness held even under persecution.", scriptureReferences: ["Revelation 1:9", "Revelation 12:11", "Revelation 20:4"] }
  ],
  "Revelation 6:10": [
    { term: "How long", explanation: "The language of faithful lament asking God to act in justice.", scriptureReferences: ["Psalm 79:5", "Habakkuk 1:2", "Revelation 6:10"] },
    { term: "Dwell on the earth", explanation: "A Revelation phrase for settled earthbound rebellion against God.", scriptureReferences: ["Revelation 3:10", "Revelation 6:10", "Revelation 13:8"] }
  ],
  "Revelation 6:11": [
    { term: "White robes", explanation: "A symbol of Christ's righteousness, victory, and divine approval.", scriptureReferences: ["Revelation 3:4-5", "Revelation 6:11", "Revelation 7:14"] },
    { term: "Rest", explanation: "The sleep of the faithful dead awaiting God's final vindication.", scriptureReferences: ["Daniel 12:13", "1 Thessalonians 4:13-16", "Revelation 14:13"] },
    { term: "Little season", explanation: "A limited remaining period before the witness is complete.", scriptureReferences: ["Hebrews 11:39-40", "Revelation 6:11"] }
  ],
  "Revelation 6:12": [
    { term: "Great earthquake", explanation: "A sixth-seal sign understood in this study with the Lisbon earthquake of November 1, 1755.", scriptureReferences: ["Joel 2:10", "Matthew 24:29", "Revelation 6:12"] },
    { term: "Sun became black", explanation: "A sixth-seal sign connected with the Dark Day of May 19, 1780.", scriptureReferences: ["Joel 2:31", "Matthew 24:29", "Revelation 6:12"] },
    { term: "Moon became as blood", explanation: "A sign paired with the darkened sun, connected with the night of May 19, 1780.", scriptureReferences: ["Joel 2:31", "Acts 2:20", "Revelation 6:12"] }
  ],
  "Revelation 6:13": [
    { term: "Stars of heaven fell", explanation: "A sixth-seal sign connected with the great meteor shower of November 13, 1833.", scriptureReferences: ["Isaiah 34:4", "Matthew 24:29", "Revelation 6:13"] },
    { term: "Untimely figs", explanation: "Unripe figs shaken loose, picturing sudden visible collapse.", scriptureReferences: ["Isaiah 34:4", "Revelation 6:13"] }
  ],
  "Revelation 6:14": [
    { term: "Heaven departed", explanation: "The final unveiling and removal of the present visible order before God's appearing.", scriptureReferences: ["Isaiah 34:4", "Revelation 6:14", "Revelation 20:11"] },
    { term: "Mountain and island", explanation: "Symbols of stability and refuge shaken before the final day.", scriptureReferences: ["Nahum 1:5", "Revelation 6:14", "Revelation 16:20"] }
  ],
  "Revelation 6:15": [
    { term: "Kings and great men", explanation: "All human ranks exposed as helpless before the appearing of God.", scriptureReferences: ["Isaiah 2:10-21", "Revelation 6:15", "Revelation 19:18"] },
    { term: "Dens and rocks", explanation: "False refuges sought by the unprepared before divine judgment.", scriptureReferences: ["Isaiah 2:19", "Hosea 10:8", "Revelation 6:15"] }
  ],
  "Revelation 6:16": [
    { term: "Face of him", explanation: "God's unveiled presence, blessing to the faithful and terror to rebellion.", scriptureReferences: ["Numbers 6:24-26", "Revelation 6:16", "Revelation 22:4"] },
    { term: "Wrath of the Lamb", explanation: "The holy judgment of the crucified Redeemer against persistent evil.", scriptureReferences: ["John 5:22-29", "Revelation 6:16", "Revelation 14:10"] }
  ],
  "Revelation 6:17": [
    { term: "Great day", explanation: "The climactic day of divine judgment and Christ's appearing.", scriptureReferences: ["Joel 2:11", "Malachi 3:2", "Revelation 6:17"] },
    { term: "Who shall stand", explanation: "The question answered by the sealing and redeemed multitude in Revelation 7.", scriptureReferences: ["Psalm 24:3-4", "Luke 21:36", "Revelation 7:1-17"] }
  ]
};

const symbols = [
  {
    symbol: "Seal",
    references: ["Revelation 6:1", "Revelation 6:3", "Revelation 6:5", "Revelation 6:7", "Revelation 6:9", "Revelation 6:12"],
    meaning: "A section of the scroll opened by the Lamb, disclosing history and judgment under His authority.",
    scriptureReferences: ["Revelation 5:1-7", "Revelation 6:1", "Daniel 12:4"]
  },
  {
    symbol: "White horse",
    references: ["Revelation 6:2"],
    meaning: "The pure and victorious advance of the gospel in the apostolic period.",
    scriptureReferences: ["Psalm 45:3-5", "Matthew 24:14", "Revelation 6:2", "Revelation 19:11"]
  },
  {
    symbol: "Crown",
    references: ["Revelation 6:2"],
    meaning: "Granted victory in the gospel's forward movement.",
    scriptureReferences: ["1 Corinthians 9:25", "2 Timothy 4:8", "Revelation 6:2"]
  },
  {
    symbol: "Bow",
    references: ["Revelation 6:2"],
    meaning: "Conquest imagery serving the first seal's picture of gospel advance.",
    scriptureReferences: ["Psalm 45:5", "Habakkuk 3:9", "Revelation 6:2"]
  },
  {
    symbol: "Red horse",
    references: ["Revelation 6:4"],
    meaning: "Bloodshed, persecution, and removed peace in the suffering church.",
    scriptureReferences: ["Matthew 24:9-10", "John 15:18-20", "Revelation 6:4"]
  },
  {
    symbol: "Great sword",
    references: ["Revelation 6:4"],
    meaning: "Violent coercion and persecution against the faithful.",
    scriptureReferences: ["Matthew 10:34", "Hebrews 11:35-38", "Revelation 6:4"]
  },
  {
    symbol: "Black horse",
    references: ["Revelation 6:5"],
    meaning: "Spiritual darkness, scarcity, and compromised nourishment.",
    scriptureReferences: ["Lamentations 5:10", "Amos 8:11-12", "Revelation 6:5-6"]
  },
  {
    symbol: "Balances",
    references: ["Revelation 6:5"],
    meaning: "Famine, rationing, and measured scarcity of spiritual bread.",
    scriptureReferences: ["Leviticus 26:26", "Ezekiel 4:16", "Revelation 6:5"]
  },
  {
    symbol: "Wheat and barley",
    references: ["Revelation 6:6"],
    meaning: "Basic nourishment made scarce, pointing to a famine of spiritual food.",
    scriptureReferences: ["Amos 8:11", "John 6:35", "Revelation 6:6"]
  },
  {
    symbol: "Oil and wine",
    references: ["Revelation 6:6"],
    meaning: "Preserved grace, Spirit-given life, and covenant blessing amid famine.",
    scriptureReferences: ["Zechariah 4:2-6", "Luke 10:34", "Revelation 6:6"]
  },
  {
    symbol: "Pale horse",
    references: ["Revelation 6:8"],
    meaning: "A deathly spiritual condition and the destructive result of deepening apostasy.",
    scriptureReferences: ["Ezekiel 14:21", "Hosea 13:14", "Revelation 6:8"]
  },
  {
    symbol: "Death and Hell",
    references: ["Revelation 6:8"],
    meaning: "Personified death and the grave following the fourth horseman.",
    scriptureReferences: ["Hosea 13:14", "1 Corinthians 15:55", "Revelation 6:8", "Revelation 20:13-14"]
  },
  {
    symbol: "Fourth part of the earth",
    references: ["Revelation 6:8"],
    meaning: "A severe but limited judgment before the final end.",
    scriptureReferences: ["Revelation 6:8", "Revelation 8:7-12"]
  },
  {
    symbol: "Souls under the altar",
    references: ["Revelation 6:9"],
    meaning: "Slain witnesses pictured in sanctuary language as lives poured out before God.",
    scriptureReferences: ["Genesis 4:10", "Leviticus 4:7", "Revelation 6:9"]
  },
  {
    symbol: "White robes",
    references: ["Revelation 6:11"],
    meaning: "Christ's righteousness, divine approval, and promised victory given to the faithful.",
    scriptureReferences: ["Revelation 3:4-5", "Revelation 6:11", "Revelation 7:14"]
  },
  {
    symbol: "Great earthquake",
    references: ["Revelation 6:12"],
    meaning: "A sixth-seal warning sign understood in this study with the Lisbon earthquake of November 1, 1755.",
    scriptureReferences: ["Joel 2:10", "Matthew 24:29", "Revelation 6:12"]
  },
  {
    symbol: "Sun darkened",
    references: ["Revelation 6:12"],
    meaning: "A sixth-seal warning sign connected with the Dark Day of May 19, 1780.",
    scriptureReferences: ["Joel 2:31", "Matthew 24:29", "Revelation 6:12"]
  },
  {
    symbol: "Moon as blood",
    references: ["Revelation 6:12"],
    meaning: "A sixth-seal warning sign connected with the night of May 19, 1780.",
    scriptureReferences: ["Joel 2:31", "Acts 2:20", "Revelation 6:12"]
  },
  {
    symbol: "Falling stars",
    references: ["Revelation 6:13"],
    meaning: "A sixth-seal warning sign connected with the great meteor shower of November 13, 1833.",
    scriptureReferences: ["Isaiah 34:4", "Matthew 24:29", "Revelation 6:13"]
  },
  {
    symbol: "Rolled-up heaven",
    references: ["Revelation 6:14"],
    meaning: "The final removal of the present visible order before God's appearing.",
    scriptureReferences: ["Isaiah 34:4", "Hebrews 12:26-28", "Revelation 6:14"]
  },
  {
    symbol: "Mountains and islands moved",
    references: ["Revelation 6:14", "Revelation 6:15", "Revelation 6:16"],
    meaning: "The collapse of earthly stability and false refuge before the final day.",
    scriptureReferences: ["Isaiah 2:10-21", "Nahum 1:5", "Revelation 6:14-16", "Revelation 16:20"]
  },
  {
    symbol: "Wrath of the Lamb",
    references: ["Revelation 6:16", "Revelation 6:17"],
    meaning: "The holy judgment of the crucified Redeemer against persistent rebellion.",
    scriptureReferences: ["John 5:22-29", "Revelation 6:16-17", "Revelation 14:10"]
  },
  {
    symbol: "Who shall stand",
    references: ["Revelation 6:17"],
    meaning: "The final question answered by God's sealing work and the redeemed multitude in Revelation 7.",
    scriptureReferences: ["Psalm 24:3-4", "Luke 21:36", "Revelation 6:17", "Revelation 7:1-17"]
  }
].map((symbol) => ({ ...symbol, sources: sourceList }));

function repeatedSentenceCheck() {
  const counts = new Map();
  for (const paragraphs of Object.values(commentary)) {
    for (const sentence of paragraphs.join(" ").split(/(?<=[.!?])\s+/)) {
      const normalized = sentence.trim();
      if (normalized.length > 45) counts.set(normalized, (counts.get(normalized) ?? 0) + 1);
    }
  }
  for (const [sentence, count] of counts) {
    if (count > 1) throw new Error(`Repeated Chapter 6 sentence: ${sentence}`);
  }
}

repeatedSentenceCheck();

const chapter = JSON.parse(readFileSync(chapterPath, "utf8"));

for (const verse of chapter.verses) {
  const paragraphs = [...commentary[verse.verse]];
  if (!paragraphs) throw new Error(`Missing commentary for ${verse.verse}`);
  const additions = depthAdditions[verse.verse] ?? [];
  for (let index = 0; wordCount(paragraphs.join("\n\n")) < 450 && index < additions.length; index += 1) {
    const target = index % paragraphs.length;
    paragraphs[target] = `${paragraphs[target]} ${additions[index]}`;
  }
  const finalAdditions = finalDepthAdditions[verse.verse] ?? [];
  for (let index = 0; wordCount(paragraphs.join("\n\n")) < 450 && index < finalAdditions.length; index += 1) {
    const target = index % paragraphs.length;
    paragraphs[target] = `${paragraphs[target]} ${finalAdditions[index]}`;
  }
  const detailedExplanation = paragraphs.join("\n\n");
  const totalWords = wordCount(detailedExplanation);
  if (totalWords < 420 || totalWords > 1000) throw new Error(`${verse.verse} commentary is ${totalWords} words`);
  if (paragraphs.length !== 4) throw new Error(`${verse.verse} should have exactly four paragraphs`);
  paragraphs.forEach((paragraph, index) => {
    const count = wordCount(paragraph);
    if (count < 65 || count > 240) throw new Error(`${verse.verse} paragraph ${index + 1} is ${count} words`);
  });
  assertPublicText(verse.verse, detailedExplanation);

  verse.explanation = paragraphs[0];
  verse.historicalBackground = paragraphs[1];
  verse.symbolicMeaning = paragraphs[1];
  verse.adventistInsight = paragraphs[2];
  verse.propheticSignificance = paragraphs[2];
  verse.danielConnection = verse.danielConnection ?? "";
  verse.crossReferences = crossReferences[verse.verse] ?? verse.crossReferences;
  verse.application = paragraphs[3];
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
  verse.wordNotes = wordNotes[verse.verse] ?? [];
  if (!verse.wordNotes.length) throw new Error(`${verse.verse} is missing word notes`);
  verse.sourceAudit = sourceAudit();
  verse.reviewStatus = "verified-seed";
}

chapter.title = "The First Six Seals";
chapter.summary = "Revelation 6 shows the Lamb opening the first six seals. The chapter traces gospel advance, persecution, compromise, spiritual famine, martyr witness, prophetic warning signs, and the final question of who can stand before the Lamb.";
chapter.historicalContext = "The seals are read from the throne-room setting of Revelation 4-5. They show Christ governing the course of history even when the visible story includes suffering, apostasy, martyrdom, warning signs, and final judgment.";
chapter.literaryContext = "Revelation 6 follows the Lamb's taking of the scroll in chapter 5 and prepares for the sealing interlude in chapter 7. The chapter ends with a question that chapter 7 answers.";
chapter.themes = ["Lamb", "Seals", "Four horsemen", "Persecution", "Spiritual famine", "Martyr witness", "Prophetic signs", "Who shall stand"];
chapter.outline = [
  { range: "6:1-2", title: "First Seal", summary: "The white horse portrays the victorious advance of the pure gospel, about A.D. 31-100." },
  { range: "6:3-4", title: "Second Seal", summary: "The red horse portrays persecution and removed peace, about A.D. 100-313." },
  { range: "6:5-6", title: "Third Seal", summary: "The black horse portrays scarcity and spiritual famine under compromise, about A.D. 313-538." },
  { range: "6:7-8", title: "Fourth Seal", summary: "The pale horse portrays the deathly outcome of deepening apostasy, about A.D. 538-1517." },
  { range: "6:9-11", title: "Fifth Seal", summary: "The martyrs cry for vindication and receive white robes and rest, about A.D. 1517-1755." },
  { range: "6:12-17", title: "Sixth Seal", summary: "The great prophetic signs begin in 1755, 1780, and 1833, then carry the reader toward the final day of the Lamb." }
];
chapter.symbols = symbols;
chapter.crossReferences = [
  "Zechariah 1:8-11",
  "Zechariah 6:1-8",
  "Matthew 24:4-31",
  "Joel 2:10-31",
  "Isaiah 2:10-21",
  "Isaiah 34:4",
  "Ezekiel 14:21",
  "Revelation 5:1-7",
  "Revelation 7:1-17"
];
chapter.danielConnections = [
  {
    danielText: "Daniel's sealed book, heavenly court, and final deliverance background",
    revelationText: "Revelation 6",
    sources: [docSource, mcnultySource]
  }
];
chapter.teachingNotes = {
  openingQuestion: "Why does Revelation 6 begin with the Lamb before it shows the horses?",
  mainPoint: "The Lamb opens the first six seals and shows the course of gospel witness, persecution, compromise, martyrdom, warning signs, and the final question of who can stand.",
  keyVerses: ["Revelation 6:1", "Revelation 6:9-11", "Revelation 6:12-17"],
  importantSymbols: ["White horse", "Red horse", "Black horse", "Pale horse", "Souls under the altar", "Great earthquake", "Wrath of the Lamb"],
  discussionQuestions: [
    "How does Revelation 5 shape the way we read the seals in Revelation 6?",
    "What spiritual danger is shown in the movement from white horse to pale horse?",
    "Why are the martyrs pictured under the altar rather than forgotten in the earth?",
    "How do the signs of the sixth seal call for readiness instead of curiosity?"
  ],
  commonMisunderstandings: [
    "Reading the horsemen apart from the Lamb who opens the seals.",
    "Treating the fifth seal as proof of naturally immortal disembodied souls rather than sanctuary symbolism.",
    "Using the dates as trivia while missing the call to repentance and readiness."
  ],
  adventistEmphasis: "The seals trace a historical-prophetic movement from apostolic gospel advance to persecution, compromise, medieval darkness, martyr witness, warning signs, and the final day of the Lamb.",
  closingAppeal: "Let the warning signs lead to readiness, and let the question 'Who shall stand?' lead to the sealing grace of God in Revelation 7."
};
chapter.evangelisticNotes = {
  mainDoctrinalTheme: "Christ governs history and prepares a people who can stand before Him.",
  keyBibleTexts: ["Revelation 5:5-7", "Revelation 6:1-17", "Revelation 7:1-17", "Matthew 24:29-31"],
  flow: [
    "Begin with the Lamb opening the seals.",
    "Trace the four horsemen as gospel advance, persecution, compromise, and spiritual death.",
    "Explain the martyrs' cry through sanctuary imagery and God's promise of vindication.",
    "Show the sixth-seal signs as warnings that call for repentance and readiness.",
    "End with the question of who can stand and move naturally to Revelation 7."
  ],
  simpleIllustrations: [
    "A sealed document cannot be acted upon until the rightful person opens it; Revelation 6 unfolds because the Lamb is worthy.",
    "Warning signs on a road are merciful because they come before danger, not after it."
  ],
  appealQuestion: "Will you seek the Lamb's sealing grace so you can stand when He appears?",
  cautions: [
    "Avoid sensational treatment of earthquakes, darkness, and falling stars.",
    "Do not detach historical dates from the chapter's spiritual call.",
    "Keep the fifth seal's altar language symbolic and Scripture-shaped."
  ],
  sources: [docSource, mcnultySource, technicalSource]
};
chapter.reflectionQuestions = [
  "Where do I see the Lamb's authority before I see the chapter's conflict?",
  "Am I feeding on Scripture freely, or living with spiritual famine?",
  "What does the martyrs' cry teach me about faithful lament?",
  "What must happen in me if I am to stand before the Lamb?"
];
chapter.sources = sourceList;

writeFileSync(chapterPath, `${JSON.stringify(chapter, null, 2)}\n`);
console.log("Imported deep Revelation 6 commentary.");
