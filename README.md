# Proyecto Técnico - Frontend (Dashboard)

Este proyecto es un dashboard web construido con Next.js y TypeScript para visualizar los datos procesados por el [proyecto backend de ETL](URL_DE_TU_REPOSITORIO_BACKEND). 
*(Recuerda cambiar la URL por la de tu repositorio de backend)*

La aplicación requiere autenticación de usuario para acceder a los datos.

## Características

* **Autenticación Mandatoria:** Implementa "Iniciar sesión con Google" (OAuth 2.0) usando **Next-Auth**. Las rutas están protegidas.
* **Visualización de Datos:** Muestra las corridas del pipeline desde la "tabla cabecera" (`/etl_runs`).
* **Filtro Interactivo:** Permite filtrar las corridas (Todas, Válidas, Con Errores) y la UI se actualiza reactivamente.
* **Ejecutor de SQL:** Cumpliendo con el diagrama de la prueba, incluye un componente para ejecutar consultas `SELECT` de forma segura contra la base de datos del backend.
* **Bonus (Gráficos):** Muestra 2 gráficos de resumen (Barras y Pastel) usando **Chart.js**, que también reaccionan al filtro de datos.

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

1.  Asegúrate de haber seguido los pasos del `README.md` del backend.
2.  Verifica que el backend esté corriendo:
    ```bash
    docker-compose up -d
    ```
3.  Verifica que la red del backend exista. Por defecto, se llama `proyecto-tecnico-backend_default`.

### 2. Configuración del Frontend

1.  **Clonar el repositorio:**
    *(Recuerda cambiar la URL por la de tu repositorio)*
    ```bash
    git clone https://www.google.com/search?q=https://github.com/tu-usuario/proyecto-tecnico-frontend.git cd proyecto-tecnico-frontend
    ```
2.  **Crear el archivo `.env.local`:**
    Crea un archivo llamado `.env.local` en la raíz y pega el siguiente contenido.
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
    Abre `docker-compose.yml` y asegúrate de que el nombre de la red externa (`external: true`) coincida con el nombre de tu red del backend (ej. `proyecto-tecnico-backend_default`).

### 3. Ejecutar la Aplicación

Usa Docker Compose para construir y levantar el servicio de frontend.
```bash
docker-compose up --build -d
```
### 4. Cómo Probar y Verificar

1.  **Abrir la aplicación:**
    Abre tu navegador y ve a la URL que definiste (ej. `http://localhost:3001`).

2.  **Probar Autenticación:**
    * Deberías ver la pantalla de "Acceso Denegado".
    * Haz clic en "Iniciar sesión con Google" y completa el flujo.

3.  **Verificar el Dashboard:**
    * Al volver, deberías ver tu nombre y la tabla "Corridas del Pipeline" con datos.
    * Prueba el **filtro desplegable**. La tabla y los gráficos deben actualizarse.
    * Prueba el **Ejecutor de SQL** (ej. `SELECT * FROM raw_users LIMIT 5;`).
    * Verifica que los **gráficos de bonificación** se muestren correctamente.
    * Haz clic en "Cerrar sesión" para volver a la pantalla de login.
