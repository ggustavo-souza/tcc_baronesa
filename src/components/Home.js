import React from 'react';
import { Link } from 'react-router-dom';
import '../bootstrap/bootstrap.min.css';
import '../App.css';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg CorNavbar">
            <Link className="navbar-brand" to="/">Baronesa</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Início</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/sobre">Sobre</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/contato">Contato</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

function Home() {
    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h1>Bem-vindo à Baronesa</h1>
                <p>Esta é a página inicial do seu site. Explore o menu para saber mais.</p>
            </div>
        </div>
    );
}

export default Home;