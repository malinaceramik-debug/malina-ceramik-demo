# Pliki zrodlowe aplikacji

Ten dokument mowi, ktore pliki sa zrodlowa prawda dla aplikacji.

Nie kopiujemy tych plikow do osobnych folderow roboczych, bo dwie kopie kodu
latwo prowadza do sytuacji, w ktorej poprawiamy nie ten plik.

## Glowna aplikacja web / PWA

| Plik | Rola |
|---|---|
| `index.html` | struktura aplikacji, ekran logowania, shell aplikacji, inputy zdjec |
| `app.js` | glowna logika interfejsu, statusow, dodawania zdjec, widokow i rozliczen |
| `backend.js` | polaczenie z Firebase: logowanie, Firestore, Storage, powiadomienia |
| `styles.css` | wyglad aplikacji, kafelki, galerie, kolory, responsywnosc |
| `sw.js` | service worker, cache PWA, odswiezanie wersji |
| `manifest.json` | nazwa, ikona i konfiguracja PWA |
| `install.html` | ekran/instrukcja instalacji aplikacji |

## Firebase

| Plik | Rola |
|---|---|
| `firebase.json` | konfiguracja deployu |
| `.firebaserc` | projekt Firebase |
| `firebase-config.js` | konfiguracja klienta Firebase |
| `firebase-config-sw.js` | konfiguracja Firebase dla service workera |
| `firestore.rules` | reguly dostepu do bazy Firestore |
| `storage.rules` | reguly dostepu do Firebase Storage |
| `functions/index.js` | funkcje backendowe, np. powiadomienia |

## Aplikacje mobilne

| Folder / plik | Rola |
|---|---|
| `capacitor.config.json` | konfiguracja wrappera mobilnego |
| `mobile-www/` | kopia web aplikacji przygotowana dla Capacitor |
| `android/` | projekt Android |
| `ios/` | projekt iOS |
| `scripts/build-mobile-web.mjs` | przygotowanie plikow do `mobile-www/` |

## Assets

| Folder / plik | Rola |
|---|---|
| `assets/` | logo, ikony, zdjecia hero, grafiki demo |
| `assets/malina-apron.png` | fartuch / znak aplikacji |
| `assets/malina-wordmark.png` | logotyp Malina Ceramik |
| `assets/malina-hands-hero.webp` | zdjecie hero z pracowni |
| `assets/malina-hands-mobile.webp` | zdjecie hero na telefon |
| `assets/malina-kiln.webp` | zdjecie pieca / wypalu |
| `assets/kubek.webp`, `assets/miska.webp`, `assets/wazon.webp`, `assets/talerz.webp` | demo ceramiki |

## Dokumenty techniczne

| Plik | Rola |
|---|---|
| `README.md` | stary opis prototypu i pilota |
| `LIVE_PILOT.md` | konfiguracja pilota Firebase |
| `MOBILE_RELEASE.md` | przygotowanie aplikacji mobilnej |

