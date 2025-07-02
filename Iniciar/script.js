
const questions = [
  {
    text: "Qual sua idade?",
    icon: "fas fa-birthday-cake",
    options: [
      { value: "18-25", text: "18 a 25 anos", icon: "fas fa-seedling" },
      { value: "26-35", text: "26 a 35 anos", icon: "fas fa-leaf" },
      { value: "36-45", text: "36 a 45 anos", icon: "fas fa-tree" },
      { value: "46+", text: "46 anos ou mais", icon: "fas fa-mountain" }
    ]
  },
  {
    text: "Qual seu maior incômodo hoje?",
    icon: "fas fa-exclamation-triangle",
    options: [
      { value: "barriga", text: "Barriga inchada", icon: "fas fa-circle" },
      { value: "peso", text: "Excesso de peso", icon: "fas fa-weight" },
      { value: "energia", text: "Falta de energia", icon: "fas fa-battery-quarter" },
      { value: "autoestima", text: "Baixa autoestima", icon: "fas fa-heart-broken" }
    ]
  },
  {
    text: "Você já tentou emagrecer antes?",
    icon: "fas fa-history",
    options: [
      { value: "nunca", text: "Nunca tentei", icon: "fas fa-times-circle" },
      { value: "poucas", text: "Poucas vezes", icon: "fas fa-check-circle" },
      { value: "muitas", text: "Muitas vezes", icon: "fas fa-redo" },
      { value: "sempre", text: "Estou sempre tentando", icon: "fas fa-sync" }
    ]
  },
  {
    text: "Você sente cansaço mesmo dormindo bem?",
    icon: "fas fa-bed",
    options: [
      { value: "sempre", text: "Sempre", icon: "fas fa-tired" },
      { value: "frequentemente", text: "Frequentemente", icon: "fas fa-clock" },
      { value: "raramente", text: "Raramente", icon: "fas fa-smile" },
      { value: "nunca", text: "Nunca", icon: "fas fa-bolt" }
    ]
  },
  {
    text: "Quantos copos de água você bebe por dia?",
    icon: "fas fa-tint",
    options: [
      { value: "0-2", text: "0 a 2 copos", icon: "fas fa-exclamation" },
      { value: "3-5", text: "3 a 5 copos", icon: "fas fa-glass-water" },
      { value: "6-8", text: "6 a 8 copos", icon: "fas fa-thumbs-up" },
      { value: "8+", text: "Mais de 8 copos", icon: "fas fa-star" }
    ]
  },
  {
    text: "Como é sua alimentação hoje?",
    icon: "fas fa-utensils",
    options: [
      { value: "ruim", text: "Muito desregrada", icon: "fas fa-hamburger" },
      { value: "regular", text: "Mais ou menos", icon: "fas fa-balance-scale" },
      { value: "boa", text: "Bastante saudável", icon: "fas fa-apple-alt" },
      { value: "otima", text: "Muito saudável", icon: "fas fa-leaf" }
    ]
  },
  {
    text: "Você tem prisão de ventre com frequência?",
    icon: "fas fa-stomach",
    options: [
      { value: "sempre", text: "Sempre", icon: "fas fa-times-circle" },
      { value: "frequentemente", text: "Frequentemente", icon: "fas fa-clock" },
      { value: "raramente", text: "Raramente", icon: "fas fa-check" },
      { value: "nunca", text: "Nunca", icon: "fas fa-smile" }
    ]
  },
  {
    text: "Já fez algum detox antes?",
    icon: "fas fa-spa",
    options: [
      { value: "nunca", text: "Nunca fiz", icon: "fas fa-times" },
      { value: "uma", text: "Uma vez", icon: "fas fa-hand-point-up" },
      { value: "poucas", text: "Poucas vezes", icon: "fas fa-hand-peace" },
      { value: "muitas", text: "Muitas vezes", icon: "fas fa-hand-paper" }
    ]
  },
  {
    text: "Qual parte do corpo você mais gostaria de ver diferença?",
    icon: "fas fa-search",
    options: [
      { value: "barriga", text: "Barriga", icon: "fas fa-circle" },
      { value: "coxas", text: "Coxas e glúteos", icon: "fas fa-running" },
      { value: "bracos", text: "Braços", icon: "fas fa-dumbbell" },
      { value: "geral", text: "Corpo todo", icon: "fas fa-user" }
    ]
  },
  {
    text: "Você sente que seu corpo está inflamado?",
    icon: "fas fa-fire",
    options: [
      { value: "muito", text: "Muito inflamado", icon: "fas fa-thermometer-full" },
      { value: "pouco", text: "Um pouco", icon: "fas fa-thermometer-half" },
      { value: "raramente", text: "Raramente", icon: "fas fa-thermometer-quarter" },
      { value: "nunca", text: "Nunca sinto isso", icon: "fas fa-thermometer-empty" }
    ]
  },
  {
    text: "Você está disposta a seguir um plano simples por 3 dias?",
    icon: "fas fa-calendar-check",
    options: [
      { value: "sim", text: "Sim, estou pronta!", icon: "fas fa-heart" },
      { value: "talvez", text: "Talvez, depende", icon: "fas fa-question" },
      { value: "dificil", text: "Seria difícil", icon: "fas fa-frown" },
      { value: "nao", text: "Não consigo", icon: "fas fa-times" }
    ]
  },
  {
    text: "Você quer emagrecer com saúde e sem sofrimento?",
    icon: "fas fa-heart-pulse",
    options: [
      { value: "muito", text: "Muito! É meu sonho", icon: "fas fa-star" },
      { value: "sim", text: "Sim, claro", icon: "fas fa-check" },
      { value: "talvez", text: "Talvez", icon: "fas fa-question" },
      { value: "nao", text: "Não é prioridade", icon: "fas fa-minus" }
    ]
  },
  {
    text: "Você gostaria de se olhar no espelho com orgulho em 3 dias?",
    icon: "fas fa-mirror",
    options: [
      { value: "muito", text: "Seria incrível!", icon: "fas fa-smile-beam" },
      { value: "sim", text: "Sim, gostaria", icon: "fas fa-smile" },
      { value: "talvez", text: "Não sei se é possível", icon: "fas fa-meh" },
      { value: "nao", text: "Não acredito nisso", icon: "fas fa-frown" }
    ]
  },
  {
    text: "Você sente que merece cuidar de si mesma de forma natural?",
    icon: "fas fa-self-improvement",
    options: [
      { value: "muito", text: "Claro! Mereço muito", icon: "fas fa-crown" },
      { value: "sim", text: "Sim, mereço", icon: "fas fa-heart" },
      { value: "talvez", text: "Às vezes penso isso", icon: "fas fa-thinking-head" },
      { value: "nao", text: "Não sei se mereço", icon: "fas fa-question-circle" }
    ]
  },
  {
    text: "Acredita que o Detox 3D pode te ajudar como ajudou a Dayane e Larissa?",
    icon: "fas fa-users",
    options: [
      { value: "muito", text: "Tenho certeza! Quero o mesmo resultado", icon: "fas fa-star" },
      { value: "sim", text: "Sim, acredito que pode funcionar", icon: "fas fa-thumbs-up" },
      { value: "talvez", text: "Talvez, vou tentar", icon: "fas fa-question" },
      { value: "nao", text: "Não sei se vai funcionar comigo", icon: "fas fa-meh" }
    ]
  }
];

