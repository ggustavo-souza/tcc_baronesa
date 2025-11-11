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
  const urlAPI = "https://tccbaronesapi.cloud"
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false)
  const [mensagemModal, setMensagemModal] = useState({ message: "" })

  // --- Novos Estados para Pagamento ---
  const [usuarioLogado, setUsuarioLogado] = useState(null); // Guarda o objeto do usuário (com email)
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pedidoParaPagar, setPedidoParaPagar] = useState(null);
  const [cpfInput, setCpfInput] = useState('');
  const [nomeInput, setNomeInput] = useState('');
  // ------------------------------------

  useEffect(() => {
    // Preservando a lógica do usuário de usar localStorage para obter o usuário logado
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuario) {
      setUsuarioLogado(usuario); // Armazena o objeto do usuário, que contém o email e nome
      carregarPedidos(usuario.id);
    } else {
      setLoading(false);
    }
    Aos.init({ duration: 600, once: true });
  }, []);

  // Função utilitária para limpar e validar CPF/CNPJ
  function formatAndCleanCpf(value) {
    // Remove tudo que não for dígito
    return value.replace(/\D/g, '');
  }
  
  // Função para formatar como moeda BRL
  const formatCurrency = (value) => {
    if (value === undefined || value === null) return 'R$ 0,00';
    const num = parseFloat(value);
    if (isNaN(num)) return `R$ ${value}`; // Retorna o valor original se não for número (para evitar crash)
    
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(num);
  };


  async function carregarPedidos(idUsuario) {
    if (!idUsuario) {
      setMensagemModal({ message: "Você precisa estar logado para ver seus pedidos!" });
      setModal(true)
      return;
    }

    try {
      // Nota: Seu endpoint de pedidos deve ser ajustado para garantir que o campo 'preco' é numérico
      const resposta = await fetch(`${urlAPI}/api/pedidos/${idUsuario}`);
      const data = await resposta.json();
      // Ajuste para garantir que 'pedidos' seja um array
      setPedidos(Array.isArray(data) ? data : []); 
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // 1. O botão AGORA apenas guarda o pedido, verifica o e-mail e abre o modal de confirmação
  function pagarPedido(pedido) {
    if (!usuarioLogado || !usuarioLogado.email) {
      setMensagemModal({ message: "Erro: Não foi possível identificar seu e-mail de cadastro para o pagamento." });
      setModal(true);
      return;
    }

    const precoNumerico = parseFloat(pedido.preco);
    if (isNaN(precoNumerico)) {
      setMensagemModal({ message: "Erro: O preço do pedido não é um número válido." });
      setModal(true);
      return;
    }
    
    setPedidoParaPagar(pedido);
    setCpfInput('');
    // Pré-preenche o nome se disponível no objeto do usuário logado
    setNomeInput(usuarioLogado.nome || ''); 
    setShowPaymentModal(true);
  };
  
  // 2. Nova função para confirmar o pagamento (chamada pelo modal)
  async function handleConfirmPayment() {
    const cpfLimpo = formatAndCleanCpf(cpfInput);
    const nomeCompleto = nomeInput.trim();

    // Validação de dados (Client-side)
    if (cpfLimpo.length !== 11 && cpfLimpo.length !== 14) {
      setMensagemModal({ message: "Por favor, insira um CPF (11 dígitos) ou CNPJ (14 dígitos) válido." });
      setModal(true);
      return;
    }
    if (nomeCompleto.split(' ').length < 2 || nomeCompleto.length < 5) {
       setMensagemModal({ message: "Por favor, insira o Nome COMPLETO para o pagamento." });
      setModal(true);
      return;
    }
    
    // Coletar dados
    const pedido = pedidoParaPagar;
    const precoNumerico = parseFloat(pedido.preco);
    const emailCliente = usuarioLogado.email;
    
    setShowPaymentModal(false); 
    setLoading(true); // Exibe loading enquanto a API do MP processa

    try {
      // 3. Chamada da API com os dados completos do pagador
      const resposta = await fetch(`${urlAPI}/api/criar_preferencia.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_pedido: pedido.id,
          titulo: `Pedido #${pedido.id} - ${pedido.nome}`,
          valor: precoNumerico.toFixed(2),
          email_cliente: emailCliente, // Email recuperado do localStorage
          cpf_cliente: cpfLimpo, // CPF/CNPJ coletado no modal
          nome_completo: nomeCompleto // Nome completo coletado no modal
        }),
      });

      const data = await resposta.json();

      if (!data.id || !data.init_point) { 
        console.error("Erro na preferência:", data);
        // Exibe o erro retornado pelo PHP, que pode ser o erro do Mercado Pago
        setMensagemModal({ 
            message: data.message || "Erro ao criar preferência de pagamento. Verifique os detalhes no console." 
        });
        setModal(true);
        setLoading(false);
        return;
      }
      
      // Sucesso: Redirecionar para o Checkout Pro
      window.location.href = data.init_point;

    } catch (erro) {
      console.error("Erro:", erro);
      setMensagemModal({ message: "Falha na conexão com o servidor ou erro inesperado." });
      setModal(true);
      setLoading(false);
    }
  };


  return (
    <div>
      <Navbar />
      <div className="container py-5" style={{ minHeight: '80vh' }}>
        <h1 className="text-center fw-bolder mb-5 display-4" style={{ color: "#FFD230" }}>
          <i className="fa-solid fa-list-check me-3"></i>
          Meus Pedidos
        </h1>

        {loading ? (
          <div className="text-center text-light mt-5">
            {/* Spinner de carregamento do Bootstrap */}
            <div 
              className="spinner-border" 
              role="status" 
              style={{ color: "#FFD230", width: '3rem', height: '3rem', borderWidth: '0.4em' }}
            >
              <span className="visually-hidden">Carregando pedidos...</span>
            </div>
            <p className="mt-3 fs-5">Carregando pedidos...</p>
          </div>
        ) : pedidos.length === 0 ? (
          <div 
            className="text-center text-light mt-5 p-5 rounded-4 mx-auto" 
            style={{ 
              maxWidth: '600px', 
              backgroundColor: "#503325",
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
              border: `1px solid ${"#FFD230"}`
            }}
          >
            <i className="fa-solid fa-box-open fa-3x mb-3" style={{ color: "#FFD230" }}></i>
            <p className="fs-5 fw-light mb-0">Nenhum pedido encontrado. Faça seu primeiro pedido!</p>
          </div>
        ) : (
          <div className="row justify-content-center g-4 mt-4">
            {pedidos.map((pedido) => {
              const statusLower = pedido.status ? pedido.status.toLowerCase() : '';
              
              let statusColor = "#FFD230";
              let statusTextColor = '#212529'; // Texto escuro no amarelo
              if (statusLower === 'pago') {
                  statusColor = "#3cff00ff";
                  statusTextColor = '#fff';
              } else if (statusLower === 'pronto') {
                  statusColor = "#005a32ff";
                  statusTextColor = '#fff';
              }

              return (
                <div key={pedido.id} className="col-lg-4 col-md-6 col-sm-12" data-aos="fade-up">
                  <div
                    className="card h-100 p-4 text-light border-0 shadow-lg" 
                    style={{
                      backgroundColor: "#503325",
                      borderRadius: "15px",
                      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                      cursor: 'default',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.5)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
                    }}
                  >
                    <h5 className="card-title text-center fw-bold mb-3" style={{ color: "#FFD230" }}>
                      <i className="fa-solid fa-receipt me-2"></i>
                      Pedido #{pedido.id}
                    </h5>
                    <hr style={{ borderColor: "#FFD230", opacity: 0.8, marginTop: '0.5rem', marginBottom: '1.5rem' }} />
                    
                    {/* Detalhes do Pedido com Flexbox Bootstrap */}
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-semibold" style={{ color: "#FFD230" }}>
                          <i className="fa-solid fa-chair me-2"></i>
                          Produto:
                        </span> 
                        <span className="ms-2 text-end">{pedido.nome}</span>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-semibold" style={{ color: "#FFD230" }}>
                          <i className="fa-solid fa-money-bill-wave me-2"></i>
                          Preço:
                        </span>
                        <span className="ms-2 fw-bold text-end" style={{ color: "#FFD230" }}>
                          {formatCurrency(pedido.preco)}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-0">
                        <span className="fw-semibold" style={{ color: "#FFD230" }}>
                          <i className="fa-solid fa-info-circle me-2"></i>
                          Status:
                        </span>
                        {/* Uso de badge do Bootstrap com cores inline dinâmicas */}
                        <span
                          className="badge text-uppercase p-2 rounded-pill fw-bold"
                          style={{
                            fontSize: '0.85rem',
                            backgroundColor: statusColor,
                            color: statusTextColor,
                            minWidth: '100px',
                            textAlign: 'center'
                          }}
                        >
                          {pedido.status}
                        </span>
                      </div>
                    </div>

                    {/* Botão de Pagamento */}
                    {statusLower !== "pago" && statusLower !== "pronto" && ( 
                      <button
                        className="btn w-100 mt-auto fw-bold btn-lg" 
                        style={{ 
                            backgroundColor: "#005a32ff", 
                            borderColor: "#005a32ff",
                            color: 'white',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                        }}
                        onClick={() => pagarPedido(pedido)}
                      >
                        <i className="fa-brands fa-mercadopago me-2"></i>
                        Pagar Agora
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
      
      {/* ------------------------------------- */}
      {/* MODAL DE CONFIRMAÇÃO DE PAGAMENTO (CPF) */}
      {/* ------------------------------------- */}
      {showPaymentModal && pedidoParaPagar && (
        <>
          <div className="modal" data-aos="fade-up" style={{ display: 'block', zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg rounded-4">
                <div className="modal-header border-0 pb-0 bg-light rounded-top-4">
                  <h5 className="modal-title text-dark fw-bold">
                    <i className="fa-solid fa-lock me-2 text-danger"></i>
                    Confirmação de Pagamento
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowPaymentModal(false)}></button>
                </div>
                <div className="modal-body py-4 bg-white">
                    <p className="mb-3 text-dark">
                        Para prosseguir com o pagamento de <bold>{formatCurrency(pedidoParaPagar.preco)}</bold> via Mercado Pago (incluindo Pix), precisamos do seu documento de identificação.
                    </p>
                    <div className="mb-3">
                        <label htmlFor="nomeCompletoInput" className="form-label fw-bold text-dark">Nome Completo:</label>
                        <input
                            type="text"
                            id="nomeCompletoInput"
                            className="form-control"
                            value={nomeInput}
                            onChange={(e) => setNomeInput(e.target.value)}
                            placeholder="Seu nome e sobrenome"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpfCnpjInput" className="form-label fw-bold text-dark">CPF ou CNPJ:</label>
                        <input
                            type="text"
                            id="cpfCnpjInput"
                            className="form-control"
                            value={cpfInput}
                            onChange={(e) => setCpfInput(e.target.value)}
                            placeholder="Apenas números (Ex: 12345678901)"
                            required
                        />
                        <small className="text-muted">Necessário para emissão do Pix/Boleto.</small>
                    </div>
                    {usuarioLogado && (
                        <div className="alert alert-info py-2" role="alert">
                            <i className="fa-solid fa-envelope me-2"></i>
                            E-mail de cobrança: <bold>{usuarioLogado.email}</bold>
                        </div>
                    )}
                </div>
                <div className="modal-footer border-0 bg-light rounded-bottom-4">
                  <button 
                    type="button" 
                    className="btn btn-secondary fw-bold" 
                    onClick={() => setShowPaymentModal(false)}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="button" 
                    className="btn fw-bold text-white" 
                    style={{ backgroundColor: "#005a32ff" }}
                    onClick={handleConfirmPayment}
                    disabled={!cpfInput || !nomeInput}
                  >
                    <i className="fa-solid fa-money-check-dollar me-2"></i>
                    Confirmar Pagamento
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>
        </>
      )}

      {/* ------------------------------------- */}
      {/* MODAL DE ERRO/MENSAGEM GERAL (Original) */}
      {/* ------------------------------------- */}
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
                    <i className="fa-solid"></i>
                    Voltar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
}

export default MeusPedidos;