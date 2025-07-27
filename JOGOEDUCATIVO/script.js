
// Variáveis globais
let currentUser = null;
let stars = 0;
const maxStars = 10;

// Dados dos jogos
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const colors = [
    { name: 'Vermelho', hex: '#FF0000' },
    { name: 'Azul', hex: '#0000FF' },
    { name: 'Verde', hex: '#00FF00' },
    { name: 'Amarelo', hex: '#FFFF00' },
    { name: 'Rosa', hex: '#FF69B4' },
    { name: 'Roxo', hex: '#800080' }
];

const shapes = [
    { name: 'Círculo', emoji: '⭕' },
    { name: 'Quadrado', emoji: '⬜' },
    { name: 'Triângulo', emoji: '🔺' },
    { name: 'Estrela', emoji: '⭐' }
];

// Scores dos jogos
let gameScores = {
    letter: 0,
    color: 0,
    sequence: 0,
    memory: 0,
    math: 0,
    shapes: 0,
    animal: 0,
    english: 0,
    colorsEnglish: 0,
    clock: 0,
    patterns: 0,
    wordPuzzle: 0,
    count: 0,
    rhyme: 0,
    englishAnimals: 0,
    size: 0,
    puzzle: 0,
    typing: 0,
    body: 0,
    food: 0,
    weather: 0,
    emotions: 0,
    transport: 0,
    days: 0,
    profession: 0,
    seasons: 0,
    opposite: 0
};

// Dados dos novos jogos
const bodyParts = [
    { name: 'Cabeça', emoji: '👤' },
    { name: 'Olhos', emoji: '👀' },
    { name: 'Nariz', emoji: '👃' },
    { name: 'Boca', emoji: '👄' },
    { name: 'Mãos', emoji: '👋' },
    { name: 'Pés', emoji: '🦶' }
];

const foodCategories = [
    { name: 'Maçã', category: 'Fruta', emoji: '🍎' },
    { name: 'Banana', category: 'Fruta', emoji: '🍌' },
    { name: 'Cenoura', category: 'Verdura', emoji: '🥕' },
    { name: 'Brócolis', category: 'Verdura', emoji: '🥦' },
    { name: 'Pão', category: 'Carboidrato', emoji: '🍞' },
    { name: 'Arroz', category: 'Carboidrato', emoji: '🍚' }
];

const weatherTypes = [
    { name: 'Sol', emoji: '☀️', description: 'Dia ensolarado' },
    { name: 'Chuva', emoji: '🌧️', description: 'Está chovendo' },
    { name: 'Nuvem', emoji: '☁️', description: 'Dia nublado' },
    { name: 'Neve', emoji: '❄️', description: 'Está nevando' }
];

const emotions = [
    { name: 'Feliz', emoji: '😊' },
    { name: 'Triste', emoji: '😢' },
    { name: 'Bravo', emoji: '😠' },
    { name: 'Surpreso', emoji: '😲' }
];

const transportation = [
    { name: 'Carro', emoji: '🚗' },
    { name: 'Avião', emoji: '✈️' },
    { name: 'Barco', emoji: '🚢' },
    { name: 'Trem', emoji: '🚂' },
    { name: 'Bicicleta', emoji: '🚲' },
    { name: 'Ônibus', emoji: '🚌' }
];

const daysOfWeek = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];

const professions = [
    { name: 'Médico', emoji: '👨‍⚕️' },
    { name: 'Professor', emoji: '👨‍🏫' },
    { name: 'Bombeiro', emoji: '👨‍🚒' },
    { name: 'Polícia', emoji: '👮' },
    { name: 'Cozinheiro', emoji: '👨‍🍳' },
    { name: 'Piloto', emoji: '👨‍✈️' }
];

const seasons = [
    { name: 'Primavera', emoji: '🌸', description: 'Flores e plantas crescem' },
    { name: 'Verão', emoji: '☀️', description: 'Época mais quente do ano' },
    { name: 'Outono', emoji: '🍂', description: 'Folhas ficam amarelas' },
    { name: 'Inverno', emoji: '❄️', description: 'Época mais fria do ano' }
];

const oppositeWords = [
    { word: 'Grande', opposite: 'Pequeno', emoji1: '🐘', emoji2: '🐭' },
    { word: 'Quente', opposite: 'Frio', emoji1: '🔥', emoji2: '❄️' },
    { word: 'Alto', opposite: 'Baixo', emoji1: '🏢', emoji2: '🏠' },
    { word: 'Rápido', opposite: 'Devagar', emoji1: '🚗', emoji2: '🐌' }
];

const typingWords = ['GATO', 'CASA', 'SOL', 'LUA', 'AMOR', 'FLOR', 'MAR', 'CÉU'];

// Função de login
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email && password) {
        currentUser = email;
        showMenu();
        playSuccessSound();
    } else {
        alert('Por favor, preencha todos os campos!');
        playErrorSound();
    }
}

// Função de logout
function logout() {
    currentUser = null;
    document.getElementById('login-screen').classList.add('active');
    document.getElementById('main-menu').classList.remove('active');
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}

// Mostrar menu principal
function showMenu() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById('main-menu').classList.add('active');
    updateStarsDisplay();
}

