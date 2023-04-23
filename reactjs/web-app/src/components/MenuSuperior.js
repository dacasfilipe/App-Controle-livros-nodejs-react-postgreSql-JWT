import {Link} from "react-router-dom";

const MenuSuperior = () => {
    return (
        <nav className="navbar navbar-expand-sm bg-primary navbar-dark stick-top">
            <div className="container">
                <Link to="/" className="navbar-brand" >Controle Pessoal de Livros</Link>
                <ul className="navbar-nav">
          <li>
            <Link to="/" className="nav-link">
              Inclusão Livros
            </Link>
          </li>
          <li>
            <Link to="/inclusao-autores" className="nav-link">
              Inclusão Autores
            </Link>
          </li>
          <li>
            <Link to="/inclusao-editoras" className="nav-link">
              Inclusão Editoras
            </Link>
          </li>
          <li>
            <Link to="/manut" className="nav-link">
              Manutenção
            </Link>
          </li>
          <li>
            <Link to="/resumo" className="nav-link">
              Resumo
            </Link>
          </li>
        </ul>
            </div>
        </nav>
    );
};

export default MenuSuperior;