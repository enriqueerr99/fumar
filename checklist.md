# 🚀 Checklist Lanzamiento - Proyecto Dejar de Fumar

**Objetivo:** Lanzamiento en 8 semanas con protocolo completo, integraciones y comunidad operativa.

---

## ✅ SEMANA 1-2: Infraestructura Base

- [ ] Registrar dominio (dejardefumar.es / similar)
- [ ] Contratar hosting (Vercel, Netlify o servidor propio)
- [ ] Configurar Google Workspace / email corporativo
- [ ] Crear proyecto Google Sheets para datos de usuarios
- [ ] Setup Google Apps Script básico para automatizaciones
- [ ] Crear repositorio Git (GitHub/GitLab)
- [ ] Configurar CI/CD básico

---

## ✅ SEMANA 1-3: Landing Page + Quiz

### Landing Page
- [ ] Copywriting de landing page (hook, CTA, testimonios, FAQ)
- [ ] Diseño visual (Webflow o HTML/CSS custom)
- [ ] Secciones principales:
  - [ ] Hero (hook: "No es nicotina, es ansiedad")
  - [ ] Problema/Solución
  - [ ] 4 Personas + Quiz CTA
  - [ ] Incluye (beneficios de los €299)
  - [ ] Protocolo 12 semanas (timeline visual)
  - [ ] Testimonios/Social proof
  - [ ] FAQ
  - [ ] CTA botón → Quiz
- [ ] Optimizar para mobile
- [ ] Página de privacidad + términos
- [ ] Setup Google Analytics + Pixel tracking

### Quiz Interactivo
- [ ] Crear flujo de 5-7 preguntas
- [ ] Lógica para detectar: Controlador, Familiar, Racional, Ansioso
- [ ] Resultado personalizado con copy por persona
- [ ] Botón CTA "Comprar ahora" redirige a pago

---

## ✅ SEMANA 2-3: Integraciones de Pago + CRM

### Stripe
- [ ] Crear cuenta Stripe (verificación)
- [ ] Configurar producto €299
- [ ] Implementar checkout en landing
- [ ] Webhook para confirmación de pago
- [ ] Test transacciones en ambiente staging

### Google Sheets + Apps Script
- [ ] Crear estructura de base datos:
  - [ ] Tabla clientes (nombre, email, teléfono, persona, fecha_compra, estado)
  - [ ] Tabla entregas (seguimiento suplementos + collar)
  - [ ] Tabla progreso (semana completada, videos visto, engagement)
- [ ] Script para recibir datos POST de Stripe → Sheet
- [ ] Automation: crear carpeta Google Drive por cliente
- [ ] Automation: enviar email bienvenida + acceso LMS (por ahora)

### Email/CRM (elegir uno)
- [ ] Configurar GHL O HubSpot
- [ ] Crear email secuencia:
  - [ ] Email 1: Bienvenida + acceso LMS
  - [ ] Email 2: Intro protocolo + semana 1
  - [ ] Emails automáticos (1 x semana, contenido según progreso)
- [ ] Setup automático al comprar

---

## ✅ SEMANA 2-4: LMS + Contenido (Semanas 1-4)

### Elegir plataforma LMS
- [ ] Registrarse en Kajabi / Teachable / Podia
- [ ] Configurar dominio personalizado (opcional)
- [ ] Setup landing interna + login

### Grabar Contenido - FASE 1 (Semanas 1-4)
**Tema:** Desintoxicación + Sustitución ritual

- [ ] **Semana 1:**
  - [ ] Lección 1: Intro protocolo (5 min) - por qué no es nicotina
  - [ ] Lección 2: La ansiedad condicionada (7 min)
  - [ ] Lección 3: Ritual de sustitución (6 min)
  - [ ] Ejercicio: mapear triggers personales
  - [ ] Worksheet descargable

