import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, Table, TableRow, TableCell, WidthType, ShadingType
} from "docx";
import { writeFileSync } from "fs";

const ORANGE = "EB5D1C";
const DARK = "1D1D1B";
const WHITE = "FFFFFF";
const GRAY = "F2F2F2";

const h1 = (text) => new Paragraph({
  children: [new TextRun({ text, bold: true, size: 40, color: ORANGE })],
  spacing: { before: 400, after: 200 },
});

const label = (text) => new Paragraph({
  children: [new TextRun({ text, bold: true, size: 20, color: ORANGE })],
  spacing: { before: 160, after: 40 },
});

const body = (text) => new Paragraph({
  children: [new TextRun({ text, size: 20, color: DARK })],
  spacing: { after: 80 },
});

const ital = (text) => new Paragraph({
  children: [new TextRun({ text, italics: true, size: 20, color: "555555" })],
  spacing: { after: 80 },
  indent: { left: 300 },
});

const bullet = (text) => new Paragraph({
  children: [new TextRun({ text: "- " + text, size: 20, color: DARK })],
  indent: { left: 400 },
  spacing: { after: 60 },
});

const divider = () => new Paragraph({
  children: [new TextRun({ text: " ", size: 8 })],
  border: { bottom: { style: "single", size: 6, color: "DDDDDD" } },
  spacing: { before: 200, after: 200 },
});

const sceneHeader = (num, title) => new Paragraph({
  children: [
    new TextRun({ text: `SCENA ${num}   ${title}`, bold: true, size: 26, color: WHITE }),
  ],
  shading: { type: ShadingType.CLEAR, fill: ORANGE },
  spacing: { before: 400, after: 160 },
  indent: { left: 200, right: 200 },
});

