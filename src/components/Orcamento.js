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
                        
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default HomeOrcamento;