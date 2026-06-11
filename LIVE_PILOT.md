# Pilot dla instruktorów

Ta gałąź dodaje prawdziwe logowanie Firebase, wspólną bazę Firestore,
zdjęcia w Cloud Storage oraz powiadomienia Firebase Cloud Messaging.

## Utworzone środowisko

- projekt: `malina-ceramik-pilot-2026`,
- hosting: https://malina-ceramik-pilot-2026.web.app/,
- Firestore: region `europe-central2` (Warszawa),
- ochrona usunięcia bazy: włączona,
- pierwszy dozwolony adres: `malinaceramik@gmail.com`.

## Konfiguracja projektu Firebase

Pozostałe czynności:

1. Włącz Authentication -> Email/Password.
2. Utwórz konta wyłącznie dla instruktorów. Aplikacja nie ma rejestracji.
3. Włącz plan Blaze i utwórz Cloud Storage.
4. W Cloud Messaging utwórz klucz Web Push i wpisz go jako `vapidKey`.
5. Dopisz adresy instruktorów do konfiguracji oraz reguł.
6. Wdróż Storage, Functions i finalny Hosting:

```powershell
npm.cmd install
npm.cmd --prefix functions install
npx.cmd firebase login
npx.cmd firebase use --add
npx.cmd firebase deploy
```

Powiadomienia push korzystają z Cloud Functions. Firebase może wymagać
włączenia planu rozliczeniowego dla wdrożenia funkcji.

## Zakres pilotażu

- brak publicznej rejestracji,
- tylko ręcznie utworzone konta instruktorów,
- wspólny stan pracowni synchronizowany w czasie rzeczywistym,
- zdjęcia ograniczone regułami do zalogowanych użytkowników,
- zdjęcia są zmniejszane na urządzeniu przed wysłaniem,
- powiadomienia wewnątrz aplikacji i opcjonalne powiadomienia push.

To nadal pilotaż. Przed udostępnieniem klientom trzeba rozdzielić dane na
osobne kolekcje, przygotować politykę prywatności, retencję danych i pełne
role dostępu.
