
// Dados do quiz - perguntas e respostas com ícones
const quizData = [
    {
        icon: "⏰",
        question: "Você está tentando engravidar há quanto tempo?",
        answers: [
            "Menos de 6 meses",
            "6 meses a 1 ano",
            "1 a 2 anos",
            "Mais de 2 anos"
        ]
    },
    {
        icon: "💊",
        question: "Você já usou ou está usando algum método contraceptivo?",
        answers: [
            "Sim, pílula anticoncepcional",
            "Sim, DIU",
            "Sim, outros métodos",
            "Não, nunca usei"
        ]
    },
    {
        icon: "🔬",
        question: "Já fez algum exame para investigar sua fertilidade?",
        answers: [
            "Sim, todos os exames básicos",
            "Sim, alguns exames",
            "Não, mas pretendo fazer",
            "Não, e não sei quais fazer"
        ]
    },
    {
        icon: "👩‍⚕️",
        question: "Seu médico te orientou sobre preparação antes de engravidar?",
        answers: [
            "Sim, recebi orientações completas",
            "Sim, algumas orientações básicas",
            "Pouco, só sobre ácido fólico",
            "Não recebi orientações"
        ]
    },
    {
        icon: "💑",
        question: "Você sente que tem apoio do seu parceiro nessa jornada?",
        answers: [
            "Sim, total apoio e participação",
            "Sim, mas poderia participar mais",
            "Às vezes, depende do momento",
            "Não, sinto que estou sozinha"
        ]
    },
    {
        icon: "🤱",
        question: "Já passou pela experiência de perda gestacional?",
        answers: [
            "Não, nunca",
            "Sim, uma vez",
            "Sim, mais de uma vez",
            "Prefiro não responder"
        ]
    },
    {
        icon: "😰",
        question: "Como está sua ansiedade nesse processo?",
        answers: [
            "Baixa, me sinto tranquila",
            "Moderada, alguns momentos de ansiedade",
            "Alta, fico ansiosa constantemente",
            "Muito alta, afeta meu dia a dia"
        ]
    },
    {
        icon: "🏃‍♀️",
        question: "Você pratica atividade física regularmente?",
        answers: [
            "Sim, 4-5 vezes por semana",
            "Sim, 2-3 vezes por semana",
            "Às vezes, quando consigo",
            "Não pratico exercícios"
        ]
    },
    {
        icon: "🥗",
        question: "Sua alimentação atualmente é:",
        answers: [
            "Muito saudável e balanceada",
            "Razoavelmente saudável",
            "Poderia ser melhor",
            "Precisa de muitas mudanças"
        ]
    },
    {
        icon: "⚖️",
        question: "Seu peso atual está:",
        answers: [
            "Dentro do ideal para minha altura",
            "Um pouco acima do ideal",
            "Abaixo do ideal",
            "Muito acima do ideal"
        ]
    },
    {
        icon: "💊",
        question: "Você já faz uso de alguma suplementação?",
        answers: [
            "Sim, ácido fólico e outras vitaminas",
            "Sim, apenas ácido fólico",
            "Sim, outras vitaminas sem orientação",
            "Não faço suplementação"
        ]
    },
    {
        icon: "🩺",
        question: "Tem alguma condição de saúde diagnosticada?",
        answers: [
            "SOP (Síndrome dos Ovários Policísticos)",
            "Problemas na tireoide",
            "Endometriose",
            "Nenhuma condição diagnosticada"
        ]
    },
    {
        icon: "📅",
        question: "Seu ciclo menstrual é:",
        answers: [
            "Regular (28-32 dias)",
            "Irregular, mas próximo do normal",
            "Muito irregular",
            "Não menstruo ou ciclos muito longos"
        ]
    },
    {
        icon: "⚠️",
        question: "Você sente sintomas como cólicas intensas, ciclos longos, ausência de ovulação ou muito muco cervical?",
        answers: [
            "Não, não tenho esses sintomas",
            "Sim, cólicas intensas",
            "Sim, ciclos muito longos",
            "Sim, vários desses sintomas"
        ]
    },
    {
        icon: "😴",
        question: "Nos últimos meses, você sente:",
        answers: [
            "Energia e disposição normais",
            "Um pouco mais cansada que o normal",
            "Muito cansaço e falta de energia",
            "Sintomas como irritabilidade e mudanças de humor"
        ]
    },
    {
        icon: "👨‍⚕️",
        question: "Seu parceiro já fez algum exame de fertilidade?",
        answers: [
            "Sim, espermograma e outros",
            "Sim, apenas espermograma",
            "Não, mas pretende fazer",
            "Não, e ele resiste à ideia"
        ]
    },
    {
        icon: "🤔",
        question: "Você acredita que pode existir algo te impedindo de engravidar?",
        answers: [
            "Não, acredito que é questão de tempo",
            "Talvez, mas não sei o que seria",
            "Sim, suspeito de algo específico",
            "Sim, já foi diagnosticado algo"
        ]
    },
    {
        icon: "🎯",
        question: "Se você pudesse resolver um problema agora, qual seria?",
        answers: [
            "Diminuir a ansiedade e o estresse",
            "Melhorar minha alimentação e peso",
            "Regular meu ciclo menstrual",
            "Entender melhor o processo de fertilidade"
        ]
    },
    {
        icon: "📚",
        question: "Se eu te entregasse agora um passo a passo comprovado, fácil de seguir, para aumentar sua fertilidade e se preparar para gerar uma vida saudável, você gostaria?",
        answers: [
            "Sim, muito! Preciso de orientação",
            "Sim, se fosse algo confiável",
            "Talvez, dependendo do que fosse",
            "Não sei, estou confusa com tanta informação"
        ]
    },
    {
        icon: "📧",
        question: "Por fim, qual seu nome e e-mail para te enviar o resultado personalizado?",
        answers: [] // Esta pergunta será tratada diferente
    }
];