// Mostrar jogo específico
function showGame(gameId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(gameId).classList.add('active');
    
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
        case 'puzzle-pieces':
            initPuzzleGame();
            break;
        case 'typing-practice':
            initTypingGame();
            break;
        case 'body-parts':
            initBodyGame();
            break;
        case 'food-categories':
            initFoodGame();
            break;
        case 'weather-game':
            initWeatherGame();
            break;
        case 'emotions-game':
            initEmotionsGame();
            break;
        case 'transportation':
            initTransportGame();
            break;
        case 'days-weeks':
            initDaysGame();
            break;
        case 'profession-game':
            initProfessionGame();
            break;
        case 'seasons-game':
            initSeasonsGame();
            break;
        case 'opposite-words':
            initOppositeGame();
            break;
        case 'more-content':
            // Não precisa de inicialização especial
            break;
    }
}

// Sons
function playSuccessSound() {
    document.getElementById('success-sound').play().catch(() => {});
}

function playErrorSound() {
    document.getElementById('error-sound').play().catch(() => {});
}

// Sistema de estrelas
function addStar() {
    if (stars < maxStars) {
        stars++;
        updateStarsDisplay();
        
        if (stars >= maxStars) {
            showRewardModal();
        }
    }
}

function updateStarsDisplay() {
    document.getElementById('stars-counter').textContent = `⭐ Estrelas: ${stars} / ${maxStars}`;
}

function resetStars() {
    if (confirm('Tem certeza que deseja resetar todas as estrelas?')) {
        stars = 0;
        Object.keys(gameScores).forEach(key => gameScores[key] = 0);
        updateStarsDisplay();
        // Reset all score displays
        document.querySelectorAll('[id$="-score"]').forEach(el => el.textContent = '0');
    }
}

function showRewardModal() {
    document.getElementById('reward-message').textContent = 'Parabéns! Você coletou todas as estrelas! 🎉';
    document.getElementById('reward-modal').style.display = 'flex';
}

function closeRewardModal() {
    document.getElementById('reward-modal').style.display = 'none';
}

// Jogo 1: ABC das Letras
let currentLetter = 0;

function initLetterGame() {
    gameScores.letter = 0;
    document.getElementById('letter-score').textContent = gameScores.letter;
    currentLetter = 0;
    nextLetterQuestion();
}

function nextLetterQuestion() {
    if (currentLetter >= letters.length) {
        currentLetter = 0;
    }
    
    const letter = letters[currentLetter];
    document.getElementById('letter-question').textContent = `Clique na letra: ${letter}`;
    
    const options = document.getElementById('letter-options');
    options.innerHTML = '';
    
    // Criar opções (3 incorretas + 1 correta)
    const wrongLetters = letters.filter(l => l !== letter).slice(0, 3);
    const allOptions = [...wrongLetters, letter].sort(() => Math.random() - 0.5);
    
    allOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => checkLetterAnswer(opt, letter);
        options.appendChild(btn);
    });
    
    document.getElementById('letter-feedback').textContent = '';
    document.getElementById('letter-next').style.display = 'none';
}

function checkLetterAnswer(selected, correct) {
    const feedback = document.getElementById('letter-feedback');
    
    if (selected === correct) {
        feedback.textContent = '🎉 Correto! Muito bem!';
        feedback.className = 'feedback correct';
        gameScores.letter++;
        document.getElementById('letter-score').textContent = gameScores.letter;
        addStar();
        playSuccessSound();
        currentLetter++;
        setTimeout(() => {
            nextLetterQuestion();
        }, 1500);
    } else {
        feedback.textContent = '❌ Tente novamente!';
        feedback.className = 'feedback incorrect';
        playErrorSound();
    }
}

// Jogo 2: Mundo das Cores
let currentColor = 0;

function initColorGame() {
    gameScores.color = 0;
    document.getElementById('color-score').textContent = gameScores.color;
    currentColor = 0;
    nextColorQuestion();
}

function nextColorQuestion() {
    if (currentColor >= colors.length) {
        currentColor = 0;
    }
    
    const color = colors[currentColor];
    document.getElementById('color-question').textContent = `Clique na cor: ${color.name}`;
    
    const circles = document.getElementById('color-circles');
    circles.innerHTML = '';
    
    // Criar círculos coloridos
    const wrongColors = colors.filter(c => c.name !== color.name).slice(0, 3);
    const allColors = [...wrongColors, color].sort(() => Math.random() - 0.5);
    
    allColors.forEach(c => {
        const circle = document.createElement('div');
        circle.className = 'color-circle';
        circle.style.backgroundColor = c.hex;
        circle.onclick = () => checkColorAnswer(c.name, color.name);
        circles.appendChild(circle);
    });
    
    document.getElementById('color-feedback').textContent = '';
    document.getElementById('color-next').style.display = 'none';
}

function checkColorAnswer(selected, correct) {
    const feedback = document.getElementById('color-feedback');
    
    if (selected === correct) {
        feedback.textContent = '🎉 Correto! Muito bem!';
        feedback.className = 'feedback correct';
        gameScores.color++;
        document.getElementById('color-score').textContent = gameScores.color;
        addStar();
        playSuccessSound();
        currentColor++;
        setTimeout(() => {
            nextColorQuestion();
        }, 1500);
    } else {
        feedback.textContent = '❌ Tente novamente!';
        feedback.className = 'feedback incorrect';
        playErrorSound();
    }
}

// Jogo 3: Sequência Mágica
let currentSequence = 0;

function initSequenceGame() {
    gameScores.sequence = 0;
    document.getElementById('sequence-score').textContent = gameScores.sequence;
    currentSequence = 0;
    nextSequenceQuestion();
}

