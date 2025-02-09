let git = document.querySelector('.git-simulator');
let currentIndex = 0;
const indicators = document.querySelectorAll('.svg-item');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');



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


navLinks.forEach(link => {
    link.addEventListener('click', function(){
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    })
})






