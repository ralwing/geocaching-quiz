# Geocaching – test (GitHub Pages)

Interaktywny quiz geocachingowy: 7 zadań, automatyczna punktacja zadań 1–6,
czasomierz (mierzy tylko zadania 1–6, zatrzymuje się przy otwarciu zadania 7).

## Zawartość

- `index.html` – cała strona (HTML + CSS + JavaScript, bez zależności zewnętrznych)
- `images/` – obrazki logo do zadania 3

## Funkcje

- ⏱️ **Czasomierz** startuje po kliknięciu „Rozpocznij test”. Przycisk
  „Przejdź do pytania 7” zatrzymuje zegar — czas zadania otwartego się nie liczy.
- ✅ **Auto-punktacja** zadań 1–6 (maks. 33 pkt). Wynik pokazywany jako `X / 35`.
- 📝 **Zadanie 7** (2 pkt) jest otwarte i oceniane ręcznie przez prowadzącego.
- 🔒 Wynik pokazuje tylko liczbę punktów (i podsumowanie per zadanie) — nie ujawnia
  poprawnych odpowiedzi.

Uwaga: strona jest w pełni statyczna (client-side), więc klucz odpowiedzi znajduje
się w kodzie `index.html`. Dla zwykłego ucznia jest niewidoczny w interfejsie, ale
osoba znająca „podgląd źródła” może go odczytać. To normalne dla quizów na GitHub Pages.

## Publikacja na GitHub Pages

1. Utwórz nowe repozytorium na GitHub (np. `geocaching-quiz`).
2. Podłącz to repozytorium lokalne i wypchnij:

   ```bash
   git remote add origin https://github.com/UŻYTKOWNIK/geocaching-quiz.git
   git branch -M main
   git push -u origin main
   ```

3. W repozytorium na GitHub: **Settings → Pages**.
4. W sekcji „Build and deployment” wybierz **Source: Deploy from a branch**,
   gałąź **main**, katalog **/ (root)**, i zapisz.
5. Po chwili strona będzie dostępna pod adresem:
   `https://UŻYTKOWNIK.github.io/geocaching-quiz/`

## Zbieranie wyników (widok właściciela) — Google Sheet

Strona po kliknięciu „Sprawdź wynik” może wysłać wynik uczestnika do Twojego
arkusza Google: nick, czas, liczbę punktów, **każdą odpowiedź z oznaczeniem ✓/✗
i poprawną wersją** oraz **pełny tekst zadania 7**. Zwycięzcę wyłaniasz sortując
arkusz po `Wynik /33` (malejąco), a przy remisie po `Czas (s)` (rosnąco).
Zadanie 7 oceniasz subiektywnie sam.

### Konfiguracja (jednorazowo, ~5–10 min)

1. Wejdź na https://sheets.new i utwórz nowy arkusz (np. „Wyniki Geocaching”).
2. Skopiuj **ID arkusza** z jego adresu:
   `https://docs.google.com/spreadsheets/d/`**`TU_JEST_ID`**`/edit` (fragment między `/d/` a `/edit`).
3. W arkuszu: **Rozszerzenia → Apps Script**.
4. Usuń domyślny kod i wklej całą zawartość pliku `apps-script/Code.gs` z tego repo.
   Na początku wklej ID arkusza w linii `var SHEET_ID = '';` → `'TU_JEST_ID'`. Zapisz (ikona dyskietki).
5. Kliknij **Wdróż → Nowe wdrożenie**. Jako typ (koło zębate) wybierz **Aplikacja internetowa**:
   - **Wykonaj jako:** Ja
   - **Kto ma dostęp:** Wszyscy
   - Kliknij **Wdróż** i zaakceptuj uprawnienia (Google ostrzeże, że aplikacja
     jest niezweryfikowana — wybierz „Zaawansowane → Przejdź do…”, bo to Twój własny skrypt).
6. Skopiuj wygenerowany **adres URL aplikacji internetowej** (kończy się na `/exec`).
7. Otwórz `index.html`, znajdź na początku skryptu linię:

   ```js
   var RESULTS_ENDPOINT = "";
   ```

   i wklej pomiędzy cudzysłowy skopiowany adres, np.:

   ```js
   var RESULTS_ENDPOINT = "https://script.google.com/macros/s/AKfyc.../exec";
   ```

8. Zapisz, zrób `git commit` i `git push`. Od teraz każdy wysłany wynik pojawi
   się jako nowy wiersz w zakładce **Wyniki** arkusza.

**Gdzie są wyniki:** w arkuszu Google, w zakładce **Wyniki** — NIE pod adresem `/exec`
(ten adres tylko odbiera dane).

**Diagnostyka:** otwórz w przeglądarce swój adres z dopiskiem `?check=1`, np.
`https://script.google.com/macros/s/.../exec?check=1`. Zobaczysz JSON:
- `{"ok":true,"rows":N}` → wszystko działa; `rows` to liczba wierszy (1 = sam nagłówek, 2+ = są wyniki),
- `{"ok":false,"error":...}` → skrypt nie ma dostępu do arkusza (sprawdź `SHEET_ID`).

> **Po każdej zmianie kodu w Apps Script** musisz zrobić **Wdróż → Zarządzaj
> wdrożeniami → (ołówek) → Wersja: „Nowa wersja” → Wdróż**. Samo zapisanie kodu
> NIE aktualizuje adresu `/exec`! Adres `/exec` pozostaje ten sam.

> Uwaga o rzetelności: strona jest w pełni statyczna, więc klucz odpowiedzi jest
> w kodzie, a wynik wysyła przeglądarka ucznia. Dla szkolnej zabawy z nagrodą to
> wystarcza, ale ktoś technicznie zaawansowany mógłby podejrzeć klucz lub wysłać
> spreparowany wynik. Jeśli potrzebna jest odporność na oszustwa, konieczny byłby
> prawdziwy backend (serwer weryfikujący odpowiedzi).

## Podgląd lokalny

Otwórz `index.html` w przeglądarce, albo uruchom prosty serwer:

```bash
python3 -m http.server 8000
# następnie wejdź na http://localhost:8000
```
