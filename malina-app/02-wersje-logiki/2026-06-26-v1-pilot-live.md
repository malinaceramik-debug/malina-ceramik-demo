# 2026-06-26 v1 - pilot live po stabilizacji zdjec

## Status

Aktualna logika stabilizacyjna pilota live.

## Kontekst

W aplikacji pojawily sie krytyczne problemy:

- zdjecia dodane do aplikacji potrafily znikac,
- zdjecia po dodaniu nie zawsze pojawialy sie w glownej kolejce,
- kilka urzadzen moglo nadpisywac sobie stan aplikacji,
- projekt zaczal miec za duzo logiki w jednym pliku bez osobnej dokumentacji.

## Decyzja

Zdjecie nie moze byc zapisane w bazie jako lokalny podglad.

Poprawna sekwencja:

```text
plik zdjecia
  -> lokalny podglad
  -> upload do Firebase Storage
  -> trwaly URL
  -> zapis rekordu wyrobu w Firestore
```

## Zasady w tej wersji

### Zdjecia

```text
blob:        tylko lokalny podglad
data:        tylko demo / tryb lokalny
Storage URL: jedyne poprawne zdjecie w trybie live
```

### Synchronizacja

Zapis stanu pracowni jest scalany w transakcji Firestore.

Cel:

```text
telefon A dodaje wyrob
telefon B dodaje wyrob
oba wyroby zostaja w bazie
```

### Usuwanie

Usuniete wyroby trafiaja na liste `deletedItemIds`, zeby nie wrocily z drugiego
urzadzenia, ktore mialo starszy stan lokalny.

## Ryzyka

Ta wersja nadal przechowuje duzo danych w jednym dokumencie stanu pracowni.
Docelowo bezpieczniej bedzie miec:

```text
studios/{studioId}/items/{itemId}
studios/{studioId}/payments/{paymentId}
studios/{studioId}/notifications/{notificationId}
```

czyli osobny dokument na kazdy wyrob.

## Testy wymagane po zmianach logiki

```text
1. Instruktor A dodaje zdjecie wyrobu kursanta
2. Instruktor B odswieza aplikacje i widzi ten wyrob
3. Instruktor B dodaje drugi wyrob
4. Instruktor A nadal widzi oba wyroby
5. Oznaczamy jeden wyrob jako wypalony
6. Status pojawia sie u drugiej osoby
7. Usuwamy testowy wyrob
8. Wyrob nie wraca po odswiezeniu
```

## Powrot do poprzedniej wersji

Kod tej wersji jest zapisany w commicie:

```text
30b4fca Utrwal zdjecia i scalaj stan pracowni
```

Do analizy wstecznej uzywamy git, a nie kopiowania plikow recznie.

