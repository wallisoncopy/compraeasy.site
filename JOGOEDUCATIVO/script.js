
// Variáveis globais
let currentScreen = 'login-screen';
let gameState = {};
let scores = {
    letter: 0,
    color: 0,
    sequence: 0,
    math: 0,
    shapes: 0,
    animal: 0,
    memory: 0,
    english: 0,
    colorsEnglish: 0,
    clock: 0,
    patterns: 0,
    wordPuzzle: 0,
    count: 0,
    rhyme: 0,
    englishAnimals: 0,
    size: 0
};

// Sistema de Pontos/Estrelas
let totalStars = 0;

// Carregar estrelas do localStorage
function loadStars() {
    const savedStars = localStorage.getItem('educationalAppStars');
    totalStars = savedStars ? parseInt(savedStars) : 0;
    updateStarsDisplay();
}

// Salvar estrelas no localStorage
function saveStars() {
    localStorage.setItem('educationalAppStars', totalStars.toString());
}

// Adicionar uma estrela
function addStar() {
    totalStars++;
    saveStars();
    updateStarsDisplay();
    
    // Verificar se atingiu 10 estrelas
    if (totalStars % 10 === 0) {
        showRewardModal();
    }
}

// Atualizar display das estrelas
function updateStarsDisplay() {
    const starsDisplay = document.getElementById('stars-counter');
    if (starsDisplay) {
        const starsToNext = 10 - (totalStars % 10);
        const nextReward = Math.ceil(totalStars / 10) * 10;
        starsDisplay.textContent = `⭐ Estrelas: ${totalStars} / ${nextReward}`;
    }
}

// Mostrar modal de recompensa
function showRewardModal() {
    const modal = document.getElementById('reward-modal');
    const rewardNumber = Math.floor(totalStars / 10);
    
    document.getElementById('reward-message').innerHTML = `
        🎉 <strong>Parabéns!</strong> 🎉<br>
        Você conquistou ${totalStars} estrelas!<br><br>
        🎁 <strong>Sua recompensa:</strong><br>
        • 1 vídeo no YouTube 📺<br>
        • OU 30 minutos de videogame 🎮<br><br>
        <em>Mostre essa tela para um adulto!</em>
    `;
    
    modal.style.display = 'flex';
    createConfetti();
    playSuccessSound();
}

// Fechar modal de recompensa
function closeRewardModal() {
    document.getElementById('reward-modal').style.display = 'none';
}

// Reiniciar estrelas (para pais)
function resetStars() {
    if (confirm('⚠️ Tem certeza que deseja reiniciar as estrelas?\n\nEsta ação não pode ser desfeita.')) {
        totalStars = 0;
        saveStars();
        updateStarsDisplay();
        alert('✨ Estrelas reiniciadas com sucesso!');
    }
}

// Dados dos jogos expandidos
const letterQuestions = [
    { question: "Qual é a letra A?", options: ["A", "B", "C"], correct: 0 },
    { question: "Qual é a letra B?", options: ["C", "B", "A"], correct: 1 },
    { question: "Qual é a letra C?", options: ["A", "C", "B"], correct: 1 },
    { question: "Qual é a letra D?", options: ["D", "E", "F"], correct: 0 },
    { question: "Qual é a letra E?", options: ["F", "E", "D"], correct: 1 },
    { question: "Qual é a letra F?", options: ["F", "G", "H"], correct: 0 },
    { question: "Qual é a letra G?", options: ["H", "G", "I"], correct: 1 },
    { question: "Qual é a letra H?", options: ["G", "I", "H"], correct: 2 }
];

const colorQuestions = [
    { question: "Clique na cor vermelha", colors: ["red", "blue", "green"], correct: 0 },
    { question: "Clique na cor azul", colors: ["yellow", "blue", "red"], correct: 1 },
    { question: "Clique na cor verde", colors: ["red", "yellow", "green"], correct: 2 },
    { question: "Clique na cor amarela", colors: ["yellow", "blue", "red"], correct: 0 },
    { question: "Clique na cor rosa", colors: ["blue", "pink", "green"], correct: 1 },
    { question: "Clique na cor laranja", colors: ["orange", "purple", "brown"], correct: 0 },
    { question: "Clique na cor roxo", colors: ["gray", "purple", "black"], correct: 1 }
];

const sequenceQuestions = [
    { sequence: ["1", "2", "?", "4"], options: ["3", "5", "6"], correct: 0 },
    { sequence: ["2", "4", "?", "8"], options: ["6", "5", "7"], correct: 0 },
    { sequence: ["5", "?", "7", "8"], options: ["6", "9", "4"], correct: 0 },
    { sequence: ["10", "20", "?", "40"], options: ["30", "25", "35"], correct: 0 },
    { sequence: ["A", "B", "?", "D"], options: ["C", "E", "F"], correct: 0 },
    { sequence: ["3", "6", "9", "?"], options: ["12", "10", "15"], correct: 0 },
    { sequence: ["1", "3", "5", "?"], options: ["7", "6", "8"], correct: 0 }
];

const mathQuestions = [
    { question: "Quanto é 1 + 1?", options: ["2", "3", "1"], correct: 0 },
    { question: "Quanto é 2 + 2?", options: ["3", "4", "5"], correct: 1 },
    { question: "Quanto é 3 + 1?", options: ["4", "2", "5"], correct: 0 },
    { question: "Quanto é 5 - 2?", options: ["3", "4", "2"], correct: 0 },
    { question: "Quanto é 4 - 1?", options: ["2", "3", "4"], correct: 1 },
    { question: "Quanto é 2 + 3?", options: ["5", "6", "4"], correct: 0 },
    { question: "Quanto é 6 - 3?", options: ["3", "2", "4"], correct: 0 }
];

const shapesQuestions = [
    { question: "Clique no círculo", shapes: ["circle", "square", "triangle"], correct: 0 },
    { question: "Clique no quadrado", shapes: ["triangle", "square", "circle"], correct: 1 },
    { question: "Clique no triângulo", shapes: ["square", "circle", "triangle"], correct: 2 },
    { question: "Clique no retângulo", shapes: ["rectangle", "star", "circle"], correct: 0 },
    { question: "Clique na estrela", shapes: ["triangle", "star", "square"], correct: 1 }
];

