/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const collisionCanvas = document.getElementById("collisionCanvas");
const collisionCtx = collisionCanvas.getContext("2d");
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTIme = 0;
let score = 0;

let ravens = [];
let explosions = [];

class Explosion {
  constructor(x, y, size) {
    this.image = new Image();
    this.image.src = "/images/boom.png"
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.size = size;
    this.x = x;
    this.y = y;
  }
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "35px Arial";
  ctx.fillText("Score: " + score, 50, 75);
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 51, 78);
}

window.addEventListener("click", (e) => {
  const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);
  const pixelColor = detectPixelColor.data;
  ravens.forEach((raven) => {
    if (
      raven.randomColor[0] === pixelColor[0] &&
      raven.randomColor[1] === pixelColor[1] &&
      raven.randomColor[2] === pixelColor[2]
    ) {
      score++;
      raven.markedForDeletion = true;
    }
  });
});

function animate(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
  let deltatime = timestamp - lastTIme;
  lastTIme = timestamp;
  timeToNextRaven += deltatime;
  if (timeToNextRaven > ravenInterval) {
    ravens.push(new Raven());
    timeToNextRaven = 0;
    ravens.sort((a, b) => a.width - b.width);
  }
  drawScore();
  [...ravens].forEach((raven) => raven.update(deltatime));

  ravens = ravens.filter((obj) => !obj.markedForDeletion);
  requestAnimationFrame(animate);
}

animate(0);
