import moment from 'moment'

export async function getProductos() {
  const response = await fetch("http://localhost:8080/productos");
  const json = await response.json();

  return json.map((producto) => ({
    id: producto.id_producto,
    nombre: producto.nombre,
    stock: producto.stock,
    precio: producto.precio,
  }));
}

export async function getHistorial() {
  const response = await fetch("http://localhost:8080/historial");
  const json = await response.json();

  function formatDate(date){
    const datetime = new Date(date);
    const formattedDatetime = moment(datetime).format('DD/MM/YYYY HH:mm');
    return formattedDatetime.toString()
  }

  return json.map((historia) => ({
    id: historia.id_historia_producto,
    fdr: formatDate(historia.fecha_de_realizacion),
    tipo: historia.tipo,
    idProducto: historia.id_producto,
  }));
}

export async function getProducto(id) {
  const response = await fetch(`http://localhost:8080/producto/${id}`);
  const json = await response.json();

  return json.map((producto) => ({
    id: producto.id_producto,
    nombre: producto.nombre,
    stock: producto.stock,
    precio: producto.precio,
  }));
}

export async function postProducto(producto) {
  const response = await fetch("http://localhost:8080/nuevoproducto", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  });
  const json = await response.json();

  return json.map((producto) => ({
    id: producto.id_producto,
    nombre: producto.nombre,
    stock: producto.stock,
    precio: producto.precio,
  }));
}

export async function putProducto(producto, id) {
  const response = await fetch(
    `http://localhost:8080/actualizarproducto/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    }
  );
  const json = await response.json();

  return json.map((producto) => ({
    id: producto.id_producto,
    nombre: producto.nombre,
    stock: producto.stock,
    precio: producto.precio,
  }));
}

export async function deleteProducto(id) {
  const response = await fetch(`http://localhost:8080/eliminarproducto/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
}
