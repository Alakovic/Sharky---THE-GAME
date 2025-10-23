class MovableObject extends DrawableObject {
  speed = 0.15;
  speedY = 1;
  acceleration = 2.5;
  energy;
  damage;
  lastHit = 0;
  animationFrameCounter = 0;
  currentAnimationImages;
  death;

  /** @type {{top:number, bottom:number, left:number, right:number}} Collision offset adjustments. */
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 30,
  };

  /**
   * Plays a death animation sequence.
   * @param {string[]} images - Array of image paths for the death animation.
   */
  playDeathAnimation(images) {
    if (this.currentAnimationImages !== images) {
      this.currentAnimationImages = images;
      this.currentImage = 0;
      this.animationFrameCounter = 0;
    }
    if (this.currentImage < images.length) {
      let path = images[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage++;
    } else {
      let lastFrame = images[images.length - 1];
      this.img = this.imageCache[lastFrame];
    }
  }

  /**
   * Plays a looping animation sequence.
   * @param {string[]} images - Array of image paths for the animation.
   */
  playAnimations(images) {
    if (this.currentAnimationImages !== images) {
      this.currentAnimationImages = images;
      this.currentImage = 0;
      this.animationFrameCounter = 0;
    }
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
  }

  /** Moves the object to the right. */
  moveRight() {
    this.x += this.speed;
  }

  /** Moves the object to the left. */
  moveLeft() {
    this.x -= this.speed;
  }

  /** Moves the object upward. */
  moveUp() {
    this.y -= this.speed;
  }

  /** Moves the object downward. */
  moveDown() {
    this.y += this.speed;
  }

  /**
   * Makes the object move back and forth horizontally between two points.
   * @param {number} minX - Minimum X boundary.
   * @param {number} maxX - Maximum X boundary.
   */
  moveLeftRight(minX, maxX) {
    let direction = -1; // Initial direction left , so -1
    setInterval(() => {
      if (this.isDead()) return;
      this.x += this.speed * direction;
      if (this.x <= minX) {
        direction = 1; // Change direction to right
        this.otherDirection = true; // look right
      } else if (this.x >= maxX) {
        direction = -1; // Change direction to left
        this.otherDirection = false; //look left
      }
    }, 1000 / 60);
  }

  /**
   * Moves the object vertically between two Y positions.
   * @param {number} minY - Minimum Y position.
   * @param {number} maxY - Maximum Y position.
   */
  moveUpDown(minY, maxY) {
    this.y += this.speedY;
    if (this.y <= minY || this.y >= maxY) {
      this.speedY *= -1;
    }
  }

  /**
   * Starts continuous vertical movement (oscillation) between two bounds.
   * @param {number} minY - Top boundary.
   * @param {number} maxY - Bottom boundary.
   */
  startMoveUpDown(minY, maxY) {
    setInterval(() => {
      this.moveUpDown(minY, maxY);
    }, 1000 / 60);
  }

  /**
   * Checks collision between this object and another movable object.
   * @param {MovableObject} mo - Another movable object.
   * @returns {boolean} True if both hitboxes intersect.
   */
  isColliding(mo) {
    const a = this.getHitbox();
    const b = mo.getHitbox();

    return (
      a.left < b.right &&
      a.right > b.left &&
      a.top < b.bottom &&
      a.bottom > b.top
    );
  }

  /**
   * Applies damage to the object and handles death state.
   * @param {number} damage - Amount of damage to apply.
   */
  hit(damage) {
    this.energy -= damage;
    if (this.energy <= 0) {
      this.energy = 0;
      this.death = true;
    } else {
      this.lastHit = new Date().getTime();
      this.death = false;
    }
  }

  /**
   * Checks if the object is dead (energy <= 0).
   * @returns {boolean} True if dead.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Checks if the object has been hit recently (within 0.25 seconds).
   * @returns {boolean} True if the object is in a hurt state.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 1000; // Difference in s
    return timepassed < 0.25;
  }

  /**
   * Controls the speed of animation frame updates.
   * @param {number} speed - The number of frames before switching to the next image.
   */
  animationFrameSpeed(speed) {
    this.animationFrameCounter++;
    if (this.animationFrameCounter >= speed) {
      this.animationFrameCounter = 0;
      this.currentImage++;
    }
  }
}
