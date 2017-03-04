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
}

export default Game;
