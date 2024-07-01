let cloud = document.querySelector(".cloud");
let left = Math.floor(Math.random() * 300);
let width = Math.random() * 5;
let height = Math.random() * 50;
let duration = Math.random() * 0.5;

function rain() {
  let drop = document.createElement("div");
  drop.classList.add("drop");
  let left = Math.floor(Math.random() * 310);
  let width = Math.random() * 5;
  let height = Math.random() * 50;
  let duration = Math.random() * 0.5;

  cloud.appendChild(drop);
  drop.style.left = left + "px";
  drop.style.width = 0.5 + width + "px";
  drop.style.height = 0.5 + height + "px";
  drop.style.animationDuration = 1 + duration + "s";

  setTimeout(() => {
    cloud.removeChild(drop);
  }, 2000);
}

setInterval(() => {
  rain();
}, 20);
