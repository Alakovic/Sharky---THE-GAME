class ProgressBar extends DrawableObject {
  /**
   * Generic progress bar for health, coins, poison, boss, etc.
   * @param {string[]} imagesArray - Array of image paths for bar stages.
   * @param {number} x - X position on canvas.
   * @param {number} y - Y position on canvas.
   * @param {number} width - Width of bar.
   * @param {number} height - Height of bar.
   * @param {number} initialPercentage - Initial percentage (0–100).
   */
  constructor(imagesArray, x, y, width, height, initialPercentage = 0) {
    super();
    this.imagesArray = imagesArray;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.percentage = 0;
    this.loadImages(imagesArray);
    this.setPercentage(initialPercentage);
  }

  /**
   * Sets the bar's percentage and updates the image.
   * @param {number} percentage - Value from 0 to 100
   */
  setPercentage(percentage) {
    this.percentage = Math.min(Math.max(percentage, 0), 100);

    // broj slika
    const numImages = this.imagesArray.length;

    // mapiranje procenta na index slike
    let index = Math.floor((this.percentage / 100) * (numImages - 1));

    // clamp za svaki slučaj
    if (index >= numImages) index = numImages - 1;
    if (index < 0) index = 0;

    this.img = this.imageCache[this.imagesArray[index]];
}
}