const scenes = [
  {
    num: 1,
    title: "HOOK",
    audio: "public/voiceover/hook.mp3",
    opis: "Cztery szybkie pytania wyswietlane po kolei na ciemnym tle z pomaranczowymi paskami.",
    elementy: [
      `Pytanie 1: "Szukasz strony / dla inwestycji?" - kolor pomaranczowy`,
      `Pytanie 2: "Potrzebujesz / domeny?" - kolor zielony`,
      `Pytanie 3: "Identyfikacji / wizualnej?" - kolor zolty`,
      `Pytanie 4: "Kampanii / reklamowych?" - kolor pomaranczowy`,
    ],
    lektor: "Szukasz strony dla swojej inwestycji? Potrzebujesz domeny? Identyfikacji wizualnej? Kampanii reklamowych?",
    edycja: "src/config.ts -> SCENES[0].hookQuestions",
  },
  {
    num: 2,
    title: "PAIN -- Problem klienta",
    audio: "public/voiceover/pain.mp3",
    opis: "Scena budujaca napiecie -- opisuje bol: za duzo dostawcow, za duzo umow.",
    elementy: [
      `Naglowek: "Znasz to?"`,
      `Podtytul: "Dziesiatki dostawcow. Dziesiatki umow. Zero kontroli."`,
      "Lista: Szukasz firmy od strony / innej od logo / jeszcze innej od reklam / tracisz czas i pieniadze",
    ],
    lektor: "Dziesiatki dostawcow. Dziesiatki umow. Zero kontroli. Znasz to, prawda? Tyle do ogarniecnia -- a mieszkania wciaz czekaja na kupujacych.",
    edycja: "src/config.ts -> SCENES[1]",
  },
  {
    num: 3,
    title: "REVEAL -- Wielkie ujawnienie",
    audio: "public/voiceover/reveal.mp3",
    opis: "Pomaranczowy flash -- dramatyczne ujawnienie rozwiazania z logo.",
    elementy: [
      `Naglowek (3 linie): "Wszystko / w jednym / narzedziu." (ostatnia linia -- pomaranczowy)`,
      `Podtytul: "Konfigurator Twisted Pixel"`,
      "Logo biale pojawia sie na koncu",
    ],
    lektor: "A gdyby wszystko -- strona, domena, materialy i kampanie -- bylo w jednym narzedziu? Poznaj Konfigurator Twisted Pixel.",
    edycja: "src/config.ts -> SCENES[2]",
  },
  {
    num: 4,
    title: "FEATURE -- Strona www",
    audio: "public/voiceover/strona.mp3",
    opis: "Prezentacja funkcji: strona zgodna z ustawa deweloperska.",
    elementy: [
      `Badge: "§" (pomaranczowy)`,
      `Naglowek: "Strona zgodna z ustawa"`,
      "Podtytul: Prospekt informacyjny + wyszukiwarka lokali + integracja z dane.gov.pl",
    ],
    lektor: "Strona internetowa zgodna z ustawa deweloperska. Prospekt informacyjny, wyszukiwarka lokali, dane z rejestrow rzadowych -- wszystko automatycznie.",
    edycja: "src/config.ts -> SCENES[3]",
  },
  {
    num: 5,
    title: "FEATURE -- Domena",
    audio: "public/voiceover/domena.mp3",
    opis: "Prezentacja funkcji: zamowienie domeny jednym klikiem.",
    elementy: [
      `Badge: ".pl" (zielony)`,
      `Naglowek: "Domena? Jeden klik."`,
      "Podtytul: Sprawdz dostepnosc i zamow od razu",
    ],
    lektor: "Domena? Wpisz nazwe inwestycji, sprawdz dostepnosc i zamow jednym klikiem. Proste.",
    edycja: "src/config.ts -> SCENES[4]",
  },
  {
    num: 6,
    title: "FEATURE -- Materialy / Branding",
    audio: "public/voiceover/materialy.mp3",
    opis: "Prezentacja funkcji: kompleksowa identyfikacja wizualna.",
    elementy: [
      `Badge: "ID" (zolty)`,
      `Naglowek: "Branding od A do Z"`,
      "Podtytul: Nazwa / Logo / Wizualizacje / Katalog / Materialy offline",
    ],
    lektor: "Branding, wizualizacje trojwymiarowe, broszury, katalog inwestycji. Kompletna identyfikacja wizualna -- od nazwy po materialy drukowane.",
    edycja: "src/config.ts -> SCENES[5]",
  },
  {
    num: 7,
    title: "FEATURE -- Kampanie",
    audio: "public/voiceover/kampanie.mp3",
    opis: "Prezentacja funkcji: kampanie Google Ads i Meta Ads.",
    elementy: [
      `Badge: "ADS" (pomaranczowy)`,
      `Naglowek: "Kampanie Google & Meta"`,
      "Podtytul: Precyzyjna maszyna do pozyskiwania leadow",
    ],
    lektor: "Kampanie Google Ads i Meta Ads -- trafiasz precyzyjnie do kupujacych szukajacych mieszkan w Twoim rejonie.",
    edycja: "src/config.ts -> SCENES[6]",
  },
  {
    num: 8,
    title: "STATS -- Dowody skutecznosci",
    audio: "public/voiceover/stats.mp3",
    opis: "Case study Malta View -- twarde liczby jako social proof.",
    elementy: [
      `Naglowek: "Twarde dowody"`,
      `Case study: "Malta View"`,
      "1710+ pozyskanych leadow",
      "65-100 zl koszt za lead",
      "130 000 zl zrealizowany budzet",
    ],
    lektor: "Dla inwestycji Malta View pozyskalismy ponad 1700 leadow przy koszcie od 65 do 100 zl za kontakt. Kampania dziala nieprzerwanie do dzis.",
    edycja: "src/config.ts -> SCENES[7]",
  },
  {
    num: 9,
    title: "PAKIET -- Podsumowanie",
    audio: "public/voiceover/pakiet.mp3",
    opis: "Siatka 2x3 kart z elementami pakietu -- pojawiaja sie kolejno.",
    elementy: [
      `Naglowek: "Pakiet kompleksowy"`,
      `Podtytul: "Gotowe narzedzie sprzedazowe"`,
      "Karty: Branding & Naming | Wizualizacje 3D | Strona sprzedazowa | Social Media | Analityka GA4 | Kampanie leadowe",
    ],
    lektor: "Branding, wizualizacje, strona sprzedazowa, social media, analityka i kampanie leadowe. Jeden pakiet -- kompletne narzedzie sprzedazowe dla inwestycji deweloperskiej.",
    edycja: "src/config.ts -> SCENES[8]",
  },
  {
    num: 10,
    title: "OUTRO -- CTA koncowe",
    audio: "public/voiceover/outro.mp3",
    opis: "Pomaranczowe tlo, logo, wezwanie do dzialania i dane kontaktowe.",
    elementy: [
      "Logo ciemne (wjezdza z gory)",
      `Naglowek: "Skonfiguruj swoj projekt."`,
      `Podtytul: "Jeden konfigurator -- kompletne rozwiazanie"`,
      "Przycisk: twistedpixel.pl",
      "Kontakt: 538 111 865 | hello@twistedpixel.pl",
    ],
    lektor: "Jeden konfigurator. Kompletne rozwiazanie. Skonfiguruj swoj projekt z Twisted Pixel -- teraz.",
    edycja: "src/config.ts -> SCENES[9]",
  },
];

