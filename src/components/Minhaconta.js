import "../App.css";
import "../awesome/all.min.css";
import Navbar from './Navbar'
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from "./auths/useAuthUser";

function MinhaConta() {
    useAuthUser();
    const [nomeUsuario, setNomeUsuario] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        Aos.init({ duration: 600, once: true });
        const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
        console.log(JSON.parse(localStorage.getItem("usuarioLogado")));
        if (usuario) {
            setNomeUsuario(usuario);
        }
    }, [])

    const validarLogout = () => {
        localStorage.removeItem("usuarioLogado");
        setNomeUsuario(null);
        navigate("/");
    }

    return (
        <main>
            <Navbar />
            <div className="container mx-auto p-4">
                <div
                    // Simulação do data-aos="fade-up"
                    data-aos="fade-up"
                    className="p-5 rounded-5"
                    style={{ backgroundColor: '#503325' }}
                >
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center" style={{ color: '#FFD230' }}>
                        {nomeUsuario ? `Bem-vindo, ${nomeUsuario.nome.split(' ')[0]}!` : "Carregando..."}
                    </h1>

                    {/* Linhas de Informação com ícones */}
                    <div className="w-full space-y-4 mb-8">
                        {/* Nome */}
                        <div className="p-3 rounded-lg flex items-center shadow-inner" style={{ backgroundColor: '#503325e0' }}>
                            <i className="fas fa-user-circle text-xl mr-3" style={{ color: '#FFD230' }}></i>
                            <h4 className="text-lg md:text-xl font-medium" style={{ color: '#FFD230' }}>
                                Nome de Usuário: <span className="font-semibold">{nomeUsuario ? nomeUsuario.nome : "Carregando..."}</span>
                            </h4>
                        </div>

                        {/* Email */}
                        <div className="p-3 rounded-lg flex items-center shadow-inner rounded-5" style={{ backgroundColor: '#503325' }}>
                            <i className="fas fa-envelope text-xl mr-3" style={{ color: '#FFD230' }}></i>
                            <h4 className="text-lg md:text-xl font-medium truncate" style={{ color: '#FFD230' }}>
                                E-mail cadastrado: <span className="font-semibold">{nomeUsuario ? nomeUsuario.email : "Carregando..."}</span>
                            </h4>
                            <div className="row justify-content-center mt-4 g-4">

                                {/* Botão Pedidos */}
                                <div className="col-12 col-md-4">
                                    <button
                                        type="button"
                                        className="btn d-flex flex-column align-items-center justify-content-center w-100 shadow-lg rounded-3 border-0 py-3"
                                        onClick={() => navigate("/pedidos")}
                                        style={{
                                            backgroundColor: '#FFD230',
                                            color: '#503325',
                                            fontWeight: 'bold',
                                            fontSize: '1.1rem',
                                            transition: 'transform 0.2s, box-shadow 0.2s',
                                            boxShadow: '0 8px 15px rgba(255, 210, 48, 0.6)', // Sombra Dourada
                                        }}
                                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
                                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1.0)'}
                                    >
                                        <i className="fa fa-cart-plus mb-2" style={{ fontSize: '2.5rem', color: '#503325' }}></i>
                                        Pedidos
                                    </button>
                                </div>

                                {/* Botão Orçamentos */}
                                <div className="col-12 col-md-4">
                                    <button
                                        type="button"
                                        className="btn d-flex flex-column align-items-center justify-content-center w-100 shadow-lg rounded-3 border-0 py-3"
                                        onClick={() => navigate("/meusorcamentos")}
                                        style={{
                                            backgroundColor: '#FFD230',
                                            color: '#503325',
                                            fontWeight: 'bold',
                                            fontSize: '1.1rem',
                                            transition: 'transform 0.2s, box-shadow 0.2s',
                                            boxShadow: '0 8px 15px rgba(255, 210, 48, 0.6)', // Sombra Dourada
                                        }}
                                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
                                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1.0)'}
                                    >
                                        <i className="fa-solid fa-file-invoice-dollar mb-2" style={{ fontSize: '2.5rem', color: '#503325' }}></i>
                                        Orçamentos
                                    </button>
                                </div>

                                {/* Botão Sair da conta (Danger) */}
                                <div className="col-12 col-md-4">
                                    <button
                                        type="button"
                                        className="btn d-flex flex-column align-items-center justify-content-center w-100 shadow-lg rounded-3 border-0 py-3"
                                        onClick={() => setShowModal(true)}
                                        style={{
                                            backgroundColor: '#dc3545',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: '1.1rem',
                                            transition: 'transform 0.2s, box-shadow 0.2s',
                                            boxShadow: '0 8px 15px rgba(220, 53, 69, 0.8)', // Sombra Vermelha
                                        }}
                                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
                                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1.0)'}
                                    >
                                        <i className="fa-solid fa-person-walking-arrow-right mb-2" style={{ fontSize: '2.5rem', color: 'white' }}></i>
                                        Sair da conta
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div
                    className="modal"
                    data-aos="fade-up"
                    style={{ display: 'block' }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 shadow-lg" style={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }}>

                            <div className="modal-header border-0 pb-2" style={{ backgroundColor: '#FFD230' }}>
                                <h5 className="modal-title text-dark fw-bold">Confirmar Saída</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>

                            <div className="modal-body pt-4 pb-4">
                                <h5 className="">Deseja realmente sair da sua conta?</h5>
                            </div>

                            <div className="modal-footer border-0 pt-0">
                                <button
                                    type="button"
                                    className="btn btn-light text-dark fw-bold px-4"
                                    onClick={() => setShowModal(false)}
                                    style={{ border: '1px solid #ced4da' }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger fw-bold px-4"
                                    onClick={validarLogout}
                                    style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}
                                >
                                    Sair
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModal && <div className="modal-backdrop fade show"></div>}
        </main>
    );
}

export default MinhaConta;