// ═══════════════════════════════════════════════════════════════════════════════
// GOOGLE APPS SCRIPT - FUMAR QUIZ LEADS CAPTURE (v5.0 - Con Lógica de Perfiles)
// Inspirado en el modelo probado de DERMA90
// ✨ NUEVO: Cálculo automático de perfiles (Controlador, Familiar, Racional, Ansioso)
// basado en la lógica de puntuación de las 13 respuestas del quiz
// Sin headers CORS complicados - Google App Scripts lo maneja automáticamente
// ═══════════════════════════════════════════════════════════════════════════════

// CONFIGURACIÓN
const SHEET_ID = '1zFGo1AsoQstAP_iyhg1fVQ-hYeRH63bnbMRIjyX2WnA';
const SHEET_NAME = 'Hoja 1';
const NOTIFICATION_EMAIL = 'enrique.rodriguezdrop@gmail.com';

// ─────────────────────────────────────────────────────────────────────────────
// DATOS DE REFERENCIA - Array de preguntas y opciones
// ─────────────────────────────────────────────────────────────────────────────

const QUESTIONS = [
  { id: 1, options: ["Menos de 1 año", "1-5 años", "5-10 años", "10-20 años", "Más de 20 años"] },
  { id: 2, options: ["Menos de 5 cigarrillos", "5-10 cigarrillos", "10-20 cigarrillos", "20-40 cigarrillos", "Más de 40 cigarrillos"] },
  { id: 3, options: ["Menos de €50", "€50-100", "€100-200", "€200-300", "Más de €300"] },
  { id: 4, options: ["Por la mañana (al despertar)", "Después de comer", "En momentos de estrés/ansiedad", "En situaciones sociales", "Cuando me aburro/no tengo nada que hacer"] },
  { id: 5, options: ["Recuperar control de mi vida/mente", "Dinero (gastar menos)", "Salud física (pulmones, corazón)", "Por mi familia/pareja/hijos", "Reducir mi ansiedad/estrés", "Mejorar mi autoestima"] },
  { id: 6, options: ["Me siento débil/sin control", "El gasto de dinero", "Mi salud se deteriora", "La preocupación de mi familia", "Mi ansiedad aumenta en lugar de disminuir", "Me siento atrapado en un círculo vicioso"] },
  { id: 7, options: ["Baja (manejo bien el estrés)", "Media (tengo estrés ocasional)", "Alta (estrés frecuente)", "Muy alta (estrés constante, afecta mi vida)"] },
  { id: 8, options: ["No, es mi primer intento", "Sí, 1-2 veces", "Sí, 3-5 veces", "Sí, más de 5 veces"] },
  { id: 9, options: ["Sin apoyo/solo", "Sin un plan claro", "Recaída por estrés/ansiedad", "Falta de sustituto/distracción", "Falta de motivación/razón fuerte", "Síntomas de abstinencia muy fuertes", "No aplica (primer intento)"] },
  { id: 10, options: ["No poder hacerlo (fallar de nuevo)", "La ansiedad que sentiré", "Perder una 'costumbre' que controla mi día", "Que mi círculo me vea de manera diferente", "Nada me asusta (estoy decidido)"] },
  { id: 11, options: ["No, nadie lo sabe", "Sí, pero no me apoyan mucho", "Sí, me apoyan moderadamente", "Sí, me apoyan activamente / Me lo han pedido"] },
  { id: 12, options: ["Poco o nada (estoy solo/a en esto)", "Algo de apoyo", "Bastante apoyo", "Apoyo muy fuerte (es importante para ellos)"] },
  { id: 13, options: ["1-3 (poco determinado)", "4-5 (medianamente determinado)", "6-7 (bastante determinado)", "8-9 (muy determinado)", "10 (totalmente decidido)"] }
];

// ═══════════════════════════════════════════════════════════════════════════════
// FUNCIÓN PRINCIPAL - doPost (Modelo simple DERMA90)
// ═══════════════════════════════════════════════════════════════════════════════

