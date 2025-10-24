import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import { products as staticProducts } from "../data/products.js";

export default function Home({ onBuy }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Intentamos cargar /products.json; si falla, usamos el catálogo local
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/products.json", { cache: "no-store" });
        if (!res.ok) throw new Error("No hay products.json, uso local");
        const data = await res.json();
        if (alive) setItems(data);
      } catch (err) {
        if (alive) {
          setItems(staticProducts);
          setError(
            `No se pudo cargar el catálogo remoto. Se usará el local. ${
              err?.message ? `Detalle: ${err.message}` : ""
            }`
          );
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const iphone = useMemo(
    () => items.find((x) => x.id === "iphone") ?? staticProducts[0],
    [items]
  );

  const money = (n) =>
    n.toLocaleString("es-CL", { style: "currency", currency: "USD" });

  return (
    <>
      {/* Hero */}
      <section className="bg-white border-bottom">
        <div className="container py-4 text-center">
          <img
            src={iphone.img}
            alt={iphone.name}
            style={{ maxWidth: 900 }}
            className="img-fluid mx-auto d-block mb-2"
          />
          <h1 className="fw-bold display-5">{iphone.name}</h1>
          <p className="text-muted">Desde {money(iphone.price)}</p>
          <div className="d-flex justify-content-center gap-2 mt-2">
            <button className="btn btn-dark" onClick={() => onBuy?.(iphone.id)}>
              Comprar
            </button>
            <Link className="btn btn-light" to={`/producto/${iphone.id}`}>
              Más información
            </Link>
          </div>
        </div>
      </section>

      {/* Catálogo */}
      <section className="container my-5" aria-label="Catálogo">
        {loading && <p>Cargando productos…</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && (
          <div className="row g-3">
            {items.map((p) => (
              <div key={p.id} className="col-12 col-sm-6 col-lg-4">
                <ProductCard p={p} onBuy={onBuy} />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

