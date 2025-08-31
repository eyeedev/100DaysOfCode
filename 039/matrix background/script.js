//floating codes
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const codeSnippets = [
    "const magic = () => true;",
    "let energy = 100;",
    "function explore() { return 'fun'; }",
    "var speed = 'fast';",
    "const dream = 'big';",
    "let focus = max;",
    "function shine() { lightUp(); }",
    "const flow = () => 'smooth';",
    "var vibe = 'chill';",
    "let code = 'creative';"
];

const floatingCodes = Array.from({length: 50}, () => ({
    text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    speed: Math.random() + 0.5,
    size: Math.random() * 4 + 12,
    opacity: Math.random() * 0.5 + 0.5
}));

function animate() {
    ctx.fillStyle = 'rgba(10,10,10,0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    floatingCodes.forEach(code => {
        code.y += code.speed;

        if (code.y > canvas.height) {
            code.y = -20;
            code.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
            code.x = Math.random() * canvas.width;
        }

        ctx.font = `${code.size}px monospace`;
        ctx.fillStyle = `rgba(0, 255, 136, ${code.opacity})`;
        ctx.fillText(code.text, code.x, code.y);
    });

    requestAnimationFrame(animate);
}

animate();


window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});