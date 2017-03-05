class Rabbit {
  constructor(spriteSheet){
    this.body = new createjs.Sprite(spriteSheet, "run");
    this.body.y = 310;
    this.body.x = 100;
    this.hitBox = new createjs.Shape();
    this.hitBox.graphics.beginFill("#000").drawRect(this.body.x - 17, this.body.y - 20, 60, 40);
    this.hitBox.alpha = 0
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
      .to({y: -100}, 150)
      .to({y: -120}, 150)
      .to({y: -140}, 170)
      .to({y: -120}, 160)
      .to({y: -100}, 130)
      .to({y: 0}, 250)
  }
}

export default Rabbit;
