const cards = document.querySelectorAll('.project-card');
let all = document.getElementById('all');
let games = document.getElementById('games');
let canvas = document.getElementById('canvas');
let svg = document.getElementById('svg');
let cssComponents = document.getElementById('css');


function showCards(type) {
   for(let i = 0; i < cards.length; i++){
    let card = cards[i]
    card.style.display = '';
   }

    cards.forEach(card => {
        let cardType = card.getAttribute("data-type");
        if (cardType !== type) {
            card.style.display = "none";
        }
    });
}

canvas.addEventListener('click', () => showCards('canvas'));
games.addEventListener('click', ()=>showCards('game'));
svg.addEventListener('click', ()=>showCards('svg'));
cssComponents.addEventListener('click', ()=>showCards('css'));



all.addEventListener('click', ()=>{
    for(let i = 0; i < cards.length; i++){
        let card = cards[i]
        card.style.display = '';
       }
});

