import React from 'react';
import { Link } from 'react-router-dom';
import '../bootstrap/bootstrap.min.css';
import '../App.css';
import '../bootstrap/js/bootstrap.bundle.min.js';


function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg CorNavbar navbarNav">
            <div className="container-fluid">
                <img
                    src="/logo_nav.png"
                    alt="Logo"
                    className="logo-navbar"
                    width="150px"
                    height="70px"
                    style={{ position: 'absolute' }}
                />
                <div className="d-flex"></div>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav subir">
                        <li className="nav-item">
                            <Link className="nav-link fw-bold fs-5 m-1" to="/" style={{ color: '#FFD230' }}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold fs-5 m-1" to="/sobre" style={{ color: '#FFD230' }}>Sobre Nós</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold fs-5 m-1" to="/login" style={{ color: '#FFD230' }}>Login</Link>
                        </li>
                    </ul>
                </div> {/* Fim da navbar e do collapse / (para fazer): colocar login no canto direito */}
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
            </div>
        </div>
    );
}

export default Home;