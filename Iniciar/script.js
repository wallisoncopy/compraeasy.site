// Quiz data structure
const quizData = {
    phases: [
        {
            name: "Fase 1 - Retenção Invisível",
            pointValue: 1,
            questions: [
                "Você se sente inchada logo ao acordar, mesmo sem comer nada pesado?",
                "Já percebeu o rosto ou o corpo mais 'cheios' ao longo do dia, sem explicação?",
                "Você bebe água, mas parece que tudo fica 'preso' no seu corpo?",
                "Sua barriga parece sempre dura ou com sensação de estufamento?"
            ]
        },
        {
            name: "Fase 2 - Inflamação Oculta",
            pointValue: 2,
            questions: [
                "Você sente que seu intestino não funciona como deveria?",
                "Já sentiu desconforto ou até dor abdominal depois de comer?",
                "Mesmo fazendo 'tudo certo', seu corpo não responde mais como antes?",
                "Você sente que algo está travando seu emagrecimento e não sabe o que é?"
            ]
        },
        {
            name: "Fase 3 - Metabolismo Lento",
            pointValue: 3,
            questions: [
                "Você se sente cansada ou sem energia grande parte do dia?",
                "Já tentou emagrecer, teve resultado, mas engordou tudo de novo (ou mais)?",
                "Você sente que está vivendo no piloto automático, sem ânimo?",
                "Já pensou: 'Meu corpo não é mais o mesmo de antes'?"
            ]
        },
        {
            name: "Validação Científica",
            pointValue: 2,
            questions: [
                "Você já tentou várias dietas mas sempre volta ao peso inicial ou ganha mais?",
                "Sente que seu metabolismo 'travou' e não consegue mais emagrecer como antes?",
                "Você percebe que acumula gordura principalmente na barriga e quadris?",
                "Já sentiu que precisa de ajuda profissional para destrancar seu emagrecimento?"
            ]
        }
    ]
};

// Quiz state
let currentQuestionIndex = 0;
let currentPhaseIndex = 0;
let currentPhaseQuestionIndex = 0;
let totalScore = 0;
let totalQuestions = 0;
let userName = "";
let currentWeight = "";
let goalWeight = "";

// Calculate total questions
quizData.phases.forEach(phase => {
    totalQuestions += phase.questions.length;
});

// DOM elements
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const welcomeScreen = document.getElementById('welcomeScreen');
const quizScreen = document.getElementById('quizScreen');
const weightScreen = document.getElementById('weightScreen');
const nameScreen = document.getElementById('nameScreen');
const doctorScreen = document.getElementById('doctorScreen');
const resultsScreen = document.getElementById('resultsScreen');
const phaseText = document.getElementById('phaseText');
const questionText = document.getElementById('questionText');
const questionNumber = document.getElementById('questionNumber');
const totalQuestionsElement = document.getElementById('totalQuestions');

// Initialize quiz
function initializeQuiz() {
    totalQuestionsElement.textContent = totalQuestions;
    updateProgress();
}

// Start quiz
function startQuiz() {
    hideScreen(welcomeScreen);
    showScreen(quizScreen);
    displayCurrentQuestion();
}

// Display current question
function displayCurrentQuestion() {
    const currentPhase = quizData.phases[currentPhaseIndex];
    const question = currentPhase.questions[currentPhaseQuestionIndex];
    
    // Update UI elements
    phaseText.textContent = currentPhase.name;
    questionText.textContent = question;
    questionNumber.textContent = currentQuestionIndex + 1;
    
    // Add entrance animation
    questionText.style.opacity = '0';
    questionText.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        questionText.style.transition = 'all 0.5s ease-out';
        questionText.style.opacity = '1';
        questionText.style.transform = 'translateY(0)';
    }, 100);
    
    updateProgress();
}

// Handle answer selection
function selectAnswer(isYes) {
    // Add loading state
    quizScreen.classList.add('loading');
    
    // Calculate score if answer is yes
    if (isYes) {
        const currentPhase = quizData.phases[currentPhaseIndex];
        totalScore += currentPhase.pointValue;
    }
    
    // Move to next question
    setTimeout(() => {
        nextQuestion();
        quizScreen.classList.remove('loading');
    }, 800);
}

// Move to next question
function nextQuestion() {
    currentQuestionIndex++;
    currentPhaseQuestionIndex++;
    
    // Check if current phase is complete
    if (currentPhaseQuestionIndex >= quizData.phases[currentPhaseIndex].questions.length) {
        currentPhaseIndex++;
        currentPhaseQuestionIndex = 0;
    }
    
    // Check if quiz is complete
    if (currentPhaseIndex >= quizData.phases.length) {
        completeQuiz();
    } else {
        displayCurrentQuestion();
    }
}

