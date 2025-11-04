import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // reutiliza el mismo estilo

function RegisterPage() {
  const [form, setForm] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!form.nombre.trim()) validationErrors.nombre = "El nombre es requerido";
    if (!form.apellidoPaterno.trim())
      validationErrors.apellidoPaterno = "El apellido paterno es requerido";
    if (!form.apellidoMaterno.trim())
      validationErrors.apellidoMaterno = "El apellido materno es requerido";
    if (!validateEmail(form.email))
      validationErrors.email = "Correo electrónico no válido";
    if (form.password.length < 6)
      validationErrors.password = "La contraseña debe tener al menos 6 caracteres";
    if (form.password !== form.confirmPassword)
      validationErrors.confirmPassword = "Las contraseñas no coinciden";

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Error de conexión con el servidor");
      console.error(error);
    }
  };

  const irALogin = () => navigate("/login");

  return (
    <div className="login-contenedor">
      <div
        className="seccion-bienvenida"
        style={{ background: "linear-gradient(to bottom right, #6a0dad, #ff6600)" }}
      >
        <h1>¡Únete a nosotros!</h1>
        <p>Completa tus datos para crear tu cuenta y comenzar.</p>
      </div>

      <div className="seccion-login">
        <h2>Registro</h2>
        <form onSubmit={handleSubmit} noValidate>
          <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
          {errors.nombre && <p className="error">{errors.nombre}</p>}

          <input name="apellidoPaterno" placeholder="Apellido paterno" value={form.apellidoPaterno} onChange={handleChange} />
          {errors.apellidoPaterno && <p className="error">{errors.apellidoPaterno}</p>}

          <input name="apellidoMaterno" placeholder="Apellido materno" value={form.apellidoMaterno} onChange={handleChange} />
          {errors.apellidoMaterno && <p className="error">{errors.apellidoMaterno}</p>}

          <input type="email" name="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}

          <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} />
          {errors.password && <p className="error">{errors.password}</p>}

          <input type="password" name="confirmPassword" placeholder="Confirmar contraseña" value={form.confirmPassword} onChange={handleChange} />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

          <button type="submit">Registrarse</button>
        </form>

        <p className="texto-registro">
          ¿Ya tienes cuenta?{" "}
          <span className="link-registro" onClick={irALogin}>
            Inicia sesión
          </span>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
