const profile = {
    // --- IDENTIDAD ---
    name: "Síguenos en nuestras redes sociales",
    description: "XoloTech | Grupo de Ingenieros en Sistemas Computacionales. Desarrollamos soluciones tecnológicas para impulsar tu negocio",

    // --- IMÁGENES ---
    logo: "img/logo.png",

    // --- VIDEO DE FONDO ---
    backgroundVideo: "img/fondo.mp4",

    // --- CONFIGURACIÓN DEL FONDO ---
    backgroundSettings: {
        overlayOpacity: 0.10
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
            name: "Califícanos en Google",
            url: "https://g.page/r/Cct7-wXd-vIzEBM/review",
            icon: "fab fa-google",
            color: "#EA4335"
        }
    ],

    // --- WHATSAPP FLOTANTE ---
    whatsapp: {
        name: "WhatsApp",
        url: "https://wa.me/527441371570",
        icon: "fab fa-whatsapp",
        color: "#25D366"
    },

    // --- DATOS DE TRANSFERENCIA ---
    transferData: {
        bank: "BBVA México",
        owner: "XoloTech Ingeniería S.A. de C.V.",
        clabe: "012 345 6789 012345678",
        account: "1234 5678 9012 3456",
        concept: "Pago de servicios profesionales"
    }
};

