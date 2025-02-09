const menuItems = document.querySelectorAll('.menu-items li');
const menuIcon = document.querySelector('.menu');
const menu = document.querySelector('menu');
const projectCards = document.querySelectorAll('.project-card');


menuItems.forEach((item) => {
    item.addEventListener('click', () => {
        menuItems.forEach(i => i.classList.remove('active-menu'));
        item.classList.add('active-menu');
    })
})

menuIcon.addEventListener('click', () => {
    if (menu) {
        menu.style.display = menu.style.display === "hidden" ? "block" : "hidden";
    }
})

projectCards.forEach((projectCard, index) => {
    if(localStorage.getItem(`card-${index}`) === "active" ){
        projectCards.forEach((card) => {card.classList.remove('active-card');});
        projectCard.classList.add('active-card');
    }

    projectCard.addEventListener('click', () => {
        projectCard.classList.toggle('active-card');

        if(projectCard.classList.contains('active-card')){
            localStorage.setItem(`card-${index}`, 'active');
        } else {
            localStorage.removeItem(`card-${index}`);
        }
    })
})


