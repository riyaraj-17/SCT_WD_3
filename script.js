/* =========================================================
   XOXO — TIC-TAC-TOE PRO
========================================================= */

// ================= ELEMENTS =================
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('statusText');
const dot = document.getElementById('dot');
const timerEl = document.getElementById('timer');
const resetBtn = document.getElementById('resetBtn');
const modeBtns = document.querySelectorAll('.mode-btn');
const themeBtns = document.querySelectorAll('.theme-btn');
const oLabel = document.getElementById('oLabel');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const scoreDraw = document.getElementById('scoreDraw');
const winRateEl = document.getElementById('winRate');
const streakEl = document.getElementById('streak');
const movesEl = document.getElementById('totalMoves');
const confettiContainer = document.getElementById('confettiContainer');

// ================= CONSTANTS =================
const WIN_LINES = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

// ================= STATE =================
let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameOver = false;
let mode = 'cpu';
let scores = { X: 0, O: 0, draw: 0 };
let totalMoves = 0;
let streak = 0;
let timer = 0;
let timerInterval = null;
let isTimerRunning = false;

// ================= THEMES =================
themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        themeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.body.setAttribute('data-theme', btn.dataset.theme);
    });
});

// ================= SCOREBOARD =================
function updateScoreboard() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
    scoreDraw.textContent = scores.draw;
    const total = scores.X + scores.O + scores.draw;
    winRateEl.textContent = total > 0 ? Math.round((scores.X / total) * 100) + '%' : '0%';
    streakEl.textContent = streak;
    movesEl.textContent = totalMoves;
}

// ================= STATUS =================
function setStatus(text, dotClass) {
    statusText.textContent = text;
    dot.className = 'dot ' + dotClass;
}

function updateTurnStatus() {
    if (gameOver) return;
    if (mode === 'cpu') {
        setStatus(currentPlayer === 'X' ? 'Your turn — X' : 'Computer thinking…', currentPlayer.toLowerCase());
    } else {
        setStatus('Player ' + currentPlayer + "'s turn", currentPlayer.toLowerCase());
    }
    startTimer();
}

// ================= TIMER =================
function startTimer() {
    if (gameOver || isTimerRunning) return;
    isTimerRunning = true;
    timer = 0;
    timerInterval = setInterval(() => {
        timer++;
        timerEl.textContent = '⏱ ' + timer + 's';
    }, 1000);
}

function stopTimer() {
    isTimerRunning = false;
    clearInterval(timerInterval);
    timer = 0;
    timerEl.textContent = '⏱ 0s';
}

// ================= RENDER =================
function render() {
    cells.forEach((cell, i) => {
        cell.textContent = board[i] || '';
        cell.className = 'cell';
        if (board[i] === 'X') cell.classList.add('x');
        if (board[i] === 'O') cell.classList.add('o');
        cell.disabled = board[i] !== null || gameOver;
    });
}

// ================= CHECK WINNER =================
function checkWinner(b) {
    for (const line of WIN_LINES) {
        const [a, bIdx, c] = line;
        if (b[a] && b[a] === b[bIdx] && b[a] === b[c]) {
            return { winner: b[a], line: line };
        }
    }
    if (b.every(cell => cell !== null)) return { winner: 'draw', line: null };
    return null;
}

// ================= END GAME =================
function endGame(result) {
    gameOver = true;
    stopTimer();

    if (result.winner === 'draw') {
        setStatus("It's a draw!", 'draw');
        scores.draw++;
    } else {
        result.line.forEach(i => cells[i].classList.add('win'));
        const label = (mode === 'cpu' && result.winner === 'O') ? 'Computer wins! 🤖' : 'Player ' + result.winner + ' wins! 🎉';
        setStatus(label, result.winner.toLowerCase());
        if (result.winner === 'X') streak++;
        else streak = 0;
        scores[result.winner]++;
        spawnConfetti();
    }
    updateScoreboard();
    render();
}

// ================= PLAY MOVE =================
function playAt(index, player) {
    if (board[index] || gameOver) return;

    board[index] = player;
    totalMoves++;
    updateScoreboard();

    const result = checkWinner(board);
    render();
    cells[index].classList.add('pop');

    if (result) {
        endGame(result);
        return;
    }

    currentPlayer = (player === 'X') ? 'O' : 'X';
    updateTurnStatus();

    if (mode === 'cpu' && currentPlayer === 'O' && !gameOver) {
        setTimeout(cpuMove, 400);
    }
}

// ================= CPU MOVE (MINIMAX) =================
function cpuMove() {
    if (gameOver) return;
    const move = getBestMove(board);
    if (move !== -1) playAt(move, 'O');
}

function getBestMove(b) {
    let bestScore = -Infinity;
    let bestMove = -1;
    for (let i = 0; i < 9; i++) {
        if (!b[i]) {
            b[i] = 'O';
            const score = minimax(b, 0, false);
            b[i] = null;
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    return bestMove;
}

function minimax(b, depth, isMaximizing) {
    const result = checkWinner(b);
    if (result) {
        if (result.winner === 'O') return 10 - depth;
        if (result.winner === 'X') return depth - 10;
        return 0;
    }
    if (isMaximizing) {
        let best = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (!b[i]) {
                b[i] = 'O';
                best = Math.max(best, minimax(b, depth + 1, false));
                b[i] = null;
            }
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < 9; i++) {
            if (!b[i]) {
                b[i] = 'X';
                best = Math.min(best, minimax(b, depth + 1, true));
                b[i] = null;
            }
        }
        return best;
    }
}

// ================= CONFETTI =================
function spawnConfetti() {
    const colors = ['#ff4444', '#ff8800', '#c8ff4d', '#ff6a3d', '#ff00ff', '#00ffff', '#ffd700', '#ffd93d'];
    for (let i = 0; i < 60; i++) {
        const el = document.createElement('div');
        el.className = 'confetti';
        el.style.left = Math.random() * 100 + '%';
        el.style.top = '-10px';
        el.style.width = (Math.random() * 8 + 4) + 'px';
        el.style.height = (Math.random() * 8 + 4) + 'px';
        el.style.background = colors[Math.floor(Math.random() * colors.length)];
        el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        el.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
        el.style.animationDelay = (Math.random() * 0.8) + 's';
        confettiContainer.appendChild(el);
        setTimeout(() => el.remove(), 3500);
    }
}

// ================= RESET =================
function resetBoard() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameOver = false;
    stopTimer();
    cells.forEach(c => c.classList.remove('win', 'pop'));
    render();
    updateTurnStatus();
    updateScoreboard();
}

// ================= EVENTS =================
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = Number(cell.dataset.index);
        if (mode === 'cpu' && currentPlayer !== 'X') return;
        playAt(index, currentPlayer);
    });
});

resetBtn.addEventListener('click', resetBoard);

modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        mode = btn.dataset.mode;
        oLabel.textContent = mode === 'cpu' ? '🤖 O' : 'O';
        scores = { X: 0, O: 0, draw: 0 };
        streak = 0;
        totalMoves = 0;
        updateScoreboard();
        resetBoard();
    });
});

// Keyboard: R to reset
document.addEventListener('keydown', (e) => {
    if (e.key === 'r' || e.key === 'R') resetBoard();
});

// ================= INIT =================
render();
updateTurnStatus();
updateScoreboard();
