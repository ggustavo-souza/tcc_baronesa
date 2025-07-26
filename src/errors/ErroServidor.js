import { Link } from 'react-router-dom';

function ErroServidor() {
    return (
        <main>
            <div className="container">
                <div className="p-3 card mt-5 justify-content-center" style={{ backgroundColor: '#503325c1', borderRadius: '10px' }}>
                    <h1 className="text-center mt-5" style={{color: '#FFD230'}}>Erro ao conectar com o servidor</h1>
                    <p className="text-center" style={{color: '#FFD230'}}>Por favor, tente novamente mais tarde.</p>

                    <Link to='/'><button className="btn btn-warning mt-3 corBotao col-6">Voltar</button></Link>                   
                </div>
            </div>
        </main>
    );
}

export default ErroServidor;