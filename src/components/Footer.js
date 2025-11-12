import React from "react";
// Removidas as importações que causaram erro (App.css e all.min.css).
// Os estilos e ícones foram movidos para dentro do componente usando <style> e classes de utilidade.

function Footer() {
    // URL do iframe. Substitua este link pelo link REAL do Google Maps Embed.
    const mapIframeSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d384.48166924168584!2d-47.487170528208274!3d-23.538734950689747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c58bafcb87df95%3A0xf7decb238e61795d!2sA%20Baronesa%20Movelaria%20Sorocaba!5e0!3m2!1spt-BR!2sbr!4v1762966697735!5m2!1spt-BR!2sbr"; 
    
    return (
        // Usando className em vez de class (melhor prática no React)
        <div className="corFooter bg-gray-800 text-white shadow-xl"> 
            
            {/* INJEÇÃO DE ESTILOS E FONT AWESOME VIA CDN */}
            <style>
                {`
  
                    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

                    .corFooter {
                        background-color: #343a40; /* Cinza escuro */
                    }

                    /* --- CSS para Responsividade e Altura do Mapa --- */
                    .map-responsive {
                        overflow: hidden; 
                        /* Altura na coluna: 40% é uma boa proporção horizontal. */
                        padding-bottom: 40%; 
                        position: relative; 
                        height: 0; 
                    }
                    .map-responsive iframe {
                        left: 0;
                        top: 0;
                        height: 100%;
                        width: 100%;
                        position: absolute; 
                        border-radius: 0.5rem; 
                    }
                `}
            </style>
            
            <footer className="text-center lg:text-left py-8"> 
                
                <div className="container mx-auto px-4">
                    {/* Linha principal: utiliza flexbox para layout de coluna */}
                    <div className="flex flex-wrap items-center -mx-4"> 
                        
                        {/* 1. COLUNA ESQUERDA: REDES SOCIAIS (1/3 em telas grandes) */}
                        <div className="w-full lg:w-1/3 px-4 mb-8 lg:mb-0 text-white">
                            <h5 className="mb-4 text-xl font-semibold">Siga-nos</h5>
                            <div className="flex justify-center lg:justify-start space-x-2"> 
                                <a className="footer-btn" href="https://www.facebook.com/profile.php?id=100088414481184" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                    <i className="fab fa-facebook-f text-lg"></i>
                                </a>
                                <a className="footer-btn" href="https://api.whatsapp.com/send/?phone=5515997396140&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                                    <i className="fab fa-whatsapp text-lg"></i>
                                </a>
                                <a className="footer-btn" href="https://www.instagram.com/abaronesamovelaria/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                    <i className="fab fa-instagram text-lg"></i>
                                </a>
                            </div>
                        </div>
                        
                        {/* 2. COLUNA CENTRAL: COPYRIGHT (1/3 em telas grandes) */}
                        <div className="w-full lg:w-1/3 px-4 mb-8 lg:mb-0 text-center text-white">
                            <p className="text-sm font-light">© 2025 - 2025 Copyright</p>
                            <a className="text-white hover:text-yellow-400 transition duration-150 ease-in-out" href="https://abaronesa.vercel.app/" rel="noopener noreferrer" target="_blank"> A Baronesa - Movelaria</a>
                        </div>

                        {/* 3. COLUNA DIREITA: MAPA (1/3 em telas grandes) */}
                        <div className="w-full lg:w-1/3 px-4"> 
                            <h5 className="mb-2 text-xl font-semibold text-center lg:text-right">Nossa Localização</h5>
                            
                            <div className="map-responsive shadow-xl rounded-lg border-2 border-yellow-500">
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