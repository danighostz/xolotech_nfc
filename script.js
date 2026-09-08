// ============================================================
// CONFIGURACIÓN PRINCIPAL DEL PERFIL
// ============================================================
const profile = {
    // --- IDENTIDAD ---
    name: "Síguenos en nuestras redes sociales",
    description: "XoloTech | Grupo de Ingenieros en Sistemas Computacionales. Desarrollamos soluciones tecnológicas para impulsar tu negocio",
    
    // --- IMÁGENES ---
    logo: "img/logo.png",
    
    // --- VIDEO DE FONDO (9:16 / 1080x1920 recomendado) ---
    backgroundVideo: "img/fondo.mp4",
    
    // --- CONFIGURACIÓN DE FONDO ---
    backgroundSettings: {
        overlayOpacity: 0.10,
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
// LÓGICA DE LA PÁGINA - SIN ESTILOS INLINE
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    let videoElement = null;
    let videoContainer = null;
    
    // --- VIDEO DE FONDO ---
    if (profile.backgroundVideo) {
        // Contenedor del video (solo clases, sin estilos inline)
        videoContainer = document.createElement('div');
        videoContainer.className = 'video-background-container';

        // Elemento video (solo clases y atributos)
        videoElement = document.createElement('video');
        videoElement.className = 'video-background';
        videoElement.src = profile.backgroundVideo;
        videoElement.autoplay = true;
        videoElement.loop = true;
        videoElement.muted = true;
        videoElement.playsInline = true;
        videoElement.webkitPlaysInline = true;
        videoElement.setAttribute('preload', 'auto');
        videoElement.setAttribute('playsinline', '');
        videoElement.setAttribute('webkit-playsinline', '');
        
        // Manejar errores
        videoElement.addEventListener('error', function() {
            console.warn('⚠️ Error cargando el video de fondo');
            if (videoContainer) {
                videoContainer.style.backgroundColor = '#0a0a0a';
            }
        });
        
        videoContainer.appendChild(videoElement);
        document.body.prepend(videoContainer);
        
        // Capa oscura (solo clase)
        if (profile.backgroundSettings && profile.backgroundSettings.overlayOpacity !== undefined) {
            const overlay = document.createElement('div');
            overlay.className = 'video-overlay';
            overlay.style.backgroundColor = `rgba(0, 0, 0, ${profile.backgroundSettings.overlayOpacity})`;
            document.body.appendChild(overlay);
        }
    }
    
    // --- FUNCIÓN PARA REANUDAR VIDEO ---
    function forceVideoPlay() {
        if (videoElement && videoElement.paused) {
            videoElement.play().catch(() => {});
        }
    }
    
    // --- EVENTOS PARA REANUDAR VIDEO ---
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            setTimeout(forceVideoPlay, 100);
            setTimeout(forceVideoPlay, 300);
        }
    });
    
    document.addEventListener('click', forceVideoPlay);
    document.addEventListener('touchstart', forceVideoPlay, { passive: true });
    window.addEventListener('focus', () => setTimeout(forceVideoPlay, 200));
    
    // Verificar cada 5 segundos
    setInterval(() => {
        if (videoElement && videoElement.paused && !document.hidden) {
            forceVideoPlay();
        }
    }, 5000);
    
    // --- CARGAR LOGO ---
    const logoContainer = document.getElementById('profile-logo');
    if (logoContainer) {
        logoContainer.innerHTML = `<img src="${profile.logo}" alt="${profile.name} logo" loading="eager" draggable="false">`;
    }

    // --- CARGAR NOMBRE ---
    const nameElement = document.getElementById('profile-name');
    if (nameElement) {
        nameElement.textContent = profile.name;
    }

    // --- CARGAR DESCRIPCIÓN ---
    const descriptionElement = document.getElementById('profile-description');
    if (descriptionElement) {
        descriptionElement.textContent = profile.description;
    }

    // --- GENERAR BOTONES ---
    const socialLinksContainer = document.getElementById('social-links');
    if (socialLinksContainer) {
        socialLinksContainer.innerHTML = '';

        profile.socialLinks.forEach((link, index) => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.target = "_blank";
            linkElement.rel = "noopener noreferrer";
            linkElement.className = 'social-button';
            linkElement.style.animationDelay = `${0.6 + index * 0.15}s`;

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
            
            linkElement.addEventListener('click', forceVideoPlay);
            linkElement.addEventListener('touchstart', forceVideoPlay, { passive: true });
        });
    }
    
    console.log('✅ XoloTech - Perfil cargado correctamente');
});