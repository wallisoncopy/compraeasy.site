
// Tab Navigation
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));
    
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked nav item
    const clickedItem = document.querySelector(`.nav-item[onclick="showTab('${tabName}')"]`);
    if (clickedItem) {
        clickedItem.classList.add('active');
    }
}

// Open external links
function openLink(url) {
    window.open(url, '_blank');
}

// Open checkout links
function openCheckout(url) {
    window.open(url, '_blank');
}

// Show specific category (for carousel cards)
function showCategory(category) {
    showTab('artes');
    
    // Update nav
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item:nth-child(2)').classList.add('active');
    
    // Scroll to relevant category if needed
    setTimeout(() => {
        const categoryElements = document.querySelectorAll('.category-item');
        categoryElements.forEach(el => {
            if (category === 'culto' && el.textContent.includes('Culto')) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                el.style.animation = 'pulse 2s';
            } else if (category === 'infantil' && el.textContent.includes('Infantil')) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                el.style.animation = 'pulse 2s';
            } else if (category === 'certificados' && (el.textContent.includes('Certificados') || el.textContent.includes('Placas'))) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                el.style.animation = 'pulse 2s';
            }
        });
    }, 300);
}

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// WhatsApp group functionality
document.addEventListener('DOMContentLoaded', function() {
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            // Replace with actual WhatsApp group link
            const whatsappLink = 'https://chat.whatsapp.com/your-group-invite-link';
            window.open(whatsappLink, '_blank');
        });
    }
});

// Smooth scrolling for carousel
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.classList.add('active');
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.classList.remove('active');
        });

        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.classList.remove('active');
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
    }
});

// Add loading states for buttons
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Carregando...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 1500);
}

// Add click handlers for bonus cards
document.addEventListener('DOMContentLoaded', function() {
    const bonusButtons = document.querySelectorAll('.bonus-card button');
    bonusButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            addLoadingState(this);
            // Here you can add specific functionality for each bonus item
            const bonusCard = event.target.parentElement;
            const bonusTitle = bonusCard.querySelector('h3');
            if (bonusTitle) {
                console.log('Bonus item clicked:', bonusTitle.textContent);
            }
        });
    });
});

// Login System
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple validation - accepts any email and password
    if (email && password) {
        // Store login state
        localStorage.setItem('idepack_logged_in', 'true');
        localStorage.setItem('idepack_user_email', email);
        
        // Show loading state
        const loginBtn = document.querySelector('.login-btn');
        const originalText = loginBtn.innerHTML;
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';
        loginBtn.disabled = true;
        
        // Simulate loading and transition to main app
        setTimeout(() => {
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('mainApp').style.display = 'block';
            document.getElementById('mainApp').style.animation = 'fadeIn 0.5s ease-in-out';
            
            // Welcome message with user email
            const welcomeMessage = document.querySelector('.welcome-message h2');
            if (welcomeMessage) {
                welcomeMessage.textContent = `Shalom ${email.split('@')[0]}! Você agora tem acesso ao IDE PACK 🎉`;
            }
            
            console.log('IDE PACK EDITÁVEIS - Login realizado com sucesso! 🎉');
        }, 1500);
    }
}

// Check if user is already logged in
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('idepack_logged_in');
    
    if (isLoggedIn === 'true') {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('mainApp').style.display = 'block';
        
        // Restore user email in welcome message
        const userEmail = localStorage.getItem('idepack_user_email');
        const welcomeMessage = document.querySelector('.welcome-message h2');
        if (welcomeMessage && userEmail) {
            welcomeMessage.textContent = `Shalom ${userEmail.split('@')[0]}! Você agora tem acesso ao IDE PACK 🎉`;
        }
    }
}

// Logout function
function logout() {
    localStorage.removeItem('idepack_logged_in');
    localStorage.removeItem('idepack_user_email');
    location.reload();
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Check login status first
    checkLoginStatus();
    
    console.log('IDE PACK EDITÁVEIS - App iniciado com sucesso! 🎉');
    
    // Show initial tab
    showTab('inicio');
    
    // Add smooth transitions
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});
