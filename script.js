
document.addEventListener('DOMContentLoaded', function() {
  // Animação para elementos iniciais
  const headline = document.querySelector('.headline');
  const subheadline = document.querySelector('.subheadline');
  const videoContainer = document.querySelector('.video-container');
  
  headline.style.opacity = '0';
  headline.style.transform = 'translateY(-20px)';
  subheadline.style.opacity = '0';
  subheadline.style.transform = 'translateY(-20px)';
  videoContainer.style.opacity = '0';
  
  // Rastreamento de eventos do Facebook Pixel
  // Rastrear clique nos botões de compra
  document.querySelectorAll('.pricing-button').forEach(button => {
    button.addEventListener('click', function() {
      if(typeof fbq === 'function') {
        fbq('track', 'InitiateCheckout');
      }
    });
  });
  
  // Rastrear visualização da seção de preços
  const pricingSection = document.querySelector('.pricing');
  if (pricingSection) {
    const pricingObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && typeof fbq === 'function') {
          fbq('track', 'ViewContent', {content_name: 'pricing_section'});
          pricingObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    pricingObserver.observe(pricingSection);
  }
  
  // Função de scroll suave
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Funcionalidade do FAQ
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
      const faqItem = this.parentElement;
      const answer = this.nextElementSibling;
      const toggle = this.querySelector('.faq-toggle i');
      
      // Fecha todos os outros itens
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem && item.classList.contains('active')) {
          item.classList.remove('active');
          item.querySelector('.faq-toggle i').className = 'fas fa-plus';
        }
      });
      
      // Abre ou fecha o item atual
      if (faqItem.classList.contains('active')) {
        faqItem.classList.remove('active');
        toggle.className = 'fas fa-plus';
      } else {
        faqItem.classList.add('active');
        toggle.className = 'fas fa-minus';
      }
    });
  });
  
  // Função para animar entrada de elementos quando visíveis
  const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  };
  
  // Observador de interseção para animações de scroll
  const observer = new IntersectionObserver(animateOnScroll, {
    threshold: 0.1
  });
  
  // Elementos a serem animados no scroll
  const sections = [
    '.examples',
    '.pack-info', 
    '.benefits', 
    '.for-who', 
    '.content-list',
    '.pricing', 
    '.guarantee', 
    '.faq',
    '.final-cta'
  ];
  
  sections.forEach(section => {
    const element = document.querySelector(section);
    if (element) {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      observer.observe(element);
    }
  });
  
  // Animação para os cards de benefícios
  const benefitCards = document.querySelectorAll('.benefit-card');
  benefitCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    cardObserver.observe(card);
  });
  
  // Animação para itens da lista de exemplos
  const exampleItems = document.querySelectorAll('.example-item');
  exampleItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.8)';
    
    const itemObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'scale(1)';
          }, index * 100);
          itemObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    itemObserver.observe(item);
  });
  
  // Animação inicial
  setTimeout(() => {
    headline.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    headline.style.opacity = '1';
    headline.style.transform = 'translateY(0)';
    
    setTimeout(() => {
      subheadline.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      subheadline.style.opacity = '1';
      subheadline.style.transform = 'translateY(0)';
      
      setTimeout(() => {
        videoContainer.style.transition = 'opacity 1.2s ease-out';
        videoContainer.style.opacity = '1';
      }, 400);
    }, 300);
  }, 300);
  
  // Rastrear cliques em exemplos de artes
  document.querySelectorAll('.example-item').forEach(item => {
    item.addEventListener('click', function() {
      if(typeof fbq === 'function') {
        fbq('track', 'ViewContent', {content_name: 'art_example'});
      }
    });
  });
  
  // Rastrear quando o usuário passa mais de 30 segundos na página
  setTimeout(() => {
    if(typeof fbq === 'function') {
      fbq('trackCustom', 'TimeOnPage30Seconds');
    }
  }, 30000);
  
  // Rastrear quando o usuário rola até o final da página
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    if (scrollPosition + windowHeight >= documentHeight - 200) {
      if(typeof fbq === 'function' && !window.scrolledToBottom) {
        window.scrolledToBottom = true;
        fbq('trackCustom', 'ReachedPageBottom');
      }
    }
  });
  
  // Rastrear quando o usuário sai da página
  window.addEventListener('beforeunload', function() {
    if(typeof fbq === 'function') {
      fbq('trackCustom', 'LeavePage');
    }
  });
});
