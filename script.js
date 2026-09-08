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
        position: 'center center',
        size: 'cover',
        // Para videos 9:16, estas configuraciones ayudan
        objectFit: 'cover',      // Cubre toda la pantalla
        objectPosition: 'center center' // Centrado perfecto
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
// LÓGICA DE LA PÁGINA - OPTIMIZADA PARA VIDEOS 9:16
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    
    // --- VIDEO DE FONDO OPTIMIZADO PARA 9:16 ---
    if (profile.backgroundVideo) {
        // Crear contenedor del video con fondo negro para evitar bordes
        const videoContainer = document.createElement('div');
        videoContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            overflow: hidden;
            background-color: #000000;
        `;

        // Crear elemento video con configuraciones optimizadas
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
            object-position: center center;
            /* Para mejorar la calidad en dispositivos HD */
            image-rendering: auto;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
        `;
        
        // Configurar video para máximo rendimiento y calidad
        video.src = profile.backgroundVideo;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.webkitPlaysInline = true; // Para iOS
        video.setAttribute('aria-hidden', 'true');
        video.setAttribute('preload', 'auto');
        
        // Para mejorar la reproducción en móviles
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        
        // Detectar si el video es 9:16 para aplicar optimizaciones
        video.addEventListener('loadedmetadata', function() {
            const aspectRatio = this.videoWidth / this.videoHeight;
            // Si es aproximadamente 9:16 (0.5625) o más vertical
            if (aspectRatio < 0.7) {
                // El video es vertical (9:16), asegurar que cubra bien
                this.style.objectFit = 'cover';
                this.style.minHeight = '100%';
                this.style.minWidth = 'auto';
                this.style.width = 'auto';
                this.style.height = '100%';
            }
        });
        
        // Agregar video al contenedor
        videoContainer.appendChild(video);
        
        // Agregar contenedor al body (al principio para estar detrás)
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
                /* Mejorar rendimiento */
                -webkit-transform: translateZ(0);
                transform: translateZ(0);
            `;
            document.body.appendChild(overlay);
        }
        
        // Manejar errores de carga del video (mostrar fondo negro)
        video.addEventListener('error', function() {
            console.warn('Error cargando el video de fondo, usando fondo negro');
            videoContainer.style.backgroundColor = '#0a0a0a';
        });
        
        // Para dispositivos con batería baja, optimizar rendimiento
        if ('connection' in navigator && navigator.connection) {
            const connection = navigator.connection;
            if (connection.saveData || connection.effectiveType === '2g') {
                video.pause();
                videoContainer.style.backgroundColor = '#0a0a0a';
            }
        }
    }
    
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

    // --- GENERAR BOTONES DE REDES SOCIALES ---
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
        });
    }
});

// ============================================================
// OPTIMIZACIONES ADICIONALES PARA VIDEOS 9:16
// ============================================================

// 1. Escuchar cambios de orientación para reajustar el video
window.addEventListener('resize', () => {
    const video = document.querySelector('video');
    if (video) {
        // Forzar reflow para que se reajuste
        video.style.transform = 'translate(-50%, -50%) scale(1)';
        requestAnimationFrame(() => {
            video.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    }
});

// 2. Para iOS, asegurar que el video se reproduzca
document.addEventListener('touchstart', () => {
    const video = document.querySelector('video');
    if (video && video.paused) {
        video.play().catch(() => {});
    }
}, { once: true });

// 3. Para Android, asegurar reproducción
document.addEventListener('click', () => {
    const video = document.querySelector('video');
    if (video && video.paused) {
        video.play().catch(() => {});
    }
}, { once: true });

// 4. Si el usuario cambia de pestaña, pausar/reproducir para ahorrar recursos
document.addEventListener('visibilitychange', () => {
    const video = document.querySelector('video');
    if (video) {
        if (document.hidden) {
            video.pause();
        } else {
            video.play().catch(() => {});
        }
    }
});

console.log('✅ XoloTech - Perfil cargado con video 9:16 optimizado');