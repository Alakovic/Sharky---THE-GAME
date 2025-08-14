class MovableObject extends DrawableObject {
    speed = 0.15;
    speedY = 0;
    acceleration = 2.5;
    energy;
    damage;
    lastHit = 0
    animationFrameCounter = 0; 
    currentAnimationImages;

    offset = {
        top : 0,
        bottom: 0,
        left: 0,
        right:30
    }
    
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

    moveRight(){
        this.x += this.speed;
    }

    moveLeft(){
        this.x -= this.speed; 
    }

    moveUp(){
        this.y -= this.speed; 
    }

    moveDown() {
        this.y += this.speed;
    }

    moveLeftRight(minX, maxX) {
                let direction = -1; // Initial direction left , so -1
    setInterval(() => {
                this.x += this.speed * direction;
            if (this.x <= minX) {
                direction = 1;            // Change direction to right 
                this.otherDirection = true;  // look right
            } else if (this.x >= maxX) {
                direction = -1;           // Change direction to left 
                this.otherDirection = false; //look left 
            }
        }, 1000 / 60);
    }

    jump(){
        return  this.speedY = 20;
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x &&
            this.y + this.height - this.offset.bottom > mo.y &&
            this.x + this.offset.left < mo.x &&
            this.y  + this.offset.top < mo.y + mo.height
    }

    hit(damage) {
        this.energy -= damage
        if(this.energy < 0) {
            this.energy = 0; 
        } else {
            this.lastHit = new Date().getTime();
        }
    }
    
    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms 
        timepassed = timepassed / 1000 ; // Difference in s 
        return timepassed < 0.25;
    }

    animationFrameSpeed(speed){
        this.animationFrameCounter++;
        if(this.animationFrameCounter >= speed) {
            this.animationFrameCounter = 0;
            this.currentImage++;
        }
    }

}