import Navadm from '../Navadm';
import "../../App.css";
import Aos from 'aos';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminOrcamentos() {
    const urlAPI = "https://tccbaronesapi.cloud"
    const [registros, setRegistros] = useState([])
    const [usuarios, setUsuarios] = useState([])
    const [categorias, setCategorias] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showModalErro, setShowModalErro] = useState(false)
    const [showModalExcluir, setShowModalExcluir] = useState(false);
    const [showModalAprovar, setShowModalAprovar] = useState(false);
    const [showModalDesaprovar, setShowModalDesaprovar] = useState(false);
    const [orcamentoSelecionado, setOrcamentoSelecionado] = useState(null);

    const [observacaoDesaprovacao, setObservacaoDesaprovacao] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        Aos.init({ duration: 1000, once: true })
        fetchOrcamentos()
        fetchUsuarios()
        fetchCategorias()

    }, [])

    async function fetchOrcamentos() {
        const url = `${urlAPI}/api/orcamentos`
        await fetch(url)
            .then(res => {
                if (!res.ok) throw new Error("Erro ao carregar orçamentos")
                return res.json()
            })
            .then(data => setRegistros(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }

    async function fetchUsuarios() {
        try {
            const res = await fetch(`${urlAPI}/api/usuarios`);
            if (!res.ok) throw new Error("Erro ao carregar usuários");
            const data = await res.json();
            setUsuarios(data);
        } catch (err) {
            console.error(err);
        }
    }

    function handleContato(idOrcamento, numeroCliente) {
        console.log("Entrando em contato sobre o orçamento:", idOrcamento);
        const mensagem = `Olá! Somos da A Baronesa Movelaria. Queremos contatar sobre o Orçamento (Nº ${idOrcamento}).`;
        window.open(`https://wa.me/55${numeroCliente}?text=${encodeURIComponent(mensagem)}`, '_blank');
    }

    async function fetchCategorias() {
        try {
            const res = await fetch(`${urlAPI}/api/categorias`);
            if (!res.ok) throw new Error("Erro ao carregar categorias");
            const data = await res.json();
            setCategorias(data);
        } catch (err) {
            console.error(err);
        }
    }

    function excluirOrcamento(id) {
        fetch(`${urlAPI}/api/orcamentos/${id}`, { method: "DELETE" })
            .then(res => res.json())
            .then(() => {
                setRegistros(registros.filter(u => u.id !== id));
                setShowModalExcluir(false);
                setOrcamentoSelecionado(null);
            })
            .catch(err => console.error(err));
    }

    function aprovarOrcamento(id, aprovado, observacao = null) {
        const dados = {
            aprovacao: aprovado
        };

        if (aprovado === "desaprovado" && observacao) {
            dados.observacao = observacao;
        } else if (aprovado === "aprovado") {
            dados.observacao = null;
        }

        fetch(`${urlAPI}/api/orcamentos/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        })
            .then(res => {
                if (!res.ok) throw new Error("Erro ao atualizar Orçamento");
                return res.json();
            })
            .then(data => {
                console.log(data);

                setRegistros(registros.map(reg =>
                    reg.id === id
                        ? {
                            ...reg,
                            aprovacao: aprovado,
                            observacao: (aprovado === "desaprovado" ? observacao : null)
                        }
                        : reg
                ));

                setShowModalAprovar(false);
                setShowModalDesaprovar(false);
                setObservacaoDesaprovacao('');
                setOrcamentoSelecionado(null);
            })
            .catch(err => {
                console.error(err.message);
                setShowModalErro(true)
            });
    }

    const handleConfirmarDesaprovacao = () => {
        if (!observacaoDesaprovacao.trim()) {
            alert("A observação é obrigatória para desaprovação.");
            return;
        }
        aprovarOrcamento(orcamentoSelecionado, "desaprovado", observacaoDesaprovacao);
    };


    if (loading) return <h3 className='mt-5' style={{ color: '#FFD230' }}>Carregando...</h3>;
    if (error) return <div><h3 className='mt-5' style={{ color: '#FFD230' }}>Ocorreu algum erro... <i className='fa-regular fa-face-dizzy' style={{ color: 'crimson' }}></i></h3><button className='btn btn-warning mt-4 col-5' onClick={() => navigate(-1)}>Voltar</button></div>;

    const registrosPendentes = registros.filter(r => r.aprovacao === "naoLido");
    const registrosAprovados = registros.filter(r => r.aprovacao === "aprovado");
    const registrosDesaprovados = registros.filter(r => r.aprovacao === "desaprovado");


    const RegistroCard = ({ registro }) => {
        let situacaoTexto = 'Desaprovado';
        let situacaoCor = 'crimson';
        if (registro.aprovacao === 'naoLido') {
            situacaoTexto = 'Pendente';
            situacaoCor = '#FFD230';
        } else if (registro.aprovacao === 'aprovado') {
            situacaoTexto = 'Aprovado';
            situacaoCor = 'lightgreen';
        }

        const usuarioNome = usuarios.find(u => u.id === registro.id_usuario)?.nome || '—';
        const categoriaNome = categorias.find(u => u.id === registro.id_categoria)?.nome || '—';

        return (
            <div
                className='card p-3 m-5'
                style={{
                    backgroundColor: '#503325',
                    borderRadius: "15px",
                    cursor: "pointer",
                    transition: "transform 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
                <div key={registro.id}>
                    <h3 style={{ color: '#FFD230' }} data-label="ID:"><strong>Id:</strong> <i>{registro.id}</i></h3>
                    <h3 style={{ color: '#FFD230' }} data-label="usuario:"><strong>Usuário:</strong> <i>{usuarioNome}</i></h3>
                    <h3 style={{ color: '#FFD230' }} data-label="telefone:"><strong>Tel:</strong><i>{registro.telefone}</i></h3>
                    <h3 style={{ color: '#FFD230' }} data-label="categoria"><strong>Categoria:</strong> <i>{categoriaNome}</i></h3>
                    <h3 style={{ color: '#FFD230' }} data-label="mensagem:"><strong>Descrição:</strong> <i>{registro.mensagem}</i></h3>
                    <h3 style={{ color: '#FFD230' }} data-label="situacao:">
                        <strong>Situação: </strong>
                        <i style={{ color: situacaoCor }}>
                            {situacaoTexto}
                        </i>
                    </h3>

                    {/* APENAS ESTA SEÇÃO FOI ALTERADA para aplicar a cor amarela ao texto da observação */}
                    {registro.aprovacao === 'desaprovado' && registro.observacao && (
                        <h3 style={{ color: '#FFD230', marginTop: '10px' }}>
                            <i className='fa fa-info-circle me-1' style={{ color: 'crimson' }}></i> {/* Ícone em vermelho */}
                            <strong>Motivo:</strong> <i>{registro.observacao}</i>
                        </h3>
                    )}

                    <div>
                        {registro.aprovacao !== 'aprovado' && (
                            <button className="btn btn-warning m-3" onClick={() => {
                                setShowModalAprovar(true);
                                setOrcamentoSelecionado(registro.id);
                            }}><i className='fa fa-check me-1'></i>Aprovar</button>
                        )}

                        {registro.aprovacao !== 'desaprovado' && (
                            <button className="btn btn-warning m-3" onClick={() => {
                                setShowModalDesaprovar(true);
                                setOrcamentoSelecionado(registro.id);
                                setObservacaoDesaprovacao(registro.observacao || '');
                            }}>
                                <i className='fa fa-xmark me-1'></i>Desaprovar
                            </button>
                        )}

                        {registro.aprovacao === ('aprovado') && (
                            <button className="btn btn-warning m-3" onClick={() => {
                                handleContato(registro.id, registro.telefone)
                            }}>
                                <i className='fa fa-phone me-2'></i>Entrar em contato
                            </button>
                        )}

                        <button className="btn btn-danger m-3" onClick={() => {
                            setShowModalExcluir(true);
                            setOrcamentoSelecionado(registro.id);
                        }}><i className='fa fa-trash me-1'></i>Excluir</button>
                    </div>
                </div>
            </div>
        );
    };

    const renderizarSecao = (titulo, listaRegistros) => (
        <div className='container mt-5'>
            <h2 style={{ color: "#FFD230", borderBottom: "2px solid #FFD230", paddingBottom: "10px" }}>
                {titulo} ({listaRegistros.length})
            </h2>
            <div
                className="card text-center p-4 shadow mt-3 mb-5"
                data-aos="fade-up"
                style={{
                    backgroundColor: '#503325c1',
                    color: "#FFD230",
                    borderRadius: "15px",
                }}
            >
                {listaRegistros.length > 0 ? (
                    <div>
                        {listaRegistros.map(registro => (
                            <RegistroCard key={registro.id} registro={registro} />
                        ))}
                    </div>
                ) : <p className='m-3'>Nenhum registro de {titulo.toLowerCase()} encontrado.</p>}
            </div>
        </div>
    );

    return (
        <>
            <Navadm />
            <div className='mt-4'>
                <h1 style={{ color: "#FFD230" }}>Orçamentos</h1>
            </div>

            {renderizarSecao("Pendentes", registrosPendentes)}

            <hr style={{ borderColor: '#FFD230', opacity: 0.5 }} />

            {renderizarSecao("Aprovados", registrosAprovados)}

            <hr style={{ borderColor: '#FFD230', opacity: 0.5 }} />

            {renderizarSecao("Desaprovados", registrosDesaprovados)}

            {registros.length === 0 && (
                <div className='container'>
                    <p className='text-center' style={{ color: "#FFD230" }}>Nenhum registro encontrado no total.</p>
                </div>
            )}

            {showModalExcluir && (
                <>
                    <div className="modal" data-aos="fade-up" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content border-0 shadow-lg rounded-4">
                                <div className="modal-header border-0 pb-0">
                                    <h5 className="modal-title text-dark fw-bold">
                                        <i className="fa-solid fa-triangle-exclamation text-danger me-2"></i>
                                        Confirmar Exclusão
                                    </h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModalExcluir(false)}></button>
                                </div>
                                <div className="modal-body py-4">
                                    <p className="mb-0">Deseja realmente excluir este orçamento? Esta ação não pode ser desfeita.</p>
                                </div>
                                <div className="modal-footer border-0 bg-light">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModalExcluir(false)}>Cancelar</button>
                                    <button type="button" className="btn btn-danger fw-bold" onClick={() => excluirOrcamento(orcamentoSelecionado)}>
                                        <i className="fa-solid fa-trash me-2"></i>
                                        Sim, Excluir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}

            {showModalAprovar && (
                <>
                    <div
                        className="modal"
                        data-aos="fade-up"
                        style={{ display: 'block' }}
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content border-0 shadow-lg" style={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }}>

                                <div className="modal-header border-0 pb-2" style={{ backgroundColor: '#FFD230' }}>
                                    <h5 className="modal-title text-dark fw-bold">Mensagem!</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        aria-label="Close"
                                        onClick={() => setShowModalAprovar(false)}
                                    ></button>
                                </div>

                                <div className="modal-body pt-4 pb-4">
                                    <h5 className="text-dark">Quer mesmo aprovar o orçamento?</h5>
                                </div>

                                <div className="modal-footer align-self-center border-0 pt-0">
                                    <button
                                        type="button"
                                        className="btn btn-secondary fw-bold px-4"
                                        onClick={() => setShowModalAprovar(false)}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-success fw-bold px-4"
                                        onClick={() => aprovarOrcamento(orcamentoSelecionado, "aprovado")}
                                        style={{ backgroundColor: '#FFD230', borderColor: '#FFD110', color: 'black' }}
                                    >
                                        Sim, quero!
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}

            {showModalDesaprovar && (
                <>
                    <div
                        className="modal"
                        data-aos="fade-up"
                        style={{ display: 'block' }}
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content border-0 shadow-lg" style={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }}>

                                <div className="modal-header border-0 pb-2" style={{ backgroundColor: '#FFD230' }}>
                                    <h5 className="modal-title text-dark fw-bold">Desaprovar Orçamento</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        aria-label="Close"
                                        onClick={() => setShowModalDesaprovar(false)}
                                    ></button>
                                </div>

                                <div className="modal-body pt-4 pb-4">
                                    <h5 className="text-dark">Quer mesmo desaprovar o orçamento?</h5>
                                    <p className='text-dark'>Por favor, insira o <b>motivo da desaprovação</b> para o cliente:</p>
                                    <div className="mb-3">
                                        <textarea
                                            className="form-control"
                                            id="observacao"
                                            rows="3"
                                            value={observacaoDesaprovacao}
                                            onChange={(e) => setObservacaoDesaprovacao(e.target.value)}
                                            placeholder="Digite a observação/motivo aqui (obrigatório)"
                                            style={{ borderColor: '#FFD230', borderWidth: '2px' }}
                                            required
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="modal-footer align-self-center border-0 pt-0">
                                    <button
                                        type="button"
                                        className="btn btn-secondary fw-bold px-4"
                                        onClick={() => setShowModalDesaprovar(false)}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger fw-bold px-4"
                                        onClick={handleConfirmarDesaprovacao}
                                        style={{ backgroundColor: 'crimson', borderColor: 'crimson', color: 'white' }}
                                    >
                                        <i className='fa fa-xmark me-1'></i>Desaprovar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}

            {showModalErro && (
                <>
                    <div className="modal" data-aos="fade-up" tabIndex="-1" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content CorNavbar">
                                <div className="modal-header">
                                    <h5 className="modal-title" style={{ color: '#FFD230' }}>Erro no Orçamento</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModalErro(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <h3 style={{ color: '#FFD230' }}>Ocorreu um erro na interação.</h3>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={() => setShowModalErro(false)}>Voltar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}
        </>
    )
}