# Scenariusz reklamy — Konfigurator Twisted Pixel
Format: Vertical video (9:16) | Remotion | Lektorka: Rachel (ElevenLabs)

---

## SCENA 1 — HOOK
Typ: Hook (szybkie pytania)
Tło: Ciemne (#1d1d1b) z pomarańczowymi paskami top/bottom
Plik audio: public/voiceover/hook.mp3

4 pytania wyświetlane po kolei (każde zajmuje 1/4 czasu sceny):
  1. "Szukasz strony / dla inwestycji?"       — 2. linia: pomarańczowy
  2. "Potrzebujesz / domeny?"                 — 2. linia: zielony
  3. "Identyfikacji / wizualnej?"             — 2. linia: żółty
  4. "Kampanii / reklamowych?"                — 2. linia: pomarańczowy

Lektor: "Szukasz strony dla swojej inwestycji? Potrzebujesz domeny?
         Identyfikacji wizualnej? Kampanii reklamowych?"

Edycja: src/config.ts → SCENES[0].hookQuestions

---

## SCENA 2 — PAIN
Typ: Problem/ból
Tło: gradient ciemny → ciemnobrązowy
Przejście: slide from-bottom
Plik audio: public/voiceover/pain.mp3

Nagłówek:  "Znasz to?"
Podtytuł:  "Dziesiątki dostawców.
            Dziesiątki umów.
            Zero kontroli."

Lista (pojawia się sekwencyjnie):
  - Szukasz firmy od strony
  - Innej od logo
  - Jeszcze innej od reklam
  - Tracisz czas i pieniądze

Lektor: "Dziesiątki dostawców. Dziesiątki umów. Zero kontroli.
         Znasz to, prawda? Tyle do ogarnięcia — a mieszkania
         wciąż czekają na kupujących."

Edycja: src/config.ts → SCENES[1]

---

## SCENA 3 — REVEAL
Typ: Wielkie ujawnienie
Tło: ciemne + pomarańczowy flash na wejście
Przejście: FADE (specjalne — inne niż reszta!)
Plik audio: public/voiceover/reveal.mp3

Nagłówek (3 linie):
  "Wszystko"
  "w jednym"
  "narzędziu."  ← kolor pomarańczowy

Podtytuł: "Konfigurator Twisted Pixel"
Logo:     logo-white.png — pojawia się na końcu (60% opacity)

Lektor: "A gdyby wszystko — strona, domena, materiały i kampanie —
         było w jednym narzędziu? Poznaj Konfigurator Twisted Pixel."

Edycja: src/config.ts → SCENES[2]

---

## SCENA 4 — FEATURE: Strona
Typ: Feature
Przejście: slide from-left
Plik audio: public/voiceover/strona.mp3

Badge:    "§"  (kolor pomarańczowy)
Nagłówek: "Strona zgodna
           z ustawą"
Podtytuł: "Prospekt informacyjny
           + interaktywna wyszukiwarka lokali
           + integracja z dane.gov.pl"

Lektor: "Strona internetowa zgodna z ustawą deweloperską.
         Prospekt informacyjny, wyszukiwarka lokali,
         dane z rejestrów rządowych — wszystko automatycznie."

Edycja: src/config.ts → SCENES[3]

---

## SCENA 5 — FEATURE: Domena
Typ: Feature
Przejście: slide from-bottom
Plik audio: public/voiceover/domena.mp3

Badge:    ".pl"  (kolor zielony)
Nagłówek: "Domena?
           Jeden klik."
Podtytuł: "Sprawdź dostępność
           i zamów od razu"

Lektor: "Domena? Wpisz nazwę inwestycji, sprawdź dostępność
         i zamów jednym klikiem. Proste."

Edycja: src/config.ts → SCENES[4]

---

## SCENA 6 — FEATURE: Materiały
Typ: Feature
Przejście: slide from-left
Plik audio: public/voiceover/materialy.mp3

Badge:    "ID"  (kolor żółty)
Nagłówek: "Branding
           od A do Z"
Podtytuł: "Nazwa · Logo · Wizualizacje
           Katalog · Materiały offline"

Lektor: "Branding, wizualizacje trójwymiarowe, broszury, katalog
         inwestycji. Kompletna identyfikacja wizualna —
         od nazwy po materiały drukowane."

Edycja: src/config.ts → SCENES[5]

---

## SCENA 7 — FEATURE: Kampanie
Typ: Feature
Przejście: slide from-bottom
Plik audio: public/voiceover/kampanie.mp3

Badge:    "ADS"  (kolor pomarańczowy)
Nagłówek: "Kampanie
           Google & Meta"
Podtytuł: "Precyzyjna maszyna
           do pozyskiwania leadów"

Lektor: "Kampanie Google Ads i Meta Ads — trafiasz precyzyjnie
         do kupujących szukających mieszkań w Twoim rejonie."

Edycja: src/config.ts → SCENES[6]

---

## SCENA 8 — STATS
Typ: Statystyki / Social proof
Tło: gradient zielono-ciemny
Przejście: slide from-left
Plik audio: public/voiceover/stats.mp3

Nagłówek: "Twarde dowody"
Podtytuł: "Case study: Malta View"

Karty statystyk (wjeżdżają z lewej, kolejno):
  1710+      pozyskanych leadów    (kolor pomarańczowy)
  65–100 zł  koszt za lead         (kolor zielony)
  130K       zrealizowany budżet   (kolor żółty)

Lektor: "Dla inwestycji Malta View pozyskaliśmy ponad tysiąc
         siedemset leadów przy koszcie od sześćdziesięciu pięciu
         do stu złotych za kontakt. Kampania działa
         nieprzerwanie do dziś."

Edycja: src/config.ts → SCENES[7]

---

## SCENA 9 — PAKIET
Typ: Podsumowanie pakietu
Tło: ciemne
Przejście: slide from-bottom
Plik audio: public/voiceover/pakiet.mp3

Nagłówek: "Pakiet
           kompleksowy"
Podtytuł: "Gotowe narzędzie sprzedażowe"

Siatka 2x3 kart (pojawiają się kolejno z bounce):
  Branding & Naming  |  Wizualizacje 3D
  Strona sprzedażowa |  Social Media
  Analityka GA4      |  Kampanie leadowe

Lektor: "Branding, wizualizacje, strona sprzedażowa, social media,
         analityka i kampanie leadowe. Jeden pakiet — kompletne
         narzędzie sprzedażowe dla inwestycji deweloperskiej."

Edycja: src/config.ts → SCENES[8]

---

## SCENA 10 — OUTRO
Typ: CTA końcowe
Tło: gradient pomarańczowy (#eb5d1c → #c94d14)
Przejście: slide from-left
Plik audio: public/voiceover/outro.mp3

Logo:     logo-dark.png (wjeżdża z góry)
Nagłówek: "Skonfiguruj
           swój projekt."
Podtytuł: "Jeden konfigurator — kompletne rozwiązanie"
Przycisk: "twistedpixel.pl"  (ciemny, pulsujący)

Kontakt (dół ekranu):
  538 111 865
  hello@twistedpixel.pl

Lektor: "Jeden konfigurator. Kompletne rozwiązanie.
         Skonfiguruj swój projekt z Twisted Pixel — teraz."

Edycja: src/config.ts → SCENES[9]

---

## Gdzie edytować

TREŚCI (teksty, lektor, dane):
  src/config.ts  →  tablica SCENES

WYGLĄD (kolory, animacje, układ):
  src/KonfiguReklama/Scene.tsx  →  obiekt C (kolory), komponenty scen

KOLEJNOŚĆ SCEN i PRZEJŚCIA:
  src/KonfiguReklama/index.tsx

PLIKI AUDIO:
  public/voiceover/<id-sceny>.mp3
  (nazwa pliku musi być taka sama jak pole "id" w SCENES)

GENEROWANIE LEKTORA (ElevenLabs):
  generate-voiceover.ts
  Voice ID: 21m00Tcm4TlvDq8ikWAM  (Rachel)

---

## Kolory marki

  Pomarańczowy (dominanta):  #eb5d1c
  Zielony (akcent):          #209b84
  Żółty (akcent):            #f9e064
  Ciemny (tło):              #1d1d1b
  Biały:                     #ffffff
