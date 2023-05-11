// Importa componentes e bibliotecas necessárias
import {Routes, Route} from "react-router-dom";
import MenuSuperior from "./components/MenuSuperior";
import InclusaoLivros from "./components/InclusaoLivros";
import InclusaoAutores from "./components/InclusaoAutores";
import InclusaoEditoras from "./components/InclusaoEditoras";
import ManutencaoLivros from "./components/ManutencaoLivros";
import ResumoLivros from "./components/ResumoLivros";

// Define o componente principal 'App'
const App = () => {
  // Retorna o JSX do componente
  return (
    // Fragmento do React para agrupar elementos sem adicionar um elemento extra no DOM
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

// Exporta o componente 'App' como padrão
export default App;