function nextSequenceQuestion() {
    const start = currentSequence * 3 + 1;
    const sequence = [start, start + 1, '?', start + 3];
    const missing = start + 2;
    
    document.getElementById('sequence-question').textContent = `Complete a sequência: ${sequence.join(' - ')}`;
    
    const options = document.getElementById('sequence-options');
    options.innerHTML = '';
    
    const wrongNumbers = [missing - 1, missing + 1, missing + 2].filter(n => n > 0);
    const allOptions = [...wrongNumbers, missing].sort(() => Math.random() - 0.5);
    
    allOptions.forEach(num => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = num;
        btn.onclick = () => checkSequenceAnswer(num, missing);
        options.appendChild(btn);
    });
    
    document.getElementById('sequence-feedback').textContent = '';
    document.getElementById('sequence-next').style.display = 'none';
}

function checkSequenceAnswer(selected, correct) {
    const feedback = document.getElementById('sequence-feedback');
    
    if (selected === correct) {
        feedback.textContent = '🎉 Correto! Muito bem!';
        feedback.className = 'feedback correct';
        gameScores.sequence++;
        document.getElementById('sequence-score').textContent = gameScores.sequence;
        addStar();
        playSuccessSound();
        currentSequence++;
        setTimeout(() => {
            nextSequenceQuestion();
        }, 1500);
    } else {
        feedback.textContent = '❌ Tente novamente!';
        feedback.className = 'feedback incorrect';
        playErrorSound();
    }
}

// Jogo 4: Arraste e Solte (versão simplificada com cliques)
function initDragGame() {
    const items = document.getElementById('drag-items');
    const zones = document.getElementById('drop-zones');
    
    items.innerHTML = '<div class="drag-item" onclick="selectDragItem(this, \'🐱\')">🐱</div><div class="drag-item" onclick="selectDragItem(this, \'🐶\')">🐶</div>';
    zones.innerHTML = '<div class="drop-zone" data-target="🐱">Casa do Gato</div><div class="drop-zone" data-target="🐶">Casa do Cachorro</div>';
    
    document.getElementById('drag-feedback').textContent = 'Clique no animal e depois na sua casa!';
}

let selectedDragItem = null;

function selectDragItem(element, animal) {
    document.querySelectorAll('.drag-item').forEach(item => item.classList.remove('selected'));
    element.classList.add('selected');
    selectedDragItem = animal;
}

// Adicionar evento de clique nas zonas
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('drop-zone') && selectedDragItem) {
            const target = e.target.dataset.target;
            const feedback = document.getElementById('drag-feedback');
            
            if (selectedDragItem === target) {
                feedback.textContent = '🎉 Correto! Animal na casa certa!';
                feedback.className = 'feedback correct';
                addStar();
                playSuccessSound();
                setTimeout(() => {
                    resetDragGame();
                }, 2000);
            } else {
                feedback.textContent = '❌ Tente novamente!';
                feedback.className = 'feedback incorrect';
                playErrorSound();
            }
            selectedDragItem = null;
            document.querySelectorAll('.drag-item').forEach(item => item.classList.remove('selected'));
        }
    });
});

function resetDragGame() {
    initDragGame();
}

// Jogo 5: Jogo da Memória
let memoryCards = [];
let flippedCards = [];
let memoryScore = 0;

function initMemoryGame() {
    memoryScore = 0;
    document.getElementById('memory-score').textContent = `${memoryScore}/3`;
    
    const emojis = ['🐱', '🐶', '🐰'];
    memoryCards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    flippedCards = [];
    
    const board = document.getElementById('memory-board');
    board.innerHTML = '';
    
    memoryCards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.textContent = '❓';
        card.onclick = () => flipCard(card, index);
        board.appendChild(card);
    });
    
    document.getElementById('memory-feedback').textContent = 'Encontre os pares!';
}

function flipCard(card, index) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.textContent = memoryCards[index];
        card.classList.add('flipped');
        flippedCards.push({ card, index });
        
        if (flippedCards.length === 2) {
            setTimeout(checkMemoryMatch, 1000);
        }
    }
}

function checkMemoryMatch() {
    const [first, second] = flippedCards;
    const feedback = document.getElementById('memory-feedback');
    
    if (memoryCards[first.index] === memoryCards[second.index]) {
        feedback.textContent = '🎉 Par encontrado!';
        feedback.className = 'feedback correct';
        first.card.classList.add('matched');
        second.card.classList.add('matched');
        memoryScore++;
        document.getElementById('memory-score').textContent = `${memoryScore}/3`;
        addStar();
        playSuccessSound();
        
        if (memoryScore === 3) {
            setTimeout(() => {
                feedback.textContent = '🏆 Parabéns! Você encontrou todos os pares!';
            }, 500);
        }
    } else {
        feedback.textContent = '❌ Tente novamente!';
        feedback.className = 'feedback incorrect';
        first.card.textContent = '❓';
        second.card.textContent = '❓';
        first.card.classList.remove('flipped');
        second.card.classList.remove('flipped');
        playErrorSound();
    }
    
    flippedCards = [];
}

// Jogo 6: Matemática
let currentMath = 0;

function initMathGame() {
    gameScores.math = 0;
    document.getElementById('math-score').textContent = gameScores.math;
    nextMathQuestion();
}

