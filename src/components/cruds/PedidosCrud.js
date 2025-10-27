import { useEffect, useState } from "react";
import Navadm from '../Navadm';
import Footer from "../Footer";
import '../../App.css';
import '../../awesome/all.min.css';


function PedidosCrud() {

    const urlAPI = "https://tccbaronesapi.cloud"
    const [pedidos, setPedidos] = useState([]);

    return (
        <>
            <Navadm />
        </>
    )
}

export default PedidosCrud;