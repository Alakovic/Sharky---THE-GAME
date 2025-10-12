/**
 * Represents the final boss enemy in the game.
 * Handles all animations, movement, and state transitions.
 * Inherits from MovableObject.
 */
class Boss extends MovableObject {
    x = 14500
    y=0
    height = 500;
    width = 550;
    minX = 12600;
    maxX = 14500;
    damage = 20;
    speed = 5;
    speedY = 5;
    direction = 1;
    energy = 100;
    hurtStartTime = 0;      
    hurtDuration = 500; 
    bossAttackSounds =  new Audio('assets/sounds/boss_attack.mp3');
    hasPlayedDeathAnimation = false;
    onDeathEndScreenShown = false;

    offset = {
        top: 250,
        bottom: 80,
        left: 50,
        right: 80
    }

    state = "hidden" ;

    images_attack = [
        '../assets/images/enemies/boss/attack/1.png',
        '../assets/images/enemies/boss/attack/2.png',
        '../assets/images/enemies/boss/attack/3.png',
        '../assets/images/enemies/boss/attack/4.png',
        '../assets/images/enemies/boss/attack/5.png',
        '../assets/images/enemies/boss/attack/6.png'
    ]

    images_dead = [
        '../assets/images/enemies/boss/dead/Mesa de trabajo 2 copia 6.png',
        '../assets/images/enemies/boss/dead/Mesa de trabajo 2 copia 7.png',
        '../assets/images/enemies/boss/dead/Mesa de trabajo 2 copia 8.png',
        '../assets/images/enemies/boss/dead/Mesa de trabajo 2 copia 9.png',
        '../assets/images/enemies/boss/dead/Mesa de trabajo 2 copia 10.png'
    ]

    images_float = [
        '../assets/images/enemies/boss/float/1.png',
        '../assets/images/enemies/boss/float/2.png',
        '../assets/images/enemies/boss/float/3.png',
        '../assets/images/enemies/boss/float/4.png',
        '../assets/images/enemies/boss/float/5.png',
        '../assets/images/enemies/boss/float/6.png',
        '../assets/images/enemies/boss/float/7.png',
        '../assets/images/enemies/boss/float/8.png',
        '../assets/images/enemies/boss/float/8.png',
        '../assets/images/enemies/boss/float/10.png',
        '../assets/images/enemies/boss/float/11.png',
        '../assets/images/enemies/boss/float/12.png',
        '../assets/images/enemies/boss/float/13.png'
    ]

    images_hurt = [
        '../assets/images/enemies/boss/hurt/1.png',
        '../assets/images/enemies/boss/hurt/2.png',
        '../assets/images/enemies/boss/hurt/3.png',
        '../assets/images/enemies/boss/hurt/4.png'
    ]

    images_introduce = [
        '../assets/images/enemies/boss/introduce/1.png',
        '../assets/images/enemies/boss/introduce/2.png',
        '../assets/images/enemies/boss/introduce/3.png',
        '../assets/images/enemies/boss/introduce/4.png',
        '../assets/images/enemies/boss/introduce/5.png',
        '../assets/images/enemies/boss/introduce/6.png',
        '../assets/images/enemies/boss/introduce/7.png',
        '../assets/images/enemies/boss/introduce/8.png',
        '../assets/images/enemies/boss/introduce/9.png',
        '../assets/images/enemies/boss/introduce/10.png'
    ]

/**
* Loads all necessary boss images for animations.
*/
    constructor() {
        super();
        this.loadImages(this.images_attack);
        this.loadImages(this.images_dead);
        this.loadImages(this.images_float);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_introduce);
    }

/**
* Updates the boss state and animation depending on health and player proximity.
* @param {Character} character - The player's character to interact with.
*/
    updateBoss(character) {
        if (this.isDead() && this.state !== "dead") {
            this.state = "dead";
        } else if (this.isHurt() && this.state !== "hurt" && this.state !== "dead") {
            this.state = "hurt";
        }else if (this.state !== "dead" && this.state !== "hurt") {
            this.checkAttack(character); 
        }
        this.switchAnimations(character);
    }

