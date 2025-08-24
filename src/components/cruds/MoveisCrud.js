import Navadm from '../Navadm';
import { useState, useEffect } from 'react';
import Aos from 'aos';

export default function MoveisCrud() {

    const [registros, setRegistros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        Aos.init({ duration: 500 })
        const url = "http://localhost/tcc_baronesa/api/moveis"

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

    if (loading) {
        return <p>Carregando...</p>
    }
    if (error) {
        return <p>Ocorreu algum erro...</p>
    }

    async function deletarUsuario(id) {
        const url = `http://localhost/tcc_baronesa/api/usuarios/${id}` 
        console.log(url)
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
                                    <th scope="col">Valor</th>
                                    <th scope="col">Descrição</th>
                                    <th scope='col'>Categoria</th>
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
                                            <td>R$ {registro.valor},00</td>
                                        </th>
                                        <th scope="row">
                                            <td>{registro.descricao}</td>
                                        </th>
                                        <th>
                                            <td>{registro.categoria}</td>
                                        </th>
                                        <th scope='row'>
                                            <button className='btn btn-warning me-2' onClick={() => setShowModal(true)}><i className='fa-trash fa-solid me-2'></i>Excluir</button>
                                            <button className='btn btn-warning'><i className='fa-pen fa-solid me-2'></i>Editar</button>
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
                                <button type="button" className="btn btn-warning" onClick={() => deletarUsuario(registros.map(registro => registro.id))}>
                                    Excluir {registros.map(registro => registro.id)}?
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