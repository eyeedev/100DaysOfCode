let cards = document.querySelectorAll('.card');
let all = document.getElementById('all');
let games = document.getElementById('games');
let canvasPart = document.getElementById('canvas');
let svg = document.getElementById('svg');
let cssPlaying = document.getElementById('css');
let buttons = document.getElementById('buttons');

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

canvasPart.addEventListener('click', () => showCards('canvas'));
games.addEventListener('click', ()=>showCards('game'));
svg.addEventListener('click', ()=>showCards('svg'));
cssPlaying.addEventListener('click', ()=>showCards('css'));
buttons.addEventListener('click', ()=>showCards('buttons'));


all.addEventListener('click', ()=>{
    for(let i = 0; i < cards.length; i++){
        let card = cards[i]
        card.style.display = '';
       }
});