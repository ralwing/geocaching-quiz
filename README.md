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

## Podgląd lokalny

Otwórz `index.html` w przeglądarce, albo uruchom prosty serwer:

```bash
python3 -m http.server 8000
# następnie wejdź na http://localhost:8000
```
