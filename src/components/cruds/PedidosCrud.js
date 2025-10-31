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

    useEffect(() => {
        Aos.init({ duration: 800, once: true });
        puxarPedidos();

    }, [])

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
            
            // Recarrega a lista de pedidos para remover o pedido que acabou de ser concluído
            puxarPedidos();

        } catch (error) {
            console.error("Erro ao processar o pedido:", error.message);
            setError("Erro ao marcar pedido como pronto: " + error.message);
        }
    }

    return (
        <>
            <Navadm />
            <div>
                <h1 className="mt-5" style={{ color: "#FFD230" }}>Pedidos Pagos</h1>
            </div>
            {pedidos.length > 0 ? (
                <div className="container mb-5 mt-5">
                    {pedidos.map(pedido => (
                        <div key={pedidos.id} className="card col-4 p-4">
                            <p>ID: {pedido.id}</p>
                            <p>Nome do produto: {pedido.nome}</p>
                            <p>Status: {pedido.status}</p>
                            <button className="btn btn-warning" onClick={() => pedidoPronto(pedido.id, "pronto")}>
                                <i className="fa fa-check me-2"></i>Pedido Pronto
                            </button>
                        </div>
                    ))}
                </div>
            ) : <p style={{color: "#ffffff"}}>Não foi encontrado registro</p>}
            <Footer />
        </>
    )
}

export default PedidosCrud;