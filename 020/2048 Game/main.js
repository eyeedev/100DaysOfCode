const gameContainer = document.querySelector('.game-container');
const restart = document.getElementById('restart');
const scoreContainer = document.getElementById('scoreContainer'); 
const gameOverOverlay = document.getElementById('gameOverOverlay');
let board;
let rows = 4;
let columns = 4;
let score = 0;

board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];


function gameSetUp() {
  // Loop through each row
  for (let r = 0; r < rows; r++) {
    // Loop through each column
    for (let c = 0; c < columns; c++) {
      // Create a tile div
      const tile = document.createElement("div");
      tile.classList.add('tile');
      tile.id = r.toString() + '-' + c.toString();

      let num = board[r][c]
      tileUpdate(tile, num);

      gameContainer.appendChild(tile);
    }
  }
  generateNewTile();
  generateNewTile();
  updateBoard();
}


function tileUpdate(tile, num, row, col) {
  tile.innerText = "";
  tile.classList.value = "";
  tile.classList.add("tile");
  tile.classList.add(`pos-${row}-${col}`); // Add position class for animation

  if (num > 0) {
    tile.innerText = num;
    if (num <= 4096) {
      tile.classList.add("t" + num.toString());
    } else {
      tile.classList.add("t8192");
    }
  }
}



function updateBoard() {
  const tiles = document.querySelectorAll('.tile');
  let index = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const tile = tiles[index];
      const num = board[i][j];
      tile.innerText = num === 0 ? '' : num;
      tile.className = 'tile t' + num + ' pos-' + i + '-' + j; 
      index++;
    }
  }
  scoreContainer.innerText = score.toString(); 
  console.log(score);
}


document.addEventListener('keyup', (e) => {
  if (e.code == 'ArrowLeft') {
    slideLeft();
    console.log('left');
  }
  if (e.code == 'ArrowRight') {
    slideRight();
    console.log('right');
  }
  if (e.code == 'ArrowUp') {
    slideUp();
    console.log('Up');
  }
  if (e.code == 'ArrowDown') {
    slideDown();
    console.log('Down');
  }
})


function checkTile(row) {
  let newRow = [];
  let merged = false;

  for (let i = 0; i < row.length; i++) {
    if (row[i] !== 0) {
      let j = i + 1;
      while (j < row.length && row[j] === 0) {
        j++;
      }
      if (j < row.length && row[i] === row[j] && !merged) {
        newRow.push(row[i] * 2); 
        row[j] = 0;
        merged = true;
        score += row[i] * 2;
        updateBoard();
      } else {
        newRow.push(row[i]); 
        merged = false;
      }
    }
  }

  // Fill the rest of the row with zeros
  while (newRow.length < row.length) {
    newRow.push(0);
  }

  return newRow;
}



function generateNewTile() {
  const emptyCells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] === 0) {
        emptyCells.push({ row: r, col: c });
      }
    }
  }
  if (emptyCells.length > 0) {
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomCell.row][randomCell.col] = 2;
  }
}



function slideLeft() {
  for (let r = 0; r < rows; r++) {
    for (let c = 1; c < columns; c++) {
      if (board[r][c] !== 0) {
        let prevC = c - 1;
        while (prevC >= 0 && board[r][prevC] === 0) {
          prevC--;
        }
        if (prevC >= 0 && board[r][c] === board[r][prevC]) {
          board[r][prevC] *= 2;
          board[r][c] = 0;
          score += board[r][prevC];
        } else {
          if (board[r][prevC + 1] === 0) {
            board[r][prevC + 1] = board[r][c];
            board[r][c] = 0;
          }
        }
      }
    }
  }
  generateNewTile();
  updateBoard();
  checkWin();
  checkLoss();
}

