document.addEventListener("DOMContentLoaded", () => {
    let playerChoice = null;
    const choices = ["rock", "paper", "scissors"];

    const playerImage = document.getElementById("player-choice");
    const computerImage = document.getElementById("computer-choice");
    const choiceButtons = document.querySelectorAll(".choice-btn");
    const playButton = document.querySelector(".play-btn");
    const resultMessage = document.createElement("p");
    resultMessage.classList.add("result-message");
    document.querySelector(".game-container").appendChild(resultMessage);

    // Player selects move
    choiceButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            playerChoice = choices[index];
            playerImage.src = `${playerChoice}.png`; // Assume images are named rock.png, paper.png, scissors.png
            resetHighlight();
        });
    });

    // Play button event
    playButton.addEventListener("click", () => {
        if (!playerChoice) {
            alert("Please select Rock, Paper, or Scissors first!");
            return;
        }

        // Computer randomly selects a move
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        computerImage.src = `${computerChoice}.png`;

        // Determine result
        let result;
        if (playerChoice === computerChoice) {
            result = "It's a Draw!";
            highlightResult("draw");
        } else if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "paper" && computerChoice === "rock") ||
            (playerChoice === "scissors" && computerChoice === "paper")
        ) {
            result = "You Win!";
            highlightResult("player");
        } else {
            result = "You Lose!";
            highlightResult("computer");
        }

        // Display result
        resultMessage.textContent = result;
    });

    // Reset highlight colors
    function resetHighlight() {
        playerImage.style.backgroundColor = "transparent";
        computerImage.style.backgroundColor = "transparent";
    }

    // Highlight winner and loser
    function highlightResult(winner) {
        if (winner === "player") {
            playerImage.style.backgroundColor = "lightgreen";
            computerImage.style.backgroundColor = "lightcoral";
        } else if (winner === "computer") {
            playerImage.style.backgroundColor = "lightcoral";
            computerImage.style.backgroundColor = "lightgreen";
        } else {
            playerImage.style.backgroundColor = "yellow";
            computerImage.style.backgroundColor = "yellow";
        }
    }
});
