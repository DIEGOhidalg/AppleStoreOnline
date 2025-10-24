import { useMemo, useState, useCallback } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import DetalleProducto from "./pages/DetalleProducto.jsx";
import Cuenta from "./pages/Cuenta.jsx";
import Carrito from "./pages/Carrito.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  // Carrito: { [idProducto]: cantidad }
  const [cart, setCart] = useState({});

  const addToCart = useCallback((id) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  }, []);

  // Cambiar cantidad (0 o menor => elimina)
  const setQty = useCallback((id, qty) => {
    setCart((c) => {
      const next = { ...c };
      if (!qty || qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  }, []);

  const removeItem = useCallback((id) => setQty(id, 0), [setQty]);
  const clearCart = useCallback(() => setCart({}), []);

  const cartCount = useMemo(
    () => Object.values(cart).reduce((a, b) => a + b, 0),
    [cart]
  );

  return (
    <>
      <Header cartCount={cartCount} />

      <Routes>
        <Route path="/" element={<Home onBuy={addToCart} />} />
        <Route
          path="/producto/:id"
          element={<DetalleProducto onBuy={addToCart} />}
        />
        <Route path="/cuenta" element={<Cuenta />} />
        <Route
          path="/carrito"
          element={
            <Carrito
              cart={cart}
              setQty={setQty}
              removeItem={removeItem}
              clearCart={clearCart}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}
