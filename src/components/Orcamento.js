import "../App.css";
import "../awesome/all.min.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuthUser } from './auths/useAuthUser';
import { useEffect, useState } from "react";
import Aos from "aos";
import { Navigate, useNavigate } from "react-router-dom";

function HomeOrcamento() {
    // pega o usuário logado
    const usuario = useAuthUser(); // retorna o objeto do usuário ou redireciona se não estiver logado

    useEffect(() => {
        Aos.init({ duration: 1000, once: true });
    }, []);

    // estados do form
    const [categoria, setCategoria] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [telefone, setTelefone] = useState("");
    const [modalErro, setModalErro] = useState(false);
    const [modalConcluido, setModalConcluido] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!usuario?.id) {
            alert("Erro: usuário não autenticado.");
            return;
        }

        try {
            const response = await fetch("http://localhost/tcc_baronesa/api/orcamentos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_usuario: usuario.id,
                    id_categoria: categoria,
                    mensagem,
                    telefone,
                }),
            });

            const data = await response.json();
            console.log("Resposta do backend:", data); // <-- para debugging

            if (!response.ok) throw new Error(data.message || "Erro ao enviar orçamento");

            setModalConcluido(true)
            setCategoria("");
            setMensagem("");
            setTelefone("");
        } catch (err) {
            console.error(err.message);
            setModalErro(true)
        }
    };

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
                            <form onSubmit={handleSubmit}>
                                {/* Categoria */}
                                <div className="row justify-content-center">
                                    <div className="col-md-6">
                                        <label htmlFor="selectCategoria" className="form-label mb-2">Selecione a Categoria</label>
                                        <select
                                            className="form-select mb-4"
                                            id="selectCategoria"
                                            value={categoria}
                                            onChange={(e) => setCategoria(e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>Selecione uma opção...</option>
                                            <option value="1">Mesas</option>
                                            <option value="2">Cadeiras</option>
                                            <option value="3">Cômodas</option>
                                            <option value="4">Armários</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Telefone */}
                                <div className="row justify-content-center">
                                    <div className="col-md-6">
                                        <label htmlFor="telefone" className="form-label">Telefone de Contato</label>
                                        <input
                                            type="tel"
                                            className="form-control mb-4"
                                            id="telefone"
                                            placeholder="(11) 91234-5678"
                                            maxLength="15"
                                            value={telefone}
                                            onChange={(e) => setTelefone(e.target.value)}
                                            required
                                            onInput={(e) => {
                                                let value = e.target.value.replace(/\D/g, "");
                                                if (value.length > 11) value = value.slice(0, 11);
                                                if (value.length <= 10) {
                                                    e.target.value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
                                                } else {
                                                    e.target.value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
                                                }
                                                setTelefone(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Mensagem */}
                                <div className="row justify-content-center">
                                    <div className="col-md-6">
                                        <label htmlFor="message" className="form-label">Mensagem</label>
                                        <textarea
                                            className="form-control"
                                            id="message"
                                            rows="3"
                                            value={mensagem}
                                            onChange={(e) => setMensagem(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="text-center mt-3">
                                    <button type="submit" className="btn btn-warning mt-3 corBotao">Enviar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            {modalConcluido && (
                <div
                    className="modal"
                    data-aos="fade-up"
                    style={{ display: 'block' }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 shadow-lg" style={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }}>

                            <div className="modal-header border-0 pb-2" style={{ backgroundColor: '#FFD230' }}>
                                <h5 className="modal-title text-dark fw-bold">Sucesso!</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={() => setModalConcluido(false)}
                                ></button>
                            </div>

                            <div className="modal-body pt-4 pb-4">
                                <h5 className="">Seu orçamento foi enviado com sucesso!</h5>
                            </div>

                            <div className="modal-footer border-0 pt-0">
                                <button
                                    type="button"
                                    className="btn btn-success fw-bold px-4"
                                    onClick={() => navigate("/")}
                                    style={{ backgroundColor: '#198754', borderColor: '#198710' }}
                                >
                                    Sair
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {modalConcluido && <div className="modal-backdrop fade show"></div>}
        </main>
    );
}

export default HomeOrcamento;