// Importa os módulos necessários para a apllicação
import React from 'react'; //biblioteca react
import ReactDOM from 'react-dom/client';// Biblioteca ReactDOM para renderização no cliente
import {BrowserRouter} from "react-router-dom";// Componente BrowserRouter do react-router-dom para roteamento
import App from './App';// Componente principal da aplicação

// Cria uma raiz para a renderização do React usando a div com id 'root' no HTML
const root = ReactDOM.createRoot(document.getElementById('root')); // Renderiza o componente principal da aplicação (App) dentro de um componente BrowserRouter
root.render(
  // BrowserRouter é utilizado para habilitar o roteamento na aplicação
  // App é o componente principal da aplicação
  <BrowserRouter>
    <App /> 
  </BrowserRouter>
);