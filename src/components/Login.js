import "../App.css";
import "../awesome/all.min.css";
import Navbar from './Navbar'
import { Link } from "react-router-dom";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function FormLogin() {

    const path = '/tcc_baronesa/api/login.php';
    useEffect(() => {
        Aos.init({ duration: 1000, once: true });

    }, []);

    return(
        <main>
            <Navbar />
            <div className="container">
                <div className="row justify-content-center mt-5" data-aos="fade-up">
                    <div className="col-md-6 card p-3" style={{ backgroundColor: '#503325c1', borderRadius: '10px' }}>
                        <form action={path} method="post" className="form-login">
                            <h1 className="text-center corAmarela" style={{ color: '#FFD230' }}>Login</h1>
                            <div className="form-group mt-5">
                                <label htmlFor="username" style={{ color: '#FFD230' }}>Nome de Usuário</label>
                                <input type="text" id="username" name="username" className="form-control mt-1" required />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="password" style={{ color: '#FFD230' }}>Senha</label>
                                <input type="password" id="password" name="password" className="form-control mt-1" required />
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