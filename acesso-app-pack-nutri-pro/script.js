
// Login System
document.addEventListener('DOMContentLoaded', function() {
    const loginScreen = document.getElementById('loginScreen');
    const mainApp = document.getElementById('mainApp');
    const loginForm = document.getElementById('loginForm');
    
    // Check if user is already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showMainApp();
    }
    
    // Handle login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simple validation - accept any email and password
        if (email && password) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            showMainApp();
        }
    });
    
    function showMainApp() {
        loginScreen.style.display = 'none';
        mainApp.style.display = 'flex';
        initializeTabNavigation();
    }
    
    function initializeTabNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        const tabContents = document.querySelectorAll('.tab-content');
        
        // Handle tab switching
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Remove active class from all nav items and tab contents
                navItems.forEach(nav => nav.classList.remove('active'));
                tabContents.forEach(tab => tab.classList.remove('active'));
                
                // Add active class to clicked nav item and corresponding tab
                this.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
                
                // Scroll to top of content
                document.querySelector('.content').scrollTop = 0;
            });
        });
        
        // Add smooth scroll behavior for better UX
        const content = document.querySelector('.content');
        if (content) {
            content.style.scrollBehavior = 'smooth';
        }
        
        // Add click animation to buttons
        const buttons = document.querySelectorAll('.btn-primary');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
        
        // Add hover effects for cards on touch devices
        const cards = document.querySelectorAll('.card, .material-card');
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-4px)';
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
            });
        });
    }
});

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    location.reload();
}

// Simple haptic feedback for mobile devices (if supported)
function addHapticFeedback() {
    if ('vibrate' in navigator) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navigator.vibrate(50);
            });
        });
    }
}

// Initialize haptic feedback
addHapticFeedback();

// Handle orientation changes for better mobile experience
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
});

// Add loading animation (optional enhancement)
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add click tracking for material buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('material-button')) {
        // Add click animation
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 150);
    }
});
