import "../App.css";
import "../awesome/all.min.css";
import Navbar from './Navbar'
import { Link, Router, Routes } from "react-router-dom";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from "./auths/useAuthUser";

function MinhaConta() {
    useAuthUser();

    return (
        <main>
            <Navbar />
            <div>
                <h1>teste guedes</h1>
            </div>
        </main>
    )
}

export default MinhaConta;