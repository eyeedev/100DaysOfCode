let squares = document.querySelectorAll(".square");
let board = document.querySelector(".board");
let playerX = document.querySelector(".player-X");
let playerO = document.querySelector(".player-O");
const message = document.createElement("h2");
message.style.fontSize = "18px";
board.after(message);

let players = ["X", "O"];
let currentPlayer = 0;

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function switchPlayer() {
  currentPlayer = (currentPlayer + 1) % 2;
}

function squereClickHandler(e) {
  const clickedSquare = e.currentTarget;
  if (clickedSquare.textContent !== "") {
    return;
  }
  clickedSquare.textContent = players[currentPlayer];
  if (checkWin(players[currentPlayer])) {
    message.textContent = `${players[currentPlayer]} wins!`;
    message.style.transform = "scale(1.4)";
    return;
  }
  switchPlayer();
  if (players[currentPlayer] == players[0]) {
    message.textContent = `X's turn!`;
    playerX.style.border = "3px solid var(--red)";
    playerO.style.border = "1px solid var(--light)";
  } else {
    message.textContent = `O's turn!`;
    playerO.style.border = "3px solid var(--yellow)";
    playerX.style.border = "1px solid var(--light)";
  }
}

squares.forEach((square) => {
  square.addEventListener("click", squereClickHandler);
});

function checkWin(player) {
  for (let i = 0; i < winningPatterns.length; i++) {
    const [a, b, c] = winningPatterns[i];
    if (
      squares[a].textContent === player &&
      squares[b].textContent === player &&
      squares[c].textContent === player
    ) {
      return true;
    }
  }
  return false;
}
