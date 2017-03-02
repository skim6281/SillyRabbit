let stage, width, height, loader;
let bg, ground, grass, bush, runningRabbit;

document.addEventListener('DOMContentLoaded', () => {
  // const canvas = document.getElementById('canvas');
  stage = new createjs.Stage("canvas");

  width = stage.canvas.width;
  height = stage.canvas.height;

  const manifest = [
    {src: "running.png", id: "runningRabbit"},
    {src: "background.png", id: "bg"},
    {src: "grass.png", id: "grass"},
    {src: "bush.png", id: "bush"},
    {src: "ground.png", id: "ground"}
  ]

  loader = new createjs.LoadQueue(false);
  loader.addEventListener("complete", handleComplete);
  loader.loadManifest(manifest, true, "./assets/images/");

});

function handleComplete() {
  bg = new createjs.Shape();
  bg.graphics.beginBitmapFill(loader.getResult("bg")).drawRect(0, 0, width, height);

  const groundImg = loader.getResult("ground");
  ground = new createjs.Shape();
  ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, width + groundImg.width, groundImg.height);
  ground.tileW = groundImg.width;
  ground.y = height - groundImg.height;

  bush = new createjs.Bitmap(loader.getResult("bush"));
  bush.setTransform(Math.random() * width, height - bush.image.height - groundImg.height);

  grass = new createjs.Bitmap(loader.getResult("grass"));
  grass.setTransform(Math.random() * width, height - grass.image.height - groundImg.height);




  const runningSpriteSheet = new createjs.SpriteSheet({
      framerate: 60,
      "images": [loader.getResult("runningRabbit")],
      "frames": {"regX": 52.25, "regY": 49.5, "height": 99, "width": 104.5, "count": 4},
      "animations": {
        "run": [0, 3, "run", .25]
      }
    });
  runningRabbit = new createjs.Sprite(runningSpriteSheet, "run");
  runningRabbit.y = 310;
  runningRabbit.x = 100;

  stage.addChild(bg, ground, bush, grass, runningRabbit);
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", handleTick);

}

function handleTick(e) {
  const deltaS = e.delta / 1000;
  ground.x = (ground.x - deltaS * 100) % ground.tileW;
  bush.x = (bush.x - deltaS * 20);
  if (bush.x + bush.image.width * bush.scaleX <= 0) {
    bush.x = width;
  }
  grass.x = (grass.x - deltaS * 25);
  if (grass.x + grass.image.width * grass.scaleX <= 0) {
    grass.x = width;
  }
  stage.update(e);
}
