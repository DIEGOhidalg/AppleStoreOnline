import { useState } from "react";

export default function Cuenta() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!ok) {
      setError("Por favor, ingresa un correo válido.");
      return;
    }
    setError("");
    // Aquí podrías redirigir o guardar token
    alert(`✅ Login exitoso con: ${email.trim()}`);
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center">
      <div className="card shadow-sm" style={{ maxWidth: 380, width: "100%" }}>
        <div className="card-body">
          <h1 className="h4 mb-3 text-center">Iniciar sesión</h1>
          <form onSubmit={onSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                className={`form-control ${error ? "is-invalid" : ""}`}
                required
              />
              {error && <div className="invalid-feedback">{error}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                id="password"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="********"
                className="form-control"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
