import "../App.css";
import "../awesome/all.min.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuthUser } from './auths/useAuthUser'
import { useEffect } from "react";
import Aos from "aos";

function HomeOrcamento() {
    useAuthUser();
    useEffect(() => {
        Aos.init({ duration: 1000, once: true });
    }, []);


    return (
        <main>
            <Navbar />
            <div className="container mt-5">
                <div>
                    <div className="card text-center CardOrcamento mb-5" data-aos="fade-up">
                        <h1 className="mt-5" style={{ color: '#FFD230' }}>Faça já seu orçamento!</h1>
                        <div className="card-body">
                            <p className="card-text h5 mt-2 mb-5" style={{ color: '#fff' }}>
                                Preencha o formulário abaixo e solicite um orçamento personalizado para o seu projeto!
                            </p>
                            <form>
                                <div class="row justify-content-center">
                                    <div class="col-md-6">
                                        <label for="selectCategoria" className="form-label mb-2">Selecione a Categoria</label>
                                        <select className="form-select mb-4" id="selectCategoria">
                                            <option selected disabled>Selecione uma opção...</option>
                                            <option value="1" >Mesas</option>
                                            <option value="2">Cadeiras</option>
                                            <option value="3">Cômodas</option>
                                            <option value="4">Armários</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-md-6">
                                        <label for="message" className="form-label">Mensagem</label>
                                        <textarea className="form-control" id="message" rows="3" required></textarea>
                                    </div>
                                </div>
                                <div class="text-center mt-3">
                                    <button type="submit" class="btn btn-warning mt-3 corBotao">Enviar</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main >
    )
}

export default HomeOrcamento;