const selector = document.querySelectorAll('h4');
const caption = document.querySelectorAll('p');
let showIndex = -1;

selector.forEach((question, index)=>{
  question.addEventListener('click',()=>{
    if(showIndex !== -1){
      caption[showIndex].style.display= 'none';
      selector[showIndex].classList.remove('titles'); 
    }
     if(showIndex !== index){
      caption[index].style.display= 'block';
      selector[index].classList.add('titles');
      showIndex = index;
     } else{
      showIndex = -1;
     }
   
  })
})