import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-5">
      <div className="container py-4 text-center">
        <p className="mb-2">
          © 2025 Apple Store Online — Todos los derechos reservados
        </p>
        <nav className="d-flex justify-content-center gap-3 small">
          <Link className="text-light text-decoration-none" to="/producto/iphone">Iphone</Link>
          <Link className="text-light text-decoration-none" to="/producto/macbook">Macbook</Link>
          <Link className="text-light text-decoration-none" to="/producto/vision">Vision</Link>
          <Link className="text-light text-decoration-none" to="/producto/applewatch">Watch</Link>
          <Link className="text-light text-decoration-none" to="/producto/accesorios">Accesorios</Link>
        </nav>
      </div>
    </footer>
  );
}
