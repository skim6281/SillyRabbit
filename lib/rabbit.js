class Rabbit {
  constructor(spriteSheet){
    this.body = new createjs.Sprite(spriteSheet, "run");
    this.body.x = 100;
    this.body.y = 310;
    this.hitBox = new createjs.Shape();
    this.hitBox.graphics.beginFill("#000").drawCircle(0, 0, 25);
    this.hitBox.alpha = 0;
    this.hitBox.x = 120;
    this.hitBox.y = 310;
  }

  jump() {
    this.body.gotoAndPlay("jump");
    createjs.Tween.get(this.body)
      .to({y: 220}, 150)
      .to({y: 200}, 150)
      .to({y: 180}, 150)
      .to({y: 200}, 150)
      .to({y: 220}, 100)
      .to({y: 240}, 100)
      .to({y: 310}, 250)
    createjs.Tween.get(this.hitBox)
      .to({y: 220}, 150)
      .to({y: 200}, 150)
      .to({y: 180}, 150)
      .to({y: 200}, 150)
      .to({y: 220}, 100)
      .to({y: 240}, 100)
      .to({y: 310}, 250)
  }
}

export default Rabbit;
