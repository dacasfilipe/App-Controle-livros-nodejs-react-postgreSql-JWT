import {Routes, Route} from "react-router-dom";
import MenuSuperior from "./components/MenuSuperior";
import InclusaoLivros from "./components/InclusaoLivros";
import InclusaoAutores from "./components/InclusaoAutores";
import InclusaoEditoras from "./components/InclusaoEditoras";
import ManutencaoLivros from "./components/ManutencaoLivros";
import ResumoLivros from "./components/ResumoLivros";


const App = () => {
  return (
    <>  
      <MenuSuperior />
      <Routes>
      <Route path="/" element={<InclusaoLivros />} />
        <Route path="/inclusao-autores" element={<InclusaoAutores />} />
        <Route path="/inclusao-editoras" element={<InclusaoEditoras />} />
        <Route path="/manut" element={<ManutencaoLivros />} />
        <Route path="/resumo" element={<ResumoLivros />} />
      </Routes>
    </>
  );
};

export default App;
