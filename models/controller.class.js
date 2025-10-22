/**
 * @class Controller
 * @description Handles touch controls for mobile and tablet devices.
 */
class Controller {
    /**
     * @constructor
     * @param {Character} character - The main game character instance.
     * @param {HTMLCanvasElement} canvas - The canvas element where the game is drawn.
     */
    constructor(character, canvas) {
        this.character = character;
        this.canvas = canvas;
        this.touchButtons = [];
        this.isMobileOrTablet = false;
        this.checkDeviceType();
        window.addEventListener('resize', () => this.onResize());
    }

    
    /**
     * Checks if the device is mobile or tablet (screen width ≤ 1024px)
     * and initializes or removes touch buttons accordingly.
     */
    checkDeviceType() {
        const wasMobileOrTablet = this.isMobileOrTablet;
        this.isMobileOrTablet = window.innerWidth <= 1024;
        if (this.isMobileOrTablet && !wasMobileOrTablet) {
            this.initTouchButtons();
            this.addTouchEvents();
        }
        if (!this.isMobileOrTablet && wasMobileOrTablet) {
            this.removeTouchEvents();
            this.touchButtons = [];
        }
    }

    /**
     * Handler for window resize.
     * Reinitializes touch buttons if device is mobile or tablet.
     */
    onResize() {
        this.checkDeviceType();
         if (this.isMobileOrTablet) {
            this.touchButtons = [];
            this.initTouchButtons();
        }
    }

    /**
    * Initializes touch buttons and positions them on the canvas.
    */
    initTouchButtons(){
        const btnSize = 60;
        const margin = 20;
        const c = this.character;
        const canvasW = this.canvas.width;
        const canvasH = this.canvas.height;
        const verticalOffset = 30;
        this.touchButtons.push(new TouchButton(GameAssets.controls.up[0], margin + btnSize, canvasH - btnSize*3 - verticalOffset, btnSize, btnSize, () => this.moveUpMobile()));
        this.touchButtons.push(new TouchButton(GameAssets.controls.down[0], margin + btnSize, canvasH - btnSize - verticalOffset, btnSize, btnSize, () =>this.moveDownMobile()));
        this.touchButtons.push(new TouchButton(GameAssets.controls.left[0], margin, canvasH - btnSize*2 - verticalOffset, btnSize, btnSize, () => this.moveLeftMobile()));
        this.touchButtons.push(new TouchButton(GameAssets.controls.right[0], margin + btnSize*2, canvasH - btnSize*2 - verticalOffset, btnSize, btnSize, () =>this.moveRightMobile()));
        this.touchButtons.push(new TouchButton(GameAssets.controls.tailAttack[0], canvasW - btnSize*4 - margin, canvasH - btnSize*2 - verticalOffset, 120, btnSize, () => this.pressTailAttackMobile()));
        this.touchButtons.push(new TouchButton(GameAssets.controls.bubbleAttack[0], canvasW - btnSize - margin, canvasH - btnSize*2 - verticalOffset, btnSize, btnSize, () => this.pressBubbleAttackMobile()));
    }

    /** Moves the character left on mobile */
    moveLeftMobile() {
    this.character.isMovingMobile = true;
    const minX = 100;
        if (!this.character.collidingObstacle("left") && this.character.x > minX) {
            this.character.otherDirection = true;
            this.character.isMovingMobile = true;
            this.character.moveLeft();
        }
    }
     
    /** Moves the character right on mobile */
    moveRightMobile() {
    this.character.isMovingMobile = true;
    const maxX = this.character.world.level.end_level_x - this.character.width;
        if (!this.character.collidingObstacle("right") && this.character.x < maxX) {
            this.character.otherDirection = false;
            this.character.isMovingMobile = true;
            this.character.moveRight();
        }
    }

    /** Moves the character up on mobile */
    moveUpMobile() {
    this.character.isMovingMobile = true;
    const minY = -130;
        if (!this.character.collidingObstacle("up") && this.character.y > minY) {
            this.character.isMovingMobile = true;
            this.character.moveUp();
        }
    }

    /** Moves the character down on mobile */
    moveDownMobile() {
    this.character.isMovingMobile = true;
    const maxY = 360;
        if (!this.character.collidingObstacle("down") && this.character.y < maxY) {
            this.character.isMovingMobile = true;
            this.character.moveDown();
        }
    }

    /** Activates the tail attack (SPACE) on mobile */
    pressTailAttackMobile() {
        this.character.world.keyboard.SPACE = true;
    }

    /** Activates the bubble attack (D) on mobile */
    pressBubbleAttackMobile() {
        this.character.world.keyboard.D = true;
    }

    /** Releases all mobile attacks */
    releaseAttacksMobile() {
        this.character.world.keyboard.SPACE = false;
        this.character.world.keyboard.D = false;
    }

    /** Draws touch buttons if on mobile/tablet */
    draw(ctx) {
        if (this.isMobileOrTablet) {
            this.touchButtons.forEach(btn => btn.draw(ctx));
        }
    }

    /**
    * Adds touch event listeners to the canvas
    */
    addTouchEvents() {
        this.touchStartHandler = (e) => this.handleTouchStart(e);
        this.touchEndHandler = (e) => this.handleTouchEnd(e);
        this.canvas.addEventListener('touchstart', this.touchStartHandler);
        this.canvas.addEventListener('touchend', this.touchEndHandler);
    }

    /** Handles touchstart events */
    handleTouchStart(e) {
        e.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        for (let touch of e.touches) {
             const x = (touch.clientX - rect.left) * scaleX;
            const y = (touch.clientY - rect.top) * scaleY;
            this.touchButtons.forEach(btn => {
                if (btn.isClicked(x, y)) btn.press();
            });
        }
    }

    /** Handles touchend events */
    handleTouchEnd(e) {
        e.preventDefault();
        this.touchButtons.forEach(btn => btn.release());
        this.character.isMovingMobile = false;
        this.releaseAttacksMobile();
    }

    /** Removes touch event listeners */
    removeTouchEvents() {
        this.canvas.removeEventListener('touchstart', this.touchStartHandler);
        this.canvas.removeEventListener('touchend', this.touchEndHandler);
    }

    /** Updates touch button states and actions if on mobile/tablet */
    update() {
        if (this.isMobileOrTablet) {
            this.touchButtons.forEach(btn => {
                if (btn.isPressed && btn.action) btn.action();
            });
        }
    }

}