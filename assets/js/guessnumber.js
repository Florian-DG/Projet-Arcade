let nombreMystere = Math.floor(Math.random() * 100) + 1;
let essaisRestants = 10;


const guessInput = document.querySelector('#guess');
const message = document.querySelector('#message');
const compteur = document.querySelector('#compteur');
const checkBtn = document.querySelector('#checkBtn');
const restartBtn = document.querySelector('#restartBtn');


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
    nombreMystere = Math.floor(Math.random() * 100) + 1;
    essaisRestants = 10;
    message.textContent = '';
    guessInput.value = '';
    compteur.textContent = 'Essais restants : 10';
    guessInput.disabled = false;
    checkBtn.disabled = false;
}


checkBtn.addEventListener('click', verifier);
restartBtn.addEventListener('click', rejouer);