// Variáveis de controle do quiz
let currentQuestion = 0;
let userAnswers = [];
let userName = '';

// Elementos DOM
const startScreen = document.getElementById('startScreen');
const questionScreen = document.getElementById('questionScreen');
const leadScreen = document.getElementById('leadScreen');
const resultScreen = document.getElementById('resultScreen');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const questionTitle = document.getElementById('questionTitle');
const answersContainer = document.getElementById('answersContainer');
const nextBtn = document.getElementById('nextBtn');

// Função para iniciar o quiz
function startQuiz() {
    startScreen.classList.remove('active');
    questionScreen.classList.add('active');
    showQuestion();
}

// Função para mostrar a pergunta atual
function showQuestion() {
    // Atualizar progresso
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressFill.style.width = progress + '%';
    progressText.textContent = `Pergunta ${currentQuestion + 1} de ${quizData.length}`;
    
    // Verificar se é a última pergunta (captura de dados)
    if (currentQuestion === quizData.length - 1) {
        showLeadCapture();
        return;
    }
    
    // Mostrar pergunta com ícone
    const question = quizData[currentQuestion];
    questionTitle.innerHTML = `<span class="question-icon">${question.icon}</span> ${question.question}`;
    
    // Limpar respostas anteriores
    answersContainer.innerHTML = '';
    
    // Criar botões de resposta
    question.answers.forEach((answer, index) => {
        const answerBtn = document.createElement('button');
        answerBtn.className = 'answer-option';
        answerBtn.textContent = answer;
        answerBtn.onclick = () => selectAnswer(index, answerBtn);
        answersContainer.appendChild(answerBtn);
    });
    
    // Desabilitar botão próxima
    nextBtn.disabled = true;
}

// Função para selecionar resposta
function selectAnswer(answerIndex, selectedBtn) {
    // Remover seleção anterior
    document.querySelectorAll('.answer-option').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Marcar resposta selecionada
    selectedBtn.classList.add('selected');
    
    // Salvar resposta
    userAnswers[currentQuestion] = answerIndex;
    
    // Habilitar botão próxima
    nextBtn.disabled = false;
}

// Função para próxima pergunta
function nextQuestion() {
    currentQuestion++;
    showQuestion();
}

// Função para mostrar tela de captura de dados
function showLeadCapture() {
    questionScreen.classList.remove('active');
    leadScreen.classList.add('active');
    
    // Atualizar progresso para 100%
    progressFill.style.width = '100%';
    progressText.textContent = 'Finalizando...';
}

// Função para enviar dados do lead
function submitLead(event) {
    event.preventDefault();
    
    // Capturar dados do formulário
    userName = document.getElementById('userName').value;
    
    // Mostrar resultado
    showResult();
}

// Função para mostrar resultado
function showResult() {
    leadScreen.classList.remove('active');
    resultScreen.classList.add('active');
    
    // Personalizar mensagem com nome
    document.getElementById('resultTitle').textContent = `Parabéns, ${userName}!`;
    
    // Aqui você poderia enviar os dados para seu sistema de email marketing
    // console.log('Dados do lead:', { userName, answers: userAnswers });
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Quiz já está pronto para uso
    console.log('Quiz da Tentante carregado com sucesso!');
});

// Função para reiniciar o quiz (opcional)
function restartQuiz() {
    currentQuestion = 0;
    userAnswers = [];
    userName = '';
    
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
    
    progressFill.style.width = '0%';
    progressText.textContent = 'Pergunta 1 de 20';
}
