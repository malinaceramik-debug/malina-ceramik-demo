# Zasady pracy nad aplikacja

## 1. Nie zmieniamy wszystkiego naraz

Kazda zmiana powinna nalezec do jednej kategorii:

```text
UX/UI
logika statusow
logika zdjec
logika wlascicieli
powiadomienia
rozliczenia
Firebase / synchronizacja
aplikacje mobilne
```

Jezeli zmiana dotyka kilku kategorii, najpierw ja rozbijamy.

## 2. Demo przed live

UX/UI:

```text
demo robocza -> klikamy -> poprawiamy -> zatwierdzamy -> live
```

Logika:

```text
opis wersji logiki -> implementacja -> test lokalny -> test live -> commit
```

## 3. Jedna prawda dla kodu

Nie robimy drugiej kopii `app.js`.

Zamiast tego:

```text
git branch
wersja demo przez parametr
folder dokumentacji
opis wersji logiki
commit jako punkt powrotu
```

## 4. Wydzielanie logiki

Obecnie duzo logiki jest w `app.js`. To bylo szybkie na etapie demo, ale robi sie
ryzykowne.

Docelowy podzial:

```text
state/
  -> stan aplikacji
  -> synchronizacja

images/
  -> przygotowanie zdjec
  -> upload
  -> finalne zdjecia

items/
  -> statusy wyrobow
  -> wlasciciele
  -> historia

roles/
  -> kursant
  -> instruktor
  -> gosc

billing/
  -> wypaly
  -> co-work

catalog/
  -> kombinacje
  -> fasolki
  -> biblioteka

ui/
  -> renderowanie widokow
  -> modale
  -> interakcje
```

## 5. Przed kazdym wdrozeniem live

Minimum:

```text
node --check app.js
node --check backend.js
git diff --check
```

Po wdrozeniu:

```text
sprawdzic app.js na hostingu
sprawdzic sw.js / cache version
sprawdzic dodanie zdjecia na telefonie
sprawdzic widok instruktora
```

## 6. Czego pilnujemy najbardziej

```text
zdjecia nie znikaja
wyroby nie znikaja
wlasciciel jest poprawny
status jest poprawny
instruktor widzi kolejke
kursant widzi swoje rzeczy
gosc widzi tylko swoje rzeczy
rozliczenie liczy poprawnie
demo dziala niezaleznie od live
```

