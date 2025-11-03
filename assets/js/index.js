/* rendre toute la case des jeux cliquables */
const maCase = document.getElementById('game-list');
function quandOnCliqueSurLaCase() {
    console.log("Vous avez cliqué sur la case 1 !");
}

maCase.addEventListener('click', quandOnCliqueSurLaCase);