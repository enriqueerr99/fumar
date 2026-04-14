// ============================================
// GOOGLE APPS SCRIPT PARA FUMAR QUIZ
// Copia y pega este código en tu Google Apps Script
// ============================================

const SHEET_ID = "1zFGo1AsoQstAP_iyhg1fVQ-hYeRH63bnbMRIjyX2WnA";
const SHEET_NAME = "FUMAR-Leads"; // Cambia si tu hoja tiene otro nombre

function doPost(e) {
  try {
    // Parsear los datos que vienen del quiz
    const data = JSON.parse(e.postData.contents);

    // Abrir el Google Sheet
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);

    // Obtener todas las hojas disponibles
    const allSheets = spreadsheet.getSheets();
    let sheet = null;

    // Intentar obtener la hoja por nombre
    try {
      sheet = spreadsheet.getSheetByName(SHEET_NAME);
    } catch (e) {
      // Si no existe, intentar con la primera hoja
      sheet = allSheets[0];
    }

    // Obtener la próxima fila disponible
    const lastRow = sheet.getLastRow();
    const newRow = lastRow + 1;

    // Convertir respuestas a formato JSON string
    const respuestasFormato = JSON.stringify(data.respuestas);

    // Insertar datos en las columnas correspondientes
    sheet.getRange(newRow, 1).setValue(new Date()); // Fecha
    sheet.getRange(newRow, 2).setValue(data.nombre); // Nombre
    sheet.getRange(newRow, 3).setValue(data.email); // Email
    sheet.getRange(newRow, 4).setValue(data.telefono); // Teléfono
    sheet.getRange(newRow, 5).setValue(data.persona); // Tipo de fumador (Controlador, Familiar, etc)
    sheet.getRange(newRow, 6).setValue(respuestasFormato); // Respuestas del quiz (JSON)
    sheet.getRange(newRow, 7).setValue(Utilities.getUuid()); // ID único

    // Retornar respuesta exitosa
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Datos guardados correctamente",
      row: newRow
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Retornar error si algo falla (con más detalles para debugging)
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString(),
      message: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Este servicio solo acepta POST requests");
}

// ============================================
// PASOS PARA USAR ESTE SCRIPT:
// ============================================
// 1. Abre tu Google Sheet
// 2. Ve a Extensiones > Apps Script
// 3. Elimina el código por defecto
// 4. Pega TODO este código
// 5. Guarda (Ctrl+S)
// 6. Ve a "Desplegar" > "Nueva despliegue"
// 7. Elige "Aplicación web"
// 8. Ejecutar como: Tu cuenta
// 9. Acceso: Cualquiera
// 10. Desplegar
// 11. Copia la URL que aparece
// 12. Esa URL ya está en tu quiz.html
// ============================================

// Columns en tu Google Sheet deben ser:
// A: Fecha
// B: Nombre
// C: Email
// D: Teléfono
// E: Persona (Controlador, Familiar, Racional, Ansioso)
// F: Respuestas (JSON de respuestas del quiz)
// G: ID (único para cada registro)
