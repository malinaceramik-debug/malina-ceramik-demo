# Malina ceramik studio ceramiki - prototyp PWA

Pierwsza interaktywna wersja systemu obiegu ceramiki. Działa lokalnie na danych demonstracyjnych i zapisuje zmiany w `localStorage`.

## Uruchomienie

W katalogu projektu uruchom prosty serwer HTTP, na przykład:

```powershell
python -m http.server 4173
```

Następnie otwórz `http://localhost:4173`.

## Co można przetestować

- przełączanie widoku kursanta i instruktora,
- dodawanie wielu zdjęć w ramach jednej dostawy,
- zbiorczy podgląd zdjęć z perspektywy instruktora,
- oznaczanie pojedynczych sztuk jako biskwit lub na ostro,
- filtrowanie osobistej galerii,
- filtrowanie i zaznaczanie wielu wyrobów przez instruktora,
- oznaczanie wybranych sztuk jako wypalone,
- automatyczne przeliczanie wagi i ceny,
- lokalną historię rozliczeń,
- responsywny interfejs telefonu i komputera,
- instalowalność PWA oraz podstawowy tryb offline.

Backend, prawdziwe konta, wysyłka powiadomień i synchronizacja z Arkuszami Google nie są jeszcze podłączone.

## Wersja internetowa

Demo jest przygotowane do automatycznej publikacji przez GitHub Pages.
Po utworzeniu repozytorium każda zmiana wysłana do gałęzi `main` zostanie
automatycznie opublikowana.

W tej wersji dane są demonstracyjne i zapisują się wyłącznie w przeglądarce
osoby testującej. Zmiany wykonane przez jednego instruktora nie są jeszcze
widoczne u pozostałych osób.
