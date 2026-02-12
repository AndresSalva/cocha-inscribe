# Sistema de Inscripción Escolar - Gobierno Municipal de Cochabamba

![Angular](https://img.shields.io/badge/Angular-18%2B-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Plataforma oficial de gestión de inscripciones escolares para unidades educativas públicas y de convenio. Diseñada como una **Single Page Application (SPA)** moderna, de alto rendimiento y preparada para integración escalable.

---

## 🏗️ Arquitectura del Sistema

El proyecto sigue estrictamente los principios de **Clean Architecture** y **SOLID**, garantizando un código desacoplado, testeable y mantenible.

### 📐 Patrón de Diseño: Clean Architecture (Capas)

La estructura del código fuente está dividida en 3 capas concéntricas, donde las dependencias apuntan solo hacia adentro.

1.  **Capa de Dominio (`src/app/domain`)**: *El núcleo agnóstico.*
    *   **Models**: Entidades de negocio puras (e.g., `Student`, `School`).
    *   **Repositories (Interfaces)**: Contratos abstractos que definen *qué* datos necesitamos, sin importar de *dónde* vienen.
    *   **Use Cases**: Reglas de negocio específicas (e.g., `ValidateStudentUseCase`). Orquestan el flujo de datos.

2.  **Capa de Datos (`src/app/data`)**: *La implementación concreta.*
    *   **Repositories (Impl)**: Implementaciones reales de las interfaces del dominio. 
    *   *Nota*: Actualmente utiliza **Mock Data** (datos simulados en memoria) para emular una API REST, facilitando el desarrollo frontend independiente. Cambiar a una API real (Backend) solo requiere modificar estos archivos, sin tocar la UI.

3.  **Capa de Presentación (`src/app/presentation`)**: *La interfaz de usuario.*
    *   **Components & Pages**: Vistas construidas con Angular Signals.
    *   **UI/UX**: Diseño responsivo con Tailwind CSS, animaciones fluidas y Modo Oscuro nativo.

---

## 🚀 Características Principales

### ✅ Funcionalidades Incluidas (IN)
*   **Catálogo de Colegios**: Búsqueda, filtrado y vista detallada de unidades educativas con gestión de cupos en tiempo real.
*   **Inscripción Digital (Wizard)**: Flujo paso a paso para padres de familia.
*   **Identidad Digital**: Validación de CI y Liveness Test (Prueba de vida con cámara).
*   **Gestión Documental**: Carga y previsualización de requisitos en formato digital.
*   **Modo Oscuro**: Soporte nativo para temas Claro/Oscuro.

### 🚫 Fuera del Alcance (OUT)
*   Gestión académica (notas/asistencia).
*   Pagos en línea (pasarelas bancarias).
*   Inscripciones universitarias.

---

## 💻 Instalación y Ejecución

### Requisitos Previos
*   **Node.js**: v18 o superior.
*   **NPM**: v9 o superior.

### Pasos para levantar el proyecto

1.  **Clonar el repositorio** (si aplica) o navegar a la carpeta raíz.
    ```bash
    cd sistema-de-inscripcion-escolar-bolivia
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    # Esto descargará todas las librerías necesarias de Angular y Tailwind.
    ```

3.  **Ejecutar el servidor de desarrollo**:
    ```bash
    npm start
    ```
    O alternativamente:
    ```bash
    ng serve
    ```

4.  **Abrir en el navegador**:
    La aplicación estará disponible automáticamente en:
    `http://localhost:3000/` (o el puerto que indique la consola).

---

## 🛠️ Tecnologías Clave

*   **Angular (Latest)**: Framework SPA robusto.
*   **Angular Signals**: Para una gestión de estado reactiva y granular sin Zone.js overhead.
*   **Tailwind CSS**: Framework de utilidad para estilos rápidos y consistentes.
*   **RxJS**: Manejo de flujos de datos asíncronos.

---

## 🧪 Próximos Pasos (Roadmap Técnico)

1.  **Conexión Backend**: Reemplazar los Mock Repositories por implementaciones `HttpClient` reales.
2.  **PWA (Progressive Web App)**: Habilitar capacidades offline y "Instalar en pantalla de inicio".
3.  **Mapas Interactivos**: Integrar Leaflet o Google Maps en el detalle del colegio.

---
*Desarrollado para la materia de Ingeniería de Software.*
