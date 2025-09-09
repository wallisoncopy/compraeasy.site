// Countdown Timer Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set countdown for 5 minutes from now
    let countdownTime = 5 * 60; // 5 minutes in seconds
    
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    function updateCountdown() {
        const minutes = Math.floor(countdownTime / 60);
        const seconds = countdownTime % 60;
        
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        if (countdownTime > 0) {
            countdownTime--;
        } else {
            // Reset countdown when it reaches zero
            countdownTime = 5 * 60;
        }
    }
    
    // Update countdown every second
    updateCountdown(); // Initial call
    setInterval(updateCountdown, 1000);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add click tracking for CTA buttons (you can replace with your analytics)
    document.querySelectorAll('.mega-cta-button, .plan-button, .final-cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Here you can add analytics tracking
            console.log('CTA clicked:', this.textContent.trim());
        });
    });
    
    // Intersection Observer for fade-in animations
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
    
    // Add fade-in animation to sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Mobile menu toggle (if needed for future enhancements)
    let isMenuOpen = false;
    
    // Image loading functionality removed - now using Canva iframes
    
    // Add pulse effect to CTA buttons on scroll
    const ctaButtons = document.querySelectorAll('.pulse');
    const pulseObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            } else {
                entry.target.style.animationPlayState = 'paused';
            }
        });
    });
    
    ctaButtons.forEach(button => {
        pulseObserver.observe(button);
    });
});

// FAQ Toggle Function
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('i');
    
    // Toggle active class
    answer.classList.toggle('active');
    
    // Rotate icon
    if (answer.classList.contains('active')) {
        icon.style.transform = 'rotate(180deg)';
    } else {
        icon.style.transform = 'rotate(0deg)';
    }
}