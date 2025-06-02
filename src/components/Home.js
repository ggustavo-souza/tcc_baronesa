import React from 'react';
import { Link } from 'react-router-dom';
import '../bootstrap/bootstrap.min.css';
import '../App.css';
import '../bootstrap/js/bootstrap.bundle.min.js';
import '../awesome/all.min.css';


function Navbar() {
    const [isNavCollapsed, setIsNavCollapsed] = React.useState(true);

    const handleToggle = () => {
        setIsNavCollapsed(!isNavCollapsed);
    };

    return (
        <nav className="navbar navbar-expand-lg CorNavbar navbarNav">
            <div className="container-fluid">
                {!isNavCollapsed ? null : (
                    <img
                        src="/logo_nav.png"
                        alt="Logo"
                        className="logo-navbar"
                        width="150px"
                        height="70px"
                        style={{ position: 'absolute' }}
                    />
                )}
                <div className="d-flex"></div>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded={!isNavCollapsed}
                    aria-label="Toggle navigation"
                    onClick={handleToggle}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse${isNavCollapsed ? '' : ' show'}`} id="navbarNav">
                    <ul className="navbar-nav subir mx-auto w-100 justify-content-center">
                        <li className="nav-item">
                            <Link className="nav-link fw-bold fs-5 m-1" to="/" style={{ color: '#FFD230' }}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold fs-5 m-1" to="/orcamento" style={{ color: '#FFD230' }}>Orçamento</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold fs-5 m-1" to="/produtos" style={{ color: '#FFD230' }}>Produtos</Link>
                        </li>
                        <li className="nav-item d-lg-none">
                            <Link className="nav-link fw-bold fs-5 m-1" to="/login" style={{ color: '#FFD230' }}>
                                <i className="fa-solid fa-user-plus me-2"></i>Login
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto d-none d-lg-flex position-absolute end-0 me-2" >
                        <li className="nav-item">
                            <Link className="nav-link fw-bold fs-5 " to="/login" style={{ color: '#FFD230' }}>
                                <i className="fa-solid fa-user-plus me-2"></i>Login
                            </Link>
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
            </div>
        </div>
    );
}

export default Home;