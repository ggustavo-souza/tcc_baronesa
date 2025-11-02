import React from "react";
import "../App.css";
import "../awesome/all.min.css";
import Navbar from './Navbar';
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FormRegistrar() {
    const navigate = useNavigate();
    useEffect(() => {
        Aos.init({ duration: 1000 });
    
    }, []);
    const [form, setForm] = useState({ nome: "", email: "", password: "" });
    const [alertMessage, setAlertMessage] = useState({ type: "", message: "" });
    const urlAPI = "https://tccbaronesapi.cloud"

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const closeAlert = () => {
        setAlertMessage({ type: "", message: "" });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setAlertMessage({ type: '', message: ''});

        const resposta = await fetch(`${urlAPI}/api/cadastro.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        const data = await resposta.json();

        if (data.mensagem) {
            setAlertMessage({ type: 'success', message: 'Registro realizado com sucesso!' });
            navigate("/login")
        } else {
            setAlertMessage({ type: 'danger', message: data.erro || "Erro no Registro" });
        }
    };

    return (
        <main>
            <Navbar />
            <div className="container">
                <div className="row justify-content-center mt-5 mb-5" data-aos="fade-up">
                    <div className="col-md-8 col-lg-6 col-xl-6 col-9 card p-4 p-md-5 shadow-lg rounded-4 login-card">
                         {alertMessage.message && (
                            <div className={`alert alert-${alertMessage.type} alert-dismissible fade show`} role="alert">
                                {alertMessage.message}
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={closeAlert}></button>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="form-login">
                            <h1 className="text-center corAmarela fw-bold mb-4">Registrar</h1>
                            
                            <div className="form-group mb-3">
                                <label htmlFor="username" className="corAmarela mb-2">Nome de Usuário</label>
                                <input type="text" id="username" name="nome" className="form-control form-control-lg" required value={form.nome} onChange={handleChange}
/>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="email" className="corAmarela mb-2">E-mail</label>
                                <input type="email" id="email" name="email" className="form-control form-control-lg" required value={form.email} onChange={handleChange}/>
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="password" className="corAmarela mb-2">Senha</label>
                                <input type="password" id="password" name="password" className="form-control form-control-lg" required value={form.password} onChange={handleChange}/>
                            </div>
                            
                            <div className="d-grid gap-2 mt-5">
                                <button type="submit" className="btn btn-warning btn-lg corBotao fw-bold rounded rounded-5">Registrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default FormRegistrar;