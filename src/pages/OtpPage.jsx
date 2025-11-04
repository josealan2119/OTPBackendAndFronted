import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OtpPage.css";

function OtpPage() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
      setError("");
    } else {
      setError("El código OTP debe tener hasta 6 dígitos numéricos");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length < 4 || otp.length > 6) {
      setError("El código OTP debe tener entre 4 y 6 dígitos");
      return;
    }

    try {
      const email = localStorage.getItem("email");
      const response = await fetch("http://localhost:8080/api/auth/validate-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate("/dashboard"); // o la ruta que tú decidas
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Error de conexión con el servidor");
      console.error(error);
    }
  };

  return (
    <div className="otp-contenedor">
      <div className="otp-bienvenida">
        <h1>Verificación de Cuenta</h1>
        <p>Ingresa el código OTP que enviamos a tu correo para continuar.</p>
      </div>

      <div className="otp-formulario">
        <h2>Introduce tu OTP</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Código OTP"
            value={otp}
            onChange={handleChange}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Verificar</button>
        </form>
      </div>
    </div>
  );
}

export default OtpPage;
