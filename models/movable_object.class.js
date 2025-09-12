class MovableObject extends DrawableObject {
    speed = 0.15;
    speedY = 1;
    acceleration = 2.5;
    energy;
    damage;
    lastHit = 0
    animationFrameCounter = 0; 
    currentAnimationImages;
    death;

    offset = {
        top : 0,
        bottom: 0,
        left: 0,
        right:30
    }
    

    playDeathAnimation(images) {
    if (this.currentAnimationImages !== images) {
        this.currentAnimationImages = images;
        this.currentImage = 0;
        this.animationFrameCounter = 0;
    }
    if (this.currentImage < images.length) {
        let path = images[this.currentImage];
        this.img = this.imageCache[path];
        this.currentImage++;
    } else {
        let lastFrame = images[images.length - 1];
        this.img = this.imageCache[lastFrame];
    }
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
        if (this.isDead()) return;
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

    moveUpDown(minY,maxY) {
            this.y += this.speedY;
                if (this.y <= minY || this.y >= maxY) {
            this.speedY *= -1;
        }
    }

    startMoveUpDown(minY, maxY) {
        setInterval(() => {
            this.moveUpDown(minY, maxY);
        }, 1000 / 60); 
    }

    isColliding(mo) {
        const a = this.getHitbox();
        const b = mo.getHitbox();

        return (
            a.left < b.right &&
            a.right > b.left &&
            a.top < b.bottom &&
            a.bottom > b.top
        );
    }

    hit(damage) {
        this.energy -= damage;
        if  (this.energy <= 0) {
            this.energy = 0;
            this.death = true;   
        } else {
            this.lastHit = new Date().getTime();
            this.death = false;  
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