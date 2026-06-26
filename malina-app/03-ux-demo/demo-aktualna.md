# Demo aktualnej wersji

Cel: miec bezpieczny podglad aktualnego zachowania aplikacji bez prawdziwych danych.

## Jak uruchamiac

Wersja live z parametrem demo:

```text
https://malina-ceramik-pilot-2026.web.app/?demo
```

Tryb lokalny:

```powershell
python -m http.server 4173
```

Potem:

```text
http://localhost:4173/?demo
```

## Do czego sluzy

```text
sprawdzenie, czy widoki sie renderuja
sprawdzenie UX bez logowania
sprawdzenie mobilnego ukladu
porownanie przed / po zmianie
```

## Czego nie sprawdza

```text
prawdziwego uploadu zdjec do Storage
prawdziwego logowania Firebase
prawdziwych powiadomien
konfliktow kilku instruktorow
```

Do tych rzeczy potrzebny jest pilot live.

