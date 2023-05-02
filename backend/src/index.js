import express from "express";
import cors from "cors";
import routerServer from "./router/router.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routerServer);

app.listen(8080, () => {
  console.log("Servidor activo en el puerto 8080");
});
