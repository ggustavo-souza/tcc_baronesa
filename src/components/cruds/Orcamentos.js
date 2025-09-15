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
    const navigate = useNavigate();

    useEffect(() => {
        Aos.init({ duration: 1000 })
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
                    className="card text-center p-4 shadow mt-4"
                    data-aos="fade-up"
                    style={{
                        backgroundColor: "#503325",
                        color: "#FFD230",
                        borderRadius: "15px",
                        cursor: "pointer",
                        transition: "transform 0.3s",
                    }}
                    // OnClick
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                    {registros.length > 0 ? (
                    <div>
                        {registros.map(registro => (
                            <div key={registro.id}>
                                <h3 data-label="ID:"><strong>Id:</strong> <i>{registro.id}</i></h3>
                                <h3 data-label="usuario:"><strong>Usuário:</strong> <i>{usuarios.find(u => u.id === registro.id_usuario)?.nome || '—'}</i></h3>
                                <h3 data-label="categoria"><strong>Categoria:</strong> <i>{categorias.find(u => u.id === registro.id_categoria)?.nome || '—'}</i></h3>
                                <h3 data-label="mensagem:"><strong>Descrição:</strong> <i>{registro.mensagem}</i></h3>
                            </div>
                        ))}
            </div>
            ) : <p>Nenhum registro encontrado.</p>}
        </div >
            </div >
        </>
    )
}