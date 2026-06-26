# Malina Ceramik - mapa aplikacji

Ten folder jest centrum prowadzenia projektu. Nie jest druga kopia kodu aplikacji.
Kod produkcyjny nadal mieszka w katalogu glownym repozytorium: `app.js`,
`backend.js`, `styles.css`, `index.html`, `sw.js`, `firebase.json`, `firestore.rules`
i `storage.rules`.

Celem tego folderu jest trzymanie wspolnej pamieci projektu:

- jaka jest logika aplikacji,
- jakie role istnieja w systemie,
- co dzieje sie ze zdjeciami,
- jakie statusy ma ceramika,
- jakie decyzje projektowe juz podjelismy,
- jak pracujemy na wersji demo,
- jak oddzielamy logike od wygladu,
- jak wracamy do poprzednich wersji logiki, gdy cos przestaje dzialac.

## Struktura

```text
malina-app/
  00-mapa/
    pliki-zrodlowe.md
  01-logika/
    README.md
    procesy.md
    role-i-uprawnienia.md
    zdjecia.md
  02-wersje-logiki/
    README.md
    2026-06-26-v1-pilot-live.md
    TEMPLATE-zmiana-logiki.md
  03-ux-demo/
    README.md
    demo-aktualna.md
    demo-robocza.md
  04-styl/
    README.md
    zasady-i-slogany.md
    inspiracje.md
  05-aplikacje/
    README.md
  06-zasady-pracy/
    README.md
```

## Najwazniejsza zasada

Nie budujemy nowych funkcji na niepewnej logice.

Najpierw:

```text
pomysl -> demo -> test zachowania -> decyzja -> wdrozenie live -> stabilizacja
```

Dopiero potem dokladamy nastepna warstwe.

## Definicja aplikacji

Malina Ceramik Studio Ceramiki to system pamieci pracowni:

```text
co zostalo przyniesione,
co zostalo wypalone,
co trzeba odebrac,
ile kosztuje,
jak zostalo zrobione,
i co mozna z tej wiedzy wykorzystac nastepnym razem.
```

