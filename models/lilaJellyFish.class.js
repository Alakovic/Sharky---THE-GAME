class LilaJellyFish extends jellyFish {
  constructor(x, option = "option1") {
    super();
    this.loadImage(GameAssets.enemies.lilaJellyFish.swim[0]);
    this.loadImages(GameAssets.enemies.lilaJellyFish.swim);
    this.animate(GameAssets.enemies.lilaJellyFish.swim);
    this.x = x;
    this.y = 250;
    this.damage = 10;
    this.applyOption(option);
  }
  
  /**
   * Creates and returns a clone (duplicate) of this LilaJellyFish instance.
   * The clone will have the same position (`x`) and options as the original.
   *
   * @returns {LilaJellyFish} A new instance of LilaJellyFish with the same properties.
   */
  clone() {
    return new LilaJellyFish(this.x, this.option);
  }
}