const animalQuestions = [
    { question: "Que animal faz 'Miau'?", animals: ["🐱", "🐶", "🐮"], sound: "miau", correct: 0 },
    { question: "Que animal faz 'Au au'?", animals: ["🐴", "🐶", "🐸"], sound: "auau", correct: 1 },
    { question: "Que animal faz 'Muuu'?", animals: ["🐮", "🐷", "🐔"], sound: "muuu", correct: 0 },
    { question: "Que animal faz 'Cocoricó'?", animals: ["🐸", "🐔", "🐱"], sound: "cocorico", correct: 1 },
    { question: "Que animal faz 'Oinc oinc'?", animals: ["🐷", "🐴", "🐮"], sound: "oinc", correct: 0 }
];

const dragItems = [
    { name: "🐱 Gato", match: "gato" },
    { name: "🐭 Rato", match: "rato" },
    { name: "🦆 Pato", match: "pato" },
    { name: "🐸 Sapo", match: "sapo" },
    { name: "🐻 Urso", match: "urso" }
];

const memoryCards = ["🍎", "🍌", "🍓", "🍊", "🍎", "🍌", "🍓", "🍊"];

// Novos jogos
const englishQuestions = [
    { question: "Como se diz 'Casa' em inglês?", options: ["House", "Car", "Tree"], correct: 0 },
    { question: "Como se diz 'Gato' em inglês?", options: ["Dog", "Cat", "Bird"], correct: 1 },
    { question: "Como se diz 'Água' em inglês?", options: ["Fire", "Water", "Air"], correct: 1 },
    { question: "Como se diz 'Sol' em inglês?", options: ["Moon", "Star", "Sun"], correct: 2 },
    { question: "Como se diz 'Livro' em inglês?", options: ["Book", "Pen", "Paper"], correct: 0 },
    { question: "Como se diz 'Escola' em inglês?", options: ["Home", "School", "Park"], correct: 1 },
    { question: "Como se diz 'Amigo' em inglês?", options: ["Friend", "Enemy", "Teacher"], correct: 0 }
];

const colorsEnglishQuestions = [
    { question: "Click on RED", colors: ["red", "blue", "green"], correct: 0 },
    { question: "Click on BLUE", colors: ["yellow", "blue", "red"], correct: 1 },
    { question: "Click on GREEN", colors: ["red", "yellow", "green"], correct: 2 },
    { question: "Click on YELLOW", colors: ["yellow", "purple", "brown"], correct: 0 },
    { question: "Click on PURPLE", colors: ["orange", "purple", "pink"], correct: 1 },
    { question: "Click on ORANGE", colors: ["orange", "gray", "black"], correct: 0 }
];

const clockQuestions = [
    { time: "3:00", options: ["3:00", "4:00", "5:00"], correct: 0 },
    { time: "6:30", options: ["6:00", "6:30", "7:00"], correct: 1 },
    { time: "9:00", options: ["8:00", "10:00", "9:00"], correct: 2 },
    { time: "12:00", options: ["12:00", "11:00", "1:00"], correct: 0 },
    { time: "2:30", options: ["3:30", "2:30", "1:30"], correct: 1 }
];

const patternsQuestions = [
    { pattern: ["🔴", "🔵", "🔴", "🔵", "?"], options: ["🔴", "🔵", "🟡"], correct: 0 },
    { pattern: ["⭐", "⭐", "🌙", "⭐", "⭐", "?"], options: ["🌙", "⭐", "☀️"], correct: 0 },
    { pattern: ["🍎", "🍌", "🍎", "🍌", "?"], options: ["🍎", "🍓", "🍌"], correct: 0 },
    { pattern: ["🔺", "🔺", "🔻", "🔺", "🔺", "?"], options: ["🔻", "🔺", "🔶"], correct: 0 },
    { pattern: ["🎵", "🎶", "🎵", "🎶", "?"], options: ["🎵", "🎤", "🎸"], correct: 0 }
];

const wordPuzzles = [
    { word: "GATO", image: "🐱", letters: ["G", "A", "T", "O"] },
    { word: "CASA", image: "🏠", letters: ["C", "A", "S", "A"] },
    { word: "SOL", image: "☀️", letters: ["S", "O", "L"] },
    { word: "FLOR", image: "🌸", letters: ["F", "L", "O", "R"] },
    { word: "BOLA", image: "⚽", letters: ["B", "O", "L", "A"] },
    { word: "PEIXE", image: "🐟", letters: ["P", "E", "I", "X", "E"] }
];

const countQuestions = [
    { objects: ["🍎", "🍎", "🍎"], count: 3, options: ["2", "3", "4"], correct: 1 },
    { objects: ["⭐", "⭐", "⭐", "⭐", "⭐"], count: 5, options: ["4", "5", "6"], correct: 1 },
    { objects: ["🔴", "🔴"], count: 2, options: ["1", "2", "3"], correct: 1 },
    { objects: ["🎈", "🎈", "🎈", "🎈"], count: 4, options: ["3", "4", "5"], correct: 1 },
    { objects: ["🌟"], count: 1, options: ["1", "2", "0"], correct: 0 }
];

const rhymeQuestions = [
    { question: "Qual palavra rima com 'GATO'?", options: ["RATO", "CASA", "BOLA"], correct: 0 },
    { question: "Qual palavra rima com 'FLOR'?", options: ["SOL", "AMOR", "GATO"], correct: 1 },
    { question: "Qual palavra rima com 'CASA'?", options: ["MASSA", "GATO", "BOLA"], correct: 0 },
    { question: "Qual palavra rima com 'PÃO'?", options: ["CASA", "MÃO", "FLOR"], correct: 1 },
    { question: "Qual palavra rima com 'BOLA'?", options: ["COLA", "GATO", "SOL"], correct: 0 }
];

const englishAnimalsQuestions = [
    { question: "What animal is this? 🐱", options: ["Dog", "Cat", "Bird"], correct: 1 },
    { question: "What animal is this? 🐶", options: ["Dog", "Cat", "Fish"], correct: 0 },
    { question: "What animal is this? 🐸", options: ["Frog", "Duck", "Fish"], correct: 0 },
    { question: "What animal is this? 🐦", options: ["Cat", "Dog", "Bird"], correct: 2 },
    { question: "What animal is this? 🐟", options: ["Fish", "Bird", "Frog"], correct: 0 },
    { question: "What animal is this? 🦆", options: ["Frog", "Duck", "Fish"], correct: 1 }
];

