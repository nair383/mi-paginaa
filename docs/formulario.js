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
    console.log("Nivvux System Online /_");

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

    const form = document.getElementById('contacto');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const button = form.querySelector('.submit-btn');
            const originalText = button.innerText;
            
            button.innerText = "ENVIANDO_PAQUETES...";
            button.disabled = true;
            button.style.backgroundColor = "#111";
            button.style.color = "#fff";

            const data = new FormData(form);
            
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    button.innerText = "SOLICITUD RECIBIDA [OK]";
                    button.style.backgroundColor = "#00ff41";
                    button.style.color = "#000";
                    form.reset();
                    
                    inputs.forEach(i => i.style.borderColor = "#333");

                    setTimeout(() => {
                        button.innerText = originalText;
                        button.style.backgroundColor = "#fff";
                        button.style.color = "#000";
                        button.disabled = false;
                    }, 5000);

                } else {
                    throw new Error("Error en servidor");
                }
            } catch (error) {
                button.innerText = "ERROR_DE_CONEXIÓN [!]";
                button.style.backgroundColor = "#ff0033";
                button.style.color = "#fff";
                
                setTimeout(() => {
                    button.innerText = originalText;
                    button.disabled = false;
                    button.style.backgroundColor = "#fff";
                    button.style.color = "#000";
                }, 3000);
            }
        });
    }
}); 
