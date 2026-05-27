import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contentRoot = join(root, "content");
const cachePath = join(root, ".pdf-extraction-cache/source-index.json");
const sourceIndex = existsSync(cachePath) ? JSON.parse(readFileSync(cachePath, "utf8")) : { sources: {} };
const sourceRecords = Object.entries(sourceIndex.sources ?? {}).map(([id, source]) => ({ id, ...source }));

const sourceIds = {
  mcnulty: "revelation-practical-living-in-the-judgment-hour",
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
  desilva: "desilva-discovering-revelation",
  osborne: "osborne-revelation",
  stuckenbruck: "stuckenbruck-eerdmans-revelation",
  akin: "akin-exalting-jesus-revelation",
  stevens: "stevens-triumph-of-god",
  mcknight: "mcknight-revelation-rest-of-us",
  poythress: "poythress-revelation-study-guide",
  tabb: "tabb-all-things-new"
};

const preferredAdventistOrder = [
  sourceIds.mcnulty,
  sourceIds.amazingNotes,
  sourceIds.amazingVerse,
  sourceIds.finalWarning,
  sourceIds.maxwell,
  sourceIds.stefanovic,
  sourceIds.doukhan,
  sourceIds.strand,
  sourceIds.wilson,
  sourceIds.bohr,
  sourceIds.cox,
  sourceIds.frazee,
  "revelations-three-greatest-mysteries",
  "revelations-three-most-wanted",
  "studies-in-revelation-12-13",
  "unfolding-the-revelation",
  "daniel-and-revelation-secrets-of-bible-prophecy",
  "the-two-witnesses-of-revelation-11",
  "1502-how-does-babylon-look-to-you-revelation-18",
  "0562-harvest-of-revelation-14",
  "0149-seven-beatitudes-of-revelation"
];

const preferredTechnicalOrder = [
  sourceIds.stefanovic,
  sourceIds.doukhan,
  sourceIds.osborne,
  sourceIds.beale,
  "revelation-a-shorter-commentary-by-g-k-beale-david-campbell",
  sourceIds.desilva,
  "seeing-things-johns-way-the-rhetoric-of-the-book-of-revelation",
  sourceIds.bauckham,
  sourceIds.tabb,
  sourceIds.stuckenbruck,
  "reading-revelation-in-context-johns-apocalypse-and-second-temple-judaism",
  "johns-use-of-the-old-testament-in-revelation-by-gregory-k-beale",
  "the-use-of-daniel-in-jewish-apocalyptic-literature-and-in-the-revelation-of-st-john-by-g-k-beale",
  "the-trinity-in-the-book-of-revelation-seeing-father-son-and-holy-spirit-in-johns-apocalypse"
];

const preferredPastoralOrder = [
  sourceIds.mcnulty,
  sourceIds.maxwell,
  sourceIds.amazingVerse,
  sourceIds.frazee,
  sourceIds.akin,
  sourceIds.stevens,
  sourceIds.mcknight,
  "revelation-john-r-w-stott",
  "revelation-interpretation-a-bible-commentary-for-teaching-and-preaching",
  "prophecies-of-revelation-for-teens"
];

const preferredComparisonOrder = [
  sourceIds.pate,
  sourceIds.poythress,
  sourceIds.beale,
  sourceIds.bauckham,
  sourceIds.desilva,
  sourceIds.osborne,
  sourceIds.mcknight
];

const profiles = {
  1: ["Prologue and vision of Christ", "Revelation opens as an unveiling from God through Jesus, angel, and prophet for the churches. John is not offering a puzzle-book detached from discipleship; he is bearing witness to Jesus Christ.", "Asia Minor believers heard this as a circular pastoral-prophetic letter in a Roman world that pressed loyalty, worship, and social conformity.", "The chapter combines epistolary greeting, prophetic beatitude, apocalyptic vision, and Danielic Son of Man imagery.", "Adventist interpretation stresses that Revelation is first a revelation of Jesus, who walks among His churches as priestly Lord.", "This chapter establishes method more than chronology: Daniel's imagery is opened around Christ, and the churches become the first audience for later prophetic scenes.", "Receive Revelation as a call to see Christ clearly before studying conflict, symbols, or chronology."],
  2: ["Messages to four churches", "Christ diagnoses real churches with precision: love, suffering, compromise, corruption, repentance, and promises to overcomers.", "The named cities were real urban congregations facing pressure from trade, civic religion, synagogue conflict, and imperial expectations.", "Each message follows a recognizable pattern: Christ's self-description, knowledge of the church, commendation or rebuke, command, and promise.", "Adventist study uses the churches devotionally, pastorally, and where supported, as a broad outline of Christian history.", "The church-period timeline should be presented as a supported historicist application, not as a substitute for the original churches.", "Let Christ's searching words create repentance without despair and courage without arrogance."],
  3: ["Messages to three churches", "Christ addresses reputation without life, faithful endurance, and lukewarm self-sufficiency. The promises point toward open access, secure identity, and shared reign with Christ.", "Sardis, Philadelphia, and Laodicea each had local history that makes Christ's words concrete: watchfulness, open doors, earthquakes, wealth, water, and medicine.", "The messages use local color and Old Testament royal/priestly imagery while pressing the repeated call to hear the Spirit.", "Adventist interpretation gives special attention to Laodicea as a searching end-time mirror for God's people.", "The Laodicean application belongs with Adventist mission and judgment-hour self-examination, but should not become a weapon against others.", "Christ's rebuke is an act of love; the chapter invites honest repentance and renewed fellowship."],
  4: ["Heavenly throne room", "John is shown worship before he is shown crisis. The throne, living creatures, elders, and hymns establish God's sovereignty and creation-worthiness.", "Ancient throne-room scenes communicated authority, courtly worship, and cosmic order; Revelation redirects awe from empire to God.", "The vision draws on Isaiah, Ezekiel, Daniel, and sanctuary imagery, using symbolic numbers and hymnic repetition.", "Adventist interpretation reads the heavenly scenes with sanctuary sensitivity and sees worship as the central issue in Revelation.", "This chapter is not a dated timeline event by itself, but it frames later judgment and sanctuary scenes.", "Worship reorders fear: God is on the throne before evil powers appear."],
  5: ["The Lamb and the scroll", "The crisis of the sealed scroll is answered by the Lion who appears as a slain Lamb. Christ's worthiness is grounded in redemption.", "The imagery would confront imperial claims by locating history's meaning in the crucified and risen Christ.", "Lion, Lamb, scroll, horns, eyes, elders, incense, and songs create a dense Old Testament and sanctuary tapestry.", "Adventist interpretation centers Christ's heavenly ministry and worthiness before moving into the seals.", "The opening of the scroll leads into the seals; any timeline must remain subordinate to the Lamb's victory.", "Do not read prophecy without worshiping the Lamb who was slain."],
  6: ["First six seals", "The seals portray conquest, conflict, scarcity, death, martyr witness, and cosmic signs that lead to the question of who can stand.", "The imagery uses familiar ancient realities of war, famine, plague, and public signs to portray judgment and upheaval.", "The horsemen echo Zechariah, covenant curses, and apocalyptic sign language; the martyrs under the altar use sacrificial imagery.", "Adventist historicist interpretation has traditionally related the seals to movements in Christian history and signs of Christ's coming.", "Timeline claims for the seals should be stated carefully, especially when identifying historical fulfillments or celestial signs.", "The chapter teaches endurance under injustice and directs terror toward the need to stand in Christ."],
  7: ["Sealing and the multitude", "Before the final pressure of the seals is answered, God marks His servants and shows a multitude before the throne.", "Seals marked ownership and protection; tribal lists and palm-bearing crowds evoke covenant identity and victory.", "The chapter blends Israel imagery, Exodus deliverance, priestly service, and eschatological worship.", "Adventist interpretation connects sealing with loyalty to God, worship, law, and end-time faithfulness.", "The 144,000 and great multitude require careful handling because Adventist writers differ on details; the safest emphasis is God's faithful, protected people.", "God knows His people before crisis and leads them toward worship, not panic."],
  8: ["Seventh seal and trumpets", "Silence, incense, prayers, fire from the altar, and trumpets show that judgment warnings move in relation to heavenly intercession.", "Trumpets in Scripture summon, warn, announce battle, and call communities to attention before God.", "The chapter draws on Exodus plagues, sanctuary ritual, and prophetic judgment imagery.", "Adventist interpretation has often read the trumpets historically while acknowledging that details are difficult.", "Trumpet timelines should be presented with humility because Adventist interpreters have not been uniform on every identification.", "Prayer matters in the movement of history; warning is mercy before finality."],
  9: ["Fifth and sixth trumpets", "The visions intensify with abyss imagery, torment, armies, and the tragedy of continued refusal to repent.", "The imagery communicates spiritual and social devastation in symbolic language rather than sensational spectacle.", "Locusts, scorpions, Euphrates, and cavalry imagery combine Exodus, prophetic invasion, and apocalyptic symbolism.", "Adventist historicist readings should be included only with careful source support and a note of interpretive diversity.", "Any historical timeline for these trumpets must remain reviewable and secondary to the chapter's call to repentance.", "The deepest danger is not merely judgment, but a heart that refuses to turn back to God."],
  10: ["Little book and bitter-sweet mission", "John receives an opened little book, eats it, experiences sweetness and bitterness, and is recommissioned to prophesy.", "Eating a scroll recalls prophetic vocation; sweetness and bitterness describe the cost of receiving God's message.", "The chapter is saturated with Danielic unsealing, oath, angelic imagery, and prophetic commissioning.", "Adventist interpretation especially connects the opened little book with Daniel and the rise of the Advent movement.", "This is a major Adventist timeline chapter: Daniel's sealed prophecies, the bitter disappointment motif, and renewed mission must be sourced from Adventist materials.", "True prophetic study humbles the messenger and sends the church back into mission."],
  11: ["Two witnesses and seventh trumpet", "Measuring, witness, opposition, death, vindication, and the seventh trumpet show God's word and people preserved amid hostility.", "The temple, witnesses, sackcloth, and city imagery draw from Israel's prophetic and worship traditions.", "The two witnesses evoke legal testimony, Moses/Elijah patterns, Zechariah's lampstands, and prophetic time periods.", "Adventist interpretation often connects this chapter with Scripture's witness, the 1260 years, and the French Revolution, where supported.", "Timeline details such as 1260 days/years and historicist applications require Adventist-source audit and careful wording.", "Faithful witness may look defeated, but God vindicates His word and reign."],
  12: ["Woman, dragon, child, remnant", "Revelation's center presents the great controversy: Christ's victory, Satan's rage, the protected woman, and the remnant.", "The symbols draw from Israel, messianic hope, imperial hostility, wilderness preservation, and cosmic conflict language.", "The chapter uses Genesis, Exodus, Psalms, Daniel, and prophetic birth imagery in a compressed symbolic narrative.", "Adventist interpretation sees the woman as God's faithful people, the dragon as Satan working through hostile powers, and the remnant as commandment-keeping witnesses with the testimony of Jesus.", "The 1260 days/years and remnant motif are core Adventist timeline and identity themes; they must remain Adventist-sourced.", "The chapter calls believers to overcome by the Lamb's blood, faithful testimony, and endurance."],
  13: ["Beast powers and worship conflict", "Two beast powers enforce counterfeit worship and allegiance, setting up the contrast with the Lamb's faithful people.", "Ancient hearers would recognize blasphemous power, coercive worship, and economic pressure as religious-political realities.", "The sea beast is built from Daniel 7's beasts; the earth beast, image, mark, and number require careful symbolic interpretation.", "Adventist interpretation identifies this as a final worship conflict involving religious authority, civil power, law, and allegiance to God.", "Timeline and identity claims about the sea beast, earth beast, wound, image, mark, and 666 must be Adventist-sourced and non-sensational.", "The pastoral issue is worship: whom will the conscience trust when pressure becomes costly?"],
  14: ["Three angels and harvest", "The chapter answers the beast crisis with the Lamb, the sealed company, the everlasting gospel, judgment-hour worship, warnings, endurance, and harvest.", "Public angelic proclamations in apocalyptic literature communicate urgent universal messages, not private speculation.", "The chapter joins gospel, judgment, Creator worship, Babylon, beast imagery, commandments, faith of Jesus, and harvest symbolism.", "Adventist interpretation places Revelation 14:6-12 at the heart of mission: everlasting gospel, judgment hour, Creator worship, Babylon's fall, and patient saints.", "This is a major Adventist timeline chapter because judgment-hour proclamation connects with Daniel 7-8 and Adventist sanctuary theology.", "Let the warning passages deepen allegiance to Christ and compassion for people still being called out of confusion."],
  15: ["Victors and final plagues", "Before the bowls fall, Revelation shows victorious worshipers singing the song of Moses and the Lamb.", "Exodus deliverance shapes the scene; judgment is framed by worship and God's righteous acts.", "Sea of glass, harps, temple, smoke, and plagues connect Exodus, sanctuary, and eschatological judgment.", "Adventist interpretation treats the seven last plagues carefully in relation to Christ's completed intercession and final deliverance.", "Close-of-probation language should be careful and Adventist-sourced; no future date or speculative schedule should be implied.", "God's final judgments are not arbitrary; they reveal justice after mercy has been resisted."],
  16: ["Seven last plagues", "The bowls portray final judgments on hardened rebellion and culminate in the gathering called Armageddon.", "The plagues echo Exodus while addressing global worship, empire, and refusal to repent.", "The chapter uses sanctuary, plague, Euphrates, unclean spirits, and battle imagery symbolically.", "Adventist interpretation reads the plagues as future final judgments after probation closes, with Armageddon centered on allegiance and worship.", "Future-event sequence must be phrased carefully: no date-setting and no overconfident geopolitical speculation.", "The repeated refusal to repent warns readers to respond to grace now."],
  17: ["Babylon on the beast", "John sees a corrupt woman allied with beastly power, intoxicating the nations and opposing God's faithful witnesses.", "Babylon imagery evokes empire, idolatry, luxury, violence, and seduction across Scripture.", "Woman, waters, heads, horns, kings, and wilderness imagery require Daniel-Revelation comparison.", "Adventist interpretation understands Babylon as end-time religious confusion and false worship in alliance with coercive power.", "Identifications of heads, kings, and phases of power must be Adventist-sourced and held with care where interpreters differ.", "Discernment means refusing both fear and fascination; the call is fidelity to the Lamb."],
  18: ["Fall of Babylon and call out", "A mighty angel announces Babylon's fall, exposes her corrupt economy and violence, and calls God's people to come out.", "Laments over fallen cities and trade networks were known forms for critiquing arrogance, exploitation, and idolatry.", "The chapter draws heavily from Old Testament oracles against Babylon, Tyre, and oppressive powers.", "Adventist interpretation connects Revelation 18 with the final loud call and the exposure of false worship systems.", "Future proclamation and Babylon's final fall must be worded as a call to Christ-centered separation, not contempt for people.", "The practical question is whether comfort, profit, or belonging has muted obedience to God's call."],
  19: ["Marriage supper and victorious King", "Heaven rejoices over God's judgments, the bride is ready, and Christ appears as Faithful and True to defeat evil.", "Marriage, royal procession, battle, and banquet imagery communicate covenant joy and final victory.", "The white horse, many crowns, robe, sword, and names of Christ draw together messianic, royal, and prophetic texts.", "Adventist teaching emphasizes the visible, personal, glorious return of Christ and the final defeat of opposing powers.", "The chapter moves within final-event hope, but its exact imagery should not be turned into speculative literalism.", "Hope is not escapism; it is confidence that Christ's justice and faithfulness will prevail."],
  20: ["Millennium and final judgment", "Satan is bound, the saints participate in judgment, the wicked are raised after the thousand years, and sin is finally destroyed.", "Ancient apocalyptic judgment scenes use books, thrones, resurrection, and fire to portray accountability and final reversal.", "The abyss, first resurrection, books, lake of fire, and second death require careful sequence and theological restraint.", "Adventist interpretation reads the millennium as a heavenly reign/judgment period between the two resurrections, followed by final eradication of sin.", "The millennium, judgment review, second resurrection, and lake of fire are key Adventist timeline elements and must be sourced from Adventist materials.", "The end of sin is God's severe mercy toward the universe; evil does not get the last word."],
  21: ["New heaven, new earth, New Jerusalem", "The story ends with God dwelling with His people, tears wiped away, death ended, and creation renewed.", "City, bride, temple, jewels, gates, and measurements communicate beauty, security, access, and covenant fulfillment.", "The chapter gathers Eden, Exodus, temple, prophetic restoration, and priestly imagery into one final vision.", "Adventist hope centers on bodily restoration, renewed creation, and God's permanent dwelling with the redeemed.", "This is the endpoint of the prophetic timeline: not escape from creation, but new creation.", "Christian hope is concrete: God intends a world without death, mourning, crying, or pain."],
  22: ["River of life and final invitation", "The river, tree, throne, open book, Spirit and bride, and repeated coming of Jesus close Revelation with invitation and warning.", "Eden imagery returns, but now the city-garden is secure and the curse is gone.", "The chapter blends Genesis, Ezekiel, Daniel, prophetic authentication, and liturgical invitation.", "Adventist interpretation hears the closing invitation as mission: keep the words, worship God, and witness to Jesus' soon coming.", "The unsealed character of Revelation answers Daniel's sealed-book motif and keeps the church in hopeful readiness without date-setting.", "The last word is invitation: come to Christ, receive life, and live in readiness."],
};

