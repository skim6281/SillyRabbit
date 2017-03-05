import Rabbit from './rabbit';
import SpriteSheet from './spriteSheet';
import Carrot from './carrot';
import Background from './background';

let stage, width, height, loader, messageField, storyField, scoreField, score;
let loadingInterval = 0;
let gameStart = false;
let bg, carrot, rabbit;
let carrots = [];
let gotHit = false;

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  canvas.style.backgroundColor = "#f9f9f7";
  stage = new createjs.Stage("canvas");

  width = stage.canvas.width;
  height = stage.canvas.height;

  messageField = new createjs.Text("Loading", "38px Indie Flower", "black");
  messageField.maxWidth = 1000;
  messageField.textAlign = "center";
  messageField.textBaseline = "middle";
  messageField.x = width/2;
  messageField.y = 100;

  storyField = new createjs.Text("", "24px Indie Flower", "grey");
  storyField.maxWidth = 1000;
  storyField.textAlign = "center";
  storyField.textBaseline = "middle";
  storyField.lineHeight = 30;
  storyField.x = width/2;
  storyField.y = 170;
  stage.addChild(messageField);
  stage.update();


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
  if (carrots.length > 0) {
    for(let i = 0; i < 3; i ++) {
      carrots[i].removeFromStage();
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
  gotHit = false;
  carrots = [];
  scoreField.text = score.toString();
  stage.addChild(scoreField);
  start();
}

function start() {
  const groundImg = loader.getResult("ground");
  bg = new Background(stage, loader, groundImg);

  for(let i = 0; i < 3; i++){
    carrot = new Carrot(stage, loader.getResult("carrot"), groundImg.height);
    carrots.push(carrot);
  }
  rabbit = new Rabbit(SpriteSheet(loader.getResult("rabbit")));

  stage.addChild(bg.back, bg.bush, bg.grass)
  for(let i = 0; i < 3; i ++) {
    carrots[i].addToStage();
  }
  stage.addChild(bg.ground, bg.cereal, rabbit.hitBox, rabbit.body, scoreField);

  if (createjs.Ticker.hasEventListener("tick")) {
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", handleTick);
   }

  document.onkeydown = handleJump;
}

function handleTick(e) {
  e.preventDefault();
  const deltaS = e.delta / 1000;
  bg.move(deltaS);

  for(let i = 0; i < 3; i++) {
    carrot = carrots[i];
    carrot.move(deltaS);
  }

  score += 1;
  scoreField.text = score.toString();

  for (let i = 0; i < 3; i++) {
    let pt = carrots[i].hitBox.localToLocal(100, 310, rabbit.hitBox);
    if (rabbit.hitBox.hitTest(pt.x, pt.y) && !gotHit) {
      rabbit.body.gotoAndPlay("faint");
      gotHit = true;
      setTimeout(onFaint, 950);
    }
  }
  stage.update(e);
}

function onFaint(e) {
  stage.removeChild(rabbit.body, scoreField);
  stage.update(e)
  messageField.text = `Game Over! Score: ${scoreField.text}\n Click to play again`;
  stage.addChild(messageField);
  watchForRestart();
}

function handleJump(e) {
  if (e.keyCode === 32 && (rabbit.body.y === 310) && !gotHit) {
    e.preventDefault();
    rabbit.jump();
  }
}