/**
* Switches boss animation and behavior based on the current state.
* @param {Character} character - The player's character.
*/
    switchAnimations(character) {
        switch (this.state) {
            case "dead": this.handleDeadState(); break;
            case "hurt": this.handleHurtState(); break;
            case "introduce": this.handleIntroduceState(); break;
            case "float": this.handleFloatState(); break;
            case "hunt": this.handleHuntState(character); break;
            case "attack": this.handleAttackState(); break;
        }
    }

/** 
* Plays the death animation when the boss is dead. 
*/
    handleDeadState() {
    if (!this.hasPlayedDeathSequence) {
        this.hasPlayedDeathSequence = true;
        this.world.handleBossDeath();
    }
}

/**
* Handles the hurt animation, then returns to floating state when recovered.
*/    
    handleHurtState() {
        this.playAnimations(this.images_hurt);
        this.animationFrameSpeed(4);
    if (!this.isHurt()) {
        this.enterFloat();
        }
    }

/**
* Handles the introduction animation when the boss first appears.
*/    
    handleIntroduceState() {
        this.playAnimations(this.images_introduce);
        this.animationFrameSpeed(6);
    if (this.currentImage >= this.images_introduce.length) {
        this.enterFloat();
        }
    }

/** 
* Makes the boss patrol left and right in floating mode. 
*/    
    handleFloatState() {
        this.floatPatrol();
    }

/**
* Handles chasing and attacking the player when in hunt state.
* @param {Character} character - The player's character.
*/
    handleHuntState(character) {
        this.huntCharacter(character);
    }

/**
* Moves the boss towards the player both horizontally and vertically.
* Plays attack animation during movement.
* @param {Character} character - The player's character.
*/    
    huntCharacter(character) {
        if (character.x < this.x) {
            this.moveLeft();
            this.otherDirection = false;
        } else {
            this.moveRight();
            this.otherDirection = true;
        }
        if (character.y + character.height/2 < this.y + this.height/2) {
            this.moveUp();
        } else if (character.y + character.height/2 > this.y + this.height/2) {
            this.moveDown();
        }
        this.playAnimations(this.images_attack);
        this.animationFrameSpeed(4)
    }

/**
* Checks the distance between the boss and the player to determine
* when to switch from floating to hunting.
* @param {Character} character - The player's character.
*/
    checkAttack(character) {
        if (this.state === "hidden" || this.state === "introduce" || this.state === "dead") return;
    const distance = Math.abs(character.x - this.x);
        if (distance < 500) {
            this.state = "hunt";
            this.bossAttackSounds.play();
        } else if (this.state === "hunt") {
            this.enterFloat(); 
        }
    }

/** 
* Plays the attack animation while the boss is in attack mode.
*/
    handleAttackState() {
        this.playAnimations(this.images_attack);
        this.animationFrameSpeed(4);
    }

/**
* Moves the boss horizontally back and forth while floating.
* Reverses direction at patrol boundaries.
*/    
    floatPatrol() {
    if (this.state !== "float") return;
        this.x += this.speed * this.direction;
    if (this.x <= this.minX) {
        this.x = this.minX;
        this.direction = 1;
    } 
    if (this.x >= this.maxX) {
        this.x = this.maxX;
        this.direction = -1;
    }
        this.otherDirection = this.direction === -1 ? false : true;
        this.playAnimations(this.images_float);
        this.animationFrameSpeed(8); 
    }

/**
* Transitions the boss into the floating state after certain animations or events.
* Resets direction and position boundaries.
*/
    enterFloat() {
    this.state = "float";
    if (this.x < this.minX) this.x = this.minX;
    if (this.x > this.maxX) this.x = this.maxX;
        this.direction = 1;
        this.otherDirection = true;
    }

/**
 * Plays the next boss attack sound in the sequence and loops back to the first sound after the last.
 *
 * The method resets the audio's current time to 0 before playing to ensure it starts from the beginning.
 * It automatically updates the index to point to the next sound in the `bossAttackSounds` array.
 */
    playAttackSound() {
        const sound = this.bossAttackSounds[this.nextAttackSound];
        sound.currentTime = 0; 
        sound.play();
        this.nextAttackSound = (this.nextAttackSound + 1) % this.bossAttackSounds.length;
    }
}