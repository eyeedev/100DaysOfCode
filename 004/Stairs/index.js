let text=document.querySelectorAll('.text');

document.addEventListener('mousemove',(e)=>{
  let y=e.pageY - (window.innerHeight/2);

  //text.style.transform = `translateY(${y}px)`;
  
  text.forEach(function (element) {element.style.transform = `translateY(${y}px)`;})

})