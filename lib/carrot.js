class Carrot {
  constructor(stage, image, x, y){
    this.width = stage.canvas.width;
    this.height = stage.canvas.height;
    this.body = new createjs.Bitmap(image);
    this.body.setTransform(x,y);
    this.hitBox = new createjs.Shape();
    this.hitBox.graphics.drawRect(this.body.x, this.body.y + 20, 27, 65);
    this.hitBox.x = this.body.x
    this.stage = stage;
  }

  move(delta, i) {
    this.body.x -= delta * 400;
    this.hitBox.x = this.body.x;

    if (this.body.x + this.body.image.width <= 0 ) {
      this.body.x = Math.random() * this.width + (this.width * (i + 1))/3 + this.width;
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
