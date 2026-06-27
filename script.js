let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let mode = 'ai';
let scores = {
    user: 0,
    computer: 0,
    draw: 0
};

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function setMode(newMode) {
    mode = newMode;
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    resetGame();
}

function checkWinner(boardState) {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return null;
}

function isBoardFull() {
    return board.every(cell => cell !== '');
}

function updateDisplay() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
        cell.classList.remove('x', 'o');
        if (board[index] === 'X') cell.classList.add('x');
        if (board[index] === 'O') cell.classList.add('o');
    });

    document.getElementById('userScore').textContent = scores.user;
    document.getElementById('computerScore').textContent = scores.computer;
    document.getElementById('drawScore').textContent = scores.draw;
}

function updateStatus(message) {
    document.getElementById('status').textContent = message;
}

function makeMove(index) {
    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    updateDisplay();

    const winner = checkWinner(board);
    if (winner) {
        gameActive = false;
        if (winner === 'X') {
            scores.user++;
            updateStatus('You won! 🎉');
        } else {
            scores.computer++;
            updateStatus('Computer won! 🤖');
        }
        updateDisplay();
        return;
    }

    if (isBoardFull()) {
        gameActive = false;
        scores.draw++;
        updateStatus("It's a draw! 🤝");
        updateDisplay();
        return;
    }

    if (mode === 'ai') {
        currentPlayer = 'O';
        updateStatus('Computer thinking...');
        setTimeout(computerMove, 500);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus(`${currentPlayer}'s turn`);
    }
}

function computerMove() {
    const emptyIndices = board
        .map((cell, index) => cell === '' ? index : null)
        .filter(val => val !== null);

    if (emptyIndices.length === 0) return;

    let bestMove = findBestMove();
    if (bestMove === -1) {
        bestMove = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }

    board[bestMove] = 'O';
    updateDisplay();

    const winner = checkWinner(board);
    if (winner) {
        gameActive = false;
        if (winner === 'X') {
            scores.user++;
            updateStatus('You won! 🎉');
        } else {
            scores.computer++;
            updateStatus('Computer won! 🤖');
        }
        updateDisplay();
        return;
    }

    if (isBoardFull()) {
        gameActive = false;
        scores.draw++;
        updateStatus("It's a draw! 🤝");
        updateDisplay();
        return;
    }

    currentPlayer = 'X';
    updateStatus('Your turn (X)');
}

function findBestMove() {
    // Try to win
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            if (checkWinner(board) === 'O') {
                board[i] = '';
                return i;
            }
            board[i] = '';
        }
    }

    // Block player from winning
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'X';
            if (checkWinner(board) === 'X') {
                board[i] = '';
                return i;
            }
            board[i] = '';
        }
    }

    // Take center
    if (board[4] === '') return 4;

    // Take corners
    const corners = [0, 2, 6, 8];
    const emptyCorners = corners.filter(i => board[i] === '');
    if (emptyCorners.length > 0) {
        return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
    }

    return -1;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    updateDisplay();
    if (mode === 'ai') {
        updateStatus('Your turn (X)');
    } else {
        updateStatus("X's turn");
    }
}

function resetScores() {
    scores = { user: 0, computer: 0, draw: 0 };
    resetGame();
    updateDisplay();
}

// Initialize
updateDisplay();
