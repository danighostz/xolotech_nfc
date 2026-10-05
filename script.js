const profile = {
    // --- IDENTIDAD ---
    name: "Síguenos en nuestras redes sociales",
    description: "Grupo de Ingenieros en Sistemas Computacionales. Desarrollamos soluciones tecnológicas para impulsar tu negocio.",

    // --- IMÁGENES ---
    logo: "img/logo.png",

    // --- FONDO (IMAGEN) ---
    backgroundImage: "img/fondo.png",

    // --- CONFIGURACIÓN DEL FONDO ---
    backgroundSettings: {
        overlayOpacity: 0.45
    },

    // --- REDES SOCIALES ---
    socialLinks: [
        { name: "Facebook", url: "https://www.facebook.com/profile.php?id=61592220519581", icon: "fab fa-facebook-f", color: "#1877F2" },
        { name: "Instagram", url: "https://www.instagram.com/xolotech_acapulco/", icon: "fab fa-instagram", color: "#E1306C" },
        { name: "TikTok", url: "https://www.tiktok.com/@xolotech_acapulco", icon: "fab fa-tiktok", color: "#ffffff" },
        { name: "Califícanos en Google", url: "https://g.page/r/Cct7-wXd-vIzEBM/review", icon: "fab fa-google", color: "#EA4335" }
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

    let statusInterval = null;

    // ========================================================
    // BLOQUEO DE SCROLL GLOBAL CUANDO HAY MODAL ABIERTO
    // ========================================================
    let savedScrollY = 0;

    function lockBodyScroll() {
        savedScrollY = window.scrollY || window.pageYOffset || 0;
        document.body.style.top = `-${savedScrollY}px`;
        document.body.classList.add('modal-open');
    }

    function unlockBodyScroll() {
        document.body.classList.remove('modal-open');
        document.body.style.top = '';
        window.scrollTo(0, savedScrollY);
    }

    // Bloquea el scroll táctil dentro del body cuando hay modal (para iOS)
    document.addEventListener('touchmove', (e) => {
        if (document.body.classList.contains('modal-open')) {
            const modalScrollable = e.target.closest('.modal-container');
            if (!modalScrollable) {
                e.preventDefault();
            }
        }
    }, { passive: false });

    // ========================================================
    // CREAR FONDO CON IMAGEN
    // ========================================================
    function createBackgroundImage() {
        const existingContainer = document.querySelector(".image-background-container");
        const existingOverlay = document.querySelector(".image-overlay");
        if (existingContainer) existingContainer.remove();
        if (existingOverlay) existingOverlay.remove();

        const container = document.createElement("div");
        container.className = "image-background-container";

        const imageDiv = document.createElement("div");
        imageDiv.className = "image-background";
        imageDiv.style.backgroundImage = `url('${profile.backgroundImage}')`;

        container.appendChild(imageDiv);
        document.body.prepend(container);

        if (profile.backgroundSettings && profile.backgroundSettings.overlayOpacity !== undefined) {
            const overlay = document.createElement("div");
            overlay.className = "image-overlay";
            overlay.style.backgroundColor = `rgba(0, 0, 0, ${profile.backgroundSettings.overlayOpacity})`;
            document.body.appendChild(overlay);
        }
    }
    if (profile.backgroundImage) createBackgroundImage();

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
    if (nameElement) nameElement.textContent = profile.name;

    // ========================================================
    // CARGAR DESCRIPCIÓN
    // ========================================================
    const descriptionElement = document.getElementById("profile-description");
    if (descriptionElement) descriptionElement.textContent = profile.description;

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

            const iconElement = document.createElement("i");
            iconElement.className = link.icon;
            if (link.color) iconElement.style.color = link.color;

            const spanElement = document.createElement("span");
            spanElement.textContent = link.name;

            linkElement.appendChild(iconElement);
            linkElement.appendChild(spanElement);
            socialLinksContainer.appendChild(linkElement);
        });
    }

    // ========================================================
    // WHATSAPP FLOTANTE
    // ========================================================
    function createFloatingWhatsApp() {
        const existing = document.querySelector(".floating-whatsapp");
        if (existing) existing.remove();

        const whatsapp = document.createElement("a");
        whatsapp.className = "floating-whatsapp";
        whatsapp.href = profile.whatsapp.url;
        whatsapp.target = "_blank";
        whatsapp.rel = "noopener noreferrer";
        whatsapp.setAttribute("aria-label", "Contactar por WhatsApp");

        const icon = document.createElement("i");
        icon.className = profile.whatsapp.icon;
        icon.style.color = "#ffffff";

        whatsapp.appendChild(icon);
        document.body.appendChild(whatsapp);
    }
    createFloatingWhatsApp();

    // ========================================================
    // ESTADO (Abierto/Cerrado)
    // ========================================================
    function updateStatus() {
        const now = new Date();
        const hour = now.getHours();
        const day = now.getDay();
        const isOpen = (day >= 1 && day <= 5) && (hour >= 9 && hour < 22);

        const dot = document.getElementById('statusDot');
        const text = document.getElementById('statusText');
        const time = document.getElementById('statusTime');

        if (dot && text && time) {
            if (isOpen) {
                dot.className = 'status-dot open';
                text.className = 'status-text open';
                text.textContent = 'Acapulco Guerrero México';
            } else {
                dot.className = 'status-dot closed';
                text.className = 'status-text closed';
                text.textContent = 'Acapulco Guerrero México';
            }
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            time.textContent = `${dayNames[day]} ${hours}:${minutes}`;
        }
    }

    function startStatusInterval() {
        if (statusInterval) return;
        updateStatus();
        statusInterval = setInterval(updateStatus, 60000);
    }
    function stopStatusInterval() {
        if (statusInterval) {
            clearInterval(statusInterval);
            statusInterval = null;
        }
    }
    startStatusInterval();

    // ========================================================
    // CARGAR DATOS DE TRANSFERENCIA
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
    // ⚡ MODO RENDIMIENTO
    // ========================================================
    function pauseHeavyAnimations() {
        document.documentElement.classList.add('modal-performance-mode');
        stopStatusInterval();
    }

    function resumeHeavyAnimations() {
        document.documentElement.classList.remove('modal-performance-mode');
        startStatusInterval();
    }

    // ========================================================
    // SISTEMA GENÉRICO DE MODALES
    // ========================================================
    const modalStack = [];

    function openModalById(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        if (modal.classList.contains('active')) return;

        if (modalStack.length === 0) {
            lockBodyScroll();
            pauseHeavyAnimations();
        }

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        modalStack.push(modalId);
    }

    function closeModalById(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        if (!modal.classList.contains('active')) return;

        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');

        const index = modalStack.indexOf(modalId);
        if (index > -1) modalStack.splice(index, 1);

        if (modalStack.length === 0) {
            requestAnimationFrame(() => {
                unlockBodyScroll();
                resumeHeavyAnimations();
            });
        }
    }

    // ========================================================
    // MODAL DE TRANSFERENCIA
    // ========================================================
    const transferButton = document.getElementById('transferButton');
    const transferModal = document.getElementById('transferModal');
    const closeModal = document.getElementById('closeModal');
    const backToMain = document.getElementById('backToMain');

    if (transferButton) {
        transferButton.addEventListener('click', () => openModalById('transferModal'));
    }
    if (closeModal) {
        closeModal.addEventListener('click', () => closeModalById('transferModal'));
    }
    if (backToMain) {
        backToMain.addEventListener('click', () => closeModalById('transferModal'));
    }
    if (transferModal) {
        transferModal.addEventListener('click', (e) => {
            if (e.target === transferModal) closeModalById('transferModal');
        });
    }

    // ========================================================
    // MODAL DE MENÚ
    // ========================================================
    const menuButton = document.getElementById('menuButton');
    const menuModal = document.getElementById('menuModal');
    const closeMenuModal = document.getElementById('closeMenuModal');

    if (menuButton) {
        menuButton.addEventListener('click', () => openModalById('menuModal'));
    }
    if (closeMenuModal) {
        closeMenuModal.addEventListener('click', () => closeModalById('menuModal'));
    }
    if (menuModal) {
        menuModal.addEventListener('click', (e) => {
            if (e.target === menuModal) closeModalById('menuModal');
        });
    }

    // ========================================================
    // MODAL DE PRODUCTOS
    // ========================================================
    const productsMainButton = document.getElementById('productsMainButton');
    const productsModal = document.getElementById('productsModal');
    const closeProductsModal = document.getElementById('closeProductsModal');
    const backFromProducts = document.getElementById('backFromProducts');

    if (productsMainButton) {
        productsMainButton.addEventListener('click', () => openModalById('productsModal'));
    }
    if (closeProductsModal) {
        closeProductsModal.addEventListener('click', () => closeModalById('productsModal'));
    }
    if (backFromProducts) {
        backFromProducts.addEventListener('click', () => closeModalById('productsModal'));
    }
    if (productsModal) {
        productsModal.addEventListener('click', (e) => {
            if (e.target === productsModal) closeModalById('productsModal');
        });
    }

    // ========================================================
    // MODAL DE SERVICIOS & PRECIOS
    // ========================================================
    const servicesButton = document.getElementById('servicesButton');
    const servicesModal = document.getElementById('servicesModal');
    const closeServicesModal = document.getElementById('closeServicesModal');
    const backFromServices = document.getElementById('backFromServices');

    if (servicesButton) {
        servicesButton.addEventListener('click', () => openModalById('servicesModal'));
    }
    if (closeServicesModal) {
        closeServicesModal.addEventListener('click', () => closeModalById('servicesModal'));
    }
    if (backFromServices) {
        backFromServices.addEventListener('click', () => closeModalById('servicesModal'));
    }
    if (servicesModal) {
        servicesModal.addEventListener('click', (e) => {
            if (e.target === servicesModal) closeModalById('servicesModal');
        });
    }

    // ========================================================
    // MODAL DE CLIENTES
    // ========================================================
    const clientsButton = document.getElementById('clientsButton');
    const clientsModal = document.getElementById('clientsModal');
    const closeClientsModal = document.getElementById('closeClientsModal');
    const backFromClients = document.getElementById('backFromClients');

    if (clientsButton) {
        clientsButton.addEventListener('click', () => openModalById('clientsModal'));
    }
    if (closeClientsModal) {
        closeClientsModal.addEventListener('click', () => closeModalById('clientsModal'));
    }
    if (backFromClients) {
        backFromClients.addEventListener('click', () => closeModalById('clientsModal'));
    }
    if (clientsModal) {
        clientsModal.addEventListener('click', (e) => {
            if (e.target === clientsModal) closeModalById('clientsModal');
        });
    }

    // ========================================================
    // CERRAR CON ESC
    // ========================================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalStack.length > 0) {
            const topModalId = modalStack[modalStack.length - 1];
            closeModalById(topModalId);
        }
    });

    // ========================================================
    // COPIAR TEXTO  (UNIVERSAL: Safari iOS, Chrome, Firefox, Android)
    // ========================================================

    function showFeedback(btn) {
        if (btn.classList.contains('copied')) return;

        const originalHTML = btn.innerHTML;
        const originalClass = btn.className;

        btn.innerHTML = '<i class="fas fa-check"></i> Copiado';
        btn.classList.add('copied');

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.className = originalClass;
        }, 3000);
    }

    // Detección robusta de iOS (incluye iPad moderno que se reporta como Mac)
    function isIOSDevice() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
               (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    }

    // Detección de Safari (incluye iOS y macOS)
    function isSafariBrowser() {
        const ua = navigator.userAgent;
        const isSafari = /^((?!chrome|android|crios|fxios|edgios).)*safari/i.test(ua);
        return isSafari || isIOSDevice();
    }

    /**
     * Copia usando un textarea temporal.
     * Esta es la forma MÁS compatible, funciona en todos los navegadores
     * incluyendo Safari iOS, siempre que se ejecute de forma SÍNCRONA
     * dentro del gesto del usuario (click).
     */
    function legacyCopy(text, button) {
        // Crear textarea
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.setAttribute('readonly', '');
        textArea.setAttribute('aria-hidden', 'true');

        // Estilos: en iOS el textarea debe ser VISIBLE (opacity > 0),
        // tener font-size >= 16px y NO tener pointer-events: none.
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = '0';
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.style.fontSize = '16px';
        textArea.style.opacity = '0.01';
        textArea.style.zIndex = '-1';

        document.body.appendChild(textArea);

        let success = false;

        try {
            if (isIOSDevice()) {
                // iOS: la forma correcta es focus() + setSelectionRange()
                textArea.focus();
                textArea.setSelectionRange(0, text.length);

                // Además, usar Range/Selection como refuerzo
                const range = document.createRange();
                range.selectNodeContents(textArea);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                textArea.setSelectionRange(0, text.length);
            } else {
                textArea.focus();
                textArea.select();
                textArea.setSelectionRange(0, text.length);
            }

            success = document.execCommand('copy');
        } catch (err) {
            console.warn('legacyCopy: execCommand falló:', err);
        }

        document.body.removeChild(textArea);

        if (success) {
            showFeedback(button);
            return true;
        }
        return false;
    }

    /**
     * Intenta con Clipboard API moderna. Solo funciona en contexto seguro
     * (HTTPS o localhost) y en navegadores modernos.
     */
    function modernCopy(text, button) {
        return new Promise((resolve) => {
            if (!navigator.clipboard || !navigator.clipboard.writeText) {
                resolve(false);
                return;
            }
            navigator.clipboard.writeText(text)
                .then(() => {
                    showFeedback(button);
                    resolve(true);
                })
                .catch((err) => {
                    console.warn('modernCopy: Clipboard API falló:', err);
                    resolve(false);
                });
        });
    }

    document.querySelectorAll('.copy-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const targetId = btn.getAttribute('data-copy');
            if (!targetId) {
                console.warn('Botón sin data-copy:', btn);
                return;
            }

            const textElement = document.getElementById(targetId);
            if (!textElement) {
                console.warn('No se encontró el elemento con id:', targetId);
                return;
            }

            const textToCopy = textElement.textContent.trim();
            if (!textToCopy) {
                console.warn('El elemento está vacío:', targetId);
                return;
            }

            // ============================================================
            // ESTRATEGIA UNIVERSAL:
            // 1. Intentar SIEMPRE primero legacyCopy (execCommand) porque es
            //    SÍNCRONO y ocurre dentro del gesto del usuario. Funciona en
            //    Safari iOS, Chrome, Firefox, Edge, Android, etc.
            // 2. Si legacyCopy falla, intentar modernCopy (Clipboard API)
            //    como respaldo para navegadores que bloquean execCommand.
            // ============================================================

            console.log('Intentando copiar:', textToCopy, '| iOS:', isIOSDevice(), '| Safari:', isSafariBrowser());

            if (legacyCopy(textToCopy, btn)) {
                console.log('✅ Copiado con legacyCopy (execCommand)');
                return;
            }

            console.warn('legacyCopy falló, intentando Clipboard API...');

            modernCopy(textToCopy, btn).then((ok) => {
                if (ok) {
                    console.log('✅ Copiado con Clipboard API');
                } else {
                    console.warn('❌ Todos los métodos fallaron. Mostrando prompt.');
                    window.prompt('Copia manualmente este texto:', textToCopy);
                }
            });
        });
    });

    // ========================================================
    console.log("✅ XoloTech - Perfil cargado correctamente");
    console.log("   Modales activos: menú, productos, servicios, clientes, transferencia");
    console.log("   Secure context:", window.isSecureContext);
    console.log("   Clipboard API disponible:", !!(navigator.clipboard && navigator.clipboard.writeText));
    console.log("   Es iOS:", isIOSDevice());
    console.log("   Es Safari:", isSafariBrowser());
});