class Explosion {
  constructor(x, y, size) {
    this.image = new Image();
    this.image.src = "/images/boom.png";
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.size = size;
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.sound = new Audio();
    this.sound.src = "/sounds/explosion.wav";
    this.timeSinceLastFrame = 0;
    this.frameInterval = 200;
    this.markedForDeletion = false;
  }

  update(daltatim) {
    if (this.frame === 0) this.sound.play();
    this.timeSinceLastFrame += daltatim;
    if (this.timeSinceLastFrame > this.frameInterval) {
      this.frame++;
      this.timeSinceLastFrame = 0;
      if (this.frame > 5) this.markedForDeletion = true;
    }
    this.draw();
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y - this.size / 4,
      this.size,
      this.size
    );
  }
}
