class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 400;
  height = 150;
  width = 100;
  otherDirection = false;

  /**
   * Draws the current image on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The rendering context to draw on.
   */
  draw(ctx) {
    if (this.img) {
      ctx.drawImage(this.img, 0, 0, this.width, this.height);
    }
  }

  /**
   * Loads multiple images into the image cache.
   * @param {string[]} arr - Array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Loads a single image and sets it as the current display image.
   * @param {string} path - Path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Translates and flips the image horizontally if needed.
   * Used before drawing mirrored objects.
   * @param {CanvasRenderingContext2D} ctx - The rendering context.
   */
  flipImage(ctx) {
    if (this.otherDirection) {
      ctx.translate(this.x + this.width, this.y);
      ctx.scale(-1, 1);
    } else {
      ctx.translate(this.x, this.y);
    }
  }

  /**
   * Returns the object’s hitbox boundaries, accounting for optional offsets.
   * @returns {{left: number, right: number, top: number, bottom: number}} The hitbox coordinates.
   */
  getHitbox() {
    return {
      left: this.x + (this.offset?.left || 0),
      right: this.x + this.width - (this.offset?.right || 0),
      top: this.y + (this.offset?.top || 0),
      bottom: this.y + this.height - (this.offset?.bottom || 0),
    };
  }

  /**
   * Determines if the object can participate in collision detection.
   * @returns {boolean} True if the object is collidable.
   */
  isCollidable() {
    return (
      this instanceof Character ||
      this instanceof Coin ||
      this instanceof Poison ||
      this instanceof Hearth ||
      this instanceof Fish ||
      this instanceof jellyFish ||
      this instanceof Boss ||
      this instanceof Bubble
    );
  }

  /**
   * Checks whether a mouse click occurred inside the object’s bounds.
   * @param {number} mouseX - The X coordinate of the mouse.
   * @param {number} mouseY - The Y coordinate of the mouse.
   * @returns {boolean} True if the click is inside the object.
   */
  isClicked(mouseX, mouseY) {
    return (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height
    );
  }
}
