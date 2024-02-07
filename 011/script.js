const canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

ctx.strokeStyle = "red";

const count = 50;

const lines = [];

let startIndex = 0;
let drawCount = 1;

const maxDrawCount = 40;

function initLines() {
  const gapSize = canvas.width / count;

  //left
  for (let i = 0; i <= count; i++) {
    lines.push({
      sx: 0,
      sy: i * gapSize,

      ex: i * gapSize,
      ey: canvas.height
    });
  }

  //bottom
  for (let i = 0; i <= count; i++) {
    lines.push({
      sx: i * gapSize,
      sy: canvas.height,

      ex: canvas.height,
      ey: canvas.height - i * gapSize,
    });
  }

  //right
  for (let i = 0; i <= count; i++) {
    lines.push({
      sx: canvas.height,
      sy: canvas.height - i * gapSize,

      ex: canvas.height - i * gapSize,
      ey: 0,
    });
  }

  //top
  for (let i = 0; i <= count; i++) {
    lines.push({
      sx: canvas.width - i * gapSize,
      sy: 0,

      ex: 0,
      ey: i * gapSize,
    });
  }
}

function draw(array) {
  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw all the lines in the array
  array.forEach((line, i) => {
    ctx.beginPath();
    ctx.moveTo(line.sx, line.sy);
    ctx.lineTo(line.ex, line.ey);
    ctx.strokeStyle = `hsl(${Math.floor(
      (i / array.length) * 360
    )}deg 100% 50%)`;
    ctx.stroke();
  });
}

initLines();

draw(lines);

function circularSlice(array, start, count) {
  // we need to select n items from the array in a circular manner!
  //so we create an empty array
  const out = [];

  // we push as much as we can from the
  // starting index to the end of the array
  out.push(...array.slice(start, Math.min(array.length, start + count)));

  // if the length of the array does not
  // match  the count needed,...
  if (out.length < count) {
    // push the remaining required
    // items from the start of the array

    out.push(...array.slice(0, count - out.length));
  }

  return out;
}

function animate() {
  requestAnimationFrame(animate);

  // modify: if the draw count is less than its max, increase it
  if (drawCount < maxDrawCount) {
    drawCount++;
  } else {
    // otherwise, increase the starting index and keep it in range of array.length
    // the trick is to use % operator the remainder of dividing m by n
    // is always a number from 0 to n - 1

    startIndex = (startIndex + 1) % lines.length;
  }

  const linesToDraw = circularSlice(lines, startIndex, drawCount);

  // redraw
  draw(linesToDraw);
}

animate();
