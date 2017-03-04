import Game from './game';

let stage, width, height, loader, messageField, scoreField;
let loadingInterval = 0;
// let width, height, loader;
let bg, ground, grass, bush, cereal, carrot, runningRabbit, rabbit, carrotRect, rabbitRect;
let ticker;

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  stage = new createjs.Stage("canvas");
  messageField = new createjs.Text("Loading", "bold 24px sans-serif", "black");
  messageField.maxWidth = 1000;
  messageField.textAlign = "center";
  messageField.textBaseline = "middle";
  messageField.x = canvas.width/2;
  messageField.y = canvas.height/2;
  stage.addChild(messageField);
  stage.update();

  width = stage.canvas.width;
  height = stage.canvas.height;

  const manifest = [
    {src: "running.png", id: "runningRabbit"},
    {src: "grass.png", id: "grass"},
    {src: "background.png", id: "bg"},
    {src: "bush.png", id: "bush"},
    {src: "ground.png", id: "ground"},
    {src: "cereal.png", id: "cereal"},
    {src: "carrot.png", id: "carrot"},
    {src: "rabbit.png", id: "rabbit"}
  ]

  loader = new createjs.LoadQueue(false);
  // loader.addEventListener("complete", handleComplete);
  loader.addEventListener("complete", doneLoading);
  loader.addEventListener("progress", updateLoading); //loading
  loader.loadManifest(manifest, true, "./assets/images/");
  // loader.loadManifest(manifest);

  // const game = new Game(stage, manifest);
  // game.start();
});

function updateLoading() {
  messageField.text = "Loading " + (loader.progress * 100 | 0) + "%";
  stage.update();
}

function doneLoading() {
  //loading
  console.log("hi");
  clearInterval(loadingInterval);
  scoreField = new createjs.Text("0", "bold 18px sans-serif", "black");
  scoreField.textAlign = "right";
  scoreField.x = width - 20;
  scoreField.y = 20;
  scoreField.maxWidth = 1000;

  messageField.text = "Welcome: Click to play";
  watchRestart();
  //
}

function watchRestart() {
  stage.addChild(messageField);
  stage.update();
  canvas.onclick = handleClick;
}

function handleClick() {
  canvas.onclick = null;
  stage.removeChild(messageField);
  restart();
}

function restart() {
  stage.removeAllChildren();
  scoreField.text = (0).toString();
  stage.addChild(scoreField);
  start();
}