const paragraphs = [
  new Paragraph({
    children: [new TextRun({ text: "SCENARIUSZ REKLAMY", bold: true, size: 52, color: ORANGE })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 200, after: 100 },
  }),
  new Paragraph({
    children: [new TextRun({ text: "Konfigurator Twisted Pixel", bold: true, size: 32, color: DARK })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
  }),
  new Paragraph({
    children: [new TextRun({ text: "Format: Vertical video 9:16  |  Narzedzie: Remotion  |  Lektor: Rachel (ElevenLabs)", size: 18, color: "888888", italics: true })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
  }),
  divider(),
];

for (const s of scenes) {
  paragraphs.push(sceneHeader(s.num, s.title));
  paragraphs.push(label("Opis:"));
  paragraphs.push(body(s.opis));
  paragraphs.push(label("Elementy na ekranie:"));
  for (const e of s.elementy) paragraphs.push(bullet(e));
  paragraphs.push(label("Lektor mowi:"));
  paragraphs.push(ital(s.lektor));
  paragraphs.push(label("Plik audio:"));
  paragraphs.push(body(s.audio));
  paragraphs.push(divider());
}

paragraphs.push(h1("Gdzie edytowac?"));

const tableRows = [
  ["Co chcesz zmienic", "Gdzie edytowac"],
  ["Teksty na ekranie, lektor, dane", "src/config.ts -> tablica SCENES"],
  ["Kolory, animacje, uklad", "src/KonfiguReklama/Scene.tsx"],
  ["Kolejnosc scen i przejscia", "src/KonfiguReklama/index.tsx"],
  ["Pliki audio lektora", "public/voiceover/<nazwa>.mp3"],
  ["Generowanie lektora AI", "generate-voiceover.ts (ElevenLabs)"],
];

const table = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  rows: tableRows.map((row, i) =>
    new TableRow({
      children: row.map(cell =>
        new TableCell({
          children: [new Paragraph({
            children: [new TextRun({ text: cell, bold: i === 0, size: 20, color: i === 0 ? WHITE : DARK })],
            spacing: { before: 80, after: 80 },
            indent: { left: 120, right: 120 },
          })],
          shading: i === 0
            ? { type: ShadingType.CLEAR, fill: ORANGE }
            : { type: ShadingType.CLEAR, fill: i % 2 === 0 ? GRAY : WHITE },
        })
      ),
    })
  ),
});

paragraphs.push(table);

paragraphs.push(h1("Kolory marki"));
paragraphs.push(body("Pomaranczowy (dominanta):  #EB5D1C"));
paragraphs.push(body("Zielony (akcent):          #209B84"));
paragraphs.push(body("Zolty (akcent):            #F9E064"));
paragraphs.push(body("Ciemny (tlo):              #1D1D1B"));
paragraphs.push(body("Bialy:                     #FFFFFF"));

const doc = new Document({
  creator: "Twisted Pixel",
  title: "Scenariusz reklamy -- Konfigurator Twisted Pixel",
  sections: [{ properties: {}, children: paragraphs }],
});

Packer.toBuffer(doc).then(buf => {
  writeFileSync("SCENARIUSZ.docx", buf);
  console.log("Gotowe! SCENARIUSZ.docx zapisany.");
});
