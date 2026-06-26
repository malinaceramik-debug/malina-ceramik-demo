# Logika zdjec

Zdjecie jest cyfrowa etykieta wyrobu.

Nie dokladamy papierowych numerow ani QR przy kazdej ceramice, bo to wydluza
proces w pracowni. Dlatego zdjecie przejmuje trzy funkcje:

```text
identyfikacja
  -> czyj to wyrob
  -> co dokladnie zostalo przyniesione

komunikacja
  -> instruktor widzi to samo, co kursant zatwierdzil
  -> kursant rozumie, dlaczego zdjecie musi byc czytelne

historia
  -> kiedy dodano
  -> kiedy wypalono
  -> kiedy odebrano
  -> jaki byl efekt finalny
```

## Cykl zycia zdjecia

```text
1. Uzytkownik robi / wybiera zdjecie
2. Aplikacja pokazuje lokalny podglad
3. Uzytkownik usuwa zle zdjecia
4. Uzytkownik oznacza biskwit / na ostro
5. Po kliknieciu "wyslij" zdjecie idzie do Firebase Storage
6. Baza zapisuje trwaly URL zdjecia
7. Wyrob dostaje status i wlasciciela
```

Warunek krytyczny:

```text
Do bazy nie zapisujemy `blob:` ani tymczasowego podgladu.
Do bazy zapisujemy tylko trwaly link do zdjecia.
```

## Oznaczenia wizualne

```text
Biskwit
  -> cieple, bezowe podswietlenie
  -> subtelny gradient / znacznik

Na ostro
  -> cieple czerwono-pomaranczowe podswietlenie
  -> subtelny gradient od dolu

Czeka na wypal
  -> wyrob jest w kolejce

Gotowe do odbioru
  -> wyrob zostal wypalony
  -> wlasciciel powinien dostac powiadomienie

Odebrane
  -> spokojniejszy status archiwalny
```

## Zdjecie przed wypalem i po wypale

```text
Zdjecie przed wypalem
  -> identyfikuje wyrob w kolejce
  -> pomaga instruktorowi znalezc ceramike
  -> jest dowodem, co zostalo zostawione

Zdjecie po wypale
  -> pokazuje finalny efekt
  -> moze stac sie glownym zdjeciem w dzienniku
  -> pomaga katalogowac kombinacje szkliw i gliny
```

## Dlaczego zdjecia nie moga znikac

Jezeli zdjecie znika:

```text
instruktor nie wie, co jest czyje
kursant traci pewnosc, co zostawil
nie da sie sprawdzic, czy wszystko odebrano
nie da sie prowadzic dziennika kombinacji
nie da sie zaufac aplikacji
```

Dlatego zdjecia sa jednym z fundamentow systemu.

## Aktualna stabilizacja

Od wersji logiki `2026-06-26-v1-pilot-live`:

```text
zdjecie lokalne -> upload do Storage -> trwaly URL -> zapis wyrobu
```

Dodatkowo zapis stanu jest scalany transakcyjnie w Firebase, zeby jedno
urzadzenie nie nadpisywalo wyrobow dodanych przez inne urzadzenie.

