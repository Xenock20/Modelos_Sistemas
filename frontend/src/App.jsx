import { Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import HistoriPage from "./page/HistoriPage";
import FormPage from "./page/FormPage";

function App() {
  return(
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/historial" element={<HistoriPage/>}/>
      <Route path="/formulario/:type/:id" element={<FormPage/>}/>
    </Routes>
  );
}

export default App;
