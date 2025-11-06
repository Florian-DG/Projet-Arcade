const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");
const resetBtn = document.getElementById("reset");

let score = 0;
let activeCell = null;

// Création des 16 cases
for (let i = 0; i < 16; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  grid.appendChild(cell);

  // Gestion du clic sur chaque case
  cell.addEventListener("click", () => {
    if (cell === activeCell) {
      score++;
      scoreDisplay.textContent = score;
      setRandomActiveCell();
    }
  });
}

// Fonction pour allumer une case aléatoire
function setRandomActiveCell() {
  const cells = document.querySelectorAll(".cell");

  // Enlève l'ancienne case active (si elle existe)
  if (activeCell) {
    activeCell.classList.remove("active");
  }

  // Choisir une nouvelle case aléatoire
  const randomIndex = Math.floor(Math.random() * cells.length);
  activeCell = cells[randomIndex];
  activeCell.classList.add("active");
}

// Réinitialiser le jeu
resetBtn.addEventListener("click", () => {
  score = 0;
  scoreDisplay.textContent = score;
  setRandomActiveCell();
});

// Lancer le jeu dès le début
setRandomActiveCell();
