import { useEffect, useState } from "react";
import { getProductos, deleteProducto } from "../services/productService";
import Tabla from "../components/TablaProductos";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [productos, setProductos] = useState([]);

  const handleClick = (id) => {
    deleteProducto(id);
    const newProductos = productos.filter((p) => p.id !== id);
    setProductos(newProductos);
  };

  useEffect(() => {
    getProductos()
      .then((result) => {
        setProductos(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Link to={`/formulario/${"new"}/${0}`}>Agregar Producto</Link>
        <Link to={`/historial`}>Ver Historial</Link>
      </div>
      <Tabla lista={productos} onDelete={handleClick}/>
    </>
  );
}
