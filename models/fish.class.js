class Fish extends MovableObject {

    height = 120;
    width = 120;
    damageType = 'poison';
    energy = 20;
    acceleration = 0.5;   
    speedX = 0;         

    constructor() {
        super();
        this.applyGravity();
    }

    offset = { 
        top: 20, 
        bottom: 40, 
        left: 30, 
        right: 30 
    };

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

    applyOption(option) {
        if (option === "option1") {
            this.option1();
        } else if (option === "option2") {
            this.option2();
        } else if (option === "option3") {
            this.option3();
        }
    }

    option1() {
        this.moveLeftRight(this.x - 300, this.x + 300);
        this.speed = 5;
    }

    option2() {
        this.speed = 2.5;
        this.moveLeftRight(this.x - 100, this.x + 100);
    }

    option3() {
        this.speed = 7.5;
        this.moveLeftRight(this.x - 75, this.x + 75);
    }


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

    knockback(directionX = 1, directionY = -1) {
        this.speedX = 10 * directionX; 
        this.speedY = 15 * directionY;  
    }

    applyKnockbackMovement() {
        setInterval(() => {
                if (this.speedX !== 0) {
                    this.x += this.speedX;
                }
                if (this.speedY !== 0) {
                    this.y += this.speedY; 
                }
        }, 1000/60);
    }
}
