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
        if (isPlaying) return; // Prevent mode change while game is running

        mode = button.id;
        resetGame();
        updateModeButtonGlow();

        resultDisplay.textContent = `Mode: ${mode.charAt(0).toUpperCase() + mode.slice(1)}`; // Display current mode
    });
});


choiceBtns.forEach(button => {
    button.addEventListener('click', () => {
        if (isPlaying) return; // Prevent changes while playing
        playerChoice = button.innerHTML;
        playerDisplay.innerHTML = playerChoice; // Show only the symbol
    });
});


playBtn.addEventListener('click', async () => {
    if (isPlaying) return; // Prevent multiple clicks
    if (!playerChoice) {
        resultDisplay.textContent = "Choose Rock, Paper, or Scissors!";
        return;
    }

    isPlaying = true;
    playBtn.disabled = true; // Disable play button temporarily
    resultDisplay.textContent = "Auto is choosing...";

    await showAutoChoiceAnimation(); // Show animation before revealing auto choice

    autoChoice = getAutoChoice();
    autoDisplay.innerHTML = autoChoice; // Update auto's choice after animation

    determineWinner(); // Determine and display the result

    // Re-enable the play button after 1 second
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
    if (playerChoice === '🪨'){
        const choices = ['🪨', '✂️'];
        return choices[Math.floor(Math.random() * 2)];
    };
    if (playerChoice === '📄'){
        const choices = ['🪨', '📄'];
        return choices[Math.floor(Math.random() * 2)];
    };
    const choices = [ '📄', '✂️'];
    return choices[Math.floor(Math.random() * 2)];
}

function mediumMode() {
    const choices = ['🪨', '📄', '✂️'];
    return choices[Math.floor(Math.random() * 3)];
}

function hardMode() {
    if (playerChoice === '🪨') {
        const choices = [ '📄', '🪨'];
        return choices[Math.floor(Math.random() * 2)];
    };
    if (playerChoice === '📄') {
        const choices = [ '📄', '✂️'];
        return choices[Math.floor(Math.random() * 2)];
    };
    const choices = ['🪨', '✂️'];
    return choices[Math.floor(Math.random() * 2)];
}

async function showAutoChoiceAnimation() {
    const choices = ['🪨', '📄', '✂️'];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < choices.length; j++) {
            autoDisplay.textContent = `${choices[j]}`;
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
    playerDisplay.textContent = '🧑';
    autoDisplay.textContent = '🤖';
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
