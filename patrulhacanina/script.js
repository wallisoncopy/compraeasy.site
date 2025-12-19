document.addEventListener('DOMContentLoaded', () => {

    // 1. DATA DINÂMICA NA BARRA DE OFERTA
    const dateSpan = document.getElementById('current-date');
    if (dateSpan) {
        const now = new Date();
        const options = { day: 'numeric', month: 'long' };
        dateSpan.textContent = now.toLocaleDateString('pt-BR', options).toUpperCase();
    }

    // 2. COUNTDOWN TIMER (10 MINUTOS)
    let time = 600; // 10 minutos em segundos
    const timerDisplay = document.getElementById('countdown-timer');

    function updateTimer() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        timerDisplay.textContent = `${minutes}:${seconds}`;
        if (time > 0) {
            time--;
        } else {
            time = 600; // Reinicia para manter a urgência
        }
    }
    setInterval(updateTimer, 1000);

    // 3. ANIMAÇÕES FADE-IN NO SCROLL
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // 4. FAQ ACCORDION
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;
            const isOpen = answer.style.display === 'block';
            
            // Fecha todos primeiro
            document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
            document.querySelectorAll('.faq-question span').forEach(s => s.textContent = '+');

            if (!isOpen) {
                answer.style.display = 'block';
                button.querySelector('span').textContent = '−';
            }
        });
    });

    // 5. NOTIFICAÇÕES DE COMPRA APROVADA (SIMULADAS)
    const names = [
        "Mariana S.", "Fernanda O.", "Cláudia R.", "Beatriz M.", "Juliana P.", 
        "Patrícia L.", "Camila V.", "Amanda T.", "Renata G.", "Larissa F.",
        "Simone D.", "Bruna E.", "Letícia C.", "Priscila A.", "Tatiana K."
    ];

    const notificationContainer = document.getElementById('notification-container');

    function showNotification() {
        const name = names[Math.floor(Math.random() * names.length)];
        const minutes = Math.floor(Math.random() * 5) + 1;
        
        const notification = document.createElement('div');
        notification.className = 'purchase-notification';
        notification.innerHTML = `
            <div style="background: #4CAF50; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold;">✓</div>
            <div>
                <p style="font-size: 0.8rem; font-weight: bold; margin: 0;">${name} acabou de comprar</p>
                <p style="font-size: 0.6rem; color: #666; margin: 0; text-transform: uppercase;">Aprovado via Pix há ${minutes} min</p>
            </div>
        `;

        notificationContainer.appendChild(notification);

        // Remove a notificação após 5 segundos
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-20px)';
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    }

    // Inicia o ciclo de notificações
    setTimeout(() => {
        showNotification();
        setInterval(showNotification, 12000); // Mostra a cada 12 segundos
    }, 3000);

    // 6. SMOOTH SCROLL PARA ÂNCORAS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

});