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

    const ConfirmModal = () => (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
        >
            <div
                className={`w-full max-w-sm rounded-xl shadow-2xl transition-transform duration-300 translate-y-0 translate-y-10`}
                style={{ backgroundColor: '#FFFDF6' }} // Fundo mais claro para contraste
            >
                {/* Header */}
                <div className="p-4 rounded-t-xl flex justify-between items-center" style={{ backgroundColor: '#FFD230' }}>
                    <h5 className="text-lg font-extrabold text-[#503325]">Confirmar Saída</h5>
                    <button
                        type="button"
                        className="text-[#503325] hover:text-red-700"
                        aria-label="Close"
                        onClick={() => setShowModal(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 text-center">
                    <h5 className="text-lg text-gray-700 font-medium">Deseja realmente sair da sua conta?</h5>
                </div>

                {/* Footer */}
                <div className="p-4 flex justify-end space-x-3 border-t border-gray-100">
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                        onClick={() => setShowModal(false)}
                        style={{ backgroundColor: 'white', color: '#503325', border: '2px solid #503325' }}
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-semibold rounded-lg shadow-lg hover:bg-red-700 transition-colors duration-200"
                        onClick={validarLogout}
                        style={{ backgroundColor: '#dc3545', color: 'white' }}
                    >
                        Sair
                    </button>
                </div>
            </div>
        </div>
    );

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

            {showModal && <ConfirmModal />}
        </main>
    );
}

export default MinhaConta;