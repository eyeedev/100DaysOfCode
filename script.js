const canvas = document.getElementById("hero-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.querySelector(".hero").offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const codeSnippets = [
    'function()', 'const x =', 'if (true)', 'return',
    'async', 'await', 'useState', 'onClick', 'map()'
];
const colors = [
    '#ff6b6b',
    '#4ecdc4',
    '#45b7d1',
    '#96ceb4',
    '#feca57',
    '#ff9ff3',
    '#54a0ff'
];

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

let particles = [];

class Particle {
    constructor() {
        this.text = codeSnippets[Math.floor(Math.random()*codeSnippets.length)];
        this.centerX = canvas.width * 0.7;
        this.centerY = canvas.height * 0.5;

        const startOffset = 30;
        this.startX = this.centerX + (Math.random() * startOffset - startOffset/ 2);
        this.startY = this.centerY + (Math.random() * startOffset - startOffset/2);

        this.angle = Math.random() * Math.PI * 2;
        this.radius = 0;
        this.speed = 0.2 + Math.random() * 0.15;
        this.opacity = 1;
        this.color = getRandomColor();
    }
    update() {
        this.radius += this.speed;
        this.x = this.startX + Math.cos(this.angle) * this.radius;
        this.y = this.startY + Math.sin(this.angle) * this.radius;
        this.opacity -= 0.0005;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.font = "12px Courier New";
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }
}

// light
function drawLight() {
    const gradient = ctx.createRadialGradient(
        canvas.width * 0.7, canvas.height * 0.5, 100,
        canvas.width * 0.7, canvas.height * 0.5, 800
    );
    gradient.addColorStop(0, "rgba(255,255,255,0.15)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

// orbits
let orbitAngle = 0;
const logos = [
    { src: "./assets/icons/html.svg", r: 120 },
    { src: "./assets/icons/css.svg", r: 180 },
    { src: "./assets/icons/js.svg", r: 240 }
];
const images = {};
logos.forEach(l => {
    const img = new Image();
    img.src = l.src;
    images[l.src] = img;
});

function drawOrbits() {
    const cx = canvas.width * 0.7;
    const cy = canvas.height * 0.5;

    ctx.strokeStyle = "rgba(200,200,200,0.07)";
    ctx.lineWidth = 1;

    logos.forEach((l,i) => {
        // orbit
        ctx.beginPath();
        ctx.arc(cx, cy, l.r, 0, Math.PI*2);
        ctx.stroke();

        // logo
        const angle = orbitAngle + i * (Math.PI * 2 / logos.length);
        const x = cx + Math.cos(angle) * l.r;
        const y = cy + Math.sin(angle) * l.r;
        const img = images[l.src];
        if (img.complete) {
            ctx.drawImage(img, x-15, y-15, 25, 30);
        }
    });

    orbitAngle += 0.0025;
}

// animation
function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawLight();
    drawOrbits();

    if (Math.random() < 0.01) {
        particles.push(new Particle());
    }

    particles = particles.filter(p => {
        p.update();
        p.draw();
        return p.opacity > 0;
    });

    requestAnimationFrame(animate);
}
animate();

// Mouse tracking for light effects
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.game-card');

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
    });
});



//profile card
const wrap = document.getElementById("wrap");
const card = document.getElementById("card");

function clamp(v, min = 0, max = 100) {
    return Math.min(Math.max(v, min), max);
}

function round(v, p = 3) {
    return parseFloat(v.toFixed(p));
}

function adjust(value, fromMin, fromMax, toMin, toMax) {
    return round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));
}

function updateCardTransform(offsetX, offsetY) {
    const width = card.clientWidth;
    const height = card.clientHeight;

    const percentX = clamp((100 / width) * offsetX);
    const percentY = clamp((100 / height) * offsetY);

    const centerX = percentX - 50;
    const centerY = percentY - 50;

    const properties = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
        "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
        "--pointer-from-center": `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        "--pointer-from-top": `${percentY / 100}`,
        "--pointer-from-left": `${percentX / 100}`,
        "--rotate-x": `${round(-(centerX / 5))}deg`,
        "--rotate-y": `${round(centerY / 4)}deg`,
    };

    Object.entries(properties).forEach(([property, value]) => {
        wrap.style.setProperty(property, value);
    });
}

function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function createSmoothAnimation(duration, startX, startY) {
    const startTime = performance.now();
    const targetX = wrap.clientWidth / 2;
    const targetY = wrap.clientHeight / 2;

    function loop(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = clamp(elapsed / duration);
        const eased = easeInOutCubic(progress);

        const currentX = adjust(eased, 0, 1, startX, targetX);
        const currentY = adjust(eased, 0, 1, startY, targetY);

        updateCardTransform(currentX, currentY);

        if (progress < 1) {
            requestAnimationFrame(loop);
        }
    }
    requestAnimationFrame(loop);
}

card.addEventListener("pointermove", (e) => {
    const rect = card.getBoundingClientRect();
    updateCardTransform(e.clientX - rect.left, e.clientY - rect.top);
});

card.addEventListener("pointerenter", () => {
    wrap.classList.add("active");
    card.classList.add("active");
});

card.addEventListener("pointerleave", (e) => {
    wrap.classList.remove("active");
    card.classList.remove("active");
    createSmoothAnimation(600, e.offsetX, e.offsetY);
});

// Initial animation
const initialX = wrap.clientWidth - 70;
const initialY = 60;
updateCardTransform(initialX, initialY);
createSmoothAnimation(1500, initialX, initialY);

//slider
const cardsContainer = document.querySelector('.cards');
const cards = document.querySelectorAll('.card');
let currentIndex = 0;
const cardWidth = cards[0].offsetWidth + 48; // card width + gap
const intervalTime = 4000; // 4 seconds per card

function showNextCard() {
    // Remove active from current
    cards[currentIndex].classList.remove('active');

    // Move to next card
    currentIndex = (currentIndex + 1) % cards.length;

    // Add active to new card
    cards[currentIndex].classList.add('active');

    // Move container to show active card in center-ish
    const offset = -currentIndex * cardWidth + (window.innerWidth - cardWidth) / 2;
    cardsContainer.style.transform = `translateX(${offset}px)`;
}

// Initialize
cards[currentIndex].classList.add('active');
cardsContainer.style.transform = `translateX(${(window.innerWidth - cardWidth)/2}px)`;

// Rotate automatically every 4 seconds
setInterval(showNextCard, intervalTime);






