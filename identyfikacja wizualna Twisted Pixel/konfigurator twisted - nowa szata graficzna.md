# PROMPT: Stylowanie CSS konfiguratora TwistedPixel

## Kontekst

Tworzysz arkusz CSS dla wielokrokowego konfiguratora/quizu na subdomenie TwistedPixel (agencja digital marketingu dla nieruchomości). Konfigurator prowadzi dewelopera przez 8 kroków, zbierając informacje o inwestycji (typ, etap, potrzeby marketingowe). Styl musi być **spójny z główną stroną twistedpixel.pl** oraz z księgą znaku firmy.

---

## 1. PALETA KOLORÓW

Stosuj wyłącznie kolory z oficjalnej palety marki:

### Kolory główne (dominanta)
| Nazwa | HEX | Użycie |
|---|---|---|
| **Crazy Orange** | `#eb5d1c` | Akcenty, CTA aktywne, wyróżnienia w nagłówkach, aktywny radio/checkbox, progress bar, hover na kartach |
| **Dark Night** | `#1d1d1b` | Tekst nagłówków, tekst główny, dark mode elementów (np. top-bar konfiguratora) |

### Kolory uzupełniające
| Nazwa | HEX | Użycie |
|---|---|---|
| **Fresh Peach** | `#f6b090` | Dekoracyjne kształty w tle (kwadraty, romby), subtle hover, tło info-boxów |
| **Hello (zieleń)** | `#209b84` | Sukcesy, walidacja, checkmarki, komunikaty pozytywne, info-box „zgodność z ustawą" |
| **Today (żółty)** | `#f9e064` | Drobne akcenty dekoracyjne (max 15-20% obecności) |
| **Cold London** | `#5d6970` | Tekst drugorzędny, opisy, placeholdery, ikony nieaktywne |
| **In the Morning** | `#c1c8cd` | Bordery kart, separatory, tło nieaktywnych elementów |
| **Snow** | `#ffffff` | Tło kart opcji, tło inputów, czyste powierzchnie |

### Tło konfiguratora
Główne tło to **ciepły, jasny beż/krem** — NIE czysta biel. Na stronie głównej TwistedPixel tło sekcji jasnych ma delikatny ciepły odcień. Użyj:
- Tło strony: `#f9f5f0` lub `#faf6f1` (ciepły off-white)
- Na tym tle umieść **dekoracyjne geometryczne kształty** (kwadraty/romby obrócone o 45°) w kolorach `#f6b090` (Fresh Peach) z opacity ~15-25%, oraz `#f9e064` (Today) z opacity ~10%. Te kształty nawiązują do sygnetu TwistedPixel (przekręcony kwadrat) i pojawiają się na stronie głównej.

---

## 2. TYPOGRAFIA

### Fonty (Google Fonts)
```
@import url('https://fonts.googleapis.com/css2?family=Alata&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');
```

| Element | Font | Waga | Rozmiar (desktop) | Rozmiar (mobile) |
|---|---|---|---|---|
| H1 — pytanie główne kroku | **Alata** | 400 (regular) | 36-40px | 26-30px |
| H2 — podpytanie | **Alata** | 400 | 28-32px | 22-24px |
| Opis pod pytaniem | **IBM Plex Sans** | 400 | 16-17px | 15px |
| Tekst w kartach opcji (tytuł) | **IBM Plex Sans** | 600 | 17-18px | 16px |
| Tekst w kartach opcji (opis) | **IBM Plex Sans** | 400 | 14-15px | 13-14px |
| Label kategorii (np. "INWESTYCJA") | **IBM Plex Sans** | 600 | 13px uppercase | 12px |
| Numer kroku (np. "Krok 1 z 8") | **IBM Plex Sans** | 500 | 14px | 13px |
| Przycisk CTA | **IBM Plex Sans** | 600 | 16px | 15px |
| Input / placeholder | **IBM Plex Sans** | 400 | 16px | 16px |
| Info-box tekst | **IBM Plex Sans** | 400 | 14-15px | 13-14px |
| Info-box bold | **IBM Plex Sans** | 700 | 14-15px | 13-14px |

### Zasady typografii
- Interlinia: 150% (1.5) dla paragrafów, 120% (1.2) dla nagłówków
- Tracking (letter-spacing): 0 standardowo; `0.08em` dla uppercase labeli
- Wyrównanie: do lewej dla większości; wyśrodkowanie dozwolone dla hero/intro konfiguratora
- Nagłówki: kolor `#1d1d1b` (Dark Night)
- Słowa kluczowe w nagłówkach (np. "Twoja inwestycja") wyróżnij kolorem `#eb5d1c` (Crazy Orange)
- Tekst drugorzędny / opisy: kolor `#5d6970` (Cold London)

---

