# IMPLEMENTACIÓN: CÁLCULO AUTOMÁTICO DE PERFILES EN GOOGLE APPS SCRIPT

## ✅ QUÉ SE HA HECHO

Se ha actualizado el `GOOGLE-APPS-SCRIPT.js` (v5.0) para:

1. **Recibir las respuestas del quiz** (índices 0-12)
2. **Calcular automáticamente el perfil** usando la función `calculatePersona()`
3. **Guardar el perfil detectado** en la columna "Persona" del Google Sheet

---

## 🔄 FLUJO ACTUAL

### Cliente (quiz.html):
```javascript
// El quiz ENVÍA LAS RESPUESTAS (índices de opciones)
const payload = {
  nombre: 'Juan García',
  email: 'juan@example.com',
  telefono: '+34 645 123 456',
  respuestas: {
    0: 2,           // P1: índice 2 = "5-10 años"
    1: 2,           // P2: índice 2 = "10-20 cigarrillos"
    2: 3,           // P3: índice 3 = "€200-300"
    3: 1,           // P4: índice 1 = "Después de comer"
    4: [0, 5],      // P5: múltiple selección
    5: 0,           // P6: índice 0 = "Me siento débil/sin control"
    6: 1,           // P7: etc...
    7: 2,
    8: 2,
    9: 0,
    10: 0,
    11: 0,
    12: 3
    // ⚠️ NO ENVIAR CAMPO "persona" - se calcula en el servidor
  }
};
```

### Servidor (Google Apps Script):
```javascript
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  
  // ✨ CALCULA el perfil automáticamente
  const persona = calculatePersona(data.respuestas);
  
  // Guarda en Google Sheet
  sheet.appendRow([
    timestamp,
    data.nombre,
    data.email,
    data.telefono,
    persona,  // ← Ahora es "controlador", "familiar", "racional" o "ansioso"
    respuestasJSON,
    idUnico
  ]);
}
```

---

## 📊 FUNCIÓN calculatePersona()

La función implementa la lógica de puntuación para todas las 13 preguntas:

### Sistema de Puntuación:
- **Controlador:** Control, identidad, voluntad
- **Familiar:** Familia, apoyo, responsabilidad
- **Racional:** Dinero, salud, ROI
- **Ansioso:** Ansiedad, estrés, paz mental

### Ejemplo de Cálculo (El Controlador):

```
Pregunta 1: "10-20 años" (índice 3)
  → +3 Controlador, +1 Ansioso

Pregunta 5: Selecciona "Recuperar control" (índice 0)
  → +3 Controlador

Pregunta 6: "Me siento débil/sin control" (índice 0)
  → +3 Controlador

Pregunta 8: "Más de 5 intentos" (índice 3)
  → +3 Controlador, +2 Ansioso

Pregunta 13: "Muy determinado (8-9)" (índice 3)
  → +3 Controlador

Total Controlador: 15 puntos → ✅ Ganador
```

---

## 📝 CAMBIOS EN quiz.html

**Importante:** El quiz.html debe cambiar para que:

1. ✅ **NO calcule el perfil** (lo hace el servidor)
2. ✅ **NO envíe el campo `persona`** en el POST
3. ✅ **Envíe solo las respuestas** (índices)
4. ✅ **Reciba el perfil detectado** en la respuesta del servidor

### Código a actualizar en quiz.html:

```javascript
// ANTES (INCORRECTO):
const payload = {
  nombre, email, telefono,
  persona: detectarPersona(),  // ❌ NO hacer esto
  respuestas
};

// AHORA (CORRECTO):
const payload = {
  nombre, email, telefono,
  respuestas              // ✅ Solo respuestas
};

// Al recibir respuesta del servidor:
const response = await fetch(scriptURL, { method: 'POST', body: JSON.stringify(payload) });
const result = await response.json();

console.log('Perfil detectado:', result.persona);  // ← "controlador", "familiar", etc
```

---

## 🧪 TESTING - Funciones de Prueba

Se han añadido 4 funciones de prueba en Google Apps Script para validar cada perfil:

### En Google Apps Script, ejecuta:

```javascript
testControlador()   // Simula respuestas típicas del Controlador
testFamiliar()      // Simula respuestas típicas del Familiar
testRacional()      // Simula respuestas típicas del Racional
testAnsioso()       // Simula respuestas típicas del Ansioso
```

Cada función:
1. Envía respuestas pre-configuradas
2. Calcula el perfil automáticamente
3. Guarda el lead en Google Sheet
4. Registra el resultado en los logs

**Resultado esperado:** Cada función debe detectar su perfil correspondiente.

---

## 📈 RESULTADOS EN GOOGLE SHEETS

Ahora la columna "Persona" se rellena automáticamente:

```
Fecha             | Nombre            | Email              | Persona      | Respuestas
2026-04-16 12:15  | Juan García       | juan@example.com   | controlador  | {"P1":"5-10 años"...}
2026-04-16 12:30  | María López       | maria@example.com  | familiar     | {"P1":"1-5 años"...}
2026-04-16 12:45  | Carlos Pérez      | carlos@example.com | racional     | {"P1":"Menos de 1 año"...}
2026-04-16 13:00  | Ana Martínez      | ana@example.com    | ansioso      | {"P1":"5-10 años"...}
```

---

## 🔐 VENTAJAS DE ESTA ARQUITECTURA

✅ **Server-side logic:** El perfil se calcula en el servidor, no se puede falsificar desde el cliente  
✅ **Determinista:** Mismas respuestas = siempre mismo perfil  
✅ **Auditable:** Todas las respuestas se guardan para validación  
✅ **Escalable:** Fácil añadir reglas de lógica sin tocar el frontend  
✅ **Seguro:** El cliente no conoce la lógica de puntuación  

---

## 📋 CHECKLIST PARA QUIZ.HTML

- [ ] Eliminar lógica de detección de perfil del cliente (si la había)
- [ ] No enviar campo `persona` en el POST
- [ ] Enviar solo nombre, email, teléfono, respuestas (índices)
- [ ] Procesar respuesta del servidor para obtener el perfil calculado
- [ ] En página post-quiz, mostrar el perfil recibido del servidor
- [ ] Personalizar mensaje según perfil recibido

---

## 🚀 PRÓXIMOS PASOS

1. Actualizar `quiz.html` para usar esta nueva arquitectura
2. Ejecutar tests (`testControlador()`, etc.) para validar
3. Verificar que Google Sheets se rellena correctamente
4. Personalizar página de confirmación post-quiz con el perfil detectado

