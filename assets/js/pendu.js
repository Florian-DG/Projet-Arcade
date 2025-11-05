const words = ["ordinateur", "javascript", "programmation", "pendu", "developpeur", "isotherme", "abeille", "bateau", "bricolage", "groupe", "seminaire", "projet", "chat", "place", "efficom", "livre", "question", "piano", "calendrier", "medecin", "ballon", "vodka", "casino", "confortable", "plateau", "etoile", "timbre", "voiture", "fantaisie", "volcan"]; /* mots possibles */
let chosenWord = words[Math.floor(Math.random() * words.length)];

const wordElement = document.getElementById("word");
const wrongLettersElement = document.querySelector("#wrong-letters span");
const triesElement = document.querySelector("#tries span");
const messageElement = document.getElementById("message");
const restartButton = document.getElementById("restart");
const keyboardDiv = document.querySelector("#keyboard");


let correctLetters = [];
let wrongLetters = [];
let maxTries = 8;

/* affiche le mot avec les lettres trouvées */
function displayWord() {
    wordElement.innerHTML = chosenWord
        .split("")
        .map(letter => (correctLetters.includes(letter) ? letter : "_"))
        .join(" ");

    /* verifie si gagné */
    if (chosenWord.split("").every(letter => correctLetters.includes(letter))) {
        messageElement.textContent = "🎉 Bravo, tu as trouvé le mot !";
        document.removeEventListener("keydown", handleKey);
        disableKeyboard();
    }
}

/* affiche le pendu au fur et à mesure */
function drawHangman() {
    const gallowParts = document.querySelectorAll(".gallow");
    const bodyParts = document.querySelectorAll(".body");
    const errors = wrongLetters.length;

    gallowParts.forEach(p => p.style.display = "none");
    bodyParts.forEach(p => p.style.display = "none");

    if (errors >= 1) {
        gallowParts[0].style.display = "block";
        gallowParts[1].style.display = "block";
    }if (errors >= 2) {
        gallowParts[2].style.display = "block";
        gallowParts[3].style.display = "block";
    }for (let i = 0; i < bodyParts.length && i < errors - 2; i++) {
        bodyParts[i].style.display = "block";
    }
}

/* compteur lettre fausse */
function updateWrongLetters() {
    wrongLettersElement.textContent = wrongLetters.join(", ");
    const triesLeft = maxTries - wrongLetters.length;
    triesElement.textContent = triesLeft;
    drawHangman();

    /* verifie si perdu */
    if (triesLeft <= 0) {
        messageElement.textContent = `😢 Perdu ! Le mot était : ${chosenWord}`;
        document.removeEventListener("keydown", handleKey);
        disableKeyboard();
    }
}

/* touches clavier */
function handleKey(e) {
    const letter = e.key.toLowerCase();
    handleLetter(letter);
}

/* Gestion des lettres (physique ou clavier visuel) */
function handleLetter(letter) {
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
        const button = document.querySelector(`#key-${letter}`);
        if (button) button.disabled = true;
    }
}

/* Création du clavier visuel */
function createKeyboard() {
    keyboardDiv.innerHTML = "";
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    alphabet.forEach(letter => {
        const button = document.createElement("button");
        button.textContent = letter.toUpperCase();
        button.id = `key-${letter}`;
        button.addEventListener("click", () => handleLetter(letter));
        keyboardDiv.appendChild(button);
    });
}

/* Désactive le clavier quand fini */
function disableKeyboard() {
    const buttons = keyboardDiv.querySelectorAll("button");
    buttons.forEach(btn => btn.disabled = true);
}

/* rejouer */
restartButton.addEventListener("click", () => {
    correctLetters = [];
    wrongLetters = [];
    messageElement.textContent = "";
    chosenWord = words[Math.floor(Math.random() * words.length)];
    triesElement.textContent = maxTries;
    document.addEventListener("keydown", handleKey);
    createKeyboard();
    displayWord();
    updateWrongLetters();

});

/* Démarrer */
createKeyboard();
document.addEventListener("keydown", handleKey);
displayWord();
updateWrongLetters();
drawHangman();