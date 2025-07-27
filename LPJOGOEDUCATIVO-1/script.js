// Landing Page Functions

// Inicialização da landing page
document.addEventListener('DOMContentLoaded', function() {
  // Animações e efeitos da landing page
  initializeLandingPage();
});

function initializeLandingPage() {
  // Configurar animações de entrada
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

  // Aplicar animação a elementos específicos
  const animatedElements = document.querySelectorAll('.benefit, .testimonial, .plan, .stat');
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
}

// Função para scroll suave até as ofertas
function scrollToOffers() {
  const offersSection = document.getElementById('offers');
  offersSection.scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
}

// Função para scroll suave até o checkout
function scrollToCheckout() {
  const checkoutSection = document.getElementById('checkout');
  checkoutSection.scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
}

// Adicionar efeitos visuais aos botões
document.addEventListener('DOMContentLoaded', function() {
  // Efeito de hover nos cards de benefícios
  const benefits = document.querySelectorAll('.benefit');
  benefits.forEach(benefit => {
    benefit.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });

    benefit.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Efeito de clique no vídeo placeholder
  const videoPlaceholder = document.querySelector('.video-placeholder');
  if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', function() {
      alert('Aqui seria reproduzido o vídeo explicativo do app! 🎥');
    });
  }

  // Animação de entrada dos elementos quando ficam visíveis
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

  // Aplicar animação a elementos específicos
  const animatedElements = document.querySelectorAll('.benefit, .testimonial, .plan');
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });

  // Efeito especial no botão final
  const finalButton = document.querySelector('.final-cta-button');
  if (finalButton) {
    finalButton.addEventListener('click', function() {
      // Aqui seria redirecionado para o checkout real
      alert('Redirecionando para o checkout... 🚀\n\nEm um app real, aqui seria integrado o sistema de pagamento!');
    });
  }

  // Efeitos nos botões de planos
  const planButtons = document.querySelectorAll('.plan-button');
  planButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Adicionar efeito visual de seleção
      this.style.background = '#2f855a';
      this.innerHTML = '✓ Selecionado!';

      setTimeout(() => {
        scrollToCheckout();
      }, 500);

      setTimeout(() => {
        this.style.background = '#48bb78';
        if (this.closest('.basic')) {
          this.innerHTML = 'Quero esse';
        } else {
          this.innerHTML = 'Quero o completo';
        }
      }, 2000);
    });
  });
});

// Efeito parallax sutil no hero
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector('.hero');
  const speed = scrolled * 0.5;

  if (parallax) {
    parallax.style.transform = `translateY(${speed}px)`;
  }
});

// Função para adicionar classe active aos elementos visíveis
function handleScrollAnimation() {
  const elements = document.querySelectorAll('.benefit, .testimonial, .plan');

  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('animate');
    }
  });
}

window.addEventListener('scroll', handleScrollAnimation);

// Função para toggle do FAQ
function toggleFAQ(questionElement) {
  const faqItem = questionElement.parentNode;
  const answer = faqItem.querySelector('.faq-answer');
  const toggle = questionElement.querySelector('.faq-toggle');
  
  // Fechar outros FAQs abertos
  document.querySelectorAll('.faq-item.active').forEach(item => {
    if (item !== faqItem) {
      item.classList.remove('active');
    }
  });
  
  // Toggle do FAQ atual
  faqItem.classList.toggle('active');
}

// Smooth scroll para todos os links âncora
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