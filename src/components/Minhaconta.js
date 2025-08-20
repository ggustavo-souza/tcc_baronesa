import "../App.css";
import "../awesome/all.min.css";
import Navbar from './Navbar'
import { Link, Router, Routes } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { use, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from "./auths/useAuthUser";

function MinhaConta() {
    useAuthUser();
    const [NomeUsuario, setNomeUsuario] = useState(null); 
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        Aos.init({ duration: 600, once: true});
        const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
        console.log(JSON.parse(localStorage.getItem("usuarioLogado")));
        if(usuario) {
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
                <div className="container">
                    <div data-aos="fade-up" className="card mt-4 p-4 d-flex flex-column align-items-center shadow shadow-3" style={{ backgroundColor: '#503325c1', borderRadius: '10px' }}>
                        <h1 style={{ color: '#FFD230' }}>{NomeUsuario ? `Bem vindo!` : "Carregando..."}</h1>
                        <h4 style={{ color: '#FFD230' }} className="align-self-start mt-3 ms-5">Nome de Usuário: {NomeUsuario ? NomeUsuario.nome : "Carregando..."}</h4>
                        <h4 style={{ color: '#FFD230' }} className="align-self-start mt-3 ms-5">E-mail cadastrado: {NomeUsuario ? NomeUsuario.email : "Carregando..."} </h4>
                        
                        <div className="row w-100 justify-content-center mt-5">
                            <div className="col-md-4 col-sm-12 mb-2">
                                <button
                                    type="button"
                                    className="btn btn-warning corBotao w-100 shadow shadow-3"
                                    onClick={() => navigate("/pedidos")}>
                                    Pedidos
                                </button>
                            </div>
                            <div className="col-md-4 col-sm-12 mb-2">
                                <button
                                    type="button"
                                    className="btn btn-warning corBotao w-100 shadow shadow-3"
                                    onClick={() => navigate("/meusorcamentos")}>
                                    Orçamentos
                                </button>
                            </div>
                            <div className="col-md-4 col-sm-12 mb-2">
                                <button
                                    type="button"
                                    className="btn btn-danger corBotao w-100 shadow shadow-3"
                                    onClick={() => setShowModal(true)}>
                                    Sair da conta
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            {showModal && (
                <div className="modal" data-aos="fade-up" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered ">
                        <div className="modal-content CorNavbar">
                            <div className="modal-header">
                                <h5 className="modal-title" style={{color: '#FFD230'}}>Confirmar Saída</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <h3 style={{color: '#FFD230'}}>Tem certeza de que deseja sair da sua conta?</h3>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancelar
                                </button>
                                <button type="button" className="btn btn-warning" onClick={validarLogout}>
                                    Sair
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModal && <div className="modal-backdrop fade show"></div>}
        </main>
    )
}

export default MinhaConta;