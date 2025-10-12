/**
 * Class representing the main playable character in the game.
 * @extends MovableObject
 */
class Character extends MovableObject {

    y=200
    height = 300;
    width = 350;
    speed = 10 ;
    world;
    energy = 100;
    coinCount = 0;
    poisonCount = 0;
    damageType;
    shooting = false;
    finSlapDamage = 20;
    tailHitSounds = [
        new Audio('assets/sounds/whip-02-242215.mp3')
    ];
    nextTailHit = 0;
    bubblePopSounds = [
        new Audio('assets/sounds/bubble-pop-06-351337.mp3')
    ];
    nextBubble = 0;
    bubblePopSoundsError = [
        new Audio('assets/sounds/error-010-206498.mp3')
    ];
    nextBubbleError = 0;
    hasPlayedDeathAnimation = false;
    onDeathEndScreenShown = false;

    offset = {
        top: 160,
        bottom: 80,
        left: 80,
        right: 80
    }

    images_idle = [
        '../assets/images/character/idle/1.png',
        '../assets/images/character/idle/2.png',
        '../assets/images/character/idle/3.png',
        '../assets/images/character/idle/4.png',
        '../assets/images/character/idle/5.png',
        '../assets/images/character/idle/6.png',
        '../assets/images/character/idle/7.png',
        '../assets/images/character/idle/8.png',
        '../assets/images/character/idle/9.png',
        '../assets/images/character/idle/10.png',
        '../assets/images/character/idle/11.png',
        '../assets/images/character/idle/12.png',
        '../assets/images/character/idle/13.png',
        '../assets/images/character/idle/14.png',
        '../assets/images/character/idle/15.png',
        '../assets/images/character/idle/16.png',
        '../assets/images/character/idle/17.png',
        '../assets/images/character/idle/18.png'
    ];

    images_swim = [
        '../assets/images/character/swim/1.png',
        '../assets/images/character/swim/2.png',
        '../assets/images/character/swim/3.png',
        '../assets/images/character/swim/4.png',
        '../assets/images/character/swim/5.png',
        '../assets/images/character/swim/6.png'
    ];

    images_poisoned = [
        '../assets/images/character/hurt/poisoned/1.png',
        '../assets/images/character/hurt/poisoned/2.png',
        '../assets/images/character/hurt/poisoned/3.png',
        '../assets/images/character/hurt/poisoned/4.png',
        '../assets/images/character/hurt/poisoned/5.png'
    ];

    images_electrified = [
        '../assets/images/character/hurt/electric shock/1.png',
        '../assets/images/character/hurt/electric shock/2.png',
        '../assets/images/character/hurt/electric shock/3.png'
    ]

    images_deathPoison = [
        '../assets/images/character/dead/poisoned/1.png',
        '../assets/images/character/dead/poisoned/2.png',
        '../assets/images/character/dead/poisoned/3.png',
        '../assets/images/character/dead/poisoned/4.png',
        '../assets/images/character/dead/poisoned/5.png',
        '../assets/images/character/dead/poisoned/6.png',
        '../assets/images/character/dead/poisoned/7.png',
        '../assets/images/character/dead/poisoned/8.png',
        '../assets/images/character/dead/poisoned/9.png',
        '../assets/images/character/dead/poisoned/10.png',
        '../assets/images/character/dead/poisoned/11.png',
        '../assets/images/character/dead/poisoned/12.png'
    ]

    images_deathElectro = [
        '../assets/images/character/dead/electrified/1.png',
        '../assets/images/character/dead/electrified/2.png',
        '../assets/images/character/dead/electrified/3.png',
        '../assets/images/character/dead/electrified/4.png',
        '../assets/images/character/dead/electrified/5.png',
        '../assets/images/character/dead/electrified/6.png',
        '../assets/images/character/dead/electrified/7.png',
        '../assets/images/character/dead/electrified/8.png',
        '../assets/images/character/dead/electrified/9.png',
        '../assets/images/character/dead/electrified/10.png'
    ]

    images_attackFinSlap =[
        '../assets/images/character/attack/finSlap/1.png',
        '../assets/images/character/attack/finSlap/2.png',
        '../assets/images/character/attack/finSlap/3.png',
        '../assets/images/character/attack/finSlap/4.png',
        '../assets/images/character/attack/finSlap/5.png',
        '../assets/images/character/attack/finSlap/6.png',
        '../assets/images/character/attack/finSlap/7.png',
        '../assets/images/character/attack/finSlap/8.png'
    ]

    images_attackWithBubble = [
        '../assets/images/character/attack/bubble/withBubble/1.png',
        '../assets/images/character/attack/bubble/withBubble/2.png',
        '../assets/images/character/attack/bubble/withBubble/3.png',
        '../assets/images/character/attack/bubble/withBubble/4.png',
        '../assets/images/character/attack/bubble/withBubble/5.png',
        '../assets/images/character/attack/bubble/withBubble/6.png',
        '../assets/images/character/attack/bubble/withBubble/7.png',
        '../assets/images/character/attack/bubble/withBubble/8.png'
    ]