const pericopes = {
  1: [[1, 3, "Prologue and blessing"], [4, 8, "Greeting, doxology, and coming"], [9, 11, "John on Patmos"], [12, 20, "Christ among the lampstands"]],
  2: [[1, 7, "Ephesus"], [8, 11, "Smyrna"], [12, 17, "Pergamos"], [18, 29, "Thyatira"]],
  3: [[1, 6, "Sardis"], [7, 13, "Philadelphia"], [14, 22, "Laodicea"]],
  4: [[1, 11, "Heavenly throne room"]],
  5: [[1, 14, "The Lamb and the scroll"]],
  6: [[1, 2, "First seal"], [3, 4, "Second seal"], [5, 6, "Third seal"], [7, 8, "Fourth seal"], [9, 11, "Fifth seal"], [12, 17, "Sixth seal"]],
  7: [[1, 8, "Sealing of God's servants"], [9, 17, "Great multitude"]],
  8: [[1, 5, "Seventh seal and incense"], [6, 13, "First four trumpets"]],
  9: [[1, 12, "Fifth trumpet"], [13, 21, "Sixth trumpet"]],
  10: [[1, 7, "Mighty angel"], [8, 11, "Little book and recommissioning"]],
  11: [[1, 2, "Measuring the temple"], [3, 14, "Two witnesses"], [15, 19, "Seventh trumpet"]],
  12: [[1, 6, "Woman, dragon, and child"], [7, 12, "War in heaven"], [13, 17, "Wilderness and remnant"]],
  13: [[1, 10, "Sea beast"], [11, 18, "Earth beast and mark"]],
  14: [[1, 5, "Lamb and 144,000"], [6, 12, "Three angels' messages"], [13, 20, "Blessing and harvest"]],
  15: [[1, 4, "Victors sing"], [5, 8, "Temple and seven plagues"]],
  16: [[1, 11, "First five bowls"], [12, 16, "Sixth bowl and Armageddon"], [17, 21, "Seventh bowl"]],
  17: [[1, 6, "Woman and beast"], [7, 18, "Symbol explained"]],
  18: [[1, 8, "Babylon fallen and call out"], [9, 19, "Laments over Babylon"], [20, 24, "Final verdict"]],
  19: [[1, 10, "Hallelujah and marriage supper"], [11, 21, "Rider on the white horse"]],
  20: [[1, 3, "Satan bound"], [4, 6, "Millennial reign"], [7, 10, "Final revolt ended"], [11, 15, "Great white throne judgment"]],
  21: [[1, 8, "New creation"], [9, 27, "New Jerusalem"]],
  22: [[1, 5, "River and tree of life"], [6, 11, "Trustworthy words"], [12, 21, "Final invitation"]]
};

const propheticChapters = new Set([6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]);
const timelineHeavy = new Set([10, 11, 12, 13, 14, 16, 17, 18, 20, 21, 22]);

function markerCandidates(chapter, verseNumber) {
  const unit = unitFor(chapter, verseNumber);
  return [
    `Revelation ${chapter}:${verseNumber}`,
    `Rev. ${chapter}:${verseNumber}`,
    `Rev ${chapter}:${verseNumber}`,
    markerFor(chapter, verseNumber),
    `Revelation ${chapter}`,
    `Rev. ${chapter}`,
    unit,
  ].filter(Boolean);
}

function isWeakHit(hit) {
  const snippet = String(hit?.snippet ?? "");
  if (snippet.length < 90) return true;
  if (/TABLE OF CONTENTS|^TENTS\b|Copyright|All Rights Reserved|Published by|Unless otherwise marked|ISBN|Acknowledg/i.test(snippet)) return true;
  const uppercaseWords = snippet.match(/\b[A-Z]{4,}\b/g) ?? [];
  if (uppercaseWords.length > 12 && /REVELATION \d/.test(snippet)) return true;
  return false;
}

function usableHits(source) {
  return (source?.hits ?? []).filter((hit) => !isWeakHit(hit));
}

function markerScore(item, markers) {
  const marker = String(item.marker ?? "").toLowerCase();
  const references = (item.references ?? []).map((reference) => String(reference).toLowerCase());
  let score = 0;
  for (const candidate of markers) {
    const lower = String(candidate).toLowerCase();
    if (!lower) continue;
    if (marker === lower) score += lower.includes(":") ? 80 : 45;
    else if (marker.includes(lower) || lower.includes(marker)) score += lower.includes(":") ? 55 : 30;
    if (references.includes(lower)) score += lower.includes(":") ? 70 : 35;
  }
  return score;
}

function sourceScore(source, markers, role) {
  const hits = usableHits(source);
  const hitScore = hits.reduce((best, hit) => Math.max(best, markerScore(hit, markers)), 0);
  if (hitScore <= 0) return 0;
  const themes = new Set(source.themes ?? []);
  let roleScore = 0;
  if (role === "adventist" || role === "timeline") roleScore += source.tradition === "Adventist" ? 40 : -100;
  if (role === "technical" && /academic|exegetical|canonical|historical/i.test(source.interpretiveCategory ?? "")) roleScore += 25;
  if (role === "background" && (themes.has("history") || /historical|academic/i.test(source.interpretiveCategory ?? ""))) roleScore += 25;
  if (role === "application" && (themes.has("application") || /pastoral|devotional|sermon|teaching/i.test(`${source.interpretiveCategory ?? ""} ${source.type ?? ""}`))) roleScore += 25;
  if (role === "comparison" && /comparative|idealist|preterist|futurist|academic/i.test(source.interpretiveCategory ?? "")) roleScore += 25;
  return hitScore + roleScore + Math.min(hits.length / 20, 12);
}

function knownFirst(ids, preferred) {
  const available = new Set(sourceRecords.map((source) => source.id));
  const chosen = [];
  for (const id of preferred) {
    if (ids.includes(id) && available.has(id) && !chosen.includes(id)) chosen.push(id);
  }
  for (const id of ids) {
    if (available.has(id) && !chosen.includes(id)) chosen.push(id);
  }
  return chosen;
}

function idsForRole(role, chapter, verseNumber, max = 6) {
  const markers = markerCandidates(chapter, verseNumber);
  const pool = sourceRecords.filter((source) => {
    if (role === "timeline" || role === "adventist") return source.tradition === "Adventist";
    if (role === "technical") return source.tradition === "Adventist" || /academic|exegetical|canonical|historical/i.test(source.interpretiveCategory ?? "");
    if (role === "background") return /academic|historical|canonical|Adventist/i.test(`${source.interpretiveCategory ?? ""} ${source.tradition ?? ""}`);
    if (role === "application") return /pastoral|devotional|sermon|teaching|Adventist/i.test(`${source.interpretiveCategory ?? ""} ${source.type ?? ""} ${source.tradition ?? ""}`);
    if (role === "comparison") return source.tradition !== "Adventist";
    return true;
  });
  const preferred = role === "timeline" || role === "adventist"
    ? preferredAdventistOrder
    : role === "technical" || role === "background"
      ? preferredTechnicalOrder
      : role === "application"
        ? preferredPastoralOrder
        : preferredComparisonOrder;
  const ranked = pool
    .map((source) => ({ source, score: sourceScore(source, markers, role) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ source }) => source.id);
  return knownFirst(ranked, preferred).slice(0, max);
}

function sourceRef(sourceId, markers, claimType, priority) {
  const record = sourceIndex.sources?.[sourceId];
  const candidates = Array.isArray(markers) ? markers : [markers];
  const hits = usableHits(record);
  const hit = hits
    ?.map((item) => ({ item, score: markerScore(item, candidates) }))
    .sort((a, b) => b.score - a.score)
    .find(({ score }) => score > 0)?.item;
  return {
    sourceId,
    locator: hit ? `source-index page ${hit.page}; marker "${hit.marker}"` : "source index built; exact page locator pending",
    claimType,
    priority
  };
}

function refs(ids, markers, claimType, priority) {
  return ids.filter((id) => sourceIndex.sources?.[id]).map((id) => sourceRef(id, markers, claimType, priority));
}

function unitFor(chapter, verseNumber) {
  const found = pericopes[chapter]?.find(([start, end]) => verseNumber >= start && verseNumber <= end);
  return found ? found[2] : profiles[chapter][0];
}