function nextMathQuestion() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 5) + 1;
    const operation = Math.random() > 0.5 ? '+' : '-';
    
    let question, answer;
    if (operation === '+') {
        question = `${a} + ${b} = ?`;
        answer = a + b;
    } else {
        if (a > b) {
            question = `${a} - ${b} = ?`;
            answer = a - b;
        } else {
            question = `${b} - ${a} = ?`;
            answer = b - a;
        }
    }
    
    document.getElementById('math-question').textContent = question;
    
    const options = document.getElementById('math-options');
    options.innerHTML = '';
    
    const wrongAnswers = [answer + 1, answer - 1, answer + 2].filter(n => n >= 0);
    const allOptions = [...wrongAnswers.slice(0, 3), answer].sort(() => Math.random() - 0.5);
    
    allOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => checkMathAnswer(opt, answer);
        options.appendChild(btn);
    });
    
    document.getElementById('math-feedback').textContent = '';
    document.getElementById('math-next').style.display = 'none';
}

function checkMathAnswer(selected, correct) {
    const feedback = document.getElementById('math-feedback');
    
    if (selected === correct) {
        feedback.textContent = '🎉 Correto! Muito bem!';
        feedback.className = 'feedback correct';
        gameScores.math++;
        document.getElementById('math-score').textContent = gameScores.math;
        addStar();
        playSuccessSound();
        setTimeout(() => {
            nextMathQuestion();
        }, 1500);
    } else {
        feedback.textContent = '❌ Tente novamente!';
        feedback.className = 'feedback incorrect';
        playErrorSound();
    }
}

// Implementações básicas para os outros jogos
function initShapesGame() {
    gameScores.shapes = 0;
    document.getElementById('shapes-score').textContent = gameScores.shapes;
    nextShapesQuestion();
}

function nextShapesQuestion() {
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    document.getElementById('shapes-question').textContent = `Qual é esta forma? ${shape.emoji}`;
    
    const options = document.getElementById('shapes-options');
    options.innerHTML = '';
    
    const wrongShapes = shapes.filter(s => s.name !== shape.name).slice(0, 2);
    const allOptions = [...wrongShapes, shape].sort(() => Math.random() - 0.5);
    
    allOptions.forEach(s => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `${s.emoji}<br>${s.name}`;
        btn.onclick = () => checkShapesAnswer(s.name, shape.name);
        options.appendChild(btn);
    });
}

function checkShapesAnswer(selected, correct) {
    const feedback = document.getElementById('shapes-feedback');
    
    if (selected === correct) {
        feedback.textContent = '🎉 Correto!';
        feedback.className = 'feedback correct';
        gameScores.shapes++;
        document.getElementById('shapes-score').textContent = gameScores.shapes;
        addStar();
        playSuccessSound();
        setTimeout(nextShapesQuestion, 1500);
    } else {
        feedback.textContent = '❌ Tente novamente!';
        feedback.className = 'feedback incorrect';
        playErrorSound();
    }
}

// Implementações básicas para os demais jogos
function initAnimalGame() {
    document.getElementById('animal-question').textContent = 'Que animal faz este som? 🐄';
    document.getElementById('animal-options').innerHTML = '<button class="option-btn" onclick="checkAnimal(\'Vaca\')">🐄 Vaca</button><button class="option-btn" onclick="checkAnimal(\'Gato\')">🐱 Gato</button>';
}

function checkAnimal(animal) {
    if (animal === 'Vaca') {
        addStar();
        playSuccessSound();
        document.getElementById('animal-feedback').textContent = '🎉 Correto! A vaca faz Muuu!';
    }
}

function initEnglishGame() {
    document.getElementById('english-question').textContent = 'How do you say "Gato" in English?';
    document.getElementById('english-options').innerHTML = '<button class="option-btn" onclick="checkEnglish(\'Cat\')">Cat</button><button class="option-btn" onclick="checkEnglish(\'Dog\')">Dog</button>';
}

function checkEnglish(word) {
    if (word === 'Cat') {
        addStar();
        playSuccessSound();
        document.getElementById('english-feedback').textContent = '🎉 Correct! Cat is gato!';
    }
}

function initColorsEnglishGame() {
    document.getElementById('colors-english-question').textContent = 'Click on RED:';
    document.getElementById('colors-english-circles').innerHTML = '<div class="color-circle" style="background: red;" onclick="checkEnglishColor(\'red\')"></div><div class="color-circle" style="background: blue;" onclick="checkEnglishColor(\'blue\')"></div>';
}

function checkEnglishColor(color) {
    if (color === 'red') {
        addStar();
        playSuccessSound();
        document.getElementById('colors-english-feedback').textContent = '🎉 Correct!';
    }
}

function initClockGame() {
    document.getElementById('clock-question').textContent = 'Que horas são? 🕐';
    document.getElementById('clock-options').innerHTML = '<button class="option-btn" onclick="checkClock(\'1:00\')">1:00</button><button class="option-btn" onclick="checkClock(\'2:00\')">2:00</button>';
}

function checkClock(time) {
    if (time === '1:00') {
        addStar();
        playSuccessSound();
        document.getElementById('clock-feedback').textContent = '🎉 Correto!';
    }
}

function initPatternsGame() {
    document.getElementById('patterns-question').textContent = 'Complete o padrão: 🔴🔵🔴?';
    document.getElementById('patterns-options').innerHTML = '<button class="option-btn" onclick="checkPattern(\'🔵\')">🔵</button><button class="option-btn" onclick="checkPattern(\'🔴\')">🔴</button>';
}

function checkPattern(pattern) {
    if (pattern === '🔵') {
        addStar();
        playSuccessSound();
        document.getElementById('patterns-feedback').textContent = '🎉 Correto!';
    }
}

