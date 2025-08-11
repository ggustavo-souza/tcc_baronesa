import "../App.css";
import "../awesome/all.min.css";
import Navbar from './Navbar'
import { Link, Router, Routes } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from "./auths/useAuthUser";

function MinhaConta() {
    useAuthUser();

    const [NomeUsuario, setNomeUsuario] = useState(null); 

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
        console.log(JSON.parse(localStorage.getItem("usuarioLogado")));
        if(usuario) {
            setNomeUsuario(usuario);
        }
    }, [])


    return (
        <main>
            <Navbar />
            <div className="container">
                <div className="card mt-4 p-4 d-flex flex-column align-items-center shadow shadow-3" style={{ backgroundColor: '#503325c1', borderRadius: '10px' }}>
                    <h1 style={{ color: '#FFD230' }}>{NomeUsuario ? `Bem vindo ${NomeUsuario.nome}!` : "Carregando..."}</h1>

                    <h4 style={{ color: '#FFD230' }} className="align-self-start mt-3 ms-5">Nome de Usuário: {NomeUsuario ? NomeUsuario.nome : "Carregando..."}</h4>
                    <h4 style={{ color: '#FFD230' }} className="align-self-start mt-3 ms-5">E-mail cadastrado: {NomeUsuario ? NomeUsuario.email : "Carregando..."} </h4>
                    <button type="button" className="btn btn-danger corBotao align-self-start mt-3 col-sm-2 shadow shadow-3">Sair</button>
                </div>
            </div>
        </main>
    )
}

export default MinhaConta;