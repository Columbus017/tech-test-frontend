# Technical Test - Frontend (Dashboard)
This project is a web dashboard built with Next.js and TypeScript to visualize the data processed by the [ETL Backend Project](https://github.com/Columbus017/tech-test-backend.git). 

The application requires user authentication to access the data.

## Tech Stack
* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript
* **Authentication:** Next-Auth
* **Styling:** Tailwind CSS
* **HTTP Requests:** Axios
* **Charts:** Chart.js (react-chartjs-2)
* **Containers:** Docker & Docker Compose

## Architecture (Component Diagram)

```
                                +---------------------------+
                                |      Google Cloud         |
                                | (OAuth 2.0 Credentials)   |
                                +---------------------------+
                                        ^
                                        | (Autenticación)
                                        v
(User) <--> [Browser] <--> [Servidor Next.js (Frontend)] <--> [Next-Auth API Routes]
                                         |
                                         | (HTTP Requests)
                                         v
                                +---------------------------+
                                |   Backend API (FastAPI)   |
                                |      (localhost:8000)     |
                                +---------------------------+
```
## Programming Practices

* **Environment Variables:** All secrets (Google Client ID/Secret, NextAuth Secret) are managed securely in `.env.local`.
* **Dockerization:** The frontend application is fully dockerized and connects to the backend's network.
* **Reusable Components:** UI logic is separated into components (e.g., `SqlRunner`, `DataCharts`).
* **React Hooks:** Use of `useState`, `useEffect` y `useCallback` or efficient state management and to prevent rendering bugs.
* **Protected Routes:** The main page checks the session status (`useSession`) before rendering data or the login screen.

---

## How to Run This Project

### Prerequisites

* [Git](https://git-scm.com/)
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)
* **Google OAuth 2.0 Credentials** (Client ID and Secret).

### 1. IMPORTANT! The Backend MUST Be Running

This frontend is 100% dependent on the backend's network and API.

1.  Ensure you have followed the steps in the backend's `README.md`.
2.  Verify the backend is running:

    ```bash
    docker-compose up -d
    ```
    
3.  Verify the backend's network exists. By default, it is named `proyecto-tecnico-backend_default`.

### 2. Frontend Setup

1.  **Clone the repository:**
    
    ```bash
    git clone https://github.com/Columbus017/tech-test-frontend.git cd tech-test-frontend
    ```
    
2.  **Create the `.env.local` file:**
    Create a file named `.env.local` in the root and paste the following content.
    
    ```.env
    URL of your API backend
    NEXT_PUBLIC_API_URL=http://localhost:8000

    --- Paste your credentials here ---
    GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

    Generate a secret for next-auth (e.g., run 'openssl rand -base64 32' in your terminal)
    NEXTAUTH_SECRET=YOUR_GENERATED_SECRET

    URL of your frontend (Make sure the port matches docker-compose.yml!)
    NEXTAUTH_URL=http://localhost:3000
    ```
    
3.  **Verify the Backend Network in `docker-compose.yml`:**
    Open `docker-compose.yml` and ensure the external network's (`external: true`) matches your backend's network name (e.g., `proyecto-tecnico-backend_default`).

### 3. Run the Application

Use Docker Compose to build and run the frontend service.

```bash
docker compose up --build -d
```

### 4. How to Test and Verify

1.  **Open the application:**
    Open your browser and go to the URL you defined (e.g., `http://localhost:3000`).

2.  **Test Authentication:**
    * You should see the "Access Denied" screen.
    * Click "Sign in with Google" and complete the login flow.

3.  **Verify the Dashboard:**
    * Upon returning, you should see your name and the "Pipeline Runs" table with data.
    * Test the filter dropdown. The table and charts should update.
    * Test the **SQL Runner** (e.g., `SELECT * FROM raw_users LIMIT 5;`).
    * Verify the **bonus charts** are displayed correctly.
    * Click "Sign out" to return to the login screen.

---

# Proyecto Técnico - Frontend (Dashboard)

Este proyecto es un dashboard web construido con Next.js y TypeScript para visualizar los datos procesados por el [proyecto backend de ETL](https://github.com/Columbus017/tech-test-backend.git). 

La aplicación requiere autenticación de usuario para acceder a los datos.

## Stack Tecnológico

* **Framework:** Next.js 14 (App Router)
* **Lenguaje:** TypeScript
* **Autenticación:** Next-Auth
* **Estilos:** Tailwind CSS
* **Peticiones HTTP:** Axios
* **Gráficos:** Chart.js (react-chartjs-2)
* **Contenedores:** Docker & Docker Compose

## Arquitectura (Diagrama de Componentes)

```
                                +---------------------------+
                                |      Google Cloud         |
                                | (OAuth 2.0 Credentials)   |
                                +---------------------------+
                                        ^
                                        | (Autenticación)
                                        v
(Usuario) <--> [Navegador] <--> [Servidor Next.js (Frontend)] <--> [Rutas API de Next-Auth]
                                         |
                                         | (Peticiones HTTP)
                                         v
                                +---------------------------+
                                |   API Backend (FastAPI)   |
                                |  (localhost:8000)         |
                                +---------------------------+
```

## Prácticas de Programación

* **Variables de Entorno:** Todos los secretos (Google Client ID/Secret, NextAuth Secret) se manejan de forma segura en `.env.local`.
* **Dockerización:** La aplicación de frontend está totalmente dockerizada y se conecta a la red del backend.
* **Componentes Reutilizables:** La lógica de la UI está separada en componentes (ej. `SqlRunner`, `DataCharts`).
* **Hooks de React:** Uso de `useState`, `useEffect` y `useCallback` para un manejo de estado eficiente y sin bugs de renderizado.
* **Rutas Protegidas:** La página principal verifica el estado de la sesión (`useSession`) antes de renderizar los datos o la pantalla de login.

---

## Cómo Ejecutar el Proyecto

### Requisitos Previos

* [Git](https://git-scm.com/)
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)
* **Credenciales de Google OAuth 2.0** (ID de Cliente y Secreto).

### 1. ¡IMPORTANTE! El Backend DEBE estar corriendo

Este frontend depende 100% de la red y el API del backend.

1.  Asegurarse de haber seguido los pasos del `README.md` del backend.
2.  Verificar que el backend esté corriendo:

    ```bash
    docker-compose up -d
    ```
    
3.  Verificar que la red del backend exista. Por defecto, se llama `proyecto-tecnico-backend_default`.

### 2. Configuración del Frontend

1.  **Clonar el repositorio:**
    
    ```bash
    git clone https://github.com/Columbus017/tech-test-frontend.git cd tech-test-frontend
    ```
    
2.  **Crear el archivo `.env.local`:**
    Crear un archivo llamado `.env.local` en la raíz y pega el siguiente contenido.
    
    ```.env
    URL de tu API backend
    NEXT_PUBLIC_API_URL=http://localhost:8000

    --- Pega tus credenciales aquí ---
    GOOGLE_CLIENT_ID=TU_ID_DE_CLIENTE_DE_GOOGLE GOOGLE_CLIENT_SECRET=TU_SECRETO_DE_CLIENTE_DE_GOOGLE

    Genera un secreto para next-auth (ej. ejecutando 'openssl rand -base64 32' en tu terminal)
    NEXTAUTH_SECRET=TU_SECRETO_GENERADO

    URL de tu frontend (¡Asegúrate de que el puerto coincida con docker-compose.yml!)
    NEXTAUTH_URL=http://localhost:3000
    ```
    
3.  **Verificar la Red del Backend en `docker-compose.yml`:**
    Abrir `docker-compose.yml` y asegurarse de que el nombre de la red externa (`external: true`) coincida con el nombre de tu red del backend (ej. `proyecto-tecnico-backend_default`).

### 3. Ejecutar la Aplicación

Usar Docker Compose para construir y levantar el servicio de frontend.

```bash
docker-compose up --build -d
```

### 4. Cómo Probar y Verificar

1.  **Abrir la aplicación:**
    Abrir el navegador e ir a la URL que definida (ej. `http://localhost:3000`).

2.  **Probar Autenticación:**
    * Deberías ver la pantalla de "Acceso Denegado".
    * Haz clic en "Iniciar sesión con Google" y completa el flujo.

3.  **Verificar el Dashboard:**
    * Al volver, deberías ver tu nombre y la tabla "Corridas del Pipeline" con datos.
    * Prueba el **filtro desplegable**. La tabla y los gráficos deben actualizarse.
    * Prueba el **Ejecutor de SQL** (ej. `SELECT * FROM raw_users LIMIT 5;`).
    * Verifica que los **gráficos de bonificación** se muestren correctamente.
    * Haz clic en "Cerrar sesión" para volver a la pantalla de login.
