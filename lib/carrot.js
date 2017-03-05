class Carrot {
  constructor(stage, image, groundHeight){
    this.width = stage.canvas.width;
    this.height = stage.canvas.height;
    this.body = new createjs.Bitmap(image);
    this.body.setTransform(Math.random() * this.width + 400,
        this.height - this.body.image.height - groundHeight + 50);
    this.hitBox = new createjs.Shape();
    this.hitBox.graphics.drawRect(this.body.x, this.body.y + 20, 27, 60);
    this.hitBox.x = this.body.x
    this.stage = stage;
  }

  move(delta) {
    this.body.x -= delta * 400;
    this.hitBox.x = this.body.x;

    if (this.body.x + this.body.image.width <= 0 ) {
      this.body.x = Math.random() * this.width + this.width;
      this.hitBox.x = this.body.x;
    }
  }

  removeFromStage() {
    this.stage.removeChild(this.body, this.hitBox);
  }

  addToStage() {
    this.stage.addChild(this.body, this.hitBox);
  }
}

export default Carrot;
