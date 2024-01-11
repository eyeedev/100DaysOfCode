let button=document.querySelector(".icon");
let currentTheme=document.body.className;

button.addEventListener("click",()=>{
  if(currentTheme=="dark-theme"){
    document.body.classList.toggle('light-theme');
    button.innerHTML='light_mode';
  }else{
    document.body.classList.toggle('dark-theme');
    button.innerHTML='dark_mode';
  }
})

