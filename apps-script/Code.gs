/**
 * Odbiornik wyników quizu Geocaching -> Arkusz Google.
 *
 * WAŻNE — wklej niżej ID swojego arkusza (SHEET_ID).
 * ID znajdziesz w adresie arkusza:
 *   https://docs.google.com/spreadsheets/d/TU_JEST_ID/edit
 * Skopiuj fragment między /d/ a /edit.
 *
 * Wdrożenie: Wdróż -> Zarządzaj wdrożeniami -> (ołówek) edytuj ->
 *   Wersja: "Nowa wersja" -> Wdróż.  (Samo zapisanie kodu NIE aktualizuje /exec!)
 * Ustawienia wdrożenia: Wykonaj jako = Ja, Kto ma dostęp = Wszyscy.
 */

var SHEET_ID = '';          // <-- WKLEJ TU ID ARKUSZA
var SHEET_NAME = 'Wyniki';

function getSheet_() {
  var ss = SHEET_ID ? SpreadsheetApp.openById(SHEET_ID)
                    : SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Brak dostępu do arkusza — uzupełnij SHEET_ID.');
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getSheet_();
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

/**
 * GET:
 *   /exec            -> komunikat, że działa
 *   /exec?check=1    -> diagnostyka JSON: czy arkusz jest dostępny i ile ma wierszy
 */
function doGet(e) {
  if (e && e.parameter && e.parameter.check) {
    var out = { ok: true };
    try {
      var sheet = getSheet_();
      out.sheetName = sheet.getName();
      out.rows = sheet.getLastRow();     // 0 = brak danych, 1 = tylko nagłówek
    } catch (err) {
      out.ok = false;
      out.error = String(err);
    }
    return ContentService
      .createTextOutput(JSON.stringify(out))
      .setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService
    .createTextOutput('Odbiornik wynikow quizu dziala. Wyniki trafiaja do arkusza (zakladka "Wyniki"), NIE na te strone.')
    .setMimeType(ContentService.MimeType.TEXT);
}
