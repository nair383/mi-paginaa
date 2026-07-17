document.addEventListener("DOMContentLoaded", () => {
    // 1. Mensaje de consola
    console.log("🔥 Web de Barbería Genérica cargada con animaciones optimizadas.");

    // 2. Control de Header al hacer Scroll
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 30) {
            header.style.padding = "8px 5%";
            header.style.backgroundColor = "rgba(10, 10, 10, 0.95)";
            header.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.8)";
        } else {
            header.style.padding = "15px 5%";
            header.style.backgroundColor = "rgba(10, 10, 10, 0.80)";
            header.style.boxShadow = "none";
        }
    }, { passive: true });

    // 3. Resaltar enlace activo en el menú
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 180) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    }, { passive: true });

    // 4. --- EFECTO REVEAL DINÁMICO ---
    const elementosReveal = document.querySelectorAll('.reveal');
    
    const opcionesObserver = {
        root: null,
        threshold: 0.03,
        rootMargin: "0px 0px -20px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    entry.target.classList.add('active');
                });
                observer.unobserve(entry.target);
            }
        });
    }, opcionesObserver);

    elementosReveal.forEach(elemento => {
        observer.observe(elemento);
    });

    // 5. --- EFECTO PARALLAX ---
    const heroContent = document.querySelector('.hero-content');
    if (window.innerWidth > 768 && heroContent) {
        window.addEventListener('scroll', () => {
            let scrollValue = window.scrollY;
            if (scrollValue < window.innerHeight) {
                heroContent.style.transform = `translate3d(0, ${scrollValue * 0.15}px, 0)`;
                heroContent.style.opacity = Math.max(0, 1 - (scrollValue / (window.innerHeight * 0.7)));
            }
        }, { passive: true });
    }
});

// ==========================================================================
// Widget de Cotización Interactivo
// ==========================================================================
const checkboxes = document.querySelectorAll('.servicio-check');
const totalSpan = document.getElementById('precio-total');
const btnAgendar = document.getElementById('btn-agendar-cotizacion');
const mensajeAhorro = document.getElementById('mensaje-ahorro');

let estaCambiandoProgramaticamente = false;

// Número de WhatsApp dinámico de la plantilla
const NUMERO_WHATSAPP = "56912345678"; 

function calcularTotal(e) {
    if (estaCambiandoProgramaticamente) return;

    let total = 0;
    let serviciosSeleccionados = [];
    let seleccionadosIds = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            seleccionadosIds.push(checkbox.dataset.id);
        }
    });

    const tieneCorte = seleccionadosIds.includes('corte');
    const tieneBarba = seleccionadosIds.includes('barba');
    const tieneCombo = seleccionadosIds.includes('combo');

    if (e && e.target.dataset.id === 'combo' && tieneCombo) {
        estaCambiandoProgramaticamente = true;
        checkboxes.forEach(cb => {
            if (cb.dataset.id === 'corte' || cb.dataset.id === 'barba') cb.checked = false;
        });
        estaCambiandoProgramaticamente = false;
    } 
    else if (e && (e.target.dataset.id === 'corte' || e.target.dataset.id === 'barba') && tieneCombo) {
        estaCambiandoProgramaticamente = true;
        checkboxes.forEach(cb => {
            if (cb.dataset.id === 'combo') cb.checked = false;
        });
        estaCambiandoProgramaticamente = false;
    }

    serviciosSeleccionados = [];
    seleccionadosIds = [];
    total = 0;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            seleccionadosIds.push(checkbox.dataset.id);
            total += parseInt(checkbox.dataset.precio);
            serviciosSeleccionados.push(checkbox.dataset.nombre);
        }
    });

    if (seleccionadosIds.includes('corte') && seleccionadosIds.includes('barba')) {
        total = 15000; 
        mensajeAhorro.style.display = 'block';
        serviciosSeleccionados = ["Combo Completo (Corte + Barba Especial)"];
    } else {
        mensajeAhorro.style.display = 'none';
    }

    totalSpan.textContent = `$${total.toLocaleString('es-CL')}`;

    if (total > 0) {
        btnAgendar.style.display = 'inline-block';
        const mensaje = encodeURIComponent(`Hola, me gustaría agendar una hora para: ${serviciosSeleccionados.join(' + ')}. Total estimado: $${total.toLocaleString('es-CL')}`);
        btnAgendar.setAttribute('href', `https://wa.me/${NUMERO_WHATSAPP}?text=${mensaje}`);
    } else {
        btnAgendar.style.display = 'none';
        btnAgendar.removeAttribute('href');
    }
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => calcularTotal(e));
});

// ==========================================================================
// Widget de Estado Abierto/Cerrado
// ==========================================================================
function actualizarEstadoBarberia() {
    const estadoWidget = document.getElementById('estado-local');
    if (!estadoWidget) return;

    const options = { timeZone: 'America/Santiago', hour: 'numeric', minute: 'numeric', hour12: false, weekday: 'long' };
    const formatter = new Intl.DateTimeFormat('es-CL', options);
    const partes = formatter.formatToParts(new Date());

    let hora = 0;
    let dia = '';

    partes.forEach(part => {
        if (part.type === 'hour') hora = parseInt(part.value);
        if (part.type === 'weekday') dia = part.value.toLowerCase();
    });

    const diaLimpio = dia.normalize("NFD").replace(/[̀-ͯ]/g, "");

    const diasAbiertos = ['martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    const esDiaAbierto = diasAbiertos.includes(diaLimpio);
    const esHoraAbierta = (hora >= 10 && hora < 20);

    if (esDiaAbierto && esHoraAbierta) {
        estadoWidget.innerHTML = `<span class="badge-abierto">🟢 Abierto Ahora</span>`;
    } else {
        estadoWidget.innerHTML = `<span class="badge-cerrado">🔴 Cerrado por ahora</span>`;
    }
}
actualizarEstadoBarberia();
setInterval(actualizarEstadoBarberia, 60000);