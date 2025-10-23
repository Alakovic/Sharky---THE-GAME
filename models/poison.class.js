class Poison extends MovableObject {
  /**
   * Creates a new poison item at the given coordinates.
   * @param {number} x - The x-coordinate of the poison item.
   * @param {number} y - The y-coordinate of the poison item.
   */
  constructor(x, y) {
    super().loadImage(GameAssets.poison.spin[0]);
    this.loadImages(GameAssets.poison.spin);
    this.animate();
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 70;
    this.value = 20;
  }

  /**
   *  @type {Object} Collision offset values for the poison item
   */
  offset = {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  };

  /**
   * Animates the poison item by cycling through its images.
   * Runs an interval to update the animation every 150ms.
   */
  animate() {
    setInterval(() => {
      this.animationFrameSpeed(1);
      this.playAnimations(GameAssets.poison.spin);
    }, 150);
  }
}
