import Navadm from '../Navadm';
import { useState, useEffect } from 'react';
import Aos from 'aos';
import { useNavigate } from 'react-router-dom';

export default function MoveisCrud() {
    const navigate = useNavigate();
    const [registros, setRegistros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showModalDelete, setShowModalDelete] = useState(false);
    const [idSelecionado, setIdSelecionado] = useState(null);

    const [showModalEditar, setShowModalEditar] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        valor: '',
        descricao: '',
        categoria: '',
        fotos: null
    });

    useEffect(() => {
        Aos.init({ duration: 500 });
        carregarMoveis();
    }, []);

    async function carregarMoveis() {
        try {
            const response = await fetch("http://localhost/tcc_baronesa/api/moveis");
            if (!response.ok) throw new Error("Erro ao carregar móveis");
            const data = await response.json();
            setRegistros(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function deletarMovel(id) {
        try {
            await fetch(`http://localhost/tcc_baronesa/api/moveis/${id}`, {
                method: "DELETE",
            });
            setRegistros(registros.filter(r => r.id !== id));
            setShowModalDelete(false);
        } catch (err) {
            console.error(err);
        }
    }

    async function salvarMovel(e) {
        e.preventDefault();

        const url = formData.id 
            ? `http://localhost/tcc_baronesa/api/moveis/${formData.id}`
            : "http://localhost/tcc_baronesa/api/moveis";

        const metodo = formData.id ? "PUT" : "POST";
        const form = new FormData();
        form.append("nome", formData.nome);
        form.append("valor", formData.valor);
        form.append("descricao", formData.descricao);
        form.append("categoria", formData.categoria);

        if (formData.fotos) {
            for (let i = 0; i < formData.fotos.length; i++) {
                form.append("fotos[]", formData.fotos[i]);
            }
        }

        try {
            await fetch(url, {
                method: metodo,
                body: form
            });
            setShowModalEditar(false);
            carregarMoveis();
        } catch (err) {
            console.error(err);
        }
    }

    if (loading) {
        return <h3 className='mt-5' style={{ color: '#FFD230' }}>Carregando...</h3>
    }
    if (error) {
        return <div>
            <h3 className='mt-5' style={{ color: '#FFD230' }}>
                Ocorreu algum erro...   <i className='fa-regular fa-face-dizzy' style={{ color: 'crimson' }}></i>
            </h3>
            <button className='btn btn-warning mt-4 col-5 align-self-center' onClick={() => navigate(-1)}>Voltar</button>
        </div>
    }

    return (
        <>
            <Navadm />
            <div className='container mt-5'>
                <div className="card p-4 table-responsive" data-aos="fade-up">
                    {registros.length > 0 ? (
                        <table className='table table-hover table-bordered border-dark table-align-middle'>
                            <thead className='table-warning'>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Valor</th>
                                    <th>Descrição</th>
                                    <th>Categoria</th>
                                    <th>Opções</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registros.map(registro => (
                                    <tr key={registro.id}>
                                        <td>{registro.id}</td>
                                        <td>{registro.nome}</td>
                                        <td>R$ {registro.valor},00</td>
                                        <td>{registro.descricao}</td>
                                        <td>{registro.categoria}</td>
                                        <td>
                                            <button
                                                className='btn btn-warning me-2'
                                                onClick={() => {
                                                    setIdSelecionado(registro.id);
                                                    setShowModalDelete(true);
                                                }}
                                            >
                                                <i className='fa-trash fa-solid me-2'></i>Excluir
                                            </button>
                                            <button
                                                className='btn btn-warning'
                                                onClick={() => {
                                                    setFormData(registro);
                                                    setShowModalEditar(true);
                                                }}
                                            >
                                                <i className='fa-pen fa-solid me-2'></i>Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Nenhum registro encontrado.</p>
                    )}
                </div>
            </div>

            {/* Modal Excluir */}
            {showModalDelete && (
                <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content CorNavbar">
                            <div className="modal-header">
                                <h5 className="modal-title" style={{ color: '#FFD230' }}>Confirmar Exclusão</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModalDelete(false)}></button>
                            </div>
                            <div className="modal-body">
                                <h3 style={{ color: '#FFD230' }}>Tem certeza de que deseja excluir o registro #{idSelecionado}?</h3>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModalDelete(false)}>
                                    Cancelar
                                </button>
                                <button type="button" className="btn btn-warning" onClick={() => deletarMovel(idSelecionado)}>
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModalDelete && <div className="modal-backdrop fade show"></div>}

            {/* Modal Editar/Adicionar */}
            {showModalEditar && (
                <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content CorNavbar">
                            <div className="modal-header">
                                <h5 className="modal-title" style={{ color: '#FFD230' }}>
                                    {formData.id ? "Editar Móvel" : "Novo Móvel"}
                                </h5>
                                <button type="button" className="btn-close" onClick={() => setShowModalEditar(false)}></button>
                            </div>
                            <form onSubmit={salvarMovel}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Nome</label>
                                        <input type="text" className="form-control"
                                            value={formData.nome}
                                            onChange={e => setFormData({ ...formData, nome: e.target.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Valor</label>
                                        <input type="number" className="form-control"
                                            value={formData.valor}
                                            onChange={e => setFormData({ ...formData, valor: e.target.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Descrição</label>
                                        <textarea className="form-control"
                                            value={formData.descricao}
                                            onChange={e => setFormData({ ...formData, descricao: e.target.value })}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Categoria</label>
                                        <input type="text" className="form-control"
                                            value={formData.categoria}
                                            onChange={e => setFormData({ ...formData, categoria: e.target.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Fotos</label>
                                        <input type="file" className="form-control" multiple
                                            onChange={e => setFormData({ ...formData, fotos: e.target.files })} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModalEditar(false)}>
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn btn-warning">
                                        Salvar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {showModalEditar && <div className="modal-backdrop fade show"></div>}
        </>
    )
}
