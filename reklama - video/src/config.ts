export const VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Rachel (female)
export const TRANSITION_FRAMES = 10;

export type SceneType = "hook" | "pain" | "reveal" | "feature" | "stats" | "pakiet" | "outro";

export interface Scene {
  id: string;
  type: SceneType;
  voiceText: string;
  headline: string;
  sub: string;
  items?: string[];
  badge?: string;
  cta?: string;
  hookQuestions?: string[];
  stats?: { value: string; label: string }[];
  pakietItems?: string[];
}

export const SCENES: Scene[] = [
  {
    id: "hook",
    type: "hook",
    voiceText:
      "Szukasz strony dla swojej inwestycji? Potrzebujesz domeny? Identyfikacji wizualnej? Kampanii reklamowych?",
    headline: "",
    sub: "",
    hookQuestions: [
      "Szukasz strony\ndla inwestycji?",
      "Potrzebujesz\ndomeny?",
      "Identyfikacji\nwizualnej?",
      "Kampanii\nreklamowych?",
    ],
  },
  {
    id: "pain",
    type: "pain",
    voiceText:
      "Dziesiątki dostawców. Dziesiątki umów. Zero kontroli. Znasz to, prawda? Tyle do ogarnięcia — a mieszkania wciąż czekają na kupujących.",
    headline: "Znasz to?",
    sub: "Dziesiątki dostawców.\nDziesiątki umów.\nZero kontroli.",
    items: [
      "Szukasz firmy od strony",
      "Innej od logo",
      "Jeszcze innej od reklam",
      "Tracisz czas i pieniądze",
    ],
  },
  {
    id: "reveal",
    type: "reveal",
    voiceText:
      "A gdyby wszystko — strona, domena, materiały i kampanie — było w jednym narzędziu? Poznaj Konfigurator Twisted Pixel.",
    headline: "Wszystko\nw jednym\nnarzędziu.",
    sub: "Konfigurator Twisted Pixel",
  },
  {
    id: "strona",
    type: "feature",
    voiceText:
      "Strona internetowa zgodna z ustawą deweloperską. Prospekt informacyjny, wyszukiwarka lokali, dane z rejestrów rządowych — wszystko automatycznie.",
    headline: "Strona zgodna\nz ustawą",
    sub: "Prospekt informacyjny\n+ interaktywna wyszukiwarka lokali\n+ integracja z dane.gov.pl",
    badge: "§",
  },
  {
    id: "domena",
    type: "feature",
    voiceText:
      "Domena? Wpisz nazwę inwestycji, sprawdź dostępność i zamów jednym klikiem. Proste.",
    headline: "Domena?\nJeden klik.",
    sub: "Sprawdź dostępność\ni zamów od razu",
    badge: ".pl",
  },
  {
    id: "materialy",
    type: "feature",
    voiceText:
      "Branding, wizualizacje trójwymiarowe, broszury, katalog inwestycji. Kompletna identyfikacja wizualna — od nazwy po materiały drukowane.",
    headline: "Branding\nod A do Z",
    sub: "Nazwa · Logo · Wizualizacje\nKatalog · Materiały offline",
    badge: "ID",
  },
  {
    id: "kampanie",
    type: "feature",
    voiceText:
      "Kampanie Google Ads i Meta Ads — trafiasz precyzyjnie do kupujących szukających mieszkań w Twoim rejonie.",
    headline: "Kampanie\nGoogle & Meta",
    sub: "Precyzyjna maszyna\ndo pozyskiwania leadów",
    badge: "ADS",
  },
  {
    id: "stats",
    type: "stats",
    voiceText:
      "Dla inwestycji Malta View pozyskaliśmy ponad tysiąc siedemset leadów przy koszcie od sześćdziesięciu pięciu do stu złotych za kontakt. Kampania działa nieprzerwanie do dziś.",
    headline: "Twarde dowody",
    sub: "Case study: Malta View",
    stats: [
      { value: "1710+", label: "pozyskanych leadów" },
      { value: "65–100 zł", label: "koszt za lead" },
      { value: "130K", label: "zrealizowany budżet" },
    ],
  },
  {
    id: "pakiet",
    type: "pakiet",
    voiceText:
      "Branding, wizualizacje, strona sprzedażowa, social media, analityka i kampanie leadowe. Jeden pakiet — kompletne narzędzie sprzedażowe dla inwestycji deweloperskiej.",
    headline: "Pakiet\nkompleksowy",
    sub: "Gotowe narzędzie sprzedażowe",
    pakietItems: [
      "Branding & Naming",
      "Wizualizacje 3D",
      "Strona sprzedażowa",
      "Social Media",
      "Analityka GA4",
      "Kampanie leadowe",
    ],
  },
  {
    id: "outro",
    type: "outro",
    voiceText:
      "Jeden konfigurator. Kompletne rozwiązanie. Skonfiguruj swój projekt z Twisted Pixel — teraz.",
    headline: "Skonfiguruj\nswój projekt.",
    sub: "Jeden konfigurator — kompletne rozwiązanie",
    cta: "twistedpixel.pl",
  },
];