function phraseDetail(text, chapter) {
  const rules = [
    [/revelation of jesus christ/i, "The opening phrase makes Jesus both the giver and center of the book; Revelation should be approached as unveiling before it is approached as prediction."],
    [/testimony of jesus|testimony/i, "The language of testimony frames Revelation as faithful witness, not private speculation, and it links seeing, hearing, keeping, and bearing witness."],
    [/blessed is he|blessed are/i, "The beatitude makes response part of interpretation: readers are blessed not merely by decoding but by hearing and keeping the message."],
    [/lord'?s day/i, "The phrase should be handled with sensitivity to biblical Sabbath language, early Christian worship debates, and John's Jewish scriptural world."],
    [/lampstands?/i, "Lampstand imagery is interpreted within the chapter as churches held in Christ's presence, which keeps ecclesiology centered on Jesus' ministry."],
    [/stars?/i, "The stars are explained as the angels or messengers of the churches, so the symbol should be interpreted from Revelation's own explanation before broader application."],
    [/repent/i, "Repentance in Revelation is not vague regret; it is a concrete turning from compromised worship, dead profession, or self-sufficiency toward Christ."],
    [/overcom/i, "The promise to the overcomer ties local church faithfulness to the final victory of Christ and His people."],
    [/throne/i, "Throne language relocates ultimate authority from earthly empire to God's heavenly rule."],
    [/holy, holy, holy|worthy/i, "The worship language reveals theology through liturgy: God's holiness and Christ's worthiness interpret the visions that follow."],
    [/lamb/i, "The Lamb image holds together sacrifice, victory, kingship, and worship; Revelation's conquest is cruciform before it is coercive."],
    [/book|scroll|little book/i, "Book and scroll imagery points to disclosed divine purpose, prophetic commission, and the responsibility of receiving God's message."],
    [/seal|sealed/i, "Sealing language marks ownership and protection and should be contrasted with counterfeit allegiance later in Revelation."],
    [/horse/i, "Horse imagery communicates forces moving through history and judgment, but each seal must still be read from its immediate sequence."],
    [/altar/i, "Altar imagery links suffering, prayer, sacrifice, and heavenly response rather than treating martyrdom as forgotten."],
    [/144,?000/i, "The 144,000 should be handled carefully as an end-time people of God image, with disputed details kept secondary to faithfulness and worship."],
    [/trumpet/i, "Trumpets warn before final judgment; they are mercy-laden alarms, not sensational props."],
    [/abyss|bottomless/i, "Abyss language signals chaos, restraint, and demonic opposition in symbolic apocalyptic terms."],
    [/two witnesses/i, "The two witnesses should be read through biblical testimony patterns and only then through historicist application."],
    [/woman/i, "Woman imagery can signify God's covenant people or corrupt religious power depending on the chapter; the immediate context controls the symbol."],
    [/dragon/i, "Revelation explicitly identifies the dragon with Satan, though the dragon works through historical powers."],
    [/\bbeast\b/i, "Beast imagery comes through Daniel and depicts arrogant power that demands allegiance contrary to God."],
    [/mark/i, "The mark is part of the final worship conflict; Adventist teaching should avoid claiming present individuals already bear it."],
    [/six hundred threescore and six|666/i, "The number calls for wisdom and careful interpretation; avoid clever speculation detached from the passage's worship conflict."],
    [/everlasting gospel/i, "The first angel begins with gospel, so Adventist proclamation of judgment and warning must remain good news centered in Christ."],
    [/hour of his judgment/i, "The judgment-hour phrase is a major Adventist Daniel-Revelation link and should be handled with sanctuary and gospel context."],
    [/worship him that made/i, "Creator worship connects Revelation's final call with creation, Sabbath theology, and allegiance to God."],
    [/babylon/i, "Babylon symbolizes organized confusion and false worship; the call should be compassionate toward people rather than contemptuous."],
    [/commandments of god|faith of jesus/i, "The patience of the saints joins obedience and faith; Adventist interpretation should keep law and gospel together."],
    [/plagues?|vials?|bowls?/i, "The final plagues should be presented as solemn judgment after resisted mercy, not as frightening spectacle."],
    [/armageddon/i, "Armageddon should be framed around worship and allegiance before making any claim about geography or politics."],
    [/come out of her/i, "The call to come out is an evangelistic appeal, not a license for harshness toward people in confusion."],
    [/white horse/i, "The white horse vision presents Christ's victorious coming with justice, truth, and final authority."],
    [/thousand years|millennium/i, "The thousand years are central to Adventist final-event sequence and should be explained with the two resurrections and judgment in view."],
    [/books?|book of life/i, "Books language emphasizes accountability, memory, vindication, and the transparency of God's judgment."],
    [/lake of fire|second death/i, "The second death marks the final end of sin; it should be taught as God's just conclusion to evil, not as sensational torment."],
    [/new heaven|new earth/i, "New creation is the goal of Revelation's prophecy: God restores the world rather than abandoning it."],
    [/new jerusalem/i, "New Jerusalem imagery combines city, bride, temple, and Eden themes to show secure communion with God."],
    [/no more death|tears/i, "The promise names concrete griefs that God will end, giving pastoral weight to eschatology."],
    [/river of life|tree of life/i, "River and tree imagery returns the reader to Eden, now restored and secured by God's throne."],
    [/come, lord jesus|spirit and the bride say,? come|let him that is athirst come|surely i come quickly/i, "The final invitation turns prophecy into prayer and response: Christ comes, and the hearer is invited to come."],
  ];
  const livingCreatures = livingCreatureContext(chapter, text);
  const sevenSeals = sevenSealContext(chapter, text);
  const matches = rules
    .filter(([regex]) => regex.test(text))
    .map(([, explanation]) => explanation)
    .filter((explanation) => !(livingCreatures && explanation.startsWith("Beast imagery comes through Daniel")))
    .filter((explanation) => !(sevenSeals && explanation.startsWith("Sealing language marks ownership")))
    .slice(0, 4);
  if (livingCreatures) {
    matches.unshift("The living creatures are part of Revelation's throne-room worship, where created life responds to God's holiness and rule.");
  }
  if (sevenSeals) {
    matches.unshift("The seals are opened by the Lamb and disclose the movement of history under divine authority, not the seal-of-God theme of Revelation 7.");
  }
  return matches.length
    ? matches.join(" ")
    : (chapter <= 3
      ? "The wording functions as direct pastoral address from Christ to His church, with the local setting and the spiritual call held together."
      : "A close reading should identify the main image, trace its biblical background, and ask how it contributes to Revelation's movement from conflict to worship and restoration.");
}

function markerFor(chapter, verseNumber) {
  if (chapter === 14 && verseNumber >= 6 && verseNumber <= 12) return "Revelation 14:6-12";
  if (chapter === 13) return "Revelation 13";
  if (chapter === 12) return "Revelation 12";
  if (chapter === 11) return "Revelation 11";
  if (chapter === 10) return "Revelation 10";
  if (chapter === 17) return "Revelation 17";
  if (chapter === 18) return "Revelation 18";
  if (chapter === 20) return "Revelation 20";
  return `Revelation ${chapter}:${verseNumber}`;
}

function adventistSources(chapter) {
  const allAdventist = sourceRecords.filter((source) => source.tradition === "Adventist").map((source) => source.id);
  const chapterSpecific = [];
  if (chapter === 14) chapterSpecific.push(sourceIds.finalWarning, "0562-harvest-of-revelation-14", sourceIds.amazingNotes, sourceIds.maxwell, sourceIds.stefanovic, sourceIds.doukhan);
  if ([12, 13].includes(chapter)) chapterSpecific.push(sourceIds.bohr, sourceIds.finalWarning, "studies-in-revelation-12-13", sourceIds.amazingNotes, sourceIds.maxwell, sourceIds.stefanovic);
  if ([17, 18].includes(chapter)) chapterSpecific.push(sourceIds.bohr, sourceIds.finalWarning, "1502-how-does-babylon-look-to-you-revelation-18", sourceIds.amazingNotes, sourceIds.maxwell, sourceIds.stefanovic);
  if ([10, 11].includes(chapter)) chapterSpecific.push(sourceIds.wilson, sourceIds.bohr, "the-two-witnesses-of-revelation-11", sourceIds.amazingNotes, sourceIds.stefanovic, sourceIds.strand);
  if ([8, 9, 15, 16, 20].includes(chapter)) chapterSpecific.push(sourceIds.amazingNotes, sourceIds.maxwell, sourceIds.stefanovic, sourceIds.doukhan, sourceIds.wilson);
  return knownFirst([...chapterSpecific, ...allAdventist], preferredAdventistOrder);
}

function timelineText(chapter, unit) {
  if (!propheticChapters.has(chapter)) {
    return `Within the larger Adventist reading of Revelation, this verse supplies the theological frame for later prophecy: Christ is central, worship matters, obedience is covenantal, and endurance is possible because history is in God's hands. The verse itself functions more as revelation, worship, vision, or pastoral counsel than as a chronological marker.`;
  }
  if (!timelineHeavy.has(chapter)) {
    return `Adventist historicist study reads ${unit} within Revelation's broad movement from Christ's ministry among His people toward judgment and restoration. The theological emphasis is not curiosity about dates but confidence that Christ governs history, warns in mercy, and preserves a faithful people.`;
  }
  const special = {
    10: "Adventist interpretation treats the opened little book as a major Daniel-Revelation link and relates the sweet-bitter experience to the rise, disappointment, and renewed mission of the Advent movement.",
    11: "Adventist historicist interpretation commonly connects the 1260-day/year period and witness motif with the long conflict over Scripture and faithful testimony, while handling specific historical identifications with care.",
    12: "Adventist interpretation places the 1260 days/years, wilderness preservation, and remnant commandment-keeping witness within the great controversy timeline.",
    13: "Adventist interpretation relates the beast powers, wound, image, mark, and worship pressure to a historical and final conflict over allegiance to God, His law, and true worship.",
    14: "Adventist interpretation connects the three angels' messages with the everlasting gospel, judgment-hour proclamation, Creator worship, Babylon's fall, and the final witness of those who keep God's commandments and the faith of Jesus.",
    16: "Adventist interpretation reads the bowls as final judgments after persistent rejection of mercy, with Armageddon framed as the climax of worship and allegiance rather than a dateable military timetable.",
    17: "Adventist interpretation reads Babylon and the beast as corrupt religious-political opposition to God's final call, while disputed details about heads and kings require guarded wording.",
    18: "Adventist interpretation hears the loud call in this chapter as the final appeal for God's people to come out of Babylon before its fall.",
    20: "Adventist interpretation reads the millennium as a heavenly reign and judgment review between the resurrections, followed by the final end of sin.",
    21: "Adventist eschatology treats the new earth as the destination of the prophetic timeline: restored creation, not disembodied escape.",
    22: "Adventist interpretation links the unsealed final message with readiness, mission, and Jesus' soon coming without setting dates."
  };
  return `${special[chapter]} The emphasis should remain theological and pastoral: God reveals enough for faithful worship, moral discernment, and missionary witness, while forbidding speculative date-setting or sensational handling of the final crisis.`;
}

function reviewFlags(chapter) {
  const flags = ["Hidden source audit retained; public page intentionally omits source references."];
  if ([8, 9, 11, 13, 17].includes(chapter)) flags.push("Interpretive diversity exists; verify details before teaching as settled.");
  if ([10, 11, 12, 13, 14, 20].includes(chapter)) flags.push("Prophetic timeline claims require Adventist-source audit.");
  return flags;
}

const humanVerseNotes = {
  "1:1": [
    "John opens by naming the book as an unveiling of Jesus Christ. Revelation is not first a chart of future events, but a disclosure of Christ's person, authority, ministry, and victory. The prophecy comes from God, through Christ, by angelic mediation, to John, and finally to the servants of God; that chain of transmission gives the book both heavenly authority and pastoral purpose.",
    "The phrase \"things which must shortly come to pass\" does not invite restless date-setting. It announces that history is moving under divine sovereignty and that the church is being given enough light to live faithfully. Adventist interpretation rightly begins here: prophecy is centered in Jesus before it is arranged into a timeline.",
    "The opening verse therefore teaches a posture for reading the whole book. The reader comes not as a spectator of frightening symbols, but as a servant receiving the testimony of Christ for worship, endurance, discernment, and hope."
  ],
  "1:2": [
    "John describes his work as witness. He bears record of the word of God and the testimony of Jesus Christ, not of private speculation or religious imagination. Revelation is rooted in what John saw and in the authority of the God who gave the vision.",
    "The verse also binds together Scripture and testimony. The prophetic message is not detached from the rest of the biblical witness; it continues the pattern of God speaking, showing, and calling His people to respond. In Adventist reading, the \"testimony of Jesus\" will become an important theme for understanding faithful witness and the identity of God's people.",
    "For the reader, this verse asks that Revelation be received as testimony before it is treated as argument. John is not trying to entertain curiosity; he is bearing witness so that the church may trust Christ and remain faithful."
  ],
  "1:3": [
    "The first blessing of Revelation is attached to reading, hearing, and keeping. The book is meant to be read aloud among God's people, heard as a word from heaven, and obeyed in ordinary faithfulness. Interpretation is incomplete if it does not lead to response.",
    "The nearness of \"the time\" gives urgency, but not permission for speculation. Revelation presses the church to live awake before God. Its prophecy forms worshipers who can discern the present because they have seen the future in the light of Christ's victory.",
    "This beatitude keeps the commentary honest: the goal is not merely to solve symbols but to become the kind of people who hear Christ and keep His word."
  ],
  "1:4": [
    "John now turns from the title of the book to the churches that will receive it. Grace and peace come not from the empire that surrounds them, but from the eternal God, the One who is, who was, and who is to come. The opening greeting already relocates security from Rome to the throne of heaven.",
    "The reference to the seven Spirits before the throne carries the fullness of divine presence and ministry. Revelation's worship scenes, sanctuary imagery, and messages to the churches are already beginning to converge. God addresses His people from the place of sovereign rule and priestly care.",
    "The verse offers troubled churches more than information. It offers grace and peace from the God whose presence is not threatened by history."
  ],
  "1:5": [
    "Jesus is introduced with three magnificent titles: faithful witness, first begotten of the dead, and prince of the kings of the earth. These titles gather His earthly faithfulness, resurrection victory, and present lordship into one confession. Before Revelation shows beasts, kings, conflict, or judgment, it shows Christ.",
    "The doxology turns doctrine into worship. Jesus loved us, washed us from our sins in His own blood, and therefore His authority is not coercive like the powers of the earth. His reign is grounded in self-giving redemption.",
    "For the church, this means that faithfulness is possible because Christ has already been faithful, death has already been broken, and earthly power is already relativized under His kingship."
  ],
  "1:6": [
    "Redemption creates vocation. Christ does not merely forgive His people; He makes them kings and priests unto God. The language reaches back to Israel's calling and forward to Revelation's final worship, where the redeemed stand before God as a kingdom shaped by the Lamb.",
    "This priestly identity is important for Adventist theology because Revelation repeatedly draws attention to worship, sanctuary, intercession, judgment, and access to God. The redeemed are not passive observers of prophecy. They are called into worshipful service.",
    "The verse answers grace with praise: to Christ belong glory and dominion. The church's identity and mission begin in what He has made us by His blood."
  ],
  "1:7": [
    "The prophecy immediately lifts the eyes of the church to the visible return of Christ. He comes with clouds, echoing Daniel's Son of Man imagery and the biblical language of divine glory. Revelation's conflicts are therefore framed by the certainty that Jesus will be openly revealed.",
    "The mourning of the earth is solemn. The return of Christ is hope for the faithful and judgment for the world that pierced and rejected Him. Adventist teaching should preserve both notes: the Second Coming is personal, visible, glorious, and morally serious.",
    "This verse gives Revelation its horizon. The church endures because history does not end with empire, persecution, or confusion; it ends with the appearing of Christ."
  ],
  "1:8": [
    "God speaks as Alpha and Omega, the beginning and the ending. The title gathers origin, purpose, and completion into the character of God Himself. What begins in God will be brought to its appointed end by God.",
    "The description \"which is, and which was, and which is to come\" answers the instability of history. Churches may suffer, empires may rise, and prophetic conflict may intensify, but the Almighty is not reacting to events. He reigns across time.",
    "This verse gives the reader confidence to continue. Revelation will show frightening powers, but none of them are ultimate; the Almighty has the first word and the last."
  ],
  "1:9": [
    "John introduces himself not as a distant seer above the church, but as a brother and companion in tribulation, kingdom, and patience. Revelation is born from exile and worship, not from comfort or detached speculation.",
    "Patmos matters because the word of God and the testimony of Jesus have placed John in conflict with earthly power. Yet his isolation becomes the setting for a fuller vision of Christ. The empire can remove him from public usefulness, but it cannot silence heaven.",
    "The verse gives suffering believers a companionable theology of endurance. To belong to Jesus is to share both the pressure of the present age and the patience of His kingdom."
  ],
  "1:10": [
    "John is \"in the Spirit\" when the vision begins. Revelation is not merely John's reflection on suffering; it is a Spirit-given disclosure that breaks into the ordinary sequence of time.",
    "The trumpet-like voice signals divine summons and prophetic authority. Whether one discusses the phrase \"Lord's day\" with Sabbath sensitivity or early Christian usage in view, the main point is that worship becomes the doorway into hearing Christ.",
    "The verse gently reorders study itself. Revelation should be approached prayerfully, with a mind willing to be summoned by the voice behind the text."
  ],
  "1:11": [
    "The voice commands John to write what he sees and send it to seven real churches. Revelation is therefore visionary, but it is also pastoral correspondence addressed to concrete congregations with names, histories, wounds, and responsibilities.",
    "The seven churches anchor the book in Asia Minor while also preparing the reader for Revelation's larger symbolic use of seven. The message is complete enough for the whole church, yet personal enough to speak to each congregation.",
    "The verse reminds teachers and readers that prophecy is given for the church's formation. A vision from heaven becomes a written word for local communities."
  ],
  "1:12": [
    "John turns to see the voice, and the first visible symbols are seven golden candlesticks. The order is important: the church is seen in relation to the voice of Christ and the light-bearing imagery of worship.",
    "Lampstand imagery reaches back to the sanctuary and to Israel's calling to bear light before God. Revelation will soon explain the candlesticks as the churches, so the symbol should be interpreted from Christ's own explanation before wider application is made.",
    "This verse dignifies the church without flattering it. The churches are golden lampstands, but their light depends on the One who stands among them."
  ],
  "1:13": [
    "In the midst of the candlesticks John sees One like unto the Son of man. Christ is not absent from His churches; He stands among them with the dignity of Danielic authority and the tenderness of priestly nearness.",
    "The garment reaching to the foot and the golden girdle suggest priestly and royal imagery. Adventist reading rightly hears sanctuary resonance here: the risen Christ ministers in heaven while walking among His people on earth.",
    "The church's hope is not that it understands every symbol at once, but that Jesus is present before the symbols unfold."
  ],
  "1:14": [
    "The white hair evokes purity, wisdom, and ancient authority, while the eyes like fire suggest searching perception. Christ sees truly; nothing in the churches, the empire, or the human heart is hidden from Him.",
    "The imagery draws from Daniel's heavenly court language and transfers divine majesty to the risen Jesus. Revelation's Christology is therefore high and worshipful: the One who speaks to the churches shares the authority of God.",
    "Such a vision is both comfort and correction. The gaze of Christ exposes, but it exposes in order to heal and make faithful."
  ],
  "1:15": [
    "Feet like fine brass and a voice like many waters portray strength, stability, and overwhelming authority. Christ does not stand uncertainly in history; His presence is firm, and His word carries the weight of heaven.",
    "The imagery resists any reduced picture of Jesus as merely gentle adviser. The same Lord who loves and washes His people also judges, commands, and speaks with majesty.",
    "The verse invites reverence. To hear Christ rightly is to let His voice become stronger than the competing voices of fear, compromise, and empire."
  ],
  "1:16": [
    "Christ holds seven stars in His right hand, speaks with a sharp two-edged sword, and shines like the sun in strength. The picture joins care, judgment, and glory in a single vision.",
    "The stars will be identified as the angels or messengers of the churches, which means the churches are not left to manage themselves apart from Christ's grasp. The sword from His mouth emphasizes that His judging power is exercised by His word.",
    "The church needs both realities: to be held by Christ and to be corrected by Christ. His glory is not decorative; it is transforming."
  ],
  "1:17": [
    "John falls at Christ's feet as dead. Revelation begins its deepest instruction with awe, because the living Christ is not a manageable religious idea but the holy Lord of the church.",
    "Yet the same Christ lays His right hand on John and says, \"Fear not.\" Majesty and mercy meet here. The First and the Last does not crush His servant; He steadies him for testimony.",
    "This is the posture Revelation seeks to create: humbled before Christ, comforted by Christ, and ready to receive His word."
  ],
  "1:18": [
    "Jesus identifies Himself as the Living One who was dead and is alive for evermore. The cross and resurrection stand at the center of Revelation's authority. Christ has passed through death and now holds its keys.",
    "The keys of hell and death mean that final power over human destiny is not held by persecutors, empires, graves, or evil powers. It is held by the crucified and risen Lord.",
    "For believers facing pressure or loss, this verse is immense consolation. The One who commands Revelation has already conquered the enemy everyone else fears."
  ],
  "1:19": [
    "John is told again to write. The vision is not to remain a private experience; it must become a faithful record for the churches.",
    "The reference to what John has seen, what is, and what shall be hereafter gives Revelation a movement from present pastoral reality toward future disclosure. It is a mistake either to flatten the book into only first-century instruction or to detach its future hope from the churches that first received it.",
    "The verse encourages disciplined interpretation. Revelation must be read as testimony, pastoral address, and prophecy held together under Christ's command."
  ],
  "1:20": [
    "Christ explains the mystery of the stars and candlesticks. Revelation is symbolic, but it is not lawless; the book often gives its own interpretive controls and expects the reader to follow them carefully.",
    "The seven stars are the angels or messengers of the churches, and the seven candlesticks are the churches themselves. Christ holds the messengers and walks among the congregations, joining authority with intimate oversight.",
    "The chapter closes by placing every later message to the churches under this vision: Christ knows His people, sustains them, corrects them, and calls them to shine."
  ],
  "13:1": [
    "John sees a beast rising from the sea, and the imagery deliberately recalls Daniel's beasts. The scene presents political-religious power as distorted, composite, and blasphemous. It is not merely a monster image; it is a theological portrait of authority that imitates heaven while opposing God.",
    "In Adventist historicist interpretation, this passage becomes central for identifying a historical system of religious power that receives worshipful allegiance contrary to God. The point should be handled carefully and soberly: Revelation is exposing counterfeit worship and coerced conscience, not inviting contempt toward people.",
    "The pastoral question is allegiance. The church must learn to recognize power that borrows religious language while drawing worship away from the Creator and the Lamb."
  ],
  "13:2": [
    "The beast combines features from Daniel's leopard, bear, and lion, showing continuity with earlier oppressive kingdoms. Revelation is reading Daniel forward: the same pattern of arrogant, predatory power continues in a new form.",
    "The dragon gives the beast power, seat, and authority. Behind visible institutions stands the deeper great controversy between Christ and Satan. Adventist interpretation therefore reads this chapter as more than politics; it is a conflict over worship, law, authority, and conscience.",
    "This verse warns believers not to be impressed by power merely because it is organized, ancient, or influential. Authority must be judged by its relation to God and to the Lamb."
  ],
  "13:3": [
    "The wounded head that is healed gives the beast a strange imitation of death and restoration. Revelation presents counterfeit power as persuasive because it can appear defeated and then recover influence.",
    "Adventist historicist interpretation has treated the wound and healing as a major feature of the prophetic timeline, especially in the history and renewed influence of religious-political authority. That claim should be taught soberly, with the focus kept on worship and allegiance rather than fascination with institutional power.",
    "The verse warns that public admiration is not the same as truth. The whole world may wonder after a power, but the people of God must ask whether that wonder leads toward the Lamb."
  ],
  "13:8": [
    "The worship of the beast is contrasted with the Lamb's book of life. Revelation places humanity before a stark question: whether worship will be given to coercive power or to the Lamb slain from the foundation of the world.",
    "The phrase about the slain Lamb reaches behind history into God's redemptive purpose. Adventist interpretation of final events must never lose this center; the controversy over worship is meaningful because Christ has already given Himself for the world.",
    "This verse calls for settled identity. The safest place in the final conflict is not social approval, but belonging to the Lamb."
  ],
  "13:11": [
    "The second beast rises from the earth and appears lamb-like, yet speaks as a dragon. The contrast is theologically sharp: outward gentleness can mask coercive speech and dragon-like policy.",
    "Adventist interpretation has long seen this earth beast as a later power that supports the first beast and helps form the final crisis over worship. The emphasis should remain on character and function: a power that appears benign becomes dangerous when it uses influence to compel false worship.",
    "The verse calls for discernment. The faithful do not judge by appearance alone; they listen for whether a voice reflects the Lamb or the dragon."
  ],
  "13:12": [
    "The second beast exercises authority in the presence of the first and directs worship back to it. The issue is not simply political cooperation; Revelation is describing a system that uses influence to heal, magnify, and enforce counterfeit worship.",
    "In Adventist interpretation, this cooperation between powers is central to the final crisis. Civil and religious authority become dangerous when they join to pressure conscience and redirect allegiance away from God's commandments and the faith of Jesus.",
    "The verse asks readers to test power by its effect on worship. Any authority that compels the conscience in matters belonging to God has crossed a sacred boundary."
  ],
  "13:15": [
    "The image to the beast is given breath and coercive authority. Revelation portrays imitation as becoming enforcement: what begins as likeness becomes pressure, speech, and threatened death.",
    "Adventist teaching connects this image with a final union of religious influence and civil power that seeks to compel worship. The point should be handled without sensationalism. The danger is not machinery or symbolism by itself, but a system that makes loyalty to human authority a test of life and death.",
    "This verse calls the church to prepare conscience before crisis. Faithfulness is learned daily before it is tested publicly."
  ],
  "13:16": [
    "The mark is placed in the hand or forehead, symbolizing allegiance expressed in action and conviction. Revelation is describing a final conflict over worship and loyalty, not a superficial label to be identified carelessly.",
    "In Adventist interpretation, the mark of the beast must be explained in relation to worship, divine law, the seal of God, and the end-time pressure to accept human authority above God's command. It should never be used to declare that present individuals already bear the mark before the final crisis is fully formed.",
    "The pastoral force is a call to settled loyalty. God seeks a people whose minds and lives belong to Him."
  ],
  "13:17": [
    "Economic pressure now joins religious coercion. Revelation shows that false worship can become practical and costly when buying and selling are tied to allegiance.",
    "Adventist interpretation reads this as part of the end-time pressure surrounding the mark of the beast. The warning should not be reduced to fear of technology or commerce; the deeper issue is whether conscience can be controlled by access, security, and survival.",
    "The verse calls believers to cultivate trust before external pressure comes. The people who stand then are those learning now that life is more than what the beast can permit or deny."
  ],
  "13:18": [
    "The number 666 is introduced with a call for wisdom. That warning matters: Revelation does not invite clever speculation detached from the chapter's central issue of worship and authority.",
    "Adventist historicist interpretation has connected the number with blasphemous religious authority, but the interpretation must remain tied to the whole passage: beastly power, counterfeit worship, coercion, and opposition to God's commandments.",
    "The verse teaches humility as well as discernment. Wisdom in Revelation is not curiosity sharpened into suspicion; it is the ability to remain loyal to God when deceptive power appears persuasive."
  ],
  "14:6": [
    "The first angel begins with the everlasting gospel. This is crucial: Revelation's final warning is not fear first, but gospel first. The message is universal, crossing nation, kindred, tongue, and people because the Lamb's victory concerns the whole world.",
    "Adventist interpretation places this verse at the heart of mission. The gospel is proclaimed in the setting of judgment, creation, worship, and the final conflict with the beast. The message is urgent, but its urgency is evangelical before it is polemical.",
    "The church is therefore called to announce good news with moral seriousness and compassion. The point is not to win arguments about prophecy, but to call the world back to God through Christ."
  ],
  "14:7": [
    "The first angel calls the world to fear God, give Him glory, and worship the Creator because the hour of His judgment has come. Worship and judgment are not separated; the God who made heaven and earth is also the God before whom human allegiance is revealed.",
    "In Adventist theology, this verse connects deeply with Daniel's judgment scenes and sanctuary themes. The judgment hour is not a denial of the gospel but part of the gospel's seriousness: God is setting things right, vindicating His character, and calling people to true worship.",
    "The Creator language also gives the verse Sabbath weight. The final conflict is not mere religious opinion; it concerns whether created beings will worship the Creator on His terms."
  ],
  "14:8": [
    "The second angel announces Babylon's fall. Babylon represents religious confusion, intoxicating influence, and systems that draw the nations away from pure worship of God.",
    "The fall is moral and spiritual before it is visible and final. Adventist interpretation sees this message as a warning against corrupted religion and a call to leave confusion for the commandments of God and the faith of Jesus.",
    "Preach this with tears rather than triumphalism. God exposes Babylon because He loves people still trapped within its influence."
  ],
  "14:9": [
    "The third angel gives Revelation's most solemn warning against worshiping the beast and receiving its mark. The issue is worship, allegiance, and the authority one accepts over conscience.",
    "Adventist interpretation places this warning in the final conflict between the seal of God and the mark of the beast. The message must be stated carefully: it warns of a future settled allegiance under full light, not a casual label for sincere people who have not faced that final test.",
    "The pastoral purpose is mercy. God warns before judgment because He desires people to stand with the Lamb rather than be swept into counterfeit worship."
  ],
  "14:10": [
    "The wine of God's wrath is the solemn counterpart to Babylon's wine. Revelation is saying that false worship has consequences and that divine justice will finally answer rebellion.",
    "Adventist interpretation should keep this judgment within the whole three angels' message: gospel first, Creator worship, warning, endurance, and the Lamb. Wrath is never presented as God's temper, but as His settled opposition to sin that destroys His creation and deceives His people.",
    "The verse is sobering by design. It should move proclamation away from casual religion and toward urgent, compassionate appeal."
  ],
  "14:11": [
    "The language of smoke and unrest portrays the terrible finality of choosing the beast's worship. Revelation is not inviting delight in judgment; it is warning that rebellion offers no true rest.",
    "Adventist theology reads such judgment language alongside the broader biblical teaching that evil will be finally eradicated. The emphasis is the irreversible outcome of settled rebellion, not a sensational picture of God sustaining evil forever.",
    "The verse presses the conscience. The worship question is not theoretical; it concerns the kind of rest, allegiance, and destiny a person is choosing."
  ],
  "14:12": [
    "Here Revelation describes the people who endure the crisis: they keep the commandments of God and the faith of Jesus. Obedience and faith are not enemies in this verse; they belong together in the patience of the saints.",
    "Adventist theology rightly sees this as a defining text for the remnant. The final people of God are not marked by sensational claims but by persevering trust in Jesus and loyalty to God's commandments.",
    "The verse gives the warning messages a pastoral goal. Prophecy is meant to form a patient, faithful people whose lives bear witness to Christ."
  ],
  "14:13": [
    "A voice from heaven blesses those who die in the Lord. After the intense warning of the third angel, Revelation gives tender assurance: faithfulness is not wasted, even when it costs life itself.",
    "Their works follow them, not as a rival to grace, but as the witness of lives joined to Christ. Adventist proclamation of final events needs this pastoral balance; the saints are called to endurance, yet they rest in the Lord.",
    "The verse comforts the weary. In Christ, death does not erase faithfulness, and rest is promised to those who remain His."
  ],
  "14:14": [
    "The vision shifts to One like the Son of man seated on a white cloud, crowned and holding a sickle. The imagery gathers Danielic authority, royal victory, and harvest judgment into a single Christ-centered scene.",
    "The three angels' messages do not end in endless warning; they move toward the appearing and action of Christ. Adventist interpretation should therefore present judgment-hour proclamation as preparation for the coming King.",
    "The verse steadies the church's mission. The final harvest is Christ's work, not the product of human anxiety or control."
  ],
  "14:15": [
    "The command to reap announces that the harvest of the earth is ripe. Revelation uses agricultural imagery to speak of moral ripeness and divine timing.",
    "This is not permission for date-setting. Adventist teaching should preserve the urgency of final proclamation while confessing that the timing of the harvest remains under God's authority.",
    "The verse calls for faithful readiness. The church proclaims; Christ reaps; God governs the moment. That order protects the message from both laziness and presumption: urgency is entrusted to the church, but final timing remains under God's authority."
  ],
  "17:1": [
    "John is invited to see the judgment of the great whore who sits on many waters. The language is deliberately moral and covenantal: Revelation portrays false religion as unfaithfulness joined to wide influence.",
    "Adventist interpretation reads Babylon as a symbol of end-time religious confusion and corrupt worship in alliance with coercive power. The point is not to despise people, but to discern a system that God Himself judges.",
    "The verse asks for spiritual clarity. Compassion for persons must coexist with refusal to bless what God exposes."
  ],
  "17:2": [
    "The kings of the earth and the inhabitants of the earth are intoxicated by Babylon's wine. The image shows false worship shaping politics, culture, desire, and public imagination.",
    "In Adventist reading, Babylon's influence becomes global because error is not merely private; it organizes allegiance against the Creator and His law. This must be taught with care, avoiding contempt while naming confusion honestly.",
    "The verse warns that deception often feels like shared celebration before it is seen as captivity."
  ],
  "17:3": [
    "John is carried into the wilderness and sees the woman seated on a scarlet beast. The wilderness setting recalls testing and prophetic perspective; away from the intoxication of the city, the symbol can be seen for what it is.",
    "The woman and beast together show religious seduction supported by beastly power. Adventist interpretation connects this alliance with the final conflict over worship and conscience.",
    "The verse teaches that discernment often requires distance from the glamour of power. The faithful must learn to see beneath appearance."
  ],
  "17:5": [
    "The name on the woman's forehead identifies her as Babylon, mother of harlots and abominations. Revelation presents false religion as both seductive and fruitful; it reproduces confusion wherever worship is severed from truth.",
    "Adventist interpretation understands Babylon as a broad symbol of end-time religious confusion and false worship in alliance with coercive power. The symbol must be applied to systems and teachings, not used as contempt for individuals whom God still loves and calls.",
    "This verse asks the church for moral clarity without pride. To discern Babylon rightly is also to hear God's call to purity, humility, and faithful worship."
  ],
  "17:6": [
    "The woman is drunk with the blood of saints and martyrs. Revelation now reveals the violence hidden beneath Babylon's splendor.",
    "Adventist historicist interpretation connects this image with the long history of persecution by religious power when allied with coercive authority. The emphasis should remain sober and historical, not vindictive.",
    "The verse teaches that worship divorced from Christ can become cruel. True religion is known not only by claims to truth, but by fidelity to the Lamb and mercy toward conscience."
  ],
  "17:14": [
    "The powers make war with the Lamb, but the Lamb overcomes them. Revelation's irony is profound: the Lamb, the symbol of sacrifice, is the Lord of lords and King of kings.",
    "Those with Him are called, chosen, and faithful. Adventist interpretation of the final conflict must keep this center clear: victory comes through union with Christ, not through fear-driven analysis of the enemy.",
    "The verse gives courage without arrogance. The faithful overcome because they stand with the Lamb who has already overcome."
  ],
  "17:15": [
    "The waters are interpreted as peoples, multitudes, nations, and tongues. Revelation again provides its own symbolic control, showing that Babylon's influence is international and social, not merely local.",
    "Adventist interpretation uses this explanation carefully when reading Babylon's global reach and final crisis. The symbol points to broad human support for a system opposed to God's final call.",
    "The verse reminds readers that majority support cannot make false worship true. Faithfulness must be measured by the Lamb, not by numbers."
  ],
  "18:1": [
    "Another angel descends with great authority, and the earth is lightened with his glory. The scene enlarges the final proclamation: God's last warning is not dim, hesitant, or merely local.",
    "Adventist interpretation has often connected this chapter with the loud call, the intensified final appeal that exposes Babylon and invites God's people out. The glory language should keep the emphasis on divine character and saving truth.",
    "The verse gives mission a hopeful tone. The final message is serious, but it is also luminous."
  ],
  "18:2": [
    "Babylon's fall is announced with doubled certainty. What appeared splendid is revealed as a habitation of uncleanness and bondage.",
    "Adventist interpretation sees the fall of Babylon as the exposure of religious confusion and corrupt union with worldly power. The announcement should be made with grief and urgency, not with gloating.",
    "The verse teaches that systems opposed to God may look successful while already being spiritually collapsed. Revelation asks the reader to judge success by heaven's verdict rather than by wealth, influence, or public admiration."
  ],
  "18:3": [
    "Babylon's influence reaches nations, kings, and merchants. Revelation links false worship with political seduction and economic desire, showing that spiritual corruption is never isolated from life.",
    "Adventist interpretation should preserve this breadth. Babylon is not only doctrinal confusion; it is a whole pattern of allegiance in which worship, power, luxury, and compromise reinforce one another.",
    "The verse asks readers to examine what they love, admire, and depend on. False worship often comes clothed in prosperity."
  ],
  "18:4": [
    "The voice from heaven pleads, \"Come out of her, my people.\" The phrase is one of Revelation's most tender appeals. Even in Babylon, God has people whom He claims as His own.",
    "Adventist interpretation hears in this verse the final call to leave religious confusion and stand with the commandments of God and the faith of Jesus. The appeal is urgent because fellowship with Babylon means sharing in her sins and plagues.",
    "The tone of the passage shapes the tone of proclamation. God's final warning is not harsh denunciation; it is a rescue call."
  ],
  "18:5": [
    "Babylon's sins reach unto heaven, and God remembers her iniquities. The language does not mean God had forgotten; it means the time for public judgment has arrived.",
    "In Adventist proclamation, this verse belongs with the mercy of the preceding call. Judgment is announced so that people may separate from what God is about to judge.",
    "The verse is a warning against delayed repentance. What is normalized on earth is not hidden from heaven. The same God who calls His people out of Babylon also remembers the wrongs Babylon has refused to release."
  ],
  "18:21": [
    "The mighty angel casts a great stone into the sea to dramatize Babylon's sudden and irreversible fall. The symbol turns theology into enacted prophecy: the system that intoxicated the nations will not stand.",
    "Adventist interpretation should keep this finality connected to God's justice and deliverance. Babylon falls because God answers deception, persecution, and corrupt worship.",
    "The verse gives solemn hope. Evil may seem weighty, but in God's judgment it sinks."
  ],
  "20:1": [
    "An angel descends with the key of the bottomless pit and a great chain. The imagery signals restraint: the dragon who deceived the nations is now limited by divine authority.",
    "Adventist interpretation places this scene after the Second Coming, when Satan is bound by circumstances during the millennium. The emphasis is not a literal chain as though Satan were physical, but the end of his work of deceiving the nations.",
    "The verse reminds readers that evil is not eternal in power. God can restrain what once seemed unstoppable."
  ],
  "20:2": [
    "The dragon is named with deliberate clarity: the old serpent, the Devil, and Satan. Revelation gathers the enemy's identities from Eden to the final conflict and shows that God knows precisely who stands behind rebellion.",
    "The thousand years become part of Adventist final-event sequence, separating the resurrection of the righteous from the final resurrection and judgment of the wicked. The timeline should be taught as hope-filled disclosure, not as speculative arithmetic.",
    "The verse comforts the faithful by naming evil without making evil ultimate."
  ],
  "20:3": [
    "Satan is shut in the abyss so that he should deceive the nations no more until the thousand years are finished. The deceiver's work is interrupted by divine judgment.",
    "In Adventist interpretation, the desolated earth and absence of living nations explain the binding. Satan is restricted, not converted; the later release shows that his character has not changed.",
    "The verse teaches that God's final answer to evil includes exposure. A universe can see what rebellion is when its excuses and opportunities are stripped away."
  ],
  "20:4": [
    "John sees thrones and judgment given to the faithful. The persecuted saints, including those who refused the beast and his mark, are not forgotten; they share in Christ's reign and participate in the transparency of God's judgment.",
    "Adventist interpretation places this scene during the millennium, when the redeemed review God's judgments before the final eradication of sin. This does not make salvation uncertain; it reveals the justice and openness of God's government.",
    "The verse comforts believers who suffered under unjust powers. In the end, God honors faithful witness and exposes the truth about evil."
  ],
  "20:5": [
    "The rest of the dead do not live again until the thousand years are finished. Revelation distinguishes two resurrections and therefore gives structure to the millennium.",
    "Adventist interpretation reads this sequence as essential: the righteous share in the first resurrection and reign with Christ, while the wicked are raised after the thousand years for the final judgment scene.",
    "The verse encourages careful reading. Hope and judgment both have order under God's government."
  ],
  "20:6": [
    "Those who share in the first resurrection are called blessed and holy. The second death has no power over them, because their life is secured in Christ.",
    "They are priests of God and of Christ and reign with Him a thousand years. Adventist theology hears here both worship and judgment: the redeemed are brought near to God and participate in His transparent government.",
    "The verse turns the millennium into assurance. God's people are not merely rescued from danger; they are welcomed into priestly fellowship with Christ."
  ],
  "20:7": [
    "When the thousand years are finished, Satan is loosed for a little season. The release does not suggest repentance or renewed opportunity for evil to triumph; it reveals the unchanged nature of rebellion.",
    "Adventist interpretation places this after the resurrection of the wicked, when Satan once more finds subjects to deceive. The final crisis after the millennium exposes sin's persistence even after the clearest evidence of God's justice.",
    "The verse is sobering. Time alone does not heal rebellion; only surrender to God does."
  ],
  "20:10": [
    "The devil is cast into the lake of fire, joining the beast and false prophet in final judgment. Revelation's conflict does not end with negotiated peace, but with the decisive removal of the deceiver.",
    "Adventist interpretation understands this as the final destruction of Satan and evil, not an eternal dualism in which rebellion continues forever beside God's kingdom. The victory of God is complete.",
    "The verse gives moral closure. The enemy who accused, deceived, and destroyed will not haunt the new creation."
  ],
  "20:11": [
    "The great white throne appears, and earth and heaven flee from the face of the One seated there. The scene is one of absolute accountability before God.",
    "The imagery strips away every refuge in created power. Adventist theology places this after the millennium, as the final public judgment before sin is ended.",
    "The verse calls the reader to reverence. A life built on evasion cannot stand before the throne, but a life hidden in Christ need not fear truth."
  ],
  "20:12": [
    "The dead stand before God, and the books are opened. Revelation's judgment is personal, comprehensive, and transparent. Nothing hidden by earthly power remains hidden before the throne.",
    "Adventist theology emphasizes that judgment reveals God's justice as well as human accountability. The book of life shows that the final issue is not merely record keeping, but relation to the Lamb whose life alone secures the redeemed.",
    "This verse is solemn, but it is not meant to produce despair. It calls the reader to live openly before God and to trust the righteousness of Christ."
  ],
  "20:13": [
    "Sea, death, and hell give up the dead. No place of loss, violence, burial, or forgotten history can keep humanity from God's final summons.",
    "The judgment is according to works because works reveal the real direction of life. Adventist interpretation keeps this together with the book of life: salvation is in Christ, and judgment openly reveals the truth about allegiance.",
    "The verse dignifies moral reality. What people do matters because people matter before God."
  ],
  "20:14": [
    "Death and hell are cast into the lake of fire. Revelation does not merely punish evil; it announces the end of the whole order of death. The second death is the final removal of sin and its consequences.",
    "In Adventist interpretation, this supports the final eradication of evil rather than an eternal dualism in which sin continues forever. God's judgment is severe because evil is severe, but it is also restorative for the universe because it brings rebellion to an end.",
    "The verse turns hope into moral seriousness. The God who will end death calls people now to receive life in Christ."
  ],
  "20:15": [
    "The final sentence is stark: whoever is not found written in the book of life is cast into the lake of fire. Revelation allows no sentimental ending in which rebellion is harmless.",
    "Yet even here the book of life keeps Christ at the center. Adventist teaching of final judgment should lead people to the Lamb, not merely to fear the fire.",
    "The verse closes the judgment scene with urgency. Life is found in Christ, and the time to receive Him is now."
  ]
};

const sevenChurchVerseNotes = {
  "2:1": [
    "The message to Ephesus begins with Christ holding the seven stars and walking among the seven golden candlesticks. The church is not left to itself; its messengers and its witness stand under the authority and inspection of the risen Lord.",
    "Ephesus was a major city of commerce, religion, and imperial presence, but Christ addresses the congregation from a higher authority than civic prestige. The lampstand image means the church exists to bear light, and that light depends on Christ's nearness.",
    "The verse prepares the whole letter: doctrine, endurance, love, and discipline matter because Jesus is personally present among His people."
  ],
  "2:2": [
    "Christ commends Ephesus for works, labor, patience, and moral discernment. This was not a careless church. It tested false apostles and refused to accept claims of spiritual authority simply because they sounded impressive.",
    "The praise is important because Revelation does not oppose love to truth. Ephesus had learned to guard the faith from deception, and Christ names that vigilance as good.",
    "The pastoral lesson is that churches need discernment as well as warmth. A congregation that cannot test teaching is vulnerable to every persuasive voice."
  ],
  "2:3": [
    "Ephesus had borne hardship for Christ's name and had not fainted. The verse honors perseverance: the church had continued to labor under pressure without abandoning its confession.",
    "Yet this commendation sits just before Christ's rebuke about first love. Faithful labor can remain outwardly active while the heart's affection cools. Revelation is therefore searching the motive beneath endurance.",
    "The verse encourages weary believers, but it also asks whether perseverance is still being animated by love for Christ."
  ],
  "2:4": [
    "The rebuke is painfully precise: Ephesus has left its first love. Christ does not deny their orthodoxy or endurance, but He will not allow doctrinal vigilance to become a substitute for living love.",
    "First love points to the earlier warmth of devotion to Christ and to the relational life that should flow from the gospel. A church can resist error and still lose the tenderness, humility, and joy that made its witness luminous.",
    "The verse is a mercy because Christ names the loss before the lampstand is removed. Love can still be recovered where repentance is welcomed."
  ],
  "2:5": [
    "Christ gives Ephesus a threefold remedy: remember, repent, and do the first works. Spiritual renewal begins by remembering where decline began, turning honestly, and returning to the practices that once expressed love.",
    "The warning about the lampstand is serious. The church's visible witness is not guaranteed by history, reputation, or correct doctrine; it remains dependent on communion with Christ.",
    "The verse calls every church to examine not only what it is defending, but whether its life still shines with love."
  ],
  "2:6": [
    "Christ adds one more commendation: Ephesus hates the deeds of the Nicolaitanes, which Christ also hates. The point is not permission for personal hostility, but moral agreement with Jesus about practices that corrupt discipleship.",
    "The Nicolaitanes appear in Revelation only here and in the message to Pergamos, where their doctrine is linked with compromise similar to Balaam's influence. The details should be handled cautiously, but the main issue is clear enough: a teaching or practice was making room for idolatry, immorality, or accommodation with pagan society while still claiming Christian identity.",
    "Ephesus is commended because it refused that compromise. The verse teaches that Christian love is not sentimental tolerance of what Christ hates; true love protects worship, holiness, and covenant loyalty."
  ],
  "2:7": [
    "The appeal, 'He that hath an ear,' widens the message beyond Ephesus. What Christ says to one church becomes instruction for all the churches and for every reader who is willing to hear the Spirit.",
    "The promise of the tree of life reaches back to Eden and forward to the New Jerusalem. The overcomer is not merely spared from loss; he is restored to the life with God that sin had barred.",
    "The verse closes Ephesus with hope: repentance and renewed love lead toward paradise, not merely institutional survival."
  ],
  "2:8": [
    "Smyrna is addressed by Christ as the First and the Last, the One who was dead and is alive. The title is perfectly fitted to a suffering church because Jesus speaks as the Lord who has already passed through death.",
    "Smyrna's poverty and persecution are not interpreted from the city's economy or reputation, but from the resurrection of Christ. The church may appear vulnerable, yet the living Christ holds the horizon of its future.",
    "The verse teaches persecuted believers to measure their situation by Christ's victory, not by the immediate power of their enemies."
  ],
  "2:9": [
    "Christ knows Smyrna's tribulation and poverty, and then adds the paradox: 'but thou art rich.' The church's material weakness is not the measure of its spiritual standing before heaven.",
    "The phrase 'synagogue of Satan' should be handled with care. In context it refers to hostile claimants whose opposition to Christ's people aligned them with the adversary's work; it must not be turned into contempt for Jewish people or into careless religious slander.",
    "The verse comforts believers whose faithfulness costs them status or resources. Christ knows both the suffering and the hidden wealth of loyalty."
  ],
  "2:10": [
    "Christ tells Smyrna not to fear the things it is about to suffer. The command is not denial of pain; it is courage grounded in the presence and victory of the risen Lord.",
    "The devil's activity behind imprisonment shows the great controversy operating through visible persecution. The 'ten days' communicates a limited testing under divine boundary, whether read as a short literal period or through broader historicist application.",
    "The promise is the crown of life. Faithfulness unto death is not loss in Christ's kingdom, because the One who died and lives gives life beyond the reach of persecutors."
  ],
  "2:11": [
    "The second appeal to hear the Spirit leads to the promise that the overcomer will not be hurt by the second death. Smyrna may face the first death through persecution, but not the final death of judgment.",
    "This promise is deeply pastoral. Revelation does not pretend that faith removes all earthly suffering; it announces that suffering cannot have the final word over those who belong to Christ.",
    "The verse turns martyr courage into resurrection hope."
  ],
  "2:12": [
    "Pergamos is addressed by the One who has the sharp sword with two edges. The image points to Christ's judging word, which discerns truth from compromise and cuts through religious ambiguity.",
    "This is the right title for a church living where loyalty is contested. Pergamos will be praised for holding Christ's name, yet rebuked for tolerating corrupt teaching.",
    "The verse warns that Christ's word must judge the church before the church can faithfully judge the world around it."
  ],
  "2:13": [
    "Christ knows where Pergamos dwells, 'even where Satan's seat is.' The phrase recognizes the intensity of the city's religious and imperial pressure without excusing compromise.",
    "Antipas stands as a faithful witness who held Christ's name even to death. His example shows that loyalty is possible in hostile surroundings, though it may become costly.",
    "The verse honors courage while preparing for correction: external pressure is real, but it does not justify internal tolerance of false worship."
  ],
  "2:14": [
    "Christ's rebuke concerns those who hold the doctrine of Balaam. The Old Testament background is the story in which Israel was led into idolatry and sexual immorality through counsel that blurred covenant loyalty.",
    "In Pergamos, the issue appears as accommodation: eating things sacrificed to idols and committing fornication. The language points not only to private morality, but to religious compromise with the surrounding culture's worship and social life.",
    "The verse is a warning against teaching that makes disobedience appear practical, sophisticated, or harmless. Christ will not bless a church that protects compromise in the name of survival."
  ],
  "2:15": [
    "The Nicolaitan problem reappears in Pergamos, now as a doctrine held by some within the church. What Ephesus rejected as deeds has developed here into tolerated teaching.",
    "The connection with Balaam suggests a pattern of compromise with idolatry and immorality. Some interpreters debate whether the Nicolaitanes were a defined sect or John's label for a compromising movement, but Revelation's concern is plain: grace was being distorted into permission to participate in practices Christ hated.",
    "The verse calls teachers and churches to take doctrine seriously because ideas eventually become habits, worship patterns, and loyalties."
  ],
  "2:16": [
    "The command to repent is addressed to the church, not only to the compromising group. A congregation becomes responsible when it tolerates what Christ forbids.",
    "The sword of Christ's mouth means His own word will oppose false teaching if the church refuses correction. Judgment begins as a merciful summons before it becomes confrontation.",
    "The verse urges communities to recover discipline as an act of love for Christ and for those being misled. Repentance here is not a private feeling only; it means the church must stop giving shelter to teaching that damages worship and obedience."
  ],
  "2:17": [
    "The hidden manna promises nourishment from God in contrast to food associated with idolatrous compromise. Christ offers a better table than the social and religious banquets that pressured believers toward accommodation.",
    "The white stone and new name speak of acceptance, vindication, and personal identity given by Christ. The exact background is discussed by commentators, but the theological force is clear: the overcomer receives from Christ what the world cannot grant.",
    "The verse invites believers to refuse compromised belonging because Christ gives deeper fellowship and a name known before God."
  ],
  "2:18": [
    "Thyatira is addressed by the Son of God, whose eyes are like fire and whose feet are like fine brass. The description emphasizes penetrating knowledge and stable authority.",
    "This church faces not merely external pressure but internal seduction, so Christ appears as the One who sees beneath appearances. No influential teacher, spiritual claim, or charitable reputation can hide compromise from His gaze.",
    "The verse prepares the reader to receive both commendation and severe correction under the searching holiness of Christ."
  ],
  "2:19": [
    "Christ commends Thyatira for charity, service, faith, patience, and increasing works. This church was not spiritually inactive; in some respects its later works exceeded the first.",
    "The commendation makes the coming rebuke more searching. Good ministries do not cancel tolerated corruption, and spiritual activity cannot excuse teaching that leads people away from covenant faithfulness.",
    "The verse teaches leaders to value growth and service while still guarding the moral and theological life of the church."
  ],
  "2:20": [
    "The problem in Thyatira is the tolerated influence of 'that woman Jezebel.' The name evokes the Old Testament queen who promoted Baal worship and opposed faithfulness to the Lord.",
    "Whether the figure was an actual influential teacher or a symbolic label, the issue is prophetic pretension joined to moral and religious compromise. She teaches Christ's servants to commit fornication and eat things sacrificed to idols, repeating the danger already seen in Balaam and the Nicolaitanes.",
    "The verse is especially sobering because the church 'sufferest' her; it permits what Christ condemns. Tolerance becomes unfaithful when it protects influence that leads people away from Jesus."
  ],
  "2:21": [
    "Christ says He gave Jezebel space to repent. Even severe warnings in Revelation are surrounded by mercy; judgment is not rushed where repentance is still possible.",
    "Her refusal to repent shows that the issue is not ignorance alone but settled resistance. Revelation distinguishes between weakness that can be healed and rebellion that clings to its sin.",
    "The verse asks the reader to receive time as mercy, not as permission to delay surrender. A delay in judgment is an invitation to turn, and refusal turns patience itself into a witness against rebellion."
  ],
  "2:22": [
    "The threatened judgment exposes the seriousness of spiritual adultery. Those who share her compromise are called to repent of her deeds before they share her consequences.",
    "The imagery is severe because the danger is severe: a church's worship and witness are being drawn into unfaithfulness under religious language.",
    "The pastoral aim is rescue. Christ warns the deceived so that they may separate from the sin before judgment falls. The severity of the language should make teachers cautious about using spiritual influence to excuse what Christ calls His servants to forsake."
  ],
  "2:23": [
    "Christ declares that all the churches will know He searches the reins and hearts. The judgment of Thyatira becomes instruction for the wider church: hidden motives and tolerated sins are open before Him.",
    "The phrase about giving to each according to works does not make works a rival savior. In Revelation, works reveal allegiance. They show whether faith is living, compromised, or rebellious.",
    "The verse calls for inward honesty. Christ searches not to embarrass His people, but to bring truth into the open and heal what deception has protected."
  ],
  "2:24": [
    "Christ turns tenderly to the rest in Thyatira who have not accepted this doctrine or known the so-called depths of Satan. He distinguishes the faithful from the corrupting influence around them.",
    "The phrase 'depths of Satan' likely answers a claim to deeper spiritual insight. Revelation unmasks such depth as deception when it loosens loyalty to Christ and holiness.",
    "The verse comforts believers who have resisted compromise: Christ does not place unnecessary burdens on them, but calls them to hold fast."
  ],
  "2:25": [
    "The faithful are told to hold fast what they already have until Christ comes. Sometimes the call of discipleship is not novelty but perseverance in received truth.",
    "The phrase 'till I come' places the churches under the horizon of the Second Coming. Their present endurance matters because Christ's return will vindicate faithful allegiance.",
    "The verse encourages quiet steadfastness: do not surrender the light already given while waiting for the Lord who is coming."
  ],
  "2:26": [
    "The overcomer is described as one who keeps Christ's works unto the end. Revelation joins endurance, obedience, and participation in Christ's victory.",
    "Authority over the nations is not worldly domination granted to the ambitious; it is shared reign with Christ after faithfulness in weakness.",
    "The verse reframes power. Those who refuse corrupt power now will share righteous authority with Christ later. The promise is especially meaningful in Thyatira, where compromise promised influence in the present but Christ promised true authority in the kingdom."
  ],
  "2:27": [
    "The rod of iron echoes Psalm 2 and messianic rule. The promise means the faithful participate in the victory of Christ over rebellious nations.",
    "The broken vessels image should not be sensationalized. It communicates decisive judgment against resistance to God's kingdom and the final triumph of Christ's authority.",
    "The verse assures suffering believers that history will not remain in the hands of oppressive powers. Christ's rule will finally answer the nations that resist God, and the overcomers will stand on the side of His righteous government rather than the systems that once pressured them."
  ],
  "2:28": [
    "The promise of the morning star gives the overcomer Christ Himself and the hope of His approaching day. Revelation later identifies Jesus as the bright and morning star.",
    "This promise answers the darkness around Thyatira. Those who resist false light and seductive teaching receive the true light that announces the end of night.",
    "The verse turns perseverance into hope: Christ is not only the reward-giver; He is the reward. In a letter darkened by false prophecy and moral compromise, the morning star promises a dawn secured by Jesus and shared with those who hold fast to Him."
  ],
  "2:29": [
    "The repeated appeal to hear the Spirit keeps the message from remaining ancient correspondence. Every church must listen to what Christ says through the Spirit.",
    "The plural 'churches' matters. Ephesus, Smyrna, Pergamos, and Thyatira each receive a local message, but all are meant to learn from all.",
    "The verse calls the reader to humble hearing before moving on to the next vision. The command also keeps the interpreter from treating any one church as merely someone else's problem; every message searches the whole church."
  ],
  "3:1": [
    "Sardis is addressed by Christ as the One who has the seven Spirits of God and the seven stars. The church with a reputation for life needs the fullness of the Spirit and the authority of Christ.",
    "The diagnosis is devastating: 'thou hast a name that thou livest, and art dead.' Reputation can outlive reality. A church may be known for past vitality while its present spiritual life is fading.",
    "The verse warns against relying on institutional memory, public image, or doctrinal heritage without living communion with Christ."
  ],
  "3:2": [
    "Christ commands Sardis to be watchful and strengthen what remains. The church is not told that everything is lost; there are still embers of life that can be guarded before they die.",
    "The unfinished works expose a gap between appearance and obedience. In God's sight, activity is not complete merely because it is visible or respected by others.",
    "The verse is a call to urgent spiritual attentiveness. Decline can be reversed when Christ's warning is taken seriously."
  ],
  "3:3": [
    "Sardis must remember what it has received and heard, hold fast, and repent. Renewal begins by returning to the truth already given rather than inventing a new identity.",
    "The thief imagery warns that Christ's coming will be unwelcome and surprising to a sleeping church. Watchfulness is therefore a spiritual discipline, not a timetable calculation.",
    "The verse asks believers to wake up before crisis reveals that they were living on a name rather than on Christ."
  ],
  "3:4": [
    "Even in Sardis there are a few names who have not defiled their garments. Christ sees faithful individuals in a declining community and does not erase their loyalty.",
    "White garments symbolize purity, victory, and fitness to walk with Christ. The promise is not earned self-righteousness but the vindication of those who remain loyal to Him.",
    "The verse encourages faithful minorities: Christ knows their names even when the surrounding church is spiritually asleep."
  ],
  "3:5": [
    "The overcomer will be clothed in white raiment, and Christ will not blot out his name from the book of life. The promise combines purity, security, and public acknowledgment before heaven.",
    "Book-of-life language gives the warning seriousness without removing assurance from those who abide in Christ. The issue is living faith that overcomes, not anxious record keeping apart from the Savior.",
    "The verse invites believers to seek Christ's approval above reputation before people."
  ],
  "3:7": [
    "Philadelphia is addressed by the One who is holy and true, who has the key of David. The language evokes royal authority: Christ opens and shuts with a sovereignty no human power can overturn.",
    "This is a fitting word for a small but faithful church. Their security does not rest in social strength but in the Messiah who controls access, mission, and vindication.",
    "The verse teaches that faithful witness depends on doors Christ opens, not on doors opponents try to close."
  ],
  "3:8": [
    "Christ sets before Philadelphia an open door that no one can shut. Their strength is small, but their fidelity is real: they have kept His word and not denied His name.",
    "The open door may include access to Christ, opportunity for witness, and vindication before opponents. Adventist readers have often heard mission significance here, especially when connected with the movement from Philadelphia toward Laodicea.",
    "The verse encourages churches that feel weak. Small strength is not failure when Christ opens the way and His word is kept."
  ],
  "3:9": [
    "Christ promises to vindicate Philadelphia before those called the synagogue of Satan. As with Smyrna, the phrase should be read as a description of hostile opposition to Christ's people, not as permission for anti-Jewish contempt.",
    "The astonishing point is that opponents will know Christ has loved this faithful church. Vindication is relational before it is reputational: Jesus openly owns His people.",
    "The verse comforts believers who are misjudged. Christ can make the truth of His love visible in His own time."
  ],
  "3:10": [
    "Philadelphia has kept the word of Christ's patience, and Christ promises to keep them in the hour of temptation. Their endurance is answered by His preserving care.",
    "The hour that comes upon the world is larger than a local difficulty, but the promise is not escapist curiosity. It assures the faithful that Christ knows how to preserve His people through testing.",
    "The verse calls for patient obedience now because future trial is met by the same Lord who keeps His word."
  ],
  "3:11": [
    "Christ says, 'Behold, I come quickly.' The nearness of His coming is meant to strengthen faithfulness, not feed date-setting.",
    "Philadelphia must hold fast so that no one takes its crown. The crown is not stolen by force from Christ's hand; it is lost when faithfulness is surrendered.",
    "The verse teaches watchful perseverance: keep what Christ has given until He comes. The crown language gives urgency to ordinary faithfulness, because what is surrendered through neglect can be more dangerous than what is taken by persecution."
  ],
  "3:12": [
    "The overcomer becomes a pillar in the temple of God. The promise answers instability with permanence: the faithful are given secure belonging in God's presence.",
    "The names written upon the overcomer show identity and ownership: God's name, the name of the New Jerusalem, and Christ's new name. The believer's future is defined by God rather than by hostile society.",
    "The verse gives Philadelphia a beautiful assurance: the weak church that kept Christ's word will be made permanently at home with God."
  ],
  "3:14": [
    "Laodicea is addressed by Christ as the Amen, the faithful and true Witness, and the beginning of the creation of God. The self-deceived church needs the testimony of One who is utterly reliable.",
    "The title 'faithful and true Witness' is crucial because Laodicea's own testimony about itself is false. Christ's witness will expose the difference between perceived prosperity and actual spiritual need.",
    "The verse prepares the reader to receive rebuke as grace. Only the truthful Christ can heal a church deceived by comfort."
  ],
  "3:15": [
    "Christ knows Laodicea's works and declares the church neither cold nor hot. The image points to uselessness and spiritual complacency rather than honest weakness seeking help.",
    "Laodicea's danger is not open hostility but self-satisfied mediocrity. It has enough religion to feel secure, but not enough dependence to be healed.",
    "The verse asks whether our faith refreshes, heals, and serves, or whether it merely maintains a respectable temperature. Laodicea's problem is not lack of religious language but lack of spiritual usefulness before Christ."
  ],
  "3:16": [
    "Because Laodicea is lukewarm, Christ says He will spue it out of His mouth. The language is intentionally unpleasant because complacent religion is spiritually nauseating to Christ.",
    "The rebuke should not be softened into mere personality critique. Lukewarmness is the condition of a church that has lost its sense of need while still claiming to belong to Christ.",
    "The verse is severe mercy. Christ shocks Laodicea awake so that the church will seek the healing it does not know it needs."
  ],
  "3:17": [
    "Laodicea says, 'I am rich, and increased with goods, and have need of nothing.' Christ answers that it is wretched, miserable, poor, blind, and naked. The contrast is the heart of the message.",
    "The city's wealth, banking, textiles, and eye-salve background make the rebuke especially pointed. Christ uses Laodicea's own symbols of success to expose its spiritual bankruptcy.",
    "The verse is a mirror for end-time self-sufficiency. The most dangerous poverty is the poverty that congratulates itself as wealth."
  ],
  "3:18": [
    "Christ counsels Laodicea to buy from Him gold tried in the fire, white raiment, and eyesalve. The remedy is not self-improvement but receiving from Christ what the church lacks.",
    "The gold points to genuine faith and love refined by trial, the white raiment to Christ-given righteousness and purity, and the eyesalve to spiritual discernment. Each gift answers Laodicea's false claims of wealth, clothing, and sight.",
    "The verse turns rebuke into invitation. Christ does not merely diagnose the church; He offers exactly what can heal it."
  ],
  "3:19": [
    "Christ rebukes and chastens those He loves. Laodicea's sharpest message is therefore not rejection but love acting truthfully.",
    "The command is to be zealous and repent. Lukewarmness is not cured by mild regret; it requires awakened desire and decisive turning toward Christ.",
    "The verse teaches that discipline is grace when it comes from the faithful and true Witness. Christ wounds Laodicea's pride in order to heal its fellowship, which means the rebuke should be heard as love before it is heard as threat."
  ],
  "3:20": [
    "Christ stands at the door and knocks. In context, the verse is first addressed to a self-sufficient church that has left Him outside while maintaining religious confidence.",
    "The promise is deeply personal: if anyone hears His voice and opens the door, He will come in and sup with that person. Fellowship with Christ is the remedy for Laodicea's poverty and blindness.",
    "The verse is rightly used devotionally, but its church context should not be lost. Jesus is not merely seeking a moment of feeling; He is asking to be welcomed back into the center of His people's life."
  ],
  "3:21": [
    "The final promise is astonishing: the overcomer will sit with Christ in His throne, as Christ overcame and sat with His Father. Laodicea is offered the highest promise after receiving the sharpest rebuke.",
    "Christ's victory becomes the pattern and ground of the believer's victory. Overcoming is not self-generated triumph; it is sharing in the faithfulness of the One who overcame first.",
    "The verse gives hope to the lukewarm. Even the poorest church can be restored to royal fellowship if it receives Christ's counsel."
  ],
  "3:22": [
    "The letters close with the familiar appeal: hear what the Spirit says to the churches. The repetition is deliberate because the danger is not lack of information but refusal to listen.",
    "By the end of the seven messages, every church has been searched by Christ: loveless orthodoxy, suffering faithfulness, compromise, corruption, dead reputation, patient endurance, and lukewarm self-sufficiency.",
    "The verse sends the reader back through all seven messages with one question: what is the Spirit asking Christ's church to hear now?"
  ]
};

function noteFor(chapter, verseNumber) {
  const key = `${chapter}:${verseNumber}`;
  return humanVerseNotes[key] ?? sevenChurchVerseNotes[key];
}

function livingCreatureContext(chapter, text) {
  return [4, 5, 6, 7, 14].includes(chapter) && /(four beasts|first beast|second beast|third beast|fourth beast)/i.test(text);
}

function sevenSealContext(chapter, text) {
  return [5, 6, 8].includes(chapter) && /\b(seal|seals|sealed)\b/i.test(text) && !/servants|forehead|foreheads|sealed the servants|seal of god/i.test(text);
}

function signalFor(text, chapter) {
  const lower = text.toLowerCase();
  if (/revelation of jesus christ|faithful witness|son of man|alpha and omega|lamb/.test(lower)) return "christ";
  if (/blessed|hear|keep|repent|overcom/.test(lower)) return "response";
  if (/throne|temple|altar|incense|ark|worship|holy, holy, holy|worthy/.test(lower)) return "worship";
  if (livingCreatureContext(chapter, text)) return "worship";
  if (/\bbeast\b|dragon|mark|image|babylon|harlot/.test(lower)) return "conflict";
  if (sevenSealContext(chapter, text)) return "judgment";
  if (/testimony|witness|prophecy|book|scroll|little book/.test(lower)) return "testimony";
  if (/seal|sealed|144/.test(lower)) return "sealing";
  if (/trumpet|plague|vial|bowl|wrath/.test(lower)) return "judgment";
  if (/new heaven|new earth|new jerusalem|tree of life|river of life|no more death/.test(lower)) return "restoration";
  if (/cloud|king of kings|come quickly/.test(lower) || (chapter === 19 && /white horse/.test(lower))) return "coming";
  return "faithfulness";
}

function focusPhrase(text) {
  const clean = text.replace(/\s+/g, " ").trim();
  const meaningfulPatterns = [
    /deeds of the Nicolaitanes/i,
    /doctrine of the Nicolaitanes/i,
    /doctrine of Balaam/i,
    /that woman Jezebel/i,
    /synagogue of Satan/i,
    /left thy first love/i,
    /be thou faithful unto death/i,
    /where Satan'?s seat is/i,
    /hidden manna/i,
    /white stone/i,
    /morning star/i,
    /key of David/i,
    /open door/i,
    /lukewarm/i,
    /gold tried in the fire/i,
    /white raiment/i,
    /eyesalve/i,
    /I stand at the door/i
  ];
  for (const pattern of meaningfulPatterns) {
    const match = clean.match(pattern);
    if (match) return match[0];
  }
  const theseThings = clean.match(/These things saith\s+([^.;:]+)/i);
  if (theseThings?.[1]) return `These things saith ${theseThings[1].trim()}`;
  const firstSentence = clean.split(/[.;:]/)[0] || clean;
  const clause = firstSentence
    .split(",")
    .map((part) => part.trim())
    .filter((part) => !/^(and|but)?\s*(this thou hast|i have a few things against thee|nevertheless i have somewhat against thee|unto you i say|to the angel|unto the angel)$/i.test(part))
    .find((part) => part.split(/\s+/).length >= 4) || firstSentence;
  const words = clause.split(/\s+/);
  const phrase = words.length > 14 ? `${words.slice(0, 14).join(" ")}...` : clause;
  return phrase.replace(/^And\s+/i, "").replace(/^But\s+/i, "");
}

function openingFor(chapter, verseNumber, verseText) {
  const lower = verseText.toLowerCase();
  if (chapter <= 3 && /i know thy works/.test(lower)) {
    return "Christ's knowledge of the church is intimate and morally searching. He sees not only public activity but love, endurance, compromise, weakness, and hidden faithfulness.";
  }
  if (chapter <= 3 && /he that hath an ear/.test(lower)) {
    return "The message ends by widening the appeal beyond one local church. Whoever has an ear is invited to hear what the Spirit says to all the churches.";
  }
  if (chapter <= 3 && /to him that overcometh|he that overcometh/.test(lower)) {
    return "The promise to the overcomer lifts the church's struggle into the horizon of Christ's victory. Faithfulness now is joined to the final inheritance of the redeemed.";
  }
  if (/repent/.test(lower)) {
    return "The call to repent is an act of mercy. Christ exposes sin so that His people may return to life, not so that they may sink into despair.";
  }
  if (/lamb/.test(lower)) {
    return "The Lamb stands at the center of the vision. Revelation defines victory through sacrifice, purity, and redeemed worship rather than through the methods of earthly power.";
  }
  if (/throne/.test(lower)) {
    return "The throne anchors the scene in divine sovereignty. Whatever turmoil appears on earth must be interpreted from the place where God reigns.";
  }
  if (/book|scroll|little book/.test(lower)) {
    return "The book imagery points to God's revealed purpose. What is sealed, opened, eaten, or proclaimed is never mere information; it becomes a summons to prophetic responsibility.";
  }
  if (sevenSealContext(chapter, verseText)) {
    return "The seals unfold the Lamb's authority over history. Each opening discloses realities of conquest, suffering, witness, judgment, and the need to stand before God.";
  }
  if (/seal|sealed/.test(lower)) {
    return "Sealing language speaks of ownership, loyalty, and divine preservation. God knows His people before the pressure of the final conflict is fully revealed.";
  }
  if (/trumpet/.test(lower)) {
    return "The trumpet imagery gives the passage the sound of warning. In Scripture, trumpets summon attention before God and announce that history is accountable to Him.";
  }
  if (livingCreatureContext(chapter, verseText)) {
    return "The living creatures are part of Revelation's throne-room worship. Their presence surrounds God's sovereignty with ceaseless praise rather than hostile power.";
  }
  if (/\bbeast\b/.test(lower)) {
    return "Beast imagery draws Revelation into Daniel's prophetic world. It portrays power that becomes predatory when it seeks authority apart from God.";
  }
  if (/dragon/.test(lower)) {
    return "The dragon reveals the personal and cosmic depth of the conflict. Behind earthly opposition stands the old enemy who resists Christ and His people.";
  }
  if (/babylon/.test(lower)) {
    return "Babylon is more than a place-name in Revelation. It is the symbol of religious confusion, seduction, pride, and organized resistance to the worship of God.";
  }
  if (/mark/.test(lower)) {
    return "The mark is part of Revelation's final conflict over worship and allegiance. The issue is not a superficial sign but a settled loyalty expressed in mind and life.";
  }
  if (/new heaven|new earth|new jerusalem/.test(lower)) {
    return "The vision turns from conflict to restoration. God's purpose is not escape from creation, but the renewal of creation under His immediate presence.";
  }
  if (/tree of life|river of life/.test(lower)) {
    return "Eden returns at the end of the story. What sin fractured, God restores in the city where life flows from His throne.";
  }
  if (/come quickly|come, lord jesus/.test(lower)) {
    return "The closing promise turns prophecy into prayer. The church that has seen the Lamb, the conflict, and the new creation answers with longing for Christ's appearing.";
  }
  const phrase = focusPhrase(verseText);
  const variants = [
    `The wording centers on "${phrase}," which gives this part of the vision its immediate theological weight.`,
    `"${phrase}" is the detail that carries the verse. It should be interpreted within the chapter's movement before being applied more broadly.`,
    `The verse concentrates attention on "${phrase}." Revelation often works this way, making a brief image or command carry a large spiritual burden.`,
    `"${phrase}" brings the reader into the heart of the scene, where worship, allegiance, judgment, or hope are being clarified.`
  ];
  return variants[(chapter + verseNumber) % variants.length];
}

function conciseDetail(rawDetail, opening) {
  if (rawDetail.includes("A close reading should") || rawDetail.includes("direct pastoral address")) return "";
  const sentences = rawDetail.match(/[^.!?]+[.!?]/g) ?? [rawDetail];
  const redundant = [
    [/lamb/i, /lamb image/i],
    [/throne/i, /throne language/i],
    [/beast/i, /beast imagery/i],
    [/dragon/i, /dragon/i],
    [/babylon/i, /babylon symbolizes/i],
    [/book imagery|book|scroll/i, /book and scroll|books language/i],
    [/seal/i, /sealing language/i],
    [/mark/i, /mark is part/i],
    [/trumpet/i, /trumpets warn/i],
    [/new heaven|new earth|new jerusalem/i, /new creation|new jerusalem imagery/i],
    [/river|tree/i, /river and tree/i],
    [/living creatures/i, /living creatures are part/i],
    [/seals unfold/i, /seals are opened/i]
  ];
  const filtered = sentences.filter((sentence) => {
    return !redundant.some(([openPattern, detailPattern]) => openPattern.test(opening) && detailPattern.test(sentence));
  });
  return filtered.slice(0, 1).join(" ").trim();
}

function theologyFor(signal, chapter, verseText) {
  const lower = verseText.toLowerCase();
  const lines = {
    christ: "Christ is not an ornament added to prophecy; He is its interpretive center. His person and work give the symbols their pastoral gravity and keep the reader from studying events apart from the Lord who governs them.",
    testimony: "Revelation treats divine speech as witness. God speaks so that His people may see truthfully, bear testimony faithfully, and resist every account of history that leaves Christ out.",
    response: "Hearing and obedience belong together in this book. Revelation does not separate doctrine from discipleship; truth is given so that the church may keep faith under pressure.",
    worship: "Worship is the deep question beneath the visions. Sanctuary and throne imagery teach that allegiance, prayer, holiness, and judgment are gathered before God rather than before earthly power.",
    conflict: "The imagery exposes the great controversy in public form. Powers become beastly or Babylonian when they demand the trust, obedience, or worship that should be given to God alone.",
    sealing: "God marks His people before the crisis overwhelms them. The seal points to divine ownership and covenant loyalty, realities stronger than visible security.",
    judgment: "Judgment in Revelation is not arbitrary violence. It is God's answer to rebellion, oppression, false worship, and the prayers of the faithful.",
    restoration: "Restoration is the goal toward which Revelation moves. The visions press beyond conflict toward God's dwelling with His people and the end of everything that wounds creation.",
    coming: "The return of Christ gives history its horizon. The church waits not for an idea, but for the personal, visible triumph of the Lord.",
    faithfulness: "Even when the imagery is difficult, the aim is pastoral: God forms readers who can recognize His voice, refuse false worship, and endure because the Lamb is trustworthy."
  };
  const adventistLine = timelineHeavy.has(chapter) || /\bbeast\b|mark|babylon|judgment|commandments|faith of jesus|thousand years|little book|1260/.test(lower)
    ? " Adventist historicist interpretation keeps the prophetic sequence within the larger movement of Daniel and Revelation, where chronology serves the gospel, Christ's heavenly ministry, judgment, and the final call to worship the Creator."
    : "";
  return `${lines[signal]}${adventistLine}`;
}

function technicalFor(signal, verseText, chapter) {
  const lower = verseText.toLowerCase();
  if (/son of man/.test(lower)) return "The Son of man language draws the reader back to Daniel's vision of heavenly authority, but Revelation places that authority in the risen Christ who walks among the churches.";
  if (/seven spirits/.test(lower)) return "The phrase \"seven Spirits\" uses Revelation's symbolic fullness language for the divine presence before the throne, and should be read with the book's worship and sanctuary scenes in view.";
  if (/lord'?s day/.test(lower)) return "The phrase \"Lord's day\" should be handled carefully, with attention to biblical Sabbath language, John's Jewish scriptural world, and later Christian usage.";
  if (/lampstands?/.test(lower)) return "Because Revelation itself identifies the lampstands as the churches, the symbol should be interpreted first from the chapter's own explanation.";
  if (/stars?/.test(lower)) return "The stars are also explained inside the vision, which keeps interpretation disciplined rather than imaginative.";
  if (/lamb/.test(lower)) return "The Lamb imagery carries sacrificial, royal, and worship language at once; Revelation's conquest is shaped by the cross before it is displayed in judgment.";
  if (/book|scroll|little book/.test(lower)) return "Book and scroll imagery in Revelation joins disclosure with commission: what God opens is meant to be received, proclaimed, and obeyed.";
  if (/throne|temple|altar|incense|ark/.test(lower)) return "The sanctuary and throne language should be read as theology in symbolic form, joining worship, intercession, judgment, and divine rule.";
  if (sevenSealContext(chapter, verseText)) return "The seven seals are a disclosure sequence opened by the Lamb; they should not be confused with the sealing of God's servants in Revelation 7.";
  if (/horse/.test(lower)) return "The horse imagery works as apocalyptic symbolism for forces moving through history; the immediate sequence must guide any historical application.";
  if (/144,?000/.test(lower)) return "The 144,000 should be handled with care, keeping the emphasis on God's faithful people, sealing, worship, and endurance where interpreters differ over details.";
  if (/trumpet/.test(lower)) return "Trumpets in Scripture warn, summon, and announce divine action; in Revelation they should be read as mercy-laden alarms before final judgment.";
  if (/abyss|bottomless/.test(lower)) return "Abyss language signals chaos, restraint, and demonic opposition in apocalyptic terms rather than a merely geographical location.";
  if (/two witnesses/.test(lower)) return "The two witnesses draw on biblical patterns of lawful testimony and prophetic witness before any historicist application is made.";
  if (/woman/.test(lower)) return "Woman imagery must be controlled by context: Revelation can use it for God's covenant people or for corrupt religious power.";
  if (/dragon/.test(lower)) return "The dragon is explicitly identified by Revelation, which lets the reader see the satanic agency behind historical hostility.";
  if (livingCreatureContext(chapter, verseText)) return "KJV \"beasts\" in the throne-room scenes refers to living creatures, not to the hostile beast powers of Revelation 13 and 17.";
  if (/\bbeast\b/.test(lower)) return "Beast imagery comes through Daniel and portrays power that becomes predatory when it claims authority against God.";
  if (/mark/.test(lower)) return "The mark is best read in relation to worship, allegiance, action, and conviction, not as an isolated or sensational sign.";
  if (/six hundred threescore and six|666/.test(lower)) return "The number calls for wisdom, which means careful interpretation tied to the chapter's worship conflict rather than detached calculation.";
  if (/babylon/.test(lower)) return "Babylon gathers Old Testament memories of arrogance, idolatry, empire, and confusion into one end-time symbol.";
  if (/commandments of god|faith of jesus/.test(lower)) return "The phrase joins obedience and faith rather than setting them against each other.";
  if (/plagues?|vials?|bowls?/.test(lower)) return "The plague imagery echoes Exodus while pointing toward final judgment after mercy has been resisted.";
  if (/armageddon/.test(lower)) return "Armageddon should be framed first around worship, deception, and allegiance before making claims about geography or politics.";
  if (/white horse/.test(lower)) return "The white horse scene gathers royal, judicial, and messianic imagery around Christ's visible victory.";
  if (/thousand years|millennium/.test(lower)) return "The thousand years should be read with the two resurrections, judgment, and final eradication of sin in view.";
  if (/books?|book of life/.test(lower)) return "Books language emphasizes accountability, memory, vindication, and the transparency of God's judgment.";
  if (/lake of fire|second death/.test(lower)) return "The second death marks the final end of sin and should be taught as God's just conclusion to evil, not as sensational torment.";
  if (/new heaven|new earth|new jerusalem/.test(lower)) return "The new-creation imagery combines Eden, city, temple, and covenant themes to show God dwelling securely with His people.";
  if (/river of life|tree of life/.test(lower)) return "River and tree imagery returns the reader to Eden, now restored and secured by God's throne.";
  if (signal === "testimony") return "Revelation's mixed form matters here: apocalypse, prophecy, and pastoral letter work together.";
  if (signal === "response") return "The command or promise has to be kept inside the paragraph's pastoral movement; Revelation presses truth toward concrete faithfulness.";
  if (signal === "judgment") return "The judgment language draws on Old Testament prophetic patterns where divine warning exposes evil before final action falls.";
  if (signal === "restoration") return "The restoration language gathers long biblical hopes into Revelation's final vision of God's presence.";
  return "";
}

function coverageFor(chapter, verseNumber) {
  const markers = markerCandidates(chapter, verseNumber);
  const matches = sourceRecords
    .map((source) => ({ source, score: sourceScore(source, markers, "all") }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ source }) => source);
  const themeCounts = new Map();
  for (const source of matches.slice(0, 24)) {
    for (const theme of source.themes ?? []) {
      themeCounts.set(theme, (themeCounts.get(theme) ?? 0) + 1);
    }
  }
  const themes = [...themeCounts.entries()].sort((a, b) => b[1] - a[1]).map(([theme]) => theme);
  return {
    total: matches.length,
    adventist: matches.filter((source) => source.tradition === "Adventist").length,
    academic: matches.filter((source) => /academic|exegetical|canonical|historical/i.test(source.interpretiveCategory ?? "")).length,
    pastoral: matches.filter((source) => /pastoral|devotional|sermon|teaching/i.test(`${source.interpretiveCategory ?? ""} ${source.type ?? ""}`)).length,
    comparison: matches.filter((source) => source.tradition !== "Adventist").length,
    themes,
  };
}

function sourceShapedInsight(chapter, verseNumber, verseText, signal, coverage) {
  const lower = verseText.toLowerCase();
  const insights = [];
  if (coverage.academic > 0 && chapter <= 3) {
    insights.push("Historically, the explanation should stay close to the lived situation of the churches in Asia Minor: real congregations were learning how to remain loyal to Christ amid civic pressure, social cost, and religious compromise.");
  }
  if (coverage.academic > 0 && [4, 5].includes(chapter)) {
    insights.push("The throne-room setting is not decorative background; it teaches readers to interpret earthly crisis from heavenly worship, where creation, redemption, prayer, and authority are gathered before God.");
  }
  if (/temple|altar|incense|ark|priest|robe|girdle/.test(lower) || (coverage.themes.includes("sanctuary") && [1, 4, 5, 8, 11, 14, 15, 16].includes(chapter))) {
    insights.push("The sanctuary thread matters because Revelation does not separate prophecy from Christ's ministry: worship, intercession, judgment, and access to God belong together.");
  }
  if ((/\bbeast\b/i.test(lower) && !livingCreatureContext(chapter, verseText)) || /horn|time, times|little book|son of man|cloud|1260|forty and two months|thousand two hundred/i.test(lower)) {
    insights.push("Daniel supplies much of the symbolic grammar here, so the image should be read canonically before it is pressed into a modern headline.");
  }
  if (coverage.themes.includes("history") && chapter > 3) {
    const historyLines = [
      "The first readers would not have heard these images as detached puzzles; they spoke into a world of empire, social pressure, public worship, and costly witness.",
      "The historical setting gives the symbols moral texture: Revelation addresses believers whose ordinary lives were being asked to bow before powers that were not God.",
      "The Roman world remains part of the passage's atmosphere, but the vision reaches beyond the first century by exposing patterns of worship, coercion, and faithfulness."
    ];
    insights.push(historyLines[(chapter + verseNumber) % historyLines.length]);
  }
  if (coverage.themes.includes("worship") || /worship|worthy|creator|commandments|faith of jesus/.test(lower)) {
    insights.push("The central issue is worship understood as allegiance, not merely religious emotion; Revelation asks whom the heart, mind, and life finally trust.");
  }
  if (/dragon|satan|devil|war|accuser/.test(lower) || (coverage.themes.includes("great-controversy") && [12, 13, 14, 17, 18].includes(chapter))) {
    insights.push("The great controversy theme keeps the conflict from becoming merely political: visible powers matter, but the deeper struggle concerns God's character, Christ's victory, and the loyalty of His people.");
  }
  if (coverage.themes.includes("application") || /repent|overcom|keep|patience|faithful|blessed/.test(lower)) {
    insights.push("The practical force of the verse is discipleship. Revelation gives truth in order to form a people who can repent, worship, endure, and witness without losing hope.");
  }
  if (coverage.comparison > 0 && [8, 9, 11, 13, 17].includes(chapter)) {
    insights.push("Because interpreters differ on some details in this passage, the safest teaching posture is firm on the chapter's theological burden and careful with disputed identifications.");
  }
  if (signal === "restoration") {
    insights.push("The final vision is concrete hope: God does not abandon creation but heals it, dwells with His people, and removes the conditions that made grief seem permanent.");
  }
  return [...new Set(insights)].slice(0, 2).join(" ");
}

function pastoralFor(signal, chapter, verseNumber = 0) {
  const faithfulnessLines = [
    "The response is patient faithfulness: to keep worshiping, discerning, and obeying when the easier path is compromise.",
    "The verse calls for steady trust rather than anxiety, because the Lamb is faithful before His people are asked to be faithful.",
    "The practical summons is sober and hopeful: receive the vision as light for obedience, not fuel for fear."
  ];
  const lines = {
    christ: "The reader is asked to look at Christ before looking at crisis.",
    testimony: "The church is called to become a trustworthy witness rather than a fearful interpreter of events.",
    response: "The appeal presses toward concrete obedience, not admiration from a distance.",
    worship: "The summons is to worship steadily because heaven's throne is more real than earthly pressure.",
    conflict: "The verse teaches discernment without panic and conviction without cruelty.",
    sealing: "The comfort is that God knows and claims His own before crisis has the last word.",
    judgment: "The warning is merciful, calling the reader to turn toward God before judgment becomes final.",
    restoration: "Hope receives a definite shape: God will dwell with His people and make all things new.",
    coming: "Expectation becomes readiness, courage, and prayer.",
    faithfulness: faithfulnessLines[(chapter + verseNumber) % faithfulnessLines.length]
  };
  const missionLine = [10, 11, 12, 13, 14, 18].includes(chapter)
    ? " The message should be carried with humility, because Revelation's warnings are given to save, not to sensationalize."
    : "";
  return `${lines[signal]}${missionLine}`;
}

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function mcnultyHasSupport(chapter, verseNumber) {
  const record = sourceIndex.sources?.[sourceIds.mcnulty];
  if (!record) return false;
  const markers = markerCandidates(chapter, verseNumber);
  return usableHits(record).some((hit) => markerScore(hit, markers) > 25);
}

function keyTermsForVerse(verseText) {
  const lower = verseText.toLowerCase();
  const terms = [
    ["nicolaitanes", "Nicolaitanes"],
    ["balaam", "Balaam"],
    ["jezebel", "Jezebel"],
    ["synagogue of satan", "synagogue of Satan"],
    ["hidden manna", "hidden manna"],
    ["white stone", "white stone"],
    ["morning star", "morning star"],
    ["lukewarm", "lukewarm"],
    ["gold tried in the fire", "gold tried in the fire"],
    ["white raiment", "white raiment"],
    ["eyesalve", "eyesalve"],
    ["beast", "beast"],
    ["mark", "mark"],
    ["babylon", "Babylon"],
    ["trumpet", "trumpet"],
    ["seal", "seal"],
    ["lamb", "Lamb"],
    ["throne", "throne"],
    ["temple", "temple"],
    ["altar", "altar"],
    ["incense", "incense"],
    ["dragon", "dragon"],
    ["two witnesses", "two witnesses"],
    ["144,000", "144,000"],
    ["seven spirits", "seven Spirits"],
    ["new jerusalem", "New Jerusalem"],
    ["new heaven", "new heaven"],
    ["new earth", "new earth"],
    ["tree of life", "tree of life"],
    ["river of life", "river of life"],
    ["book of life", "book of life"],
    ["thousand years", "thousand years"],
    ["second death", "second death"],
    ["lake of fire", "lake of fire"],
    ["come out of her", "come out of her"],
    ["hour of his judgment", "hour of His judgment"],
    ["everlasting gospel", "everlasting gospel"],
    ["commandments of god", "commandments of God"],
    ["faith of jesus", "faith of Jesus"]
  ];
  return terms.filter(([needle]) => lower.includes(needle)).map(([, label]) => label);
}

function oldTestamentParagraph(chapter, verseNumber, verseText, signal) {
  const lower = verseText.toLowerCase();
  if (/son of man|cloud/.test(lower)) return "The Daniel connection is especially important here. Daniel's Son of Man imagery joins heavenly authority, judgment, and kingdom inheritance, and Revelation applies that world of meaning to Christ and His people. The reader should therefore hear the verse as more than isolated apocalyptic color. It stands within the larger biblical story in which God judges arrogant powers, vindicates the faithful, and gives the kingdom to the Son of Man and to the saints who are His.";
  if (/\bbeast\b|horn|forty and two months|time, times|1260|thousand two hundred/.test(lower)) return "Daniel supplies much of the symbolic grammar. Beast, horn, blasphemy, time period, judgment, and worship-conflict themes should be read through Daniel before they are attached to modern applications. Adventist interpretation is strongest when it keeps this canonical order: Daniel establishes the pattern of kingdoms and judgment, Revelation carries that pattern into the final controversy over worship, and Christ remains the center rather than the prophetic opponent.";
  if (/temple|altar|incense|ark|priest|robe|girdle|vial|plague/.test(lower)) return "The sanctuary background gives the verse theological depth. Revelation repeatedly places worship, prayer, judgment, intercession, and final decision in relation to heavenly temple imagery. That means prophecy is not simply a map of external events. It is a disclosure of Christ's ministry, God's government, and the way heaven responds to prayer, rebellion, repentance, and covenant loyalty.";
  if (/babylon|euphrates|wine|fornication|harlot|whore/.test(lower)) return "The Old Testament background of Babylon should control the symbol. Babylon evokes pride, idolatry, imperial arrogance, confusion, oppression, and resistance to the true worship of God. Revelation gathers those memories into a final symbol of corrupted religion and worldly power. The result should be moral clarity without contempt for persons, because the same book that exposes Babylon also calls God's people out of it.";
  if (/tree of life|river of life|new heaven|new earth|new jerusalem|no more death/.test(lower)) return "The closing vision reaches back to Genesis and forward through the prophets. Eden's lost life, Israel's hope of restoration, Ezekiel's temple river, and Isaiah's new creation all converge in Revelation's final chapters. The end of the book is therefore not an escape from the biblical story but its healing: creation restored, covenant fulfilled, death ended, and God dwelling openly with His people.";
  if (/lamb|blood|slain|redeemed/.test(lower)) return "The sacrificial background keeps the verse centered on redemption. Revelation's Lamb imagery does not let victory become mere force. The triumph of God is mediated through the slain and risen Christ, so judgment, worship, mission, and final victory must be interpreted through the cross. This is why the book can be severe without becoming cruel and hopeful without becoming sentimental.";
  if (chapter <= 3) return "The Old Testament background is present even in the letters to the churches. Christ speaks with royal, priestly, covenantal, and prophetic authority; He commends faithfulness, exposes compromise, calls for repentance, and promises inheritance. These messages are therefore not merely moral advice to ancient congregations. They are covenant lawsuits and pastoral appeals from the Lord who walks among the lampstands.";
  if (signal === "worship") return "The biblical background of worship matters. Revelation draws on temple praise, prophetic throne visions, Exodus deliverance, and covenant loyalty. Worship is not reduced to music or religious feeling; it is allegiance before God. This places the passage inside Revelation's repeated question: who is worthy of trust, obedience, reverence, and final loyalty?";
  return "Revelation's larger biblical web matters here. The book constantly echoes Genesis, Exodus, the Psalms, Isaiah, Ezekiel, Daniel, Zechariah, and the teaching of Jesus. Those echoes keep interpretation from becoming arbitrary. They also remind the reader that Revelation is not a strange appendix to Scripture, but the capstone that gathers the Bible's themes of creation, covenant, sanctuary, kingdom, judgment, and restoration.";
}

function adventistLongParagraph(chapter) {
  if (chapter <= 3) return "In Adventist use, the seven churches should be handled on three levels at once. They were real first-century congregations, they speak spiritually to every generation of believers, and they may be used as a broad historicist outline of the Christian church where the application is supported by Adventist sources. That order matters. The original pastoral message should not disappear beneath a period chart, and the historicist application should not become an excuse for judging others while missing Christ's appeal to the present reader.";
  if ([6, 7, 8, 9].includes(chapter)) return "Adventist historicist interpretation has treated the seals and trumpets as part of Revelation's movement through Christian history, warning, judgment, and final preparation. The details require humility because Adventist interpreters have not always expressed every identification in the same way. The controlling emphasis should remain clear: Christ opens history, God hears the prayers of His people, judgments warn before they finalize, and the faithful are called to stand under the Lamb's authority.";
  if ([10, 11].includes(chapter)) return "Adventist interpretation gives this section special weight because it connects Revelation with Daniel, the opened little book, prophetic time, bitter-sweet experience, renewed mission, and faithful witness. These themes should be stated carefully and historically, but not coldly. The point is that God does not merely predict disappointment or conflict; He recommissions His people to prophesy again, uphold Scripture, and bear witness in the world.";
  if ([12, 13, 14].includes(chapter)) return "Adventist interpretation reads this central section as the heart of the great controversy. The woman, dragon, beasts, remnant, commandments of God, faith of Jesus, judgment hour, Creator worship, Babylon, and mark of the beast belong together as a sustained conflict over worship and allegiance. The language should remain sober: prophecy exposes systems and calls consciences, but it must not become sensationalism, contempt, or careless labeling of sincere people before the final issues are fully joined.";
  if ([15, 16].includes(chapter)) return "Adventist final-event interpretation should keep these judgments connected to mercy already resisted, Christ's heavenly ministry, and the final deliverance of God's people. The plagues and Armageddon are not material for fear-driven speculation. They are the solemn answer of God's justice after persistent rebellion and deception. The reader should feel the seriousness of final judgment while also seeing that heaven has warned, invited, interceded, and called before judgment falls.";
  if ([17, 18].includes(chapter)) return "Adventist interpretation treats Babylon as religious confusion and corrupt worship joined to worldly power. That reading should be clear but never cruel. Revelation itself makes room for God's people still inside Babylon, which means the final call is an appeal of mercy. The commentary should distinguish between systems God judges and persons God loves, and it should present separation from Babylon as movement toward Christ, Scripture, true worship, and covenant faithfulness.";
  if ([19, 20].includes(chapter)) return "Adventist eschatology reads this movement as the visible return of Christ, the end of beastly opposition, the millennium, the judgment review, the resurrection sequence, and the final eradication of sin. The sequence matters, but the theology matters even more: God makes His government transparent, honors the faithful, exposes evil, and brings rebellion to an end so the universe is secure in love and justice.";
  if ([21, 22].includes(chapter)) return "Adventist hope is concrete and creational. The goal is not a vague spiritual escape but the renewed earth, the New Jerusalem, the tree and river of life, restored access to God, and the end of curse, death, sorrow, and separation. The prophetic timeline ends in worship and communion, which means even the most difficult warnings in Revelation should be read on the way to God's final restoration.";
  return "Adventist interpretation should keep Christ, sanctuary, worship, judgment, obedience, mission, and hope together. When the verse does not make a specific chronological claim, the commentary should not force one. When it does speak prophetically, the timeline must serve the gospel and the call to faithful worship rather than curiosity.";
}

function longFormCompletionParagraph(chapter, verseNumber, verseText) {
  const subject = focusPhrase(verseText);
  if (chapter <= 3) {
    return `The spiritual diagnosis should also be pressed personally. Christ's words to the churches show that He knows more than public reputation, religious activity, or institutional memory can reveal. In "${subject}" He is training His people to receive both praise and correction from the same loving Lord. The reader should therefore ask what part of the verse exposes neglected love, tolerated compromise, weary endurance, hidden fear, or self-satisfied confidence, and what part opens a path back to repentance, obedience, and fellowship with Christ.`;
  }
  if ([4, 5].includes(chapter)) {
    return `The worship setting keeps the commentary from becoming merely analytical. The reader is meant to stand before the throne, hear heaven's judgment about reality, and see earthly events from above. In that light, "${subject}" is not ornamentation but formation: it teaches reverence, trust, and surrender. The verse calls the church to let worship reorder its imagination before it tries to interpret conflict, because only a people who know who reigns can endure what Revelation later shows.`;
  }
  if ([6, 7, 8, 9, 10, 11].includes(chapter)) {
    return `The pastoral weight of this verse is that history is never outside Christ's concern. Whether the image is seal, trumpet, witness, prayer, or warning, Revelation insists that God sees the suffering of His people and the persistence of human rebellion. The interpreter should explain "${subject}" in a way that strengthens patient faith, not curiosity alone. The point is to help readers discern the seriousness of sin, the mercy of warning, and the reliability of God's final intervention.`;
  }
  if ([12, 13, 14].includes(chapter)) {
    return `The great-controversy setting gives this verse moral urgency. Revelation is not merely naming hostile powers; it is uncovering the rival claims made upon worship, conscience, and daily life. The phrase "${subject}" should therefore be connected to allegiance: who receives trust, whose command governs practice, and whose character is reproduced in the worshiper. The faithful response is neither panic nor pride, but settled loyalty to Christ, courageous obedience, and compassionate witness to others.`;
  }
  if ([15, 16, 17, 18].includes(chapter)) {
    return `Mercy speaks before closure. Revelation's severest scenes come after repeated appeals, intercession, testimony, and warning. In "${subject}" the reader sees that God does not treat evil lightly, yet He also does not judge without first making truth known. That balance matters for preaching and personal devotion: the passage should awaken repentance, expose false security, and deepen confidence that God's final acts are righteous, measured, and aimed at ending deception.`;
  }
  if ([19, 20].includes(chapter)) {
    return `This verse also contributes to Revelation's answer to injustice. The book does not ask believers to pretend that evil is harmless or that suffering has no need of judgment. Instead, "${subject}" is placed in a sequence where Christ returns, deception is exposed, the faithful are vindicated, and rebellion is brought to its end. The reader is called to patience because God will judge openly, and to humility because judgment rests with the One whose victory is righteous and true.`;
  }
  return `The final chapters ask the reader to let hope become concrete. The meaning of "${subject}" reaches beyond private comfort toward restored creation, healed community, and worship without obstruction. This matters pastorally because Revelation's hope is not escape from the world God made, but the renewal of all things under God's presence. That hope leads to endurance in sorrow, holiness in desire, generosity in mission, and longing for the day when the Lamb's victory fills the whole creation.`;
}

function sourceSupportParagraph(chapter, verseNumber, verseText, coverage) {
  const subject = focusPhrase(verseText);
  const mcnultyLine = mcnultyHasSupport(chapter, verseNumber)
    ? "The Adventist practical judgment-hour emphasis is especially important here: Christ is not merely explaining events, but preparing a faithful people whose lives reveal His character."
    : "The Adventist reading should still keep the verse tied to Christ, worship, judgment, obedience, mission, and hope rather than allowing the explanation to become detached religious information.";
  const technicalLine = coverage.academic > 0
    ? "Historical setting, literary movement, Old Testament echoes, and technical observation can enrich the reading, but they remain servants of the biblical text and do not replace the prophetic framework of the passage."
    : "Where the verse itself gives the strongest evidence, the safest commentary stays close to its wording and avoids claims about Greek, history, or background that the passage does not require.";
  return `${mcnultyLine} ${technicalLine} The phrase "${subject}" should therefore be explained with theological weight, not passed over as a minor detail.`;
}

const compactMinimumWords = 300;
const compactMaximumWords = 500;

function splitSentences(text) {
  return text
    .replace(/\s+/g, " ")
    .match(/[^.!?]+[.!?]+(?:["']|$)?|[^.!?]+$/g)
    ?.map((sentence) => sentence.trim())
    .filter(Boolean) ?? [];
}

function firstSentences(text, count) {
  const sentences = splitSentences(text);
  return sentences.slice(0, count).join(" ").trim();
}

function addCompactParagraph(paragraphs, text, sentenceCount = 2) {
  const compact = firstSentences(text, sentenceCount);
  if (compact && !paragraphs.includes(compact)) paragraphs.push(compact);
}

function trimToWordLimit(paragraphs, wordLimit) {
  const trimmed = [];
  for (const paragraph of paragraphs) {
    const candidate = [...trimmed, paragraph].join("\n\n");
    if (wordCount(candidate) <= wordLimit) {
      trimmed.push(paragraph);
      continue;
    }
    const currentWords = wordCount(trimmed.join("\n\n"));
    if (currentWords >= wordLimit - 20) break;
    const sentenceParts = [];
    for (const sentence of splitSentences(paragraph)) {
      const sentenceCandidate = [...trimmed, [...sentenceParts, sentence].join(" ")].join("\n\n");
      if (wordCount(sentenceCandidate) > wordLimit) break;
      sentenceParts.push(sentence);
    }
    if (sentenceParts.length) trimmed.push(sentenceParts.join(" "));
    break;
  }
  return trimmed.join("\n\n");
}

function compactKeyTermsParagraph(verseText) {
  const keyTerms = keyTermsForVerse(verseText);
  if (!keyTerms.length) return "";
  const terms = keyTerms.join(", ");
  return `The key terms in the verse are ${terms}. They should be explained plainly, because Revelation uses these words to show worship, loyalty, warning, promise, or hope.`;
}

function compactApplicationParagraph(signal, chapter, verseNumber, verseText) {
  const subject = focusPhrase(verseText);
  const base = pastoralFor(signal, chapter, verseNumber);
  if (chapter <= 3) {
    return `${base} Christ is speaking to real churches, but He is also searching His people now. The response is to hear Him honestly and return to love, faithfulness, repentance, or courage.`;
  }
  if ([12, 13, 14, 17, 18].includes(chapter)) {
    return `${base} The practical question is allegiance: will the reader trust the Lamb when worship, culture, power, or comfort pulls another way?`;
  }
  if ([20, 21, 22].includes(chapter)) {
    return `${base} The hope in "${subject}" should make faith steadier, obedience clearer, and longing for Christ's kingdom more practical.`;
  }
  return `${base} The passage should move the reader toward trust, worship, repentance, endurance, or hope in Christ.`;
}

function expandCommentary(chapter, verseNumber, verseText, seedParagraphs, context) {
  const { humanSignal, coverage, shouldShowTimeline } = context;
  const paragraphs = [];
  const subject = focusPhrase(verseText);
  for (const [index, paragraph] of seedParagraphs.filter(Boolean).slice(0, 3).entries()) {
    addCompactParagraph(paragraphs, paragraph, index === 0 ? 3 : 2);
  }
  addCompactParagraph(
    paragraphs,
    `In ${unitFor(chapter, verseNumber)}, the phrase "${subject}" should be read in the flow of the surrounding message. The immediate context shows whether the verse is giving comfort, warning, worship, promise, or a call to faithful response.`,
    2
  );
  addCompactParagraph(paragraphs, sourceShapedInsight(chapter, verseNumber, verseText, humanSignal, coverage), 2);
  addCompactParagraph(paragraphs, oldTestamentParagraph(chapter, verseNumber, verseText, humanSignal), shouldShowTimeline ? 2 : 1);
  if (shouldShowTimeline) {
    addCompactParagraph(
      paragraphs,
      `Adventist interpretation reads this carefully within the Daniel-Revelation pattern. ${timelineText(chapter, unitFor(chapter, verseNumber))} The point is not fear or date-setting, but loyalty to Christ and clear worship under pressure.`,
      3
    );
  } else {
    addCompactParagraph(paragraphs, adventistLongParagraph(chapter), 1);
  }
  addCompactParagraph(paragraphs, compactKeyTermsParagraph(verseText), 2);
  addCompactParagraph(paragraphs, compactApplicationParagraph(humanSignal, chapter, verseNumber, verseText), 2);
  let unique = [...new Set(paragraphs.map((paragraph) => paragraph.trim()).filter(Boolean))];
  let commentary = unique.join("\n\n");
  if (wordCount(commentary) < compactMinimumWords) {
    addCompactParagraph(unique, sourceSupportParagraph(chapter, verseNumber, verseText, coverage), 2);
    commentary = unique.join("\n\n");
  }
  if (wordCount(commentary) < compactMinimumWords) {
    addCompactParagraph(unique, longFormCompletionParagraph(chapter, verseNumber, verseText), 2);
    commentary = unique.join("\n\n");
  }
  if (wordCount(commentary) < compactMinimumWords) {
    unique.push("Finally, the verse should bring the reader back to Jesus. Revelation gives symbols, warnings, and promises so that God's servants may understand the message, trust Christ more deeply, and live with faithful courage.");
    commentary = unique.join("\n\n");
  }
  return trimToWordLimit(unique, compactMaximumWords);
}

function buildCommentary(chapter, verseNumber, verseText) {
  const [, , background, technical, adventist] = profiles[chapter];
  const unit = unitFor(chapter, verseNumber);
  const detail = phraseDetail(verseText, chapter);
  const isProphetic = propheticChapters.has(chapter);
  const humanSignal = signalFor(verseText, chapter);
  const note = noteFor(chapter, verseNumber);
  const coverage = coverageFor(chapter, verseNumber);
  const opening = openingFor(chapter, verseNumber, verseText);
  const refinedDetail = conciseDetail(detail, opening);
  const specificDetail = refinedDetail ? ` ${refinedDetail}` : "";
  const baseExegesis = `${opening}${specificDetail}`;
  const historicalBackground = `${background} The original setting gives weight to the verse without exhausting its meaning; Revelation speaks to real churches while training later readers to see their own pressures in the light of heaven.`;
  const technicalNotes = `${technical} Its Old Testament echoes, literary placement, and theological function shape the interpretation.`;
  const adventistPropheticInsight = `${adventist} ${isProphetic ? "Adventist interpretation should keep the prophetic sequence subordinate to the gospel, Christ's heavenly ministry, worship, judgment, and mission." : "Adventist interpretation should keep Christ, sanctuary, worship, obedience, and mission in view without forcing chronology where the passage is not making a timeline claim."}`;
  const propheticTimeline = timelineText(chapter, unit);
  const otherCommentaryInsights = `Historical, literary, and pastoral commentary can enrich this verse by sharpening its setting, Old Testament echoes, worship theology, and discipleship implications. Those details should clarify the text and its application while leaving Adventist prophetic interpretation primary where a timeline or final-conflict claim is involved.`;
  const application = pastoralFor(humanSignal, chapter, verseNumber);
  const technicalDetail = technicalFor(humanSignal, verseText, chapter);
  const sourceInsight = sourceShapedInsight(chapter, verseNumber, verseText, humanSignal, coverage);
  const shouldShowTimeline = timelineHeavy.has(chapter) || /\bbeast\b|mark|babylon|judgment|commandments of god|faith of jesus|thousand years|little book|1260|two witnesses|plagues?|armageddon|new heaven|new earth/.test(verseText.toLowerCase());
  const interpretiveParagraph = [
    theologyFor(humanSignal, chapter, verseText),
    technicalDetail,
    sourceInsight,
    shouldShowTimeline ? propheticTimeline : ""
  ].filter(Boolean).join(" ");
  const noteParagraphs = note ? [...note] : null;
  const seedParagraphs = noteParagraphs
    ? noteParagraphs
    : [
      baseExegesis,
      interpretiveParagraph,
      `${pastoralFor(humanSignal, chapter, verseNumber)}`
    ];
  const detailedExplanation = expandCommentary(chapter, verseNumber, verseText, seedParagraphs, {
    humanSignal,
    coverage,
    shouldShowTimeline
  });
  const exegesis = note ? note[0] : baseExegesis;
  return {
    detailedExplanation,
    exegesis,
    historicalBackground,
    technicalNotes,
    adventistPropheticInsight,
    propheticTimeline,
    otherCommentaryInsights,
    application,
    reviewFlags: reviewFlags(chapter)
  };
}

function buildAudit(chapter, verseNumber) {
  const markers = markerCandidates(chapter, verseNumber);
  const adventist = idsForRole("adventist", chapter, verseNumber, 7);
  const timeline = idsForRole("timeline", chapter, verseNumber, 7);
  const background = idsForRole("background", chapter, verseNumber, 6);
  const technical = idsForRole("technical", chapter, verseNumber, 7);
  const comparison = idsForRole("comparison", chapter, verseNumber, 5);
  const application = idsForRole("application", chapter, verseNumber, 6);
  return {
    exegesis: refs(knownFirst([...adventist, ...technical], [sourceIds.mcnulty, sourceIds.stefanovic, sourceIds.maxwell, sourceIds.amazingNotes]), markers, "exegesis", 1).slice(0, 7),
    historicalBackground: refs(background, markers, "background", 5),
    technicalNotes: refs(technical, markers, "technical", 5),
    adventistPropheticInsight: refs(knownFirst([...adventistSources(chapter), ...adventist], preferredAdventistOrder), markers, "adventist-interpretation", 1).slice(0, 8),
    propheticTimeline: refs(knownFirst([...adventistSources(chapter), ...timeline], preferredAdventistOrder), chapter === 14 ? ["Revelation 14:6-12", ...markers] : markers, "adventist-timeline", 1).slice(0, 8),
    otherCommentaryInsights: refs(comparison, markers, "comparison", 6),
    application: refs(application, markers, "application", 5)
  };
}

function flatSources(audit) {
  const seen = new Set();
  return Object.values(audit).flat().filter((source) => {
    const key = `${source.sourceId}-${source.claimType}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 10);
}

function addResources() {
  const path = join(contentRoot, "resources/bibliography.json");
  const bibliography = JSON.parse(readFileSync(path, "utf8"));
  const existing = new Map(bibliography.resources.map((resource) => [resource.id, resource]));
  for (const source of sourceRecords) {
    const previous = existing.get(source.id) ?? {};
    const tradition = source.tradition ?? previous.tradition ?? "Non-Adventist";
    const category = source.interpretiveCategory ?? previous.interpretiveCategory ?? "General study / comparison";
    const type = source.type ?? previous.type ?? "Uploaded PDF";
    const howUsed = tradition === "Adventist"
      ? "Used for Adventist-prioritized exegesis, prophetic interpretation, timeline framing, theological synthesis, and pastoral application where relevant."
      : /comparative|idealist|preterist|futurist/i.test(category)
        ? "Used for fair comparison and to clarify differences from the Adventist historicist reading."
        : /pastoral|devotional/i.test(category)
          ? "Used for pastoral, devotional, teaching, and application insights where they support the passage."
          : "Used for historical background, literary context, Old Testament allusions, technical detail, and broader scholarly comparison.";
    existing.set(source.id, {
      ...previous,
      id: source.id,
      title: source.title ?? previous.title ?? source.id,
      author: source.author ?? previous.author ?? "Unknown",
      type,
      tradition,
      interpretiveCategory: category,
      howUsed,
      citationFormat: `${source.author ?? previous.author ?? "Unknown"}. ${source.title ?? previous.title ?? source.id}. Uploaded PDF resource.`
    });
  }
  bibliography.resources = [...existing.values()].sort((a, b) => {
    if (a.tradition !== b.tradition) return a.tradition === "Adventist" ? -1 : 1;
    return a.title.localeCompare(b.title);
  });
  writeFileSync(path, `${JSON.stringify(bibliography, null, 2)}\n`);
}

function upgradeChapters() {
  const files = readdirSync(join(contentRoot, "revelation")).filter((file) => file.endsWith(".json")).sort();
  for (const file of files) {
    const path = join(contentRoot, "revelation", file);
    const chapter = JSON.parse(readFileSync(path, "utf8"));
    chapter.summary = `${profiles[chapter.chapterNumber][1]} ${profiles[chapter.chapterNumber][4]} ${profiles[chapter.chapterNumber][6]}`;
    chapter.historicalContext = `Read Revelation ${chapter.chapterNumber} as a pastoral-prophetic message sent from John to real churches in Asia Minor under Roman imperial pressure. The historical setting matters because Revelation speaks to believers whose worship, imagination, and allegiance were contested by empire, compromise, and suffering.`;
    chapter.verses = chapter.verses.map((verse) => {
      const verseNumber = Number(verse.verse.split(":").at(-1));
      const commentary = buildCommentary(chapter.chapterNumber, verseNumber, verse.bibleText);
      const sourceAudit = buildAudit(chapter.chapterNumber, verseNumber);
      return {
        ...verse,
        explanation: commentary.exegesis,
        historicalBackground: commentary.historicalBackground,
        symbolicMeaning: commentary.technicalNotes,
        adventistInsight: commentary.adventistPropheticInsight,
        propheticSignificance: commentary.propheticTimeline,
        application: commentary.application,
        sources: flatSources(sourceAudit),
        commentary,
        sourceAudit,
        reviewStatus: commentary.reviewFlags.length ? "needs-source-review" : "verified-seed"
      };
    });
    writeFileSync(path, `${JSON.stringify(chapter, null, 2)}\n`);
  }
}

addResources();
upgradeChapters();
console.log("Detailed verse commentary generated for all Revelation chapters.");
