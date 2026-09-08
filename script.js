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
    
    // --- VIDEO DE FONDO (9:16 / 1080x1920 recomendado) ---
    backgroundVideo: "img/fondo.mp4", // <-- CAMBIAR VIDEO DE FONDO (MP4 recomendado)
    
    // --- CONFIGURACIÓN DE FONDO ---
    backgroundSettings: {
        overlayOpacity: 0.10, // <-- OPACIDAD DE LA CAPA OSCURA (0-1)
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
// LÓGICA DE LA PÁGINA
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    let videoElement = null;
    let videoContainer = null;
    
    // --- FUNCIÓN PARA CENTRAR VIDEO 9:16 ---
    function centerVideo() {
        if (!videoElement) return;
        
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;
        const videoRatio = videoElement.videoWidth / videoElement.videoHeight;
        
        // Si es 9:16 (vertical)
        if (videoRatio < 0.7) {
            // El video debe cubrir todo el ancho y ajustar altura
            videoElement.style.width = '100%';
            videoElement.style.height = 'auto';
            videoElement.style.minWidth = '100%';
            videoElement.style.minHeight = 'auto';
            videoElement.style.objectFit = 'cover';
            
            // Si la altura del contenedor es mayor que la del video, centrar verticalmente
            const videoHeight = containerWidth / videoRatio;
            if (videoHeight < containerHeight) {
                videoElement.style.height = '100%';
                videoElement.style.width = 'auto';
                videoElement.style.minHeight = '100%';
                videoElement.style.minWidth = 'auto';
            }
        }
    }
    
    // --- VIDEO DE FONDO ---
    if (profile.backgroundVideo) {
        // Contenedor del video
        videoContainer = document.createElement('div');
        videoContainer.className = 'video-background-container';
        videoContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            overflow: hidden;
            background-color: #000000;
            display: flex;
            justify-content: center;
            align-items: center;
        `;

        // Elemento video
        videoElement = document.createElement('video');
        videoElement.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            min-width: 100%;
            min-height: 100%;
            width: auto;
            height: auto;
            object-fit: cover;
            object-position: center center;
        `;
        
        // Configurar video
        videoElement.src = profile.backgroundVideo;
        videoElement.autoplay = true;
        videoElement.loop = true;
        videoElement.muted = true;
        videoElement.playsInline = true;
        videoElement.webkitPlaysInline = true;
        videoElement.setAttribute('preload', 'auto');
        videoElement.setAttribute('playsinline', '');
        videoElement.setAttribute('webkit-playsinline', '');
        
        // Cuando el video esté cargado, centrarlo
        videoElement.addEventListener('loadedmetadata', function() {
            console.log(`📹 Video cargado - Aspect ratio: ${(this.videoWidth / this.videoHeight).toFixed(2)}`);
            centerVideo();
        });
        
        // También centrar cuando cambie el tamaño
        window.addEventListener('resize', centerVideo);
        window.addEventListener('orientationchange', () => {
            setTimeout(centerVideo, 300);
        });
        
        videoContainer.appendChild(videoElement);
        document.body.prepend(videoContainer);
        
        // Capa oscura
        if (profile.backgroundSettings && profile.backgroundSettings.overlayOpacity !== undefined) {
            const overlay = document.createElement('div');
            overlay.className = 'video-overlay';
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
        
        // Manejar errores
        videoElement.addEventListener('error', function() {
            console.warn('⚠️ Error cargando el video de fondo');
            if (videoContainer) {
                videoContainer.style.backgroundColor = '#0a0a0a';
            }
        });
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