function initWordPuzzleGame() {
    document.getElementById('word-image').textContent = '🐱';
    document.getElementById('word-letters').innerHTML = '<button onclick="addLetter(\'G\')">G</button><button onclick="addLetter(\'A\')">A</button><button onclick="addLetter(\'T\')">T</button><button onclick="addLetter(\'O\')">O</button>';
    document.getElementById('word-slots').innerHTML = '<span>G</span><span>A</span><span>T</span><span>O</span>';
}

function nextWordPuzzle() {
    initWordPuzzleGame();
}

function initCountGame() {
    document.getElementById('count-objects-display').textContent = '🍎🍎🍎';
    document.getElementById('count-question').textContent = 'Quantas maçãs você vê?';
    document.getElementById('count-options').innerHTML = '<button class="option-btn" onclick="checkCount(3)">3</button><button class="option-btn" onclick="checkCount(2)">2</button>';
}

function checkCount(num) {
    if (num === 3) {
        addStar();
        playSuccessSound();
        document.getElementById('count-feedback').textContent = '🎉 Correto!';
    }
}

function initRhymeGame() {
    document.getElementById('rhyme-question').textContent = 'Qual palavra rima com "GATO"?';
    document.getElementById('rhyme-options').innerHTML = '<button class="option-btn" onclick="checkRhyme(\'PATO\')">PATO</button><button class="option-btn" onclick="checkRhyme(\'CASA\')">CASA</button>';
}

function checkRhyme(word) {
    if (word === 'PATO') {
        addStar();
        playSuccessSound();
        document.getElementById('rhyme-feedback').textContent = '🎉 Correto!';
    }
}

function initEnglishAnimalsGame() {
    document.getElementById('english-animals-question').textContent = 'What animal is this? 🐶';
    document.getElementById('english-animals-options').innerHTML = '<button class="option-btn" onclick="checkEnglishAnimal(\'Dog\')">🐶 Dog</button><button class="option-btn" onclick="checkEnglishAnimal(\'Cat\')">🐱 Cat</button>';
}

function checkEnglishAnimal(animal) {
    if (animal === 'Dog') {
        addStar();
        playSuccessSound();
        document.getElementById('english-animals-feedback').textContent = '🎉 Correct!';
    }
}

function initSizeGame() {
    document.getElementById('size-comparison-display').textContent = '🐘 🐭';
    document.getElementById('size-question').textContent = 'Qual é maior?';
    document.getElementById('size-options').innerHTML = '<button class="option-btn" onclick="checkSize(\'Elefante\')">🐘 Elefante</button><button class="option-btn" onclick="checkSize(\'Rato\')">🐭 Rato</button>';
}

function checkSize(animal) {
    if (animal === 'Elefante') {
        addStar();
        playSuccessSound();
        document.getElementById('size-feedback').textContent = '🎉 Correto!';
    }
}

// Jogo 18: Monte o Quebra-Cabeça
let currentPuzzle = 0;
const puzzles = [
    { image: '🐱', pieces: ['🐱', '🐶', '🐰'], correct: '🐱', name: 'Gato' },
    { image: '🌸', pieces: ['🌸', '🌻', '🌹'], correct: '🌸', name: 'Flor' },
    { image: '🚗', pieces: ['🚗', '🚲', '✈️'], correct: '🚗', name: 'Carro' }
];

function initPuzzleGame() {
    gameScores.puzzle = 0;
    document.getElementById('puzzle-score').textContent = gameScores.puzzle;
    currentPuzzle = 0;
    nextPuzzle();
}

function nextPuzzle() {
    if (currentPuzzle >= puzzles.length) currentPuzzle = 0;
    
    const puzzle = puzzles[currentPuzzle];
    document.getElementById('puzzle-image').innerHTML = `<div class="puzzle-target">${puzzle.image}</div><p>Monte: ${puzzle.name}</p>`;
    
    const container = document.getElementById('puzzle-pieces-container');
    container.innerHTML = '';
    
    puzzle.pieces.forEach(piece => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = piece;
        btn.onclick = () => checkPuzzlePiece(piece, puzzle.correct);
        container.appendChild(btn);
    });
    
    document.getElementById('puzzle-feedback').textContent = '';
}

function checkPuzzlePiece(selected, correct) {
    const feedback = document.getElementById('puzzle-feedback');
    
    if (selected === correct) {
        feedback.textContent = '🎉 Peça certa! Quebra-cabeça montado!';
        feedback.className = 'feedback correct';
        gameScores.puzzle++;
        document.getElementById('puzzle-score').textContent = gameScores.puzzle;
        addStar();
        playSuccessSound();
        currentPuzzle++;
        setTimeout(() => {
            nextPuzzle();
        }, 2000);
    } else {
        feedback.textContent = '❌ Peça errada! Tente outra!';
        feedback.className = 'feedback incorrect';
        playErrorSound();
    }
}

// Jogo 19: Aprenda a Digitar
let currentTypingWord = 0;

function initTypingGame() {
    gameScores.typing = 0;
    document.getElementById('typing-score').textContent = gameScores.typing;
    currentTypingWord = 0;
    nextTypingWord();
}

function nextTypingWord() {
    if (currentTypingWord >= typingWords.length) currentTypingWord = 0;
    
    const word = typingWords[currentTypingWord];
    document.getElementById('typing-word').textContent = word;
    document.getElementById('typing-input').value = '';
    document.getElementById('typing-feedback').textContent = 'Digite a palavra acima!';
    document.getElementById('typing-input').focus();
}

