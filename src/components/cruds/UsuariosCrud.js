import Navadm from '../Navadm';
import "../../App.css";
import Aos from 'aos';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UsuariosCrud() {
    const navigate = useNavigate();
    const [registros, setRegistros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModalExcluir, setShowModalExcluir] = useState(false);
    const [showModalNovo, setShowModalNovo] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [novoUsuario, setNovoUsuario] = useState({ nome: '', email: '', senha: '', cargo: '' });
    const [mostrarSenhaEditar, setMostrarSenhaEditar] = useState(false);

    useEffect(() => {
        Aos.init({ duration: 500 });
        fetchUsuarios();
    }, []);

    function fetchUsuarios() {
        const url = "http://localhost/tcc_baronesa/api/usuarios";
        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error("Erro ao carregar usuários");
                return res.json();
            })
            .then(data => setRegistros(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }

    function excluirUsuario(id) {
        fetch(`http://localhost/tcc_baronesa/api/usuarios/${id}`, { method: "DELETE" })
            .then(res => res.json())
            .then(() => {
                setRegistros(registros.filter(u => u.id !== id));
                setShowModalExcluir(false);
                setUsuarioSelecionado(null);
            })
            .catch(err => console.error(err));
    }

    function adicionarUsuario() {
        fetch("http://localhost/tcc_baronesa/api/usuarios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoUsuario)
        })
            .then(res => res.json())
            .then(data => {
                setRegistros([...registros, { ...novoUsuario, id: data.id }]);
                setNovoUsuario({ nome: '', email: '', senha: '', cargo: '' });
                setShowModalNovo(false);
            })
            .catch(err => console.error(err));
    }

    function atualizarUsuario(id) {
        const dados = {
            nome: usuarioSelecionado.nome,
            email: usuarioSelecionado.email,
            cargo: usuarioSelecionado.cargo
        };

        // Só envia a senha se o admin digitou algo
        if (usuarioSelecionado.senha && usuarioSelecionado.senha.trim() !== '') {
            dados.senha = usuarioSelecionado.senha;
        }

        console.log(dados);

        fetch(`http://localhost/tcc_baronesa/api/usuarios/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setRegistros(registros.map(u => u.id === id ? { ...u, ...usuarioSelecionado, senha: undefined } : u));
                setShowModalEditar(false);
                setUsuarioSelecionado(null);
                setMostrarSenhaEditar(false);
            })
            .catch(err => console.error(err));
    }

    if (loading) return <h3 className='mt-5' style={{ color: '#FFD230' }}>Carregando...</h3>;
    if (error) return <div><h3 className='mt-5' style={{ color: '#FFD230' }}>Ocorreu algum erro...   <i className='fa-regular fa-face-dizzy' style={{ color: 'crimson' }}></i></h3>      <button className='btn btn-warning mt-4 col-5 align-self-center' onClick={() => navigate(-1)}>Voltar</button></div>

    return (
        <>
            <Navadm />
            <div className='container mt-5'>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 style={{ color: '#FFD230' }}>Usuários</h2>
                    <button className='btn btn-warning' onClick={() => setShowModalNovo(true)}>Adicionar Usuário</button>
                </div>
                <div className="card p-4 table-responsive" data-aos="fade-up">
                    {registros.length > 0 ? (
                        <table className='table table-hover table-bordered border-dark table-align-middle table-responsive-cards'>
                            <thead className='table-warning'>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Cargo</th>
                                    <th>Opções</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registros.map(registro => (
                                    <tr key={registro.id}>
                                        <td data-label="ID:">{registro.id}</td>
                                        <td data-label="Nome:">{registro.nome}</td>
                                        <td data-label="Email:">{registro.email}</td>
                                        <td data-label="Cargo:">{registro.cargo}</td>
                                        <td data-label="Opções:">
                                            <div className="d-flex flex-wrap justify-content-center gap-2">
                                                <button className='btn btn-warning'
                                                    onClick={() => { setUsuarioSelecionado(registro.id); setShowModalExcluir(true); }}>
                                                    <i className='fa-trash fa-solid me-2'></i>Excluir
                                                </button>
                                                <button className='btn btn-warning' onClick={() => {
                                                    setUsuarioSelecionado({ ...registro, senha: '' });
                                                    setShowModalEditar(true);
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


            {/* Modal de Exclusão */}
            {showModalExcluir && (
                <div className="modal" data-aos="fade-up" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content CorNavbar">
                            <div className="modal-header">
                                <h5 className="modal-title" style={{ color: '#FFD230' }}>Confirmar Exclusão</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModalExcluir(false)}></button>
                            </div>
                            <div className="modal-body">
                                <h3 style={{ color: '#FFD230' }}>Tem certeza que deseja excluir este usuário?</h3>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModalExcluir(false)}>Cancelar</button>
                                <button className="btn btn-warning" onClick={() => excluirUsuario(usuarioSelecionado)}>Excluir</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModalExcluir && <div className="modal-backdrop fade show"></div>}

            {/* Modal de Novo Usuário */}
            {showModalNovo && (
                <div className="modal" data-aos="fade-up" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content CorNavbar">
                            <div className="modal-header">
                                <h5 className="modal-title" style={{ color: '#FFD230' }}>Adicionar Usuário</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModalNovo(false)}></button>
                            </div>
                            <div className="modal-body">
                                <input type="text" className="form-control mb-2" placeholder="Nome"
                                    value={novoUsuario.nome} onChange={e => setNovoUsuario({ ...novoUsuario, nome: e.target.value })} />
                                <input type="email" className="form-control mb-2" placeholder="Email"
                                    value={novoUsuario.email} onChange={e => setNovoUsuario({ ...novoUsuario, email: e.target.value })} />
                                <select className="form-select mb-2"
                                    value={novoUsuario.cargo}
                                    onChange={e => setNovoUsuario({ ...novoUsuario, cargo: e.target.value })}>
                                    <option value="">Selecione o cargo</option>
                                    <option value="admin">Admin</option>
                                    <option value="usuario">Usuário</option>
                                </select>
                                <input type="password" className="form-control mb-2" placeholder="Senha"
                                    value={novoUsuario.senha} onChange={e => setNovoUsuario({ ...novoUsuario, senha: e.target.value })} />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModalNovo(false)}>Cancelar</button>
                                <button className="btn btn-warning" onClick={adicionarUsuario}>Adicionar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModalNovo && <div className="modal-backdrop fade show"></div>}

            {/* Modal de Edição */}
            {showModalEditar && usuarioSelecionado && (
                <div className="modal" data-aos="fade-up" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content CorNavbar">
                            <div className="modal-header">
                                <h5 className="modal-title" style={{ color: '#FFD230' }}>Editar Usuário</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModalEditar(false)}></button>
                            </div>
                            <div className="modal-body">
                                <input type="text" className="form-control mb-2" placeholder="Nome"
                                    value={usuarioSelecionado.nome}
                                    onChange={e => setUsuarioSelecionado({ ...usuarioSelecionado, nome: e.target.value })} />
                                <input type="email" className="form-control mb-2" placeholder="Email"
                                    value={usuarioSelecionado.email}
                                    onChange={e => setUsuarioSelecionado({ ...usuarioSelecionado, email: e.target.value })} />
                                <select className="form-select mb-2"
                                    value={usuarioSelecionado.cargo}
                                    onChange={e => setUsuarioSelecionado({ ...usuarioSelecionado, cargo: e.target.value })}>
                                    <option value="">Selecione o cargo</option>
                                    <option value="admin">Admin</option>
                                    <option value="usuario">Usuário</option>
                                </select>

                                <div className="input-group mb-2">
                                    <input type={mostrarSenhaEditar ? "text" : "password"} className="form-control" placeholder="Nova senha (opcional)"
                                        value={usuarioSelecionado.senha || ''}
                                        onChange={e => setUsuarioSelecionado({ ...usuarioSelecionado, senha: e.target.value })} />
                                    <button className="btn btn-outline-secondary" type="button"
                                        onClick={() => setMostrarSenhaEditar(!mostrarSenhaEditar)}>
                                        <i className={`fa ${mostrarSenhaEditar ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                    </button>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModalEditar(false)}>Cancelar</button>
                                <button className="btn btn-warning" onClick={() => atualizarUsuario(usuarioSelecionado.id)}>
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModalEditar && <div className="modal-backdrop fade show"></div>}
        </>
    )
}
