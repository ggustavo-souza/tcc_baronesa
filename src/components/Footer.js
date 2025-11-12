import React from "react";
import '../App.css'; // Onde você deve adicionar o CSS de responsividade
import '../awesome/all.min.css'

function Footer() {
    // URL do iframe. Substitua este link pelo link REAL do Google Maps Embed.
    const mapIframeSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d384.48166924168584!2d-47.487170528208274!3d-23.538734950689747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c58bafcb87df95%3A0xf7decb238e61795d!2sA%20Baronesa%20Movelaria%20Sorocaba!5e0!3m2!1spt-BR!2sbr!4v1762966697735!5m2!1spt-BR!2sbr"; 
    
    return (
        <div class="container-fluid corFooter">
            <footer class="text-center text-lg-start">

                <div class="container py-4">
                    <h5 class="text-white mb-3"> Nossa Localização</h5>
                    <div class="map-responsive shadow-lg rounded">
                        <iframe 
                            src={mapIframeSrc} 
                            width="100%" 
                            height="350" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Localização da A Baronesa Movelaria no Google Maps"
                        ></iframe>
                    </div>
                </div>
                
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