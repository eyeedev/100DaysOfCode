let tab = document.querySelector(".tab");
let isDragged = false;
let currentLeft;
let currentTop;

tab.addEventListener("mousedown", (e) => {
  isDragged = true;
  currentLeft = e.clientX - tab.getBoundingClientRect().left;
  currentTop = e.clientY - tab.getBoundingClientRect().top;
  tab.style.transition = "none";
});

document.addEventListener("mousemove", (e) => {
  if (isDragged) {
    let x = e.pageX - currentLeft;
    let y = e.pageY - currentTop;

    tab.style.left = `${x}px`;
    tab.style.top = `${y}px`;
  }
});

document.addEventListener("mouseup", () => {
  isDragged = false;
  tab.style.transition = "left 0.3s ease,top 0.3s ease";
});

