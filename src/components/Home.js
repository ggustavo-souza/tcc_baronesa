import React from 'react';
import { Link } from 'react-router-dom';
import '../bootstrap/bootstrap.min.css';
import '../App.css';
import '../bootstrap/js/bootstrap.bundle.min.js';
import '../awesome/all.min.css';
import 'animate.css';


function Navbar() {
    const [isNavCollapsed, setIsNavCollapsed] = React.useState(true);

    const handleToggle = () => {
        setIsNavCollapsed(!isNavCollapsed);
    };

    return (
        <nav className="navbar navbar-expand-lg CorNavbar navbarNav ">
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

function Carroussel() {
    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="/carroussel1.jpg" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="/carroussel2.jpg" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="/carroussel3.jpg" className="d-block w-100" alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

function Home() {
    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h1 className=''>Bem-vindo à Baronesa</h1>
                {/* <Carroussel /> */}
            </div>
        </div>
    );
}

export default Home;