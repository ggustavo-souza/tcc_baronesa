import { useEffect, useState } from "react";
import Navbar from './Navbar';
import Aos from "aos";
import { useAuthUser } from "./auths/useAuthUser";

export default function MeusOrcamentos() {
    useAuthUser();
    const urlAPI = "https://tccbaronesapi.cloud"
    const [orcamentos, setOrcamentos] = useState([]);
    const [erro, setErro] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModalExcluir, setShowModalExcluir] = useState(false);
    const [modal, setModal] = useState(false);
    const [mensagemModal, setMensagemModal] = useState({ message: "" });
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
            const url = `${urlAPI}/api/orcamentos/usuario/${idUsuario}`;
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

    async function handleExcluir(idOrcamento) {
        console.log("Excluindo orçamento:", idOrcamento);
        try {
            const resposta = await fetch(`${urlAPI}/api/orcamentos/${idOrcamento}`, {
                method: 'DELETE'
            });

            if (!resposta.ok) {
                throw new Error("Falha ao excluir o orçamento.");
            }

            setOrcamentos(orcamentos.filter(o => o.id !== idOrcamento));
            setMensagemModal({ message: "Orçamento excluído com sucesso!" });
            setModal(true);
            setShowModalExcluir(false); // Fecha o modal de confirmação
            setOrcamentoSelecionado(null);
        } catch (error) {
            let erro = `Erro ao excluir orçamento: ${error.message}`;
            console.error(erro);
            setMensagemModal({ message: erro });
            setModal(true);
            setShowModalExcluir(false);
        }
    }

    function handleContato(idOrcamento) {
        console.log("Entrando em contato sobre o orçamento:", idOrcamento);
        const numeroWhatsapp = "5515997396140";
        const mensagem = `Olá! Gostaria de falar sobre meu orçamento aprovado (Nº ${idOrcamento}).`;
        window.open(`https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`, '_blank');
    }


    // Função auxiliar para determinar o texto e cor da situação
    const getSituacao = (aprovacao) => {
        let texto = '';
        let cor = '';

        if (aprovacao === 'aprovado') {
            texto = 'Aprovado';
            cor = 'lightgreen'; // Verde para aprovado
        } else if (aprovacao === 'desaprovado') {
            texto = 'Desaprovado';
            cor = 'crimson'; // Vermelho/Carmesim para desaprovado
        } else {
            texto = 'Pendente';
            cor = '#FFD230'; // Amarelo para pendente
        }
        return { texto, cor };
    };


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
                        <p className="text-center text-light py-5">Carregando orçamentos...</p>
                    ) : erro ? (
                        <p className="text-center text-danger py-5">{erro}</p>
                    ) : orcamentos.length === 0 ? (
                        <p className="text-center text-light py-5">Você ainda não solicitou nenhum orçamento.</p>
                    ) : (
                        <div className="row mt-4">
                            {orcamentos.map((orcamento) => {
                                const situacao = getSituacao(orcamento.aprovacao);
                                return (
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
                                                
                                                {/* CAMPO DE SITUAÇÃO COM COR DINÂMICA */}
                                                <p className="text-center mt-2" style={{ color: "#FFD230" }}>
                                                    <strong>Situação: </strong>
                                                    <span style={{ textTransform: 'capitalize', color: situacao.cor, fontWeight: 'bold' }}>
                                                        {situacao.texto}
                                                    </span>
                                                </p>
                                                
                                                {/* NOVO CAMPO PARA O MOTIVO DA DESAPROVAÇÃO */}
                                                {orcamento.aprovacao === 'desaprovado' && orcamento.observacao && (
                                                    <p className="text-center mt-2" style={{ color: "#FFD230" }}>
                                                        <i className='fa fa-info-circle me-1' style={{ color: situacao.cor }}></i>
                                                        <strong>Motivo:</strong> <i style={{ color: situacao.cor }}>{orcamento.observacao}</i>
                                                    </p>
                                                )}

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

                                                {/* O botão Excluir agora aparece para Desaprovado e Pendente, usando o modal de confirmação */}
                                                {(orcamento.aprovacao === 'desaprovado' || orcamento.aprovacao === 'naoLido') && (
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
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de Confirmação de Exclusão (Ações removidas do window.confirm) */}
            {showModalExcluir && (
                <>
                    <div className="modal" data-aos="fade-up" tabIndex="-1" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content border-0 shadow-lg rounded-4" style={{backgroundColor: '#503325'}}>
                                <div className="modal-header border-0 pb-0" style={{borderBottom: '1px solid #FFD230'}}>
                                    <h5 className="modal-title" style={{ color: '#FFD230' }}>Confirmar Exclusão</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModalExcluir(false)}></button>
                                </div>
                                <div className="modal-body py-4">
                                    <h3 style={{ color: '#FFD230' }}>Tem certeza que deseja excluir este orçamento? Esta ação não pode ser desfeita.</h3>
                                </div>
                                <div className="modal-footer border-0" style={{backgroundColor: '#503325'}}>
                                    <button className="btn btn-secondary" onClick={() => setShowModalExcluir(false)}>Cancelar</button>
                                    <button className="btn btn-danger" onClick={() => handleExcluir(orcamentoSelecionado)}>
                                        <i className="fa fa-trash me-2"></i> Excluir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}

            {/* Modal de Mensagem (Sucesso/Erro após ação) */}
            {modal && (
                <>
                    <div className="modal" data-aos="fade-up" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content border-0 shadow-lg rounded-4">
                                <div className="modal-header border-0 pb-0">
                                    <h5 className="modal-title text-dark fw-bold">
                                        <i className="fa-solid fa-triangle-exclamation text-danger me-2"></i>
                                        Mensagem!
                                    </h5>
                                    <button type="button" className="btn-close" onClick={() => setModal(false)}></button>
                                </div>
                                <div className="modal-body py-4">
                                    <p className="mb-0">{mensagemModal.message}</p>
                                </div>
                                <div className="modal-footer border-0 bg-light">
                                    <button type="button" className="btn btn-secondary" onClick={() => setModal(false)}>
                                        Voltar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}

        </>
    );
}