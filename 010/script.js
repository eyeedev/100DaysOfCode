const canvas = document.querySelector('#canvas');
const colorPicker = document.querySelectorAll('span');
const container = document.querySelector('.container');
const save = document.querySelector('#save');
const clear = document.querySelector('#clear');
let canDraw = false;
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.lineWidth = 3;

canvas.addEventListener('mousedown',(e)=>{
   canDraw= true;

   ctx.beginPath();
   ctx.moveTo(e.pageX , e.pageY);

})

canvas.addEventListener('mousemove' , (e)=>{
  if(canDraw==true){

    ctx.lineTo(e.pageX , e.pageY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.pageX , e.pageY);

  }

})

canvas.addEventListener('mouseup' , ()=>{
  canDraw=false;
})

colorPicker.forEach((color)=>{
  color.addEventListener('click', ()=>{
    let penColor = color.style.backgroundColor;
    ctx.strokeStyle = penColor;
  })
})

save.addEventListener('click', ()=>{
  const a = document.createElement('a');
  let imageURL = canvas.toDataURL("/image/png");
  a.href = imageURL ;
  a.download = 'canvas.png';
  container.appendChild(a);
  a.click();
  container.removeChild(a);
})

clear.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});