const sizeQuestions = [
    { question: "Qual é MAIOR?", objects: [{ emoji: "🐘", size: "big" }, { emoji: "🐭", size: "small" }], correct: 0 },
    { question: "Qual é MENOR?", objects: [{ emoji: "🏠", size: "big" }, { emoji: "🐛", size: "small" }], correct: 1 },
    { question: "Qual é MAIOR?", objects: [{ emoji: "☀️", size: "big" }, { emoji: "⭐", size: "small" }], correct: 0 },
    { question: "Qual é MENOR?", objects: [{ emoji: "🌳", size: "big" }, { emoji: "🌱", size: "small" }], correct: 1 },
    { question: "Qual é MAIOR?", objects: [{ emoji: "🐋", size: "big" }, { emoji: "🐟", size: "small" }], correct: 0 }
];

// Sons de sucesso e erro
function playSuccessSound() {
    const audio = document.getElementById('success-sound');
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log('Não foi possível tocar o som'));
    }
}

function playErrorSound() {
    const audio = document.getElementById('error-sound');
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log('Não foi possível tocar o som'));
    }
}

// Efeito de confete
function createConfetti() {
    const colors = ['#ff6b6b', '#48dbfb', '#2ed573', '#feca57', '#ff9ff3'];
    const celebrationDiv = document.createElement('div');
    celebrationDiv.className = 'celebration-effect';
    document.body.appendChild(celebrationDiv);
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        celebrationDiv.appendChild(confetti);
    }
    
    setTimeout(() => {
        document.body.removeChild(celebrationDiv);
    }, 3000);
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    showScreen('login-screen');
});

// Sistema de Login
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email.trim() === '' || password.trim() === '') {
        alert('Por favor, preencha todos os campos! 😊');
        return;
    }
    
    if (!email.includes('@')) {
        alert('Por favor, digite um email válido! 📧');
        return;
    }
    
    // Simular login (aceita qualquer email/senha)
    localStorage.setItem('userEmail', email);
    showMenu();
}

function logout() {
    localStorage.removeItem('userEmail');
    resetAllScores();
    showScreen('login-screen');
}

function resetAllScores() {
    Object.keys(scores).forEach(key => scores[key] = 0);
    updateAllScoreDisplays();
}

// Navegação
function showScreen(screenId) {
    hideAllScreens();
    document.getElementById(screenId).classList.add('active');
    currentScreen = screenId;
}

function showMenu() {
    showScreen('main-menu');
    updateAllScoreDisplays();
}

function showGame(gameId) {
    showScreen(gameId);
    
    // Inicializar o jogo específico
    switch(gameId) {
        case 'letter-game':
            initLetterGame();
            break;
        case 'color-game':
            initColorGame();
            break;
        case 'sequence-game':
            initSequenceGame();
            break;
        case 'drag-game':
            initDragGame();
            break;
        case 'memory-game':
            initMemoryGame();
            break;
        case 'math-game':
            initMathGame();
            break;
        case 'shapes-game':
            initShapesGame();
            break;
        case 'animal-sounds':
            initAnimalGame();
            break;
        case 'english-words':
            initEnglishGame();
            break;
        case 'colors-english':
            initColorsEnglishGame();
            break;
        case 'clock-game':
            initClockGame();
            break;
        case 'patterns-game':
            initPatternsGame();
            break;
        case 'word-puzzle':
            initWordPuzzleGame();
            break;
        case 'count-objects':
            initCountGame();
            break;
        case 'rhyme-game':
            initRhymeGame();
            break;
        case 'english-animals':
            initEnglishAnimalsGame();
            break;
        case 'size-comparison':
            initSizeGame();
            break;
    }
}

function hideAllScreens() {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
}

function updateAllScoreDisplays() {
    Object.keys(scores).forEach(game => {
        const scoreElement = document.getElementById(`${game}-score`);
        if (scoreElement) {
            scoreElement.textContent = scores[game];
        }
    });
}

// Jogo 1: Letras
function initLetterGame() {
    gameState.letterIndex = 0;
    showLetterQuestion();
}

function showLetterQuestion() {
    const question = letterQuestions[gameState.letterIndex];
    document.getElementById('letter-question').textContent = question.question;
    
    const optionsDiv = document.getElementById('letter-options');
    optionsDiv.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => checkLetterAnswer(index);
        optionsDiv.appendChild(btn);
    });
    
    document.getElementById('letter-feedback').textContent = '';
    document.getElementById('letter-next').style.display = 'none';
}

function checkLetterAnswer(selectedIndex) {
    const question = letterQuestions[gameState.letterIndex];
    const feedback = document.getElementById('letter-feedback');
    const buttons = document.querySelectorAll('#letter-options .option-btn');
    
    buttons.forEach(btn => btn.disabled = true);
    
    if (selectedIndex === question.correct) {
        buttons[selectedIndex].classList.add('correct');
        feedback.textContent = '🎉 Fantástico! Você acertou! 🌟';
        feedback.className = 'feedback success';
        scores.letter++;
        document.getElementById('letter-score').textContent = scores.letter;
        addStar(); // Adicionar estrela
        playSuccessSound();
        createConfetti();
    } else {
        buttons[selectedIndex].classList.add('wrong');
        buttons[question.correct].classList.add('correct');
        feedback.textContent = '😊 Quase lá! Vamos tentar outra! 💪';
        feedback.className = 'feedback error';
        playErrorSound();
    }
    
    document.getElementById('letter-next').style.display = 'block';
}

function nextLetterQuestion() {
    gameState.letterIndex = (gameState.letterIndex + 1) % letterQuestions.length;
    showLetterQuestion();
}

// Jogo 2: Cores
function initColorGame() {
    gameState.colorIndex = 0;
    showColorQuestion();
}

function showColorQuestion() {
    const question = colorQuestions[gameState.colorIndex];
    document.getElementById('color-question').textContent = question.question;
    
    const circlesDiv = document.getElementById('color-circles');
    circlesDiv.innerHTML = '';
    
    question.colors.forEach((color, index) => {
        const circle = document.createElement('div');
        circle.className = 'color-circle';
        circle.style.backgroundColor = color;
        circle.onclick = () => checkColorAnswer(index);
        circlesDiv.appendChild(circle);
    });
    
    document.getElementById('color-feedback').textContent = '';
    document.getElementById('color-next').style.display = 'none';
}

function checkColorAnswer(selectedIndex) {
    const question = colorQuestions[gameState.colorIndex];
    const feedback = document.getElementById('color-feedback');
    const circles = document.querySelectorAll('.color-circle');
    
    circles.forEach(circle => circle.onclick = null);
    
    if (selectedIndex === question.correct) {
        feedback.textContent = '🌈 Perfeito! Cor certinha! ✨';
        feedback.className = 'feedback success';
        scores.color++;
        document.getElementById('color-score').textContent = scores.color;
        addStar(); // Adicionar estrela
        playSuccessSound();
        createConfetti();
    } else {
        feedback.textContent = '🎨 Boa tentativa! Vamos tentar de novo! 🌟';
        feedback.className = 'feedback error';
        playErrorSound();
    }
    
    document.getElementById('color-next').style.display = 'block';
}

