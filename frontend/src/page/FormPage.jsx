import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import {
  getProducto,
  postProducto,
  putProducto,
} from "../services/productService";

export default function FormPage() {
  const [nombre, setNombre] = useState("");
  const [stock, setStock] = useState("");
  const [precio, setPrecio] = useState("");

  const { id, type } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const res = await getProducto(id);
    setNombre(res[0].nombre);
    setStock(res[0].stock);
    setPrecio(res[0].precio);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProducto = {
      nuevoNombre: nombre || null,
      nuevoStock: stock || null,
      nuevoPrecio: precio || null,
      tipo:
        type === "import"
          ? "IMPORTACION"
          : type === "export"
          ? "EXPORTACION"
          : "EDICION",
    };

    if (
      newProducto.nombre !== null &&
      newProducto.stock !== null &&
      newProducto.precio !== null
    ) {
      switch (type) {
        case "new":
          postProducto(newProducto).then((response) => {
            navigate("/");
          });
          break;
        case "import":
        case "export":
        case "edit":
          putProducto(newProducto, id).then((response) => {
            console.log(response);
            navigate("/");
          });
          break;
      }
    }
  };

  return (
    <>
      <div>
        <Link to="/">Volver</Link>
      </div>
      <label>Nombre del producto</label>
      <input
        type="text"
        value={nombre}
        name="nombre"
        onChange={(e) => {
          setNombre(e.target.value);
        }}
        disabled={type !== "new" && type !== "edit"}
      />
      <label>
        {type === "import"
          ? "Cantidad a importar"
          : type === "export"
          ? "Cantidad a exportar"
          : "Stock"}
      </label>
      <input
        type="number"
        value={stock}
        name="stock"
        onChange={(e) => {
          setStock(e.target.value);
        }}
      />
      <label>Precio</label>
      <input
        type="number"
        value={precio}
        name="precio"
        onChange={(e) => {
          setPrecio(e.target.value);
        }}
        disabled={type !== "new" && type !== "edit"}
      />
      <button onClick={handleSubmit}>
        {type === "new"
          ? "Enviar"
          : type === "import"
          ? "Importar"
          : type === "export"
          ? "Exportar"
          : "Editar"}
      </button>
    </>
  );
}
