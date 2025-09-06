
let currentPage = 0;
let userName = '';
let answers = {};
const totalQuestions = 15;

const pages = [
    'page-start',
    'page-name',
    'page-q1', 'page-q2', 'page-q3', 'page-q4', 'page-q5', 'page-q6',
    'page-q7', 'page-q8', 'page-q9', 'page-q10', 'page-q11', 'page-q12',
    'page-q13', 'page-q14', 'page-q15',
    'page-hacker-tool',
    'page-result'
];

function updateProgressBar() {
    const progress = (currentPage / (pages.length - 1)) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

function showPage(pageIndex) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show current page
    document.getElementById(pages[pageIndex]).classList.add('active');
    
    updateProgressBar();
}

function nextPage() {
    if (currentPage < pages.length - 1) {
        currentPage++;
        showPage(currentPage);
    }
}

function saveName() {
    const nameInput = document.getElementById('userName');
    userName = nameInput.value.trim();
    
    if (userName === '') {
        alert('Por favor, digite seu nome para continuar.');
        return;
    }
    
    nextPage();
}

function answer(questionId, answerValue) {
    answers[questionId] = answerValue;
    
    // Add animation to the clicked button
    event.target.style.transform = 'scale(0.95)';
    event.target.style.background = 'rgba(255, 107, 107, 0.4)';
    
    setTimeout(() => {
        nextPage();
        
        // If this was the last question, go to hacker tool page
        if (questionId === 'q15') {
            // Go to hacker tool page
        } else if (currentPage === pages.length - 1) {
            showResults();
        }
    }, 300);
}

function showResults() {
    // Update all name placeholders in the result page
    document.getElementById('resultName').textContent = userName;
    document.getElementById('resultName2').textContent = userName;
    document.getElementById('resultName3').textContent = userName;
    document.getElementById('resultName4').textContent = userName;
    document.getElementById('resultName5').textContent = userName;
    document.getElementById('resultName6').textContent = userName;
}

function toggleFaq(faqNumber) {
    const faqAnswer = document.getElementById(`faq-${faqNumber}`);
    const faqQuestion = event.target;
    
    // Close all other FAQs
    document.querySelectorAll('.faq-answer').forEach(answer => {
        if (answer !== faqAnswer) {
            answer.classList.remove('active');
        }
    });
    
    document.querySelectorAll('.faq-question').forEach(question => {
        if (question !== faqQuestion) {
            question.classList.remove('active');
        }
    });
    
    // Toggle current FAQ
    faqAnswer.classList.toggle('active');
    faqQuestion.classList.toggle('active');
}

// Initialize the quiz
document.addEventListener('DOMContentLoaded', function() {
    showPage(0);
    
    // Add smooth scrolling for mobile
    document.body.style.scrollBehavior = 'smooth';
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && currentPage === 0) {
            nextPage();
        }
    });
    
    // Add loading animations
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && currentPage < pages.length - 1) {
            // Swipe left - next page (only for start page)
            if (currentPage === 0) {
                nextPage();
            }
        }
    }
}

// Add visual feedback for interactions
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-primary') || 
        e.target.classList.contains('btn-answer') || 
        e.target.classList.contains('btn-cta')) {
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = (e.offsetX - 10) + 'px';
        ripple.style.top = (e.offsetY - 10) + 'px';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        
        e.target.style.position = 'relative';
        e.target.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add CSS animation for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