function checkTyping() {
    const input = document.getElementById('typing-input').value.toUpperCase();
    const word = typingWords[currentTypingWord];
    const feedback = document.getElementById('typing-feedback');
    
    if (input === word) {
        feedback.textContent = '🎉 Perfeito! Palavra digitada corretamente!';
        feedback.className = 'feedback correct';
        gameScores.typing++;
        document.getElementById('typing-score').textContent = gameScores.typing;
        addStar();
        playSuccessSound();
        currentTypingWord++;
        setTimeout(() => {
            nextTypingWord();
        }, 2000);
    } else if (word.startsWith(input) && input.length > 0) {
        feedback.textContent = '✍️ Continue digitando...';
        feedback.className = 'feedback';
    }
}

// Jogo 20: Partes do Corpo
let currentBodyPart = 0;

function initBodyGame() {
    gameScores.body = 0;
    document.getElementById('body-score').textContent = gameScores.body;
    currentBodyPart = 0;
    nextBodyQuestion();
}

function nextBodyQuestion() {
    if (currentBodyPart >= bodyParts.length) currentBodyPart = 0;
    
    const bodyPart = bodyParts[currentBodyPart];
    document.getElementById('body-question').textContent = `Qual parte do corpo é esta? ${bodyPart.emoji}`;
    
    const options = document.getElementById('body-options');
    options.innerHTML = '';
    
    const wrongParts = bodyParts.filter(p => p.name !== bodyPart.name).slice(0, 2);
    const allOptions = [...wrongParts, bodyPart].sort(() => Math.random() - 0.5);
    
    allOptions.forEach(part => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = part.name;
        btn.onclick = () => checkBodyAnswer(part.name, bodyPart.name);
        options.appendChild(btn);
    });
    
    document.getElementById('body-feedback').textContent = '';
}

function checkBodyAnswer(selected, correct) {
    const feedback = document.getElementById('body-feedback');
    
    if (selected === correct) {
        feedback.textContent = '🎉 Correto! Você conhece bem o corpo humano!';
        feedback.className = 'feedback correct';
        gameScores.body++;
        document.getElementById('body-score').textContent = gameScores.body;
        addStar();
        playSuccessSound();
        currentBodyPart++;
        setTimeout(() => {
            nextBodyQuestion();
        }, 1500);
    } else {
        feedback.textContent = '❌ Tente novamente!';
        feedback.className = 'feedback incorrect';
        playErrorSound();
    }
}

// Jogo 21: Tipos de Comida
let currentFood = 0;

function initFoodGame() {
    gameScores.food = 0;
    document.getElementById('food-score').textContent = gameScores.food;
    currentFood = 0;
    nextFoodQuestion();
}

function nextFoodQuestion() {
    if (currentFood >= foodCategories.length) currentFood = 0;
    
    const food = foodCategories[currentFood];
    document.getElementById('food-question').textContent = `${food.emoji} ${food.name} é que tipo de comida?`;
    
    const options = document.getElementById('food-options');
    options.innerHTML = '';
    
    const categories = ['Fruta', 'Verdura', 'Carboidrato'];
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = category;
        btn.onclick = () => checkFoodAnswer(category, food.category);
        options.appendChild(btn);
    });
    
    document.getElementById('food-feedback').textContent = '';
}

function checkFoodAnswer(selected, correct) {
    const feedback = document.getElementById('food-feedback');
    
    if (selected === correct) {
        feedback.textContent = '🎉 Correto! Você sabe sobre alimentação!';
        feedback.className = 'feedback correct';
        gameScores.food++;
        document.getElementById('food-score').textContent = gameScores.food;
        addStar();
        playSuccessSound();
        currentFood++;
        setTimeout(() => {
            nextFoodQuestion();
        }, 1500);
    } else {
        feedback.textContent = '❌ Tente novamente!';
        feedback.className = 'feedback incorrect';
        playErrorSound();
    }
}

// Jogo 22: Como Está o Tempo?
let currentWeather = 0;

function initWeatherGame() {
    gameScores.weather = 0;
    document.getElementById('weather-score').textContent = gameScores.weather;
    currentWeather = 0;
    nextWeatherQuestion();
}

function nextWeatherQuestion() {
    if (currentWeather >= weatherTypes.length) currentWeather = 0;
    
    const weather = weatherTypes[currentWeather];
    document.getElementById('weather-question').textContent = `Como está o tempo? ${weather.emoji}`;
    
    const options = document.getElementById('weather-options');
    options.innerHTML = '';
    
    const wrongWeathers = weatherTypes.filter(w => w.name !== weather.name).slice(0, 2);
    const allOptions = [...wrongWeathers, weather].sort(() => Math.random() - 0.5);
    
    allOptions.forEach(w => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `${w.emoji}<br>${w.name}`;
        btn.onclick = () => checkWeatherAnswer(w.name, weather.name);
        options.appendChild(btn);
    });
    
    document.getElementById('weather-feedback').textContent = '';
}

function checkWeatherAnswer(selected, correct) {
    const feedback = document.getElementById('weather-feedback');
    
    if (selected === correct) {
        feedback.textContent = '🎉 Correto! Você entende o clima!';
        feedback.className = 'feedback correct';
        gameScores.weather++;
        document.getElementById('weather-score').textContent = gameScores.weather;
        addStar();
        playSuccessSound();
        currentWeather++;
        setTimeout(() => {
            nextWeatherQuestion();
        }, 1500);
    } else {
        feedback.textContent = '❌ Tente novamente!';
        feedback.className = 'feedback incorrect';
        playErrorSound();
    }
}

