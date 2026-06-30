function toggleCard(element) {
    const isActive = element.classList.contains('active');
    
    document.querySelectorAll('.item').forEach(item => {
        item.classList.remove('active');
    });
    if (!isActive) {
        element.classList.add('active');
        
        setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    console.log("Nivvux System: Visual Mode Active /_");
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.length > 0) {
                if (input.checkValidity()) {
                    input.style.borderColor = "#00ff41"; 
                } else {
                    input.style.borderColor = "#ff0033"; 
                }
            } else {
                input.style.borderColor = "#333";
            }
        });
    });
});
