# 📋 Notatka dla Claude Code — Integracja dane.gov.pl w konfiguratorze TwistedPixel

## 🎯 Cel zadania

W konfiguratorze stron internetowych TwistedPixel (przeznaczonym dla deweloperów nieruchomości) należy dodać **dwa powiązane elementy**:

1. **Sekcję informacyjną** — wyjaśniającą obowiązek prawny i dlaczego strona stworzona przez konfigurator TwistedPixel zapewnia zgodność z ustawą
2. **Opcjonalny moduł** — automatyczne przesyłanie danych cenowych do dane.gov.pl jako dodatkowa funkcja (add-on) przy tworzeniu strony

---

## ⚖️ Kontekst prawny — co deweloper musi wiedzieć

### Podstawa prawna
Obowiązek wynika z **art. 19b ust. 1 Ustawy z dnia 20 maja 2021 r. o ochronie praw nabywcy lokalu mieszkalnego lub domu jednorodzinnego oraz Deweloperskim Funduszu Gwarancyjnym** (tzw. nowa ustawa deweloperska).

### Co dokładnie nakazuje ustawa?
- Każdy deweloper prowadzący sprzedaż mieszkań **musi codziennie publikować aktualne ceny ofertowe** w portalu dane.gov.pl
- Obowiązek dotyczy **wszystkich podmiotów prowadzących działalność deweloperską**, bez względu na skalę działalności (nawet osoby prywatne sprzedające flipy)
- Dane muszą być dostępne publicznie pod stałym adresem URL w formacie CSV lub XML
- Plik musi być **codziennie aktualizowany** (updateFrequency = daily)

### Co grozi za brak zgodności?
- Konsekwencje prawne wynikające z nieprzestrzegania przepisów ustawy
- Potencjalne problemy z organami nadzoru rynku nieruchomości

---

## 🏗️ Co konfigurator TwistedPixel zapewnia (gwarancja zgodności)

Strona stworzona przez konfigurator TwistedPixel automatycznie spełnia wymogi techniczne ustawy, ponieważ:

### 1. Hosting pliku cennika pod stałym URL
- Strona dewelopera hostuje plik z cenami pod przewidywalnym, stałym adresem:
  ```
  https://strona-dewelopera.com.pl/Ceny-ofertowe-mieszkan-{nazwa-dewelopera}-{YYYY-MM-DD}.csv
  ```
- Adres URL jest dostępny publicznie i nie wymaga logowania — zgodnie z wymogami dane.gov.pl

### 2. Format pliku zgodny ze schematem ministerialnym
- Generowany plik CSV zawiera wymagane kolumny zgodne ze wzorcowym zakresem danych cen mieszkań (plik wzorcowy: `Wzorcowy_zakres_danych_dotyczących_cen_mieszkań.xlsx`)
- Wymagane pola: cena ofertowa, powierzchnia, adres, standard, piętro, liczba pokoi, data aktualizacji itd.

### 3. Infrastruktura gotowa do automatycznego zasilania XML
- Serwer strony obsługuje wymaganie hostowania plików `.xml` i `.md5`
- Plik XML tworzony jest zgodnie ze schematem XSD: `https://www.dane.gov.pl/static/xml/otwarte_dane_latest.xsd`
- Generowana jest suma kontrolna MD5 pliku XML

---

## 🔧 Moduł dodatkowy — automatyczne przesyłanie do dane.gov.pl

### Co to jest i jak działa?

To opcjonalna funkcja (add-on) dostępna przy konfiguracji strony. Po włączeniu:

1. **Codziennie o ustalonej godzinie** system automatycznie generuje aktualny plik CSV/XML z cenami mieszkań na podstawie danych wprowadzonych przez dewelopera do panelu strony
2. **Plik jest publikowany** pod stałym adresem URL na serwerze strony
3. **Plik XML i plik .md5** są dostępne do pobrania przez portal dane.gov.pl (Importer XML)
4. **Deweloper nie musi nic robić ręcznie** — wystarczy jednorazowa rejestracja i wysłanie wniosku do portalu (patrz: kroki poniżej)

### Wymagania do jednorazowej konfiguracji przez klienta

Claude Code musi uwzględnić w interfejsie konfiguratorze formularz/checklist z następującymi informacjami do uzupełnienia przez dewelopera (potrzebne do rejestracji w dane.gov.pl):

```
DANE DOSTAWCY (do wniosku kontakt@dane.gov.pl):
- Imię i nazwisko osoby zgłaszającej
- Nazwa firmy / dostawcy
- NIP firmy
- Adres e-mail do korespondencji
- Adres URL pliku XML na serwerze strony
- Adres URL pliku .md5 na serwerze strony

DANE DO KONFIGURACJI XML (wypełniane raz, w panelu):
- extIdent: unikalny 36-znakowy identyfikator zbioru danych (np. UUID)
- Nazwa dewelopera (do tytułu zbioru)
- Opis inwestycji (po polsku i angielsku)
- Kategoria tematyczna: Nieruchomości / Real Estate
- Licencja: Creative Commons Zero (CC0)
- hasHighValueData: true
- hasResearchData: false
- containsProtectedData: false
- updateFrequency: daily
- status: published
```

### Kroki które deweloper musi wykonać JEDNORAZOWO (powinny być wyjaśnione w UI)

**Krok 1** — Zarejestrować konto na dane.gov.pl i złożyć wniosek o profil dostawcy danych  
**Krok 2** — Wysłać e-mail na `kontakt@dane.gov.pl` z wnioskiem o automatyczne zasilanie, podając URL pliku XML i .md5 ze swojej strony (wygenerowanej przez TwistedPixel)  
**Krok 3** — Po aktywacji przez administratora portalu dane.gov.pl — system działa w pełni automatycznie