// ============================================================
// INICIO
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
    let videoElement = null;
    let videoContainer = null;
    let videoSource = null;

    // ========================================================
    // CREAR VIDEO DE FONDO
    // ========================================================
    function createBackgroundVideo() {
        // Si ya existe, eliminarlo
        if (videoContainer) {
            videoContainer.remove();
        }

        // Crear contenedor
        videoContainer = document.createElement("div");
        videoContainer.className = "video-background-container";

        // Crear video
        videoElement = document.createElement("video");
        videoElement.className = "video-background";

        // Guardar fuente
        videoSource = profile.backgroundVideo;
        videoElement.src = videoSource;

        // Configuración
        videoElement.autoplay = true;
        videoElement.loop = true;
        videoElement.muted = true;
        videoElement.defaultMuted = true;
        videoElement.playsInline = true;

        // Compatibilidad iPhone / Android
        videoElement.setAttribute("autoplay", "");
        videoElement.setAttribute("muted", "");
        videoElement.setAttribute("loop", "");
        videoElement.setAttribute("playsinline", "");
        videoElement.setAttribute("webkit-playsinline", "");
        videoElement.setAttribute("preload", "auto");
        videoElement.controls = false;

        // ====================================================
        // ERROR DEL VIDEO
        // ====================================================
        videoElement.addEventListener("error", () => {
            console.warn("⚠️ Error cargando el video de fondo");
            if (videoContainer) {
                videoContainer.style.backgroundColor = "#0a0a0a";
            }
        });

        // ====================================================
        // CUANDO TERMINA
        // ====================================================
        videoElement.addEventListener("ended", () => {
            videoElement.currentTime = 0;
            playVideo();
        });

        // Agregar video
        videoContainer.appendChild(videoElement);

        // Colocarlo al principio
        document.body.prepend(videoContainer);

        // ====================================================
        // OVERLAY
        // ====================================================
        if (profile.backgroundSettings && profile.backgroundSettings.overlayOpacity !== undefined) {
            const existingOverlay = document.querySelector(".video-overlay");
            if (existingOverlay) {
                existingOverlay.remove();
            }

            const overlay = document.createElement("div");
            overlay.className = "video-overlay";
            overlay.style.backgroundColor = `rgba(0, 0, 0, ${profile.backgroundSettings.overlayOpacity})`;
            document.body.appendChild(overlay);
        }

        // Intentar reproducir
        playVideo();
    }

    // ========================================================
    // REPRODUCIR VIDEO
    // ========================================================
    function playVideo() {
        if (!videoElement) return;

        // Asegurar silencio
        videoElement.muted = true;
        videoElement.defaultMuted = true;

        // Si terminó
        if (videoElement.ended) {
            try {
                videoElement.currentTime = 0;
            } catch (error) {}
        }

        const promise = videoElement.play();
        if (promise !== undefined) {
            promise.catch(() => {
                console.log("ℹ️ El navegador bloqueó temporalmente la reproducción automática.");
            });
        }
    }

    // ========================================================
    // REINICIAR COMPLETAMENTE EL VIDEO
    // ========================================================
    function reloadVideo() {
        if (!videoElement) return;

        try {
            videoElement.pause();
            videoElement.removeAttribute("src");
            videoElement.load();

            setTimeout(() => {
                videoElement.src = videoSource;
                videoElement.muted = true;
                videoElement.defaultMuted = true;
                videoElement.setAttribute("muted", "");
                videoElement.load();

                setTimeout(() => {
                    playVideo();
                }, 150);
            }, 100);
        } catch (error) {
            console.warn("No se pudo reiniciar el video.", error);
            playVideo();
        }
    }

    // ========================================================
    // CREAR VIDEO
    // ========================================================
    if (profile.backgroundVideo) {
        createBackgroundVideo();
    }

    // ========================================================
    // CUANDO LA PÁGINA VUELVE A SER VISIBLE
    // ========================================================
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) {
            playVideo();

            setTimeout(() => {
                if (videoElement && videoElement.paused) {
                    reloadVideo();
                }
            }, 300);

            setTimeout(() => {
                if (videoElement && videoElement.paused) {
                    playVideo();
                }
            }, 1000);
        }
    });

    // ========================================================
    // CUANDO LA VENTANA RECUPERA EL FOCO
    // ========================================================
    window.addEventListener("focus", () => {
        setTimeout(playVideo, 100);
        setTimeout(playVideo, 500);
    });

    // ========================================================
    // PAGESHOW
    // ========================================================
    window.addEventListener("pageshow", () => {
        setTimeout(playVideo, 100);
        setTimeout(playVideo, 500);
    });

    // ========================================================
    // DETECTAR PAUSA INESPERADA
    // ========================================================
    if (videoElement) {
        videoElement.addEventListener("pause", () => {
            if (!document.hidden) {
                setTimeout(playVideo, 100);
            }
        });
    }

    // ========================================================
    // COMPROBACIÓN PERIÓDICA
    // ========================================================
    setInterval(() => {
        if (videoElement && videoElement.paused && !document.hidden) {
            playVideo();
        }
    }, 2000);

    // ========================================================
    // CARGAR LOGO
    // ========================================================
    const logoContainer = document.getElementById("profile-logo");
    if (logoContainer) {
        logoContainer.innerHTML = "";
        const logo = document.createElement("img");
        logo.src = profile.logo;
        logo.alt = `${profile.name} logo`;
        logo.loading = "eager";
        logo.draggable = false;
        logoContainer.appendChild(logo);
    }

    // ========================================================
    // CARGAR NOMBRE
    // ========================================================
    const nameElement = document.getElementById("profile-name");
    if (nameElement) {
        nameElement.textContent = profile.name;
    }

    // ========================================================
    // CARGAR DESCRIPCIÓN
    // ========================================================
    const descriptionElement = document.getElementById("profile-description");
    if (descriptionElement) {
        descriptionElement.textContent = profile.description;
    }

    // ========================================================
    // GENERAR REDES SOCIALES
    // ========================================================
    const socialLinksContainer = document.getElementById("social-links");
    if (socialLinksContainer) {
        socialLinksContainer.innerHTML = "";

        profile.socialLinks.forEach((link, index) => {
            const linkElement = document.createElement("a");
            linkElement.href = link.url;
            linkElement.target = "_blank";
            linkElement.rel = "noopener noreferrer";
            linkElement.className = "social-button";
            linkElement.style.animationDelay = `${0.6 + index * 0.15}s`;

            // ICONO
            const iconElement = document.createElement("i");
            iconElement.className = link.icon;
            if (link.color) {
                iconElement.style.color = link.color;
            }

            // TEXTO
            const spanElement = document.createElement("span");
            spanElement.textContent = link.name;

            // ARMAR BOTÓN
            linkElement.appendChild(iconElement);
            linkElement.appendChild(spanElement);
            socialLinksContainer.appendChild(linkElement);
        });
    }

    // ========================================================
    // WHATSAPP FLOTANTE
    // ========================================================
    function createFloatingWhatsApp() {
        // Evitar duplicados
        const existing = document.querySelector(".floating-whatsapp");
        if (existing) {
            existing.remove();
        }

        const whatsapp = document.createElement("a");
        whatsapp.className = "floating-whatsapp";
        whatsapp.href = profile.whatsapp.url;
        whatsapp.target = "_blank";
        whatsapp.rel = "noopener noreferrer";
        whatsapp.setAttribute("aria-label", "Contactar por WhatsApp");

        // ICONO
        const icon = document.createElement("i");
        icon.className = profile.whatsapp.icon;
        icon.style.color = "#ffffff";

        // AGREGAR ICONO
        whatsapp.appendChild(icon);

        // AGREGAR AL BODY
        document.body.appendChild(whatsapp);
    }

    // Crear WhatsApp
    createFloatingWhatsApp();

    // ========================================================
    // ESTADO (Abierto/Cerrado)
    // ========================================================
    function updateStatus() {
        const now = new Date();
        const hour = now.getHours();
        const day = now.getDay(); // 0 = domingo, 6 = sábado

        // Horario: Lunes a Viernes de 9:00 AM a 10:00 PM
        const isOpen = (day >= 1 && day <= 5) && (hour >= 9 && hour < 22);

        const dot = document.getElementById('statusDot');
        const text = document.getElementById('statusText');
        const time = document.getElementById('statusTime');

        if (dot && text && time) {
            if (isOpen) {
                dot.className = 'status-dot open';
                text.className = 'status-text open';
                text.textContent = 'Abierto';
            } else {
                dot.className = 'status-dot closed';
                text.className = 'status-text closed';
                text.textContent = 'Cerrado';
            }

            // Formatear hora
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            time.textContent = `${dayNames[day]} ${hours}:${minutes}`;
        }
    }

    // Actualizar estado cada minuto
    updateStatus();
    setInterval(updateStatus, 60000);

    // ========================================================
    // CARGAR DATOS DE TRANSFERENCIA EN EL MODAL
    // ========================================================
    function loadTransferData() {
        const bankValue = document.getElementById('bankValue');
        const ownerValue = document.getElementById('ownerValue');
        const clabeValue = document.getElementById('clabeValue');
        const accountValue = document.getElementById('accountValue');
        const conceptValue = document.getElementById('conceptValue');

        if (bankValue) bankValue.textContent = profile.transferData.bank;
        if (ownerValue) ownerValue.textContent = profile.transferData.owner;
        if (clabeValue) clabeValue.textContent = profile.transferData.clabe;
        if (accountValue) accountValue.textContent = profile.transferData.account;
        if (conceptValue) conceptValue.textContent = profile.transferData.concept;
    }

    loadTransferData();

    // ========================================================
    // MODAL DE TRANSFERENCIA
    // ========================================================
    const transferButton = document.getElementById('transferButton');
    const modal = document.getElementById('transferModal');
    const closeModal = document.getElementById('closeModal');
    const backToMain = document.getElementById('backToMain');

    function openModal() {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModalFunc() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (transferButton) {
        transferButton.addEventListener('click', openModal);
    }

    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }

    if (backToMain) {
        backToMain.addEventListener('click', closeModalFunc);
    }

    // Cerrar modal al hacer clic en el overlay
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalFunc();
            }
        });
    }

    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModalFunc();
        }
    });

    // ========================================================
    // COPIAR TEXTO - DURA EXACTAMENTE 3 SEGUNDOS
    // ========================================================
    document.querySelectorAll('.copy-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-copy');
            const textElement = document.getElementById(targetId);
            
            if (!textElement) return;
            
            const textToCopy = textElement.textContent.trim();

            // Función para mostrar feedback con duración exacta de 3 segundos
            const showFeedback = (btn) => {
                // Guardar estado original
                const originalHTML = btn.innerHTML;
                const originalClass = btn.className;
                
                // Cambiar inmediatamente a "Copiado"
                btn.innerHTML = '<i class="fas fa-check"></i> Copiado';
                btn.classList.add('copied');
                
                // Restaurar después de EXACTAMENTE 3 segundos (3000ms)
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.className = originalClass;
                }, 3000);
            };

            // Intentar copiar con la API moderna
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(textToCopy)
                    .then(() => {
                        showFeedback(this);
                    })
                    .catch(() => {
                        fallbackCopy(textToCopy, this, showFeedback);
                    });
            } else {
                fallbackCopy(textToCopy, this, showFeedback);
            }
        });
    });

    function fallbackCopy(text, button, showFeedback) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '-9999px';
        textArea.style.opacity = '0';
        textArea.style.pointerEvents = 'none';
        document.body.appendChild(textArea);
        
        textArea.select();
        textArea.setSelectionRange(0, text.length);
        
        try {
            const success = document.execCommand('copy');
            if (success) {
                showFeedback(button);
            } else {
                console.warn('No se pudo copiar el texto');
            }
        } catch (err) {
            console.warn('Error al copiar:', err);
        }
        
        document.body.removeChild(textArea);
    }

    // ========================================================
    // PREVENIR QUE LOS CLICS EN LOS BOTONES AFECTEN LA REPRODUCCIÓN
    // ========================================================
    document.addEventListener("click", (event) => {
        const clickedLink = event.target.closest("a");
        if (!clickedLink) return;
    }, true);

    // ========================================================
    // MENSAJE DE CONSOLA
    // ========================================================
    console.log("✅ XoloTech - Perfil cargado correctamente");
});