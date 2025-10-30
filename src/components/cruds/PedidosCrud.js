import { useEffect, useState } from "react";
import Navadm from '../Navadm';
import Footer from "../Footer";
import Aos from "aos";
import '../../App.css';
import '../../awesome/all.min.css';


function PedidosCrud() {

    const urlAPI = "https://tccbaronesapi.cloud"
    const [pedidos, setPedidos] = useState([]);

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

    return (
        <>
            <Navadm />
                <div className="container">
                    {pedidos.length > 0 ? (
                        <div>
                            {pedidos.map(pedido => (
                                <p>{pedido.}</p>
                            ))}
                        </div>
                    ) : "Não foi encontrado registro"}
                </div>
            <Footer />
        </>
    )
}

export default PedidosCrud;