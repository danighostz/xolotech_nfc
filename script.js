// ============================================================
// CONFIGURACIÓN PRINCIPAL DEL PERFIL
// Cambia los valores de este objeto para personalizar la página.
// ============================================================
const profile = {
    // --- IDENTIDAD ---
    name: "Síguenos en nuestras redes sociales", // <-- CAMBIAR NOMBRE
    description: "XoloTech | Grupo de Ingenieros en Sistemas Computacionales Desarrollamos soluciones tecnológicas para impulsar tu negocio", // <-- CAMBIAR DESCRIPCIÓN
    
    // --- IMÁGENES ---
    logo: "img/logo.png", // <-- CAMBIAR LOGO (2000x2000px)
    background: "img/fondo.png", // <-- CAMBIAR IMAGEN DE FONDO (9:16)
    
    // --- CONFIGURACIÓN DE FONDO ---
    backgroundSettings: {
        opacity: 0.85, // <-- OPACIDAD DE LA IMAGEN DE FONDO (0-1)
        overlayOpacity: 0.35, // <-- OPACIDAD DE LA CAPA OSCURA (0-1)
        filter: 'brightness(1.1) saturate(1.2)', // <-- FILTROS PARA MEJORAR LA IMAGEN
        position: 'center center', // <-- POSICIÓN DE LA IMAGEN
        size: 'cover', // <-- TAMAÑO DE LA IMAGEN: cover, contain, 100% 100%
        repeat: 'no-repeat' // <-- REPETICIÓN DE LA IMAGEN
    },

    // --- REDES SOCIALES ---
    socialLinks: [
        {
            name: "Facebook",
            url: "https://www.facebook.com/profile.php?id=61592220519581",
            icon: "fab fa-facebook-f",
            color: "#1877F2"
        },
        {
            name: "Instagram",
            url: "https://www.instagram.com/xolotech_acapulco/",
            icon: "fab fa-instagram",
            color: "#E1306C"
        },
        {
            name: "TikTok",
            url: "https://www.tiktok.com/@xolotech_acapulco",
            icon: "fab fa-tiktok",
            color: "#ffffff"
        },
        {
            name: "WhatsApp",
            url: "https://wa.me/527441371570",
            icon: "fab fa-whatsapp",
            color: "#25D366"
        }
    ],
};

// ============================================================
// LÓGICA DE LA PÁGINA (No modificar si no es necesario)
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    
    // Aplicar imagen de fondo con configuración personalizada
    if (profile.background) {
        body.style.backgroundImage = `url('${profile.background}')`;
        
        // Aplicar configuraciones de fondo si existen
        if (profile.backgroundSettings) {
            const settings = profile.backgroundSettings;
            
            // Configurar opacidad de la imagen de fondo
            if (settings.opacity) {
                body.style.opacity = settings.opacity;
            }
            
            // Configurar filtros
            if (settings.filter) {
                body.style.filter = settings.filter;
            }
            
            // Configurar posición
            if (settings.position) {
                body.style.backgroundPosition = settings.position;
            }
            
            // Configurar tamaño
            if (settings.size) {
                body.style.backgroundSize = settings.size;
            }
            
            // Configurar repetición
            if (settings.repeat) {
                body.style.backgroundRepeat = settings.repeat;
            }
            
            // Crear capa oscura con opacidad configurable
            if (settings.overlayOpacity !== undefined) {
                const overlay = document.createElement('div');
                overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, ${settings.overlayOpacity});
                    z-index: 1;
                    pointer-events: none;
                `;
                document.body.appendChild(overlay);
            }
        }
    }
    
    // Rellenar logo
    const logoContainer = document.getElementById('profile-logo');
    logoContainer.innerHTML = `<img src="${profile.logo}" alt="${profile.name} logo" loading="eager">`;

    // Rellenar nombre
    document.getElementById('profile-name').textContent = profile.name;

    // Rellenar descripción
    document.getElementById('profile-description').textContent = profile.description;

    // Generar botones de redes sociales
    const socialLinksContainer = document.getElementById('social-links');
    socialLinksContainer.innerHTML = '';

    profile.socialLinks.forEach((link, index) => {
        // Crear elemento <a>
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.target = "_blank";
        linkElement.rel = "noopener noreferrer";
        linkElement.className = 'social-button';
        
        // Establecer retraso de animación
        linkElement.style.animationDelay = `${0.6 + index * 0.2}s`;

        // Crear icono
        const iconElement = document.createElement('i');
        iconElement.className = link.icon;
        if (link.color) {
            iconElement.style.color = link.color;
        }

        // Crear span para el texto
        const spanElement = document.createElement('span');
        spanElement.textContent = link.name;

        // Agregar icono y texto al enlace
        linkElement.appendChild(iconElement);
        linkElement.appendChild(spanElement);

        // Agregar botón al contenedor
        socialLinksContainer.appendChild(linkElement);
    });
});