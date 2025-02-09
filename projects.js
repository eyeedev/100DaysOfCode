const menuItems = document.querySelectorAll('.menu-items li');
const menuIcon = document.querySelector('.menu');
const menu = document.querySelector('menu');


menuItems.forEach((item) => {
    item.addEventListener('click', () => {
        menuItems.forEach(i => i.classList.remove('active-menu'));
        item.classList.add('active-menu');
    })
})

if (!menuItems) { console.log('menuItems not found'); }

menuIcon.addEventListener('click', () => {
    if (menu) {
        menu.style.display = menu.style.display === "hidden" ? "block" : "hidden";
    }
})


