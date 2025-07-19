import "../App.css";
import "../awesome/all.min.css";
import Navbar from "./Navbar"; 
import Footer from "./Footer";

function HomeOrcamento() {
    return (
        <main>
            <Navbar />
            <div className="container mt-5">
                <div>
                    <div className="card text-center CardOrcamento mb-5">
                        <h1 className="mt-5" style={{ color: '#FFD230' }}>Faça já seu orçamento!</h1>
                        <div className="card-body">
                            <p className="card-text h5 mt-2 mb-5" style={{ color: '#fff' }}>
                                Preencha o formulário abaixo e solicite um orçamento personalizado para o seu projeto!
                            </p>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nome</label>
                                    <input type="text" className="form-control" id="name" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Mensagem</label>
                                    <textarea className="form-control" id="message" rows="3" required></textarea>
                                </div>
                                <button type="submit" className="btn btn-warning mt-3 corBotao">Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default HomeOrcamento;