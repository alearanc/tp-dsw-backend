# AlquileresApp
Backend para la plataforma **AlquileresApp**, desarrollado en Node.js con TypeScript. Este servidor proporciona una API RESTful que permite gestionar propiedades (inmuebles), usuarios y reservas para el alquiler temporal de inmuebles. Utiliza una Prisma como ORM para la conexión a una base de datos MySQL, gestionada mediante XAMPP.

## Requisitos previos
- Node.js
- XAMPP (para MySQL y Apache)
- Prisma CLI

## Instalación y configuración

1. Clonar el repositorio.
2. Instalar las dependencias:
   ```bash
   npm install
   ```
3. Configurar las variables de entorno en un archivo ``.env``, incluyendo la conexión a la base de datos:
   ```plaintext
   DATABASE_URL="mysql://root:@localhost:3306/testdb"
   ```
4. Ejecutar Prisma para sincronizar el esquema de la base de datos:
   ```bash
   npx prisma migrate dev
   ```
5. Iniciar el servidor en desarrollo:
   ```bash
   node run index.ts
   ```
## Estructura del proyecto
- **daos** - contiene los objetos de acceso a datos para interactuar con la base de datos. Cada archivo aquí representa una entidad o relación específica.
- **models** - define los modelos de datos que representan las tablas en la base de datos.
- **routes** - define los controladores que gestionan las rutas de la API.
- **services** - contiene la lógica de negocio y servicios adicionales.

## Endpoints
### Inmuebles
- **GET** `/inmueble/get`

  Retorna una lista de todos los inmuebles.

- **GET** `/inmueble/getMisInmuebles`  

  Retorna una lista de inmuebles asociados al usuario autenticado.

- **GET** `/inmueble/getInmuebleSinReservas`  

  Retorna inmuebles que no tengan reservas del usuario autenticado.

- **GET** `/inmueble/get/:id_inmueble`  

  Retorna un inmueble específico por su ID.

- **GET** `/inmueble/search/:criteria`  

  Realiza una búsqueda de inmuebles según el criterio especificado.

- **GET** `/inmueble/getByLocalidad/:idLocalidad`  

  Retorna inmuebles ubicados en una localidad específica.

- **GET** `/inmueble/getByTipoInmueble/:idTipoInmueble`  

  Retorna inmuebles de un tipo específico.

- **POST** `/inmueble/add`  

  Agrega un nuevo inmueble a la base de datos.

- **PUT** `/inmueble/toggleVisibilidad`  

  Cambia la visibilidad de un inmueble del usuario autenticado.

- **DELETE** `/inmueble/delete/:id_inmueble`  

  Elimina un inmueble específico por su ID.

- **PUT** `/inmueble/update/:id_inmueble`  

  Actualiza la información de un inmueble específico por su ID.

### Localidades
- **GET** `/localidad/getAll`  

  Retorna una lista de todas las localidades.

- **GET** `/localidad/get/:codigoPostal`

  Retorna una localidad específica por su código postal.

- **POST** `/localidad/add`  

  Agrega una nueva localidad.

- **DELETE** `/localidad/delete/:codigoPostal`  

  Elimina una localidad específica por su ID.

- **PUT** `/localidad/update/:codigoPostal`

  Actualiza la información de una localidad específica por su código postal.

### Servicios
- **GET** `/servicio/getAll`  

  Retorna una lista de todos los servicios.

- **GET** `/servicio/get/:id_servicio`  

  Retorna un servicio específico por su ID.

- **POST** `/servicio/add`  

  Agrega un nuevo servicio.

- **DELETE** `/servicio/delete/:id_servicio`  

  Elimina un servicio específico por su ID.

- **PUT** `/servicio/update/:id_servicio`

  Actualiza la información de un servicio específico por su ID.

### Usuarios
- **GET** `/api/persona/get`  

  Retorna una lista de todos los usuarios.

- **GET** `/persona/get/:id_usuario`  

  Retorna un usuario específico por su ID.

- **POST** `/persona/add`  

  Registra un nuevo usuario.

- **POST** `/persona/signin`

  Inicia sesión con un usuario.

- **POST** `/persona/recover_account`

  Permite a un usuario la recuperación de su cuenta.

- **POST** `/persona/reset_password`

  Permite a un usuario crear una contraseña nueva.

- **DELETE** `/persona/delete/:id_usuario`  

  Elimina un usuario específico por su ID.

- **PUT** `/persona/update/:id_usuario`

  Actualiza la información de un usuario específico por su ID.

### Reservas
- **GET** `/reserva/getReservas`  

  Retorna todas las reservas.

- **GET** `/reserva/getReservasByInmueble/:idInmueble`

  Retorna las reservas correspondientes a un inmueble por su ID.

- **GET** `reserva/getReservasCanceladas`

  Retorna las reservas canceladas por un usuario.

- **GET** `/reserva/getReservasPasadas`

  Retorna las reservas finalizadas correspondientes a un usuario.

- **GET** `reserva/hasFutureReservation/:id_inmueble`

  Determina si un inmueble posee reservas futuras.

- **POST** `/reserva/reservar`  

  Crea una nueva reserva.

- **PUT** `/reserva/cancelarReserva`  

  Cancela una reserva.

---


## Tecnologías
- Node.js
- TypeScript
- Prisma (ORM)
- MySQL (XAMPP)

## Autores
- Altamirano, Edgar Gastón
- Arancibia, Alexis Alejandro
- Gonzalez, Alexis
- Jiménez, Verónica
