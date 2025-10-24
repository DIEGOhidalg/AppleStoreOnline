import { Link } from "react-router-dom";

export default function ProductCard({ p, onBuy }) {
  const money = p.price.toLocaleString("es-CL", {
    style: "currency",
    currency: "USD",
  });

  return (
    <article className="card h-100 shadow-sm">
      <div className="ratio ratio-4x3 bg-white">
        <img src={p.img} alt={p.name} className="object-fit-contain p-3" />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{p.name}</h5>
        <p className="card-text text-muted">Desde {money}</p>
        <div className="mt-auto d-flex gap-2">
          {/* Evita recarga en tests si el componente está dentro de un <form> */}
          <button
            type="button"
            className="btn btn-dark flex-grow-1"
            onClick={() => onBuy?.(p.id)}
          >
            Comprar
          </button>
          <Link className="btn btn-light flex-grow-1" to={`/producto/${p.id}`}>
            Más información
          </Link>
        </div>
      </div>
    </article>
  );
}
