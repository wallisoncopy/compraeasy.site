
document.addEventListener('DOMContentLoaded', function() {
  // Configuração do vídeo com botão de play
  const videoPlayer = document.getElementById('video-player');
  const playButton = document.getElementById('play-button');
  
  if (videoPlayer && playButton) {
    // Configurar som e loop
    videoPlayer.muted = false;
    videoPlayer.loop = true;
    
    // Adicionar evento de clique ao botão de play
    playButton.addEventListener('click', function() {
      // Iniciar reprodução do vídeo com som
      videoPlayer.play().then(() => {
        // Esconder o botão de play quando o vídeo começar
        playButton.style.display = 'none';
      }).catch(e => {
        console.log("Reprodução com som foi impedida:", e);
        // Se falhar, tentar com mudo e depois habilitar o som
        videoPlayer.muted = true;
        videoPlayer.play();
        playButton.style.display = 'none';
        
        // Adicionar evento para habilitar o som após a primeira interação
        document.addEventListener('click', function enableSound() {
          videoPlayer.muted = false;
          document.removeEventListener('click', enableSound);
        }, { once: true });
      });
    });
    
    // Mostrar o botão de play novamente quando o vídeo terminar
    videoPlayer.addEventListener('ended', function() {
      if (playButton) {
        playButton.style.display = 'flex';
      }
    });
  }
  
  // Botões de compra com efeito de pulsação
  const buyButton = document.getElementById('buy-button');
  const finalBuyButton = document.getElementById('scroll-to-offers');
  const basicPlanButton = document.getElementById('basic-plan-button');
  const premiumPlanButton = document.getElementById('premium-plan-button');
  
  // Adiciona efeito de pulsação aos botões
  function pulseAnimation(button) {
    if (button) {
      button.classList.add('pulse');
      setTimeout(() => {
        button.classList.remove('pulse');
      }, 1000);
    }
  }
  
  // Executa a pulsação a cada 3 segundos para botões principais
  if (buyButton) setInterval(() => pulseAnimation(buyButton), 3000);
  if (premiumPlanButton) setInterval(() => pulseAnimation(premiumPlanButton), 3000);
  
  // Ação do botão principal - rolar até ofertas
  if (finalBuyButton) {
    finalBuyButton.addEventListener('click', function() {
      document.getElementById('offers').scrollIntoView({ behavior: 'smooth' });
    });
  }
  
  // Ação do botão inicial - rolar até ofertas
  if (buyButton) {
    buyButton.addEventListener('click', function() {
      document.getElementById('offers').scrollIntoView({ behavior: 'smooth' });
    });
  }
  
  // Ação dos botões de planos - agora são links, não precisam de event listeners para redirect
  // Mas adicionamos eventos para rastrear com o Facebook Pixel
  const buyAction = function(plan) {
    return function(e) {
      // Rastreamento do Facebook Pixel
      fbq('track', 'InitiateCheckout', {
        content_name: `Plano ${plan}`,
        value: plan === 'basico' ? 10.00 : 27.00,
        currency: 'BRL'
      });
    };
  };
  
  if (basicPlanButton) basicPlanButton.addEventListener('click', buyAction('basico'));
  if (premiumPlanButton) premiumPlanButton.addEventListener('click', buyAction('premium'));
  
  // Função para atualizar o URL do vídeo
  function updateVideoUrl(videoUrl) {
    const videoPlayer = document.getElementById('video-player');
    if (videoPlayer) {
      videoPlayer.src = videoUrl;
    }
  }
  
  // Use esta função quando tiver o link do vídeo
  // Por exemplo: updateVideoUrl('https://www.youtube.com/embed/seu-codigo-de-video');
  
  // Animação de elementos ao fazer scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll('.module, .benefit, .objection, .testimonial, .pricing-plan');
    
    elements.forEach(element => {
      const position = element.getBoundingClientRect();
      
      // Se o elemento estiver visível na tela
      if(position.top < window.innerHeight && position.bottom >= 0) {
        element.style.opacity = "1";
        element.style.transform = element.classList.contains('pricing-plan') && element.classList.contains('featured') 
          ? "translateY(0) scale(1.05)" 
          : "translateY(0)";
      }
    });
  }
  
  // Inicialmente, definir opacidade 0 para elementos que serão animados
  document.querySelectorAll('.module, .benefit, .objection, .testimonial, .pricing-plan:not(.featured)').forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(50px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });
  
  // Tratamento especial para o plano em destaque
  const featuredPlan = document.querySelector('.pricing-plan.featured');
  if (featuredPlan) {
    featuredPlan.style.opacity = "0";
    featuredPlan.style.transform = "translateY(50px) scale(1.05)";
    featuredPlan.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  }
  
  // Adicionar listener para scroll
  window.addEventListener('scroll', animateOnScroll);
  
  // FAQ Interativo
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Fechar todos os outros itens
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      // Alternar o estado do item atual
      item.classList.toggle('active');
    });
  });
  
  // Gerenciar modais
  const privacyLink = document.getElementById('privacy-link');
  const termsLink = document.getElementById('terms-link');
  const privacyModal = document.getElementById('privacy-modal');
  const termsModal = document.getElementById('terms-modal');
  const closeButtons = document.querySelectorAll('.close-modal');
  
  // Abrir modais
  if (privacyLink) {
    privacyLink.addEventListener('click', function(e) {
      e.preventDefault();
      privacyModal.style.display = 'block';
    });
  }
  
  if (termsLink) {
    termsLink.addEventListener('click', function(e) {
      e.preventDefault();
      termsModal.style.display = 'block';
    });
  }
  
  // Fechar modais
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      privacyModal.style.display = 'none';
      termsModal.style.display = 'none';
    });
  });
  
  // Fechar modal ao clicar fora
  window.addEventListener('click', function(e) {
    if (e.target === privacyModal) {
      privacyModal.style.display = 'none';
    }
    if (e.target === termsModal) {
      termsModal.style.display = 'none';
    }
  });
  
  // Chamar uma vez inicialmente para elementos que já estão visíveis
  animateOnScroll();
});
