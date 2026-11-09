# Proyecto Final TechLab - API REST de productos

API REST para administrar el catálogo de productos de un cliente. Permite **leer, crear y eliminar** productos, que se guardan en **Firestore (Firebase)**, y protege las rutas con **autenticación JWT**.

## Tecnologías

- Node.js (ES Modules)
- Express
- Firebase / Firestore
- JSON Web Token (`jsonwebtoken`)
- CORS, body-parser, dotenv

## Deploy

La API está desplegada en Render:

**https://proyecto-final-techlab.onrender.com**

> Está en el plan gratuito de Render: si estuvo un rato sin uso, la primera petición puede tardar hasta un minuto en responder.

## Estructura del proyecto

```
├── config/          # Configuración de servicios externos (Firebase)
├── controllers/     # Controladores de cada ruta
├── middlewares/     # Middlewares (autenticación JWT)
├── models/          # Acceso a datos (Firestore)
├── routes/          # Definición de rutas
├── services/        # Lógica de negocio
├── index.js         # Punto de entrada
└── package.json
```

## Instalación y ejecución local

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/juanimorana/proyecto-final-techlab.git
   cd proyecto-final-techlab
   ```

2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Crear un archivo `.env` en la raíz con las variables de entorno (ver sección siguiente).

4. Iniciar el servidor:

   ```bash
   npm run start
   ```

   El servidor queda disponible en `http://localhost:3000`.

## Variables de entorno

Crear un archivo `.env` con estas variables (los valores de Firebase salen de la configuración web del proyecto en la consola de Firebase):

```
PORT=3000
JWT_SECRET=
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
```

## Autenticación

Para usar las rutas protegidas hay que hacer login y enviar el token en el header `Authorization`.

**Usuario de prueba:**

| Usuario | Contraseña |
| ------- | ---------- |
| `admin` | `admin123` |

## Endpoints

### Auth

| Método | Ruta          | Descripción                                                  |
| ------ | ------------- | ------------------------------------------------------------ |
| POST   | `/auth/login` | Recibe las credenciales y devuelve el Bearer token si son válidas |

**Ejemplo de body:**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Respuesta (200):**

```json
{
  "token": "Bearer eyJhbGciOi..."
}
```

Si las credenciales no son válidas devuelve `401`.

### Productos

Enviar el header `Authorization: Bearer <token>` en las rutas protegidas.

| Método | Ruta                    | Descripción                                |
| ------ | ----------------------- | ------------------------------------------ |
| GET    | `/api/products`         | Devuelve todos los productos               |
| GET    | `/api/products/:id`     | Devuelve el producto con el ID indicado    |
| POST   | `/api/products/create`  | Crea un nuevo producto                     |
| DELETE | `/api/products/:id`     | Elimina el producto con el ID indicado     |

**Ejemplo de body para crear un producto:**

```json
{
  "name": "Teclado Mecánico Redragon",
  "price": 45000,
  "description": "Teclado gamer con switches red"
}
```

**Respuesta (201):**

```json
{
  "id": "tCU6vEmbgKurgHjl0bqf",
  "name": "Teclado Mecánico Redragon",
  "price": 45000,
  "description": "Teclado gamer con switches red"
}
```

## Manejo de errores

| Código | Cuándo ocurre                                                    |
| ------ | ---------------------------------------------------------------- |
| 400    | La petición contiene errores (por ejemplo, datos inválidos)      |
| 401    | Falta el token o las credenciales son inválidas                  |
| 403    | Token inválido o sin permisos                                    |
| 404    | Ruta no definida o producto inexistente                          |
| 500    | Error interno o el servicio externo de datos no responde         |

## Ejemplo de uso con cURL

```bash
# 1. Login
curl -X POST https://proyecto-final-techlab.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# 2. Listar productos (reemplazar <token> por el valor recibido)
curl https://proyecto-final-techlab.onrender.com/api/products \
  -H "Authorization: Bearer <token>"
```

> Si el token que devuelve el login ya incluye la palabra `Bearer`, copiarlo completo en el header.
