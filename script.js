let cards = document.querySelectorAll('.card');
let canvas = document.getElementById('canvas');

function showCanvasCards() {
    cards.forEach(card => {
        let cardType = card.getAttribute("data-type");
        if (cardType !== 'canvas') {
            card.style.display = "none";
        }
    });
}

canvas.addEventListener('click', showCanvasCards);
