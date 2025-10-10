const form = document.getElementById('contacto');

form.addEventListener('submit', function(event) {
  const nombre = form.nombre.value.trim();
  const email = form.email.value.trim();

  function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Validaciones
  if (!nombre) {
    event.preventDefault(); // Solo prevenimos si hay error
    alert('Por favor, ingresa tu nombre.');
    form.nombre.focus();
    return;
  }

  if (!email || !validarEmail(email)) {
    event.preventDefault(); // Solo prevenimos si hay error
    alert('Por favor, ingresa un correo electrónico válido.');
    form.email.focus();
    return;
  }

  // Si pasa las validaciones, se enviará normalmente a Formspree

  // Mostrar alerta de éxito (opcional)
  alert('¡Gracias! Tus datos han sido registrados con éxito.');
  
  // NOTA: No ponemos event.preventDefault() aquí, para que se envíe

  // Opcional: limpiar los campos después de enviar (pero esto puede no ser necesario si se redirige)
  // form.reset();
});

// --- Resto de tu código sigue igual ---

const articles = document.querySelectorAll('section > article');

articles.forEach(article => {
  article.style.cursor = 'pointer';

  article.addEventListener('click', () => {
    const detalle = article.querySelector('.info-detalle');

    if (detalle) {
      detalle.classList.toggle('show');
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
