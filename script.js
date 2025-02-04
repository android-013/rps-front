let mode = 'medium';
let playerChoice = '';
let autoChoice = '';

const modes = document.querySelectorAll('.modes button');
const playerDisplay = document.getElementById('playerDisplay');
const autoDisplay = document.getElementById('autoDisplay');
const playBtn = document.getElementById('playBtn');
const choiceBtns = document.querySelectorAll('.choice-btn');

modes.forEach(button => {
    button.addEventListener('click', () => {
        mode = button.id;
        resetGame();
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
        alert('It\'s a draw!');
    } else if (
        (playerChoice === '🪨' && autoChoice === '✂️') ||
        (playerChoice === '📄' && autoChoice === '🪨') ||
        (playerChoice === '✂️' && autoChoice === '📄')
    ) {
        alert('You win!');
    } else {
        alert('You lose!');
    }
}

function resetGame() {
    playerChoice = '';
    autoChoice = '';
    playerDisplay.textContent = 'Player: 🧑';
    autoDisplay.textContent = 'Auto: 🤖';
}