function nextColorQuestion() {
    gameState.colorIndex = (gameState.colorIndex + 1) % colorQuestions.length;
    showColorQuestion();
}

// Jogo 3: Sequências
function initSequenceGame() {
    gameState.sequenceIndex = 0;
    showSequenceQuestion();
}

function showSequenceQuestion() {
    const question = sequenceQuestions[gameState.sequenceIndex];
    document.getElementById('sequence-question').textContent = question.sequence.join(' ');
    
    const optionsDiv = document.getElementById('sequence-options');
    optionsDiv.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => checkSequenceAnswer(index);
        optionsDiv.appendChild(btn);
    });
    
    document.getElementById('sequence-feedback').textContent = '';
    document.getElementById('sequence-next').style.display = 'none';
}

function checkSequenceAnswer(selectedIndex) {
    const question = sequenceQuestions[gameState.sequenceIndex];
    const feedback = document.getElementById('sequence-feedback');
    const buttons = document.querySelectorAll('#sequence-options .option-btn');
    
    buttons.forEach(btn => btn.disabled = true);
    
    if (selectedIndex === question.correct) {
        buttons[selectedIndex].classList.add('correct');
        feedback.textContent = '🎯 Incrível! Sequência completada! 🚀';
        feedback.className = 'feedback success';
        scores.sequence++;
        document.getElementById('sequence-score').textContent = scores.sequence;
        addStar(); // Adicionar estrela
        playSuccessSound();
        createConfetti();
    } else {
        buttons[selectedIndex].classList.add('wrong');
        buttons[question.correct].classList.add('correct');
        feedback.textContent = '🤔 Quase! Vamos descobrir juntos! 💡';
        feedback.className = 'feedback error';
        playErrorSound();
    }
    
    document.getElementById('sequence-next').style.display = 'block';
}

function nextSequenceQuestion() {
    gameState.sequenceIndex = (gameState.sequenceIndex + 1) % sequenceQuestions.length;
    showSequenceQuestion();
}

// Jogo 4: Matemática
function initMathGame() {
    gameState.mathIndex = 0;
    showMathQuestion();
}

function showMathQuestion() {
    const question = mathQuestions[gameState.mathIndex];
    document.getElementById('math-question').textContent = question.question;
    
    const optionsDiv = document.getElementById('math-options');
    optionsDiv.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => checkMathAnswer(index);
        optionsDiv.appendChild(btn);
    });
    
    document.getElementById('math-feedback').textContent = '';
    document.getElementById('math-next').style.display = 'none';
}

function checkMathAnswer(selectedIndex) {
    const question = mathQuestions[gameState.mathIndex];
    const feedback = document.getElementById('math-feedback');
    const buttons = document.querySelectorAll('#math-options .option-btn');
    
    buttons.forEach(btn => btn.disabled = true);
    
    if (selectedIndex === question.correct) {
        buttons[selectedIndex].classList.add('correct');
        feedback.textContent = '🧮 Genial! Você é um matemático! 🌟';
        feedback.className = 'feedback success';
        scores.math++;
        document.getElementById('math-score').textContent = scores.math;
        addStar(); // Adicionar estrela
        playSuccessSound();
        createConfetti();
    } else {
        buttons[selectedIndex].classList.add('wrong');
        buttons[question.correct].classList.add('correct');
        feedback.textContent = '📊 Boa tentativa! Vamos praticar mais! 💪';
        feedback.className = 'feedback error';
        playErrorSound();
    }
    
    document.getElementById('math-next').style.display = 'block';
}

function nextMathQuestion() {
    gameState.mathIndex = (gameState.mathIndex + 1) % mathQuestions.length;
    showMathQuestion();
}

// Jogo 5: Formas
function initShapesGame() {
    gameState.shapesIndex = 0;
    showShapesQuestion();
}

function showShapesQuestion() {
    const question = shapesQuestions[gameState.shapesIndex];
    document.getElementById('shapes-question').textContent = question.question;
    
    const optionsDiv = document.getElementById('shapes-options');
    optionsDiv.innerHTML = '';
    
    question.shapes.forEach((shape, index) => {
        const btn = document.createElement('div');
        btn.className = 'shape-btn';
        btn.onclick = () => checkShapesAnswer(index);
        
        const shapeDiv = document.createElement('div');
        shapeDiv.className = `shape ${shape}`;
        btn.appendChild(shapeDiv);
        
        optionsDiv.appendChild(btn);
    });
    
    document.getElementById('shapes-feedback').textContent = '';
    document.getElementById('shapes-next').style.display = 'none';
}

function checkShapesAnswer(selectedIndex) {
    const question = shapesQuestions[gameState.shapesIndex];
    const feedback = document.getElementById('shapes-feedback');
    const buttons = document.querySelectorAll('.shape-btn');
    
    buttons.forEach(btn => btn.onclick = null);
    
    if (selectedIndex === question.correct) {
        feedback.textContent = '🔷 Perfeito! Forma correta! 🎉';
        feedback.className = 'feedback success';
        scores.shapes++;
        document.getElementById('shapes-score').textContent = scores.shapes;
        addStar(); // Adicionar estrela
        playSuccessSound();
        createConfetti();
    } else {
        feedback.textContent = '🔶 Quase! Vamos tentar outra forma! 😊';
        feedback.className = 'feedback error';
        playErrorSound();
    }
    
    document.getElementById('shapes-next').style.display = 'block';
}

function nextShapesQuestion() {
    gameState.shapesIndex = (gameState.shapesIndex + 1) % shapesQuestions.length;
    showShapesQuestion();
}

// Jogo 6: Sons dos Animais
function initAnimalGame() {
    gameState.animalIndex = 0;
    showAnimalQuestion();
}

function showAnimalQuestion() {
    const question = animalQuestions[gameState.animalIndex];
    document.getElementById('animal-question').textContent = question.question;
    
    const optionsDiv = document.getElementById('animal-options');
    optionsDiv.innerHTML = '';
    
    question.animals.forEach((animal, index) => {
        const btn = document.createElement('div');
        btn.className = 'animal-btn';
        btn.textContent = animal;
        btn.onclick = () => checkAnimalAnswer(index);
        optionsDiv.appendChild(btn);
    });
    
    document.getElementById('animal-feedback').textContent = '';
    document.getElementById('animal-next').style.display = 'none';
}

