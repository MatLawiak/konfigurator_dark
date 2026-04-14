# Skrypt pytań i logika konfiguratora – Twisted Pixel

---

## KROK 1 — Start (ekran powitalny)

> Sprawdź czego potrzebuje **Twoja inwestycja** deweloperska

Odpowiedz na kilka pytań, a przygotujemy dla Ciebie spersonalizowaną rekomendację strony internetowej i pakietu usług marketingowych.

- Zajmuje 3 minuty
- Spersonalizowane rekomendacje
- Gotowe podsumowanie

**[Rozpocznij konfigurację]**

---

## KROK 2 — Inwestycja *(Krok 1 z 8)*

### Pytanie 1: Czy posiadasz już inwestycję deweloperską?

| Opcja | Opis |
|---|---|
| Tak – inwestycja jest w trakcie realizacji | Budowa trwa, potrzebuję marketingu już teraz |
| Tak – inwestycja jest na etapie planowania | Mam projekt, zaczynam przygotowania |

*Pole wymagane*

### Pytanie 2: Jak nazywa się inwestycja?

Pole tekstowe (opcjonalne) — np. *Zielone Wzgórza, Apartamenty Nova*

### Pytanie 3: Jaki typ inwestycji realizujesz?

| Opcja | Opis |
|---|---|
| Inwestycja mieszkaniowa | Osiedla, bloki, kamienice — sprzedaż/wynajem dla osób prywatnych |
| Domy jednorodzinne | Wolnostojące, szeregowce, bliźniaki |
| Apartamenty / lokale inwestycyjne | Wynajem krótko- lub długoterminowy, dochód pasywny |
| Inwestycje o podwyższonym standardzie | Premium — wysoka jakość, prestiżowa lokalizacja |
| Mixed-use | Funkcja mieszkalna + komercyjna (usługi, biura, handel) |

*Pole wymagane*

---

## KROK 3 — Strona *(Krok 2 z 8)*

### Pytanie: Czy Twoja inwestycja posiada stronę internetową?

| Opcja | Opis |
|---|---|
| Chcę ulepszyć / poprawić / rozbudować aktualną stronę | Masz stronę, ale wymaga odświeżenia lub dodania funkcji |
| Potrzebuję nowej strony | Brak strony lub zaczynasz od zera |

> **Logika warunkowa:** Jeśli użytkownik wybierze *"mam stronę / chcę ulepszyć"* → kroki 5 (Domena) i 6 (Styl) są **pomijane**.

---

## KROK 4 — Branding *(Krok 3 z 8)*

### Pytanie 1: Czy inwestycja posiada logo?

| Opcja |
|---|
| Tak, mam logo |
| Nie mam logo |

### Pytanie 2: Czy posiadasz identyfikację wizualną?

| Opcja | Opis |
|---|---|
| Tak, mam gotową księgę znaków | Paleta kolorów, czcionki, elementy wizualne |
| Mam tylko część — logo lub kolory | Coś jest, ale brak kompletnej identyfikacji |
| Nie — zaczniemy od zera | Brak jakichkolwiek elementów wizualnych |

### Pytanie 3: Czy posiadasz materiały marketingowe?

| Opcja |
|---|
| Tak, mam materiały |
| Nie mam materiałów |

---

## KROK 5 — Domena *(Krok 4 z 8)*

> Pomijany jeśli użytkownik ma już stronę (krok 3 = "chcę ulepszyć")

### Pytanie: Czy inwestycja posiada własną domenę?

| Opcja | Opis |
|---|---|
| Tak, mam domenę | Zarejestrowana i gotowa do użycia |
| Nie mam domeny | Trzeba zarejestrować domenę |
| Nie wiem | Nie jestem pewien |

---

## KROK 6 — Styl *(Krok 5 z 8)*

> Pomijany jeśli użytkownik ma już stronę (krok 3 = "chcę ulepszyć")

### Pytanie: Jaki styl wizualny najlepiej opisuje Twoją inwestycję?

| Opcja | Opis |
|---|---|
| Nowoczesny minimalizm | Czyste linie, przestrzeń, elegancja |
| Luksusowy premium | Ciemne tła, ekskluzywny charakter |
| Sprzedażowy | Skupiony na konwersji i leadach |
| Architektoniczny | Duże zdjęcia, rzuty, technika |

