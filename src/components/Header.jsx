import { NavLink, Link } from "react-router-dom";

export default function Header({ cartCount = 0 }) {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top py-2">
      <div className="container">
        {/* Marca: solo imagen del logo para evitar texto duplicado */}
        <Link className="navbar-brand" to="/" aria-label="Inicio">
          <img
            src="/images/AppleStoreOnlineLogo.png"
            alt="Apple Store Online"
            className="brand-logo"
            height="24"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Mostrar navegación"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="mainNav" className="collapse navbar-collapse">
          {/* Menú centrado con espacio entre enlaces */}
          <ul className="navbar-nav mx-auto mb-2 mb-md-0 gap-3">
            <li className="nav-item">
              <NavLink className="nav-link px-2" to="/">Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-2" to="/producto/iphone">iPhone 17 Pro</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-2" to="/producto/macbook">MacBook Pro</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-2" to="/producto/vision">Apple Vision</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-2" to="/producto/applewatch">Apple Watch</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-2" to="/producto/accesorios">Accesorios</NavLink>
            </li>
          </ul>

          {/* Acciones derechas */}
          <div className="d-flex align-items-center gap-3">
            <NavLink className="text-white text-decoration-none" to="/">Tienda</NavLink>
            <NavLink className="text-white text-decoration-none" to="/cuenta">Cuenta</NavLink>

            <div className="position-relative">
              {/* Cambiado a NavLink para que navegue a /carrito */}
              <NavLink
                to="/carrito"
                className="btn btn-outline-light rounded-pill px-3"
              >
                Carrito
              </NavLink>
              {cartCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success carrito-badge"
                  style={{ fontSize: 12, pointerEvents: "none" }}
                  aria-label={`Hay ${cartCount} items en el carrito`}
                >
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
