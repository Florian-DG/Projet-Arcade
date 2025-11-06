const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const scoremaxDisplay = document.getElementById("scoremax");
const resetBtn = document.getElementById("reset");

let score = 0;
let activeCell = null;
let timeLeft = 30; /* durée du jeu en secondes */
let timerInterval = null;
let gameActive = false;
let scoremax = 0;

/* Création du tab */
for (let i = 0; i < 16; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    grid.appendChild(cell);

    /* Clic sur une case */
    cell.addEventListener("click", () => {
        if (!gameActive) return; /* empêche de cliquer quand le jeu est fini */
        if (cell === activeCell) {
            score++;
            scoreDisplay.textContent = score;
            setRandomActiveCell();
        }
    });
}

/* activer une case aléatoire */
function setRandomActiveCell() {
    const cells = document.querySelectorAll(".cell");
    if (activeCell) activeCell.classList.remove("active");

    const randomIndex = Math.floor(Math.random() * cells.length);
    activeCell = cells[randomIndex];
    activeCell.classList.add("active");
}

/* Démarrer le jeu */
function startGame() {
    document.getElementById("endMessage").textContent = "";
    score = 0;
    timeLeft = 30;
    gameActive = true;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    setRandomActiveCell();

    clearInterval(timerInterval);       /*rénitilise ou arrête le timer */
    timerInterval = setInterval(() => {
        timeLeft--;                       /* eneleve 1 seconde */
        timerDisplay.textContent = timeLeft;  /* met à jour le temps sur l'ecran */

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);                         /* 1000 = 1 seconde */
}

/* Fin du jeu */
function endGame() {
    gameActive = false;
    if (activeCell) activeCell.classList.remove("active");

    const endMessage = document.getElementById("endMessage");
    endMessage.textContent = `⏰ Temps écoulé ! Ton score est de ${score} points.`;
    if (score > scoremax) {
        scoremax = score;
        scoremaxDisplay.textContent = scoremax;
    }
}


/* Bouton Recommencer */
resetBtn.addEventListener("click", startGame);

/* Lancer une première partie */
startGame();
