let mode = 'medium';
let playerChoice = '';
let autoChoice = '';
let resultDisplay = document.getElementById('result');

const modes = document.querySelectorAll('.modes button');
const playerDisplay = document.getElementById('playerDisplay');
const autoDisplay = document.getElementById('autoDisplay');
const playBtn = document.getElementById('playBtn');
const choiceBtns = document.querySelectorAll('.choice-btn');

modes.forEach(button => {
    button.addEventListener('click', () => {
        mode = button.id;
        resetGame();
        updateModeButtonGlow();
    });
});

choiceBtns.forEach(button => {
    button.addEventListener('click', () => {
        playerChoice = button.innerHTML;
        playerDisplay.textContent = `Player: ${playerChoice}`;
    });
});

playBtn.addEventListener('click', () => {
    if (!playerChoice) return alert('Please choose rock, paper, or scissors!');
    autoChoice = getAutoChoice();
    autoDisplay.textContent = `Auto: ${autoChoice}`;
    determineWinner();
});

function getAutoChoice() {
    if (mode === 'easy') {
        return easyMode();
    } else if (mode === 'medium') {
        return mediumMode();
    } else {
        return hardMode();
    }
}

function easyMode() {
    const choices = ['🪨', '📄', '✂️'];
    return choices[Math.floor(Math.random() * 3)];
}

function mediumMode() {
    const choices = ['🪨', '📄', '✂️'];
    return choices[Math.floor(Math.random() * 3)];
}

function hardMode() {
    if (playerChoice === '🪨') return '📄';
    if (playerChoice === '📄') return '✂️';
    return '🪨';
}

function determineWinner() {
    if (playerChoice === autoChoice) {
        resultDisplay.textContent = 'It\'s a draw!';
    } else if (
        (playerChoice === '🪨' && autoChoice === '✂️') ||
        (playerChoice === '📄' && autoChoice === '🪨') ||
        (playerChoice === '✂️' && autoChoice === '📄')
    ) {
        resultDisplay.textContent = 'You win!';
    } else {
        resultDisplay.textContent = 'You lose!';
    }
}

function resetGame() {
    playerChoice = '';
    autoChoice = '';
    playerDisplay.textContent = 'Player: 🧑';
    autoDisplay.textContent = 'Auto: 🤖';
    resultDisplay.textContent = '';
}

function updateModeButtonGlow() {
    modes.forEach(button => {
        button.classList.remove('active');
        if (button.id === mode) {
            button.classList.add('active');
        }
    });
}