function doPost(e) {
  try {
    // Parse datos del POST
    const data = JSON.parse(e.postData.contents);

    // Conecta con tu Sheet
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);

    // Prepara la fila con datos
    const timestamp = new Date();
    const nombre = data.nombre || '';
    const email = data.email || '';
    const telefono = data.telefono || '';
    const idUnico = generateUniqueId();

    // ✨ CALCULA EL PERFIL basado en las respuestas (no lo toma del cliente)
    const persona = calculatePersona(data.respuestas);

    // Convierte respuestas a formato legible
    const respuestasLegibles = convertAnswersToReadable(data.respuestas);
    const respuestas = JSON.stringify(respuestasLegibles);

    // Valor del cliente potencial (279€)
    const valor = data.valor || 279;

    // Añade fila al sheet
    sheet.appendRow([
      timestamp,
      nombre,
      email,
      telefono,
      persona,
      respuestas,
      idUnico,
      valor
    ]);

    Logger.log('✅ Lead guardado: ' + nombre + ' (' + persona + ')');

    // ✨ ENVÍA NOTIFICACIÓN POR EMAIL
    sendLeadNotification(nombre, email, telefono, persona, respuestasLegibles, idUnico, valor);
    Logger.log('📧 Email de notificación enviado a ' + NOTIFICATION_EMAIL);

    // Respuesta exitosa
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Lead guardado correctamente',
        id: idUnico,
        persona: persona
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('❌ Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ✨ FUNCIÓN PRINCIPAL - ASIGNAR PERFIL basado en respuestas
// ═══════════════════════════════════════════════════════════════════════════════

function calculatePersona(respuestas) {
  // Inicializa puntuaciones
  const scores = {
    controlador: 0,
    familiar: 0,
    racional: 0,
    ansioso: 0
  };

  // PREGUNTA 1: ¿Cuántos años llevas fumando?
  const p1 = respuestas[0];
  if (p1 === 0) { scores.racional += 2; }
  else if (p1 === 1) { scores.controlador += 1; scores.racional += 1; }
  else if (p1 === 2) { scores.controlador += 2; }
  else if (p1 === 3) { scores.controlador += 3; scores.ansioso += 1; }
  else if (p1 === 4) { scores.controlador += 3; scores.ansioso += 2; }

  // PREGUNTA 2: ¿Cuánto fumas al día?
  const p2 = respuestas[1];
  if (p2 === 0) { scores.ansioso += 2; }
  else if (p2 === 1) { scores.controlador += 1; scores.ansioso += 1; }
  else if (p2 === 2) { scores.controlador += 1; scores.racional += 1; scores.ansioso += 1; }
  else if (p2 === 3) { scores.controlador += 1; scores.racional += 2; scores.ansioso += 1; }
  else if (p2 === 4) { scores.racional += 3; scores.ansioso += 2; }

  // PREGUNTA 3: ¿Cuánto gastas aproximadamente al mes?
  const p3 = respuestas[2];
  if (p3 === 0) { /* 0 puntos */ }
  else if (p3 === 1) { scores.racional += 1; }
  else if (p3 === 2) { scores.racional += 2; }
  else if (p3 === 3) { scores.racional += 3; }
  else if (p3 === 4) { scores.racional += 4; }

  // PREGUNTA 4: ¿En qué momento tu cuerpo te pide más fumar?
  const p4 = respuestas[3];
  if (p4 === 0) { scores.controlador += 2; scores.ansioso += 1; }
  else if (p4 === 1) { scores.controlador += 1; }
  else if (p4 === 2) { scores.ansioso += 3; }
  else if (p4 === 3) { scores.familiar += 2; scores.ansioso += 1; }
  else if (p4 === 4) { scores.controlador += 1; scores.ansioso += 1; }

  // PREGUNTA 5: ¿Por qué quieres dejar de fumar? (MÚLTIPLE)
  const p5 = respuestas[4];
  if (Array.isArray(p5)) {
    p5.forEach(idx => {
      if (idx === 0) { scores.controlador += 3; }
      else if (idx === 1) { scores.racional += 3; }
      else if (idx === 2) { scores.racional += 2; }
      else if (idx === 3) { scores.familiar += 3; }
      else if (idx === 4) { scores.ansioso += 3; }
      else if (idx === 5) { scores.controlador += 2; }
    });
  }

  // PREGUNTA 6: ¿Qué es lo que más te duele de seguir fumando?
  const p6 = respuestas[5];
  if (p6 === 0) { scores.controlador += 3; }
  else if (p6 === 1) { scores.racional += 3; }
  else if (p6 === 2) { scores.racional += 2; }
  else if (p6 === 3) { scores.familiar += 3; }
  else if (p6 === 4) { scores.ansioso += 3; }
  else if (p6 === 5) { scores.controlador += 2; scores.ansioso += 2; }

  // PREGUNTA 7: ¿Cómo es tu ansiedad/estrés actual?
  const p7 = respuestas[6];
  if (p7 === 0) { scores.ansioso -= 1; }
  else if (p7 === 1) { /* neutral */ }
  else if (p7 === 2) { scores.controlador += 1; scores.ansioso += 2; }
  else if (p7 === 3) { scores.ansioso += 3; }

  // PREGUNTA 8: ¿Has probado a dejar de fumar antes?
  const p8 = respuestas[7];
  if (p8 === 0) { /* sin info */ }
  else if (p8 === 1) { scores.controlador += 1; }
  else if (p8 === 2) { scores.controlador += 2; scores.ansioso += 1; }
  else if (p8 === 3) { scores.controlador += 3; scores.ansioso += 2; }

  // PREGUNTA 9: Si has intentado antes, ¿por qué no pudiste dejarlo?
  const p9 = respuestas[8];
  if (p9 === 0) { scores.controlador += 2; scores.familiar += 1; }
  else if (p9 === 1) { scores.racional += 2; }
  else if (p9 === 2) { scores.ansioso += 3; }
  else if (p9 === 3) { scores.controlador += 1; scores.ansioso += 1; }
  else if (p9 === 4) { scores.controlador += 2; }
  else if (p9 === 5) { scores.ansioso += 2; }
  else if (p9 === 6) { /* no aplica */ }

  // PREGUNTA 10: ¿Qué te asusta más de dejar de fumar?
  const p10 = respuestas[9];
  if (p10 === 0) { scores.controlador += 3; scores.ansioso += 1; }
  else if (p10 === 1) { scores.ansioso += 3; }
  else if (p10 === 2) { scores.controlador += 2; }
  else if (p10 === 3) { scores.familiar += 2; scores.ansioso += 1; }
  else if (p10 === 4) { scores.controlador += 2; }

  // PREGUNTA 11: Tu pareja/familia, ¿sabe que quieres dejar de fumar?
  const p11 = respuestas[10];
  if (p11 === 0) { scores.controlador += 1; scores.familiar -= 1; scores.racional += 1; }
  else if (p11 === 1) { scores.controlador += 1; scores.familiar += 1; }
  else if (p11 === 2) { scores.familiar += 2; }
  else if (p11 === 3) { scores.familiar += 3; }

  // PREGUNTA 12: ¿Cuánto pueden ayudarte tu círculo cercano?
  const p12 = respuestas[11];
  if (p12 === 0) { scores.controlador += 2; scores.familiar -= 1; }
  else if (p12 === 1) { scores.controlador += 1; scores.familiar += 1; }
  else if (p12 === 2) { scores.familiar += 2; }
  else if (p12 === 3) { scores.familiar += 3; scores.controlador -= 1; }

  // PREGUNTA 13: ¿Cuánto de determinado estás ESTA VEZ?
  const p13 = respuestas[12];
  if (p13 === 0) { scores.controlador -= 2; scores.ansioso += 1; }
  else if (p13 === 1) { /* neutral */ }
  else if (p13 === 2) { scores.controlador += 2; }
  else if (p13 === 3) { scores.controlador += 3; }
  else if (p13 === 4) { scores.controlador += 3; }

  // DETERMINA EL PERFIL GANADOR
  const maxScore = Math.max(scores.controlador, scores.familiar, scores.racional, scores.ansioso);

  if (scores.controlador === maxScore) return 'controlador';
  if (scores.familiar === maxScore) return 'familiar';
  if (scores.racional === maxScore) return 'racional';
  if (scores.ansioso === maxScore) return 'ansioso';

  // Fallback (no debería ocurrir)
  return 'controlador';
}

// ─────────────────────────────────────────────────────────────────────────────
// doGet - Dashboard de leads
// ─────────────────────────────────────────────────────────────────────────────

function doGet(e) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();

    if (data.length < 2) {
      return ContentService
        .createTextOutput(JSON.stringify([]))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const headers = data[0];
    const rows = data.slice(1).map(row => {
      const obj = {};
      headers.forEach((h, i) => { obj[h] = row[i]; });
      return obj;
    });

    return ContentService
      .createTextOutput(JSON.stringify(rows))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// FUNCIÓN AUXILIAR - Convertir índices a nombres
// ─────────────────────────────────────────────────────────────────────────────

function convertAnswersToReadable(respuestas) {
  const resultado = {};

  for (const [questionIndex, answer] of Object.entries(respuestas)) {
    const qIndex = parseInt(questionIndex);
    const question = QUESTIONS[qIndex];

    if (!question) continue;

    if (Array.isArray(answer)) {
      resultado[`P${qIndex + 1}`] = answer
        .map(optIndex => question.options[optIndex])
        .filter(opt => opt);
    } else {
      resultado[`P${qIndex + 1}`] = question.options[answer] || '';
    }
  }

  return resultado;
}

// ─────────────────────────────────────────────────────────────────────────────
// FUNCIÓN AUXILIAR - Generar ID único
// ─────────────────────────────────────────────────────────────────────────────

function generateUniqueId() {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `FUMAR-${timestamp}-${randomStr}`.toUpperCase();
}

// ─────────────────────────────────────────────────────────────────────────────
// ✨ FUNCIÓN - Enviar notificación de lead por email
// ─────────────────────────────────────────────────────────────────────────────

function sendLeadNotification(nombre, email, telefono, persona, respuestasLegibles, idUnico, valor) {
  try {
    if (!nombre || !email || !persona || !idUnico) {
      Logger.log('❌ Error: Faltan datos para enviar email');
      return;
    }

    const valorFormatted = valor ? `€${valor}` : '€279';
    const subject = `🔥 NUEVO LEAD - ${persona.toUpperCase()} - ${nombre} (${valorFormatted})`;

    const respuestasHtml = Object.entries(respuestasLegibles)
      .map(([pregunta, respuesta]) => {
        const respuestaStr = Array.isArray(respuesta) ? respuesta.join(', ') : respuesta;
        return `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>${pregunta}</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${respuestaStr}</td></tr>`;
      })
      .join('');

    const htmlBody = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .header { background: linear-gradient(135deg, #ff5555 0%, #ff8888 100%); color: white; padding: 20px; border-radius: 8px; }
            .content { padding: 20px; background: #f9f9f9; border-radius: 8px; margin-top: 15px; }
            .lead-info { background: white; padding: 15px; border-radius: 6px; margin-bottom: 15px; border-left: 4px solid #ff5555; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            .badge { display: inline-block; background: #ff5555; color: white; padding: 6px 12px; border-radius: 20px; font-weight: bold; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #888; font-size: 0.9em; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>🔥 NUEVO LEAD CAPTURADO</h2>
            <p style="margin: 0;">Lead ID: ${idUnico}</p>
          </div>

          <div class="content">
            <div class="lead-info">
              <p><strong>Nombre:</strong> ${nombre}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Teléfono:</strong> ${telefono}</p>
              <p><strong>Tipo de Persona:</strong> <span class="badge">${persona.toUpperCase()}</span></p>
              <p><strong>Valor Potencial:</strong> <strong style="color: #ff5555;">${valorFormatted}</strong></p>
              <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
            </div>

            <h3>Respuestas del Quiz</h3>
            <table>
              <thead style="background: #f0f0f0;">
                <tr>
                  <th style="text-align: left; padding: 10px;">Pregunta</th>
                  <th style="text-align: left; padding: 10px;">Respuesta</th>
                </tr>
              </thead>
              <tbody>
                ${respuestasHtml}
              </tbody>
            </table>

            <div class="footer">
              <p>Este email fue generado automáticamente por el sistema de captación de leads de VivirSinHumo.</p>
              <p><a href="https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit">Ver todos los leads en la Sheet</a></p>
            </div>
          </div>
        </body>
      </html>
    `;

    GmailApp.sendEmail(
      NOTIFICATION_EMAIL,
      subject,
      `Nuevo lead: ${nombre} (${persona})`,
      {
        htmlBody: htmlBody,
        noReply: false
      }
    );
  } catch (error) {
    Logger.log('❌ Error enviando email: ' + error.toString());
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// FUNCIONES DE TESTING
// ═══════════════════════════════════════════════════════════════════════════════

function testQuizSubmission() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        nombre: 'Test User - El Ansioso',
        email: 'test.ansioso@example.com',
        telefono: '+34 645 123 456',
        respuestas: {
          0: 2, 1: 0, 2: 1, 3: 2, 4: [0, 4], 5: 4, 6: 4, 7: 3, 8: 2, 9: 2, 10: 1, 11: 1, 12: 2
        }
      })
    }
  };

  const result = doPost(testData);
  Logger.log('Resultado test: ' + result.getContent());
}

function testControlador() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        nombre: 'Test User - El Controlador',
        email: 'test.controlador@example.com',
        telefono: '+34 645 123 457',
        respuestas: {
          0: 3, 1: 2, 2: 3, 3: 1, 4: [0, 5], 5: 0, 6: 0, 7: 1, 8: 3, 9: 0, 10: 0, 11: 0, 12: 3
        }
      })
    }
  };

  const result = doPost(testData);
  Logger.log('Test Controlador: ' + result.getContent());
}

function testRacional() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        nombre: 'Test User - El Racional',
        email: 'test.racional@example.com',
        telefono: '+34 645 123 458',
        respuestas: {
          0: 0, 1: 4, 2: 4, 3: 1, 4: [1, 2], 5: 1, 6: 1, 7: 0, 8: 0, 9: 1, 10: 2, 11: 1, 12: 1
        }
      })
    }
  };

  const result = doPost(testData);
  Logger.log('Test Racional: ' + result.getContent());
}

function testFamiliar() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        nombre: 'Test User - El Familiar',
        email: 'test.familiar@example.com',
        telefono: '+34 645 123 459',
        respuestas: {
          0: 2, 1: 2, 2: 2, 3: 3, 4: [3], 5: 3, 6: 3, 7: 1, 8: 1, 9: 0, 10: 3, 11: 3, 12: 2
        }
      })
    }
  };

  const result = doPost(testData);
  Logger.log('Test Familiar: ' + result.getContent());
}

function viewLastLeads() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();

  Logger.log('=== ÚLTIMOS LEADS ===');
  Logger.log('Total: ' + (data.length - 1));

  const lastRows = data.slice(-5).reverse();
  lastRows.forEach((row, index) => {
    Logger.log(`${index + 1}. ${row[1]} | ${row[2]} | ${row[4]}`);
  });
}

function getStats() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();

  const rows = data.slice(1);
  const personas = {};

  rows.forEach(row => {
    const persona = row[4];
    personas[persona] = (personas[persona] || 0) + 1;
  });

  Logger.log('=== ESTADÍSTICAS ===');
  Logger.log('Total leads: ' + rows.length);
  Object.entries(personas).forEach(([persona, count]) => {
    Logger.log(`  ${persona}: ${count}`);
  });
}
