import './App.css';
import './awesome/all.min.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import HomeProdutos from './components/produtos/Produtos';
import HomeOrcamento from './components/Orcamento';
import FormLogin from './components/Login';
import FormRegistrar from './components/Registrar';
import MinhaConta from './components/Minhaconta';
import Crud from './components/Crud';
import UsuariosCrud from './components/cruds/UsuariosCrud';
import MoveisCrud from './components/cruds/MoveisCrud';
import { useAuthAdm } from './components/auths/useAuthAdm';
import AuthAcess from './components/auths/AuthAcess';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>  
            <Route path="/" element={<Home />}></Route>
            <Route path="/orcamento" element={<HomeOrcamento />}></Route>
            <Route path='/produtos' element={<HomeProdutos />}></Route> 
            <Route path="/produtos/:categoria" element={<HomeProdutos />}></Route>
            <Route path="/login" element={<FormLogin />}></Route>
            <Route path="/registrar" element={<FormRegistrar />}></Route>
            <Route path="/minhaconta" element={<MinhaConta />}></Route>
            <Route path="/crud" element={
                <AuthAcess >
                    <Crud />
                </AuthAcess>
              }>
            </Route>
            <Route path="/admin-usuarios" element={
                <AuthAcess >
                    <UsuariosCrud />
                </AuthAcess>
              }>
            </Route>
            <Route path="/admin-produtos" element={
                <AuthAcess >
                    <MoveisCrud />
                </AuthAcess>
              }>
            </Route>
            <Route path="*" element={<h1>404 - Página não encontrada</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
