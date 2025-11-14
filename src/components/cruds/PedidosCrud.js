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
        }
    }

    async function puxarPedidos() {
        const url = `${urlAPI}/api/pedidos/pagos`
        try {
            const res = await fetch(url)
            if (!res.ok) {
                throw new Error(`Erro na API: ${res.status} - ${res.statusText}`);
            }

            const data = await res.json();

            console.log("Pedidos recebidos:", data);

            setPedidos(data);

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
             <div style={{ padding: '2rem', color: 'white', textAlign: 'center' }}>
                <Navadm />
                <h1 className="mt-5" style={{ color: "#FFD230" }}>Pedidos Pagos</h1>
                <p>Carregando usuários e pedidos...</p>
                <Footer />
            </div>
        )
    }

    return (
        <>
            <Navadm />
            <div>
                <h1 className="mt-5" style={{ color: "#FFD230" }}>Pedidos Pagos</h1>
            </div>
            {pedidos.length > 0 ? (
                <div className="container mb-5 mt-5">
                    {pedidos.map(pedido => {
                        const usuarioDoPedido = usuarios.find(user => user.id === pedido.id_usuario);

                        const telefone = usuarioDoPedido
                            ? usuarioDoPedido.telefone
                            : (loadingUsuarios ? "Carregando..." : "Não encontrado");
                        // --- FIM DA LÓGICA ---

                        return (
                            <div className="mt-4" key={pedido.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1.5rem', backgroundColor: '#f9f9f9', color: 'black' }}>
                                <p><strong>ID do Pedido:</strong> {pedido.id}</p>
                                <p><strong>Produto:</strong> {pedido.nome}</p>
                                <p><strong>Status:</strong> <span style={{ backgroundColor: '#FFD230', color: 'black', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>{pedido.status}</span></p>
                                <p><strong>Telefone Cliente:</strong> {telefone}</p>
                                <hr />
                                <button
                                    style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer' }}
                                    onClick={() => pedidoPronto(pedido.id, "pronto")}
                                >
                                    <i className="fa fa-check me-2"></i>Marcar como Pronto
                                </button>
                            </div>
                        )
})}
                </div>
            ) : <p style={{ color: "#ffffff" }}>Não foi encontrado registro</p>}
            <Footer />
        </>
    )
}

export default PedidosCrud;