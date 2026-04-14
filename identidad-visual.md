# Identidad Visual - FUMAR

## 🎨 Paleta de Colores

### Colores Primarios
- **Rojo Principal**: `#ff5555` - Energía, urgencia, cambio
- **Rojo Oscuro**: `#dd1111` - CTA, énfasis
- **Rojo Degradado**: Gradient `#ff5555` → `#ff8888` - Textos destacados, heroicos

### Colores Secundarios
- **Púrpura Oscuro**: `#6b2d7b` - Profundidad, introspección
- **Púrpura Suave**: `rgba(100, 50, 150, 0.1)` - Fondos, elementos de fondo

### Colores Neutrales
- **Negro Profundo**: `#0a0a0a` - Fondo principal
- **Negro Azulado**: `#0f0f1e` - Fondos secundarios
- **Gris Oscuro**: `#1a0a15` - Gradientes de fondo
- **Gris Medio**: `#a0a0a0` - Textos secundarios
- **Blanco/Gris Claro**: `#e0e0e0`, `#c0c0c0`, `#b0b0b0` - Textos principales

### Usos por Elemento
```
CTA Buttons: Gradient rojo (#ff5555 → #cc2222)
Textos emphasis: #ff7777 o gradient rojo
Fondos: Negro profundo (#0a0a0a) con gradientes sutiles
Glassmorphism: rgba con púrpura/rojo al 5-10%
```

---

## 🔤 Tipografía

### Fuentes
- **Títulos/Headlines**: `Poppins` (600, 700, 800)
  - H1: 5rem (clamp 2rem-4rem), weight 800, line-height 1.1
  - H2: 3rem (clamp 1.8rem-2.8rem), weight 800, line-height 1.2
  - H3: 2.2rem (clamp 1.6rem-2.2rem), weight 800, line-height 1.3

- **Cuerpo/Body**: `Inter` (400, 500, 600, 700)
  - P: 1.05rem, weight 400, line-height 1.8-1.9
  - Small: 0.95rem-1rem, weight 400

