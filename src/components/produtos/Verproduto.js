import { useState, useEffect, useCallback } from 'react'; // <-- Importado useCallback
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import "../../App.css";
import Aos from 'aos';

export default function VerMovel() {
    const { id } = useParams();
    const urlAPI = "https://tccbaronesapi.cloud"
    const navigate = useNavigate();
    const [movel, setMovel] = useState(null);
    const [categoria, setCategoria] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mensagem, setMensagem] = useState(null);
    const [modal, setModal] = useState(false);
    const [imagemPrincipal, setImagemPrincipal] = useState('');

    const carregarMovel = useCallback(async () => {
        try {
            const res = await fetch(`${urlAPI}/api/moveis/${id}`);
            if (!res.ok) throw new Error('Erro ao carregar móvel');
            const data = await res.json();
            setMovel(data);
            
            if (data.fotos?.length > 0) {
                // VERIFICAÇÃO CRUCIAL: Só define a imagem padrão se o estado estiver vazio.
                if (!imagemPrincipal) { 
                    const principal = data.fotos.find(f => f.principal) || data.fotos[0];
                    setImagemPrincipal(principal.foto);
                }
            }
            
            if (data.categoria_id) {
                const resCat = await fetch(`${urlAPI}/api/categorias/${data.categoria_id}`);
                if (resCat.ok) {
                    const catData = await resCat.json();
                    setCategoria(catData.nome);
                }
            }
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [id, urlAPI, imagemPrincipal]); // <-- 'imagemPrincipal' PRECISA estar aqui para que o useCallback veja o valor atualizado.

    // =======================================================
    // useEffect depende de carregarMovel
    // =======================================================
    useEffect(() => {
        Aos.init({ duration: 500 });
        carregarMovel();
    }, [carregarMovel]);

    function LoadingSpinner() {
        return (
            <div className="d-flex vh-100 justify-content-center align-items-center" style={{ backgroundColor: '#333' }}>
                <div className="spinner-border text-warning" role="status" style={{ width: '3rem', height: '3rem' }}>
                    <span className="visually-hidden">Carregando...</span>
                </div>
            </div>
        );
    }

    function ErrorDisplay({ error, onRetry }) {
        // const navigate = useNavigate(); já está no escopo principal
        return (
            <div className="d-flex vh-100 justify-content-center align-items-center text-center" style={{ backgroundColor: '#333' }}>
                <div>
                    <h3 className="text-danger mb-3">Ocorreu algum erro: {error}</h3>
                    <button className='btn btn-warning me-2' onClick={() => navigate(-1)}>← Voltar</button>
                    <button className='btn btn-outline-warning' onClick={onRetry}>Tentar Novamente</button>
                </div>
            </div>
        );
    }

    // =============================
    // Função para adicionar pedido
    // =============================
    async function adicionarPedido() {
        const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
        if (usuarioLogado) {
            const usuarioId = usuarioLogado.id;

            try {
                const res = await fetch(`${urlAPI}/api/pedidos`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id_usuario: usuarioId,
                        id_movel: id
                    }),
                });
                const data = await res.json();
                console.log(data);
                if (data.sucesso) {
                    setMensagem("Pedido adicionado com sucesso!");
                    setModal(true);
                } else {
                    setMensagem("Erro ao adicionar pedido.");
                    setModal(true)
                }
            } catch (err) {
                console.error(err);
                setMensagem("Falha na comunicação com o servidor.");
                setModal(true)
            }
        } else {
            setMensagem("Você precisa estar logado para adicionar um pedido!");
            setModal(true)
            return;
        }
    }

 if (loading) return <LoadingSpinner />;
    if (error) return <ErrorDisplay error={error} onRetry={() => window.location.reload()} />; // Recarrega a página
    if (!movel) return null;

    return (
        <>
            <Navbar />
            <div className="container my-5" data-aos="fade-up">
                <div className="mb-3">
                    <button
                        className='btn btn-warning corBotao'
                        onClick={() => navigate(-1)}
                    >
                        ← Voltar
                    </button>
                </div>

                <div className="row g-5 mt-1">
                    {/* Coluna da Galeria de Imagens */}
                    <div className="col-lg-7">
                        {/* Imagem Principal */}
                        <img
                            src={`${urlAPI}/api/uploads/${imagemPrincipal}`}
                            alt={movel.nome}
                            className="img-fluid rounded-3 shadow-lg mb-3"
                            style={{
                                width: '100%',
                                height: 'auto',
                                maxHeight: '550px',
                                objectFit: 'cover',
                                border: '1px solid #FFD230'
                            }}
                        />
                        {/* Miniaturas */}
                        <div className="row g-2">
                            {movel.fotos?.map(f => (
                                <div className="col-3" key={f.id}>
                                    <img
                                        src={`${urlAPI}/api/uploads/${f.foto}`}
                                        alt="miniatura"
                                        className="img-fluid rounded shadow-sm"
                                        style={{
                                            cursor: 'pointer',
                                            objectFit: 'cover',
                                            width: '100%',
                                            height: '120px',
                                            border: f.foto === imagemPrincipal
                                                ? '3px solid #FFD230' // Destaque na selecionada
                                                : '3px solid transparent', // Borda transparente
                                            transition: 'border 0.2s ease'
                                        }}
                                        onClick={() => setImagemPrincipal(f.foto)} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Coluna de Informações do Produto */}
                    <div className="col-lg-5">
                        <div
                            className="p-4 p-md-5 rounded-3 shadow-sm h-100 d-flex flex-column"
                            style={{
                                backgroundColor: '#503325', // Cor do seu card
                                color: '#FFD230', // Cor do seu texto
                                border: '1px solid #FFD230'
                            }}
                        >
                            {/* Categoria */}
                            <h6 className="text-uppercase text-warning mb-2">{categoria || 'Sem Categoria'}</h6>
                            {/* Nome do Móvel */}
                            <h1 className="display-5 fw-bold mb-3 text-white">{movel.nome}</h1>
                            {/* Preço */}
                            <h2 className="mb-4" style={{ color: '#FFD230', fontWeight: 300 }}>
                                R$ {movel.valor},00
                            </h2>
                            {/* Descrição */}
                            <p className="lead mb-4" style={{ color: '#eee' }}>{movel.descricao}</p>

                            {/* Botão de Adicionar Pedido (ocupa todo o espaço) */}
                            <div className="d-grid mt-auto">
                                <button
                                    className="btn btn-warning btn-lg fw-bold"
                                    onClick={adicionarPedido}
                                    style={{
                                        backgroundColor: '#FFD230',
                                        borderColor: '#FFD230',
                                        color: '#333' // Texto escuro para melhor contraste
                                    }}
                                >
                                    Adicionar Pedido
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {modal && (
                <div
                    className="modal"
                    data-aos="fade-up"
                    style={{ display: 'block' }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 shadow-lg" style={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }}>

                            <div className="modal-header border-0 pb-2" style={{ backgroundColor: '#FFD230' }}>
                                <h5 className="modal-title text-dark fw-bold">Mensagem</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={() => setModal(false)}
                                ></button>
                            </div>

                            <div className="modal-body pt-4 pb-4">
                                <h5 className="">{mensagem}</h5>
                            </div>

                            <div className="modal-footer align-self-center border-0 pt-0">
                                <button
                                    type="button"
                                    className="btn btn-success fw-bold px-4"
                                    onClick={() => navigate(-1)}
                                    style={{ backgroundColor: '#FFD230', borderColor: '#FFD660' }}
                                >
                                    Voltar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {modal && <div className="modal-backdrop fade show"></div>}
        </>
    );
}