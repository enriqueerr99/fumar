# Configuración Google Sheets + Google Apps Script

## 📋 Objetivo

Capturar los datos del formulario del quiz (nombre, email, teléfono, persona) y guardarlos automáticamente en una hoja de Google Sheets.

---

## 🔧 PASO 1: Crear Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja llamada **"FUMAR-Leads"** (o el nombre que prefieras)
3. Crea las siguientes columnas en la primera fila:

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Fecha | Nombre | Email | Teléfono | Persona | Respuestas | ID |

Ejemplo:
```
A1: Fecha
B1: Nombre
C1: Email
D1: Teléfono
E1: Persona
F1: Respuestas
G1: ID
```

---

## 🔐 PASO 2: Crear Google Apps Script

1. En la misma hoja de Google Sheets, ve a **Extensiones > Apps Script**
2. Se abrirá una nueva pestaña con el editor de código
3. **Elimina todo el código por defecto** y reemplázalo con esto:

```javascript
// URL de tu Google Sheet
const SHEET_ID = "TU_ID_DE_SHEET"; // Ver instrucciones abajo
const SHEET_NAME = "Hoja1"; // O el nombre de tu hoja

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // Obtener la próxima fila
    const lastRow = sheet.getLastRow();
    const newRow = lastRow + 1;
    
    // Formato de respuestas
    const respuestasFormato = JSON.stringify(data.respuestas);
    
    // Insertar datos en la hoja
    sheet.getRange(newRow, 1).setValue(new Date()); // Fecha
    sheet.getRange(newRow, 2).setValue(data.nombre);
    sheet.getRange(newRow, 3).setValue(data.email);
    sheet.getRange(newRow, 4).setValue(data.telefono);
    sheet.getRange(newRow, 5).setValue(data.persona);
    sheet.getRange(newRow, 6).setValue(respuestasFormato);
    sheet.getRange(newRow, 7).setValue(Utilities.getUuid()); // ID único
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Datos guardados correctamente"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Este servicio solo acepta POST requests");
}
```

4. **Guarda el código** (Ctrl+S o Cmd+S)

---

## 🚀 PASO 3: Desplegar como Web App

1. En el editor de Apps Script, ve a **Desplegar** (arriba) → **Nueva despliegue**
2. En "Seleccionar tipo", elige **"Aplicación web"**
3. Rellena así:
   - **Ejecutar como:** Tu cuenta de Google
   - **Quién tiene acceso:** "Cualquiera"
4. Haz clic en **Desplegar**
5. Copia la **URL que aparece** (algo como):
   ```
   https://script.google.com/macros/d/[SCRIPT_ID]/useFunctionByName
   ```

---

## 🔑 PASO 4: Obtener tu ID de Sheet

1. Abre tu Google Sheet en el navegador
2. En la URL, busca esto:
   ```
   https://docs.google.com/spreadsheets/d/[AQUI_VA_TU_ID]/edit
   ```
3. Copia el ID entre `/d/` y `/edit`

Ejemplo: Si tu URL es:
```
https://docs.google.com/spreadsheets/d/1A2B3C4D5E6F7G8H9I0J/edit
```
Tu ID es: `1A2B3C4D5E6F7G8H9I0J`

---

## ⚙️ PASO 5: Actualizar el quiz.html

1. Abre `quiz.html` en un editor de texto
2. Busca esta línea (aprox línea 418):
   ```javascript
   const response = await fetch('https://script.google.com/macros/d/YOUR_SCRIPT_ID/useFunctionByName', {
   ```

3. **Reemplaza completamente** con tu URL de despliegue:
   ```javascript
   const response = await fetch('https://script.google.com/macros/d/[TU_SCRIPT_ID]/useFunctionByName', {
   ```

4. **IMPORTANTE**: También reemplaza el `SHEET_ID` en el Apps Script:
   - En el Apps Script, busca:
     ```javascript
     const SHEET_ID = "TU_ID_DE_SHEET";
     ```
   - Reemplaza con tu ID real:
     ```javascript
     const SHEET_ID = "1A2B3C4D5E6F7G8H9I0J";
     ```

5. Guarda todo

---

## ✅ PASO 6: Probar

1. Abre `quiz.html` en el navegador
2. Completa el quiz
3. Rellena el formulario (nombre, email, teléfono)
4. Haz clic en "Enviar datos"
5. Deberías ver un mensaje de éxito

**Si no funciona:**

### ❌ Error: "Cualquiera" no tiene acceso

**Solución:**
- Vuelve a Apps Script
- Ve a **Desplegar** → Editar el despliegue existente
- Cambia "Quién tiene acceso" a **"Cualquiera"**
- Actualiza

### ❌ Error: 404 o Script no encontrado

**Solución:**
- Asegúrate de que copiaste la URL completa del despliegue
- Asegúrate de que reemplazaste `YOUR_SCRIPT_ID` con tu ID real

### ❌ Error: Sheet no encontrado

**Solución:**
- Verifica que el `SHEET_ID` es correcto
- Verifica que el nombre de la hoja es correcto (por defecto "Hoja1")
- En Apps Script, cambia `SHEET_NAME` si es necesario

---

## 📊 Ver los datos guardados

1. Abre tu Google Sheet
2. Los nuevos datos aparecerán en filas automáticamente
3. Cada vez que alguien complete el formulario, se agregará una nueva fila

---

## 🔄 Actualizar después

Si quieres cambiar algo después:

1. **Cambiar campos**: Edita el Apps Script y actualiza las filas
2. **Cambiar URL**: Redeploy en Apps Script
3. **Cambiar Sheet**: Cambiar `SHEET_ID` y `SHEET_NAME` en Apps Script

---

## 🛡️ Seguridad

- Los datos se envían directamente a tu Google Sheet (tu propiedad)
- Nadie más puede ver los datos sin acceso a tu Google Drive
- Los datos se validan en el navegador antes de enviar

---

## 📝 Notas

- La fecha se guarda automáticamente en formato timestamp
- El ID es único para cada registro (UUID)
- Las respuestas del quiz se guardan como JSON
- Puedes cambiar los nombres de columnas, solo actualiza el código

---

**¿Necesitas ayuda?** Revisa los logs en Apps Script: 
1. Abre Apps Script
2. Ve a **Ejecución** (arriba)
3. Busca errores en los logs
