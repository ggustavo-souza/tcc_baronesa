import React from 'react';
import { Link } from 'react-router-dom';
import '../bootstrap/bootstrap.min.css';
import '../App.css';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg CorNavbar">
            <div className="container">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav subir">
                        <li className="nav-item">
                            <Link className="nav-link fw-bold fs-5" to="/" style={{ color: '#FFD230' }}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold fs-5 " to="/sobre" style={{ color: '#FFD230' }}>Sobre Nós</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold fs-5 " to="/login" style={{ color: '#FFD230' }}>Login</Link>
                        </li>
                    </ul>
                </div>
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