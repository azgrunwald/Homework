const theCanvas = document.querySelector("#theCanvas");
const context = theCanvas.getContext("2d");
const balls = [];

function sizeCanvas() {
  theCanvas.width = window.innerWidth;
  theCanvas.height = window.innerHeight;
}
sizeCanvas();
window.addEventListener("resize", sizeCanvas);

document.querySelector("#addButton").addEventListener("click", () => {
  const color = document.querySelector("#ballColor");
  const ballSize = document.querySelector("#ballRadius");
  const radius = Number(ballSize.value);
  let x = radius + 1;
  let y = radius + 1;
  let dx = 1;
  let dy = 2;

  balls.push({
    color: color.value,
    x,
    y,
    dx,
    dy,
    radius,
  });
});
setInterval(() => {
  context.clearRect(0, 0, theCanvas.width, theCanvas.height);
  balls.forEach((b) => {
    context.fillStyle = b.color;
    context.beginPath();

    b.x += b.dx;
    b.y += b.dy;
    if (b.x < b.radius + 1 || b.x >= window.innerWidth - (b.radius + 1)) {
      b.dx = -b.dx;
    }
    if (b.y < b.radius + 1 || b.y >= window.innerHeight - (b.radius + 1)) {
      b.dy = -b.dy;
    }
    context.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    context.fill();
  });
}, 1);
