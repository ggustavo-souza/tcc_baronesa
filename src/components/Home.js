import '../App.css';
import '../awesome/all.min.css';
import Carroussel from './Carrossel';
import Navbar from './Navbar';
import Aos from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect } from 'react';

function RemoverAcentos(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


function Home() {


    return (
        <div>
            <Navbar />
            <div className="container mt-5 ">
                <div className="row justify-content-center mt-4">
                     <Carroussel />
                     <ListaPequena />
                </div>
            </div>
        </div>
    );
}

function ListaPequena() {
    const categories = ["mesas", "cadeiras", "armários", "cômodas", "planejados"];

    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

  return (
    <div className="category-container mt-4" data-aos="fade-up">
      <ul className="category-list">
        {categories.map((category, index) => (
          <li key={index} className="category-item">
            <a href={`/produtos/${RemoverAcentos(category)}`}>{category.charAt(0).toUpperCase() + category.slice(1)}</a>
          </li>
        ))
        }
      </ul>
    </div>
  );
}

export default Home;