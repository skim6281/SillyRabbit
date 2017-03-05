import Game from './game';
import Rabbit from './rabbit';
import SpriteSheet from './spriteSheet';

let stage, width, height, loader, messageField, storyField, scoreField, score;
let hitCount;
let loadingInterval = 0;
let gameStart = false;
let bg, ground, grass, bush, cereal, carrot, runningRabbit, rabbit, carrotHitBox, rabbitHitBox;
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
    {src: "sounds/jump.mp3", id: "jump"},
    {src: "sounds/music.mp3", id: "music"},
    {src: "images/background.png", id: "bg"},
    {src: "images/grass.png", id: "grass"},
    {src: "images/bush.png", id: "bush"},
    {src: "images/ground.png", id: "ground"},
    {src: "images/cereal.png", id: "cereal"},
    {src: "images/carrot.png", id: "carrot"},
    {src: "images/rabbit.png", id: "rabbit"}
  ]
  loader = new createjs.LoadQueue(false);
  loader.addEventListener("complete", doneLoading);
  loader.addEventListener("progress", updateLoading);
  loader.loadManifest(manifest, true, "./assets/");
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
  stage.removeChild(rabbitHitBox, scoreField);
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
    carrotHitBox.graphics.beginBitmapFill("red").drawRect(carrots[i].x, carrots[i].y + 20, 27, 58);
    carrotHitBox.x = carrots[i].x
    carrotHitBoxs.push(carrotHitBox);
  }

  cereal = new createjs.Bitmap(loader.getResult("cereal"));
  createjs.Tween.get(cereal, {loop: true})
    .to({x: 800, y: 250})
    .to({x: 800, y: 290}, 1800)
    .to({x: 800, y: 250}, 1800)

  rabbit = new Rabbit(SpriteSheet(loader.getResult("rabbit")));

  stage.addChild(bg, bush, grass)
  for(let i = 0; i < 3; i ++) {
    stage.addChild(carrots[i], carrotHitBoxs[i]);
  }
  stage.addChild(ground, cereal, rabbit.hitBox, rabbit.body, scoreField);

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
    // let pt = carrotHitBoxs[i].localToLocal(100, 310, rabbitHitBox);
    let pt = carrotHitBoxs[i].localToLocal(100, 310, rabbit.hitBox);
    // if (rabbitHitBox.hitTest(pt.x, pt.y) && !gotHit) {
    if (rabbit.hitBox.hitTest(pt.x, pt.y) && !gotHit) {
      rabbit.body.gotoAndPlay("faint");
      gotHit = true;
      setTimeout(onFaint, 950);
    }
  }
  stage.update(e);
}

function onFaint(e) {
  // stage.removeChild(rabbit);
  stage.removeChild(rabbit.body, scoreField);
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
  return rabbit.body.y === 310;
}

function handleJump(e) {
  if (e.keyCode === 32 && onGround() && !gotHit) {
    e.preventDefault();
    rabbit.jump();
  }
}