// Complete quiz and show weight screen
function completeQuiz() {
    hideScreen(quizScreen);
    showScreen(weightScreen);
}

// Handle weight selection
function selectWeight(weight) {
    currentWeight = weight;
    
    // Hide current weight question and show goal question
    const currentQ = document.getElementById('currentWeightQuestion');
    const goalQ = document.getElementById('goalWeightQuestion');
    
    currentQ.classList.remove('active');
    goalQ.classList.add('active');
    
    // Add selected effect to button
    const buttons = currentQ.querySelectorAll('.weight-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));
    event.target.classList.add('selected');
}

// Handle goal weight selection
function selectGoal(goal) {
    goalWeight = goal;
    
    // Add selected effect to button
    const buttons = document.getElementById('goalWeightQuestion').querySelectorAll('.weight-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));
    event.target.classList.add('selected');
    
    // Move to name screen after short delay
    setTimeout(() => {
        hideScreen(weightScreen);
        showScreen(nameScreen);
    }, 800);
}

// Submit name and show doctor screen
function submitName() {
    const nameInput = document.getElementById('userName');
    userName = nameInput.value.trim();
    
    if (userName === '') {
        nameInput.style.border = '2px solid #d32f2f';
        nameInput.placeholder = 'Por favor, digite seu nome para continuar...';
        return;
    }
    
    hideScreen(nameScreen);
    showScreen(doctorScreen);
}

// Show results based on score
function showResults() {
    hideScreen(doctorScreen);
    showScreen(resultsScreen);
    
    const diagnosisTitle = document.getElementById('diagnosisTitle');
    const diagnosisIcon = document.getElementById('diagnosisIcon');
    const diagnosisDescription = document.getElementById('diagnosisDescription');
    
    let diagnosis;
    
    if (totalScore <= 12) {
        diagnosis = {
            title: "Fase 1 – Retenção Leve",
            icon: "💧",
            description: `
                <h4>${userName ? userName + ', s' : 'S'}eu Diagnóstico Personalizado:</h4>
                <p>${userName ? userName + ', você' : 'Você'} está enfrentando <strong>retenção leve</strong>, que pode estar fazendo você se sentir inchada e com a sensação de que seu corpo está "segurando" líquidos.</p>
                ${currentWeight && goalWeight ? `<p><strong>Considerando seu perfil:</strong> Peso atual ${currentWeight}kg e meta de eliminar ${goalWeight}kg, você está na fase ideal para começar sua transformação!</p>` : ''}
                <p>A boa notícia ${userName ? userName : ''} é que essa é a fase mais fácil de reverter! Com as estratégias certas, você pode começar a sentir a diferença em poucos dias.</p>
                <p><strong>O que isso significa para ${userName ? 'você, ' + userName : 'você'}:</strong> Seu corpo precisa de um "reset" para eliminar o excesso de líquidos e toxinas que estão causando o inchaço.</p>
            `
        };
    } else if (totalScore <= 24) {
        diagnosis = {
            title: "Fase 2 – Inflamação Oculta",
            icon: "🔥",
            description: `
                <h4>${userName ? userName + ', s' : 'S'}eu Diagnóstico Personalizado:</h4>
                <p>${userName ? userName + ', você' : 'Você'} está lidando com <strong>inflamação oculta</strong>, um processo silencioso que está sabotando seus resultados e causando desconfortos que você nem imaginava que estavam conectados.</p>
                ${currentWeight && goalWeight ? `<p><strong>Com base no seu perfil:</strong> Peso atual ${currentWeight}kg e objetivo de eliminar ${goalWeight}kg, o Detox 3D é fundamental para destravar sua queima de gordura!</p>` : ''}
                <p>Essa inflamação está "travando" seu corpo e impedindo que ${userName ? 'você, ' + userName + ',' : 'você'} tenha os resultados que merece, mesmo fazendo tudo certo.</p>
                <p><strong>O que isso significa para ${userName ? 'você, ' + userName : 'você'}:</strong> Seu organismo está em estado de alerta constante, dificultando a queima de gordura e causando retenção. Mas isso tem solução!</p>
            `
        };
    } else {
        diagnosis = {
            title: "Fase 3 – Travamento Metabólico",
            icon: "⚡",
            description: `
                <h4>${userName ? userName + ', s' : 'S'}eu Diagnóstico Personalizado:</h4>
                <p>${userName ? userName + ', você' : 'Você'} está enfrentando um <strong>travamento metabólico</strong>, onde seu corpo entrou em "modo economia" e não responde mais aos seus esforços como deveria.</p>
                ${currentWeight && goalWeight ? `<p><strong>Seu caso específico:</strong> Com peso atual de ${currentWeight}kg e meta de eliminar ${goalWeight}kg, você precisa URGENTEMENTE reativar seu metabolismo com o Detox 3D!</p>` : ''}
                <p>Isso explica por que ${userName ? 'você, ' + userName + ',' : 'você'} se sente cansada, sem energia, e por que é tão difícil emagrecer (ou manter o peso perdido).</p>
                <p><strong>O que isso significa para ${userName ? 'você, ' + userName : 'você'}:</strong> Seu metabolismo precisa ser "destravado" e reativado. Seu corpo esqueceu como queimar gordura eficientemente, mas você pode ensinar ele novamente!</p>
            `
        };
    }
    
    diagnosisTitle.textContent = diagnosis.title;
    diagnosisIcon.textContent = diagnosis.icon;
    diagnosisDescription.innerHTML = diagnosis.description;
    
    // Add entrance animations
    setTimeout(() => {
        diagnosisTitle.style.animation = 'fadeIn 0.8s ease-out';
        diagnosisIcon.style.animation = 'fadeIn 0.8s ease-out 0.2s both';
        diagnosisDescription.style.animation = 'fadeIn 0.8s ease-out 0.4s both';
    }, 100);
}

// Update progress bar
function updateProgress() {
    const progress = (currentQuestionIndex / totalQuestions) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${currentQuestionIndex} de ${totalQuestions}`;
}

// Screen management functions
function hideScreen(screen) {
    screen.style.animation = 'fadeOut 0.4s ease-out';
    setTimeout(() => {
        screen.classList.remove('active');
        screen.style.animation = '';
    }, 400);
}

function showScreen(screen) {
    screen.classList.add('active');
    screen.style.animation = 'fadeIn 0.6s ease-out';
}

// Redirect to checkout
function redirectToCheckout(event) {
    // Add click animation
    if (event && event.target) {
        event.target.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            event.target.style.transform = 'scale(1)';
        }, 300);
    }
    
    setTimeout(() => {
        window.open('https://paypagamentostx3.shop/checkout-white-7054/?add-to-cart=7054', '_blank');
    }, 200);
}

// Add fadeOut animation
const fadeOutKeyframes = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;

// Add the fadeOut animation to the stylesheet
const style = document.createElement('style');
style.textContent = fadeOutKeyframes;
document.head.appendChild(style);

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', initializeQuiz);

// Add smooth scrolling behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Add touch feedback for mobile devices
document.addEventListener('touchstart', function() {}, { passive: true });

// Prevent zoom on input focus for iOS
document.addEventListener('touchstart', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (quizScreen.classList.contains('active')) {
        if (e.key === '1' || e.key === 'y' || e.key === 'Y') {
            selectAnswer(true);
        } else if (e.key === '2' || e.key === 'n' || e.key === 'N') {
            selectAnswer(false);
        }
    } else if (nameScreen.classList.contains('active')) {
        if (e.key === 'Enter') {
            submitName();
        }
    }
});

// Performance optimization: Preload next question
function preloadNextQuestion() {
    // This could be expanded to preload images or other assets
    // For now, it's just a placeholder for future enhancements
}

// FAQ toggle functionality
function toggleFaq(faqNumber) {
    const answer = document.getElementById(`faq${faqNumber}`);
    const allAnswers = document.querySelectorAll('.faq-answer');
    const allArrows = document.querySelectorAll('.faq-arrow');
    
    // Close all other FAQs
    allAnswers.forEach((item, index) => {
        if (index + 1 !== faqNumber) {
            item.classList.remove('active');
            allArrows[index].style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle current FAQ
    answer.classList.toggle('active');
    const arrow = allArrows[faqNumber - 1];
    if (answer.classList.contains('active')) {
        arrow.style.transform = 'rotate(180deg)';
    } else {
        arrow.style.transform = 'rotate(0deg)';
    }
}

// Analytics tracking (placeholder for future implementation)
function trackQuizProgress(questionIndex, answer) {
    // This could be connected to analytics services
    console.log(`Question ${questionIndex + 1}: ${answer ? 'Yes' : 'No'}`);
}

// Add error handling
window.addEventListener('error', function(e) {
    console.error('Quiz Error:', e.error);
    // Could implement user-friendly error messaging here
});
