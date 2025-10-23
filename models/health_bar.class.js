class HealthBar extends DrawableObject {
  constructor() {
    super();
    this.loadImages(GameAssets.bars.health);
    this.x = 35;
    this.y = 10;
    this.width = 300;
    this.height = 60;
    this.setPercentage(100);
  }

  /**
   * Sets the health bar to a specific percentage and updates the displayed image.
   * @param {number} percentage - Health percentage (0 to 100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let index = this.resolveImageIndex();
    let path = GameAssets.bars.health[index];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the correct image index based on the current health percentage.
   * Ensures the index is within bounds of the images_bar array.
   * @returns {number} Index of the image to display for the current health percentage.
   */
  resolveImageIndex() {
    const maxIndex = GameAssets.bars.health.length - 1;
    let index = Math.round((this.percentage / 100) * maxIndex);
    if (index > maxIndex) index = maxIndex;
    if (index < 0) index = 0;
    return index;
  }
}