function checkAnimalAnswer(selectedIndex) {
    const question = animalQuestions[gameState.animalIndex];
    const feedback = document.getElementById('animal-feedback');
    const buttons = document.querySelectorAll('.animal-btn');
    
    buttons.forEach(btn => btn.onclick = null);
    
    if (selectedIndex === question.correct) {
        feedback.textContent = '🐾 Excelente! Som correto! 🎵';
        feedback.className = 'feedback success';
        scores.animal++;
        document.getElementById('animal-score').textContent = scores.animal;
        addStar(); // Adicionar estrela
        playSuccessSound();
        createConfetti();
    } else {
        feedback.textContent = '🎼 Boa tentativa! Vamos escutar de novo! 👂';
        feedback.className = 'feedback error';
        playErrorSound();
    }
    
    document.getElementById('animal-next').style.display = 'block';
}

function nextAnimalQuestion() {
    gameState.animalIndex = (gameState.animalIndex + 1) % animalQuestions.length;
    showAnimalQuestion();
}

// Jogo 7: Arrastar e Soltar (melhorado)
function initDragGame() {
    const itemsDiv = document.getElementById('drag-items');
    const zonesDiv = document.getElementById('drop-zones');
    
    itemsDiv.innerHTML = '';
    zonesDiv.innerHTML = '';
    
    // Selecionar 3 itens aleatórios
    const selectedItems = [...dragItems].sort(() => Math.random() - 0.5).slice(0, 3);
    
    // Criar itens arrastáveis
    selectedItems.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'drag-item';
        div.textContent = item.name;
        div.draggable = true;
        div.dataset.match = item.match;
        div.addEventListener('dragstart', handleDragStart);
        itemsDiv.appendChild(div);
    });
    
    // Criar zonas de soltar (embaralhadas)
    const shuffledMatches = [...selectedItems].sort(() => Math.random() - 0.5);
    shuffledMatches.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'drop-zone';
        div.textContent = item.match;
        div.dataset.match = item.match;
        div.addEventListener('dragover', handleDragOver);
        div.addEventListener('drop', handleDrop);
        zonesDiv.appendChild(div);
    });
    
    document.getElementById('drag-feedback').textContent = '';
}

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.match);
}

function handleDragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');
    
    const draggedMatch = e.dataTransfer.getData('text/plain');
    const dropZoneMatch = e.target.dataset.match;
    
    if (draggedMatch === dropZoneMatch) {
        e.target.classList.add('correct');
        e.target.textContent = '✅ ' + dropZoneMatch;
        
        // Remover item arrastado
        const draggedItem = document.querySelector(`[data-match="${draggedMatch}"]`);
        if (draggedItem && draggedItem.classList.contains('drag-item')) {
            draggedItem.remove();
        }
        
        addStar(); // Adicionar estrela
        playSuccessSound();
        
        // Verificar se todos foram completados
        const remainingItems = document.querySelectorAll('.drag-item');
        if (remainingItems.length === 0) {
            document.getElementById('drag-feedback').textContent = '🏆 Fantástico! Você completou tudo! 🎉';
            document.getElementById('drag-feedback').className = 'feedback success';
            createConfetti();
        }
    } else {
        document.getElementById('drag-feedback').textContent = '🤗 Tente novamente! Você consegue! 💪';
        document.getElementById('drag-feedback').className = 'feedback error';
        playErrorSound();
    }
}

function resetDragGame() {
    initDragGame();
}

// Jogo 8: Memória (melhorado)
function initMemoryGame() {
    gameState.memoryCards = [...memoryCards].sort(() => Math.random() - 0.5);
    gameState.flippedCards = [];
    gameState.matchedPairs = 0;
    scores.memory = 0;
    document.getElementById('memory-score').textContent = '0/4';
    
    const board = document.getElementById('memory-board');
    board.innerHTML = '';
    
    gameState.memoryCards.forEach((card, index) => {
        const button = document.createElement('button');
        button.className = 'memory-card';
        button.dataset.card = card;
        button.dataset.index = index;
        button.textContent = '?';
        button.onclick = () => flipCard(button);
        board.appendChild(button);
    });
    
    document.getElementById('memory-feedback').textContent = '';
}

function flipCard(cardElement) {
    if (cardElement.classList.contains('flipped') || cardElement.classList.contains('matched')) {
        return;
    }
    
    cardElement.classList.add('flipped');
    cardElement.textContent = cardElement.dataset.card;
    gameState.flippedCards.push(cardElement);
    
    if (gameState.flippedCards.length === 2) {
        setTimeout(checkMemoryMatch, 1000);
    }
}

function checkMemoryMatch() {
    const [card1, card2] = gameState.flippedCards;
    
    if (card1.dataset.card === card2.dataset.card) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        gameState.matchedPairs++;
        scores.memory = gameState.matchedPairs;
        document.getElementById('memory-score').textContent = `${gameState.matchedPairs}/4`;
        
        addStar(); // Adicionar estrela
        playSuccessSound();
        
        if (gameState.matchedPairs === 4) {
            document.getElementById('memory-feedback').textContent = '🎊 Incrível! Memória perfeita! 🧠✨';
            document.getElementById('memory-feedback').className = 'feedback success';
            createConfetti();
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '?';
        card2.textContent = '?';
        playErrorSound();
    }
    
    gameState.flippedCards = [];
}

// Event listeners para touch em dispositivos móveis
document.addEventListener('touchstart', handleTouchStart, {passive: false});
document.addEventListener('touchmove', handleTouchMove, {passive: false});
document.addEventListener('touchend', handleTouchEnd, {passive: false});

let draggedElement = null;

function handleTouchStart(e) {
    if (e.target.classList.contains('drag-item')) {
        draggedElement = e.target;
        e.target.style.opacity = '0.5';
    }
}

function handleTouchMove(e) {
    e.preventDefault();
}

