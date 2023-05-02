import TablaHistorial from "../components/TablaHistorial";
import { useState, useEffect } from "react";
import { getHistorial } from "../services/productService";
import { Link } from "react-router-dom";



export default function HistoriPage() {

  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    getHistorial()
      .then((result) => {
        setHistorial(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <div>
        <Link to="/">Volver</Link>
      </div>
      <TablaHistorial lista={historial}></TablaHistorial>
    </div>
  )
}
