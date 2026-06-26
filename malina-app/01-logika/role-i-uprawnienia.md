# Role i uprawnienia

## Kursant

Kursant to staly uzytkownik pracowni.

Widoki i akcje:

```text
Poczatek
  -> szybki stan ceramiki
  -> przejscie do galerii

Moje wyroby
  -> wszystkie
  -> czekaja
  -> gotowe do odbioru
  -> odebrane

Moje kombinacje
  -> dziennik wyrobow
  -> zdjecia finalne
  -> fasolki: glina, szkliwa, farby, temperatura
  -> udostepnianie kombinacji pracowni

Wspolna biblioteka
  -> podglad inspiracji i kombinacji innych osob

Powiadomienia
  -> ceramika wypalona
  -> przypomnienia o odbiorze
```

Proces kursanta:

```text
dodaje zdjecia
  -> oznacza biskwit / na ostro
  -> czeka na wypal
  -> dostaje powiadomienie
  -> odbiera
  -> dodaje finalne zdjecie
  -> kataloguje kombinacje
```

## Instruktor

Instruktor obsluguje pracownie i moze tez prowadzic swoja ceramike.

Widoki i akcje:

```text
Do wypalu
  -> czekaja na biskwit
  -> czekaja na ostro
  -> zaznaczanie wielu wyrobow
  -> potwierdzenie wypalu

Rozliczenia
  -> wypaly kg
  -> co-work czas

Kursanci
  -> lista osob
  -> filtrowanie po wlascicielu

Moja ceramika
  -> prywatny dziennik instruktora
  -> analogicznie do kursanta

Powiadomienia
  -> informacje o zmianach w pracowni
```

Wazne rozroznienie:

```text
Instruktor dodaje ceramike kursanta
  -> wyrob trafia do kolejki pracowni

Instruktor dodaje "moja ceramika"
  -> wyrob trafia do prywatnej ceramiki instruktora
  -> nie powinien mieszac sie z kolejka kursantow
```

## Gosc

Gosc to osoba spoza stalego systemu kursantow.

Wersja ograniczona:

```text
wejscie jako gosc
  -> podanie e-maila
  -> opcjonalnie numer telefonu
  -> dodanie zdjec ceramiki
  -> oznaczenie biskwit / na ostro
  -> podglad tylko swoich wyrobow
```

Gosc nie powinien miec:

```text
dziennika kombinacji
wspolnej biblioteki jako edytor
historii calej pracowni
listy kursantow
rozliczen
panelu instruktora
```

Logika powiadomien goscia:

```text
gosc dodaje ceramike
  -> aplikacja zapisuje e-mail przy wyrobie
  -> gosc dostaje potwierdzenie dodania

instruktor oznacza wyrob jako wypalony
  -> aplikacja wysyla e-mail: gotowe do odbioru

opcjonalnie:
  -> jezeli podano telefon, mozliwe SMS / WhatsApp / reczne przypomnienie
```

Na start e-mail jest najprostszy i najbezpieczniejszy.

