# Task Manager Frontend

Una aplicación de gestión de tareas colaborativa desarrollada en **React** con **TypeScript**, optimizada para dispositivos móviles mediante un diseño **responsive**. La aplicación ofrece un flujo de autenticación seguro, un tablero Kanban intuitivo y colaboración en tiempo real gracias a **Socket.IO**.

## Características

### Autenticación

- **Registro y Login:**
  - Registro de usuario mediante nombre, email y contraseña.
  - La contraseña debe tener un mínimo de 8 caracteres, incluyendo al menos una mayúscula, una minúscula, un número y un símbolo.
- **Protección de Rutas:**
  - La aplicación cuenta con una pantalla de autenticación que impide el acceso a otras áreas sin haber iniciado sesión.

### Gestión de Tareas

- **Tablero Kanban:**
  - Tres columnas: **TODO**, **IN PROGRESS** y **DONE**.
- **Operaciones CRUD:**
  - **Crear:** Añade tareas con título, descripción y fecha de creación automática. Todas las tareas inician en la columna **TODO**.
  - **Editar:** Modifica el título y la descripción de la tarea.
  - **Eliminar:** Remueve tareas.
  - **Cambiar Estado:** Permite mover tareas entre columnas mediante arrastrar y soltar (_drag & drop_).

### Funcionalidad Colaborativa

- **Invitación a Colaboradores:**
  - El usuario _owner_ puede invitar a otros usuarios para colaborar en la actualización de estados de tareas.
  - El usuario invitado recibe una alerta de invitación y puede **aceptar** o **rechazar**.
    - Si acepta, se convierte en colaborador y puede actualizar el estado de las tareas.
    - Si rechaza, continúa utilizando la aplicación como usuario normal.
- **Restricciones para Colaboradores:**
  - Los colaboradores no tienen acceso a las funciones de creación, edición ni eliminación de tareas.
- **Desvinculación:**
  - El colaborador puede desvincularse para volver a su flujo normal de usuario.

### Comunicación en Tiempo Real

- **Socket.IO:**
  - Facilita la comunicación en tiempo real entre el _owner_ y el colaborador, permitiendo actualizaciones instantáneas.

### Sesión

- **Cierre de Sesión:**
  - Todos los usuarios pueden cerrar sesión de manera segura.

## Instalación y Ejecución

### Requisitos previos:

- **Node.js** >= 14.x
- **Yarn** instalado globalmente (`npm install -g yarn`)
- Navegador actualizado para pruebas de la versión web.

### Instalación de Node.js (si no está instalado):

1. **Verificar si Node.js está instalado:**

   ```bash
   node -v
   ```

   Si recibes un mensaje de error o no muestra la versión, sigue los siguientes pasos.

2. **Instalar Node.js:**

   - **Windows y macOS:**

     - Visita [https://nodejs.org/](https://nodejs.org/).
     - Descarga la versión LTS recomendada.
     - Ejecuta el instalador y sigue las instrucciones en pantalla.

   - **Linux (Debian/Ubuntu):**

     ```bash
     sudo apt update
     sudo apt install -y nodejs npm
     ```

3. **Verificar la instalación:**

   ```bash
   node -v
   npm -v
   ```

### Pasos de instalación:

1. **Clonar el repositorio:**

   ```bash
   git clone https://mirepo
   cd LEMONFE
   ```

2. **Instalar dependencias:**

   ```bash
   yarn install
   ```

3. **Configurar variables de entorno (si aplica):**

    En este proyecto, el archivo `.env` se incluye directamente en el repositorio para facilitar el acceso a las variables de entorno necesarias. Asegúrate de que el archivo esté presente en la raíz del proyecto.

4. **Inicializar la aplicación:**

- **desarrollo:**

   ```bash
   yarn dev
   ```

5. **Test unitarios (Jest) y de integración (RNTL):**
 
   ```bash
   yarn vitest
   ```
---

Este documento proporciona una guía completa para la configuración y uso de la aplicación **LemonFE**, garantizando una experiencia colaborativa fluida y segura, optimizada para dispositivos móviles mediante un diseño responsive.
