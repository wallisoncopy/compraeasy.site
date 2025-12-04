// Countdown Timer
document.addEventListener('DOMContentLoaded', () => {
    let timeLeft = 305; // 5 min 5 sec
    const timerElement = document.getElementById('timer');

    setInterval(() => {
        timeLeft = timeLeft > 0 ? timeLeft - 1 : 305;
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        if (timerElement) {
            timerElement.innerText = `${minutes.toString().padStart(2, '0')} min : ${seconds.toString().padStart(2, '0')} seg`;
        }
    }, 1000);

    // FAQ Accordion
    const faqBtns = document.querySelectorAll('.faq-btn');

    faqBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('.faq-icon');
            
            // Toggle current item
            content.classList.toggle('hidden');
            content.classList.toggle('max-h-40');
            content.classList.toggle('py-4');
            content.classList.toggle('border-t');
            
            if (icon) {
                icon.classList.toggle('rotate-180');
            }
        });
    });
});