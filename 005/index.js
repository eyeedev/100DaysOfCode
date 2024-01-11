let button=document.querySelector(".icon");

button.addEventListener("click",()=>{
  document.body.classList.toggle('dark-theme');
  const icon=button.innerHTML;
  const newIcon=icon===
  'light_mode' ? 'dark_mode' : 'light_mode';
  button.innerHTML=newIcon;
})

const darkTheme = window.matchMedia("(prefers-color-scheme: dark)");
if (darkTheme.matches) {
  document.body.classList.toggle('dark-theme');
  const icon=button.innerHTML;
  const newIcon=icon===
  'light_mode' ? 'dark_mode' : 'light_mode';
  button.innerHTML=newIcon;
} else {
  document.body.classList.toggle('light-theme');
}



