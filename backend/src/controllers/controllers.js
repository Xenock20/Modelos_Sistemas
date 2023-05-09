import { conect } from "../db.js";

export const getProductos = async (req, res) => {
  try {
    const result = await conect.promise().query("SELECT * FROM producto");
    res.send(result[0]).status(200);
  } catch (err) {
    res.status(500).json({ error: "No se pudo obtener los productos" });
  }
};

export const getHistorial = async (req, res) => {
  try {
    const result = await conect.promise().query("SELECT * FROM historia_producto");
    res.send(result[0]).status(200);
  } catch (err) {
    res.status(500).json({ error: "No se pudo obtener el historial" });
  }
};

export const getProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await conect
      .promise()
      .query("SELECT * FROM producto WHERE id_producto = ?", [id]);
    res.send(result[0]).status(200);
  } catch (err) {
    res.status(500).json({ error: "No se pudo obtener el producto" });
  }
};

export const postProducto = async (req, res) => {
  const { nuevoNombre, nuevoStock, nuevoPrecio, } = req.body;
  const tipo = "IMPORTACION";
  const fechaNow = new Date();
  let id;

  try {
    const result = await conect
      .promise()
      .query(
        "INSERT INTO producto (`nombre`, `stock`, `precio`) VALUE (?, ?, ?)",
        [nuevoNombre, nuevoStock, nuevoPrecio,]
      );
    const newResult = result;
    id = newResult[0].insertId;
  } catch (err) {
    res.status(500).json({ error: "No se pudo insertar el producto" });
  }

  try {
    await conect
      .promise()
      .query(
        "INSERT INTO historia_producto (`fecha_de_realizacion`, `id_producto`,`tipo`) VALUE (?, ?, ?)",
        [fechaNow, id, tipo]
      );
  } catch (err) {
    res.status(500).json({ error: "No se pudo guardar el historial" });
  }

  try {
    const result = await conect
      .promise()
      .query("SELECT * FROM producto WHERE id_producto = ?", [id]);
    res.send(result[0]).status(201);
  } catch (err) {
    res.status(500).json({ error: "No se pudo obtener el producto" });
  }
};

export const putProducto = async (req, res) => {
  const { id } = req.params;
  const { nuevoNombre, nuevoStock, nuevoPrecio, tipo } = req.body;
  let currentStock = 0;
  const fechaNow = new Date();

  try {
    const result = await conect
      .promise()
      .query("SELECT * FROM producto WHERE id_producto = ?", [id]);
    currentStock = result[0][0].stock;
  } catch (err) {
    res.status(500).json({ error: "No se pudo obtener el producto" });
  }

  if (tipo === "IMPORTACION") {
    currentStock = currentStock + parseFloat(nuevoStock);
  } else if (tipo === "EXPORTACION") {
    currentStock = currentStock - parseFloat(nuevoStock);
  } else {
    currentStock = nuevoStock;
  }

  try {
    await conect
      .promise()
      .query(
        "UPDATE producto SET `nombre` = ?, `stock` = ?, `precio` = ? WHERE id_producto = ?",
        [nuevoNombre, currentStock, nuevoPrecio, id]
      );
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "No se pudo actualizar el producto" });
  }

  try {
    await conect
      .promise()
      .query(
        "INSERT INTO historia_producto (`fecha_de_realizacion`, `id_producto`,`tipo`) VALUE (?, ?, ?)",
        [fechaNow, id, tipo]
      );
  } catch (err) {
    res.status(500).json({ error: "No se pudo guardar el historial" });
  }

  try {
    const result = await conect
      .promise()
      .query("SELECT * FROM producto WHERE id_producto = ?", [id]);
    res.send(result[0]).status(201);
  } catch (err) {
    res.status(500).json({ error: "No se pudo obtener el producto" });
  }
};

export const deleteProducto = async (req, res) => {
  const { id } = req.params;

  try {
    await conect
      .promise()
      .query("DELETE FROM producto WHERE id_producto = ?", [id]);
    res
      .json({
        mess: "Producto eliminado",
        id: id,
      })
      .status(200);
  } catch (err) {
    res.status(500).json({ error: "No se pudo eliminar el producto" });
  }
};
