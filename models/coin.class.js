class Coin extends MovableObject {
  /**
   *  @type {Object} Collision offsets for fine-tuned hit detection.
   */
  offset = {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  };

  /**
   * Creates a new coin instance at the specified coordinates.
   * @param {number} x - The x-coordinate of the coin.
   * @param {number} y - The y-coordinate of the coin.
   */
  constructor(x, y) {
    super().loadImage(GameAssets.coin.spin[0]);
    this.loadImages(GameAssets.coin.spin);
    this.animate();
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 80;
    this.value = 1.5;
  }

  /**
   * Starts the coin's spinning animation using a set interval.
   * The animation cycles through the coin images at a fixed speed.
   */
  animate() {
    setInterval(() => {
      this.animationFrameSpeed(1);
      this.playAnimations(GameAssets.coin.spin);
    }, 150);
  }
}
