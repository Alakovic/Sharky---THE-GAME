class JellyFish extends MovableObject {
  height = 100;
  width = 100;
  damageType = "electro";

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
   * Creates a new jellyfish instance.
   * @param {"yellow" | "lila" | "pink" | "green"} type - Defines the jellyfish type.
   * @param {number} x - Initial X position.
   * @param {number} [y=250] - Initial Y position.
   * @param {string} [option="option1"] - Movement option ("option1"–"option4").
   * @param {string} [variant="variant1"] - Movement variant (used mainly by pink type).
   * @param {number} [range=200] - Movement range (used by pink type).
   * @param {string} [direction="up"] - Start direction (used by pink type).
   */
  constructor(type,x,y = 250,option = "option1",variant = "variant1",range = 200,direction = "up") {
    super();
    this.type = type;
    this.x = x;
    this.y = y;
    this.option = option;
    this.variant = variant;
    this.range = range;
    this.direction = direction;
    this.configureByType(type);
    this.loadAnimations();
    this.animate(this.swimImages);
    this.applyBehaviorByType();
  }

  /**
   * Loads animations for the specific jellyfish type.
   */
  loadAnimations() {
    const assets = GameAssets.enemies[`${this.type}JellyFish`];
    this.loadImage(assets.swim[0]);
    this.loadImages(assets.swim);
    this.swimImages = assets.swim;
  }

  /**
   * Sets type-specific attributes like damage or behavior.
   */
  configureByType(type) {
    switch (type) {
      case "yellow":
        this.damage = 10;
        break;
      case "lila":
        this.damage = 10;
        break;
      case "pink":
        this.damage = 20;
        break;
      case "green":
        this.damage = 15;
        break;
      default:
        this.damage = 10;
    }
  }

  /**
   * Applies the correct movement logic based on type and parameters.
   */
  applyBehaviorByType() {
    if (this.type === "pink" || this.type === "green") {
      this.applyVariant(this.variant);
      this.movingSquare();
    } else {
      this.applyOption(this.option);
    }
  }

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
   * @param {"option1"|"option2"|"option3"|"option4"} option
   */
  applyOption(option) {
    if (option === "option1") this.option1();
    else if (option === "option2") this.option2();
    else if (option === "option3") this.option3();
    else if (option === "option4") this.option4();
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

  /**
   * Creates an identical clone of the jellyfish instance.
   * @returns {JellyFish} - A cloned instance.
   */
  clone() {
    return new JellyFish(
      this.type,
      this.x,
      this.y,
      this.option,
      this.variant,
      this.range,
      this.direction
    );
  }
}
