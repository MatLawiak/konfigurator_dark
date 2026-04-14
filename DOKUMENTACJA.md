# Konfigurator Inwestycji Deweloperskiej
## Dokumentacja techniczna i produktowa — Twisted Pixel

**Wersja:** 1.0
**Data:** Marzec 2026
**URL produkcyjny:** https://konfigurator.twistedpixel.pl
**Repozytorium:** https://github.com/MatLawiak/twisted_konfigurator (prywatne)

---

## 1. Czym jest konfigurator?

Konfigurator to **10-krokowy interaktywny wizard** dla deweloperów nieruchomości. Użytkownik odpowiada na pytania dotyczące swojej inwestycji, a aplikacja generuje **spersonalizowaną rekomendację pakietu usług marketingowych** Twisted Pixel.

### Cel biznesowy
- Automatyczne kwalifikowanie leadów (bez rozmowy telefonicznej na wstępie)
- Edukacja klienta o brakujących elementach marketingowych
- Zbieranie danych kontaktowych i szczegółów inwestycji
- Automatyczne powiadomienie zespołu TwistedPixel przez e-mail

---

## 2. Stack technologiczny

| Element | Technologia |
|---|---|
| Framework | React 18 |
| Bundler | Vite 5 |
| Style | Pure CSS (bez Tailwind) |
| Backend | Brak — frontend-only |
| Automatyzacja | n8n (webhook) |
| Hosting | Cyberfolks, DirectAdmin |
| Wdrożenie | FTP / FileZilla |

---

## 3. Przepływ użytkownika (10 kroków)

```
[1] Start → [2] Inwestycja → [3] Strona → [4] Branding → [5] Domena
     ↓
[6] Styl → [7] Wizualizacje → [8] Szablon → [9] Podsumowanie → [10] Gotowe
```

### Krok 1 — Start
Ekran powitalny z tagami: ⏱️ 3 minuty | 🎯 Spersonalizowane rekomendacje | 📋 Gotowe podsumowanie.
Banner: zgodność z ustawą deweloperską (art. 19b).

### Krok 2 — Inwestycja
- Status inwestycji: *W trakcie / Planowanie / Jeszcze nie*
- Nazwa inwestycji (opcjonalne)
- Typ: *Mieszkania / Domy / Apartamenty / Premium / Mixed-use*

### Krok 3 — Strona internetowa
- Czy inwestycja ma stronę? *Tak / Nie / Chcę nową*
- Jeśli tak → pole na URL strony

### Krok 4 — Branding
- Czy ma logo? (opcja upload pliku PNG/SVG/PDF/AI/EPS, max 20 MB)
- Identyfikacja wizualna: *Pełna / Częściowo / Nie mam*
- Jeśli częściowo → lista checkboxów (logo, paleta, typografia, szablony, wizytówki, druk, bannery)
- Materiały sprzedażowe: *Tak / Nie*

### Krok 5 — Domena
- Czy ma domenę? *Tak / Nie / Nie wiem*
- Wyszukiwarka dostępności domeny (RDAP, bez API key, sprawdza .pl/.eu/.com/.net)
- Propozycja 4 planów hostingowych Cyberfolks z linkami afiliacyjnymi

### Krok 6 — Styl wizualny
Wybór spośród 4 stylów:
1. **Minimalizm** — czyste linie, przestrzeń, elegancja
2. **Premium** — ciemne tła, ekskluzywny charakter
3. **Sprzedażowy** — skupiony na konwersji i leadach
4. **Architektoniczny** — duże zdjęcia, rzuty, technika

### Krok 7 — Wizualizacje 3D
- Czy ma wizualizacje? *Tak / Nie / W trakcie*
- Jeśli tak → upload plików (JPG/PNG/MP4/PDF/ZIP)
- Blok edukacyjny: obowiązki prawne z art. 19b ustawy deweloperskiej
- **Add-on: Automatyczne raportowanie do dane.gov.pl** (+2 300 PLN)
  - Codzienne generowanie CSV/XML
  - Formularz: Nazwa firmy, NIP, Email, Osoba kontaktowa

### Krok 8 — Wybór szablonu
Galeria 4 gotowych realizacji do wyboru:
| Szablon | Styl | URL |
|---|---|---|
| Malta View | Premium | maltaview.pl |
| Ogrody Potasze | Minimalizm | ogrodypotasze.pl |
| AT-Inwest | Sprzedażowy | at-inwest.pl |
| ArtBud Group | Architektoniczny | artbudgroup.pl |

### Krok 9 — Podsumowanie
- Lista spersonalizowanych rekomendacji z priorytetami
- Nazwa pakietu i cena
- Tabela podsumowująca wszystkie odpowiedzi
- Miniatura wybranego szablonu
- **CTA 1:** Formularz zamówienia (dane klienta + opcja faktury + metoda płatności)
- **CTA 2:** Modal kontaktowy (imię, telefon, wiadomość)

### Krok 10 — Gotowe
Ekran podziękowania z:
- Obietnicą kontaktu w ciągu kilku godzin
- Krokami procesu wdrożenia
- Banerem: 🚀 "Strona pojawi się na hostingu w ciągu 24 godzin"
- Gwarancją zwrotu pieniędzy

---

## 4. Logika rekomendacji i pakietów

Funkcja `generateRecommendations(formData)` analizuje odpowiedzi i przypisuje usługi:

