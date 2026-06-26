# Wersje logiki

Ten folder przechowuje opisowe wersje logiki aplikacji.

Git przechowuje dokladny kod, ale te pliki maja przechowywac sens decyzji:

- dlaczego dana logika istnieje,
- jaki problem rozwiazuje,
- co moze sie zepsuc po jej zmianie,
- do czego wracamy, jezeli nowa wersja nie dziala.

## Jak dodajemy nowa wersje logiki

1. Kopiujemy `TEMPLATE-zmiana-logiki.md`.
2. Nadajemy nazwe:

```text
YYYY-MM-DD-vN-krotki-opis.md
```

3. Opisujemy:

```text
co zmieniamy
dlaczego
jak bylo przed zmiana
jak ma byc po zmianie
jak testujemy
jak wracamy, jezeli cos sie popsuje
```

## Zasada

Zmiana logiki bez wpisu tutaj jest ryzykowna.

Male poprawki wizualne nie musza miec pelnego opisu, ale kazda zmiana, ktora
dotyka statusow, zdjec, wlascicieli, powiadomien, rozliczen albo synchronizacji,
powinna miec swoj wpis.