---

## KROK 7 — Wizualizacje *(Krok 6 z 8)*

### Pytanie: Czy posiadasz wizualizacje architektoniczne 3D?

| Opcja | Opis |
|---|---|
| Tak, mam wizualizacje | Gotowe renderingi 3D lub fotografie |
| Nie mam wizualizacji | Brak wizualizacji architektonicznych |
| Są w trakcie przygotowania | Zlecone lub w trakcie tworzenia |

---

## KROK 8 — Szablon *(Krok 7 z 8)*

### Pytanie: Który styl strony najbardziej Ci odpowiada?

| Szablon | Styl | Przykład |
|---|---|---|
| Malta View | Luksusowy premium | maltaview.pl |
| Ogrody Potasze | Nowoczesny minimalizm | ogrodypotasze.pl |
| AT-Inwest | Sprzedażowy | at-inwest.pl |
| ArtBud Group | Architektoniczny | artbudgroup.pl |

---

## KROK 9 — Podsumowanie *(Krok 8 z 8)*

### Logika doboru pakietu

| Warunek | Rekomendowany pakiet |
|---|---|
| Brak identyfikacji wizualnej (`maIdentyfikacje = 'nie'`) | **Premium** (9 999 PLN) |
| Brak wizualizacji LUB potrzeba automatyzacji dane.gov.pl | **Standard** (7 499 PLN) |
| Wszystko gotowe — potrzebna tylko strona | **Starter** (5 999 PLN) |

### Pakiety

| | Starter 5 999 PLN | Standard 7 499 PLN | Premium 9 999 PLN |
|---|---|---|---|
| Strona sprzedażowa | ✓ | ✓ | ✓ |
| Wizualizacje | 1 zewnątrz + 1 wewnątrz | 4 szt. | do 8 szt. |
| Animacje video | — | — | 2 szt. |
| Identyfikacja wizualna / księga znaków | — | — | ✓ |
| CMS (edycja treści i cen) | ✓ | ✓ | ✓ |
| Tabela cen lokali (ustawa deweloperska) | ✓ | ✓ | ✓ |
| Automatyzacja dane.gov.pl | — | ✓ | ✓ (pełna) |
| Analityka GA4 | — | podstawowa | rozbudowana + konwersje |
| Rejestracja i konfiguracja domeny | ✓ | ✓ | ✓ |

### Dodatki (poza pakietem)

| Dodatek | Cena |
|---|---|
| Automatyzacja dane.gov.pl | 3 000 PLN |
| Wizualizacja architektoniczna 3D | 999 PLN / szt. |
| Animacja video z wizualizacji | 750 PLN / szt. |
| Księga znaków / identyfikacja wizualna | 2 999 PLN |

### Logika sugerowanych dodatków

- Pakiet Starter + potrzeba automatyzacji → sugeruj dodatek *Automatyzacja dane.gov.pl*
- Brak wizualizacji + pakiet inny niż Premium → sugeruj *Wizualizacja 3D*
- Identyfikacja częściowa lub brak (poza Premium) → sugeruj *Księga znaków*

---

## KROK 10 — Gotowe

Potwierdzenie wyboru pakietu, dane kontaktowe, finalizacja zamówienia.

---

## Mapa przepływu (Flow)

```
[Start]
   |
[Krok 2: Inwestycja]
   | statusInwestycji + typInwestycji
   |
[Krok 3: Strona]
   | maStrone = 'tak' ──────────────────────┐
   | maStrone = 'nie'                        |
   |                                         |
[Krok 4: Branding]                  [Krok 4: Branding]
   | maLogo, maIdentyfikacje                 | maLogo, maIdentyfikacje
   |                                         |
[Krok 5: Domena]                    [Krok 7: Wizualizacje] ← pominięcie kroków 5 i 6
   | maDomene                                |
   |                                         |
[Krok 6: Styl]                      [Krok 8: Szablon]
   | stylStrony                              |
   |                                         |
[Krok 7: Wizualizacje] ◄────────────────────┘
   | maWizualizacje
   |
[Krok 8: Szablon]
   | wybranaStrona
   |
[Krok 9: Podsumowanie + rekomendacja pakietu]
   |
[Krok 10: Gotowe / zamówienie]
```
