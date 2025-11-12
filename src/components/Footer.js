import React from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
import '../awesome/all.min.css'

function Footer() {

    const navigate = useNavigate();

    return (
        <div class="container-fluid corFooter">
            <footer class="text-center text-lg-start">
                <div class="container-fluid d-flex justify-content-center py-5">
                    <a type="button" class="btn btn-warning btn-lg btn-floating mx-2 footerBotao" href="https://www.facebook.com/profile.php?id=100088414481184">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a type="button" class="btn btn-warning btn-lg btn-floating mx-2 footerBotao" href="wa.me/5515997396140">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                    <a type="button" class="btn btn-warning btn-lg btn-floating mx-2 footerBotao" href="https://www.instagram.com/abaronesamovelaria/">
                        <i class="fab fa-instagram"></i>
                    </a>
                </div>
                <div class="text-center text-white p-3">
                    <p>© 2025 - 2025 Copyright</p>
                    <a class="text-white" href="https://www.abaronesa.vercel.app/"> A Baronesa - Movelaria</a>
                </div>
            </footer>
        </div>
    )
}

export default Footer;