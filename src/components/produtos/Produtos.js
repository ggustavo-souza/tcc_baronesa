import "../../App.css";
import "../../awesome/all.min.css";
import Navbar from "../Navbar";

function HomeProdutos() {
    return (
        <main>
            <Navbar />
            <div className="container mt-5">
                <div className="col-12">
                    <h1 className="text-center fw-bold" style={{ color: '#FFD230' }}>Produtos</h1>
                </div>
                <div className="grid" style={{ backgroundColor: '#503325c1', borderRadius: '10px' }}>
                    <div className="row mt-4">
                        <div className="col-md-4">
                            <div className="card p-3 m-2" style={{ backgroundColor: '#503325c1', borderRadius: '10px' }}>
                                <h2 className="text-center" style={{ color: '#FFD230' }}>Produto 1</h2>
                                <div className="card-img-top">
                                    <img src="https://via.placeholder.com/150" alt="Produto 1" className="img-fluid" /> 
                                </div>
                                <p className="text-center" style={{ color: '#FFD230' }}>Descrição do Produto 1</p>
                                <button className="btn btn-warning corBotao w-100">Ver mais</button>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card p-3 m-2" style={{ backgroundColor: '#503325c1', borderRadius: '10px' }}>
                                <h2 className="text-center" style={{ color: '#FFD230' }}>Produto 2</h2>
                                <div className="card-img-top">
                                    <img src="https://via.placeholder.com/150" alt="Produto 1" className="img-fluid" /> 
                                </div>
                                <p className="text-center" style={{ color: '#FFD230' }}>Descrição do Produto 2</p>
                                <button className="btn btn-warning corBotao w-100">Ver mais</button>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card p-3 m-2" style={{ backgroundColor: '#503325c1', borderRadius: '10px' }}>
                                <h2 className="text-center" style={{ color: '#FFD230' }}>Produto 3</h2>
                                <div className="card-img-top">
                                    <img src="https://via.placeholder.com/150" alt="Produto 1" className="img-fluid" /> 
                                </div>
                                <p className="text-center" style={{ color: '#FFD230' }}>Descrição do Produto 3</p>
                                <button className="btn btn-warning corBotao w-100">Ver mais</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default HomeProdutos;