import { useEffect, useState } from "react";
import Navbar from './Navbar';
import Aos from "aos";
import { useParams } from "react-router-dom";

export default function MeusOrcamentos() {

    useEffect(() => {
        Aos.init({ duration: 1000, once: true });
        carregarOrcamentos();
    }, [])
    const { id } = useParams();
    const [orcamentos, setOrcamentos] = useState([]);
    const [erro, setErro] = useState(true)
    const [loading, setLoading] = useState(null)

    async function carregarOrcamentos() {
        try {
            const resposta = await fetch(`http://localhost/tcc_baronesa/api/orcamentos/${id}`);
            if (!resposta.ok) throw new Error("Erro ao carregar os orçamentos")
            const data = await resposta.json();
            setOrcamentos(data)
        } catch (error) {
            setErro(error.message);
        } finally {
            setLoading(false);
        }

    }

    return (
        <>
            <Navbar />
            <div className="container mt-4" data-aos="fade-up">
                <div className="col-12">
                    <h1 className="text-center fw-bold mb-3" style={{ color: "#FFD230" }}>
                        Orçamentos
                    </h1>
                </div>

                <div className="grid p-3 mb-4" style={{ backgroundColor: "#503325c1", borderRadius: "10px" }}>
                    {loading ? (
                        <p className="text-center text-light py-5">Carregando orçamentos...</p>
                    ) : erro ? (
                        <p className="text-center text-danger py-5">{erro}</p>
                    ) : orcamentos.length === 0 ? (
                        <p className="text-center text-light py-5">Nenhum orçamento disponível.</p>
                    ) : (
                        <div className="row mt-4">
                            {orcamentos.map((orcamento) => (
                                <div className="col-md-4" key={orcamento.id}>
                                    <div
                                        className="card card-produto p-3 m-2"
                                        style={{ backgroundColor: "#503325c1", borderRadius: "10px" }}
                                    >
                                        <h2 className="text-center titulo-produto" style={{ color: "#FFD230" }}>
                                            {orcamento.nome}
                                        </h2>

                                        <p className="text-center mt-2" style={{ color: "#FFD230" }}>
                                            {orcamento.descricao || "Sem descrição disponível."}
                                        </p>

                                        <p className="text-center mt-2" style={{ color: "#FFD230" }}>
                                            {orcamento.situacao || "Sem situação disponível."}
                                        </p>

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}