---

## 📐 Wytyczne UX/UI dla konfiguratorze

### Gdzie umieścić sekcję informacyjną?

Sekcja powinna pojawić się w konfiguratorze jako **krok lub panel** w jednym z tych miejsc:
- Podczas wyboru branży/typu strony → gdy użytkownik wybierze "Deweloper / Nieruchomości"
- W sekcji "Funkcje dodatkowe" lub "Zgodność z przepisami"

### Co powinna zawierać sekcja informacyjna (treść komunikatu dla klienta)

```
🏛️ OBOWIĄZEK PRAWNY DLA DEWELOPERÓW

Od 2025 roku każdy deweloper musi codziennie publikować 
aktualne ceny ofertowe mieszkań w portalu dane.gov.pl 
(art. 19b ustawy deweloperskiej z 20.05.2021).

✅ Strona stworzona przez TwistedPixel:
• Jest hostowana z publicznym adresem URL do pliku cennika
• Generuje plik w formacie zgodnym z wymogami ministerstwa
• Obsługuje automatyczne zasilanie Importerem XML
• Zapewnia codzienną aktualizację bez Twojego udziału

➕ OPCJA DODATKOWA: Automatyczne raportowanie do dane.gov.pl
Włącz tę opcję, a my zajmiemy się całą techniczną stroną 
obowiązku. Ty tylko raz rejestrujesz się w portalu — 
resztą zajmuje się nasz system.

[WŁĄCZ AUTOMATYCZNE RAPORTOWANIE] [Dowiedz się więcej]
```

### Tone of Voice — jak pisać o tym obowiązku w konfiguratorze?

- **Edukacyjny, nie straszący** — wyjaśniaj korzyść ("masz to z głowy"), nie groź karami
- **Konkretny** — podaj art. ustawy, żeby budować wiarygodność
- **Rozwiązaniowy** — zawsze przy problemie pokaż gotowe rozwiązanie

---

## 🗂️ Struktura pliku XML — kluczowe pola techniczne

Plik XML generowany przez system TwistedPixel musi być zgodny ze schematem XSD `otwarte_dane_latest.xsd`. Kluczowe pola na poziomie `<dataset>`:

| Pole XML | Wartość dla deweloperów |
|---|---|
| `<tags>` | Deweloper |
| `<updateFrequency>` | daily |
| `<hasDynamicData>` | false |
| `<hasHighValueData>` | true |
| `<hasResearchData>` | false |
| `<containsProtectedData>` | false |
| `<status>` | published |
| `<extIdent>` | Unikalny 36-znakowy ID (np. UUID v4) |
| `<url>` | Publiczny URL do pliku CSV z cenami |

Pola tytułu i opisu wymagane w **dwóch językach** (polskim i angielskim):
- `<title><polish>` / `<title><english>`
- `<description><polish>` / `<description><english>`

---

## 📁 Pliki referencyjne w projekcie

Przy implementacji warto zajrzeć do tych plików w projekcie:

| Plik | Co zawiera |
|---|---|
| `dane.gov.pl_instrukcja_zasilania_XML_dla_deweloperów_1.0.5_20250929.pdf` | Pełna spec techniczna XML z polami i typami danych |
| `Przewodnik_automatycznego_zasilania_danych_xml.pdf` | Krok po kroku: jak działa Importer XML |
| `Instrukcja_udost__danych_w_portalu_dane_gov_pl_z_wykorzystaniem_panelu_adm_1_0_2.pdf` | Instrukcja rejestracji konta dostawcy |
| `Wzorcowy_zakres_danych_dotyczących_cen_mieszkań.xlsx` | Wzorcowe kolumny pliku CSV z cenami |
| `Przykład_3_kolejne_publikacje_v_1_13_21_08_2025.xml` | Przykładowy plik XML do zaimportowania |
| `Szablon_budowy_pliku_xml_v_1_13_21_08_2025.xml` | Szablon XML do generowania pliku |
| `generuj_csv_-_node.txt` | Istniejący skrypt Node.js do generowania CSV |
| `upload.php` / `upload2.php` | Istniejące skrypty PHP do przesyłania danych |

---

## ✅ Checklist dla Claude Code — co zaimplementować

- [ ] Sekcja informacyjna w konfiguratorze (pojawia się gdy branża = nieruchomości/deweloper)
- [ ] Wyjaśnienie podstawy prawnej (art. 19b ustawy deweloperskiej)
- [ ] Lista gwarancji technicznych zapewnianej przez TwistedPixel
- [ ] Toggle/checkbox "Włącz automatyczne raportowanie do dane.gov.pl"
- [ ] Po włączeniu: formularz z polami konfiguracyjnymi (extIdent, dane firmy, URL)
- [ ] Instrukcja jednorazowych kroków do wykonania przez klienta (rejestracja w portalu)
- [ ] Informacja o adresie e-mail: `kontakt@dane.gov.pl` i co zawrzeć we wniosku
- [ ] Generowanie pliku XML zgodnego ze schematem (użyj szablonu z projektu)
- [ ] Generowanie sumy kontrolnej MD5 dla pliku XML
- [ ] Codzienne automatyczne odświeżanie pliku CSV/XML (cron job lub scheduler)
- [ ] Publiczny endpoint (URL) na serwerze strony dla pliku z cenami

---

*Notatka przygotowana na podstawie dokumentacji dane.gov.pl oraz koncepcji kampanii TwistedPixel — Twisted Pixel Agency, marzec 2026*
