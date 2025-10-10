// Validación y envío del formulario (lo dejo como estaba)
const form = document.getElementById('contacto');

form.addEventListener('submit', function(event) {
  const nombre = form.name.value.trim();  // Corregí para que use el name correcto
  const email = form.email.value.trim();

  function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (!nombre) {
    event.preventDefault();
    alert('Por favor, ingresa tu nombre.');
    form.name.focus();
    return;
  }

  if (!email || !validarEmail(email)) {
    event.preventDefault();
    alert('Por favor, ingresa un correo electrónico válido.');
    form.email.focus();
    return;
  }

  // Al pasar validaciones, se envía normalmente
  alert('¡Gracias! Tus datos han sido registrados con éxito.');
});

// Funcionalidad para desplegar explicación en servicios
const articles = document.querySelectorAll('#servicios article');

articles.forEach(article => {
  article.style.cursor = 'pointer';

  article.addEventListener('click', () => {
    const detalle = article.querySelector('.info-detalle');
    const toggleText = article.querySelector('.toggle-detalle');

    if (detalle) {
      detalle.classList.toggle('show');

      // Cambiar texto "Ver más..." / "Ver menos..."
      if (detalle.classList.contains('show')) {
        toggleText.textContent = 'Ver menos...';
      } else {
        toggleText.textContent = 'Ver más...';
      }
    }
  });
});

// Botón subir al inicio
const btnSubir = document.getElementById("btn-subir");

window.addEventListener("scroll", () => {
  btnSubir.style.display = window.scrollY > 300 ? "block" : "none";
});

btnSubir.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
