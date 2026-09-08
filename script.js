// ============================================================
// CONFIGURACIÓN PRINCIPAL DEL PERFIL
// Cambia los valores de este objeto para personalizar la página.
// ============================================================
const profile = {
    // --- IDENTIDAD ---
    name: "Síguenos en nuestras redes sociales",
    description: "XoloTech | Grupo de Ingenieros en Sistemas Computacionales Desarrollamos soluciones tecnológicas para impulsar tu negocio",
    
    // --- IMÁGENES ---
    logo: "img/logo.png", // <-- CAMBIAR LOGO (2000x2000px)
    
    // --- VIDEO DE FONDO ---
    backgroundVideo: "img/fondo.mp4", // <-- CAMBIAR VIDEO DE FONDO (MP4 recomendado)
    
    // --- CONFIGURACIÓN DE FONDO ---
    backgroundSettings: {
        overlayOpacity: 0.35, // <-- OPACIDAD DE LA CAPA OSCURA (0-1)
        position: 'center center', // <-- POSICIÓN DEL VIDEO
        size: 'cover' // <-- TAMAÑO DEL VIDEO: cover, contain
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
    
    // --- VIDEO DE FONDO ---
    if (profile.backgroundVideo) {
        // Crear contenedor del video
        const videoContainer = document.createElement('div');
        videoContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            overflow: hidden;
        `;

        // Crear elemento video
        const video = document.createElement('video');
        video.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            min-width: 100%;
            min-height: 100%;
            width: auto;
            height: auto;
            object-fit: cover;
        `;
        
        // Configurar video
        video.src = profile.backgroundVideo;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.setAttribute('aria-hidden', 'true');
        
        // Agregar video al contenedor
        videoContainer.appendChild(video);
        
        // Agregar contenedor al body
        document.body.prepend(videoContainer);
        
        // Asegurar que el body tenga posición relativa para el z-index
        body.style.position = 'relative';
        body.style.zIndex = '1';
        
        // Agregar capa oscura sobre el video si está configurada
        if (profile.backgroundSettings && profile.backgroundSettings.overlayOpacity !== undefined) {
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, ${profile.backgroundSettings.overlayOpacity});
                z-index: 1;
                pointer-events: none;
            `;
            document.body.appendChild(overlay);
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
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.target = "_blank";
        linkElement.rel = "noopener noreferrer";
        linkElement.className = 'social-button';
        linkElement.style.animationDelay = `${0.6 + index * 0.2}s`;

        const iconElement = document.createElement('i');
        iconElement.className = link.icon;
        if (link.color) {
            iconElement.style.color = link.color;
        }

        const spanElement = document.createElement('span');
        spanElement.textContent = link.name;

        linkElement.appendChild(iconElement);
        linkElement.appendChild(spanElement);
        socialLinksContainer.appendChild(linkElement);
    });
});