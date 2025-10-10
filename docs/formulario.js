// Funcionalidad para desplegar explicación en servicios
const articles = document.querySelectorAll('#servicios article');

articles.forEach(article => {
  const toggleText = article.querySelector('.toggle-detalle');
  const detalle = article.querySelector('.info-detalle');

  if (toggleText && detalle) {
    toggleText.style.cursor = 'pointer';

    toggleText.addEventListener('click', () => {
      detalle.classList.toggle('show');
      if (detalle.classList.contains('show')) {
        toggleText.textContent = 'Ver menos...';
      } else {
        toggleText.textContent = 'Ver más...';
      }
    });
  }
});
