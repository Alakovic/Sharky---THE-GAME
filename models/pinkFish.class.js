class PinkFish extends Fish {
  constructor(x, y, option = "option1") {
    super();
    this.loadImage(GameAssets.enemies.pinkFish.swim[0]);
    this.loadImages(GameAssets.enemies.pinkFish.swim);
    this.loadImages(GameAssets.enemies.pinkFish.dead);
    this.animate(GameAssets.enemies.pinkFish.swim,GameAssets.enemies.pinkFish.dead);
    this.x = x;
    this.y = y;
    this.damage = 10;
    this.applyOption(option);
  }

  /**
   * Creates and returns a clone (duplicate) of this PinkFish instance.
   * The clone will have the same position (`x`) and options as the original.
   *
   * @returns {PinkFish} A new instance of PinkFish with the same properties.
   */
  clone() {
    return new PinkFish(this.x, this.y, this.option);
  }
}
