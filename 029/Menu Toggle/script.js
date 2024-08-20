const menuButton = document.getElementById('button');
const menu = document.getElementById('menuList');
let isOpen = false;

menuButton.addEventListener('click', () => {
    if(isOpen) {
        menu.classList.remove('rotateIn');
        menu.classList.add('rotateOut');
        isOpen = false;
        console.log(isOpen)
    }
    else{
        menu.classList.remove('rotateOut');
        menu.classList.add('rotateIn');
        isOpen = true;
    }
})