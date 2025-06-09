
function selectProduct(button) {
  const productCard = button.closest('.product-card');
  const url = productCard.dataset.url;
  const price = productCard.dataset.price;
  
  // Show loading modal
  const modal = document.getElementById('loadingModal');
  modal.style.display = 'flex';
  
  // Add some security delay to show professionalism
  setTimeout(() => {
    // Redirect to the secure payment page
    window.open(url, '_blank');
    
    // Hide modal after redirect
    setTimeout(() => {
      modal.style.display = 'none';
    }, 1000);
  }, 2000);
}

// Add smooth scrolling for better UX
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

// Add security badge animation
document.addEventListener('DOMContentLoaded', function() {
  const securityBadge = document.querySelector('.security-badge');
  if (securityBadge) {
    setInterval(() => {
      securityBadge.style.transform = 'scale(1.05)';
      setTimeout(() => {
        securityBadge.style.transform = 'scale(1)';
      }, 200);
    }, 3000);
  }
});

// Close modal if clicked outside
document.getElementById('loadingModal').addEventListener('click', function(e) {
  if (e.target === this) {
    this.style.display = 'none';
  }
});

// Add security indicators animation
document.addEventListener('DOMContentLoaded', function() {
  const indicators = document.querySelectorAll('.indicator');
  indicators.forEach((indicator, index) => {
    setTimeout(() => {
      indicator.style.opacity = '0';
      indicator.style.transform = 'translateY(20px)';
      indicator.style.transition = 'all 0.5s ease';
      
      setTimeout(() => {
        indicator.style.opacity = '1';
        indicator.style.transform = 'translateY(0)';
      }, 100);
    }, index * 200);
  });
});

// Add hover effects for product cards
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.borderColor = '#3498db';
  });
  
  card.addEventListener('mouseleave', function() {
    if (!this.classList.contains('featured')) {
      this.style.borderColor = '#ecf0f1';
    }
  });
});
