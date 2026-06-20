# Malina Ceramik - aplikacja mobilna

Projekt mobilny jest wrapperem Capacitor wokol aktualnej aplikacji webowej.

## Przygotowanie paczki

```bash
npm run mobile:prepare
npm run mobile:sync
```

`mobile:prepare` kopiuje pliki aplikacji do `mobile-www/`.
`mobile:sync` przenosi aktualna wersje do projektow `android/` i `ios/`.

## Android

```bash
npm run mobile:open:android
```

Do budowania i publikacji potrzebne sa:

- Android Studio,
- JDK 11 lub nowszy,
- konto Google Play Console,
- podpisany plik AAB dla Google Play.

## iOS

```bash
npm run mobile:open:ios
```

Do budowania i publikacji potrzebne sa:

- macOS,
- Xcode,
- Apple Developer Program,
- konfiguracja podpisywania w Xcode,
- wysylka przez TestFlight / App Store Connect.

## Identyfikator aplikacji

Aktualny `appId`: `com.malinaceramik.studio`.
Zmiana tego identyfikatora po publikacji w sklepach jest problematyczna, wiec przed pierwszym releasem trzeba go potwierdzic.
