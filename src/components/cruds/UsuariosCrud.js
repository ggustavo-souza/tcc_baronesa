import Navadm from '../Navadm';
import "../../App.css"
import Aos from 'aos';
import { useState, useEffect } from 'react';

export default function UsuariosCrud() {

    const [registros, setRegistros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        Aos.init({ duration: 500 })
        const url = "http://localhost/tcc_baronesa/api/usuarios"

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("deu erro");
                }
                return response.json();
            })
            .then(data => {
                setRegistros(data);
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false)
            });
    }, []);

    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

    function excluirUsuario(id) {
        fetch(`http://localhost/tcc_baronesa/api/usuarios/${id}`, {
            method: "DELETE",
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setRegistros(registros.filter(u => u.id !== id));
            setShowModal(false);
            setUsuarioSelecionado(null);
        })
        .catch(err => console.error(err));
    }

    if (loading) {
        return <p>Carregando...</p>
    }
    if (error) {
        return <p>Ocorreu algum erro...</p>
    }

    return (
        <>
            <Navadm />
            <div className='container mt-5'>
                <div className="card p-4 table-responsive " data-aos="fade-up">
                    {registros.length > 0 ? (
                        <table className='table table-hover table-bordered border-dark table-align-middle'>
                            <thead className='table-warning' >
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Cargo</th>
                                    <th scope='col'>Opções</th>
                                </tr>
                            </thead>
                            {registros.map(registro => (
                                <tbody>
                                    <tr key={registro.id}>
                                        <th scope="row">
                                            <td>{registro.id}</td>
                                        </th>
                                        <th scope="row">
                                            <td>{registro.nome}</td>
                                        </th>
                                        <th scope="row">
                                            <td>{registro.email}</td>
                                        </th>
                                        <th scope="row">
                                            <td>{registro.cargo}</td>
                                        </th>
                                        <th scope='row'>
                                            <button className='btn btn-warning me-2 col-10 col-sm-3' onClick={() => {
                                                setUsuarioSelecionado(registro.id);
                                                setShowModal(true);
                                            }}>
                                                <i className='fa-trash fa-solid me-2'></i>Excluir</button>
                                            <button className='btn btn-warning col-10 col-sm-3'><i className='fa-pen fa-solid me-2'></i>Editar</button>
                                        </th>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    ) : (
                        <p>Nenhum registro encontrado.</p>
                    )}
                </div>
            </div>
            {showModal && (
                <div className="modal" data-aos="fade-up" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered ">
                        <div className="modal-content CorNavbar">
                            <div className="modal-header">
                                <h5 className="modal-title" style={{ color: '#FFD230' }}>Confirmar Saída</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <h3 style={{ color: '#FFD230' }}>Tem certeza de que deseja excluir o registro?</h3>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancelar
                                </button>
                                <button type="button" className="btn btn-warning" onClick={() => excluirUsuario(usuarioSelecionado)}>
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModal && <div className="modal-backdrop fade show"></div>}
        </>
    )
}