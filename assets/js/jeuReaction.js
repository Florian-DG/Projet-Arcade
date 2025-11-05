const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");
const resetBtn = document.getElementById("reset");

let score = 0;
let activeCell = null;

/* creer le tableau */
for (let i = 0; i < 16; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    grid.appendChild(cell);
    cell.addEventListener("click", () => {
        if (cell === activeCell) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            activateRandomCell();
        }
    });
}

/* activer une case aléatoire */
function setRandomActiveCell() {
    /* Retire l’ancienne case active */
    if (activeCell) activeCell.classList.remove("active");

    /* Bouton Recommencer */
    resetBtn.addEventListener("click", () => {
        score = 0;
        scoreDisplay.textContent = score;
        setRandomActiveCell();
    });
}

    /* Démarrage du jeu */
    setRandomActiveCell();