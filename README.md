# OTPBackendAndFronted

# 🔐 Proyecto OTP - Autenticación Segura con Spring Boot y React

Este proyecto implementa un sistema de **autenticación con código OTP** (One Time Password) usando **Spring Boot** en el backend y **React** en el frontend.  
Permite registrar usuarios, iniciar sesión y validar un código OTP enviado al correo electrónico del usuario.

---

## 🚀 Tecnologías utilizadas

### Backend (Java / Spring Boot)
- Spring Boot 3.x  
- Spring Web  
- Spring Data JPA  
- H2 / MySQL (según configuración)  
- Java Mail (para envío de OTP)  
- Lombok

### Frontend (React)
- React 18  
- React Router  
- Fetch API  
- CSS modular  
- Node.js + npm

---

## 🧩 Funcionalidades principales

### 🔸 Registro (`/api/auth/register`)
- Permite crear un nuevo usuario.
- Valida que el correo no esté ya registrado.
- Almacena el usuario en la base de datos.

### 🔸 Inicio de sesión (`/api/auth/login`)
- Verifica que el correo y contraseña sean correctos.
- Genera un **código OTP temporal** (por ejemplo, de 4 dígitos).
- Envía el OTP al correo electrónico del usuario.

### 🔸 Validación de OTP (`/api/auth/validate-otp`)
- Recibe el código OTP ingresado por el usuario.
- Valida que el código sea correcto y no haya expirado.
- Si es válido, permite el acceso al sistema.

---

## 🧠 Flujo del sistema

```mermaid
flowchart TD
A[Usuario se registra] --> B[Spring Boot guarda usuario en BD]
B --> C[Usuario inicia sesión]
C --> D[Backend genera OTP]
D --> E[Se envía OTP al correo del usuario]
E --> F[Usuario ingresa OTP en React]
F --> G[Backend valida OTP]
G --> H[Acceso concedido ✅]


⚙️ Cómo ejecutar el proyecto
🖥️ Backend (Spring Boot)

Clona el repositorio:

git clone https://github.com/tu-usuario/proyecto-otp.git
cd proyecto-otp/backend


Abre el proyecto en tu IDE (IntelliJ / VSCode / Eclipse).

Configura tu base de datos y correo en application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/otp_db
spring.datasource.username=root
spring.datasource.password=tu_password

# Configuración para enviar correos
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=tu_correo@gmail.com
spring.mail.password=tu_contraseña_app
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true


Ejecuta el proyecto:

mvn spring-boot:run


o desde tu IDE con el botón Run.

El servidor correrá en:

http://localhost:8080

🌐 Frontend (React)

Abre una nueva terminal:

cd frontend


Instala dependencias:

npm install


Ejecuta el servidor de desarrollo:

npm start


Abre tu navegador en:

http://localhost:3000
