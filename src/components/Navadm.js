import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import "../awesome/all.min.css";

function Navadm() {
    const navigate = useNavigate();
    const [isNavCollapsed, setIsNavCollapsed] = React.useState(true);
    const [usuarioLogado, setUsuarioLogado] = React.useState(null);

    const handleToggle = () => {
        setIsNavCollapsed(!isNavCollapsed);
    };

    const handleLogout = () => {
        localStorage.removeItem("usuarioLogado");
        navigate("/"); // volta para página pública
    };

    React.useEffect(() => {
        const usuario = localStorage.getItem("usuarioLogado");
        if (usuario) setUsuarioLogado(JSON.parse(usuario));
    }, []);

    return (
        <nav className="navbar navbar-expand-lg CorNavbar navbarNav d-flex">
            <div className="container-fluid">
            {!isNavCollapsed ? null : (
                <img
                    src="/logo_nav.png"
                    alt="Logo"
                    className="logo-navbar"
                    width="150px"
                    height="70px"
                />
            )}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarAdmin"
                    aria-controls="navbarAdmin"
                    aria-expanded={!isNavCollapsed}
                    aria-label="Toggle navigation"
                    onClick={handleToggle}
                    style={{backgroundColor: '#FFD230'}}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse${isNavCollapsed ? "" : " show"}`} id="navbarAdmin">
                    <ul className="navbar-nav subir mx-auto w-100 justify-content-center me-5">
                        <li className="nav-item">
                            <Link className="nav-link fw-bold fs-5 m-1" to="/crud" style={{ color: '#FFD230' }}>
                                <i className="fa-solid fa-home me-2"></i>Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold fs-5 m-1" to="/admin-usuarios" style={{ color: '#FFD230' }}>
                                <i className="fa-solid fa-users me-2"></i>Usuários
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold fs-5 m-1" to="/admin-produtos" style={{ color: '#FFD230' }}>
                                <i className="fa-solid fa-cart-shopping me-2"></i>Móveis
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold fs-5 m-1" to="/admin-orcamentos" style={{ color: '#FFD230' }}>
                                <i className="fa-solid fa-file-invoice-dollar me-2"></i>Orçamentos
                            </Link>
                        </li>
                    </ul>
                    <button 
                        className="btn btn-danger mt-1" 
                        onClick={handleLogout}
                        style={{ fontWeight: 'bold' }}
                    >
                        Sair
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navadm;
