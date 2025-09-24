const form = document.getElementById('contacto');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();

    function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    if (!nombre) {
    alert('Por favor, ingresa tu nombre.');
    form.nombre.focus();
    return;
    }

    if (!email || !validarEmail(email)) {
    alert('Por favor, ingresa un correo electrónico válido.');
    form.email.focus();
    return;
    }

    alert('¡Gracias! Tus datos han sido registrados con éxito.');

  // Limpiar manualmente los campos del formulario
    form.nombre.value = '';
    form.email.value = '';
    form.mensaje.value = '';
});
// Seleccionamos todos los artículos dentro de sección de servicios
const articles = document.querySelectorAll('section > article');

articles.forEach(article => {
  article.style.cursor = 'pointer';  // Indicamos que es clickable

    article.addEventListener('click', () => {
    const detalle = article.querySelector('.info-detalle');

    if (detalle) {
      detalle.classList.toggle('show');  // Mostramos o ocultamos al click
    }
    });
});

const btnSubir = document.getElementById("btn-subir");

window.addEventListener("scroll", () => {
  btnSubir.style.display = window.scrollY > 300 ? "block" : "none";
});

btnSubir.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
