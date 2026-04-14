# Twisted Pixel – Konfigurator inwestycji deweloperskich

Interaktywny konfigurator potrzeb marketingowych dla deweloperów.
Zbudowany w React + Vite, przeznaczony do osadzenia w WordPress.

---

## Uruchomienie (development)

```bash
cd konfigurator-app
npm install
npm run dev
```

Aplikacja uruchomi sie pod adresem: http://localhost:5173

---

## Build produkcyjny

```bash
npm run build
```

Pliki wyjsciowe trafiaja do folderu `dist/`. Mozna je osadzic w WordPress jako:
- statyczny embed (shortcode + iframe)
- plugin WP ladujacy bundle JS
- sekcja Elementor z widgetem HTML

---

## Struktura projektu

```
konfigurator-app/
├── index.html              # Punkt wejscia HTML (Vite)
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx            # Montowanie React
    ├── App.jsx             # Glowny komponent, zarzadza stanem i krokami
    ├── App.css             # Style globalne (brand TwistedPixel)
    ├── data/
    │   └── config.js       # Dane: opcje, szablony, logika rekomendacji
    └── components/
        ├── ProgressBar.jsx         # Pasek postepu
        ├── CardOption.jsx          # Karta wyboru (radio-style)
        ├── NavigationButtons.jsx   # Przyciski Wstecz / Dalej
        └── steps/
            ├── Step1Start.jsx          # Ekran startowy (hero)
            ├── Step2Inwestycja.jsx     # Status, nazwa, typ inwestycji
            ├── Step3Strona.jsx         # Strona internetowa
            ├── Step4Identyfikacja.jsx  # Logo, brand, materialy
            ├── Step5Domena.jsx         # Domena
            ├── Step6Styl.jsx           # Styl wizualny strony
            ├── Step7Wizualizacje.jsx   # Wizualizacje 3D
            ├── Step8Wybor.jsx          # Wybor szablonu strony
            ├── Step9Podsumowanie.jsx   # Podsumowanie + rekomendacje
            └── Step10Platnosc.jsx      # Potwierdzenie / platnosc
```

---

## Kroki konfiguratora

| # | Krok           | Opis                                                    |
|---|----------------|---------------------------------------------------------|
| 1 | Start          | Ekran powitalny z CTA                                   |
| 2 | Inwestycja     | Status, nazwa i typ inwestycji                          |
| 3 | Strona         | Czy inwestycja ma strone; opcjonalnie podaj adres       |
| 4 | Branding       | Logo, identyfikacja wizualna, materialy sprzedazowe     |
| 5 | Domena         | Czy inwestycja ma domene internetowa                    |
| 6 | Styl           | Wybor stylu wizualnego strony (4 opcje)                 |
| 7 | Wizualizacje   | Czy istnieja wizualizacje 3D / zdjecia                  |
| 8 | Szablon        | Wybor przykladu strony inwestycji                       |
| 9 | Podsumowanie   | Pelne podsumowanie + rekomendowany pakiet uslug         |
|10 | Gotowe         | Potwierdzenie, informacja o kolejnych krokach           |

---

## Logika rekomendacji

Plik `src/data/config.js` zawiera funkcje `generateRecommendations(formData)`, ktora:

1. Analizuje brakujace elementy (brak logo, strony, domeny, wizualizacji)
2. Przypisuje uslugom priorytety (high / medium / low)
3. Dobiera pakiet: **Kompletny** / **Rozbudowany** / **Optymalizacja**

---

## Osadzenie w WordPress

### Metoda 1 – Shortcode z iframe

```php
// functions.php
function tp_konfigurator_shortcode() {
    return '<iframe src="https://twisteddemo.pl/konfigurator/" width="100%" height="800px" frameborder="0"></iframe>';
}
add_shortcode('konfigurator_tp', 'tp_konfigurator_shortcode');
```

### Metoda 2 – Bezposrednie ladowanie bundle

Po wykonaniu `npm run build` skopiuj `dist/` na serwer WP i dodaj do functions.php:

```php
function tp_konfigurator_scripts() {
    wp_enqueue_script('tp-konfigurator', get_template_directory_uri() . '/konfigurator/assets/index.js', [], null, true);
    wp_enqueue_style('tp-konfigurator-style', get_template_directory_uri() . '/konfigurator/assets/index.css');
}
add_action('wp_enqueue_scripts', 'tp_konfigurator_scripts');
```

Dodaj do strony WordPress: `<div id="root"></div>`

---

## Dalszy rozwoj

- [ ] Podpiac prawdziwa bramke platnosci (Stripe / PayU / Przelewy24)
- [ ] Wyslac dane formularza do CRM lub e-mailem po kroku 9
- [ ] Dodac miniaturki do szablonow (zrzuty ekranu prawdziwych stron)
- [ ] Dodac linki podgladu do szablonow
- [ ] Integracja z Fluent Forms / CF7 dla kroku kontaktowego
- [ ] Analityka: Google Analytics 4 events po kazdym kroku

---

Twisted Pixel – marketing dla deweloperow | twisteddemo.pl
