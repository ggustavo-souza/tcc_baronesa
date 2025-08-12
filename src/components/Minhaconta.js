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
    const [modalSair, setModalSair] = useState(null)
    const [NomeUsuario, setNomeUsuario] = useState(null); 

    useEffect(() => {
        Aos.init({ duration: 600, once: true});
        const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
        console.log(JSON.parse(localStorage.getItem("usuarioLogado")));
        if(usuario) {
            setNomeUsuario(usuario);
        }
    }, [])

    const validarModal = () => {

    }


    return (
        <main>
            <Navbar />
            <div className="container">
                <div data-aos="fade-up" className="card mt-4 p-4 d-flex flex-column align-items-center shadow shadow-3" style={{ backgroundColor: '#503325c1', borderRadius: '10px' }}>
                    <h1 style={{ color: '#FFD230' }}>{NomeUsuario ? `Bem vindo!` : "Carregando..."}</h1>

                    <h4 style={{ color: '#FFD230' }} className="align-self-start mt-3 ms-5">Nome de Usuário: {NomeUsuario ? NomeUsuario.nome : "Carregando..."}</h4>
                    <h4 style={{ color: '#FFD230' }} className="align-self-start mt-3 ms-5">E-mail cadastrado: {NomeUsuario ? NomeUsuario.email : "Carregando..."} </h4>

                    <button         
                        type="button"
                        onClick={validarModal}                            
                        data-bs-toggle="modal"        
                        data-bs-target="#logoutModal" 
                        className="btn btn-danger corBotao align-self-start mt-3 ms-5 col-sm-2 shadow shadow-3">
                            Sair
                    </button>

                </div>
            </div>
        </main>
    )
}

export default MinhaConta;