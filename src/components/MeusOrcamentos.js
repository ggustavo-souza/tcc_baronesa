import { useEffect, useState } from "react";
import Navbar from './Navbar';
import Aos from "aos";
import { useAuthUser } from "./auths/useAuthUser";

export default function MeusOrcamentos() {
    useAuthUser();
    const [orcamentos, setOrcamentos] = useState([]);
    const [erro, setErro] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModalExcluir, setShowModalExcluir] = useState(false);
    const [orcamentoSelecionado, setOrcamentoSelecionado] = useState(null);

    useEffect(() => {
        Aos.init({ duration: 1000, once: true });
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

        if (usuarioLogado) {
            carregarOrcamentos(usuarioLogado.id);
        } else {
            setErro("Usuário não autenticado. Faça o login para ver seus orçamentos.");
            setLoading(false);
        }
    }, []);

    async function carregarOrcamentos(idUsuario) {
        try {
            const url = `http://localhost/tcc_baronesa/api/orcamentos/usuario/${idUsuario}`;
            const resposta = await fetch(url);

            if (!resposta.ok) {
                throw new Error("Erro ao carregar os orçamentos. Código: " + resposta.status);
            }

            const data = await resposta.json();
            setOrcamentos(data);
            setErro(null);
        } catch (error) {
            setErro(error.message);
        } finally {
            setLoading(false);
        }
    }

    // ===================================================================
    // FUNÇÕES PARA OS BOTÕES (LÓGICA DE EXEMPLO)
    // ===================================================================

    async function handleExcluir(idOrcamento) {
        // Pede confirmação ao usuário antes de prosseguir
        if (window.confirm("Tem certeza que deseja excluir este orçamento? Esta ação não pode ser desfeita.")) {
            console.log("Excluindo orçamento:", idOrcamento);
            // **AQUI VOCÊ DEVE IMPLEMENTAR A CHAMADA PARA A API PARA DELETAR**
            try {
                const resposta = await fetch(`http://localhost/tcc_baronesa/api/orcamentos/${idOrcamento}`, {
                    method: 'DELETE'
                });

                if (!resposta.ok) {
                    throw new Error("Falha ao excluir o orçamento.");
                }

                // Remove o orçamento da lista na tela sem precisar recarregar a página
                setOrcamentos(orcamentos.filter(o => o.id !== idOrcamento));
                alert("Orçamento excluído com sucesso!");

            } catch (error) {
                console.error("Erro ao excluir orçamento:", error);
                alert(error.message);
            }
        }
    }

    function handleContato(idOrcamento) {
        // logica whatsapp
        console.log("Entrando em contato sobre o orçamento:", idOrcamento);
        const numeroWhatsapp = "5511999999999";
        const mensagem = `Olá! Gostaria de falar sobre meu orçamento aprovado (Nº ${idOrcamento}).`;
        window.open(`https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`, '_blank');
    }


    return (
        <>
            <Navbar />
            <div className="container mt-4" data-aos="fade-up">
                <div className="col-12">
                    <h1 className="text-center fw-bold mb-3" style={{ color: "#FFD230" }}>
                        Meus Orçamentos
                    </h1>
                </div>

                <div className="grid p-3 mb-4" style={{ backgroundColor: "#503325c1", borderRadius: "10px" }}>
                    {loading ? (
                        <p className="text-center text-light py-5">Carregar orçamentos...</p>
                    ) : erro ? (
                        <p className="text-center text-danger py-5">{erro}</p>
                    ) : orcamentos.length === 0 ? (
                        <p className="text-center text-light py-5">Você ainda não solicitou nenhum orçamento.</p>
                    ) : (
                        <div className="row mt-4">
                            {orcamentos.map((orcamento) => (
                                <div className="col-md-4 mb-3" key={orcamento.id}>
                                    <div
                                        className="card card-produto p-3 m-2 h-100 d-flex flex-column"
                                        style={{ backgroundColor: "#503325c1", borderRadius: "10px" }}
                                    >
                                        <div>
                                            <h2 className="text-center titulo-produto" style={{ color: "#FFD230" }}>
                                                Orçamento #{orcamento.id}
                                            </h2>
                                            <p className="text-center mt-2" style={{ color: "#FFD230" }}>
                                                <strong>Mensagem:</strong> {orcamento.mensagem || "Sem mensagem disponível."}
                                            </p>
                                            <p className="text-center mt-2" style={{ color: "#FFD230" }}>
                                                <strong>Situação: </strong>
                                                <span style={{ textTransform: 'capitalize' }}>
                                                    {(orcamento.aprovacao === 'naoLido' || !orcamento.aprovacao)
                                                        ? 'Pendente'
                                                        : orcamento.aprovacao}
                                                </span>
                                            </p>
                                            <p className="text-center mt-2" style={{ color: "#FFD230" }}>
                                                <strong>Telefone:</strong> {orcamento.telefone || "Não informado"}
                                            </p>
                                        </div>

                                        <div className="mt-auto pt-3 text-center">
                                            {orcamento.aprovacao === 'aprovado' && (
                                                <button
                                                    className="btn btn-warning"
                                                    onClick={() => handleContato(orcamento.id)}
                                                >
                                                    <i className="fa fa-phone me-2"></i>
                                                    Entrar em Contato
                                                </button>
                                            )}

                                            {orcamento.aprovacao === 'desaprovado' && (
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => {
                                                        setOrcamentoSelecionado(orcamento.id);
                                                        setShowModalExcluir(true);
                                                    }}
                                                >
                                                    <i className="fa fa-trash me-2"></i>
                                                    Excluir
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {showModalExcluir && (
                <div className="modal" data-aos="fade-up" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content CorNavbar">
                            <div className="modal-header">
                                <h5 className="modal-title" style={{ color: '#FFD230' }}>Confirmar Exclusão</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModalExcluir(false)}></button>
                            </div>
                            <div className="modal-body">
                                <h3 style={{ color: '#FFD230' }}>Tem certeza que deseja excluir este orçamento?</h3>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModalExcluir(false)}>Cancelar</button>
                                <button className="btn btn-warning" onClick={() => handleExcluir(orcamentoSelecionado)}>Excluir</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModalExcluir && <div className="modal-backdrop fade show"></div>}
        </>
    );
}