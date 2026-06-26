# Procesy aplikacji

## 1. Dodanie ceramiki

```text
Uzytkownik wybiera: dodaj ceramike
  -> robi zdjecie albo wybiera z galerii
  -> widzi podglad
  -> usuwa zle zdjecia
  -> oznacza biskwit / na ostro
  -> klika wyslij
  -> aplikacja zapisuje zdjecia w Firebase Storage
  -> aplikacja zapisuje wyroby w bazie
  -> wyroby pojawiaja sie w odpowiedniej galerii
```

Warunek krytyczny:

```text
Nie tworzymy wyrobu w bazie, jezeli zdjecie nie zostalo zapisane trwale.
```

## 2. Kolejka do wypalu

```text
Instruktor otwiera Do wypalu
  -> widzi czekaja na biskwit
  -> widzi czekaja na ostro
  -> moze filtrowac po statusie i rodzaju wypalu
  -> moze zaznaczyc wiele zdjec
  -> moze otworzyc podglad pojedynczego wyrobu
```

## 3. Oznaczenie wypalu

```text
Instruktor zaznacza wyroby z pieca
  -> potwierdza wypal
  -> status zmienia sie na gotowe do odbioru
  -> zapisuje sie data wypalu
  -> wlasciciel dostaje powiadomienie
  -> wyrob znika z kolejki do wypalu
  -> wyrob trafia do gotowych do odbioru
```

## 4. Odbior ceramiki

```text
Kursant / gosc przychodzi po odbior
  -> instruktor porownuje zdjecia
  -> ceramika jest wazona
  -> rozdzielamy biskwit i na ostro
  -> aplikacja liczy kwote
  -> instruktor oznacza wyroby jako odebrane
  -> wyroby trafiaja do historii
```

Do doprecyzowania w kolejnej wersji:

```text
Czy oznaczenie "odebrane" robi instruktor recznie,
czy jest polaczone z zapisaniem rozliczenia?
```

## 5. Zdjecie finalne po wypale

```text
Wyrob jest gotowy albo odebrany
  -> wlasciciel moze dodac zdjecie finalne
  -> zdjecie finalne moze stac sie glownym zdjeciem w dzienniku
  -> zdjecie przed wypalem zostaje w historii
```

## 6. Dziennik / kombinacje

```text
Uzytkownik otwiera swoje kombinacje
  -> wybiera wyrob
  -> dodaje fasolki: glina, szkliwa, farby, temperatura
  -> dodaje notatke
  -> moze udostepnic kombinacje pracowni
```

## 7. Wspolna biblioteka kombinacji

```text
Uzytkownik otwiera biblioteke
  -> wybiera marke szkliwa
  -> wybiera konkretny model szkliwa
  -> wybiera marke gliny
  -> wybiera konkretny typ gliny
  -> widzi wyroby pasujace do kombinacji
```

## 8. Rozliczenia

```text
Wypaly:
  biskwit = 22 zl/kg
  na ostro = 35 zl/kg

Co-work:
  55 zl/h
  czas wpisujemy w godzinach i minutach
  zaokraglamy w dol do pelnych 5 minut
```

Zasada komunikacyjna:

```text
Zaokraglamy w dol, zeby kursant mial mile poczucie uczciwego rozliczenia.
```

