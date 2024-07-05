const lines = document.querySelector('.lines');
const numbers = document.querySelector('.numbers');

const hourHand = document.querySelector('.hour');
const minuteHand = document.querySelector('.minute');
const secondHand = document.querySelector('.second');

function createLines() {
  const radius = 250;

  for (let i = 0; i < 60; i++) {
    const angleDeg = i * 6 - 90;
    const angleRad = angleDeg * Math.PI / 180;

    let line = document.createElement('div');
    line.classList.add('line');

    let r = radius;
    if (i % 5 === 0) {
      line.classList.add('main');
      r = radius - 30;
    } else {
      r = radius - 20;
    }

    const x = 250 + Math.cos(angleRad) * r;
    const y = 250 + Math.sin(angleRad) * r;

    line.style.left = `${x}px`;
    line.style.top = `${y}px`;
    line.style.rotate = `${angleDeg + 90}deg`;

    lines.appendChild(line);
  }
  
  for (let i = 1; i <= 12; i++) {
    const angleDeg = i * 30 - 90;
    const angleRad = angleDeg * Math.PI / 180;

    let number = document.createElement('div');
    number.classList.add('number');

    number.innerText = `${i}`;

    const x = 250 + Math.cos(angleRad) * (radius - 60);
    const y = 250 + Math.sin(angleRad) * (radius - 60);

    number.style.left = `${x}px`;
    number.style.top = `${y}px`;

    numbers.appendChild(number);
  }
}

createLines();

function updateClock() {
  const now = new Date();

  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  const hourDeg = (hour + minute / 60 + second / 3600) * 30;
  const minuteDeg = (minute + second / 60) * 6;
  const secondDeg = second * 6;

  hourHand.style.rotate = `${hourDeg}deg`;
  minuteHand.style.rotate = `${minuteDeg}deg`;
  secondHand.style.rotate = `${secondDeg}deg`;
}

setInterval(updateClock, 1000);
updateClock();