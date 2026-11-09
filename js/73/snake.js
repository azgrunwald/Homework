const theCanvas = document.querySelector("#theCanvas");

const context = theCanvas.getContext("2d");
const crashSound = document.querySelector('#crash');

const SNAKE_SIZE = 64;

function getRandom(max) {
  let rand = Math.floor(Math.random() * max);
  rand -= rand % SNAKE_SIZE;
  return rand
}


   const width = getRandom(theCanvas.width);
   const height = getRandom(theCanvas.height);

   const apple = document.createElement("img");
   apple.src = "apple.png";

   context.drawImage(apple, width, height);


function sizeCanvas() {
  theCanvas.width = window.innerWidth - (window.innerWidth % SNAKE_SIZE);
  theCanvas.height = window.innerHeight - (window.innerHeight % SNAKE_SIZE);
}
sizeCanvas();
window.addEventListener("resize", sizeCanvas);

const snakeHead = document.createElement("img");
snakeHead.src = "snakeHead.png";

let x = 0;
let y = 0;
let direction = "ArrowRight";
let score = 0;

snakeHead.onload = () => {
  const interval = setInterval(() => {
    context.clearRect(0, 0, theCanvas.width, theCanvas.height);

    switch (direction) {
      case "ArrowUp":
        y -= SNAKE_SIZE;
        break;
      case "ArrowDown":
        y += SNAKE_SIZE;
        break;
      case "ArrowLeft":
        x -= SNAKE_SIZE;
        break;
      case "ArrowRight":
        x += SNAKE_SIZE;
        break;
    }
    context.drawImage(snakeHead, x, y);
    if (
      x < 0 ||
      x + SNAKE_SIZE > theCanvas.width ||
      y < 0 ||
      y + SNAKE_SIZE > theCanvas.height
    ) {
      console.log("Game over");
      crashSound.play()
       clearInterval(interval);
    }

    context.fillStyle = "green";
    context.font = "32px Cursive";
    const scoreText = `Score: ${score}`;
    const metrics = context.measureText(scoreText);
    context.fillText(scoreText, theCanvas.width - metrics.width - 10, 36);

   ;
  }, 500);

};

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
    case "ArrowDown":
    case "ArrowLeft":
    case "ArrowRight":
      direction = e.key;
      break;
    default:
      console.log(`${e.key} not processed`);
  }
});
