class Hearth extends MovableObject {
  constructor(x, y) {
    super().loadImage(GameAssets.hearth.spin[0]);
    this.loadImages(GameAssets.hearth.spin);
    this.animate();
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.value = 20;
  }

  /**
   * @type {Object} Collision offset for more precise hit detection.
   */
  offset = {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  };

  /**
   * Animates the heart by cycling through its images at a fixed interval.
   */
  animate() {
    setInterval(() => {
      this.animationFrameSpeed(1);
      this.playAnimations(GameAssets.hearth.spin);
    }, 200);
  }
}