### Características
- **Letter-spacing negativo** en headlines para mayor impacto: -0.5px en H1
- **Line-height generoso** para legibilidad emocional: 1.8-1.9 en párrafos
- **Gradientes de texto** en headlines principales para destacar
- **Bold estratégico**: Palabras clave en rojo (#ff7777) dentro de párrafos

---

## 🎯 Componentes Visuales

### Botones CTA
```css
Padding: 16px 40px (desktop), 14px 32px (mobile)
Border-radius: 50px (muy redondeado)
Font: Poppins 700, uppercase, letter-spacing 1.5px
Background: Linear-gradient(135deg, #ff5555 0%, #cc2222 100%)
Box-shadow: 0 20px 50px rgba(255, 85, 85, 0.3)
Hover: 
  - Transform: translateY(-6px)
  - Shadow: 0 30px 70px rgba(255, 85, 85, 0.4)
Efecto: Shimmer de luz blanca en hover (left -100% → 100%)
```

### Secciones Visuales (Images)
```css
Border-radius: 20px
Border: 1px solid rgba(255, 85, 85, 0.15)
Height: 400px (desktop), 300px (mobile)
object-fit: cover
Box-shadow: subtle (inherit de glassmorphism)
```

### Glassmorphism Elements
```css
Background: linear-gradient(135deg, rgba(color, 0.05-0.1))
Border: 1px solid rgba(255, 85, 85, 0.1-0.2)
Backdrop-filter: blur(10px)
Border-radius: 20px (sections), 30px (major containers)
```

### Cards/Pain Points
```css
Background: linear-gradient(135deg, rgba(100, 10, 10, 0.15) 0%, rgba(80, 20, 20, 0.05) 100%)
Border-left: 4px solid #ff5555
Padding: 24px
Margin: 24px 0
Border-radius: 8px
Border-top: 1px solid rgba(255, 85, 85, 0.3)
Hover: Padding-left += 4px, background más opaca
```

---

## ✨ Animaciones

### Keyframe Animations
```css
@keyframes slideInLeft
  Duration: 1s
  Easing: cubic-bezier(0.34, 1.56, 0.64, 1) [bounce]
  From: opacity 0, translateX(-60px)

@keyframes slideInUp
  Duration: 1.2s
  Easing: cubic-bezier(0.34, 1.56, 0.64, 1)
  From: opacity 0, translateY(40px)

@keyframes fadeInUp
  Duration: 0.8s
  Easing: ease-out
  From: opacity 0, translateY(30px)

@keyframes floatUp
  Duration: 3s
  Easing: ease-in-out
  Perpetual: translateY(0px) → translateY(-30px) → translateY(0px)

@keyframes pulse
  Duration: 3s
  Easing: ease-in-out
  Perpetual: opacity/scale cycle

@keyframes shimmer
  Duration: 3s
  Effect: Gradiente light que cruza elementos
```

### Scroll Reveal
```css
trigger: Cuando elemento está 100px antes de viewport bottom
Easing: slideInFade 0.8s ease-out
Staggered: Secciones con delay incremental (0.2s, 0.3s, 0.4s...)
```

### Transiciones
```css
Default: all 0.3s-0.4s ease / cubic-bezier
Buttons: 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)
Images: 0.3s ease (hover effects)
```

---

## 📐 Espaciado & Layout

### Márgenes/Padding
```
Hero: 80px 20px (desktop), 60px 20px (tablet), 40px 16px (mobile)
Sections: 120px 40px (desktop), 80px 40px (tablet), 60px 24px (mobile)
Pre-quiz: 150px 40px (desktop), 80px 24px (mobile)
```

### Grid/Layout
```
Hero: 2 columnas (1fr 1fr), gap 60px
  → 1 columna en tablet
  
Sections: 2 columnas alternadas (1fr 1fr), gap 80px
  → 1 columna en tablet
  → Invertida en pares (direction: rtl)

Max-width: 1100px (contenedor principal)
```

### Whitespace
- Generoso entre secciones (100px+ de gap vertical)
- Aire alrededor de imágenes (20-30px)
- Breathing room en texts (line-height 1.8+)

---

## 📸 Fotografía & Imaginería

### Estilo Fotográfico
- **Realista y relatable**: Personas reales en situaciones cotidianas
- **Emocional**: Expresiones auténticas y vulnerables
- **Cinematográfico**: Iluminación natural cálida, profundidad de campo
- **Tonalidad**: Colores naturales con emphasis en warm tones
- **Formato**: Cuadrado o ligeramente rectangular (no ultra-wide)

### Sujetos
1. **Foto 1 (Ciclo)**: Persona en ambiente, visible ansiedad/estrés
2. **Foto 2 (Intentos)**: Frustración, fracaso emocional visible
3. **Foto 3 (Costo)**: Dolor emocional, relaciones tensas
4. **Foto 4 (Verdad)**: Esperanza, determinación, cambio

### Tratamiento
- Sin filters excesivos
- Colores saturados pero naturales
- Contrast mediano-alto
- Bordes redondeados (border-radius: 20px) en display
- Sin viñeta oscura adicional

---

## 🎭 Tone of Voice Visual

- **Oscuro pero esperanzador**: Negro profundo + rojo vibrante
- **Cercano pero profesional**: Personas reales + diseño pulido
- **Directo y emotivo**: Sin fluff visual, máximo impacto
- **Moderno pero accesible**: Glassmorphism sin ser excesivo

---

## 🔧 Efectos & Micro-interacciones

### Hover Effects
- CTA Buttons: Lift + glow expand
- Pain points: Slide left border + background change
- Links: Color shift rojo (#ff7777)

### Loading/Transition
- Shimmer effect en images/buttons (3s perpetual)
- Fade in on scroll (0.8s ease-out)
- Pulse effect en hero visual (subtil, 3s)

### Visual Feedback
- Cursor pointer en CTAs
- Box-shadow expansion en hover
- Color shift en text (white → gradient rojo)

---

## 📱 Responsive Breakpoints

```
Desktop: > 1024px
  - 2 columnas
  - Espaciado 80-120px
  - Font sizes sin clamp

Tablet: 768px - 1024px
  - 1 columna
  - Espaciado 60-80px
  - Ajustes clamp activos

Mobile: < 768px
  - 1 columna
  - Espaciado 50-60px
  - Font sizes pequeñas (1.8rem max H1)
  - Padding reducido (24px lateral)
  
Extra-small: < 480px
  - Font minúsculas (1.5rem H1)
  - Padding 16px lateral
```

---

## 🎨 Uso de la Identidad

### En Nuevas Páginas
1. **Mantener paleta rojo + negro + púrpura**
2. **Usar Poppins + Inter siempre**
3. **Glassmorphism para fondos/cards**
4. **Animaciones suaves con cubic-bezier bounce**
5. **Espaciado generoso (80px+ entre secciones)**
6. **Fotografía realista y emocional**

### Variaciones Permitidas
- Ajustar opacidades de gradientes (5%-20%)
- Cambiar tamaños de border-radius (8px-30px rango)
- Modificar duración de animaciones (0.3s-1.5s)
- Ajustar font sizes con clamp() responsive

### Lo Que NO Hacer
- ❌ Cambiar paleta de colores primaria (rojo)
- ❌ Usar otras fuentes (Poppins + Inter only)
- ❌ Glassmorphism excesivo (blur > 15px)
- ❌ Animaciones muy rápidas (< 0.3s) o muy lentas (> 2s)
- ❌ Fotografías abstractas (must be relatable)
- ❌ Colores pasteles o muy claros

---

## 📋 Checklist para Nuevos Elementos

- [ ] ¿Usa Poppins para títulos e Inter para cuerpo?
- [ ] ¿Los colores son rojo/negro/púrpura?
- [ ] ¿Hay espaciado generoso (80px+)?
- [ ] ¿Las animaciones usan ease-out o cubic-bezier?
- [ ] ¿Las imágenes son realistas y emocionales?
- [ ] ¿Es responsive (clamp, mobile-first)?
- [ ] ¿Hay glassmorphism sutil en fondos?
- [ ] ¿El CTA es rojo con 50px border-radius?

---

**Última actualización**: Abril 2026  
**Versión**: 1.0  
**Responsable**: Enrique & Claude
