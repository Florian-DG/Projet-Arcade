const words = ["ordinateur", "javascript", "programmation", "pendu", "developpeur", "isotherme", "abeille", "bateau", "bricolage", "groupe", "seminaire", "projet"]; /* mots possibles */
let chosenWord = words[Math.floor(Math.random() * words.length)];

const wordElement = document.getElementById("word");
const wrongLettersElement = document.querySelector("#wrong-letters span");
const triesElement = document.querySelector("#tries span");
const messageElement = document.getElementById("message");
const restartButton = document.getElementById("restart");

let correctLetters = [];
let wrongLetters = [];
let maxTries = 6; /* nombre d’essais max */

/* affiche le mot avec les lettres trouvées */
function displayWord() {
    wordElement.innerHTML = chosenWord
        .split("")
        .map(letter => (correctLetters.includes(letter) ? letter : "_"))
        .join(" ");

    /* verifie si gagné */
    if (chosenWord.split("").every(letter => correctLetters.includes(letter))) {
        messageElement.textContent = "Bravo, tu as trouvé le mot !";
        document.removeEventListener("keydown", handleKey);
    }
}

/* compteur lettre fausse */
function updateWrongLetters() {
    wrongLettersElement.textContent = wrongLetters.join(", ");
    const triesLeft = maxTries - wrongLetters.length;
    triesElement.textContent = triesLeft;

    /* verifie si perdu */
    if (triesLeft <= 0) {
        messageElement.textContent = `Perdu ! Le mot était : ${chosenWord}`;
        document.removeEventListener("keydown", handleKey);
    }
}

/* touches clavier */
function handleKey(e) {
    const letter = e.key.toLowerCase();
    /* Vérifie que c’est une lettre */
    if (letter.match(/[a-z]/) && letter.length === 1) {
        if (chosenWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            }
        }
    }
}

/* rejouer */
restartButton.addEventListener("click", () => {
    correctLetters = [];
    wrongLetters = [];
    messageElement.textContent = "";
    chosenWord = words[Math.floor(Math.random() * words.length)];
    triesElement.textContent = maxTries;
    document.addEventListener("keydown", handleKey);
    displayWord();
    updateWrongLetters();
});

/* Démarrer */
document.addEventListener("keydown", handleKey);
displayWord();
updateWrongLetters();