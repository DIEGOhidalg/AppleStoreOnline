import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container py-5 text-center">
      <h1 className="h3">404 — No encontrado</h1>
      <p className="text-muted">La página que buscas no existe.</p>
      <Link className="btn btn-dark mt-2" to="/">Volver al inicio</Link>
    </div>
  );
}
