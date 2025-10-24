import { useParams, Link } from "react-router-dom";
import { products } from "../data/products.js";

export default function DetalleProducto({ onBuy }) {
  const { id } = useParams();
  const p = products.find((x) => x.id === id);

  if (!p) {
    return (
      <div className="container py-5">
        <h1 className="h4">Producto no encontrado</h1>
        <Link to="/" className="btn btn-dark mt-3">Volver al inicio</Link>
      </div>
    );
  }

  const money = p.price.toLocaleString("es-CL", {
    style: "currency",
    currency: "USD",
  });

  return (
    <main className="container py-5">
      <div className="row g-4 align-items-center">
        <div className="col-12 col-lg-6 text-center">
          <img src={p.img} alt={p.name} className="img-fluid" />
        </div>
        <div className="col-12 col-lg-6">
          <h1 className="display-6 fw-bold">{p.name}</h1>
          <p className="lead fw-semibold">Desde {money}</p>
          <p className="text-muted">{p.description}</p>

          <div className="d-flex gap-2">
            <button className="btn btn-dark" onClick={() => onBuy?.(p.id)}>
              Comprar
            </button>
            <Link to="/" className="btn btn-light">Volver</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
