let ball = document.querySelector("img");
let isDragged = false;


const dom=ball.getBoundingClientRect();
console.log(dom);

ball.addEventListener("mousedown", () => {
  isDragged = true;
});

 document.addEventListener("mousemove", (e) => {
 if (isDragged) {
    const bcr=ball.getBoundingClientRect();

    const cx=bcr.left + bcr.width/2;
    const cy=bcr.top + bcr.height/2;

    const dx=e.pageX-cx;
    const dy=e.pageY-cy;

    const deg=(Math.atan2(dy, dx) * 180) / Math.PI;

    ball.style.transform = `rotate(${deg}deg)`;
  }
});

document.addEventListener("mouseup", () => {
  isDragged = false;
});
