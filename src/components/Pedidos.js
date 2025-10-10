import '../App.css';
import '../awesome/all.min.css';
import Navbar from './Navbar';
import Footer from './Footer';
import Aos from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react';

function MeusPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    Aos.init({ duration: 850 });
    carregarPedidos();
  }, []);

  const carregarPedidos = async () => {
    const idUsuario = localStorage.getItem("idUsuario");
    if (!idUsuario) {
      alert("Você precisa estar logado para ver seus pedidos!");
      window.location.href = "/login";
      return;
    }

    try {
      const resposta = await fetch(`http://localhost/api/meus_pedidos.php?usuario_id=${idUsuario}`);
      const data = await resposta.json();
      setPedidos(data);
    } catch (erro) {
      console.error("Erro ao carregar pedidos:", erro);
    } finally {
      setCarregando(false);
    }
  };

  const pagarPedido = async (idPedido) => {
    try {
      const resposta = await fetch("http://localhost/api/pagar_pedido.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: idPedido }),
      });
      const data = await resposta.json();

      if (data.sucesso) {
        alert("Pagamento realizado com sucesso!");
        setPedidos((p) =>
          p.map((pedido) =>
            pedido.id === idPedido ? { ...pedido, status: "Pago" } : pedido
          )
        );
      } else {
        alert("Erro ao processar pagamento.");
      }
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

        {carregando ? (
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

                  {pedido.status !== "Pago" && (
                    <button
                      className="btn btn-success w-100 mt-2"
                      onClick={() => pagarPedido(pedido.id)}
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
