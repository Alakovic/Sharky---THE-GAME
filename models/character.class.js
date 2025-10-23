class Character extends MovableObject {
  animationIntervals = [];
  y = 200;
  height = 300;
  width = 350;
  speed = 10;
  world;
  energy = 100;
  coinCount = 0;
  poisonCount = 0;
  damageType;
  shooting = false;
  finSlapDamage = 20;
  hasPlayedDeathAnimation = false;
  onDeathEndScreenShown = false;
  isMovingMobile = false;
  startX = 100;
  startY = 200;

  offset = {
    top: 160,
    bottom: 80,
    left: 80,
    right: 80,
  };

  constructor() {
    super().loadImage(GameAssets.character.idle[0]);
    this.loadImages(GameAssets.character.idle);
    this.loadImages(GameAssets.character.swim);
    this.loadImages(GameAssets.character.poisoned);
    this.loadImages(GameAssets.character.electrified);
    this.loadImages(GameAssets.character.deathPoison);
    this.loadImages(GameAssets.character.deathElectro);
    this.loadImages(GameAssets.character.attackFinSlap);
    this.loadImages(GameAssets.character.attackWithBubble);
    this.loadImages(GameAssets.character.attackWithoutBubble);
    this.animate();
  }

  resetPosition() {
    this.x = this.startX;
    this.y = this.startY;
    this.energy = 100;
    this.coinCount = 0;
    this.poisonCount = 0;
    this.otherDirection = false;
  }

  /**
   * Shoots a bubble if the character has poison available.
   * Decrements poison count and updates the UI.
   */
  shootBubble() {
    if (!this.shooting && this.poisonCount > 0) {
      this.shooting = true;
      let direction = this.otherDirection ? -1 : 1;
      let bubble = new Bubble(
        this.x + this.width / 2,
        this.y + this.height / 2,
        direction
      );
      this.world.bubbles.push(bubble);
      this.poisonCount--;
      this.world.poisonBar.setPercentage(
        Math.min((this.poisonCount / this.world.totalPoison) * 100, 100)
      );
      setTimeout(() => (this.shooting = false), 300);
    }
  }

  /**
   * Starts the character's animation loops for movement and actions.
   */
  animate() {
    const movementInterval = setInterval(() => {
      this.handleMovement();
      this.updateCamera();
    }, 1000 / 60);

    const animationInterval = setInterval(() => {
      this.handleAnimations();
    }, 50);
    this.animationIntervals.push(movementInterval, animationInterval);
  }

  stopAnimations() {
    this.animationIntervals.forEach((interval) => clearInterval(interval));
    this.animationIntervals = [];
  }

  /**
   * Handles horizontal and vertical movement based on keyboard input.
   */
  handleMovement() {
    this.handleHorizontalMovement();
    this.handleVerticalMovement();
  }

  /**
   * Handles right and left movement
   */
  handleHorizontalMovement() {
    const maxX = this.world.level.end_level_x - this.width;
    if (this.world.keyboard.RIGHT && this.x < maxX) {
      this.otherDirection = false;
      if (!this.collidingObstacle("right")) this.moveRight();
    }

    if (this.world.keyboard.LEFT && this.x > 100) {
      this.otherDirection = true;
      if (!this.collidingObstacle("left")) this.moveLeft();
    }
  }

  /**
   * Handles up and down movement
   */
  handleVerticalMovement() {
    const maxY = 360;
    const minY = -130;
    if (this.world.keyboard.UP && this.y > minY) {
      if (!this.collidingObstacle("up")) this.moveUp();
    }

    if (this.world.keyboard.DOWN && this.y < maxY) {
      if (!this.collidingObstacle("down")) this.moveDown();
    }
  }

  /**
   * Updates the camera position relative to the character
   */
  updateCamera() {
    const margin = 100; // Distance in pixels from the left edge of the screen where the character should be positioned
    const maxCameraX = -(
      this.world.level.end_level_x - this.world.canvas.width
    ); // The furthest left the camera can scroll, so the right edge of the level aligns with the right edge of the screen
    let cameraX = -this.x + margin; // Calculate camera position so the character stays 100px from the left
    const rightEdge = this.world.level.end_level_x - this.width; // The maximum x-position where the character is fully visible on screen
    if (cameraX < maxCameraX) cameraX = maxCameraX; // Prevent camera from going beyond the right edge of the level
    if (this.x > rightEdge) cameraX = maxCameraX; // Lock the camera at the end so the character doesn’t go partially off-screen
    this.world.camera_x = cameraX;
  }

  /**
   * Main animation handler, chooses which animation to play
   */
  handleAnimations() {
    if (this.handleDeath()) return;
    if (this.handleHurt()) return;
    if (this.handleAttack()) return;
    if (this.handleMovementAnimation()) return;
    this.handleIdleAnimation();
  }

  /**
   * Handles death animation and end-of-game logic
   */
  handleDeath() {
    if (!this.isDead()) return false;
    if (!this.hasPlayedDeathAnimation) {
      this.hasPlayedDeathAnimation = true;
      this.world.handleCharacterDeath(this.damageType);
    }
    return true;
  }

  /**
   * Handles hurt animations depending on damage type
   */
  handleHurt() {
    if (!this.isHurt()) return false;
    if (this.damageType === "poison") {
      this.animationFrameSpeed(2);
      this.playAnimations(GameAssets.character.poisoned);
    } else if (this.damageType === "electro") {
      this.animationFrameSpeed(2);
      this.playAnimations(GameAssets.character.electrified);
    }
    return true;
  }

  /**
   *Handles character attacks
   * @returns {boolean} True if an attack animation was played
   */
  handleAttack() {
    if (this.world.keyboard.SPACE) {
      return this.handleTailAttack();
    } else if (this.world.keyboard.D) {
      return this.handleBubbleAttack();
    }
    return false;
  }

  /** Handles fin slap attack */
  handleTailAttack() {
    this.animationFrameSpeed(1);
    this.playAnimations(GameAssets.character.attackFinSlap);
    this.playTailHitSound();
    return true;
  }

  /** Handles bubble attack */
  handleBubbleAttack() {
    this.animationFrameSpeed(1);
    if (this.poisonCount > 0) {
      this.playAnimations(GameAssets.character.attackWithBubble);
      this.shootBubble();
      this.playBubbleSound();
    } else {
      this.playAnimations(GameAssets.character.attackWithoutBubble);
      this.playBubbleErrorSound();
    }
    return true;
  }

  /** Handles swim animation when moving */
  handleMovementAnimation() {
    if (
      this.world.keyboard.RIGHT ||
      this.world.keyboard.LEFT ||
      this.world.keyboard.UP ||
      this.world.keyboard.DOWN ||
      this.isMovingMobile
    ) {
      this.animationFrameSpeed(1);
      this.playAnimations(GameAssets.character.swim);
      return true;
    }
    return false;
  }

  /** Handles idle animation when no input */
  handleIdleAnimation() {
    this.animationFrameSpeed(3);
    this.playAnimations(GameAssets.character.idle);
  }

  /**
   * Checks if character will collide with an obstacle in the given direction
   * @param {string} direction - "up", "down", "left", or "right"
   * @returns {boolean} True if a collision would occur
   */
  collidingObstacle(direction) {
    let nextX = this.x;
    let nextY = this.y;

    if (direction === "right") nextX += this.speed;
    if (direction === "left") nextX -= this.speed;
    if (direction === "up") nextY -= this.speed;
    if (direction === "down") nextY += this.speed;

    return this.world.level.obstacle.some((obs) =>
      this.isCollidingObstacle(nextX, nextY, obs)
    );
  }

  /**
   * Checks collision between character and an obstacle hitbox
   * @param {number} nextX - Future X position
   * @param {number} nextY - Future Y position
   * @param {Obstacle} obs - Obstacle object
   * @returns {boolean} True if colliding
   */
  isCollidingObstacle(nextX, nextY, obs) {
    return obs.hitboxes.some(
      (hb) =>
        nextX + this.width - this.offset.right > obs.x + (hb.left || 0) &&
        nextY + this.height - this.offset.bottom > obs.y + (hb.top || 0) &&
        nextX + this.offset.left < obs.x + obs.width - (hb.right || 0) &&
        nextY + this.offset.top < obs.y + obs.height - (hb.bottom || 0)
    );
  }

  /** Plays the next tail hit sound */
  playTailHitSound() {
    this.world.sound.play(this.world.sound.tailHit);
  }

  /** Plays the next bubble pop sound */
  playBubbleSound() {
    this.world.sound.play(this.world.sound.bubblePop);
  }

  /** Plays the next bubble error sound */
  playBubbleErrorSound() {
    this.world.sound.play(this.world.sound.bubbleError);
  }
}
