const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const ball = document.querySelector(".ball");
const square = document.querySelector(".square");
const ballStyle = window.getComputedStyle(ball);
const ballSize = parseInt(ballStyle.width);
const squareRect = square.getBoundingClientRect();

function clamp(min, value, max) {
  return Math.max(min, Math.min(value, max));
}

let x = Math.random() * window.innerWidth;
let y = Math.random() * window.innerHeight;
let xMoves = Math.random() * 10;
let yMoves = Math.random() * 10;

function animate() {
  x += xMoves;
  y += yMoves;

  if (x < 0 || x > window.innerWidth - ballSize) {
    xMoves *= -1;
  }
  if (y < 0 || y > window.innerHeight - ballSize) {
    yMoves *= -1;
  }
  //for right
  if (
    y < squareRect.bottom &&
    y + ballSize > squareRect.top &&
    x < squareRect.right &&
    x + ballSize > squareRect.right
  ) {
    xMoves *= -1;
    x = squareRect.right;
  }
  //for left
  if (
    y < squareRect.bottom &&
    y + ballSize > squareRect.top &&
    x < squareRect.left &&
    x + ballSize > squareRect.left
  ) {
    xMoves *= -1;
    x = squareRect.left - ballSize;
  }
  //for top
  if (
    y < squareRect.top &&
    y + ballSize > squareRect.top &&
    x < squareRect.right &&
    x + ballSize > squareRect.left
  ) {
    yMoves *= -1;
    y = squareRect.top - ballSize;
  }
  //for bottom
  if (
    y < squareRect.bottom &&
    y + ballSize > squareRect.bottom &&
    x < squareRect.right &&
    x + ballSize > squareRect.left
  ) {
    yMoves *= -1;
    y = squareRect.bottom;
  }

  x = clamp(0, x, window.innerWidth - ballSize);
  y = clamp(0, y, window.innerHeight - ballSize);

  ball.style.left = `${x}px`;
  ball.style.top = `${y}px`;

  requestAnimationFrame(animate);
}

animate();
