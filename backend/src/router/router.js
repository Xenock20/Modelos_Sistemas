import { Router } from "express";
import {
  deleteProducto,
  getProductos,
  postProducto,
  putProducto,
  getProducto,
  getHistorial,
} from "../controllers/controllers.js";

const routerServer = Router();

routerServer.get("/historial", getHistorial);
routerServer.get("/productos", getProductos);
routerServer.get("/producto/:id", getProducto);
routerServer.post("/nuevoproducto", postProducto);
routerServer.put("/actualizarproducto/:id", putProducto);
routerServer.delete("/eliminarproducto/:id", deleteProducto);

export default routerServer;