// Jogo 23: Sentimentos
let currentEmotion = 0;

function initEmotionsGame() {
    gameScores.emotions = 0;
    document.getElementById('emotions-score').textContent = gameScores.emotions;
    currentEmotion = 0;
    nextEmotionsQuestion();
}

function nextEmotionsQuestion() {
    if (currentEmotion >= emotions.length) currentEmotion = 0;
    
    const emotion = emotions[currentEmotion];
    document.getElementById('emotions-question').textContent = `Que sentimento é este? ${emotion.emoji}`;
    
    const options = document.getElementById('emotions-options');
    options.innerHTML = '';
    
    const wrongEmotions = emotions.filter(e => e.name !== emotion.name).slice(0, 2);
    const allOptions = [...wrongEmotions, emotion].sort(() => Math.random() - 0.5);
    
    allOptions.forEach(e => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = e.name;
        btn.onclick = () => checkEmotionsAnswer(e.name, emotion.name);
        options.appendChild(btn);
    });
    
    document.getElementById('emotions-feedback').textContent = '';
}

function checkEmotionsAnswer(selected, correct) {
    const feedback = document.getElementById('emotions-feedback');
    
    if (selected === correct) {
        feedback.textContent = '🎉 Correto! Você entende os sentimentos!';
        feedback.className = 'feedback correct';
        gameScores.emotions++;
        document.getElementById('emotions-score').textContent = gameScores.emotions;
        addStar();
        playSuccessSound();
        currentEmotion++;
        setTimeout(() => {
            nextEmotionsQuestion();
        }, 1500);
    } else {
        feedback.textContent = '❌ Tente novamente!';
        feedback.className = 'feedback incorrect';
        playErrorSound();
    }
}

// Implementações simplificadas dos demais jogos
function initTransportGame() {
    gameScores.transport = 0;
    document.getElementById('transport-score').textContent = gameScores.transport;
    nextTransportQuestion();
}

function nextTransportQuestion() {
    const transport = transportation[Math.floor(Math.random() * transportation.length)];
    document.getElementById('transport-question').textContent = `Que meio de transporte é este? ${transport.emoji}`;
    
    const options = document.getElementById('transport-options');
    options.innerHTML = '';
    
    const wrongTransports = transportation.filter(t => t.name !== transport.name).slice(0, 2);
    const allOptions = [...wrongTransports, transport].sort(() => Math.random() - 0.5);
    
    allOptions.forEach(t => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = t.name;
        btn.onclick = () => checkTransportAnswer(t.name, transport.name);
        options.appendChild(btn);
    });
}

function checkTransportAnswer(selected, correct) {
    const feedback = document.getElementById('transport-feedback');
    
    if (selected === correct) {
        feedback.textContent = '🎉 Correto!';
        feedback.className = 'feedback correct';
        gameScores.transport++;
        document.getElementById('transport-score').textContent = gameScores.transport;
        addStar();
        playSuccessSound();
        setTimeout(nextTransportQuestion, 1500);
    } else {
        feedback.textContent = '❌ Tente novamente!';
        feedback.className = 'feedback incorrect';
        playErrorSound();
    }
}

function initDaysGame() {
    gameScores.days = 0;
    document.getElementById('days-score').textContent = gameScores.days;
    nextDaysQuestion();
}

function nextDaysQuestion() {
    const dayIndex = Math.floor(Math.random() * daysOfWeek.length);
    const nextDayIndex = (dayIndex + 1) % daysOfWeek.length;
    
    document.getElementById('days-question').textContent = `Que dia vem depois de ${daysOfWeek[dayIndex]}?`;
    
    const options = document.getElementById('days-options');
    options.innerHTML = '';
    
    const wrongDays = daysOfWeek.filter((d, i) => i !== nextDayIndex).slice(0, 2);
    const allOptions = [...wrongDays, daysOfWeek[nextDayIndex]].sort(() => Math.random() - 0.5);
    
    allOptions.forEach(day => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = day;
        btn.onclick = () => checkDaysAnswer(day, daysOfWeek[nextDayIndex]);
        options.appendChild(btn);
    });
}

function checkDaysAnswer(selected, correct) {
    const feedback = document.getElementById('days-feedback');
    
    if (selected === correct) {
        feedback.textContent = '🎉 Correto!';
        feedback.className = 'feedback correct';
        gameScores.days++;
        document.getElementById('days-score').textContent = gameScores.days;
        addStar();
        playSuccessSound();
        setTimeout(nextDaysQuestion, 1500);
    } else {
        feedback.textContent = '❌ Tente novamente!';
        feedback.className = 'feedback incorrect';
        playErrorSound();
    }
}

function initProfessionGame() {
    gameScores.profession = 0;
    document.getElementById('profession-score').textContent = gameScores.profession;
    nextProfessionQuestion();
}

function nextProfessionQuestion() {
    const profession = professions[Math.floor(Math.random() * professions.length)];
    document.getElementById('profession-question').textContent = `Que profissão é esta? ${profession.emoji}`;
    
    const options = document.getElementById('profession-options');
    options.innerHTML = '';
    
    const wrongProfessions = professions.filter(p => p.name !== profession.name).slice(0, 2);
    const allOptions = [...wrongProfessions, profession].sort(() => Math.random() - 0.5);
    
    allOptions.forEach(p => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = p.name;
        btn.onclick = () => checkProfessionAnswer(p.name, profession.name);
        options.appendChild(btn);
    });
}

