let list = document.querySelector('.list');
let items = document.querySelectorAll('.item');
let dots = document.querySelectorAll('.dots li'); // Select individual dot elements
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let cardContainer = document.querySelector('.card-container'); // Use dot for class selection
let card = document.querySelector('.card'); // Use dot for class selection
let backCard = document.querySelector('.back-card'); // Use dot for class selection

let active = 0;
let itemsLength = items.length - 1;

next.addEventListener('click', function() {
    if (active < itemsLength) {
        active++;
    } else {
        active = 0;
    }
    reloadSlider();
});

prev.addEventListener('click', function() {
    if (active > 0) {
        active--;
    } else {
        active = itemsLength; // Wrap around to the last item
    }
    reloadSlider();
});

function reloadSlider() {
    let checkLeft = items[active].offsetLeft;
    list.style.left = -checkLeft + 'px';

    let lastActiveDot = document.querySelector('.dots li.active');
    if (lastActiveDot) {
        lastActiveDot.classList.remove('active');
    }
    dots[active].classList.add('active');
}

dots.forEach((li, key) => {
    li.addEventListener('click', function() {
        active = key;
        reloadSlider();
    });
});

cardContainer.addEventListener('click', function() {
    if (card.classList.contains('front')) { // Use contains to check class
        card.classList.remove('front');
        card.classList.add('back');
        backCard.classList.remove('back');
        backCard.classList.add('front');
    } else {
        backCard.classList.remove('front');
        backCard.classList.add('back');
        card.classList.remove('back');
        card.classList.add('front');
    }
});
