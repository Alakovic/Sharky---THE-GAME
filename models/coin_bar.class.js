class CoinBar extends DrawableObject {
  percentage = 100;

  /**
   * Creates a new CoinBar instance, loads images, and sets initial position and size.
   */
  constructor() {
    super();
    this.loadImages(GameAssets.bars.coin);
    this.x = 35;
    this.y = 60;
    this.width = 240;
    this.height = 60;
    this.setPercentage(0);
  }

  /**
   * Updates the coin bar to reflect the given percentage of collected coins.
   * @param {number} percentage - Percentage of coins collected (0 to 100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let index = this.resolveImageIndex();
    let path = GameAssets.bars.coin[index];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image to display based on the current percentage.
   * @returns {number} Index of the corresponding image in the images_bar array.
   */
  resolveImageIndex() {
    const maxIndex = GameAssets.bars.coin.length - 1;
    let index = Math.floor((this.percentage / 100) * maxIndex);
    if (index > maxIndex) index = maxIndex;
    if (index < 0) index = 0;
    return index;
  }
}
