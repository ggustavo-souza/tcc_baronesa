import Navadm from '../Navadm';
import "../../App.css";
import Aos from 'aos';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminOrcamentos() {

    const [registros, setRegistros] = useState([])
    const [usuarios, setUsuarios] = useState([])
    const [categorias, setCategorias] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showModalExcluir, setShowModalExcluir] = useState(false);
    const [orcamentoSelecionado, setOrcamentoSelecionado] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        Aos.init({ duration: 1000, once: true })
        fetchOrcamentos()
        fetchUsuarios()
        fetchCategorias()

    }, [])

    async function fetchOrcamentos() {
        const url = 'http://localhost/tcc_baronesa/api/orcamentos'
        await fetch(url)
            .then(res => {
                if (!res.ok) throw new Error("Erro ao carregar orçamentos")
                return res.json()
            })
            .then(data => setRegistros(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }

    async function fetchUsuarios() {
        try {
            const res = await fetch("http://localhost/tcc_baronesa/api/usuarios");
            if (!res.ok) throw new Error("Erro ao carregar usuários");
            const data = await res.json();
            setUsuarios(data);
        } catch (err) {
            console.error(err);
        }
    }

    async function fetchCategorias() {
        try {
            const res = await fetch("http://localhost/tcc_baronesa/api/categorias");
            if (!res.ok) throw new Error("Erro ao carregar categorias");
            const data = await res.json();
            setCategorias(data);
        } catch (err) {
            console.error(err);
        }
    }

    function excluirOrcamento(id) {
        fetch(`http://localhost/tcc_baronesa/api/orcamentos/${id}`, { method: "DELETE" })
            .then(res => res.json())
            .then(() => {
                setRegistros(registros.filter(u => u.id !== id));
                setShowModalExcluir(false);
                setOrcamentoSelecionado(null);
            })
            .catch(err => console.error(err));
    }

    if (loading) return <h3 className='mt-5' style={{ color: '#FFD230' }}>Carregando...</h3>;
    if (error) return <div><h3 className='mt-5' style={{ color: '#FFD230' }}>Ocorreu algum erro... <i className='fa-regular fa-face-dizzy' style={{ color: 'crimson' }}></i></h3><button className='btn btn-warning mt-4 col-5' onClick={() => navigate(-1)}>Voltar</button></div>;

    return (
        <>
            <Navadm />
            <div className='mt-4'>
                <h1 style={{ color: "#FFD230" }}>Orçamentos</h1>
            </div>
            <div className='container'>
                <div
                    className="card text-center p-4 shadow mt-5 mb-5"
                    data-aos="fade-up"
                    style={{
                        backgroundColor: '#503325c1',
                        color: "#FFD230",
                        borderRadius: "15px",
                        cursor: "pointer",
                        transition: "transform 0.3s",
                    }}
                // OnClick
                >
                    {registros.length > 0 ? (
                        <div>
                            {registros.map(registro => (
                                <div className='card p-3 m-5' style={{
                                    backgroundColor: '#503325', borderRadius: "15px",
                                    cursor: "pointer",
                                    transition: "transform 0.3s",
                                }} onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                                    <div key={registro.id}>
                                        <h3 style={{ color: '#FFD230' }} data-label="ID:"><strong>Id:</strong> <i>{registro.id}</i></h3>
                                        <h3 style={{ color: '#FFD230' }} data-label="usuario:"><strong>Usuário:</strong> <i>{usuarios.find(u => u.id === registro.id_usuario)?.nome || '—'}</i></h3>
                                        <h3 style={{ color: '#FFD230' }} data-label="categoria"><strong>Categoria:</strong> <i>{categorias.find(u => u.id === registro.id_categoria)?.nome || '—'}</i></h3>
                                        <h3 style={{ color: '#FFD230' }} data-label="mensagem:"><strong>Descrição:</strong> <i>{registro.mensagem}</i></h3>
                                        <h3 style={{ color: '#FFD230' }} data-label="situacao:">
                                            <strong>Situação: </strong>
                                            <i style={{ color: '#fff' }}>
                                                {registro.aprovacao === 'naoLido' ? 'Pendente' : 'Aprovado'}
                                            </i>
                                        </h3>
                                        <div>
                                            <button className="btn btn-warning m-3">Aprovar</button>
                                            <button className="btn btn-danger m-3" onClick={() => {
                                                setShowModalExcluir(true);
                                                setOrcamentoSelecionado(registro.id);
                                            }}>Excluir</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : <p>Nenhum registro encontrado.</p>}
                </div >
            </div >
            {/* modal excluir */ }
            {showModalExcluir && (
                <div className="modal" data-aos="fade-up" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content CorNavbar">
                            <div className="modal-header">
                                <h5 className="modal-title" style={{ color: '#FFD230' }}>Confirmar Exclusão</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModalExcluir(false)}></button>
                            </div>
                            <div className="modal-body">
                                <h3 style={{ color: '#FFD230' }}>Tem certeza que deseja excluir este orçamento?</h3>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModalExcluir(false)}>Cancelar</button>
                                <button className="btn btn-warning" onClick={() => excluirOrcamento(orcamentoSelecionado)}>Excluir</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModalExcluir && <div className="modal-backdrop fade show"></div>}
        </>
    )
}