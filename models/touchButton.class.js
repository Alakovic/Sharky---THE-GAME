class TouchButton extends DrawableObject {
  action;
  isPressed = false;

  constructor(imgPath, x, y, width, height, action) {
    super();
    this.loadImage(imgPath);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.action = action;
  }

  /** Marks the button as pressed */
  press() {
    this.isPressed = true;
  }

  /** Marks the button as released */
  release() {
    this.isPressed = false;
  }

  /**
   * Draws the button on the canvas, scaling it down slightly when pressed
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    if (!this.img) return;
    ctx.save();
    const scale = this.isPressed ? 0.9 : 1;
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.scale(scale, scale);
    ctx.translate(-this.width / 2, -this.height / 2);
    ctx.drawImage(this.img, 0, 0, this.width, this.height);
    ctx.restore();
  }

  /**
   * Checks if a point (x, y) is inside the button's boundaries
   * @param {number} x - X coordinate of the point.
   * @param {number} y - Y coordinate of the point.
   * @returns {boolean} True if the point is inside the button.
   */
  isClicked(x, y) {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }
}
