# Mesa de Entrada Digital - Agencia Tributaria Misiones

Sistema moderno de gestión de trámites gubernamentales desarrollado con React, TypeScript y Tailwind CSS.

## 🚀 Características

### Funcionalidades Principales
- **Flujo de 4 pasos** para completar trámites
- **Validación en tiempo real** de formularios
- **Upload de archivos** con drag & drop
- **Autenticación simulada** con AFIP
- **Previsualización** de documentos
- **Sistema de notificaciones** Toast

### Tipos de Solicitudes
- Nota Formal
- Consulta Tributaria
- Exclusión de Regímenes
- Consultas Vinculantes

## 🎨 Mejoras de UX/UI Implementadas

### Responsive Design
- ✅ **Mobile-first approach** con breakpoints optimizados
- ✅ **Adaptación perfecta** para móviles, tablets y desktop
- ✅ **ProgressIndicator** con versión móvil compacta
- ✅ **Navegación adaptativa** con botones apilados en móviles

### Animaciones y Transiciones
- ✅ **Animaciones personalizadas** (fade-in, slide-in, scale-in)
- ✅ **Micro-interacciones** en botones y elementos
- ✅ **Transiciones suaves** entre pasos
- ✅ **Efectos hover** mejorados
- ✅ **Loading states** con spinners personalizados

### Componentes Mejorados
- ✅ **Header responsive** con logo adaptativo
- ✅ **Formularios** con validación visual mejorada
- ✅ **File upload** con feedback visual
- ✅ **Toast notifications** para feedback del usuario
- ✅ **LoadingSpinner** reutilizable

### Accesibilidad
- ✅ **Focus states** mejorados
- ✅ **Contraste de colores** optimizado
- ✅ **Navegación por teclado** soportada
- ✅ **Screen reader** friendly

## 🛠️ Tecnologías

- **React 18** con TypeScript
- **Vite** para build y desarrollo
- **Tailwind CSS** para estilos
- **Lucide React** para iconos
- **Custom hooks** para lógica reutilizable

## 📱 Responsive Breakpoints

- **xs**: 475px (móviles pequeños)
- **sm**: 640px (móviles)
- **md**: 768px (tablets)
- **lg**: 1024px (desktop)
- **xl**: 1280px (desktop grande)
- **3xl**: 1600px (pantallas grandes)

## 🎯 Animaciones Personalizadas

```css
/* Fade in */
.animate-fade-in

/* Slide in from left/right */
.animate-slide-in-left
.animate-slide-in-right

/* Scale in */
.animate-scale-in

/* Pulse glow */
.animate-pulse-glow

/* Bounce slow */
.animate-bounce-slow
```

## 🚀 Instalación y Uso

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview build
npm run preview

# Linting
npm run lint
```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Header.tsx              # Header responsive
│   ├── ProgressIndicator.tsx   # Indicador de progreso
│   ├── LoadingSpinner.tsx      # Spinner personalizado
│   ├── Toast.tsx              # Notificaciones
│   └── steps/                 # Pasos del formulario
│       ├── EmailStep.tsx
│       ├── RequestStep.tsx
│       ├── PreviewStep.tsx
│       └── SendStep.tsx
├── hooks/
│   ├── useFormData.ts         # Lógica del formulario
│   └── useToast.ts           # Sistema de notificaciones
├── types/
│   └── index.ts              # Tipos TypeScript
└── data/
    └── requestTypes.ts       # Tipos de solicitudes
```

## 🎨 Personalización

### Colores del Tema
El proyecto usa la paleta de colores oficial de la Agencia Tributaria:
- **Azul principal**: `#1e3c72` a `#2a5298`
- **Rosa/Magenta**: `#5E2348`
- **Grises**: Escala de grises de Tailwind

### Componentes Reutilizables
- `LoadingSpinner`: Spinner con diferentes tamaños y colores
- `Toast`: Sistema de notificaciones
- `ProgressIndicator`: Indicador de progreso responsive

## 🔧 Configuración de Tailwind

El proyecto incluye configuración personalizada de Tailwind con:
- Breakpoints adicionales (xs, 3xl)
- Animaciones personalizadas
- Sombras personalizadas
- Transiciones optimizadas

## 📱 Compatibilidad

- ✅ **Chrome/Edge** (últimas versiones)
- ✅ **Firefox** (últimas versiones)
- ✅ **Safari** (últimas versiones)
- ✅ **Móviles** (iOS Safari, Chrome Mobile)
- ✅ **Tablets** (iPad, Android tablets)

## 🚀 Próximas Mejoras

- [ ] **Tema oscuro/claro**
- [ ] **PWA** (Progressive Web App)
- [ ] **Offline support**
- [ ] **Animaciones más avanzadas**
- [ ] **Tests unitarios**
- [ ] **E2E testing**

## 📄 Licencia

© 2025 Agencia Tributaria Misiones - Mesa de Entrada Digital 