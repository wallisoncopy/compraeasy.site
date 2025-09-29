// Countdown Timer
let timeLeft = { minutes: 0, seconds: 5 };

function updateCountdown() {
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (minutesEl && secondsEl) {
        minutesEl.textContent = timeLeft.minutes.toString().padStart(2, '0');
        secondsEl.textContent = timeLeft.seconds.toString().padStart(2, '0');
    }
    
    if (timeLeft.seconds > 0) {
        timeLeft.seconds--;
    } else if (timeLeft.minutes > 0) {
        timeLeft.minutes--;
        timeLeft.seconds = 59;
    } else {
        // Reset countdown for demo purposes
        timeLeft = { minutes: 0, seconds: 5 };
    }
}

// Start countdown
setInterval(updateCountdown, 1000);
updateCountdown();

// Floating CTA Button
window.addEventListener('scroll', function() {
    const floatingCTA = document.getElementById('floatingCTA');
    if (floatingCTA) {
        if (window.pageYOffset > 200) {
            floatingCTA.style.display = 'block';
        } else {
            floatingCTA.style.display = 'none';
        }
    }
});

// Scroll to offers function
function scrollToOffers() {
    const offersSection = document.getElementById('ofertas');
    if (offersSection) {
        offersSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add click event to floating CTA
document.addEventListener('DOMContentLoaded', function() {
    const floatingCTA = document.getElementById('floatingCTA');
    if (floatingCTA) {
        floatingCTA.addEventListener('click', scrollToOffers);
    }
});

// FAQ Toggle
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = element.querySelector('i');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.querySelector('.faq-answer').classList.remove('active');
            item.querySelector('.faq-question').classList.remove('active');
        }
    });
    
    // Toggle current FAQ
    answer.classList.toggle('active');
    element.classList.toggle('active');
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
