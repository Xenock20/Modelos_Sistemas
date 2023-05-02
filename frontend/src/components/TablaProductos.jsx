import { Link } from "react-router-dom";

export default function Tabla({ lista, onDelete }) {
  const productos = lista;

  function handleSentId(id){
    onDelete(id)
  }

  return (
    <table>
      <thead>
        <tr>
          <td>Nombre</td>
          <td>Stock</td>
          <td>Precio</td>
          <td>Acciones</td>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto) => (
          <tr key={producto.id}>
            <td>{producto.nombre}</td>
            <td>{producto.stock}</td>
            <td>{producto.precio}</td>
            <td>
              <div>
                <Link
                  to={`/formulario/${"import"}/${producto.id}`}
                  className="btn-action"
                >
                  Importar
                </Link>
              </div>
              <div>
                <Link
                  to={`/formulario/${"export"}/${producto.id}`}
                  className="btn-action"
                >
                  Exportar
                </Link>
              </div>
              <div>
                <Link
                  to={`/formulario/${"edit"}/${producto.id}`}
                  className="btn-action"
                >
                  Editar
                </Link>
              </div>

              <button
                onClick={() => handleSentId(producto.id)}
                className="btn-action"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
}