function start() {


  bg = new createjs.Shape();
  bg.graphics.beginBitmapFill(loader.getResult("bg")).drawRect(0, 0, width, height);

  const groundImg = loader.getResult("ground");
  ground = new createjs.Shape();
  ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, width + groundImg.width, groundImg.height);
  ground.width = groundImg.width;
  ground.y = height - groundImg.height;

  bush = new createjs.Bitmap(loader.getResult("bush"));
  bush.setTransform(Math.random() * width, height - bush.image.height - groundImg.height);

  grass = new createjs.Bitmap(loader.getResult("grass"));
  grass.setTransform(Math.random() * width, height - grass.image.height - groundImg.height);

  carrot = new createjs.Bitmap(loader.getResult("carrot"));
  carrot.setTransform(Math.random() * width + 400, height - carrot.image.height - groundImg.height + 50);

  carrotRect = new createjs.Shape();
  carrotRect.graphics.drawRect(carrot.x, carrot.y + 20, 27, 60);
  carrotRect.x = carrot.x

  cereal = new createjs.Bitmap(loader.getResult("cereal"));
  // cereal.setTransform(740, 280);
  createjs.Tween.get(cereal, {loop: true})
    .to({x: 720, y: 250})
    .to({x: 720, y: 290}, 1800)
    .to({x: 720, y: 250}, 1800)

  const spriteSheet = new createjs.SpriteSheet({
    framerate: 60,
    images: [loader.getResult("rabbit")],
    frames:[
      [0, 0, 108, 62.7, 0, 54, 31.35], // 0
      [108, 0, 101.55, 80.1, 0, 50.775, 40.05], // 1
      [209.55, 0, 105.15, 82.8, 0, 52.575, 41.4], // 2
      [314.7, 0, 105.15, 84.15, 0, 52.575, 42.075], // 3
      [419.85, 0, 105.15, 87.3, 0, 52.575, 43.65], // 4
      [0, 87.3, 101.55, 90.6, 0, 50.775, 45.3],  // 5
      [101.55, 87.3, 103.95, 92.85, 0, 51.975, 46.425], // 6
      [205.5, 87.3, 105.15, 93.3, 0, 52.575, 46.65],  // 7
      [310.65, 87.3, 104.55, 99, 0, 52.275, 49.5], // 8
      [415.2, 87.3, 104.55, 99, 0, 52.275, 49.5], // 9
      [0, 186.3, 104.55, 99, 0, 52.275, 49.5], // 10
      [104.55, 186.3, 104.55, 99, 0, 52.275, 49.5], // 11
      [209.1, 186.3, 105.15, 99.6, 0, 52.575, 49.8], // 12
      [314.25, 186.3, 101.55, 104.4, 0, 50.775, 52.2], // 13
      [419.8, 186.3, 101.55, 106.65, 0, 50.775, 53.325]  // 14
    ],
    animations: {
      run: {
        frames: [9, 8, 11, 10],
        speed: .25
      },
      faint: {
        frames: [5, 13, 14, 1, 0],
        speed: .20
      },
      jump: {
        frames: [6, 12, 7, 4, 2, 3],
        next: "run",
        speed: .1
      }
    }
  });

  rabbit = new createjs.Sprite(spriteSheet, "run");

  rabbit.y = 310;
  rabbit.x = 100;

  rabbitRect = new createjs.Shape();
  rabbitRect.graphics.beginFill("#000").drawRect(rabbit.x - 30, rabbit.y - 20, 70, 50);
  rabbitRect.alpha = 0;

  stage.addChild(bg, bush, grass,carrotRect,carrot, ground, cereal, rabbitRect, rabbit);
  stage.addEventListener()
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.on("tick", handleTick);

  document.onkeydown = handleJump;
}

function handleTick(e) {
  const deltaS = e.delta / 1000;
  ground.x = (ground.x - deltaS * 400) % ground.width;
  carrot.x = (carrot.x - deltaS * 400);
  carrotRect.x = carrot.x;

  if (carrot.x + carrot.image.width <= 0 ) {
    carrot.x = width;
  }
  if (carrotRect.x + 26 <= 0) {
    carrotRect.x = width;
  }
  bush.x = (bush.x - deltaS * 25);
  if (bush.x + bush.image.width <= 0) {
    bush.x = width;
  }
  grass.x = (grass.x - deltaS * 40);
  if (grass.x + grass.image.width <= 0) {
    grass.x = width;
  }

  let pt = carrotRect.localToLocal(100, 310, rabbitRect);
  if (rabbitRect.hitTest(pt.x, pt.y)) {
    console.log("HIT");
    rabbit.y = 310
    rabbit.gotoAndPlay("faint");
    createjs.Ticker.removeEventListener(this);
    // stage.removeAllChildren();
    // createjs.Ticker.setPaused(true);

  }


  stage.update(e);
}

function onGround() {
  return rabbit.y === 310;
}

function handleJump(e) {
  if (e.keyCode === 32 && onGround()) {
    e.preventDefault();
    rabbit.gotoAndPlay("jump");
    createjs.Tween.get(rabbit)
      .to({y: 220}, 150)
      .to({y: 200}, 150)
      .to({y: 180}, 150)
      .to({y: 200}, 150)
      .to({y: 220}, 100)
      .to({y: 240}, 100)
      .to({y: 310}, 250)
    createjs.Tween.get(rabbitRect)
      .to({y: -100}, 150)
      .to({y: -120}, 150)
      .to({y: -140}, 170)
      .to({y: -120}, 160)
      .to({y: -100}, 130)
      .to({y: 0}, 250)
  }
}
