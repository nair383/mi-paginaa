// Efecto scroll header
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = "20px 8%";
        header.style.background = "rgba(10, 10, 10, 0.95)";
    } else {
        header.style.padding = "30px 8%";
        header.style.background = "rgba(10, 10, 10, 0.8)";
    }
});

// Revelar elementos al hacer scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.style.opacity = 1;
    });
});

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = 0;
    card.style.transition = "opacity 1s ease";
    observer.observe(card);
});
