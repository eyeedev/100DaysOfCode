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