    images_attackWithoutBubble = [
        '../assets/images/character/attack/bubble/withoutBubble/1.png',
        '../assets/images/character/attack/bubble/withoutBubble/2.png',
        '../assets/images/character/attack/bubble/withoutBubble/3.png',
        '../assets/images/character/attack/bubble/withoutBubble/4.png',
        '../assets/images/character/attack/bubble/withoutBubble/5.png',
        '../assets/images/character/attack/bubble/withoutBubble/6.png',
        '../assets/images/character/attack/bubble/withoutBubble/7.png',
        '../assets/images/character/attack/bubble/withoutBubble/8.png'
    ]

    constructor() {
        super().loadImage('../assets/images/character/idle/1.png');
        this.loadImages(this.images_swim);
        this.loadImages(this.images_idle);
        this.loadImages(this.images_poisoned);
        this.loadImages(this.images_electrified);
        this.loadImages(this.images_deathElectro);
        this.loadImages(this.images_deathPoison);
        this.loadImages(this.images_attackFinSlap);
        this.loadImages(this.images_attackWithBubble);
        this.loadImages(this.images_attackWithoutBubble);
        this.animate();
    }


/**
 * Shoots a bubble if the character has poison available.
 * Decrements poison count and updates the UI.
 */
    shootBubble() {
        if (!this.shooting && this.poisonCount > 0) {
            this.shooting = true;
            let direction = this.otherDirection ? -1 : 1;
            let bubble = new Bubble(this.x + this.width / 2, this.y + this.height / 2, direction); 
            this.world.bubbles.push(bubble);
            this.poisonCount--;
            this.world.poisonBar.setPercentage(Math.min((this.poisonCount / this.world.totalPoison) * 100, 100));
            setTimeout(() => this.shooting = false, 300);
        }
    }

/**
* Starts the character's animation loops for movement and actions.
*/
    animate() { 
        setInterval(() => {
            this.handleMovement();
            this.updateCamera();
        }, 1000 / 60);

        setInterval(() => {
        this.handleAnimations();
        }, 50);
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
        const margin = 100;  // Distance in pixels from the left edge of the screen where the character should be positioned
        const maxCameraX = -(this.world.level.end_level_x - this.world.canvas.width); // The furthest left the camera can scroll, so the right edge of the level aligns with the right edge of the screen
        let cameraX = -this.x + margin; // Calculate camera position so the character stays 100px from the left
        const rightEdge = this.world.level.end_level_x - this.width; // The maximum x-position where the character is fully visible on screen
        if (cameraX < maxCameraX) cameraX = maxCameraX; // Prevent camera from going beyond the right edge of the level
        if (this.x > rightEdge) cameraX = maxCameraX;  // Lock the camera at the end so the character doesn’t go partially off-screen
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
        if (this.damageType === 'poison') {
            this.animationFrameSpeed(2);
            this.playAnimations(this.images_poisoned);
        } else if (this.damageType === 'electro') {
            this.animationFrameSpeed(2);
            this.playAnimations(this.images_electrified);
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
        this.playAnimations(this.images_attackFinSlap);
        this.playTailHitSound();
        return true;
    }

/** Handles bubble attack */
    handleBubbleAttack() {
    this.animationFrameSpeed(1);
        if (this.poisonCount > 0) {
            this.playAnimations(this.images_attackWithBubble);
            this.shootBubble();
            this.playBubbleSound();
        } else {
            this.playAnimations(this.images_attackWithoutBubble);
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
            this.world.keyboard.DOWN
        ) {
            this.animationFrameSpeed(1);
            this.playAnimations(this.images_swim);
            return true;
        }
        return false;
    }

/** Handles idle animation when no input */
    handleIdleAnimation() {
        this.animationFrameSpeed(3);
        this.playAnimations(this.images_idle);
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
    if (direction === "left")  nextX -= this.speed;
    if (direction === "up")    nextY -= this.speed;
    if (direction === "down")  nextY += this.speed;

    return this.world.level.obstacle.some(obs => 
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
    return obs.hitboxes.some(hb => (
        nextX + this.width - this.offset.right > obs.x + (hb.left || 0) &&
        nextY + this.height - this.offset.bottom > obs.y + (hb.top || 0) &&
        nextX + this.offset.left < obs.x + obs.width - (hb.right || 0) &&
        nextY + this.offset.top < obs.y + obs.height - (hb.bottom || 0)
    ));
    }

/** Plays the next tail hit sound */
    playTailHitSound() {
        const sound = this.tailHitSounds[this.nextTailHit];
        sound.currentTime = 0; 
        sound.play();
        this.nextTailHit = (this.nextTailHit + 1) % this.tailHitSounds.length;
    }

/** Plays the next bubble pop sound */
    playBubbleSound() {
        const sound = this.bubblePopSounds[this.nextBubble];
        sound.currentTime = 0;
        sound.play();
        this.nextBubble = (this.nextBubble + 1) % this.bubblePopSounds.length;
    }   

/** Plays the next bubble error sound */
    playBubbleErrorSound() {
        const sound = this.bubblePopSoundsError[this.nextBubbleError];
        sound.currentTime = 0;
        sound.play();
        this.nextBubbleError = (this.nextBubbleError + 1) % this.bubblePopSoundsError.length;
    }
}

