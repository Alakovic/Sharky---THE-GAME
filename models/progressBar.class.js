class ProgressBar extends DrawableObject {
  /**
   * Creates a new ProgressBar instance.
   * @param {string[]} images - Array of image paths representing the bar frames.
   * @param {number} x - The x position of the bar on the canvas.
   * @param {number} y - The y position of the bar on the canvas.
   * @param {number} width - The width of the bar.
   * @param {number} height - The height of the bar.
   * @param {boolean} [roundIndex=false] - Whether to use Math.round (true for health bars) or Math.floor (false for coin/poison bars) when calculating the image index.
   * @param {number} [initialPercentage=0] - Initial percentage of the bar (0–100).
   */
  constructor(images,x,y,width,height,roundIndex = false,initialPercentage = 0) {
    super();
    this.images = images;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.roundIndex = roundIndex;
    this.loadImages(images);
    this.setPercentage(initialPercentage);
  }

  /**
   * Sets the current percentage of the progress bar and updates the displayed image.
   * @param {number} percentage - The new percentage value (0–100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let index = this.resolveImageIndex();
    let path = this.images[index];
    this.img = this.imageCache[path];
  }

  /**
   * Calculates the index of the image to display based on the current percentage.
   * Uses Math.round for health bars and Math.floor for coin/poison bars.
   * Ensures the index stays within the bounds of the images array.
   * @returns {number} The index of the image to display.
   */
  resolveImageIndex() {
    const maxIndex = this.images.length - 1;
    let index = this.roundIndex
      ? Math.round((this.percentage / 100) * maxIndex)
      : Math.floor((this.percentage / 100) * maxIndex);
    if (index > maxIndex) index = maxIndex;
    if (index < 0) index = 0;
    return index;
  }
}
