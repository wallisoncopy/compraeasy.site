// Smooth scroll to offers section
function scrollToOffers() {
    const offersSection = document.getElementById('offers');
    offersSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });

    // Add a subtle animation to highlight the offers
    offersSection.style.transform = 'scale(1.02)';
    setTimeout(() => {
        offersSection.style.transform = 'scale(1)';
    }, 300);
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });

    // Add click effects to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // FAQ click to expand (simple version)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.backgroundColor = this.style.backgroundColor === 'rgb(233, 236, 239)' ? '#f8f9fa' : '#e9ecef';
        });
    });
});

// FAQ Toggle Function with futuristic animations
function toggleFaq(element) {
    const isActive = element.classList.contains('active');

    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== element) {
            item.classList.remove('active');
            const icon = item.querySelector('.faq-icon');
            icon.textContent = '+';
        }
    });

    // Toggle current item
    if (isActive) {
        element.classList.remove('active');
        element.querySelector('.faq-icon').textContent = '+';
    } else {
        element.classList.add('active');
        element.querySelector('.faq-icon').textContent = '−';

        // Add a subtle vibration effect
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = 'faqPulse 0.6s ease-out';
        }, 10);
    }
}