## 3. STRUKTURA UI — KOMPONENTY KONFIGURATORA

### 3.1 Top bar / Header konfiguratora
- Tło: `#1d1d1b` (Dark Night) — spójne z headerem strony głównej
- Tekst: biały, IBM Plex Sans 600, uppercase
- Ikona/gwiazdka: kolor `#eb5d1c`
- Border-radius: `999px` (pill shape) lub 0 jeśli pełna szerokość
- Padding: `12px 24px`

### 3.2 Wskaźnik kroków (Step indicator)
- Label kategorii (np. "INWESTYCJA"): kolor `#eb5d1c`, uppercase, IBM Plex Sans 600, 13px, letter-spacing: 0.08em
- Numer kroku (np. "Krok 1 z 8"): kolor `#5d6970`, IBM Plex Sans 500, 14px
- Opcjonalny progress bar: tło `#e8e2da`, fill `#eb5d1c`, height: 4px, border-radius: 2px

### 3.3 Karty opcji (radio/checkbox cards)
```css
/* Karta opcji — stan domyślny */
.option-card {
  background: #ffffff;
  border: 1.5px solid #e8e2da;
  border-radius: 12px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* Hover */
.option-card:hover {
  border-color: #f6b090;
  box-shadow: 0 2px 12px rgba(235, 93, 28, 0.08);
}

/* Wybrany / active */
.option-card.selected {
  border-color: #eb5d1c;
  box-shadow: 0 0 0 2px rgba(235, 93, 28, 0.15);
  background: #fff9f5;
}
```
- Ikona/emoji po lewej: rozmiar 40-48px, umieszczona w lekkim kole lub kwadracie z tłem `#f9f5f0`
- Tytuł opcji: IBM Plex Sans 600, `#1d1d1b`
- Opis opcji: IBM Plex Sans 400, `#5d6970`, 14px
- Radio button po prawej: custom, 20px, border `#c1c8cd`, checked fill `#eb5d1c`

### 3.4 Input tekstowy
```css
.text-input {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 16px;
  padding: 14px 18px;
  border: 1.5px solid #e8e2da;
  border-radius: 10px;
  background: #ffffff;
  color: #1d1d1b;
  width: 100%;
  transition: border-color 0.2s ease;
}
.text-input::placeholder {
  color: #c1c8cd;
}
.text-input:focus {
  outline: none;
  border-color: #eb5d1c;
  box-shadow: 0 0 0 3px rgba(235, 93, 28, 0.1);
}
```

### 3.5 Przycisk "Dalej →" (CTA)
```css
.btn-next {
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 16px;
  background: #1d1d1b;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 16px 40px;
  cursor: pointer;
  transition: all 0.25s ease;
}
.btn-next:hover {
  background: #eb5d1c;
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(235, 93, 28, 0.25);
}
.btn-next:disabled {
  background: #c1c8cd;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
```
Strzałka „→" powinna być inline, z lekkim przesunięciem w prawo na hover (transition transform).

### 3.6 Info box (np. "Zgodność z ustawą deweloperską")
```css
.info-box {
  background: rgba(32, 155, 132, 0.06); /* Hello green, very subtle */
  border: 1px solid rgba(32, 155, 132, 0.2);
  border-radius: 12px;
  padding: 20px 24px;
}
.info-box-icon {
  color: #209b84;
  font-size: 24px;
}
.info-box-title {
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  color: #1d1d1b;
  font-size: 15px;
}
.info-box-text {
  color: #5d6970;
  font-size: 14px;
  line-height: 1.5;
}
.info-box .tag {
  display: inline-block;
  background: rgba(32, 155, 132, 0.08);
  border: 1px solid rgba(32, 155, 132, 0.2);
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 13px;
  color: #209b84;
  font-weight: 500;
}
```

### 3.7 Badge'y / Tagi (np. "Zajmuje 3 minuty", "Spersonalizowane rekomendacje")
```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #ffffff;
  border: 1px solid #e8e2da;
  border-radius: 999px;
  padding: 8px 16px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 14px;
  color: #5d6970;
}
```

---

## 4. LAYOUT I SPACING

### Kontener
- Max-width: `720px` (dla treści formularza — wąski, czytelny kontener)
- Padding boczny: `24px` (mobile), `40px` (tablet+)
- Wycentrowany: `margin: 0 auto`

### Spacing
- Między pytaniami/sekcjami: `40-48px`
- Między kartami opcji: `12-16px`
- Padding wewnętrzny kroku: `40px 0` (top/bottom)
- Gap między elementami w karcie: `16px`

### Responsywność
- Mobile first
- Breakpoint tablet: `768px`
- Breakpoint desktop: `1024px`
- Na mobile karty zajmują 100% szerokości
- Na desktop max-width kontenera to `720px`, karty nadal single-column (jak w screenshotach)