- [ ] **Semana 2:**
  - [ ] Lección 4: Suplementación - cómo funciona (8 min)
  - [ ] Lección 5: Técnicas respuesta rápida (6 min)
  - [ ] Lección 6: Día 1 completado - check-in (5 min)
  - [ ] Ejercicio: Test suplementos
  - [ ] Video motivacional (persona específica)

- [ ] **Semana 3:**
  - [ ] Lección 7: Cuerpo en desintoxicación (7 min)
  - [ ] Lección 8: Diferencia psicológico vs físico (6 min)
  - [ ] Lección 9: Herramientas anti-recaída (8 min)
  - [ ] Ejercicio: Crear plan de emergencia
  - [ ] Comunidad checkpoint

- [ ] **Semana 4:**
  - [ ] Lección 10: Identidad nueva (7 min)
  - [ ] Lección 11: Check-in mes 1 (5 min)
  - [ ] Lección 12: Preview Fase 2 (5 min)
  - [ ] Ejercicio: Redefinir "quién soy sin fumar"
  - [ ] Bonus: 1:1 coaching (booking link)

---

## ✅ SEMANA 3-5: Productos Físicos

### Proveedores
- [ ] Contactar laboratorios para suplementación (ansiedad/estrés):
  - [ ] Magnesio + L-teanina + vitaminas B
  - [ ] Formato: cápsulas/polvos 12 semanas
  - [ ] Presupuesto unitario y mínimo de compra
  - [ ] Timeline de fabricación

- [ ] Proveedor collar / vaper sin nicotina:
  - [ ] Buscar fabricante (Aliexpress, proveedores locales)
  - [ ] Presupuesto y cantidad mínima
  - [ ] Packaging (personalizado con marca)

### Logística
- [ ] Definir costo de envío (incluido en €299 o extra)
- [ ] Elegir operador (DHL, Correos, similar)
- [ ] Sistema de tracking integrado a Sheet
- [ ] Crear instrucciones de uso (PDF)

---

## ✅ SEMANA 4-6: Grabar Contenido (Semanas 5-12)

### FASE 2 (Semanas 5-8) - Descondicionar Triggers
- [ ] Lecciones 13-24 (similar estructura: 7-8 min + ejercicio)
  - Tema: estrés, trabajo, social, emociones
  - Técnicas específicas por trigger

### FASE 3 (Semanas 9-12) - Identidad + Prevención
- [ ] Lecciones 25-36
  - Tema: refuerzo identidad, comunidad, mantención
  - Bonus: plan post-protocolo

- [ ] Bonus/Recursos:
  - [ ] Guía descargable completa
  - [ ] Meditaciones guiadas (Spotify embed o local)
  - [ ] Playlist motivacional
  - [ ] Workbook PDF (todas las semanas)

---

## ✅ SEMANA 5-6: Comunidad Privada

### Elegir plataforma
- [ ] Setup Discord / Telegram / WhatsApp Business / Mighty Networks
- [ ] Crear estructura de canales:
  - [ ] #general (anuncios)
  - [ ] #semana-X (por fase)
  - [ ] #victorias (celebraciones)
  - [ ] #duda-coach (preguntas al coach)
  - [ ] #post-protocolo (mantención)

### Automation
- [ ] Script agregar usuario a comunidad post-compra
- [ ] Bot para recordatorios diarios (opcional)
- [ ] Crear guía de community guidelines

---

## ✅ SEMANA 6: Coaching 1:1

- [ ] Crear sistema de booking (Calendly + Google Calendar)
- [ ] Plantilla sesión coaching:
  - [ ] Caso de uso por persona (4 plantillas)
  - [ ] Script de llamada (15-30 min)
  - [ ] Worksheet sesión
  - [ ] Follow-up email
- [ ] Definir horarios disponibles (coach)
- [ ] Setup Zoom / Meet integrado

### Garantía
- [ ] Crear política "recaída en 4 semanas = sesión extra gratis"
- [ ] Sistema de tracking (Sheet con flags)

---

