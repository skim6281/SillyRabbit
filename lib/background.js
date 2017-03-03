class Background {
  constructor(loader, stage) {
    this.loader = loader;
    this.back = new createjs.Shape();
    this.ground = new createjs.Shape();
    this.bush = new createjs.Bitmap(loader.getResult("bush"));
    this.grass = new createjs.Bitmap(loader.getResult("grass"));
    this.width = stage.canvas.width;
    this.height = stage.canvas.height;
  }

  generate() {
    this.back.graphics.beginBitmapFill(this.loader.getResult("bg")).drawRect(0, 0, this.width, this.height);

    const groundImg = this.loader.getResult("ground");
    this.ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, this.width + groundImg.width, groundImg.height);
    this.ground.width = groundImg.width;
    this.ground.y = this.height - groundImg.height;

    this.bush.setTransform(
      Math.random() * this.width,
      this.height - this.bush.image.height - groundImg.height
    );

    this.grass.setTransform(
      Math.random() * this.width,
      this.height - this.grass.image.height - groundImg.height
    );
  }
}

export default Background;
