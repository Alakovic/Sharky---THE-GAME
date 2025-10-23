class YellowJellyFish extends jellyFish {
  constructor(x, option = "option1") {
    super();
    this.loadImage(GameAssets.enemies.yellowJellyFish.swim[0]);
    this.loadImages(GameAssets.enemies.yellowJellyFish.swim);
    this.animate(GameAssets.enemies.yellowJellyFish.swim);
    this.x = x;
    this.y = 250;
    this.damage = 10;
    this.applyOption(option);
  }

  /**
   * Creates and returns a clone (duplicate) of this YellowJellyFish instance.
   * The clone will have the same position (`x`) and options as the original.
   *
   * @returns {YellowJellyFish} A new instance of YellowJellyFish with the same properties.
   */
  clone() {
    return new YellowJellyFish(this.x, this.option);
  }
}
