import { useEffect, useState } from "react";
import Navadm from '../Navadm';
import Footer from "../Footer";
import Aos from "aos";
import '../../App.css';
import '../../awesome/all.min.css';


function PedidosCrud() {

    const urlAPI = "https://tccbaronesapi.cloud"
    const [pedidos, setPedidos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [loadingUsuarios, setLoadingUsuarios] = useState(true);

    if (usuarios && setUsuarios && error && loading && setLoading) {
        console.log("Teste Contra ci")
    }

    useEffect(() => {
        Aos.init({ duration: 800, once: true });
        fetchUsuarios();
        puxarPedidos();
    }, [])

    async function fetchUsuarios() {
        setLoadingUsuarios(true);
        const url = `${urlAPI}/api/usuarios`
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error("Erro ao carregar usuários");
            const data = await res.json();
            console.log(data)
            setUsuarios(data)
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setLoadingUsuarios(false);
        }
    }

    async function puxarPedidos() {
        setLoading(true);
        const url = `${urlAPI}/api/pedidos/pagos`
        try {
            const res = await fetch(url)
            if (!res.ok) {
                throw new Error(`Erro na API: ${res.status} - ${res.statusText}`);
            }

            const data = await res.json();

            console.log("Pedidos recebidos:", data);

            setPedidos(data);
            setLoading(false)

        } catch (error) {
            console.error("Ocorreu um erro na requisição:", error.message);
        }
    }

    async function pedidoPronto(id, status) {
        if (status !== 'pronto') {
            console.error("Status de atualização inválido.");
            return;
        }

        const url = `${urlAPI}/api/pedidos/${id}`;

        try {
            const res = await fetch(url, {
                method: 'POST', // Usando POST para atualização na sua API
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: status }), // Enviando o novo status no corpo
            });

            const data = await res.json();

            if (!res.ok) {
                // Se o status HTTP não for 200, joga um erro.
                throw new Error(data.message || `Falha ao atualizar pedido. Status: ${res.status}`);
            }

            console.log("Sucesso:", data.message);

            puxarPedidos();

        } catch (error) {
            console.error("Erro ao processar o pedido:", error.message);
            setError("Erro ao marcar pedido como pronto: " + error.message);
        }
    }

    if (loadingUsuarios && pedidos.length === 0) {
        return (
            <div className="d-flex flex-column min-vh-100" style={{ color: 'white', textAlign: 'center' }}>
                <Navadm />
                <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center p-4">
                    <h1 className="mt-5" style={{ color: "#FFD230" }}>Pedidos Pagos</h1>
                    <p>Carregando usuários e pedidos...</p>
                </div>
                <Footer />
            </div>
        )
    }


    // Estado de Erro
    if (error) {
        return (
            // ... (Seu código de erro - já está usando as classes Tailwind/customizadas corretas) ...
            <div className="flex flex-col min-h-screen bg-gray-900 text-white">
                <Navadm />
                <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
                    {/* ... Conteúdo de Erro ... */}
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <>
            <Navadm />
            <main className="flex-grow-1 container px-4 py-5 py-lg-5">


                {/* Título da Seção */}
                <div className="text-center mb-5" data-aos="fade-down">
                    <h1 className="display-4 fw-bold text-warning mb-3">
                        Pedidos Pagos
                    </h1>
                    <p className="fs-5 text-white">
                        Gerencie os pedidos que já foram confirmados.
                    </p>
                </div>

                {pedidos.length > 0 ? (
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {pedidos.map(pedido => {
                            // --- LÓGICA DE MAP (NÃO MODIFICADA) ---
                            const usuarioDoPedido = usuarios.find(user => user.id === pedido.id_usuario);
                            const telefone = usuarioDoPedido
                                ? usuarioDoPedido.telefone
                                : (loadingUsuarios ? "Carregando..." : "Não encontrado");
                            // --- FIM DA LÓGICA ---

                            return (
                                <div key={pedido.id} className="col">
                                    {/* Card: bg-dark-subtle (um tom mais claro de dark), borda arredondada, sombra forte */}
                                    <div
                                        className="card text-white border-0 rounded-3 shadow-lg h-100"
                                        data-aos="fade-up"
                                        style={{ backgroundColor: "#503325" }}
                                    // Nota: Para transições complexas como hover:shadow-2xl e hover:-translate-y-1, você precisará de CSS customizado ou JS no Bootstrap.
                                    >
                                        <div className="card-body p-4">

                                            {/* ID Pedido */}
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <span className="small text-white">ID Pedido</span>
                                                <span className="fw-bold text-warning">#{pedido.id}</span>
                                            </div>

                                            {/* Nome do Pedido */}
                                            <h2 className="card-title fs-4 fw-bold mb-4 text-truncate mt-2" title={pedido.nome} style={{ color: "#FFD230" }}>
                                                {pedido.nome}
                                            </h2>

                                            {/* Status (Badge) */}
                                            <div className="mb-4">
                                                <p className="small text-white mb-1">Status</p>
                                                <span className="badge text-bg-warning text-dark text-uppercase rounded-pill fw-bold py-2 px-3">
                                                    {pedido.status}
                                                </span>
                                            </div>

                                            {/* Telefone Cliente */}
                                            <div className="mb-4">
                                                <p className="small text-white mb-1">Telefone Cliente</p>
                                                <p className="fs-5 fw-medium mb-0"
                                                    style={{ color: "#FFD230" }}>
                                                    {telefone}
                                                </p>
                                            </div>

                                            <hr className="text-secondary opacity-25" />

                                            {/* Botão */}
                                            <button
                                                className="btn btn-success btn-lg w-100 mt-4 d-flex align-items-center justify-content-center fw-bold rounded-3"
                                                onClick={() => pedidoPronto(pedido.id, "pronto")}
                                            >
                                                <i className="fa fa-check me-2"></i>
                                                Marcar como Pronto
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        <main />
                    </div>
                ) : (
                    <div className="text-center py-5" data-aos="fade-up" >
                        <svg className="mx-auto" style={{ height: '3rem', width: '3rem', color: '#FFD230' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="mt-2 fs-4 fw-medium text-white">
                            Nenhum pedido encontrado
                        </h3>
                        <p className="mt-1 text-alert">
                            Não há registros de pedidos pagos no momento.
                        </p>
                    </div >
                )
                }
            </main >

            <Footer />
        </>
    )
}

export default PedidosCrud;