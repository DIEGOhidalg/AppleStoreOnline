import { Link } from "react-router-dom";
import { products as catalog } from "../data/products.js";

export default function Carrito({ cart, setQty, removeItem, clearCart }) {
  // Une el carrito (id → qty) con el catálogo
  const items = Object.entries(cart)
    .map(([id, qty]) => {
      const p = catalog.find((x) => x.id === id);
      return p ? { ...p, qty } : null;
    })
    .filter(Boolean);

  const totalItems = items.reduce((a, b) => a + b.qty, 0);
  const totalPrice = items.reduce((a, b) => a + b.qty * b.price, 0);
  const money = (n) =>
    n.toLocaleString("es-CL", { style: "currency", currency: "USD" });

  if (items.length === 0) {
    return (
      <main className="container py-5">
        <h1 className="h4 mb-3">Tu carrito</h1>
        <div className="alert alert-light border">
          Tu carrito está vacío.{" "}
          <Link to="/" className="alert-link">
            Volver a la tienda
          </Link>
          .
        </div>
      </main>
    );
  }

  return (
    <main className="container py-5">
      <div className="d-flex justify-content-between align-items-end flex-wrap gap-2 mb-3">
        <h1 className="h4 m-0">Tu carrito</h1>
        <div className="text-muted small">
          {totalItems} {totalItems === 1 ? "artículo" : "artículos"} —{" "}
          <strong className="text-dark">{money(totalPrice)}</strong>
        </div>
      </div>

      <div className="table-responsive mb-3">
        <table className="table align-middle">
          <thead>
            <tr>
              <th style={{ width: 80 }}></th>
              <th>Producto</th>
              <th className="text-end">Precio</th>
              <th className="text-center" style={{ width: 180 }}>
                Cantidad
              </th>
              <th className="text-end">Subtotal</th>
              <th style={{ width: 80 }}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id}>
                <td>
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{ height: 48, width: "auto" }}
                  />
                </td>
                <td>
                  <div className="fw-semibold">{p.name}</div>
                  <div className="text-muted small">{p.description}</div>
                </td>
                <td className="text-end">{money(p.price)}</td>
                <td className="text-center">
                  <div className="btn-group" role="group" aria-label="Cantidad">
                    <button
                      className="btn btn-light"
                      onClick={() => setQty(p.id, Math.max(0, p.qty - 1))}
                      aria-label="Disminuir"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="0"
                      value={p.qty}
                      onChange={(e) =>
                        setQty(p.id, Math.max(0, parseInt(e.target.value || 0)))
                      }
                      className="form-control text-center"
                      style={{ width: 70 }}
                    />
                    <button
                      className="btn btn-light"
                      onClick={() => setQty(p.id, p.qty + 1)}
                      aria-label="Aumentar"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="text-end">{money(p.price * p.qty)}</td>
                <td className="text-end">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeItem(p.id)}
                    aria-label={`Eliminar ${p.name}`}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="table-light">
              <td colSpan={4} className="text-end fw-semibold">
                Total
              </td>
              <td className="text-end fw-bold">{money(totalPrice)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="d-flex gap-2 flex-wrap">
        <Link to="/" className="btn btn-light">
          Seguir comprando
        </Link>
        <button className="btn btn-outline-secondary" onClick={clearCart}>
          Vaciar carrito
        </button>
        <button className="btn btn-dark ms-auto">Pagar</button>
      </div>
    </main>
  );
}