function checkProfessionAnswer(selected, correct) {
    const feedback = document.getElementById('profession-feedback');
    
    if (selected === correct) {
        feedback.textContent = '🎉 Correto!';
        feedback.className = 'feedback correct';
        gameScores.profession++;
        document.getElementById('profession-score').textContent = gameScores.profession;
        addStar();
        playSuccessSound();
        setTimeout(nextProfessionQuestion, 1500);
    } else {
        feedback.textContent = '❌ Tente novamente!';
        feedback.className = 'feedback incorrect';
        playErrorSound();
    }
}

function initSeasonsGame() {
    gameScores.seasons = 0;
    document.getElementById('seasons-score').textContent = gameScores.seasons;
    nextSeasonsQuestion();
}

function nextSeasonsQuestion() {
    const season = seasons[Math.floor(Math.random() * seasons.length)];
    document.getElementById('seasons-question').textContent = `${season.emoji} ${season.description}. Que estação é?`;
    
    const options = document.getElementById('seasons-options');
    options.innerHTML = '';
    
    const wrongSeasons = seasons.filter(s => s.name !== season.name).slice(0, 2);
    const allOptions = [...wrongSeasons, season].sort(() => Math.random() - 0.5);
    
    allOptions.forEach(s => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = s.name;
        btn.onclick = () => checkSeasonsAnswer(s.name, season.name);
        options.appendChild(btn);
    });
}

function checkSeasonsAnswer(selected, correct) {
    const feedback = document.getElementById('seasons-feedback');
    
    if (selected === correct) {
        feedback.textContent = '🎉 Correto!';
        feedback.className = 'feedback correct';
        gameScores.seasons++;
        document.getElementById('seasons-score').textContent = gameScores.seasons;
        addStar();
        playSuccessSound();
        setTimeout(nextSeasonsQuestion, 1500);
    } else {
        feedback.textContent = '❌ Tente novamente!';
        feedback.className = 'feedback incorrect';
        playErrorSound();
    }
}

function initOppositeGame() {
    gameScores.opposite = 0;
    document.getElementById('opposite-score').textContent = gameScores.opposite;
    nextOppositeQuestion();
}

function nextOppositeQuestion() {
    const oppositePair = oppositeWords[Math.floor(Math.random() * oppositeWords.length)];
    document.getElementById('opposite-question').textContent = `${oppositePair.emoji1} Qual é o oposto de "${oppositePair.word}"?`;
    
    const options = document.getElementById('opposite-options');
    options.innerHTML = '';
    
    const wrongWords = oppositeWords.filter(o => o.opposite !== oppositePair.opposite).map(o => o.opposite).slice(0, 2);
    const allOptions = [...wrongWords, oppositePair.opposite].sort(() => Math.random() - 0.5);
    
    allOptions.forEach(word => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = word;
        btn.onclick = () => checkOppositeAnswer(word, oppositePair.opposite);
        options.appendChild(btn);
    });
}

function checkOppositeAnswer(selected, correct) {
    const feedback = document.getElementById('opposite-feedback');
    
    if (selected === correct) {
        feedback.textContent = '🎉 Correto! Você entende os opostos!';
        feedback.className = 'feedback correct';
        gameScores.opposite++;
        document.getElementById('opposite-score').textContent = gameScores.opposite;
        addStar();
        playSuccessSound();
        setTimeout(nextOppositeQuestion, 1500);
    } else {
        feedback.textContent = '❌ Tente novamente!';
        feedback.className = 'feedback incorrect';
        playErrorSound();
    }
}

// Sistema de abas
function showTab(tabName) {
    // Remove active de todos os botões e conteúdos
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Adiciona active ao botão e conteúdo selecionado
    document.querySelector(`[onclick="showTab('${tabName}')"]`).classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    // Atualiza estatísticas se for a aba de stats
    if (tabName === 'stats') {
        updateStatistics();
    }
}

// Atualizar estatísticas
function updateStatistics() {
    // Total de estrelas
    document.getElementById('total-stars').textContent = stars;
    
    // Total de jogos jogados (soma de todos os scores)
    const totalGames = Object.values(gameScores).reduce((sum, score) => sum + score, 0);
    document.getElementById('games-played').textContent = totalGames;
    
    // Taxa de acerto estimada (baseada em tentativas)
    const accuracyRate = totalGames > 0 ? Math.min(95, Math.round((stars / totalGames) * 100)) : 0;
    document.getElementById('accuracy-rate').textContent = accuracyRate + '%';
    
    // Tempo jogado estimado (2 minutos por jogo)
    const timePlayedMinutes = totalGames * 2;
    document.getElementById('time-played').textContent = timePlayedMinutes;
    
    // Atualizar conquistas
    updateAchievements();
}

// Atualizar conquistas
function updateAchievements() {
    const achievements = {
        'first-star': stars >= 1,
        'five-stars': stars >= 5,
        'all-stars': stars >= maxStars,
        'math-expert': gameScores.math >= 10
    };
    
    Object.keys(achievements).forEach(achievementId => {
        const element = document.getElementById(achievementId);
        if (achievements[achievementId]) {
            element.classList.add('unlocked');
        } else {
            element.classList.remove('unlocked');
        }
    });
}

// Sobrescrever função addStar para atualizar estatísticas
const originalAddStar = addStar;
addStar = function() {
    originalAddStar();
    updateAchievements();
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    updateStarsDisplay();
    updateStatistics();
});
