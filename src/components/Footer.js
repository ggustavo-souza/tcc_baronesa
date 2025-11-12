import React from "react";
// Assumindo que este caminho agora está correto no seu projeto:
import '../App.css'; 
import '../awesome/all.min.css'

function Footer() {
    // URL do iframe. Substitua este link pelo link REAL do Google Maps Embed.
    const mapIframeSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d384.48166924168584!2d-47.487170528208274!3d-23.538734950689747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c58bafcb87df95%3A0xf7decb238e61795d!2sA%20Baronesa%20Movelaria%20Sorocaba!5e0!3m2!1spt-BR!2sbr!4v1762966697735!5m2!1spt-BR!2sbr"; 
    
    return (
        <div className="container-fluid corFooter">
            {/* py-4 para um padding vertical, text-lg-start para alinhar texto à esquerda no desktop */}
            <footer className="text-center text-lg-start py-4"> 
                
                <div className="container">
                    {/* row para a grade, align-items-center para verticalizar os itens */}
                    <div className="row d-flex align-items-center"> 
                        
                        {/* 1. COLUNA ESQUERDA: REDES SOCIAIS (col-lg-4) */}
                        <div className="col-lg-4 col-md-12 mb-4 mb-lg-0 text-white">
                            <h5 className="mb-3">Siga-nos</h5>
                            {/* justify-content-lg-start: alinha à esquerda no desktop */}
                            <div className="d-flex justify-content-center justify-content-lg-start"> 
                                <a type="button" className="btn btn-warning btn-floating mx-1 footerBotao" href="https://www.facebook.com/profile.php?id=100088414481184" target="blank" aria-label="Facebook">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a type="button" className="btn btn-warning btn-floating mx-1 footerBotao" href="https://api.whatsapp.com/send/?phone=5515997396140&text&type=phone_number&app_absent=0" target="blank" aria-label="WhatsApp">
                                    <i className="fab fa-whatsapp"></i>
                                </a>
                                <a type="button" className="btn btn-warning btn-floating mx-1 footerBotao" href="https://www.instagram.com/abaronesamovelaria/" target="blank" aria-label="Instagram">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </div>
                        </div>
                        
                        {/* 2. COLUNA CENTRAL: COPYRIGHT (col-lg-4) */}
                        <div className="col-lg-4 col-md-12 mb-4 mb-lg-0 text-center text-white">
                            <p>© 2025 - 2025 Copyright</p>
                            <a className="text-white" href="https://abaronesa.vercel.app/"> A Baronesa - Movelaria</a>
                        </div>

                        {/* 3. COLUNA DIREITA: MAPA (col-lg-4) */}
                        <div className="col-lg-4 col-md-12 text-center text-lg-end"> 
                             <h5 className="mb-2 text-white text-center text-lg-end">Nossa Localização</h5>
                             
                             {/* map-responsive é a chave para o tamanho e responsividade */}
                             <div className="map-responsive shadow-lg rounded mx-auto mx-lg-0">
                                <iframe 
                                    src={mapIframeSrc} 
                                    width="100%" 
                                    height="180" 
                                    style={{ border: 0 }} 
                                    allowFullScreen="" 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Localização da Empresa no Google Maps"
                                ></iframe>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </footer>
        </div>
    )
}

export default Footer;