class Fish extends MovableObject {
  height = 120;
  width = 120;
  damageType = "poison";
  energy = 20;
  acceleration = 0.5;
  speedX = 0;
  knockbackApplied = false;
  option = null;

  /**
   * @type {Object} Collision offsets for fine-tuned hit detection.
   */
  offset = {
    top: 20,
    bottom: 40,
    left: 30,
    right: 30,
  };

  /**
   * Creates a new Fish instance.
   *
   * @param {"green" | "pink"} type - Defines the fish type and its stats.
   * @param {number} x - Initial X position.
   * @param {number} y - Initial Y position.
   * @param {"option1" | "option2" | "option3"} [option="option2"] - Defines fish movement pattern.
   */
  constructor(type, x, y, option = "option2") {
    super();
    this.type = type;
    this.x = x;
    this.y = y;
    this.option = option;
    this.configureByType(type);
    const assets = GameAssets.enemies[`${type}Fish`];
    this.loadImage(assets.swim[0]);
    this.loadImages(assets.swim);
    this.loadImages(assets.dead);
    this.animate(assets.swim, assets.dead);
    this.applyOption(option);
    this.applyGravity();
  }

  /**
   * Configures fish speed and damage based on its type.
   * @param {"green" | "pink"} type
   */
  configureByType(type) {
    switch (type) {
      case "green":
        this.speed = 2.4;
        this.damage = 10;
        break;
      case "pink":
        this.speed = 3;
        this.damage = 8;
        break;
      default:
        this.speed = 2.5;
        this.damage = 10;
    }
  }

  /**
   * Handles fish animation loop.
   * Plays normal or death animation depending on state.
   *
   * @param {string[]} images - Array of normal animation frames.
   * @param {string[]} [deadImages=[]] - Optional death animation frames.
   */
  animate(images, deadImages = []) {
    setInterval(() => {
      if (this.isDead()) {
        this.animationFrameSpeed(2);
        this.playDeathAnimation(deadImages.length ? deadImages : images);
        if (!this.knockbackApplied) {
          this.applyKnockbackMovement();
          this.knockbackApplied = true;
        }
      } else {
        this.animationFrameSpeed(1);
        this.playAnimations(images);
      }
    }, 100);
  }

  /**
   * Applies one of the predefined movement patterns.
   * @param {"option1" | "option2" | "option3"} option
   */
  applyOption(option) {
    if (option === "option1") {
      this.option1();
    } else if (option === "option2") {
      this.option2();
    } else if (option === "option3") {
      this.option3();
    }
  }

  /**
   *  Moves the fish left and right with moderate speed and range.
   */
  option1() {
    this.moveLeftRight(this.x - 300, this.x + 300);
    this.speed = 5;
  }

  /**
   * Moves the fish left and right slowly over a smaller range.
   */
  option2() {
    this.speed = 2.5;
    this.moveLeftRight(this.x - 100, this.x + 100);
  }

  /**
   * Moves the fish quickly over a very small range.
   */
  option3() {
    this.speed = 7.5;
    this.moveLeftRight(this.x - 75, this.x + 75);
  }

  /**
   * Applies gravity effect to the fish if dead.
   * Updates vertical speed and horizontal movement.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isDead()) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        this.speedX *= 0.95;
        if (this.speedX !== 0) {
          this.x += this.speedX;
        }
      }
    }, 100);
  }

  /**
   * Initiates knockback movement when the fish is hit.
   * @param {number} [directionX=1] - Horizontal direction of knockback (1 for right, -1 for left).
   * @param {number} [directionY=-1] - Vertical direction of knockback (-1 for upward, 1 for downward).
   */
  knockback(directionX = 1, directionY = -1) {
    this.speedX = 10 * directionX;
    this.speedY = 15 * directionY;
  }

  /**
   * Applies continuous knockback movement to the fish based on speedX and speedY.
   * Runs an interval at 60 FPS to update position.
   */
  applyKnockbackMovement() {
    setInterval(() => {
      if (this.speedX !== 0) {
        this.x += this.speedX;
      }
      if (this.speedY !== 0) {
        this.y += this.speedY;
      }
    }, 1000 / 60);
  }

  /**
   * Creates a new identical fish instance.
   * @returns {Fish} - A cloned Fish object.
   */
  clone() {
    return new Fish(this.type, this.x, this.y, this.option);
  }
}
