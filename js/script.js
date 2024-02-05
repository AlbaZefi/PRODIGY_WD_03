const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.querySelector('button');
let currentPlayer = 'X';
let gameBoard = Array(9).fill('');
let gameActive = true;

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return gameBoard[a];
    }
  }

  return null;
}

function checkTie() {
  return !gameBoard.includes('');
}

function handleClick(index) {
  if (!gameActive || gameBoard[index] !== '') return;

  gameBoard[index] = currentPlayer;
  renderBoard();

  const winner = checkWinner();
  if (winner) {
    gameActive = false;
    message.textContent = `Player ${winner} wins!`;
  } else if (checkTie()) {
    gameActive = false;
    message.textContent = "It's a tie!";
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function renderBoard() {
  board.innerHTML = '';
  gameBoard.forEach((value, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = value;
    cell.addEventListener('click', () => handleClick(index));
    board.appendChild(cell);
  });
}

function resetGame() {
  gameBoard = Array(9).fill('');
  gameActive = true;
  currentPlayer = 'X';
  message.textContent = `Player ${currentPlayer}'s turn`;
  renderBoard();
}

renderBoard();
message.textContent = `Player ${currentPlayer}'s turn`;
