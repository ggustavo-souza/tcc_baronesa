import './App.css';
import './awesome/all.min.css';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import HomeProdutos from './components/produtos/Produtos';
import HomeOrcamento from './components/Orcamento';
import FormLogin from './components/Login';
import FormRegistrar from './components/Registrar';

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
            <Route path="*" element={<h1>404 - Página não encontrada</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
