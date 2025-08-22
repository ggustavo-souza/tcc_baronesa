import Navadm from '../Navadm';
import "../../App.css"
import Aos from 'aos';
import { useState, useEffect } from 'react';
import { AOS } from 'aos';

export default function UsuariosCrud() {
    
    const [registros, setRegistros] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        Aos.init({duration: 500})
        const url = "http://localhost/tcc_baronesa/api/apirest.php"

        fetch(url)
            .then(response => {
                if(!response.ok) {
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
                                        </tr>
                                    </thead>
                                {registros.map(registro => (
                                    <tbody style={{backgroundColor: "#503225"}}>
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
                                        </tr>
                                    </tbody>
                                ))}
                                </table>
                            ) : (
                                <p>Nenhum registro encontrado.</p>
                            )}
                    </div>
                </div>
        </>
    )}