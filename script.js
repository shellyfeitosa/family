let cards = [];
let targetNumber = 0;
let score = 0;
let totalScore = 0;
let timeLeft = 90;
let timerInterval;
const happyFace = 'feliz.png';
const sadFace = 'triste.png';

// Função para sortear as cartas (valores entre 0 e 10)
function drawCards() {
    cards = [];
    for (let i = 0; i < 4; i++) {
        cards.push(Math.floor(Math.random() * 11));
    }
    document.getElementById('cards-container').innerHTML = cards.map(num => `<div class="card">${num}</div>`).join('');
}

// Função para sortear o número alvo (entre 0 e 100)
function drawTargetNumber() {
    targetNumber = Math.floor(Math.random() * 101);
    document.getElementById('target-number').textContent = `Número Alvo: ${targetNumber}`;
    document.getElementById('equation-input').disabled = false;
    document.getElementById('submit-equation').disabled = false;
}

// Função para iniciar o cronômetro
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time-left').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            document.getElementById('feedback').textContent = 'Tempo esgotado! Fim de jogo.';
            document.getElementById('equation-input').disabled = true;
            document.getElementById('submit-equation').disabled = true;
            document.getElementById('restart-game').style.display = 'block';
        }
    }, 1000);
}

// Função para exibir a imagem de feedback por 2 segundos
function showFeedbackImage(success) {
    const feedbackImage = document.getElementById('feedback-image');
    const emotionImg = document.getElementById('emotion-img');

    emotionImg.src = success ? happyFace : sadFace;
    feedbackImage.style.display = 'block';

    setTimeout(() => {
        feedbackImage.style.display = 'none';
    }, 2000);
}

// Função para verificar a equação
function checkEquation() {
    const userEquation = document.getElementById('equation-input').value;
    try {
        // Verifica se a equação contém apenas os números das cartas e operadores válidos
        if (!/^[0-9\+\-\*\/\(\)\s]+$/.test(userEquation)) {
            throw new Error("A equação contém caracteres inválidos.");
        }

        const result = eval(userEquation);

        // Verifica se o resultado da equação é igual ao número sorteado
        if (result === targetNumber) {
            score += targetNumber;
            totalScore += targetNumber;
            document.getElementById('feedback').textContent = 'Correto! Pontuação adicionada.';
            document.getElementById('score').textContent = score;
            document.getElementById('total-score').textContent = totalScore;
            drawCards(); // Sorteia novas cartas automaticamente
            drawTargetNumber(); // Sorteia um novo número alvo automaticamente
            showFeedbackImage(true); // Mostra imagem de sucesso (feliz)
        } else {
            document.getElementById('feedback').textContent = 'Resposta errada! Tente novamente.';
            showFeedbackImage(false); // Mostra imagem de erro (triste)
        }
    } catch (e) {
        document.getElementById('feedback').textContent = 'Erro na equação! Tente novamente.';
        showFeedbackImage(false); // Mostra imagem de erro (triste)
    }
}

// Função para iniciar o jogo
function startGame() {
    score = 0;
    document.getElementById('score').textContent = score;
    drawCards();
    drawTargetNumber();
    startTimer();
    document.getElementById('restart-game').style.display = 'none';
    document.getElementById('feedback').textContent = '';
}

// Função para reiniciar o jogo
document.getElementById('restart-game').addEventListener('click', () => {
    timeLeft = 90;
    document.getElementById('time-left').textContent = timeLeft;
    startGame();
});

// Inicia o jogo automaticamente ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    startGame();
});

// Evento de clique para verificar a equação
document.getElementById('submit-equation').addEventListener('click', checkEquation);
