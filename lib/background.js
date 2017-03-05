class Background {
  constructor(stage, loader, groundImg) {
    this.loader = loader;
    this.back = new createjs.Shape();
    this.ground = new createjs.Shape();
    this.bush = new createjs.Bitmap(loader.getResult("bush"));
    this.grass = new createjs.Bitmap(loader.getResult("grass"));
    this.cereal = new createjs.Bitmap(loader.getResult("cereal"));
    this.width = stage.canvas.width;
    this.height = stage.canvas.height;
    this.groundImg = groundImg;
    this.generate();
  }

  generate() {
    this.back.graphics.beginBitmapFill(this.loader.getResult("bg")).drawRect(0, 0, this.width, this.height);

    this.ground.graphics.beginBitmapFill(this.groundImg).drawRect(0, 0, this.width + this.groundImg.width, this.groundImg.height);
    this.ground.width = this.groundImg.width;
    this.ground.y = this.height - this.groundImg.height;

    this.bush.setTransform(
      Math.random() * this.width,
      this.height - this.bush.image.height - this.groundImg.height
    );

    this.grass.setTransform(
      Math.random() * this.width,
      this.height - this.grass.image.height - this.groundImg.height
    );

    createjs.Tween.get(this.cereal, {loop: true})
      .to({x: 800, y: 250})
      .to({x: 800, y: 290}, 1800)
      .to({x: 800, y: 250}, 1800)
  }

  move(delta) {
    this.ground.x = (this.ground.x - delta * 400) % this.ground.width;
    this.bush.x = (this.bush.x - delta * 25);
    if (this.bush.x + this.bush.image.width <= 0) {
      this.bush.x = this.width;
    }
    this.grass.x = (this.grass.x - delta * 40);
    if (this.grass.x + this.grass.image.width <= 0) {
      this.grass.x = this.width;
    }
  }
}

export default Background;
