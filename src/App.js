import './App.css';
import React from 'react';
import './bootstrap/bootstrap.min.css';
import './awesome/all.min.css';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import HomeProdutos from './components/Produtos';
import HomeOrcamento from './components/Orcamento';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>  
            <Route path="/" element={<Home />}></Route>
            <Route path="/orcamento" element={<HomeOrcamento />}></Route>
            <Route path="/produtos" element={<HomeProdutos />}></Route>
            <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
