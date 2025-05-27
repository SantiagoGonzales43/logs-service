Sistema de Microservicio de Logs
    Este proyecto implementa un microservicio fundamental para la gestión de logs, centralizando la recolección y consulta de eventos. Desarrollado con Node.js, Express y MongoDB, prioriza una seguridad clara a través de mecanismos de autenticación y autorización esenciales.

Tabla de Contenidos
    Visión General
    Funcionamiento del Sistema de Logs
    Sistema de Autenticación
    Autenticación para Usuarios (JWT)
    Autenticación para Servicios (API Keys)
    Sistema de Autorización
    Roles Definidos
    Cómo Funciona la Autorización
    Rutas de la API de Logs
    Rutas para Usuarios (/api/logs/user)
    Rutas para Servicios (/api/logs/service)
    Estructura de un Log
    Consideraciones de Diseño


1. Visión General
Este microservicio cumple con las funcionalidades básicas de un sistema de logs:

-Registro de Eventos: Permite crear y almacenar registros de eventos del sistema o de otras aplicaciones.

-Consulta de Logs: Ofrece métodos para recuperar logs, ya sea de forma general o filtrados por el ID de la entidad que los originó.

-Seguridad: Implementa autenticación (para verificar la identidad) y autorización (para controlar los permisos) de manera sencilla pero efectiva.


2. Funcionamiento del Sistema de Logs
Cada log es un documento guardado en MongoDB, que registra la información clave de un evento. La estructura principal de un log incluye:

    timestamp: Fecha y hora en que ocurrió el evento.
    level: Nivel de importancia o severidad (ej. INFO, ERROR, FATAL).
    message: Una descripción del evento.
    origen: El componente o servicio que generó el log (por defecto, system).
    resource_id: El ID único de la entidad (un usuario o una API Key) que creó el log.
    resource_type: Indica si el log fue creado por un user o una api-key.
    resource_name: El nombre de la entidad que generó el log, para fácil identificación.
    transaction_id: Un ID opcional para agrupar logs relacionados con una transacción específica.
    details: Un campo flexible para incluir información adicional estructurada.
    error: Un objeto opcional que contiene detalles si el log es de un evento de error (nombre, mensaje, stack trace).


3. Sistema de Autenticación
El microservicio utiliza dos métodos de autenticación para cubrir las necesidades de usuarios y servicios:

Autenticación para Usuarios (JWT)
Diseñada para aplicaciones front-end y usuarios humanos.

Cómo funciona:
    Después de que un usuario se registra o inicia sesión con éxito, el servidor genera un JSON Web Token (JWT). Este token contiene información básica del usuario, incluyendo su rol (ej. user o admin).
    El cliente (por ejemplo, una aplicación web) guarda este JWT.
    En cada solicitud a las rutas de logs protegidas, el cliente envía este JWT en el encabezado Authorization como un "Bearer Token".
    Un middleware (userAutentication) valida el JWT. Si es válido, la información del usuario se adjunta a req.user, permitiendo que la lógica de autorización acceda a su rol.

Autenticación para Servicios (API Keys)
Diseñada para que otros microservicios o aplicaciones de backend puedan interactuar de forma segura.

Cómo funciona:
    Se generan API Keys únicas, cada una con un ID público y una parte secreta.
    Cuando un servicio desea enviar o consultar logs, incluye su API Key completa en el encabezado x-api-key de la solicitud.
    Un middleware (apikeyAutentication) busca esta API Key en la base de datos, valida la parte secreta y verifica que la clave esté activa.
    Si la API Key es válida, el objeto completo de la API Key (que incluye su rol o permisos) se adjunta a req.apikey para su uso en la autorización.


4. Sistema de Autorización
Una vez que una solicitud es autenticada, la autorización decide si la entidad tiene permiso para realizar la acción solicitada. Este sistema se basa en un modelo de roles sencillo:

Roles Definidos
    user (para usuarios):
    Puede: Crear nuevos logs.
    No puede: Ver logs existentes ni buscar logs.

    admin (para usuarios y API Keys):
    Puede: Ver todos los logs, crear nuevos logs, y buscar logs por el ID de la entidad que los originó.
    Este rol confiere acceso completo a todas las operaciones de logs.
    Cómo Funciona la Autorización

    Para Usuarios:
    Un middleware de autorización (userAuthorization) verifica si el rol del usuario autenticado (obtenido del JWT) es compatible con la acción solicitada. Por ejemplo, para ver logs, el usuario debe tener el rol admin.
    Para Servicios (API Keys):
    Un middleware de autorización (apikeyAutorization) verifica si la API Key autenticada tiene el rol admin en su configuración. Solo las API Keys con este rol admin tendrán acceso a las operaciones protegidas.
    Si una entidad no tiene el rol necesario, la solicitud es rechazada con un código de estado 403 Forbidden.

5. Rutas de la API de Logs
Todas las rutas requieren autenticación previa. La autorización se aplica inmediatamente después de la autenticación.

Rutas para Usuarios (/api/logs/user)
Estas rutas están destinadas a ser utilizadas por aplicaciones de usuario.

POST /api/logs/user

Descripción: Crea un nuevo log, registrando que fue generado por el usuario autenticado.
Acceso Requerido: Autenticación JWT y rol user o admin.
Ejemplo de Body:
JSON

{
    "level": "INFO",
    "message": "Usuario ha accedido a la configuración.",
    "origen": "frontend-app",
    "details": {
        "seccion": "configuracion_perfil"
    }
}


GET /api/logs/user

Descripción: Obtiene una lista de todos los logs registrados en el sistema.
Acceso Requerido: Autenticación JWT y rol admin.
GET /api/logs/user/:id

Descripción: Recupera todos los logs que fueron generados por una entidad específica (un usuario o una API Key). El :id en la URL debe ser el resource_id (el ID del usuario o de la API Key) que deseas buscar.
Acceso Requerido: Autenticación JWT y rol admin.
Rutas para Servicios (/api/logs/service)
Estas rutas están destinadas a ser utilizadas por otros microservicios o sistemas.

POST /api/logs/service

Descripción: Crea un nuevo log, registrando que fue generado por la API Key autenticada.
Acceso Requerido: Autenticación con x-api-key y rol admin para la API Key.
Ejemplo de Body:
JSON

{
    "level": "ERROR",
    "message": "Fallo en el servicio de procesamiento de pagos.",
    "origen": "payment-processor",
    "error": {
        "name": "PaymentGatewayError",
        "message": "Conexión a pasarela fallida."
    }
}
GET /api/logs/service

Descripción: Obtiene una lista de todos los logs registrados en el sistema.
Acceso Requerido: Autenticación con x-api-key y rol admin para la API Key.
GET /api/logs/service/:id

Descripción: Recupera todos los logs que fueron generados por una entidad específica (un usuario o una API Key). El :id en la URL debe ser el resource_id (el ID del usuario o de la API Key) que deseas buscar.
Acceso Requerido: Autenticación con x-api-key y rol admin para la API Key.


6. Estructura de un Log
Aquí se muestra el esquema de Mongoose que define la estructura de cada documento de log:

JavaScript

// models/log.mjs
import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  level: {
    type: String,
    required: true,
    enum: ['DEBUG', 'INFO', 'WARNING', 'ERROR', 'FATAL']
  },
  message: {
    type: String,
    required: true,
    minLength: 1
  },
  origen: {
    type: String,
    default: 'system',
    description: 'Indica el componente o servicio que generó el log'
  },
  resource_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  resource_type: {
    type: String,
    enum: ['user', 'api-key'],
    required: true
  },
  resource_name: {
    type: String,
    required: true
  },
  transaction_id: {
    type: String,
    description: 'ID de la transacción o petición (para rastreo)'
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
    description: 'Información adicional estructurada relacionada con el log (opcional)'
  },
  error: {
    name: String,
    message: String,
    stack: String
  }
});

const Log = mongoose.model('Log', logSchema, 'logs');

export default Log;


7. Consideraciones de Diseño
Este microservicio está diseñado para ser un sistema de logs básico y funcional.

Inmutabilidad de Logs: Los logs, una vez creados, no pueden ser modificados ni eliminados a través de la API. Esto garantiza la integridad y la confianza en los registros históricos.
Funcionalidades Esenciales: Se enfoca en las operaciones principales de un sistema de logs: creación y lectura. Operaciones como la actualización o eliminación de logs no están implementadas en esta versión.
Seguridad Simplificada: La autenticación y autorización se basan en un modelo de roles user y admin para un control de acceso claro y fácil de entender.