function slideRight() {
  for (let r = 0; r < rows; r++) {
    for (let c = columns - 2; c >= 0; c--) {
      if (board[r][c] !== 0) {
        let nextC = c + 1;
        while (nextC < columns && board[r][nextC] === 0) {
          nextC++;
        }
        if (nextC < columns && board[r][c] === board[r][nextC]) {
          board[r][nextC] *= 2;
          board[r][c] = 0;
          score += board[r][nextC];
        } else {
          if (board[r][nextC - 1] === 0) {
            board[r][nextC - 1] = board[r][c];
            board[r][c] = 0;
          }
        }
      }
    }
  }
  generateNewTile();
  updateBoard();
  checkWin();
  checkLoss();
}


function slideUp() {
  for (let c = 0; c < columns; c++) {
    for (let r = 1; r < rows; r++) {
      if (board[r][c] !== 0) {
        let targetRow = r - 1;
        while (targetRow >= 0) {
          if (board[targetRow][c] === 0) {
            board[targetRow][c] = board[r][c];
            board[r][c] = 0;
            r = targetRow; 
          } else if (board[targetRow][c] === board[r][c]) {
            board[targetRow][c] *= 2;
            board[r][c] = 0;
            score += board[targetRow][c];
            break; 
          } else {
            // If there's a different tile above, stop moving
            break;
          }
          targetRow--;
        }
      }
    }
  }
  generateNewTile();
  updateBoard();
  checkWin();
  checkLoss();
}



function slideDown() {
  const rotatedBoard = rotateMatrixCounterclockwise(board);
  for (let r = 0; r < rows; r++) {
    rotatedBoard[r] = checkTile(rotatedBoard[r]);
  }
  const finalBoard = rotateMatrixClockwise(rotatedBoard);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      board[r][c] = finalBoard[r][c];
    }
  }
  generateNewTile();
  updateBoard();
  checkWin();
  checkLoss();
}

function rotateMatrixClockwise(matrix) {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  // Reverse each column
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < Math.floor(numCols / 2); j++) {
      [matrix[i][j], matrix[i][numCols - 1 - j]] = [matrix[i][numCols - 1 - j], matrix[i][j]];
    }
  }

  // Transpose the matrix
  for (let i = 0; i < numRows; i++) {
    for (let j = i + 1; j < numCols; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  return matrix;
}

function rotateMatrixCounterclockwise(matrix) {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  // Transpose the matrix
  for (let i = 0; i < numRows; i++) {
    for (let j = i + 1; j < numCols; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  // Reverse each column
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < Math.floor(numCols / 2); j++) {
      [matrix[i][j], matrix[i][numCols - 1 - j]] = [matrix[i][numCols - 1 - j], matrix[i][j]];
    }
  }

  return matrix;
}

restart.addEventListener('click', resetGame);

function resetGame() {
  gameOverOverlay.classList.add('hidden');
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  score = 0;

  generateNewTile();
  generateNewTile();

  updateBoard();
}

function checkWin(){
  const winOverlay = document.getElementById('winOverlay');
  if(score === 2048){
    winOverlay.classList.remove('hidden');
    setTimeout(() => { winOverlay.classList.add('hidden'); }, 1000);
  }
}

function checkLoss() {
  let isFull = true;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] === 0) {
        isFull = false;
        break;
      }
    }
    if (!isFull) {
      break;
    }
  }

  
  if (isFull) {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        if (
          (r - 1 >= 0 && board[r][c] === board[r - 1][c]) || 
          (r + 1 < rows && board[r][c] === board[r + 1][c]) || 
          (c - 1 >= 0 && board[r][c] === board[r][c - 1]) || 
          (c + 1 < columns && board[r][c] === board[r][c + 1]) 
        ) {
           //keep playing
          return false;
        }
      }
    }
    // game over
    gameOverOverlay.classList.remove('hidden');
    setTimeout(resetGame, 2000);
    return true;
  } else {
    // If the board is not full
    return false;
  }
}



console.log(`board : ${board}`);
gameSetUp();
