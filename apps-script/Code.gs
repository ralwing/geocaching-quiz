/**
 * Odbiornik wyników quizu Geocaching -> Arkusz Google.
 *
 * Jak użyć (skrót — pełna instrukcja w README.md):
 *  1. Utwórz arkusz Google.
 *  2. Rozszerzenia -> Apps Script, wklej ten plik.
 *  3. Wdróż -> Nowe wdrożenie -> typ "Aplikacja internetowa":
 *        - Wykonaj jako: Ja
 *        - Kto ma dostęp: Wszyscy
 *  4. Skopiuj adres URL (kończy się na /exec) i wklej do RESULTS_ENDPOINT w index.html.
 */

var SHEET_NAME = 'Wyniki';

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // Nagłówek zapisywany raz (przy pierwszym wyniku)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Data'].concat(data.labels));
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([new Date()].concat(data.values));

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Otwarcie adresu /exec w przeglądarce pokaże ten komunikat — potwierdza, że działa.
function doGet() {
  return ContentService
    .createTextOutput('Odbiornik wynikow quizu dziala. Wyniki przyjmowane sa metoda POST.')
    .setMimeType(ContentService.MimeType.TEXT);
}
