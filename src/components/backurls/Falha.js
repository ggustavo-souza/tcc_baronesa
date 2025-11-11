import { useNavigate } from "react-router-dom";

export default function Falha() {
  const navigate = useNavigate()
  return (
    <div className='card container col-8 col-md-7 col-sm-6 mt-5 CorNavbar p-4' data-aos='fade-up'>
      <h1 style={{ color: '#FFD230' }}>Ocorreu uma falha no pagamento!</h1>
      <button className='btn btn-warning mt-4 col-5 align-self-center' onClick={() => navigate('/pedidos')}>Voltar para meus pedidos</button>
    </div>
  );
}
