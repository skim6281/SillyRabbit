import Background from './background';

class Game {
  constructor(stage, manifest) {
    this.stage = stage;
    this.manifest = manifest;
    this.loader = new createjs.LoadQueue(false);
    this.width = stage.canvas.width;
    this.height = stage.canvas.width;
    this.bg;
    this.ground;
    this.grass;
    this.bush;

    this.handleComplete = this.handleComplete.bind(this);
    this.handleTick = this.handleTick.bind(this);
    this.start = this.start.bind(this);
  }

  start() {
    this.loader.addEventListener("complete", this.handleComplete);
    this.loader.loadManifest(this.manifest, true, "./assets/images/");
  }

  handleComplete() {
    this.bg = new createjs.Shape();
    this.bg.graphics.beginBitmapFill(this.loader.getResult("bg")).drawRect(0, 0,this.width, this.height);

    const groundImg = this.loader.getResult("ground");
    this.ground = new createjs.Shape();
    this.ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, this.width + groundImg.width, groundImg.height);
    this.ground.width = groundImg.width;
    this.ground.y = this.height - groundImg.height;


    this.bush = new createjs.Bitmap(this.loader.getResult("bush"));
    this.bush.setTransform(Math.random() * this.width, this.height - this.bush.image.height - groundImg.height);

    this.grass = new createjs.Bitmap(this.loader.getResult("grass"));
    this.grass.setTransform(Math.random() * this.width, this.height - this.grass.image.height - groundImg.height);

    this.stage.addChild(this.bg, this.ground, this.bush, this.grass);
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", this.handleTick);

  }


  handleTick(e) {
    const deltaS = e.delta / 1000;

    this.ground.x = (this.ground.x - deltaS * 100) % this.ground.width;

    this.bush.x = (this.bush.x - deltaS * 25);
    if (this.bush.x + this.bush.image.width <= 0) {
      this.bush.x = this.width;
    }
    this.grass.x = (this.grass.x - deltaS * 40);
    if (this.grass.x + this.grass.image.width <= 0) {
      this.grass.x = this.width;
    }

    this.stage.update(e);

  }
}

export default Game;
