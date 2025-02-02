let all = document.getElementById('all');
let games = document.getElementById('games');
let canvasPart = document.getElementById('canvas');
let svg = document.getElementById('svg');
let cssPlaying = document.getElementById('css');
let buttons = document.getElementById('buttons');
let git = document.querySelector('.git-simulator');
let currentIndex = 0;
const cards = document.querySelector('.card');
const cardContainer = document.querySelector('.cards');
const indicators = document.querySelectorAll('.svg-item');
const cardWidth = cards[0].offsetWidth;


if(!git) {
    console.log("not found git");
} else {
    console.log(git);
}

for(let i = 0; i < 200; i++){
    const square = document.createElement('div');
    square.classList.add('square');
    git.appendChild(square);
}

function getRandomColor(){
    const shades = [
        "#206d32",
        "#006c36",
        "#00432a",
        "#00a649"
    ];
    return shades[Math.floor(Math.random() * shades.length)];
}

function animateSquares() {
    const squares = document.querySelectorAll('.square');

    setInterval(() =>{
        const randomIndex = Math.floor(Math.random() * squares.length);
        const randomSquare = squares[randomIndex];
        randomSquare.style.backgroundColor = getRandomColor();

        setTimeout(() => {
            randomSquare.style.backgroundColor = '#151B22';
        }, Math.random() * 2000 + 500);
    }, 100)
}

animateSquares();


document.addEventListener('DOMContentLoaded', () =>
{
    function updateSlider(){
        cardContainer.style.transform =  `translateX(-${currentIndex * cardWidth}px)`;

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        })
    }

    
});



// function showCards(type) {
//    for(let i = 0; i < cards.length; i++){
//     let card = cards[i]
//     card.style.display = '';
//    }
//
//     cards.forEach(card => {
//         let cardType = card.getAttribute("data-type");
//         if (cardType !== type) {
//             card.style.display = "none";
//         }
//     });
// }

// canvasPart.addEventListener('click', () => showCards('canvas'));
// games.addEventListener('click', ()=>showCards('game'));
// svg.addEventListener('click', ()=>showCards('svg'));
// cssPlaying.addEventListener('click', ()=>showCards('css'));
// buttons.addEventListener('click', ()=>showCards('buttons'));


// all.addEventListener('click', ()=>{
//     for(let i = 0; i < cards.length; i++){
//         let card = cards[i]
//         card.style.display = '';
//        }
// });


