import React from 'react';
import '../App.css';
import '../awesome/all.min.css';
import Aos from 'aos';
import Carroussel from './Carrossel';
import Navbar from './Navbar';

Aos.init();

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