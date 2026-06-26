# Aplikacje: telefon i komputer

## Aktualny stan

Mamy trzy sciezki korzystania:

```text
1. PWA na telefonie
   -> aktualnie najwazniejsza wersja pilota
   -> dziala z baza danych Firebase

2. Wrapper mobilny Capacitor
   -> foldery `android/` i `ios/`
   -> przygotowanie pod Google Play / App Store

3. Wersja desktop przez przegladarke
   -> dziala na komputerze
   -> moze byc dodana jako aplikacja PWA
```

## Telefon - PWA

Adres:

```text
https://malina-ceramik-pilot-2026.web.app
```

Tryb demo:

```text
https://malina-ceramik-pilot-2026.web.app/?demo
```

To jest wersja, z ktorej korzystamy teraz w testach live.

## Telefon - aplikacja sklepowa

Projekt mobilny juz istnieje:

```text
android/
ios/
mobile-www/
capacitor.config.json
```

Przygotowanie:

```powershell
npm run mobile:prepare
npm run mobile:sync
```

Android:

```powershell
npm run mobile:open:android
```

iOS:

```powershell
npm run mobile:open:ios
```

Wazne:

```text
iOS wymaga macOS, Xcode i konta Apple Developer.
Android wymaga Android Studio i Google Play Console.
```

## Komputer

Na ten moment najlepsza wersja desktop to PWA w przegladarce.

Docelowo mozliwe opcje:

```text
1. PWA instalowana z Chrome / Edge
2. Electron / Tauri jako osobna aplikacja desktop
3. Panel instruktora tylko w przegladarce
```

Rekomendacja na teraz:

```text
Nie robic jeszcze Electron/Tauri.
Najpierw ustabilizowac logike i dane.
```

## Wersje demo, ktore chcemy utrzymywac

```text
Demo aktualnej wersji
  -> do szybkiego sprawdzenia, jak dziala obecny pilot

Demo robocza
  -> do eksperymentow UX/UI
  -> bez ryzyka dla prawdziwej bazy

Live pilot
  -> prawdziwe dane instruktorow
  -> Firebase
  -> tylko stabilne zmiany
```

