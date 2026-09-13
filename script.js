const profile = {
    // --- IDENTIDAD ---
    name: "Síguenos en nuestras redes sociales",
    description: "Grupo de Ingenieros en Sistemas Computacionales Desarrollamos soluciones tecnológicas para impulsar tu negocio. ",

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
    let isModalClosing = false;

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
    // MODAL DE TRANSFERENCIA
    // ⚡ SIN bloquear el scroll del body — eso evita el
    //   "momentum" que consume los taps en móvil
    // ========================================================
    const transferButton = document.getElementById('transferButton');
    const modal = document.getElementById('transferModal');
    const closeModal = document.getElementById('closeModal');
    const backToMain = document.getElementById('backToMain');

    function openModal() {
        if (!modal) return;
        isModalClosing = false;

        // ⚡ Pausar animaciones y mostrar el modal
        pauseHeavyAnimations();
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');

        // ⚡ NO bloqueamos el scroll del body.
        // El modal tiene su propio scroll interno (max-height: 90vh + overflow-y: auto).
        // El fondo simplemente queda tapado visualmente por el overlay.
    }

    function closeModalFunc() {
        if (!modal || isModalClosing) return;
        if (!modal.classList.contains('active')) return;

        isModalClosing = true;

        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');

        // Reanudar animaciones en el siguiente frame
        requestAnimationFrame(() => {
            resumeHeavyAnimations();
            setTimeout(() => { isModalClosing = false; }, 150);
        });
    }

    // ---- ABRIR ----
    if (transferButton) {
        transferButton.addEventListener('click', openModal);
    }

    // ---- CERRAR: X ----
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }

    // ---- CERRAR: VOLVER ----
    if (backToMain) {
        backToMain.addEventListener('click', closeModalFunc);
    }

    // ---- CERRAR: click en overlay ----
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalFunc();
            }
        });
    }

    // ---- CERRAR: ESC ----
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModalFunc();
        }
    });

    // ========================================================
    // COPIAR TEXTO
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

    function fallbackCopy(text, button) {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.setAttribute('readonly', '');
            textArea.style.position = 'fixed';
            textArea.style.top = '0';
            textArea.style.left = '0';
            textArea.style.width = '1px';
            textArea.style.height = '1px';
            textArea.style.padding = '0';
            textArea.style.border = 'none';
            textArea.style.outline = 'none';
            textArea.style.boxShadow = 'none';
            textArea.style.background = 'transparent';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);

            if (navigator.userAgent.match(/ipad|iphone/i)) {
                const range = document.createRange();
                range.selectNodeContents(textArea);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                textArea.setSelectionRange(0, text.length);
            } else {
                textArea.select();
                textArea.setSelectionRange(0, text.length);
            }

            const success = document.execCommand('copy');
            requestAnimationFrame(() => {
                if (textArea.parentNode) textArea.parentNode.removeChild(textArea);
            });

            if (success) showFeedback(button);
        } catch (err) {
            console.warn('Error al copiar (fallback):', err);
        }
    }

    document.querySelectorAll('.copy-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const targetId = btn.getAttribute('data-copy');
            if (!targetId) return;
            const textElement = document.getElementById(targetId);
            if (!textElement) return;

            const textToCopy = textElement.textContent.trim();

            if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
                navigator.clipboard.writeText(textToCopy)
                    .then(() => showFeedback(btn))
                    .catch(() => fallbackCopy(textToCopy, btn));
            } else {
                fallbackCopy(textToCopy, btn);
            }
        });
    });

    // ========================================================
    console.log("✅ XoloTech - Perfil cargado correctamente (fondo con imagen)");
});