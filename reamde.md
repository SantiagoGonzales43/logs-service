# Microservicio de Logs

## Descripción

Este microservicio es responsable de recibir y almacenar eventos de log generados por otros servicios o componentes de la aplicación. Su objetivo principal es centralizar la información de logging para facilitar el monitoreo y la depuración del sistema. Actualmente, permite la creación y la recuperación básica de logs.

## Funcionalidades Principales

* **Recepción de Logs (`POST /logs`):** Permite enviar eventos de log al microservicio para su almacenamiento.
* **Obtención de Logs (`GET /logs`):** Permite recuperar todos los logs almacenados.

## Tecnologías Utilizadas

* Node.js
* Express.js
* Mongoose (para la interacción con MongoDB)
* MongoDB

## Requisitos Previos

* Node.js (versión 18 o superior recomendada)
* npm o yarn instalado
* Acceso a una instancia de MongoDB (la URI de conexión debe estar configurada)

## Configuración

1.  **Clonar el repositorio (si aplica):**
    ```bash
    git clone https://github.com/SantiagoGonzales43/logs-service.git
    cd backend
    ```

2.  **Instalar las dependencias:**
    ```bash
    npm install
    # o
    yarn install
    ```

3.  **Configurar la conexión a MongoDB:**
    La URI de conexión a MongoDB se configura en el archivo `.env` (si lo utilizas) o directamente en el archivo `db.mjs`. Asegúrate de que la variable `MONGODB_URI` esté correctamente establecida. Ejemplo:
    ```
    MONGODB_URI=mongodb://localhost:27017/nombre_de_tu_base_de_datos_logs
    ```

4.  **Configurar el puerto del servidor (opcional):**
    El puerto en el que se ejecuta el microservicio se define en el archivo `app.mjs` (por defecto suele ser 3000). Puedes modificarlo si es necesario.

## Ejecución del Servicio

```bash
npm start
# o
yarn start