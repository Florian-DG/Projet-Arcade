let nombreMystere = Math.floor(Math.random() * 100) + 1;
let essaisRestants;


const guessInput = document.querySelector('#guess');
const message = document.querySelector('#message');
const compteur = document.querySelector('#compteur');
const checkBtn = document.querySelector('#checkBtn');
const restartBtn = document.querySelector('#restartBtn');
const difficultySelect = document.querySelector('#difficulty');

function initialiserJeu() {
    const difficulte = difficultySelect.value;
    if (difficulte === 'facile') {
        essaisRestants = 15;
    } else if (difficulte === 'moyen') {
        essaisRestants = 10;
    } else {
        essaisRestants = 5;
    }
    nombreMystere = Math.floor(Math.random() * 100) + 1;
    message.textContent = '';
    guessInput.value = '';
    compteur.textContent = `Essais restants : ${essaisRestants}`;
    guessInput.disabled = false;
    checkBtn.disabled = false;
}

function verifier() {
    const guess = Number(guessInput.value);
    if (!guess || guess < 1 || guess > 100) {
        message.textContent = 'Entre un nombre valide entre 1 et 100 !';
        message.style.color = 'black';
        return;
    }


    essaisRestants--;
    compteur.textContent = `Essais restants : ${essaisRestants}`;


    if (guess === nombreMystere) {
        message.textContent = `🎉 Bravo ! Tu as trouvé le nombre ${nombreMystere} !`;
        message.style.color = 'green';
        finDeJeu();
    } else if (essaisRestants === 0) {
        message.textContent = `😢 C'est fini ! Le nombre mystère était ${nombreMystere}.`;
        message.style.color = 'red';
        finDeJeu();
    } else if (guess < nombreMystere) {
        message.textContent = 'Trop bas ! Essaie encore.';
        message.style.color = 'blue';
    } else {
        message.textContent = 'Trop haut ! Essaie encore.';
        message.style.color = 'orange';
    }
}


function finDeJeu() {
    guessInput.disabled = true;
    checkBtn.disabled = true;
}


function rejouer() {
    initialiserJeu();
}

difficultySelect.addEventListener('change', initialiserJeu);
checkBtn.addEventListener('click', verifier);
restartBtn.addEventListener('click', rejouer);

initialiserJeu()