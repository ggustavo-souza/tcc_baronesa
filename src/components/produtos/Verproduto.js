import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navadm from '../Navadm';
import "../../App.css";
import Aos from 'aos';

export default function VerMovel() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movel, setMovel] = useState(null);
    const [categoria, setCategoria] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imagemPrincipal, setImagemPrincipal] = useState('');

    useEffect(() => {
        Aos.init({ duration: 500 });
        carregarMovel();
    }, []);

    async function carregarMovel() {
        try {
            const res = await fetch(`http://localhost/tcc_baronesa/api/moveis/${id}`);
            if (!res.ok) throw new Error('Erro ao carregar móvel');
            const data = await res.json();
            setMovel(data);
            if (data.fotos?.length > 0) {
                const principal = data.fotos.find(f => f.principal) || data.fotos[0];
                setImagemPrincipal(principal.foto);
            }
            if (data.categoria_id) {
                const resCat = await fetch(`http://localhost/tcc_baronesa/api/categorias/${data.categoria_id}`);
                if (resCat.ok) {
                    const catData = await resCat.json();
                    setCategoria(catData.nome);
                }
            }
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <h3 className='mt-5' style={{ color: '#FFD230' }}>Carregando...</h3>;
    if (error) return <div className="container mt-5">
        <h3 style={{ color: '#FFD230' }}>Ocorreu algum erro: {error}</h3>
        <button className='btn btn-warning mt-3' onClick={() => navigate(-1)}>← Voltar</button>
    </div>;
    if (!movel) return null;

    return (
        <>
            <Navadm />
            <div className="container my-5" data-aos="fade-up">
                {/* Botão voltar fora do card */}
                <div className="mb-3">
                    <button 
                        className='btn btn-warning corBotao' 
                        onClick={() => navigate(-1)}
                    >
                        ← Voltar
                    </button>
                </div>

                <div className="card shadow-sm mx-auto" style={{ maxWidth: '900px', borderRadius: '12px', backgroundColor: '#503325c1', color: '#FFD230', padding: '20px' }}>
                    <div className="row">
                        <div className="col-md-6">
                            {imagemPrincipal && (
                                <img 
                                    src={`http://localhost/tcc_baronesa/api/uploads/${imagemPrincipal}`} 
                                    alt={movel.nome} 
                                    className="img-fluid rounded mb-3" 
                                    style={{ objectFit: 'cover', width: '100%', height: '400px' }}
                                />
                            )}
                            <div className="d-flex flex-wrap gap-2 justify-content-center">
                                {movel.fotos?.map(f => (
                                    <img 
                                        key={f.id}
                                        src={`http://localhost/tcc_baronesa/api/uploads/${f.foto}`} 
                                        alt="miniatura" 
                                        width="80" 
                                        height="80" 
                                        className={`rounded border ${f.foto === imagemPrincipal ? 'border-warning' : 'border-light'}`} 
                                        style={{ cursor: 'pointer', objectFit: 'cover', transition: '0.3s', filter: f.foto === imagemPrincipal ? 'brightness(1.1)' : 'brightness(0.9)' }}
                                        onClick={() => setImagemPrincipal(f.foto)}
                                        onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.2)'}
                                        onMouseLeave={e => e.currentTarget.style.filter = f.foto === imagemPrincipal ? 'brightness(1.1)' : 'brightness(0.9)'}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="col-md-6 mt-4 mt-md-0 d-flex flex-column justify-content-center">
                            <h2>{movel.nome}</h2>
                            <h4>R$ {movel.valor},00</h4>
                            <p><strong>Categoria:</strong> {categoria || '—'}</p>
                            <p><strong>Descrição:</strong> {movel.descricao}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
