# Demo robocza

Demo robocza to miejsce eksperymentow.

Na ten moment nie tworzymy drugiej kopii calej aplikacji, bo to zwieksza ryzyko
rozjechania kodu. Zamiast tego kazda wieksza zmiana UX powinna isc przez osobna
galaz git albo osobny wariant widoku wlaczany parametrem.

## Proponowana zasada

```text
main / live pilot
  -> stabilna wersja do pracy

galaz robocza UX
  -> eksperyment
  -> demo
  -> decyzja
  -> dopiero merge
```

## Nazewnictwo galezi

```text
ux/nazwa-pomyslu
logic/nazwa-zmiany
fix/nazwa-bledu
```

## Co testujemy w demo roboczym

```text
nowe kafelki
nowe filtry
zmiane tekstow
gesty na telefonie
kolejnosc krokow
kolory statusow
widoki kursanta
widoki instruktora
widok goscia
```

## Czego nie robimy bez wpisu w wersjach logiki

```text
zmiana statusow
zmiana wlascicieli
zmiana zapisu zdjec
zmiana struktury bazy
zmiana rozliczen
zmiana uprawnien
```

