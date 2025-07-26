import "../App.css";
import "../awesome/all.min.css";
import Navbar from './Navbar'
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function FormLogin() {
    useEffect(() => {
        Aos.init({ duration: 1000, once: true });

    }, []);

    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost/tcc_baronesa/api/login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password
                }),
            });
            const data = await response.json();

            if (data.sucesso) {
                alert("Login realizado com sucesso!");
                localStorage.setItem("usuarioLogado", JSON.stringify({
                    nome: data.usuario.nome,
                    cargo: data.usuario.cargo,
                }));
                if (data.usuario.cargo === "admin") {
                    navigate("/admin-crud"); // rota do admin
                } else {
                    navigate("/"); // rota do usuário comum
                }
            } else {
                alert(data.erro || "Erro no login");
            }
        } catch (error) {
            navigate("/erroservidor");
        }
    };


    return(
        <main>
            <Navbar />
            <div className="container">
                <div className="row justify-content-center mt-5" data-aos="fade-up">
                    <div className="col-md-6 card p-3" style={{ backgroundColor: '#503325c1', borderRadius: '10px' }} >
                        <form onSubmit={handleSubmit} className="form-login">
                            <h1 className="text-center corAmarela" style={{ color: '#FFD230' }}>Login</h1>
                            <div className="form-group mt-5">
                                <label htmlFor="email" style={{ color: '#FFD230' }}>E-mail</label>
                                <input type="email" id="email" name="email" className="form-control mt-1" required value={form.email} onChange={handleChange}/>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="password" style={{ color: '#FFD230' }}>Senha</label>
                                <input type="password" id="password" name="password" className="form-control mt-1" required value={form.password} onChange={handleChange}/>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-warning mt-5 corBotao">Login</button>
                            </div>
                            <div className="mt-2 btn">
                                <Link to='/registrar' className="text-decoration-none text-warning fw-bold fs-5 suba">Não possui conta? Clique aqui para se registrar!</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default FormLogin;