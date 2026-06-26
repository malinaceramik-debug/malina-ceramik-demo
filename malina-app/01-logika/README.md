# Logika aplikacji

Ta sekcja opisuje zachowanie systemu niezaleznie od tego, jak wyglada interfejs.

## Glowne moduly logiki

```text
Role uzytkownikow
  -> kursant
  -> instruktor
  -> gosc

Obieg ceramiki
  -> dodana
  -> czeka na wypal
  -> gotowa do odbioru
  -> odebrana

Rodzaj wypalu
  -> biskwit
  -> na ostro

Zdjecia
  -> podglad lokalny
  -> zapis trwaly w Storage
  -> przypisanie do wyrobu
  -> zdjecie finalne po wypale

Powiadomienia
  -> wewnatrz aplikacji
  -> docelowo e-mail / push / SMS

Rozliczenia
  -> kg biskwit
  -> kg na ostro
  -> co-work godziny/minuty

Dziennik i kombinacje
  -> glina
  -> szkliwa
  -> farby
  -> temperatura
  -> notatka
  -> udostepnienie pracowni
```

## Zasada nadrzedna

Interfejs ma byc prosty, ale logika pod spodem musi byc precyzyjna.

Uzytkownik widzi:

```text
zdjecie -> status -> akcja
```

System pod spodem pilnuje:

```text
wlasciciel -> historia -> zapis zdjec -> synchronizacja -> uprawnienia
```

