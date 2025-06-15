import "../App.css";
import "../awesome/all.min.css";
import Navbar from './Navbar'
import axios from "axios";

function FormLogin() {

    const path = '/tcc_baronesa/api/login.php';

    return(
        <main>
            <Navbar />
                <div className="card col-md-2 "> 
                    <form action={path}>
                        <label className="form-label" for="usuario" style={{color: '#FFD230'}}>Nome de Usuário</label>
                        <input id="usuario" type="text" className="mt-3 mb-2 form-text col-md-6 col-6" />
                    </form>
                </div>
        </main>
    )
}

export default FormLogin;