# 💰 API de Préstamos (Backend)

Este proyecto es la API REST (Backend) para el sistema de administración de préstamos financieros. Está construido con Node.js, Express y MySQL.

## 🚀 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
* **Node.js** (versión 16 o superior)
* **MySQL** (por ejemplo, a través de XAMPP, Laragon o de forma nativa) con el servidor encendido.

---

## 🛠️ Instalación y Configuración

1. **Clonar o descargar** este proyecto.
2. Abre una terminal en esta carpeta y ejecuta el siguiente comando para instalar las dependencias:
   ```bash
   npm install
   ```
3. **Configurar el entorno:**
   * Crea un archivo llamado `.env` en la raíz del proyecto.
   * Puedes copiar el contenido del archivo plantilla `.env.example` y adaptarlo a tus credenciales locales de MySQL:
     ```env
     JWT_SECRET=mi_clave_secreta_123
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=tu_contraseña_de_mysql
     DB_NAME=db_prestamos
     ```

---

## 🗄️ Inicialización de la Base de Datos

**¡No necesitas crear ninguna base de datos ni tabla manualmente!** 

El backend cuenta con un script de inicialización automática en `app/config/db.js`. Al ejecutar el comando de desarrollo por primera vez, el backend:
1. Creará la base de datos especificada en tu `.env` (por defecto: `db_prestamos`) si no existe.
2. Creará la tabla `prestamos` con su estructura correspondiente si no existe.

---

## 💻 Ejecución

Para iniciar el servidor en modo de desarrollo en el puerto `3000`, ejecuta:
```bash
npm run dev
```

Deberías ver los siguientes mensajes en la consola confirmando el éxito:
```text
🔄 Inicializando base de datos...
✅ Base de datos y tabla "prestamos" listas.
Servidor corriendo en http://localhost:3000
```

---

## 🔒 Endpoints de la API

### Autenticación (Público)
* **`POST /api/login`**: Inicia sesión en el sistema.
  - **Body (JSON):**
    ```json
    {
      "usuario": "admin",
      "contraseña": "1234"
    }
    ```
  - **Respuesta:** Devuelve un token JWT válido por 2 horas.

### CRUD de Préstamos (Protegidos)
*Nota: Todos los siguientes endpoints requieren el encabezado `Authorization: Bearer <token_jwt>`.*

* **`GET /api/prestamos`**: Listar todos los préstamos.
* **`GET /api/prestamos/:id`**: Obtener detalles de un préstamo por ID.
* **`POST /api/prestamos`**: Registrar un nuevo préstamo.
  - **Body (JSON):**
    ```json
    {
      "cliente": "Nombre del Cliente",
      "monto": 500000,
      "tasa_interes": 2.5,
      "plazo_meses": 12,
      "estado": "Pendiente"
    }
    ```
* **`PUT /api/prestamos/:id`**: Actualizar un préstamo existente.
* **`DELETE /api/prestamos/:id`**: Eliminar un préstamo del sistema.
