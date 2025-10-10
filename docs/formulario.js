// Validación del formulario
const form = document.getElementById('contacto');

form.addEventListener('submit', function(event) {
  const nombre = form.nombre.value.trim();
  const email = form.email.value.trim();

  function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (!nombre) {
    event.preventDefault();
    alert('Por favor, ingresa tu nombre.');
    form.nombre.focus();
    return;
  }

  if (!email || !validarEmail(email)) {
    event.preventDefault();
    alert('Por favor, ingresa un correo electrónico válido.');
    form.email.focus();
    return;
  }

  alert('¡Gracias! Tus datos han sido registrados con éxito.');
  // No usamos event.preventDefault() aquí para que el formulario se envíe
});


// Botón de "subir"
const btnSubir = document.getElementById("btn-subir");

window.addEventListener("scroll", () => {
  btnSubir.style.display = window.scrollY > 300 ? "block" : "none";
});

btnSubir.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// Mostrar / ocultar detalles de los servicios
document.querySelectorAll('.toggle-detalle').forEach(toggle => {
  toggle.style.cursor = 'pointer';

  toggle.addEventListener('click', (event) => {
    event.stopPropagation(); // Evita conflictos con otros listeners

    const detalle = toggle.nextElementSibling;

    if (detalle && detalle.classList.contains('info-detalle')) {
      detalle.classList.toggle('show');

      // Cambiar el texto del toggle
      toggle.textContent = detalle.classList.contains('show')
        ? 'Ver menos...'
        : 'Ver más...';
    }
  });
});
