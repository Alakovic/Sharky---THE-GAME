class Controller {
    
    constructor(character, canvas) {
        this.character = character;
        this.canvas = canvas;
        this.touchButtons = [];
        const btnSize = 60;
        const margin = 20;
        const c = this.character;
        const canvasW = canvas.width;
        const canvasH = canvas.height;
        const verticalOffset = 30;
        this.touchButtons.push(new TouchButton('assets/images/game_interface/buttons/up.png', margin + btnSize, canvasH - btnSize*3 - verticalOffset, btnSize, btnSize, () => this.moveUpMobile()));
        this.touchButtons.push(new TouchButton('assets/images/game_interface/buttons/down.png', margin + btnSize, canvasH - btnSize - verticalOffset, btnSize, btnSize, () =>this.moveDownMobile()));
        this.touchButtons.push(new TouchButton('assets/images/game_interface/buttons/left.png', margin, canvasH - btnSize*2 - verticalOffset, btnSize, btnSize, () => this.moveLeftMobile()));
        this.touchButtons.push(new TouchButton('assets/images/game_interface/buttons/right.png', margin + btnSize*2, canvasH - btnSize*2 - verticalOffset, btnSize, btnSize, () =>this.moveRightMobile()));
        this.touchButtons.push(new TouchButton('assets/images/game_interface/buttons/Space Bar key.png', canvasW - btnSize*4 - margin, canvasH - btnSize*2 - verticalOffset, 120, btnSize, () => this.pressTailAttackMobile()));
        this.touchButtons.push(new TouchButton('assets/images/game_interface/buttons/D key.png', canvasW - btnSize - margin, canvasH - btnSize*2 - verticalOffset, btnSize, btnSize, () => this.pressBubbleAttackMobile()));
        this.addTouchEvents();
    }

    moveLeftMobile() {
    this.character.isMovingMobile = true;
    const minX = 100;
        if (!this.character.collidingObstacle("left") && this.character.x > minX) {
            this.character.otherDirection = true;
            this.character.isMovingMobile = true;
            this.character.moveLeft();
        }
    }

    moveRightMobile() {
    this.character.isMovingMobile = true;
    const maxX = this.character.world.level.end_level_x - this.character.width;
        if (!this.character.collidingObstacle("right") && this.character.x < maxX) {
            this.character.otherDirection = false;
            this.character.isMovingMobile = true;
            this.character.moveRight();
        }
    }

    moveUpMobile() {
    this.character.isMovingMobile = true;
    const minY = -130;
        if (!this.character.collidingObstacle("up") && this.character.y > minY) {
            this.character.isMovingMobile = true;
            this.character.moveUp();
        }
    }

    moveDownMobile() {
    this.character.isMovingMobile = true;
    const maxY = 360;
        if (!this.character.collidingObstacle("down") && this.character.y < maxY) {
            this.character.isMovingMobile = true;
            this.character.moveDown();
        }
    }

    pressTailAttackMobile() {
        this.character.world.keyboard.SPACE = true;
    }

    pressBubbleAttackMobile() {
        this.character.world.keyboard.D = true;
    }

   
    releaseAttacksMobile() {
        this.character.world.keyboard.SPACE = false;
        this.character.world.keyboard.D = false;
    }

    draw(ctx) {
        this.touchButtons.forEach(btn => btn.draw(ctx));
    }

    addTouchEvents() {
    this._touchStartHandler = (e) => {
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
    };

    this._touchEndHandler = (e) => {
        e.preventDefault();
        this.touchButtons.forEach(btn => btn.release());
        this.character.isMovingMobile = false;
        this.releaseAttacksMobile();
    };

    this.canvas.addEventListener('touchstart', this._touchStartHandler);
    this.canvas.addEventListener('touchend', this._touchEndHandler);
    }


    removeTouchEvents() {
        this.canvas.removeEventListener('touchstart', this._touchStartHandler);
        this.canvas.removeEventListener('touchend', this._touchEndHandler);
    }

    update() {
        this.touchButtons.forEach(btn => {
            if (btn.isPressed && btn.action) btn.action();
        });
    }

}