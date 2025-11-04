const board = document.querySelector('#board');
const resetBtn = document.querySelector('#reset');
const message = document.querySelector('#message');
let cells = Array(9).fill('');
let currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
let gameOver = false;


function render() {
    board.innerHTML = '';
    cells.forEach((cell, i) => {
        const div = document.createElement('div');
        div.className = 'cell';
        div.textContent = cell;
        div.addEventListener('click', () => play(i));
        board.appendChild(div);
    });

    if (!gameOver) {
        message.textContent = `C'est au tour de ${currentPlayer}`;
    }
}


function play(i) {
    if (cells[i] || gameOver) return;
    cells[i] = currentPlayer;
    if (checkWin()) {
        message.textContent = `🎉 Bravo ! Le joueur ${currentPlayer} a gagné !`;
        gameOver = true;
    } else if (cells.every(c => c)) {
        message.textContent = `😢 Dommage ! Il n'y a aucun vainqueur !`;
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `C'est au tour de ${currentPlayer}`;
    }
    render();
}


function checkWin() {
    const wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return wins.some(([a, b, c]) => cells[a] && cells[a] === cells[b] && cells[a] === cells[c]);
}

resetBtn.addEventListener('click', () => {
    cells = Array(9).fill('');
    currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
    gameOver = false;
    message.textContent = `C'est au tour de ${currentPlayer}`;
    render();
});

render();