---

## 5. EFEKTY I ANIMACJE

### Dekoracja tła — geometryczne kształty
Na tle konfiguratora powinny pojawiać się **dekoracyjne prostokąty/kwadraty**, częściowo obrócone o 45° (jak sygnet TwistedPixel), w kolorach:
- Fresh Peach (`#f6b090`) z opacity 15-20%
- Crazy Orange (`#eb5d1c`) z opacity 5-8%
Rozmieszczone w rogach i na krawędziach, częściowo poza viewportem (overflow hidden na body). Użyj `position: fixed` lub `absolute` z `z-index: 0`, a treść konfiguratora z `z-index: 1`.

### Przejścia
- Wszystkie interaktywne elementy: `transition: all 0.2s ease`
- Zmiana kroku: subtelny fade-in (`opacity 0→1, transform translateY(10px)→0`) przez ~300ms
- Karty opcji na hover: delikatny lift (`translateY(-2px)`) + cień

### Stany
- `:hover` — zmiana border-color, subtelny cień
- `:focus-visible` — ring w kolorze `#eb5d1c` z opacity
- `.selected` / `:checked` — orange border + lekki orange background tint
- `:disabled` — szary, zmniejszone opacity

---

## 6. IKONY

- Styl: emoji lub outline ikony (Lucide / Phosphor / custom SVG)
- Kolory ikon: wielokolorowe emoji LUB monochromatyczne w `#5d6970` z akcentem `#eb5d1c`
- Strzałki przy CTA: prosta strzałka `→` w SVG, animowana na hover (przesunięcie 4px w prawo)
- Checkmarki w info-boxach: `✓` w kolorze `#209b84`

---

## 7. SPECYFICZNE ELEMENTY DO OSTYLOWANIA

Poniżej lista elementów obecnych w konfiguratorze (na podstawie screenshotów):

1. **Hero/intro sekcja** — duży nagłówek z pomarańczowym akcentem, opis, 3 badge'y
2. **Info box** — zielone tło, ikona budynku, tekst o zgodności z ustawą, tagi
3. **Step header** — label kategorii + numer kroku
4. **Pytanie z radio-kartami** — pytanie H1, opis, lista kart z ikoną + radio
5. **Input tekstowy** — label uppercase, pole z placeholder, notatka "opcjonalne"
6. **Przycisk nawigacji** — "Dalej →" wyrównany do prawej, opcjonalnie "Wstecz" po lewej
7. **Progress bar** — opcjonalny, wizualizacja postępu 1-8

---

## 8. TONE & FEEL

Konfigurator powinien wyglądać:
- **Profesjonalnie ale przyjaźnie** — jak na stronie głównej, łączenie czerni z ciepłym pomarańczem
- **Nowocześnie** — zaokrąglone rogi (10-12px), subtelne cienie, czyste linie
- **Lekko i przestrzennie** — dużo białej przestrzeni, ciepłe tło, brak natłoku elementów
- **Spójnie z marką** — pomarańcz jako kolor akcji, czerń jako kolor autorytetu, geometryczne kształty w tle nawiązujące do sygnetu (obrócony kwadrat)
- **Konwersyjnie** — CTA jasno widoczne, ścieżka użytkownika intuicyjna

Unikaj: czysto białego tła (#fff jako tło strony), niebieskich/fioletowych akcentów, ostrych kątów (border-radius: 0), ciężkich cieni, gradientów (chyba że subtelne na tle).

---

## 9. REFERENCJA — KLUCZOWE CUSTOM PROPERTIES (CSS VARIABLES)

```css
:root {
  /* Kolory marki */
  --color-crazy-orange: #eb5d1c;
  --color-fresh-peach: #f6b090;
  --color-hello: #209b84;
  --color-today: #f9e064;
  --color-cold-london: #5d6970;
  --color-dark-night: #1d1d1b;
  --color-morning: #c1c8cd;
  --color-snow: #ffffff;

  /* Tła */
  --bg-page: #f9f5f0;
  --bg-card: #ffffff;
  --bg-card-selected: #fff9f5;
  --bg-input: #ffffff;

  /* Bordery */
  --border-default: #e8e2da;
  --border-hover: #f6b090;
  --border-active: #eb5d1c;

  /* Typografia */
  --font-heading: 'Alata', sans-serif;
  --font-body: 'IBM Plex Sans', sans-serif;

  /* Spacing */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 12px;
  --radius-pill: 999px;

  /* Cienie */
  --shadow-card: 0 1px 4px rgba(29, 29, 27, 0.06);
  --shadow-hover: 0 4px 16px rgba(235, 93, 28, 0.1);
  --shadow-focus: 0 0 0 3px rgba(235, 93, 28, 0.12);
}
```
