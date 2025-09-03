import Navadm from '../Navadm';
import "../../App.css";
import Aos from 'aos';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MoveisCrud() {
    const navigate = useNavigate();
    const [registros, setRegistros] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModalExcluir, setShowModalExcluir] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [movelSelecionado, setMovelSelecionado] = useState(null);
    const [formData, setFormData] = useState({
        id: null,
        nome: '',
        valor: '',
        descricao: '',
        categoria_id: '',
        fotos: null
    });

    useEffect(() => {
        Aos.init({ duration: 500 });
        carregarMoveis();
        carregarCategorias();
    }, []);

    async function carregarMoveis() {
        try {
            const res = await fetch("http://localhost/tcc_baronesa/api/moveis");
            if (!res.ok) throw new Error("Erro ao carregar móveis");
            const data = await res.json();
            setRegistros(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function carregarCategorias() {
        try {
            const res = await fetch("http://localhost/tcc_baronesa/api/categorias");
            if (!res.ok) throw new Error("Erro ao carregar categorias");
            const data = await res.json();
            setCategorias(data);
        } catch (err) {
            console.error(err);
        }
    }

    async function deletarMovel(id) {
        try {
            const res = await fetch(`http://localhost/tcc_baronesa/api/moveis/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error("Erro ao excluir móvel");
            setRegistros(registros.filter(m => m.id !== id));
            setShowModalExcluir(false);
            setMovelSelecionado(null);
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }

    async function salvarMovel(e) {
        e.preventDefault();

        const url = formData.id
            ? `http://localhost/tcc_baronesa/api/moveis/${formData.id}`
            : "http://localhost/tcc_baronesa/api/moveis";
        const metodo = formData.id ? "POST" : "POST"; // sempre enviar via POST para FormData

        const form = new FormData();
        form.append("nome", formData.nome);
        form.append("valor", formData.valor);
        form.append("descricao", formData.descricao);
        form.append("categoria_id", formData.categoria_id);

        if (formData.fotos) {
            for (let i = 0; i < formData.fotos.length; i++) {
                form.append("fotos[]", formData.fotos[i]);
            }
        }

        try {
            const res = await fetch(url, {
                method: formData.id ? "PUT" : "POST",
                body: form
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Falha ao salvar móvel");
            }

            setShowModalEditar(false);
            setFormData({ id: null, nome: '', valor: '', descricao: '', categoria_id: '', fotos: null });
            carregarMoveis();
        } catch (err) {
            console.error("Falha ao salvar móvel", err);
            alert(err.message);
        }
    }

    function abrirModalEditar(movel) {
        setFormData({
            id: movel.id,
            nome: movel.nome,
            valor: movel.valor,
            descricao: movel.descricao,
            categoria_id: movel.categoria_id,
            fotos: null
        });
        setShowModalEditar(true);
    }

    if (loading) return <h3 className='mt-5' style={{ color: '#FFD230' }}>Carregando...</h3>;
    if (error) return <div><h3 className='mt-5' style={{ color: '#FFD230' }}>Ocorreu algum erro... <i className='fa-regular fa-face-dizzy' style={{ color: 'crimson' }}></i></h3><button className='btn btn-warning mt-4 col-5' onClick={() => navigate(-1)}>Voltar</button></div>;

    return (
        <>
            <Navadm />
            <div className='container mt-5'>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 style={{ color: '#FFD230' }}>Móveis</h2>
                    <button className='btn btn-warning' onClick={() => {
                        setFormData({ id: null, nome: '', valor: '', descricao: '', categoria_id: '', fotos: null });
                        setMovelSelecionado(null);
                        setShowModalEditar(true);
                    }}>
                        Adicionar Móvel
                    </button>
                </div>

                <div className="card p-4 table-responsive" data-aos="fade-up">
                    {registros.length > 0 ? (
                        <table className='table table-hover table-bordered border-dark table-align-middle table-responsive-cards'>
                            <thead className='table-warning'>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Valor</th>
                                    <th>Descrição</th>
                                    <th>Categoria</th>
                                    <th>Foto Principal</th>
                                    <th>Opções</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registros.map(m => (
                                    <tr key={m.id}>
                                        <td data-label="ID:">{m.id}</td>
                                        <td data-label="Nome:">{m.nome}</td>
                                        <td data-label="Valor:">R$ {m.valor},00</td>
                                        <td data-label="Descrição:">{m.descricao}</td>
                                        <td data-label="Categoria">{categorias.find(c => c.id === m.categoria_id)?.nome || '—'}</td>
                                        <td data-label="Foto:">
                                            {m.fotos?.length > 0 && (
                                                <img src={`http://localhost/tcc_baronesa/api/uploads/${m.fotos.find(f => f.principal)?.foto || m.fotos[0].foto}`} alt={m.nome} width="50" />
                                            )}
                                        </td>
                                        <td>
                                            <div className="d-flex flex-wrap justify-content-center gap-2">
                                                <button className='btn btn-warning'
                                                    onClick={() => { setMovelSelecionado(m.id); setShowModalExcluir(true); }}>
                                                    <i className='fa-trash fa-solid me-2'></i>Excluir
                                                </button>
                                                <button className='btn btn-warning' onClick={() => {
                                                    setMovelSelecionado(m.id);
                                                    abrirModalEditar(true);
                                                }}>
                                                    <i className='fa-pen fa-solid me-2'></i>Editar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : <p>Nenhum registro encontrado.</p>}
                </div>
            </div>

            {/* Modal Excluir */}
            {showModalExcluir && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content CorNavbar">
                            <div className="modal-header">
                                <h5 className="modal-title" style={{ color: '#FFD230' }}>Confirmar Exclusão</h5>
                                <button className="btn-close" onClick={() => setShowModalExcluir(false)}></button>
                            </div>
                            <div className="modal-body">
                                <h5 style={{ color: '#FFD230' }}>Deseja realmente excluir o móvel #{movelSelecionado}?</h5>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModalExcluir(false)}>Cancelar</button>
                                <button className="btn btn-warning" onClick={() => deletarMovel(movelSelecionado)}>Excluir</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModalExcluir && <div className="modal-backdrop fade show"></div>}

            {/* Modal Adicionar/Editar */}
            {showModalEditar && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content CorNavbar">
                            <div className="modal-header">
                                <h5 className="modal-title" style={{ color: '#FFD230' }}>{movelSelecionado ? "Editar Móvel" : "Adicionar Móvel"}</h5>
                                <button className="btn-close" onClick={() => setShowModalEditar(false)}></button>
                            </div>
                            <form onSubmit={salvarMovel}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label>Nome</label>
                                        <input type="text" className="form-control" value={formData.nome} onChange={e => setFormData({ ...formData, nome: e.target.value })} required />
                                    </div>
                                    <div className="mb-3">
                                        <label>Valor</label>
                                        <input type="number" className="form-control" value={formData.valor} onChange={e => setFormData({ ...formData, valor: e.target.value })} required />
                                    </div>
                                    <div className="mb-3">
                                        <label>Descrição</label>
                                        <textarea className="form-control" value={formData.descricao} onChange={e => setFormData({ ...formData, descricao: e.target.value })}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label>Categoria</label>
                                        <select className="form-select" value={formData.categoria_id} onChange={e => setFormData({ ...formData, categoria_id: e.target.value })} required>
                                            <option value="">Selecione</option>
                                            {categorias.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label>Fotos</label>
                                        <input type="file" className="form-control" multiple onChange={e => setFormData({ ...formData, fotos: e.target.files })} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModalEditar(false)}>Cancelar</button>
                                    <button type="submit" className="btn btn-warning">Salvar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {showModalEditar && <div className="modal-backdrop fade show"></div>}
        </>
    );
}
