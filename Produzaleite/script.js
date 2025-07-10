
// Quiz data
const quizData = [
    {
        question: "🤱 Você sente que sua produção de leite está baixa?",
        icon: "fas fa-droplet",
        options: [
            "😢 Sim, meu bebê chora mesmo após mamar",
            "🤔 Às vezes parece que sim",
            "❓ Não tenho certeza",
            "✅ Não, tenho leite suficiente"
        ]
    },
    {
        question: "🍼 Já precisou usar fórmula para complementar?",
        icon: "fas fa-baby-carriage",
        options: [
            "😰 Sim, ele só mama fórmula agora",
            "⚖️ Sim, complemento depois da mamada",
            "🤷‍♀️ Ainda não, mas estou pensando nisso",
            "🚫 Não uso fórmula"
        ]
    },
    {
        question: "💔 Seu bebê já rejeitou o peito após fórmula ou mamadeira?",
        icon: "fas fa-heart-broken",
        options: [
            "😭 Sim, agora ele só aceita mamadeira",
            "😔 Às vezes rejeita o peito",
            "🙄 Raramente acontece",
            "💚 Não, sempre aceita o peito"
        ]
    },
    {
        question: "⏰ Quanto tempo (em média) seu bebê mama em cada mamada?",
        icon: "fas fa-clock",
        options: [
            "⚡ Menos de 5 minutos",
            "🕐 Entre 5 a 10 minutos",
            "🕒 Entre 10 a 20 minutos",
            "🕰️ Mais de 20 minutos"
        ]
    },
    {
        question: "📅 Há quanto tempo você sente a produção mais fraca?",
        icon: "fas fa-calendar-alt",
        options: [
            "😰 Há mais de 1 mês",
            "😟 Entre 2 a 4 semanas",
            "😕 Há cerca de 1 semana",
            "😐 É algo recente (poucos dias)"
        ]
    },
    {
        question: "🔬 Já tentou métodos como bombinha, chás ou remédios?",
        icon: "fas fa-flask",
        options: [
            "😣 Sim, tentei tudo e nada funcionou",
            "😞 Tentei algumas coisas com pouco resultado",
            "🤨 Tentei poucas coisas",
            "🆕 Ainda não tentei nada específico"
        ]
    },
    {
        question: "😢 Alguma vez seu peito ficou tão murcho que pensou em desistir da amamentação?",
        icon: "fas fa-tired",
        options: [
            "💔 Sim, várias vezes pensei em desistir",
            "😔 Sim, já pensei algumas vezes",
            "🤷‍♀️ Raramente penso nisso",
            "💪 Não, nunca pensei em desistir"
        ]
    },
    {
        question: "💭 O que você sente quando pensa em não conseguir amamentar seu filho?",
        icon: "fas fa-brain",
        options: [
            "😭 Muita culpa e tristeza profunda",
            "😤 Frustração e preocupação",
            "😕 Um pouco de tristeza",
            "😌 Aceito que pode acontecer"
        ]
    },
    {
        question: "👥 Já foi julgada por alguém por não conseguir dar só o peito?",
        icon: "fas fa-users",
        options: [
            "💔 Sim, várias vezes e me sinto muito mal",
            "😔 Sim, algumas vezes",
            "🤷‍♀️ Raramente aconteceu",
            "🚫 Não, nunca fui julgada"
        ]
    },
    {
        question: "🌟 Você acredita que é possível recuperar o leite naturalmente?",
        icon: "fas fa-star",
        options: [
            "😰 Tenho muitas dúvidas, quase perdi a esperança",
            "🤔 Tenho algumas dúvidas, mas ainda tenho esperança",
            "💡 Acredito que sim, mas não sei como",
            "✨ Tenho certeza que é possível"
        ]
    },
    {
        question: "😭 Seu bebê chora após mamar, demonstrando fome?",
        icon: "fas fa-baby",
        options: [
            "😢 Sim, sempre chora como se ainda tivesse fome",
            "😔 Às vezes chora após mamar",
            "😐 Raramente chora após mamar",
            "😊 Não, fica satisfeito após mamar"
        ]
    },
    {
        question: "🌱 Você está disposta a tentar um método natural, simples e validado por especialistas?",
        icon: "fas fa-leaf",
        options: [
            "🙏 Sim, estou desesperada e tentaria qualquer coisa",
            "💪 Sim, estou disposta a tentar",
            "🤔 Talvez, dependendo do que for",
            "❓ Não tenho certeza se tentaria"
        ]
    }
];

let currentQuestionIndex = 0;
let answers = [];
let userName = '';

function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    // Show target screen
    document.getElementById(screenId).classList.add('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function startQuiz() {
    showScreen('quiz');
    displayQuestion();
}

function displayQuestion() {
    const questionData = quizData[currentQuestionIndex];
    
    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    
    // Update question counter
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    
    // Display question with icon
    const questionContainer = document.getElementById('questionText');
    questionContainer.innerHTML = `<i class="${questionData.icon}" style="margin-right: 15px; color: #e74c3c;"></i>${questionData.question}`;
    
    // Display options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    questionData.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.innerHTML = option;
        optionElement.style.pointerEvents = 'auto'; // Reset pointer events
        optionElement.onclick = () => selectOption(index, optionElement);
        optionsContainer.appendChild(optionElement);
    });
    
    // Hide next button initially
    document.getElementById('nextButton').style.display = 'none';
}

function selectOption(optionIndex, optionElement) {
    // Remove selected class from all options
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    
    // Add selected class to clicked option
    optionElement.classList.add('selected');
    
    // Store answer
    answers[currentQuestionIndex] = optionIndex;
    
    // Disable all options to prevent multiple clicks
    options.forEach(opt => opt.style.pointerEvents = 'none');
    
    // Auto advance to next question after 1 second
    setTimeout(() => {
        if (currentQuestionIndex < quizData.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        } else {
            // Quiz completed, show name collection
            showScreen('name-collection');
        }
    }, 1000);
}

function nextQuestion() {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        // Quiz completed, show name collection
        showScreen('name-collection');
    }
}

function submitName() {
    const nameInput = document.getElementById('nameInput');
    if (nameInput.value.trim() === '') {
        alert('Por favor, digite seu nome para continuar');
        return;
    }
    userName = nameInput.value.trim();
    showScreen('mechanism');
}

function selectOffer(offerType) {
    if (offerType === 'basic') {
        window.open('https://paypagamentostx3.shop/checkout-white-7066/?add-to-cart=7066', '_blank');
    } else if (offerType === 'premium') {
        window.open('https://paypagamentostx3.shop/checkout-white-7071/?add-to-cart=7071', '_blank');
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Any initialization code can go here
    console.log('Quiz carregado com sucesso!');
});

// Add some smooth scrolling behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
