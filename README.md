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

Demo: https://malinaceramik-debug.github.io/malina-ceramik-demo/

Każda zmiana wysłana do gałęzi `main` zostanie automatycznie opublikowana
przez GitHub Pages.

W tej wersji dane są demonstracyjne i zapisują się wyłącznie w przeglądarce
osoby testującej. Zmiany wykonane przez jednego instruktora nie są jeszcze
widoczne u pozostałych osób.

## Pilot dla instruktorów

Na gałęzi `codex/live-instructor-pilot` znajduje się wersja podłączona do
Firebase:

- prawdziwe logowanie e-mail i hasłem,
- wspólna baza Firestore w regionie Warszawa,
- zdjęcia przygotowywane do wysłania do Cloud Storage,
- powiadomienia wewnątrz aplikacji i obsługa Web Push,
- dostęp ograniczony serwerowo do zatwierdzonych adresów instruktorów.

Pilot: https://malina-ceramik-pilot-2026.web.app/

Instrukcja konfiguracji i wdrożenia znajduje się w `LIVE_PILOT.md`.
