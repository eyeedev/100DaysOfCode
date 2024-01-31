let images=[
  {
    id:'gray',
   Image:"./assets/gray.png"
  },
  {
    id:'yellow',
    Image:'./assets/yellow.png'
  },
  {
    id:'angry',
    Image:'./assets/angry.png'
  },
  {
    id:'black',
    Image:'./assets/black.jpg'
  },
  {
    id:'gray',
   Image:"./assets/gray.png"
  },
  {
    id:'yellow',
    Image:'./assets/yellow.png'
  },
  {
    id:'angry',
    Image:'./assets/angry.png'
  },
  {
    id:'black',
    Image:'./assets/black.jpg'
  },
  {
    id:'pink',
   Image:"./assets/drunk.png"
  },
  {
    id:'cute',
    Image:'./assets/cute.png'
  },
  {
    id:'box',
    Image:'./assets/box.png'
  },
  {
    id:'pirate',
    Image:'./assets/pirate.png'
  },
  {
    id:'pink',
   Image:"./assets/drunk.png"
  },
  {
    id:'cute',
    Image:'./assets/cute.png'
  },
  {
    id:'box',
    Image:'./assets/box.png'
  },
  {
    id:'pirate',
    Image:'./assets/pirate.png'
  }
];

let board=document.querySelector('.game-board');
let button;
let flippedCards=[];
let canFlip=true;

function createCards(){
  const shuffledCards=shuffle(images);
  shuffledCards.forEach(function(icon){
    let card=document.createElement('div');
    card.className='card';

    let inner=document.createElement('div');
    inner.className='inner';

    let front=document.createElement('div');
    front.className='front';

    let back=document.createElement('div');
    back.className='back';

    let img=document.createElement('img');
    img.src=icon.Image;
    back.appendChild(img);

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    card.addEventListener('click',function(){
      inner.style.transform='rotateY(180deg)';
      flippedCards.push({id:icon.id,element:inner});
        if(flippedCards.length===2){
          setTimeout(checkMatch,1000);
        }
    });
    board.appendChild(card)
  })
  button=document.createElement('button');
  button.innerHTML="Restart";
  board.appendChild(button);
}
createCards();
function shuffle(array){
  return array.sort(() => Math.random() - 0.5);
}

function checkMatch(){
  if(flippedCards[0].id===flippedCards[1].id){
    flippedCards=[];
    if(winCheck()){
      displayMessage();
    }
  } else{
    flippedCards.forEach(card=>{
      card.element.style.transform='rotateY(0deg)'
    });
    flippedCards=[];
  }
}

function winCheck(){
  let cards=document.querySelectorAll('.card');
  return [...cards].every(card=>
    card.querySelector('.inner').style.transform==='rotateY(180deg)');
  }

function displayMessage(){
  alert('You Won');
}  

button.addEventListener('click',function(){
   board.innerHTML='';
   createCards();
})