
# Task Manager Frontend

Una aplicación de gestión de tareas colaborativa desarrollada en React con TypeScript, optimizada para dispositivos móviles con un diseño responsive. Ofrece autenticación segura y un tablero Kanban para la colaboración en tiempo real.

## Características Principales

### 🔐 Autenticación
- **Registro de Usuario:** Utiliza nombre, email y contraseña (mínimo 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un símbolo).
- **Login Seguro:** Ingreso mediante credenciales validadas.
- **Protección de Rutas:** Acceso restringido a áreas privadas para usuarios no autenticados.

### 📋 Gestión de Tareas
- **Tablero Kanban Interactivo:** Con columnas TODO, IN PROGRESS, DONE.
- **Operaciones CRUD:** Crear, editar, eliminar y actualizar estado de tareas.
- **Drag & Drop:** Mover tareas entre columnas de manera intuitiva.

### 🤝 Funcionalidad Colaborativa
- **Gestión de Colaboradores:** Invitación a otros usuarios con notificaciones en tiempo real.
- **Roles y Permisos:** Definición de capacidades de colaboradores.

### 🔄 Comunicación en Tiempo Real
- **Integración con Socket.IO:** Sincronización instantánea de actualizaciones entre usuarios.

### 🚪 Gestión de Sesión
- **Cierre de Sesión Seguro:** Finalización de la sesión con invalidación de tokens.

## Requisitos Previos

- Node.js >= 14.x
- Yarn (instalado globalmente)

## Instalación

```bash
# Verificar instalación de Node.js
node -v

# Instalación de Node.js en Linux (Debian/Ubuntu)
sudo apt update
sudo apt install -y nodejs npm

# Clonar el repositorio
git clone https://mirepo
cd LEMONFE

# Instalar dependencias
yarn install

# Inicializar la aplicación
yarn dev
```

## Pruebas

```bash
# Ejecutar pruebas con Vitest
yarn vitest
```

## Optimización para Móviles

La aplicación sigue un enfoque mobile-first para garantizar una experiencia fluida tanto en móviles como en dispositivos de escritorio.

## Seguridad

Implementación de flujos de autenticación seguros y protección contra vulnerabilidades comunes. Gestión de sesiones con tokens JWT.

## Conclusión

Una herramienta versátil y escalable para mejorar la productividad de equipos mediante una experiencia intuitiva y colaboración en tiempo real.
