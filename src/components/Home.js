import '../App.css';
import '../awesome/all.min.css';
import Carroussel from './Carrossel';
import Navbar from './Navbar';


function Home() {
    return (
        <div>
            <Navbar />
            <div className="container mt-5 ">
                <div className="row justify-content-center mt-4">
                     <Carroussel />
                </div>
            </div>
        </div>
    );
}

export default Home;