function handleTouchEnd(e) {
    if (draggedElement) {
        draggedElement.style.opacity = '1';
        
        const touch = e.changedTouches[0];
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        
        if (elementBelow && elementBelow.classList.contains('drop-zone')) {
            const draggedMatch = draggedElement.dataset.match;
            const dropZoneMatch = elementBelow.dataset.match;
            
            if (draggedMatch === dropZoneMatch) {
                elementBelow.classList.add('correct');
                elementBelow.textContent = '✅ ' + dropZoneMatch;
                draggedElement.remove();
                
                addStar(); // Adicionar estrela
                playSuccessSound();
                
                const remainingItems = document.querySelectorAll('.drag-item');
                if (remainingItems.length === 0) {
                    document.getElementById('drag-feedback').textContent = '🏆 Fantástico! Você completou tudo! 🎉';
                    document.getElementById('drag-feedback').className = 'feedback success';
                    createConfetti();
                }
            } else {
                document.getElementById('drag-feedback').textContent = '🤗 Tente novamente! Você consegue! 💪';
                document.getElementById('drag-feedback').className = 'feedback error';
                playErrorSound();
            }
        }
        
        draggedElement = null;
    }
}

// Novos Jogos

// Jogo 9: Inglês Básico
function initEnglishGame() {
    gameState.englishIndex = 0;
    showEnglishQuestion();
}

function showEnglishQuestion() {
    const question = englishQuestions[gameState.englishIndex];
    document.getElementById('english-question').textContent = question.question;
    
    const optionsDiv = document.getElementById('english-options');
    optionsDiv.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => checkEnglishAnswer(index);
        optionsDiv.appendChild(btn);
    });
    
    document.getElementById('english-feedback').textContent = '';
    document.getElementById('english-next').style.display = 'none';
}

function checkEnglishAnswer(selectedIndex) {
    const question = englishQuestions[gameState.englishIndex];
    const feedback = document.getElementById('english-feedback');
    const buttons = document.querySelectorAll('#english-options .option-btn');
    
    buttons.forEach(btn => btn.disabled = true);
    
    if (selectedIndex === question.correct) {
        buttons[selectedIndex].classList.add('correct');
        feedback.textContent = '🇺🇸 Great! Perfect English! 🌟';
        feedback.className = 'feedback success';
        scores.english++;
        document.getElementById('english-score').textContent = scores.english;
        addStar();
        playSuccessSound();
        createConfetti();
    } else {
        buttons[selectedIndex].classList.add('wrong');
        buttons[question.correct].classList.add('correct');
        feedback.textContent = '📚 Good try! Keep learning! 💪';
        feedback.className = 'feedback error';
        playErrorSound();
    }
    
    document.getElementById('english-next').style.display = 'block';
}

function nextEnglishQuestion() {
    gameState.englishIndex = (gameState.englishIndex + 1) % englishQuestions.length;
    showEnglishQuestion();
}

// Jogo 10: Cores em Inglês
function initColorsEnglishGame() {
    gameState.colorsEnglishIndex = 0;
    showColorsEnglishQuestion();
}

function showColorsEnglishQuestion() {
    const question = colorsEnglishQuestions[gameState.colorsEnglishIndex];
    document.getElementById('colors-english-question').textContent = question.question;
    
    const circlesDiv = document.getElementById('colors-english-circles');
    circlesDiv.innerHTML = '';
    
    question.colors.forEach((color, index) => {
        const circle = document.createElement('div');
        circle.className = 'color-circle';
        circle.style.backgroundColor = color;
        circle.onclick = () => checkColorsEnglishAnswer(index);
        circlesDiv.appendChild(circle);
    });
    
    document.getElementById('colors-english-feedback').textContent = '';
    document.getElementById('colors-english-next').style.display = 'none';
}

function checkColorsEnglishAnswer(selectedIndex) {
    const question = colorsEnglishQuestions[gameState.colorsEnglishIndex];
    const feedback = document.getElementById('colors-english-feedback');
    const circles = document.querySelectorAll('#colors-english-circles .color-circle');
    
    circles.forEach(circle => circle.onclick = null);
    
    if (selectedIndex === question.correct) {
        feedback.textContent = '🇺🇸 Excellent! Right color! 🌈';
        feedback.className = 'feedback success';
        scores.colorsEnglish++;
        document.getElementById('colors-english-score').textContent = scores.colorsEnglish;
        addStar();
        playSuccessSound();
        createConfetti();
    } else {
        feedback.textContent = '🎨 Try again! You can do it! 💪';
        feedback.className = 'feedback error';
        playErrorSound();
    }
    
    document.getElementById('colors-english-next').style.display = 'block';
}

function nextColorsEnglishQuestion() {
    gameState.colorsEnglishIndex = (gameState.colorsEnglishIndex + 1) % colorsEnglishQuestions.length;
    showColorsEnglishQuestion();
}

// Jogo 11: Relógio
function initClockGame() {
    gameState.clockIndex = 0;
    showClockQuestion();
}

function showClockQuestion() {
    const question = clockQuestions[gameState.clockIndex];
    const clockDisplay = document.getElementById('clock-display');
    const time = question.time.split(':');
    const hours = parseInt(time[0]);
    const minutes = parseInt(time[1]);
    
    clockDisplay.innerHTML = `
        <div class="clock">
            <div class="clock-face">
                <div class="hour-hand" style="transform: rotate(${(hours % 12) * 30 + minutes * 0.5}deg)"></div>
                <div class="minute-hand" style="transform: rotate(${minutes * 6}deg)"></div>
                <div class="center-dot"></div>
            </div>
        </div>
    `;
    
    document.getElementById('clock-question').textContent = 'Que horas são?';
    
    const optionsDiv = document.getElementById('clock-options');
    optionsDiv.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => checkClockAnswer(index);
        optionsDiv.appendChild(btn);
    });
    
    document.getElementById('clock-feedback').textContent = '';
    document.getElementById('clock-next').style.display = 'none';
}

function checkClockAnswer(selectedIndex) {
    const question = clockQuestions[gameState.clockIndex];
    const feedback = document.getElementById('clock-feedback');
    const buttons = document.querySelectorAll('#clock-options .option-btn');
    
    buttons.forEach(btn => btn.disabled = true);
    
    if (selectedIndex === question.correct) {
        buttons[selectedIndex].classList.add('correct');
        feedback.textContent = '⏰ Perfeito! Você sabe as horas! 🎉';
        feedback.className = 'feedback success';
        scores.clock++;
        document.getElementById('clock-score').textContent = scores.clock;
        addStar();
        playSuccessSound();
        createConfetti();
    } else {
        buttons[selectedIndex].classList.add('wrong');
        buttons[question.correct].classList.add('correct');
        feedback.textContent = '🕐 Quase! Vamos praticar mais! ⏰';
        feedback.className = 'feedback error';
        playErrorSound();
    }
    
    document.getElementById('clock-next').style.display = 'block';
}

