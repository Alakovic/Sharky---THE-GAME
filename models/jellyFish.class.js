class jellyFish extends MovableObject {
  height = 100;
  width = 100;
  damageType = "electro";

  /**
   * Creates a new jellyfish instance.
   */
  constructor() {
    super();
  }

  /**
   * @type {Object} Collision offsets for each side
   */
  offset = {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  };

  /**
   * Animates the jellyfish using the provided images.
   * @param {string[]} images - Array of image paths for animation frames.
   */
  animate(images) {
    setInterval(() => {
      this.animationFrameSpeed(1);
      this.playAnimations(images);
    }, 100);
  }

  /**
   * Applies a movement option pattern to the jellyfish.
   * @param {string} option - The movement option to apply ("option1" to "option4").
   */
  applyOption(option) {
    if (option === "option1") {
      this.option1();
    } else if (option === "option2") {
      this.option2();
    } else if (option === "option3") {
      this.option3();
    } else if (option === "option4") {
      this.option4();
    }
  }

  /**
   * Option 1 movement pattern
   */
  option1() {
    this.speedY = 2.5;
    this.startMoveUpDown(this.y - 200, this.y + 200);
  }

  /**
   * Option 2 movement pattern
   */
  option2() {
    this.speedY = -5.5;
    this.startMoveUpDown(this.y - 200, this.y + 200);
  }

  /**
   * Option 3 movement pattern
   */
  option3() {
    this.speedY = -5.5;
    this.startMoveUpDown(this.y - 150, this.y + 150);
  }

  /**
   * Option 4 movement pattern
   */
  option4() {
    this.speedY = 2.5;
    this.startMoveUpDown(this.y - 150, this.y + 150);
  }

  /**
   * Applies a variant that affects speed and start position.
   * @param {string} variant - The variant to apply ("variant1" to "variant3").
   */
  applyVariant(variant) {
    if (variant === "variant1") {
      this.variant1();
    } else if (variant === "variant2") {
      this.variant2();
    } else if (variant === "variant3") {
      this.variant3();
    }
  }

  /**
   * Variant 1: slow speed
   */
  variant1() {
    this.speed = 1.5;
    this.startX = this.x;
    this.startY = this.y;
  }

  /**
   * Variant 2: fast speed
   */
  variant2() {
    this.speed = 7.5;
    this.startX = this.x;
    this.startY = this.y;
  }

  /**
   * Variant 3: medium speed
   */
  variant3() {
    this.speed = 3;
    this.startX = this.x;
    this.startY = this.y;
  }

  /**
   * Starts moving the jellyfish in a square pattern.
   */
  movingSquare() {
    setInterval(() => {
      switch (this.direction) {
        case "up":
          this.moveUp();
          break;
        case "right":
          this.moveRight();
          break;
        case "down":
          this.moveDown();
          break;
        case "left":
          this.moveLeft();
          break;
      }
    }, 1000 / 60);
  }

  /**
   *  Moves the jellyfish upward and updates direction if boundary reached
   */
  moveUp() {
    this.y -= this.speed;
    if (this.y <= this.startY - this.range) this.direction = "right";
  }

  /**
   * Moves the jellyfish to the right and updates direction if boundary reached
   */
  moveRight() {
    this.x += this.speed;
    if (this.x >= this.startX + this.range) this.direction = "down";
  }

  /**
   * Moves the jellyfish downward and updates direction if boundary reached
   */
  moveDown() {
    this.y += this.speed;
    if (this.y + this.height >= this.startY + this.range)
      this.direction = "left";
  }

  /**
   * Moves the jellyfish to the left and updates direction if boundary reached
   */
  moveLeft() {
    this.x -= this.speed;
    if (this.x <= this.startX) this.direction = "up";
  }
}
