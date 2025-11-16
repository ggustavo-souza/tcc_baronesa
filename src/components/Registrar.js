import React from "react";
import "../App.css";
import "../awesome/all.min.css";
import Navbar from './Navbar';
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FormRegistrar() {
    const navigate = useNavigate();
    useEffect(() => {
        Aos.init({ duration: 1000 });

    }, []);
    const [form, setForm] = useState({ nome: "", email: "", telefone: "", password: "" });
    const [alertMessage, setAlertMessage] = useState({ type: "", message: "" });
    const [showPolitica, setShowPolitica] = useState(false);
    const urlAPI = "https://tccbaronesapi.cloud"

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const closeAlert = () => {
        setAlertMessage({ type: "", message: "" });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setAlertMessage({ type: '', message: '' });

        const resposta = await fetch(`${urlAPI}/api/cadastro.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });
        console.log(resposta)
        const data = await resposta.json();
        console.log(data)

        if (data.mensagem) {
            setAlertMessage({ type: 'success', message: 'Registro realizado com sucesso!' });
            navigate("/login")
        } else {
            setAlertMessage({ type: 'danger', message: data.erro || "Erro no Registro" });
        }
    };

    return (
        <main>
            <Navbar />
            <div className="container">
                <div className="row justify-content-center mt-5 mb-5" data-aos="fade-up">
                    <div className="col-md-8 col-lg-6 col-xl-6 col-9 card p-4 p-md-5 shadow-lg rounded-4 login-card">
                        {alertMessage.message && (
                            <div className={`alert alert-${alertMessage.type} alert-dismissible fade show`} role="alert">
                                {alertMessage.message}
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={closeAlert}></button>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="form-login">
                            <h1 className="text-center corAmarela fw-bold mb-4">Registrar</h1>

                            <div className="form-group mb-3">
                                <label htmlFor="username" className="corAmarela mb-2">Nome de Usuário</label>
                                <input type="text" id="username" name="nome" className="form-control form-control-lg" required value={form.nome} onChange={handleChange}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="email" className="corAmarela mb-2">E-mail</label>
                                <input type="email" id="email" name="email" className="form-control form-control-lg" required value={form.email} onChange={handleChange} />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="telefone" className="corAmarela mb-2">Telefone</label>
                                <input maxLength="20" type="tel" id="telefone" name="telefone" className="form-control form-control-lg" required value={form.telefone} onChange={handleChange} onInput={(e) => {
                                    let value = e.target.value.replace(/\D/g, "");
                                    if (value.length > 11) value = value.slice(0, 11);
                                    if (value.length <= 10) {
                                        e.target.value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
                                    } else {
                                        e.target.value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
                                    }
                                }} />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="password" className="corAmarela mb-2">Senha</label>
                                <input type="password" id="password" name="password" className="form-control form-control-lg" required value={form.password} onChange={handleChange} />
                            </div>
                            <div class="form-check">
                                <input className="form-check-input mt-2" type="checkbox" value="" id="checkDefault" required />
                                <button className="btn" type="button" onClick={() => setShowPolitica(true)}>
                                    <p className="text-decoration-underline" style={{ color: "#FFD230" }}>
                                        Li e concordo com os Termos de Privacidade
                                    </p>
                                </button>

                            </div>

                            <div className="d-grid gap-2 mt-5">
                                <button type="submit" className="btn btn-warning btn-lg corBotao fw-bold rounded rounded-5">Registrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {showPolitica && (
                <>
                    <div className="modal" data-aos="fade-up" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content border-0 shadow-lg rounded-4">
                                <div className="modal-header border-0 pb-0">
                                    <h5 className="modal-title text-dark fw-bold">
                                        <i className="fa-solid fa-triangle-exclamation text-danger me-2"></i>
                                        Mensagem!
                                    </h5>
                                    <button type="button" className="btn-close" onClick={() => setShowPolitica(false)}></button>
                                </div>
                                <div className="modal-body py-4">
                                    <p className="mb-4">Leia nossos Termos de Privacidade</p>
                                    <p>Prezado(a) Usuário(a), A sua privacidade e a proteção dos seus dados pessoais são prioridades para o nosso projeto. Este Termo de Privacidade tem como objetivo descrever de forma clara e transparente como coletamos, utilizamos, armazenamos e protegemos as informações fornecidas por você.</p>

                                        <p>1. Dados Coletados e Finalidade
                                        Para a plena execução dos serviços e funcionalidades do projeto, coletamos os seguintes dados pessoais fornecidos diretamente por você:</p>

                                        <p>Nome Completo: Utilizado para identificação e personalização do seu acesso, garantindo que você seja o titular legítimo da conta/serviço.</p>

                                        <p>Número de Telefone: Essencial para comunicação, verificação de identidade (como autenticação de dois fatores, se aplicável) e para o envio de notificações importantes relacionadas ao serviço.</p>

                                        <p>CPF/CNPJ: Coletado estritamente para fins de identificação fiscal, cadastral, de segurança e, quando necessário, para cumprimento de obrigações legais e regulatórias (como emissão de notas fiscais, contratos, ou verificações antifraude).</p>

                                        <p>2. Tratamento e Proteção dos Dados</p>
                                        <p>Todos os dados pessoais mencionados acima são tratados com o mais alto nível de confidencialidade e segurança:</p>

                                        <p>Proteção: Empregamos medidas de segurança técnicas e administrativas rigorosas, como criptografia, firewalls e controles de acesso restrito, para proteger os seus dados contra acesso não autorizado, divulgação, alteração ou destruição.</p>

                                        <p>Armazenamento: Seus dados são armazenados em ambientes seguros, e somente serão mantidos pelo tempo estritamente necessário para cumprir as finalidades para as quais foram coletados, respeitando os prazos legais de retenção de dados.</p>

                                        <p>Acesso: O acesso aos seus dados é limitado apenas a colaboradores autorizados que necessitem deles para executar suas funções e que estão sujeitos a rigorosas obrigações de confidencialidade.</p>

                                        <p>Compartilhamento: Seus dados não serão vendidos, alugados ou cedidos a terceiros. O compartilhamento só ocorrerá em estrita observância das leis aplicáveis e, se necessário, apenas com parceiros essenciais para a prestação do serviço (por exemplo, gateways de pagamento ou serviços de verificação), ou mediante ordem judicial ou obrigação legal.</p>

                                        <p>Processamento de Pagamento (Mercado Pago): Os dados coletados na aba de pagamento (especificamente Nome Completo e CPF/CNPJ) são estritamente utilizados para a criação da transação via Mercado Pago. Informamos que, a partir do momento em que o usuário é redirecionado para o site do Mercado Pago para concluir o pagamento, a responsabilidade e a segurança dos dados (incluindo informações de cartão de crédito e dados bancários) passam a ser de total dever do Mercado Pago, que se rege por seus próprios termos de uso e políticas de privacidade.</p>

                                        <p>3. Direitos do Usuário</p>
                                        <p>Você, como titular dos dados, possui direitos garantidos por lei, como o direito de:</p>

                                        <p>Acessar os dados que possuímos sobre você.</p>

                                        <p>Solicitar a correção de dados incompletos, inexatos ou desatualizados.</p>

                                        <p>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a lei.</p>

                                        <p>Revogar o consentimento a qualquer momento, o que não afetará a legalidade do tratamento realizado antes da revogação.</p>

                                        <p>Ao utilizar nosso projeto, você concorda com os termos de coleta e tratamento de dados descritos acima. Estamos à disposição para esclarecer quaisquer dúvidas sobre como tratamos suas informações.</p>
                                </div>
                                <div className="modal-footer border-0 bg-light">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowPolitica(false)}>
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
        </main>
    );
}

export default FormRegistrar;