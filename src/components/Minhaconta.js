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
        if(usuario) {
            console.log(usuario.nome);
            setNomeUsuario(usuario);
        }
    }, [])


    return (
        <main>
            <Navbar />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="card mt-4 col-md-10" style={{ backgroundColor: '#503325c1', borderRadius: '10px' }}>
                        <div>
                            <h1 style={{ color: '#FFD230' }}>{NomeUsuario ? `Bem vindo ${NomeUsuario.nome}!` : "Carregando..."}</h1>
                        </div>
                    </div>  
                </div>
            </div>
        </main>
    )
}

export default MinhaConta;