let currentQuestion = 0;
let answers = [];

function startQuiz() {
  document.getElementById('start').classList.add('hidden');
  document.getElementById('quiz').classList.remove('hidden');
  showQuestion();
}

function showQuestion() {
  if (currentQuestion >= questions.length) {
    showResult();
    return;
  }

  const question = questions[currentQuestion];
  const quizContent = document.getElementById('quizContent');
  
  quizContent.innerHTML = `
    <div class="question-container">
      <div class="question-icon">
        <i class="${question.icon}"></i>
      </div>
      <div class="question-text">${question.text}</div>
      <div class="options">
        ${question.options.map((option, index) => `
          <label class="option" for="option${index}">
            <input type="radio" id="option${index}" name="question${currentQuestion}" value="${option.value}" onchange="selectOption(this)">
            <i class="${option.icon}"></i>
            <span>${option.text}</span>
          </label>
        `).join('')}
      </div>
    </div>
  `;

  updateProgress();
  updateNavigationButtons();
}

function selectOption(radio) {
  // Remove selected class from all options
  const options = document.querySelectorAll('.option');
  options.forEach(option => option.classList.remove('selected'));
  
  // Add selected class to current option
  radio.closest('.option').classList.add('selected');
  
  // Store answer
  answers[currentQuestion] = radio.value;
  
  // Enable next button
  document.getElementById('nextBtn').disabled = false;
}

function nextQuestion() {
  if (!answers[currentQuestion]) {
    alert('Por favor, selecione uma resposta antes de continuar.');
    return;
  }
  
  currentQuestion++;
  showQuestion();
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

function updateProgress() {
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  document.getElementById('progressFill').style.width = progress + '%';
  document.getElementById('progressText').textContent = `${currentQuestion + 1} de ${questions.length}`;
}

function updateNavigationButtons() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (currentQuestion === 0) {
    prevBtn.classList.add('hidden');
  } else {
    prevBtn.classList.remove('hidden');
  }
  
  if (currentQuestion === questions.length - 1) {
    nextBtn.innerHTML = '<i class="fas fa-check"></i> Finalizar Quiz';
  } else {
    nextBtn.innerHTML = 'Próxima <i class="fas fa-arrow-right"></i>';
  }
}

function showResult() {
  document.getElementById('quiz').classList.add('hidden');
  document.getElementById('result').classList.remove('hidden');
  
  // Adicionar efeito de confete (opcional)
  createConfetti();
}

function showTransformation() {
  // Redirecionar para a página de vendas
  window.open('https://compraeasy.site/PVe', '_blank');
}

function createConfetti() {
  // Efeito simples de confete
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
  
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: fixed;
        top: -10px;
        left: ${Math.random() * 100}%;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        z-index: 1000;
        pointer-events: none;
        animation: fall 3s linear forwards;
      `;
      
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 3000);
    }, i * 100);
  }
}

// CSS para animação do confete
const style = document.createElement('style');
style.textContent = `
  @keyframes fall {
    to {
      transform: translateY(100vh) rotate(360deg);
    }
  }
`;
document.head.appendChild(style);

// Tratamento de erro para imagens
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('error', function() {
      this.style.display = 'none';
      
      // Criar elemento de fallback
      const fallback = document.createElement('div');
      fallback.className = this.className;
      fallback.style.cssText = `
        background: linear-gradient(45deg, #e8f5e8, #c8e6c9);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #28a745;
        font-weight: bold;
        font-size: 1.1rem;
        text-align: center;
        padding: 20px;
        border-radius: 15px;
        min-height: 150px;
      `;
      fallback.innerHTML = '🌟 Transformação Incrível 🌟<br>Resultados Reais';
      
      this.parentNode.insertBefore(fallback, this.nextSibling);
    });
  });
});
