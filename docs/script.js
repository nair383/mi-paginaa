// --- 1. CONFIGURACIÓN DE PARTÍCULAS DE FONDO ---
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#ffffff" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.25, "random": false },
        "size": { "value": 2, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.15, "width": 1 },
        "move": { "enable": true, "speed": 1, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": { "onhover": { "enable": false }, "onclick": { "enable": false }, "resize": true }
    },
    "retina_detect": true
});

// --- 2. CILINDRO 3D CON RENDIMIENTO FLUIDO (60 FPS) ---
const cilindroWrapper = document.getElementById('cilindro');
const menuItems = document.querySelectorAll('.menu-item');
const totalItems = menuItems.length;

const radioBase = 270; 
let anguloActual = 0;
let anguloObjetivo = 0;
const anguloSalto = 360 / totalItems;
let animacionId = null;

function renderizarCilindro() {
    // Interpolación lineal (Lerp) para un desplazamiento suave hacia el objetivo
    anguloActual += (anguloObjetivo - anguloActual) * 0.18;

    cilindroWrapper.style.transform = `rotateY(${anguloActual}deg)`;

    menuItems.forEach((item, index) => {
        let anguloItem = (index * anguloSalto) + anguloActual;
        let anguloNormalizado = ((anguloItem % 360) + 540) % 360 - 180;
        let factorProximidad = Math.cos(anguloNormalizado * (Math.PI / 180));
        
        let escalaX = 0.85 + (factorProximidad * 0.15); 
        let escalaY = 0.80 + (factorProximidad * 0.20); 
        let curvaturaBordes = anguloNormalizado * 0.35; 

        item.style.transform = `
            rotateY(${index * anguloSalto}deg) 
            translateZ(${radioBase}px) 
            scaleX(${escalaX}) 
            scaleY(${escalaY}) 
            skewY(${curvaturaBordes}deg)
        `;

        let radioEsquinaIzq = 14 + (anguloNormalizado > 0 ? anguloNormalizado * 0.08 : 0);
        let radioEsquinaDer = 14 + (anguloNormalizado < 0 ? -anguloNormalizado * 0.08 : 0);
        item.style.borderRadius = `${radioEsquinaIzq}px ${radioEsquinaDer}px ${radioEsquinaDer}px ${radioEsquinaIzq}px`;

        item.style.opacity = Math.max(0.15, factorProximidad * 0.85 + 0.15);
    });

    actualizarItemActivo();

    if (Math.abs(anguloObjetivo - anguloActual) > 0.01) {
        animacionId = requestAnimationFrame(renderizarCilindro);
    } else {
        animacionId = null;
    }
}

function actualizarItemActivo() {
    let indexActivo = 0;
    let menorDistancia = 360;

    menuItems.forEach((item, index) => {
        let anguloItem = (index * anguloSalto) + anguloActual;
        let anguloNormalizado = Math.abs(((anguloItem % 360) + 540) % 360 - 180);
        
        if (anguloNormalizado < menorDistancia) {
            menorDistancia = anguloNormalizado;
            indexActivo = index;
        }
    });

    menuItems.forEach((item, index) => {
        if (index === indexActivo) {
            item.classList.add('activo');
        } else {
            item.classList.remove('activo');
        }
    });
}

// Inicializar posición
renderizarCilindro();

// --- 3. MANEJO DE SCROLL POR PASOS (UN TOQUE = UNA OPCIÓN) ---
// --- 3. MANEJO DE SCROLL ADAPTADO PARA MOUSE Y TRACKPAD DE NOTEBOOK ---
let acumuladorDelta = 0;
const umbralSensibilidad = 40; // Controla cuánta resistencia ofrece el trackpad para dar un paso

window.addEventListener('wheel', (event) => {
    event.preventDefault();

    // Acumulamos el movimiento para soportar tanto saltos de mouse como el scroll inercial suave de notebook
    acumuladorDelta += event.deltaY;

    if (Math.abs(acumuladorDelta) >= umbralSensibilidad) {
        if (acumuladorDelta > 0) {
            anguloObjetivo -= anguloSalto; // Gira hacia abajo / derecha
        } else {
            anguloObjetivo += anguloSalto; // Gira hacia arriba / izquierda
        }

        // Reiniciamos el acumulador para el siguiente gesto
        acumuladorDelta = 0;

        if (!animacionId) {
            animacionId = requestAnimationFrame(renderizarCilindro);
        }
    }
}, { passive: false });
// --- FUNCIONES PARA ABRIR Y CERRAR LA VENTANA FLOTANTE DE EXPERTISE ---
function abrirExpertise(event) {
    if (event) event.preventDefault();
    const modal = document.getElementById('expertise-modal');
    if (modal) {
        modal.classList.add('activo');
    }
}

function cerrarExpertise() {
    const modal = document.getElementById('expertise-modal');
    if (modal) {
        modal.classList.remove('activo');
    }
}

// Opcional: Cerrar el modal haciendo clic fuera de la caja de contenido
window.addEventListener('click', (event) => {
    const modal = document.getElementById('expertise-modal');
    if (event.target === modal) {
        cerrarExpertise();
    }
});
// --- 4. CONTROL DE ACORDEONES ---
function toggleAccordion(button) {
    const item = button.parentElement;
    const isActive = item.classList.contains('activo');

    // Opcional: cerrar los demás si quieres que solo uno esté abierto a la vez
    // document.querySelectorAll('.accordion-item').forEach(el => el.classList.remove('activo'));

    if (!isActive) {
        item.classList.add('activo');
    } else {
        item.classList.remove('activo');
    }
}
// --- 5. VALIDACIÓN Y FEEDBACK DINÁMICO PARA EL FORMULARIO DE CONTACTO ---
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulación de envío exitoso con feedback visual interactivo
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando mensaje...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = '¡Mensaje Enviado con Éxito! ✓';
                submitBtn.style.background = '#25d366';
                submitBtn.style.color = '#ffffff';
                
                // Limpiar formulario tras unos segundos
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '#00ffcc';
                    submitBtn.style.color = '#0d0d0d';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1200);
        });
    }
});

// --- 6. EFECTO DE APARICIÓN SUAVE (FADE-IN) AL HACER SCROLL ---
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .accordion-item, .hero-info-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// --- 7. CIERRE DE MODAL CON TECLA ESCAPE ---
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        cerrarExpertise();
    }
});