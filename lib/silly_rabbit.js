import Game from './game';

let stage, width, height, loader, messageField, storyField, scoreField, score;
let hitCount;
let loadingInterval = 0;
let gameStart = false;
let bg, ground, grass, bush, cereal, carrot, runningRabbit, rabbit, carrotHitBox, rabbitRect;
let carrots = [];
let carrotHitBoxs = [];
let gotHit = false;

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  canvas.style.backgroundColor = "#f9f9f7";
  stage = new createjs.Stage("canvas");
  messageField = new createjs.Text("Loading", "38px Indie Flower", "black");
  messageField.maxWidth = 1000;
  messageField.textAlign = "center";
  messageField.textBaseline = "middle";
  messageField.x = canvas.width/2;
  messageField.y = 100;

  storyField = new createjs.Text("", "24px Indie Flower", "grey");
  storyField.maxWidth = 1000;
  storyField.textAlign = "center";
  storyField.textBaseline = "middle";
  storyField.lineHeight = 30;
  storyField.x = canvas.width/2;
  storyField.y = 170;
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
  loader.addEventListener("complete", doneLoading);
  loader.addEventListener("progress", updateLoading);
  loader.loadManifest(manifest, true, "./assets/images/");
});

function updateLoading() {
  messageField.text = "Loading " + (loader.progress * 100 | 0) + "%";
  stage.update();
}

function doneLoading() {
  clearInterval(loadingInterval);
  scoreField = new createjs.Text("0", "bold 18px sans-serif", "black");
  scoreField.textAlign = "right";
  scoreField.x = width - 20;
  scoreField.y = 20;
  scoreField.maxWidth = 1000;

  messageField.text = "Welcome! \n Click to play";
  storyField.text = "Just as Silly Rabbit was finally about \nto taste "
  storyField.text += "the delicious fruity goodness of The Cereal,\na bunch"
  storyField.text += " of cruel kids cast a spell, forcing it to fly\naway from our hero. "
  storyField.text += "Not willing to give up, Silly Rabbit\ngoes on the chase "
  storyField.text += "avoiding tasteless carrots on \nthe way."
  watchForRestart();
}

function watchForRestart() {
  stage.removeChild(rabbitRect, scoreField);
  if (carrots) {
    for(let i = 0; i < 3; i ++) {
      stage.removeChild(carrots[i], carrotHitBoxs[i]);
    }
  }
  score = 0;
  stage.addChild(messageField);
  if (!gameStart) {
    stage.addChild(storyField);
  }
  stage.update();
  canvas.onclick = handleClick;
}

function handleClick() {
  canvas.onclick = null;
  stage.removeChild(messageField, storyField);
  restart();
}

function restart() {
  gameStart = true;
  score = 0;
  hitCount = 0;
  gotHit = false;
  carrots = [];
  carrotHitBoxs = [];
  scoreField.text = score.toString();
  stage.addChild(scoreField);
  start();
}

function start() {
  bg = new createjs.Shape();
  bg.graphics.beginBitmapFill(loader.getResult("bg")).drawRect(0, 0, width, height);

  const groundImg = loader.getResult("ground");
  ground = new createjs.Shape();
  ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, width * 2, groundImg.height);
  ground.width = groundImg.width;
  ground.y = height - groundImg.height;

  bush = new createjs.Bitmap(loader.getResult("bush"));
  bush.setTransform(Math.random() * width, height - bush.image.height - groundImg.height);

  grass = new createjs.Bitmap(loader.getResult("grass"));
  grass.setTransform(Math.random() * width, height - grass.image.height - groundImg.height);

  for(let i = 0; i < 3; i++){
    carrot = new createjs.Bitmap(loader.getResult("carrot"));
    carrot.setTransform(Math.random() * width + width, height - carrot.image.height - groundImg.height + 50);
    carrots.push(carrot);
  }

  for(let i = 0; i < 3; i++) {
    carrotHitBox = new createjs.Shape();
    carrotHitBox.graphics.drawRect(carrots[i].x, carrots[i].y + 20, 27, 60);
    carrotHitBox.x = carrots[i].x
    carrotHitBoxs.push(carrotHitBox);
  }

  cereal = new createjs.Bitmap(loader.getResult("cereal"));
  createjs.Tween.get(cereal, {loop: true})
    .to({x: 720, y: 250})
    .to({x: 720, y: 290}, 1800)
    .to({x: 720, y: 250}, 1800)

  const spriteSheet = new createjs.SpriteSheet({
    framerate: 60,
    images: [loader.getResult("rabbit")],
    frames:[
      // [0, 0, 108, 62.7, 0, 54, 31.35], // 0
      [0, 0, 108, 62.7, 0, 54, 10], // 0
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
        frames: [5, 13, 14, 1, 0, 0, 0, 0, 0, 0, 0],
        speed: .19
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

  stage.addChild(bg, bush, grass)
  for(let i = 0; i < 3; i ++) {
    stage.addChild(carrots[i], carrotHitBoxs[i]);
  }
  stage.addChild(ground, cereal, rabbitRect, rabbit, scoreField);

  if (createjs.Ticker.hasEventListener("tick")) {
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", handleTick);
   }

  document.onkeydown = handleJump;
}

function handleTick(e) {
  e.preventDefault();
  const deltaS = e.delta / 1000;
  ground.x = (ground.x - deltaS * 400) % ground.width;

  for(let i = 0; i < 3; i++) {
    carrot = carrots[i];
    carrot.x = (carrot.x - deltaS * 400);
    carrotHitBoxs[i].x = carrots[i].x;
  }

  for(let i = 0; i < 3; i++) {
    carrot = carrots[i];
    if (carrot.x + carrot.image.width <= 0) {
      carrot.x = Math.random() * width + width;
      carrotHitBoxs[i].x = carrot.x;
    }
  }

  bush.x = (bush.x - deltaS * 25);
  if (bush.x + bush.image.width <= 0) {
    bush.x = width;
  }
  grass.x = (grass.x - deltaS * 40);
  if (grass.x + grass.image.width <= 0) {
    grass.x = width;
  }

  score += 1;
  scoreField.text = score.toString();

  for (let i = 0; i < 3; i++) {
    let pt = carrotHitBoxs[i].localToLocal(100, 310, rabbitRect);
    if (rabbitRect.hitTest(pt.x, pt.y) && !gotHit) {
      rabbit.gotoAndPlay("faint");
      gotHit = true;
      setTimeout(onFaint, 950);
      ground.x = ground.x
    }
  }
  stage.update(e);
}

function onFaint(e) {
  stage.removeChild(rabbit);
  stage.update(e)
  hitCount += 1;
  if (hitCount === 1) {
    const scoreText = scoreField.text.repeat(1);
    messageField.text = `Game Over! Score: ${scoreField.text}\n Click to play again`;
  }
  stage.addChild(messageField);
  watchForRestart();
}


function onGround() {
  return rabbit.y === 310;
}

function handleJump(e) {
  if (e.keyCode === 32 && onGround() && !gotHit) {
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
