import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const [formulario, setFormulario] = useState({ correo: "", contraseña: "" });
  const [errores, setErrores] = useState({ correo: "", contraseña: "" });
  const navigate = useNavigate();

  const validarCorreo = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });

    if (name === "correo") {
      setErrores((prev) => ({
        ...prev,
        correo: validarCorreo(value) ? "" : "Correo electrónico no válido",
      }));
    }

    if (name === "contraseña") {
      setErrores((prev) => ({
        ...prev,
        contraseña:
          value.length >= 6 ? "" : "La contraseña debe tener al menos 6 caracteres",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarCorreo(formulario.correo)) {
      setErrores((prev) => ({ ...prev, correo: "Correo electrónico no válido" }));
      return;
    }
    if (formulario.contraseña.length < 6) {
      setErrores((prev) => ({
        ...prev,
        contraseña: "La contraseña debe tener al menos 6 caracteres",
      }));
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo: formulario.correo,
          contraseña: formulario.contraseña,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        localStorage.setItem("email", formulario.correo);
        navigate("/otp");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Error de conexión con el servidor");
      console.error(error);
    }
  };

  const irARegistro = () => navigate("/register");

  return (
    <div className="login-contenedor">
      <div
        className="seccion-bienvenida"
        style={{ background: "linear-gradient(to bottom right, #6a0dad, #ff6600)" }}
      >
        <h1>¡Bienvenido!</h1>
        <p>Inicia sesión para continuar con tu cuenta.</p>
      </div>

      <div className="seccion-login">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={formulario.correo}
            onChange={handleChange}
          />
          {errores.correo && <p className="error">{errores.correo}</p>}

          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            value={formulario.contraseña}
            onChange={handleChange}
          />
          {errores.contraseña && <p className="error">{errores.contraseña}</p>}

          <button type="submit">Entrar</button>
        </form>

        <p className="texto-registro">
          ¿No tienes cuenta?{" "}
          <span onClick={irARegistro} className="link-registro">
            Regístrate aquí
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
