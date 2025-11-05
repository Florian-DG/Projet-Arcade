const board = document.querySelector('#board');
const resetBtn = document.querySelector('#reset');
const message = document.querySelector('#message');
let cells = Array(3).fill('');

function render() {
    board.innerHTML = '';
    cells.forEach((cell, i) => {
        const div = document.createElement('div');
        div.className = 'cell';
        div.textContent = cell;
        div.addEventListener('click', () => play(i));
        board.appendChild(div);
    });
}