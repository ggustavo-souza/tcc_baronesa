import '../App.css';
import '../awesome/all.min.css';
import Navbar from './Navbar';
import Footer from './Footer';
import Aos from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react';
import { useAuthUser } from "./auths/useAuthUser";

function MeusPedidos() {
  useAuthUser();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    if (usuarioLogado) {
      carregarPedidos(usuarioLogado.id);
    } else {
      setLoading(false);
    }
    Aos.init({ duration: 850 });
  }, []);

  async function carregarPedidos(idUsuario) {
    if (!idUsuario) {
      alert("Você precisa estar logado para ver seus pedidos!");
      window.location.href = "/login";
      return;
    }

    try {
      const resposta = await fetch(`http://localhost/tcc_baronesa/api/pedidos/${idUsuario}`);
      const data = await resposta.json();
      setPedidos(data);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error.message);
    } finally {
      setLoading(false);
    }
  };

  async function pagarPedido(pedido) {
    try {
      const resposta = await fetch("http://localhost/tcc_baronesa/api/criar_preferencia.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_pedido: pedido.id,
          titulo: `Pedido #${pedido.id}`,
          valor: pedido.preco
        }),
      });

      const data = await resposta.json();

      if (!data.id) {
        alert("Erro ao criar preferência de pagamento.");
        return;
      }

      const script = document.createElement("script");
      script.src = "https://sdk.mercadopago.com/js/v2";
      script.onload = () => {
        const mp = new window.MercadoPago(data.public_key, { locale: "pt-BR" });

        mp.checkout({
          preference: { id: data.id },
          autoOpen: true
        });
      };
      document.body.appendChild(script);

    } catch (erro) {
      console.error("Erro:", erro);
      alert("Falha na conexão com o servidor.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5" data-aos="fade-up">
        <h1 className="text-center fw-bold mb-4" style={{ color: "#FFD230" }}>
          Meus Pedidos
        </h1>

        {loading ? (
          <p className="text-center text-light">Carregando pedidos...</p>
        ) : pedidos.length === 0 ? (
          <p className="text-center text-light mt-3">Nenhum pedido encontrado.</p>
        ) : (
          <div className="row justify-content-center">
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="col-md-4 mb-4">
                <div
                  className="p-3 text-light"
                  style={{
                    backgroundColor: "#503325c1",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                  }}
                  data-aos="fade-up"
                >
                  <h5 className="text-center fw-bold" style={{ color: "#FFD230" }}>
                    Pedido #{pedido.id}
                  </h5>
                  <hr style={{ borderColor: "#FFD230" }} />
                  <p><strong>Produto:</strong> {pedido.nome}</p>
                  <p><strong>Preço:</strong> R$ {pedido.preco}</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      style={{
                        color: pedido.status === "Pago" ? "#28a745" : "#FFD230",
                        fontWeight: "bold",
                      }}
                    >
                      {pedido.status}
                    </span>
                  </p>

                  {pedido.status !== "pago" && (
                    <button
                      className="btn btn-success w-100 mt-2"
                      onClick={() => pagarPedido(pedido)}
                    >
                      Pagar agora
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MeusPedidos;
