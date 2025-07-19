import "../../App.css";
import "../../awesome/all.min.css";
import Navbar from "../Navbar";

function HomeProdutos() {
    return (
        <main>
            <Navbar />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center" style={{ color: '#FFD230' }}>Produtos</h1>

                    </div>
                </div>

            </div>
        </main>
    );
}

export default HomeProdutos;