import React from "react";
import '../App.css';
import '../awesome/all.min.css'

function Footer() {
    return (
        <div class="container-fluid corFooter">
            <footer class="text-center text-lg-start">
                <div class="container-fluid d-flex justify-content-center py-5">
                    <a type="button" class="btn btn-warning btn-lg btn-floating mx-2 footerBotao" href="https://www.facebook.com/profile.php?id=100088414481184" target="blank">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a type="button" class="btn btn-warning btn-lg btn-floating mx-2 footerBotao" href="https://api.whatsapp.com/send/?phone=5515997396140&text&type=phone_number&app_absent=0" target="blank">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                    <a type="button" class="btn btn-warning btn-lg btn-floating mx-2 footerBotao" href="https://www.instagram.com/abaronesamovelaria/" target="blank">
                        <i class="fab fa-instagram"></i>
                    </a>
                </div>
                <div class="text-center text-white p-3">
                    <p>© 2025 - 2025 Copyright</p>
                    <a class="text-white" href="https://abaronesa.vercel.app/"> A Baronesa - Movelaria</a>
                </div>
            </footer>
        </div>
    )
}

export default Footer;