let nombreMystere = Math.floor(Math.random() * 100) + 1;


const guessInput = document.getElementById('guess');
const message = document.getElementById('message');
const checkBtn = document.getElementById('checkBtn');
const restartBtn = document.getElementById('restartBtn');


checkBtn.addEventListener('click', () => {
const guess = Number(guessInput.value);
if (!guess || guess < 1 || guess > 100) {
message.textContent = 'Entre un nombre valide entre 1 et 100 !';
return;
}


if (guess === nombreMystere) {
message.textContent = `Bravo ! Le nombre était ${nombreMystere} 🎉`;
message.style.color = 'green';
} else if (guess < nombreMystere) {
message.textContent = 'Trop bas ! Essaie encore.';
message.style.color = 'blue';
} else {
message.textContent = 'Trop haut ! Essaie encore.';
message.style.color = 'red';
}
});


restartBtn.addEventListener('click', () => {
nombreMystere = Math.floor(Math.random() * 100) + 1;
message.textContent = '';
guessInput.value = '';
});