| Brak elementu | Usługa | Priorytet |
|---|---|---|
| Logo | Stworzenie logo inwestycji | 🔴 Wysoki |
| Identyfikacja wizualna | Pełna identyfikacja wizualna | 🔴 Wysoki |
| Strona www | Strona internetowa | 🔴 Wysoki |
| Domena | Rejestracja domeny | 🔴 Wysoki |
| Identyfikacja częściowa | Rozbudowa identyfikacji | 🟡 Średni |
| Materiały sprzedażowe | Materiały sprzedażowe | 🟡 Średni |
| Wizualizacje | Wizualizacje 3D | 🟡 Średni |
| Wizualizacje w trakcie | Wsparcie wizualizacji | 🟢 Niski |

### Pakiety

| Pakiet | Warunek | Cena |
|---|---|---|
| **Kompletny** | 3+ elementów wysokiego priorytetu | 2 200 PLN |
| **Rozbudowany** | 1–2 elementy wysokiego priorytetu | 2 200 PLN |
| **Optymalizacja** | 0 elementów wysokiego priorytetu | 2 200 PLN |
| + Add-on dane.gov.pl | dowolny pakiet | 4 500 PLN |

---

## 5. Integracje zewnętrzne

### n8n — Automatyzacja leadów
- **Webhook URL:** `https://n8n.srv1076230.hstgr.cloud/webhook/konfigurator-lead`
- **Workflow:** Konfigurator – Lead Notification v4
- **Triggery:** Zamówienie (`zamow`) lub Kontakt (`kontakt`)
- **Co wysyła:** Wszystkie dane formularza + pliki jako base64 + dane kontaktowe
- **Limity plików:** Logo max 3 MB, Wizualizacje max 5 MB/plik
- **Efekt:** E-mail do TwistedPixel + e-mail potwierdzający do klienta

### Cyberfolks — Domeny i hosting
- Checker RDAP (dostępność domeny, bez API key)
- Linki afiliacyjne do planów hostingowych
- Hosting produkcyjny aplikacji (serwer `s22.cyberfolks.pl`)

### thum.io — Miniaturki szablonów
- Automatyczne screenshoty stron (darmowe, bez klucza)
- Format: `https://image.thum.io/get/width/600/crop/400/noanimate/{URL}`

### dane.gov.pl — Add-on prawny
- Automatyczne raportowanie cen ofertowych
- Zgodność z art. 19b ustawy deweloperskiej

---

## 6. Struktura plików

```
konfigurator-app/
├── src/
│   ├── App.jsx                    # Główny komponent, stan, nawigacja
│   ├── App.css                    # Style globalne (Pure CSS)
│   ├── components/
│   │   ├── ProgressBar.jsx        # Pasek postępu (kroki 2–9)
│   │   ├── AnimatedBackground.jsx # Animowane romby tła
│   │   ├── CardOption.jsx         # Karta wyboru (reużywalna)
│   │   ├── NavigationButtons.jsx  # Przyciski Wstecz/Dalej
│   │   └── steps/
│   │       ├── Step1Start.jsx
│   │       ├── Step2Inwestycja.jsx
│   │       ├── Step3Strona.jsx
│   │       ├── Step4Identyfikacja.jsx
│   │       ├── Step5Domena.jsx
│   │       ├── Step6Styl.jsx
│   │       ├── Step7Wizualizacje.jsx
│   │       ├── Step8Wybor.jsx
│   │       ├── Step9Podsumowanie.jsx
│   │       └── Step10Platnosc.jsx
│   ├── data/
│   │   └── config.js              # Opcje, logika rekomendacji, walidacja
│   └── utils/
│       └── sendNotification.js    # Integracja webhook n8n
├── public/                        # Zasoby statyczne
├── dist/                          # Build produkcyjny (wgrywany na serwer)
├── vite.config.js
└── package.json
```

---

## 7. Wdrożenie na serwer (workflow)

### Jednorazowa konfiguracja
1. FileZilla → połącz z `s22.cyberfolks.pl` (login: `konfigurator@twistedpixel.pl`)
2. Nawiguj do `/domains/twistedpixel.pl/public_html/konfigurator/`

### Przy każdej aktualizacji
```bash
# 1. Lokalnie — zbuduj aplikację
cd konfigurator-app
npm run build

# 2. W FileZilla — wgraj zawartość dist/ na serwer:
#    - index.html (podmień)
#    - .htaccess (podmień)
#    - assets/ (podmień całą zawartość folderu)
```

### Struktura na serwerze
```
public_html/konfigurator/
├── .htaccess      ← obsługa React Router (SPA)
├── index.html     ← główny plik aplikacji
└── assets/
    ├── index-XXXXX.js   ← bundlowany JavaScript
    └── index-XXXXX.css  ← bundlowane style
```

---

## 8. Kolory marki Twisted Pixel

| Kolor | Hex | Zastosowanie |
|---|---|---|
| Purple primary | `#5B21B6` | Główny kolor marki |
| Purple dark | `#4C1D95` | Hover, akcenty |
| Purple light | `#EDE9FE` | Tła, karty |
| Orange CTA | `#F97316` | Przyciski akcji |

---

## 9. TODO / Przyszłe usprawnienia

- [ ] Uzupełnić kod afiliacyjny Cyberfolks (`CYBERFOLKS_REF` w Step5Domena.jsx)
- [ ] Uzupełnić numer telefonu biura (`PHONE_NUMBER` w sendNotification.js)
- [ ] Dodać informację w UI o limicie rozmiaru plików (3 MB logo, 5 MB wizualizacje)
- [ ] Dodać Google Analytics / pixel Meta dla śledzenia konwersji
- [ ] Rozważyć integrację z CRM (np. HubSpot, Pipedrive)

---

*Dokument przygotowany przez Claude Code — Marzec 2026*