function nextClockQuestion() {
    gameState.clockIndex = (gameState.clockIndex + 1) % clockQuestions.length;
    showClockQuestion();
}

// Jogo 12: Padrões
function initPatternsGame() {
    gameState.patternsIndex = 0;
    showPatternsQuestion();
}

function showPatternsQuestion() {
    const question = patternsQuestions[gameState.patternsIndex];
    const display = document.getElementById('patterns-display');
    
    display.innerHTML = question.pattern.map(item => 
        `<div class="pattern-item">${item}</div>`
    ).join('');
    
    document.getElementById('patterns-question').textContent = 'Complete o padrão:';
    
    const optionsDiv = document.getElementById('patterns-options');
    optionsDiv.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const btn = document.createElement('div');
        btn.className = 'pattern-option';
        btn.textContent = option;
        btn.onclick = () => checkPatternsAnswer(index);
        optionsDiv.appendChild(btn);
    });
    
    document.getElementById('patterns-feedback').textContent = '';
    document.getElementById('patterns-next').style.display = 'none';
}

function checkPatternsAnswer(selectedIndex) {
    const question = patternsQuestions[gameState.patternsIndex];
    const feedback = document.getElementById('patterns-feedback');
    const buttons = document.querySelectorAll('.pattern-option');
    
    buttons.forEach(btn => btn.onclick = null);
    
    if (selectedIndex === question.correct) {
        feedback.textContent = '🎯 Incrível! Padrão completado! ✨';
        feedback.className = 'feedback success';
        scores.patterns++;
        document.getElementById('patterns-score').textContent = scores.patterns;
        addStar();
        playSuccessSound();
        createConfetti();
    } else {
        feedback.textContent = '🧩 Quase! Observe o padrão! 🔍';
        feedback.className = 'feedback error';
        playErrorSound();
    }
    
    document.getElementById('patterns-next').style.display = 'block';
}

function nextPatternsQuestion() {
    gameState.patternsIndex = (gameState.patternsIndex + 1) % patternsQuestions.length;
    showPatternsQuestion();
}

// Jogo 13: Quebra-Palavras
function initWordPuzzleGame() {
    gameState.wordPuzzleIndex = 0;
    gameState.currentPuzzle = null;
    showWordPuzzle();
}

function showWordPuzzle() {
    const puzzle = wordPuzzles[gameState.wordPuzzleIndex];
    gameState.currentPuzzle = puzzle;
    
    document.getElementById('word-image').textContent = puzzle.image;
    
    const lettersDiv = document.getElementById('word-letters');
    lettersDiv.innerHTML = '';
    
    const shuffledLetters = [...puzzle.letters].sort(() => Math.random() - 0.5);
    shuffledLetters.forEach(letter => {
        const btn = document.createElement('button');
        btn.className = 'letter-btn';
        btn.textContent = letter;
        btn.onclick = () => addLetterToWord(letter, btn);
        lettersDiv.appendChild(btn);
    });
    
    const slotsDiv = document.getElementById('word-slots');
    slotsDiv.innerHTML = '';
    
    puzzle.letters.forEach(() => {
        const slot = document.createElement('div');
        slot.className = 'letter-slot';
        slot.textContent = '_';
        slotsDiv.appendChild(slot);
    });
    
    gameState.wordProgress = [];
    document.getElementById('word-feedback').textContent = '';
}

function addLetterToWord(letter, button) {
    if (gameState.wordProgress.length < gameState.currentPuzzle.letters.length) {
        gameState.wordProgress.push(letter);
        button.disabled = true;
        button.style.opacity = '0.5';
        
        const slots = document.querySelectorAll('.letter-slot');
        slots[gameState.wordProgress.length - 1].textContent = letter;
        
        if (gameState.wordProgress.length === gameState.currentPuzzle.letters.length) {
            checkWordComplete();
        }
    }
}

function checkWordComplete() {
    const feedback = document.getElementById('word-feedback');
    const correctWord = gameState.currentPuzzle.word;
    const playerWord = gameState.wordProgress.join('');
    
    if (playerWord === correctWord) {
        feedback.textContent = '🎊 Fantástico! Palavra correta! 📝';
        feedback.className = 'feedback success';
        scores.wordPuzzle++;
        document.getElementById('word-puzzle-score').textContent = scores.wordPuzzle;
        addStar();
        playSuccessSound();
        createConfetti();
    } else {
        feedback.textContent = '🔤 Quase! Tente novamente! 💪';
        feedback.className = 'feedback error';
        playErrorSound();
        setTimeout(resetWordPuzzle, 2000);
    }
}

function resetWordPuzzle() {
    const buttons = document.querySelectorAll('.letter-btn');
    buttons.forEach(btn => {
        btn.disabled = false;
        btn.style.opacity = '1';
    });
    
    const slots = document.querySelectorAll('.letter-slot');
    slots.forEach(slot => slot.textContent = '_');
    
    gameState.wordProgress = [];
    document.getElementById('word-feedback').textContent = '';
}

function nextWordPuzzle() {
    gameState.wordPuzzleIndex = (gameState.wordPuzzleIndex + 1) % wordPuzzles.length;
    showWordPuzzle();
}

// Jogo 14: Conte os Objetos
function initCountGame() {
    gameState.countIndex = 0;
    showCountQuestion();
}

function showCountQuestion() {
    const question = countQuestions[gameState.countIndex];
    const display = document.getElementById('count-objects-display');
    
    display.innerHTML = question.objects.map(obj => 
        `<div class="count-object">${obj}</div>`
    ).join('');
    
    document.getElementById('count-question').textContent = 'Quantos objetos você vê?';
    
    const optionsDiv = document.getElementById('count-options');
    optionsDiv.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => checkCountAnswer(index);
        optionsDiv.appendChild(btn);
    });
    
    document.getElementById('count-feedback').textContent = '';
    document.getElementById('count-next').style.display = 'none';
}

function checkCountAnswer(selectedIndex) {
    const question = countQuestions[gameState.countIndex];
    const feedback = document.getElementById('count-feedback');
    const buttons = document.querySelectorAll('#count-options .option-btn');
    
    buttons.forEach(btn => btn.disabled = true);
    
    if (selectedIndex === question.correct) {
        buttons[selectedIndex].classList.add('correct');
        feedback.textContent = '🔢 Perfeito! Você sabe contar! 🎉';
        feedback.className = 'feedback success';
        scores.count++;
        document.getElementById('count-score').textContent = scores.count;
        addStar();
        playSuccessSound();
        createConfetti();
    } else {
        buttons[selectedIndex].classList.add('wrong');
        buttons[question.correct].classList.add('correct');
        feedback.textContent = '📊 Conte novamente! Você consegue! 💪';
        feedback.className = 'feedback error';
        playErrorSound();
    }
    
    document.getElementById('count-next').style.display = 'block';
}

