/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Background = function () {
  function Background(stage, loader, groundImg) {
    _classCallCheck(this, Background);

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

  _createClass(Background, [{
    key: "generate",
    value: function generate() {
      this.back.graphics.beginBitmapFill(this.loader.getResult("bg")).drawRect(0, 0, this.width, this.height);

      this.ground.graphics.beginBitmapFill(this.groundImg).drawRect(0, 0, this.width + this.groundImg.width, this.groundImg.height);
      this.ground.width = this.groundImg.width;
      this.ground.y = this.height - this.groundImg.height;

      this.bush.setTransform(Math.random() * this.width, this.height - this.bush.image.height - this.groundImg.height);

      this.grass.setTransform(Math.random() * this.width, this.height - this.grass.image.height - this.groundImg.height);

      createjs.Tween.get(this.cereal, { loop: true }).to({ x: 800, y: 250 }).to({ x: 800, y: 290 }, 1800).to({ x: 800, y: 250 }, 1800);
    }
  }, {
    key: "move",
    value: function move(delta) {
      this.ground.x = (this.ground.x - delta * 400) % this.ground.width;
      this.bush.x = this.bush.x - delta * 25;
      if (this.bush.x + this.bush.image.width <= 0) {
        this.bush.x = this.width;
      }
      this.grass.x = this.grass.x - delta * 40;
      if (this.grass.x + this.grass.image.width <= 0) {
        this.grass.x = this.width;
      }
    }
  }]);

  return Background;
}();

exports.default = Background;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Carrot = function () {
  function Carrot(stage, image, x, y) {
    _classCallCheck(this, Carrot);

    this.width = stage.canvas.width;
    this.height = stage.canvas.height;
    this.body = new createjs.Bitmap(image);
    this.body.setTransform(x, y);
    this.hitBox = new createjs.Shape();
    this.hitBox.graphics.drawRect(this.body.x, this.body.y + 20, 27, 65);
    this.hitBox.x = this.body.x;
    this.stage = stage;
  }

  _createClass(Carrot, [{
    key: "move",
    value: function move(delta, i) {
      this.body.x -= delta * 400;
      this.hitBox.x = this.body.x;

      if (this.body.x + this.body.image.width <= 0) {
        this.body.x = Math.random() * this.width + this.width * (i + 1) / 3 + this.width;
        this.hitBox.x = this.body.x;
      }
    }
  }, {
    key: "removeFromStage",
    value: function removeFromStage() {
      this.stage.removeChild(this.body, this.hitBox);
    }
  }, {
    key: "addToStage",
    value: function addToStage() {
      this.stage.addChild(this.body, this.hitBox);
    }
  }]);

  return Carrot;
}();

exports.default = Carrot;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rabbit = function () {
  function Rabbit(spriteSheet) {
    _classCallCheck(this, Rabbit);

    this.body = new createjs.Sprite(spriteSheet, "run");
    this.body.x = 100;
    this.body.y = 310;
    this.hitBox = new createjs.Shape();
    this.hitBox.graphics.beginFill("#000").drawCircle(0, 0, 25);
    this.hitBox.alpha = 0;
    this.hitBox.x = 120;
    this.hitBox.y = 310;
  }

  _createClass(Rabbit, [{
    key: "jump",
    value: function jump() {
      this.body.gotoAndPlay("jump");
      createjs.Tween.get(this.body).to({ y: 220 }, 150).to({ y: 200 }, 150).to({ y: 180 }, 150).to({ y: 200 }, 150).to({ y: 220 }, 100).to({ y: 240 }, 100).to({ y: 310 }, 250);
      createjs.Tween.get(this.hitBox).to({ y: 220 }, 150).to({ y: 200 }, 150).to({ y: 180 }, 150).to({ y: 200 }, 150).to({ y: 220 }, 100).to({ y: 240 }, 100).to({ y: 310 }, 250);
    }
  }]);

  return Rabbit;
}();

exports.default = Rabbit;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SpriteSheet = function SpriteSheet(image) {
  return new createjs.SpriteSheet({
    framerate: 60,
    images: [image],
    frames: [[0, 0, 108, 62.7, 0, 54, 10], // 0
    [108, 0, 101.55, 80.1, 0, 50.775, 40.05], // 1
    [209.55, 0, 105.15, 82.8, 0, 52.575, 41.4], // 2
    [314.7, 0, 105.15, 84.15, 0, 52.575, 42.075], // 3
    [419.85, 0, 105.15, 87.3, 0, 52.575, 43.65], // 4
    [0, 87.3, 101.55, 90.6, 0, 50.775, 45.3], // 5
    [101.55, 87.3, 103.95, 92.85, 0, 51.975, 46.425], // 6
    [205.5, 87.3, 105.15, 93.3, 0, 52.575, 46.65], // 7
    [310.65, 87.3, 104.55, 99, 0, 52.275, 49.5], // 8
    [415.2, 87.3, 104.55, 99, 0, 52.275, 49.5], // 9
    [0, 186.3, 104.55, 99, 0, 52.275, 49.5], // 10
    [104.55, 186.3, 104.55, 99, 0, 52.275, 49.5], // 11
    [209.1, 186.3, 105.15, 99.6, 0, 52.575, 49.8], // 12
    [314.25, 186.3, 101.55, 104.4, 0, 50.775, 52.2], // 13
    [419.8, 186.3, 101.55, 106.65, 0, 50.775, 53.325] // 14
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
};

exports.default = SpriteSheet;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _rabbit = __webpack_require__(2);

var _rabbit2 = _interopRequireDefault(_rabbit);

var _spriteSheet = __webpack_require__(3);

var _spriteSheet2 = _interopRequireDefault(_spriteSheet);

var _carrot = __webpack_require__(1);

var _carrot2 = _interopRequireDefault(_carrot);

var _background = __webpack_require__(0);

var _background2 = _interopRequireDefault(_background);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stage = void 0,
    width = void 0,
    height = void 0,
    loader = void 0,
    muteButton = void 0;
var messageField = void 0,
    storyField = void 0,
    scoreField = void 0,
    directionField = void 0,
    score = void 0;
var loadingInterval = 0;
var gameStart = false;
var bg = void 0,
    carrot = void 0,
    rabbit = void 0;
var carrots = [];
var gotHit = false;
var mute = false;

document.addEventListener('DOMContentLoaded', function () {
  muteButton = document.getElementById('mute');
  var canvas = document.getElementById('canvas');
  canvas.style.backgroundColor = "#f9f9f7";
  stage = new createjs.Stage("canvas");

  width = stage.canvas.width;
  height = stage.canvas.height;

  messageField = new createjs.Text("Loading", "38px Indie Flower", "black");
  messageField.maxWidth = 1000;
  messageField.textAlign = "center";
  messageField.textBaseline = "middle";
  messageField.x = width / 2;
  messageField.y = 100;

  storyField = new createjs.Text("", "24px Indie Flower", "grey");
  storyField.maxWidth = 1000;
  storyField.textAlign = "center";
  storyField.textBaseline = "middle";
  storyField.lineHeight = 30;
  storyField.x = width / 2;
  storyField.y = 170;
  stage.addChild(messageField);
  stage.update();

  directionField = new createjs.Text("Press SPACE to jump!", "38px Indie Flower", "black");
  directionField.textAlign = "center";
  directionField.x = width / 2;
  directionField.y = 100;

  var manifest = [{ src: "sounds/jump.ogg", id: "jump" }, { src: "sounds/music.ogg", id: "music" }, { src: "images/background.png", id: "bg" }, { src: "images/grass.png", id: "grass" }, { src: "images/bush.png", id: "bush" }, { src: "images/ground.png", id: "ground" }, { src: "images/cereal.png", id: "cereal" }, { src: "images/carrot.png", id: "carrot" }, { src: "images/rabbit.png", id: "rabbit" }];

  loader = new createjs.LoadQueue(false);
  loader.installPlugin(createjs.Sound);
  loader.addEventListener("complete", doneLoading);
  loader.addEventListener("progress", updateLoading);
  loader.loadManifest(manifest, true, "./assets/");
  muteButton.addEventListener('click', toggleMute);
  muteButton.addEventListener('keydown', toggleMute);
});

var toggleMute = function toggleMute(e) {
  e.preventDefault();
  if (e.keyCode >= 0) {
    return;
  }
  if (mute) {
    mute = false;
    createjs.Sound.muted = false;
    muteButton.className = "";
  } else {
    mute = true;
    createjs.Sound.muted = true;
    muteButton.className = "unmute";
  }
};

var updateLoading = function updateLoading() {
  messageField.text = "Loading " + (loader.progress * 100 | 0) + "%";
  stage.update();
};

var doneLoading = function doneLoading() {
  clearInterval(loadingInterval);
  scoreField = new createjs.Text("0", "bold 18px sans-serif", "black");
  scoreField.textAlign = "right";
  scoreField.x = width - 20;
  scoreField.y = 20;
  scoreField.maxWidth = 1000;

  messageField.text = "Welcome! \n Click to play";
  storyField.text = "Just as Silly Rabbit was finally about \nto taste ";
  storyField.text += "the delicious fruity goodness of The Cereal,\na bunch ";
  storyField.text += "of cruel kids cast a spell, forcing it to fly\naway from our hero. ";
  storyField.text += "Not willing to give up, Silly Rabbit\ngoes on the chase ";
  storyField.text += "avoiding tasteless carrots on \nthe way.";

  createjs.Sound.play("music", { loop: -1, volume: 0.02 });

  watchForRestart();
};

var watchForRestart = function watchForRestart() {
  if (carrots.length > 0) {
    for (var i = 0; i < 3; i++) {
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
};

var handleClick = function handleClick() {
  canvas.onclick = null;

  stage.removeChild(messageField, storyField);
  restart();
};

var restart = function restart() {
  score = 0;
  gotHit = false;
  carrots = [];
  scoreField.text = score.toString();
  stage.addChild(scoreField);
  start();
};

var start = function start() {
  var groundImg = loader.getResult("ground");
  bg = new _background2.default(stage, loader, groundImg);

  var carrotImg = loader.getResult("carrot");
  var y = height - carrotImg.height - groundImg.height + 50;
  for (var i = 0; i < 3; i++) {
    var x = Math.random() * width + width * (i + 1) / 3 + width;
    carrot = new _carrot2.default(stage, carrotImg, x, y);
    carrots.push(carrot);
  }

  rabbit = new _rabbit2.default((0, _spriteSheet2.default)(loader.getResult("rabbit")));

  stage.addChild(bg.back, bg.bush, bg.grass);
  for (var _i = 0; _i < 3; _i++) {
    carrots[_i].addToStage();
  }
  stage.addChild(bg.ground, bg.cereal, rabbit.hitBox, rabbit.body, scoreField);

  if (!gameStart) {
    stage.addChild(directionField);
    setTimeout(removeDirection, 1500);
  }

  gameStart = true;

  if (createjs.Ticker.hasEventListener("tick")) {
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", handleTick);
  }

  document.addEventListener("keydown", handleJump);
};

var removeDirection = function removeDirection() {
  stage.removeChild(directionField);
};

var handleTick = function handleTick(e) {
  e.preventDefault();
  var deltaS = e.delta / 1000;
  bg.move(deltaS);

  for (var i = 0; i < 3; i++) {
    carrot = carrots[i];
    carrot.move(deltaS, i);
  }

  score += 1;
  scoreField.text = score.toString();

  for (var _i2 = 0; _i2 < 3; _i2++) {
    var pt = carrots[_i2].hitBox.localToLocal(45, 290, rabbit.hitBox);
    if (rabbit.hitBox.hitTest(pt.x, pt.y) && !gotHit) {
      rabbit.body.gotoAndPlay("faint");
      gotHit = true;
      setTimeout(onFaint, 950);
    }
  }
  stage.update(e);
};

var onFaint = function onFaint(e) {
  stage.removeChild(rabbit.body, scoreField);
  stage.update(e);
  messageField.text = 'Game Over! Score: ' + scoreField.text + '\n Click to play again';
  stage.addChild(messageField);
  watchForRestart();
};

var handleJump = function handleJump(e) {
  e.preventDefault();
  if (e.keyCode === 32 && rabbit.body.y === 310 && !gotHit) {
    createjs.Sound.play("jump", { volume: 0.025 });
    rabbit.jump();
  }
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map