## ✅ SEMANA 6-7: Testing Completo

### Flujo Usuario
- [ ] Test landing → quiz → resultado → checkout
- [ ] Test email secuencia (automáticos, timestamps)
- [ ] Test acceso LMS post-pago
- [ ] Test entregas suplementos + collar
- [ ] Test acceso comunidad privada

### Técnico
- [ ] Test Stripe con tarjeta de prueba
- [ ] Test webhook (pago confirmado → automations)
- [ ] Test responsivo (mobile, tablet, desktop)
- [ ] Performance (página carga < 2s)
- [ ] SEO básico (meta tags, H1-H6, Open Graph)

### Compliance
- [ ] GDPR: política privacidad + consentimiento
- [ ] Términos de servicio
- [ ] Disclaimers médicos (no es medicina, es educación)
- [ ] Refunds policy

---

## ✅ SEMANA 7: Email Automation + Soporte

### Secuencia Pre-Lanzamiento (si beta)
- [ ] Email 1 (0h): Bienvenida + acceso LMS
- [ ] Email 2 (24h): "Tu primer video te espera"
- [ ] Email 3 (3 días): Check-in + motivación
- [ ] Email 4 (7 días): Resumen semana 1 + tips
- [ ] Email 5 (14 días): Transición a Semana 2

### Soporte
- [ ] Setup email support (soporte@dejardefumar.es)
- [ ] Crear FAQ + autorespuesta
- [ ] Tiempo respuesta: < 24h
- [ ] Herramienta ticket (gratuita: Helpscout trial o email manual)

---

## ✅ SEMANA 7-8: Marketing + Go-Live

### Pre-Lanzamiento
- [ ] LinkedIn post (teaser)
- [ ] Email a contactos (early access)
- [ ] SMS a lista (si existe)
- [ ] Crear página de espera (landing pre-lanzamiento)
- [ ] Definir presupuesto ads (Google, Meta)

### Go-Live Checklist Final
- [ ] ✓ Landing live + indexado en Google
- [ ] ✓ Quiz funcional
- [ ] ✓ Stripe en modo live (no sandbox)
- [ ] ✓ Emails automatizados confirmados
- [ ] ✓ LMS semanas 1-4 completas y testing
- [ ] ✓ Comunidad privada activa y moderada
- [ ] ✓ Coaching 1:1 disponible + Calendly funcional
- [ ] ✓ Seguimiento de suplementos/collar (proveedor confirmado)
- [ ] ✓ Disclaimers legales en footer
- [ ] ✓ Analytics tracking confirmado

### Día Lanzamiento
- [ ] ✓ Test transacción real (pequeño monto)
- [ ] ✓ Verificar email de bienvenida
- [ ] ✓ Verificar acceso LMS
- [ ] ✓ Comunicado a comunidad (si beta)
- [ ] ✓ Monitor 404s, errores (Google Search Console)

---

## ✅ POST-LANZAMIENTO (Semanas 9-12)

- [ ] Monitoreo diario de conversiones
- [ ] Soporte activo a primeros clientes
- [ ] Grabar contenido semanas 5-12 (en paralelo)
- [ ] Optimizaciones (A/B landing, copy)
- [ ] Recolectar testimonios de primeros clientes
- [ ] Ajustes según feedback

---

## 📊 Métricas a Trackear Desde Día 1

- [ ] Visitantes únicos landing
- [ ] % Quiz completado
- [ ] % Conversión quiz → pago
- [ ] Revenue diario
- [ ] Email open rates
- [ ] LMS completion (% users en cada semana)
- [ ] Engagement comunidad (posts/comentarios)
- [ ] Soporte tickets
- [ ] Churn (quién abandona y por qué)

---

**⏰ Timeline:** Semana 8 = LANZAMIENTO  
**💰 Objetivo Año 1:** 100 clientes/mes = €431.400  
**🎯 KPI Crítico:** 3-5% conversión landing → compra