function nextCountQuestion() {
    gameState.countIndex = (gameState.countIndex + 1) % countQuestions.length;
    showCountQuestion();
}

// Jogo 15: Rimas
function initRhymeGame() {
    gameState.rhymeIndex = 0;
    showRhymeQuestion();
}

function showRhymeQuestion() {
    const question = rhymeQuestions[gameState.rhymeIndex];
    document.getElementById('rhyme-question').textContent = question.question;
    
    const optionsDiv = document.getElementById('rhyme-options');
    optionsDiv.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => checkRhymeAnswer(index);
        optionsDiv.appendChild(btn);
    });
    
    document.getElementById('rhyme-feedback').textContent = '';
    document.getElementById('rhyme-next').style.display = 'none';
}

function checkRhymeAnswer(selectedIndex) {
    const question = rhymeQuestions[gameState.rhymeIndex];
    const feedback = document.getElementById('rhyme-feedback');
    const buttons = document.querySelectorAll('#rhyme-options .option-btn');
    
    buttons.forEach(btn => btn.disabled = true);
    
    if (selectedIndex === question.correct) {
        buttons[selectedIndex].classList.add('correct');
        feedback.textContent = '🎵 Maravilhoso! Rima perfeita! 🎶';
        feedback.className = 'feedback success';
        scores.rhyme++;
        document.getElementById('rhyme-score').textContent = scores.rhyme;
        addStar();
        playSuccessSound();
        createConfetti();
    } else {
        buttons[selectedIndex].classList.add('wrong');
        buttons[question.correct].classList.add('correct');
        feedback.textContent = '🎼 Quase! Escute o som das palavras! 👂';
        feedback.className = 'feedback error';
        playErrorSound();
    }
    
    document.getElementById('rhyme-next').style.display = 'block';
}

function nextRhymeQuestion() {
    gameState.rhymeIndex = (gameState.rhymeIndex + 1) % rhymeQuestions.length;
    showRhymeQuestion();
}

// Jogo 16: Animais em Inglês
function initEnglishAnimalsGame() {
    gameState.englishAnimalsIndex = 0;
    showEnglishAnimalsQuestion();
}

function showEnglishAnimalsQuestion() {
    const question = englishAnimalsQuestions[gameState.englishAnimalsIndex];
    document.getElementById('english-animals-question').textContent = question.question;
    
    const optionsDiv = document.getElementById('english-animals-options');
    optionsDiv.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => checkEnglishAnimalsAnswer(index);
        optionsDiv.appendChild(btn);
    });
    
    document.getElementById('english-animals-feedback').textContent = '';
    document.getElementById('english-animals-next').style.display = 'none';
}

function checkEnglishAnimalsAnswer(selectedIndex) {
    const question = englishAnimalsQuestions[gameState.englishAnimalsIndex];
    const feedback = document.getElementById('english-animals-feedback');
    const buttons = document.querySelectorAll('#english-animals-options .option-btn');
    
    buttons.forEach(btn => btn.disabled = true);
    
    if (selectedIndex === question.correct) {
        buttons[selectedIndex].classList.add('correct');
        feedback.textContent = '🇺🇸 Amazing! Correct animal! 🐾';
        feedback.className = 'feedback success';
        scores.englishAnimals++;
        document.getElementById('english-animals-score').textContent = scores.englishAnimals;
        addStar();
        playSuccessSound();
        createConfetti();
    } else {
        buttons[selectedIndex].classList.add('wrong');
        buttons[question.correct].classList.add('correct');
        feedback.textContent = '🐱 Good try! Keep learning! 📚';
        feedback.className = 'feedback error';
        playErrorSound();
    }
    
    document.getElementById('english-animals-next').style.display = 'block';
}

function nextEnglishAnimalsQuestion() {
    gameState.englishAnimalsIndex = (gameState.englishAnimalsIndex + 1) % englishAnimalsQuestions.length;
    showEnglishAnimalsQuestion();
}

// Jogo 17: Comparação de Tamanhos
function initSizeGame() {
    gameState.sizeIndex = 0;
    showSizeQuestion();
}

function showSizeQuestion() {
    const question = sizeQuestions[gameState.sizeIndex];
    const display = document.getElementById('size-comparison-display');
    
    display.innerHTML = question.objects.map((obj, index) => 
        `<div class="size-object ${obj.size}" data-index="${index}">${obj.emoji}</div>`
    ).join('');
    
    document.getElementById('size-question').textContent = question.question;
    
    const optionsDiv = document.getElementById('size-options');
    optionsDiv.innerHTML = '';
    
    question.objects.forEach((obj, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = obj.emoji;
        btn.onclick = () => checkSizeAnswer(index);
        optionsDiv.appendChild(btn);
    });
    
    document.getElementById('size-feedback').textContent = '';
    document.getElementById('size-next').style.display = 'none';
}

function checkSizeAnswer(selectedIndex) {
    const question = sizeQuestions[gameState.sizeIndex];
    const feedback = document.getElementById('size-feedback');
    const buttons = document.querySelectorAll('#size-options .option-btn');
    
    buttons.forEach(btn => btn.disabled = true);
    
    if (selectedIndex === question.correct) {
        buttons[selectedIndex].classList.add('correct');
        feedback.textContent = '📏 Perfeito! Você sabe comparar! 🎯';
        feedback.className = 'feedback success';
        scores.size++;
        document.getElementById('size-score').textContent = scores.size;
        addStar();
        playSuccessSound();
        createConfetti();
    } else {
        buttons[selectedIndex].classList.add('wrong');
        buttons[question.correct].classList.add('correct');
        feedback.textContent = '🔍 Observe bem os tamanhos! 👀';
        feedback.className = 'feedback error';
        playErrorSound();
    }
    
    document.getElementById('size-next').style.display = 'block';
}

function nextSizeQuestion() {
    gameState.sizeIndex = (gameState.sizeIndex + 1) % sizeQuestions.length;
    showSizeQuestion();
}

// Verificar se já está logado ao carregar
document.addEventListener('DOMContentLoaded', function() {
    loadStars(); // Carregar estrelas salvas
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        showMenu();
    } else {
        showScreen('login-screen');
    }
});
