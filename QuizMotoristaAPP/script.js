
const questions = [
    {
        question: "Qual aplicativo você trabalha?",
        options: ["🚗 Uber", "🚕 99", "🚙 InDrive", "📱 Todos"]
    },
    {
        question: "Quantas horas você trabalha por dia?",
        options: ["⏰ Menos de 6 horas", "🕐 De 6 a 8 horas", "⏱️ Mais de 8 horas"]
    },
    {
        question: "Quantos dias você trabalha por semana?",
        options: ["📅 De 1 a 3 dias", "🗓️ De 4 a 5 dias", "📆 De 6 a 7 dias"]
    },
    {
        question: "Você anota seus ganhos e despesas atualmente?",
        options: ["✍️ Sim, tudo na ponta da caneta", "📝 Só alguns", "❌ Não, nunca anotei"]
    },
    {
        question: "Com que frequência faz manutenção no seu carro?",
        options: ["✅ Sempre em dia", "🔧 Só quando quebra", "😰 Nem lembro a última vez"]
    },
    {
        question: "Quanto você gasta, em média, com combustível por semana?",
        options: ["💰 Menos de R$ 250", "💸 Entre R$ 250 e R$ 500", "🔥 Mais de R$ 500"]
    },
    {
        question: "Você separa dinheiro para manutenção e emergências?",
        options: ["💪 Sim, sempre", "😅 Tento, mas nem sempre consigo", "😔 Não, nunca sobra"]
    },
    {
        question: "Você sabe exatamente quanto lucra líquido por mês?",
        options: ["🎯 Sim", "🤔 Mais ou menos", "🤷‍♂️ Não faço ideia"]
    },
    {
        question: "Se você precisasse trocar um pneu hoje, teria dinheiro reservado?",
        options: ["✅ Sim, sem problemas", "😬 Talvez, depende do valor", "😰 Não, teria que parcelar ou pedir emprestado"]
    },
    {
        question: "Qual desses é seu maior desafio hoje como motorista de app?",
        options: [
            "📊 Saber se estou lucrando ou tomando prejuízo",
            "⛽ Controlar gastos como combustível e manutenção",
            "💰 Guardar dinheiro todo mês",
            "📋 Organizar minhas finanças de forma simples"
        ]
    }
];

let currentQuestion = 0;
let answers = [];

// Elementos DOM
const questionTitle = document.getElementById('questionTitle');
const optionsContainer = document.getElementById('optionsContainer');
const nextBtn = document.getElementById('nextBtn');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const questionContainer = document.getElementById('questionContainer');
const resultContainer = document.getElementById('resultContainer');

// Inicializar quiz
function initQuiz() {
    displayQuestion();
}

// Exibir pergunta atual
function displayQuestion() {
    const question = questions[currentQuestion];
    
    // Atualizar título da pergunta
    questionTitle.textContent = question.question;
    
    // Limpar opções anteriores
    optionsContainer.innerHTML = '';
    
    // Criar opções
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.addEventListener('click', () => selectOption(index, button));
        optionsContainer.appendChild(button);
    });
    
    // Atualizar progresso
    updateProgress();
    
    // Desabilitar botão próxima
    nextBtn.disabled = true;
}

// Selecionar opção
function selectOption(optionIndex, buttonElement) {
    // Remover seleção anterior
    document.querySelectorAll('.option').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Adicionar seleção atual
    buttonElement.classList.add('selected');
    
    // Salvar resposta
    answers[currentQuestion] = optionIndex;
    
    // Habilitar botão próxima
    nextBtn.disabled = false;
}

// Atualizar barra de progresso
function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';
    progressText.textContent = `${currentQuestion + 1} de ${questions.length}`;
}

// Próxima pergunta
function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

// Mostrar resultado
function showResult() {
    questionContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    
    // Atualizar progresso para 100%
    progressFill.style.width = '100%';
    progressText.textContent = 'Concluído';
}

// Event listeners
nextBtn.addEventListener('click', nextQuestion);

// Inicializar quiz quando a página carregar
document.addEventListener('DOMContentLoaded', initQuiz);
