const menuItems = document.querySelectorAll('.menu-items li');
const menuIcon = document.querySelector('.menu');
const menu = document.querySelector('menu');
const projectCards = document.querySelectorAll('.project-card');
const cardContainer = document.querySelector('.projects-cards');
const cards = document.querySelectorAll('.project-card');
let all = document.getElementById('all');
let games = document.getElementById('games');
let canvas = document.getElementById('canvas');
let svg = document.getElementById('svg');
let cssComponents = document.getElementById('css');


menuItems.forEach((item) => {
    item.addEventListener('click', () => {
        menuItems.forEach(i => i.classList.remove('active-menu'));
        item.classList.add('active-menu');
    })
})

menuIcon.addEventListener('click', () => {
    console.log('click')
        menu.style.opacity = menu.style.opacity === "0" ? "1" : "0";
})

projectCards.forEach((projectCard, index) => {
    if(localStorage.getItem(`card-${index}`) === "active" ){
        projectCards.forEach((card) => {card.classList.remove('active-card');});
        projectCard.classList.add('active-card');
    }

    projectCard.addEventListener('click', () => {
        projectCards.forEach((card) => {card.classList.remove('active-card');});
        projectCard.classList.toggle('active-card');

        if(projectCard.classList.contains('active-card')){
            localStorage.setItem(`card-${index}`, 'active');
        } else {
            localStorage.removeItem(`card-${index}`);
        }
    })
})


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

