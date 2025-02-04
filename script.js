let mode = 'medium';
let playerChoice = '';
let autoChoice = '';
let resultDisplay = document.getElementById('result');
let isPlaying = false; // Prevent multiple clicks on the Play button

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
        if (isPlaying) return; // Prevent changes while playing
        playerChoice = button.innerHTML;
        playerDisplay.textContent = `Player: ${playerChoice}`;
    });
});

playBtn.addEventListener('click', async () => {
    if (isPlaying) return; // Prevent multiple clicks on the Play button
    if (!playerChoice) return alert('Please choose rock, paper, or scissors!');
    
    isPlaying = true;
    playBtn.disabled = true; // Disable play button while the game is running
    
    await showAutoChoiceAnimation();
    autoChoice = getAutoChoice();
    autoDisplay.textContent = `Auto: ${autoChoice}`;
    
    determineWinner();
    
    // Re-enable the play button after 1000ms
    setTimeout(() => {
        isPlaying = false;
        playBtn.disabled = false;
    }, 1000);
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

async function showAutoChoiceAnimation() {
    const choices = ['🪨', '📄', '✂️'];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < choices.length; j++) {
            autoDisplay.textContent = `Auto: ${choices[j]}`;
            await delay(100); // Wait for 100ms before changing
        }
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
